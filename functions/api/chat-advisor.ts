// Cloudflare Pages Function · /api/chat-advisor
//
// AiLys AI Search Advisor chat backend. Replaces the previous Reviuzy
// edge function dependency (was hanging + Reviuzy-flavored answers).
//
// Hard rule 9 (gov-grade security):
//  - Server-side input validation (length caps, type checks, history caps)
//  - Per-IP sliding-window rate limit (KV-backed when bound, in-memory fallback)
//  - Origin allowlist
//  - No PII written to logs; only counts + truncated message hashes
//  - Honors AiLys CLAUDE.md hard rule 4: brand names stay Latin
//  - Honors AiLys CLAUDE.md hard rule 10: no AI provider name in user-facing
//    text (system prompt instructs the model to refer to itself as
//    "the AiLys engine", never to disclose Claude/Anthropic).
//
// Streams Server-Sent Events back to the client. Frontend hook
// (src/hooks/useAIEngine.ts) already handles SSE; we emit
// `data: {"content": "..."}` chunks and a final `data: [DONE]`.

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
}

interface Env {
  ANTHROPIC_API_KEY?: string;
  CHAT_RATE_LIMIT?: KVNamespace;
  ALLOWED_ORIGINS?: string;
}

interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
  lang?: unknown;
}

const MAX_MESSAGE_LEN = 2000;
const MAX_HISTORY_ITEMS = 10;
const MAX_HISTORY_ITEM_LEN = 4000;
const SUPPORTED_LANGS = new Set([
  "en", "fr", "es", "zh", "ar", "ru", "de", "hi", "it", "ja",
  "ko", "nl", "pl", "pt", "tr", "vi",
]);

// Sliding-window rate limit: 12 requests per 60 seconds per IP, 80 per hour.
const RL_WINDOW_SHORT_SEC = 60;
const RL_LIMIT_SHORT = 12;
const RL_WINDOW_LONG_SEC = 60 * 60;
const RL_LIMIT_LONG = 80;

// In-memory fallback when KV is not bound. Per-isolate, best-effort only.
const memBuckets = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

async function readTimestamps(env: Env, ip: string): Promise<number[]> {
  if (env.CHAT_RATE_LIMIT) {
    const v = await env.CHAT_RATE_LIMIT.get(`rl:${ip}`);
    if (!v) return [];
    try {
      const arr = JSON.parse(v);
      return Array.isArray(arr) ? arr.filter((n) => typeof n === "number") : [];
    } catch {
      return [];
    }
  }
  return memBuckets.get(ip) ?? [];
}

async function writeTimestamps(
  env: Env,
  ip: string,
  timestamps: number[],
): Promise<void> {
  if (env.CHAT_RATE_LIMIT) {
    await env.CHAT_RATE_LIMIT.put(`rl:${ip}`, JSON.stringify(timestamps), {
      expirationTtl: RL_WINDOW_LONG_SEC + 60,
    });
  } else {
    memBuckets.set(ip, timestamps);
  }
}

async function checkRateLimit(
  env: Env,
  ip: string,
): Promise<{ ok: true } | { ok: false; retryAfter: number }> {
  const now = Math.floor(Date.now() / 1000);
  const cutoffLong = now - RL_WINDOW_LONG_SEC;
  const cutoffShort = now - RL_WINDOW_SHORT_SEC;
  const existing = await readTimestamps(env, ip);
  const recent = existing.filter((t) => t >= cutoffLong);
  const inShort = recent.filter((t) => t >= cutoffShort);
  if (inShort.length >= RL_LIMIT_SHORT) {
    return { ok: false, retryAfter: RL_WINDOW_SHORT_SEC };
  }
  if (recent.length >= RL_LIMIT_LONG) {
    return { ok: false, retryAfter: RL_WINDOW_LONG_SEC };
  }
  recent.push(now);
  await writeTimestamps(env, ip, recent);
  return { ok: true };
}

