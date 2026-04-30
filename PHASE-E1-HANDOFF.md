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

## Sub-phases shipped this branch (will be filled as commits land)

| Sub-phase | Commit hash | Smoke pass | CI gate | Live curl proof | Status |
|---|---|---|---|---|---|
| E.1.0 GSD planning | (pending) | n/a | n/a | n/a | pending commit |
| E.1.1 Reviuzy scrub | tbd | tbd | tbd | tbd | not started |
| E.1.2 Neon -50% | tbd | tbd | tbd | tbd | not started |
| E.1.3 Landing condensed | tbd | tbd | tbd | tbd | not started |
| E.1.4 /forfaits-complets | tbd | tbd | tbd | tbd | not started |
| E.1.5 Website grid | tbd | tbd | tbd | tbd | not started |
| E.1.6 Tax + guarantee | tbd | tbd | tbd | tbd | not started |
| E.1.7 Diff toggle | tbd | tbd | tbd | tbd | not started |
| E.1.8 Instant AI audit | tbd | tbd | tbd | tbd | not started |
| E.1.9 Quote PDF | tbd | tbd | tbd | tbd | not started |
| E.1.10 Help articles | tbd | tbd | tbd | tbd | not started |
| E.1.11 Final tag | tbd | tbd | tbd | tbd | not started |

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
