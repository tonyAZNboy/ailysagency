# Phase C.7 : Threat Model

## Attack surface

| Surface | Owner | Notes |
|---|---|---|
| `compute-renewal-signals` edge fn | Reviuzy | pg_cron daily 06:00 UTC, service_role |
| `renewal_signals` table | Reviuzy | RLS: members SELECT own, service_role INSERT, strategist+ UPDATE |
| Optional client-facing renewal email | Reviuzy | Opt-in only; Resend, brand-aware From |
| Admin panel /admin/renewal-signals | Reviuzy | strategist+ |

## Secrets touched

| Secret | Storage | Notes |
|---|---|---|
| `RESEND_API_KEY` | Reviuzy edge fn env | Existing |
| `RENEWAL_SIGNALS_ENABLED` | Reviuzy edge fn env | Kill switch |
| `RENEWAL_SIGNALS_DRY_RUN` | Reviuzy edge fn env | Default false in prod |

No new secrets, no HMAC needed (internal cron only).

## RLS impact

`renewal_signals` table:
- members: SELECT own tenant_id (so the client can see their own signals if we ever expose them)
- owner/admin/strategist: SELECT + UPDATE (mark as actioned)
- service_role: full
- strategist cross-tenant SELECT via existing `is_ailys_strategist()` predicate

## Vectors

### 1. False-positive spam
**Surface:** signal generates an upsell email when it shouldn't. **Mitigation:** signal_strength threshold (>= 0.8 for client email, >= 0.6 for strategist alert). All signal logic unit-tested. Manual override per tenant.

### 2. PII leak in signal payload
**Surface:** `renewal_signals.signal_data` JSONB. **Mitigation:** signal_data stores only aggregate counts, ratios, and tier names. NO email, NO business name in clear, NO IP.

### 3. Cross-tenant signal mixup
**Surface:** if a bug attributes tenant A's signal to tenant B. **Mitigation:** explicit tenant_id at every layer; vitest covers cross-tenant isolation.

### 4. Client opt-in violations
**Surface:** sending upsell email to a tenant who opted out. **Mitigation:** edge fn checks `tenants.upsell_emails_enabled = true` BEFORE Resend call. Default OFF.

### 5. Renewal nudge on cancelled subscription
**Surface:** sending renewal email to someone who cancelled. **Mitigation:** check Stripe subscription status before email send. Skip if not active or trialing.

### 6. Email frequency abuse
**Surface:** if cron runs twice or signal regenerates, multiple emails go out. **Mitigation:** unique constraint on `(tenant_id, signal_type, generated_at::date)`; ON CONFLICT skip. Email send tracked separately with `email_sent_at` timestamp; never re-send same signal.

### 7. Stale data
**Surface:** signals computed against 7-day-old usage data give bad recommendations. **Mitigation:** edge fn requires data freshness (last 24h) before computing; if stale, skip and log.

### 8. Strategist gaming
**Surface:** strategist marks all signals "actioned" without action to clear inbox. **Mitigation:** action requires a reason text field (minimum 20 chars). Audit log preserved.

### 9. Tier jump signal abuse
**Surface:** signal recommends Agency tier for a Starter client (impossible jump). **Mitigation:** signal logic enforces sequential tier upgrade only (Starter to Core, Core to Growth, Growth to Agency). No skip-tier suggestions.

### 10. Subscription history privacy
**Surface:** strategist on tenant A sees tenant B renewal history. **Mitigation:** RLS scoped to own tenant or strategist+ role; never expose to client without their own tenant_id match.

## Fail-closed defaults

- `RENEWAL_SIGNALS_ENABLED=false` : entire feature off
- `RENEWAL_SIGNALS_DRY_RUN=true` : signals computed + logged but no Resend calls
- Tenant `upsell_emails_enabled=false` (default) : no client-facing email
- Subscription not active : skip the tenant
- Signal strength < 0.6 : skip (no strategist alert, no email)

## Kill switches

- Global env: `RENEWAL_SIGNALS_ENABLED=false`
- Per-tenant: `tenants.upsell_emails_enabled=false`
- Per-signal-type: comment out the signal builder in `_shared/renewalSignals.ts`
