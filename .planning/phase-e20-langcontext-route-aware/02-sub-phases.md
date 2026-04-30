# Phase E.20 — Sub-phases

Single sub-phase. 0.75h estimate.

## E.20.1 — LangRouteSync component
1. Add `<LangRouteSync />` component in `src/i18n/LangRouteSync.tsx`.
   Inside it: `useLocation()` + `useLang()` + `useEffect` watching
   pathname. When the URL lang prefix differs from current
   `LangContext.lang`, call `setLang(prefix)`. Do NOT touch `lang`
   when path has no recognized prefix (preserve user-stored choice).
2. Mount `<LangRouteSync />` as the first child INSIDE `<BrowserRouter>`
   in `src/App.tsx`.
3. Verify lang switcher behavior remains: `setLang(code)` + `navigate(/${code})`
   should both still work; `LangRouteSync` is idempotent (no setLang
   call when value already matches).

## Smoke (Gate 17)
`scripts/smoke-lang-route-sync.mjs` cases:
- LangRouteSync.tsx exists and uses `useLocation`
- LangRouteSync.tsx imports useLang from LangContext
- LangRouteSync.tsx contains the lang-prefix derivation
- App.tsx mounts `<LangRouteSync />` inside `<BrowserRouter>`
- Idempotent: no setLang call when lang already matches (assertion on
  source: presence of the equality guard)

## Manual gates
- 375x812: navigate from `/blog/<slug>` to `/fr/help/<slug>` via a
  link click. Navbar buttons should switch from EN to FR.
- 768x1024: same flow.
- Direct `/fr/...` reload: navbar already FR (existing behavior, no
  regression).
- Lang switcher click `EN → FR`: page navigates to `/fr` AND navbar
  reflects FR (no double-flip).
