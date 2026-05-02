# F3.0 — Rollback plan

## Disable via env var (instant, no redeploy)

The endpoint defaults to fail-closed behind a kill switch. To take it
offline at any time:

1. Cloudflare Pages → ailysagency project → Settings → Environment
   variables (Production)
2. Set `PARTNER_APPLICATIONS_KILL_SWITCH` to anything other than `true`
   (case-insensitive). Recommended: `false`.
3. Save. Cloudflare propagates within ~30 seconds.
4. New requests to `/api/partner-application` return 503 with body
   `{"error":"feature_disabled"}`.
5. The landing page `/agencies/partner-program` continues to render
   (it's pure marketing). The form submission button shows the user-
   facing error toast `partnerProgram.form.errorDisabled` but does
   NOT crash the page.

This is the FIRST step in any rollback scenario (abuse, false alarm,
or just to pause for review).

## Rollback the migration

The DOWN script is in `supabase/migrations/0005_partner_applications.sql`
under the rollback comment marker. Apply it:

```bash
supabase migration repair 0005 --status reverted
# OR via SQL directly:
supabase db reset --db-url "$AILYS_DB_URL" --version 0004
```

Pre-revert checklist:
1. Export `partner_applications` data first if any rows exist:
   ```sql
   COPY public.partner_applications TO '/tmp/partner_applications_backup_<timestamp>.csv' WITH CSV HEADER;
   ```
2. Confirm no foreign keys point INTO `partner_applications` (none
   should; this is a leaf table).
3. Drop policies first, then index, then table (the DOWN script
   handles this order).
4. Confirm operator profile policy does not reference the dropped
   table.

Note: as of 2026-05-02, the AiLys Supabase project does not exist
yet (config.toml shows `project_id = "REPLACE_WITH_AILYS_PROJECT_ID"`).
The migration is committed to source but cannot be applied until the
project is provisioned. The DOWN script is therefore tested by SQL
syntax review only, not by actual round-trip apply/revert. This
limitation is logged in 03-test-matrix.md "Coverage gaps".

## Revert the code

If the feature itself is broken (validation bug, UI crash, etc.) and
the kill switch alone is not sufficient:

```bash
# Identify the merge commit
git log --grep "F3.0" --oneline

# Revert the squash merge
git revert -m 1 <merge-commit>
git push
```

This generates a clean revert PR. CI will run on it; merge it; the
hot-fix deploys via existing CI pipeline.

The migration file remains in `supabase/migrations/` but un-applied.
If already applied to a hypothetical staging Supabase project,
follow "Rollback the migration" first.

## Purge KV / R2 leftovers

The MVP uses NO Cloudflare KV namespace, NO R2 bucket. If the
rate-limit KV is added in a follow-up:

```bash
# List rate-limit KV entries with prefix
wrangler kv:key list --binding=PARTNER_RATE_LIMIT --prefix "partner-app:"

# Delete keys (after audit)
wrangler kv:key delete --binding=PARTNER_RATE_LIMIT "partner-app:<ip-hash>"
```

## Invalidate signed URLs

The MVP issues NO signed URLs (no PDF download, no admin token).
Nothing to invalidate.

If a follow-up adds signed download URLs (e.g., for application
attachment uploads), see existing pattern in `audit-pdf-hmac` and the
HMAC rotation procedure in `docs/incident-response.md`.

## Recover from accidental data loss

If `partner_applications` is dropped without backup AND the AiLys
Supabase project has been provisioned with real data:

1. Restore from Supabase nightly backup (point-in-time recovery
   available on Pro plan).
2. If pre-Pro plan: contact operator's email Resend logs for the
   internal alert emails — each contains the full payload at submit
   time. Last 30 days recoverable.
3. If neither: data lost. Operator notifies any partner agencies that
   submitted in the affected window (they have the confirmation email
   with their own data).

This recovery path is documented for completeness; the MVP volume is
expected to be low (<50 applications/month) and Resend internal
alerts ARE the de-facto backup until the AiLys Supabase project is
provisioned with backups.

## Communication plan

If rollback is triggered:

1. Operator updates `/agencies/partner-program` page status banner via
   feature flag (env var `PARTNER_PROGRAM_STATUS_MESSAGE`) to display
   a user-facing notice.
2. Operator emails any pending applicants via Resend with a holding
   message.
3. Internal Slack/Discord alert (if configured per Bonus C in roadmap)
   fires automatically when kill switch flips to false (cron
   monitor).

Rollback complete = feature offline, no user-facing 5xx errors, no
data loss, and a path forward documented.
