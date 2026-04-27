# Audit engine enhancement roadmap

Tracks what's shipped, what's deferred, and what's planned for the audit engines (`/audit`, `/audit/gbp`).

Last updated: after Phase B + C + D partial deploy on production.

---

## Shipped (live on https://ailysagency.pages.dev)

### Phase A — Make marketing claims true
- ✅ `GbpPulseEngine` (1,162 lines) wired to `/audit/gbp` with mode toggle
  - Pulse mode: instant 8-question self-assessment, 10 weighted signals, 90 sec
  - Deep AI mode: Anthropic-backed audit via Reviuzy edge function
- ✅ `/api/llm-citation-matrix` Cloudflare Pages Function
  - Anthropic Claude Haiku 4.5, simulates 6 engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)
  - 3 vertical-specific buyer queries × 6 engines = 18-cell matrix
  - KV-cached 24h, ~$0.01/visitor amortized
  - Server-side input validation, rate-limit ready
- ✅ `LlmCitationMatrix` UI component with click-to-expand cells
- ✅ URL field added to AutoAuditEngine (optional, validated client + server)
- ✅ Industry text input → typed dropdown (9 verticals from `industries.ts`)
- ✅ All 3 audit components translated to 6 majors (16 locales total, 275 keys, 155 `t.audit.*` references)

### Phase B — Beyond god mode
- ✅ `/api/places-lookup` Cloudflare Function (Google Places API)
  - Real GBP data: rating, review count, photo count, categories, hours, attributes
  - No OAuth needed (public business data only)
  - KV-cached 24h, ~$0.005/visitor
- ✅ `/api/places-nearby` Cloudflare Function (Places nearbysearch)
  - Top 3 competitors within 5km radius, same primary type
  - Ranked by rating × log(review count)
- ✅ `PlacesPreview` UI: real-time GBP card in unlocked audit results
- ✅ `SchemaPreview` UI: copy-paste-ready LocalBusiness + FAQPage JSON-LD per vertical, validated against Google Rich Results
- ✅ Schema FAQ templates per vertical (restaurant/dentist/lawyer/etc.)

### Phase C — Differentiators
- ✅ `CompetitorOverlay` UI: 3 nearest competitors via Places nearbysearch, side-by-side rating + review-count gap analysis
- ✅ Vertical-tuned signal weights in GbpPulseEngine `score()` function
  - 10 signals × 9 verticals = 90 multipliers
  - Restaurants weight review velocity 1.6×, photos 1.4×
  - Lawyers weight NAP 1.6×, categories 1.5×
  - Healthcare weights responses 1.4×

### Phase D — Polish
- ✅ `ExportActionPlan` component: Send to Notion / Google Docs / Email / Clipboard
  - Pure client-side, zero API cost
  - Formats action plan with branding header

---

## Deferred (next session)

### Phase B.2 — SSE streaming audit theater
**Why deferred:** requires restructuring `LlmCitationMatrix` to handle SSE stream from a new `/api/llm-citation-stream` endpoint. Each engine's result arrives one-by-one for cinematic effect ("Querying ChatGPT... Cited ✗" → "Querying Perplexity... Cited ✓").
**Effort:** ~6 hours. Backend needs SSE streaming via Cloudflare Workers, frontend needs EventSource handling.
**Value:** medium. Current 8-second loading state already good UX. Priority below B.4.

### Phase B.4 — PDF export
**Why deferred:** requires Cloudflare Worker + html-to-pdf library (e.g. `puppeteer-cloudflare-workers` or self-hosted). Server-rendered branded 10-page PDF with score, action plan, competitor comparison, glossary.
**Effort:** ~10 hours including PDF template design.
**Value:** HIGH. Massively boosts perceived professionalism and shareability.
**Path:** Use Cloudflare Browser Rendering API (in beta as of 2026) once stable, or fallback to server-side React-PDF rendering.

