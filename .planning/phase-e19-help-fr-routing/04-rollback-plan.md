# Phase E.19 — Rollback plan

## How to disable

Plain `git revert <commit-hash>` and Cloudflare Pages auto-deploys the
revert. The change is purely client-side, no server state to clean up,
no kill-switch env var needed. The previous behavior (EN body always)
is restored within one Cloudflare deploy cycle.

## How to revert migration

N/A. No database migration in this sub-phase.

## How to purge KV / R2 leftovers

N/A. No KV write, no R2 upload.

## How to invalidate signed URLs

N/A. No signed URL issued.

## What survives a revert

- All FR strings in `src/data/help-articles.ts` (operator-written
  content) survive untouched. They simply stop rendering on the FR
  URL until a future re-fix lands.

## What does NOT survive a revert

- The `getLocalizedHelpArticle` helper function (gone with the revert).
- The smoke script `scripts/smoke-help-article-fr-routing.mjs` (gone).
- The deploy.yml CI gate entry for the smoke (gone, but no impact since
  the script is gone too).

## Time-to-rollback estimate

≤ 5 minutes from `git revert` to live (Cloudflare deploy cycle is
typically 2-3 minutes; build is 20-40 seconds).

## Operator authorization

Standard git revert is reversible by operator without my involvement.
No "no rollback path" approval needed (Section 12 escape clause not
invoked).
