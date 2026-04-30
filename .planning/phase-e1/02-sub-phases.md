# Phase E.1 : Atomic sub-phases

Each sub-phase = 1 commit, 1 smoke script (or i18n parity check), 1 CI gate. Hour estimate per chunk.

## E.1.0 : GSD planning artefacts + STATE.md (this commit)

**Estimate:** 1.5h
**Deliverable:**
- 5 GSD artefacts in `.planning/phase-e1/` committed
- STATE.md updated with all 13 locked decisions
- No code change yet
**Gates:** 1 (tsc no-op), 13 (STATE same commit). Other gates not applicable yet.

## E.1.1 : Reviuzy scrub on AiLys public surface

**Estimate:** 2-3h
**Deliverable:**
- All `Reviuzy` mentions in `src/i18n/translations/*.ts` replaced with "AiLys Automation" or "notre plateforme d'automatisation" (16 locales)
- `src/blog/posts/ailys-product/ailys-reviuzy-addon-deep-dive.{tsx,fr.tsx}` renamed and rewritten as `ailys-automation-addon-deep-dive.{tsx,fr.tsx}`
- Schema/JSON-LD references updated
- Footer + meta tags scrubbed
- Sitemaps regenerated
**Gates:** 1, 2, 3, 4 (em-dash sweep), 7 (build), 8 (em-dash + Reviuzy grep both = 0 in src/i18n + footer)
**Rollback:** revert commit

## E.1.2 : Reduce neon background opacity 50% on pricing cards

**Estimate:** 30 min
**Deliverable:**
- Find pricing card components: `PricingBuilderSection.tsx`, `PricingDriversSection.tsx`, any `<TierCard>` or similar
- Reduce `from-X-500/40` → `from-X-500/20`, `backdrop-blur-2xl` → `backdrop-blur-xl`, glow shadows halved
- Visual smoke: 375x812 + 768x1024 screenshots before/after
**Gates:** 1, 7, 9 (browser preview)
**Rollback:** revert commit

## E.1.3 : Pricing landing condensed + comparison CTA link

**Estimate:** 2-3h
**Deliverable:**
- Reduce `/pricing` (or `Index.tsx` pricing section) bullets to 5-7 differentiation points per tier
- Add prominent "Voir la grille comparative complète (60+ features) →" CTA below tier cards
- Add engagement toggle (mensuel / annuel -15% / biennal -20%) at top of pricing section
- Engagement toggle: biennial only enabled for Growth + Agency, disabled tooltip for Starter/Core
- Tier price recomputes live based on selected engagement
**Gates:** 1, 2 (i18n parity for new keys), 3, 4, 7, 8, 9 (browser 375x812 + 768x1024), 10 (FR-CA verified)
**i18n keys added (~12 keys):** engagementMonthly, engagementAnnual, engagementBiennial, engagementSavingsAnnual, engagementSavingsBiennial, engagementBiennialOnlyGrowthAgency, viewFullComparisonCTA, viewFullComparisonSubtext, etc.
**Rollback:** revert commit

## E.1.4 : `/forfaits-complets` page skeleton + sticky comparison grid

**Estimate:** 4-5h
**Deliverable:**
- New route `/forfaits-complets` (FR canonical) with EN alias `/pricing-details`
- New page component `src/pages/PricingDetails.tsx`
- Hero compact + engagement toggle + Reviuzy add-on toggle (renamed "AiLys Automation +100$/mo")
- Sticky comparison grid (`<TierComparisonTable>` component), 60+ feature rows in 7 collapsible categories
- Sticky behavior: `position: sticky; top: 0; z-index: 30`, shadow on scroll detected via IntersectionObserver
- Mobile (375x812): horizontal swipe with scroll-snap, sticky tier nav pill at top
- Recommended tier (Core) badge "POPULAIRE" + subtle background tint
- "Choisir ce forfait" CTA per column
**Gates:** 1, 2, 3, 4, 7, 8, 9 (375 + 768 + 412 + 1024 viewports tested), 10 (FR-CA + EN)
**i18n keys added (~80-100 keys):** all tier features rows, category headers, CTAs, badges
**Rollback:** revert commit

## E.1.5 : Website construction grid + cancellation fee calculator

**Estimate:** 2h
**Deliverable:**
- 3 cards (Vitrine 800$ / PME 1500$ / Commerce 3000$+) under `/forfaits-complets`
- Tier minimum required badge per card (Vitrine: Starter+, PME: Core+, Commerce: Growth-only)
- Mini interactive calculator: slider 0-7 months → displays cancellation fee
- Formula: `fee = build_cost × max(0, (6 − months_paid)) / 6`
- Section "Ce qui n'est PAS inclus" honest disclosure (link-building actif, Wikipedia editing, journalist outreach)
**Gates:** 1, 2, 3, 4, 7, 8, 9, 10
**i18n keys added (~30 keys)**
**Rollback:** revert commit

## E.1.6 : Quebec tax-inclusive price toggle + 90-day uplift guarantee clause

