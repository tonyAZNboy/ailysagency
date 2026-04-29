# Phase D.1 : Sub-phases (GSD XML task format)

Total estimate: ~16h. Time-box ceiling: 32h.

## Cross-repo split

| Repo | Sub-phases | Hours |
|---|---|---|
| AiLys | D.1.AiLys.1 | 4h |
| Reviuzy | D.1.Rvz.1 to D.1.Rvz.5 | 12h |

---

## D.1.AiLys.1 : Help article + cross-repo schema reference

```xml
<task type="auto">
  <name>Help article: audit-log-and-data-export EN+FR-CA</name>
  <files>src/data/help-articles.ts</files>
  <action>
    Add new help article slug "audit-log-and-data-export". Cover:
    what's logged (action, actor, target, timestamp; never review text or PII),
    retention (12 months; partitioned), how to download (Settings > Privacy >
    Export audit log), signed integrity (HMAC checksum file alongside CSV),
    legal compliance posture (Loi 25, GDPR, PIPEDA right-of-access).
    EN canonical + FR-CA hand-translated. No proprietary AI provider mention.
  </action>
  <verify>
    - tsc clean
    - audit-translations-deep clean
    - em-dash sweep clean
    - Browser preview at 375x812 + 768x1024 EN + FR-CA
    - grep -iE "anthropic|claude|gemini|openai|gpt-" returns 0 in article body
  </verify>
  <done>Article live at /help/audit-log-and-data-export and /fr/help/audit-log-and-data-export</done>
</task>
```

---

## D.1.Rvz.1 : Migration + append-only trigger

```xml
<task type="auto">
  <name>Create audit_log table with append-only trigger</name>
  <files>supabase/migrations/20260503000000_create_audit_log.sql</files>
  <action>
    CREATE TABLE audit_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID REFERENCES tenants(id) ON DELETE NO ACTION,
      actor_user_id UUID REFERENCES auth.users(id),
      actor_role TEXT NOT NULL,
      action TEXT NOT NULL,
      target_kind TEXT,
      target_id TEXT,
      payload_hash TEXT,
      ip_hash TEXT,
      user_agent_hash TEXT,
      payload JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    ) PARTITION BY RANGE (created_at);

    CREATE INDEX audit_log_tenant_created_idx ON audit_log (tenant_id, created_at DESC);
    CREATE INDEX audit_log_action_idx ON audit_log (action);

    -- Append-only trigger
    CREATE OR REPLACE FUNCTION audit_log_no_mutation() RETURNS TRIGGER AS $$
    BEGIN
      RAISE EXCEPTION 'audit_log is append-only';
    END; $$ LANGUAGE plpgsql;
    CREATE TRIGGER audit_log_no_update BEFORE UPDATE ON audit_log
      FOR EACH ROW EXECUTE FUNCTION audit_log_no_mutation();
    CREATE TRIGGER audit_log_no_delete BEFORE DELETE ON audit_log
      FOR EACH ROW EXECUTE FUNCTION audit_log_no_mutation();

    -- RLS
    ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "members read own" ON audit_log FOR SELECT USING (
      tenant_id IN (SELECT tenant_id FROM user_memberships WHERE user_id = auth.uid())
    );
    CREATE POLICY "strategist read all" ON audit_log FOR SELECT USING (is_ailys_strategist());
    -- service_role bypasses RLS by default
  </action>
  <verify>
    - Migration applies on fresh schema
    - INSERT succeeds via service_role
    - UPDATE raises 'audit_log is append-only'
    - DELETE raises same
    - Tenant A SELECT cannot see tenant B rows
    - Strategist SELECT sees both tenants
  </verify>
  <done>10 vitest cases pass: insert, update-blocked, delete-blocked, RLS isolation 4 cases, strategist cross-read, service_role full access</done>
</task>
```

## D.1.Rvz.2 : Lib `_shared/auditLog.ts`