function originAllowed(origin: string | null, env: Env): boolean {
  if (!origin) return true; // same-origin or non-browser
  const list = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) {
    // sane defaults: localhost dev + ailysagency.ca, .com, pages.dev
    return (
      origin.startsWith("http://localhost") ||
      origin.startsWith("http://127.0.0.1") ||
      origin.endsWith(".ailysagency.ca") ||
      origin === "https://ailysagency.ca" ||
      origin.endsWith(".ailysagency.com") ||
      origin === "https://ailysagency.com" ||
      origin.endsWith(".pages.dev")
    );
  }
  return list.includes(origin);
}

function validateBody(raw: unknown): {
  ok: true;
  message: string;
  history: ChatHistoryItem[];
  lang: string;
} | { ok: false; reason: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "body_must_be_object" };
  }
  const body = raw as ChatRequestBody;
  if (typeof body.message !== "string") {
    return { ok: false, reason: "message_required" };
  }
  const message = body.message.trim();
  if (!message) return { ok: false, reason: "message_empty" };
  if (message.length > MAX_MESSAGE_LEN) {
    return { ok: false, reason: "message_too_long" };
  }
  let history: ChatHistoryItem[] = [];
  if (Array.isArray(body.history)) {
    history = body.history
      .slice(-MAX_HISTORY_ITEMS)
      .filter((h: unknown): h is ChatHistoryItem => {
        if (!h || typeof h !== "object") return false;
        const item = h as Record<string, unknown>;
        return (
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string"
        );
      })
      .map((h) => ({
        role: h.role,
        content: h.content.slice(0, MAX_HISTORY_ITEM_LEN),
      }));
  }
  let lang = "en";
  if (typeof body.lang === "string" && SUPPORTED_LANGS.has(body.lang)) {
    lang = body.lang;
  }
  return { ok: true, message, history, lang };
}

