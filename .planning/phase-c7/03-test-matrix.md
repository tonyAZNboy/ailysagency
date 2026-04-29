# Phase C.7 : Test Matrix

## C.7.AiLys.1

| Gate | Type | Required |
|---|---|---|
| 1. tsc | CI | yes |
| 2-4. i18n + blog + em-dash | CI | yes |
| 5. existing 6 smokes (78 cases) | CI | yes |
| 7. build | CI | yes |
| 9. browser viewport mobile + tablet | manual | yes |
| 10. FR-CA locale | manual | yes |
| 12. EN+FR-CA help articles | manual | yes |
| 13. STATE.md same-commit | gate | yes |

## C.7.Rvz.1 (Reviuzy migration + builder lib)

| Test | Cases |
|---|---|
| Migration applies | 1 |
| Migration `down` restores | 1 |
| RLS isolation (member, strategist, service) | 8 |
| buildRenewalSignal: 30d, 14d, 7d, cancelled, trialing | 5 |
| buildCitationCapSignal: at-cap, near-cap, under-cap, missing data | 4 |
| buildPhotoCapSignal: same 4 patterns | 4 |
| buildVisibilityPlateauSignal: plateau, improving, declining, missing | 4 |
| buildDashboardEngagementSignal: high engagement, low, none | 3 |
| Tier upgrade suggestion: sequential only | 3 |
| signal_strength clamped [0,1] | 1 |
| signal_data shape correctness | 1 |

**Total:** 35 cases (24 builder + 8 RLS + 3 schema).

## C.7.Rvz.2 (Edge fn)

16 cases:
1. Eligible tenant gets all applicable signals
2. Cancelled subscription skipped
3. Trialing subscription gets renewal_30d but no upsells
4. ON CONFLICT prevents duplicate signal same day
5. Signal_strength < 0.6 doesn't alert strategist
6. Signal_strength 0.6-0.8 alerts strategist but no email
7. Signal_strength >= 0.8 + opt-in : email sent
8. Signal_strength >= 0.8 + opt-out : no email, alert only
9. DRY_RUN mode : signals computed, no Resend
10. Stale data (>24h old) : skip tenant
11. Brand-aware From: ailys_managed → ailysagency.ca
12. Brand-aware From: reviuzy_self_serve → reviuzy.com
13. Email retry on Resend 5xx (1 retry)
14. Email give up on Resend 4xx (no retry)
15. Audit log written, no PII
16. Kill switch ENABLED=false : 503

## C.7.Rvz.3 (Admin panel)

7 cases:
| Test | Cases |
|---|---|
| Hook fetches last 50 | 1 |
| Hook respects RLS | 1 |
| Filter by signal_type | 1 |
| Mark actioned + reason validation | 1 |
| Conversion rate calc | 1 |
| Page strategist+ render | 1 |
| Page member 403 | 1 |

## Cross-repo aggregate

- AiLys: 0 new automated tests
- Reviuzy: 58 cases (35 + 16 + 7)

## Manual gates

1. Apply 3 migrations
2. Set env vars
3. DRY_RUN seed tenant test
4. Flip live
5. Monitor first week conversion
