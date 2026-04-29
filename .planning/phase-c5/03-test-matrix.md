# Phase C.5 : Test Matrix

## C.5.AiLys.1 : Help center articles + STATE handoff

| Gate | Type | Count | Status |
|---|---|---|---|
| 1. tsc | CI | 1 | required |
| 2. audit-translations-deep | CI | 1 | required |
| 3. audit-blog-translations | CI | 1 | required |
| 4. em-dash sweep | CI | 1 | required |
| 5. existing smokes | CI | 5 (66 cases) | required |
| 6. new smoke | CI | 0 (none for help docs) | n/a |
| 7. build | CI | 1 | required |
| 8. live curl | manual | n/a (no endpoint) | skip |
| 9. browser viewport 375x812 + 768x1024 | manual | 2 | required |
| 10. FR-CA locale switch | manual | 1 | required |
| 11. admin panel surface | manual | n/a (no admin yet, comes in Reviuzy side) | skip |
| 12. EN+FR-CA help articles | manual | 2 | required |
| 13. STATE.md same-commit | gate | 1 | required |

**Definition of Done for C.5.AiLys.1:**
- Help article ID `monthly-visibility-report` rendered in EN at `/help`
- Same article rendered in FR-CA at `/fr/aide`
- Em-dash count in `src/data/help-articles.ts` for new entries: 0
- No proprietary AI provider name in article body (grep for: `Anthropic|Claude|Gemini|OpenAI|GPT-`)
- STATE.md updated with new commit hash + Reviuzy handoff spec

## C.5.Rvz.1 : Migration + RLS isolation test (Reviuzy)

| Test | Type | Cases | Required |
|---|---|---|---|
| Migration applies on fresh schema | unit | 1 | yes |
| RLS isolation: tenant A SELECT B | vitest | 1 | yes |
| RLS isolation: tenant A INSERT B | vitest | 1 | yes |
| RLS isolation: tenant A UPDATE B | vitest | 1 | yes |
| RLS isolation: tenant A DELETE B | vitest | 1 | yes |
| Strategist cross-tenant SELECT | vitest | 1 | yes |
| Strategist cannot mutate | vitest | 1 | yes |
| Service role full access | vitest | 1 | yes |
| Migration `down` restores schema | manual | 1 | yes |

**Total:** 8 unit/RLS cases.

## C.5.Rvz.2 : Edge fn (Reviuzy)

12 vitest cases enumerated in `02-sub-phases.md`. Plus:
- Live curl on staging environment after deploy
- DRY_RUN mode end-to-end test for 1 seed Agency tenant
- Verify Resend dashboard shows email (real send mode)
- Verify storage bucket has the PDF

## C.5.Rvz.3 : pg_cron (Reviuzy)

- `SELECT * FROM cron.job;` shows the schedule
- Manual fire via `SELECT cron.run('monthly-visibility-report');` succeeds
- `cron.unschedule()` removes the job

## C.5.Rvz.4 : Admin panel (Reviuzy)

| Test | Cases |
|---|---|
| Hook fetches last 50 rows | 1 |
| Hook respects RLS (only own tenant for non-strategist) | 1 |
| Manual re-run button rate-limit | 1 |
| Cost telemetry computes correctly | 1 |
| Opt-out toggle persists | 1 |
| Page renders without crash | 1 |

**Total:** 6 vitest cases.

## Cross-repo aggregate

- AiLys: 0 new automated tests (uses existing CI gates)
- Reviuzy: 26 new automated tests (8 RLS + 12 edge + 6 admin)

## Manual verification gates (operator must do before flipping live)

After Reviuzy ships C.5.Rvz.1-4 + AiLys C.5.AiLys.1:

1. ✅ Help articles live in production EN + FR-CA, opened in browser
2. ✅ Migration applied via Supabase SQL Editor
3. ✅ Edge fn deployed via `npx supabase functions deploy monthly-visibility-export`
4. ✅ pg_cron schedule registered via second migration
5. ✅ Env vars set: `MONTHLY_VISIBILITY_REPORT_ENABLED=true`, `MONTHLY_VISIBILITY_REPORT_DRY_RUN=true` (start in dry-run)
6. ✅ Pick 1 seed Agency tenant, manually fire edge fn, verify dry_run row in monthly_visibility_reports
7. ✅ Inspect generated PDF artifact (rendered but not stored in dry-run; log payload)
8. ✅ Flip `MONTHLY_VISIBILITY_REPORT_DRY_RUN=false`, fire again for same tenant, verify Resend send + storage upload + status='sent'
9. ✅ Wait for next 1st-of-month cron fire, monitor delivery rate
10. ✅ Admin panel shows last 50 invocations + cost telemetry
