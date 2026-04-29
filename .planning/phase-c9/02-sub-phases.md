# Phase C.9 : Sub-phases

Total estimate: ~16h. Time-box ceiling: 32h.

## Cross-repo split

| Repo | Sub-phases | Hours |
|---|---|---|
| AiLys | C.9.AiLys.1 | 1.5h |
| Reviuzy | C.9.Rvz.1 to C.9.Rvz.4 | 14.5h |

## C.9.AiLys.1 : Help article + STATE handoff (~1.5h)

`src/data/help-articles.ts` slug `health-score-explained`.

**Content:** what 5 components measure, scoring transparency (0-100 scale), what triggers strategist outreach, how to opt out (request strategist call to disable per-tenant, default ON for Growth + Agency).

**Commit:** `docs(c9): help article health-score-explained + Reviuzy handoff`

## C.9.Rvz.1 : Migration + scoring builder lib (~5h)

`tenant_health_scores` table, `_shared/healthScoreBuilder.ts` pure functions, vitest 30+ cases.

**Schema:**
```sql
CREATE TABLE tenant_health_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  components JSONB NOT NULL,
  formula_version TEXT NOT NULL DEFAULT 'v1',
  trend_7d NUMERIC(5,2),
  trend_30d NUMERIC(5,2),
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, (computed_at::date), formula_version)
);
```

**5 components:**
1. Login cadence (last 30d sessions / expected)
2. Feature usage breadth (count of distinct features touched in 30d)
3. GBP delivery rate (posts published vs scheduled in 30d)
4. Citation success rate (auto-batch + manual)
5. Negative-signal density (anomaly alerts triggered in 30d, inverse)

Each weighted 20%. Total = 0-100.

## C.9.Rvz.2 : Edge fn `compute-health-score` (~4h)

Daily 03:00 UTC cron. Iterate active tenants, call builder, INSERT row, compute trend_7d + trend_30d as the diff vs N days ago. If score < 40 OR trend_7d < -10, insert alert via existing alerts table.

12 vitest cases.

## C.9.Rvz.3 : pg_cron + admin panel (~4h)

Migration for cron schedule, admin page `/admin/health-scores` with leaderboard sorted by score asc (worst first), drill-down trend chart per tenant (last 90 days), per-component breakdown.

8 vitest cases.

## C.9.Rvz.4 : Threshold tuning playbook + smoke (~1.5h)

Documentation for strategist team on how to interpret scores, threshold review cadence (quarterly), retro on actual churn vs score predictions. Plus production smoke that runs once/week against a known sandbox tenant to catch scoring drift.

## Hand-off

1. Read this spec
2. Apply 2 migrations (schema + cron)
3. Deploy edge fn
4. Set 2 env vars
5. DRY_RUN seed data: 5 tenants with varied behavior, verify score distribution
6. Flip live, monitor 90 days, retro on alert quality
