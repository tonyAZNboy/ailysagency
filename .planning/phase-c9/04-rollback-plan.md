# Phase C.9 : Rollback Plan

## Levels

### Level 1: Mute strategist alerts
Set alert thresholds higher (e.g., score < 20 instead of < 40). Less sensitive, fewer alerts.

### Level 2: Per-tenant opt-out
Add a tenants flag `health_scoring_enabled=false` (default true). Cron skips opted-out tenants.

### Level 3: DRY_RUN globally
`HEALTH_SCORE_DRY_RUN=true`. Scores computed and logged but no alerts inserted.

### Level 4: Kill switch
`HEALTH_SCORE_ENABLED=false`. Edge fn returns 503.

### Level 5: Unschedule cron
`SELECT cron.unschedule('compute-health-score');`

### Level 6: Full revert
```sql
DROP TABLE tenant_health_scores CASCADE;
```
Then redeploy without the edge fn.

## Formula version cleanup

If we change scoring weights mid-flight:
- Bump `formula_version` to `v2`
- Old rows preserved with formula_version='v1' for audit comparability
- Admin chart filters by version (no mixed-version trend lines)

## Audit preservation

`tenant_health_scores` retained for 365 days. Strategist actions on alerts retained forever (existing alerts table policy).

## Pre-flight

Run on staging:
1. Seed 5 tenants with varied behavior (active/dormant/declining/improving/spiky)
2. Run cron once
3. Verify score distribution (sanity: dormant < 30, active > 70)
4. Verify trend computation (run twice with 1-day gap)
5. Roll back fully (Level 6)
6. Document in incident log

## Incident log

(empty)
