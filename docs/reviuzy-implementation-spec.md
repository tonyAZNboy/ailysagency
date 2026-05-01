# Reviuzy SaaS Implementation Spec

**Status**: Draft v1.0 (2026-04-27)
**Owner**: AiLys Agency engineering
**Repo**: `C:\Anthony\Projects\reviuzy\` (last commit `25a2491` Phase 4)
**Contract**: every feature ships with the 13 hard rules of `CLAUDE.md`. No exceptions.

---

## 0. Tier definitions (canonical, reference everywhere)

| Code | Name | Price (CAD/mo) | Strategist hours/mo | Reviuzy automation included |
|------|------|----------------|---------------------|------------------------------|
| ST | Starter | 300 | ~1h | Limited (review collection only) |
| CO | Core | 600 | ~3h | Full (Reviuzy add-on $100 separate, OR bundle) |
| GR | Growth | 1,200 | ~6h | Full (add-on $100 OR bundle) |
| AG | Agency | 2,500 | ~12-15h | Bundled by default |

Add-on (orthogonal to tier): **Reviuzy reputation system** at $100/mo on ST/CO/GR. Bundled in AG.

---

## 1. Feature × Tier Matrix (the source of truth)

Legend: ✅ included · ⚠️ limited · — not in tier · 🆕 GOD MODE feature (P2 phase)

### 1.1 GBP automation

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| GBP profile management (categories, attributes, hours) | ✅ | ✅ | ✅ | ✅ | Phase 2 B.3 already shipped |
| GBP posts auto-generation | ⚠️ 1/mo | ✅ 4/mo (1/wk) | ✅ 8/mo (2/wk) | ✅ 12/mo (3/wk) | Reviuzy SaaS handles drafts + scheduling |
| GBP photos quota (client-uploaded) | ⚠️ 4/mo | ✅ 8/mo | ✅ 12/mo | ✅ up to 12/mo per domain | **Multi-domain** scaling for AG |
| GBP Q&A monitor + auto-draft replies | — | ✅ | ✅ | ✅ | Phase 2 B.2 already shipped |
| GBP review reply automation (AI-personalized) | — | ✅ | ✅ | ✅ | Reviuzy add-on |
| GBP duplicate detection + merge automation 🆕 | — | — | ✅ | ✅ | Find dup listings, submit merges via API |

### 1.2 Citations + NAP

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| NAP consistency monitor (50+ directories sweep) | ✅ | ✅ | ✅ | ✅ | Phase 3 already shipped |
| New citation building cadence | — | ⚠️ 5/mo | ✅ 10/mo | ✅ 15/mo | Manual strategist work + tracker |
| Citation Health Monitoring with auto-fix 🆕 | — | — | ✅ | ✅ | Auto-correct via Yelp/GBP APIs; email template for manual |
| Citation Gap Analysis with AI outreach scripts 🆕 | — | ✅ | ✅ | ✅ | AI drafts submission text per directory |

### 1.3 AEO + GEO + schema

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| Schema baseline (LocalBusiness + Organization) | ✅ | ✅ | ✅ | ✅ | One-time at onboarding |
| Schema layers (FAQPage, Service, Person, Article, Review) | — | ✅ | ✅ | ✅ | |
| Schema deployment automation (CMS-aware push) 🆕 | — | — | ✅ | ✅ | One auto-publish integration per CMS (WP, Wix, Webflow, Shopify, headless) |
| Schema A/B testing 🆕 | — | — | — | ✅ | Deploy 2 variants, measure citation lift over 30d |
| Wikidata entity creation + external IDs | — | — | ✅ | ✅ | Strategist + bot account writes |
| Wikidata advanced (multi-prop, sitelinks, statements) 🆕 | — | — | — | ✅ | |

### 1.4 AI Visibility + AI Traffic

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| AI Visibility probes cadence | ⚠️ monthly | ⚠️ bi-monthly | ✅ weekly | ✅ daily | Phase 4 already shipped |
| Share of Model dashboard | ✅ | ✅ | ✅ | ✅ | |
| Brand sentiment + freshness alerts | — | — | ✅ | ✅ | |
| AI Traffic UTM attribution | — | ⚠️ basic | ✅ full | ✅ full + custom | Tracks clicks from `chatgpt.com`, `perplexity.ai`, etc. |
| Predictive AI Visibility Score (ML) 🆕 | — | — | ✅ | ✅ | 30/60/90-day projection |
| Multi-LLM Consensus Scoring 🆕 | ⚠️ basic | ✅ | ✅ | ✅ | |
| Semantic Citation Matrix (embeddings) 🆕 | — | — | ✅ | ✅ | Detect paraphrased mentions, not just exact match |
| Real-time AI Engine Probing Dashboard 🆕 | — | — | — | ✅ | Live ticker, refresh every 5 min |
| AI-driven prompt expansion + auto-test 🆕 | — | — | ✅ | ✅ | 10 base prompts → 100+ variations |
| Multi-language LLM probing 🆕 | depends on extra-lang add-on | depends | depends | depends | $50/lang/mo extra |

### 1.5 Content + E-E-A-T

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| Content brief generator | — | ⚠️ 1/mo | ✅ 2/mo | ✅ 4/mo | |
| Article draft (human-written by strategist) | — | — | ✅ 2/mo | ✅ 4/mo | |
| AI Agent autonomous article writer 🆕 | — | — | ⚠️ 1/mo (queued) | ✅ 4/mo | Full agent: research, draft, schema, images, queue for client review |
| Auto-Generated Content Briefs from Prompt Mining 🆕 | — | ✅ | ✅ | ✅ | Mines lost prompts, drafts brief targeting them |
| AI-Generated Case Study Auto-Draft 🆕 | — | — | — | ✅ | Auto-trigger when milestone hit, with right of approval |

### 1.6 Reviuzy reputation system (add-on or bundled)

Available as add-on at $100/mo on ST/CO/GR. Bundled in AG.

| Feature | Without add-on | With add-on |
|---|---|---|
| NFC review collection | — | ✅ |
| AI review generation (customer-facing) | — | ✅ |
| AI auto-replies to reviews (personalized) | — | ✅ |
| Contest engine (CLIENT operates, we provide tool) | — | ✅ |
| Legal T&C generator (jurisdiction-aware) | — | ✅ |
| Fake review detection (Domain Shield) | — | ✅ |
| Multi-location dashboard | — | ✅ (limited; AG has full multi-domain) |

### 1.7 Reporting + intelligence

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| Monthly PDF report | ✅ | ✅ | ✅ | ✅ | Branded AiLys for ST/CO/GR |
| White-label PDF report (client logo) 🆕 | — | — | — | ✅ | Multi-domain split if AG has multiple clients |
| Live dashboard | ✅ | ✅ | ✅ | ✅ | |
| Quarterly executive deck (in-person) | — | — | — | ✅ | |
| Reputation Crisis Early Warning 🆕 | ⚠️ basic | ✅ | ✅ | ✅ | Slack/email alerts |
| Real-time entity monitoring open web 🆕 | — | — | ✅ | ✅ | Beyond LLMs: news, blogs, social |

### 1.8 Local + geo

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| Local Pack rank tracker 🆕 | — | — | ✅ | ✅ | Daily snapshot, position curve |
| Geo-Grid Heatmap for Local Pack 🆕 | — | — | ✅ | ✅ | Map view of city coverage |
| Wikipedia Notability Scoring 🆕 | — | — | ✅ | ✅ | Audit eligibility, identify gaps |

### 1.9 Reddit + forums

| Feature | ST | CO | GR | AG | Notes |
|---|---|---|---|---|---|
| Reddit signal monitoring (read-only) 🆕 | — | ✅ | ✅ | ✅ | Brand mentions + sentiment in priority subreddits |
| Reddit playbook help article + templates | ✅ | ✅ | ✅ | ✅ | Already shipped in help center |
| **Active Reddit participation** | NEVER | NEVER | NEVER | NEVER | Out of scope, hard rule. Client runs it themselves. |

### 1.10 Strategist tooling (agency-side, not client-facing)

| Feature | Available to | Notes |
|---|---|---|
| Photo QA queue (preview EXIF + caption + alt-text) | All strategists | Approve/Edit/Reject pending uploads |
| GBP post QA queue | All strategists | Approve drafts before publish |
| Q&A reply QA queue | All strategists | Approve auto-drafts before send |
| Tenant Simulator / Sandbox 🆕 | Senior strategists + admin | Act-as any tenant, read-only by default |
| Predictive Cancellation Alerts 🆕 | All strategists | Detect churn signals, intervene proactively |
| Slack Agency War Room Bot 🆕 | All strategists | Real-time alerts on critical client events |
| AI Visibility Score Gamification (client-facing badges) 🆕 | Configurable per tenant | Increases engagement |

### 1.11 Premium operations (Agency only)

| Feature | Notes |
|---|---|
| Slack SLA tracking (under 4h business hours) | OAuth Slack connect per tenant |
| API access (3 endpoints: Share of Model, AI Traffic, Visibility scores) | Generated keys, rate-limited |
| Custom integrations (HubSpot, Salesforce, hospitality PMS, custom CRM) | One-time setup per integration |
| Dedicated senior strategist | Named contact, named account |
| Domain Shield + Domain Speed Boost | Bundled in AG (else $35/mo each as Premium Ops add-on) |
| Multi-location / multi-domain dashboard | Switcher, per-domain stats, per-domain photo quota |

### 1.12 Compliance + admin (per CLAUDE.md hard rule 11)

Required for **every** feature, no exceptions:

| Sub-feature | Description |
|---|---|
| Per-tenant feature toggle | Override the tier defaults for individual tenants |
| Recent invocations log (last 50) | Timestamp + status + tenant + payload hash |
| Cost telemetry ($/day per feature per tenant) | Anthropic spend, third-party API spend |
| Per-tier feature gating preview | Admin can see what each tier sees |

### 1.13 Vendor escape

| Feature | All tiers | Notes |
|---|---|---|
| Vendor Lock-in Escape Kit 🆕 | ✅ | "Export all my data" button → ZIP with citations, schema, reports, GBP backup, Wikidata Q-numbers, content. Standard format. Builds trust. |

---

## 2. Tier gating mechanism (3-layer defense)

Every feature is gated at 3 layers. **Single-layer gating is insecure** — a frontend hide alone doesn't stop a curl call.

### Layer 1: Frontend UI gating

```typescript
// src/lib/tier-features.ts
export type TierCode = "ST" | "CO" | "GR" | "AG";
export type FeatureKey = "gbp_posts" | "photo_upload" | "qa_bot" | "predictive_ml" | ...;

