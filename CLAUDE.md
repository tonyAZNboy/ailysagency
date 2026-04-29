# AiLys Agency — Claude operating rules

## START HERE — every new session

**Before doing anything else, read `STATE.md`.** It has the current state of work, what shipped at the last tag, what's deferred, the Cloudflare env-var checklist, and a numbered pickup checklist. Do not start work without reading it. After reading, briefly summarize what's outstanding back to the user so they know you're synced.

Also reference (linked from STATE.md):
- `docs/audit-engine-roadmap.md` — Phase B-D enhancement plan with effort estimates
- `docs/i18n-translation-queue.md` — translation queue tracker
- `docs/i18n-audit-report.json` — last machine-readable audit run

When you finish meaningful work in any session, **update `STATE.md`** before committing. Bump the tag if shipping. Push to GitHub.

## Hard rules (non-negotiable)

1. **Always test what you deliver, every time.** Typecheck is not testing. Open the actual feature in the browser, click the actual button, verify the actual output. Before claiming a task is done, you must have demonstrated it working — not just compiled.
2. **No em-dashes (—) anywhere.** Use periods, commas, colons, parentheses, or "and" / "et" instead.
3. **No AI-text fingerprints.** Avoid "It's not just X, it's Y", "Whether you're X or Y", "leverage", "robust", "delve", excessive triadic listings ("X, Y, and Z").
4. **Brand names stay in English (or original Latin script) across all locales:** AiLys, ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot, Yelp, BBB, Wikidata, Wikipedia, Schema.org, Reviuzy, GBP, AEO, GEO, E-E-A-T, NAP, SEO, FAQ, NFC.
5. **Long-term solutions only. No band-aids.** If a fix needs server-side validation, write it. If a feature needs i18n, wire it from day one. Don't ship hardcoded English strings expecting "we'll translate later" — it's never later.
6. **Security-first by default.** Server-side input validation everywhere, no raw SQL, rate-limiting on every public API endpoint, CSP headers, no PII without consent, double-opt-in for newsletter, audit-trail consent IDs without PII.
7. **Verify agent output 100%.** When dispatching agents (general-purpose, Explore, Plan), do NOT trust their summaries. Always verify with `grep`, `tsc`, browser tests, and explicit assertions before claiming success.
8. **Translation completeness is binary.** A page is not "shipped" until all 6 majors render in the user's selected language: EN, FR-CA, ES, ZH, AR, RU.
9. **Government-grade security on every new feature.** Anything new that touches auth, data, third-party APIs, or admin actions must ship with: server-side input validation (zod or equivalent), rate-limiting (KV-backed token bucket on Cloudflare or Supabase RPC throttle), output encoding, audit logging (tenant_id + actor + action + timestamp + payload hash, no PII in clear), least-privilege RLS, secrets only via env (never inlined), CORS lockdown, and CSP-safe asset loading. No feature merges without these defaults.
10. **Help center documentation, no proprietary disclosure.** Every shipped feature gets a help center article (in EN + FR-CA at minimum, then 14 secondary locales) before it appears in the marketing UI. Articles describe the user-visible behavior and inputs. Articles MUST NOT name the AI provider (Anthropic, Claude, Gemini, OpenAI, Google), the model family, internal scoring formulas, prompt structures, or vendor APIs. Refer to engines collectively as "our AI engine" or "the AiLys engine" and to scoring as "our proprietary score." This protects competitive moat and reduces switching risk if a provider changes.
11. **Admin Center is mandatory for every feature.** New shipped capabilities must add a panel in the admin dashboard for: enabling/disabling per tenant, viewing recent invocations (last 50 with timestamp + status + tenant), cost telemetry (calls per day, $/day estimate), and per-tier feature gating. No "ghost features" with no admin surface.
12. **Tests must pass before delivery.** Before any merge to main: `npx tsc --noEmit` clean, `node scripts/audit-translations-deep.mjs` exit 0, em-dash count 0 across `src/i18n/translations/*.ts`, build succeeds, and the feature has been opened in the browser at least once and clicked through. CI failure or skipped test is a non-merge.
13. **Mobile-first, 100% native and responsive.** Every page, every modal, every form, every chart MUST be designed mobile-first (375x812 baseline) and verified across iOS Safari and Android Chrome before delivery. No desktop-only layouts. No fixed pixel widths that break under 380px. Use `min-h-screen`, fluid typography (`text-base sm:text-lg`), `flex-col sm:flex-row` patterns, `sm:` and `lg:` breakpoints, safe-area inset padding for notched devices (`env(safe-area-inset-bottom)`), and tap targets >= 44x44 px. Test before claiming done at: 375x812 (iPhone SE/14), 390x844 (iPhone 15), 412x915 (Pixel 8), 768x1024 (iPad portrait). Modals must not exceed viewport height; long content scrolls inside the modal, never the body.
14. **Spec-driven, agent-verified, ISO-gated.** Every Phase C/Phase 11/Phase 12 sub-phase, and every new feature touching auth, data, cron, admin, HMAC, RLS, or multi-tenant isolation, MUST follow the `iso-gsd-delivery` skill end-to-end: 5 GSD planning artefacts in `.planning/<phase-id>/` BEFORE code, ISO gates per commit (CI gates 1-7 + manual gates 8-13), agent fidelity protocol (100% independent verification, never trust agent summaries), gov-grade security defaults (Section 4), cost guardrails for paid-API consumers (Section 5), multi-tenant RLS isolation test on every new table (Section 6), DRY_RUN env mode on every cron (Section 7), 16-locale parity on every new i18n key (Section 8), STATE.md updated in same commit (Section 9), no new dependency without written justification (Section 10), 2x time-box escape hatch (Section 11), migration `down` tested (Section 12), binary Definition of Done checklist (Section 13). Skip a section = sub-phase NOT MERGEABLE. Invoke via `/iso-gsd-delivery` at session start, or rely on auto-trigger when "Phase C", "Phase 11", "Phase 12", "new sub-phase", "ship feature", "ship cron", "ship endpoint", or "new edge function" appears in the conversation.

