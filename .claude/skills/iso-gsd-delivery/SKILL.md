---
name: iso-gsd-delivery
description: ISO-grade spec-driven delivery workflow for AiLys/Reviuzy Phase C, Phase 11, Phase 12 sub-phases, or any new feature touching auth, data, cron, admin, HMAC, RLS, or multi-tenant isolation. Enforces GSD planning artefacts before code, ISO gates per commit, agent fidelity verification (100%), gov-grade security defaults, cost guardrails, multi-tenant isolation tests, dry-run mode for crons, locale parity, STATE.md same-commit update, no-new-deps without justification, time-boxing, and migration reversibility. Auto-trigger when user mentions "Phase C", "Phase 11", "Phase 12", "new sub-phase", "ship feature", "ship cron", "ship endpoint", "new edge function", or any work that mutates auth/data/cron/admin surface.
---

# ISO-grade GSD delivery workflow

This skill is the binding contract for shipping any sub-phase or new feature on AiLys Agency or Reviuzy. Skip a section = sub-phase NOT MERGEABLE. No exceptions, no "I'll fix it after."

## Section 1 — GSD planning gate (BEFORE any code)

Create `.planning/phase-<id>/` with 5 mandatory artefacts. Commit them before writing a line of feature code. User validates or says "go" before Section 2.

1. **`00-objectives.md`** — business goal, hours saved/month at fleet scale (50 clients), who benefits (client/staff/partner), cost estimate per invocation if it touches a paid API (Anthropic, Resend, Places, R2).
2. **`01-threat-model.md`** — attack surface, secrets touched, RLS impact, replay/SSRF/injection/replay-window vectors, fail-closed defaults, kill switch env var name.
3. **`02-sub-phases.md`** — atomic mergeable chunks (each = 1 commit, 1 smoke script, 1 CI gate). Hour estimate per chunk.
4. **`03-test-matrix.md`** — per chunk: unit test count, smoke case count, manual gates (browser viewport, curl happy + 3 failure modes, mobile, i18n locale switch, admin panel surface, help article EN+FR-CA).
5. **`04-rollback-plan.md`** — how to disable via env var (fail-closed default), how to revert migration (down script tested), how to purge KV/R2 leftovers, how to invalidate signed URLs.

## Section 2 — ISO-grade execution gates (PER COMMIT)

Before each `git commit` inside the sub-phase, all of these must pass. CI workflow `.github/workflows/deploy.yml` enforces gates 1-7 automatically. Operator (you) enforces 8-13.

