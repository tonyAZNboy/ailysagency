# 02 — Sub-phases

Single sub-phase, single PR, single commit. The work is a mechanical
refactor of three call sites. Splitting is unnecessary overhead.

## Sub-phase 1: lib + smoke + 3-endpoint refactor + Gate 26

**Estimate:** 1.5 hours (≤ 3h with Section 11 escape hatch).

**Atomic units in the commit:**

1. `functions/lib/supabaseInsert.ts` (new file, ~120 LOC).
2. `scripts/smoke-supabase-insert.mjs` (new file, ~250 LOC, ≥ 12 cases).
3. `functions/api/partner-application.ts` — replace inline
   `forwardToSupabase` with `insertSupabaseRow` call. Keep the wrapping
   function name `forwardToSupabase` for in-file readability; only the
   body changes. Net LOC drop: ~30.
4. `functions/api/founding-clients-apply.ts` — same refactor. Net LOC
   drop: ~30.
5. `functions/api/cofounders-apply.ts` — same refactor. Net LOC drop: ~30.
6. `.github/workflows/deploy.yml` — add Gate 26 step running
   `node scripts/smoke-supabase-insert.mjs`.
7. `STATE.md` — append session-close entry with commit hash, smoke pass
   count, no new operator action items.

**Smoke cases (≥ 12, target 15):**

- C1: missing SUPABASE_URL → returns `{ ok: true }`, no fetch fired.
- C2: missing SUPABASE_SERVICE_ROLE_KEY → same.
- C3: 200 OK → returns `{ ok: true }`.
- C4: 201 Created → returns `{ ok: true }` (Supabase returns 201 with
  `Prefer: return=minimal`).
- C5: 409 Conflict + `ignoreDuplicates: true` → returns `{ ok: true }`.
- C6: 409 Conflict + `ignoreDuplicates: false` → returns `{ ok: false }`.
- C7: 400 Bad Request → returns `{ ok: false, error: "Supabase 400" }`.
- C8: 401 Unauthorized → returns `{ ok: false, error: "Supabase 401" }`.
- C9: 500 server error → returns `{ ok: false, error: "Supabase 500" }`.
- C10: fetch throws (network) → returns `{ ok: false }`, error message
  bounded.
- C11: response body containing the SERVICE_ROLE_KEY → key REDACTED in
  the error string returned by the lib.
- C12: error message truncated to ≤ 256 chars (no log flood from
  attacker-controlled response bodies).
- C13: payload includes `created_at` literal → forwarded as-is (no
  override).
- C14: lib does NOT mutate the row argument (immutability).
- C15: `Prefer` header present in request: `return=minimal` baseline,
  `return=minimal,resolution=ignore-duplicates` when option set.

**CI gate:** Gate 26 in deploy.yml.

**Time-box:** 3h hard cap (Section 11). If exceeded, return partial
diff to user with re-spec proposal.

**Definition of Done (binary subset applicable to refactor):**

- [ ] `npx tsc --noEmit` clean
- [ ] `node scripts/audit-translations-deep.mjs` exit 0
- [ ] `node scripts/audit-blog-translations.mjs` exit 0
- [ ] em-dash audit zero matches
- [ ] all existing smoke pass
- [ ] new `smoke-supabase-insert.mjs` exits 0 with 15/15
- [ ] `npm run build` green
- [ ] live curl against `/api/partner-application` 1 happy + 3 failures
- [ ] live curl against `/api/founding-clients-apply` 1 happy + 3 failures
- [ ] STATE.md updated in same commit
- [ ] No new dep added
- [ ] N/A: RLS isolation test (no new table)
- [ ] N/A: DRY_RUN mode (not a cron)
- [ ] N/A: locale parity (no user-facing strings)
- [ ] N/A: admin panel surface (refactor, no new feature)
- [ ] N/A: help center articles (no behavior change)
- [ ] N/A: migration down (no migration)
