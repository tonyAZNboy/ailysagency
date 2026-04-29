# Phase D.4 : Test Matrix

| Sub-phase | Cases |
|---|---|
| D.4.AiLys.1 (help article) | CI 1-7 + EN/FR mobile/tablet |
| D.4.Rvz.1 (Sentry install) | 4: build/frontend event/edge event/PII strip |
| D.4.Rvz.2 (observability helper) | 12 (per spec) |
| D.4.Rvz.3 (30 fn refactor) | 30 cases (one per fn error path) |
| D.4.Rvz.4 (errors dashboard) | 8 (per spec) |
| D.4.Rvz.5 (Slack routing) | 8 (per spec) |

**Total new automated:** 62

## Manual gates

1. ✅ D.1 audit_log live in prod (gate)
2. ✅ Sentry DSN provisioned, dashboards configured
3. ✅ Synthetic error fired, lands in Sentry within 60s
4. ✅ PII scrub verified on synthetic event with email + IP fields
5. ✅ Operator dashboard renders with real recent errors
6. ✅ Agency tier tenant configures Slack webhook, test button works
7. ✅ Critical error fan-out: lands in Sentry + email + Slack
8. ✅ Sample rate respected: 10% trace events, 100% errors
9. ✅ Right-of-erasure: tenant deletion purges Sentry data via API call
10. ✅ Help article EN+FR live before any client-visible Slack alert fires
