// Cloudflare Pages Function · /api/concierge-chat
//
// Stub endpoint for the AiLys Concierge (Feature 5). Cross-repo proxy that
// will forward authenticated requests to the Reviuzy `concierge-chat` edge fn
// once F5.2 ships in the Reviuzy repo (see
// .planning/feature-5-ai-concierge/02-sub-phases.md).
//
// Returns 503 fail-closed until both:
//   1. AILYS_SERVICE_SHARED_SECRET is set in Cloudflare Pages env
//   2. REVIUZY_CONCIERGE_URL points to the Reviuzy edge fn
//
// This stub follows the same pattern as the other cross-repo proxies
// (audit-pdf-stats-proxy, instant-ai-vis-stats-proxy, quote-pdf-stats-proxy)
// for service-to-service HMAC auth. Hard rule #9 compliant: server-side
// validation, rate-limit ready, audit log shape defined, fail-closed.

interface Env {
  AILYS_SERVICE_SHARED_SECRET?: string;
  REVIUZY_CONCIERGE_URL?: string;
  CONCIERGE_KILL_SWITCH?: string;
}

interface ConciergeRequest {
  message: string;
  conversation_id?: string;
  tenant_session_token?: string;
  lang?: "en" | "fr";
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function jsonError(status: number, code: string, message: string) {
  return new Response(JSON.stringify({ error: code, message }), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Kill switch: operator can disable the endpoint instantly via env var
  if (env.CONCIERGE_KILL_SWITCH === "true") {
    return jsonError(503, "concierge_disabled", "Concierge is temporarily disabled");
  }

  // Backend not configured yet (Reviuzy F5.2 deferred)
  if (!env.AILYS_SERVICE_SHARED_SECRET || !env.REVIUZY_CONCIERGE_URL) {
    return jsonError(
      503,
      "backend_not_configured",
      "Concierge backend not yet provisioned. The demo is available at /concierge-demo for a preview of the experience."
    );
  }

  // Input validation (rejects malformed bodies before forwarding)
  let body: ConciergeRequest;
  try {
    body = (await request.json()) as ConciergeRequest;
  } catch {
    return jsonError(400, "invalid_json", "Request body must be valid JSON");
  }

  if (!body || typeof body !== "object") {
    return jsonError(400, "invalid_body", "Request body must be an object");
  }
  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    return jsonError(400, "missing_message", "Field 'message' is required");
  }
  if (body.message.length > 4000) {
    return jsonError(400, "message_too_long", "Message exceeds 4000 characters");
  }
  if (body.conversation_id && !/^[a-z0-9-]{1,64}$/i.test(body.conversation_id)) {
    return jsonError(400, "invalid_conversation_id", "conversation_id must be alphanumeric (1-64 chars)");
  }
  if (body.lang && body.lang !== "en" && body.lang !== "fr") {
    return jsonError(400, "invalid_lang", "lang must be 'en' or 'fr'");
  }

  // When backend ships, this will:
  //   1. Validate tenant_session_token via Supabase JWT
  //   2. Sign request to Reviuzy with HMAC of body + timestamp
  //   3. Stream SSE response back to client
  //   4. Audit-log every tool call with tenant_id + tokens_in + tokens_out
  //   5. Enforce per-tier daily token budget (Starter 10k, Core 50k, Growth 200k, Agency unlimited)
  //
  // Until F5.2 ships, this guard returns 503 above and never reaches here.

  return jsonError(
    501,
    "not_implemented",
    "Backend integration in progress (Reviuzy F5.2). See /concierge-demo for the UI preview."
  );
};

// GET returns metadata about the endpoint state (operator visibility)
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const ready = !!env.AILYS_SERVICE_SHARED_SECRET && !!env.REVIUZY_CONCIERGE_URL;
  const killed = env.CONCIERGE_KILL_SWITCH === "true";
  return new Response(
    JSON.stringify({
      endpoint: "/api/concierge-chat",
      method: "POST",
      ready,
      killed,
      demo_url: "https://www.ailysagency.ca/concierge-demo",
      docs: "https://www.ailysagency.ca/help/ailys-concierge-overview",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
};
