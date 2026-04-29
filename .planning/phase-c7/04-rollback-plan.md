# Phase C.7 : Rollback Plan

## Levels of disablement

### Level 1: Per-tenant opt-out
`UPDATE tenants SET upsell_emails_enabled=false WHERE id=$1`. Strategist alerts continue, no client-facing email.

### Level 2: DRY_RUN globally
`RENEWAL_SIGNALS_DRY_RUN=true`. Signals computed and logged but no Resend, no alert insert.

### Level 3: Disable a signal type
Comment out the builder in `_shared/renewalSignals.ts`, redeploy. That signal type stops generating.

### Level 4: Global kill switch
`RENEWAL_SIGNALS_ENABLED=false`. Edge fn returns 503.

### Level 5: Unschedule cron
```sql
SELECT cron.unschedule('compute-renewal-signals');
```

### Level 6: Full revert
```sql
ALTER TABLE tenants DROP COLUMN upsell_emails_enabled;
DROP TABLE renewal_signals CASCADE;
```
Then redeploy without the edge fn.

## Email recall

Resend doesn't support recall. If a wrong email goes out:
1. Send correction email same day
2. Mark the signal `email_sent_at=null, action_reason='retracted: <reason>'`
3. Investigate root cause

## Audit preservation

`renewal_signals` rows persist through Levels 1-5. Level 6 drops the table; export to CSV beforehand for compliance retention if needed.

## Pre-flight test

Run on staging:
1. Seed 5 tenants with varied subscription dates and usage patterns
2. Run cron manually
3. Verify signal_strength distribution makes sense
4. Verify no emails fire in DRY_RUN
5. Roll back with Level 6
6. Document in incident log

## Incident log

(empty)
