# Phase E.19 — Sub-phases

Single sub-phase. Atomic. Mergeable in one commit.

## E.19.1 — wire FR body selection in HelpArticle component

**Hour estimate:** 1.5h (with full GSD gates).

**Touch list (read FIRST to confirm structure):**
- `src/pages/HelpArticle.tsx` (or equivalent route component)
- `src/data/help-articles.ts` (article data shape — confirm whether
  fields are `bodyEn/bodyFr` or `body: { en, fr }` or `i18n: { en, fr }`)
- `src/App.tsx` route definitions for help articles (already verified
  earlier in session: `/help/:slug` and `/:lang/help/:slug`)

**Steps:**
1. Read the data shape in `src/data/help-articles.ts` to confirm
   whether localized fields exist per article and their key naming.
2. Read `src/pages/HelpArticle.tsx` end-to-end. Identify where
   `body`, `title`, `excerpt`, and any other localizable fields are
   read.
3. Implement `detectLangFromPath(pathname)` (mirror of the helper
   already in `BlogPostPage.tsx`). If a shared helper exists in a
   utils module, reuse it.
4. Implement `getLocalizedHelpArticle(article, lang)` returning the
   FR fields when `lang === 'fr'` and FR fields are present, otherwise
   EN fields. If a similar helper exists for blog (`getLocalizedMeta`),
   mirror its shape.
5. Wire the helper into `HelpArticle.tsx` for: `title`, `excerpt`,
   `body`, `categoryLabel`, `headings` (if any), `relatedSlugs` titles
   in the related card surface, breadcrumb labels, `<html lang>` and
   `og:locale`.
6. Verify EN renders unchanged for all existing help slugs (no
   regression).
7. Verify FR renders the FR body when the slug ships a FR sister.

**Smoke script:** `scripts/smoke-help-article-fr-routing.mjs` (NEW).
Cases:
- EN URL `/help/<slug>` renders EN title + body
- FR URL `/fr/help/<slug>` renders FR title + body when FR exists
- FR URL `/fr/help/<slug>` falls back to EN body when FR missing
- Unknown slug returns 404 redirect (existing behavior)
- Unknown lang prefix falls back to EN

Smoke runs against an in-memory React test render via `@testing-library/react` if vitest is wired, OR via a static unit test that checks the helper function `getLocalizedHelpArticle` returns the right field shape for both lang values.

If neither test framework is wired in this worktree (vitest is in
Reviuzy not AiLys per STATE.md), the smoke script becomes a node script
that imports the data module and asserts the shape, without React rendering.

**CI gate:** wire smoke into `.github/workflows/deploy.yml` as the next
available numbered gate.

**Deliverables:**
- 1 commit with: `HelpArticle.tsx` edit + helper function + smoke
  script + deploy.yml entry + STATE.md milestone (Section 9)
