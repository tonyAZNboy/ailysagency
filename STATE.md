# AiLys Agency — Project State

**Last updated:** session ending at v0.2.0 tag
**Branch:** `main` · **Tag:** `v0.2.0` · **Commit:** `dfe517b`
**Production:** https://ailysagency.pages.dev (auto-deploys from main via Cloudflare Pages)

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
| **hi** | **secondary** | **100%** | **~547 ⚠️ DEFERRED** | 0 |

**15 of 16 locales fully translated.** Hindi is the only outstanding locale.

---

## Open issues / next session

### Priority A (do first next session)
1. **Translate HI (Hindi)** — last secondary locale. Use the same agent prompt template as DE/IT/PT/NL/PL/JA/KO/TR/VI. Expected outcome: ~547 placeholders → ~25-30 (legitimate brand/cognate).
2. **Build + deploy production** with HI translations included. Last live deploy was bundle `index-BOlCDSzU.js` from before HI work.

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
| `scripts/generate-sitemap.mjs` | Regenerates sitemap.xml + 16 per-language sitemaps |

---

## Reference docs

- `CLAUDE.md` — project memory rules (always-test, no em-dashes, no AI fingerprints, brand-name preservation, security-first, agent verification)
- `docs/audit-engine-roadmap.md` — Phase B-D enhancement roadmap
- `docs/i18n-translation-queue.md` — translation tracking
- `docs/i18n-audit-report.json` — last audit run output (machine-readable)

---

## Pickup checklist for next session

1. `git pull` to sync latest main
2. Run `node scripts/audit-translations-deep.mjs` — confirm 15 of 16 locales at 100% with placeholders, HI still at ~547 placeholders
3. Dispatch HI translation agent with same prompt template as DE/IT/PT/NL/PL/JA/KO/TR/VI
4. Verify HI: audit row + typecheck + em-dash count
5. `npm run build && npx wrangler pages deploy dist --project-name=ailysagency --branch=main`
6. Verify production bundle contains HI strings via curl + grep
7. Optionally start Phase B.4 (PDF export) per `docs/audit-engine-roadmap.md`
