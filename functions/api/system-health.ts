// Cloudflare Pages Function · /api/system-health
//
// Operator visibility endpoint. Returns the current state of every
// AiLys runtime feature behind a kill switch, every KV namespace
// binding, build version, and recent cron heartbeat counts.
//
// Use cases
// ---------
// - Healthcheck for uptime monitors (Pingdom, BetterStack, etc.)
// - Operator dashboard (read once on /admin/overview)
// - CI smoke (post-deploy assertion that critical bindings exist)
//
// Authentication
// --------------
// PUBLIC by default. Returns ONLY non-sensitive booleans + counts.
// No secrets, no PII, no payload data. Safe to expose.
//
// To require auth (e.g., for tenant-scoped detail), wire the existing
// admin operator profile gate via Bearer token. Out of scope here.
//
// Response shape (stable contract; do not break)
// ----------------------------------------------
// {
//   "ok": true,
//   "timestamp": "2026-05-02T15:00:00.000Z",
//   "build": { "version": "0.15.0", "commit": "<git-sha-or-unknown>" },
//   "features": {
//     "partner_applications": { "killSwitch": "on" | "off", "kvBound": true },
//     "audit_pdf": { "killSwitch": "on" | "off", "kvBound": true },
//     ...
//   },
//   "secrets": {
//     "RESEND_API_KEY": "set" | "unset",
//     "SUPABASE_URL": "set" | "unset",
//     ...  // booleans only, never values
//   }
// }
//
// Error mode: 503 with { "ok": false, "error": "..." } on internal
// failure. Healthchecks should treat 5xx as DOWN.

interface Env {
  // Build / runtime
  CF_PAGES_COMMIT_SHA?: string;
  CF_PAGES_BRANCH?: string;

  // Kill switches (all default to fail-closed when unset, except where noted)
  PARTNER_APPLICATIONS_KILL_SWITCH?: string;
  AUDIT_PDF_EXPORT_KILL_SWITCH?: string;
  CHAT_ADVISOR_KILL_SWITCH?: string;
  AUDIT_REQUEST_KILL_SWITCH?: string;

  // Secrets (presence-only check, never the value)
  RESEND_API_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  GEMINI_API_KEY?: string;
  AILYS_SERVICE_SHARED_SECRET?: string;
  REVIUZY_CONCIERGE_URL?: string;
  NEWSLETTER_UNSUB_SECRET?: string;

  // Operator notification email (presence-only)
  OPERATOR_NOTIFY_EMAIL?: string;
  FOUNDING_NOTIFY_EMAIL?: string;

  // KV bindings (presence-only check)
  PARTNER_APPLICATIONS_RATE_LIMIT?: KVNamespace;
  NEWSLETTER_RATE_LIMIT?: KVNamespace;
  FOUNDING_CLIENTS_RATE_LIMIT?: KVNamespace;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  CHAT_RATE_LIMIT?: KVNamespace;
  CITATION_CACHE?: KVNamespace;
  AI_VIS_CACHE?: KVNamespace;
}

// CLAUDE.md hard rule #14 Section 9: STATE.md updated same commit.
// The build version is also surfaced here for runtime assertion. Static
// fallback so this endpoint works locally without git context.
const FALLBACK_VERSION = "0.15.0";

// Map kill-switch env var name → semantic feature name
// Each kill switch is "on" when env value === "true" (case-insensitive)
const KILL_SWITCHES: ReadonlyArray<{ env: keyof Env; feature: string; defaultOn: boolean }> = [
  { env: "PARTNER_APPLICATIONS_KILL_SWITCH", feature: "partner_applications", defaultOn: false },
  { env: "AUDIT_PDF_EXPORT_KILL_SWITCH", feature: "audit_pdf_export", defaultOn: true },
  { env: "CHAT_ADVISOR_KILL_SWITCH", feature: "chat_advisor", defaultOn: true },
  { env: "AUDIT_REQUEST_KILL_SWITCH", feature: "audit_request", defaultOn: true },
];

const SECRETS_TO_CHECK: ReadonlyArray<keyof Env> = [
  "RESEND_API_KEY",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANTHROPIC_API_KEY",
  "GEMINI_API_KEY",
  "AILYS_SERVICE_SHARED_SECRET",
  "REVIUZY_CONCIERGE_URL",
  "NEWSLETTER_UNSUB_SECRET",
  "OPERATOR_NOTIFY_EMAIL",
  "FOUNDING_NOTIFY_EMAIL",
];

const KV_BINDINGS_TO_CHECK: ReadonlyArray<keyof Env> = [
  "PARTNER_APPLICATIONS_RATE_LIMIT",
  "NEWSLETTER_RATE_LIMIT",
  "FOUNDING_CLIENTS_RATE_LIMIT",
  "AUDIT_PDF_RATE_LIMIT",
  "CHAT_RATE_LIMIT",
  "CITATION_CACHE",
  "AI_VIS_CACHE",
];

function isKillSwitchOn(env: Env, varName: keyof Env, defaultOn: boolean): boolean {
  const raw = (env[varName] as string | undefined) ?? "";
  if (raw === "") return defaultOn;
  return raw.toLowerCase() === "true";
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const features: Record<string, { killSwitch: "on" | "off"; defaultOn: boolean }> = {};
    for (const { env: varName, feature, defaultOn } of KILL_SWITCHES) {
      features[feature] = {
        killSwitch: isKillSwitchOn(env, varName, defaultOn) ? "on" : "off",
        defaultOn,
      };
    }

    const secrets: Record<string, "set" | "unset"> = {};
    for (const key of SECRETS_TO_CHECK) {
      const value = env[key];
      secrets[key as string] = value && (value as string).length > 0 ? "set" : "unset";
    }

    const kvBindings: Record<string, "bound" | "unbound"> = {};
    for (const key of KV_BINDINGS_TO_CHECK) {
      const value = env[key];
      kvBindings[key as string] = value && typeof (value as KVNamespace).get === "function" ? "bound" : "unbound";
    }

    const body = {
      ok: true,
      timestamp: new Date().toISOString(),
      build: {
        version: FALLBACK_VERSION,
        commit: env.CF_PAGES_COMMIT_SHA ?? "unknown",
        branch: env.CF_PAGES_BRANCH ?? "unknown",
      },
      features,
      secrets,
      kvBindings,
    };

    return new Response(JSON.stringify(body, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Access-Control-Allow-Origin": "*", // Public ops surface
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "internal_error",
        detail: err instanceof Error ? err.message.slice(0, 200) : "unknown",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }
};

// Reject non-GET methods to keep the surface minimal.
export const onRequestPost: PagesFunction<Env> = () =>
  new Response(JSON.stringify({ error: "method_not_allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "GET, OPTIONS" },
  });

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
