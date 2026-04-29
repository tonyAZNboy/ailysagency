# Phase D.3 : Threat Model

## Vulnerabilities being closed

### V1: Hardcoded Supabase anon key in `src/hooks/useAIEngine.ts:43-44`

**Severity:** CRITICAL
**Threat:** any attacker reading bundled JS sees the key, can impersonate tenants in landing-mode flows, bypass rate limiting.
**Class:** OWASP A02:2021 (Cryptographic Failures - hardcoded secrets in source).
**Mitigation:** read from `import.meta.env.VITE_SUPABASE_ANON_KEY`, never inline.
**Post-fix verification:** `grep -rn "eyJ" src/` returns zero hits. Build still works.

### V2: tenantId not server-side verified in admin endpoints

**Severity:** HIGH
**Threat:** authenticated user passes another tenant's UUID as `tenantId` body field, mutates that tenant's data.
**Class:** OWASP A01:2021 (Broken Access Control - IDOR).
**Mitigation:** every admin endpoint calls `verifyTenantMembership(supabase, userId, tenantId)` BEFORE any DB write. Helper checks `user_memberships` table for matching row, returns 403 if not found.
**Post-fix verification:** vitest case: tenant A user passes tenant B id, expects 403; existing happy path still 200.

### V3: Missing zod validation on 60+ edge fns

**Severity:** MEDIUM
**Threat:** malformed input crashes fn (silent unhandled exception), error path may leak stack trace, DoS possible via crafted payload.
**Class:** OWASP A03:2021 (Injection - lack of input validation).
**Mitigation:** each fn entry calls `BodySchema.parse(body)` (or `safeParse`), returns 400 + structured error on failure.
**Post-fix verification:** smoke a malformed body to each fn, expects 400 + error_code response (not 500 + stack).

## Vectors NOT being closed in this PR

(documented to keep scope tight)

- XSS via review text rendering (separate scope)
- CSRF on state-changing GET endpoints (separate scope; we do not have GET mutators)
- SSRF in image fetch endpoints (separate scope; existing private-IP guards)
- Subresource integrity on CDN scripts (frontend hardening, separate)
- Dependency CVE sweep (`npm audit` separate cadence)

## Fail-closed (after fix)

- Missing env `VITE_SUPABASE_ANON_KEY` at build time : build fails
- Missing user_memberships row : admin fn returns 403
- Malformed body : 400 + reason

## Pre-fix audit log

Before deploying the fix:
- log current attempt counts on the affected endpoints (for incident retrospective)
- snapshot the audit log via D.1 (must be live by now) for forensic baseline
