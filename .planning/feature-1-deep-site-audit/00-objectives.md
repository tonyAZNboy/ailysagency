# Feature 1: Deep Site Audit (Reviuzy primary, AiLys consumer)

## Business goal

Today AiLys + Reviuzy audit reputation and AI citation surfaces. The Deep Site Audit closes the missing technical layer: when a client already has a website (vs net-new build), the engine runs a full Lighthouse + custom-crawler pass + schema validation + AI-readiness audit and produces a prioritized action plan. Becomes the foundation Feature 2 (Auto-Remediation) consumes.

## Hours saved + revenue uplift

- **Strategist hours saved:** ~6h/mo per active client at Core+ (manual site review replaced by auto-aggregated findings + drill-down). At 50 clients = 300h/mo recovered.
- **Revenue uplift:** new Day-1 deliverable for every existing-site client → upgrade trigger from Starter to Core (+$300 MRR each). If 20% of Starter base upgrades = ~$3k MRR.
- **Retention:** measurable site-quality delta over time = sticky proof of value for renewal conversations.

## Who benefits

- **Client:** sees concrete prioritized list of fixes (severity × fix-effort ranking) instead of vague "improve SEO" advice.
- **Strategist:** opens the dashboard, knows what to work on this week without manual triage.
- **Operator:** gets a measurable audit score that trends across renewal windows.

## Deliverable scope

**Reviuzy side (separate session in `/c/Anthony/Projects/reviuzy`):**
1. Migrations: `audit_web_runs`, `audit_web_findings` with RLS tenant-scoped read/write + service role for cron writes
2. Edge fns: `crawl-website` (sitemap-first, 50-page cap, robots.txt respect), `analyze-page` (PageSpeed Insights + custom checks), `score-audit` (composite weighting + impact ranking), `generate-deep-audit-pdf` (12-page EN+FR mirror of audit-pdf pattern)
3. Cron: weekly Growth+, monthly Core, quarterly Starter; reuses `_shared/tenantTier.ts`; honors DRY_RUN env var
4. Admin panel: `/admin/clients/[tenantId]/deep-audit` with run history, findings drill-down, "mark fixed" velocity tracker
5. Public client widget: composite score card + delta + top-3 actions

**AiLys side (this repo):**
1. Help center articles EN+FR-CA: "What the Deep Site Audit checks", "How to read the score", "How to prioritize fixes". MUST follow hard rule #10: no PageSpeed/Lighthouse/Schema.org provider names; use "the AiLys engine" only.
2. Marketing landing page or section explaining the audit deliverable
3. Cross-repo proxy `deep-audit-stats-proxy` (mirror of audit-pdf-stats-proxy) so AiLys admin can surface aggregate Deep Audit telemetry

## Cost estimate per invocation

- **PageSpeed Insights API:** free up to 25k requests/day. Hard cap 1k pages/tenant/month.
- **Crawl bandwidth:** ~5MB/run × 50 pages × 50 tenants weekly = 12.5GB/wk, well within Cloudflare egress budget
- **Anthropic:** zero (deterministic scoring + rule-based action plan; LLM only used for action-item paraphrasing if Phase 2)
- **PDF render:** ~10KB pdf-lib document, ~80ms p99 on edge runtime
- **Total:** <$5/mo at 50 active clients

## Why this dep (Section 10)

**Possible new deps:**
- `pdf-lib` already in use ✅
- PageSpeed Insights API (free, no SDK needed, native fetch) ✅
- Schema.org validator: write inline (~80 lines of JSON-LD shape lint) rather than pull `schema-dts` ✅
- HTML parser for crawl: native `HTMLRewriter` on Cloudflare Workers ✅

**Net new deps: ZERO.**

## ISO gates required (per CLAUDE.md hard rule #14)

- [ ] Server-side input validation (zod) on every edge fn
- [ ] Rate-limit (KV-backed token bucket): max 4 runs/month/tenant on Starter, 12 on Core, weekly on Growth/Agency
- [ ] Audit log entry on every run start + complete
- [ ] RLS isolation test: tenant A cannot read tenant B `audit_web_findings`
- [ ] DRY_RUN env mode (returns synthetic 5-finding result for staging)
- [ ] EN + FR PDF parity test
- [ ] Smoke test for each of the 4 edge fns + the PDF render
- [ ] STATE.md updated same commit
- [ ] Migration `down` tested before merge
- [ ] Help center articles in EN + FR-CA before any UI ships

## Time-box estimate

**5 sub-phases, 1 session each, ~5 sessions total to fully complete.**

See `02-sub-phases.md` for the breakdown.
