# Phase C.6 : Threat Model

## Attack surface

| Surface | Owner | Notes |
|---|---|---|
| `citation-auto-batch` edge fn | Reviuzy | pg_cron daily 04:00 UTC, service_role |
| Directory adapters (Yelp, Foursquare, BBB, etc.) | Reviuzy | Outbound API calls with stored API keys |
| `auto_batch_runs` table | Reviuzy | RLS: members SELECT own, service_role INSERT |
| Admin panel /admin/citation-batches | Reviuzy | strategist+ role gate |

## Secrets touched

| Secret | Storage | Rotation |
|---|---|---|
| `YELP_API_KEY` | Reviuzy edge fn env | Rotate annually |
| `FOURSQUARE_API_KEY` | Reviuzy edge fn env | Rotate annually |
| `BBB_PARTNER_KEY` | Reviuzy edge fn env | Per BBB partner agreement |
| `CITATION_AUTO_BATCH_ENABLED` | Reviuzy edge fn env | Kill switch |
| `CITATION_AUTO_BATCH_DRY_RUN` | Reviuzy edge fn env | Default false in prod |

## RLS impact

`auto_batch_runs` table: members SELECT own tenant only, owner/admin/strategist SELECT + UPDATE-status, service_role full. Strategist cross-tenant SELECT via existing `is_ailys_strategist()` predicate.

## Vectors

### 1. API key leak
**Surface:** edge fn env vars. **Mitigation:** secrets via Supabase secrets manager, never logged. Rotation policy documented.

### 2. Submitting bad data to public directories
**Surface:** if our internal NAP gets corrupted, we'd publish wrong info to Yelp+. **Mitigation:** before each batch run, validate against `nap_snapshots` canonical lock. If NAP differs from canonical, skip and alert strategist. Reuses Phase 3.C2 NAP consistency checker.

### 3. Cost runaway
**Surface:** if a bug loops the batch, Foursquare API charges accumulate. **Mitigation:** per-tenant daily cap (max 5 directories/day/tenant), hard system cap (1000 requests/day across all tenants), kill switch.

### 4. Captcha triggering rate-limit ban
**Surface:** some directories detect "bot" patterns and IP-ban. **Mitigation:** spread submissions across the day (random delay 0-3600s), use partner-level credentials (not scraped). If a directory bans us, log + alert + remove from auto list permanently.

### 5. Idempotency: duplicate submissions
**Surface:** retry logic could submit twice. **Mitigation:** idempotency key = `(tenant_id, directory, month)`, unique constraint. ON CONFLICT skips.

### 6. PII in audit log
**Surface:** `auto_batch_runs.payload` JSONB. **Mitigation:** payload stores only request URL + status code + error message. NO email, NO phone, NO address (these are public NAP, but still policy: don't redundantly store).

### 7. Cross-tenant submission
**Surface:** if a bug uses tenant A's NAP for tenant B's submission. **Mitigation:** explicit tenant_id passed at every layer; service_role queries always include `WHERE tenant_id = $1`; vitest covers cross-tenant isolation per Section 6.

### 8. Directory API contract drift
**Surface:** Yelp changes their API and we silently fail. **Mitigation:** smoke test runs against each adapter on every deploy (production smoke). If failure rate > 20% over 7 days, alert + fall back to manual queue.

### 9. NAP drift mid-batch
**Surface:** strategist updates client NAP during a batch run; old NAP gets submitted. **Mitigation:** snapshot canonical NAP at run start; if canonical changes, abort run, log, retry next day.

### 10. Reseller / multi-tenant blast radius
**Surface:** a bug that affects all tenants at once. **Mitigation:** kill switch is global, plus per-tenant `tenants.auto_citation_batch_enabled` toggle defaults to false. New tenants opt-in via strategist.

## Fail-closed defaults

- `CITATION_AUTO_BATCH_ENABLED=false` (or unset) : edge fn returns 503
- `CITATION_AUTO_BATCH_DRY_RUN=true` : run completes, logs, but never calls external APIs
- Tenant `auto_citation_batch_enabled=false` (default) : tenant skipped
- Directory missing API key : adapter logs warning, skips, marks as "manual"
- NAP canonical lock missing : skip tenant, log

## Kill switches

- **Global:** `CITATION_AUTO_BATCH_ENABLED=false` : feature off for everyone
- **Per-tenant:** `tenants.auto_citation_batch_enabled=false`
- **Per-directory:** remove from `_shared/directories/index.ts` (redeploy)
- **Per-month:** delete row from `auto_batch_runs` to allow manual re-run
