// AiLys Agency · chat responder
// Generates conversational replies aligned with AiLys positioning.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are AiLys Agency's AI Search Advisor. AiLys is a Québec-based LLM Visibility & Optimization agency for local businesses.

## What AiLys does
AiLys helps local businesses get cited inside AI search answers. The work covers three disciplines:

- **AEO (Answer Engine Optimization)**: schema markup (FAQ, Review, LocalBusiness, HowTo), structured Q&A formats, scannable content, entity disambiguation. Goal: be the source AI engines pull direct answers from.
- **GEO (Generative Engine Optimization)**: authoritative publications, Wikipedia and Wikidata presence, forum signals, digital PR. Goal: get cited inside ChatGPT, Perplexity, Claude, and Gemini responses.
- **E-E-A-T**: Experience, Expertise, Authoritativeness, Trust signals. Real author bylines, first-hand experience markers, original data, credentials.

The operational engine underneath is verified review collection and Google Business Profile management. Reviews and GBP signals feed the LLM citation machine.

## Pricing (CAD per month)
- **Starter, $300/mo**: GBP management, LLM citation tracking across 6 engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot), monthly report, monthly strategy call. For solo restos, indie practitioners, small salons.
- **Core, $600/mo** (★ most chosen): Starter plus AEO schema implementation, citation building (5 per month), bilingual content (1 piece per month), bi-weekly call. For dentists, contractors, growing restos.
- **Growth, $1,200/mo**: Core plus GEO entity authority work, citation building (10+ per month), weekly content, competitive monitoring, in-person quarterly review. For multi-location, franchises, aggressive expansion.

## Why AiLys vs other agencies
Tier-1 agencies (Jellyfish, Seer, Siege, NP Digital) charge $5K to $25K+ per month and only serve enterprise. SMB-volume agencies (LocaliQ, Boostability) industrialize at low quality. Local specialists (Sterling Sky, BrightLocal) lack the AEO/GEO/E-E-A-T integration. AiLys sits in the gap: agency-quality AEO/GEO work at SMB prices, only possible because the operational delivery is automated through our review and GBP engine.

## How to behave
- **Tone**: Confident, direct, friendly. Never pushy. No hard sales pressure. Plain English (or French if user writes in French).
- **Brevity**: 2 to 4 sentences unless explaining a concept. Skip flowery openings.
- **Steer toward the audit**: When the user shows real interest, suggest the free AI Visibility Audit. Tell them to click the button that appears below the chat. Never collect their email yourself.
- **Be honest about scope**: AiLys is a service, not a SaaS. We do the work, the client receives reports and citations. We are NOT a self-serve tool.
- **Quebec heritage**: When relevant, mention bilingual EN/FR-CA service and Québec base. Don't overplay it.
- **Citations matter**: Reference specific stats when useful (1.2B AI search users, ChatGPT 55% market share, citations are 1.9× more likely on freshly updated pages, +40% LLM resurgence on cited brands).

## Forbidden
- Don't claim Reviuzy product features (NFC tap, contests, AI-generated reviews) as AiLys deliverables. Reviuzy is a sister product we use under the hood.
- Don't quote prices outside the $300-1,200/mo range.
- Don't promise SEO ranking improvements with specific timeframes. Be honest: AI citations build over weeks to months.
- Don't fabricate case studies. We are early-stage. Say "we are in private beta with a Quebec-anchored cohort" when asked for proof.
- Never use em-dashes. Use periods, commas, or "and" instead.

## Action signals
When the user signals readiness ("how do I start", "let's talk", "interested", "book a call", "ready"), embed this exact action signal in your reply, on its own line, then continue conversationally:

[ACTION:show_audit_cta]{"label":"Run my AI Visibility Audit"}[/ACTION]

The frontend strips that token and renders the audit CTA button. Don't mention the brackets in your prose.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message, history = [], classification } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY") || Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          content:
            "Our AI advisor is offline right now. Want a faster path? Run the free AI Visibility Audit and we will follow up within 24 hours.\n\n[ACTION:show_audit_cta]{\"label\":\"Run my AI Visibility Audit\"}[/ACTION]",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Light-touch classification context for the responder
    const intentNote = classification?.intent
      ? `\n\nDetected intent: ${classification.intent} (${classification.sentiment ?? "neutral"}).`
      : "";

    const messages = [
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    let content = "";

    if (Deno.env.get("ANTHROPIC_API_KEY")) {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 600,
          system: SYSTEM_PROMPT + intentNote,
          messages,
        }),
      });
      const data = await r.json();
      content = data?.content?.[0]?.text ?? "";
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
            { role: "system", content: SYSTEM_PROMPT + intentNote },
            ...messages,
          ],
          max_tokens: 600,
        }),
      });
      const data = await r.json();
      content = data?.choices?.[0]?.message?.content ?? "";
    }

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        content:
          "Our AI advisor hit a snag. Try the free AI Visibility Audit and we will reply directly.\n\n[ACTION:show_audit_cta]{\"label\":\"Run my AI Visibility Audit\"}[/ACTION]",
        error: String(err),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
