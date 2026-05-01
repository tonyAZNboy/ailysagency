# Feature 2 sub-phase breakdown

## F2.1 — Recipe registry + queue tables + lifecycle fns

**Repo:** Reviuzy
**Time-box:** 1 session (~6h)

- Migration `0011_remediation.sql`:
  - `remediation_recipes` (action_type pk, requires_approval bool, executor_fn text, rollback_fn text, est_minutes int, max_per_day_per_tenant int)
  - `auto_remediations` (id, tenant_id FK, source_finding_id uuid, source_finding_table enum, action_type FK, status enum, payload jsonb, executed_at, executed_by, undo_payload jsonb)
  - RLS tenant-scoped; service role for executor + cron writes
- Edge fns scaffold (no recipes yet):
  - `enqueue-remediations` (cron stub returning summary)
  - `execute-remediation-queue` (cron stub processing zero recipes)
  - `approve-remediation` (HMAC verified)
  - `rollback-remediation` (HMAC verified)
- Smoke `smoke-remediation-lifecycle.mjs` (10 cases: enqueue persists, approve flips status, rollback restores, RLS isolation, idempotency)

## F2.2 — Recipes 1-3 (schema injection, NAP, review reply)

**Repo:** Reviuzy
**Time-box:** 1 session (~6h)

- `inject_schema_jsonld`: payload = JSON-LD doc + target page; executor injects via Wordpress plugin webhook OR surfaces copy-paste block in approval inbox; rollback removes JSON-LD via inverse webhook
- `submit_nap_correction`: payload = directory + NAP delta; executor calls Yelp Fusion API (free) or Google Knowledge Panel (manual fallback); rollback submits previous values
- `publish_review_reply`: payload = review_id + reply_text; executor calls GBP API; rollback edits reply to empty string + flags audit
- Each recipe has its own smoke test (~6 cases each)

## F2.3 — Recipes 4-5 (GBP photo, FAQ schema)

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- `upload_gbp_photo`: payload = caption + image bytes (from Reviuzy SaaS upload UI); executor calls GBP API; rollback removes photo via GBP API
- `deploy_faq_schema`: payload = list of {question, answer}; executor injects FAQPage JSON-LD via Wordpress plugin or surfaces block; rollback removes
- Smoke per recipe (~6 cases each)

## F2.4 — Recipes 6-7 (sitemap, citation submit)

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- `regenerate_sitemap_xml`: payload = root_url; executor crawls + writes sitemap.xml + submits to GSC + Bing Webmaster via their indexing APIs (both have free quotas)
- `submit_citation_directory`: payload = directory + NAP; executor hits directory APIs (Yelp, YP, etc.); tier-aware quota: Core 5/mo, Growth 10/mo, Agency 15/mo, Starter ineligible
- Smoke per recipe + integration test against live test directories

## F2.5 — Admin panel + per-client widget + AiLys help articles

**Repo:** Reviuzy + AiLys
**Time-box:** 1 session (~6h)

- Reviuzy `/admin/remediations`: queue table with filters, bulk approve, diff preview drawer, rollback action
- Per-client dashboard widget: "23 auto-deployed, 5 awaiting your approval"
- AiLys help articles EN+FR-CA: `auto-remediation-explained`, `approving-and-rolling-back-fixes`, `recipe-types-overview`
- AiLys cross-repo proxy `remediation-stats-proxy`
- STATE.md update + tag `v0.14.0-auto-remediation-complete`

## Dependencies

F2.1 → F2.2 → F2.3 → F2.4 → F2.5 (serial). F2.2-F2.4 each ship their recipes incrementally; partial recipe set is OK if they're fully tested per-recipe.

**Cross-feature dep:** F2 reads findings from Feature 1's `audit_web_findings` table. Ship F1.1-F1.3 minimum before F2.2.

## Definition of Done

- [ ] All 7 recipes shipped + each recipe has its smoke test
- [ ] Idempotency: re-running same action_type with same payload + tenant = no-op (verified)
- [ ] Rollback tested per recipe in staging (DRY_RUN mode)
- [ ] Cost telemetry < $50/mo at 50 active Growth+ tenants
- [ ] Help articles live before any UI surface
- [ ] Admin queue panel + per-client widget live
- [ ] Sentry on every executor failure
