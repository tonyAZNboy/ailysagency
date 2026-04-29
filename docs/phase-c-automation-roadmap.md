# Phase C, Automation-First Operations

**Spec author:** Claude (autopilot session 2026-04-29)
**Spec date:** 2026-04-29
**Source of truth:** Explore-agent deep audit run during this session, reconciled against STATE.md, `functions/api/*.ts`, `scripts/*.mjs`, `src/data/*.ts`, and the Reviuzy-side phases documented in STATE.md.
**Total effort:** ~120-160h sliced into 9 sub-phases, executed across both AiLys and Reviuzy repos.
**Total hours saved fleet-wide per month at 50 active clients:** ~450h (i.e. 11 strategist-FTEs of capacity unlock at full scale).

---

## 0. Context: why this spec exists

The user directive that triggered this spec: "I want mostly automation, for staffs and partner."

The deep audit found that AiLys today is a hybrid system. Public-facing automation (free audit page, LLM probes, form capture) is live. Backend strategist workflows (photo approval, citation queue, report generation, crisis response) are 80 percent manual. Per-client per-month strategist time at the Growth tier is **15-20 hours**. At 50 clients that is roughly **800-1000 hours of human labor per month**, which means scaling past ~30 clients without automation requires hiring.

The infrastructure already exists. The scheduling + routing layer is missing. **Zero production cron jobs fire today.** Every "weekly" or "daily" probe promised in help articles is on-demand only.

**Strategic principle for the entire roadmap:** automate the queue, not the decision. Strategists should approve, not generate. AI generates the draft + a confidence score; strategists handle exceptions only.

---

## 1. Current automation reality (deep-audit summary)

### What's automated today

| Surface | Status |
|---|---|
| Public marketing forms (founding-clients, cofounders, newsletter) | Live, dual-delivery to Supabase + Resend |
| Free audit engine (LLM citation matrix, AI Visibility score, hero citation, Places lookup, Places nearby, chat advisor) | Live with KV caching, Anthropic-backed, fallback to sample data on missing keys |
| Branded audit PDF endpoint at `/api/audit-pdf` | Live, B.4.3 backend complete, 10-page PDF in 250 ms |
| HMAC-signed download URLs at `/api/audit-pdf-download/[id]` | Live |
| Cloudflare Pages auto-deploy via GitHub Actions with 7 ISO-grade gates | Live as of this session |
| Reviuzy edge functions: `provision-ailys-tenant`, `gbp-draft-reply`, `google-fetch-questions`, `google-post-answer`, `google-upload-photo`, `google-attributes`, `ai-visibility-run`, `ai-traffic-ingest`, `reddit-poll`, `detect-anomalies`, `public-api`, `gsc-list-properties`, `gsc-sync`, `llm-snapshot-rebuild` | Code-shipped per STATE.md Phase 2-12, deployment status varies (some staged, some live) |

### What is NOT automated (the gap)

| Promised in marketing / tier ladder | Reality today |
|---|---|
| Weekly AI Visibility probe (Growth) | On-demand only, no cron |
| Daily AI Visibility probe (Agency) | On-demand only, no cron |
| Monthly Visibility report email to client | Manually compiled by strategist |
| Crisis early warning alerts | `detect-anomalies` edge fn exists, no scheduler binding |
| Citation submission (5/10/15 per month) | Strategist manually picks, fills, submits forms |
| GBP photo cadence (1/4/8/12 per month) | Reviuzy app captures uploads, strategist manually approves each |
| GBP reply auto-draft | LLM drafts, strategist always approves before publish (no auto-publish path even for high-confidence) |
| Renewal nudge emails | None; strategist tracks dates by memory + Stripe |
| Day-1 PDF upon signup | None; client waits ~1 week for first deliverable |
| Self-service Stripe checkout (Starter / Core) | None; every signup goes through manual qualification |
| Behavioral upsell triggers | None; tier upgrades are reactive |
| Strategist call scheduling | Manual Calendly send, manual calendar entry |
| Reseller (white-label) onboarding | Not built; documented in roadmap only |

### Top 4 fleet-level pain points (hours saved if automated, at 50 clients)

