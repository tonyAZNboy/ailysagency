# 03 — Test matrix

## Smoke (automated, exit 0 required)

`scripts/smoke-supabase-insert.mjs` runs 15 cases covering:

| # | Case | Assertion |
|---|---|---|
| C1 | Missing SUPABASE_URL | `ok: true`, fetch not called |
| C2 | Missing SUPABASE_SERVICE_ROLE_KEY | `ok: true`, fetch not called |
| C3 | 200 OK | `ok: true` |
| C4 | 201 Created | `ok: true` |
| C5 | 409 + ignoreDuplicates true | `ok: true` |
| C6 | 409 + ignoreDuplicates false | `ok: false` |
| C7 | 400 | `ok: false`, error="Supabase 400" |
| C8 | 401 | `ok: false`, error="Supabase 401" |
| C9 | 500 | `ok: false`, error="Supabase 500" |
| C10 | Network throw | `ok: false`, error bounded |
| C11 | Response body leaks SERVICE_ROLE_KEY | key string redacted |
| C12 | Error message ≤ 256 chars | length check |
| C13 | created_at preserved | round-trip check |
| C14 | Row arg immutability | object identity / deep compare |
| C15 | Prefer header values | `return=minimal` baseline + ignoreDuplicates variant |

Run via: `npx tsx scripts/smoke-supabase-insert.mjs`

## Manual gates (Section 2 of skill)

| # | Gate | Command / action | Required |
|---|---|---|---|
| 8 | Live curl partner-application | `curl -X POST .../api/partner-application` x 4 (happy + missing field + wrong method + honeypot) | YES |
| 8 | Live curl founding-clients-apply | same shape | YES |
| 9 | Browser preview at 375x812 | open `/partenaires` form, submit | YES |
| 10 | FR-CA locale switch | switch lang, re-open form | YES |
| 11 | Admin panel | N/A — refactor with no new feature | N/A |
| 12 | Help center | N/A — no behavior change | N/A |

## Regression checks

- All existing smoke scripts pass (rate-limit, system-health, server-error,
  audit-pdf-validation, audit-pdf-render, audit-pdf-hmac, audit-pdf-onboarding,
  cron-guard, bundle-shape, bundle-load).
- `npx tsc --noEmit` clean — no any-typed escape, no implicit-any introduced.
- `npm run build` green — bundle size stable (lib is < 4 KB minified).
