# F3.0 — Threat model

## Attack surface

**Public surfaces:**
1. `/agencies/partner-program` (and 16 locale variants) — landing page,
   no PII collected at view time, no auth required
2. POST `/api/partner-application` — form submission endpoint, accepts
   user input from anonymous clients

**Internal surfaces:**
3. `partner_applications` table — read by admin only, insert by edge fn
   service role
4. Resend transactional emails — confirmation to applicant, internal
   alert to operator

## Secrets touched

- `RESEND_API_KEY` (existing env var, used by other endpoints)
- `SUPABASE_SERVICE_ROLE_KEY` (existing env var, used for service role
  inserts bypassing RLS)
- `PARTNER_APPLICATIONS_KILL_SWITCH` (new env var, default `true` in
  production; set to `false` to fail-closed)
- `PARTNER_APPLICATIONS_DRY_RUN` (new env var, default `false` in
  production; set to `true` for local testing without Resend dispatch
  or DB insert)
- `OPERATOR_NOTIFY_EMAIL` (existing env var or new alias of
  `OPERATOR_EMAIL`, the address that receives internal alerts)

No new secrets introduced; reuses existing env vars where possible.

## Vector analysis

### Spam / honeypot bypass
- **Vector:** bot scrapes the form and submits valid-looking PII
  (which a malicious actor could harvest from public sources) at
  high volume.
- **Mitigation:**
  - Hidden honeypot field `website_url_alt` (matches existing audit-
    request and newsletter-subscribe pattern). Bots fill it; humans
    don't see it. Filled honeypot = silent 202 with no DB insert and
    no email dispatch.
  - KV rate-limit: 10 submissions per IP per hour, 50 per IP per day.
  - Email format validation server-side.
  - `applicant_email` MX check via DNS query (best effort; degrade
    gracefully if DNS unavailable).

### SQL injection
- **Vector:** crafted payload bypasses input validation and reaches
  the DB.
- **Mitigation:**
  - Supabase JS client uses parameterized queries by default; no
    raw SQL.
  - All user inputs validated server-side BEFORE DB call:
    - `agency_name`: 2-200 chars, no control chars
    - `contact_name`: 2-100 chars
    - `contact_email`: RFC 5322 lite + length 5-254
    - `city`: 2-100 chars
    - `language`: enum `en|fr`
    - `current_client_count`: integer 0-10000
    - `expected_referrals_per_year`: integer 0-1000
    - `pitch`: 0-2000 chars

### Resend abuse (email bombing)
- **Vector:** attacker submits valid email of a victim repeatedly to
  flood victim with confirmation emails.
- **Mitigation:**
  - Per-email rate-limit: 1 confirmation email per (email, 24h)
    window. Subsequent submissions still log to DB but don't dispatch
    email; admin sees them and decides.

### CORS misuse
- **Vector:** off-origin site embeds the form and proxies submissions
  through user browsers.
- **Mitigation:**
  - CORS lockdown: `Access-Control-Allow-Origin` set to
    `https://www.ailysagency.ca` and `https://ailysagency.pages.dev`
    only. No wildcard.
  - Preflight OPTIONS handled inline.

### Replay attacks
- **Vector:** captured form payload replayed to inflate application
  count.
- **Mitigation:**
  - Idempotency: hash of `(agency_name + contact_email + pitch)` used
    as DB unique constraint. Duplicate hash = silent 202, no new
    insert. Operator sees the original.

### Cross-tenant escalation (n/a)
- The `partner_applications` table has no `tenant_id` column because
  applicants are pre-account. Multi-tenant isolation does NOT apply.
  Admin-only read enforced via existing operator profile policy.

### XSS via stored payload
- **Vector:** `pitch` field contains script tag; admin UI renders
  unescaped.
- **Mitigation:**
  - Admin renders all user-provided strings via React's default
    JSX escape (no `dangerouslyInnerHTML`).
  - Audit: `grep -n dangerouslySetInnerHTML src/pages/admin/` returns
    zero hits before merge.

### PII exposure in audit logs
- **Vector:** server-side logs leak applicant emails, phone, IP, etc.
- **Mitigation:**
  - Audit log row stores `payload_hash` (sha256 of
    JSON.stringify(payload)) NOT the payload itself.
  - IP stored as `ip_hash` (sha256 with daily rotating salt) NOT
    plaintext.
  - Email stored in `partner_applications` table for admin
    follow-up (justified business need, RLS-protected).

### DoS via large payload
- **Vector:** attacker submits 10MB pitch field repeatedly, exhausts
  Cloudflare Workers CPU budget.
- **Mitigation:**
  - Hard limit `pitch` to 2000 chars at validator.
  - Cloudflare Pages Functions enforce 10MB request body limit at
    edge by default.

## Fail-closed defaults

- `PARTNER_APPLICATIONS_KILL_SWITCH` env var:
  - Set to anything other than `true` (case-insensitive) → endpoint
    returns 503 Service Unavailable with body `{"error":"feature_disabled"}`
  - Default in production: `true`
  - Operator can flip to `false` instantly via Cloudflare dashboard
    if abuse detected, no redeploy needed.
- Endpoint without DB connectivity → 503, no fallback that bypasses
  validation.
- Rate-limit KV unavailable → 503 (fail-closed) NOT bypass-allow.

## Audit trail

Every accepted submission writes:

1. Row in `partner_applications` with full payload (RLS-protected,
   admin-only)
2. Row in existing `audit_log` (or equivalent) with:
   - `actor`: "anonymous"
   - `action`: "partner_application.submit"
   - `payload_hash`: sha256
   - `visitor_session_id`: existing pattern from audit-request
   - `ip_hash`: daily-rotated salt sha256
   - `created_at`: timestamptz
   - NO PII in clear

Failed submissions (validation errors) write to a lighter audit table
with reason code only (`error_type`: `validation`/`rate_limit`/`honeypot`)
to enable abuse-pattern analysis without storing payloads.

## Replay window

Form submission has no signed payload (anonymous form) so no replay
window applies. Idempotency via hash dedupe handles legitimate
double-submits.
