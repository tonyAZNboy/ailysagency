# Phase B.4.4 : Sub-phases (atomic, mergeable)

Total estimate: ~6h. Time-box ceiling: 12h (2x rule, Section 11).

## Cross-repo split

| Repo | Sub-phases | Hours | Owner |
|---|---|---|---|
| AiLys (this worktree) | B.4.4.AiLys.1 + B.4.4.AiLys.2 | 3h | This session |
| Reviuzy (separate session/PR) | B.4.4.Rvz.1 + B.4.4.Rvz.2 + B.4.4.Rvz.3 | 3h | Follow-up Reviuzy session |

---

## B.4.4.AiLys.1 : KV ring buffer + stats endpoint (~2h, AiLys)

**Goal:** ring-buffer write of last 50 invocations + read endpoint with HMAC service auth.

**Files:**
- `functions/api/audit-pdf.ts` : add `ctx.waitUntil(env.AUDIT_PDF_RATE_LIMIT.put(\`audit_pdf_log:\${ts}\`, JSON.stringify(entry), { expirationTtl: 7*24*60*60 }))` inside `emitAuditLog`
- `functions/api/admin/audit-pdf-stats.ts` : new GET endpoint
- `functions/lib/serviceAuth.ts` : add `reviuzy-admin-audit-pdf-stats` to ALLOWED_CALLERS

**Endpoint behavior:**
1. GET only (405 on POST/PUT/DELETE)
2. Verify HMAC via `verifyServiceRequest` (body is empty string)
3. List KV keys with prefix `audit_pdf_log:`, sort desc by ts, take top 50
4. Compute aggregates: today_count, last7d_count, today_estimated_cost_cad
5. Return JSON: `{ feature_enabled, recent_invocations, daily_count, weekly_count, estimated_cost_cad, generated_at }`

**Cost calc:** today_count * (Resend per email + R2 storage per PDF + KV write) ~= count * $0.0003 CAD per invocation. Documented in code.

**Acceptance:**
- HMAC valid : 200 + JSON
- HMAC invalid : 401
- Caller not allowed : 403
- Method not GET : 405
- Secret missing : 503

**Smoke:** `scripts/smoke-admin-audit-pdf-stats.mjs` covers 12 cases. Wired as CI gate 10.

**Commit:** `feat(b44): KV ring buffer + admin audit-pdf-stats endpoint with HMAC service auth`

---

## B.4.4.AiLys.2 : Smoke + CI gate (~1h, AiLys)

**Goal:** 12-case smoke covering HMAC, payload, error modes.

**Cases:**
1. Valid HMAC + empty body : 200 + JSON shape valid
2. No headers : 401 missing_headers
3. Bad caller : 403 caller_not_allowed
4. Timestamp 10 min in past : 401 timestamp_skewed
5. Timestamp 10 min in future : 401 timestamp_skewed
6. Bad signature : 401 sig_mismatch
7. POST instead of GET : 405
8. Empty body but signature over different body : 401 sig_mismatch
9. Caller header empty : 401 missing_headers
10. Token header empty : 401 missing_headers
11. Timestamp non-numeric : 401 timestamp_invalid
12. JSON shape : has feature_enabled + recent_invocations + daily_count + weekly_count + estimated_cost_cad + generated_at

**CI gate:** new gate 10 in deploy.yml.

**Commit:** `feat(b44): smoke script for admin audit-pdf-stats + CI gate 10`

---

## B.4.4.Rvz.1 : Reviuzy edge fn proxy (~1h, Reviuzy)

**Files:**
- `supabase/functions/audit-pdf-stats-proxy/index.ts`

**Behavior:**
1. Strategist+ role check via existing brandGuard
2. Sign HMAC against AILYS_SERVICE_SHARED_SECRET
3. Fetch `https://www.ailysagency.ca/api/admin/audit-pdf-stats`
4. Return JSON to client unchanged
5. Cache response in edge memory 30s (avoid hammering AiLys)

**CI gate:** Reviuzy vitest covers it.

**Commit:** `feat(b44): audit-pdf-stats-proxy edge fn with strategist gate`

---

## B.4.4.Rvz.2 : Admin page + hook (~1.5h, Reviuzy)

**Files:**
- `src/pages/AuditPdfStats.tsx`
- `src/hooks/useAuditPdfStats.ts`
- Add nav entry in `ExpandableNavbar` under Admin section

**UI:**
- 3 stat cards: today count, 7-day count, today estimated cost CAD
- Table of last 50 invocations (timestamp, status, latency, reason)
- Refresh button
- Auto-refresh every 60s via React Query

**Acceptance:**
- Page renders without crash for strategist
- Page returns 403 for member role
- Cost card shows CAD with 2 decimals
- Table sortable by timestamp desc by default

**Commit:** `feat(b44): admin audit-pdf-stats page + hook + nav`

---

## B.4.4.Rvz.3 : Vitest cases (~30min, Reviuzy)

**Cases:**
1. Hook fetches and parses payload
2. Hook handles 503 from edge fn
3. Page renders empty state when no invocations
4. Page renders 50-row table when populated
5. Cost card formatting (CAD, 2 decimals)
6. Strategist+ guard rejects member role

**Commit:** `feat(b44): vitest for admin audit-pdf-stats`

---

## Hand-off checklist for next Reviuzy session

After AiLys ships B.4.4.AiLys.1 + B.4.4.AiLys.2:

1. Read this `02-sub-phases.md`
2. Verify AiLys endpoint live with: `curl https://www.ailysagency.ca/api/admin/audit-pdf-stats` (should return 401)
3. Deploy `audit-pdf-stats-proxy` edge fn
4. Set `AILYS_SERVICE_SHARED_SECRET` in Reviuzy edge fn env (same value as AiLys)
5. Build admin UI for B.4.4.Rvz.2
6. Add vitest for B.4.4.Rvz.3
7. Update Reviuzy STATE.md with commit hashes
8. Then tag `v0.5.0-pdf-export` on AiLys (the cross-repo dependency closes)
