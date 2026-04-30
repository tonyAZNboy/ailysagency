# Phase E.19 — Help-article FR-CA routing fix

## Business goal

`/fr/help/<slug>` currently renders the EN body even though the source data
in `src/data/help-articles.ts` ships per-article EN + FR fields. This bug
masks the value of every FR translation the operator hand-writes for help
articles, including the four NFC procurement clarifications shipped in
PRs #36 and #37 (Phase E.18) which the operator explicitly wanted live.

The fix wires the existing FR strings to the FR route, identical in shape
to the blog FR routing fix shipped in PR #35.

## Hours saved per month at fleet scale (50 clients)

Not a recurring-task automation. The lift is one-time UX correctness:
roughly 30 to 60 minutes per FR-CA help-article translation cycle saved
because operator no longer has to paste FR strings into a separate
"FR overlay" or accept that the FR translations sit dead in source.
At fleet scale the recurring win is FR client trust: an AiLys client
reading `/fr/help/<slug>` should see French, not English with French
breadcrumbs.

## Who benefits

- FR-CA clients reading the help center (most AiLys clients are Quebec
  bilingual; many prefer FR-CA support docs)
- Operator (writes FR translations once, sees them rendered)
- AiLys strategist team (can route a FR client to a FR help URL with
  confidence)
- SEO: FR help pages now actually show FR content for Google FR-CA
  indexing

## Cost estimate per invocation

Zero. No paid API consumer. Pure frontend component refactor; the FR
strings are already loaded at build time via the same module that the
EN strings come from.

## Why this dep — N/A

No new npm dependency added. The fix uses already-imported React hooks,
react-router-dom hooks, and existing project utilities.

## Scope

In:
- `src/pages/HelpArticle.tsx` (or equivalent) — wire lang detection +
  FR body selection + localized hreflang + html lang attribute
- `src/data/help-articles.ts` — expose `getLocalizedHelpArticle(slug,
  lang)` if not already there; otherwise leave as-is and read fields
  in the component
- `STATE.md` — milestone update in the same commit per Section 9

Out (deferred to future tickets):
- New help articles or content corrections
- Other locales (ES/ZH/AR/RU and 10 secondaries) — they fall back to
  EN until their FR-pattern siblings ship; this PR keeps that contract
- Help-article admin UI / per-article gating / per-tenant overrides
