// Cloudflare Pages Function · /api/hero-citation
//
// Returns a real LLM citation for a rotating local-business query.
// Calls Anthropic only on every 5th render. Other 4 of every 5 visitors get
// the previously-cached result (still real, still recent, just shared).
//
// Setup:
//   1. Cloudflare Pages → ailysagency project → Settings → Environment variables
//   2. Add ANTHROPIC_API_KEY (encrypted) for production
//   3. Optionally bind a KV namespace named CITATION_CACHE for cross-region cache
//
// Without ANTHROPIC_API_KEY set, returns a clearly-labeled static fallback so
// the hero never shows fake "live" data.

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
  CITATION_CACHE?: KVNamespace;
}

interface CitationResult {
  query: string;
  city: string;
  vertical: string;
  cited_business: string;
  context: string;
  sources: string[];
  cached_at: string;
  render_index: number;
  is_live: boolean;
}

// Rotating query list. Each fresh API call advances to the next entry.
const QUERIES = [
  { city: "Montréal", vertical: "Dentist accepting new patients" },
  { city: "Québec City", vertical: "Best sushi restaurant" },
  { city: "Laval", vertical: "Plumber for emergency calls" },
  { city: "Gatineau", vertical: "Family law attorney" },
  { city: "Sherbrooke", vertical: "Veterinary clinic" },
  { city: "Trois-Rivières", vertical: "Hair salon" },
  { city: "Toronto", vertical: "Bilingual real estate agent" },
  { city: "Ottawa", vertical: "Boutique hotel" },
  { city: "Montréal", vertical: "Pediatric dental clinic" },
  { city: "Québec City", vertical: "Wedding photographer" },
];

const RENDERS_PER_FETCH = 5;

// Per-isolate state (used as fallback when KV is not bound)
let memCache: { result: CitationResult; renderCount: number } | null = null;

function staticFallback(renderIndex: number): CitationResult {
  const q = QUERIES[renderIndex % QUERIES.length];
  return {
    query: `Best ${q.vertical.toLowerCase()} in ${q.city}`,
    city: q.city,
    vertical: q.vertical,
    cited_business: "Run the AI Visibility Audit",
    context:
      "We connect to ChatGPT, Perplexity, Claude, Gemini, Google AIO and Bing Copilot for every audit. Submit your business and city to see your real citation footprint.",
    sources: ["AiLys AI Visibility Audit"],
    cached_at: new Date().toISOString(),
    render_index: renderIndex,
    is_live: false,
  };
}

async function fetchFromAnthropic(
  env: Env,
  renderIndex: number,
): Promise<CitationResult> {
  const q = QUERIES[renderIndex % QUERIES.length];
  const queryString = `Best ${q.vertical.toLowerCase()} in ${q.city}`;

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return staticFallback(renderIndex);
  }

  const systemPrompt = `You simulate how a generic AI search engine would answer a local business query for a Canadian buyer. Reply ONLY with valid JSON, no prose, no commentary.

Schema:
{
  "cited_business": "name of one specific real or plausible business that would rank highly for this query",
  "context": "one sentence about the signal that would earn this citation: review velocity, GBP completeness, citation density, schema, or first-hand experience markers. Concrete, not generic.",
  "sources": ["domain1.com", "domain2.com", "domain3.com"]
}

Pick a real-sounding business name (you may invent if uncertain, must not be a known fictional brand). Cite 3 plausible source domains a real LLM would pull from for this query (Yelp, Google Business Profile, the business own site, industry directory, news mention, etc).`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: queryString }],
      }),
    });

    if (!response.ok) return staticFallback(renderIndex);

    const data = (await response.json()) as {
      content?: Array<{ text?: string }>;
    };
    const raw = data?.content?.[0]?.text ?? "{}";
    const parsed = JSON.parse(raw) as {
      cited_business?: string;
      context?: string;
      sources?: string[];
    };

    return {
      query: queryString,
      city: q.city,
      vertical: q.vertical,
      cited_business: parsed.cited_business ?? "(unknown)",
      context: parsed.context ?? "",
      sources: parsed.sources ?? [],
      cached_at: new Date().toISOString(),
      render_index: renderIndex,
      is_live: true,
    };
  } catch {
    return staticFallback(renderIndex);
  }
}

async function getRenderCounter(env: Env): Promise<number> {
  if (env.CITATION_CACHE) {
    const v = await env.CITATION_CACHE.get("render_counter");
    return v ? parseInt(v, 10) : 0;
  }
  return memCache?.renderCount ?? 0;
}

async function setRenderCounter(env: Env, n: number): Promise<void> {
  if (env.CITATION_CACHE) {
    await env.CITATION_CACHE.put("render_counter", String(n));
  }
}

async function getCachedResult(env: Env): Promise<CitationResult | null> {
  if (env.CITATION_CACHE) {
    const v = await env.CITATION_CACHE.get("last_citation");
    return v ? (JSON.parse(v) as CitationResult) : null;
  }
  return memCache?.result ?? null;
}

async function setCachedResult(env: Env, result: CitationResult): Promise<void> {
  if (env.CITATION_CACHE) {
    await env.CITATION_CACHE.put("last_citation", JSON.stringify(result), {
      expirationTtl: 60 * 60 * 24, // 24h max
    });
  }
}

export async function onRequest(context: { env: Env }): Promise<Response> {
  const env = context.env;

  // Bump render counter
  const prevCount = await getRenderCounter(env);
  const nextCount = prevCount + 1;
  await setRenderCounter(env, nextCount);

  // Fetch fresh on every Nth render (1, 6, 11, 16, ...) so visitor #1 also gets live data
  const isFreshFetchRender = (nextCount - 1) % RENDERS_PER_FETCH === 0;

  let result: CitationResult;
  let cacheStatus: string;

  if (isFreshFetchRender) {
    // Pull fresh data from Anthropic
    result = await fetchFromAnthropic(env, nextCount - 1);
    await setCachedResult(env, result);
    if (!env.CITATION_CACHE) {
      memCache = { result, renderCount: nextCount };
    }
    cacheStatus = "FRESH";
  } else {
    // Return last cached result if available, else fall back
    const cached = await getCachedResult(env);
    result = cached ?? staticFallback(nextCount - 1);
    cacheStatus = cached ? "CACHED" : "FALLBACK";
  }

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, must-revalidate",
      "X-Render-Index": String(nextCount),
      "X-Cache-Status": cacheStatus,
      "X-Renders-Per-Fetch": String(RENDERS_PER_FETCH),
    },
  });
}
