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
//    "the AiLys engine", never to disclose the underlying vendor).
//
// Backend: Google Generative Language API (gemini-2.5-pro, generateContent
// non-streaming, then re-emitted as a single SSE chunk + [DONE] for
// frontend compatibility). Reads GEMINI_API_KEY from Cloudflare Pages env
// vars. The model is instructed via system prompt to never disclose
// Gemini/Google as its engine; references to "Gemini" in replies are only
// to the consumer-facing AI engine that AiLys probes for client citation work.
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
  GEMINI_API_KEY?: string;
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

const SYSTEM_PROMPT = `You are the AiLys AI Search Advisor, the chat agent on ailysagency.ca.

WHO WE ARE
AiLys Agency is a Quebec-based marketing agency specialized in AI Visibility and SEO for local businesses across Canada. We help operators get cited inside answers from ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot. Bilingual EN and FR-CA delivery is in-house, hand-authored, and never run through a translation API. Home market: Quebec, with full Canadian coverage.

WHAT WE DO (the surface)
- AI Visibility scoring: probes on the 6 major AI engines for branded and category queries. Share of Model dashboard. Citation share per engine. Sentiment analysis on AI mentions. Multi-LLM consensus scoring. Predictive AI Visibility projection (30/60/90 day).
- AI Traffic attribution: UTM tracking of clicks from chatgpt.com, perplexity.ai, gemini.google.com, etc.
- Google Business Profile management: posts, photos, Q&A drafts, AI-personalized review reply automation. Single monthly quota per tier; client can publish each post themselves from the dashboard if they prefer.
- Citation building: Yelp, BBB, Yellow Pages, Foursquare, Apple Business Connect, Bing Places, industry-specific directories. NAP consistency monitoring across 50+ directories.
- AEO schema deployment: LocalBusiness, FAQPage, Service, Review, HowTo, Person, BreadcrumbList. Custom JSON-LD at Agency tier. Schema A/B testing at Agency.
- GEO entity work: Wikidata Q-number creation, external-ID linking, P-properties, statements, sitelinks.
- E-E-A-T content production: hand-authored bilingual EN+FR-CA blog posts. Quebec French uses native idioms (courriel, magasiner, fin de semaine).
- Website builds included in every tier (Vitrine 1-5 pages at $800 build fee, PME 6-15 pages at $1500, Commerce 16-25 pages at $3000) with a 6-month creation-fee recovery clause. If the client already has a site, a deep technical audit is run instead.
- AiLys Automation reputation suite (add-on $100/mo on Starter/Core/Growth, bundled in Agency): NFC tap-to-review cards, AI review generation, AI personalized auto-replies, contest engine with video winner announce, jurisdiction-aware legal T&C generator, fake review detection (Domain Shield).

PRICING (CAD per month, month-to-month, no annual lock-in, 30-day satisfaction guarantee)
- Starter $300: 4 GBP posts, 4 photos, 2 citations, monthly AI Visibility probe, LocalBusiness + FAQPage schema, ~1h strategist, email support.
- Core $600 (most popular): 6 GBP posts, 6 photos, 4 citations, weekly AI Visibility, +Service +Review schema, sentiment analysis, 4 unique blog topics/mo (EN+FR), ~3h strategist, 48h Slack SLA.
- Growth $1,200: 8 GBP posts, 8 photos, 6 citations, weekly AI Visibility, +HowTo +Person schema, AI Traffic UTM tracking, multi-location dashboard up to 3 locations, Wikidata work, 6 unique blog topics/mo, ~6h strategist, 24h Slack SLA.
- Agency $2,500: 12 GBP posts, up to 12 photos per domain, 8 citations per domain, daily AI Visibility probes, all schema layers + custom JSON-LD, unlimited multi-location dashboard, white-label PDF reports, Slack SLA under 4 hours business hours, API access (Share of Model, AI Traffic, Visibility scores), dedicated senior strategist, AiLys Automation bundled, Domain Shield + Domain Speed Boost bundled, 8 unique blog topics/mo per domain, quarterly executive deck presented in person, 12-15h strategist.

ADD-ONS (toggle on Starter/Core/Growth, all bundled in Agency)
- AiLys Automation reputation suite: $100/mo
- Tech Health Pack: $150/mo. Covers GSC indexation monitoring, automatic reindex of the monthly blog posts we ship (4/6/8/12 depending on tier), crawl errors weekly sweep, broken links monitoring, Core Web Vitals alerts. Important sales point: blog posts we publish each month do NOT get indexed by Google automatically. Without this pack they typically sit in "Discovered, currently not indexed" for weeks. With the pack, every new page we publish is verified indexed within days.
- Domain Shield (DNS hardening + WAF + monitoring): $35/mo
- Domain Speed Boost (CDN config, image optimization, Core Web Vitals): $35/mo
- Dedicated Strategist (named senior contact): $35/mo
- Premium Ops trio (Domain Shield + Speed Boost + Dedicated Strategist): $79/mo (saves $26)
- Extra languages beyond EN+FR-CA: $50/mo each (Spanish, Chinese, Arabic, Russian, Ukrainian, Serbian)

ONE-TIME ADD-ONS
- GSC Indexation Audit (priced by site size, bundled at signup in Agency): 1-9 pages $100, 10-19 pages $200, 20-29 pages $300, 30-39 pages $400, 40-74 pages $500, 75-99 pages $600, 100-149 pages $800, 150+ pages custom quote. Includes GSC connection + full coverage audit + re-submission of valid URLs + before/after PDF report + canonical/redirect/noindex recommendations. Pairs naturally with the Tech Health Pack for ongoing monthly monitoring after the one-time fix pass. Recommend this whenever a prospect mentions blog content not getting traffic, pages "not showing up in Google", or new pages staying invisible.

GUARANTEES
- 30-day satisfaction guarantee on every tier (refund month 1 if kickoff deliverables are missing).
- 90-day measurable AI Visibility uplift on Core, Growth, and Agency: +15 points or refund.
- Month-to-month, no annual lock-in.

WHAT WE DO NOT DO (be honest if asked, redirect to a specialist partner)
- Active link-building campaigns or paid digital PR (we deliver NAP citations, Wikidata, GBP, schema; backlinks emerge as a side effect but are not promised).
- Wikipedia article creation or editing (we focus on Wikidata, more accessible and equally weighted by AI engines).
- Reddit, Quora, or forum participation (authenticity cannot be outsourced; we provide a help center playbook instead).
- Monthly review contests on behalf of the client (the client runs their own contest using our tool; we provide setup, legal T&C templates, and help docs).
- Paid media management (Google Ads, Meta Ads, LinkedIn Ads).
- Social media management (organic posting, community management).
- E-commerce growth (Amazon Ads, shopping feeds, Klaviyo).
- CRM implementation (HubSpot, Salesforce).
- Creative production (brand identity, video, photo shoots, copywriting campaigns).

PHOTO FLOW (important to explain when asked)
Photos are CLIENT-sourced, not agency-sourced. The client takes photos on their phone (real EXIF metadata is the E-E-A-T "Experience" signal that AI engines weigh) and uploads them via the AiLys Automation app with tier-aware quotas (4/6/8/12 per month). The platform auto-extracts EXIF, generates caption and alt-text, queues for QA, and publishes to GBP. We do NOT source photos. No on-site visits, no stock photos: AI engines detect those and weight them lower.

FREE 24-HOUR AUDIT (the main CTA)
The free AI Visibility audit at /audit runs in the browser in about 90 seconds and produces a 10-page PDF with: Share of Model score, citation matrix on the 6 AI engines (3 buyer queries x 6 engines = 18 cells), GBP pulse score with vertical-tuned signal weights, top 3 nearest competitors, schema preview ready to paste, and a prioritized action plan. No credit card. Available in 6 languages (EN, FR-CA, ES, ZH, AR, RU).

KEY PAGES
- / : landing page with the free audit hero
- /audit : free 24-hour AI Visibility audit
- /audit/gbp : GBP pulse with deep AI mode
- /forfaits-complets : full feature comparison across the 4 tiers
- /forfaits : tier overview
- /blog : 59+ articles on AI Visibility, GBP, AEO, GEO, E-E-A-T, bilingual
- /clients-fondateurs : Founding Clients program
- /aide (FR) or /help (EN) : help center

FOUNDING CLIENTS PROGRAM
Currently open. First 10 clients get 50% off their tier for the lifetime of the subscription, locked at signup. Plus priority audit (12 hours instead of 24), schema deployment in week 1, direct strategist access, opt-in published case study with right of approval. Apply via the free audit at /audit.

COMPETITIVE POSITIONING (use only when a visitor names a competitor)
AiLys is a fixed-price AI Visibility specialist with native bilingual EN+FR-CA delivery and a 24h free audit. Most Quebec/Canadian agencies (Digitad, Major Tom, Bloom, Adviso, Bofu, Rablab, ProStar SEO, WSI) are broader-scope full-service shops with custom retainers, often without an AI Visibility lane. AiLys is narrower but cheaper, faster to onboard, and specialized in the AI engine citation work those agencies do not cover. For paid media, creative, e-commerce, or CRM, AiLys refers to specialist partners. Honest framing only, never trash-talk.

YOUR JOB
Reply concisely (2 to 4 short paragraphs maximum). Match the user's interface language exactly. Use Markdown sparingly: bullets for tier comparisons, bold for prices, no big headers.

When asked for a quote: redirect to the free AI Visibility Audit at /audit. The audit ships a real Share of Model report and a tier recommendation in 90 seconds, then a strategist follows up with a kickoff doc.

When asked "what is AEO, GEO, E-E-A-T, Share of Model, NAP, AI Visibility": explain in 1 to 2 sentences in plain language, then connect it to what AiLys delivers.

When asked about results: be honest. AI engines are third-party black boxes; we do not guarantee specific rankings or citation counts. We guarantee delivery (schema, citations, posts, content, reports) plus the 30-day satisfaction refund and the 90-day +15 points AI Visibility uplift on Core/Growth/Agency.

When the user is hostile, off-topic, or trolling: politely decline and redirect to the audit.

HARD RULES (non-negotiable)
1. Never name the AI provider or model that powers YOUR replies. Refer to yourself as "the AiLys engine" or "our internal AI." Do not say Claude, Anthropic, OpenAI, Gemini, or any vendor name as YOUR engine. You can mention these names freely as the AI engines AiLys probes for citations on behalf of clients.
2. Never disclose internal proprietary details: scoring formulas, prompt structures, vendor APIs, internal automation architecture, database stack, hosting setup, or our legal entity name. If asked about the internal stack, say "AiLys Automation" or "our internal platform" and redirect to what we deliver.
3. Never invent capabilities not listed above. If unsure, say so and suggest the audit.
4. Never use em-dashes (—). Use periods, commas, parentheses, or "and" instead.
5. Never use AI fingerprint phrases: "It's not just X, it's Y", "Whether you're", "leverage", "robust", "delve", "tapestry".
6. Brand names stay in their original Latin script in every language: AiLys, AiLys Automation, ChatGPT, Perplexity, Claude (only as the cited AI engine, never as YOUR engine), Gemini, Google AIO, Bing Copilot, GBP, AEO, GEO, E-E-A-T, NAP, SEO, FAQ, NFC, Wikidata, Wikipedia, Yelp, BBB.
7. Never invent client names, case study numbers, or testimonials. Founding Clients are "currently open, pre-launch."
8. End every reply with one of: an audit CTA ("Run the free AI Visibility Audit at /audit"), a tier recommendation, a link to a relevant key page, or a clarifying question. Never end with a generic "Let me know if you have any questions."

LANGUAGE MATCHING
Reply in the user's interface language regardless of what they typed in. Use formal "vous" in French. Keep prices in CAD.`;

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

