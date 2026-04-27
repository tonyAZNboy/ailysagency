# AiLys Agency — Project State

**Last updated:** 2026-04-27 (Phase 1 tier rebuild, post cadence + features 2026)
**Branch:** `main` · **Tag:** `v0.2.0` · **Active commit (local):** TBD after Phase 1 commit
**Production:** https://ailysagency.pages.dev (manual `wrangler pages deploy` until GitHub→Cloudflare hook is reconnected — see Open known limitations)
**Pricing (current):** $300 / $600 / $1,200 / $1,599 CAD per month, 4 tiers, month-to-month, 30-day satisfaction guarantee.
**GBP post cadence:** Starter 1/mo · Core 4/mo (1/wk) · Growth 8/mo (2/wk) · Autopilot 12/mo (3/wk).

---

## What's shipped

### Site surface (v0.2.0)
- Landing page (Index.tsx) with all sections built and translated
- 7 industry landing pages (`/industries/dentists`, `/lawyers`, `/restaurants`, `/contractors`, `/clinics`, `/real-estate`, `/hotels`) + index `/industries`
- 3 comparison pages (`/vs/sterling-sky`, `/vs/brightlocal`, `/vs/localiq`)
- 20-term glossary (`/glossary`) with dynamic `:slug` routes
- Free AI Visibility Score tool (`/tools/ai-visibility-score`)
- Audit pages: `/audit` (AI Visibility), `/audit/gbp` (GBP Pulse, two-mode toggle: instant self-assessment + Anthropic-backed deep audit)
- Blog + Help center (already pre-existing)
- Book-call page, legal pages, auth scaffold

### Conversion + SEO infrastructure
- Cookie consent banner (Loi 25 / GDPR / PIPEDA compliant)
- Exit-intent modal (pointer-leave + scroll-up triggers, 24h cooldown)
- Newsletter signup component (honeypot, disposable-email reject)
- LandingChatWidget (UI translated; backend reuses Reviuzy Supabase functions, see "Open issues" below)
- Founding Clients Program section (transparent ethical Tier S replacement)
- llms.txt at root for LLM bot discovery
- Sitemap with 944 URLs across 16 languages
- A+ security headers (HSTS, CSP, X-Frame-Options, Permissions-Policy)
- Schema.org coverage on every key page (Service, FAQPage, BreadcrumbList, DefinedTermSet, Organization)

### Audit engine
- AutoAuditEngine: AI-backed audit via Reviuzy `reputation-audit` Supabase edge function
- GbpPulseEngine: 8-question self-assessment, 10 weighted signals, vertical-tuned multipliers (10×9 = 90)
- LlmCitationMatrix: 6 engines × 3 queries grid via `/api/llm-citation-matrix` (Anthropic Claude Haiku, KV-cached)
- PlacesPreview: real GBP data via `/api/places-lookup` (Google Places API)
- CompetitorOverlay: 3 nearest competitors via `/api/places-nearby`
- SchemaPreview: copy-paste-ready LocalBusiness + FAQPage JSON-LD per vertical
- ExportActionPlan: Send to Notion / Google Doc / Email / Clipboard

### Cloudflare Pages Functions (`/functions/api/`)
| Endpoint | Status | Requires |
|---|---|---|
| `hero-citation` | live | `ANTHROPIC_API_KEY` |
| `ai-visibility-score` | live | `ANTHROPIC_API_KEY` (+ `AI_VIS_CACHE` KV) |
| `llm-citation-matrix` | live | `ANTHROPIC_API_KEY` (+ `LLM_MATRIX_CACHE` KV) |
| `places-lookup` | live | `GOOGLE_PLACES_API_KEY` (+ `PLACES_CACHE` KV) |
| `places-nearby` | live | `GOOGLE_PLACES_API_KEY` (+ `PLACES_CACHE` KV) |
| `newsletter-subscribe` | live | optional `RESEND_API_KEY` |

All functions return graceful sample fallback when their API key is missing.

---

## i18n status (verified by `scripts/audit-translations-deep.mjs`)

| Locale | Tier | Key parity | Placeholders | Em-dashes |
|---|---|---|---|---|
| en | canonical | 1,032 keys | — | 0 (in code; 2 in comments only) |
| fr | major | 100% | 26 (legitimate brand/cognate) | 0 |
| es | major | 100% | 20 (legitimate) | 0 |
| zh | major | 100% | 24 (legitimate) | 0 |
| ar | major | 100% | 24 (legitimate) | 0 |
| ru | major | 100% | 25 (legitimate) | 0 |
| de | secondary | 100% | 26 ✅ translated | 0 |
| it | secondary | 100% | 29 ✅ translated | 0 |
| pt | secondary | 100% | 26 ✅ translated | 0 |
| nl | secondary | 100% | 29 ✅ translated | 0 |
| pl | secondary | 100% | 25 ✅ translated | 0 |
| ja | secondary | 100% | 28 ✅ translated | 0 |
| ko | secondary | 100% | 31 ✅ translated | 0 |
| tr | secondary | 100% | 26 ✅ translated | 0 |
| vi | secondary | 100% | 28 ✅ translated | 0 |
| hi | secondary | 100% | 29 ✅ translated | 0 |

