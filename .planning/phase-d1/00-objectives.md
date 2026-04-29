# Phase D.1 : SOC2-grade audit log + signed export

## Business goal

Enterprise buyers (multi-location hospitality, regulated verticals) will not sign without "show me the audit trail" capability. Today our audit logging is fragmented: console.log in some edge fns, a `tenant_history` table, ad-hoc rows scattered across Phase 4-12 tables. No single immutable source of truth, no tenant-self-service export, no signed integrity.

D.1 ships:
1. Single `audit_log` table (append-only, immutable triggers, JSONB payload)
2. Helper lib that every edge fn calls instead of console.log
3. Tenant-scoped export endpoint: signed CSV/JSON, 90-day window, tenant-owner role only
4. Strategist-cross-tenant audit search for support cases

## Hours saved + revenue uplift

- **Revenue:** unlocks the implicit "Enterprise" tier conversation. Estimated $2k-$5k MRR per enterprise client (multi-location hotel groups, dental DSOs). 2-3 such deals/year = $48k-$180k incremental ARR
- **Hours saved:** ~3h/mo on compliance questionnaires (SIG, CAIQ) once audit export is templatable
- **Risk reduction:** GDPR + Loi 25 + PIPEDA right-of-access requests today require manual SQL by operator. With self-serve export, response time drops from days to seconds

## Who benefits

- **Enterprise client:** can answer "who accessed my data when" without involving us
- **Strategist:** has one place to audit a support case
- **Operator:** stops grepping Logpush JSON files

## Deliverable scope

**AiLys side (~4h):**
1. Help article `audit-log-and-data-export` EN + FR-CA
2. Mirror schema documentation for cross-repo reference

**Reviuzy side (~12h):**
1. Migration: `audit_log` table with append-only trigger, tenant_id index, RLS
2. Lib `_shared/auditLog.ts` standardizing emit + query
3. Refactor 10 highest-traffic edge fns to use the helper (gradual; no big-bang)
4. Edge fn `audit-log-export` returning signed CSV/JSON
5. Admin page `/admin/audit-log` with strategist cross-tenant filter
6. Tenant-self-serve UI in Settings: "Download my audit log"

## Cost estimate per invocation

- **Storage:** JSONB rows ~2KB each. At 50 clients × 1000 events/day = 100MB/day = 36GB/year. Postgres handles fine; partition by month if needed.
- **Anthropic / Resend / R2:** ZERO. Pure DB.
- **Export endpoint:** signs CSV/JSON via existing HMAC primitive. Negligible compute.

## Monthly budget cap

- Storage costs absorbed in existing Supabase plan (Pro tier supports 8GB+; partition keeps growth bounded)

## Why this dep (Section 10)

**No new dependencies.** Reuses:
- Postgres triggers (append-only enforcement)
- Supabase RLS (tenant isolation)
- Existing HMAC sign primitive (signed export)
- React Query in admin UI

## Acceptance criteria

- [ ] Append-only enforced: any UPDATE or DELETE on audit_log raises exception
- [ ] RLS: tenant-owner SELECT own, strategist+ SELECT all, no INSERT from client (service_role only)
- [ ] Help article EN + FR-CA, no proprietary AI provider mention
- [ ] Export endpoint returns signed CSV with HMAC checksum
- [ ] Tenant export self-serve in Settings (Agency tier first; opt-in to other tiers later)
- [ ] 30+ vitest cases covering insert/RLS/export/replay