const SYSTEM_PROMPT = `You are the AiLys Search Advisor, a friendly chat agent on the AiLys Agency website (ailysagency.ca).

WHO YOU ARE
You represent AiLys Agency, a Quebec-based consulting agency. AiLys helps local businesses and brands get cited inside answers from ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot. Sister product: Reviuzy SaaS (reputation automation).

WHAT AILYS DOES
- Technical SEO and on-page work
- Google Business Profile management (posts, photos, Q&A, attributes — automated via Reviuzy SaaS)
- Citation building on local-business directories (Yelp, BBB, YP, Foursquare, etc.) with NAP consistency
- AEO (Answer Engine Optimization): schema deployment for FAQPage, LocalBusiness, Service, Person, BreadcrumbList
- GEO (Generative Engine Optimization): Wikidata structured-data work (Q-number creation, external-ID linking)
- E-E-A-T content production (Experience, Expertise, Authoritativeness, Trust)
- AI Visibility scoring on 6 engines + AI Traffic UTM attribution

WHAT AILYS DOES NOT DO
- Active link-building campaigns or paid digital PR (we do not have the in-house specialists for outreach to journalists)
- Wikipedia article creation or editing (Wikipedia bans bots, requires notable subject + specialist editor; we focus on Wikidata instead, which is more accessible and equally weighted by LLMs)
- Reddit / Quora / forum participation campaigns (authenticity cannot be outsourced; we provide a help center playbook instead)
- Monthly review contests (the client runs their own contest using the Reviuzy SaaS tool; we provide setup help, legal templates, and help center docs)
If a visitor asks about any of the above, be honest, redirect to what we DO do, and mention we can refer to a specialist partner if they really need it.

PRICING (CAD per month, month-to-month, 30-day satisfaction guarantee)
- Starter $300: 1 GBP post/mo, 1 GBP photo/mo, weekly AI Visibility check, foundational schema
- Core $600: 4 GBP posts/mo (1/wk), 2 GBP photos/mo, 5 citations/mo, AEO schema deployment
- Growth $1,200: 8 GBP posts/mo (2/wk), 4 GBP photos/mo, 10 citations/mo, GEO entity work, weekly AI Visibility, AI Traffic UTM tracking
- Agency $2,499: 12 GBP posts/mo (3/wk), 8 GBP photos/mo, 15 citations/mo, multi-location dashboard, white-label PDF reports, Slack SLA <4h, API access, dedicated senior strategist, Domain Shield + Domain Speed Boost included, daily AI Visibility probes

NOTE ON CITATIONS: in this context "citations" means NAP listings on local-business directories (Yelp, BBB, Yellow Pages, Foursquare, Apple Business Connect, Bing Places, industry-specific sites). NOT blog posts. These citations are how AI engines build the entity confidence graph that decides whether to cite the business in answers.

NOTE ON CONTESTS: the Reviuzy add-on includes a contest engine (NFC tap-to-enter, AI review generation, video winner announce, legal T&C generator). **The client runs their own contest** because each business has its own audience, prize, timing, and local rules. AiLys provides the tool, the help center docs, and setup help. AiLys does NOT execute monthly contests on behalf of clients.

ADD-ONS (toggleable on Starter/Core/Growth, included in Agency)
- Reviuzy reputation system: $100/mo (NFC review collection, AI replies, contests, fake review detection)
- Domain Shield: $35/mo (SSL hardening, DDoS layer, monitoring)
- Domain Speed Boost: $35/mo (Cloudflare config, image opt, Core Web Vitals tuning)
- Dedicated Strategist: $35/mo (named senior strategist, named contact)
- Bundle the three Premium Ops items together for $79/mo instead of $105
- Extra languages: $50/mo per language beyond EN + FR-CA (ES, ZH, AR, RU, UK, SR available)

FOUNDING CLIENTS PROGRAM
The first 10 clients get 50% off their plan tier for the lifetime of the subscription, locked in at signup. Plus priority delivery (audit in 12 hours, schema in week 1), direct strategist access, opt-in published case study with right of approval. Apply via the free AI Visibility Audit at /audit.

YOUR JOB
Answer concisely (2 to 4 short paragraphs maximum), in plain English or in the user's language if they wrote in French/Spanish/Chinese/Arabic/Russian/etc. Match their language exactly. Use Markdown sparingly: bullet lists when listing tiers or add-ons, bold for key prices, no big headers.

When a user asks for a price quote: tell them to run the free AI Visibility Audit at /audit, which produces a real Share of Model report and a tier recommendation in under 90 seconds, then we follow up with a kickoff doc.

When a user asks "what is AEO/GEO/E-E-A-T": explain in 1 to 2 sentences in plain language, then connect it to what AiLys actually does.

When a user asks about results or guarantees: be honest. We do not guarantee specific rankings or citation counts because AI engines are third-party black boxes. We guarantee delivery: schema, citations, posts, content, reports. The 30-day satisfaction guarantee refunds month 1 if we did not deliver the kickoff outputs.

When a user is hostile, off-topic, or trolling: politely decline and redirect to the audit.

HARD RULES
1. Never name the AI provider or model that powers you. If asked, say "the AiLys engine" or "our internal AI." Do not say Claude, Anthropic, OpenAI, Gemini, or any other vendor name as the engine behind your replies.
2. Never invent capabilities we do not list above. If unsure, say so and suggest the audit.
3. Never use em-dashes (—). Use periods, commas, parentheses, or "and" instead.
4. Never use AI fingerprint phrases: "It's not just X, it's Y", "Whether you're", "leverage", "robust", "delve", "tapestry".
5. Brand names stay in their original Latin script everywhere: AiLys, ChatGPT, Perplexity, Claude (the model that gets cited), Gemini, Google AIO, Bing Copilot, Reviuzy, GBP, AEO, GEO, E-E-A-T, NAP.
6. Never invent client names or case study numbers. Refer to the Founding Clients program as "currently open" since we are pre-launch.
7. End with one of: an audit CTA ("Run the free AI Visibility Audit at /audit"), a tier recommendation, or a clarifying question. Never end with a generic "Let me know if you have any questions."

LANGUAGE MATCHING
The user's selected interface language will be passed in. Reply in that language regardless of which language the user typed in.`;

