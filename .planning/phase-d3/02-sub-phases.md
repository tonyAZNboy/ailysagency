# Phase D.3 : Sub-phases (GSD XML format)

Total estimate: ~6h. Time-box ceiling: 12h.

**Reviuzy-only PR. No AiLys deliverable.** Ship FIRST in the cross-repo sequence.

---

## D.3.Rvz.1 : Remove hardcoded Supabase anon key

```xml
<task type="auto">
  <name>Move Supabase anon key from src/hooks/useAIEngine.ts to env</name>
  <files>src/hooks/useAIEngine.ts, src/integrations/supabase/landingClient.ts (if exists), .env.example, vite.config.ts</files>
  <action>
    1. Identify the hardcoded JWT (line ~43-44 of useAIEngine.ts)
    2. Replace with: const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? throw new Error('missing key')
    3. If a separate landing client exists, move the create call there
    4. Add VITE_SUPABASE_ANON_KEY to .env.example (placeholder)
    5. Verify CF Pages build env has the var set (or document as user action)
    6. Rotate the leaked key in Supabase dashboard (USER ACTION, document in STATE.md)
  </action>
  <verify>
    - grep -rn "eyJ" src/ returns 0
    - Build passes locally with .env loaded
    - Build fails cleanly when .env missing the var
    - Existing useAIEngine functionality unchanged
  </verify>
  <done>Key removed, env-driven, key rotated in dashboard</done>
</task>
```

## D.3.Rvz.2 : `verifyTenantMembership` helper + admin fn refactor

```xml
<task type="auto">
  <name>Add tenant verification helper + use in 8 admin endpoints</name>
  <files>supabase/functions/_shared/tenantVerify.ts, supabase/functions/_shared/tenantVerify.test.ts, supabase/functions/admin-pricing/index.ts, supabase/functions/admin-tenant-update/index.ts, supabase/functions/admin-domain-add/index.ts, supabase/functions/admin-domain-remove/index.ts, supabase/functions/admin-citation-update/index.ts, supabase/functions/admin-photo-approve/index.ts, supabase/functions/admin-alert-dismiss/index.ts, supabase/functions/admin-api-key-revoke/index.ts</files>
  <action>
    Helper signature:
    export async function verifyTenantMembership(
      supabase: SupabaseClient,
      userId: string,
      tenantId: string,
      requiredRole?: 'member'|'admin'|'owner'
    ): Promise<{ ok: true; role: string } | { ok: false; reason: 'no_membership'|'role_too_low' }>

    Implementation: SELECT role FROM user_memberships WHERE user_id = $1 AND tenant_id = $2. If row missing : no_membership. If requiredRole > role : role_too_low.

    In each of the 8 admin fns, BEFORE any mutation:
    const verify = await verifyTenantMembership(supabase, user.id, body.tenantId, 'admin')
    if (!verify.ok) return jsonResponse({ error: verify.reason }, 403)

    For ailys_strategist callers, allow override via is_ailys_strategist() check (existing predicate).
  </action>
  <verify>
    Helper vitest (8 cases):
    - membership exists + sufficient role : ok
    - membership exists + role_too_low : reason role_too_low
    - no membership : reason no_membership
    - is_ailys_strategist override : ok
    - SQL error path : reason no_membership (fail-closed)
    - case-insensitive role compare
    - null userId : no_membership
    - null tenantId : no_membership

    Each refactored fn vitest:
    - cross-tenant attempt: 403
    - own-tenant happy path: 200 (existing test still passes)
  </verify>
  <done>Helper + 8 fns refactored, 16+ vitest pass (8 helper + 8 cross-tenant)</done>
</task>
```

## D.3.Rvz.3 : Zod sweep on 60+ edge fns (split into 3 batches)

```xml
<task type="auto">
  <name>Zod batch 1: 20 highest-traffic edge fns</name>
  <files>supabase/functions/{public-api,detect-anomalies,gbp-draft-reply,ai-visibility-run,citation-submit,google-upload-photo,auto-reply-reviews,reddit-poll,gsc-sync-rankings,llm-snapshot-rebuild,schema-audit,apply-remediation,gbp-auto-publish-gate,monthly-visibility-export,citation-auto-batch,compute-renewal-signals,compute-health-score,audit-log-export,dashboard-cohort-stats,export-action-plan}/index.ts</files>
  <action>
    For each fn:
    1. Define BodySchema = z.object({...}) at top of file
    2. Replace const body = await req.json() with:
       const raw = await req.json()
       const parsed = BodySchema.safeParse(raw)
       if (!parsed.success) return jsonResponse({ error: 'invalid_input', issues: parsed.error.issues }, 400)
       const body = parsed.data
    3. Schema MUST validate UUIDs (z.string().uuid()), enum values (z.enum), required fields, max-length strings
    4. Update vitest to cover validation rejections
  </action>
  <verify>
    - npx tsc --noEmit clean
    - Existing tests still pass
    - For each fn: malformed body returns 400 + issues array, not 500
    - 20 new vitest cases (1 per fn covering invalid_input)
  </verify>
  <done>20 fns hardened, 20 new vitest pass</done>
</task>

<task type="auto">
  <name>Zod batch 2: next 20 edge fns</name>
  <files>supabase/functions/{capture-landing-lead,chat-widget,competitor-scan,verify-payment,subscription-webhook,provision-ailys-tenant,gsc-list-properties,reddit-target-add,reddit-target-remove,nap-snapshot,nap-canonical-set,citation-submission,citation-status,api-key-generate,api-key-list,api-key-revoke,executive-report-generate,alert-dismiss,alert-mark-read,health-score-recompute}/index.ts</files>
  <action>Same pattern as batch 1.</action>
  <verify>20 new vitest pass.</verify>
  <done>40 fns total hardened.</done>
</task>

<task type="auto">
  <name>Zod batch 3: remaining ~20 edge fns + cleanup</name>
  <files>supabase/functions/* (remaining)</files>
  <action>Same pattern; sweep any not yet covered.</action>
  <verify>npx vitest run completes 100%</verify>
  <done>60+ fns total hardened, security hotfix ready for review</done>
</task>
```

---

## Hand-off

1. Branch off Reviuzy main : `claude/security-hotfix-d3`
2. D.3.Rvz.1 first commit (key rotation)
3. D.3.Rvz.2 second commit (tenant verify helper + 8 fn refactor)
4. D.3.Rvz.3 batches in 3 commits (zod sweep)
5. Total: 5 commits in 1 PR
6. After merge, USER MUST rotate the leaked Supabase anon key in dashboard
7. Document rotation in STATE.md
