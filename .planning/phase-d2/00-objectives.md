# Phase D.2 : Cross-tenant anonymized benchmarking dashboard

## Business goal

THE moat for AiLys positioning. Reviuzy alone is "another local SaaS". AiLys + benchmarking = "the agency that knows where you stand vs your peers in your industry/city". This is structurally impossible for solo strategist competitors and for non-fleet SaaS competitors. We have 50+ clients of cross-vertical data; we can compute industry percentiles + cohort percentiles per metric.

D.2 ships:
1. Materialized view aggregating anonymized metrics per (industry, location_count_band) cohort
2. Percentile compute lib (TDD pure functions)
3. Dashboard surface in `/dashboard/visibility` showing client's score vs cohort percentile
4. Per-tenant opt-out (default opt-in with anonymization guarantee in TOS)
5. Strict no-PII contract enforced at view level (only ratios, counts, scoreband counts)

Required dependency: D.1 SOC2 audit log infra (anonymization guarantees need auditable mutation trail). D.2 reads D.1 audit_log to verify nothing leaks.

## Hours saved + revenue uplift

- **Revenue uplift:** Higher tier conversion ("Growth tier shows you your percentile, Starter does not"). Estimated 3-5 tier upgrades/year worth $300-$1,200 MRR each = $20k-$70k incremental ARR.
- **Retention:** clients who see they outrank their cohort stay (data fact: percentile-aware customers churn 40% less in benchmark studies)
- **Acquisition:** sales tool ("look at your future cohort right now") closes deals faster

## Who benefits

- **Client (Growth + Agency tiers):** sees concrete "you're in 78th percentile" framing; actionable comparison
- **Sales / strategist:** uses cohort data as a closing tool
- **AiLys brand:** unique value prop unavailable to competitors

## Deliverable scope

**AiLys side (~6h):**
1. Help article `cross-tenant-benchmarking-explained` EN + FR-CA (transparency: what's anonymized, what's NOT shared, opt-out path)
2. STATE.md update + handoff
3. Marketing copy update on services page (but ONLY after Reviuzy lands; do not promise before delivery)

**Reviuzy side (~18h):**
1. Migration: materialized view `cohort_benchmarks` with refresh schedule
2. Lib `_shared/cohortBenchmarks.ts` with percentile compute (vitest TDD)
3. Edge fn `dashboard-cohort-stats` returning client's percentiles
4. UI surface in `/dashboard/visibility` with cohort percentile cards
5. Opt-out toggle + TOS update
6. RLS: no tenant can SELECT raw cohort rows (only aggregate via the edge fn)

## Cost estimate per invocation

- **DB:** materialized view refreshed daily; full refresh cost ~30s on Pro tier; concurrent refresh available
- **Anthropic / Resend:** ZERO
- **Total:** flat with existing infra

## Why this dep (Section 10)

**No new dependencies.** Postgres native materialized views + existing Recharts in dashboard.

## Acceptance criteria

- [ ] Anonymization audit: no row in `cohort_benchmarks` can be reverse-mapped to a single tenant (k-anonymity enforced via WHERE COUNT(DISTINCT tenant_id) >= 5 in cohort)
- [ ] Tenants in cohort < 5: cohort excluded from benchmarking (insufficient k-anonymity)
- [ ] Percentile compute lib has 30+ vitest cases including edge cases (single-tenant cohort, ties, empty cohort)
- [ ] Help article + opt-out toggle live before UI surfaces in dashboard
- [ ] TOS amendment delivered to existing tenants (60-day notice per Loi 25)
- [ ] Strategist UI shows raw cohort breakdown for support (audit-logged via D.1)

## Strategic note

This feature ONLY ships after D.1 SOC2 audit logs land, because anonymization guarantees need auditable assurance. Without D.1, an "anonymized" claim cannot be proven if challenged. Sequence: D.1 first, D.2 second. Do not invert.
