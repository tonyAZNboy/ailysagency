# Feature 2: Auto-Remediation Engine (Reviuzy primary)

## Business goal

Diagnose AND fix. When the audit (AI Visibility OR Deep Site Audit from Feature 1) detects a gap, the engine generates the fix and either auto-applies it (via API where possible) or queues it for one-click strategist approval. Closes the diagnostic loop that competitors leave open.

## Hours saved + revenue uplift

- **Strategist hours saved:** ~12h/mo per active client at Core+ (auto-execution of routine fixes). At 50 clients = 600h/mo recovered.
- **Tier upgrade trigger:** Growth+ exclusive feature gate; positions Growth/Agency as "fully managed" vs "manual" lower tiers. Targets 15% of Core base to upgrade ($300 MRR each = ~$3k MRR uplift).
- **Differentiation:** competitors run audits but require client to manually action findings. Auto-Remediation is a moat.

## Who benefits

- **Client:** sees "23 fixes auto-deployed this month, 5 awaiting your approval" instead of a backlog of manual TODOs.
- **Strategist:** approves diffs in 30 seconds vs 30 minutes per fix.
- **Operator:** measurable remediation velocity = strong renewal signal.

## Deliverable scope

**Reviuzy side (separate session):**
1. Migrations: `remediation_recipes` (catalog), `auto_remediations` (queue) with poly-FK to `ai_audit_findings` OR `audit_web_findings`
2. Edge fns: `enqueue-remediations` (cron daily, scans new findings, queues), `execute-remediation-queue` (cron 5min, runs queued/approved actions), `approve-remediation` (HMAC, flips status), `rollback-remediation` (HMAC, runs `rollback_fn` using `undo_payload`)
3. 7 recipe types initial scope: inject_schema_jsonld, submit_nap_correction, publish_review_reply, upload_gbp_photo, deploy_faq_schema, regenerate_sitemap_xml, submit_citation_directory
4. Admin panel: `/admin/remediations` queue view with pending/awaiting_approval/executing/done filters, bulk approve, drill-down with diff preview, rollback button
5. Per-client widget: "X fixes auto-deployed this month, Y awaiting your approval"

**AiLys side (this repo):**
1. Help center articles EN+FR-CA: "What auto-remediation does", "Approving and rolling back fixes", "Recipe types and what they touch"
2. Marketing landing: "Diagnose AND fix" positioning
3. Cross-repo proxy `remediation-stats-proxy`

## Cost estimate per invocation

- **Anthropic:** zero for queue ops; LLM only used for review-reply drafting (recipe 3) and FAQ generation (recipe 5). Estimate ~5k tokens/tenant/month at Core+ = $0.30/tenant/mo
- **GBP API:** free (Google Business Profile)
- **Yelp/BBB/YP citation APIs:** mostly free; some require partner accounts (Yelp Fusion is free; BBB requires accreditation = no API integration in MVP, manual fallback)
- **Image gen for GBP photos (recipe 4):** Gemini 2.5 Flash Image at $0.039/image, capped at 4-6/tenant/mo on Growth = ~$0.20/tenant/mo
- **Total:** ~$1/tenant/mo at 50 active tenants Growth+ = $50/mo total ceiling

## Why this dep (Section 10)

**Possible new deps:**
- Yelp Fusion API client: write inline (~50 lines), no SDK ✅
- GBP API: existing Reviuzy integration ✅
- Gemini image gen: existing Reviuzy integration ✅
- Diff rendering: simple line-by-line jsx component, no `react-diff-viewer` ✅

**Net new deps: ZERO.**

## ISO gates required

- [ ] Idempotent executors (calling same recipe twice with same payload = no-op)
- [ ] Undo coverage on every recipe (rollback_fn ships with executor_fn)
- [ ] RLS test: tenant A cannot approve tenant B actions
- [ ] HMAC signature on approve/rollback endpoints
- [ ] Audit log: actor (system|strategist_id) + timestamp + tenant_id + payload hash + diff hash
- [ ] DRY_RUN mode on every cron
- [ ] Cost guardrails: hard cap 100 actions/tenant/day, opt-in per recipe in tenant_settings
- [ ] Sentry on every executor failure + first-failure halt of recipe queue for that tenant
- [ ] Migration `down` tested

## Time-box estimate

**5 sub-phases, ~6 sessions total** (each recipe is ~1 sub-session of work; the 7 recipes split across 3 sub-phases).

See `02-sub-phases.md` for breakdown.
