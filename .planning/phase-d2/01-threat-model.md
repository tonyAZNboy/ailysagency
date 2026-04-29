# Phase D.2 : Threat Model

## Attack surface

| Surface | Owner |
|---|---|
| `cohort_benchmarks` materialized view | Reviuzy DB |
| `_shared/cohortBenchmarks.ts` | Reviuzy lib |
| `dashboard-cohort-stats` edge fn | Reviuzy, member role required |
| `/dashboard/visibility` cohort cards | Reviuzy UI |
| Opt-out toggle in tenant settings | Reviuzy |

## Secrets

No new secrets. Reuses service_role for view refresh.

## RLS impact

Materialized view: NO direct RLS (views can be queried via edge fn that scopes to caller's cohort). Strategist can SELECT all cohorts for support.

Original tables (citation_submissions, ai_visibility_runs, etc.) keep their RLS unchanged. The view aggregates server-side via service_role.

## Vectors

1. **De-anonymization via small cohort**: if cohort has 1-4 tenants, percentile reveals individual data. Mitigation: HAVING COUNT(DISTINCT tenant_id) >= 5 in the view query. Cohorts below threshold excluded.
2. **De-anonymization via identifying ratios**: if a tenant's score is unusually high, the sole tenant in the percentile range could be identified. Mitigation: bin percentiles into 10-percentile buckets; never expose raw rank.
3. **Tenant opt-out bypass**: if opted-out tenant data is included in cohort, anonymity violated. Mitigation: view WHERE clause excludes `tenants.cohort_benchmarking_enabled = false`.
4. **Time-series re-identification**: if cohort changes month-to-month, attacker can intersect to identify a tenant. Mitigation: stable cohort definition (industry + location_count_band only; not per-month grouping).
5. **Insider abuse (strategist exfil)**: strategist could SELECT raw cohort and de-anonymize. Mitigation: strategist queries audit-logged via D.1; quarterly review of cohort access patterns.
6. **Cross-tenant inference via query timing**: edge fn response time could leak cohort size. Mitigation: response normalized to 200ms minimum; cohort size returned as a band ('5-10', '10-25', '25+'), never exact.
7. **Deletion ripple**: tenant cancels, cohort drops below 5. Mitigation: cohort marked unavailable, UI shows "insufficient cohort size", does NOT silently broaden.
8. **Client-side cohort manipulation**: client tries to claim membership in different industry/cohort. Mitigation: cohort assigned server-side from `tenants.industry` + `tenants.location_count`, not from request payload.
9. **TOS / Loi 25 compliance**: implicit consent assumed. Mitigation: explicit opt-in with 60-day notice; default opt-in only for new tenants post-launch; existing tenants must reaffirm.
10. **Materialized view freshness**: stale data leading to wrong percentile. Mitigation: refresh schedule + UI shows "as of YYYY-MM-DD HH:MM" timestamp.

## Fail-closed

- View refresh fails: edge fn returns 503 + alert
- Tenant opted out: edge fn returns null cohort with reason 'opted_out'
- Cohort size < 5: returns 'insufficient_cohort_data', no percentile computed
- Industry not classified yet: returns 'unclassified_industry'

## Privacy compliance

- Loi 25 (Quebec): documented privacy notice, explicit consent for benchmarking, easy withdrawal
- GDPR: same, plus right-to-erasure does not apply to cohort aggregates (anonymous data)
- PIPEDA: documented purpose ("comparison benchmarking with peers in your vertical")
