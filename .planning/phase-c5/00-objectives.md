# Phase C.5 : Monthly Visibility Report scheduled export + email

## Business goal

Each Agency-tier client (and Growth+, configurable) receives a branded monthly Visibility Report PDF in their inbox on the 1st of every month, automatically. Today the strategist compiles this manually for each client. C.5 makes it automatic.

## Hours saved at fleet scale

- **Per client per month:** ~1h strategist time (compile data, render PDF, write email body, send)
- **At 50 clients fleet-wide:** ~50h/mo saved
- **Strategist-FTE unlock:** 0.3 FTE at 50 clients, 0.6 FTE at 100 clients

## Who benefits

- **Client:** receives report on time every month, no chasing, no human delay; reinforces "automated agency" positioning
- **Staff:** strategist no longer compiles and sends 50 reports manually; works only on QA exceptions and strategic interpretation
- **Partner (resellers, future C.8):** white-label report goes out under the partner's brand automatically

## Deliverable scope

**AiLys side (this worktree):**
1. 2 help center articles (EN + FR-CA) describing the feature, schedule, opt-out path
2. STATE.md update with C.5 progress + cross-repo handoff to Reviuzy
3. Documentation of the Reviuzy sub-phases in `02-sub-phases.md` for follow-up session

**Reviuzy side (separate repo, separate session/PR):**
1. Migration `20260430000000_create_monthly_visibility_reports.sql` : `monthly_visibility_reports` table (tenant_id, month, status, pdf_storage_path, email_sent_at, recipient_email_hash, error)
2. Edge fn `monthly-visibility-export` : orchestrator: fetch data → render PDF → upload to storage → send email via Resend → log to table
3. pg_cron schedule: `0 9 1 * *` (1st of each month, 09:00 UTC)
4. DRY_RUN env flag (Section 7)
5. Kill switch env: `MONTHLY_VISIBILITY_REPORT_ENABLED` (fail-closed)
6. Admin panel surface: list last 50 invocations, manual re-run button, per-tenant opt-out toggle

## Cost estimate per invocation (paid-API consumers)

- **Resend email:** ~$0.0001/email (US pricing tier, free up to 3000/mo). Monthly volume at 50 clients = 50 emails. Cost ~$0.005/mo. Negligible.
- **R2 storage:** PDF ~50KB. 50 PDFs × 12 months retention = 30MB. R2 first 10GB free. Negligible.
- **Anthropic:** ZERO. Report uses pre-computed data already in tables (ai_visibility_runs, llm_citation_snapshots, keyword_rankings). No new LLM calls.

## Monthly budget cap + alert

- **Cap:** $5/mo for the entire C.5 surface (covers 5,000 emails worst case)
- **Alert:** Resend dashboard webhook to operator email when 80% reached. No app-level wiring needed at this volume.

## Why this dep (Section 10)

**No new dependencies.** Reviuzy already has:
- `@react-pdf/renderer` (Phase 8 ExecutiveReportPDF)
- `visibilityReportBuilder` lib (Phase 12.F)
- `resolveReportBranding` (Phase 8.B)
- `Resend` SDK (already in use)
- `pg_cron` (already enabled in Supabase)

C.5 is pure orchestration over existing primitives.

## Acceptance criteria

- [ ] AiLys help articles live in production EN + FR-CA, no proprietary AI provider mention
- [ ] Reviuzy migration applied + edge fn deployed + pg_cron registered (operator action)
- [ ] DRY_RUN end-to-end test successful for 1 seed Agency tenant
- [ ] First live monthly run on 1st of next month: 100% delivery rate or DLQ entry per failure
- [ ] Cost telemetry: monthly_visibility_reports table acts as audit log, admin panel queries it
