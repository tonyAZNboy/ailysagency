# ⏰ REMINDER: Resume content + translation work after Tuesday 2026-05-05, 1:00 PM Eastern

**Created:** 2026-05-02 by autopilot session
**Trigger:** Token quota refreshes Tuesday 1pm. Until then: pure engineering only, no content/translation work.
**Auto-delete:** This file should be deleted by the next session AFTER reading + actioning the work below.

---

## Why this file exists

The 2026-05-02 autopilot session shipped 27 PRs but hit the user's
weekly token quota mid-run. User explicitly said: "vu que nous sommes
a la limit des token quota pour cette semain, on ferra tous les
traduction apres mardi a 1pm. maintenant seulement EN/FR".

The remaining content + translation work is queued below in priority
order. The session that runs Tuesday 1pm or later should read this
file FIRST, then attack the queue.

---

## Priority queue (highest leverage first)

### 1. Phase 1 industry partial-i18n — remaining 4 verticals

**Status:** 3 of 7 verticals done in PRs #121-#123 this session
- ✅ dentists, lawyers, restaurants → ES + ZH + AR + RU partial
- ❌ contractors, clinics, real-estate, hotels → still EN+FR only

**Pattern reference:** `src/data/industries.ts` lines ~423-540 (dentists `i18n` block).

**Fields to translate (per locale):** eyebrow, headline1, headline2, subheadline, 4 stats, 3 topQueries, 4 painPoints (title + description), ctaPrimary, ctaSecondary, seoTitle, seoDescription. Skip methodology + sampleCitations + FAQ + recommendationReason + seoKeywords (fall back to EN per partial-coverage convention).

**Estimated effort:** ~50 strings × 4 langs × 4 verticals = ~800 translated strings. 1 PR per vertical recommended.

### 2. Help article translations — 11 articles to ES/ZH/AR/RU

**Status:** EN canonical + FR-CA full coverage shipped (this session and earlier).

**Articles to translate:**
- `partner-program-overview`
- `how-to-apply-as-a-partner-agency`
- `ailys-verified-badge-overview`
- `ailys-verified-badge-embed-howto`
- `ailys-verified-badge-verification-process`
- `ailys-industry-reports-overview`
- `ailys-concierge-overview`
- `ailys-concierge-privacy-deep-dive`
- `tech-health-pack-explained`
- `gsc-indexation-audit-explained`
- `wikidata-q-number-explained`

**Pattern reference:** add `i18n.es`, `i18n.zh`, `i18n.ar`, `i18n.ru` blocks with `title`, `excerpt`, `body` fields in `src/data/help-articles.ts`. See existing `i18n.fr` block on each article for shape.

**Estimated effort:** ~600 words × 4 langs × 11 articles ≈ 26,000 words. Substantial. Plan multiple focused sessions, NOT one mega PR. One article × 4 langs per PR is the cleanest unit.

### 3. Cookie banner + newsletter signup full 16-locale refactor

**Status:** Currently EN/FR binary toggle inline via `T(en, fr)` helper. Other locales fall back to EN.

**Action:**
1. Refactor `src/components/CookieConsentBanner.tsx` to use global `t.cookieBanner.*` from i18n.
2. Refactor `src/components/landing/NewsletterSignup.tsx` similarly.
3. Add `cookieBanner` + `newsletterSignup` blocks to all 16 locale files in `src/i18n/translations/*.ts` (EN canonical + FR-CA full + 14 secondary EN-placeholder).
4. Run `node scripts/audit-translations-deep.mjs` — must exit 0.

**Estimated effort:** ~25 strings × 16 locales = 400 strings, but 14 of those locales just get EN placeholder so actual translation work is ~25 × 2 (EN + FR) = 50 hand-written strings.

### 4. Glossary terms refactor + translations

**Status:** `src/data/glossary.ts` currently has hardcoded `shortEn/shortFr/longEn/longFr` fields.

**Action:**
1. Refactor `GlossaryTerm` interface to use `i18n: Partial<Record<SupportedLang, { short, long }>>` pattern matching industries.
2. Migrate existing FR data into the new structure.
3. Add ES + ZH + AR + RU translations for the 20+ glossary terms in sitemap.

**Estimated effort:** Refactor ~30 min. Translations: ~5 strings × 5 langs × 20 terms = 500 strings.

### 5. Industry pages additional verticals (from parallel session)

**Status:** Parallel session on 2026-05-02 was scaffolding new industries (nail salons, sushi comptoir per their screenshot). They may have already added these.

**Action BEFORE touching this:**
1. `git fetch origin && git log --oneline origin/main ^[your-base-tag]` to see what shipped while this session was running.
2. Check if `src/data/industries.ts` has new verticals.
3. If yes: skip (parallel session handled it).
4. If no: scaffold using existing FULL DEEP pattern + translations as separate PR.

---

## Work that does NOT need to wait until Tuesday

These are pure engineering / non-content tasks safe to ship anytime:

- **F3.1+ White-Label real build** (gated on F3.0 demand validation; need 3+ qualified partner applications)
- **Reviuzy F1.1 / F5.2** (cross-repo work)
- **Wire serverError into remaining endpoints** (audit-pdf, audit-request, chat-advisor, cron-process-sequences, cron-day1-retry) — mechanical adoption, ~25 lines each, see PR #131 + #132 for reference pattern
- **Audit log shared lib extraction** (similar to `serverError.ts`; common pattern across endpoints not yet unified)
- **/admin/system-health UI page** (was deferred to avoid conflict with parallel session admin work; check if parallel session added admin pages first)
- **react-refresh + react-hooks/exhaustive-deps** 21 warnings case-by-case audit

---

## Operator actions still pending (from earlier this session)

These don't require any content/translation work but should happen for full feature activation:

1. **Provision AiLys Supabase project** (config.toml has `project_id = "REPLACE_WITH_AILYS_PROJECT_ID"`)
2. **Apply migrations 0001-0005** to provision schema
3. **Set Cloudflare Pages env vars** to activate F3.0 + ops infra:
   - `PARTNER_APPLICATIONS_KILL_SWITCH=true`
   - `OPERATOR_NOTIFY_EMAIL=anthonyng135@gmail.com` (or alias)
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (existing)
   - `PARTNER_APPLICATIONS_RATE_LIMIT` KV namespace binding
   - `NEWSLETTER_RATE_LIMIT` KV namespace binding
   - `FOUNDING_CLIENTS_RATE_LIMIT` KV namespace binding
4. **Run live curl Gate M1** on F3.0 once env vars are set
5. **Wikidata Q-number registration** for AiLys Agency (external action)

---

## Next-session checklist

When this file is read by a new session:

- [ ] Read this entire file
- [ ] Read `STATE.md` "🏁 SESSION CLOSE 2026-05-02" + "⏰ DEFERRED TO TUESDAY 1PM" sections
- [ ] Confirm token quota has refreshed (check date/time vs Tuesday 1pm)
- [ ] Cross-reference parallel session work via `git log --oneline origin/main ^v0.15.0`
- [ ] Pick item from priority queue (1 → 5 above)
- [ ] Ship in small focused PRs (NOT one mega PR)
- [ ] Delete this file once the queue is empty
