# Phase C.5 : Rollback Plan

## Levels of disablement (least → most invasive)

### Level 1: Per-tenant opt-out
Set `tenants.auto_monthly_report=false` for the affected tenant.
- Cron skips that tenant on next run.
- No code change, no deploy needed.
- Already-sent reports are not affected.

### Level 2: DRY_RUN mode globally
Set `MONTHLY_VISIBILITY_REPORT_DRY_RUN=true` in Reviuzy edge fn env.
- Edge fn renders + logs but never sends or stores.
- Useful when investigating a render bug without spamming clients.
- Cron continues to fire on schedule.

### Level 3: Global kill switch
Set `MONTHLY_VISIBILITY_REPORT_ENABLED=false` in Reviuzy edge fn env.
- Edge fn returns 503 immediately.
- pg_cron continues to invoke but every call short-circuits.
- No table writes, no Resend calls, no storage operations.

### Level 4: Unschedule cron
```sql
SELECT cron.unschedule('monthly-visibility-report');
```
- Cron stops firing entirely.
- Edge fn remains deployed (admin can still manual-trigger if Section 4 admin panel allows).

### Level 5: Full revert
Run migration `down` scripts in reverse order:
```sql
-- Down 20260430010000_schedule_monthly_visibility.sql
SELECT cron.unschedule('monthly-visibility-report');

-- Down 20260430000000_create_monthly_visibility_reports.sql
DROP TABLE monthly_visibility_reports CASCADE;
```
Then redeploy without the edge fn:
```
npx supabase functions delete monthly-visibility-export --project-ref qucxhksrpqunlyjjvuae
```

## Storage cleanup

If reverting and PDFs need purging:
```sql
-- Soft cleanup (recommended): mark for deletion
UPDATE storage.objects SET metadata = metadata || '{"deleted_at": "<ts>"}'::jsonb WHERE bucket_id = 'executive-reports' AND name LIKE '%/monthly/%';

-- Hard cleanup (irreversible)
DELETE FROM storage.objects WHERE bucket_id = 'executive-reports' AND name LIKE '%/monthly/%';
```

Recommend keeping PDFs for legal/compliance reasons (clients may request access). 30-day retention via storage lifecycle rule is acceptable.

## Email recall

Resend does not support email recall. If a wrongly-sent email goes out:
1. Send a follow-up correction email same day with subject prefix `[CORRECTION]`
2. Log the incident in `tenant_history` with reason
3. Operator reviews the cause (PDF render bug, wrong tenant scope, etc.)

## DLQ inspection

Failed runs accumulate in `monthly_visibility_reports.error` JSONB. To inspect:
```sql
SELECT tenant_id, month, status, error->>'message' as error_msg
FROM monthly_visibility_reports
WHERE status = 'failed'
ORDER BY updated_at DESC
LIMIT 50;
```

Operator manually re-runs failed tenants via admin panel after fixing root cause.

## Audit log preservation

Even after Level 5 revert, AiLys help articles remain (zero blast radius). They describe a feature that no longer ships, which is misleading. **If reverting, also remove the help article OR mark it with a banner "Feature paused : contact strategist".**

## Rollback test (pre-flight, do this once before first prod activation)

1. Apply migration on staging
2. Insert 1 row manually
3. Run `down` migration
4. Verify table dropped, no orphan FK errors
5. Re-apply migration
6. Verify row absent (clean state)
7. Document outcome in this file's "Rollback test log" section

## Rollback test log

(empty : to be filled when staging test runs)
