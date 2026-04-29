# Phase C.5 : Threat Model

## Attack surface

| Surface | Owner | Notes |
|---|---|---|
| pg_cron monthly trigger | Reviuzy Supabase | Runs as `service_role`, RLS bypass legitimate |
| `monthly-visibility-export` edge fn | Reviuzy | Internal, no public route; invoked by pg_cron only |
| PDF storage (Supabase Storage `executive-reports/{tenant_id}/monthly/{YYYY-MM}.pdf`) | Reviuzy | Tenant-scoped folder RLS (Phase 8.A pattern) |
| Resend send (recipient = client owner email) | Reviuzy | Brand-aware From per tenant (Phase 8.B `resolveReportBranding`) |
| Admin panel re-run button | Reviuzy | owner/admin/strategist role check + rate limit |

## Secrets touched

| Secret | Storage | Rotation |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Reviuzy edge fn env | Existing; no new exposure |
| `RESEND_API_KEY` | Reviuzy edge fn env | Existing |
| `MONTHLY_VISIBILITY_REPORT_ENABLED` | Reviuzy edge fn env | New kill switch |
| `MONTHLY_VISIBILITY_REPORT_DRY_RUN` | Reviuzy edge fn env | New, default `false` in prod |

NO new HMAC/secret/token. The cron is internal; no external HTTP-triggered invocation path.

## RLS impact

New table `monthly_visibility_reports`:
- members SELECT (own tenant only)
- owner/admin/strategist SELECT + UPDATE-status (for manual re-run)
- service_role full access (pg_cron + edge fn)
- INSERT via service role only (cron + manual re-run trigger)

Strategist cross-tenant SELECT path: AiLys strategists can read across tenants (Phase 4.5.5 `is_ailys_strategist` predicate), but cannot mutate.

## Vectors

### 1. Replay attack
**Surface:** edge fn invocation. **Mitigation:** edge fn is not externally addressable. Only pg_cron + admin panel manual trigger. Admin trigger has CSRF + auth + 1/hr rate limit per tenant.

### 2. Email injection / spoofing
**Surface:** Resend From + To headers. **Mitigation:** From comes from `resolveReportBranding` (whitelist of brand domains), To comes from `tenants.owner_email` (validated at signup). No user-controllable email field in the cron path.

### 3. PDF content injection
**Surface:** report data fields rendered into PDF. **Mitigation:** `@react-pdf/renderer` does not parse HTML; all strings are text-rendered. Already proven safe in Phase 8 + 12.F.

### 4. Storage path traversal
**Surface:** PDF storage path construction. **Mitigation:** path = `${tenant_id}/monthly/${YYYY}-${MM}.pdf` where tenant_id is a UUID validated by zod, YYYY-MM is computed server-side. No user input in path.

### 5. Cron concurrency
**Surface:** if a monthly run takes >1 min and the next month rolls over (impossible but defensive), or if admin manual re-run fires during scheduled run. **Mitigation:** unique `(tenant_id, month)` constraint on `monthly_visibility_reports` table prevents double-insert. Edge fn does INSERT...ON CONFLICT DO NOTHING.

### 6. DLQ poisoning
**Surface:** failure entries in `monthly_visibility_reports.error` field. **Mitigation:** error is a JSONB blob, only the edge fn writes it, RLS prevents tenant tampering.

### 7. Cost runaway
**Surface:** infinite loop in pg_cron (impossible by design) or admin button spam. **Mitigation:** cron is monthly schedule, admin re-run rate-limited 1/hr/tenant + only strategist+ can fire it.

### 8. Email bombing
**Surface:** if pg_cron retry logic fires twice. **Mitigation:** unique constraint on `(tenant_id, month)` + email_sent_at timestamp gates send (skip if already sent).

### 9. PII leak in audit log
**Surface:** `monthly_visibility_reports` table. **Mitigation:** store `recipient_email_hash` (SHA-256) instead of plain email. Original email stays in `tenants` table only.

### 10. Brand mismatch / wrong From address
**Surface:** ailys_managed tenant receives report with reviuzy.com From. **Mitigation:** `resolveReportBranding(tenant)` already handles this per Phase 8.B; reuse without modification.

## Fail-closed defaults

- `MONTHLY_VISIBILITY_REPORT_ENABLED` missing or != `'true'` → edge fn returns 503, cron logs skip-disabled
- `MONTHLY_VISIBILITY_REPORT_DRY_RUN === 'true'` → edge fn renders PDF + logs intended recipient, but skips Resend send and storage upload; updates report row with `status='dry_run'`
- Resend API key missing → DLQ row created, no email attempted
- PDF render error → DLQ row + Sentry/log capture, no partial email
- Tenant has `auto_monthly_report=false` → cron skips, no row created

## Kill switch

- **Global:** `MONTHLY_VISIBILITY_REPORT_ENABLED=false` → entire feature off for all tenants
- **Per-tenant:** `tenants.auto_monthly_report=false` → just this tenant skipped
- **Per-month:** delete row from `monthly_visibility_reports` to allow manual re-run in same month (or use admin re-run button)
