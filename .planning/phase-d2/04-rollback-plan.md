# Phase D.2 : Rollback Plan

## Levels

### Level 1: Per-tenant opt-out (built-in)
Tenant flips Settings toggle off. Excluded from view on next refresh (24h max).

### Level 2: Hide UI card
Feature flag `cohort_card_enabled` global, default true. Set false to hide card without backend change.

### Level 3: Disable endpoint
Endpoint returns 503 via env `DASHBOARD_COHORT_STATS_ENABLED=false`. Frontend handles gracefully via empty state.

### Level 4: Stop view refresh
`SELECT cron.unschedule('refresh-cohort-benchmarks');`. View becomes stale. Endpoint serves last refresh.

### Level 5: Drop view
```sql
DROP MATERIALIZED VIEW cohort_benchmarks CASCADE;
```
Endpoint returns 503; UI shows empty state.

### Level 6: Full revert
Levels 5 + revert all migrations + revert UI commits + revert privacy update.

## Privacy compliance rollback

If a regulator challenges the anonymization claim:
1. Immediate: Level 1 mass opt-out via UPDATE all tenants
2. Within 24h: Level 5 drop view (kills the data product)
3. Notify affected tenants via email
4. Document incident in this file's incident log
5. Refer to D.1 audit log for accessor list

## TOS rollback

If 60-day grandfather period violated, must:
1. Roll back to pre-D.2 schema
2. Send apology email to affected tenants
3. Optional: monetary credit per Loi 25 enforcement

## Pre-flight test

1. Apply migration in staging
2. Seed 6 tenants in `dental` industry, varied location_count
3. Refresh view, verify dental cohort exists
4. Add 1 opt-out tenant, refresh, verify cohort_size drops
5. Drop to 4 tenants opted-in, refresh, verify cohort excluded
6. Test endpoint as each tenant
7. Roll back fully via Level 6
8. Document outcome here

## Rollback test log

(empty)

## Incident log

(empty)
