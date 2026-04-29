# Phase C.6 : Citation directory auto-batch (cross-repo)

## Business goal

Today, citation submissions to Tier 1 directories (Yelp, BBB, Yellow Pages, Foursquare, MapQuest) are manual. The strategist clicks through each form per client per month. At Core/Growth/Agency cadence (5/10/15 per month), a single 50-client roster generates 250+ manual submissions per month, ~2 hours each = 500h/month.

C.6 automates the submission of "safe" Tier 1 directories that accept structured submissions via:
- Public API (Yelp, Foursquare via Places)
- CSV upload portals (BBB partner program)
- IndexNow-compatible feeds (some directories)

For directories that require human-only forms (legal/compliance reasons), the queue surfaces them for strategist QA but does not auto-fill.

## Hours saved at fleet scale

- **Per client per month at Growth (10 citations):** ~3h strategist time saved
- **At 50 Growth clients fleet-wide:** ~150h/mo saved
- **At full fleet (50 across all tiers):** ~100h/mo saved (mix of Core/Growth/Agency)
- **Strategist-FTE unlock:** 0.6 FTE at 50 clients

## Who benefits

- **Client:** faster citation building, higher consistency, NAP cleanliness
- **Staff:** strategist focuses on QA + judgment + high-friction directories that genuinely need humans
- **Compliance:** every submission still logged with `submission_method=auto|manual` for audit trail

## Deliverable scope

**AiLys side (this worktree):**
1. 1 help center article (EN + FR-CA) describing what the auto-batch does, what it covers, what stays manual, and how the strategist QA works
2. STATE.md update with cross-repo handoff
3. Reviuzy sub-phases fully specced in `02-sub-phases.md`

**Reviuzy side (separate session):**
1. Migration: extend `citation_submissions` with `submission_method` enum (manual/auto/scheduled), `auto_batch_run_id` ref
2. New table `auto_batch_runs` with daily cron schedule
3. Edge fn `citation-auto-batch`: per tenant, fetch eligible directories (Tier 1 safe list), call submission API/portal, log result with idempotency key
4. Adapter pattern per directory: `directories/yelp.ts`, `directories/foursquare.ts`, `directories/bbb-csv.ts`, etc.
5. Admin panel: list runs, success/failure rates, per-directory breakdown, manual re-run button
6. DRY_RUN env mode for safe testing

## Cost estimate per invocation

- **Yelp Public API:** free for read, requires partner status for write
- **Foursquare Places API:** $0.0001 USD per request, ~50 requests/client/month = $0.005/client
- **BBB CSV upload:** $0 (no API charge, login required)
- **At 50 Growth clients:** ~$0.25/mo total external API cost
- **R2 / KV:** negligible

## Monthly budget cap + alert

- **Cap:** $50/mo across the C.6 surface (covers 50,000 Foursquare requests + headroom)
- **Alert:** when 80% reached, Resend email to operator

## Why this dep (Section 10)

**No new npm dependencies.** Reviuzy stack covers:
- `@supabase/supabase-js` for DB + RPC
- `pg_cron` for daily schedule
- Native `fetch` for directory APIs
- Existing `_shared/serviceAuth.ts` pattern for inter-service calls

Each directory adapter is a typed module under `supabase/functions/_shared/directories/`. No SDK installed.

## Acceptance criteria

- [ ] AiLys help article live in production EN + FR-CA, no proprietary AI provider mention
- [ ] Reviuzy migration applied + edge fn deployed + pg_cron registered (operator action)
- [ ] DRY_RUN end-to-end test successful for 1 Growth tenant on 5 directories
- [ ] Live run rates: success >= 90% on Tier 1 (excluding directories that require captcha or human review)
- [ ] Admin panel shows last 50 runs + per-directory success rate
- [ ] Cost telemetry visible: $/mo against the $50 cap

## Strategic note

The "manual still needed" set is intentional. We do NOT pretend to automate everything. The marketing copy on AiLys site (CLAUDE.md "link-building scope") explicitly says we do not automate human-required platforms. Auto-batch is for the directories that legitimately accept structured input.
