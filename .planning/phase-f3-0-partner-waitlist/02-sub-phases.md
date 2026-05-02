# F3.0 — Atomic mergeable chunks

This sub-phase is intentionally scoped as a SINGLE-COMMIT MVP for
demand validation. The chunks below are sub-steps within the single
commit, each verifiable on its own but shipped as one PR for atomic
rollback. Total time-box: ~4h focused work.

## F3.0.a — Migration 0005_partner_applications

**Time:** ~30 min

- `supabase/migrations/0005_partner_applications.sql`:
  - Up: create table + index + RLS policy (admin read, service role
    insert)
  - Down: drop policy, drop index, drop table
- Verification: read back the SQL, confirm idempotent
  (`create table if not exists`, `drop ... if exists`)

**Definition done:** SQL file written, syntactically valid, down
script tested locally (where Supabase project exists; this AiLys
project does not yet, so down script remains tested via SQL syntax
review only — flagged in 04-rollback-plan.md as a known limitation).

## F3.0.b — Edge function `/api/partner-application`

**Time:** ~90 min

- `functions/api/partner-application.ts`
- Pattern: copy `functions/api/audit-request.ts` skeleton (input
  validation + rate-limit + Resend dispatch + Supabase service-role
  insert + CORS + kill switch)
- Adapt fields to partner application shape
- Add idempotency via payload hash
- Add per-email 24h rate-limit
- DRY_RUN env support: when set, returns synthesized response without
  Resend dispatch or DB insert

**Definition done:**
- `npx tsc --noEmit` clean
- Live curl 1 happy + 3 failures (validation, method, honeypot)
- Smoke `smoke-partner-application.mjs` 13+ cases all pass

## F3.0.c — Smoke `smoke-partner-application.mjs`

**Time:** ~45 min

Test cases (15 minimum):

1. POST happy path with all fields → 202 + tracking ID
2. POST with honeypot filled → 202 with no DB insert (silent)
3. POST without `agency_name` → 400 with field error
4. POST without `contact_email` → 400
5. POST with malformed email → 400
6. POST with `pitch` > 2000 chars → 400
7. POST with `agency_name` > 200 chars → 400
8. POST with non-integer `current_client_count` → 400
9. POST with negative `expected_referrals_per_year` → 400
10. POST with method GET → 405
11. POST with kill switch `false` → 503
12. POST with DRY_RUN=true → 202 + dry_run flag in response, no DB
    insert, no Resend dispatch
13. POST same payload twice → second is silent 202 with same tracking
    ID (idempotency dedupe)
14. POST 11x within 1h from same IP → 11th returns 429
15. CORS preflight OPTIONS from allowed origin → 204 with proper
    headers

**Wired into deploy.yml as Gate 22.**

## F3.0.d — Landing page + form component

**Time:** ~60 min

- `src/pages/PartnerProgram.tsx` (new) + locale-aware route in
  `src/App.tsx` (`/agencies/partner-program` + `/:lang/agencies/partner-program`)
- Sections: hero / proposition / who-it-is-for / what-partners-get /
  application-form / FAQ
- `src/components/landing/PartnerApplicationForm.tsx`:
  - All fields per 01-threat-model validators
  - Hidden honeypot field
  - Loading state + success state + error states
  - Mobile-first, 375x812 baseline + 768x1024 + 1024 desktop
  - Submits to `/api/partner-application`
  - Success state shows confirmation + tracking ID
- SEOHead: title, description, canonical, OG image (uses existing
  /api/og.svg with kind=default)
- JSON-LD Service schema for Partner Program offering

**Definition done:**
- Browser preview at 375x812: no horizontal overflow, all sections
  render, form submits
- Browser preview at 768x1024: layout adapts, form fields stack
  appropriately
- /fr/agencies/partner-program: French translations render
- Live curl `/agencies/partner-program`: 200, h1 in EN; `/fr/...`: h1
  in FR

## F3.0.e — i18n keys (16 locales)

**Time:** ~30 min

