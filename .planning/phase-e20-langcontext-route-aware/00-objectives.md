# Phase E.20 — LangContext route-aware re-detection

## Goal
Fix the upstream root cause flagged in Phase E.19: when user navigates
client-side from one lang prefix to another (e.g. `/help/<slug>` →
`/fr/blog/<slug>`), `LangContext.lang` stays stuck on whatever
`detectLang()` returned at initial mount. Result: navbar / footer /
forms / chat widget all show the wrong locale until full page reload.

## Hours saved at fleet scale
N/A. UX correctness fix, not automation.

## Who benefits
- Bilingual visitors who navigate freely between EN and FR pages
  via internal links (currently see mixed-language chrome)
- SEO: `<html lang>` + `og:locale` meta now match the URL post-nav
- Operator: closes the recurring "FR rendering" complaint surface

## Cost per invocation
Zero. Pure component refactor.

## Why this dep
N/A — no new deps. Uses already-imported `useLocation` from
`react-router-dom`.

## Scope
In:
- `src/i18n/LangContext.tsx` (export the detect predicate as a
  reusable helper if not already)
- `src/App.tsx` (mount `<LangRouteSync />` inside `<BrowserRouter>`)
- New file `src/i18n/LangRouteSync.tsx` (small component watching
  `useLocation().pathname`, calling `setLang` when prefix changes)
- `STATE.md` per Section 9
- New smoke `scripts/smoke-lang-route-sync.mjs`

Out:
- Lang switcher behavior (already navigates AND calls setLang —
  both sides will continue to work; no change needed)
- Other locales' content translation queue (separate ticket)
