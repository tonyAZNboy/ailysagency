# 01 — Threat model: Shared Supabase insert lib

## Attack surface

Zero net new attack surface. The lib runs on the same Cloudflare Workers
edge runtime as the existing `forwardToSupabase` helpers. The lib is called
ONLY from server-side code (Pages Functions); never exposed to browsers.

## Secrets touched

- `SUPABASE_URL` (env var, public-ish but treated as secret).
- `SUPABASE_SERVICE_ROLE_KEY` (env var, FULL Postgres write access; bypass
  RLS).

Existing call-sites already handle these. The lib is a refactor.

## Threat vectors and mitigations

### T1 — Service-role key leakage in error message

If a Supabase 4xx response body contains the apikey echoed back, current
helpers `console.warn(text.slice(0, 300))` → could leak secret to Workers
logs.

**Mitigation:** lib's error path slices response text but ALSO redacts any
substring matching the SUPABASE_SERVICE_ROLE_KEY. New smoke test asserts
the redaction.

### T2 — Caller passes PII into payload that later appears in audit_log

The lib does NOT capture rows into `audit_log` (success path). The error
return value is `{ ok: false, error: string }` and the error string is
bounded to ≤ 256 chars and redacted (T1). PII never re-enters logs from
this lib.

### T3 — Caller passes an arbitrary table name → tenant escape

Lib accepts a `table` argument. If a future caller passes a user-controlled
string, attacker could redirect the insert to another tenant's table.

**Mitigation:** lib is internal-only (called from Pages Functions). Table
names are hardcoded literals at call sites. No user input ever flows into
the `table` arg. Smoke test asserts table arg is treated as a literal
(no template string with caller-controllable input). README/JSDoc warns
"never pass user input as table name."

### T4 — SSRF via SUPABASE_URL

If `env.SUPABASE_URL` is overridden by a malicious operator to point at
an attacker-controlled server, the service-role key would be exfiltrated.

**Mitigation:** Cloudflare Pages env vars require dashboard access (admin
auth). This is the same threat surface the existing helpers already
accept. No change.

### T5 — Replay window

Insert payloads have `created_at` set to `new Date().toISOString()`. A
caller passing a stale timestamp is the caller's bug, not the lib's.
Existing payloads contain `payload_hash` (sha256 of canonical body) which
combined with `Prefer: resolution=ignore-duplicates` provides idempotency
within the 7-day form-submission window.

### T6 — Injection via row payload

Cloudflare Workers `JSON.stringify(payload)` is the canonical encoder; no
SQL string interpolation. Supabase REST validates types per column schema.

## Fail-closed defaults

The lib does NOT fail-closed in the missing-env-var case. It logs the
payload to `console.log` and returns `{ ok: true }`. Reason: AiLys'
own Supabase project is not yet provisioned (per STATE.md operator
actions pending #4). Forms must continue feeling successful to the
user; ops pulls leads from Workers logs until the table is ready. This
matches the existing helper behavior. Smoke test asserts this.

## Kill switch env var

The lib does NOT introduce a kill switch. The existing endpoint-level
kill switches (`PARTNER_APPLICATIONS_KILL_SWITCH`, etc.) already disable
the entire endpoint, which subsumes this lib.

## RLS impact

ZERO. The lib uses the service-role key (bypasses RLS). It writes to
existing tables (`partner_applications`, `landing_leads`) with the same
schema and RLS policies that already accept service-role inserts.
