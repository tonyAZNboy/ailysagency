# Phase D.2 : Test Matrix

| Sub-phase | Cases |
|---|---|
| D.2.AiLys.1 (help + privacy) | CI 1-7 + manual EN/FR + privacy diff review |
| D.2.Rvz.1 (materialized view) | 4: applies/cohorts<5-excluded/refresh-CONCURRENTLY/indexes |
| D.2.Rvz.2 (lib) | 30: bandLocationCount(4)/resolvePercentile(10)/formatCohortReport(8)/validateCohortAvailable(4)/cohort_size_band-no-exact(3)/edge cases (1) |
| D.2.Rvz.3 (endpoint) | 15: happy/opted-out/insufficient/unclassified/role/rate-limit/timing-padding/size-band/audit-log/timing-side-channel/error/industry-change/location-change/payload/single-tenant-edge |
| D.2.Rvz.4 (UI) | 8: happy/empty/opt-out/tooltip/timestamp/4-metrics/stale-time/mobile |
| D.2.Rvz.5 (toggle + email) | 6: existing-default-false/new-default-true/toggle-persists/email-sent/email-lang/retry |

**Total new automated:** 63 (Reviuzy)

## Manual gates

1. D.1 live in prod (gate)
2. Migration applied + view refreshed
3. 5+ tenants in industry to seed cohort
4. Test caller in opted-in tenant: see card with percentiles
5. Test caller in opted-out tenant: card shows opt-out state
6. Test caller in cohort < 5: card shows empty state
7. Mobile breakpoint at 375x812
8. Audit log shows cohort.stats.read events
9. Privacy email lands for existing tenants
10. 60-day grandfather period documented + tracked
