# Phase D.1 : Test Matrix

| Sub-phase | Cases |
|---|---|
| D.1.AiLys.1 (help article) | CI gates 1-7 + manual EN/FR mobile/tablet (gates 9, 10, 12, 13) |
| D.1.Rvz.1 (migration) | 10: insert/update-blocked/delete-blocked/RLS isolation 4 cases/strategist cross/service_role full |
| D.1.Rvz.2 (lib) | 12: emit happy/PII strip/payload_hash stable/query filtered (3)/limit/since/error path |
| D.1.Rvz.3 (10 fn refactor) | Existing fn suites must still pass; new audit_log rows assertable |
| D.1.Rvz.4 (export) | 15: owner happy/member 403/csv/json/since/until/signed valid/sig verify/replay blocked/rate limit/role 403/secret missing/large stream/redacted fields/integrity match |
| D.1.Rvz.5 (UI) | 8: filters/strategist filter/date range/member 403/owner own/Agency-tier gate/empty state/error state |

**Total new automated tests:** 45 (Reviuzy) + 0 (AiLys uses existing CI)

## Manual gates (post Reviuzy ship)

1. Apply migration on staging
2. Smoke-fire 5 actions across 3 tenants, verify rows
3. Owner export: download CSV, verify HMAC sidecar matches
4. Strategist cross-tenant filter works
5. Member role attempts /admin/audit-log : 403
6. UPDATE attempt via psql as service_role : exception
