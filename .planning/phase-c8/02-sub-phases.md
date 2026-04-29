# Phase C.8 : Sub-phases

Total estimate: ~32h. Time-box ceiling: 64h.

**Recommendation:** defer to Q3 2026 unless 5+ qualified partner applications arrive. This sub-phase is the most ambitious in Phase C; building speculatively wastes engineering capacity.

## Cross-repo split

| Repo | Sub-phases | Hours |
|---|---|---|
| AiLys | C.8.AiLys.1 (this commit) + C.8.AiLys.2 (partner application form, future) | 1.5h + 4h |
| Reviuzy | C.8.Rvz.1 to C.8.Rvz.6 | 26h+ |

## C.8.AiLys.1 : Help article + STATE handoff (~1.5h)

**Files:** `src/data/help-articles.ts` slug `partner-program-onboarding`, STATE.md.

**Content:** who can apply, requirements (verified business, 3+ existing clients, $X minimum margin retained), revenue split, support boundaries, Stripe Connect overview, brand guidelines for white-label.

**Commit:** `docs(c8): help article partner-program-onboarding + Reviuzy handoff`

## C.8.AiLys.2 : Partner application form (~4h, future)

**Files:** new route `/partner/apply` with multi-step form, JSON-LD Offer schema, dual-delivery (Supabase `partner_applications` + Resend admin alert).

## C.8.Rvz.1 : Migration + reseller schema (~4h)

`client_type='reseller'`, `reseller_parent_id`, `markup_pct`, `reseller_admin` role, `reseller_invoices` table.

## C.8.Rvz.2 : Stripe Connect integration (~8h)

OAuth onboarding, application fee config, webhook handler.

## C.8.Rvz.3 : Reseller dashboard + sub-tenant create (~6h)

`/partner/*` routes, sub-tenant CRUD with RLS, brand isolation per reseller.

## C.8.Rvz.4 : Markup pricing + invoice rollup (~4h)

Per-month consolidated invoice, transparency: AiLys cost vs reseller markup separated.

## C.8.Rvz.5 : RLS policies + isolation tests (~2h, 12 cases)

Cross-reseller blocking, sub-tenant unaware of reseller, strategist+ override.

## C.8.Rvz.6 : Production smoke + fraud monitoring (~2h)

Daily check on Stripe Connect KYC status, alert on suspicious patterns.

## Hand-off

1. Confirm 5+ partner applications first (gate this work)
2. Read this spec
3. Build C.8.Rvz.1-6 in order