1. `npx tsc --noEmit` (zero errors)
2. `node scripts/audit-translations-deep.mjs` (exit 0)
3. `node scripts/audit-blog-translations.mjs` (exit 0)
4. `grep -rn "—" src/i18n/translations/ src/blog/posts/ functions/` (zero matches; em-dash hard rule #2)
5. All existing smoke scripts pass (`npx tsx scripts/smoke-*.mjs`)
6. NEW smoke script for the sub-phase exists, exit 0, wired into `deploy.yml` as mandatory CI gate (numbered next available gate)
7. `npm run build` green
8. For endpoints: live curl 1 happy path + 3 failure modes (validation, method, auth/honeypot/replay)
9. For UI: opened in browser preview at 375x812 AND 768x1024
10. For i18n: switched to FR-CA at minimum, verified strings render translated
11. Admin panel surface verified live (hard rule #11): enable/disable toggle, last-50 invocations, cost telemetry, per-tier gating
12. Help center articles EN + FR-CA shipped (hard rule #10) BEFORE the marketing UI surfaces the feature; no proprietary AI provider/model/scoring/API disclosure
13. STATE.md updated in the SAME commit with: new commit hash, smoke pass count, user actions pending, env vars required

A single failed gate = no merge. No `--no-verify`. No "next commit will fix it."

## Section 3 — Agent fidelity protocol (100% verification)

When dispatching an agent (Explore, Plan, general-purpose, or any subagent_type):

1. **The agent's summary is an INTENTION, not a PROOF.**
2. For every factual claim from the agent, verify INDEPENDENTLY:
   - Claim "file X exists" → `Glob` or `Read` it yourself
   - Claim "function Y has signature Z" → `Grep` + `Read` the lines
   - Claim "test passes" → re-run the test yourself
   - Claim "edge fn deployed" → `npx supabase functions list`
   - Claim "migration applied" → query the migrations table
   - Claim "X locales updated" → `grep -c "newKey" src/i18n/translations/*.ts` and assert == 16
3. For code written by an agent: read the FULL diff via `git diff` + `Read` every touched file. Do not accept the agent's summary of "what I changed."
4. If the agent says "task done": NEVER report to user before verification step 1-3 completes.
5. **Triple verification** on sub-phases touching auth/HMAC/RLS/cron/secrets: agent writes → I read full diff → I re-run smoke + curl → user sees the proof (output paste, screenshot, count).

## Section 4 — Gov-grade security defaults (every endpoint, every edge fn)

Every new endpoint or edge function ships with all of:

- Server-side input validation (zod or equivalent)
- Rate limiting (KV token bucket on Cloudflare, Supabase RPC throttle on Postgres)
- Audit log entry (tenant_id + actor + action + timestamp + payload_hash; ZERO PII in clear)
- RLS least-privilege (member SELECT only, owner/admin/strategist mutations)
- Secrets via env (never inlined, never logged)
- CORS lockdown (no `*` origin)
- Constant-time compare for HMAC tokens / API keys
- Replay window ≤ 5 minutes on signed payloads
- Kill switch via env var: feature fail-closed when missing or set to false
- Idempotency key on every mutation
- DLQ (dead letter queue) for every async operation

## Section 5 — Cost guardrails (every paid-API consumer)

Any feature consuming Anthropic, Resend, Google Places, R2 storage, or any other metered API must:

- Document cost estimate per invocation in `00-objectives.md` (e.g. "Claude Haiku ~$0.0008/call, Resend ~$0.0001/email")
- Wire a counter into the admin panel: calls/day + $/day estimated (hard rule #11)
- Define a monthly budget cap + Resend email alert to operator when 80% reached
- Use KV cache when the payload is deterministic (TTL ≥ 1 hour)

## Section 6 — Multi-tenant isolation test (every new table)

Every new Supabase table requires a RLS isolation test that proves tenant A cannot read/write tenant B's rows. If the test does not exist, the migration does NOT merge.

Pattern:
1. Seed 2 tenants (A and B) with distinct rows
2. Authenticate as a member of tenant A
3. SELECT/INSERT/UPDATE/DELETE on tenant B rows: must return zero rows or raise RLS error
4. Repeat symmetrically as member of tenant B
5. Strategist role test: AiLys strategist can SELECT across tenants but NOT mutate
6. Service role test: full access (bypasses RLS, must only run in trusted edge fns)

## Section 7 — Dry-run mode (every cron / scheduled job / async automation)

Every cron job and scheduled automation must support `DRY_RUN=true` env var which:

- Logs what WOULD have been done (full payload, target IDs, planned mutations)
- Calls NO paid external API
- Sends NO email, SMS, GBP post, citation submission, push notification
- Returns the synthesized payload that would have been sent
- Passes the same smoke tests with `DRY_RUN=true` set

Lets the operator test in production safely before flipping the kill switch to live mode.

## Section 8 — Locale parity gate (every new user-facing string)

Hard rule #4 and #8 are passive. This gate is active. Every new i18n key:

1. Added to ALL 16 locale files (`en, fr, es, zh, ar, ru, de, it, pt, nl, pl, ja, ko, tr, vi, hi`) in the SAME commit
2. EN canonical value written
3. FR-CA value hand-written (project rule: no translation API, in-house bilingual)
4. The 14 secondary locales receive the EN value as placeholder, marked `// TODO i18n` inline
5. `node scripts/audit-translations-deep.mjs` exits 0 after the commit (key parity check)
6. The translation queue (`docs/i18n-translation-queue.md`) is updated with the new keys awaiting non-EN translation

Blocks the drift "we'll translate later" that never happens.

## Section 9 — STATE.md same-commit rule

No commit titled `feat:`, `fix:`, or `state:` merges unless STATE.md is updated in the SAME commit with:

- New commit hash referenced
- Smoke test pass count (e.g. "13/13 pass")
- User actions pending (env vars, migrations, edge fn deploys)
- Env vars required to flip from fail-closed to live
- Live curl proof (status code + sample response body)

Forces documentation to never lag behind code.

## Section 10 — No new dependencies without written justification

No new npm package added without a "Why this dep" section in `00-objectives.md` justifying why the existing stack does not suffice:

- `zod` for validation
- `pdf-lib` or `@react-pdf/renderer` for PDF
- `vitest` + `@testing-library/react` + `jsdom` for tests
- `@supabase/supabase-js` for DB
- Cloudflare Pages Functions native APIs (no `hono`, no `express` unless justified)
- KV + R2 + Durable Objects for state
- Anthropic SDK for Claude calls
- Resend SDK for email

Reduces attack surface, bundle size, supply chain risk.

## Section 11 — Time-box + escape hatch

Each sub-phase has an hour estimate in `02-sub-phases.md`. If execution exceeds 2× the estimate:

1. STOP. Do not merge a half-finished feature.
2. Return to user with the partial diff + a re-spec proposal.
3. User decides: split, descope, or carry over.

Prevents sub-phases that drag on and block the rest of the roadmap.

## Section 12 — Migration reversibility

Every migration `up` ships with a `down` that has been tested locally and restores pre-migration state without data loss. Exceptions allowed only when:

- The destructive change is intentional and documented in `04-rollback-plan.md`
- User has explicitly approved "no rollback path"

Otherwise: production risk is infinite.

## Section 13 — Definition of Done (binary checklist)

Sub-phase merged if and ONLY if every box is checked. Missing one = NOT MERGED.

- [ ] 5 GSD artefacts committed in `.planning/phase-<id>/`
- [ ] All CI gates 1-7 green on the deploy.yml run
- [ ] New smoke script wired into deploy.yml
- [ ] Live curl: 1 happy path + 3 failure modes verified
- [ ] Browser preview tested at 375x812 + 768x1024 (mobile-first hard rule #13)
- [ ] FR-CA locale switch verified in browser
- [ ] EN + FR-CA help center articles live
- [ ] Admin panel surface live (toggle, last-50 invocations, cost telemetry, per-tier gating)
- [ ] Multi-tenant RLS isolation test green (when new table added)
- [ ] Dry-run mode tested (when cron/automation added)
- [ ] Cost telemetry visible in admin (when paid-API consumer added)
- [ ] STATE.md updated in same commit with hash + smoke count + user actions
- [ ] No new dep added OR "Why this dep" section justifies it
- [ ] Migration `down` tested (when migration added)
- [ ] Time-box respected OR escape-hatch invoked with user approval
- [ ] User saw the proof (curl output paste, screenshot, count)

## How to invoke this skill

Three ways. Combine them for robustness across new sessions:

1. **Explicit slash command**: type `/iso-gsd-delivery` at session start.
2. **Auto-trigger keywords**: mention "Phase C", "Phase 11", "Phase 12", "new sub-phase", "ship feature", "ship cron", "ship endpoint", "new edge function" — the skill auto-loads via its description.
3. **Hard rule 14 fallback**: CLAUDE.md hard rule 14 binds every Phase C/11/12 sub-phase to this skill. Read on session start via STATE.md "START HERE".

## Reference

- CLAUDE.md hard rules 1-14 (read first every session)
- STATE.md (project state, read first every session)
- `docs/phase-c-automation-roadmap.md` (current Phase C scope)
- `.github/workflows/deploy.yml` (CI gates that enforce Section 2)
- `.planning/phase-<id>/` (per-sub-phase GSD artefacts)
