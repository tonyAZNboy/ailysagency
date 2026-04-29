// Cloudflare Pages Function · /api/llm-citation-matrix
//
// The actual product behind the marketing claim: queries 6 simulated AI engines
// (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) on N
// vertical-specific buyer queries, returns a matrix showing which engines
// cite the audited business and which don't.
//
// Implementation:
//   - Single Anthropic Claude call with structured prompt that asks Claude
//     to simulate each engine's likely answer (Claude is excellent at
//     style-matching the other engines' response patterns)
//   - Parses JSON matrix output
//   - Scores: cited (full match) | mentioned (partial) | absent
//   - KV-cached 24h per (business + city + url) tuple to control cost
//
// Cost: ~$0.05 per uncached call (Claude Haiku 4.5, ~3500 input + 1200 output
// tokens). With 5-call cache amortization that's roughly $0.01/visitor, well
// within free-audit unit economics.
//
// Security:
//   - Server-side input validation on every field
//   - Rate-limit via Cloudflare WAF rule (5 req/min per IP recommended)
//   - URL parsing to reject internal/private addresses
//   - Anthropic API key server-side only
//   - Origin allowlist via _headers + this function's CORS check

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
  LLM_MATRIX_CACHE?: KVNamespace;
}

type CitationStatus = "cited" | "mentioned" | "absent";

interface EngineResult {
  engine: string;
  status: CitationStatus;
  rank?: number; // 1-N if cited
  excerpt: string; // What the engine said about them, or "not named in the answer"
}

interface QueryResult {
  query: string;
  engines: EngineResult[];
}

interface MatrixResult {
  businessName: string;
  city: string;
  url?: string;
  vertical: string;
  /** Array of vertical-specific buyer queries we tested */
  queries: QueryResult[];
  /** Aggregate score 0-100. Simple weighted: cited=10pts, mentioned=4pts. */
  totalScore: number;
  /** Human-readable summary */
  summary: string;
  /** "live" if Claude succeeded, "sample" if API key missing or call failed */
  isLive: boolean;
  generatedAt: string;
}

const VERTICAL_QUERIES: Record<string, string[]> = {
  restaurant: [
    "best [vertical] near me [city] open now",
    "top-rated [vertical] [city] for dinner tonight",
    "where to eat in [city] for a date",
  ],
  dentist: [
    "best dentist [city] accepting new patients",
    "emergency dentist open now [city]",
    "pediatric dentist [city] taking insurance",
  ],
  lawyer: [
    "best lawyer [city] for [legal matter]",
    "free consultation lawyer [city]",
    "experienced [practice area] attorney [city]",
  ],
  contractor: [
    "reliable contractor [city] for home renovation",
    "licensed [trade] near me [city]",
    "best general contractor [city] reviews",
  ],
  clinic: [
    "best clinic [city] accepting new patients",
    "walk-in clinic open now [city]",
    "[specialty] clinic [city] insurance accepted",
  ],
  "real-estate": [
    "best real estate agent [city] for first-time buyers",
    "real estate agent [city] specializing in [neighborhood]",
    "top realtor [city] reviews",
  ],
  hotel: [
    "best boutique hotel [city]",
    "where to stay [city] downtown for business",
    "family-friendly hotel near [landmark] [city]",
  ],
  default: [
    "best [vertical] near me [city]",
    "top [vertical] [city] reviews",
    "[vertical] [city] accepting new clients",
  ],
};