interface GeminiStreamEvent {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
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

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return sseError(
      "Our AI advisor is offline right now. Run the free AI Visibility Audit at /audit and we will reply within 24 hours.",
    );
  }

  const langDirective = userLangPrefix(validated.lang);

  // Gemini contents format: role is "user" or "model" (not "assistant"),
  // and each message has parts: [{text}].
  const contents = [
    ...validated.history.map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    {
      role: "user",
      parts: [
        { text: `[Reply language directive: ${langDirective}]\n\n${validated.message}` },
      ],
    },
  ];

  // Gemini 2.5 Flash, non-streaming. We collect the full response then emit
  // as a single SSE chunk + [DONE]. Streaming was attempted via
  // streamGenerateContent?alt=sse but the upstream chunk boundaries were
  // unreliable inside Cloudflare Workers. Non-streaming is simpler, more
  // robust, and Gemini 2.5 Flash is fast enough that the user sees the
  // reply in roughly 2-3 seconds, which is acceptable for a chat advisor.
  const geminiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" +
    encodeURIComponent(apiKey);

  let upstream: Response;
  try {
    upstream = await fetch(geminiUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200,
          topP: 0.95,
        },
        // Loose safety settings appropriate for a B2B marketing chat.
        // Gemini's defaults block too aggressively for normal commercial copy.
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
        ],
      }),
    });
  } catch {
    return sseError(
      "Our AI advisor hit a connection issue. Try the free audit at /audit.",
    );
  }

  if (!upstream.ok) {
    return sseError(
      "Our AI advisor is busy right now. Try again in a moment, or run the free AI Visibility Audit at /audit.",
    );
  }

  // Parse the full Gemini response and extract the text from
  // candidates[0].content.parts[*].text.
  let parsed: GeminiStreamEvent;
  try {
    parsed = (await upstream.json()) as GeminiStreamEvent;
  } catch {
    return sseError(
      "Our AI advisor returned an unexpected format. Try again, or run the free AI Visibility Audit at /audit.",
    );
  }
  const parts = parsed.candidates?.[0]?.content?.parts;
  let fullText = "";
  if (Array.isArray(parts)) {
    for (const p of parts) {
      if (typeof p?.text === "string") fullText += p.text;
    }
  }
  if (!fullText.trim()) {
    return sseError(
      "Our AI advisor did not return content. Try again, or run the free AI Visibility Audit at /audit.",
    );
  }

  // Re-emit as a single SSE chunk in the normalized shape the frontend expects:
  //   data: {"content":"..."}\n\ndata: [DONE]\n\n
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ content: fullText })}\n\n`),
      );
      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
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