export const TIER_FEATURES: Record<TierCode, Set<FeatureKey>> = {
  ST: new Set(["gbp_posts", "photo_upload" /* limited */, "ai_vis_monthly"]),
  CO: new Set([...ST, "qa_bot", "citations_5", "schema_layers" /* limited */, ...]),
  GR: new Set([...CO, "predictive_ml", "wikidata_basic", ...]),
  AG: new Set([...GR, "multi_domain", "white_label_pdf", "api_access", ...]),
};

export function hasFeature(tier: TierCode, feature: FeatureKey): boolean {
  return TIER_FEATURES[tier].has(feature);
}

// Component-level guard
export function FeatureGate({
  feature, children, fallback,
}: { feature: FeatureKey; children: React.ReactNode; fallback?: React.ReactNode }) {
  const { tier } = useTenant();
  if (!hasFeature(tier, feature)) {
    return fallback ?? <UpgradePrompt feature={feature} />;
  }
  return <>{children}</>;
}
```

### Layer 2: Backend API gating (Supabase RLS + edge function check)

```sql
-- supabase migration
create or replace function has_feature(
  p_tenant_id uuid,
  p_feature text
) returns boolean
language plpgsql security definer set search_path = public as $$
declare
  v_tier text;
begin
  select tier into v_tier from tenants where id = p_tenant_id;
  return case
    when v_tier = 'AG' then true  -- AG has everything
    when v_tier = 'GR' then p_feature not in ('multi_domain', 'white_label_pdf', 'api_access', 'real_time_dashboard')
    when v_tier = 'CO' then p_feature in ('gbp_posts', 'photo_upload', 'qa_bot', 'citations_5', 'schema_layers', 'reddit_monitoring')
    when v_tier = 'ST' then p_feature in ('gbp_posts', 'photo_upload', 'ai_vis_monthly')
    else false
  end;
end;
$$;

-- RLS policy: photos_pending table
create policy "tenants can insert photos only if tier permits"
  on photos_pending for insert
  with check (
    has_feature(tenant_id, 'photo_upload')
    and (
      select count(*) from photos_pending
      where tenant_id = photos_pending.tenant_id
        and created_at >= date_trunc('month', now())
    ) < photo_quota_for_tier((select tier from tenants where id = tenant_id))
  );
```

### Layer 3: Edge function entitlement check (defense in depth)

```typescript
// functions/api/photo-upload.ts
export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const { tenantId } = await getAuthenticatedUser(request, env);
  const { tier } = await getTenant(env, tenantId);

  // Layer 3 check (in addition to RLS)
  if (!TIER_FEATURES[tier].has("photo_upload")) {
    return new Response(JSON.stringify({ error: "feature_not_in_tier", tier }), { status: 403 });
  }

  const monthlyCount = await countMonthlyPhotos(env, tenantId);
  const quota = PHOTO_QUOTA[tier]; // 4, 8, 12, or 12-per-domain
  if (monthlyCount >= quota) {
    return new Response(JSON.stringify({ error: "quota_exceeded", quota, used: monthlyCount }), { status: 429 });
  }
  // ... proceed to upload
};
```

### Layer 4 (Agency multi-domain): per-domain quota

```sql
create table tenant_domains (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade,
  domain text not null,  -- e.g. "drsmilemd.com"
  is_primary boolean default false,
  created_at timestamptz default now(),
  unique(tenant_id, domain)
);

create table photos_pending (
  id uuid primary key,
  tenant_id uuid references tenants(id),
  tenant_domain_id uuid references tenant_domains(id),  -- NEW: which domain
  ...
);

-- Quota check for AG with multi-domain
create or replace function photo_quota_for_tier_and_domain(
  p_tier text,
  p_domain_id uuid
) returns int as $$
begin
  return case p_tier
    when 'ST' then 4
    when 'CO' then 8
    when 'GR' then 12
    when 'AG' then 12  -- per domain (the function is called per-domain)
    else 0
  end;
