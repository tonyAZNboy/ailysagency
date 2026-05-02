// Cloudflare Pages Function · /api/founding-clients-apply
//
// Captures Founding Clients Program applications from the dedicated apply page
// at /founding-clients (EN), /clients-fondateurs (FR-CA), /cho-chu-doanh-nghiep (VI).
//
// Dual delivery (per user request):
//   1. Supabase landing_leads insert (admin dashboard visibility).
//   2. Resend email to anthonyng135@gmail.com (instant ops alert).
//
// Government-grade defaults per CLAUDE.md hard rule #9:
//   - Strict server-side input validation
//   - Honeypot spam filter (`honeypot` field must be empty)
//   - Origin allowlist + disposable-email reject
//   - Length caps on every field
//   - No PII echoed back; structured response only
//   - Rate limit via shared lib (functions/lib/rateLimit.ts) when KV bound

import { checkRateLimit, sha256Hex } from "../lib/rateLimit";
import { captureServerError } from "../lib/serverError";
import { insertSupabaseRow } from "../lib/supabaseInsert";
import { escapeHtml } from "../lib/htmlEscape";
import { isAllowedOrigin } from "../lib/origin";
import { isValidEmail } from "../lib/email";
import { clip } from "../lib/stringClip";

interface Env {
  ALLOWED_ORIGINS?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  FOUNDING_NOTIFY_EMAIL?: string;
  /** Optional KV binding for rate-limit. When unbound, fails open with
   *  audit-log entry so operator sees the missing binding. */
  FOUNDING_CLIENTS_RATE_LIMIT?: KVNamespace;
  /** Build commit (set by Cloudflare Pages env). Used by serverError
   *  capture for inclusion in operator alert emails. */
  CF_PAGES_COMMIT_SHA?: string;
}

const NOTIFY_FROM = "AiLys Founding Clients <hello@ailysagency.ca>";

const ALLOWED_VERTICALS = new Set([
  "dentist",
  "lawyer",
  "restaurant",
  "contractor",
  "clinic",
  "real_estate",
  "hotel",
  "nail_salon",
  "other",
]);

const ALLOWED_TIERS = new Set(["starter", "core", "growth", "agency", "undecided"]);
const ALLOWED_LANGS = new Set(["en", "fr", "vi", "es", "ar", "zh"]);

interface ApplicationBody {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  website?: string;
  gbpUrl?: string;
  location?: string;
  vertical?: string;
  tier?: string;
  currentSeo?: string;
  motivation?: string;
  honeypot?: string;
  lang?: string;
  source?: string;
}

interface ValidatedData {
  name: string;
  email: string;
  phone: string | null;
  businessName: string;
  website: string;
  gbpUrl: string | null;
  location: string | null;
  vertical: string;
  tier: string;
  currentSeo: string | null;
  motivation: string | null;
  lang: string;
  source: string;
}

