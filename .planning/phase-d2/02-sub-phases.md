# Phase D.2 : Sub-phases (GSD XML task format)

Total estimate: ~24h. Time-box ceiling: 48h.

**Strict prerequisite:** D.1 SOC2 audit log must be live in production before D.2 ships.

## Cross-repo split

| Repo | Sub-phases | Hours |
|---|---|---|
| AiLys | D.2.AiLys.1 | 6h |
| Reviuzy | D.2.Rvz.1 to D.2.Rvz.5 | 18h |

---

## D.2.AiLys.1 : Help article + TOS amendment + STATE handoff

```xml
<task type="auto">
  <name>Help article cross-tenant-benchmarking-explained EN+FR-CA</name>
  <files>src/data/help-articles.ts, src/pages/legal/PrivacyPolicy.tsx, src/pages/legal/content/PrivacyContentEn.tsx, src/pages/legal/content/PrivacyContentFr.tsx</files>
  <action>
    Article covers: what is benchmarked (anonymized aggregates only),
    cohort minimum size (5 tenants), opt-out path (Settings > Privacy >
    "Exclude my data from peer benchmarks"), refresh frequency (daily),
    legal basis (Loi 25 explicit consent + 60-day grandfathering for
    existing tenants), what is NEVER shared (review text, photos, NAP,
    customer messages).
    Privacy policy gets new section "Anonymous benchmarking" with same
    info, EN + FR.
  </action>
  <verify>
    - tsc clean, i18n audit clean, em-dash sweep clean
    - Browser preview EN + FR
    - Privacy policy diff reviewed
  </verify>
  <done>Article + privacy update live</done>
</task>
```

---

## D.2.Rvz.1 : Materialized view + refresh schedule

```xml
<task type="auto">
  <name>Create cohort_benchmarks materialized view</name>
  <files>supabase/migrations/20260504000000_create_cohort_benchmarks.sql</files>
  <action>
    CREATE MATERIALIZED VIEW cohort_benchmarks AS
    SELECT
      industry,
      CASE WHEN location_count = 1 THEN '1'
           WHEN location_count BETWEEN 2 AND 5 THEN '2-5'
           WHEN location_count BETWEEN 6 AND 25 THEN '6-25'
           ELSE '25+' END AS location_band,
      COUNT(DISTINCT tenant_id) AS cohort_size,
      AVG(visibility_score) AS avg_visibility_score,
      percentile_cont(0.50) WITHIN GROUP (ORDER BY visibility_score) AS p50,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY visibility_score) AS p75,
      percentile_cont(0.90) WITHIN GROUP (ORDER BY visibility_score) AS p90,
      AVG(citation_count) AS avg_citation_count,
      AVG(monthly_review_count) AS avg_monthly_review_count,
      AVG(response_rate) AS avg_response_rate,
      now() AS computed_at
    FROM tenant_metrics_daily
    WHERE cohort_benchmarking_enabled = true
    GROUP BY industry, location_band
    HAVING COUNT(DISTINCT tenant_id) >= 5;

    CREATE UNIQUE INDEX cohort_benchmarks_uq ON cohort_benchmarks (industry, location_band);

    -- Refresh schedule via pg_cron, daily at 04:30 UTC (after individual metrics)
    SELECT cron.schedule('refresh-cohort-benchmarks', '30 4 * * *',
      'REFRESH MATERIALIZED VIEW CONCURRENTLY cohort_benchmarks');
  </action>
  <verify>
    - View applies on fresh schema after seed of 50 tenant rows
    - Cohorts with < 5 tenants excluded
    - Refresh CONCURRENTLY succeeds (no lock)
    - Indexes created
  </verify>
  <done>Migration applied, 4 cases pass</done>
</task>
```

## D.2.Rvz.2 : Percentile compute lib

```xml
<task type="auto">
  <name>cohortBenchmarks lib with TDD percentile compute</name>
  <files>supabase/functions/_shared/cohortBenchmarks.ts, supabase/functions/_shared/cohortBenchmarks.test.ts</files>
  <action>
    Pure functions:
    - bandLocationCount(n: number): '1' | '2-5' | '6-25' | '25+'
    - resolvePercentile(value: number, p50: number, p75: number, p90: number): 0-99 percentile band (10-bucket)
    - formatCohortReport(myValue: number, cohort: CohortRow): { my_value, cohort_avg, my_percentile_band: '0-10'|'10-20'|...|'90-100', delta_vs_avg, cohort_size_band }
    - validateCohortAvailable(cohort: CohortRow): { ok: boolean; reason?: 'insufficient_data'|'opted_out'|'unclassified' }
  </action>
  <verify>
    30+ vitest:
    - bandLocationCount: 4 cases (1, 5, 25, 100)
    - resolvePercentile: 10 cases (below p50, at p50, between p50 and p75,
      at p75, between p75 and p90, at p90, above p90, edge: equal to p10,
      empty cohort, single-value cohort)
    - formatCohortReport: 8 cases (above avg, below avg, at avg, missing
      data, opted-out cohort, insufficient data, large delta, small delta)
    - validateCohortAvailable: 4 cases (ok, insufficient, opted_out, unclassified)
    - cohort_size_band: never exposes exact size (3 cases)
  </verify>
  <done>Lib + 30 vitest pass</done>
</task>
```