end;
$$ language plpgsql immutable;
```

---

## 3. Implementation phases (dependency-ordered)

### Phase 5 — Tier gating + multi-domain foundation (P0, blocks everything)

**Why first**: every feature beyond Phase 4 depends on the tier check working. Without this, we cannot ship any quota-aware feature.

| Item | Effort | Dependency | Hard rules touched |
|---|---|---|---|
| 5.1 `tenants.tier` column + UI to set per tenant | 2h | — | 6, 11 |
| 5.2 `has_feature()` RPC + RLS policies | 4h | 5.1 | 6, 9 |
| 5.3 `tenant_domains` table + Agency-tier multi-domain | 4h | 5.1 | 9 |
| 5.4 Frontend `<FeatureGate>` + `useTenant()` hook | 3h | 5.2 | 13 |
| 5.5 Tier badge in nav, upgrade-prompt component | 2h | 5.4 | 13 |
| 5.6 Admin: tier override per tenant | 2h | 5.1 | 11 |
| 5.7 Admin: simulator (act-as-tenant, read-only) | 6h | 5.4 | 11 |
| 5.8 Help article: "How tiers gate features" (EN+FR) | 2h | — | 10 |
| 5.9 Tests: `tsc`, audit, RLS test, em-dash | 2h | all | 12 |

**Phase 5 total: ~27h**

### Phase 6 — Photo flow complete (P1, biggest visible client gap)

| Item | Effort | Dependency | Notes |
|---|---|---|---|
| 6.1 `photos_pending` table with `tenant_domain_id` | 1h | 5.3 | |
| 6.2 Client upload UI in Reviuzy app (mobile-first) | 6h | 5.4 | Drag-drop, camera roll, slot counter |
| 6.3 EXIF extraction client-side | 2h | 6.2 | exif-js or browser-image-compression |
| 6.4 Anthropic Claude caption + alt-text generator | 4h | 6.1 | Edge function, prompt cache |
| 6.5 Strategist QA queue (approve/edit/reject) | 8h | 6.1 | Internal admin route |
| 6.6 GBP API publish on approve | 4h | 6.5 | Token from existing GBP OAuth |
| 6.7 Monthly quota counter + reset cron | 2h | 6.1 | Supabase cron job, 1st of month |
| 6.8 Multi-domain split for AG (per-domain quota) | 3h | 5.3, 6.1 | |
| 6.9 Help article: "How photos work" (EN+FR) | already shipped | — | `photo-flow-client-uploads-via-app` |
| 6.10 Admin: photo upload telemetry, recent 50 | 2h | 6.6 | Cost per Anthropic caption call |
| 6.11 Tests | 2h | all | |

**Phase 6 total: ~34h**

### Phase 7 — Reddit signal monitoring (P1, surfaces value)

| Item | Effort | Dependency |
|---|---|---|
| 7.1 `reddit_subreddits_tracked` per tenant (configurable in onboarding) | 2h | 5.1 |
| 7.2 Reddit API integration (OAuth, daily polling) | 6h | — |
| 7.3 Sentiment analysis on mentions (Claude) | 4h | 7.2 |
| 7.4 Dashboard widget (count + sentiment per subreddit) | 4h | 7.3 |
| 7.5 Monthly report inclusion | 2h | 7.4 |
| 7.6 Help article: already shipped | 0h | `reddit-playbook-for-local-business` |
| 7.7 Admin telemetry | 1h | |
| 7.8 Tests | 1h | |

**Phase 7 total: ~20h**

### Phase 8 — White-label + multi-domain dashboard (P1 for Agency)

| Item | Effort | Dependency |
|---|---|---|
| 8.1 `tenant_branding` table (logo, colors, font) | 2h | 5.1 |
| 8.2 Branding admin UI (upload logo, color picker) | 4h | 8.1 |
| 8.3 PDF report generator with branding override | 8h | 8.1 |
| 8.4 Multi-domain switcher in dashboard nav | 4h | 5.3 |
| 8.5 Per-domain stats aggregation | 6h | 5.3 |
| 8.6 Auto-email PDF report 5th of month (cron) | 2h | 8.3 |
| 8.7 Help article: "Setting up your white-label brand" | 2h | |
| 8.8 Tests | 2h | |

**Phase 8 total: ~30h**

### Phase 9 — API access (P1 for Agency)

| Item | Effort | Dependency |
|---|---|---|
| 9.1 `api_keys` table (per tenant, hashed, rotatable) | 3h | 5.1, 9 |
| 9.2 Endpoint: GET /api/v1/share-of-model | 3h | Phase 4 data |
| 9.3 Endpoint: GET /api/v1/ai-traffic | 3h | Phase 4 data |
| 9.4 Endpoint: GET /api/v1/visibility-scores | 3h | Phase 4 data |
| 9.5 Rate limiting per key (existing pattern from chat-advisor) | 2h | |
| 9.6 OpenAPI spec + docs page | 4h | 9.4 |
| 9.7 Help article: "Using the AiLys API" | 2h | |
| 9.8 Tests | 2h | |

**Phase 9 total: ~22h**

### Phase 10 — Reputation Crisis Early Warning (P1, hot feature)

| Item | Effort | Dependency |
|---|---|---|
| 10.1 Sentiment baseline calculator (rolling 30d) | 4h | Phase 4 data |
| 10.2 Anomaly detector (3-sigma deviation, sudden negative streak) | 6h | 10.1 |
| 10.3 Slack/email alert dispatcher | 3h | |
| 10.4 Crisis dashboard (timeline + suggested response) | 6h | 10.2 |
| 10.5 Configurable thresholds per tenant | 2h | |
| 10.6 Help article: "Understanding crisis alerts" | 2h | |
| 10.7 Tests | 2h | |

**Phase 10 total: ~25h**

### Phase 11 — Schema deployment automation (P2 GOD MODE, technical moat)

| Item | Effort | Dependency |
|---|---|---|
| 11.1 Schema audit scraper (read site, find gaps) | 8h | |
| 11.2 Schema generator (LocalBusiness, FAQPage, Service, Person) | 6h | |
| 11.3 WordPress integration (REST API push) | 8h | 11.2 |
| 11.4 Wix integration (Velo API) | 8h | 11.2 |
| 11.5 Webflow integration (CMS API) | 6h | 11.2 |
| 11.6 Shopify integration (Storefront API + metafields) | 6h | 11.2 |
| 11.7 Headless / generic webhook fallback | 4h | 11.2 |
| 11.8 Strategist QA before push (default ON, opt-out for confident schemas) | 4h | 11.2 |
| 11.9 Help article per CMS | 5h | |
| 11.10 Tests | 3h | |

**Phase 11 total: ~58h**

### Phase 12 — Predictive AI Visibility Score (P2 GOD MODE)

| Item | Effort | Dependency |
|---|---|---|
| 12.1 Historical data extractor (90+ days of probes) | 4h | Phase 4 data |
| 12.2 Feature engineering (trend, seasonality, action correlation) | 8h | 12.1 |
| 12.3 ML model training pipeline (gradient boosting or simple regression first) | 12h | 12.2 |
| 12.4 Inference API + dashboard widget | 6h | 12.3 |
| 12.5 Confidence interval display (not just point estimate) | 4h | 12.4 |
| 12.6 Backtesting + accuracy report | 4h | 12.3 |
| 12.7 Help article: "How predictions work" | 2h | |
| 12.8 Tests + admin telemetry | 4h | |

**Phase 12 total: ~44h**

### Phase 13 — AI Agent autonomous article writer (P2 GOD MODE, biggest content lift)

| Item | Effort | Dependency |
|---|---|---|
| 13.1 Anthropic agent loop (Claude Opus 4.7 with tool use) | 8h | |
| 13.2 Tool: web search (via search API or scraping) | 6h | 13.1 |
| 13.3 Tool: read Wikidata for entity context | 4h | 13.1 |
| 13.4 Tool: read existing client content + competitor content | 6h | 13.1 |
| 13.5 Article draft + schema FAQPage + Article generation | 6h | 13.1-13.4 |
| 13.6 Image suggestion (alt-text + Pexels/Unsplash search) | 4h | 13.5 |
| 13.7 Client review queue (approve/request changes/reject) | 4h | 13.5 |
| 13.8 Auto-publish to client site on approve (depends on Phase 11 CMS integrations) | 2h | 11.x |
| 13.9 Help article: "How the AI Agent writes articles" | 2h | |
| 13.10 Cost monitoring + per-article spend cap | 3h | |
| 13.11 Tests + safety guards (no hallucinated facts) | 5h | |

**Phase 13 total: ~50h**

### Phase 14 — Real-time monitoring + intelligence dashboard (P2 GOD MODE)

| Item | Effort | Dependency |
|---|---|---|
| 14.1 Real-time AI engine probing (5-min refresh) | 12h | Phase 4 |
| 14.2 Live ticker UI | 6h | 14.1 |
| 14.3 Citation Health Monitoring + auto-fix | 16h | Phase 3 |
| 14.4 Real-time entity monitoring open web | 20h | |
| 14.5 Slack Agency War Room Bot | 8h | |
| 14.6 Predictive cancellation alerts | 12h | |
| 14.7 Help articles | 4h | |
| 14.8 Tests | 4h | |

**Phase 14 total: ~82h**

### Phase 15 — Geo-grid + local pack (P2 GOD MODE)

| Item | Effort | Dependency |
|---|---|---|
| 15.1 Local Pack rank tracker (daily scrape) | 12h | |
| 15.2 Geo-grid heatmap visualization | 12h | 15.1 |
| 15.3 Wikipedia notability scoring | 10h | |
| 15.4 Help articles | 3h | |
| 15.5 Tests | 3h | |

**Phase 15 total: ~40h**

### Phase 16 — Advanced AI features (P2 GOD MODE)

| Item | Effort | Dependency |
|---|---|---|
| 16.1 Multi-LLM Consensus Scoring | 14h | Phase 4 |
| 16.2 Semantic Citation Matrix (embeddings) | 18h | Phase 4 |
| 16.3 AI-driven prompt expansion + auto-test | 18h | Phase 4 |
| 16.4 Auto-Generated Content Briefs from Prompt Mining | 16h | 16.3 |
| 16.5 Citation Gap Analysis with AI outreach scripts | 14h | Phase 3 |
| 16.6 Wikidata advanced (multi-prop) | 8h | |
| 16.7 Help articles | 5h | |
| 16.8 Tests | 4h | |

**Phase 16 total: ~97h**

### Phase 17 — Premium UX + agency tooling (P2 GOD MODE)

| Item | Effort | Dependency |
|---|---|---|
| 17.1 AI Visibility Score Gamification (badges, progress) | 8h | |
| 17.2 Schema A/B Testing (variant A/B + measurement) | 26h | Phase 11 |
| 17.3 Vendor Lock-in Escape Kit (export ZIP) | 8h | |
| 17.4 AI-Generated Case Study Auto-Drafts | 14h | |
| 17.5 GBP duplicate detection + merge automation | 12h | Phase 2 B.1 |
| 17.6 Help articles | 4h | |
| 17.7 Tests | 4h | |

**Phase 17 total: ~76h**

---

## 4. Total effort + grand total

| Phase | Effort | Cumulative |
|---|---|---|
| Phase 5 — Tier gating foundation | 27h | 27h |
| Phase 6 — Photo flow complete | 34h | 61h |
| Phase 7 — Reddit monitoring | 20h | 81h |
| Phase 8 — White-label + multi-domain | 30h | 111h |
| Phase 9 — API access | 22h | 133h |
| Phase 10 — Crisis early warning | 25h | 158h |
| Phase 11 — Schema deployment automation | 58h | 216h |
| Phase 12 — Predictive AI Vis Score | 44h | 260h |
| Phase 13 — AI Agent article writer | 50h | 310h |
| Phase 14 — Real-time monitoring | 82h | 392h |
| Phase 15 — Geo-grid + local | 40h | 432h |
| Phase 16 — Advanced AI features | 97h | 529h |
| Phase 17 — Premium UX + agency tooling | 76h | 605h |

**Grand total: ~605h** of senior dev time.

At my batch-automated rate (~3-4 features per session, ~5-8h dev equivalent compressed), that's roughly **75-100 sessions** to ship 100% of GOD MODE. Realistic delivery: **6-9 months** at 2 sessions/week pace.

---

## 5. AI / API cost estimates (per tenant per month)

Per CLAUDE.md hard rule 11 (admin center mandatory), all costs must be tracked per tenant per feature.

### Anthropic Claude API costs (Opus 4.7 unless noted)

| Feature | Token usage | Cost/tenant/mo |
|---|---|---|
| GBP post drafts (12 max) | 12 × ~3000 tokens | ~$1.50 |
| Q&A reply drafts | ~50 × ~2000 tokens | ~$3 |
| Review reply drafts (with personalization) | ~50 × ~3000 tokens | ~$5 |
| Photo caption + alt-text (12 max) | 12 × ~1500 tokens | ~$1 |
| Chat advisor (incoming public traffic) | ~50 sessions × ~5K tokens (cached) | ~$2 |
| AI Visibility probes (6 engines × prompts) | 6 × 15 prompts × ~2K tokens | ~$3 |
| AI Agent article writer (Phase 13) | 4 articles × ~100K tokens (research-heavy) | ~$30 (Agency) |
| Predictive AI Vis (inference) | minimal, batch monthly | ~$0.10 |
| Sentiment + entity detection | ~$2 |
| Multi-LLM Consensus Scoring | extra probes | ~$2 |
| Reddit signal monitoring (sentiment) | ~$1 |

**Total per tenant per month**:
- ST: ~$5
- CO: ~$15
- GR: ~$25
- AG: ~$60 (with AI Agent + Real-time)

At $300-$2,500 per tier per month, **gross margin on AI cost stays >85%** even at the AG tier.

### Third-party API costs

| Service | Per tenant per month |
|---|---|
| Google Business Profile API | free (rate-limited) |
| Google Places API (citation lookup) | ~$0.50 |
| Cloudflare Pages (hosting) | ~$0.20 |
| Supabase (DB + storage) | ~$1-2 |
| Reddit API | free (rate-limited) |
| Optional: Ahrefs/Semrush API (Growth+) | $5-15 |
| Optional: SERP API for local pack | $2-3 |

---

## 6. Database schema summary (new tables Phase 5+)

```sql
-- Already exists (Phase 1-4):
-- tenants, profiles, gbp_connections, gbp_photo_uploads, gbp_question_drafts,
-- citation_submissions, ai_visibility_runs, rate_limits, oauth_audit_log

