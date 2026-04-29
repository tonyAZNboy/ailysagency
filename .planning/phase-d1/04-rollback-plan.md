# Phase D.1 : Rollback Plan

## Levels

### Level 1: Disable export endpoint
Unset `AUDIT_EXPORT_HMAC_SECRET`. Endpoint returns 503. Data still being collected.

### Level 2: Disable Settings export button
Feature flag in tenants config. Hides UI without backend change.

### Level 3: Stop new audit log writes
Comment out emitAuditLog calls in the 10 migrated edge fns, redeploy. Old data preserved, no new writes.

### Level 4: Hide admin nav entry
Disable nav link in ExpandableNavbar. Page route still works for direct-URL access (defense in depth).

### Level 5: Drop partition (specific month only)
```sql
ALTER TABLE audit_log DETACH PARTITION audit_log_y2026m04;
DROP TABLE audit_log_y2026m04;
```
Removes audit data for one month. Use only for catastrophic data quality issue.

### Level 6: Full revert
```sql
DROP TRIGGER audit_log_no_update ON audit_log;
DROP TRIGGER audit_log_no_delete ON audit_log;
DROP FUNCTION audit_log_no_mutation();
DROP TABLE audit_log CASCADE;
```
Then revert the 10 edge fn changes.

## Storage cleanup

- Partitions older than 12 months auto-archive (cron)
- On full revert, archived partitions exported to R2 cold storage before drop

## Audit preservation

The whole point is preservation; Levels 1-4 do not touch existing data.

## GDPR / Loi 25 right-to-erasure

Tenant requests erasure : redact PII fields (replace with NULL), keep row + payload_hash for forensic. Documented in privacy notice.

## Pre-flight test (staging)

1. Apply migration
2. Insert 100 rows via service_role
3. Verify INSERT only path works
4. Run UPDATE/DELETE as service_role : verify exception
5. Run RLS tests as 2 different tenants
6. Run export endpoint, verify HMAC sidecar
7. Roll back via Level 6
8. Document outcome here

## Rollback test log

(empty)
