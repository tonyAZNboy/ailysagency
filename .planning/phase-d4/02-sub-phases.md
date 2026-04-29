# Phase D.4 : Sub-phases (GSD XML format)

Total estimate: ~8h. Time-box ceiling: 16h.

## Cross-repo split

| Repo | Sub-phases | Hours |
|---|---|---|
| AiLys | D.4.AiLys.1 | 2h |
| Reviuzy | D.4.Rvz.1 to D.4.Rvz.5 | 6h |

---

## D.4.AiLys.1 : Help article

```xml
<task type="auto">
  <name>Help article service-reliability-and-error-handling</name>
  <files>src/data/help-articles.ts</files>
  <action>
    Article describes: we monitor errors via observability tooling, what
    you'll see when something breaks (graceful error message, no half-state),
    how to report a bug, expected response SLA per tier, what data we collect
    in error reports (no PII, no review text, only operation + status code +
    tenant_id hash). EN + FR-CA, no proprietary AI provider mention.
  </action>
  <verify>CI gates 1-7 + browser EN/FR mobile</verify>
  <done>Article live</done>
</task>
```

## D.4.Rvz.1 : Sentry install + DSN wire

```xml
<task type="auto">
  <name>Install @sentry/react and Deno-compatible Sentry for edge fns</name>
  <files>package.json, src/main.tsx, supabase/functions/_shared/sentry.ts, .env.example</files>
  <action>
    1. npm install @sentry/react
    2. In src/main.tsx, init Sentry with DSN from VITE_SENTRY_DSN_FRONTEND
    3. Configure beforeSend to strip PII (email, phone, raw_text fields)
    4. Edge fn shim: supabase/functions/_shared/sentry.ts uses @sentry/deno
       OR raw fetch to Sentry envelope endpoint (DSN-derived)
    5. Set sample rate 100% for errors, 10% for traces
  </action>
  <verify>
    - npm run build still passes
    - Test event from frontend lands in Sentry dashboard
    - Test event from edge fn lands
    - PII scrub: email field absent in Sentry payload
  </verify>
  <done>Sentry receiving events from both contexts</done>
</task>
```

## D.4.Rvz.2 : `_shared/observability.ts` helper

```xml
<task type="auto">
  <name>Standardized error capture + audit log helper</name>
  <files>supabase/functions/_shared/observability.ts, supabase/functions/_shared/observability.test.ts</files>
  <action>
    Export captureError(error, context) that:
    1. Sends to Sentry with tenantId hash, action, status as tags
    2. Writes to audit_log via D.1 emitAuditLog
    3. Returns a typed error response shape: { error: string; error_code: string; trace_id?: string }

    Export wrapHandler(handler) that:
    1. Wraps the handler in try/catch
    2. On error, calls captureError
    3. Returns standardized 500 + error_code

    Export Result<T> = { ok: true; data: T } | { ok: false; error: string; code: string } pattern for internal returns.
  </action>
  <verify>
    12 vitest:
    - captureError sends to Sentry mock
    - PII stripped before send
    - Audit log entry created
    - Returns standard error shape
    - wrapHandler catches sync errors
    - wrapHandler catches async errors
    - Sentry sampling at 100% for errors
    - Trace ID returned in response
    - Sentry mute when DSN missing
    - Audit log fallback works when Sentry fails
    - context.tenantId hashed before send
    - context.action present in tags
  </verify>
  <done>Helper + 12 vitest pass</done>
</task>
```

## D.4.Rvz.3 : Refactor 30 edge fn catch blocks

```xml
<task type="auto">
  <name>Migrate top 30 edge fns to wrapHandler + captureError</name>
  <files>supabase/functions/* (top 30 by traffic)</files>
  <action>
    For each fn:
    - export const handler = wrapHandler(async (req, env, ctx) => { ... })
    - In catch blocks, replace console.error with captureError
    - Standardize error_code naming (kebab-case verb-subject)
  </action>
  <verify>
    - Existing vitest still pass
    - 30 new vitest cases (one per fn): error path returns standard shape, no naked console.error
  </verify>
  <done>30 fns migrated</done>
</task>
```

## D.4.Rvz.4 : Operator error dashboard

```xml
<task type="auto">
  <name>/admin/errors page with filters</name>
  <files>src/pages/admin/Errors.tsx, src/hooks/useErrors.ts</files>
  <action>
    Reads recent errors from audit_log WHERE action LIKE 'error.%'.
    Filters: action, tenant (strategist+), severity, time range.
    Default sort: most recent first.
    Drill-down: click row to see full payload (sanitized JSONB).
    Auto-refresh every 60s.
  </action>
  <verify>
    8 vitest:
    - filters work
    - strategist sees cross-tenant
    - member sees only own tenant
    - drill-down opens payload modal
    - empty state
    - auto-refresh respects pause
    - severity filter
    - time range filter
  </verify>
  <done>Page shipped, 8 vitest pass</done>
</task>
```

## D.4.Rvz.5 : Per-tenant Slack alert (Agency tier)

```xml
<task type="auto">
  <name>Slack webhook routing for high-severity errors</name>
  <files>supabase/migrations/20260505000000_add_alert_routing_to_tenants.sql, supabase/functions/_shared/alertRouting.ts, src/pages/Settings.tsx</files>
  <action>
    Migration: ALTER TABLE tenants ADD COLUMN alert_routing JSONB DEFAULT '{}'::jsonb (encrypted at rest via pgcrypto if available, otherwise application-level encrypt).
    Lib alertRouting.ts: routeAlert(tenantId, alert) sends to configured channels (email default, slack optional).
    Settings UI (Agency tier only): "Slack webhook" input + test button.
    captureError checks routing on critical severity, fans out.
  </action>
  <verify>
    8 vitest:
    - routing reads encrypted webhook
    - Slack POST mock succeeds
    - Slack 5xx retries 1x
    - Slack 4xx skips retry
    - tier check (Agency only)
    - test button validates webhook
    - audit log on every send
    - email default unchanged
  </verify>
  <done>Routing + UI shipped</done>
</task>
```

---

## Hand-off

Sequence: D.1 must be live first (audit_log infra). D.4 then can ship in parallel with D.2.
1. Sentry account + DSN provisioned
2. D.4.Rvz.1 install
3. D.4.Rvz.2 helper (TDD)
4. D.4.Rvz.3 30-fn refactor (chunked across 3 commits of 10)
5. D.4.Rvz.4 dashboard
6. D.4.Rvz.5 Slack routing
7. AiLys help D.4.AiLys.1 in parallel