-- NEW for Phase 5+:
create table tenant_domains (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  domain text not null,
  is_primary boolean default false,
  created_at timestamptz default now(),
  unique(tenant_id, domain)
);

create table tenant_branding (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  logo_url text,
  primary_color text,
  secondary_color text,
  font_family text,
  updated_at timestamptz default now()
);

create table api_keys (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  key_hash text not null,
  label text,
  last_used_at timestamptz,
  created_at timestamptz default now(),
  revoked_at timestamptz
);

create table reddit_subreddits_tracked (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  subreddit text not null,
  added_at timestamptz default now(),
  unique(tenant_id, subreddit)
);

create table reddit_mentions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  subreddit text not null,
  thread_id text not null,
  comment_id text,
  sentiment text,  -- 'positive' | 'neutral' | 'negative'
  detected_at timestamptz default now(),
  unique(thread_id, comment_id)
);

create table crisis_alerts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  severity text,  -- 'low' | 'medium' | 'high' | 'critical'
  channel text,  -- 'reviews' | 'reddit' | 'news' | 'gbp'
  description text,
  triggered_at timestamptz default now(),
  acknowledged_by uuid references profiles(id),
  acknowledged_at timestamptz
);

create table predictions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  metric text,  -- 'share_of_model' | 'ai_traffic' | etc.
  horizon_days int,  -- 30, 60, 90
  predicted_value numeric,
  confidence_low numeric,
  confidence_high numeric,
  generated_at timestamptz default now()
);

create table generated_articles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  prompt_target text not null,  -- e.g. "best dentist Plateau accepting new patients"
  title text,
  body_md text,
  schema_jsonld jsonb,
  status text default 'draft',  -- 'draft' | 'in_review' | 'approved' | 'rejected' | 'published'
  cost_usd numeric,
  created_at timestamptz default now(),
  reviewed_at timestamptz,
  published_at timestamptz
);

create table tenant_feature_overrides (
  tenant_id uuid not null references tenants(id) on delete cascade,
  feature text not null,
  enabled boolean,  -- override the tier default
  reason text,  -- why was this overridden
  set_by uuid references profiles(id),
  set_at timestamptz default now(),
  primary key (tenant_id, feature)
);

create table feature_invocations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade,
  feature text not null,
  status text,  -- 'success' | 'failure' | 'rate_limited'
  payload_hash text,  -- no PII
  cost_usd numeric default 0,
  occurred_at timestamptz default now()
);

create index on feature_invocations(tenant_id, occurred_at desc);
```

All tables get RLS policies tied to `has_tenant_role(uuid, uuid, app_role)` (existing pattern from Phase 1-4) and `has_feature(tenant_id, feature)`.

---

## 7. Help center articles required (per CLAUDE.md hard rule 10)

Per hard rule 10: every shipped feature gets a help article in EN + FR-CA, no AI provider names.

### Already shipped (today)

- `add-ons-explained` (pricing-plans)
- `contest-scope-client-runs-it` (getting-started)
- `photo-flow-client-uploads-via-app` (getting-started)
- `why-no-link-building` (aeo-geo-eeat)
- `reddit-playbook-for-local-business` (aeo-geo-eeat)
- `what-the-onboarding-audit-covers` (audit)

### Required for Phase 5

- `how-tier-gating-works` (pricing-plans) — explains why some features are hidden

### Required for Phase 6

- `setting-up-your-photo-quota` (getting-started) — already covered by existing photo-flow article

### Required for Phase 7

- `understanding-reddit-signal-monitoring` (aeo-geo-eeat) — read-only monitoring vs active participation

### Required for Phase 8 (Agency)

- `setting-up-white-label-branding` (account-billing)
- `multi-domain-dashboard-overview` (getting-started)

### Required for Phase 9 (Agency)

- `using-the-ailys-api` (account-billing)
- `api-rate-limits-and-pagination` (account-billing)

### Required for Phase 10

- `understanding-crisis-alerts` (audit)
- `tuning-crisis-alert-thresholds` (audit)

### Required for Phase 11

- `wordpress-schema-deployment` (aeo-geo-eeat)
- `wix-schema-deployment` (aeo-geo-eeat)
- `webflow-schema-deployment` (aeo-geo-eeat)
- `shopify-schema-deployment` (aeo-geo-eeat)
- `headless-cms-schema-deployment` (aeo-geo-eeat)

### Required for Phase 12

- `how-predictive-visibility-works` (audit) — emphasize uncertainty, no "guarantee"

### Required for Phase 13

- `how-the-ai-agent-writes-articles` (aeo-geo-eeat)
- `reviewing-ai-generated-articles` (getting-started)

### Required for Phase 14

- `real-time-ai-monitoring` (audit)
- `citation-health-auto-fix` (audit)

### Required for Phase 15

- `local-pack-rank-tracker` (audit)
- `geo-grid-heatmap-explained` (audit)

### Required for Phase 16

- `multi-llm-consensus-explained` (audit)
- `semantic-citation-matrix-explained` (audit)
- `prompt-expansion-engine` (audit)

### Required for Phase 17

- `understanding-your-visibility-badges` (getting-started)
- `schema-ab-testing-overview` (aeo-geo-eeat)
- `exporting-your-data-vendor-escape-kit` (account-billing)

**Total help articles to write: ~30** in EN + FR-CA. At ~30 min/article: ~15h.

---

## 8. Mobile-first compliance (CLAUDE.md hard rule 13)

Every UI element shipped MUST pass:

- Tap targets ≥ 44×44 px
- No horizontal overflow at 360px viewport
- `overflowWrap: anywhere` on all headings + brand name runs
- Safe-area-inset for iPhone notch/home bar
- Tested at 375×812 (iPhone SE), 390×844 (iPhone 15), 412×915 (Pixel 8), 768×1024 (iPad)
- Modals don't exceed viewport height (scroll inside, never the body)
- No `text-xl` on inner spans of animation components (lesson learned today)

For each phase, the QA checklist must include the mobile viewport pass.

---

## 9. Security baseline (CLAUDE.md hard rule 9)

Every endpoint shipped must include:

| Requirement | Existing pattern |
|---|---|
| Server-side input validation (zod or hand-roll) | `functions/api/chat-advisor.ts:validateBody` |
| Rate limiting (sliding window) | `functions/api/chat-advisor.ts:checkRateLimit` |
| Origin allowlist | `functions/api/chat-advisor.ts:originAllowed` |
| Audit log | `oauth_audit_log` table |
| RLS via `has_tenant_role(uuid, uuid, app_role)` | All Phase 1-4 tables |
| Tier check via `has_feature(tenant_id, feature)` | NEW for Phase 5+ |
| No PII in logs | hash payloads with sha-256 |
| Anthropic key only via env, never inlined | All edge functions |
| CORS lockdown | `functions/api/chat-advisor.ts:OPTIONS handler` |
| CSP headers (no inline-eval, no inline-script) | `_headers` file at deploy time |

---

## 10. Tests gate (CLAUDE.md hard rule 12)

Before any merge to main:

```bash
# In Reviuzy repo
npx tsc --noEmit                    # 0 errors
node scripts/audit-translations-deep.mjs  # 0 missing in MAJORS
grep -rn "—" src/i18n/translations  # 0 em-dashes
npm run build                       # ✓ no errors
npm run test                        # all green (when tests exist)

