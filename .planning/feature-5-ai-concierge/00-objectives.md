# Feature 5: AI Concierge dashboard (AiLys primary, Reviuzy data backend)

## Business goal

Embed a conversational AI assistant in the client dashboard that understands their data. "Why did my Share of Model drop this week?" / "Generate a GBP post for Halloween" / "Compare me to my top 3 competitors." Drives session length, surfaces upsell moments, makes the platform stickier than any competitor's static dashboard.

## Hours saved + revenue uplift

- **Retention lever (primary):** session length × 3, login cadence × 2 expected. Clients who use the platform daily renew at 3-4× the rate of read-only clients.
- **Upsell trigger:** Concierge surfaces "you're approaching your GBP post limit, upgrade to Growth" or "your competitor X is gaining citation share, want me to draft 4 FAQ schemas to close the gap?" inline in the chat thread.
- **Strategist hours saved:** ~4h/mo per active client (clients self-serve common questions instead of emailing support).
- **Token budget per tier:** Starter 10k/day, Core 50k/day, Growth 200k/day, Agency unlimited. Tier upgrade lever encoded in the feature itself.

## Who benefits

- **Client:** asks any question about their data, gets contextual answers + actions
- **Strategist:** the trivial "what does this number mean" questions don't reach inbox; their time is freed for strategy
- **Operator:** dashboard becomes a daily habit instead of monthly check-in

## Deliverable scope

**AiLys side (this repo, primary):**
1. `/dashboard/concierge` page: chat interface (right rail or full panel), streaming via SSE, tool-call visualization, inline data viz (charts/cards inline in chat), voice input/output (Web Speech API browser-native), suggested prompts on empty state
2. Cloudflare Pages Function `/api/concierge-chat`: streaming response from Anthropic Claude Sonnet (or whatever the latest stable Sonnet is at time of build) with tool-calling, RAG over `tenant_context_embeddings`
3. Tool registry with 10 tools (see scope below)
4. Token budget enforcement: `tenant_token_usage` table, per-tier daily limits with upgrade CTA when over
5. Caching layer: identical recent queries (15 min window) return cached response
6. Help center articles EN+FR-CA: "How to talk to the AiLys Concierge", "What the concierge can do", "Voice mode", "Privacy and your conversations"

**Tools (10 to ship):**
1. `get_share_of_model(engine?, period?)`: latest scores
2. `get_recent_reviews(limit, sentiment?)`: Reviuzy review data
3. `get_gbp_posts(period)`: GBP post list with engagement
4. `get_competitor_analysis()`: top-3 competitors current vs trend
5. `generate_gbp_post(theme, length)`: drafts post via Claude
6. `schedule_gbp_post(post_id, publish_at)`: queues to GBP API
7. `draft_review_reply(review_id, tone)`: generates reply
8. `get_audit_findings(category?)`: returns Deep Site Audit findings (depends on Feature 1)
9. `recommend_next_action()`: top-3 prioritized actions based on findings + predictions
10. `compute_revenue_projection(scenario)`: ROI model

**Reviuzy side:**
1. pgvector extension on Supabase
2. `tenant_context_embeddings` table: tenant_id, source enum, source_id, embedding vector(1536), text, captured_at
3. Nightly cron: re-embeds latest tenant signals (top 100 per source) using OpenAI text-embedding-3-small
4. Each tool maps to a Reviuzy edge fn that reads tenant data with RLS pinned to authenticated session

## Cost estimate per invocation

- **Anthropic Claude Sonnet:** ~5k tokens/conversation × $3/M input + $15/M output (caching reduces input cost ~80%)
- **Embedding (OpenAI):** $0.02/1M tokens; ~10k tokens/tenant/night = $0.0002/tenant/night = $0.006/tenant/mo
- **Per-tier ceiling:** Starter 10k tokens/day = ~$0.15/day max = $4.50/mo; Growth 200k/day = $90/mo cap; Agency unlimited (assume $200/mo cap then upgrade conversation)
- **Total cap:** Anthropic API hard cap $500/mo across all tenants; alarm at $400. **Use prompt caching aggressively** (system prompt + tool defs cached for 5min, system prompt + frequently accessed tenant context cached for 1hr).
- **Per CLAUDE.md global:** invoke Skill `claude-api` for prompt caching guidance during implementation.

## Why this dep (Section 10)

**Possible new deps:**
- `@anthropic-ai/sdk`: yes, new but justified — direct LLM access required ✅
- `pgvector` Postgres extension: enabled on Reviuzy Supabase ✅
- OpenAI SDK for embeddings only: alternative is Cohere or Voyage. Recommend `voyage-large-2` instead since it has equivalent quality + lower cost AND no OpenAI API exposure (we already use Anthropic). **Decision: use Voyage AI for embeddings.** ✅

**Net new deps: `@anthropic-ai/sdk` (+ `voyageai` for embeddings).** Justified per Section 10: zero in-house alternative, market-standard SDKs.

## ISO gates required

- [ ] Tool-call audit log: every invocation logs tenant_id, tool_name, args (sanitized), tokens_in, tokens_out, latency
- [ ] Tenant_id pinning test: concierge cannot leak data across tenants under any tool path (mandatory red-team test in CI)
- [ ] Token budget enforcement: pre-flight check rejects requests when over tier limit with upgrade CTA
- [ ] Fallback to plain Claude (no tools) when token budget exhausted (degraded mode, not silent failure)
- [ ] EN/FR Claude system prompts reviewed for hallucination guardrails: "When you don't know, say you don't know"
- [ ] Per hard rule #10: Claude system prompt MUST refer to "the AiLys engine" and MUST NOT name Anthropic/Claude/the underlying provider
- [ ] Privacy: conversation logs auto-purge after 90d unless tenant opts in for longer retention
- [ ] Voice mode: explicit consent banner per WCAG; transcript only stored on opt-in
- [ ] Help articles live before UI surface
- [ ] Caching: prompt cache hit rate > 60% in steady state (verified via metrics dashboard)

## Time-box estimate

**6 sub-phases, ~9 sessions total** (tools each take ~0.5 session of work; voice mode + caching ergonomics are non-trivial).

See `02-sub-phases.md` for breakdown.