- New keys under `partnerProgram.*`:
  - `eyebrow`, `headline`, `subheadline`, `applyCta`
  - 6 form labels (`form.agencyName`, `.contactName`, `.contactEmail`,
    `.city`, `.currentClients`, `.expectedReferrals`, `.pitch`)
  - 4 form placeholders
  - `form.submitting`, `form.success`, `form.errorRateLimit`,
    `form.errorGeneric`, `form.errorValidation`
  - 5 FAQ Q+A pairs
  - 4 "what partners get" deliverables
- EN canonical + FR-CA hand-translation (per CLAUDE.md hard rule:
  in-house bilingual)
- 14 secondary locales: EN value as placeholder (per i18n-translation-
  queue convention)
- `node scripts/audit-translations-deep.mjs` exits 0
- Em-dash count: zero

## F3.0.f — Help articles EN + FR-CA

**Time:** ~30 min

- 2 articles in `src/data/help-articles.ts`:
  - `partner-program-overview` — what it is, who it's for, the 3-stage
    application flow (apply → call → contract), what partners receive
    once accepted, what AiLys keeps internal
  - `how-to-apply-as-a-partner-agency` — application form fields
    explained, what AiLys evaluates, response time, next steps
- EN canonical + FR-CA full translations
- Per hard rule #10: NO mention of Anthropic, internal scoring,
  Stripe Connect details, future white-label build status. Refer to
  the AiLys platform/engine only.

## F3.0.g — Admin surface

**Time:** ~45 min

- New `src/pages/admin/AdminPartnerApplications.tsx`:
  - List most-recent first
  - Status update inline (new/contacted/qualified/converted/declined)
  - Notes field with textarea
  - CSV export button
  - Filter by status
- Add to `src/pages/admin/AdminLayout.tsx` nav
- Hooked to existing operator-profile auth gate
- Mobile-first; admin tables use existing Card pattern

**Definition done:**
- /admin/partner-applications route renders for operator
- Status update reflects in DB
- Notes save to DB
- CSV export downloads valid file with all visible rows

## F3.0.h — Sitemap + llms.txt + STATE.md

**Time:** ~15 min

- `scripts/generate-sitemap.mjs` includes new route per locale (16x
  /agencies/partner-program URLs)
- `public/llms.txt` adds Partner Program documentation entry
- `STATE.md` session-close entry with:
  - Commit hash
  - Smoke pass count (13+/13+)
  - User actions pending (apply migration 0005 to AiLys Supabase
    project once provisioned, set 3 env vars in Cloudflare)
  - Live curl proof

## Dependencies

a (migration) is independent. b (edge fn) depends on a's table
shape. c (smoke) tests b. d (landing) is independent of a/b/c. e
(i18n) is independent. f (help) is independent. g (admin) depends on
a's table. h (docs) wraps everything.

Recommended order: a → b → c → d → e → f → g → h. All in one PR for
atomic rollback.

## Definition of Done (binary, all must check)

- [ ] 5 GSD artefacts in `.planning/phase-f3-0-partner-waitlist/`
- [ ] Migration 0005 SQL written + idempotent + down tested via
      syntax review
- [ ] Edge fn input validation + rate-limit + honeypot + CORS lockdown
      + kill switch + DRY_RUN
- [ ] Smoke 13+/13+ pass; wired in deploy.yml as Gate 22
- [ ] Landing page renders at 375x812 + 768x1024 + 1024 EN + FR-CA
- [ ] All 16 locale files updated; audit-translations-deep exits 0;
      em-dash count zero
- [ ] 2 help articles EN + FR-CA shipped before page goes public
- [ ] Admin surface live at /admin/partner-applications
- [ ] Sitemap + llms.txt updated
- [ ] STATE.md updated same commit
- [ ] CI gates 1-7 + 22 green on deploy.yml
- [ ] No new dep added; reuses Resend, Supabase client, KV rate-limit,
      existing zod-style validators
- [ ] Time-box ≤ 8h (2× of 4h estimate). If exceeded: stop, return
      diff, re-spec
- [ ] User saw the proof: curl output paste + screenshot of admin
      surface + smoke pass count
