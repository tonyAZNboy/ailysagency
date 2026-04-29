# Phase C.6 : Test Matrix

## C.6.AiLys.1

| Gate | Type | Count | Status |
|---|---|---|---|
| 1. tsc | CI | 1 | required |
| 2. audit-translations-deep | CI | 1 | required |
| 3. audit-blog-translations | CI | 1 | required |
| 4. em-dash sweep | CI | 1 | required |
| 5. existing smokes (78 cases) | CI | 6 scripts | required |
| 6. NEW smoke | CI | n/a (docs only) | skip |
| 7. build | CI | 1 | required |
| 8. live curl | manual | n/a | skip |
| 9. browser viewport 375x812 + 768x1024 | manual | 2 | required |
| 10. FR-CA locale switch | manual | 1 | required |
| 11. admin panel | manual | n/a (lives in Reviuzy) | skip in AiLys |
| 12. EN+FR-CA help articles | manual | 1 article | required |
| 13. STATE.md same-commit | gate | 1 | required |

## C.6.Rvz.1 (Reviuzy migration + RLS test)

| Test | Cases |
|---|---|
| Migration applies cleanly | 1 |
| Migration `down` restores schema | 1 |
| RLS isolation: tenant A SELECT B | 1 |
| RLS isolation: tenant A INSERT B | 1 |
| RLS isolation: tenant A UPDATE B | 1 |
| RLS isolation: tenant A DELETE B | 1 |
| Strategist cross-tenant SELECT | 1 |
| Strategist cannot mutate | 1 |
| Service role full access | 1 |

**Total:** 9 cases.

## C.6.Rvz.2 (Per-adapter)

Per adapter (Yelp, Foursquare, BBB):
| Case | Notes |
|---|---|
| Submit succeeds | 200 from API mocked |
| Submit retries on 5xx | exponential backoff |
| Submit gives up after 3 retries | logs failed |
| Submit handles 4xx | logs failed, no retry |
| API key missing | returns "skipped, no_key" |
| Status query | round-trip |
| Idempotency on (tenant, directory, month) | second submit returns existing |

7 cases × 3 adapters = 21 cases.

## C.6.Rvz.3 (Edge fn)

15 cases:
1. Eligible tenant gets a run row
2. Ineligible tenant skipped
3. Tenant with auto_citation_batch_enabled=false skipped
4. NAP canonical missing : skip + alert
5. NAP differs from canonical : abort run
6. DRY_RUN mode : run row + no adapter calls
7. Adapter success path : counters incremented
8. Adapter partial failure : status=partial
9. Adapter all-fail : status=failed
10. Idempotency: same (tenant, month) on retry returns existing
11. Per-tier cadence respected (Core 5, Growth 10, Agency 15)
12. Round-robin directory selection across months
13. Jitter 0-3600s applied
14. Kill switch ENABLED=false : returns 503
15. Audit log written with no PII

## C.6.Rvz.4 (Admin panel)

6 cases:
| Test | Cases |
|---|---|
| Hook fetches last 50 runs | 1 |
| Hook respects RLS | 1 |
| Manual re-run rate-limit | 1 |
| Cost telemetry computes | 1 |
| Per-tenant toggle persists | 1 |
| Strategist+ guard rejects member | 1 |

## Cross-repo aggregate

- AiLys: 0 new automated tests (uses existing CI)
- Reviuzy: 51 new automated tests (9 RLS + 21 adapter + 15 edge + 6 admin)

## Manual operator gates (after Reviuzy ships)

1. Apply 3 migrations
2. Set 4 env vars (YELP_API_KEY, FOURSQUARE_API_KEY, BBB_PARTNER_KEY, ENABLED)
3. Pick 1 seed Growth tenant, run dry_run
4. Verify auto_batch_runs row + results JSONB shape
5. Flip DRY_RUN=false, run again, verify external API calls + log entries
6. Wait 24h for next cron, monitor
7. Check admin panel reads correctly
