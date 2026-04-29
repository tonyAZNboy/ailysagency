# Phase C.6 : Sub-phases (atomic, mergeable)

Total estimate: ~24h. Time-box ceiling: 48h (2x rule).

## Cross-repo split

| Repo | Sub-phases | Hours | Owner |
|---|---|---|---|
| AiLys (this worktree) | C.6.AiLys.1 | 2h | This session |
| Reviuzy | C.6.Rvz.1 to C.6.Rvz.5 | 22h | Follow-up sessions |

---

## C.6.AiLys.1 : Help center article + STATE handoff (~2h)

**Files:**
- `src/data/help-articles.ts` : 1 new article slug `citation-auto-batch`
- `STATE.md` : Phase C.6 entry with Reviuzy handoff

**Content covered:**
- What auto-batch does (Tier 1 directories, structured submission)
- What stays manual (BBB approval, vertical directories with captcha)
- Per-tier cadence (Core 5/mo, Growth 10/mo, Agency 15/mo)
- Strategist QA gate (not auto-publish; strategist approves before live)
- Privacy: only canonical NAP submitted, no PII

**Commit:** `docs(c6): help article citation-auto-batch (EN+FR-CA) + Reviuzy handoff in STATE.md`

---

## C.6.Rvz.1 : Migration + auto_batch_runs table (~3h, Reviuzy)

**Files (Reviuzy):**
- `supabase/migrations/20260501000000_create_auto_batch_runs.sql`
- `supabase/migrations/20260501010000_add_submission_method_to_citation_submissions.sql`
- `src/test/rls/autoBatchRuns.isolation.test.ts` (8 cases per Section 6 pattern)

**Schema:**
```sql
CREATE TABLE auto_batch_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('pending','running','complete','partial','failed','dry_run')),
  directories_attempted INT NOT NULL DEFAULT 0,
  directories_success INT NOT NULL DEFAULT 0,
  directories_failed INT NOT NULL DEFAULT 0,
  results JSONB NOT NULL DEFAULT '[]'::jsonb,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE citation_submissions
  ADD COLUMN submission_method TEXT NOT NULL DEFAULT 'manual'
  CHECK (submission_method IN ('manual','auto','scheduled'));
ALTER TABLE citation_submissions
  ADD COLUMN auto_batch_run_id UUID REFERENCES auto_batch_runs(id) ON DELETE SET NULL;
```

**Commit:** `feat(c6): auto_batch_runs table + RLS isolation tests + submission_method on citation_submissions`

---

## C.6.Rvz.2 : Directory adapter framework + 3 Tier 1 adapters (~6h, Reviuzy)

**Files (Reviuzy):**
- `supabase/functions/_shared/directories/types.ts`
- `supabase/functions/_shared/directories/yelp.ts`
- `supabase/functions/_shared/directories/foursquare.ts`
- `supabase/functions/_shared/directories/bbb-csv.ts`
- `supabase/functions/_shared/directories/index.ts`
- `src/test/edge/directories/*.test.ts` (vitest, 12+ cases per adapter)

**Adapter contract:**
```ts
interface DirectoryAdapter {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  requiresHuman: boolean;
  submit(input: NapInput, opts: SubmitOpts): Promise<SubmitResult>;
  status(submissionId: string): Promise<StatusResult>;
}
```

**Commit:** `feat(c6): directory adapter framework + Yelp + Foursquare + BBB-CSV adapters`

---

## C.6.Rvz.3 : Edge fn citation-auto-batch + DRY_RUN (~6h, Reviuzy)

**Files:**
- `supabase/functions/citation-auto-batch/index.ts`
- `src/test/edge/citationAutoBatch.test.ts` (15+ cases)

**Behavior:**
1. Resolve eligible tenants: `auto_citation_batch_enabled=true AND tier IN ('core','growth','agency')`
2. Per tenant: fetch canonical NAP from `nap_snapshots` (skip if missing or stale)
3. Determine cadence per tier (5/10/15 directories/month)
4. Pick next N directories via round-robin from Tier 1 list
5. Insert `auto_batch_runs` row with `status=pending`, jitter 0-3600s
6. Per directory: call adapter.submit(), log result, increment counters
7. On completion, update `status=complete|partial|failed` with full `results` JSONB
8. DRY_RUN check: if true, mark `status=dry_run`, no external calls

**Commit:** `feat(c6): citation-auto-batch edge fn with adapter dispatch + DRY_RUN`

---

## C.6.Rvz.4 : pg_cron schedule + admin panel (~5h, Reviuzy)

**Files:**
- `supabase/migrations/20260501020000_schedule_citation_auto_batch.sql` (cron `0 4 * * *`)
- `src/pages/CitationAutoBatch.tsx`
- `src/hooks/useCitationAutoBatch.ts`
- Nav entry in ExpandableNavbar (strategist+)

**UI:**
- Per-tenant on/off toggle
- Last 50 runs table with status + per-directory drill-down
- Cost telemetry card
- Manual re-run button (strategist only, rate-limited 1/hr/tenant)

**Commit:** `feat(c6): pg_cron + admin panel for citation auto-batch`

---

## C.6.Rvz.5 : Per-adapter smoke tests + observability (~2h, Reviuzy)

**Files:**
- Production smoke: weekly cron that runs each adapter against a known sandbox NAP, alerts if any adapter regresses
- Sentry integration on edge fn errors
- Daily summary email to operator (delivery rate per adapter)

**Commit:** `feat(c6): per-adapter production smoke + observability`

---

## Hand-off checklist for next Reviuzy session

1. Read this `02-sub-phases.md`
2. Apply 2 migrations C.6.Rvz.1
3. Build adapter framework + 3 Tier 1 adapters per C.6.Rvz.2
4. Implement edge fn per C.6.Rvz.3
5. Schedule pg_cron + admin UI per C.6.Rvz.4
6. Wire production smoke per C.6.Rvz.5
7. Update Reviuzy STATE.md
8. Cross-link back to AiLys help article
