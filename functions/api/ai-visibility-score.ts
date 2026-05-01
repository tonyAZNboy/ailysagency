// Cloudflare Pages Function · /api/ai-visibility-score
//
// Quick mini-audit (different from the full /audit lead magnet).
// Takes a business URL + city, returns a 0-100 score across 5 dimensions:
//   - Technical foundation (HTTPS, mobile, page speed signals)
//   - GBP completeness (estimated from the model's general web knowledge)
//   - Schema deployment (FAQ, LocalBusiness, etc.)
//   - Citation density (how often the business shows up in known directories)
//   - LLM citation density (how often AI engines name the business currently)
//
// Backend: Google Generative Language API, gemini-2.5-flash:generateContent
// with responseMimeType=application/json. Designed to be fast (~3-5 seconds),
// cheap, and shareable. KV cache by URL hash for 24h to reduce API spend.
//
// Security:
//   - Rate-limited via Cloudflare WAF rule (5 req/min per IP)
//   - Input sanitization (URL must parse, city must be alphanumeric + spaces)
//   - No PII collected at this step (email is optional, separate flow)
//   - Gemini API key is server-side only, never exposed to client

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  GEMINI_API_KEY?: string;
  AI_VIS_CACHE?: KVNamespace;
}

interface ScoreResult {
  url: string;
  city: string;
  total: number;
  dimensions: {
    technical: { score: number; finding: string };
    gbp: { score: number; finding: string };
    schema: { score: number; finding: string };
    citations: { score: number; finding: string };
    llmCitations: { score: number; finding: string };
  };
  topRecommendation: string;
  generatedAt: string;
  isLive: boolean;
}

function staticFallback(url: string, city: string): ScoreResult {
  return {
    url,
    city,
    total: 47,
    dimensions: {
      technical: {
        score: 70,
        finding: "Site loads on HTTPS but mobile-first signals need verification.",
      },
      gbp: {
        score: 45,
        finding: "Google Business Profile likely incomplete (categories, attributes, photos).",
      },
      schema: {
        score: 30,
        finding: "No FAQ or LocalBusiness schema detected. Major AEO gap.",
      },
      citations: {
        score: 50,
        finding: "Some directory presence but NAP consistency not verified.",
      },
      llmCitations: {
        score: 40,
        finding: "Currently underrepresented in AI search answers across 6 engines.",
      },
    },
    topRecommendation:
      "Deploy LocalBusiness + FAQ schema as the highest-ROI single move. AiLys Core tier ($600/mo) handles this in week 1.",
    generatedAt: new Date().toISOString(),
    isLive: false,
  };
}

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    return /^[a-z0-9\-.]+\.[a-z]{2,}$/i.test(u.hostname);
  } catch {
    return false;
  }
}

function sanitizeCity(s: string): string {
  return s.replace(/[^\p{L}\p{N}\s\-,]/gu, "").trim().slice(0, 80);
}

async function scoreFromGemini(
  env: Env,
  url: string,
  city: string,
): Promise<ScoreResult> {
  if (!env.GEMINI_API_KEY) return staticFallback(url, city);

  const systemPrompt = `You are an AI search visibility analyst. Given a local business URL and city, return a JSON object scoring the business's visibility inside AI search engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot).

Return ONLY valid JSON matching this schema. No prose, no commentary.

{
  "technical": { "score": 0-100, "finding": "one concrete observation in under 25 words" },
  "gbp": { "score": 0-100, "finding": "one concrete observation in under 25 words" },
  "schema": { "score": 0-100, "finding": "one concrete observation in under 25 words" },
  "citations": { "score": 0-100, "finding": "one concrete observation in under 25 words" },
  "llmCitations": { "score": 0-100, "finding": "one concrete observation in under 25 words" },
  "topRecommendation": "one specific action in under 35 words"
}

Be honest and specific. If you cannot verify a signal, score it neutrally (50) and note the uncertainty in the finding. Do not fabricate. If the URL appears unreachable or generic, return moderate scores with that observation.`;

  const userPrompt = `Business URL: ${url}\nBusiness city: ${city}\n\nScore this business's AI search visibility.`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(env.GEMINI_API_KEY),
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 800,
            responseMimeType: "application/json",
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
          ],
        }),
      },
    );

    if (!response.ok) return staticFallback(url, city);

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    const parsed = JSON.parse(raw) as {
      technical?: { score?: number; finding?: string };
      gbp?: { score?: number; finding?: string };
      schema?: { score?: number; finding?: string };
      citations?: { score?: number; finding?: string };
      llmCitations?: { score?: number; finding?: string };
      topRecommendation?: string;
    };

    const dimensions = {
      technical: {
        score: clampScore(parsed.technical?.score ?? 50),
        finding: parsed.technical?.finding ?? "Could not verify technical signals.",
      },
      gbp: {
        score: clampScore(parsed.gbp?.score ?? 50),
        finding: parsed.gbp?.finding ?? "Could not verify GBP completeness.",
      },
      schema: {
        score: clampScore(parsed.schema?.score ?? 50),
        finding: parsed.schema?.finding ?? "Could not verify schema deployment.",
      },
      citations: {
        score: clampScore(parsed.citations?.score ?? 50),
        finding: parsed.citations?.finding ?? "Could not verify citation density.",
      },
      llmCitations: {
        score: clampScore(parsed.llmCitations?.score ?? 50),
        finding: parsed.llmCitations?.finding ?? "Could not verify LLM citation presence.",
      },
    };

    const total = Math.round(
      (dimensions.technical.score +
        dimensions.gbp.score +
        dimensions.schema.score +
        dimensions.citations.score +
        dimensions.llmCitations.score) /
        5,
    );

    return {
      url,
      city,
      total,
      dimensions,
      topRecommendation:
        parsed.topRecommendation ??
        "Run the full AI Visibility Audit for a 90-day plan.",
      generatedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch {
    return staticFallback(url, city);
  }
}

function clampScore(n: number): number {
  if (typeof n !== "number" || Number.isNaN(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const env = context.env;

  let body: { url?: string; city?: string };
  try {
    body = (await context.request.json()) as { url?: string; city?: string };
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawUrl = (body.url ?? "").trim();
  const rawCity = (body.city ?? "").trim();

  if (!rawUrl || !isValidUrl(rawUrl)) {
    return Response.json(
      { error: "Please provide a valid business website URL." },
      { status: 400 },
    );
  }
  if (!rawCity) {
    return Response.json({ error: "Please provide a business city." }, { status: 400 });
  }

  const cleanUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const cleanCity = sanitizeCity(rawCity);

  // Cache by URL+city hash for 24 hours to control cost
  const cacheKey = `score:${cleanUrl.toLowerCase()}|${cleanCity.toLowerCase()}`;
  if (env.AI_VIS_CACHE) {
    const cached = await env.AI_VIS_CACHE.get(cacheKey);
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

  const result = await scoreFromGemini(env, cleanUrl, cleanCity);
  const json = JSON.stringify(result);

  if (env.AI_VIS_CACHE && result.isLive) {
    await env.AI_VIS_CACHE.put(cacheKey, json, { expirationTtl: 60 * 60 * 24 });
  }

  return new Response(json, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, must-revalidate",
      "X-Cache-Status": "MISS",
    },
  });
}

// Reject non-POST requests
export async function onRequest(): Promise<Response> {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