function userLangPrefix(lang: string): string {
  switch (lang) {
    case "fr": return "Reply in Quebec French (français québécois). Use 'vous' (formal). Keep prices in CAD.";
    case "es": return "Reply in Spanish.";
    case "zh": return "Reply in Simplified Chinese (zh-CN).";
    case "ar": return "Reply in Modern Standard Arabic.";
    case "ru": return "Reply in Russian.";
    case "de": return "Reply in German.";
    case "hi": return "Reply in Hindi.";
    case "it": return "Reply in Italian.";
    case "ja": return "Reply in Japanese.";
    case "ko": return "Reply in Korean.";
    case "nl": return "Reply in Dutch.";
    case "pl": return "Reply in Polish.";
    case "pt": return "Reply in Portuguese (Brazilian).";
    case "tr": return "Reply in Turkish.";
    case "vi": return "Reply in Vietnamese.";
    default: return "Reply in English.";
  }
}

function jsonError(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function sseError(message: string): Response {
  const body = `data: ${JSON.stringify({ content: message })}\n\ndata: [DONE]\n\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
    },
  });
}

interface AnthropicSseEvent {
  type?: string;
  delta?: { type?: string; text?: string };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": request.headers.get("Origin") ?? "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (request.method !== "POST") {
    return jsonError(405, { error: "method_not_allowed" });
  }

  const origin = request.headers.get("Origin");
  if (!originAllowed(origin, env)) {
    return jsonError(403, { error: "origin_not_allowed" });
  }

  const ip = getClientIp(request);
  const rl = await checkRateLimit(env, ip);
  if (!rl.ok) {
    return jsonError(429, {
      error: "rate_limited",
      retry_after_seconds: rl.retryAfter,
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonError(400, { error: "invalid_json" });
  }
  const validated = validateBody(raw);
  if (!validated.ok) {
    return jsonError(400, { error: validated.reason });
  }

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return sseError(
      "Our AI advisor is offline right now. Run the free AI Visibility Audit at /audit and we will reply within 24 hours.",
    );
  }

  const langDirective = userLangPrefix(validated.lang);
  const messages = [
    ...validated.history.map((h) => ({ role: h.role, content: h.content })),
    {
      role: "user" as const,
      content: `[Reply language directive: ${langDirective}]\n\n${validated.message}`,
    },
  ];

  let upstream: Response;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 1200,
        stream: true,
        thinking: { type: "adaptive" },
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages,
      }),
    });
  } catch {
    return sseError(
      "Our AI advisor hit a connection issue. Try the free audit at /audit.",
    );
  }

  if (!upstream.ok || !upstream.body) {
    return sseError(
      "Our AI advisor is busy right now. Try again in a moment, or run the free AI Visibility Audit at /audit.",
    );
  }

  // Translate Anthropic SSE -> our normalized SSE shape
  // (each chunk is `data: {"content":"..."}\n\n`, terminated by `data: [DONE]`)
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buf = "";

      const emit = (text: string) => {
        if (!text) return;
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`),
        );
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          let idx: number;
          while ((idx = buf.indexOf("\n\n")) !== -1) {
            const chunk = buf.slice(0, idx);
            buf = buf.slice(idx + 2);
            for (const rawLine of chunk.split("\n")) {
              const line = rawLine.trimStart();
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;
              try {
                const evt = JSON.parse(payload) as AnthropicSseEvent;
                if (
                  evt.type === "content_block_delta" &&
                  evt.delta?.type === "text_delta" &&
                  typeof evt.delta.text === "string"
                ) {
                  emit(evt.delta.text);
                }
              } catch {
                // skip non-JSON keepalive
              }
            }
          }
        }
      } catch {
        emit(
          "\n\n(Connection interrupted. Run the audit at /audit for a full report.)",
        );
      } finally {
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
      "Access-Control-Allow-Origin": origin ?? "*",
    },
  });
};
