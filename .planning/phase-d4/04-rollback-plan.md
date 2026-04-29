# Phase D.4 : Rollback Plan

## Levels

### Level 1: Disable Sentry sampling
Set `SENTRY_TRACES_SAMPLE_RATE=0` to stop traces while keeping error capture. Reduces noise without losing error visibility.

### Level 2: Mute Sentry entirely
Unset `SENTRY_DSN_BACKEND` and `VITE_SENTRY_DSN_FRONTEND`. SDK no-ops. Errors continue to D.1 audit_log + Logpush.

### Level 3: Revert refactored fns
Restore original try/catch + console.error per affected fn. captureError + wrapHandler abandoned.

### Level 4: Disable Slack routing
Set `tenants.alert_routing` to {} for all tenants. Email default resumes.

### Level 5: Hide /admin/errors page
Feature flag in nav.

### Level 6: Full revert
Uninstall Sentry SDKs, drop alert_routing column, revert observability lib, revert dashboard. Audit log via D.1 unaffected.

## Sentry quota safeguard

If Sentry quota approaches limit:
1. Lower trace sample rate
2. Add ignored errors (transient network, etc.)
3. Add per-fn rate limit
4. Upgrade Sentry plan if budget allows

## Per-tenant Slack abuse

If a malicious tenant configures a webhook that 5xx loops:
1. Auto-disable that tenant's webhook after 5 consecutive failures (existing pattern)
2. Audit-log the disable event
3. Notify tenant via email

## Pre-flight test

1. Apply on staging
2. Trigger synthetic errors covering: 4xx, 5xx, panic, async rejection
3. Verify each lands in Sentry within 60s
4. Verify each lands in audit_log
5. Test Slack alert with mock webhook
6. Roll back via Level 6
7. Document outcome here

## Rollback test log

(empty)
