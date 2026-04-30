# Phase E.20 — Threat model

Frontend-only component refactor identical in shape to Phase E.19.

## Attack surface
The `lang` prefix parsed from `useLocation().pathname`. Already filtered
through `SUPPORTED_LANGS.includes(prefix)` in the existing `detectLang`
helper. Anything outside the allow list falls back to EN.

## Secrets / RLS / SSRF / replay
All N/A. Read-only client-side state mutation.

## Fail-closed default
If `useLocation()` returns an unexpected pathname or the prefix is not
in the supported list, the helper returns `'en'`. Worst case: lang
falls back to EN, no crash, no data exposure.

## Kill switch
Plain `git revert`. No env var needed (no external service).

## Risks NOT mitigated
- localStorage `reviuzy_lang` still wins as a tiebreaker when on a
  non-prefixed URL (e.g. `/`). That's intentional — preserves user
  preference. Out of scope.
- The route-aware sync runs on every pathname change. Component is
  trivial (one effect, one comparison) — no perf concern.