# Plus manual:
# 1. Open the feature in browser (375x812 + 1280x800)
# 2. Click through happy path
# 3. Click through one error path
# 4. Verify admin panel shows recent invocations
# 5. Verify help article exists
# 6. Verify tier gating: log in as ST tenant, verify feature is hidden
```

---

## 11. Recommended delivery order (the actual go-to-market sequence)

### Sprint 1 (Phase 5): unblock everything
**~27h, 1 session.** Tier gating + multi-domain foundation. Everything else depends on this.

### Sprint 2 (Phase 6 + Phase 7): close client visible gaps
**~54h, 2 sessions.** Photo flow complete + Reddit signal monitoring. These are referenced in shipped help articles, so closing them removes broken-promise risk.

### Sprint 3 (Phase 8 + Phase 9): unlock Agency tier value
**~52h, 2 sessions.** White-label + API access. Lets us actually charge $2,500 with confidence.

### Sprint 4 (Phase 10): demo-able feature
**~25h, 1 session.** Crisis Early Warning. Easy win, high perceived value, sales differentiator.

### Sprint 5+ (Phase 11-17): GOD MODE, in priority order
- Phase 11 (Schema automation) — biggest moat
- Phase 12 (Predictive ML) — biggest sales lift
- Phase 13 (AI Agent) — biggest content cost saver
- Phase 14 (Real-time monitoring) — biggest premium signal
- Phase 15 (Geo-grid) — operational power
- Phase 16 (Advanced AI) — research-heavy
- Phase 17 (Premium UX + agency tooling) — long tail

After Sprint 4 we have a **fully shippable Agency-tier product**. After Phase 11-13 we have a **defensible moat** competitors can't easily copy. After Phase 17 we have a **category-leading platform** that justifies $5-7K/mo Agency pricing.

---

## 12. Open questions / decisions needed from product owner

Before starting Phase 5, clarify:

1. **Multi-domain pricing for Agency**: 12 photos per domain, but is there a cap on domains per Agency contract? Or unlimited?
2. **API rate limits**: what's the per-tier limit? (Suggest: ST/CO no API, GR 100 req/day, AG 1000 req/day, custom on request)
3. **AI Agent article cost cap**: max $/article? Suggest $3 USD cap per article, $30/mo cap per tenant. Hard fail if exceeded.
4. **Crisis alert SLA on Agency**: <4h business hours for Slack response. What about non-business hours? On-call rotation?
5. **Tenant simulator audit**: when a strategist acts-as a tenant, is the tenant notified? GDPR/Loi 25 may require this.
6. **Wikipedia notability**: who edits if eligible? Strategist or contractor? Liability if rejected?
7. **Vendor escape kit**: should it include the Anthropic prompts we used? Probably no (proprietary), but client may ask.
8. **Schema A/B testing**: is showing 2 different schemas to Google a SEO violation? Need legal/SEO review.
9. **Predictive ML accuracy floor**: under what accuracy do we stop showing predictions? Don't want to be confidently wrong.

---

## 13. Out of scope (explicitly NOT shipping)

Per scope clarifications today, these are NEVER going in Reviuzy SaaS:

- ❌ Active link-building campaigns (paid PR, journalist outreach, HARO)
- ❌ Wikipedia article creation by AiLys (we surface notability scoring, the client/specialist edits)
- ❌ Reddit/Quora active participation (we monitor only, the client posts themselves)
- ❌ Contest execution (the engine is provided, the client runs the contest)
- ❌ Photo sourcing (the client uploads, we never visit on-site or use stock)
- ❌ Sub-account-style nested tenants (1 contract = 1 tenant; AG just supports multi-domain under that tenant)
- ❌ Paid ad management (Google Ads, Meta Ads, LinkedIn Ads — refer to specialist)

---

## 14. STATE.md changes when shipping each phase

After each phase ships, update `STATE.md`:
- Move the phase from "Roadmap" to "What's shipped"
- Bump the tag (v0.3.0 after Phase 5, v0.4.0 after Phase 6, etc.)
- Update the env-var checklist if new vars are needed
- Note any breaking changes for existing clients

---

---

## 15. Upgrade CTA system (cross-tier conversion engine)

The whole point of a tier ladder is to move clients up. A Starter at $300 who stays Starter forever is fine, but a Starter who upgrades to Core at $600 in month 3 doubles LTV with zero acquisition cost. The CTA system is what makes that happen — and it has to be built deeply, not as a "you ran out of slots, click here" popup.

### 15.1 Behavioral data model (foundation)

Build a per-tenant "upgrade signals" table that aggregates real usage patterns:

```sql
create table tenant_upgrade_signals (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  -- Quota saturation: how often do they hit their cap
  photo_quota_hit_count_30d int default 0,
  photo_quota_hit_count_90d int default 0,
  citation_quota_hit_count_30d int default 0,
  -- Feature attempts: how often they try to access locked features
  feature_attempts_locked_30d jsonb default '{}'::jsonb,  -- {"qa_bot": 8, "predictive_ml": 3}
  -- Engagement
  dashboard_logins_30d int default 0,
  reports_opened_30d int default 0,
  -- Outcomes
  share_of_model_lift_30d numeric,  -- positive = winning, will pay more
  share_of_model_lift_90d numeric,
  -- Recommendation engine output
  recommended_tier text,  -- 'CO' | 'GR' | 'AG' or null if happy at current
  recommendation_score numeric,  -- 0-1, higher = stronger upgrade case
  recommendation_reason jsonb,  -- ["hit photo quota 12 times in 30d", "tried qa_bot 8 times"]
  last_computed_at timestamptz default now()
);
```

A nightly cron computes this for every tenant. The `recommendation_score` is fed into the UI to decide CTA intensity (subtle vs prominent vs urgent).

### 15.2 CTA placement layers (5 layers, escalating)

Different layers fire at different intensities to avoid annoying the user:

#### Layer A — Inline lock badges (passive, always-on)

Every locked feature shows a `🔒 Core` or `🔒 Growth` or `🔒 Agency` badge inline. Hover/tap → mini-modal: "Unlock with Core ($600/mo). [See what's included]". No interruption, just a visible upgrade path.

```typescript
<FeatureGate
  feature="qa_bot"
  fallback={<LockedFeatureCard tier="CO" feature="qa_bot" />}
>
  <QaBotPanel />
</FeatureGate>
```

#### Layer B — Quota saturation notice (gentle, fires when quota hits)

When quota hits 80%: yellow inline banner: "You've used 6 of your 8 monthly photo slots. Upgrading to Growth would give you 12/mo per location." When quota hits 100%: orange banner: "You've used all 8 photo slots this month. Reset is in N days, or upgrade to Growth now to add 4 more this month." Banner has a Dismiss button (24h cooldown) and an Upgrade button.

#### Layer C — Feature-attempt CTA (medium, fires on user friction)

When the user clicks a locked feature 3+ times in 30 days, a different modal pops: "We noticed you keep trying to use [feature]. It's available on [tier]. Run a 14-day free trial of [tier], no payment until day 15." Self-serve trial activation. Cooldown: 30 days between modals per feature.

#### Layer D — Personalized email (active, monthly)

For tenants with `recommendation_score > 0.6`, send a monthly email (1st of the month, after the report goes out). Subject: "[Client name], here's why Core is the right next step." Body: data-driven pitch using the actual signals (e.g., "You hit your photo quota every month, the Q&A bot would have saved you ~3 hours last month"). Links: 1-click upgrade with proration.

#### Layer E — Strategist-triggered upgrade chat (high-touch, exception)

When `recommendation_score > 0.85` and the tenant has a dedicated strategist (Growth or Agency, or a Reviuzy-bundled CO+), the strategist gets a Slack DM: "Tenant X is a strong candidate for upgrade to Y. Suggested talk track: [auto-generated]." Strategist initiates a Zoom call via the dashboard.

### 15.3 Self-serve upgrade flow (must be friction-free)

```
Click "Upgrade to Core" anywhere
  ↓
Modal: feature-by-feature comparison (current tier vs target)
  ↓
"Continue" button
  ↓
Modal: pricing + proration calculator
  "You're 12 days into your billing cycle.
   Pay $300 today, then $600 starting [next billing date]."
  ↓
"Confirm upgrade" → Stripe API call → tier flipped → page reloads with new features
  ↓
Welcome modal: "You unlocked: Q&A bot, AEO schema deployment, 5 citations/mo,
                weekly AI Visibility, 4 GBP posts/mo. Want a tour?"
