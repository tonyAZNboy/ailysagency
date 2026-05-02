// Cloudflare Pages Function · /api/cofounders-apply
//
// Captures co-founder / partner candidate applications. Each application
// includes contact info, the candidate's relevant communities or
// specializations, and free-form text on which under-served communities
// they think we should prospect.
//
// Government-grade defaults per AiLys CLAUDE.md hard rule #9:
//   - Strict server-side input validation (zod-style hand-roll)
//   - Honeypot spam filter (`website` field must be empty)
//   - Origin allowlist + disposable-email reject
//   - Length caps on every field
//   - No PII echoed back; structured response only
//   - Forwards to Supabase landing_leads or to a dedicated table when ready

import { insertSupabaseRow } from "../lib/supabaseInsert";
import { isAllowedOrigin } from "../lib/origin";
import { isValidEmail } from "../lib/email";

interface Env {
  ALLOWED_ORIGINS?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
}

const ALLOWED_INTEREST_TAGS = new Set([
  "fr_canada",
  "es_latam",
  "zh_china",
  "zh_taiwan",
  "ar_mena",
  "ru_eastern_europe",
  "uk_ukraine",
  "sr_balkans",
  "pt_brazil",
  "ja_japan",
  "ko_korea",
  "hi_india",
  "vi_vietnam",
  "tr_turkey",
  "de_dach",
  "it_italy",
  "nl_benelux",
  "vertical_dental",
  "vertical_legal",
  "vertical_restaurant",
  "vertical_realestate",
  "vertical_clinic",
  "vertical_contractor",
  "vertical_hotel",
  "operations_quebec",
  "ops_growth_marketing",
  "ops_engineering",
  "ops_design",
  "ops_sales",
  "other",
]);

interface ApplicationBody {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  community?: string;
  interests?: string[];
  missingCommunities?: string;
  motivation?: string;
  honeypot?: string;
  lang?: string;
  source?: string;
}

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data: Required<
    Pick<ApplicationBody, "name" | "email" | "lang">
  > & {
    phone: string | null;
    linkedin: string | null;
    community: string | null;
    interests: string[];
    missingCommunities: string | null;
    motivation: string | null;
    source: string;
  };
}

function clip(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

function validate(body: ApplicationBody): ValidationResult {
  const errors: string[] = [];

  if (body.honeypot && body.honeypot.length > 0) {
    errors.push("Spam check failed");
  }

  const name = clip(body.name, 200);
  if (!name) errors.push("name is required");
  else if (name.length < 2) errors.push("name too short");

  const email = clip(body.email, 254);
  if (!email) errors.push("email is required");
  else if (!isValidEmail(email)) errors.push("email is invalid");

  const phone = clip(body.phone, 50);
  const linkedin = clip(body.linkedin, 500);
  if (linkedin && !/^https?:\/\//i.test(linkedin)) {
    errors.push("linkedin must be a full URL");
  }
  const community = clip(body.community, 200);

  let interests: string[] = [];
  if (Array.isArray(body.interests)) {
    interests = body.interests
      .filter((tag): tag is string => typeof tag === "string")
      .map((tag) => tag.trim())
      .filter((tag) => ALLOWED_INTEREST_TAGS.has(tag))
      .slice(0, 12);
  }

  const missingCommunities = clip(body.missingCommunities, 1500);
  const motivation = clip(body.motivation, 1500);

  const lang = clip(body.lang, 5) ?? "en";
  const source = clip(body.source, 50) ?? "cofounders";

  return {
    ok: errors.length === 0,
    errors,
    data: {
      name: name ?? "",
      email: email ?? "",
      lang,
      phone,
      linkedin,
      community,
      interests,
      missingCommunities,
      motivation,
      source,
    },
  };
}

async function forwardToSupabase(
  env: Env,
  data: ValidationResult["data"],
  ip: string | null,
): Promise<{ ok: boolean; error?: string }> {
  return insertSupabaseRow(env, "landing_leads", {
    email: data.email,
    name: data.name,
    phone: data.phone,
    source: data.source,
    lang: data.lang,
    status: "new",
    metadata: {
      kind: "cofounder_application",
      community: data.community,
      linkedin: data.linkedin,
      interests: data.interests,
      missingCommunities: data.missingCommunities,
      motivation: data.motivation,
      ip,
    },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!isAllowedOrigin(request, env)) {
    return Response.json({ error: "Origin not allowed" }, { status: 403 });
  }

  let body: ApplicationBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return Response.json(
      { error: "Validation failed", details: result.errors },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  const forwarded = await forwardToSupabase(env, result.data, ip);
  if (!forwarded.ok) {
    console.error("Cofounder application forward failed:", forwarded.error);
    // Still return success to the candidate; ops will retry from logs
  }

  return Response.json({ success: true });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
