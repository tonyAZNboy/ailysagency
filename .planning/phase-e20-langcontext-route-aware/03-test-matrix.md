# Phase E.20 — Test matrix

| Layer | Count | Description |
|---|---|---|
| Smoke (Gate 17) | 5 | LangRouteSync.tsx exists; uses useLocation + useLang; lang prefix derivation present; mounted in App.tsx; idempotent equality guard present |
| Manual browser | 4 | (a) `/blog/<slug>` → click FR link → navbar FR (no reload). (b) Direct `/fr/...` first load → navbar FR. (c) Lang switcher EN→FR clicks → navigates to `/fr` + navbar FR. (d) `/fr/...` → click EN-prefixed link → navbar EN. |
| i18n locale switch | 1 | After nav, `<html lang>` + `og:locale` reflect new lang. |
| RTL | 1 | Switching to AR via `/ar` route flips `<html dir>` to `rtl` (existing setLang behavior preserved). |

## Acceptance
- 5 smoke cases pass, all green
- 4 manual gates pass at 375x812 + 768x1024
- tsc clean, build green
- No regression on E.19 help-article body localization

## Time-box
0.75h estimate. Escape hatch at 1.5h.