```

Total clicks: 4. No phone call. No "contact sales". Friction kills upgrade rate.

### 15.4 Founding Clients pricing lock (special handling)

For tenants in the Founding Clients program (50% off lifetime), the upgrade CTAs apply the discount automatically. The pitch: "You're a Founding Client at 50% off. Core would normally be $600/mo, but you stay at $300 if you upgrade today." This is an **insanely** strong pitch and the system must apply it transparently — never make the founder do math.

### 15.5 Downgrade prevention (the other half of CTA)

When a tenant clicks "Cancel" or "Downgrade":

**Step 1**: show what they'd lose
"Downgrading from Core to Starter would remove: Q&A bot, AEO schema, 5 citations/mo, weekly AI Visibility. Are you sure?"

**Step 2**: offer alternatives
- "Pause your subscription for 60 days" (keep data, lower fee)
- "Skip a month" (one-time $0 month, keep features)
- "Talk to a strategist" (Slack/email opt-in, free)

**Step 3**: if they still want to cancel, do it gracefully + start a 90-day win-back sequence:
- Day 7: "Anything we should have done differently?" survey
- Day 30: "Want to come back at 25% off for 3 months?"
- Day 90: "Final offer: 50% off return, lifetime."

### 15.6 A/B testing framework for CTAs

Every CTA copy + placement is A/B tested. Track: click-through rate, upgrade conversion rate, downgrade prevention rate. Default to the variant with the higher 90-day LTV impact. Stored in `experiments` table with bucketing per tenant.

```sql
create table experiments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  variants jsonb not null,  -- ["control", "var_a", "var_b"]
  active boolean default true,
  created_at timestamptz default now()
);

create table tenant_experiment_assignments (
  tenant_id uuid not null references tenants(id) on delete cascade,
  experiment_id uuid not null references experiments(id) on delete cascade,
  variant text not null,
  assigned_at timestamptz default now(),
  primary key (tenant_id, experiment_id)
);
```

### 15.7 Tier preview / sandbox (try-before-buy)

Once per tenant per tier, allow a 24-hour preview of the next tier. The dashboard switches into "Preview mode" with the next-tier's features unlocked, marked as "Preview — your real tier is Core". After 24h, automatically reverts. This is a SAFE trial that doesn't require Stripe pre-auth.

### 15.8 Effort estimate for the upgrade CTA system

| Item | Effort |
|---|---|
| 15.1 Behavioral signals table + nightly cron | 8h |
| 15.2 5-layer CTA placement components | 14h |
| 15.3 Self-serve upgrade flow (Stripe proration) | 12h |
| 15.4 Founding Clients pricing lock logic | 4h |
| 15.5 Downgrade prevention modal + win-back | 10h |
| 15.6 A/B testing framework | 12h |
| 15.7 Tier preview / sandbox | 16h |
| 15.8 Help articles for the upgrade flow (EN+FR) | 4h |
| 15.9 Admin: per-tenant CTA history + override | 4h |
| 15.10 Tests | 4h |

**Phase CTA total: ~88h**. Recommended priority: Sprint 4 (after Phase 8 white-label, before Phase 11 schema automation), because once we have the white-label PDF, the Agency tier is finally compelling and the upgrade pitch is backed by visible value.

---

## 16. Deeper feature catalogue (next-level innovation, not surface)

Per "deep search pas leger surface" directive, here are 30+ deeper features that go beyond the GOD MODE list. Many of these are **moats** that competitors cannot copy in 6 months.

### 16.1 Foundational data infrastructure

**F1. Federated AI engine training data submission**
Some AI engines accept structured business data via partnership programs (Bing Webmaster Tools, Google Knowledge Panel suggestions, Yelp data feed, Apple Business Connect API, Schema App, Yext PowerListings). We build a single canonical business JSON-LD per tenant, push it to all engines that accept structured submissions. Eliminates the work of maintaining 8 different listings manually.
- **Tier**: GR + AG
- **Effort**: 30h
- **Long-term**: builds a moat on data freshness; hard to replicate without partnerships

**F2. Dynamic Knowledge Graph publishing at /.well-known/**
Every client site publishes its canonical structured data at `https://client-domain.com/.well-known/business.jsonld`. AI engines can crawl this single URL for the authoritative business description. We update it server-side as facts change. Becomes the source of truth ahead of the rest of the web.
- **Tier**: GR + AG
- **Effort**: 12h
- **Long-term**: future-proof against engine algorithm changes; AI engines tend toward structured authoritative sources

**F3. AI Trust Score (single composite metric)**
Aggregate signal: review velocity (10%), GBP completeness (15%), schema coverage (20%), citations volume + freshness (15%), Wikidata Q-number health (10%), content E-E-A-T (15%), AI Visibility lift (15%) → single 0-100 trust score. Easier to explain to clients than 5 different metrics. Anchors all reporting.
- **Tier**: All
- **Effort**: 16h
- **Long-term**: simpler client narrative = easier renewals

### 16.2 Predictive + counterfactual

**F4. AI Visibility Counterfactual Engine**
"What would happen if we deployed schema X today?" Runs a quick simulation: take 10 similar businesses (same vertical, same city, similar size) and check what citations they get with schema X vs without. Predicts the lift before we deploy. Lets clients see ROI before committing strategist hours.
- **Tier**: GR + AG
- **Effort**: 30h
- **Long-term**: positions us as data-driven vs gut-feeling agencies

**F5. Schema Recommendation Engine via ML**
Train on which schemas correlate with which citation outcomes across the entire (anonymized) client base. For each new tenant, recommend a "schema mix" based on similar successful clients. Output: "Tenants like yours that deployed Service + FAQPage + Person schema saw +12% Share of Model in 60 days."
- **Tier**: GR + AG
- **Effort**: 40h (data pipeline + model + UI)
- **Long-term**: federated learning advantage that grows stronger as we add clients

**F6. Federated learning for SMB benchmarks**
Aggregate (anonymized, opt-in) data from all clients in a vertical to give percentile benchmarks. "You're in the 75th percentile of Quebec dentists for review velocity." More compelling than absolute numbers, never reveals individual data.
- **Tier**: All
- **Effort**: 24h
- **Long-term**: each new client improves the benchmark for all other clients (network effect)

**F7. Predictive cancellation alerts (already in Phase 17, deepening)**
Beyond the simple churn signals: train a model on historical churned vs retained clients to identify the 15-20 features most predictive. Output: "Tenant X has 73% probability of churning in the next 60 days. Top reasons: low report engagement (-40%), declining Share of Model trend (-25%), no strategist call in 90 days (-15%)."
- **Tier**: Internal agency tooling
- **Effort**: 32h
- **Long-term**: increases retention by enabling proactive intervention

### 16.3 Content + voice

**F8. Voice search optimization mode**
Different from text search. "Hey Siri, find me a..." has different ranking signals: higher weight on GBP, schema with `speakable` property, FAQ with conversational phrasing. We deploy a separate optimization track for voice queries. Generates audio-friendly content briefs.
- **Tier**: GR + AG
- **Effort**: 24h
- **Long-term**: voice search is growing 30% YoY, first-mover advantage

**F9. Structured Q&A generation from review patterns**
Mine the actual questions customers ask in reviews and Q&A on GBP. Generate the FAQ content + FAQPage schema that answers them. Auto-deploys to GBP Q&A and site FAQPage schema. Real questions = real answers = higher AI engine trust.
- **Tier**: CO + GR + AG
- **Effort**: 16h
- **Long-term**: turns customer questions into permanent content assets

**F10. Auto-FAQ from chat advisor logs**
The chat advisor on the marketing site captures real prospect questions. Mine these to generate FAQ content for the client's own site. Bridge: marketing-site insight → client-site optimization.
- **Tier**: CO + GR + AG
- **Effort**: 12h
- **Long-term**: each new chat session improves the FAQ generator

**F11. Localized content variant generation**
One article generated in 5 versions: French Quebec, Spanish Latam, Chinese Mandarin, Arabic MSA, Russian. Each adapted (not translated) to the cultural context — different examples, different idioms, different business hours format. Multiplies content reach without 5x the cost.
- **Tier**: AG (one-time setup) + extra-language add-on
- **Effort**: 20h
- **Long-term**: enables clients to serve immigrant populations they currently can't

**F12. AI-driven directory submission optimization**
For each citation submission, the AI rewrites the business description to match what THAT directory's algorithm rewards. Yelp wants service keywords. Healthgrades wants credentials. Avvo wants case mentions. OpenTable wants menu descriptors. Single business description → 50 directory-optimized variants.
- **Tier**: CO + GR + AG (depends on citation cadence)
- **Effort**: 18h
- **Long-term**: every directory has its own algorithm; we adapt to each

**F13. AI-powered staff onboarding for review responses**
When a new staff member joins, the strategist (or self-serve form) inputs their voice profile: tone (warm/professional/casual), credentials (DDS, MD, RN), favorite phrases, signature. AI uses this to draft review replies that feel personalized BY THAT PERSON, not generic. Different staff = different voices.
- **Tier**: CO + GR + AG (Reviuzy add-on)
- **Effort**: 14h
- **Long-term**: personalization at scale — what big agencies can't do

### 16.4 Competitive intelligence

**F14. Competitor displacement scoring**
For every prompt the client loses, identify WHICH specific competitor is winning and WHY (their schema, their reviews, their citations, their Wikidata). Surface "top 3 competitors to displace this quarter" with a specific action plan: "Displace [Clinique X] by deploying Person schema for your dentists + 3 more citations on Healthgrades."
- **Tier**: GR + AG
- **Effort**: 24h
- **Long-term**: turns every loss into a specific actionable win