**16 of 16 locales fully translated.** All locales now sit between 20 and 31 placeholders (legitimate brand lists, email placeholders, Latin-script schema/tech names).

---

## Open issues / next session

### Priority A (Phase 1 — DONE this session)
- **Tier 3 Autopilot price** raised from $1,299 to $1,599 across 16 locales + code (114 + 32 = 146 substitutions).
- **GBP post cadence ladder** wired into tier features (1 / 4 / 8 / 12 per month).
- **2-3 net-new 2026 features per tier** added to the marketing surface: AEO content brief generator, GBP Q&A monitoring, Share of Model dashboard, brand sentiment + citation freshness alerts, AI traffic conversion tracker, dedicated success strategist + monthly executive briefing.
- **3 net-new i18n keys** (tier1Feat7, tier2Feat8, tier3Feat9), all 21 changed/new tier feature keys translated to 15 non-EN locales (315 strings).
- **CLAUDE.md hard rules 9-12** added: Government-grade security on every new feature, help center docs without proprietary disclosure, mandatory admin center surface, tests-must-pass-before-delivery.
- Audit clean: 16/16 locales at 100%, 0 em-dashes in translations, typecheck clean, build green.

### Priority B (Phases 2-4 — NEXT sessions, each one full feature with admin + help docs + tests + deploy)

**Phase 2 — Reviuzy GBP gaps (~3 days):**
- B.1 GBP photo upload automation (4-6 photos/mo for Autopilot). Reviuzy currently lacks this.
- B.2 GBP Q&A bot (auto-draft replies, human approval) — surfaced as a Core+ feature in marketing, not yet built in Reviuzy.
- B.3 GBP attribute / category management (currently sync-only).
- All three need: rate-limit, tenant-scoped audit log, admin panel toggle, EN+FR-CA help articles before going live.

**Phase 3 — Citation directory + NAP (~1 week):**
- C.1 Directory submission engine (Yelp, BBB, Yellow Pages, vertical directories) so the "5/10 citations per month" promise is real.
- C.2 NAP consistency checker scanning 20+ directories.
- C.3 Citation tracking dashboard (per directory, per month, per location).

**Phase 4 — AI visibility advanced (~2 weeks):**
- D.1 Share of Model dashboard (real backend behind the marketing claim) — tracks brand mention frequency per LLM vs 3 named competitors.
- D.2 Brand sentiment in LLM responses (positive/neutral/negative classification per citation).
- D.3 Citation freshness alerts (40-60% of cited sources change month to month — alert when AiLys client churns out).
- D.4 AI traffic conversion tracker (UTM-based attribution from AI search referrers to bookings, pluggable into client GA4/Plausible).

**Each phase MUST satisfy CLAUDE.md hard rules 9-12 before merging.**

### Priority C (configuration tasks for the user, not Claude)
Set in **Cloudflare Pages → ailysagency project → Settings → Environment variables**:
- `ANTHROPIC_API_KEY` — activates LLM citation matrix, hero citation strip, AI visibility score (currently shows samples)
- `GOOGLE_PLACES_API_KEY` — activates PlacesPreview + CompetitorOverlay
- `RESEND_API_KEY` — activates newsletter double-opt-in confirmation emails
- `VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID` — analytics (after consent)

GitHub Actions secret (for the auto-deploy workflow at `.github/workflows/deploy.yml`, currently staged but not committed):
- `CLOUDFLARE_API_TOKEN` — Cloudflare Pages: Edit, scoped to the ailysagency project. The unified Workers & Pages dashboard removed the legacy "Git integration" management UI; reconnecting the GitHub webhook is no longer possible from the dashboard, so we restore auto-deploy via GitHub Actions instead.

### Priority B (deferred audit engine enhancements)
Documented in `docs/audit-engine-roadmap.md`:
- Phase B.4 PDF export (~10h, high value)
- Phase C.2 Continuous monitoring upsell (~12h, recurring revenue)
- Phase C.4 Anonymized peer benchmark (~6h)
- Phase D.6 Competitor content critique (~6h)
- Phase D.2 Audit-my-competitor tab (~8h, viral)
- Phase B.2 SSE streaming theater (~6h)
- Phase D.1, D.4, D.5, D.7, D.8 — voice mode, embeddable widget, resellers API, multiplayer audit, GSC OAuth

