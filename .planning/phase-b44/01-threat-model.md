# Phase B.4.4 : Threat Model

## Attack surface

| Surface | Owner | Notes |
|---|---|---|
| `/api/admin/audit-pdf-stats` (AiLys) | New | Public route, HMAC-protected. Read-only. |
| KV ring buffer `audit_pdf_log:<ts_ms>` | AiLys | Internal, written by audit-pdf, read by stats endpoint. 7-day TTL. |
| Reviuzy edge fn `audit-pdf-stats-proxy` | Reviuzy | Calls AiLys via HMAC, surfaces to admin UI |
| Reviuzy admin page `/admin/audit-pdf-stats` | Reviuzy | Strategist+ role gate via existing RLS |

## Secrets touched

| Secret | Storage | Rotation |
|---|---|---|
| `AILYS_SERVICE_SHARED_SECRET` | AiLys Pages env | Already in use (C.1). No new secret. |

## RLS impact

No new tables, no new RLS. Reviuzy admin page reuses the existing strategist+ role gate.

## Vectors

### 1. Unauthorized read of stats
**Surface:** the new GET endpoint. **Mitigation:** HMAC service auth required. Without `AILYS_SERVICE_SHARED_SECRET`, fail-closed 503. Caller must be on allowlist (`reviuzy-admin-audit-pdf-stats`).

### 2. Replay attack
**Surface:** HMAC-signed GET. **Mitigation:** Timestamp header within 5-min replay window. Reused from C.1 pattern.

### 3. Information leak (PII)
**Surface:** the KV ring buffer + JSON response. **Mitigation:** ring buffer entries store only `actorHash` (SHA-256 of email), `ipHash` (SHA-256 of IP), status code, latency, reason code. NO email, NO IP, NO business name in clear. Schema enforced by typed AuditLogEntry interface.

### 4. KV exhaustion / billing attack
**Surface:** if attacker exhausts the rate limit and each rejected request also writes a KV log entry, billing inflates. **Mitigation:** ring buffer write only fires on completion path (after rate-limit gate). Rejected-by-rate-limit requests are NOT logged to KV ring buffer (they are still logged to Logpush console for forensic).

### 5. Tampered ring buffer entries
**Surface:** if attacker can write to KV. **Mitigation:** KV writes only via service role from edge functions. No public write path.

### 6. Stats endpoint amplification
**Surface:** stats endpoint reads up to 50 KV keys per call. If an attacker bypasses HMAC, they could read 50 keys per request. **Mitigation:** HMAC required, no auth bypass. Even if bypassed, the data is anonymized hashes only.

### 7. Side-channel via latency
**Surface:** HMAC verify uses constant-time compare. **Mitigation:** existing `ctEqual` in serviceAuth.ts is constant-time. No fix needed.

### 8. Malformed timestamp
**Surface:** numeric parsing of `X-AiLys-Service-Timestamp`. **Mitigation:** `parseInt` + `Number.isFinite` + `> 0` checks. Existing pattern.

### 9. Cross-tenant leakage
**Surface:** N/A. The audit-pdf endpoint is public-facing, not per-tenant. Stats are aggregate.

### 10. Reviuzy operator misuse
**Surface:** if a Reviuzy admin user sees stats they shouldn't. **Mitigation:** Reviuzy admin page is strategist+ only via existing RLS (Phase 4.5.5 `is_ailys_strategist`). Already enforced.

## Fail-closed defaults

- `AILYS_SERVICE_SHARED_SECRET` missing on AiLys : 503, no data
- Caller not on allowlist : 403, no data
- HMAC sig mismatch : 401, no data
- Timestamp skew > 5 min : 401, no data
- KV unavailable : 503, no data (do NOT serve cached stats; freshness matters)

## Kill switch

- **Global:** unset `AILYS_SERVICE_SHARED_SECRET` on AiLys Pages : entire stats endpoint returns 503
- **Per-caller:** remove `reviuzy-admin-audit-pdf-stats` from `ALLOWED_CALLERS` and redeploy : that caller blocked
- **Reviuzy side:** disable the admin nav entry via Reviuzy feature flag (existing pattern)

## What's intentionally NOT in scope

- No write/mutation endpoints (toggle kill switch is a separate decision)
- No per-tenant isolation (audit-pdf is public, not multi-tenant)
- No DLQ retry path (read-only)
- No SLA on freshness (60s polling is acceptable)