```xml
<task type="auto">
  <name>auditLog helper lib with typed schema</name>
  <files>supabase/functions/_shared/auditLog.ts, supabase/functions/_shared/auditLog.test.ts</files>
  <action>
    Export emitAuditLog(supabase, entry) where entry is typed:
    { tenantId: string; actorUserId?: string; actorRole: string;
      action: string; targetKind?: string; targetId?: string;
      payload?: Record<string, unknown>; ipHash?: string;
      userAgentHash?: string }
    Function computes payload_hash via SHA-256 of JSON.stringify(payload).
    Strips any field name in PII_BLACKLIST (email, phone, raw_text, ip_address)
    before insert. Returns Promise<void> (fire-and-forget).
    Plus query helper: queryAuditLog(supabase, { tenantId, action?, since?,
    limit }).
  </action>
  <verify>
    - 12 vitest cases: emit happy path, PII fields stripped, payload_hash
      stable, query filtered by tenant, query filtered by action, query limit,
      query since timestamp, error path on missing tenantId
  </verify>
  <done>Lib + 12 vitest pass</done>
</task>
```

## D.1.Rvz.3 : Refactor 10 highest-traffic edge fns

```xml
<task type="auto">
  <name>Migrate 10 edge fns to auditLog lib</name>
  <files>supabase/functions/admin-pricing/index.ts, supabase/functions/detect-anomalies/index.ts, supabase/functions/gbp-draft-reply/index.ts, supabase/functions/google-upload-photo/index.ts, supabase/functions/citation-submission/index.ts, supabase/functions/ai-visibility-run/index.ts, supabase/functions/auto-reply-reviews/index.ts, supabase/functions/public-api/index.ts, supabase/functions/apply-remediation/index.ts, supabase/functions/gbp-auto-publish-gate/index.ts</files>
  <action>
    Replace console.log audit messages with emitAuditLog calls.
    Standardize action names: "admin.pricing.update", "alert.anomaly.detected",
    "gbp.reply.drafted", etc. (verb.subject.action format)
    Keep console.log too for Logpush continuity during transition window.
  </action>
  <verify>
    - All 10 fns still pass their existing vitest suites
    - audit_log table has rows for each fn after a smoke run
    - No PII in any new row
  </verify>
  <done>10 fns migrated, no test regressions</done>
</task>
```

## D.1.Rvz.4 : Edge fn `audit-log-export`

```xml
<task type="auto">
  <name>Tenant-scoped signed CSV/JSON export endpoint</name>
  <files>supabase/functions/audit-log-export/index.ts, supabase/functions/audit-log-export/test.ts</files>
  <action>
    POST /functions/v1/audit-log-export with body { format: 'csv'|'json',
    since?: ISO, until?: ISO }. Auth: owner role on caller's tenant.
    Returns signed URL valid 24h pointing to a Storage bucket
    'audit-exports/{tenant_id}/{timestamp}.csv' plus a sidecar
    '{timestamp}.csv.sig' containing HMAC-SHA256 hex of file contents +
    tenant_id + timestamp.
    Single-use enforced via KV nonce. Rate limit 1/hr/tenant.
  </action>
  <verify>
    - 15 vitest: owner happy path, member 403, format csv, format json,
      since/until filters, signed URL valid, signature verifies, replay blocked,
      rate limit enforced, missing role 403, secret missing 503, large export
      streams correctly, GDPR redacted fields surface as null, no PII in CSV
      headers, integrity sidecar matches CSV bytes
  </verify>
  <done>Endpoint + 15 vitest + KV bucket bound</done>
</task>
```

## D.1.Rvz.5 : Admin page + tenant Settings UI

```xml
<task type="auto">
  <name>/admin/audit-log strategist UI + Settings tenant export</name>
  <files>src/pages/AuditLog.tsx, src/hooks/useAuditLog.ts, src/pages/Settings.tsx</files>
  <action>
    Admin page: filterable table (tenant, action, date range), strategist+ only.
    Settings page: "Download my audit log" button (Agency tier first), modal
    with format + date range, fires the export endpoint, shows download link
    when ready.
  </action>
  <verify>
    - 8 vitest: admin filter by action, by tenant (strategist), date range,
      member role 403 on /admin/audit-log, owner role can SELECT own,
      Settings button only renders for Agency tier (Phase 4.5 client_type)
  </verify>
  <done>Admin + tenant UI shipped, 8 vitest pass</done>
</task>
```

---

## Hand-off

1. Read this file
2. Apply migration D.1.Rvz.1
3. Ship lib D.1.Rvz.2 (TDD)
4. Refactor 10 fns D.1.Rvz.3 (one PR per 5 fns to keep diffs reviewable)
5. Build export D.1.Rvz.4
6. Build UI D.1.Rvz.5
7. AiLys help article D.1.AiLys.1 in parallel (any time after D.1.Rvz.1)
