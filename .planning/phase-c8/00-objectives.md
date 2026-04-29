# Phase C.8 : Reseller / partner onboarding stack (cross-repo)

## Business goal

Open a new revenue channel: agencies, freelancers, and consultants who want to white-label AiLys + Reviuzy to their own clients. Today this is impossible: there is no reseller dashboard, no per-reseller pricing markup, no consolidated billing, no isolation between reseller-managed clients and direct-AiLys clients.

C.8 ships:
1. New `client_type='reseller'` discriminator (Phase 4.5 already added `reviuzy_self_serve` and `ailys_managed`)
2. Reseller dashboard at `partner.ailysagency.ca` (or `partner.reviuzy.com` per reseller choice)
3. Sub-tenant management (reseller creates clients under their account)
4. Markup pricing (reseller sets their margin on top of AiLys cost)
5. Consolidated invoice (Stripe Connect or Stripe Billing portal per partner)
6. Reseller-only feature flags + branding controls

## Hours saved + revenue uplift

- **Hours saved:** N/A directly (this is a new channel, not optimizing existing)
- **Revenue uplift:** estimated $5k-$50k MRR from 5-15 active resellers within 6 months. High variance.
- **Why:** specialty agencies (legal, dental marketing) want our backend with their brand on top. Currently they would have to build it themselves; we capture them as resellers.

## Who benefits

- **Reseller (partner):** can sell SaaS without building one
- **Reseller's clients:** get AiLys + Reviuzy quality under a familiar agency brand
- **AiLys:** new MRR channel + ecosystem effects

## Deliverable scope

**AiLys side (this worktree):**
1. Help article `partner-program-onboarding` EN + FR-CA: who can apply, requirements, revenue split, support boundaries
2. STATE.md update with cross-repo handoff
3. Reviuzy spec in `02-sub-phases.md`

**Reviuzy side (separate session, large):**
1. Migration: `client_type='reseller'`, `reseller_parent_id` ref, `markup_pct`
2. New table: `reseller_invoices` (consolidated)
3. Edge fns: reseller-create-subtenant, reseller-billing-rollup, reseller-feature-toggle
4. New page route group `/partner/*` with brand isolation
5. Stripe Connect integration (or Stripe Billing portal v2)
6. Reseller-specific RLS: `is_reseller_admin(parent_id)` predicate

## Cost estimate per invocation

- **Stripe Connect:** $0.25 per payout (account billing) + 0.5% on transferred funds
- **At 10 resellers x 50 sub-clients each:** ~500 sub-clients, ~$125/mo Stripe fees
- **Anthropic / Resend / R2:** flat with existing infra

## Why this dep (Section 10)

**Possible new dep:** Stripe Connect SDK if not yet integrated. Otherwise: existing stack.

## Acceptance criteria

- [ ] Reseller can sign up via partner application form
- [ ] Reseller can create sub-tenants from their dashboard
- [ ] Reseller sees only their own sub-tenants (RLS enforced)
- [ ] Sub-tenants see only their workspace (no awareness of reseller)
- [ ] Markup applies to invoices: AiLys collects cost, reseller adds margin
- [ ] Reseller-only branding: logo + color + From email
- [ ] Help article + admin panel + Stripe Connect docs
- [ ] DRY_RUN mode for billing rollup tests

## Strategic note

Reseller channel must NOT cannibalize direct AiLys sales. Resellers target a market segment (specialty agencies) that wouldn't buy direct anyway. Marketing copy must clarify: "We sell direct to local businesses; partners sell to specialty agencies." Hostname split (`partner.*` vs `my.*`) reinforces the boundary.

This is the most ambitious sub-phase in Phase C. Recommend deferring until 5+ partners express interest in writing. Do NOT build speculative reseller infra without demand.
