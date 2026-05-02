# 04 — Rollback plan

## Disable mechanism (env-var fail-closed)

NOT applicable. The lib has no kill switch (per 01-threat-model.md
"Kill switch env var" section). Endpoint-level kill switches
(`PARTNER_APPLICATIONS_KILL_SWITCH`, etc.) already disable the entire
endpoint and subsume the lib.

## Migration revert

NOT applicable. No migration is added.

## KV / R2 leftovers to purge

NONE. The lib does not write to KV or R2.

## Signed URL invalidation

NOT applicable. The lib does not generate signed URLs.

## Code rollback

If a regression surfaces post-deploy:

1. `git revert <commit-hash>` of the single commit that introduced this
   sub-phase. The revert restores the three inline `forwardToSupabase`
   helpers verbatim.
2. Push to main → Cloudflare Pages re-deploys with inline helpers.
3. Smoke test re-runs to confirm baseline restored.

Estimated revert time: ≤ 5 minutes (one commit, one push, auto-deploy).

## Risk assessment

LOW. The refactor preserves:

- The wrapping function name (`forwardToSupabase`) at each call site.
- The return shape (`{ ok: boolean; error?: string }`).
- The fail-open semantics on missing env vars.
- The Prefer header values (with ignoreDuplicates option to express the
  partner-application variant).

Behavioral parity is asserted by the smoke (15 cases) AND by the live
curl gate against the two production endpoints.

## Forward compatibility

The lib's public API (`insertSupabaseRow`) is designed to add options
(retry, idempotency-key, schema namespace) without breaking existing
callers. New options will be opt-in defaulted to current behavior.
