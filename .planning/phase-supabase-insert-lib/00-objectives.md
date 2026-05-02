# 00 — Objectives: Shared Supabase insert lib

## Business goal

Eliminate the duplicated `forwardToSupabase` helper across three lead-capture
endpoints (`partner-application`, `founding-clients-apply`, `cofounders-apply`).
Each endpoint currently re-implements the same Supabase REST POST pattern with
slight variations: identical headers (apikey + service_role + Content-Type +
Prefer), identical error shape (`{ ok, error }`), identical fail-open when
SUPABASE env vars are missing.

## Why now

Three endpoints already adopted the pattern. A fourth (founding clients
phase 2 follow-up form, due Phase F4) is on the roadmap. Without extraction:
- 4th endpoint copies a 4th implementation of the same code.
- Bug fix in one place (e.g. add a retry, switch to `Prefer: resolution=
  merge-duplicates`) requires 4 file edits and risks drift.
- Tests for one endpoint cannot share fixture / mock infra.

Extraction now is mechanical (3 call-sites, identical shape) and unblocks
F3.0 phase 2 + F3.1 White-Label without copy-paste growth.

## Hours saved at fleet scale

Refactor itself: ~1 dev hour saved per future endpoint that needs Supabase
insert (3-5 endpoints expected over Phase F + Phase G). Saved hours: ~5.

Operator hours saved (when bug surfaces): ~2 hours per incident (one fix
location vs three). Realistic incident rate: 1/quarter. Saved hours/year: 8.

Combined: ~13 dev/ops hours/year. Modest but compounding as new endpoints
land.

## Who benefits

- **Engineering (primary):** single source of truth for Supabase REST POST.
- **Operator (secondary):** one place to read when triaging "form submission
  not landing in Supabase" incidents.
- **End user:** zero observable change. This is pure infrastructure.

## Cost estimate per invocation

ZERO incremental cost. The lib wraps the same `fetch()` to Supabase REST that
the inline helpers already make. No new paid-API consumer.

## Why this dep

NO new dep. Uses native `fetch()` already present in Cloudflare Workers
runtime. Uses native `crypto.subtle` already used elsewhere. No `@supabase/
supabase-js` added (the lib intentionally stays REST-level to keep bundle
size minimal — we already prefer REST over the SDK in edge fns per
Section 10 of the iso-gsd-delivery skill).

## Out of scope

- New tables, new schemas, new RLS. Existing tables (`partner_applications`,
  `landing_leads`) untouched.
- Migration to Supabase JS SDK. Stays at REST level.
- Audit log row capture. That is `serverError.ts` territory; this lib is
  for *success-path* data inserts (lead rows), not error rows.
- Idempotency keys at the application layer. Each endpoint already uses
  `Prefer: resolution=ignore-duplicates` (where appropriate); the lib
  surfaces this as an option, doesn't change the policy.
- Admin panel. This is a refactor with no new feature surface, so hard
  rule #11 admin-panel requirement does not trigger. Existing admin
  surfaces for these endpoints (Cloudflare Functions logs + Supabase
  table view) remain unchanged.
- Help center articles. No user-visible behavior change, so hard rule #10
  does not trigger.
- i18n. No new strings. Section 8 of iso-gsd-delivery does not trigger.

## Acceptance

1. `functions/lib/supabaseInsert.ts` exists, exports a single
   `insertSupabaseRow(env, table, row, options)` function.
2. `partner-application.ts`, `founding-clients-apply.ts`, `cofounders-apply.ts`
   each call the shared lib instead of inlining the helper. Net LOC reduction.
3. New smoke `scripts/smoke-supabase-insert.mjs` covers: missing env vars
   (fail-open), 200 OK, 409 ignore-duplicates, 4xx returns `{ ok: false }`,
   network error returns `{ ok: false }`, secret values never appear in
   error message.
4. Smoke wired as Gate 26 in `.github/workflows/deploy.yml`.
5. Live curl against `partner-application` + `founding-clients-apply`
   endpoints proves no regression (1 happy + 3 failure modes per endpoint).
6. STATE.md updated in same commit.
