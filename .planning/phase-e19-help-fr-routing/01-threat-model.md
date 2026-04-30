# Phase E.19 — Threat model

## Attack surface

Frontend-only component refactor. No new endpoint, no new edge function,
no new database read/write. The fix swaps which already-loaded
JSON-shaped data the React component renders. Attack surface for THIS
change is: the `lang` parameter parsed from `pathname` (e.g. `/fr/help/...`).

## Secrets touched

None. No env var, no API key, no JWT, no HMAC token, no signed URL.

## RLS impact

None. Help articles are static project data, not Supabase rows. There
is no per-tenant scoping of help content.

## Replay / SSRF / injection / replay-window vectors

- **No replay**: read-only client-side render, no mutation.
- **No SSRF**: no outbound HTTP from the component code being added.
- **No injection**: the lang prefix is matched against a fixed allow
  list (`['en', 'fr', 'es', 'zh', 'ar', 'ru', 'vi']` or similar) the
  same way `BlogPostPage` does. Anything outside the allow list falls
  back to `en`. Slug is read-only and rendered through React's default
  text escaping; no `dangerouslySetInnerHTML` introduced.
- **No replay window**: not a signed-payload feature.

## Fail-closed defaults

Default render is EN body. If the FR sister body is missing for a
slug (which is the current state for most help articles outside the
ones touched in PRs #36/#37), the component falls back silently to
the EN body. No crash, no partial render.

## Kill switch env var

Not applicable. No external service to disable. The component is
either rendering EN (status quo before this PR) or rendering FR when
present (status quo after this PR for the slugs that ship FR strings).
A regression would be reverted via plain `git revert`.

## Trust boundary diagram

```
URL pathname ─► detectLangFromPath() ─► allow-list filter ─► 'en' | 'fr' | ...
                                                              │
                                                              ▼
help-article slug ─► HELP_ARTICLES lookup ──► article object
                                              │
                                              ▼
            select body[lang]   if missing → fall back to body['en']
                                              │
                                              ▼
                                         React render
```

No untrusted data flows past the React render boundary.

## Risks NOT mitigated by this PR

- Help-article body content itself is operator-written. If the operator
  pastes XSS into a help-article body, this PR does not protect against
  it (and neither does the current EN-only render). The escape mechanism
  is React's default text rendering. Out of scope for this PR.

- Help-article URL slug enumeration. The slug list is public by design
  (it's a help center). Out of scope.
