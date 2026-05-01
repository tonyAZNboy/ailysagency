# Phase E.1 : Pricing detail + god mode v1 + Reviuzy scrub (AiLys side)

**Phase scope:** marketing/conversion overhaul. New `/forfaits-complets` detailed pricing page with sticky comparison grid. Landing `/pricing` condensed. 5 god mode v1 conversion features. Annual 15% / biennial 20% engagement toggle. Website construction recovery fee. Citation engine architecture documented. Reviuzy mentions scrubbed from public AiLys surface.

**Repo:** AiLys (`ailysagency.ca`). Reviuzy backend untouched in this phase.

## Business goal

Lift the conversion rate from `/pricing` landing page from current ~1.8% to target 3.5%+ by:

1. Reducing decision friction (condensed landing + dedicated detailed comparison page)
2. Adding social proof + measurable guarantees (90-day uplift refund clause)
3. Adding instant-gratification tools (live AI Visibility audit, Quebec tax calc, personalized quote PDF)
4. Removing brand confusion (Reviuzy scrub, single AiLys narrative)

## Hours saved at fleet scale (50 clients)

This phase is conversion-focused, not automation-focused. Savings come from:

- Pre-sales call deflection: live AI Visibility audit + Quebec tax calc + diff toggle eliminates ~30 min of "what is X" questions per prospect. At 10 demos/week × 30 min = 5 h/week saved on strategist time = 20 h/month.
- Quote generation: personalized quote PDF (reuses B.4 infra) replaces manual proposal drafting. ~45 min/proposal saved × 8 proposals/week = 6 h/week = 24 h/month.
- Brand consolidation: Reviuzy scrub eliminates 1-2 client confusion calls/week ("c'est quoi reviuzy?") = ~2 h/month saved.

**Total ~46 h/month of strategist time freed.** At $80/h burdened cost = $3,680/month operational saving on top of revenue uplift.

## Who benefits

- **Prospect:** clearer offer, instant tools, no surprises on tax-inclusive pricing.
- **Client (existing):** the same comparison grid lets them upgrade-shop without a sales call.
- **Strategist:** fewer pre-sales calls, less proposal-writing.
- **Anthony (operator):** higher conversion, lower CAC, cleaner brand story.

## Cost estimate per invocation (paid APIs touched)

- **Live AI Visibility audit:** Anthropic Claude Haiku 4.5 ~0.0008-0.0015/audit (1 prospect = 1 invocation, KV-cached 24h on `tenant_url + business_name` key). Budget cap: 200 invocations/day = $0.30/day.
- **Personalized quote PDF:** reuses B.4 infra (`/api/audit-pdf`), pdf-lib in-process, $0 marginal cost.
- **Quebec tax calc:** pure client-side JS, $0.
- **Diff toggle:** pure client-side React state, $0.
- **90-day uplift guarantee:** pure copy + clause, no API.

Total Phase E.1 cost ceiling: <$10/month at fleet scale.

## Why this dep (no new dependencies)

This phase reuses:

- `pdf-lib` (B.4 infra) for quote PDF
- Existing i18n stack (no new translation API)
- Existing `chat-advisor.ts` Anthropic call pattern for AI Visibility audit
- Existing Cloudflare KV for caching
- Existing Tailwind + shadcn/ui for UI
- Existing IntersectionObserver browser API for sticky shadow

**No new npm package.** Per CLAUDE.md hard rule + Section 10 of iso-gsd-delivery.

## Success metrics

Measured 30 days after deploy:

- `/pricing` → checkout conversion ≥ 3.0% (baseline ~1.8%)
- `/forfaits-complets` page average time-on-page ≥ 2 min (qualified intent signal)
- Live AI Visibility audit completion rate ≥ 60% of starts
- Quote PDF download rate ≥ 8% of detail-page visitors
- Pre-sales call volume reduced ≥ 25% per qualified lead
- Zero "c'est quoi reviuzy" support tickets after scrub

## Decisions locked in this phase (per user 2026-04-29)

| # | Decision |
|---|---|
| 1 | Posts GBP quotas: 4/6/8/12 (managed) |
| 2 | Photos GBP: same cadence as posts (4/6/8/12 managed, 6/8/10/12 self-serve, per domain). Client-uploaded photos do not count against AI image quota. |
| 3 | Blog posts (bilingual EN+FR): 2/4/6/8 unique topics per month, each topic published in both EN and FR (so 2 topics = 4 published articles). Max 8/domain Agency to avoid Google thin-content penalty. |
| 4 | Citations: 2/4/6/8 per month, max per domain. |
| 5 | Tier-locked website construction: Vitrine (1-5 pages, $800) eligible Starter+, PME (6-15 pages, $1500) eligible Core+, Commerce (16-25 pages, $3000) Growth-only, Commerce XL (26+, custom) Growth-only, Agency tier excludes website service entirely. |
| 6 | Website cancellation recovery fee: 6-month linear amortization. Formula: `fee = build_cost × (6 − months_paid) / 6`. Zero fee from month 7+. Site remains client property. |
| 7 | Engagement discounts: monthly 0%, annual prepaid 15% all tiers, biennial prepaid 20% Growth+Agency only (Starter/Core not eligible biennial to limit churn-prepay accounting risk). |
| 8 | International add-ons (citations): Pack USA (BrightLocal partnership) +$199/mo per domain, Pack EU +$349/mo per domain. Marked "À venir" in v1. Eligible Growth+Agency by default; if Core requests, charge same price as Growth. |
| 9 | Citation engine: hybrid (Bing Places API + Apple Maps Connect API + Wikidata MediaWiki API direct = 3 free Tier 1 sources, Whitespark Citation Builder API for Tier 2 Canada-focused = ~$3-5/citation pass-through). NO scraping. NO direct Yelp/PJ. |
| 10 | Reviuzy: option (b) cacher + future custom domain `app.ailysagency.ca` (Phase E.2 next session). For E.1: scrub all Reviuzy mentions from `ailysagency.ca` public surface, replace with "AiLys Automation" or "notre plateforme d'automatisation". |
| 11 | i18n: 14 secondary locales kept as placeholder. EN+FR-CA hand-translated. |
| 12 | God mode v1 (this session): live AI Visibility audit, Quebec TPS+TVQ tax calc, personalized quote PDF, "show only differences" toggle on comparison grid, 90-day measurable uplift guarantee clause. God mode v2 (future session): competitor comparator, ROI calc, save/share config URL, Calendly Quebec embed, case studies, live chat pre-sales. |
| 13 | Neon background on pricing cards: reduce opacity/blur by 50%. |
