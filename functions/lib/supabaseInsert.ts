// Shared Supabase REST insert helper for Cloudflare Pages Functions.
//
// Consolidates the duplicated `forwardToSupabase` pattern that was inlined
// in partner-application, founding-clients-apply, and cofounders-apply.
// Each call site previously re-implemented:
//   - missing env-var fail-open (return ok:true so the form still feels
//     successful to the user; ops pulls leads from Workers logs until the
//     AiLys Supabase project is provisioned, see STATE.md operator action #4)
//   - identical headers (apikey + Bearer service_role + Content-Type +
//     Prefer return=minimal)
//   - identical error shape ({ ok, error? })
//   - 409 ignore-duplicates handling on the partner-application variant
//
// Why a shared lib (vs. continuing to inline)
// -------------------------------------------
// 1. Bug fix in one place vs. three (e.g. add retry, switch Prefer).
// 2. Service-role-key redaction on error paths is centralized; otherwise
//    each call site has its own console.warn that could leak the key
//    if Supabase echoes it in a 4xx response body.
// 3. Truncates error message to a bounded length (256 chars) so an
//    attacker who can trigger a 4xx with a controlled body cannot flood
//    Workers logs.
// 4. New endpoints (Phase F4 follow-up form, Phase F3.1 White-Label
//    portal) get the same hardened path for free.
//
// Usage
// -----
// import { insertSupabaseRow } from "../lib/supabaseInsert";
//
// const result = await insertSupabaseRow(env, "partner_applications", {
//   ...data,
//   payload_hash: hash,
//   ip_hash: ipHashValue,
//   created_at: new Date().toISOString(),
// }, { ignoreDuplicates: true });
//
// if (!result.ok) {
//   // operator triage; result.error is bounded + redacted
// }

export interface SupabaseInsertEnv {
  /** Supabase REST endpoint, e.g. https://xxxx.supabase.co. Optional;
   *  fail-open (returns ok:true) when missing. */
  SUPABASE_URL?: string;
  /** Service-role key. Bypasses RLS. Optional; fail-open when missing. */
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

export interface InsertOptions {
  /** When true, sets Prefer: resolution=ignore-duplicates so a 409
   *  conflict (unique-key collision) returns ok:true instead of ok:false.
   *  Used by partner-application where re-submission of the same agency
   *  is harmless. Default: false. */
  ignoreDuplicates?: boolean;
}

export interface InsertResult {
  ok: boolean;
  /** Bounded (≤ 256 chars) and service-role-key redacted error string.
   *  Only set when ok is false. */
  error?: string;
  /** HTTP status code when a fetch completed. Undefined when fetch
   *  threw or env-var fail-open path was taken. */
  status?: number;
}

const ERROR_MESSAGE_MAX = 256;

/**
 * Insert a single row into a Supabase table via the REST API using the
 * service-role key. Bypasses RLS by design (these are server-side
 * lead-capture endpoints).
 *
 * Fail-open behavior: when SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are
 * missing, the function logs the row to console and returns ok:true.
 * This matches the existing inline-helper behavior and is intentional
 * while the AiLys Supabase project is being provisioned.
 *
 * Never throws; the caller's primary path must continue regardless.
 */
export async function insertSupabaseRow(
  env: SupabaseInsertEnv,
  table: string,
  row: Record<string, unknown>,
  options: InsertOptions = {},
): Promise<InsertResult> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      console.log(
        `[supabaseInsert] no DB (fail-open): ${table}`,
        JSON.stringify(row).slice(0, 500),
      );
    } catch {
      // ignore stringify failures
    }
    return { ok: true };
  }

  const preferParts = ["return=minimal"];
  if (options.ignoreDuplicates) preferParts.push("resolution=ignore-duplicates");

  const url = `${env.SUPABASE_URL}/rest/v1/${table}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: preferParts.join(","),
      },
      body: JSON.stringify(row),
    });

    if (resp.ok) return { ok: true, status: resp.status };

    if (resp.status === 409 && options.ignoreDuplicates) {
      return { ok: true, status: resp.status };
    }

    let bodyText = "";
    try {
      bodyText = (await resp.text()).slice(0, 300);
    } catch {
      // ignore body-read failures
    }
    const safeBody = redact(bodyText, env.SUPABASE_SERVICE_ROLE_KEY);
    const errorMessage = safeBody
      ? `Supabase ${resp.status}: ${safeBody}`
      : `Supabase ${resp.status}`;

    console.warn(
      `[supabaseInsert] ${table} insert failed`,
      resp.status,
      safeBody,
    );

    return {
      ok: false,
      status: resp.status,
      error: bound(errorMessage),
    };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const safe = redact(raw, env.SUPABASE_SERVICE_ROLE_KEY);
    console.warn(`[supabaseInsert] ${table} insert threw`, safe);
    return { ok: false, error: bound(safe) };
  }
}

/**
 * Redact the service-role key (and any common secret-looking tokens
 * derived from it) out of a string. Defensive against Supabase 4xx
 * bodies that echo the apikey back, which would otherwise leak via
 * console.warn into Cloudflare Workers logs.
 */
function redact(input: string, secret: string | undefined): string {
  if (!input) return "";
  if (!secret) return input;
  if (secret.length < 8) return input; // too short to redact safely
  let out = input;
  // Direct substring match
  while (out.includes(secret)) {
    out = out.replace(secret, "[REDACTED]");
  }
  // First 16 chars (Supabase JWTs share a common prefix; redact prefix
  // matches in case only part of the key appears in echoed body).
  const prefix = secret.slice(0, 16);
  if (prefix.length === 16) {
    while (out.includes(prefix)) {
      out = out.replace(prefix, "[REDACTED]");
    }
  }
  return out;
}

function bound(s: string): string {
  if (s.length <= ERROR_MESSAGE_MAX) return s;
  return `${s.slice(0, ERROR_MESSAGE_MAX - 3)}...`;
}

/** Re-export for tests; not part of the public stable API. */
export const _internalRedact = redact;
export const _internalBound = bound;
