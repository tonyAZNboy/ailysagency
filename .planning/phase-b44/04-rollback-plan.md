# Phase B.4.4 : Rollback Plan

## Levels of disablement (least to most invasive)

### Level 1: Disable the Reviuzy admin nav entry
Hide the nav entry via Reviuzy feature flag (existing pattern).
- AiLys endpoint stays up (queryable via direct curl)
- Reviuzy users can no longer reach the admin UI
- Zero AiLys impact

### Level 2: Remove caller from AiLys allowlist
Remove `reviuzy-admin-audit-pdf-stats` from `ALLOWED_CALLERS` in `serviceAuth.ts`, redeploy AiLys.
- Reviuzy proxy returns 403 from AiLys
- Reviuzy admin page shows error
- Logpush still has audit data for forensic

### Level 3: Unset AILYS_SERVICE_SHARED_SECRET
Unset env var on AiLys Pages.
- Stats endpoint returns 503
- ALL service-to-service auth breaks (also Day-1 PDF onboarding from Reviuzy)
- Use only as last resort

### Level 4: Stop writing the ring buffer
Comment out the `ctx.waitUntil(...)` line in `audit-pdf.ts`, redeploy.
- New invocations no longer logged to KV
- Existing entries TTL out over 7 days
- Logpush still has the source-of-truth log

### Level 5: Full revert
Revert the AiLys commits B.4.4.AiLys.1 + B.4.4.AiLys.2.
- KV ring buffer keys remain but no writes; auto-cleanup via 7-day TTL
- Stats endpoint route returns 404 (no handler)

## KV cleanup

If reverting, optionally purge the ring buffer keys:
```bash
# Cloudflare API: list keys with prefix audit_pdf_log: and bulk-delete
# OR wait 7 days for TTL auto-eviction (recommended; non-destructive)
```

## Reviuzy cleanup

If reverting:
1. Disable nav entry first
2. Then delete the edge fn
3. Then delete the admin page route
4. Update Reviuzy STATE.md

## What DOES NOT roll back

- Existing audit-pdf endpoint functionality (untouched)
- Logpush logs (Cloudflare retention is independent)
- The ring buffer stays writeable until env removed; reverting code while env still configured does NOTHING harmful (KV reads still work for analysts, writes stop on revert)

## Rollback test (pre-flight)

1. Deploy B.4.4 to staging
2. Make 1 audit-pdf request
3. Confirm KV key created
4. Roll back commits
5. Confirm no new keys created
6. Confirm 7-day TTL still applies to existing keys
7. Document outcome in this file's "Rollback test log"

## Rollback test log

(empty, to fill when staging test runs)
