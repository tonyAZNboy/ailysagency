# Phase E.20 — Rollback

`git revert <hash>` and Cloudflare auto-deploys. Behavior reverts to
"lang stuck on initial detection" pre-PR. Article bodies still
localize correctly via Phase E.19 slug-first fix in `HelpArticle.tsx`
and `BlogPostPage.tsx`. Only the chrome (navbar/footer) returns to
the stale-lang state.

No DB, no migration, no KV, no R2. ≤5 min rollback.