function validate(body: ApplicationBody): { ok: boolean; errors: string[]; data: ValidatedData } {
  const errors: string[] = [];

  if (body.honeypot && body.honeypot.length > 0) errors.push("Spam check failed");

  const name = clip(body.name, 200);
  if (!name) errors.push("name is required");
  else if (name.length < 2) errors.push("name too short");

  const email = clip(body.email, 254);
  if (!email) errors.push("email is required");
  else if (!isValidEmail(email)) errors.push("email is invalid");

  const businessName = clip(body.businessName, 200);
  if (!businessName) errors.push("businessName is required");

  const website = clip(body.website, 500);
  if (!website) errors.push("website is required");
  else if (!/^https?:\/\//i.test(website)) errors.push("website must be a full URL");

  const phone = clip(body.phone, 50);
  const gbpUrl = clip(body.gbpUrl, 500);
  if (gbpUrl && !/^https?:\/\//i.test(gbpUrl)) errors.push("gbpUrl must be a full URL");
  const location = clip(body.location, 200);

  const verticalRaw = clip(body.vertical, 50) ?? "other";
  const vertical = ALLOWED_VERTICALS.has(verticalRaw) ? verticalRaw : "other";

  const tierRaw = clip(body.tier, 50) ?? "undecided";
  const tier = ALLOWED_TIERS.has(tierRaw) ? tierRaw : "undecided";

  const currentSeo = clip(body.currentSeo, 1500);
  const motivation = clip(body.motivation, 1500);

  const langRaw = clip(body.lang, 5) ?? "en";
  const lang = ALLOWED_LANGS.has(langRaw) ? langRaw : "en";
  const source = clip(body.source, 50) ?? "founding-clients";

  return {
    ok: errors.length === 0,
    errors,
    data: {
      name: name ?? "",
      email: email ?? "",
      phone,
      businessName: businessName ?? "",
      website: website ?? "",
      gbpUrl,
      location,
      vertical,
      tier,
      currentSeo,
      motivation,
      lang,
      source,
    },
  };
}

async function forwardToSupabase(
  env: Env,
  data: ValidatedData,
  ip: string | null,
): Promise<{ ok: boolean; error?: string }> {
  return insertSupabaseRow(env, "landing_leads", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.businessName,
    website: data.website,
    gbp_url: data.gbpUrl,
    location: data.location,
    vertical: data.vertical,
    tier_interest: data.tier,
    notes: [
      `Current SEO: ${data.currentSeo ?? "not provided"}`,
      `Motivation: ${data.motivation ?? "not provided"}`,
    ].join("\n\n"),
    lang: data.lang,
    source: data.source,
    ip_address: ip,
    created_at: new Date().toISOString(),
  });
}


async function sendOpsEmail(
  env: Env,
  data: ValidatedData,
  ip: string | null,
): Promise<{ ok: boolean; error?: string }> {
  if (!env.RESEND_API_KEY) {
    console.log("Founding-client email skipped (no RESEND_API_KEY)");
    return { ok: true };
  }
  const to = env.FOUNDING_NOTIFY_EMAIL;
  if (!to) {
    console.log("Founding-client email skipped (FOUNDING_NOTIFY_EMAIL not set)");
    return { ok: true };
  }
  const verticalLabel = data.vertical;
  const tierLabel = data.tier;
  const subject = `[Founding-Client] ${data.businessName} (${verticalLabel}, tier ${tierLabel})`;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "(not provided)"],
    ["Business", data.businessName],
    ["Website", data.website],
    ["GBP URL", data.gbpUrl || "(not provided)"],
    ["Location", data.location || "(not provided)"],
    ["Industry", verticalLabel],
    ["Tier of interest", tierLabel],
    ["Preferred language", data.lang],
    ["Submitted from IP", ip || "(unknown)"],
    ["Source", data.source],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.05em">${escapeHtml(label)}</td><td style="padding:6px 12px;border-bottom:1px solid #1f2937;color:#e5e7eb">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const longBlocks = [
    { label: "Current SEO / marketing", value: data.currentSeo },
    { label: "Why this program, why now", value: data.motivation },
  ]
    .filter((b) => b.value)
    .map(
      (b) =>
        `<div style="margin-top:16px"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;margin-bottom:6px">${escapeHtml(b.label)}</div><div style="background:#0a0e1a;border:1px solid #1f2937;border-radius:8px;padding:12px;color:#e5e7eb;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(b.value!)}</div></div>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#050505;color:#e5e7eb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#0a0e1a;border:1px solid #1f2937;border-radius:12px;padding:24px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#a78bfa;margin-bottom:8px">AiLys Agency · Founding Clients</div>
      <h1 style="font-size:22px;margin:0 0 16px 0;color:#22d3ee">New founding-client application</h1>
      <p style="color:#9ca3af;font-size:14px;margin:0 0 16px 0">Submitted ${escapeHtml(new Date().toISOString())}.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:8px"><tbody>${tableRows}</tbody></table>
      ${longBlocks}
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1f2937;font-size:12px;color:#6b7280">Reply directly to this email to reach the applicant. Tracked in admin at /admin/leads.</div>
    </div>
  </body></html>`;

  const text = [
    "AiLys Agency · Founding Clients · New application",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    data.currentSeo ? `Current SEO / marketing:\n${data.currentSeo}` : "",
    data.motivation ? `\nWhy this program, why now:\n${data.motivation}` : "",
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
        reply_to: data.email,
        subject,
        html,
        text,
      }),
    });
    if (!resp.ok) {
      const text2 = await resp.text().catch(() => "");
      console.warn("Resend send failed", resp.status, text2.slice(0, 300));
      return { ok: false, error: `Resend ${resp.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.warn("Resend send threw", (err as Error).message);
    return { ok: false, error: (err as Error).message };
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
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

  // Rate limit: 5 IP/hour + 3 identity/day. The Founding Clients Program is
  // a low-volume cohort (10 spots total) so caps are intentionally tight.
  // Identity bucket prevents an attacker rotating IP from flooding one
  // applicant's email with confirmation messages.
  if (ip) {
    const day = new Date().toISOString().slice(0, 10);
    const ipH = await sha256Hex(`${day}|${ip}`);
    const idH = await sha256Hex(`founding-clients:${v.data.email}`);
    const rl = await checkRateLimit(env.FOUNDING_CLIENTS_RATE_LIMIT, {
      ipHash: ipH,
      identityHash: idH,
      ipPerHour: 5,
      identityPerDay: 3,
      keyPrefix: "rl:founding-clients",
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

  // Run both deliveries in parallel. We accept the application even if one
  // delivery fails (the strategist gets the email, the admin sees the row,
  // and either alone is enough to act).
  const [supaResult, emailResult] = await Promise.all([
    forwardToSupabase(env, v.data, ip),
    sendOpsEmail(env, v.data, ip),
  ]);

  // If both fail, it is a real problem. Capture via shared serverError lib
  // (Resend alert + audit_log persist) so the operator sees it immediately.
  // Best-effort capture; the 500 fires regardless.
  if (!supaResult.ok && !emailResult.ok) {
    const ipH = ip ? await sha256Hex(`${new Date().toISOString().slice(0, 10)}|${ip}`) : undefined;
    await captureServerError(env, {
      endpoint: "founding-clients-apply",
      severity: "error",
      err: new Error(
        `dual delivery failure: supabase=${supaResult.error ?? "?"}, resend=${emailResult.error ?? "?"}`,
      ),
      userIpHash: ipH,
      context: {
        supabase_ok: supaResult.ok,
        resend_ok: emailResult.ok,
        supabase_error: supaResult.error ?? null,
        resend_error: emailResult.error ?? null,
        vertical: v.data.vertical,
        tier: v.data.tier,
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
      delivered: { admin: supaResult.ok, email: emailResult.ok },
    }),
    {
      status: 200,
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
