# Phase B.4.4 : Audit-PDF admin observability + cost telemetry (cross-repo)

## Business goal

Operators (you, future strategists) need to see in one place:
1. Last 50 PDF audit invocations (timestamp, status, latency, IP/email hash, reason)
2. Daily volume + 7-day rolling count
3. Cost estimate per day in CAD
4. Feature kill-switch state (on, off)
5. Rate-limit headroom per IP and per email-day

Today this lives only in Cloudflare Logpush JSON logs, which are searchable but not summarised. Operators have no toggle, no daily count, no cost view.

B.4.4 surfaces this in the Reviuzy admin panel (where every other admin surface lives, per architecture decision option A) by exposing a HMAC-signed read-only stats endpoint in AiLys, called from a new Reviuzy edge function.

## Hours saved at fleet scale

- **Per operator per week:** ~30 min saved (no more grepping Logpush)
- **At 50 clients:** stays small (audit-pdf is a public endpoint, not per-tenant), ~2h/mo saved
- **Bigger value:** observability prevents abuse going undetected. Today, a malicious script could exhaust the 5/IP/hour rate limit + 50/email/day rate limit; without this surface, we'd notice only via Resend bill spike.

## Who benefits

- **Staff:** strategists can see if a client requested the PDF yesterday before asking
- **Operator (you):** rate-limit abuse alarm before the Resend bill arrives
- **Compliance:** retention story for audit trail (last 50, 7-day TTL is documented)

## Deliverable scope

**AiLys side (this worktree):**
1. Augment `functions/api/audit-pdf.ts` with KV ring-buffer write (key `audit_pdf_log:<ts_ms>`, TTL 7 days, non-blocking via `ctx.waitUntil`)
2. New endpoint `functions/api/admin/audit-pdf-stats.ts` (GET only, HMAC service auth)
3. Add `reviuzy-admin-audit-pdf-stats` to ALLOWED_CALLERS in `serviceAuth.ts`
4. Smoke script `scripts/smoke-admin-audit-pdf-stats.mjs` (HMAC, payload shape, error modes)
5. Wire smoke into deploy.yml as CI gate 10
6. STATE.md update

**Reviuzy side (separate session/PR):**
1. Edge fn `audit-pdf-stats-proxy` calls AiLys with HMAC, returns to UI
2. Admin page `src/pages/AuditPdfStats.tsx` with table + counters + toggle
3. Hook `useAuditPdfStats` (React Query, 60s polling)
4. Nav entry in ExpandableNavbar (strategist+ only)

## Cost estimate per invocation (paid-API consumers)

- **Anthropic:** ZERO (no LLM calls)
- **Resend:** ZERO (no email)
- **R2:** ZERO (no storage writes)
- **KV reads:** stats endpoint reads up to 50 keys per call. Cloudflare KV: $0.50/million reads. At 60s polling x 50 reads = 72,000 reads/day = $0.04/day worst case. Negligible.
- **KV writes (audit-pdf augmentation):** 1 extra write per invocation. At 1,000 PDFs/day = $5/day worst case. Acceptable.

## Monthly budget cap + alert

- **Cap:** $50/mo total across the audit-pdf surface
- **Alert:** if KV usage > 80% of monthly cap, Cloudflare email to operator

## Why this dep (Section 10)

**No new dependencies.** Reuses:
- `functions/lib/serviceAuth.ts` (HMAC pattern from C.1)
- Cloudflare KV (already bound for rate-limit)
- React Query in Reviuzy (already in use)

## Acceptance criteria

- [ ] AiLys endpoint returns valid JSON when called with valid HMAC
- [ ] AiLys endpoint returns 401 on missing/invalid HMAC, 400 on missing caller, 403 on caller not allowlisted, 503 on missing secret
- [ ] Ring buffer writes async (no latency added to PDF render path)
- [ ] Smoke script covers 12+ cases including replay window, malformed JSON, caller allowlist
- [ ] Reviuzy admin panel shows last 50 invocations + daily count + cost (after Reviuzy session ships)
- [ ] No PII in clear in any KV key or value
