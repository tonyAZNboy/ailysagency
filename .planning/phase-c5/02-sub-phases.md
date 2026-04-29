# Phase C.5 : Sub-phases (atomic, mergeable)

Total estimate: ~10h. Time-box ceiling: 20h (2x rule, Section 11).

## Cross-repo split

| Repo | Sub-phases | Hours | Owner |
|---|---|---|---|
| AiLys (this worktree) | C.5.AiLys.1 | 2h | This session |
| Reviuzy (separate session/PR) | C.5.Rvz.1 → C.5.Rvz.4 | 8h | Follow-up Reviuzy session |

---

## C.5.AiLys.1 : Help center articles + STATE handoff (~2h)

**Goal:** EN + FR-CA help articles describing the monthly report feature, no proprietary AI provider disclosure.

**Files:**
- `src/data/help-articles.ts` : 1 new article ID `monthly-visibility-report`, 2 locales (EN, FR-CA), follows existing pattern
- `STATE.md` : Phase C.5 entry with Reviuzy handoff spec

**Acceptance:**
- Article visible at `/help/monthly-visibility-report` and `/fr/aide/monthly-visibility-report`
- Article describes: what's in the report, when it arrives, how to opt out, privacy
- NO mention of Anthropic, Claude, scoring formula, vendor APIs (hard rule #10)

**Smoke:** existing `audit-blog-translations.mjs` covers help articles indirectly via translation key parity. No new smoke needed for help content.

**CI gate:** uses existing gates 1-7. No new gate.

**Commit message:** `docs(c5): help articles for monthly visibility report (EN + FR-CA) + Reviuzy handoff in STATE.md`

---

## C.5.Rvz.1 : Migration + RLS isolation test (~2h, Reviuzy)

**Goal:** `monthly_visibility_reports` table with RLS + multi-tenant isolation test.

**Files (Reviuzy repo):**
- `supabase/migrations/20260430000000_create_monthly_visibility_reports.sql`
- `src/test/rls/monthlyVisibilityReports.isolation.test.ts` (vitest, Section 6 pattern)

**Schema:**
```sql
CREATE TABLE monthly_visibility_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  month TEXT NOT NULL CHECK (month ~ '^\d{4}-\d{2}$'),
  status TEXT NOT NULL CHECK (status IN ('pending','rendered','sent','dry_run','failed')),
  pdf_storage_path TEXT,
  email_sent_at TIMESTAMPTZ,
  recipient_email_hash TEXT,
  error JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, month)
);
ALTER TABLE monthly_visibility_reports ENABLE ROW LEVEL SECURITY;
-- RLS policies: members SELECT own, strategists SELECT all, service_role full
```

**Migration `down`:** `DROP TABLE monthly_visibility_reports CASCADE;` : tested locally, no data loss risk (this table has no upstream FK references at create time).

**Acceptance:**
- Migration applies cleanly on fresh schema
- 6 RLS isolation tests pass (Section 6 pattern: tenant A read/write, tenant B read/write, strategist cross-read, strategist no-mutate)

**CI gate:** existing Reviuzy vitest run covers it.

**Commit message:** `feat(c5): monthly_visibility_reports table + RLS isolation test`

---

## C.5.Rvz.2 : Edge fn `monthly-visibility-export` + DRY_RUN mode (~3h, Reviuzy)

**Goal:** orchestrator that fetches data, renders PDF, uploads to storage, emails via Resend.

**Files (Reviuzy repo):**
- `supabase/functions/monthly-visibility-export/index.ts`
- `supabase/functions/_shared/monthlyReportPayload.ts` (data fetcher)
- `src/test/edge/monthlyVisibilityExport.test.ts` (vitest, ~12 cases)

**Behavior:**
1. Resolve target tenants: `tenants WHERE auto_monthly_report=true AND ailys_tier IN ('growth','agency') OR tier='pro'`
2. For each tenant, INSERT INTO monthly_visibility_reports (tenant_id, month, status='pending') ON CONFLICT DO NOTHING
3. If row inserted (new this month), proceed:
   - Fetch last 30d data from ai_visibility_runs + llm_citation_snapshots + keyword_rankings
   - Build payload via existing `visibilityReportBuilder` lib (Phase 12.F)
   - Render PDF via existing ExecutiveReportPDF Document component
   - DRY_RUN check: if DRY_RUN=true, set status='dry_run', skip upload + Resend, return summary
   - Upload to `executive-reports/{tenant_id}/monthly/{YYYY-MM}.pdf`
   - Send email via Resend with brand-aware From + To = tenant.owner_email
   - Update row: status='sent', email_sent_at=now(), pdf_storage_path, recipient_email_hash=sha256(email)
4. On error: status='failed', error=jsonb_payload (no PII)

**Test cases (12):**
1. Eligible tenant gets row + PDF + email
2. Ineligible tenant (Starter tier) skipped
3. Tenant with auto_monthly_report=false skipped
4. Same month re-run: ON CONFLICT prevents double-send
5. DRY_RUN mode: row inserted with status='dry_run', no Resend call
6. Resend failure: status='failed', error logged
7. PDF render error: status='failed', no email
8. Email hash matches sha256(owner_email)
9. Path traversal attempt blocked (UUID validation)
10. Strategist re-run via admin: respects 1/hr rate limit
11. Brand-aware From: ailys_managed → ailysagency.ca, reviuzy_self_serve → reviuzy.com
12. Kill switch ENABLED=false: entire fn returns 503

**CI gate:** Reviuzy vitest gate.

**Commit message:** `feat(c5): monthly-visibility-export edge fn with DRY_RUN + 12 vitest`

---

## C.5.Rvz.3 : pg_cron schedule + kill switch wiring (~1h, Reviuzy)

**Goal:** monthly schedule fires the edge fn on the 1st at 09:00 UTC.

**Files (Reviuzy repo):**
- `supabase/migrations/20260430010000_schedule_monthly_visibility.sql`

**Schema:**
```sql
SELECT cron.schedule(
  'monthly-visibility-report',
  '0 9 1 * *',
  $$SELECT net.http_post(
    url := 'https://qucxhksrpqunlyjjvuae.supabase.co/functions/v1/monthly-visibility-export',
    headers := jsonb_build_object('Authorization', 'Bearer ' || current_setting('app.service_role_key'))
  )$$
);
```

**Migration `down`:** `SELECT cron.unschedule('monthly-visibility-report');`

**Operator action:** must `SET app.service_role_key = '<key>'` in Supabase or use Vault.

**Commit message:** `feat(c5): pg_cron monthly schedule + ops doc`

---

## C.5.Rvz.4 : Admin panel surface + cost telemetry (~2h, Reviuzy)

**Goal:** strategist UI to view last 50 invocations, manual re-run, per-tenant opt-out.

**Files (Reviuzy repo):**
- `src/pages/MonthlyReportsAdmin.tsx`
- `src/hooks/useMonthlyReports.ts`
- Add nav entry to `ExpandableNavbar`
- 6 vitest cases for hook + RLS

**Surface:**
- Table: tenant, month, status, sent_at, error preview
- Manual re-run button (per row, rate-limited 1/hr/tenant, calls edge fn with `force_rerun=true` param)
- Cost telemetry card: total emails this month + estimated $ (50 × $0.0001)
- Per-tenant opt-out toggle in tenant detail dialog (sets `tenants.auto_monthly_report`)

**CI gate:** Reviuzy vitest.

**Commit message:** `feat(c5): admin panel for monthly reports + cost telemetry + opt-out toggle`

---

## Hand-off checklist for next Reviuzy session

The next Reviuzy-side session should:

1. Read this `02-sub-phases.md`
2. Confirm migrations + tests for C.5.Rvz.1
3. Implement edge fn for C.5.Rvz.2 with all 12 test cases
4. Wire pg_cron for C.5.Rvz.3
5. Build admin UI for C.5.Rvz.4
6. Update Reviuzy STATE.md with commit hashes
7. Cross-link back to AiLys help articles for C.5

After Reviuzy lands C.5.Rvz.1-4, AiLys help articles already in production will be accurate. No further AiLys code change required.
