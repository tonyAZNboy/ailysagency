# F3.0 — Test matrix

## Per-chunk test breakdown

| Chunk | Unit | Smoke cases | Manual gates |
|---|---|---|---|
| F3.0.a Migration | n/a (SQL) | 0 | SQL syntax review, idempotent assert via `if not exists` / `if exists` |
| F3.0.b Edge fn | n/a | 13+ in F3.0.c | Live curl 1 happy + 3 failures |
| F3.0.c Smoke | n/a | 15 cases | Smoke runs locally exit 0; wired Gate 22 |
| F3.0.d Landing+form | n/a | covered by browser preview | 375x812, 768x1024, 1024 desktop, EN+FR locale switch, form submits, success state |
| F3.0.e i18n keys | audit-translations-deep exit 0 | n/a | Browser locale switch FR confirms strings render |
| F3.0.f Help articles | audit-blog-translations untouched (these are help, not blog); typecheck clean | n/a | /help/partner-program-overview EN+FR render with h1 + content |
| F3.0.g Admin surface | n/a | n/a | Operator auth gate enforced; status update + notes save; CSV export downloads valid file |
| F3.0.h Sitemap+state | sitemap regen exits 0 | n/a | grep new URL in dist sitemap; STATE.md mentions hash |

## Smoke detail (`scripts/smoke-partner-application.mjs`)

15 cases enumerated in 02-sub-phases.md F3.0.c. All cases use the
same pattern as `smoke-audit-pdf-validation.mjs` and
`smoke-cron-guard.mjs` (already in repo).

Test infrastructure:
- Mock fetch via injected env stub
- Mock Supabase service client via env-pinned dummy
- Mock Resend SDK via env-pinned dummy
- DRY_RUN=true case verifies no external calls happen

Exit conditions:
- 0 = all 15 pass
- 1 = any fail (CI Gate 22 blocks deploy)

## Manual gates (operator must execute before claiming done)

### Gate M1 — Live curl (per Section 2.8)

After deploy, run from local machine:

```bash
# Happy path
curl -X POST https://www.ailysagency.ca/api/partner-application \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.ailysagency.ca" \
  -d '{
    "agency_name": "Test Agency Smoke",
    "contact_name": "Smoke Tester",
    "contact_email": "smoketest+'$(date +%s)'@ailysagency.ca",
    "city": "Montreal",
    "language": "en",
    "current_client_count": 5,
    "expected_referrals_per_year": 10,
    "pitch": "Smoke test pitch"
  }'
# Expect: 202 with tracking_id

# Validation failure
curl -X POST https://www.ailysagency.ca/api/partner-application \
  -H "Content-Type: application/json" \
  -d '{}'
# Expect: 400

# Method failure
curl -X GET https://www.ailysagency.ca/api/partner-application
# Expect: 405

# Honeypot fill
curl -X POST https://www.ailysagency.ca/api/partner-application \
  -H "Content-Type: application/json" \
  -d '{"agency_name":"x","contact_name":"x","contact_email":"a@b.co","city":"x","language":"en","current_client_count":0,"expected_referrals_per_year":0,"pitch":"x","website_url_alt":"http://spam.example"}'
# Expect: 202 silent (no DB row created)
```

### Gate M2 — Browser preview (per Section 2.9 and hard rule #13)

In `vite preview` mode (port 4174):
1. Navigate to `/agencies/partner-program`
2. Verify h1 + 4 sections + form render
3. Submit form with valid data → success state shows
4. Resize to 375x812 mobile viewport, verify no horizontal overflow
5. Resize to 768x1024 tablet viewport, verify form layout adapts
6. Switch to /fr/agencies/partner-program, verify FR translations
7. Tap each form field on mobile, verify keyboard doesn't push form
   off-screen (safe-area inset)

### Gate M3 — i18n locale switch (per Section 2.10)

In `vite preview`:
- /agencies/partner-program shows EN
- /fr/agencies/partner-program shows FR-CA
- /es/agencies/partner-program shows EN-placeholder (acceptable per
  i18n queue secondary-locale convention)
- /zh/agencies/partner-program shows EN-placeholder

### Gate M4 — Admin surface (per Section 2.11 and hard rule #11)

Logged in as operator profile:
1. Navigate `/admin/partner-applications`
2. List of submissions visible
3. Update status inline → DB row reflects
4. Add note → DB row reflects
5. CSV export downloads file with rows

### Gate M5 — Help center (per hard rule #10)

In `vite preview`:
1. /help/partner-program-overview EN renders
2. /fr/help/partner-program-overview FR renders
3. /help/how-to-apply-as-a-partner-agency EN+FR render
4. Articles do NOT name Anthropic, Claude, Stripe Connect, Cloudflare,
   internal scoring formulas — `grep -E '(Anthropic|Claude|Stripe Connect|Cloudflare for SaaS)' src/data/help-articles.ts` returns nothing IN THE NEW ARTICLES (existing articles may legitimately mention these)

## CI gates referenced

| Gate | Description | Existing or new |
|---|---|---|
| 1 | tsc --noEmit | existing |
| 2 | audit-translations-deep | existing |
| 3 | audit-blog-translations | existing (untouched by this PR) |
| 4 | em-dash sweep | existing |
| 5-18 | existing feature smokes | existing |
| 19 | post-deploy JSON-LD | existing |
| 20 | bundle-shape regression | existing (PR #107) |
| 21 | bundle-load runtime | existing (PR #109) |
| **22** | **smoke-partner-application** | **NEW** |

Gate 22 must run BEFORE Gate 19 and AFTER tsc + i18n audit, in the
existing pre-deploy gate sequence.

## Coverage gaps acknowledged

1. **No real-DB integration test.** Migration 0005 cannot be applied
   to a live AiLys Supabase project because that project has not been
   provisioned (per STATE.md priority #6). The smoke tests run
   against mocked Supabase client. Once the project is provisioned,
   add an integration test that hits real DB.

2. **No real-Resend integration test.** Smoke uses mocked Resend
   client. Live curl from Gate M1 is the actual real-world test.

3. **Rate-limit KV is mocked in smoke.** Real KV behavior is tested
   only by sustained live curl (operator can exercise this manually
   post-deploy).

These gaps are acceptable for an MVP-validation sub-phase with low
expected volume. They become mandatory before F3.1+ (full white-label
build) ships.