**Estimate:** 1.5h
**Deliverable:**
- Toggle "Prix avec/sans taxes (TPS+TVQ)" affecting all displayed prices
- Formula: `tax_inclusive = base × 1.14975`
- Display all prices both ways with toggle, remember preference in localStorage
- New section "Garantie 90 jours" with measurable clause text:
  > "Si votre Share of Model n'augmente pas d'au moins 15 points en 90 jours sur Core, Growth ou Agency, nous remboursons 100% des 3 derniers mois facturés."
- Eligible plans badge on Core, Growth, Agency tiers
**Gates:** 1, 2, 3, 4, 7, 8, 9, 10
**i18n keys added (~15 keys)**
**Rollback:** revert commit

## E.1.7 : "Show only differences" toggle on comparison grid

**Estimate:** 1h
**Deliverable:**
- Toggle button above grid: "Afficher uniquement les différences"
- When enabled, hide rows where all 4 tiers have the same value (~30 of 60 rows)
- Pure client-side state, no persistence required
**Gates:** 1, 2, 3, 4, 7, 9
**i18n keys added (3 keys):** showDifferencesOnly, showAllRows, differencesHelpText
**Rollback:** revert commit

## E.1.8 : Live AI Visibility instant audit endpoint + UI

**Estimate:** 4-5h
**Deliverable:**
- New endpoint `functions/api/audit-ai-visibility-instant.ts`
- Zod validation, KV rate limit (5/IP/15min), KV cache 24h, kill switch, audit log
- New UI component `<InstantAiVisibilityAudit>` on `/forfaits-complets` hero
- Inputs: business name + URL + locale dropdown
- Submit → loading state 8-12s → score card (0-100) + 3 bullets "ce qui manque"
- CTA after result: "Réservez un audit complet pour 0$" → BookCall page
- New smoke script: `scripts/smoke-instant-ai-vis.mjs` (~12 cases: validation, kill switch, rate limit, prompt injection, SSRF attempt, cache hit/miss)
- Wired into deploy.yml as CI gate 11
**Gates:** all 1-12 + new gate 11 (smoke instant-ai-vis)
**Env var required:** `INSTANT_AI_VIS_ENABLED=true`, `ANTHROPIC_API_KEY` (existing)
**Rollback:** flip env var to false (fail-closed) + revert commit

## E.1.9 : Personalized quote PDF (reuses B.4 infra)

**Estimate:** 3h
**Deliverable:**
- Extend `functions/api/audit-pdf.ts` to handle new `payload_type: 'quote_pdf'`
- Synthesize 4-page quote PDF: cover (prospect name + tier) + tier breakdown + total monthly tax-incl + signature line + 30-day validity + AiLys footer
- Reuse existing HMAC signing, R2 storage fallback, Resend email path
- New smoke script: `scripts/smoke-quote-pdf.mjs` (~10 cases: pdf-lib round-trip, total computation correctness, tax-inclusive, biennial discount, fail-closed without env)
- Wired into deploy.yml as CI gate 12
**Gates:** all 1-12 + new gate 12 (smoke quote-pdf)
**Rollback:** revert commit

## E.1.10 : Help center articles EN + FR-CA

**Estimate:** 2h
**Deliverable:**
- 3 new articles in `src/blog/posts/help-articles/` or `src/help/`:
  - `instant-ai-visibility-score-explained.{tsx,fr.tsx}`
  - `90-day-uplift-guarantee.{tsx,fr.tsx}`
  - `website-construction-fees-and-cancellation.{tsx,fr.tsx}`
- Each ~600-1000 words EN + FR-CA hand-translated
- No proprietary AI provider/model/scoring/API disclosure
- Sitemaps regenerated
**Gates:** 1, 2, 3 (blog audit), 4 (em-dash), 7
**Rollback:** revert commit

## E.1.11 : Final STATE.md update + tag

**Estimate:** 30 min
**Deliverable:**
- STATE.md updated with all sub-phase commit hashes, smoke pass counts, user actions pending
- Tag `v0.7.0-pricing-detail-godmode-v1` if all sub-phases shipped, or `v0.6.2-phase-e1-partial` if partial
- Push to GitHub

## Total estimate

22-28h. Optimistic single-session = 12-14h (sub-phases E.1.0 through E.1.5 minimum).

## Time-box per Section 11

If E.1.x exceeds 2× estimate, STOP and re-spec. Do not merge half-finished feature.

**Realistic single-session cap (Opus 4.7 1M context):** sub-phases E.1.0, E.1.1, E.1.2, E.1.3 minimum (8-10h cumulative). E.1.4 onwards in subsequent sessions.

## Future phases (next sessions)

- **Phase E.2:** Reviuzy custom domain `app.ailysagency.ca` (Reviuzy repo, 7-10h)
- **Phase E.3:** GBP self-serve toggle + quota system (14-18h, AiLys + Reviuzy)
- **Phase E.4:** Citation engine v1 (24-32h, Bing + Apple + Wikidata + Whitespark)
- **Phase E.5:** God mode v2 (competitor comparator, ROI calc, save/share, Calendly, case studies, live chat pre-sales) (8-10h)
- **Phase E.6:** International add-ons (BrightLocal USA + Marquant EU) (12-16h)