| Pain point | Hours/month saved | Effort to automate |
|---|---|---|
| Anomaly alert + auto-suggest remediation | ~150h | Phase C.4, ~16h dev |
| Citation directory auto-batch (Tier 1 safe directories) | ~100h | Phase C.6, ~24h dev |
| GBP reply auto-publish for high-confidence drafts | ~50h | Phase C.3, ~12h dev |
| Monthly Visibility report scheduled export + email | ~50h | Phase C.5, ~10h dev |

**Total ROI on the top 4:** ~350h/month saved for ~62h dev investment. Payback in roughly 1 strategist-month.

---

## 2. Sub-phase roadmap

Sequence is dependency-ordered. Each sub-phase ends with a git commit + smoke test + CI gate. ISO-grade hard rules from CLAUDE.md (#9 gov-grade security, #10 help docs without proprietary disclosure, #11 admin center, #12 tests pass, #13 mobile-first) apply to every phase.

### C.1, Day-1 onboarding PDF (~6h, AiLys + Reviuzy)

**Goal:** new client receives a branded baseline PDF in their inbox within 2 minutes of Stripe payment, not week 2-3.

**AiLys side** (already specced in `phase-b4-pdf-export-plan.md` Phase B.5, draft committed):
- New endpoint `functions/api/audit-pdf-onboarding.ts`
- Service-to-service HMAC auth (`X-AiLys-Service-Token` header) verified against `AILYS_SERVICE_SHARED_SECRET`
- Idempotency on `stripeCustomerId` via KV memo, 7-day TTL
- Reuses `renderAuditPdf` + R2 upload + signed URL + Resend send pipeline from B.4.3
- Synthesizes Day-1 payload labelled "first scan completes within 24 hours"
- Dead-letter KV on failure for operator retry

**Reviuzy side** (separate commit in Reviuzy repo):
1. Modify `provision-ailys-tenant` edge fn to fire-and-forget POST to AiLys onboarding endpoint after tenant create
2. Add `AILYS_SERVICE_SHARED_SECRET` to Reviuzy edge fn env
3. Add Reviuzy-side idempotency on `stripeCustomerId` (return existing tenant if present)

**ISO-grade gate (CI gate 8):** `scripts/smoke-audit-pdf-onboarding.mjs` exercises HMAC auth, idempotency, dead-letter, and service-token replay attacks.

**User actions required:**
- Cloudflare Pages: set `AILYS_SERVICE_SHARED_SECRET` (`openssl rand -hex 32`)
- Reviuzy Supabase: same secret as edge fn env var

**Hours saved:** roughly 30 min per new signup (strategist no longer assembles + sends day-1 baseline manually). At 5 new signups/month: 2.5h/month saved. Conversion lift on the marketing claim "PDF in your inbox 2 minutes after signup" is the bigger win.

---

### C.2, Production cron + scheduled jobs (~24h, Reviuzy + Cloudflare)

**Goal:** every promise in the tier ladder that says "weekly", "daily", "monthly" is backed by a real scheduler, not a strategist's calendar.

**Architecture decision needed:** scheduler choice
- Option A: **Cloudflare Cron Triggers** on Workers/Pages (free for the volume, easy to wire). Best fit for AiLys-side schedules.
- Option B: **Supabase pg_cron** (already available on Reviuzy backend). Best fit for Reviuzy-side jobs that need DB access.
- **Recommendation:** Option B for jobs that touch the Supabase DB (anomaly detection, AI Visibility runs, snapshot rebuilds, NAP audits). Option A for jobs that are pure HTTP (renewal email send, weekly digest assembly).

**Jobs to wire:**

| Job | Schedule | Tier gate | Trigger | Implementation |
|---|---|---|---|---|
| AI Visibility weekly probe | Mon 09:00 client TZ | Core, Growth | pg_cron → `ai-visibility-run` for each tenant where `ailys_tier IN ('core','growth')` | Reviuzy |
| AI Visibility daily probe | Daily 06:00 client TZ | Agency | pg_cron → `ai-visibility-run` for each agency tenant | Reviuzy |
| LLM snapshot rebuild | Daily 04:00 UTC | All tiers | pg_cron → `llm-snapshot-rebuild` | Reviuzy |
| Anomaly detection sweep | Every 6h | All tiers | pg_cron → `detect-anomalies` | Reviuzy |
| NAP consistency check | Weekly Wed 03:00 UTC | All tiers | pg_cron → NAP audit edge fn | Reviuzy |
| Citation freshness audit | Monthly 1st 02:00 UTC | All tiers | pg_cron → citation health check edge fn | Reviuzy |
| Monthly Visibility report email | 1st of each month 09:00 client TZ | All tiers | pg_cron → render PDF + Resend send | Reviuzy or AiLys (depends on PDF generator location) |
| Renewal nudge email | 14 days before next billing | All tiers | pg_cron → Resend send | Reviuzy |
| Strategist call calendar prompt | Quarterly per Agency client | Agency only | pg_cron → Calendly + Resend | Reviuzy |
| Day-1 retry sweep (DLQ replay) | Every 30 min | n/a | Cloudflare Cron → re-fire failed `audit-pdf-onboarding` calls | AiLys |

**Security review:**
- Each cron triggers a server-side function with `SERVICE_ROLE_KEY` privileges; never client-callable.
- Audit-log every cron invocation: `cron_id`, `tenants_processed`, `successes`, `failures`, `duration_ms`.
- Kill switch per cron: KV key `cron_<id>_enabled = "false"` disables that one cron without touching others.
- Concurrency cap: at most 1 instance of any cron running at a time (use KV lock with TTL).

**ISO-grade gate (CI gate 9):** `scripts/smoke-cron-integrity.mjs` asserts every cron config has audit-log emit + kill switch lookup + concurrency lock. Runs in CI on every push. Static analysis only (does not invoke real cron).

**Rollback strategy:** flip `cron_<id>_enabled = "false"` in KV. Effect within 60 seconds.

**Hours saved:** absorbing the 7 promised-but-manual schedules eliminates ~80h/month of manual triggering at 50 clients.

---

### C.3, High-confidence auto-approve for GBP queues (~12h, Reviuzy)

**Goal:** GBP reply drafts (Q&A and review responses) with confidence >= 0.92 auto-publish for tier Agency only. Lower confidence stays manual.

**Files (Reviuzy):**
- Modify `gbp-draft-reply` edge fn to emit a `confidence` score (0-1) alongside the draft
- New `auto-publish-gate` edge fn: reads draft + confidence + tenant tier, decides auto vs queue
- Modify Reviuzy admin `/gbp/questions` queue to surface confidence + auto-published/queued status
- Tenant setting: `auto_publish_threshold` (default 0.92, configurable per tenant by operator)

**Confidence scoring approach** (LLM-driven, structured output):
- LLM returns `{draft, confidence: 0.0-1.0, risk_factors: [...]}` per draft
- Risk factors: contains_legal_term, references_pricing, mentions_competitor, contains_promise, ambiguous_question
- Confidence floors: any risk_factor present = max 0.85, never auto-publish

**Security review:**
- Auto-publish only for `ailys_tier='agency'` (per tier ladder; lower tiers always manual)
- Audit-log every auto-publish: `tenant_id`, `draft_hash`, `confidence`, `risk_factors`, `published_url`
- Reversal flow: client or operator can flag any auto-published reply within 24h, edge fn deletes from GBP via API
- Rate limit auto-publish: max 5 per tenant per day to prevent runaway loop

**ISO-grade gate (CI gate 10):** `scripts/smoke-auto-publish-gate.mjs` exercises tier check, threshold logic, risk-factor floor, audit-log emission, reversal flow.

**Help center article (CLAUDE.md hard rule #10):** `gbp-auto-publish-explained` EN + FR-CA, describes the user-visible behavior without naming the AI provider. Mentions "our AI engine drafts replies; high-confidence drafts publish automatically on the Agency tier; you can reverse any auto-publish within 24 hours."

**Hours saved:** roughly 50h/month at 50 Agency clients (queue clearance time drops from ~24h average to ~4h, strategist no longer reviews trivial replies).

---

### C.4, Auto-remediation suggestions on anomaly alerts (~16h, Reviuzy)

**Goal:** when `detect-anomalies` fires (NAP drift, rating drop, citation churn, fake review spike), the alert email contains a one-click "auto-fix" button that runs the remediation, not just a notification.

**Files (Reviuzy):**
- Modify `detect-anomalies` edge fn to compute remediation action per anomaly type
- New `apply-remediation` edge fn: receives `{anomaly_id, signed_token}`, applies the fix (NAP correction across N directories, GBP attribute update, etc.)
- HMAC-signed remediation tokens (24h TTL), reuse pattern from B.4.3
- Email template includes the signed-link "auto-fix" button

**Remediation types:**

| Anomaly | Auto-fix | Rollback |
|---|---|---|
| NAP drift on directory X | Re-submit canonical NAP via directory API or queue manual submission | Snapshot of old listing kept for 30 days |
| Rating drop below threshold | Generate review-velocity boost plan (template email to client + queue 5 new review prompts) | Cancel queued prompts |
| Citation churn (directory dropped your listing) | Re-submit to that directory, escalate to top of next month's quota | n/a |
| Fake review spike | Compile evidence packet (review IDs, dates, IP patterns), generate Google review-removal request | n/a |

**Security review:**
- Signed remediation tokens are single-use; KV memo prevents replay
- Each remediation logs to `tenant_history` with full payload hash
- Operator can disable auto-fix per tenant via KV flag `auto_remediate_<tenant_id> = "false"`

**ISO-grade gate (CI gate 11):** `scripts/smoke-remediation-tokens.mjs` exercises HMAC, single-use, replay rejection, expiry.

**Help center article:** `anomaly-alerts-and-auto-fix` EN + FR-CA.

**Hours saved:** ~150h/month fleet-wide (90 min per anomaly × 2 alerts/month × 50 clients).

---

### C.5, Monthly Visibility report scheduled export + email (~10h, Reviuzy + AiLys)

**Goal:** on the 1st of each month, every active tenant receives a branded Visibility PDF by email, no strategist intervention required.

**Files:**
- Reviuzy: new pg_cron job triggers `monthly-report-batch` edge fn
- Reviuzy: `monthly-report-batch` iterates active tenants, calls AiLys `/api/audit-pdf-monthly` for each
- AiLys: new endpoint `functions/api/audit-pdf-monthly.ts`, similar to onboarding but with REAL prior month's data instead of placeholder
- AiLys: HMAC service-to-service auth (reuse `AILYS_SERVICE_SHARED_SECRET` from C.1)
- Email template per tier (Starter gets summary, Core gets detail, Growth gets executive summary, Agency gets white-label client-facing version)

**Security review:**
- Idempotency: `report:tenant:<id>:<YYYY-MM>` KV key prevents duplicate sends if cron retries
- Tier gating: white-label only for Agency; lower tiers get standard branding
- Strategist override: tenant flag `monthly_report_paused` skips the auto-send (used during onboarding or contract renegotiation)

**ISO-grade gate (CI gate 12):** `scripts/smoke-monthly-report-batch.mjs` mocks 5 tenants, asserts all 5 receive emails, idempotency holds on retry, kill switch works.

**Hours saved:** ~50h/month (1h per client per month × 50 clients).

---

### C.6, Citation directory auto-batch for Tier 1 safe directories (~24h, Reviuzy)

**Goal:** Tier 1 directories that don't require human verification (Yelp, Bing Places, Apple Maps Connect, BBB, Yellow Pages CA) auto-submit on a monthly cadence per the tenant's tier quota. Tier 2 + Tier 3 stay manual (most require login or approval flows that fight automation).

**Files (Reviuzy):**
- New `citation-auto-submit` edge fn: receives `{tenant_id, directory_slug}`, generates submission payload from canonical NAP, posts via directory API (Yelp Fusion, Bing Places API, etc.)
- pg_cron job that on the 5th of each month picks Tier 1 candidates per tenant up to quota
- Modify `citationDirectories.ts` (this AiLys repo) to add `auto_submittable: boolean` field per entry
- Reviuzy admin `/citations` adds an "Auto-submitted this month" tab

**Security review:**
- Tenant must have completed first-month manual review before auto-submit kicks in (operator approval gate)
- Audit-log every auto-submission: `tenant_id`, `directory_slug`, `submission_payload_hash`, `directory_response`, `listing_url`
- Rollback: if a directory rejects or the listing differs from canonical NAP, queue a strategist review
- Per-tenant kill switch: `auto_citations_<tenant_id> = "false"` disables for that tenant only

**Help center article:** `automated-citation-submissions` EN + FR-CA.

**ISO-grade gate (CI gate 13):** `scripts/smoke-citation-auto-batch.mjs` mocks 3 directory APIs, asserts payload generation, response handling, fallback to manual queue on rejection.

**Hours saved:** ~100h/month (45 min per submission × 5 auto-submissions per client × 50 clients).

---

### C.7, Renewal + behavioral upsell intelligence (~12h, Reviuzy)

**Goal:** when a tenant's usage patterns suggest tier graduation, the system surfaces an upsell offer in their dashboard AND emails them. No more reactive "we noticed you're on Core for 12 months."

**Triggers:**
- Citation quota usage >= 90 percent for 2 consecutive months: suggest next tier up
- Photo upload velocity >= 90 percent of quota for 2 consecutive months: suggest next tier up
- Share-of-model crosses competitor threshold: suggest Growth (or congratulate at Agency)
- 14 days before annual renewal: send "your next year is X if you upgrade now" email
- 60 days post-cancellation: send "come back at 50% off" win-back

**Files (Reviuzy):**
- New `usage-telemetry` edge fn: aggregates last 30/60/90-day quota usage per tenant, writes to `tenant_health` table
- pg_cron daily 02:00 UTC: runs telemetry, triggers email or in-app banner per rule
- Reviuzy admin: new `/upsell-pipeline` dashboard showing all tenants with active triggers
- Email templates per trigger type (5 templates total)

**Security review:**
- Email frequency cap: max 1 upsell email per tenant per 14 days
- Tenant opt-out flag: `upsell_emails_paused = true` disables for that tenant
- Audit-log every trigger fire: `tenant_id`, `trigger_id`, `email_sent_to_hash`, `dashboard_banner_shown`

**ISO-grade gate (CI gate 14):** `scripts/smoke-upsell-triggers.mjs` exercises threshold logic, frequency cap, opt-out.

**Hours saved:** soft savings (operator no longer monitors usage manually); hard revenue impact ~$300-600 MRR per tier-up event.

---

### C.8, Reseller / partner onboarding stack (~32h, AiLys + Reviuzy + Stripe)

**Goal:** wire the `client_type='reseller'` path documented in STATE.md but not yet built. Resellers white-label the AiLys + Reviuzy stack to their own clients.

**Scope (high level):**
- New tenant attribute: `parent_reseller_id` (NULL for direct, set for sub-tenants of a reseller)
- Stripe: separate price book per reseller (their own Stripe account or Connect)
- Brand config: per-reseller logo, color palette, email From, Stripe descriptor
- New auth flow: reseller invites a sub-client by email, sub-client completes signup, sub-client lands on `<reseller>.ailysagency.ca` (or custom domain)
- Reseller dashboard: aggregate view of all sub-clients, MRR, health scores, anomaly alerts
- Reseller-specific RLS: reseller can only see their own sub-clients, not other resellers'
- Public API access (already partially shipped Phase 9, extend with multi-tenant scope tokens)

**Files (Reviuzy):**
- Migration: add `parent_reseller_id`, `reseller_brand_config`, `reseller_stripe_account_id` to tenants
- New edge fn `provision-reseller-tenant`: creates reseller account + brand config
- New edge fn `provision-reseller-subclient`: creates a sub-tenant under a reseller
- New page `/reseller/dashboard`: aggregate metrics for reseller
- RLS update: tenants visible to reseller WHERE `parent_reseller_id = auth.tenant_id`
- Stripe Connect integration for reseller billing

**Files (AiLys):**
- Brand config in `brandConfig.ts` (reuse Phase 4.5.6 pattern) accepts dynamic reseller brand
- Domain routing: `<reseller>.ailysagency.ca` resolves to reseller-branded experience
- New help articles: `reseller-onboarding`, `reseller-stripe-connect`, `reseller-rls-isolation`, `reseller-api-access`

**Security review:**
- RLS isolation tested with adversarial query: reseller A tries to access reseller B's sub-clients, must return empty result set
- Stripe Connect = reseller manages their own billing; AiLys takes a platform fee per sub-tenant
- Audit-log per reseller action with `reseller_id` + sub-tenant context
- Per-reseller rate limits on API access tokens

**ISO-grade gates (CI gates 15-17):**
- `smoke-reseller-rls.mjs`: adversarial RLS tests
- `smoke-reseller-brand-isolation.mjs`: reseller A's emails do not contain reseller B's branding
- `smoke-reseller-stripe-flow.mjs`: end-to-end Stripe Connect provisioning

**Help articles:** 4 articles EN + FR-CA.

**User actions:**
- Stripe: enable Stripe Connect on the Reviuzy Inc. Stripe account
- Cloudflare: wildcard DNS `*.ailysagency.ca` already in place, just need to wire routing
- Legal: reseller agreement contract (separate from client contract; in `AiLys-Contracts` repo)

**Hours saved:** opens an entire revenue channel that does not exist today. Each reseller onboarded scales the platform fleet without scaling the strategist team.

---

### C.9, Health-score-driven churn prediction (~16h, Reviuzy)

**Goal:** detect tenants drifting toward churn 30 days before cancellation, surface to operator for proactive intervention.

**Health score formula (0-100):**
- Login frequency last 30 days (weight 0.20)
- Feature adoption breadth (number of dashboard tabs visited / total available, weight 0.15)
- Queue response time (average time to approve drafts, weight 0.15)
- Share-of-model trend slope (weight 0.20)
- Ticket volume + sentiment (weight 0.10)
- Quota usage trend (weight 0.10)
- Days since last strategist call (weight 0.10)

Score < 40 = churn risk, send operator Slack alert.

**Files (Reviuzy):**
- Migration: `tenant_health` table (tenant_id, score, components_jsonb, computed_at)
- New `compute-tenant-health` edge fn: nightly cron, writes scores
- Reviuzy admin: new `/fleet-health` dashboard
- Slack webhook integration for low-score alerts

**Security review:**
- Health score is operator-only; never exposed to client
- Audit-log score changes for forensics

**ISO-grade gate (CI gate 18):** `scripts/smoke-health-score.mjs` exercises score components, threshold detection, Slack alert dispatch.

**Hours saved:** soft (retention intervention); hard ROI is "saving 1 in 4 churners" which on $700/mo client = $8.4K LTV per save.

---

## 3. Cross-cutting concerns

### 3.1 Help center article cadence

Per CLAUDE.md hard rule #10, every new automation surface gets a help article in EN + FR-CA before the user-visible UI lands. This roadmap adds **9 new articles** (one per sub-phase that touches the client surface). Author them BEFORE shipping the UI:

- `automated-day-1-baseline` (C.1)
- `our-scheduled-jobs-and-when-they-run` (C.2)
- `gbp-auto-publish-explained` (C.3)
- `anomaly-alerts-and-auto-fix` (C.4)
- `your-monthly-visibility-report` (C.5)
- `automated-citation-submissions` (C.6)
- `tier-upgrade-suggestions-explained` (C.7)
- `reseller-onboarding` + `reseller-stripe-connect` + `reseller-rls-isolation` + `reseller-api-access` (C.8)
- (no client-facing article for C.9; operator-internal)

### 3.2 Admin center surface

Per CLAUDE.md hard rule #11, every new feature gets an admin panel for enable/disable, recent invocations, cost telemetry, per-tier gating. Net new admin panels in this roadmap:

- `/admin/cron-control` (C.2): list every scheduled job, last fire time, success rate, kill switch toggle
- `/admin/auto-publish-stats` (C.3): per-tenant auto-publish counts, reversal rate, confidence histogram
- `/admin/remediation-pipeline` (C.4): anomalies fired, auto-fixes applied, fixes pending operator review
- `/admin/monthly-report-pipeline` (C.5): tenants emailed, failures, manual retries
- `/admin/citation-auto-batch` (C.6): per-tenant auto-submission log, directory acceptance rate
- `/admin/upsell-pipeline` (C.7): trigger fires, conversions, opt-outs
- `/admin/reseller-fleet` (C.8): reseller list, sub-tenant counts, MRR per reseller
- `/admin/fleet-health` (C.9): health score histogram, churn-risk list, intervention log

### 3.3 ISO-grade gates added

The deploy pipeline gains 11 new mandatory CI gates (gates 8-18). Total mandatory gates after Phase C lands: **17 mandatory + 1 warn-only** (Gate 2 i18n).

### 3.4 Threat model additions per sub-phase

Each sub-phase appends threats to `phase-c-automation-roadmap.md`'s threat table at implementation time. Categories that recur across phases:

- Cron worker compromise: kill switch + KV-locked single-instance + audit log
- Service-to-service token theft: HMAC + 5-min timestamp window + IP allowlist on inbound
- Auto-action runaway: per-tenant rate limits + reversal windows + operator override
- RLS escape (resellers): adversarial smoke tests on every push

### 3.5 Rollback strategy

Every cron + every automation surface gates behind a KV kill switch. Rollback is "set KV key to 'false', wait 60 seconds." No deploy required. Documented per phase.

---

## 4. Sequencing recommendation

**Quarter 1 (next 6-8 weeks of agent work, ~70h):**
- C.1 Day-1 onboarding PDF (highest visible win, partially specced)
- C.2 Production cron layer (unblocks every other phase)
- C.5 Monthly Visibility report (depends on C.2)
- C.7 Renewal + upsell intelligence (depends on C.2)

**Quarter 2 (~50h):**
- C.3 GBP reply auto-publish for Agency
- C.4 Anomaly auto-remediation
- C.6 Citation auto-batch for Tier 1 directories

**Quarter 3 (when MRR or partner demand justifies, ~50h):**
- C.8 Reseller onboarding stack (only if a partner inquiry lands)
- C.9 Health score prediction (operationalize once fleet > 30 clients)

---

## 5. What the next session can pick up directly

1. **Read this doc + `phase-b4-pdf-export-plan.md` (Phase B.5 section).**
2. **Decide:** start with C.1 (lowest-risk, partially built) or C.2 (biggest impact, biggest scope).
3. **If C.1:** the AiLys-side endpoint is half-specced in B.5. Implement, smoke test, ship. Reviuzy follow-up is ~2h in the Reviuzy repo.
4. **If C.2:** the scheduler choice (Cloudflare Cron vs Supabase pg_cron) is a fork in the road. The recommendation here is pg_cron for DB-touching jobs, Cloudflare Cron for HTTP-only jobs. Confirm with the user before writing code. Then wire the first 2-3 jobs (AI Visibility weekly probe, monthly report email, anomaly sweep) as a proof of pattern, ship one full cycle, then expand to the rest.
5. **Verification cadence per sub-phase:** all 7 ISO-grade gates from CLAUDE.md + the new gate added by that sub-phase + a live curl test of the new endpoint with both happy path and 3 failure modes per hard rule #1.

---

## 6. Open product decisions (need user input)

1. **Auto-publish threshold default** for C.3: 0.92 confidence proposed. Confirm or override.
2. **Auto-publish tier scope** for C.3: Agency only proposed. Should Growth get it too?
3. **Auto-citation tier scope** for C.6: all tiers proposed (Starter 5/mo, Core 10/mo, Growth + Agency 15/mo). Confirm.
4. **Upsell email frequency cap** for C.7: 1 per tenant per 14 days proposed. Confirm.
5. **Reseller billing model** for C.8: Stripe Connect with platform fee proposed. Fee percentage?
6. **Health score threshold** for C.9 churn alert: 40/100 proposed. Confirm.
7. **Scheduler choice** for C.2: pg_cron + Cloudflare Cron split proposed. Confirm or override.

If no answers arrive, the next session uses the proposed defaults and flags them in commit messages.
