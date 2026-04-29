# Phase C.9 : Test Matrix

## C.9.AiLys.1

| Gate | Type | Required |
|---|---|---|
| 1-7. CI gates | CI | yes |
| 9. browser viewport mobile + tablet | manual | yes |
| 10. FR-CA locale | manual | yes |
| 12. EN+FR-CA help article | manual | yes |
| 13. STATE.md same-commit | gate | yes |

## C.9.Rvz.1 (builder lib)

30+ cases:
- Each of 5 components: edge cases (0 data, all data, partial data, missing source table)
- Score clamped 0-100
- Components sum to score with weights
- formula_version stored
- RLS isolation 8 cases

## C.9.Rvz.2 (Edge fn)

12 cases:
- Eligible tenant gets score row
- Cancelled tenant skipped
- ON CONFLICT prevents same-day duplicate
- trend_7d computed correctly when prior data exists
- trend_30d computed correctly when prior data exists
- Score < 40 triggers alert
- Trend < -10 triggers alert
- Score >= 40 + trend stable: no alert
- DRY_RUN: row written, no alerts
- Kill switch: 503
- Audit log no PII
- Multiple alerts on same day deduplicated

## C.9.Rvz.3 (Admin panel)

8 cases:
- Leaderboard sorted by score asc
- Trend chart 90d
- Per-component drill-down
- Filter by formula_version
- Strategist+ guard
- Member 403
- Empty state
- Manual recompute button (rate-limited)

## Cross-repo aggregate

- AiLys: 0 new automated tests
- Reviuzy: 50+ vitest cases

## Manual gates

1. Apply 2 migrations
2. Set env vars
3. DRY_RUN with 5 seed tenants
4. Verify score distribution looks sensible
5. Flip live
6. Quarterly retro: precision/recall vs actual churn
