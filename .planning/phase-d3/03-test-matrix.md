# Phase D.3 : Test Matrix

| Sub-phase | Cases |
|---|---|
| D.3.Rvz.1 (key rotation) | grep eyJ in src returns 0; build pass with env, fail without |
| D.3.Rvz.2 (tenant verify) | 16: helper 8 cases + 8 fns x cross-tenant rejection |
| D.3.Rvz.3 batch 1 (20 fns) | 20: invalid input rejected on each |
| D.3.Rvz.3 batch 2 (20 fns) | 20: invalid input rejected on each |
| D.3.Rvz.3 batch 3 (~20 fns) | 20: invalid input rejected on each |

**Total new vitest:** ~76

## Manual gates

1. ✅ grep -rn "eyJ" src/ → 0
2. ✅ npm run build with new env var works
3. ✅ npm run build without env var fails clearly
4. ✅ Existing Reviuzy vitest suite still 100% green
5. ✅ Smoke test on staging: tenant A user attempts admin call with tenant B id → 403
6. ✅ Smoke test: malformed JSON body to public-api → 400 + issues array
7. ✅ User rotates leaked Supabase anon key in dashboard
8. ✅ STATE.md notes rotation timestamp + key fingerprint
9. ✅ Audit log via D.1 captures the rotation event

## Regression risk

LOW. Validation rejects only previously malformed inputs (already failing); admin endpoints that worked for legitimate users keep working. The helper is additive, not destructive.

## Rollback indicator

If a legitimate user starts getting 400/403 unexpectedly, suspect:
- Schema too strict on optional fields (relax with `.optional()`)
- Membership row missing (data quality issue, not security regression)
