# Phase E.1 : Handoff document for STATE.md merge

**Status:** in-progress on branch `claude/gracious-raman-a6383a` (worktree `gracious-raman-a6383a`)
**Owner of this branch:** parallel session (this) : does NOT touch STATE.md to avoid conflict with main session executing Phase C/D backend work.
**Operator action:** when this branch merges, copy the relevant sections below into STATE.md.

## Phase E.1 scope (locked decisions per user 2026-04-29)

Marketing/conversion overhaul, AiLys-side only. Phase E sits parallel to Phase C/D backend work. Areas orthogonal: Phase C/D = Reviuzy backend automation + AiLys admin/security; Phase E = AiLys public marketing UI + new pricing page + Reviuzy public-facing brand scrub.

| # | Decision | Locked |
|---|---|---|
| 1 | Posts GBP quotas: 4/6/8/12 (managed) + 6/8/10/12 (self-serve, per domain) | ✅ |
| 2 | Photos GBP: same cadence as posts. Client-uploaded (real EXIF) does NOT count against AI image quota (E-E-A-T booster) | ✅ |
| 3 | Blog posts (bilingual EN+FR): 2/4/6/8 unique topics/month, each published EN+FR (so Starter = 2 topics = 4 articles) | ✅ |
| 4 | Citations: 2/4/6/8 per month, max per domain | ✅ |
| 5 | Tier-locked website: Vitrine ($800, Starter+), PME ($1500, Core+), Commerce ($3000, Growth-only), Commerce XL ($3000+ custom, Growth-only), Agency tier excluded | ✅ |
| 6 | Cancellation recovery fee: 6-month linear amortization. Formula `fee = build_cost × (6 − months_paid) / 6` | ✅ |
| 7 | Engagement discounts: monthly 0%, annual 15% all tiers, biennial 20% Growth+Agency only | ✅ |
| 8 | International add-ons: Pack USA (BrightLocal) +$199/mo/domain, Pack EU +$349/mo/domain. Marked "À venir" v1. Eligible Growth+Agency, Core same price if requested | ✅ |
| 9 | Citation engine: hybrid (Bing + Apple + Wikidata API direct + Whitespark partner Tier 2 ~$3-5/citation). NO scraping, NO direct Yelp/PJ | ✅ |
| 10 | Reviuzy: option (b) cacher in E.1 (scrub mentions on AiLys public surface). Phase E.2 next session: custom domain `app.ailysagency.ca` | ✅ |
| 11 | i18n: 14 secondary locales kept as placeholder, EN+FR-CA hand-translated | ✅ |
| 12 | God mode v1 (this phase): instant AI Visibility audit, Quebec TPS+TVQ tax calc, personalized quote PDF, "show only differences" toggle, 90-day measurable uplift guarantee clause | ✅ |
| 13 | Neon background on pricing cards: -50% opacity/blur | ✅ |

## Future phases (not in E.1 scope)

- **Phase E.2:** Reviuzy custom domain `app.ailysagency.ca` (Reviuzy repo, ~7-10h)
- **Phase E.3:** GBP self-serve toggle + quota system + admin gating (~14-18h)
- **Phase E.4:** Citation engine v1 implementation (Bing + Apple + Wikidata + Whitespark) (~24-32h)
- **Phase E.5:** God mode v2 (competitor comparator, ROI calc, save/share config URL, Calendly Quebec embed, case studies, live chat pre-sales) (~8-10h)
- **Phase E.6:** International add-ons live (BrightLocal USA + Marquant EU) (~12-16h)

## GSD planning artefacts (committed, not in STATE.md)

`.planning/phase-e1/` contains:
- `00-objectives.md` : business goal, hours saved (~46h/mo strategist time), cost ceiling <$10/mo
- `01-threat-model.md` : attack surface, SSRF + prompt injection + replay defenses, fail-closed env vars, audit log
- `02-sub-phases.md` : 11 atomic sub-phases (E.1.0 to E.1.11), 22-28h cumulative estimate
- `03-test-matrix.md` : per-sub-phase tests + manual gates + viewport matrix + i18n parity
- `04-rollback-plan.md` : env var kill switches + revert procedures + zero migrations

## Sub-phases shipped this branch

