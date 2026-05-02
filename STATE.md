# AiLys Agency — Project State

> **🚨 IF WORKING ON PHASE C/11/12 OR ANY NEW FEATURE TOUCHING AUTH/DATA/CRON/ADMIN/HMAC/RLS:** invoke `/iso-gsd-delivery` BEFORE writing any code. The skill enforces GSD planning artefacts, ISO gates per commit, agent fidelity verification, gov-grade security, cost guardrails, multi-tenant isolation tests, DRY_RUN mode, locale parity, STATE.md same-commit, no-new-deps, time-box, migration reversibility, and a binary Definition of Done. CLAUDE.md hard rule #14 binds this. Skip = NOT MERGEABLE.

---

## 🚧 SESSION OPEN 2026-05-02 (autopilot post-close) — Supabase insert lib + STATE archive + htmlEscape lib

### Sub-phase 3 (commit 3/3 on PR #139): htmlEscape shared lib + Gate 27

Extracted 6 byte-identical copies of `escapeHtml` (all 5-char HTML entity
escaping with the same ordering) into `functions/lib/htmlEscape.ts`.
Shipped on the same PR #139 branch since the parallel session works
on a different branch (PR #125, `claude/infallible-maxwell-8c845a`)
in `src/` only, so the backend extraction has zero conflict surface.

**Files:**

| Path | Type |
|---|---|
| `functions/lib/htmlEscape.ts` | new lib (~50 LOC including JSDoc) |
| `scripts/smoke-html-escape.mjs` | new smoke (20 cases) |
| `.github/workflows/deploy.yml` | +Gate 27 |
| `functions/lib/serverError.ts` | -8 inline LOC, +1 import |
| `functions/lib/emailTemplate.ts` | -8 inline LOC, +1 import |
| `functions/api/audit-pdf.ts` | -8 inline LOC, +1 import |
| `functions/api/audit-pdf-onboarding.ts` | -8 inline LOC, +1 import |
| `functions/api/partner-application.ts` | -8 inline LOC, +1 import |
| `functions/api/founding-clients-apply.ts` | -8 inline LOC, +1 import |

Net LOC: ~6 × -7 inline = -42 LOC at call sites + new lib ~50 + new
smoke ~140 = +148 net. Worthwhile because:

1. The 6 copies could drift independently if someone edits one to
   add a new entity (e.g., backtick) without the others. One canonical
   helper + one smoke = uniform behavior across the surface.
2. Hardening upgrades vs. inline copies:
   - `null`/`undefined` tolerated (returns `""` instead of throwing).
   - Non-string coerced to string (`escapeHtml(count)` works without
     forcing every caller to `String()` first).
3. Smoke asserts the canonical contract (5 chars, ordering, XSS
   payload neutralization, double-escape NOT idempotent by design).

**Gates passed locally (after sub-phase 3):**

- Gate 1 typecheck: clean
- Gate 4 em-dash sweep (CI scope): 0 matches
- Gate 5 existing smokes: ALL 11 pass (rate-limit 18, system-health 39,
  server-error 34, supabase-insert 40, audit-pdf-validation 16,
  audit-pdf-render 9, audit-pdf-hmac 11, audit-pdf-onboarding 17,
  cron-guard 13, bundle-shape 9, bundle-load 1)
- Gate 7 build: green (14.99s)
- Gate 27 (NEW) smoke-html-escape: **20/20**

**Memories saved (for future sessions):**

- `feedback_eslint_hooks_audit.md`: 21 ESLint warnings can't be
  cleared blind in autopilot; needs browser preview + parallel-session
  ack before merge.
- `feedback_supabase_lib_adoption_scope.md`: don't force
  newsletter-subscribe / resend-webhook / cron PATCH calls into
  supabaseInsert lib (premature abstraction).

### Sub-phase 2 (commit 2/3 on PR #139): STATE.md archive

STATE.md grew past 256KB which broke the Read tool limit. Moved 25
historical session-close blocks (~3748 lines) from STATE.md to
`docs/state-archive-2026-04-to-05.md`. STATE.md size: 269KB -> 68KB.

### Sub-phase 1 (commit 1/3 on PR #139): supabase insert lib



GSD-driven sub-phase to extract the duplicated `forwardToSupabase`
helper across three lead-capture endpoints (`partner-application`,
`founding-clients-apply`, `cofounders-apply`) into a single shared
`functions/lib/supabaseInsert.ts`. Pure-engineering refactor with
zero user-facing behavior change, zero new translations, zero
template-touching, zero conflict surface with the parallel session
working on website templates + admin UI.

**Why this work now:** STATE.md outstanding item #5 ("Audit log shared
lib extraction"). The duplicated pattern at three call sites was
identical to 95%, slated to grow to 4-5 sites with Phase F4 follow-up
form + Phase F3.1 White-Label portal. Extracting before more copies
land prevents drift and centralizes secret-leak hardening (the
previous inline helpers each had their own `console.warn(text.slice(0,
300))` that could leak the SUPABASE_SERVICE_ROLE_KEY if Supabase
echoed it in a 4xx response body).

**Files:**

| Path | Type | Lines |
|---|---|---|
| `.planning/phase-supabase-insert-lib/00-objectives.md` | new (GSD) | ~80 |
| `.planning/phase-supabase-insert-lib/01-threat-model.md` | new (GSD) | ~95 |
| `.planning/phase-supabase-insert-lib/02-sub-phases.md` | new (GSD) | ~85 |
| `.planning/phase-supabase-insert-lib/03-test-matrix.md` | new (GSD) | ~50 |
| `.planning/phase-supabase-insert-lib/04-rollback-plan.md` | new (GSD) | ~60 |
| `functions/lib/supabaseInsert.ts` | new lib | ~165 |
| `scripts/smoke-supabase-insert.mjs` | new smoke (40 cases, 20 internal) | ~340 |
| `functions/api/partner-application.ts` | refactor (-37, +14) | net -23 |
| `functions/api/founding-clients-apply.ts` | refactor (-50, +21) | net -29 |
| `functions/api/cofounders-apply.ts` | refactor (-43, +17) | net -26 |
| `.github/workflows/deploy.yml` | +Gate 26 | +10 |
| `functions/api/audit-ai-visibility-instant.ts` | em-dash fix | +1/-1 |
| `functions/api/cron-day1-retry.ts` | em-dash fix | +1/-1 |

**Gates passed locally:**

- Gate 1 typecheck: clean
- Gate 2 audit-translations-deep: 0 missing across 15 non-EN locales
- Gate 3 audit-blog-translations: 59/59 posts pass
- Gate 4 em-dash sweep (CI scope): 0 matches outside chat-advisor exception
- Gate 5 existing smokes:
  - smoke-rate-limit: 18/18
  - smoke-system-health: 39/39
  - smoke-server-error: 34/34
  - smoke-audit-pdf-validation: 16/16
  - smoke-audit-pdf-render: 9/9
  - smoke-audit-pdf-hmac: 11/11
  - smoke-audit-pdf-onboarding: 17/17
  - smoke-cron-guard: 13/13
  - smoke-bundle-shape: 9/9
  - smoke-bundle-load: 1/1
- Gate 7 build: green (22.29s, no bundle bloat)
- Gate 26 (NEW) smoke-supabase-insert: 40/40 (15 contract cases + 5 extra
  + 20 internal helper cases)

**Behavioral parity preserved:**

- Same fail-open semantics on missing SUPABASE_URL or
  SUPABASE_SERVICE_ROLE_KEY (logs payload to console, returns ok:true).
  Reason: AiLys Supabase project not yet provisioned (operator action
  pending #4 from prior session); forms must continue feeling
  successful to the user; ops pulls leads from Workers logs until the
  table is ready.
- Same 409 ignore-duplicates handling on partner-application
  (idempotent re-submission of the same agency).
- Same `Prefer: return=minimal` baseline on all three call sites.
- Same `{ ok, error? }` return shape at all three call sites.
- Wrapping function name (`forwardToSupabase`) preserved for in-file
  readability; only the body changed.

**Hardening upgrade (defense in depth):**

- SERVICE_ROLE_KEY redaction in any error-message text. Previously,
  inline helpers logged `text.slice(0, 300)` directly via console.warn,
  which would leak the key to Workers logs if Supabase echoed the
  apikey in a 4xx body. The shared lib runs every error-message string
  through `redact(input, secret)` which substitutes `[REDACTED]` for
  any direct match AND for the first 16 chars of the JWT prefix.
  Asserted by smoke C11 (3 sub-assertions: no full key, no JWT prefix,
  marker present).
- Error message bounded to ≤ 256 chars. Previously, a 4xx body
  containing `text.slice(0, 300)` could be appended to the error
  string with no ceiling on the wrapped Error message. The shared lib
  enforces a 256-char cap with ellipsis. Asserted by smoke C12.
- Row argument immutability: lib does NOT mutate the caller's row
  object. Asserted by smoke C14.

**Pre-existing em-dash fixes (out-of-band cleanup):**

Two em-dashes were lurking in `functions/api/audit-ai-visibility-
instant.ts:356` and `cron-day1-retry.ts:201` from the prior night
session. The deploy.yml Gate 4 strict regex would have failed on them
when this PR's diff lands. Fixed inline (replaced with periods) to
unblock the merge. These were code comments, no user-visible impact.

**No new operator actions:**

This is a refactor. The same env vars (SUPABASE_URL,
SUPABASE_SERVICE_ROLE_KEY) are required by the same code paths.
Operator actions from the prior session (KV bindings, OPERATOR_NOTIFY_
EMAIL, AiLys Supabase provisioning, Wikidata Q-number) carry over
unchanged.

**Outstanding next session (unchanged from prior close):**

1. F3.1+ White-Label real build (gated on F3.0 demand validation)
2. Reviuzy F1.1 / F5.2 (cross-repo)
3. Industry partial-i18n for remaining 4 verticals (after Tuesday)
4. Help article translations to ES/ZH/AR/RU (after Tuesday)
5. /admin/system-health UI page (still deferred for parallel session)
6. react-refresh + react-hooks/exhaustive-deps 21 warnings audit
   (deferred: requires browser validation per Hard Rule #1; high
   regression risk on hooks like AuthProvider/ThemeProvider/LangContext
   that the parallel session may also touch)

**Bonus: STATE.md archive.** This sub-phase also archived 25 historical
session-close blocks (2026-04-27 → 2026-05-02 autopilot extended-extended,
~3748 lines) from STATE.md to `docs/state-archive-2026-04-to-05.md`.
STATE.md size: 269KB -> 68KB. Reason: 269KB exceeded the Read tool's
256KB limit, breaking the CLAUDE.md "START HERE: read STATE.md" flow
for any future session. Archive cross-linked from STATE.md head.

---

## 🏁 SESSION CLOSE 2026-05-02 (autopilot extended-night) — 32 PRs total, 12 engineering PRs, 100% serverError adoption across 8 endpoints + 2 crons

Continued the night-session engineering work past the 27-PR close with
5 more PRs wiring the shared `serverError` capture lib into all
remaining candidate endpoints. Lib adoption is now COMPLETE — every
endpoint and cron job that can fail captures structured errors into
Supabase audit_log + fires Resend alerts on ERROR/FATAL severity.

**5 more engineering PRs after the 27-PR close (#133-#137):**

| PR | Endpoint | Severity | Capture points |
|---|---|---|---|
| #134 | audit-pdf | ERROR | render failure + R2 storage put failure |
| #135 | chat-advisor | ERROR/WARN | Gemini network + non-2xx (5xx=ERROR, 4xx=WARN) + parse failure |
| #136 | cron-process-sequences + cron-day1-retry | WARN | per-enrollment failure + per-replay failure |
| #137 | audit-ai-visibility-instant | WARN | aggregate Gemini fallback path |

**100% serverError adoption (8/8 candidate endpoints + 2 crons):**

| Endpoint | Adopted in PR | Severity policy |
|---|---|---|
| partner-application | #131 | ERROR (dual-delivery failure) |
| founding-clients-apply | #132 | ERROR (dual-delivery failure) |
| newsletter-subscribe | #132 | WARN (welcome-email best-effort) |
| audit-pdf | #134 | ERROR (render + R2 paths) |
| chat-advisor | #135 | ERROR + WARN (3 Gemini paths) |
| cron-process-sequences | #136 | WARN (per-enrollment) |
| cron-day1-retry | #136 | WARN (per-replay) |
| audit-ai-visibility-instant | #137 | WARN (aggregate) |

Severity policy summary (consistent across all endpoints):
- **ERROR/FATAL** = pages operator via Resend alert immediately. Used
  for incidents where the user gets nothing usable (dual-delivery
  failure, render failure, R2 storage failure, Gemini 5xx outage).
- **WARN** = logs to audit_log only, no page. Used for transient or
  graceful-fallback failures (welcome email, cron per-iteration,
  Gemini 4xx like rate-limit, fallback-content paths). Trend analysis
  via SQL queries against audit_log.

**Operator visibility upgrade (cumulative):**
- Before this session: 0 endpoints with structured error capture
- After this session: 8/8 endpoints + 2/2 crons with full coverage
- Single SQL query against audit_log can surface trends:

      SELECT endpoint, severity, COUNT(*) AS n
      FROM audit_log
      WHERE ts > NOW() - INTERVAL '1 day'
      GROUP BY endpoint, severity
      ORDER BY n DESC;

- Resend alert email includes build commit (CF_PAGES_COMMIT_SHA)
  so operator can immediately tell which deploy is erroring.
- Zero secret values in alert/audit rows — PII safety contract
  enforced by smoke (3 explicit assertions in Gate 25).

**Outstanding next session:**

1. **F3.1+ White-Label real build** — gated on F3.0 demand validation
2. **Reviuzy F1.1 / F5.2** (cross-repo)
3. **Industry partial-i18n for remaining 4 verticals** — DEFERRED to
   after Tuesday 2026-05-05 1pm Eastern (token quota; see
   REMINDER-TUESDAY-1PM.md at repo root)
4. **Help article translations to ES/ZH/AR/RU** — DEFERRED, same reason
5. **Audit log shared lib extraction** (different pattern from
   serverError; common audit-log pattern across endpoints not yet
   unified — out of scope this session)
6. **/admin/system-health UI page** — render the JSON nicely (was
   deferred to avoid conflict with parallel session admin work)
7. **react-refresh + react-hooks/exhaustive-deps** 21 warnings audit

---

## 🏁 SESSION CLOSE 2026-05-02 (autopilot night session) — 27 PRs, 6 tags, 3 shared security/ops libs + 3 new CI Gates + parallel-session-safe engineering

User signaled "no more translations or content this week, only EN/FR
or pure engineering" partway through (token-quota constraint). Pivoted
from content/translation work to pure security + ops infrastructure.

**7 engineering PRs added on top of the 19-PR multi-locale + content
session that closed earlier in the day:**

| PR | Type | Lines added |
|---|---|---|
| #126 | feat: shared rate-limit lib `functions/lib/rateLimit.ts` + KV-backed token bucket on /api/partner-application + Gate 23 | ~400 |
| #127 | feat: wire shared rate-limit into /api/newsletter-subscribe + /api/founding-clients-apply | ~85 |
| #128 | feat: `/api/system-health` public ops endpoint + Gate 24 (zero-leak smoke with 3 explicit assertions that secret values never appear in response body) | ~400 |
| #129 | feat: cron heartbeat tracking in `withCronGuard` + system-health exposure (last_run_at, last_success_at, duration, items, errors per cron) | ~140 |
| #130 | feat: shared server-error capture lib `functions/lib/serverError.ts` + Gate 25 (Sentry-lite for edge fns: dual-channel Supabase audit_log persist + Resend operator alert on ERROR/FATAL severity, fail-soft) | ~540 |
| #131 | feat: wire serverError into /api/partner-application dual-delivery failure path | ~25 |
| #132 | feat: wire serverError into /api/founding-clients-apply (ERROR severity) + /api/newsletter-subscribe welcome-email failure (WARN severity) | ~45 |

**3 new shared libs created:**
1. `functions/lib/rateLimit.ts` — KV-backed token bucket, IP hourly + identity daily windows, fail-open with audit-log on missing KV. 18-case smoke. 3 endpoints adopted (partner-application, newsletter-subscribe, founding-clients-apply).
2. `functions/lib/serverError.ts` — Sentry-lite for Workers. captureServerError() dual-channel delivery, severity-based alert gating (warn/error/fatal), PII safety (hashes only, never plaintext IP/email/key), fail-soft (NEVER throws). 34-case smoke. 3 endpoints adopted.
3. `functions/lib/cronGuard.ts` extended — added writeCronHeartbeat + readCronHeartbeat helpers. Auto-fires on every cron run via existing `withCronGuard` wrapper (no per-cron integration needed). 30-day TTL.

**3 new CI Gates (now 22 → 25 total):**
- Gate 23: smoke-rate-limit (18 cases)
- Gate 24: smoke-system-health (39 cases including 3 zero-leak guarantees)
- Gate 25: smoke-server-error (34 cases including 1 PII-safety + 3 fail-soft)

**1 new public ops endpoint:**
`/api/system-health` — uptime monitor surface, returns kill-switch states, KV binding presence, secret presence-only booleans, build version, cron heartbeats. Zero secret values ever in response body (3 explicit smoke assertions enforce this contract).

**Operator visibility upgrade:**
- Before: silent failures + console.error in Workers logs only
- After: every error path either logs to audit_log (WARN, trend analysis) or pages via Resend (ERROR/FATAL, immediate triage). Operator dashboards can poll system-health every 60s for kill-switch + KV-binding + cron-freshness state.

**Operator actions pending (not blocking; all libs fail-open/fail-soft):**
1. Bind KV namespaces in Cloudflare Pages → Functions → KV bindings:
   - `PARTNER_APPLICATIONS_RATE_LIMIT`
   - `NEWSLETTER_RATE_LIMIT`
   - `FOUNDING_CLIENTS_RATE_LIMIT`
   - `AUDIT_PDF_RATE_LIMIT` (already used by existing audit-pdf, also stores cron heartbeats — single shared KV is fine)
   Until bound, rate-limit fails open + cron heartbeats are not persisted.
2. Set `OPERATOR_NOTIFY_EMAIL` env var. Until set, ERROR/FATAL alerts log to console only.
3. Set `CF_PAGES_COMMIT_SHA` env var (Cloudflare Pages does this automatically). Used in alert emails.
4. Provision AiLys Supabase project + apply migrations (priority #6). Until provisioned, audit_log persistence is a no-op.
5. Wikidata Q-number registration (external action, deferred).

**Outstanding next session:**
1. **F3.1+ White-Label real build** — gated on F3.0 demand validation
2. **Reviuzy F1.1 / F5.2** (cross-repo)
3. **Industry partial-i18n for remaining 4 verticals** (after Tuesday 1pm per token quota)
4. **Help article translations to ES/ZH/AR/RU** (after Tuesday 1pm)
5. **Wire serverError into remaining endpoints** (audit-pdf, audit-request, chat-advisor, cron-process-sequences, cron-day1-retry) — mechanical adoption, ~25 lines each
6. **/admin/system-health UI page** — render the JSON nicely (was deferred to avoid conflict with parallel session admin work)
7. **Audit log shared lib** extraction (similar to serverError; common pattern across endpoints not yet unified)

---

## ⏰ DEFERRED TO TUESDAY 1PM (token-quota constraint, 2026-05-02)

The following content + translation work was deferred mid-session when
the user signaled a weekly token quota was approaching the limit. Work
resumes after Tuesday 1pm. Pickup checklist for the next session:

### Translations (priority order)

1. **Phase 1 industry partial-i18n for remaining 4 verticals**
   - Already done in PRs #121-#123 (this session): dentists, lawyers,
     restaurants in ES + ZH + AR + RU partial (hero + stats + topQueries
     + painPoints + CTAs + SEO meta).
   - **Remaining:** contractors, clinics, real-estate, hotels — each needs
     ES + ZH + AR + RU partial overrides via `i18n: { es: {...}, zh:
     {...}, ar: {...}, ru: {...} }` field on the Industry object.
   - Pattern reference: see `src/data/industries.ts` `dentists.i18n`
     block (lines ~423-540) for the field shape.
   - Estimated: ~50 strings × 4 langs × 4 verticals = ~800 strings.
   - Methodology + sample citations + FAQ stay EN fallback (out of
     scope per the partial-coverage convention).

2. **Help article translations**
   - Already done in PRs #105+ (FR-CA full coverage on 9+ help articles
     including F3.0 `partner-program-overview` and `how-to-apply-as-a-
     partner-agency`).
   - **Remaining:** ES + ZH + AR + RU translations of:
     - `partner-program-overview`
     - `how-to-apply-as-a-partner-agency`
     - `ailys-verified-badge-overview`
     - `ailys-verified-badge-embed-howto`
     - `ailys-verified-badge-verification-process`
     - `ailys-industry-reports-overview`
     - `ailys-concierge-overview`
     - `ailys-concierge-privacy-deep-dive`
     - `tech-health-pack-explained`
     - `gsc-indexation-audit-explained`
     - `wikidata-q-number-explained`
   - Pattern: add `i18n.es`, `i18n.zh`, `i18n.ar`, `i18n.ru` blocks with
     `title`, `excerpt`, `body` fields to each article in
     `src/data/help-articles.ts`.
   - Estimated: ~600 words × 4 langs × 11 articles = ~26,000 words of
     translation work. Substantial. Plan a dedicated session.

3. **Cookie banner + newsletter signup full 16-locale i18n** refactor
   - Currently EN/FR binary toggle via `T(en, fr)` helper inline.
   - **Remaining:** refactor to use global `t.cookieBanner.*` from i18n
     translations, then add 16-locale strings in `src/i18n/translations/
     *.ts` (EN + FR-CA full + 14 secondary EN-placeholder).

### Content (no translation, EN+FR only ok if undertaken before Tuesday)

4. **Industry pages additional verticals** (from parallel session screenshot)
   - Round 2 mention: nail salons, sushi comptoir
   - These require new entries in `src/data/industries.ts` AND new
     entries in industries blog-post categories
   - Cross-reference with parallel session before starting to avoid
     conflicts

5. **Glossary terms refactor**
   - Current `src/data/glossary.ts` has hardcoded `shortEn/shortFr/
     longEn/longFr` fields (binary).
   - **Remaining:** refactor to `i18n: Partial<Record<lang, ...>>`
     pattern matching industries, then add 5 majors translations for
     20+ glossary terms (~100 strings × 4 langs = 400).

### Reminder created (programmatic schedule)

Per user request 2026-05-02, a scheduled reminder is queued for
Tuesday 2026-05-05 at 13:00 (1pm). When that fires, the next Claude
session should:
1. Read this STATE.md "DEFERRED TO TUESDAY 1PM" section first
2. Resume content + translation work in priority order (1 → 5)
3. Cross-reference parallel-session changes before starting any
   industries/help-article work to avoid merge conflicts

---


> **📚 OLDER SESSION-CLOSE ENTRIES ARCHIVED.** Historical session-close
> blocks from 2026-04-27 through 2026-05-02 (autopilot extended-extended)
> moved to [docs/state-archive-2026-04-to-05.md](docs/state-archive-2026-04-to-05.md)
> on 2026-05-02 to keep STATE.md under the 256KB Read limit (was 269KB, now ~58KB).
> Archive contains 25 session-close blocks; consult it when researching
> historical decisions, prior session pickup checklists, or older operator
> action queues. Phase-shipped milestones (Phase 4.5+, lint debt, etc.) and
> reference sections (USER ACTIONS PENDING, what's shipped, i18n status,
> tools list, pickup checklist) remain inline below.

---

## ✅ PHASE 4.5 STATUS, SHIPPED 2026-04-27 night

All 10 sub-phases delivered on `claude/determined-agnesi-e1a262` (commits 2d0e729 → a5016cd):

| Sub-phase | Commit  | Deliverable                                                              |
|-----------|---------|--------------------------------------------------------------------------|
| 4.5.1     | 2d0e729 | Scrubbed 224 em-dashes from 16 i18n translation files                    |
| 4.5.2     | 88455cf | Vitest + RTL + jsdom + 35 tests + featureCatalog lib + CI workflow       |
| 4.5.3     | 262355b | client_type/ailys_tier columns + is_ailys_strategist + provision-ailys-tenant edge fn |
| 4.5.4     | 4166a09 | resolveBrandFromHostname + BrandProvider + BrandRedirectGuard            |
| 4.5.5     | 32f4a28 | custom_access_token_hook (brand claim) + brandGuard.ts edge helper       |
| 4.5.6     | 43225f0 | brandConfig.ts (Stripe descriptor + Resend From per brand)               |
| 4.5.7     | 4c68c38 | tenant_history audit table + journaling trigger + RLS                    |
| 4.5.8     | 5509717 | Centralized TIER_QUOTAS_REVIUZY + TIER_QUOTAS_AILYS in featureCatalog    |
| 4.5.9-10  | a5016cd | Operator checklist `docs/phase-4-5-ops.md` (DNS, Pages, Resend, hooks)   |

**Test totals:** 85 unit tests pass, 17 it.todo specs scaffold deeper integration tests
to be activated as upstream features land. Typecheck clean, build green at every commit.

## ✅ PHASE 4.5 FOLLOW-UP, SHIPPED 2026-04-28 (admin + help docs)

| Commit  | Deliverable                                                                  |
|---------|------------------------------------------------------------------------------|
| cf3b423 | TenantHistoryDialog admin surface + Client Type/AiLys Tier badges in SuperAdmin Tenants tab + admin-pricing edge fn extended (get_tenant_history) |
| 6386ffe | 2 help articles in ailysagency repo: `ailys-managed-accounts` + `account-history-and-your-data` (EN + FR-CA) |

CLAUDE.md hard rules #10 (help docs) and #11 (admin center) satisfied for the
client_type discriminator and tenant_history audit.

## ✅ PHASE 5 SHIPPED 2026-04-28

Sprint 1 from STATE.md "Recommended sequence after 4.5" partially delivered:
tier gating UI + multi-domain. Branding switch was already covered by Phase 4.5.4.

| Sub-phase | Commit  | Deliverable                                                          |
|-----------|---------|----------------------------------------------------------------------|
| 5.A       | e22fd07 | <FeatureGate feature="x"> component + 8 RTL tests (replaces scattered `if (tier === 'pro')` checks; usePricing-driven, featureCatalog-backed) |
| 5.B (1/2) | 658172c | tenant_domains DB schema + RLS + DB normalize trigger + frontend lib (normalizeDomain, isValidDomain, canAddDomain, countAdditional) + 18 tests |
| 5.B (2/2) | 98acbc1 | useTenantDomains hook + TenantDomainsPanel admin UI wired into Settings/Organization (add, remove, set primary, tier-quota gated) |

**Test totals after Phase 5:** 116 unit tests pass.

## ✅ PHASE 6 SHIPPED 2026-04-28 (photo flow complete)

| Sub-phase | Commit  | Deliverable |
|-----------|---------|-------------|
| 6.A | 20dc327 | photoQuota lib (monthly ceiling per tier, multi-domain Agency scaling, NO_MONTHLY_LIMIT for self-serve) + 18 tests |
| 6.B | 5630248 | gbp_photo_uploads ledger + gbp_photo_drafts QA queue migration + RLS |
| 6.C | b71953e | photoCaption shared helper (Claude Haiku 4.5 vision, returns 10-25 word caption + 100-char alt-text) |
| 6.D | 613c53b | google-upload-photo edge fn enforces monthly quota + AiLys QA enqueue path |
| 6.E | 2b9a265 | /gbp/photos/queue page (strategist Approve/Reject) + usePhotoDrafts hook |
| 6.F | e948e50 (ailysagency) | Help doc how-photo-uploads-work (EN+FR-CA) |

## ✅ PHASE 7 SHIPPED 2026-04-28 (Reddit signal monitoring, passive only)

| Sub-phase | Commit  | Deliverable |
|-----------|---------|-------------|
| 7.A | 2e999ef | redditMentions lib (recency buckets, summary, needsReplyAttention) + 11 tests |
| 7.B | bed5953 | reddit_subreddit_targets + reddit_mentions tables + RLS |
| 7.C | 7cb215a | reddit-poll edge fn (OAuth client_credentials, /r/<sub>/search.json, sentiment classification via Claude Haiku) |
| 7.D | d637f4d | /reddit-monitor admin page + useRedditMonitor hook (targets CRUD, poll trigger, attention surface) |
| 7.E | 3ce91df (ailysagency) | Help doc reddit-signal-monitoring with hard scope: passive monitoring only, no posting on client behalf |

## ✅ PHASE 8 SHIPPED 2026-04-28 (white-label PDF reports)

| Sub-phase | Commit  | Deliverable |
|-----------|---------|-------------|
| 8.A | d8389b9 | tenants.logo_url + brand_name + report_custom_domain + report_brand_color (hex CHECK) + executive-reports storage bucket with tenant-folder RLS |
| 8.B+8.C | b91dff3 | @react-pdf/renderer added; reportBranding lib (resolveReportBranding fallbacks: brand_name->name, footer->reviuzy.com or ailysagency.ca, color->neutral gray) + 7 tests; ExecutiveReportPDF Document component (header+4 cards+4 sections+page-number footer) |
| 8.D | 7e775c2 | /executive-report viewer page (lazy-loaded keeping main bundle at 894kB gzip; PDF chunk 493kB on demand) with PDFDownloadLink for one-click branded download |
| 8.E | 9bccc7b (ailysagency) | Help doc white-label-executive-pdf-reports (Agency-only, why client-side PDF, six fixed sections explained) |

## ✅ PHASE 9 SHIPPED 2026-04-28 (public API for Agency clients)

| Sub-phase | Commit  | Deliverable |
|-----------|---------|-------------|
| 9.A | 361b289 | apiKey lib (generateApiKey rvz_+48 url-safe chars, isValidApiKeyFormat, apiKeyPrefix, maskApiKey) + 14 tests |
| 9.B | 402a2b6 | api_keys (hash-only, partial-active prefix index) + api_request_log (audit + sliding-window source) + RLS |
| 9.C | 25deb24 | public-api edge fn: 3 read endpoints (visibility/share-of-model, traffic/summary, citations/status), Bearer auth, SHA-256 hash compare, 1000 req/hour sliding-window rate limit, scope check, audit log every outcome (200/400/401/403/404/429), IP hashed |
| 9.D | 0f679cf | /api-keys admin page + useApiKeys hook (Generate dialog reveals raw key once, Revoke permanent, last 50 invocations table with status badges) |
| 9.E | b7719c9 (ailysagency) | Help doc api-access-for-agency-tier with full endpoint examples + scope/rate-limit/revocation reference |

**Test totals after Phase 9:** 165 unit tests pass, 17 it.todo specs.

## ✅ PHASE 10 SHIPPED 2026-04-28 (crisis early warning)

| Sub-phase | Commit  | Deliverable |
|-----------|---------|-------------|
| 10.A | 6097638 | anomalyDetection lib (4 threshold rules: negative_sentiment_spike, visibility_drop, citation_churn, review_bomb) + 16 tests |
| 10.B | 6097638 | alerts table + UNIQUE (tenant_id, kind, fingerprint) dedup + RLS (members read, owner/admin/strategist UPDATE-dismiss only) |
| 10.C | 6097638 | detect-anomalies edge fn (pulls 24h/7d/30d windows from reddit_mentions/ai_visibility_runs/citation_submissions/reviews; upserts alerts; sends Resend email on critical with brand-aware From) |
| 10.D | 6097638 | /alerts AlertsCenter page (Run detection button, summary cards, open/dismissed lists, dismiss-with-reason dialog) |
| 10.E | d4105ad (ailysagency) | Help doc crisis-early-warning-alerts (EN+FR-CA) |

**Test totals after Phase 10:** 181 unit tests pass.

## ✅ LINT DEBT FULLY CLEARED 2026-04-28 (Option C — hand-fix all)

**Final state:** `npm run lint` exits 0 (was 469 problems / 420 errors / 49 warnings).
**Commits on `claude/heuristic-saha-53f443`** (pushed, ready to PR):
- `e2bb182` Batch 1: 35 trivial rule fixes (no-empty, no-useless-escape, prefer-const, no-misleading-character-class, no-unused-expressions, no-empty-object-type, no-control-regex, no-case-declarations, no-constant-binary-expression real bug fix in google-exchange, no-require-imports). Semantic-preserving.
- `890970e` Batch 2: react-refresh/only-export-components 12 warnings. eslint config override for `src/components/ui/**` (shadcn convention) + 5 inline disables for context/provider hook colocation.
- `7d7880e` Batch 3: react-hooks/exhaustive-deps 37 warnings. Conservative eslint-disable-next-line per site with specific reason (closes-over-tenant-id-only, mount-only, forward-reference, etc.). One real fix: SpinningWheel.tsx campaignName added to deps.
- `eb08995` Batch 4: 121 no-explicit-any in `supabase/functions/**` (38 edge fn files). Specific interfaces, Record<string, unknown>, unknown + narrowing, SupabaseAdminClient = ReturnType<typeof createClient>.
- `69d07f8` Batch 5: 43 no-explicit-any in `src/hooks` + `src/providers` (16 files). SmartOnboardingState, ScrapedData, OnboardingProgress, AIEngineMessage typed; TablesInsert<…> generated types.
- `afe6bf3` Batch 6+7: 217 no-explicit-any in `src/components/**` (72) + `src/pages/**` (145). Two parallel agents, verified independently. Specific interfaces (GoogleExchangeData, SyncLocationsData, OauthCallbackResult, FacebookExchangeData, ThreadsExchangeData, DraftMetadata, etc.). LucideIcon for icon props. catch (err: unknown) + instanceof Error narrowing across ~50 sites.

**Zero `as any`. Zero `@ts-ignore`. Zero `@ts-expect-error`. Zero `eslint-disable` for no-explicit-any.** Pure type strictness increase.

**Verified at every commit:** 181/181 unit tests pass, `npx tsc --noEmit` exits 0, `npm run build` green.

---

## ✅ PHASE 11 IN PROGRESS 2026-04-28 (Schema deployment automation, GOD MODE technical moat)

Sub-phases shipped on `claude/heuristic-saha-53f443` (PR #3):

| Sub-phase | Commit  | Deliverable |
|-----------|---------|-------------|
| 11.1 (lib) | 663e5b0 | `src/lib/schemaAudit.ts` - extractJsonLdBlocks, detectMicrodata, detectRdfa, entityTypesFromJsonLd, computeMissingTypes, auditHtml + 26 tests (multi-block, malformed JSON, case-insensitive script tag, LocalBusiness subtypes, @graph traversal, RDFa+microdata flag isolation) |
| 11.2 (lib) | 663e5b0 | `src/lib/schemaGenerator.ts` - generateLocalBusiness (industry-aware subtype: Restaurant, Dentist, HairSalon...), generateOrganization, generateFaqPage, generateService, generatePerson, generateBreadcrumbList, generateAllSchemaBlocks aggregator, jsonLdToScriptTag + 28 tests |
| 11.B (DB) | de20d80 | Migration `20260428150000_create_schema_audits.sql` - schema_audits table (status enum, found_types[], missing_types[], microdata_present, rdfa_present, findings JSONB summary only), 2 indexes, RLS (members + AiLys strategists SELECT, INSERT via service role only, append-only) |
| 11.C (edge) | de20d80 + ce940ab | `supabase/functions/schema-audit/index.ts` - POST {tenantId, url}, 10s timeout, 5MB stream-based content cap with reader.cancel() on overflow, SSRF guard rejects private/loopback IPs, parallelized auth+rate-limit Promise.all, fail-closed on rate-limit query error, 30 audits/hr/tenant rate limit |
| 11.D (UI) | 21d8062 | `src/hooks/useSchemaAudits.ts` (React Query list+run mutation, narrow select to non-JSONB cols), `src/pages/SchemaAudit.tsx` `/schema` route - URL input + Run button, latest audit summary card with type pills, suggested JSON-LD generator (uses lib client-side via useSeoProfile), audit history table, copy-all clipboard |

**Test totals after Phase 11.A-D:** 235 unit tests pass (181 baseline + 54 new schema lib tests).

**Phase 11 sub-phases REMAINING (next session):**
- 11.3 WordPress integration (REST API push, ~8h)
- 11.4 Wix integration (Velo API, ~8h)
- 11.5 Webflow integration (CMS API, ~6h)
- 11.6 Shopify integration (Storefront API + metafields, ~6h)
- 11.7 Headless / generic webhook fallback (~4h)
- 11.8 Strategist QA before push (~4h)
- 11.10 E2E + integration tests (~3h)

**Operator action items (cumulative):**
- Apply migration `20260428150000_create_schema_audits.sql` via Supabase SQL Editor
- Deploy edge function: `npx supabase functions deploy schema-audit --project-ref qucxhksrpqunlyjjvuae`

---

## PHASE 12 IN PROGRESS 2026-04-28 (Client visibility dashboard, PR #5 open)

Phase 12 ships `/dashboard/visibility`: client-facing two-card dashboard with Google Search Console keyword ranking evolution and 6-engine LLM citation summary. Tier-gated quotas + PDF export extension.

| Sub-phase | Commit | Deliverable |
|-----------|--------|-------------|
| 12.C+12.D | 5750608 | Migrations: keyword_rankings + llm_citation_snapshots, both with member+strategist RLS, append-only via service role. GSD planning artifacts in .planning/phase-12/ |
| 12.A.1 | 29b4874 | google-connect-init: webmasters.readonly scope. Migration adds gsc_property_url to google_accounts |
| 12.A.2 (1/2) | 885abce | gsc-list-properties edge fn (parallelized auth, refresh-on-demand, returns properties with permission level) |
| 12.A.2 (2/2) | 56e9cf6 | GscPropertyPicker.tsx component, wired into Settings > Organization. types.ts gains gsc_property_url on google_accounts |
| 12.B | f2ed854 | gscSync lib (TDD, 31 tests) covering normalization, clamps, defaultSyncWindow with 2-day GSC delay. gsc-sync-rankings edge fn with idempotent upsert ON CONFLICT |
| 12.D.2 | af40053 | llmCitationSnapshot lib (TDD, 26 tests) reduces ai_visibility_runs to denormalized snapshots, hashes query via Web Crypto. llm-snapshot-rebuild edge fn |
| 12.G | c868562 | featureCatalog: VISIBILITY_QUOTAS_REVIUZY/AILYS, resolveVisibilityQuota (AiLys tier wins when both present), hard ceiling 500 keywords (14 tests) |
| 12.E.1 | d2ff84e | useVisibilityDashboard hook: parallel rankings + citations queries, syncRankings + rebuildSnapshots mutations. Pure derive helpers: deriveKeywordSeries, deriveEngineSummaries, uniqueKeywords (11 tests) |
| 12.E.2 | 0370a91 | /dashboard/visibility page: tier banner, Recharts line chart with reversed Y axis, 6-engine citation grid with trend arrows |
| 12.F | 6729ec5 | ExecutiveReportPDF gains optional VisibilityReportSection (top keywords by impressions + 6-engine LLM summary). visibilityReportBuilder lib (8 tests) |
| Admin | debb494 | Visibility nav entry in ExpandableNavbar (CLAUDE.md hard rule #11) |

**Test totals after Phase 12 Wave 1-4.2:** 235 (post Phase 11) -> 325 unit tests pass (90 new).

**Phase 12 sub-phases REMAINING (next session):**
- 12.I integration tests + RLS isolation tests (cannot read other tenant's keyword_rankings/llm_citation_snapshots, ~4h)
- /admin/visibility-debug strategist view (~2h)
- 12.J SerpAPI gap analysis for keywords client does not yet rank for (~8h, deferred)

**Operator action items (Phase 12, post-merge):**
1. Apply 3 migrations via Supabase SQL Editor:
   - `20260428160000_create_keyword_rankings.sql`
   - `20260428170000_create_llm_citation_snapshots.sql`
   - `20260428180000_add_gsc_property_url.sql`
2. Deploy 4 edge fns:
   ```
   npx supabase functions deploy google-connect-init --project-ref qucxhksrpqunlyjjvuae
   npx supabase functions deploy gsc-list-properties --project-ref qucxhksrpqunlyjjvuae
   npx supabase functions deploy gsc-sync-rankings --project-ref qucxhksrpqunlyjjvuae
   npx supabase functions deploy llm-snapshot-rebuild --project-ref qucxhksrpqunlyjjvuae
   ```
3. Reconnect Google in Settings > Organization to grant `webmasters.readonly` scope (existing connections lack it).
4. Pick GSC property per tenant via the new picker UI.
5. Run "Sync rankings" once to backfill, then daily sync handles it.

---

## LINT DEBT (HISTORICAL, fully cleared, kept for context)

Original audit on 2026-04-28: **416 errors across 148 files**, all
pre-existing legacy code (NOT introduced by Phase 4.5-10 work). Files added
this session pass lint with 0 errors / 1 ignorable warning.

### Categories

| Rule | Count | Difficulty |
|------|-------|------------|
| `@typescript-eslint/no-explicit-any` | 381 | High (each `any` needs caller-aware retype) |
| `react-hooks/exhaustive-deps` | 37 | Medium (auto-add deps -> re-render infinite loops if wrong) |
| `react-refresh/only-export-components` | 12 | Low (mostly shadcn UI, can override at directory) |
| `no-empty` | 15 | Trivial (add comment or remove) |
| `no-useless-escape` | 9 | Trivial (auto-fixable) |
| `no-misleading-character-class` | 2 | Low |
| `@typescript-eslint/no-unused-expressions` | 2 | Low |
| `@typescript-eslint/no-empty-object-type` | 2 | Low |
| `no-control-regex` | 1 | Low |
| `no-constant-binary-expression` | 1 | Low |
| `no-case-declarations` | 1 | Low |
| `@typescript-eslint/no-require-imports` | 1 | Low (`tailwind.config.ts:163`) |

Auto-fix already applied (469 -> 465 -> 416 after re-run, 4 trivial fixes).

### Recommended approach (Option A from session handoff)

Modify `eslint.config.js` to scope strict rules:
- **error** for `no-explicit-any` and `exhaustive-deps` on Phase 4.5-10
  paths: `src/lib/{photoQuota,redditMentions,reportBranding,apiKey,
  anomalyDetection,clientType,brand,brandClaim,brandConfig,tenantDomains,
  tenantHistory,featureCatalog}.ts`, `src/blog/**`, `src/contexts/**`,
  `src/components/{admin,settings,reports}/**`, `src/components/FeatureGate.tsx`,
  `src/hooks/{useTenantDomains,usePhotoDrafts,useRedditMonitor,useApiKeys}.ts`,
  `src/pages/{GbpPhotoQueue,RedditMonitor,ExecutiveReportViewer,ApiKeysAdmin,AlertsCenter}.tsx`,
  `src/test/**`
- **warn** for the rest (legacy code, fix incrementally via boy scout rule
  when touching the file)

15 minutes config + commit. Lint passes immediately. Tech debt stays
visible. New code cannot regress.

### Alternative options considered

- **Option B**: Suppress legacy with `// eslint-disable-next-line` + TODO
  comment. ~1.5h. Clean lint but 418 TODOs sprinkled across the codebase.
- **Option C**: Hand-fix all 416 errors properly. 6-12 hours across multiple
  sessions. Highest quality but exceeds single-session budget.

User chose to defer to a fresh session. Recommendation when reopening: start
with Option A config split, then attack `no-empty` + `no-useless-escape` +
the 1-off rules in batch (~30 min for ~30 errors), then optionally tackle
`no-explicit-any` directory-by-directory in subsequent sessions.

## Final operator action queue (cumulative Phases 4.5 + 5 + 6 + 7 + 8 + 9 + 10)

Already done:
1. ✅ 3 migrations 20260427130000-150000 (Phase 4.5)
2. ✅ provision-ailys-tenant deployed (Phase 4.5)
3. ✅ Custom Access Token hook enabled (Phase 4.5)

Pending (apply via Supabase SQL Editor):
4. 20260428000000_create_tenant_domains.sql (Phase 5.B)
5. 20260428100000_create_gbp_photo_pipeline.sql (Phase 6.B)
6. 20260428110000_create_reddit_mentions.sql (Phase 7.B)
7. 20260428120000_add_tenant_branding.sql (Phase 8.A) + executive-reports storage bucket
8. 20260428130000_create_api_keys.sql (Phase 9.B)
9. 20260428140000_create_alerts.sql (Phase 10.B)

Pending (deploy via Supabase CLI from worktree):
```
npx supabase functions deploy admin-pricing --project-ref qucxhksrpqunlyjjvuae
npx supabase functions deploy google-upload-photo --project-ref qucxhksrpqunlyjjvuae
npx supabase functions deploy reddit-poll --project-ref qucxhksrpqunlyjjvuae
npx supabase functions deploy public-api --project-ref qucxhksrpqunlyjjvuae
npx supabase functions deploy detect-anomalies --project-ref qucxhksrpqunlyjjvuae
```

Pending (env vars in Supabase function secrets):
- REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT (Phase 7)
- ANTHROPIC_API_KEY already required by ai-visibility-run / gbp-draft-reply / photoCaption / reddit-poll
- RESEND_API_KEY required by detect-anomalies critical email path

Pending (Cloudflare + Resend):
- my.ailysagency.ca custom domain on Reviuzy project (deferred since
  Reviuzy is on Workers static-assets; either migrate to Pages or use
  a Worker route)
- Resend domain auth (SPF/DKIM/DMARC) for both reviuzy.com + ailysagency.ca

**Operator action items** (cumulative across Phases 4.5 + 5 + 6 + 7 + 8 + 9):
1. Apply 3 migrations (20260427130000, 140000, 150000) via Supabase SQL Editor
   ✅ DONE 2026-04-27 night
2. Deploy `provision-ailys-tenant` edge function
   ✅ DONE 2026-04-27 night
3. Enable Custom Access Token hook in Supabase Auth -> Hooks
   ✅ DONE 2026-04-27 night
4. Apply 5 NEW migrations via SQL Editor (Phases 5-9):
   - 20260428000000_create_tenant_domains.sql (Phase 5.B)
   - 20260428100000_create_gbp_photo_pipeline.sql (Phase 6.B)
   - 20260428110000_create_reddit_mentions.sql (Phase 7.B)
   - 20260428120000_add_tenant_branding.sql (Phase 8.A)
   - 20260428130000_create_api_keys.sql (Phase 9.B)
5. Redeploy 3 edge functions:
   - `npx supabase functions deploy admin-pricing --project-ref qucxhksrpqunlyjjvuae` (Phase 4.5 follow-up + Phase 5)
   - `npx supabase functions deploy google-upload-photo --project-ref qucxhksrpqunlyjjvuae` (Phase 6.D)
   - `npx supabase functions deploy reddit-poll --project-ref qucxhksrpqunlyjjvuae` (Phase 7.C, NEW)
   - `npx supabase functions deploy public-api --project-ref qucxhksrpqunlyjjvuae` (Phase 9.C, NEW)
6. Set Reddit OAuth secrets in Supabase function secrets (Phase 7):
   REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT (e.g., "reviuzy-reddit-poll/1.0")
   App created at reddit.com/prefs/apps, type "script", redirect uri http://localhost
7. Wire `my.ailysagency.ca` as Cloudflare Pages custom domain on the Reviuzy project
   (NOTE: Reviuzy is on Workers static-assets; either migrate to Pages or use a
   Worker route, recommendation in ops doc)
8. Resend domain auth for both `reviuzy.com` and `ailysagency.ca`

---

## ⚠️ HANDOFF FOR NEXT SESSION (read first)

**Architecture decided 2026-04-27**: AiLys Agency clients and Reviuzy SaaS self-serve clients are the SAME backend (one Supabase, one codebase) but **isolated by hostname** to prevent AiLys clients from discovering cheaper Reviuzy direct option (which would cause downsell from $300-$2,500 AiLys to $39-$149 Reviuzy).

**The discriminator** is a new `client_type` column on `tenants`:
- `reviuzy_self_serve` → uses `reviuzy.com`, sees Reviuzy plans, can upgrade to Reviuzy max
- `ailys_managed` → uses `my.ailysagency.ca`, sees AiLys plans, "contact strategist" CTAs
- `reseller` (future) → for white-label resellers

**Hostname split** (Phase 4.5 to wire):
- `reviuzy.com` (apex) → Reviuzy SaaS — already lives here (per user Q1)
- `my.ailysagency.ca` → DNS created today, needs Pages custom domain + middleware
- Edge `_middleware.ts` redirects mismatched tenants to correct hostname

**Legal entity**: Reviuzy Inc. (Quebec) operates AiLys Agency as a registered dba. ONE Stripe account (under Reviuzy Inc.) with TWO products: Reviuzy SaaS + AiLys Agency. Stripe descriptor varies: `REVIUZY INC * REVIUZY` vs `REVIUZY INC * AILYS`.

**Decisions confirmed by user 2026-04-27**:
- Q1: Reviuzy SaaS lives at apex `reviuzy.com` (no `app.reviuzy.com` subdomain)
- Q2: Tier mapping = `ailys_tier='core'` + `tier=null` for ailys_managed (option A, cleaner)
- Q3: Reviuzy public pricing in USD (exact values still TBD)
- Q4: Create `my.ailysagency.ca` DNS ✅ done
- Q5: Stripe — same account as Truvizy (under Reviuzy Inc.), map Reviuzy prices + AiLys plans to it (PHASE 4.5 wire-up)
- Q6: Phase 4.5 priority order: em-dash → hostname routing → tests
- Q7: AiLys CTA on Reviuzy public pricing — to be added during Phase 4.5
- Q8: Email templates already in Resend
- Q9: Auto-provisioning via Stripe webhook on subscription created → `provision-ailys-tenant` edge function (most autopilot)
- Q10: Contract clauses generated, in `C:\Anthony\Projects\AiLys-Contracts\` (EN + FR-CA HTML printable)
- Q11: Email-driven nudges when system detects struggling client (no in-app announcement)
- Q12: Reviuzy → AiLys upsell keeps full history (reviews, photos, contests) — not archived
- Q13: Subdomain `my.ailysagency.ca` covers BOTH clients AND staff (no separate `staff.` subdomain)

**Decisions still TBD (need user input next session)**:
- Reviuzy public price points (USD exact values)
- AiLys CTA copy on reviuzy.com/pricing (I'll draft, user approves)
- 14 contract translations (deferred per Q4 — translations à la fin)
- Lawyer review of contract template

---

## 🎯 PHASE 4.5 ROADMAP (next session priority)

**Phase 4.5 = Foundation. ~50h estimated. Execute in this order**:

### 4.5.1 Em-dash cleanup (4h, FIRST)
- Reviuzy repo has **211 em-dashes** in `src/i18n/translations/*.ts` (audit found 2026-04-27)
- Violates CLAUDE.md hard rule #2 (em-dash strict gate)
- Build script `scripts/scrub-em-dashes.mjs` for context-aware replacement
- Manual diff review before commit
- Verify: `grep -rn "—" src/i18n/translations/` returns 0
- Repo: `C:\Anthony\Projects\reviuzy\` (NOT this repo)

### 4.5.2 Test framework setup (12h)
- Install Vitest + @testing-library/react + jsdom in Reviuzy repo
- Configure `vitest.config.ts`
- Add scripts: `npm test`, `npm run test:watch`, `npm run test:coverage`
- GitHub Action workflow `.github/workflows/test.yml`
- Coverage threshold: start 50%, target 80%
- Initial 10 critical tests (tier-gate, client-type, RLS isolation, rate-limit, quota, FeatureGate, upgrade-CTA, webhook-signature, OAuth-state, AI-Vis-prompt)

### 4.5.3 `client_type` migration (6h)
- Migration: `2026XXXX_add_client_type_to_tenants.sql`
- Columns: `client_type`, `billing_owner`, `dedicated_strategist_id`, `ailys_tier`
- Default existing tenants to `reviuzy_self_serve`
- Edge function `provision-ailys-tenant` for AiLys CRM/Stripe webhook
- RLS update: `is_ailys_strategist(tenant_id)` predicate

### 4.5.4 Hostname-based brand isolation (8h) ⚠️ NEW
- Detect brand from `window.location.hostname` in React app
- `<BrandProvider>` context wrapping the app
- `_middleware.ts` redirects on hostname mismatch
- Pages custom domain `my.ailysagency.ca` to be added to Reviuzy Pages project
- DNS already done

### 4.5.5 JWT audience claim hardening (4h) ⚠️ NEW
- JWT issued for `my.ailysagency.ca` has `aud: 'ailys'`
- JWT for `reviuzy.com` has `aud: 'reviuzy'`
- Cross-hostname tokens rejected (defense in depth)
- Per CLAUDE.md hard rule #9 gov-grade security

### 4.5.6 Stripe descriptor + email From per brand (6h) ⚠️ NEW
- Stripe API: set `statement_descriptor_suffix` per subscription based on `tenant.client_type`
- Resend: send from `noreply@reviuzy.com` for self-serve, `noreply@ailysagency.ca` for ailys_managed
- DNS: SPF/DKIM/DMARC for `ailysagency.ca` (verify already exists; add subdomain if needed for `noreply@`)

### 4.5.7 Tenant migration history table (3h) ⚠️ NEW
- `tenant_history(tenant_id, old_type, new_type, changed_by, changed_at, reason)`
- Audit trail for upsell flow
- GDPR right-to-data ready

### 4.5.8 `tier-features.ts` centralization (3h)
- `src/lib/tier-features.ts` is single source of truth
- `TIER_FEATURES` map for both Reviuzy + AiLys ladder
- Replace scattered `if (tier === 'pro')` checks
- Cover hardcoded `maxDomains={3}` etc. surfaced by audit

### 4.5.9 DNS + Pages setup (2h)
- Add `my.ailysagency.ca` as custom domain to **Reviuzy** Pages project (NOT ailysagency project)
- Wait for cert provisioning
- Test redirect logic

### 4.5.10 SPF/DKIM/DMARC for both domains (2h)
- Verify Resend domain auth records exist for both
- Add subdomain-level if needed
- Test send-from-each-domain

---

## 📋 PHASES 5+ ROADMAP (after Phase 4.5)

Full spec at: `docs/reviuzy-implementation-spec.md` (1,500+ lines, v1.1)

Updates needed for v1.2 spec (next session):
- Cancel duplicates: AI Vis (already shipped), AI Traffic (already shipped), Q&A drafts (already shipped), rate limiting (already shipped), 111 migrations (already done)
- Add tier nomenclature alignment per Q2 decision
- Add hostname architecture details
- Add `client_type` integration per phase

**Recommended sequence after 4.5**:
- Sprint 1 (Phase 5): tier gating UI + multi-domain + branding switch (~30h)
- Sprint 2 (Phase 6): photo flow complete (~28h, was missing per audit)
- Sprint 3 (Phase 7): Reddit signal monitoring (~20h)
- Sprint 4 (Phase 8 + 9): white-label PDF + API access for Agency (~52h)
- Sprint 5 (Phase 10): crisis early warning (~25h)
- Sprint 6+ (Phase 11-17): GOD MODE features (~605h total)
- Sprint final: contract translations 14 languages + Reviuzy translations 13 languages (per Q4 decision: à la fin)

---

## 🚨 USER ACTIONS PENDING

1. **`ANTHROPIC_API_KEY` in Cloudflare Pages env** (ailysagency project)
   - Without this: chat advisor returns "offline" fallback message
   - Set via wrangler: `npx wrangler pages secret put ANTHROPIC_API_KEY --project-name=ailysagency`
   - User has Anthropic account at console.anthropic.com

2. **`CLOUDFLARE_API_TOKEN` GitHub secret** (for auto-deploy)
   - Needed at https://github.com/tonyAZNboy/ailysagency/settings/secrets/actions
   - Create token at https://dash.cloudflare.com/profile/api-tokens with scope `Account > Cloudflare Pages > Edit`
   - Without this: GitHub Actions deploy fails with "secret missing" error (manual `wrangler pages deploy` works as workaround)

3. **Visual check on iPhone Safari**
   - Verify mobile UI fixes (heading overflow, navbar pill backdrop, logo Quebec colors)
   - URL: https://ailysagency.ca (private mode, hard refresh)

4. **Reviuzy public price points** (Q3 still pending)
   - Need exact USD values for starter/pro/max for Reviuzy SaaS marketing pricing page

5. **Lawyer review of contract template**
   - File: `C:\Anthony\Projects\AiLys-Contracts\contract-en.html` (and FR-CA)
   - Review by Quebec lawyer before first commercial use
   - Especially Section 11 (exclusivity clause)

---

## 📦 Today's deliverables (2026-04-27)

### AiLys Agency repo (this repo)
- Mobile UI fix (TextReveal text-xl removed, headings overflowWrap, navbar pill backdrop)
- Logo Quebec white+blue redesign with neon halo
- `.com → .ca` redirect via Pages middleware (DNS + custom domains + middleware)
- Pricing rebrand $300/$600/$1,200/$2,500 (16 locales)
- Photo cadence 4/8/12/(12 per domain) (16 locales)
- Contest scope = client-managed (16 locales + chat advisor + CLAUDE.md)
- Link-building scope = no active outreach, Wikidata only (16 locales + chat advisor + CLAUDE.md)
- Photo flow = client uploads via Reviuzy app (CLAUDE.md + chat advisor)
- 3 hard rules added to CLAUDE.md (mobile-first #13, link-building scope, photo flow)
- Bilingual EN/FR-CA legal pages (Terms + Privacy + Cookies via `useLang()` switch + `/:lang/{terms,privacy,cookies}` routes)
- 5 new help articles (add-ons, contest, photo flow, no link-building, Reddit playbook, onboarding audit) — all EN+FR-CA
- AiLys-native chat advisor `/api/chat-advisor` (Claude Opus 4.7, adaptive thinking, prompt caching, streaming SSE, rate-limited)
- Footer "Produit Jumeau Reviuzy" card REMOVED (downsell prevention)
- 30+ commits all live on `ailysagency.ca`

### `C:\Anthony\Projects\AiLys-Contracts\` (NEW folder)
- `index.html` — printable contracts portal
- `contract-en.html` — full English consulting agreement (17 sections + 3 schedules)
- `contract-fr-CA.html` — full French Quebec consulting agreement
- `AiLys-Agency-Consulting-Agreement-TEMPLATE.md` — markdown source EN
- `AiLys-Agency-Consulting-Agreement-TEMPLATE-fr-CA.md` — markdown source FR-CA

### `docs/` updates (this repo)
- `docs/reviuzy-implementation-spec.md` — 1,500+ line implementation spec for Reviuzy SaaS Phase 5-17 (covers all GOD MODE features, tier matrix, upgrade CTA system, deep feature catalogue, long-term solution patterns vs band-aids)

### Reviuzy SaaS repo (`C:\Anthony\Projects\reviuzy\`)
- **NOT TOUCHED THIS SESSION** — all spec, no code yet
- Audit findings: 75% of spec aligns with reality, 25% gaps to fix in Phase 4.5
- Critical gaps: 211 em-dashes, 0 tests, no `tier-features.ts`, no `tenant_domains` table, no photo upload backend, no `client_type` discriminator, 10/16 locales fallback EN
- See "PHASE 4.5 ROADMAP" above for next session work

### Cloudflare DNS
- AiLys: `my.ailysagency.ca` CNAME → `ailysagency.pages.dev` proxied (NEW today)
- AiLys: `ailysagency.ca` apex + `www` CNAME → `ailysagency.pages.dev` proxied (existing)
- AiLys: `ailysagency.com` + `www.ailysagency.com` CNAME → `ailysagency.pages.dev` proxied (redirect via middleware)
- Reviuzy: `reviuzy.com` apex (Reviuzy SaaS at apex per user Q1)

---

---

## What's shipped

### Site surface (v0.2.0)
- Landing page (Index.tsx) with all sections built and translated
- 7 industry landing pages (`/industries/dentists`, `/lawyers`, `/restaurants`, `/contractors`, `/clinics`, `/real-estate`, `/hotels`) + index `/industries`
- 3 comparison pages (`/vs/sterling-sky`, `/vs/brightlocal`, `/vs/localiq`)
- 20-term glossary (`/glossary`) with dynamic `:slug` routes
- Free AI Visibility Score tool (`/tools/ai-visibility-score`)
- Audit pages: `/audit` (AI Visibility), `/audit/gbp` (GBP Pulse, two-mode toggle: instant self-assessment + Anthropic-backed deep audit)
- Blog + Help center (already pre-existing)
- Book-call page, legal pages, auth scaffold

### Conversion + SEO infrastructure
- Cookie consent banner (Loi 25 / GDPR / PIPEDA compliant)
- Exit-intent modal (pointer-leave + scroll-up triggers, 24h cooldown)
- Newsletter signup component (honeypot, disposable-email reject)
- LandingChatWidget (UI translated; backend reuses Reviuzy Supabase functions, see "Open issues" below)
- Founding Clients Program section (transparent ethical Tier S replacement)
- llms.txt at root for LLM bot discovery
- Sitemap with 944 URLs across 16 languages
- A+ security headers (HSTS, CSP, X-Frame-Options, Permissions-Policy)
- Schema.org coverage on every key page (Service, FAQPage, BreadcrumbList, DefinedTermSet, Organization)

### Audit engine
- AutoAuditEngine: AI-backed audit via Reviuzy `reputation-audit` Supabase edge function
- GbpPulseEngine: 8-question self-assessment, 10 weighted signals, vertical-tuned multipliers (10×9 = 90)
- LlmCitationMatrix: 6 engines × 3 queries grid via `/api/llm-citation-matrix` (Anthropic Claude Haiku, KV-cached)
- PlacesPreview: real GBP data via `/api/places-lookup` (Google Places API)
- CompetitorOverlay: 3 nearest competitors via `/api/places-nearby`
- SchemaPreview: copy-paste-ready LocalBusiness + FAQPage JSON-LD per vertical
- ExportActionPlan: Send to Notion / Google Doc / Email / Clipboard

### Cloudflare Pages Functions (`/functions/api/`)
| Endpoint | Status | Requires |
|---|---|---|
| `hero-citation` | live | `ANTHROPIC_API_KEY` |
| `ai-visibility-score` | live | `ANTHROPIC_API_KEY` (+ `AI_VIS_CACHE` KV) |
| `llm-citation-matrix` | live | `ANTHROPIC_API_KEY` (+ `LLM_MATRIX_CACHE` KV) |
| `places-lookup` | live | `GOOGLE_PLACES_API_KEY` (+ `PLACES_CACHE` KV) |
| `places-nearby` | live | `GOOGLE_PLACES_API_KEY` (+ `PLACES_CACHE` KV) |
| `newsletter-subscribe` | live | optional `RESEND_API_KEY` |
| `chat-advisor` | live (returns offline fallback until key set) | **`ANTHROPIC_API_KEY` (REQUIRED)** + optional `CHAT_RATE_LIMIT` KV |
| `cofounders-apply` | live | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |

All functions return graceful sample fallback when their API key is missing.

---

## i18n status (verified by `scripts/audit-translations-deep.mjs`)

| Locale | Tier | Key parity | Placeholders | Em-dashes |
|---|---|---|---|---|
| en | canonical | 1,032 keys | — | 0 (in code; 2 in comments only) |
| fr | major | 100% | 26 (legitimate brand/cognate) | 0 |
| es | major | 100% | 20 (legitimate) | 0 |
| zh | major | 100% | 24 (legitimate) | 0 |
| ar | major | 100% | 24 (legitimate) | 0 |
| ru | major | 100% | 25 (legitimate) | 0 |
| de | secondary | 100% | 26 ✅ translated | 0 |
| it | secondary | 100% | 29 ✅ translated | 0 |
| pt | secondary | 100% | 26 ✅ translated | 0 |
| nl | secondary | 100% | 29 ✅ translated | 0 |
| pl | secondary | 100% | 25 ✅ translated | 0 |
| ja | secondary | 100% | 28 ✅ translated | 0 |
| ko | secondary | 100% | 31 ✅ translated | 0 |
| tr | secondary | 100% | 26 ✅ translated | 0 |
| vi | secondary | 100% | 28 ✅ translated | 0 |
| hi | secondary | 100% | 29 ✅ translated | 0 |

**16 of 16 locales fully translated.** All locales now sit between 20 and 31 placeholders (legitimate brand lists, email placeholders, Latin-script schema/tech names).

---

## Open issues / next session

### Phase 2-4 SHIPPED (2026-04-27 session, all features built end-to-end in Reviuzy)

**Phase 2 — Reviuzy GBP gaps (B.1, B.2, B.3):**
- B.1 GBP photo upload: edge function `google-upload-photo` + admin `/gbp/photos` + help article. Migration `rate_limits` table.
- B.2 GBP Q&A bot: 3 edge functions (`google-fetch-questions`, `gbp-draft-reply` calling Claude Opus 4.7, `google-post-answer`) + admin `/gbp/questions` 4-tab queue + help article. Migration `gbp_question_drafts` table.
- B.3 GBP attributes: edge function `google-attributes` (fetch + update modes) + admin `/gbp/attributes` + help article.

**Phase 3 — Citation building + NAP (C.1, C.2, C.3):**
- C.1 Citation directory tracker: hand-curated catalog of 27 directories (`src/data/citationDirectories.ts`) + admin `/citations` 5-tab workflow + help article. Migration `citation_submissions` table.
- C.2 NAP consistency checker: admin `/nap` with canonical lock + diff detection + observation history + help article. Migration `nap_snapshots` table.
- C.3 Citation tracking dashboard: subsumed by CitationManager Verified tab + audit log.

**Phase 4 — AI visibility advanced (D.1, D.2, D.3, D.4):**
- D.1+D.2+D.3 AI Visibility engine: edge function `ai-visibility-run` probing 6 engines via Claude Opus 4.7 (thinking adaptive, effort high, prompt cache on system prompt) + admin `/ai-visibility` with Share of Model bar chart, sentiment per engine, competitor rollup, freshness alerts, named-competitor editor + help article. Migration `ai_visibility_runs`, `ai_competitors`, `ai_traffic_visits` tables.
- D.4 AI Traffic conversion tracker: public edge function `ai-traffic-ingest` (no auth, token-based, SHA-256 hashed at rest, IP-bucket rate limit, AI engine detection from utm_source AND referrer host across 10 patterns) + admin `/ai-traffic` with token generator, copy-paste snippet, conversion call template, per-engine breakdown + help article.

**Help articles in AiLys help center (EN + FR-CA, all per CLAUDE.md hard rule #10 — no proprietary disclosure):**
- `gbp-photo-uploads`, `gbp-qa-monitoring`, `gbp-attributes`, `citation-building`, `nap-consistency`, `ai-visibility-engine`, `ai-traffic-tracker`. 7 new articles, all bilingual.

**Reviuzy commits:** `5a411f8` (B.1), `8d3cc4c` (B.2), `408306a` (B.3), `871bede` (Phase 3), `25a2491` (Phase 4).
**ailysagency commits:** `496cbc1`, `6b2da40`, `3b5f181`, `2b8ae00`, `0d43a2d` (5 help-article commits).

**⚠️ Operator action items before features go live:**
1. Apply 3 new Reviuzy migrations via Supabase SQL Editor (https://supabase.com/dashboard/project/qucxhksrpqunlyjjvuae/sql/new):
   - `20260427100000_create_gbp_question_drafts.sql`
   - `20260427110000_create_citation_submissions.sql`
   - `20260427120000_create_ai_visibility_tables.sql` (also adds `tenants.ai_traffic_token_hash` column)
2. Deploy 7 new Reviuzy edge functions: `npx supabase functions deploy google-upload-photo google-fetch-questions gbp-draft-reply google-post-answer google-attributes ai-visibility-run ai-traffic-ingest --project-ref qucxhksrpqunlyjjvuae`
3. Set `ANTHROPIC_API_KEY` in Reviuzy Supabase function secrets (used by `gbp-draft-reply` and `ai-visibility-run`).

### Priority A (Phase 1 — DONE earlier this session)
- **Tier 3 Autopilot price** raised from $1,299 to $1,599 across 16 locales + code (114 + 32 = 146 substitutions).
- **GBP post cadence ladder** wired into tier features (1 / 4 / 8 / 12 per month).
- **2-3 net-new 2026 features per tier** added to the marketing surface: AEO content brief generator, GBP Q&A monitoring, Share of Model dashboard, brand sentiment + citation freshness alerts, AI traffic conversion tracker, dedicated success strategist + monthly executive briefing.
- **3 net-new i18n keys** (tier1Feat7, tier2Feat8, tier3Feat9), all 21 changed/new tier feature keys translated to 15 non-EN locales (315 strings).
- **CLAUDE.md hard rules 9-12** added: Government-grade security on every new feature, help center docs without proprietary disclosure, mandatory admin center surface, tests-must-pass-before-delivery.
- Audit clean: 16/16 locales at 100%, 0 em-dashes in translations, typecheck clean, build green.

### Priority B (Phases 2-4 — NEXT sessions, each one full feature with admin + help docs + tests + deploy)

**Phase 2 — Reviuzy GBP gaps (~3 days):**
- B.1 GBP photo upload automation (4-6 photos/mo for Autopilot). Reviuzy currently lacks this.
- B.2 GBP Q&A bot (auto-draft replies, human approval) — surfaced as a Core+ feature in marketing, not yet built in Reviuzy.
- B.3 GBP attribute / category management (currently sync-only).
- All three need: rate-limit, tenant-scoped audit log, admin panel toggle, EN+FR-CA help articles before going live.

**Phase 3 — Citation directory + NAP (~1 week):**
- C.1 Directory submission engine (Yelp, BBB, Yellow Pages, vertical directories) so the "5/10 citations per month" promise is real.
- C.2 NAP consistency checker scanning 20+ directories.
- C.3 Citation tracking dashboard (per directory, per month, per location).

**Phase 4 — AI visibility advanced (~2 weeks):**
- D.1 Share of Model dashboard (real backend behind the marketing claim) — tracks brand mention frequency per LLM vs 3 named competitors.
- D.2 Brand sentiment in LLM responses (positive/neutral/negative classification per citation).
- D.3 Citation freshness alerts (40-60% of cited sources change month to month — alert when AiLys client churns out).
- D.4 AI traffic conversion tracker (UTM-based attribution from AI search referrers to bookings, pluggable into client GA4/Plausible).

**Each phase MUST satisfy CLAUDE.md hard rules 9-12 before merging.**

### Priority C (configuration tasks for the user, not Claude)
Set in **Cloudflare Pages → ailysagency project → Settings → Environment variables**:
- `ANTHROPIC_API_KEY` — activates LLM citation matrix, hero citation strip, AI visibility score (currently shows samples)
- `GOOGLE_PLACES_API_KEY` — activates PlacesPreview + CompetitorOverlay
- `RESEND_API_KEY` — activates newsletter double-opt-in confirmation emails
- `VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID` — analytics (after consent)

GitHub Actions secret (for the auto-deploy workflow at `.github/workflows/deploy.yml`, currently staged but not committed):
- `CLOUDFLARE_API_TOKEN` — Cloudflare Pages: Edit, scoped to the ailysagency project. The unified Workers & Pages dashboard removed the legacy "Git integration" management UI; reconnecting the GitHub webhook is no longer possible from the dashboard, so we restore auto-deploy via GitHub Actions instead.

### Priority B (deferred audit engine enhancements)
Documented in `docs/audit-engine-roadmap.md`:
- Phase B.4 PDF export (~10h, high value)
- Phase C.2 Continuous monitoring upsell (~12h, recurring revenue)
- Phase C.4 Anonymized peer benchmark (~6h)
- Phase D.6 Competitor content critique (~6h)
- Phase D.2 Audit-my-competitor tab (~8h, viral)
- Phase B.2 SSE streaming theater (~6h)
- Phase D.1, D.4, D.5, D.7, D.8 — voice mode, embeddable widget, resellers API, multiplayer audit, GSC OAuth

### Priority C (configuration tasks for the user, not Claude)
Set in **Cloudflare Pages → ailysagency project → Settings → Environment variables**:
- `ANTHROPIC_API_KEY` — activates LLM citation matrix, hero citation strip, AI visibility score (currently shows samples)
- `GOOGLE_PLACES_API_KEY` — activates PlacesPreview + CompetitorOverlay
- `RESEND_API_KEY` — activates newsletter double-opt-in confirmation emails
- `VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID` — analytics (after consent)

KV namespace bindings recommended:
- `CITATION_CACHE`, `AI_VIS_CACHE`, `LLM_MATRIX_CACHE`, `PLACES_CACHE` (24h TTL each)

### Open known limitations
- Chat widget UI is translated, but backend uses Reviuzy's Supabase functions (chat answers may lean Reviuzy-flavored). Long-term path documented in LandingChatWidget.tsx header comment as `TODO(ailys-chat)`.
- **Cloudflare auto-deploy on push is broken since ~04-26** (GitHub webhook stopped firing after a stuck-loop redeploy of `e6d5c40`). Confirmed by deployment list showing 30+ commits skipped between `e6d5c40` and `11f6b16`. The unified Workers & Pages dashboard removed the Git integration management UI for migrated projects; reconnect via GitHub Actions workflow (staged at `.github/workflows/deploy.yml`, awaiting `CLOUDFLARE_API_TOKEN` secret).
- **Phase 1 marketing features ahead of build.** The new bullet points (Share of Model dashboard, AEO content brief generator, GBP Q&A monitoring, AI traffic conversion tracker, sentiment + citation freshness alerts, dedicated strategist) are sold but not yet implemented in Reviuzy or as Cloudflare Functions. Phases 2-4 close those gaps. Until shipped, agency delivery is manual or via partial substitutes; this is documented internally and will be reflected in onboarding scripts.

---

## Tools + scripts shipped

| Script | Purpose |
|---|---|
| `scripts/audit-translations-deep.mjs` | Loads all 16 locales, diffs against EN, reports per-locale missing keys + placeholder counts |
| `scripts/audit-content-i18n.mjs` | Audits blog post + help article i18n completeness |
| `scripts/audit-translations.mjs` | Lighter UI-key audit |
| `scripts/inject-srseo.mjs` | Idempotent srSeo key injection across locales |
| `scripts/strip-em-dashes.mjs` | Replaces all em-dashes with appropriate punctuation |
| `scripts/rebrand-translations.mjs` | Reviuzy → AiLys Agency rebrand pass |
| `scripts/dump-major-placeholders.mjs` | Lists placeholder keys per major locale for review |
| `scripts/dump-priority-keys.mjs` | Extracts priority translation keys |
| `scripts/extract-hi-placeholders.mjs` | Dumps HI placeholder keys + EN values to JSON (reusable per-locale pattern) |
| `scripts/merge-hi-translations.mjs` | Applies a JSON of translations back into hi.ts and re-serializes the locale file |
| `scripts/migrate-tier3-price.mjs` | Migrates Tier 3 price across all 16 locales + code (handles comma, period, and space thousands separators) |
| `scripts/dump-tier-features.mjs` | Dumps the 21 changed/new tier feature EN strings to JSON |
| `scripts/merge-tier-translations.mjs` | Merges per-locale tier feature translations into all 15 non-EN .ts files |
| `scripts/generate-sitemap.mjs` | Regenerates sitemap.xml + 16 per-language sitemaps |

---

## Reference docs

- `CLAUDE.md` — project memory rules (always-test, no em-dashes, no AI fingerprints, brand-name preservation, security-first, agent verification)
- `docs/audit-engine-roadmap.md` — Phase B-D enhancement roadmap
- `docs/i18n-translation-queue.md` — translation tracking
- `docs/i18n-audit-report.json` — last audit run output (machine-readable)

---

## Pickup checklist for next session

1. `git pull` to sync latest main (Phase 1 commit + HI commit `d9cca4b` + STATE.md commit `11f6b16` should all be present).
2. Run `node scripts/audit-translations-deep.mjs` — confirm 16/16 at 100%, placeholder counts in the 20-31 range across all secondaries.
3. Pick one of Phases 2/3/4 and follow the playbook: Reviuzy backend feature → admin panel → help center articles (EN+FR-CA minimum, then 14 secondaries) → Gov-grade security defaults (zod, rate-limit, audit log, RLS) → tests pass → manual deploy until GitHub Action lands.
4. If pushing for the first time after the GitHub Action workflow is committed: confirm `CLOUDFLARE_API_TOKEN` secret is set on the repo before push, or the workflow run will fail.
5. Always: `npm run build && npx wrangler pages deploy dist --project-name=ailysagency --branch=main` for safe shipping until auto-deploy is back.
6. Verify in production after every deploy: hero, audit, services tier cards, pricing builder, /fr, /es, /zh, /ar, /ru.
