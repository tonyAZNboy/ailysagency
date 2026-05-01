# Feature 5 sub-phase breakdown

## F5.1 — pgvector + embeddings cron + RAG infrastructure

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- Migration: enable pgvector; create `tenant_context_embeddings` (id, tenant_id FK, source enum('audit'|'reviews'|'gbp'|'citations'|'content'|'predictions'), source_id uuid, embedding vector(1024), text text, captured_at timestamptz)
- Index: HNSW or IVFFlat on embedding column
- Nightly cron `reembed-tenant-context`: pulls top 100 per source per tenant, sends to Voyage AI `voyage-large-2`, persists
- Smoke `smoke-embeddings.mjs` (8 cases: vector dim correctness, RLS, idempotency on re-runs, cosine similarity sanity)

## F5.2 — Concierge chat edge fn + streaming

**Repo:** AiLys (`functions/api/concierge-chat.ts`)
**Time-box:** 1 session (~6h)

- POST endpoint: input `{ tenant_session_token, message, conversation_id? }`, validates auth via Supabase RLS
- Anthropic Claude Sonnet streaming with tool definitions (10 tools)
- RAG: pre-flight retrieves top-5 relevant tenant_context_embeddings via cosine similarity to query
- System prompt: hardcoded EN + FR variants, instruct "you are the AiLys engine assistant" (per hard rule #10), tenant business context inlined
- **Prompt caching:** system prompt + tool defs cached 5min (cache_control: ephemeral); tenant business context cached 1hr; aim for >60% cache hit rate
- SSE stream to client; tool-call events emitted as separate SSE event type
- Smoke `smoke-concierge-chat.mjs` (12 cases: streaming, tool call cycle, RLS pinned tenant_id, fallback when tools fail, system prompt confidentiality (no provider name leaks))

## F5.3 — Tools 1-5 (read-only data tools)

**Repo:** AiLys + Reviuzy edge fns
**Time-box:** 1 session (~5h)

- `get_share_of_model`, `get_recent_reviews`, `get_gbp_posts`, `get_competitor_analysis`, `generate_gbp_post`
- Each tool calls a Reviuzy edge fn via cross-repo proxy with `AILYS_SERVICE_SHARED_SECRET` HMAC
- Tool definitions follow Anthropic tool-use schema
- Smoke per tool (~5 cases each)

## F5.4 — Tools 6-10 (mutating + analytical)

**Repo:** AiLys + Reviuzy
**Time-box:** 1 session (~5h)

- `schedule_gbp_post` (mutating, requires tenant approval flow), `draft_review_reply`, `get_audit_findings`, `recommend_next_action`, `compute_revenue_projection`
- Mutating tools (schedule_gbp_post): tool returns approval_token, UI surfaces "approve to publish" button before actual mutation hits GBP API
- Smoke per tool

## F5.5 — Frontend chat UI + voice mode

**Repo:** AiLys
**Time-box:** 2 sessions (~10h)

- `/dashboard/concierge` page: chat thread, message composer, send button
- SSE consumer: streaming text rendering, tool-call event rendering with mini-cards
- Inline data viz: when tool returns chart-eligible data, render mini chart inline in chat (sparkline, bar chart, etc.)
- Voice input button: Web Speech API SpeechRecognition; on-device transcription (no server roundtrip until message send)
- Voice output toggle: Web Speech API SpeechSynthesisUtterance; tenant preference persisted
- Suggested prompts on empty state (locale-aware): "Why did my score drop?", "Generate a Halloween GBP post", "Compare me to top 3 competitors"
- Conversation history sidebar with search; per-message thumbs up/down feedback
- Mobile-first per hard rule #13: chat takes full viewport on 375px, side panel on >1024px

## F5.6 — Token budget + admin panel + help articles

**Repo:** AiLys
**Time-box:** 1 session (~5h)

- Migration: `tenant_token_usage` (tenant_id, day date, tokens_in int, tokens_out int)
- Pre-flight check in `concierge-chat`: rejects with 429 + upgrade CTA when over tier daily limit
- Admin panel `/admin/concierge`: per-tenant usage table, conversation drill-down (with PII redaction), feedback aggregate (thumbs up/down rate per tool)
- AiLys help articles EN+FR-CA: `concierge-overview`, `concierge-voice-mode`, `concierge-privacy`, `concierge-token-budget`
- Per hard rule #10: articles MUST NOT name Anthropic/Claude; refer to "the AiLys engine" or "the AiLys AI assistant"
- STATE.md update + tag `v0.17.0-concierge-complete`

## Dependencies

F5.1 → F5.2 → F5.3 → F5.4 → F5.5 → F5.6 (mostly serial). F5.5 UI work can start in parallel with F5.4 once F5.3 ships (chat is testable with 5 read-only tools).

## Definition of Done

- [ ] All 10 tools implemented with smoke tests
- [ ] Cross-tenant data leak red-team test passes (CI mandatory)
- [ ] Prompt cache hit rate > 60% in 7-day staging window
- [ ] Token budget enforcement verified per tier
- [ ] Voice mode tested on iOS Safari + Android Chrome
- [ ] Help articles live before UI surface
- [ ] Anthropic API monthly cost < $500 with alarm at $400
- [ ] Admin panel with usage + feedback aggregates