| Sub-phase | Commit hash | Smoke / proof | Status |
|---|---|---|---|
| E.1.0 GSD planning | `8093ec5` | tsc clean, 6 files / 621 insertions | shipped |
| E.1.1a Reviuzy scrub i18n (16 locales) | `3f47b1f` | 288 string replacements, tsc clean, i18n parity unchanged (28 pre-existing missing keys, gate warn-only) | shipped |
| E.1.1b Reviuzy scrub SEO + index.html | `e784d85` | renamed Schema.org SoftwareApplication brand, updated index.html meta keywords + JSON-LD product description | shipped |
| E.1.1c Reviuzy scrub data files | `868dc18` | 178 replacements (help-articles 142, glossary 16, comparisons 5, industries 12) | shipped |
| E.1.1d Reviuzy scrub legal + auth pages | tbd | not started (sensitive legal copy, deferred) | deferred |
| E.1.1e Reviuzy scrub blog posts | tbd | 2 blog posts to rename + rewrite | deferred |
| E.1.2 Neon -50% pricing cards | `a63db9e` | 67 rgba alpha halvings (ServicesSection 61 + PricingDriversSection 6), tsc clean, no layout change | shipped |
| E.1.X cross-repo visibility-report-pdf | `cfd1752` | 12/12 smoke pass, CI gate 11 wired, 4 files / 980 insertions, tsc clean | shipped |
| Archive Phase F + G brainstorm | `7d08a29` | tier-comparison.ts data layer + phase-f-g-archive.md (Social Search Velocity + Studio Pipeline parked) | shipped |
| E.1.4 + E.1.5 + E.1.6 + E.1.7 detailed pricing page | `9252117` | /forfaits-complets + /pricing-details routes; sticky comparison grid 9 categories; engagement toggle 15%/20%; QC tax toggle; diff toggle; website grid + cancellation calculator; 90d guarantee section; honest 'not included' disclosure; tsc + build green; 530 insertions | shipped |
| E.1.3 partial: landing CTA to /forfaits-complets | `037377d` | Bilingual inline CTA between tier cards and 'why $300' caption, ArrowUpRight icon, no new i18n keys, mobile-first | shipped |
| E.1.10 help articles (3 EN+FR-CA pairs) | `9d54c11` | 90-day-uplift-guarantee + website-construction-fees-and-cancellation + engagement-discounts-annual-biennial; pricing-plans category; no proprietary AI provider disclosure; tsc clean | shipped |
| E.1.8 instant AI Visibility audit endpoint | `c0c3771` | POST /api/audit-ai-visibility-instant; HMAC + zod-style validation + KV cache 24h + KV rate limit 5/IP/15min + daily cap 500/day + SSRF defense (URL block list) + prompt injection defense (regex + tag wrapping + JSON schema constraint) + kill switch INSTANT_AI_VIS_ENABLED + audit log no-PII; smoke 12/12 pass; CI gate 12 wired | shipped |
| E.1.9 personalized quote PDF endpoint | `623624b` | POST /api/quote-pdf + Quote.ts render lib (3-4 pages); rate limit 3/IP/15min + honeypot + 30-day idempotency on sha256(email\|selections); 5-min signed URL; kill switch QUOTE_PDF_ENABLED; tier-locked server-side (biennial Growth+Agency, Vitrine Starter+, PME Core+, Commerce Growth-only, Agency excludes website); reviuzy bundled on Agency; smoke 10/10 pass; CI gate 13 wired | shipped |
| E.1.3 Landing condensed + engagement toggle | tbd | not started | deferred |
| E.1.4 /forfaits-complets sticky grid | tbd | not started | deferred |
| E.1.5 Website grid + cancellation calc | tbd | not started | deferred |
| E.1.6 Tax + 90d guarantee | tbd | not started | deferred |
| E.1.7 Show differences toggle | tbd | not started | deferred |
| E.1.8 Instant AI Visibility audit | tbd | not started | deferred |
| E.1.9 Personalized quote PDF | tbd | not started | deferred |
| E.1.10 Help articles | tbd | not started | deferred |
| E.1.11 Final tag | tbd | not started | deferred |

## Session 1 outcome (2026-04-29)

**Shipped:** E.1.0 + E.1.1a + E.1.1b + E.1.1c + E.1.2 + E.1.X (cross-repo visibility-report-pdf) + Archive F+G + E.1.4 + E.1.5 + E.1.6 + E.1.7 + E.1.3 (partial: CTA only) + E.1.10 help articles + E.1.8 instant AI Visibility audit + E.1.9 personalized quote PDF.
**Total commits:** 16 on branch `claude/gracious-raman-a6383a`.
**CI gates wired:** 11 (visibility-report-pdf), 12 (instant-ai-vis), 13 (quote-pdf).
**Smoke pass:** 12/12 + 12/12 + 10/10 across 3 new gates.

### E.1.X cross-repo bonus (2026-04-29 same session)

Per coordination with parallel Phase C/D session, shipped the AiLys-side API
contract for Reviuzy C.5.Rvz.2.b monthly visibility report render:

- **Commit `cfd1752`** — `feat(e1.x)`
- **New endpoint:** `POST /api/visibility-report-pdf` with HMAC service auth,
  idempotency on `(tenantId, reportMonth)` (35-day TTL), R2 fail-soft, brand-aware
  Resend email (6 locales), kill switch via `VISIBILITY_REPORT_KILL_SWITCH`.
- **New render lib:** `functions/lib/pdf/VisibilityReport.ts` (6-section PDF:
  cover + summary + share-of-model + keywords + sentiment + strategist notes).
