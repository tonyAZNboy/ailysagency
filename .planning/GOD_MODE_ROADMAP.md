# God-mode 5-feature roadmap (queued 2026-05-01)

Top-level index for the 5 highest-leverage features queued for the next sessions.
Each feature has its own `.planning/feature-N/` directory with `00-objectives.md`
(business case, scope, ISO gates) and `02-sub-phases.md` (actionable breakdown).

The other 3 standard ISO docs (`01-threat-model.md`, `03-test-matrix.md`,
`04-rollback-plan.md`) per `iso-gsd-delivery` skill are filled in at the start
of each sub-phase session, NOT pre-baked here. This avoids stale planning
artefacts that drift from implementation reality.

## Build order (recommended)

1. **Feature 1 — Deep Site Audit (Reviuzy)** — Foundation. Feeds Feature 2.
2. **Feature 2 — Auto-Remediation Engine (Reviuzy)** — Closes diagnostic loop. Reads Feature 1 findings.
3. **Feature 3 — White-Label Agency Portal (AiLys + Reviuzy)** — B2B2B revenue channel. Independent.
4. **Feature 4 — Predictive Share-of-Model (Reviuzy)** — ML moat. Reads existing AI Visibility data.
5. **Feature 5 — AI Concierge dashboard (AiLys + Reviuzy)** — Retention/upsell trigger. Consumes Features 1, 2, 4 as tools.

## Time-box totals

| Feature | Sub-phases | Sessions | Repo primary |
|---|---|---|---|
| F1 Deep Site Audit | 5 | ~5 | Reviuzy |
| F2 Auto-Remediation | 5 | ~6 | Reviuzy |
| F3 White-Label Portal | 6 | ~8 | AiLys |
| F4 Predictive ML | 5 | ~7 | Reviuzy |
| F5 AI Concierge | 6 | ~9 | AiLys |
| **Total** | **27** | **~35 sessions** | mixed |

At ~3 sessions per week sustained pace, **~12 calendar weeks** to full god-mode.

## Cross-feature dependencies

- F2 reads F1's `audit_web_findings` table → ship F1.1-F1.3 minimum before F2.2
- F5 tool 8 (`get_audit_findings`) reads F1's `audit_web_findings` → F1 must complete before F5.4
- F5 tool 9 (`recommend_next_action`) reads F4 predictions → F4 must complete before F5.4
- F3 is independent and can run in parallel with F1/F2/F4

## Recommended parallel tracks

**Track A (technical depth, single operator):**
F1 → F2 → F4 → F5 (serial; ~27 sessions)

**Track B (revenue diversification, can start F3 in parallel):**
F3 (8 sessions, can run alongside F1+F2 since no shared tables)

## Bonus 1-week tactics shipped or queued

| Bonus | Status | Repo |
|---|---|---|
| A. Badge embed + public verify | ✅ Shipped MVP (PR #75) | AiLys |
| B. Quarterly Industry Reports | 🔶 Queued | AiLys |
| C. Slack/Teams alerts | 🟡 Partial (D.1.Rvz.3) | Reviuzy |

## Hard rules to honor on every feature (from CLAUDE.md)

1. **#1 Always test in browser before claiming done** — typecheck is not testing
2. **#9 Government-grade security** — server-side validation, rate-limit, audit log, RLS, secrets, CORS, CSP on every new feature
3. **#10 Help center, no proprietary disclosure** — articles MUST NOT name Anthropic/Claude/PageSpeed/Lighthouse/LightGBM; refer to "the AiLys engine" only
4. **#11 Admin Center is mandatory** — per-tenant enable/disable, recent invocations, cost telemetry, tier gating
5. **#12 Tests must pass before delivery** — tsc + blog audit + em-dash + smoke + browser test + curl + 16-locale parity
6. **#13 Mobile-first 100%** — 375x812 baseline, sm/lg breakpoints, safe-area inset, 44x44 tap targets, modals never exceed viewport
7. **#14 ISO-GSD-delivery** — invoke `/iso-gsd-delivery` at session start; 5 GSD docs in `.planning/<phase-id>/` BEFORE code; 13-section binary DoD checklist

## Cost guardrails summary

| Feature | Estimated $/mo at 50 active tenants | Hard cap |
|---|---|---|
| F1 Deep Site Audit | <$5 (PageSpeed free) | $25 |
| F2 Auto-Remediation | ~$50 (Gemini photo gen + LLM drafting) | $200 |
| F3 White-Label Portal | ~$10/partner (Cloudflare for SaaS) | absorbed in pricing |
| F4 Predictive ML | ~$50 (Modal weekly training) | $200 |
| F5 AI Concierge | ~$200-500 (Anthropic API) | $500 with $400 alarm |
| **Total** | **~$315-565/mo** | **~$925/mo ceiling** |

At even 30 tenants Growth+ × $1,200 MRR avg = $36k MRR, infrastructure is <2% of revenue. Margin protected.

## Why this order

1. **F1 first** because every other feature improves with site-audit data underneath it
2. **F2 second** because it converts F1's findings into action and unlocks the "fully managed" tier upgrade trigger
3. **F3 third** because it opens a parallel revenue channel that doesn't depend on F4/F5
4. **F4 fourth** because it's the technical moat but requires F1-F2 to be operational for richest training data
5. **F5 last** because it consumes F1, F2, F4 as tools; building it first means stubbing 3 of 10 tools

## Open questions to resolve at next session start

- [ ] Confirm Modal Labs account + funding (Feature 4 dep)
- [ ] Confirm Voyage AI vs OpenAI for embeddings (Feature 5 dep, currently leaning Voyage)
- [ ] Confirm Stripe Connect Standard vs Express for partner billing (Feature 3)
- [ ] Confirm pgvector vs alternative (e.g., Pinecone) — pgvector is recommended (no new external dep)
- [ ] Confirm partner pricing tiers ($499/$999/$1,999/custom) before F3.5 ships
