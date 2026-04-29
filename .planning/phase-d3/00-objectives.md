# Phase D.3 : Reviuzy security hotfix (CRITICAL, ship first)

## Business goal

Three production security risks surfaced by deep audit. Each violates CLAUDE.md hard rule #9 + iso-gsd-delivery skill section 4. Fixed together in a single security-only PR to keep diff focused and reviewable.

D.3 ships:
1. Remove hardcoded Supabase anon key from frontend `src/hooks/useAIEngine.ts`
2. Server-side tenant_id re-verification in admin endpoints (admin-pricing, etc.)
3. Zod input validation across the 60+ edge fns currently lacking it (sweep)

This is a SECURITY commit. No new features, no UX change. Pure correctness.

## Hours saved + revenue uplift

- **Risk reduction (the actual gain):** prevents tenant impersonation, billing fraud, malformed-input crashes
- **Compliance:** unblocks D.1 SOC2 conversation (you cannot claim audit integrity if input is unvalidated)
- **Hours saved indirectly:** strategist hours not spent on incident response (~5h per non-incident)

## Who benefits

- **All tenants:** isolation guarantee restored
- **Operator:** sleep at night
- **Sales:** can answer "is your input validation comprehensive" with proof

## Deliverable scope

**AiLys side: NONE.** This is Reviuzy-only.

**Reviuzy side (~6h):**
1. Remove hardcoded Supabase anon key, fetch from env
2. Add `verifyTenantMembership(supabase, userId, tenantId)` helper to `_shared/`, use in 8 admin endpoints
3. Zod schema sweep: each of the 60+ edge fns gets `parseRequest(BodySchema)` at entry
4. Vitest cases for each fix (not exhaustive coverage; targeted regression)

## Cost estimate per invocation

ZERO net new cost. Validation is CPU-cheap, runs before any DB or external call.

## Why this dep (Section 10)

**Possible new dep:** `zod` if not already installed in Reviuzy. Most likely already there given existing patterns. Verify before adding.

## Acceptance criteria

- [ ] grep for `eyJ` (JWT prefix) in src/ returns 0 hardcoded keys
- [ ] All admin endpoints reject cross-tenant tenantId with 403
- [ ] All edge fns return 400 + structured error on malformed body
- [ ] Existing vitest suites still green (no regression)
- [ ] New vitest cases (~30) covering security regressions
- [ ] STATE.md update + Reviuzy CHANGELOG note marked "security"

## Strategic note

This must ship BEFORE any other Reviuzy work in this branch chain. Including B.4.4.Rvz, C.5.Rvz, etc. Security comes first per hard rule precedence.
