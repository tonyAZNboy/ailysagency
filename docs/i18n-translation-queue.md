# i18n Translation Queue

Running ledger of all new translation keys added during the "boost to the moon" phase work. Items here need to be translated into the 14 non-EN locales (or at minimum the 5 non-EN majors: FR-CA, ES, ZH, AR, RU).

**Convention:** EN is canonical. Strings here are listed as `path.to.key` with the EN value. For each row, mark the language status:
- `✓` = translated and verified
- `~` = EN placeholder (auto-fallback, NOT translated)
- `–` = not applicable / no entry

**Priority languages (do these first):** FR-CA, ES, ZH, AR, RU.
**Secondary languages (lower priority):** DE, HI, IT, JA, KO, NL, PL, PT, TR, VI.

---

## Phase 1 · Industry pages (`src/data/industries.ts`)

Each industry has its own content object with ~50 strings. EN and FR are populated for all 7. Other languages currently fall back to EN via `getIndustryContent()` in `industries.ts`.

### Per-industry translation status

| Industry slug | EN | FR | ES | ZH | AR | RU | DE/HI/IT/JA/KO/NL/PL/PT/TR/VI |
|---|---|---|---|---|---|---|---|
| dentists       | ✓ FULL DEEP | ✓ FULL DEEP | ✓ partial (hero+stats+pain+CTA+SEO) | ✓ partial | ✓ partial | ✓ partial | ~ EN fallback |
| lawyers        | ✓ FULL DEEP | ✓ FULL DEEP | ✓ partial | ✓ partial | ✓ partial | ✓ partial | ~ EN fallback |
| restaurants    | ✓ FULL DEEP | ✓ FULL DEEP | ✓ partial | ✓ partial | ✓ partial | ✓ partial | ~ EN fallback |
| contractors    | ✓ FULL DEEP | ✓ FULL DEEP | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback |
| clinics        | ✓ FULL DEEP | ✓ FULL DEEP | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback |
| real-estate    | ✓ FULL DEEP | ✓ FULL DEEP | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback |
| hotels         | ✓ FULL DEEP | ✓ FULL DEEP | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback | ~ EN fallback |

### Action items
1. ✅ **DONE 2026-05-02:** All 7 industries are now FULL DEEP in EN + FR
   (PR #115 contractors, #116 clinics, #117 real-estate, #118 hotels).
   Each has 4-6 vertical-specific pain points, 8-step methodology, 3
   sample citations, 5-6 industry-tuned FAQ Q+A pairs, 4 stats with
   real numbers. Quebec terminology native throughout. ~~Each needs:~~

   ~~Original action item below for historical reference:~~
1. ~~**Promote contractors / clinics / real-estate / hotels to FULL DEEP content** in EN + FR (replace `buildPlaceholderContent` calls). Each needs:~~
   - 4-6 vertical-specific pain points with full descriptions (currently 4 generic ones)
   - 3 sample LLM citations (currently empty `[]`)
   - 5-6 industry-tuned FAQ Q+A pairs (currently 3 generic ones)
   - 4 vertical stats with real numbers (currently generic placeholders)
2. **Translate full content to ES/ZH/AR/RU** for all 7 industries (35 content blocks × 50 strings ≈ 1,750 translated strings).
3. **DE/HI/IT/JA/KO/NL/PL/PT/TR/VI** can keep EN fallback unless we see traffic from those languages.

### How to add a translation
Open `src/data/industries.ts`, find the industry object, add or extend the `i18n` field:
```ts
i18n: {
  es: {
    eyebrow: "SEO IA para [vertical]",
    headline1: "...",
    // ... only the keys you want to override
  },
  zh: { ... },
  // etc.
},
```
The page component (`src/pages/Industry.tsx`) calls `getIndustryContent(industry, lang)` which merges the override on top of EN.

---

## Phase 2 · Comparison pages (TBD)

(To be filled when comparison pages ship)

---

## Phase 3 · Founding Clients section (TBD)

(To be filled when section ships)

---

## Phase 4 · Glossary (TBD)

30+ glossary terms (AEO, GEO, E-E-A-T, schema, NAP, etc.) need EN + 5 majors at minimum.

---

## Phase 5 · AI Visibility Score tool (TBD)

UI strings: form labels, score band copy ("excellent / good / weak / critical"), share text.

---

## Phase 6 · Public Citations Tracker (TBD)

UI: filters, table headers, empty states, freshness indicators.

---

## Phase 7 · Annual report (TBD)

Long-form content. Likely EN + FR only initially. Other languages can use a translated abstract + link to EN PDF.

---

## Phase 8 · Technical SEO (no UI text)

llms.txt, robots.txt updates do not need translation. Open Graph copy for industries already covered by industry seo fields.

---

## Phase 9 · Conversion components (TBD)

- Newsletter signup: 3-5 strings (eyebrow, button, success state, privacy line, error)
- Exit-intent modal: 4-6 strings (headline, subhead, CTA, dismiss, optional small print)
- Sticky mobile CTA: 1-2 strings (button label, optional secondary)

---

## Phase 10 · Analytics + retargeting (no UI text)

Pixel IDs and event names are infrastructure. Cookie banner is the only UI surface needing translation:
- Cookie banner: ~6 strings (title, body, accept all, customize, save preferences, learn more link)

---

## Status update 2026-05-02

`scripts/audit-translations-deep.mjs` reports **0 missing keys across all 15
non-EN locales**. The 11-key gap surfaced after the Tech Health Pack + GSC
Indexation Audit + audit hold-back ships was closed in PR #106
(`v0.14.5-i18n-100pct`):

- ES/ZH/AR/RU received native translations.
- DE/HI/IT/JA/KO/NL/PL/PT/TR/VI received EN placeholders per the
  secondary-locale convention in this doc.

Full content depth (industry pages, help articles, blog posts) is still
EN-FR only for ES/ZH/AR/RU/secondary. The phase tracker below remains
the source of truth for what content depth still needs native pass.

---

## Bulk translation strategy

When ready to translate, group by phase. The translation script at `scripts/audit-translations.mjs` can verify completeness. Suggested batch flow:

1. Phase 1 industries first (highest commercial value, most strings)
2. Phases 9-10 conversion + cookie (highest legal impact for consent)
3. Phase 4 glossary (semantic SEO compounding)
4. Phases 2-3 comparison + founding (sales lift)
5. Phases 5-7 (authority builds, lower urgency)

For each batch, dispatch a focused translation agent with explicit:
- File paths
- Insertion patterns
- Constraints (no em-dashes, brand names preserved, no AI fingerprints)
- Verification commands (grep counts, typecheck)
