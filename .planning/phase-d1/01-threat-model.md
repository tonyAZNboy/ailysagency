# Phase D.1 : Threat Model

## Attack surface

| Surface | Owner |
|---|---|
| `audit_log` table | Reviuzy DB, append-only via trigger |
| `_shared/auditLog.ts` | Reviuzy edge fn lib |
| `audit-log-export` edge fn | Reviuzy, signed CSV/JSON, owner role required |
| `/admin/audit-log` page | Reviuzy, strategist+ |
| Tenant Settings export button | Reviuzy, owner role |

## Secrets

| Secret | Notes |
|---|---|
| `AUDIT_EXPORT_HMAC_SECRET` | NEW, 64 hex bytes, signs export bundle |
| Reused: `SUPABASE_SERVICE_ROLE_KEY` |

## RLS impact

- members: SELECT own tenant only
- owner role: SELECT own + invoke export
- strategist+: SELECT cross-tenant for support
- service_role: full
- INSERT: service_role only (no client-side append path)
- UPDATE / DELETE: blocked by trigger (immutable)

## Vectors

1. **Audit log tampering**: Mitigation: BEFORE UPDATE/DELETE trigger raises exception. PostgreSQL system audit also logs the attempted mutation.
2. **PII in audit payload**: Mitigation: lib enforces schema with allowed fields only (action, actor_user_id, actor_role, target_id, payload_hash, ip_hash). Never accept email or raw text.
3. **Export integrity**: Mitigation: HMAC-SHA256 signature over (csv_bytes + tenant_id + timestamp). Recipient verifies by re-computing.
4. **Cross-tenant leak via export**: Mitigation: export endpoint takes tenant_id from JWT, never from query string.
5. **Replay of signed export URL**: Mitigation: 24h expiry + nonce in payload + single-use flag in KV.
6. **Storage exhaustion**: Mitigation: monthly partitioning + archive partitions older than 12 months to cold storage.
7. **Strategist mutation via UI**: Mitigation: trigger-level enforcement; UI cannot send DELETE/UPDATE that succeeds.
8. **Trigger bypass**: Mitigation: only `service_role` can ALTER TABLE; production migration sets policy and revokes.
9. **Search performance**: Mitigation: GIN index on payload + tenant_id + created_at composite.
10. **GDPR right-to-erasure conflict**: Mitigation: redaction policy (replace PII fields with NULL) on DELETE-by-tenant request, but original row preserved for audit. Documented in privacy notice.

## Fail-closed

- `AUDIT_EXPORT_HMAC_SECRET` missing : export endpoint 503
- Owner role missing on caller : export endpoint 403
- Trigger fires on mutation : exception bubbles to client (no silent corruption)
