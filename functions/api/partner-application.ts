// Cloudflare Pages Function · /api/partner-application
//
// Captures partner agency applications from the Partner Program landing
// page at /agencies/partner-program (and the 16 locale variants).
//
// Per .planning/phase-f3-0-partner-waitlist/01-threat-model.md:
//   - Server-side input validation
//   - Honeypot spam filter (`website_url_alt` field must be empty)
//   - Origin allowlist + disposable-email reject
//   - Length caps on every field
//   - Idempotency via payload hash dedupe
//   - DRY_RUN env support (no Resend dispatch + no DB insert)
//   - PARTNER_APPLICATIONS_KILL_SWITCH env (fail-closed)
//
// Dual delivery (matches founding-clients-apply pattern):
//   1. Supabase partner_applications insert (admin dashboard visibility)
//   2. Resend internal alert email to operator (instant ops alert)

import { checkRateLimit } from "../lib/rateLimit";
import { captureServerError } from "../lib/serverError";
import { insertSupabaseRow } from "../lib/supabaseInsert";
import { escapeHtml } from "../lib/htmlEscape";
import { sha256Hex } from "../lib/crypto";

interface Env {
  ALLOWED_ORIGINS?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  OPERATOR_NOTIFY_EMAIL?: string;
  PARTNER_APPLICATIONS_KILL_SWITCH?: string;
  PARTNER_APPLICATIONS_DRY_RUN?: string;
  /** Optional KV binding. Bind in Cloudflare Pages → Settings → Functions →
   *  KV bindings (variable name: PARTNER_APPLICATIONS_RATE_LIMIT). When
   *  unbound, rate-limit fails open with audit log entry. */
  PARTNER_APPLICATIONS_RATE_LIMIT?: KVNamespace;
  /** Build commit (set by Cloudflare Pages env). Used by serverError
   *  capture to include in alerts. */
  CF_PAGES_COMMIT_SHA?: string;
}

const NOTIFY_FROM = "AiLys Partner Program <hello@ailysagency.ca>";

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "10minutemail.com",
  "trashmail.com",
  "fakeinbox.com",
  "getnada.com",
]);

const ALLOWED_LANGS = new Set(["en", "fr"]);

interface ApplicationBody {
  agencyName?: string;
  contactName?: string;
  contactEmail?: string;
  city?: string;
  language?: string;
  currentClientCount?: number | string;
  expectedReferralsPerYear?: number | string;
  pitch?: string;
  websiteUrlAlt?: string; // honeypot
  source?: string;
  visitorSessionId?: string;
}

interface ValidatedData {
  agency_name: string;
  contact_name: string;
  contact_email: string;
  city: string | null;
  language: string;
  current_client_count: number | null;
  expected_referrals_per_year: number | null;
  pitch: string | null;
  source: string;
  visitor_session_id: string | null;
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254 || email.length < 5) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) return false;
  return true;
}

function clip(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

function clipInt(value: unknown, min: number, max: number): number | null {
  if (value === undefined || value === null || value === "") return null;
  const n = typeof value === "number" ? value : parseInt(String(value), 10);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  if (n < min || n > max) return null;
  return n;
}

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data: ValidatedData;
  honeypotTriggered: boolean;
}

export function validate(body: ApplicationBody): ValidationResult {
  const errors: string[] = [];
  const honeypotTriggered = !!(body.websiteUrlAlt && body.websiteUrlAlt.length > 0);

  const agency_name = clip(body.agencyName, 200);
  if (!agency_name) errors.push("agencyName is required");
  else if (agency_name.length < 2) errors.push("agencyName too short");

  const contact_name = clip(body.contactName, 100);
  if (!contact_name) errors.push("contactName is required");
  else if (contact_name.length < 2) errors.push("contactName too short");

  const contact_email = clip(body.contactEmail, 254);
  if (!contact_email) errors.push("contactEmail is required");
  else if (!isValidEmail(contact_email)) errors.push("contactEmail is invalid");

  const city = clip(body.city, 100);

  const langRaw = clip(body.language, 5) ?? "en";
  const language = ALLOWED_LANGS.has(langRaw) ? langRaw : "en";

  // Integer fields: accept undefined/null/empty as null. Validate range when present.
  const current_client_count =
    body.currentClientCount === undefined || body.currentClientCount === null || body.currentClientCount === ""
      ? null
      : clipInt(body.currentClientCount, 0, 10000);
  if (
    body.currentClientCount !== undefined &&
    body.currentClientCount !== null &&
    body.currentClientCount !== "" &&
    current_client_count === null
  ) {
    errors.push("currentClientCount must be an integer 0-10000");
  }

  const expected_referrals_per_year =
    body.expectedReferralsPerYear === undefined ||
    body.expectedReferralsPerYear === null ||
    body.expectedReferralsPerYear === ""
      ? null
      : clipInt(body.expectedReferralsPerYear, 0, 1000);
  if (
    body.expectedReferralsPerYear !== undefined &&
    body.expectedReferralsPerYear !== null &&
    body.expectedReferralsPerYear !== "" &&
    expected_referrals_per_year === null
  ) {
    errors.push("expectedReferralsPerYear must be an integer 0-1000");
  }

  const pitch = clip(body.pitch, 2000);
  if (body.pitch && typeof body.pitch === "string" && body.pitch.length > 2000) {
    errors.push("pitch too long (max 2000 chars)");
  }

  const source = clip(body.source, 50) ?? "partner-program";
  const visitor_session_id = clip(body.visitorSessionId, 64);

  return {
    ok: errors.length === 0,
    errors,
    honeypotTriggered,
    data: {
      agency_name: agency_name ?? "",
      contact_name: contact_name ?? "",
      contact_email: contact_email ?? "",
      city,
      language,
      current_client_count,
      expected_referrals_per_year,
      pitch,
      source,
      visitor_session_id,
    },
  };
}