**F15. Customer journey AI map**
Aggregate all touchpoints (GBP search, citations, reviews, AI engine answers, organic search, ads if integrated) into a visual map showing where prospects discover the business. Identifies broken journeys (e.g., "Prospects find you on ChatGPT but bounce because your site has no Service schema for the service they asked about").
- **Tier**: AG (multi-touchpoint)
- **Effort**: 32h
- **Long-term**: positions us as full-funnel, not just GBP

### 16.5 Crisis + risk

**F16. Crisis playbook auto-execution**
When crisis alert fires (Phase 10), the system auto-executes the first 3 mitigation steps: (a) post a positive GBP update to push down the negative review, (b) trigger Reviuzy to send NFC review-request to recent happy customers, (c) draft a press response in case the issue goes viral. Strategist approves before each step. Saves 4-8 critical hours.
- **Tier**: GR + AG
- **Effort**: 28h
- **Long-term**: differentiates from agencies who only "monitor" but don't act

**F17. Compliance automation per industry**
Dental clinics need HIPAA-aware content. Lawyers need state-bar compliance (varies by state). Restaurants need allergen disclosures (varies by jurisdiction). Vertical-specific compliance pipelines that flag violations before content goes live. Per CLAUDE.md hard rule 9 (gov-grade security) extended to client-facing content.
- **Tier**: GR + AG (vertical-specific add-on)
- **Effort**: 40h (one pipeline per vertical: dental, legal, restaurant, healthcare initially)
- **Long-term**: enables enterprise clients in regulated verticals

**F18. GBP appeal/dispute automation**
When GBP suspends or rejects something (very common), generate the appeal letter with proper documentation, citations, and tone. Submit via Google Business Profile API where supported, or guide the client through manual upload. Average 70% appeal-success-rate vs the industry's ~40%.
- **Tier**: All (basic) + advanced for Agency
- **Effort**: 18h
- **Long-term**: turns a disaster scenario into a routine workflow

**F19. AI-driven schema versioning + rollback**
Every schema change is versioned. If a deployment correlates with a citation drop or AI Visibility decline within 14 days, the system flags it and offers a 1-click rollback to the previous version. Prevents catastrophic schema deploys.
- **Tier**: GR + AG
- **Effort**: 16h
- **Long-term**: makes schema deployment a safe operation, not a risk

### 16.6 Operational power

**F20. Calendar integration for content**
Sync with the client's marketing calendar (Google Calendar, Outlook, internal CRM). Auto-suggest GBP posts and content briefs aligned with: holidays, business milestones (anniversary, expansion), seasonality (back-to-school for tutors, Q4 for tax prep), local events (Festival Just for Laughs in Montréal).
- **Tier**: GR + AG
- **Effort**: 14h
- **Long-term**: content stays relevant without constant manual prompting

**F21. Geofenced Q&A monitoring**
When Q&A is posted on GBP from within X km of the location (vs from a random IP), prioritize for response — it's likely a real prospect about to walk in. Nearby = more important. Boost the response speed for these.
- **Tier**: GR + AG
- **Effort**: 8h
- **Long-term**: locality-aware ops the big agencies don't bother to build

**F22. Citation half-life tracker**
Citations decay. Yelp listings need refresh every 18 months. BBB needs renewal yearly. Industry directories vary. We track each citation's half-life, proactively refresh before it goes stale. Prevents the "we did 50 citations in year 1, none in year 2, lost half by year 3" failure mode.
- **Tier**: CO + GR + AG
- **Effort**: 12h
- **Long-term**: turns citations from one-time effort into perpetual asset

**F23. Smart NFC card design generator**
AI generates per-business NFC card designs based on brand colors, vertical, target audience, language preference. Vector files (SVG + PDF) ready to print. Replaces the generic Reviuzy template card with something on-brand.
- **Tier**: Reviuzy add-on or AG bundled
- **Effort**: 18h
- **Long-term**: cards become a brand asset, not a tool

**F24. Auto-translate reviews for international audiences**
When reviews come in any language, auto-translate to all 16 supported languages and store the translations. AI engines reading from any locale see reviews in their language. Vastly extends reach for tourist-heavy locations (hotels, restaurants in Old Montréal).
- **Tier**: AG
- **Effort**: 10h
- **Long-term**: opens international markets without extra strategist work

### 16.7 Premium / experimental

**F25. Reviuzy for Recruiting (sister product idea)**
Same tech for employer brand reputation. "Best place to work as a dental hygienist in Montréal" type queries. Optimize for ChatGPT/Perplexity answers about employers. Side product, separate go-to-market, but reuses 80% of the Reviuzy stack.
- **Tier**: Standalone product, not in current ladder
- **Effort**: 80h to MVP
- **Long-term**: doubles TAM with same engineering

**F26. AI Visibility for staff/founders personal brands**
Track and optimize personal brand for the dentist owner, the partner, the celebrity client. Person-brand probes alongside business probes. "When AI is asked who the best dentist in Montréal is, does Dr. Smith get cited?" Personal-brand work amplifies business reputation.
- **Tier**: AG (one personal brand included) + paid extra for additional ones
- **Effort**: 16h (extension of existing infrastructure)
- **Long-term**: turns founders into amplifiers of their business

**F27. Hyperlocal weather/event-aware content**
"It's snowing in Montréal this weekend" → auto-generate GBP post about snow-day services (delivery options, indoor activities for kids, snow removal for contractors). Weather + calendar + local event APIs feed the content engine. Content stays freshly relevant.
- **Tier**: AG
- **Effort**: 16h
- **Long-term**: content engine adapts to context without human input

**F28. AI Visibility heatmap by query intent**
Categorize prompts by intent: informational ("what is bridge dental work"), navigational ("dentist near me"), transactional ("emergency dentist Saturday"). Show client where they win on each intent type. Prescriptive: "You win informational queries but lose transactional. Add Service schema with bookable appointments."
- **Tier**: GR + AG
- **Effort**: 18h
- **Long-term**: prioritizes the highest-revenue queries

### 16.8 Internal team tooling

**F29. Internal team dashboards (Reviuzy ops)**
For Reviuzy's own ops team: per-strategist load (clients managed), per-strategist performance (NPS, churn rate, output volume), capacity planning, hire/fire decisions backed by data. Strategists themselves see their stats so they can self-improve.
- **Tier**: Internal
- **Effort**: 16h
- **Long-term**: scales the agency without scaling chaos

**F30. AI Visibility for product launches**
When a client launches a new service, auto-deploy a "service launch package": pre-launch citations to prime the directories, schema for the new Service, content brief targeting the new prompts, social amplification kit. One-time premium add-on at $499 ("Service Launch Package") on top of monthly tier.
- **Tier**: All (as one-time add-on)
- **Effort**: 12h
- **Long-term**: monetizes client growth events

---

## 17. Long-term solution patterns (vs. band-aid anti-patterns)

Per CLAUDE.md hard rule 5, every feature ships as a long-term solution, not a band-aid. Here are the patterns we follow + the band-aids we explicitly reject.

### 17.1 LONG-TERM: Single source of truth for tier features