## D.2.Rvz.3 : Edge fn `dashboard-cohort-stats`

```xml
<task type="auto">
  <name>Tenant-scoped cohort stats endpoint</name>
  <files>supabase/functions/dashboard-cohort-stats/index.ts, supabase/functions/dashboard-cohort-stats/test.ts</files>
  <action>
    GET /functions/v1/dashboard-cohort-stats. Auth: member role.
    1. Resolve caller's tenant
    2. Check tenants.cohort_benchmarking_enabled
    3. SELECT row from cohort_benchmarks WHERE industry = tenant.industry AND location_band = bandLocationCount(tenant.location_count)
    4. If no row : return { available: false, reason: 'insufficient_data' }
    5. Compute formatCohortReport for caller's metrics
    6. Return { available: true, report: { ... } }
    7. emitAuditLog(D.1) with action 'cohort.stats.read'
    8. Response time padding to 200ms minimum (timing side-channel)
    9. Rate limit 10/hr/tenant
  </action>
  <verify>
    15 vitest: opted-in happy, opted-out 'opted_out', insufficient_data,
    unclassified industry, member role required, rate limit enforced,
    response time >= 200ms, cohort_size_band not exact, audit log written,
    timing-side-channel: same shape on cohort hit vs miss, error path,
    industry change mid-flight, location_count change, payload shape
  </verify>
  <done>Endpoint + 15 vitest pass</done>
</task>
```

## D.2.Rvz.4 : Dashboard UI surface

```xml
<task type="auto">
  <name>Cohort percentile cards in /dashboard/visibility</name>
  <files>src/pages/dashboard/VisibilityDashboard.tsx, src/components/dashboard/CohortBenchmarkCard.tsx, src/hooks/useCohortStats.ts</files>
  <action>
    New CohortBenchmarkCard component:
    - Header: "How you compare in {industry} ({location_band} locations, cohort size {band})"
    - 4 metrics: visibility score, citation count, response rate, monthly reviews
    - Each shows my value + cohort average + percentile band ("You are in the 70-80% bucket")
    - Tooltip explaining anonymization
    - "as of {timestamp}" footer
    - Empty state: "Cohort data not yet available for your industry. Min 5 tenants required."
    - useCohortStats hook with React Query, 1h stale time
    Insert card below the existing visibility chart (not above; don't bump the existing UX).
  </action>
  <verify>
    8 vitest:
    - card renders for happy cohort
    - empty state for insufficient_data
    - opt-out state hides card
    - hover tooltip shows anonymization note
    - timestamp footer present
    - 4 metric rows present
    - hook respects 1h stale time
    - mobile breakpoint 375x812 renders correctly
  </verify>
  <done>Card live in dashboard, 8 vitest pass</done>
</task>
```

## D.2.Rvz.5 : Opt-out toggle + TOS notice

```xml
<task type="auto">
  <name>Opt-out toggle in Settings + email notice to existing tenants</name>
  <files>src/pages/Settings.tsx, supabase/functions/notify-tenants-tos-update/index.ts, supabase/migrations/20260504010000_add_cohort_opt_in_to_tenants.sql</files>
  <action>
    Migration: ALTER TABLE tenants ADD COLUMN cohort_benchmarking_enabled BOOLEAN NOT NULL DEFAULT false (existing) / true (new tenants from launch date).
    Settings page: privacy section with toggle + link to help article.
    One-time edge fn fires email to existing tenants explaining the new
    feature + 60-day grandfathering window (Loi 25 compliance).
  </action>
  <verify>
    6 vitest:
    - Existing tenants default false (grandfathering)
    - New tenants default true (consent at signup updated)
    - Toggle persists
    - Email sent (Resend mock)
    - Email subject lang matches tenant lang
    - Email retry on Resend 5xx
  </verify>
  <done>Toggle + email + 6 vitest pass</done>
</task>
```

---

## Hand-off

1. Confirm D.1 is live in production (gate)
2. Apply D.2.Rvz.1 migration on staging
3. Build lib D.2.Rvz.2 (TDD)
4. Build endpoint D.2.Rvz.3 (after lib)
5. Build UI D.2.Rvz.4 (after endpoint)
6. Migration + email D.2.Rvz.5 (parallel with UI)
7. AiLys help article + privacy update D.2.AiLys.1 (parallel any time)
8. 60-day grandfather window before flipping marketing copy