function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = (env.ALLOWED_ORIGINS ??
    "https://www.ailysagency.ca,https://ailysagency.ca,https://ailysagency.pages.dev")
    .split(",")
    .map((s) => s.trim());
  return allowed.includes(origin) || origin.startsWith("http://localhost");
}


export async function payloadHash(data: ValidatedData): Promise<string> {
  return sha256Hex(`${data.agency_name}|${data.contact_email}|${data.pitch ?? ""}`);
}

export async function ipHash(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  // Daily rotating salt: yyyy-mm-dd
  const day = new Date().toISOString().slice(0, 10);
  return sha256Hex(`${day}|${ip}`);
}

async function forwardToSupabase(
  env: Env,
  data: ValidatedData,
  hash: string,
  ipHashValue: string | null,
): Promise<{ ok: boolean; error?: string }> {
  return insertSupabaseRow(
    env,
    "partner_applications",
    {
      ...data,
      payload_hash: hash,
      ip_hash: ipHashValue,
      created_at: new Date().toISOString(),
    },
    { ignoreDuplicates: true },
  );
}

async function sendOpsEmail(env: Env, data: ValidatedData): Promise<{ ok: boolean; error?: string }> {
  if (!env.RESEND_API_KEY) {
    console.log("Partner-app email skipped (no RESEND_API_KEY)");
    return { ok: true };
  }
  const to = env.OPERATOR_NOTIFY_EMAIL;
  if (!to) {
    console.log("Partner-app email skipped (OPERATOR_NOTIFY_EMAIL not set)");
    return { ok: true };
  }
  const subject = `[Partner-App] ${data.agency_name} (${data.city ?? "no city"}, ~${data.current_client_count ?? "?"} clients)`;
  const rows: [string, string][] = [
    ["Agency", data.agency_name],
    ["Contact", data.contact_name],
    ["Email", data.contact_email],
    ["City", data.city ?? "(not provided)"],
    ["Language", data.language],
    ["Current clients", data.current_client_count?.toString() ?? "(not provided)"],
    ["Expected referrals/yr", data.expected_referrals_per_year?.toString() ?? "(not provided)"],
    ["Source", data.source],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.05em">${escapeHtml(label)}</td><td style="padding:6px 12px;border-bottom:1px solid #1f2937;color:#e5e7eb">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const pitchBlock = data.pitch
    ? `<div style="margin-top:16px"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;margin-bottom:6px">Pitch</div><div style="background:#0a0e1a;border:1px solid #1f2937;border-radius:8px;padding:12px;color:#e5e7eb;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.pitch)}</div></div>`
    : "";
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#050505;color:#e5e7eb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#0a0e1a;border:1px solid #1f2937;border-radius:12px;padding:24px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#a78bfa;margin-bottom:8px">AiLys Agency · Partner Program</div>
      <h1 style="font-size:22px;margin:0 0 16px 0;color:#22d3ee">New partner application</h1>
      <p style="color:#9ca3af;font-size:14px;margin:0 0 16px 0">Submitted ${escapeHtml(new Date().toISOString())}.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:8px"><tbody>${tableRows}</tbody></table>
      ${pitchBlock}
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1f2937;font-size:12px;color:#6b7280">Reply directly to reach the agency. Tracked at /admin/partner-applications.</div>
    </div>
  </body></html>`;
  const text = [
    "AiLys Agency · Partner Program · New application",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    data.pitch ? `\nPitch:\n${data.pitch}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [to],
        reply_to: data.contact_email,
        subject,
        html,
        text,
      }),
    });
    if (!resp.ok) {
      const text2 = await resp.text().catch(() => "");
      console.warn("Partner-app Resend send failed", resp.status, text2.slice(0, 300));
      return { ok: false, error: `Resend ${resp.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.warn("Partner-app Resend send threw", (err as Error).message);
    return { ok: false, error: (err as Error).message };
  }
}

function isKilled(env: Env): boolean {
  // Default fail-closed: if env is missing or anything other than "true",
  // the feature is OFF. Set PARTNER_APPLICATIONS_KILL_SWITCH=true to enable.
  return (env.PARTNER_APPLICATIONS_KILL_SWITCH ?? "").toLowerCase() !== "true";
}

function isDryRun(env: Env): boolean {
  return (env.PARTNER_APPLICATIONS_DRY_RUN ?? "").toLowerCase() === "true";
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (isKilled(env)) {
    return new Response(JSON.stringify({ error: "feature_disabled" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isAllowedOrigin(request, env)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: ApplicationBody;
  try {
    body = (await request.json()) as ApplicationBody;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const v = validate(body);

  // Honeypot triggered: silent 202, no DB insert, no email
  if (v.honeypotTriggered) {
    return new Response(
      JSON.stringify({ ok: true, accepted: true, tracking_id: "honeypot-silent" }),
      {
        status: 202,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            request.headers.get("origin") ?? "https://www.ailysagency.ca",
        },
      },
    );
  }

  if (!v.ok) {
    return new Response(JSON.stringify({ error: v.errors.join("; ") }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  const hash = await payloadHash(v.data);
  const ipH = await ipHash(ip);

  // Rate limit BEFORE DRY_RUN so dry-run requests still surface rate-limit
  // hits in their synthesized response. Identity bucket uses email hash so
  // an attacker cannot rotate IP to flood one applicant's email.
  if (ipH) {
    const emailHash = await sha256Hex(`partner-app:${v.data.contact_email}`);
    const rl = await checkRateLimit(env.PARTNER_APPLICATIONS_RATE_LIMIT, {
      ipHash: ipH,
      identityHash: emailHash,
      ipPerHour: 10,
      identityPerDay: 5,
      keyPrefix: "rl:partner-app",
    });
    if (!rl.allowed) {
      return new Response(
        JSON.stringify({
          error: "rate_limited",
          reason: rl.reason,
          retry_after_minutes: rl.reason === "ip_per_hour" ? 60 : 60 * 24,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rl.reason === "ip_per_hour" ? 3600 : 86400),
            "Access-Control-Allow-Origin":
              request.headers.get("origin") ?? "https://www.ailysagency.ca",
          },
        },
      );
    }
  }

  // DRY_RUN: short-circuit before any external calls
  if (isDryRun(env)) {
    return new Response(
      JSON.stringify({
        ok: true,
        dry_run: true,
        tracking_id: hash.slice(0, 12),
        synthesized: { ...v.data, payload_hash: hash, ip_hash: ipH },
      }),
      {
        status: 202,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            request.headers.get("origin") ?? "https://www.ailysagency.ca",
        },
      },
    );
  }

  const [supaResult, emailResult] = await Promise.all([
    forwardToSupabase(env, v.data, hash, ipH),
    sendOpsEmail(env, v.data),
  ]);

  if (!supaResult.ok && !emailResult.ok) {
    // Both delivery channels failed: this is a real ops incident. Capture
    // via the shared serverError lib so the operator gets a Resend alert
    // immediately and the row is persisted to audit_log for triage. Best-
    // effort; the 500 response below fires regardless of capture success.
    await captureServerError(env, {
      endpoint: "partner-application",
      severity: "error",
      err: new Error(
        `dual delivery failure: supabase=${supaResult.error ?? "?"}, resend=${emailResult.error ?? "?"}`,
      ),
      requestId: hash.slice(0, 12),
      userIpHash: ipH ?? undefined,
      payloadHash: hash,
      context: {
        supabase_ok: supaResult.ok,
        resend_ok: emailResult.ok,
        supabase_error: supaResult.error ?? null,
        resend_error: emailResult.error ?? null,
      },
    });
    return new Response(
      JSON.stringify({
        error: "Both delivery channels failed; please try again or email hello@ailysagency.ca",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      tracking_id: hash.slice(0, 12),
      delivered: { admin: supaResult.ok, email: emailResult.ok },
    }),
    {
      status: 202,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          request.headers.get("origin") ?? "https://www.ailysagency.ca",
      },
    },
  );
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": request.headers.get("origin") ?? "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};

export const onRequestGet: PagesFunction<Env> = async () => {
  return new Response(JSON.stringify({ error: "method_not_allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "POST, OPTIONS" },
  });
};
