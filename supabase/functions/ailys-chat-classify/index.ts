// AiLys Agency · chat intent classifier
// Categorizes incoming messages so the responder can pick the right tone and CTA.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CLASSIFIER_PROMPT = `You are AiLys Agency's intent classifier. AiLys is a Québec-based LLM Visibility & Optimization agency for local businesses (AEO, GEO, E-E-A-T services).

Read the user message and return a JSON object with three fields:
- intent: one of [pricing, services, aeo_geo_eeat, audit, citations, gbp, comparison, location, hours, contact, general]
- confidence: number between 0 and 1
- sentiment: one of [positive, neutral, frustrated, curious, ready_to_buy]

Intent definitions:
- pricing: questions about cost, plans, monthly fees, packages
- services: what AiLys does, deliverables, scope of work
- aeo_geo_eeat: explanations of AEO, GEO, E-E-A-T, schema, entity authority, LLM citations
- audit: requests for the AI Visibility Audit or GBP audit
- citations: how to get cited by ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot
- gbp: Google Business Profile management questions
- comparison: comparing AiLys to other agencies (Sterling Sky, BrightLocal, LocaliQ, etc.)
- location: where AiLys is based, geographic coverage
- hours: availability, response time, scheduling a call
- contact: requests to contact, book a call, talk to a human
- general: anything else

Output ONLY valid JSON, no prose. Example:
{"intent":"pricing","confidence":0.92,"sentiment":"curious"}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY") || Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ intent: "general", confidence: 0.5, sentiment: "neutral" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Anthropic if available, OpenAI as fallback
    let result: { intent: string; confidence: number; sentiment: string };

    if (Deno.env.get("ANTHROPIC_API_KEY")) {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 200,
          system: CLASSIFIER_PROMPT,
          messages: [{ role: "user", content: message }],
        }),
      });
      const data = await r.json();
      const text = data?.content?.[0]?.text ?? "{}";
      result = JSON.parse(text);
    } else {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: CLASSIFIER_PROMPT },
            { role: "user", content: message },
          ],
          response_format: { type: "json_object" },
          max_tokens: 200,
        }),
      });
      const data = await r.json();
      const text = data?.choices?.[0]?.message?.content ?? "{}";
      result = JSON.parse(text);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ intent: "general", confidence: 0.5, sentiment: "neutral", error: String(err) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