### Phase C.2 — Continuous monitoring upsell
**Why deferred:** requires Supabase `monitoring_subscriptions` table + cron job + email infra. Weekly re-runs of LLM matrix, delta computation, weekly digest email.
**Effort:** ~12 hours. Needs Supabase project setup for AiLys (currently using Reviuzy's).
**Value:** HIGH. Converts one-time free audit users into recurring paid Starter tier subscribers.
**Path:** Spin up dedicated AiLys Supabase project first, then build cron + email pipeline.

### Phase C.4 — Anonymized peer benchmark
**Why deferred:** requires Supabase `audit_results` table to store every audit run (anonymized: no business name, only city + vertical + score).
**Effort:** ~6 hours. Mostly DB schema + privacy review.
**Value:** medium-HIGH. "You're in the top 12% of dentists in Montreal" copy is a strong conversion lever.

### Phase D.1 — Voice query simulation
**Why deferred:** Requires browser SpeechSynthesis API integration + audio asset generation.
**Effort:** ~4 hours.
**Value:** medium. Cinematic, but supplemental.

### Phase D.2 — "Audit my competitor" tab
**Why deferred:** Requires UI restructure of audit page to support dual-stream output side-by-side.
**Effort:** ~8 hours.
**Value:** HIGH. Sharable + screenshot-bait + competitive intel.

### Phase D.4 — Embeddable score widget
**Why deferred:** Needs separate widget bundle, iframe-rendered, postMessage API, and license terms for white-label distribution.
**Effort:** ~12 hours.
**Value:** medium. New distribution channel for agencies.

### Phase D.5 — Resellers API
**Why deferred:** Requires API key system, billing integration (Stripe usage-based), rate-limiting per tier, white-label results.
**Effort:** ~20 hours.
**Value:** HIGH long-term, low-priority near-term until MRR justifies.

### Phase D.6 — AI competitor content critique
**Why deferred:** Needs to crawl competitor's site, parse FAQ schema, run a second Anthropic call with structured prompt.
**Effort:** ~6 hours.
**Value:** HIGH. Concrete differentiator that no other tool offers.

### Phase D.7 — Multiplayer collaborative audit
**Why deferred:** Requires Supabase Realtime + shareable result URLs + comment system + task assignment.
**Effort:** ~16 hours.
**Value:** medium. Useful for agencies; less for direct SMB.

### Phase D.8 — Google Search Console OAuth integration
**Why deferred:** OAuth flow, token storage, GSC API integration.
**Effort:** ~10 hours.
**Value:** HIGH. Concrete revenue gap data ("Google: 1,200 visits/mo. ChatGPT: 47.").
**Path:** Worth waiting until first 10 paying clients to validate demand.

---

## Configuration required for full functionality

Set these in **Cloudflare Pages → ailysagency project → Settings → Environment variables**:

| Variable | Required for | How to obtain |
|---|---|---|
| `ANTHROPIC_API_KEY` | LLM citation matrix, AI Visibility audit, hero citation strip | console.anthropic.com → Settings → API Keys |
| `GOOGLE_PLACES_API_KEY` | PlacesPreview, CompetitorOverlay | console.cloud.google.com → APIs → Places API (New) → Credentials |
| `RESEND_API_KEY` | Newsletter double-opt-in confirmation | resend.com → API Keys |
| `VITE_GTM_ID` | Analytics (after consent) | tagmanager.google.com → Container ID |
| `VITE_META_PIXEL_ID` | Marketing (after consent) | business.facebook.com → Events Manager |
| `VITE_LINKEDIN_PARTNER_ID` | Marketing (after consent) | linkedin.com/campaignmanager → Insight Tag |

Optional KV namespace bindings (for cross-region caching, recommended for cost control):

| Binding | Used by | TTL |
|---|---|---|
| `CITATION_CACHE` | hero-citation, llm-citation-matrix | 24h |
| `AI_VIS_CACHE` | ai-visibility-score | 24h |
| `LLM_MATRIX_CACHE` | llm-citation-matrix | 24h |
| `PLACES_CACHE` | places-lookup, places-nearby | 24h |

Bind via **Cloudflare Pages → Settings → Functions → KV namespace bindings**. Names must match exactly.

---

## Recommended sequencing for next session

1. **Phase B.4 PDF export** (10 hrs) — biggest visible value, makes audit results shareable + linkable
2. **Phase C.4 Peer benchmark** (6 hrs) — needs Supabase setup, easiest infra ROI
3. **Phase D.6 Competitor critique** (6 hrs) — concrete moat, no competitor offers this
4. **Phase D.2 Audit my competitor tab** (8 hrs) — viral mechanic
5. **Phase C.2 Weekly monitoring** (12 hrs) — recurring revenue lever
6. The rest (D.1, D.4, D.5, D.7, D.8) when resources or roadmap demand it
