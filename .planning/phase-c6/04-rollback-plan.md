# Phase C.6 : Rollback Plan

## Levels of disablement (least to most invasive)

### Level 1: Per-tenant opt-out
`UPDATE tenants SET auto_citation_batch_enabled=false WHERE id=$1`. Cron skips next run.

### Level 2: DRY_RUN globally
`CITATION_AUTO_BATCH_DRY_RUN=true`. Run logs but no external API calls.

### Level 3: Remove a problematic directory
Edit `_shared/directories/index.ts`, redeploy. That directory removed from rotation.

### Level 4: Global kill switch
`CITATION_AUTO_BATCH_ENABLED=false`. Edge fn returns 503.

### Level 5: Unschedule cron
```sql
SELECT cron.unschedule('citation-auto-batch');
```

### Level 6: Full revert
Revert migrations:
```sql
ALTER TABLE citation_submissions DROP COLUMN auto_batch_run_id;
ALTER TABLE citation_submissions DROP COLUMN submission_method;
DROP TABLE auto_batch_runs CASCADE;
```
Then redeploy without the edge fn.

## Directory-specific rollback

If a directory issues a takedown notice (rare but possible):
1. Add to `_shared/directories/index.ts` denylist (returns null, never submitted)
2. Redeploy
3. Notify all affected tenants
4. Document in this file's "Incident log"

## Submission cleanup

Auto-submitted citations remain on the directory side. To reverse a submission:
- Yelp: contact Yelp support (no API to delete)
- Foursquare: DELETE via API endpoint per submission ID
- BBB: contact BBB partner support

This is manual operator work; not part of the rollback automation.

## Audit trail preservation

- `auto_batch_runs` rows persist through all rollback levels (only Level 6 drops the table)
- `citation_submissions.submission_method='auto'` retained for forensic
- Recommended: keep the rows for 90 days even after revert, for compliance

## Pre-flight rollback test

Run on staging before first prod activation.

## Incident log

(empty)