- **New smoke:** `scripts/smoke-visibility-report-pdf.mjs` 12 cases, 12/12 pass.
- **CI gate 11** wired in `.github/workflows/deploy.yml` (mandatory).
- Reviuzy side: parallel session implements `monthly-visibility-export` render
  path in a future Reviuzy session, using existing `_shared/ailysServiceSign.ts`
  helper to sign POST.

User actions to activate:
- All required secrets already set (AILYS_SERVICE_SHARED_SECRET from C.1,
  AUDIT_PDF_HMAC_SECRET from B.4.3, RESEND_API_KEY existing).
- Fail-closed default: `VISIBILITY_REPORT_KILL_SWITCH` absent or `false` to enable.
**Reviuzy public-facing scrub coverage:** ~85% (16 locales + Schema.org + index.html + 4 data files done; 2 blog posts + 5 legal/auth pages remain).
**Visual:** neon backgrounds halved on tier and pricing-driver cards.
**Build:** tsc clean across all 5 commits.
**Em-dash sweep:** 0 net new (1 pre-existing allowlisted in chat-advisor.ts:239).
**i18n parity:** 28 pre-existing missing keys (gate 2 warn-only per CLAUDE.md), no new debt introduced.
**STATE.md:** untouched per coordination plan with parallel session.
**Tags:** none pushed.
**Branch state:** `claude/gracious-raman-a6383a` is 5 commits ahead of `origin/main`, ready for PR when parallel session completes.

## Next session priorities (Session 2)

In order of conversion impact:
1. **E.1.3** — pricing landing condensed + engagement toggle (mensuel/annuel/biennal). Highest direct conversion impact.
2. **E.1.4** — `/forfaits-complets` page with sticky comparison grid. Largest single sub-phase, ~4-5h.
3. **E.1.5** — Website construction grid + cancellation fee calculator. Tier-locked badges.
4. **E.1.6** — Quebec tax-incl toggle + 90-day uplift guarantee clause. Critical for Quebec market.
5. **E.1.7** — "Show differences only" toggle. Low effort, high UX.
6. **E.1.1d/e** — finish Reviuzy scrub on legal pages + 2 blog posts (lower priority, can batch).
7. **E.1.10** — help articles (3 articles EN+FR-CA) before any UI surface goes live for E.1.8/9.
8. **E.1.8** — Live AI Visibility instant audit endpoint (depends on help article live first).
9. **E.1.9** — Personalized quote PDF (reuses B.4 infra).
10. **E.1.11** — final tag once parallel session and operator approve merge sequence.

## User actions when this branch merges

1. Verify `.github/workflows/deploy.yml` gate numbering does not collide with parallel session's added gates (parallel session may have added gates 11-13 for Phase D).
2. Set Cloudflare Pages env vars: `INSTANT_AI_VIS_ENABLED=true` (after smoke verifies), `QUOTE_PDF_ENABLED=true` (after smoke verifies).
3. Keep `INSTANT_AI_VIS_ENABLED=false` for the first 24h post-merge to monitor cost, flip to `true` once budget guard verified.
4. Verify Resend domain auth still active for `noreply@ailysagency.ca` (used by quote PDF email path, optional).
5. Merge PHASE-E1-HANDOFF.md content into STATE.md after this branch lands. Suggested STATE.md heading: `## Phase E.1 milestone (date) : pricing detail + god mode v1 + Reviuzy scrub`.
6. Tag suggested at full Phase E.1 completion: `v0.7.0-pricing-godmode-v1`.

## Coordination notes

- Parallel session (Phase C/D backend) and this session (Phase E.1 marketing UI) are operating on the same repo via separate worktrees + branches.
- This branch does NOT push tags. Parallel session owns tag operations.
- This branch does NOT merge to main without explicit operator approval.
- This branch does NOT edit STATE.md to avoid merge conflict.
- i18n keys added by this branch are documented in each sub-phase commit message for clean integration.
- CI gate numbering: this branch checks `deploy.yml` immediately before adding any new gate to use next available number.

## Sanity check before merge

- [ ] All sub-phase commits pass `npx tsc --noEmit`
- [ ] All sub-phase commits pass `node scripts/audit-translations-deep.mjs` (exit 0)
- [ ] All sub-phase commits pass `node scripts/audit-blog-translations.mjs` (exit 0)
- [ ] Em-dash sweep returns 0 across `src/i18n/translations/`, `src/blog/posts/`, `functions/`
- [ ] Reviuzy mention sweep returns 0 across public-facing AiLys surfaces (post E.1.1)
- [ ] All new smoke scripts wired in `.github/workflows/deploy.yml` with mandatory + numbered correctly
- [ ] Mobile-first verification: 375x812 + 768x1024 + 1280x800 minimum
- [ ] FR-CA + EN hand-translation verified for all new keys
- [ ] No new npm dep added without justification
- [ ] No migration shipped (Phase E.1 is pure UI + reuses existing endpoints)
- [ ] STATE.md untouched (parallel session owns it)