### Priority C (configuration tasks for the user, not Claude)
Set in **Cloudflare Pages → ailysagency project → Settings → Environment variables**:
- `ANTHROPIC_API_KEY` — activates LLM citation matrix, hero citation strip, AI visibility score (currently shows samples)
- `GOOGLE_PLACES_API_KEY` — activates PlacesPreview + CompetitorOverlay
- `RESEND_API_KEY` — activates newsletter double-opt-in confirmation emails
- `VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID` — analytics (after consent)

KV namespace bindings recommended:
- `CITATION_CACHE`, `AI_VIS_CACHE`, `LLM_MATRIX_CACHE`, `PLACES_CACHE` (24h TTL each)

### Open known limitations
- Chat widget UI is translated, but backend uses Reviuzy's Supabase functions (chat answers may lean Reviuzy-flavored). Long-term path documented in LandingChatWidget.tsx header comment as `TODO(ailys-chat)`.
- **Cloudflare auto-deploy on push is broken since ~04-26** (GitHub webhook stopped firing after a stuck-loop redeploy of `e6d5c40`). Confirmed by deployment list showing 30+ commits skipped between `e6d5c40` and `11f6b16`. The unified Workers & Pages dashboard removed the Git integration management UI for migrated projects; reconnect via GitHub Actions workflow (staged at `.github/workflows/deploy.yml`, awaiting `CLOUDFLARE_API_TOKEN` secret).
- **Phase 1 marketing features ahead of build.** The new bullet points (Share of Model dashboard, AEO content brief generator, GBP Q&A monitoring, AI traffic conversion tracker, sentiment + citation freshness alerts, dedicated strategist) are sold but not yet implemented in Reviuzy or as Cloudflare Functions. Phases 2-4 close those gaps. Until shipped, agency delivery is manual or via partial substitutes; this is documented internally and will be reflected in onboarding scripts.

---

## Tools + scripts shipped

| Script | Purpose |
|---|---|
| `scripts/audit-translations-deep.mjs` | Loads all 16 locales, diffs against EN, reports per-locale missing keys + placeholder counts |
| `scripts/audit-content-i18n.mjs` | Audits blog post + help article i18n completeness |
| `scripts/audit-translations.mjs` | Lighter UI-key audit |
| `scripts/inject-srseo.mjs` | Idempotent srSeo key injection across locales |
| `scripts/strip-em-dashes.mjs` | Replaces all em-dashes with appropriate punctuation |
| `scripts/rebrand-translations.mjs` | Reviuzy → AiLys Agency rebrand pass |
| `scripts/dump-major-placeholders.mjs` | Lists placeholder keys per major locale for review |
| `scripts/dump-priority-keys.mjs` | Extracts priority translation keys |
| `scripts/extract-hi-placeholders.mjs` | Dumps HI placeholder keys + EN values to JSON (reusable per-locale pattern) |
| `scripts/merge-hi-translations.mjs` | Applies a JSON of translations back into hi.ts and re-serializes the locale file |
| `scripts/migrate-tier3-price.mjs` | Migrates Tier 3 price across all 16 locales + code (handles comma, period, and space thousands separators) |
| `scripts/dump-tier-features.mjs` | Dumps the 21 changed/new tier feature EN strings to JSON |
| `scripts/merge-tier-translations.mjs` | Merges per-locale tier feature translations into all 15 non-EN .ts files |
| `scripts/generate-sitemap.mjs` | Regenerates sitemap.xml + 16 per-language sitemaps |

---

## Reference docs

- `CLAUDE.md` — project memory rules (always-test, no em-dashes, no AI fingerprints, brand-name preservation, security-first, agent verification)
- `docs/audit-engine-roadmap.md` — Phase B-D enhancement roadmap
- `docs/i18n-translation-queue.md` — translation tracking
- `docs/i18n-audit-report.json` — last audit run output (machine-readable)

---

## Pickup checklist for next session

1. `git pull` to sync latest main (Phase 1 commit + HI commit `d9cca4b` + STATE.md commit `11f6b16` should all be present).
2. Run `node scripts/audit-translations-deep.mjs` — confirm 16/16 at 100%, placeholder counts in the 20-31 range across all secondaries.
3. Pick one of Phases 2/3/4 and follow the playbook: Reviuzy backend feature → admin panel → help center articles (EN+FR-CA minimum, then 14 secondaries) → Gov-grade security defaults (zod, rate-limit, audit log, RLS) → tests pass → manual deploy until GitHub Action lands.
4. If pushing for the first time after the GitHub Action workflow is committed: confirm `CLOUDFLARE_API_TOKEN` secret is set on the repo before push, or the workflow run will fail.
5. Always: `npm run build && npx wrangler pages deploy dist --project-name=ailysagency --branch=main` for safe shipping until auto-deploy is back.
6. Verify in production after every deploy: hero, audit, services tier cards, pricing builder, /fr, /es, /zh, /ar, /ru.
