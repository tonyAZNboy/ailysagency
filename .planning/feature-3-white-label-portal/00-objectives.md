# Feature 3: White-Label Agency Portal (AiLys + Reviuzy)

## Business goal

Resellable AiLys for other Quebec/Canadian agencies. Partner agencies white-label the platform under their brand, charge their own clients, AiLys takes a revenue share. Turns AiLys into "the platform other agencies use" instead of just an end-customer SaaS. Opens a B2B2B revenue channel that does not require AiLys to manually onboard each end-client.

## Hours saved + revenue uplift

- **Revenue model:** rev share OR per-seat fee on partner-provisioned tenants
- **Pricing tiers proposed:**
  - Agency Starter: $499/mo for 5 sub-client seats + 30% rev share on sub-client subscriptions
  - Agency Core: $999/mo for 15 sub-client seats + 25% rev share
  - Agency Growth: $1,999/mo for 50 sub-client seats + 20% rev share
  - Agency Enterprise: custom
- **Target:** 5 partner agencies in 12 months × avg 10 sub-clients × avg $400 sub-client MRR × 25% rev share = $5k/mo + $999/mo seat fees × 5 = ~$10k MRR at scale
- **Strategist hours saved:** partner agency handles their own sub-client strategy; AiLys provides platform. ~20h/mo saved per partner.

## Who benefits

- **Partner agency:** gets a white-labeled SaaS with full AiLys feature set under their brand without needing to build SaaS infra
- **Sub-clients:** get the same AiLys quality through their existing trusted agency relationship
- **AiLys operator:** new revenue channel with low marginal cost per seat

## Deliverable scope

**AiLys side (this repo, primary):**
1. Migrations: `agency_partners`, `partner_invitations`, `partner_revenue_log`; tenants table gets `agency_partner_id` nullable FK + `agency_relationship` enum
2. Cloudflare for SaaS integration: dynamic SSL for partner custom domains; CNAME validation flow
3. Subdomain routing: `{partner-slug}.ailysagency.ca` OR custom domain; pages-functions middleware extracts partner from hostname, injects brand context into all renders
4. `/partner-portal` dashboard: sub-clients list, aggregate AI Visibility metrics, revenue YTD, churn alerts, onboard new client wizard
5. `/partner-settings`: brand customization (logo, primary color, favicon, OG image, email-from), billing config, team members (with seat limit), domain management
6. Sub-client onboarding: agency invites via email; sub-client lands on partner-branded onboarding flow; no AiLys branding visible
7. Branded PDF generator: partner logo replaces AiLys logo; partner colors override cyan; partner email-from on transactional sends
8. Help center articles for partners EN+FR-CA: "How to onboard a sub-client", "Managing your white-label brand", "Reading aggregate metrics", "Billing and revenue share explained"

**Reviuzy side:**
1. Tenant model gains `agency_partner_id` field (mirrors AiLys); RLS tightened so partner_admin role can read sub-client data only when agency_partner_id matches
2. White-label PDF support (extends existing PDF builders to accept brand override)

**Stripe side:**
1. Stripe Connect setup: each partner is a Connect account; AiLys is platform; sub-client billings flow to partner with rev share split
2. Or per-partner Stripe customer if Connect proves heavy for MVP

## Cost estimate per invocation

- **Cloudflare for SaaS:** ~$2/partner/mo for SSL custom domain, plus per-request fees absorbed in Pages plan
- **Stripe Connect:** 0.25% + $0.25 per payout (paid by partner from rev share)
- **Anthropic:** zero (admin/portal is deterministic)
- **Total:** marginal cost per partner ~$5/mo; pricing model produces ≥10x margin

## Why this dep (Section 10)

**Possible new deps:**
- Stripe Connect: existing Stripe SDK supports it ✅
- Cloudflare for SaaS API: native Cloudflare Pages, no SDK ✅
- Brand-aware PDF: extend existing pdf-lib generators ✅

**Net new deps: ZERO.**

## ISO gates required

- [ ] RLS isolation test (CRITICAL): partner A cannot read partner B data; sub-client A cannot read sub-client B even within same partner
- [ ] Custom domain SSL test: certificate auto-issued within 60s of CNAME verification
- [ ] Branded PDF render parity: logo + colors + email-from + email-reply-to all swapped, content identical to AiLys version
- [ ] Billing reconciliation: nightly cron that asserts (sum of partner rev share) + (AiLys cut) = sum of sub-client billings
- [ ] Sentry on every cross-tenant query attempt (alert on first cross-partner data access in code path)
- [ ] Audit log on every partner-admin action that touches a sub-client
- [ ] Partner invitation tokens: signed JWT with 72h expiry, single-use
- [ ] Help articles live before partner onboarding opens

## Time-box estimate

**6 sub-phases, ~8 sessions total** (this is the most complex of the 5 features; multi-tenancy + custom-domain + Stripe Connect + branded surfaces all multiply).

See `02-sub-phases.md` for breakdown.
