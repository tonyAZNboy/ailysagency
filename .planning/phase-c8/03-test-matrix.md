# Phase C.8 : Test Matrix

## C.8.AiLys.1

| Gate | Type | Required |
|---|---|---|
| 1-7. CI gates (tsc, i18n, blog, em-dash, smokes, build) | CI | yes |
| 9. browser viewport mobile + tablet | manual | yes |
| 10. FR-CA locale | manual | yes |
| 12. EN+FR-CA help article | manual | yes |
| 13. STATE.md same-commit | gate | yes |

## C.8.Rvz.1 (reseller schema)

12 cases: migration up/down, RLS reseller-admin own SELECT, cross-reseller blocked at SELECT/INSERT/UPDATE/DELETE, sub-tenant unaware of reseller, strategist+ cross-reseller SELECT, role-tier permissions (admin vs viewer vs support).

## C.8.Rvz.2 (Stripe Connect)

15 cases: OAuth onboarding happy path, OAuth declined, KYC pending, application fee correctly applied at charge, webhook signature verified, replay window enforced, refund pass-through, reseller payout schedule, multi-currency.

## C.8.Rvz.3 (Dashboard)

10 cases: sub-tenant create, edit, suspend, list paginated, RLS-scoped to own parent_id, brand isolation respected, cross-reseller 403.

## C.8.Rvz.4 (Markup)

8 cases: markup_pct applied to invoice, transparency line items, edge cases (markup=0, markup=200%, currency mismatch).

## C.8.Rvz.5 (Isolation tests)

12 cases per Section 6 pattern.

## C.8.Rvz.6 (Smoke)

5 cases: daily KYC check, alert thresholds, dashboard reachability, application flow end-to-end.

## Aggregate

- AiLys: 0 new automated tests
- Reviuzy: 62 new vitest cases

## Manual gates (after Reviuzy ships)

1. Onboard 1 test reseller end-to-end
2. Verify markup applies in Stripe
3. Create 2 sub-tenants under that reseller
4. Cross-check RLS isolation manually
5. Trigger KYC fail flow on staging
