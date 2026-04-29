# Phase D.4 : Threat Model

## Attack surface

| Surface | Owner |
|---|---|
| Sentry SDK in edge fns | Reviuzy edge env |
| Sentry SDK in frontend | Reviuzy bundle |
| Sentry DSN | New env var |
| `_shared/observability.ts` | Reviuzy lib |
| `/admin/errors` page | Reviuzy strategist+ |
| Per-tenant Slack alert (Agency) | Reviuzy outbound webhook |

## Secrets

| Secret | Notes |
|---|---|
| `SENTRY_DSN_BACKEND` | NEW, edge fn env |
| `SENTRY_DSN_FRONTEND` | NEW, build-time env |
| Per-tenant `slack_webhook_url` | Stored in tenants.alert_routing JSONB |

## Vectors

1. **PII leaking to Sentry**: Mitigation: Sentry beforeSend hook strips fields in PII_BLACKLIST + scrubs known-PII paths (req.body.email etc.). Test with a synthetic event covering all PII shapes.
2. **Sentry DSN exposure in bundle**: Mitigation: frontend DSN is intentionally public (Sentry design); set strict allowed origins in Sentry project config.
3. **Tenant Slack webhook spoofing**: Mitigation: webhook stored encrypted at rest, only read at send time, never echoed in admin UI (last 4 chars only).
4. **Slack abuse if attacker takes over tenant settings**: Mitigation: changing alert webhook requires owner role + audit-logged via D.1.
5. **Error rate amplification (DoS Sentry quota)**: Mitigation: rate limit per fn (max 10 events/min/fn) + sampling on 4xx noise.
6. **Cross-tenant error leak in operator dashboard**: Mitigation: by default, dashboard scopes to caller's tenant; strategist+ flag adds cross-tenant filter.
7. **Audit log injection**: Mitigation: rides on D.1 enforcement (typed schema, PII strip).
8. **Webhook URL data exfil**: Mitigation: webhook URL hash stored in audit log on each send, no body content.

## Fail-closed

- Sentry DSN missing : SDK no-ops, errors only go to console.log + audit_log (D.1)
- Slack webhook fails 5xx : retry 1x, then capture in DLQ with reason
- Operator dashboard auth missing : 403

## Privacy

- Sentry data retention: 90 days default
- Tenant data subject right-of-access: Sentry events available via D.1 audit_log search by tenant_id
- Right-of-erasure: Sentry events purged via Sentry API on tenant deletion
