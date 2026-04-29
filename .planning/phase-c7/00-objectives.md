# Phase C.7 : Renewal + behavioral upsell intelligence (cross-repo)

## Business goal

Today renewals are tracked manually via Stripe dashboard + strategist memory. Upsells (Starter to Core, Core to Growth, Growth to Agency) happen reactively when a client asks. We miss revenue because we don't see signals: a Core client who hits the citation cap 3 months in a row is a Growth candidate; a Growth client whose Visibility score plateaus is an Agency candidate.

C.7 wires:
1. Renewal nudges 30 / 14 / 7 days before subscription anniversary
2. Behavioral upsell triggers based on usage patterns (citation cap hits, photo uploads at quota, dashboard probe frequency)
3. Strategist alert + suggested talking points
4. Optional auto-email to client (only if tenant opts in to "soft upsell emails")

## Hours saved + revenue uplift

- **Hours saved:** ~1h/strategist/week tracking renewals manually = ~50h/month at 10 strategists. Modest.
- **Revenue uplift estimate:** at 50 active Growth clients, 1 successful Core to Growth tier upgrade per month at +$600 CAD/month MRR = +$7,200 ARR per upgrade. 3 upgrades/year = ~$21k incremental ARR. The upside is the bigger win.

## Who benefits

- **Client:** doesn't get caught off-guard by renewal; gets timely nudge to upgrade when their data shows they need more
- **Staff:** strategist sees a prioritized "this client is about to renew + here's the upgrade signal" feed instead of reading Stripe + dashboard each week
- **Operator:** revenue forecasting tightens; renewal churn dips

## Deliverable scope

**AiLys side (this worktree):**
1. 1 help article `renewal-and-upsell-signals` EN + FR-CA: what triggers a nudge, opt-out, privacy
2. STATE.md update with cross-repo handoff
3. Reviuzy spec in `02-sub-phases.md`

**Reviuzy side (separate session):**
1. Migration: new `renewal_signals` table (tenant_id, signal_type, signal_strength, suggested_action, generated_at)
2. Daily cron edge fn `compute-renewal-signals`: aggregate usage from existing tables, write rows
3. Admin panel: per-tenant feed + bulk actions
4. Optional: client-facing email triggered N days before renewal (opt-in)

## Cost estimate per invocation

- **Anthropic:** ZERO (pure SQL aggregation, no LLM calls)
- **Resend:** ~$0.0001/email × ~50 emails/mo at full opt-in = $0.005/mo
- **Total:** negligible

## Why this dep (Section 10)

**No new dependencies.** Reuses existing Reviuzy stack: pg_cron, Supabase service role, Resend SDK, existing brandConfig.

## Acceptance criteria

- [ ] AiLys help article live in production EN + FR-CA, no proprietary AI provider mention
- [ ] Reviuzy migration applied + edge fn deployed + cron registered
- [ ] DRY_RUN test on 1 seed tenant produces a renewal_signals row with sensible signal_strength
- [ ] Admin panel shows last 50 signals with strategist-friendly tooltips
- [ ] Opt-in toggle on tenant settings (default OFF for client-facing emails)
- [ ] Strategist alert email lands when signal_strength >= 0.8

## Strategic note

Behavioral upsell is sensitive territory. The product principle: only suggest upgrades when the client's USAGE PATTERN backs it. Never spam upgrade prompts based on time alone. The signal must point to a real bottleneck the client is hitting.