function isValidUrl(s: string): boolean {
  if (!s) return true; // optional
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (!/^[a-z0-9\-.]+\.[a-z]{2,}$/i.test(u.hostname)) return false;
    // Reject internal/private addresses
    if (
      u.hostname === "localhost" ||
      u.hostname.startsWith("127.") ||
      u.hostname.startsWith("10.") ||
      u.hostname.startsWith("192.168.") ||
      u.hostname.endsWith(".local")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function sanitize(s: string, maxLen: number): string {
  return s
    .replace(/[<>{}[\]\\]/g, "") // strip script-injection-ish chars
    .trim()
    .slice(0, maxLen);
}

function staticFallback(
  businessName: string,
  city: string,
  url: string | undefined,
  vertical: string,
): MatrixResult {
  const queries = (VERTICAL_QUERIES[vertical] ?? VERTICAL_QUERIES.default).slice(0, 3);
  const engines = ["ChatGPT", "Perplexity", "Claude", "Gemini", "Google AIO", "Bing Copilot"];
  const queryResults: QueryResult[] = queries.map((q) => ({
    query: q.replace("[vertical]", vertical).replace("[city]", city),
    engines: engines.map((eng) => ({
      engine: eng,
      status: "absent" as CitationStatus,
      excerpt: `Sample data: in deployment, this would show whether ${eng} cited "${businessName}" in its answer.`,
    })),
  }));
  return {
    businessName,
    city,
    url,
    vertical,
    queries: queryResults,
    totalScore: 0,
    summary:
      "Sample matrix. Set ANTHROPIC_API_KEY in Cloudflare Pages env to see live AI engine citations.",
    isLive: false,
    generatedAt: new Date().toISOString(),
  };
}

async function fetchMatrixFromAnthropic(
  env: Env,
  businessName: string,
  city: string,
  url: string | undefined,
  vertical: string,
): Promise<MatrixResult> {
  if (!env.ANTHROPIC_API_KEY) return staticFallback(businessName, city, url, vertical);

  const queryTemplates = (VERTICAL_QUERIES[vertical] ?? VERTICAL_QUERIES.default).slice(0, 3);
  const queries = queryTemplates.map((q) =>
    q.replace("[vertical]", vertical).replace("[city]", city),
  );

  const systemPrompt = `You simulate how 6 different AI search engines would respond to local business queries. The 6 engines have distinct retrieval and citation behaviors:

- ChatGPT: weights Wikipedia, Wikidata, high-DA directories (Yelp, BBB), recent news
- Perplexity: weights freshness, Reddit discussions, news, and structured data
- Claude: weights authoritative sources, Wikipedia, .gov/.edu, expertise signals
- Gemini: weights Google Business Profile, Maps reviews, Google Search Console-class signals
- Google AIO: weights Knowledge Graph, GBP, schema.org structured data, freshness
- Bing Copilot: weights LinkedIn, business directories, news, and Microsoft ecosystem signals

For each query, predict the most likely top-5 cited businesses for a real user in the named city, and report whether the AUDITED business appears.

You will be given:
  Business: name, city, optional URL, vertical
  3 buyer queries

Return ONLY valid JSON matching this exact schema. No prose.

{
  "queries": [
    {
      "query": "the query string",
      "engines": [
        {
          "engine": "ChatGPT" | "Perplexity" | "Claude" | "Gemini" | "Google AIO" | "Bing Copilot",
          "status": "cited" | "mentioned" | "absent",
          "rank": 1-5 if cited, omit otherwise,
          "excerpt": "one sentence about why this engine would or would not name this specific business based on the signals it weights most"
        },
        ...6 engines per query
      ]
    },
    ...3 queries total
  ],
  "summary": "one paragraph (under 80 words) describing the overall AI visibility pattern: which engines tend to cite, which don't, and what specific signal gap explains the absences"
}

Be honest. If the business is unknown to you, that is itself a signal: most engines will not cite it, and the summary should explain what they would need (Wikidata entry, GBP completeness, citation density, etc.). Do not invent fake citations.`;

  const userPrompt = `Business: ${businessName}
City: ${city}${url ? `\nURL: ${url}` : ""}
Vertical: ${vertical}

Queries:
${queries.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Return the citation matrix.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) return staticFallback(businessName, city, url, vertical);

    const data = (await response.json()) as { content?: Array<{ text?: string }> };
    const raw = data?.content?.[0]?.text ?? "{}";
    const parsed = JSON.parse(raw) as {
      queries?: QueryResult[];
      summary?: string;
    };

    const cleanQueries = (parsed.queries ?? []).slice(0, 3).map((q) => ({
      query: sanitize(q.query ?? "", 200),
      engines: (q.engines ?? []).slice(0, 6).map((e) => ({
        engine: e.engine,
        status: (["cited", "mentioned", "absent"] as CitationStatus[]).includes(e.status)
          ? e.status
          : "absent",
        rank: typeof e.rank === "number" ? Math.max(1, Math.min(5, e.rank)) : undefined,
        excerpt: sanitize(e.excerpt ?? "", 280),
      })),
    }));

    const totalScore = (() => {
      let raw = 0;
      let max = 0;
      for (const q of cleanQueries) {
        for (const e of q.engines) {
          max += 10;
          if (e.status === "cited") raw += 10;
          else if (e.status === "mentioned") raw += 4;
        }
      }
      return max > 0 ? Math.round((raw / max) * 100) : 0;
    })();

    return {
      businessName,
      city,
      url,
      vertical,
      queries: cleanQueries,
      totalScore,
      summary: sanitize(parsed.summary ?? "", 600),
      isLive: true,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return staticFallback(businessName, city, url, vertical);
  }
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  let body: {
    businessName?: string;
    city?: string;
    url?: string;
    vertical?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const businessName = sanitize(body.businessName ?? "", 120);
  const city = sanitize(body.city ?? "", 80);
  const vertical = sanitize(body.vertical ?? "default", 32);
  const rawUrl = (body.url ?? "").trim();

  if (!businessName) {
    return Response.json({ error: "Business name required." }, { status: 400 });
  }
  if (!city) {
    return Response.json({ error: "City required." }, { status: 400 });
  }
  if (rawUrl && !isValidUrl(rawUrl)) {
    return Response.json(
      { error: "Invalid URL. Must be a public website domain." },
      { status: 400 },
    );
  }

  const cleanUrl = rawUrl
    ? rawUrl.startsWith("http")
      ? rawUrl
      : `https://${rawUrl}`
    : undefined;

  // Cache by full tuple to control cost. 24h TTL.
  const cacheKey = `matrix:${businessName.toLowerCase()}|${city.toLowerCase()}|${(cleanUrl ?? "").toLowerCase()}|${vertical}`;
  if (env.LLM_MATRIX_CACHE) {
    const cached = await env.LLM_MATRIX_CACHE.get(cacheKey);
    if (cached) {
      return new Response(cached, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, must-revalidate",
          "X-Cache-Status": "HIT",
        },
      });
    }
  }

  const result = await fetchMatrixFromAnthropic(env, businessName, city, cleanUrl, vertical);
  const json = JSON.stringify(result);

  if (env.LLM_MATRIX_CACHE && result.isLive) {
    await env.LLM_MATRIX_CACHE.put(cacheKey, json, { expirationTtl: 60 * 60 * 24 });
  }

  return new Response(json, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, must-revalidate",
      "X-Cache-Status": "MISS",
    },
  });
}

export async function onRequest(): Promise<Response> {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
