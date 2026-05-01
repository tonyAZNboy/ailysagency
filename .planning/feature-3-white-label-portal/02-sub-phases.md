# Feature 3 sub-phase breakdown

## F3.1 — DB schema + RLS hardening

**Repo:** AiLys + Reviuzy (synchronized)
**Time-box:** 1 session (~6h)

- AiLys migration: `agency_partners` table (id, slug uniq, custom_domain nullable, brand_name, logo_url, primary_color, favicon_url, og_image_url, email_from, billing_model enum, commission_pct numeric, monthly_seat_fee numeric, status enum)
- AiLys migration: `partner_invitations` (id, partner_id FK, invited_email, status enum, token_hash, expires_at)
- AiLys migration: `partner_revenue_log` (id, partner_id, period_start, period_end, sub_client_billings_cad numeric, partner_share_cad numeric, ailys_cut_cad numeric, paid_at nullable)
- AiLys migration: `tenants` ADD COLUMN `agency_partner_id uuid REFERENCES agency_partners(id)` + `agency_relationship enum('own', 'managed_by_partner') DEFAULT 'own'`
- Reviuzy migration: same `agency_partner_id` column on Reviuzy tenants table for cross-repo consistency
- RLS policies: partner_admin role can SELECT only tenants WHERE agency_partner_id = current_partner_id() AND tenants.agency_relationship = 'managed_by_partner'
- Smoke `smoke-partner-rls.mjs` (15 cases minimum: cross-partner read denied, cross-sub-client read denied within same partner, partner cannot escalate to god_mode, etc.)

## F3.2 — Subdomain + custom domain routing

**Repo:** AiLys
**Time-box:** 1 session (~5h)

- Pages middleware (in `_middleware.ts` or per-function): extract hostname, look up `agency_partners` by `slug` or `custom_domain`, inject `request.partner` context
- Cloudflare for SaaS API integration: partner adds CNAME → AiLys validates → cert auto-issued
- Domain claim flow: partner-portal UI shows DNS record to add, polling check, status displayed
- `BrandContext` provider in React: replaces hardcoded AiLys logo/colors/email when partner context present
- Smoke: hit subdomain + custom domain, verify brand override propagates through all renders

## F3.3 — Partner portal + sub-client onboarding

**Repo:** AiLys
**Time-box:** 2 sessions (~12h)

- `/partner-portal`: dashboard with sub-clients table, aggregate metrics (avg AI Visibility score, total citations, GBP post velocity), revenue YTD, churn alerts (sub-client tier downgrades or cancellations)
- `/partner-portal/onboard`: invitation wizard (email + sub-client business name + tier preset)
- `/partner-settings`: brand panel, billing config, team members (with seat limit enforcement), custom domain panel
- Sub-client onboarding flow: invitation email lands on `{partner-domain}/onboarding/:token`, partner-branded UI throughout, no AiLys mention until billing receipt
- Smoke + e2e UI tests via preview

## F3.4 — Branded PDF generator + email transactional

**Repo:** AiLys + Reviuzy
**Time-box:** 1 session (~5h)

- Extend `functions/lib/pdf/builder.ts` to accept `BrandContext` parameter; logo + primary color + email_from sourced from partner record
- All transactional emails (Resend) accept brand override: from-name, from-email, footer logo
- Reviuzy PDF generators (audit-pdf, deep-audit-pdf) get same brand-override pattern
- Smoke: render same PDF with default brand vs partner brand, assert byte-level structure identical, only logo + colors + email differ

## F3.5 — Stripe Connect billing + reconciliation cron

**Repo:** AiLys
**Time-box:** 1 session (~6h)

- Stripe Connect Standard accounts (vs Express): partner manages their own Stripe; AiLys takes platform fee via Connect transfers
- Sub-client billing: AiLys invoices sub-client, Stripe automatically splits per partner commission_pct
- Nightly cron `reconcile-partner-revenue`: aggregates all partner sub-client billings for previous day, writes to `partner_revenue_log`, asserts conservation (partner_share + ailys_cut = sub_client_billings)
- Admin panel `/admin/partners`: list partners, drill-down on revenue + sub-client tier mix
- Smoke + integration test against Stripe test mode

## F3.6 — Help center articles + partner-facing docs

**Repo:** AiLys
**Time-box:** 1 session (~4h)

- EN + FR-CA articles in `src/data/help-articles/`:
  - `partner-onboarding-checklist`
  - `customizing-your-white-label-brand`
  - `aggregate-metrics-explained`
  - `billing-and-revenue-share`
  - `inviting-sub-clients`
  - `removing-a-sub-client`
- Per hard rule #10: articles must NOT name AiLys vendor stack (Anthropic, Stripe Connect specifics, Cloudflare); refer to "the AiLys platform" only
- STATE.md update + tag `v0.15.0-white-label-complete`

## Dependencies

F3.1 → F3.2 → F3.3 → F3.4 → F3.5 → F3.6 (mostly serial). F3.4 can start after F3.1 in parallel with F3.2.

## Definition of Done

- [ ] Test partner agency provisioned in staging with custom domain
- [ ] 3 test sub-clients onboarded via invitation flow
- [ ] All branded PDFs render with partner brand
- [ ] Stripe Connect billing flow tested in test mode with reconciliation match
- [ ] RLS isolation verified across all tables
- [ ] Help articles live before partner agencies onboarded
- [ ] Sentry alerts on cross-partner query attempts (zero in 30-day staging window)
