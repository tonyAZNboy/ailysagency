# Phase D.3 : Rollback Plan

## Levels

### Level 1: Loosen a specific zod schema
If a fn rejects valid traffic post-deploy, edit the schema to mark fields `.optional()` or relax format. Targeted fix, no full revert.

### Level 2: Revert tenant verify on a specific endpoint
If `verifyTenantMembership` blocks a legitimate path (e.g. cross-tenant strategist support call), add the strategist exemption inside that fn:
```ts
if (!verify.ok && !(await isAilysStrategist(supabase, user.id))) return 403
```

### Level 3: Revert zod on a specific endpoint
If a malformed-but-handled input was previously accepted by accident, revert that fn's zod gate. Document why in commit message.

### Level 4: Re-introduce hardcoded key (NEVER acceptable)
This is not a valid rollback. If the env-driven key fails, fix the env, do not regress.

## Rotation procedure (post-deploy USER ACTION)

1. Login Supabase dashboard
2. Project Settings > API > Anon (public) key
3. Click Regenerate
4. Copy new key
5. Update CF Pages env: `VITE_SUPABASE_ANON_KEY` for all environments
6. Trigger Pages redeploy
7. Verify production loads correctly
8. Document timestamp + fingerprint hash in STATE.md
9. Audit log via D.1 records the rotation event
10. The leaked key now invalid for new requests; existing sessions auto-refresh on next renewal

## Audit trail

Every step of D.3 is captured in:
- Git commits (one per task)
- D.1 audit_log (post-deploy)
- STATE.md security section (post-rotation)

## Pre-flight

1. Apply branch on staging
2. Test 5 valid flows on each refactored fn (no regression)
3. Test 3 attack vectors (cross-tenant id, malformed body, missing key)
4. Verify all reject correctly
5. Roll forward to prod
6. Rotate key

## Rollback test log

(empty)