## Project posture

- **Site:** AiLys Agency (https://www.ailysagency.ca, deployed at ailysagency.pages.dev)
- **Stack:** Vite + React + TypeScript + Tailwind + shadcn/ui, deployed on Cloudflare Pages
- **Sister product:** Reviuzy SaaS (https://www.reviuzy.com)
- **Home market:** Quebec, bilingual EN/FR-CA in-house
- **Pricing:** $300 (Starter) / $600 (Core) / $1,200 (Growth) / $2,499 (Agency) CAD per month, 4 tiers, month-to-month, 30-day satisfaction guarantee.
- **Tier 4 renamed:** "Autopilot" → **"Agency"** (positioning shift to brand and agency clients). Display name only; i18n key prefix `tier3*` stays for backwards compatibility.
- **Reviuzy automation add-on:** $100 CAD/month, available as toggle on Starter / Core / Growth. Bundled by default in Agency tier. Includes the full Reviuzy SaaS surface: NFC review collection + AI review generation + auto-replies + contest engine with video winner announcement + legal T&C generator + fake review detection + the entire Phase 2-4 stack (GBP automation, citations, NAP, AI Visibility, AI Traffic).
- **Agency tier exclusive (vs add-on):** multi-location dashboard, white-label PDF reports, Slack SLA <4h business hours, API access (Share of Model / AI Traffic / Visibility scores), custom integrations (HubSpot, Salesforce, hospitality PMS), quarterly executive deck presented in person, dedicated senior strategist, daily AI Visibility probes (vs weekly Growth), 12 GBP posts/mo + 4-6 photos/mo, Domain Shield + Domain Speed Boost.
- **Tier post cadence (GBP):** Starter 1/mo, Core 4/mo (1/wk), Growth 8/mo (2/wk), Agency 12/mo (3/wk).
- **Tier photo cadence (GBP):** Starter 4/mo, Core 8/mo, Growth 12/mo, Agency up to 12/mo per domain (multi-location dashboard scales the quota with the number of domains the Agency client manages).
- **Contest scope (CRITICAL):** Reviuzy SaaS provides the contest engine (NFC, AI review gen, video winner announce, legal T&C generator), but **the client runs the contest, not the agency**. Each business has its own audience, prize, and timing; managing them centrally is unworkable. We deliver: (1) Reviuzy SaaS access, (2) setup help in week 1, (3) jurisdiction-aware T&C templates, (4) help center documentation. We do NOT execute the monthly contest, draw the winner, or amplify socially on behalf of the client.
- **Link-building scope (CRITICAL):** AiLys does NOT offer active link-building, Wikipedia editing, Reddit/Quora participation, or journalist/PR outreach as a deliverable. These activities require human-only authentic participation, expert relationships, or editorial gatekeeping that the agency does not (yet) staff. What we DO deliver: NAP-consistent **citations** (Yelp/BBB/YP/etc., 5/10/15 per month at Core/Growth/Agency), **Wikidata** structured-data work via the MediaWiki API (Q-number creation, external-ID linking, semi-automatable), **GBP** post + photo + Q&A automation via Reviuzy, **schema** layers (LocalBusiness, FAQPage, Service, Person, BreadcrumbList) on the client site, and **AI Visibility / AI Traffic** scoring. Backlinks generated naturally as a side effect of citations + Wikidata + GBP are not promised but expected. If a client asks for active link-building, we honestly redirect to a partner specialist.
- **Reviuzy automation reality:** Reviuzy SaaS is the operational leverage. It auto-handles: GBP post generation + scheduling + publishing via the GBP API, photo upload pipeline, Q&A monitoring + draft replies, NFC review collection, AI review generation, contest engine, citation directory tracker, NAP consistency checker, AI Visibility probes, AI Traffic UTM tracking, and report generation. The strategist's role is QA + judgment + strategy, not operational execution. Tier prices reflect strategist hours per month, not SaaS cost: Starter ~1h, Core ~3h, Growth ~6h, Agency ~12-15h.
- **Photo flow (CRITICAL):** Photos are **client-sourced**, NOT agency-sourced. The client takes photos on their phone (real locations, real EXIF metadata = E-E-A-T "Experience" signal) and uploads them via the **Reviuzy SaaS app**. The app is **tier-aware**: Starter shows 4 photo upload slots per month, Core 8, Growth 12, Agency up to 12 per domain (Agency tier supports multi-domain so quota scales with domain count). Each tier's quota resets on the 1st. Reviuzy auto-extracts EXIF, AI-generates caption + alt-text, queues for strategist QA, and publishes to GBP via the Google Business Profile API. The agency does NOT source photos (no on-site visits, no stock photos: LLMs detect those and weight them lower). This is a SaaS UI requirement: the Reviuzy frontend must enforce per-tier upload quotas and surface only features the client's tier includes (per hard rule #11).

## i18n discipline

- EN is canonical schema. FR-CA is full coverage. ES/ZH/AR/RU should be full coverage but secondary.
- Type system enforces `Record<SupportedLang, typeof en>` but `strict: false` in tsconfig means missing keys silently fall through. **Always grep for the key to verify it exists in every locale, don't trust typecheck alone.**
- Hardcoded strings in components are forbidden after phase 1 i18n was completed. Any new component must use `useLang()` from day one.
- Translation queue tracked at `docs/i18n-translation-queue.md`.

## Deployment

- Cloudflare Pages auto-deploys from main branch. Manual deploys via `wrangler pages deploy dist --project-name=ailysagency`.
- All `/api/*` routes are Cloudflare Pages Functions in `functions/api/`.
- ENV vars to set in Cloudflare Pages dashboard: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID`, optional KV bindings `CITATION_CACHE`, `AI_VIS_CACHE`.
- After every deploy, verify the live site at /, /fr, /es, /zh, /ar, /ru. If any section is in the wrong language, redeploy.

## Test cadence

Before declaring any task complete:
1. Run `npx tsc --noEmit` (typecheck)
2. Run `node scripts/audit-translations-deep.mjs` (must exit 0)
3. Run `node scripts/audit-blog-translations.mjs` (must exit 0). Checks every EN→FR-CA blog post pair for parity (meta exports, slug match, heading and component counts including FAQ count, em-dashes, AI fingerprints, brand-name preservation in Latin script, proprietary AI provider leak, EN/FR word-count ratio, metaFr inheritance via `...meta` spread).
4. Em-dash audit: `grep -rn "—" src/i18n/translations/ src/blog/posts/ functions/` must return zero matches.
5. Run feature smoke tests (each script is independent, exit 0 means pass):
   - `npx tsx scripts/smoke-audit-pdf-validation.mjs` (16 cases, request validator)
   - `npx tsx scripts/smoke-audit-pdf-render.mjs` (9 cases, full PDF render with pdf-lib round-trip)
   - `npx tsx scripts/smoke-audit-pdf-hmac.mjs` (11 cases, signed download URL signer)
   - `npx tsx scripts/smoke-audit-pdf-onboarding.mjs` (17 cases, service-to-service HMAC + Day-1 payload synthesis + 10-page render)
   - `npx tsx scripts/smoke-cron-guard.mjs` (13 cases, kill switch + concurrency lock + audit log emission)
   - As new features ship, add their smoke tests here AND wire into `.github/workflows/deploy.yml`.
6. Open the affected page(s) in the browser preview
7. Click the affected control / submit the affected form / verify the affected output
8. Hit the live deployed endpoint with a real curl (server-side features only) and confirm both the success path AND at least 3 failure modes (validation, method, honeypot). Hard rule #1: typecheck is not testing.
9. Switch the language to a non-EN locale and verify translation works
10. Test on mobile viewport (375x812) for any UI changes
11. For new server endpoints: confirm rate-limit, input validation, audit-log entry, and admin panel visibility
12. For new features: confirm help center article exists in EN + FR-CA before the UI surface goes live
13. Document the result before claiming done

**ISO-grade enforcement:** All gates 1-5 run automatically in `.github/workflows/deploy.yml` on every push to main. Failed gate blocks deploy. Manual gates 6-13 are operator responsibility per task.

## Roadmap snapshot (live)

See `STATE.md` for the active roadmap. The current 4-phase delivery plan covers:
- **Phase 1 — Tier ladder rebuild** (post cadence 1/4/8/12, Tier 3 → $1,599, surface 2-3 new features per tier)
- **Phase 2 — Reviuzy GBP gaps** (photo upload automation, Q&A bot, both with admin + help docs)
- **Phase 3 — Citation directory + NAP checker** (closes the "5/10 citations per month" promise)
- **Phase 4 — AI visibility advanced** (Share of Model, sentiment, citation freshness alerts, AI traffic attribution)

Each phase MUST satisfy hard rules 9, 10, 11, 12 before merging.