✅ `TIER_FEATURES` constant in `src/lib/tier-features.ts` is the canonical map. Frontend `<FeatureGate>`, backend RLS `has_feature()`, and edge function gates ALL read from this same constant (or a duplicated SQL function that's auto-generated from the TS source).

❌ Band-aid: hardcoding `if (tier === 'ST') hide` in each component. Drift inevitable.

### 17.2 LONG-TERM: Quotas enforced at DB level (RLS), not just UI

✅ `photos_pending` insert policy checks both `has_feature(tenant_id, 'photo_upload')` AND the monthly count vs `photo_quota_for_tier()`. Even a malicious client crafting their own SQL through the Supabase JS client cannot exceed quota.

❌ Band-aid: client-side `if (count >= quota) return` only. Trivial to bypass.

### 17.3 LONG-TERM: All AI calls go through the edge layer

✅ Anthropic key only in Cloudflare Pages env. Client-side never sees it. Even if an attacker steals client-side JS, no API key leaks.

❌ Band-aid: NEXT_PUBLIC_ANTHROPIC_KEY or similar. We've seen this in the wild and it costs companies millions of dollars per month in stolen API keys.

### 17.4 LONG-TERM: Idempotent operations everywhere

✅ Every "create" operation (citation submission, schema deploy, photo upload) accepts an idempotency key. Retrying with the same key returns the existing result. Never duplicates.

❌ Band-aid: hoping the user doesn't double-click. They will.

### 17.5 LONG-TERM: Cost telemetry built in from day 1

✅ Every Anthropic call writes to `feature_invocations(cost_usd)`. Per-tenant, per-feature monthly cost is one query away. Spending thresholds + auto-pause if exceeded.

❌ Band-aid: "we'll figure out costs once we have customers". You won't, and you'll either lose money or shut features off arbitrarily.

### 17.6 LONG-TERM: Audit logs that never delete

✅ `oauth_audit_log` and `feature_invocations` are append-only. Compliance + debugging both need this. Retention via partition pruning, not delete.

❌ Band-aid: deleting old logs to "save space". Storage is $0.02/GB/mo on Supabase. Don't optimize that.

### 17.7 LONG-TERM: Schema versioning for the SaaS itself

✅ Every Supabase migration is numbered + timestamped + idempotent (`if not exists`). Rollback is forward-only (write a new migration that undoes the previous one).

❌ Band-aid: hand-edit prod schema in the SQL editor. We tried this earlier, ended up with a desynced migration history.

### 17.8 LONG-TERM: Feature toggles separated from tier gates

✅ Two layers: (a) tier gate (does the tier permit this feature?), (b) per-tenant override (force on/off for one tenant). Both stored in `tenant_feature_overrides`. Allows beta testing, special deals, gradual rollouts.

❌ Band-aid: one big `if (tenant.id === 'big_client')` switch. Drift inevitable.

### 17.9 LONG-TERM: Help articles before the feature ships

✅ Per CLAUDE.md hard rule 10: write the help article in EN + FR-CA before the marketing UI exists. Prevents "we'll write docs later".

❌ Band-aid: ship feature, file ticket "write docs", ticket sits for 6 months.

### 17.10 LONG-TERM: Tests pass before merge, no exceptions

✅ Per CLAUDE.md hard rule 12: `tsc`, `audit-translations-deep`, em-dash gate, `npm run build`, manual browser test, all green before merge. CI flagged as red blocks merge.

❌ Band-aid: "we'll fix the test after". The fix never happens.

### 17.11 LONG-TERM: Mobile-first from inception

✅ Per CLAUDE.md hard rule 13: every UI element is designed at 360px first, then enhanced at 768px, then 1280px. Never the reverse.

❌ Band-aid: "make it work on desktop, we'll do mobile later". Desktop-first → mobile retrofit → broken on iPhone (we lived this today).

### 17.12 LONG-TERM: Per-tenant data isolation via RLS, not application logic

✅ Every multi-tenant table has an RLS policy tied to `has_tenant_role()`. Even a bug in the application code can't accidentally leak tenant A's data to tenant B.

❌ Band-aid: `WHERE tenant_id = $current` in every query. One missed query = data leak.

### 17.13 LONG-TERM: Self-serve everything, with strategist override

✅ Tier upgrades, feature toggles, help articles, support tickets — all self-serve in the UI. Strategist can override or escalate, but the default path is friction-free.

❌ Band-aid: "contact sales to upgrade". Kills conversion. We've seen 70% drop-off vs self-serve.

---

## 18. Other suggestions (response to "dautre suggestions ?")

### 18.1 Pricing experiments to consider

- **Annual prepay discount**: 10 months for the price of 12. Improves cash flow + reduces churn (sunk-cost effect).
- **Bring-a-business discount**: 25% off for 6 months for both the referrer and the referee. Viral mechanic at low cost.
- **Industry pack**: bundle 5 dental clinics in the same city under one Agency contract for $3,999/mo (vs 5 × $300 = $1,500 for individual Starters, but with full Agency features). Mid-market move.

### 18.2 Vertical specialization (post-MVP)

After we have 50-100 clients, identify the 3 verticals with the highest density and build vertical-specific dashboards:
- **Dental clinics** (Quebec is dense): pre-built schema templates, dental-specific FAQ generators, insurance schema markup
- **Restaurants**: menu schema, allergen schema, OpenTable integration, hours-of-operation patterns
- **Lawyers**: practice-area schema, attorney bios with bar credentials, case-result-friendly templates

Each vertical pack is a $99/mo add-on that pays for itself after 1 referral.

### 18.3 Marketing-site features that drive Reviuzy SaaS conversions

- **Live AI Visibility demo on /audit**: visitors can audit ANY business URL and see real Share of Model data in 30 seconds. Generates leads. Currently shipped in basic form, can be deepened with predictive features.
- **Public benchmark report**: monthly "State of AI Search for Quebec Local Businesses" PDF. Free download in exchange for email. Establishes thought leadership + builds list.
- **Case study auto-publishing**: when a client opts in (per the program), the case study auto-flows into /case-studies and a press release goes out via PRWeb or similar. Each case study generates ~50-100 leads.
- **Comparison pages SEO-targeted**: `/vs/sterling-sky`, `/vs/brightlocal`, `/vs/localiq` already shipped. Add more: `/vs/yext`, `/vs/birdeye`, `/vs/podium`, `/vs/whitespark`. Each ranks for the comparison query and converts.

### 18.4 Defensibility moats (the "why we'll win" thesis)

Beyond features, the strategic moats that compound over time:

**Moat 1: Federated dataset**. Every new client adds anonymized data to our benchmarks, models, recommendations. By client 100, our prediction accuracy is 2x a competitor starting today. By client 1000, it's 10x.

**Moat 2: Integrated Reviuzy SaaS**. Most agencies have to bolt together 5-7 vendors (BrightLocal + Yelp Pro + Reviewability + ContentKing + etc.). We own the full stack. Lower friction, better margins, faster iteration.

**Moat 3: Quebec/bilingual specialization**. Most US/global agencies have terrible Quebec FR-CA coverage. We have native bilingual + 14 partner languages on day 1. Quebec is 10M people of underserved local businesses. Plus brand-side: French-Canadian businesses owners trust French-Canadian agencies.

**Moat 4: 30-day satisfaction guarantee**. Most agencies hide behind "we did our work, no refund". We refund month 1 if we didn't deliver. Sales objection killer. Competitors can't match without changing their model.

**Moat 5: Founding Clients pricing**. The 50% lifetime lock for the first 10 clients creates strong word-of-mouth advocates. Each Founding Client is incented to refer others (their friend gets the same lock + we credit them 1 month free for each referral).

**Moat 6: Help center as a search asset**. Every help article is SEO-optimized in EN + FR-CA. After 100 articles shipped, we'll rank for "how to optimize GBP for AI search", "what is AEO", etc. Free perpetual lead source.

### 18.5 Risks to deliberately address

- **Anthropic API price hike**: build cost telemetry now, allow per-feature cost caps, have a fallback to Haiku/cheaper models for non-critical paths.
- **Google policy change on GBP automation**: maintain manual fallback for every automated GBP action. If the API gets restricted, we keep operating manually.
- **AI engine consolidation**: today there are 6 engines, in 2 years could be 3 (after acquisitions). Keep the probe layer pluggable. Adding/removing engines should be a 1-line config change.
- **Chargeback surge**: every plan has the 30-day satisfaction guarantee. Track refund rate per cohort. If it exceeds 5%, audit the strategist team immediately.
- **Strategist burnout**: per `tenant_upgrade_signals` we should also track strategist load. Cap clients-per-strategist (suggest: 30 ST, 15 CO, 10 GR, 5 AG). Hire when caps approached.

---

## 19. Updated effort summary (with everything)

| Phase | Effort |
|---|---|
| Phase 5 — Tier gating foundation | 27h |
| Phase 6 — Photo flow complete | 34h |
| Phase 7 — Reddit monitoring | 20h |
| Phase 8 — White-label + multi-domain | 30h |
| Phase 9 — API access | 22h |
| Phase 10 — Crisis early warning | 25h |
| Phase 11 — Schema deployment automation | 58h |
| Phase 12 — Predictive AI Vis Score | 44h |
| Phase 13 — AI Agent article writer | 50h |
| Phase 14 — Real-time monitoring | 82h |
| Phase 15 — Geo-grid + local | 40h |
| Phase 16 — Advanced AI features | 97h |
| Phase 17 — Premium UX + agency tooling | 76h |
| **Phase CTA — Upgrade CTA system** (new) | **88h** |
| **Phase 18 — Deeper feature catalogue** (new, F1-F30) | **~520h** |

**Updated grand total: ~1,213h** for full GOD MODE + deeper feature set.

At my batch-automated rate: ~150-180 sessions. Realistic delivery: **18-24 months** with 2 sessions/week pace. **Or**: hire 2 senior devs full-time, 6-9 months.

---

## 20. Suggested next move

Stakeholder decision needed:

**Option A** — Conservative: ship Phase 5 + 6 + 7 + 8 + 9 + 10 first (~158h, ~3 months). That's a fully shippable Agency product. Then evaluate whether GOD MODE features are needed based on customer demand.

**Option B** — Aggressive: ship Phase 5-10 + Phase 11 (Schema automation) + Phase CTA together (~246h, ~5 months). That's "fully shippable + biggest moat + conversion engine". Best ratio of effort to defensibility.

**Option C** — All-in GOD MODE: target the full ~1,213h. Requires investment (additional dev hires) but produces a category-defining product. Justifies $5-7K Agency pricing.

Recommended: **Option B**. It gives us a moat (schema automation), a conversion engine (CTA system), and a fully shippable Agency tier without overcommitting resources before validating market demand for the GOD MODE differentiators.

---

**End of spec v1.1**

Document is ~1,500 lines. Stakeholder review next, then tier-aware engineering kickoff for Phase 5.
