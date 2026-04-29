# Phase C.9 : Health-score-driven churn prediction (cross-repo)

## Business goal

Reduce churn by detecting at-risk clients 30 to 60 days before cancellation. Today churn surprises us: a client cancels, the strategist sends a "what happened" email, the answer arrives too late. C.9 computes a daily health score per tenant from observable behavior (login cadence, feature usage, support tickets, GBP delivery rate, NPS-style proxy signals) and surfaces declining trends to the strategist before the cancellation form opens.

## Hours saved + retention uplift

- **Retention uplift estimate:** at 50 active clients, every 1% churn reduction saves $300 to $2,499 MRR. Realistic target: -3% annual churn = ~$15k-$45k incremental ARR retained.
- **Strategist hours saved:** ~5h/mo across 50 clients (early intervention beats post-cancellation save attempts)

## Who benefits

- **Client:** strategist reaches out proactively when health drops; problems addressed before they become reasons to leave
- **Staff:** strategist focuses on at-risk accounts instead of evenly distributing time
- **Operator:** churn forecasting tightens; revenue more predictable

## Deliverable scope

**AiLys side (this worktree):**
1. Help article `health-score-explained` EN + FR-CA: what's measured, scoring transparency, what to expect from strategist outreach
2. STATE.md update with cross-repo handoff
3. Reviuzy spec in `02-sub-phases.md`

**Reviuzy side (separate session):**
1. Migration: `tenant_health_scores` table (tenant_id, score, components JSONB, computed_at)
2. Daily cron edge fn `compute-health-score`: aggregate signals, write row
3. Admin panel: leaderboard, trend chart, drill-down per component
4. Auto-flag in alerts table when score drops below threshold or trend is sharply negative

## Cost estimate per invocation

- **Anthropic:** ZERO (deterministic scoring, no LLM)
- **Resend:** alert emails only on threshold cross, ~3-5/mo per tenant at risk = negligible
- **Total:** flat with existing infra

## Why this dep (Section 10)

**No new dependencies.** Pure SQL aggregation + existing alerts table from Phase 10.

## Acceptance criteria

- [ ] AiLys help article live EN + FR-CA, no proprietary AI provider mention
- [ ] Reviuzy migration applied + edge fn deployed + cron registered
- [ ] DRY_RUN test on 5 seed tenants produces sensible score distribution
- [ ] Admin panel shows trend chart per tenant
- [ ] Strategist gets alert when score drops below 40 OR trend < -10 over 7 days
- [ ] Privacy: components stored as ratios + counts, no PII in clear

## Strategic note

Health score is INPUT TO HUMAN JUDGMENT, not autopilot. The system never auto-cancels, auto-discounts, or auto-emails the at-risk client without strategist involvement. The score is a triage signal.
