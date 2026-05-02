import { escapeHtml } from "./htmlEscape";

// Server-side error capture for Cloudflare Pages Functions.
//
// Mirrors the existing /api/client-error frontend capture pattern but
// for edge fn errors. Every endpoint that catches an unexpected
// exception (vs. validation errors, which are 4xx by design) should
// log structured JSON via this lib so operator dashboards can surface
// recurring errors and alert on severity.
//
// Why a shared lib
// ----------------
// Before this lib, edge fns called console.error inline. That works
// for Cloudflare Workers logs but doesn't:
//   1. Persist to Supabase audit_log (lost when log buffer rotates)
//   2. Alert on ERROR severity via Resend
//   3. Enforce zero-PII discipline (hash IPs, redact emails)
//   4. Standardize fields across endpoints (operator dashboards
//      depend on consistent shape)
//
// This lib does all four behind a single captureServerError() call.
//
// Usage
// -----
// import { captureServerError } from "../lib/serverError";
//
// try {
//   // ... endpoint logic ...
// } catch (err) {
//   await captureServerError(env, {
//     endpoint: "partner-application",
//     severity: "error",
//     err,
//     requestId: crypto.randomUUID(),
//     userIpHash,  // optional, daily-rotated salt sha256
//     payloadHash, // optional, sha256 of request body
//   });
//   return new Response(JSON.stringify({ error: "internal" }), { status: 500 });
// }

export type ErrorSeverity = "warn" | "error" | "fatal";

export interface ServerErrorEnv {
  /** Supabase URL for audit_log persistence. Optional; falls back to console-only. */
  SUPABASE_URL?: string;
  /** Service role key for inserting into audit_log. Optional. */
  SUPABASE_SERVICE_ROLE_KEY?: string;
  /** Resend API key for alerting on ERROR/FATAL severity. Optional. */
  RESEND_API_KEY?: string;
  /** Operator email to receive ERROR/FATAL alerts. Optional. */
  OPERATOR_NOTIFY_EMAIL?: string;
  /** Build commit (set by Cloudflare Pages env). For including in alerts. */
  CF_PAGES_COMMIT_SHA?: string;
}

export interface ServerErrorPayload {
  /** Slug of the failing endpoint, e.g. "partner-application", "audit-pdf". */
  endpoint: string;
  /** Severity drives whether Resend alert fires. warn = log only. */
  severity: ErrorSeverity;
  /** The thrown value. Lib extracts message + stack safely. */
  err: unknown;
  /** Optional request ID (e.g. crypto.randomUUID()) so logs correlate
   *  with the response sent back to the client. */
  requestId?: string;
  /** Optional sha256 of IP (daily-rotated salt). NEVER plaintext IP. */
  userIpHash?: string;
  /** Optional sha256 of request body. Helps dedupe identical payloads
   *  causing identical errors (e.g., spam attacks hitting one bug). */
  payloadHash?: string;
  /** Optional structured context. Keep small; don't include PII. */
  context?: Record<string, string | number | boolean | null>;
}

interface AuditLogRow {
  ts: string;
  endpoint: string;
  severity: ErrorSeverity;
  message: string;
  stack: string | null;
  request_id: string | null;
  user_ip_hash: string | null;
  payload_hash: string | null;
  context: Record<string, string | number | boolean | null> | null;
  build_commit: string | null;
}

/**
 * Build a clean structured row from a payload. Truncates message and
 * stack to safe lengths to bound audit_log row size. Ensures NO raw IP
 * or unhashed payload data in the row.
 */
function buildRow(payload: ServerErrorPayload, env: ServerErrorEnv): AuditLogRow {
  let message = "unknown";
  let stack: string | null = null;
  if (payload.err instanceof Error) {
    message = payload.err.message.slice(0, 500);
    stack = (payload.err.stack ?? "").slice(0, 2000);
  } else if (typeof payload.err === "string") {
    message = payload.err.slice(0, 500);
  } else {
    try {
      message = JSON.stringify(payload.err).slice(0, 500);
    } catch {
      message = "non-serializable error value";
    }
  }
  return {
    ts: new Date().toISOString(),
    endpoint: payload.endpoint,
    severity: payload.severity,
    message,
    stack,
    request_id: payload.requestId ?? null,
    user_ip_hash: payload.userIpHash ?? null,
    payload_hash: payload.payloadHash ?? null,
    context: payload.context ?? null,
    build_commit: env.CF_PAGES_COMMIT_SHA ?? null,
  };
}

/**
 * Persist the error row to Supabase audit_log (best-effort). Returns
 * true on success, false on any failure (including missing config).
 * Failures here MUST NOT propagate; the caller's primary error handling
 * path must continue regardless.
 */
async function persistRow(env: ServerErrorEnv, row: AuditLogRow): Promise<boolean> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return false;
  try {
    const resp = await fetch(`${env.SUPABASE_URL}/rest/v1/audit_log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

/**
 * Send an operator alert via Resend for ERROR or FATAL severity.
 * WARN never alerts (too noisy). Returns true on success, false on
 * any failure. Failures here MUST NOT propagate.
 */
async function alertOperator(env: ServerErrorEnv, row: AuditLogRow): Promise<boolean> {
  if (row.severity === "warn") return false;
  if (!env.RESEND_API_KEY || !env.OPERATOR_NOTIFY_EMAIL) return false;
  const subject = `[AiLys ${row.severity.toUpperCase()}] ${row.endpoint}: ${row.message.slice(0, 80)}`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#050505;color:#e5e7eb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#0a0e1a;border:1px solid ${row.severity === "fatal" ? "#dc2626" : "#f59e0b"};border-radius:12px;padding:24px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:${row.severity === "fatal" ? "#fca5a5" : "#fbbf24"};margin-bottom:8px">AiLys Server ${row.severity}</div>
      <h1 style="font-size:18px;margin:0 0 16px 0;color:#22d3ee;font-family:monospace">${escapeHtml(row.endpoint)}</h1>
      <div style="font-family:monospace;font-size:13px;color:#e5e7eb;background:#000;border:1px solid #1f2937;border-radius:8px;padding:12px;white-space:pre-wrap;overflow-wrap:break-word;margin-bottom:12px">${escapeHtml(row.message)}</div>
      ${row.stack ? `<details style="margin-bottom:12px"><summary style="cursor:pointer;color:#9ca3af;font-size:12px">Stack trace</summary><pre style="font-family:monospace;font-size:11px;color:#9ca3af;background:#000;border:1px solid #1f2937;border-radius:8px;padding:12px;white-space:pre-wrap;overflow-wrap:break-word;margin-top:8px">${escapeHtml(row.stack)}</pre></details>` : ""}
      <table style="width:100%;border-collapse:collapse;font-size:12px;color:#9ca3af">
        <tr><td style="padding:4px 0;width:140px">Timestamp</td><td style="font-family:monospace;color:#e5e7eb">${escapeHtml(row.ts)}</td></tr>
        ${row.request_id ? `<tr><td style="padding:4px 0">Request ID</td><td style="font-family:monospace;color:#e5e7eb">${escapeHtml(row.request_id)}</td></tr>` : ""}
        ${row.user_ip_hash ? `<tr><td style="padding:4px 0">IP hash</td><td style="font-family:monospace;color:#e5e7eb">${escapeHtml(row.user_ip_hash.slice(0, 16))}...</td></tr>` : ""}
        ${row.payload_hash ? `<tr><td style="padding:4px 0">Payload hash</td><td style="font-family:monospace;color:#e5e7eb">${escapeHtml(row.payload_hash.slice(0, 16))}...</td></tr>` : ""}
        ${row.build_commit ? `<tr><td style="padding:4px 0">Build commit</td><td style="font-family:monospace;color:#e5e7eb">${escapeHtml(row.build_commit.slice(0, 7))}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1f2937;font-size:11px;color:#6b7280">Triggered by AiLys server-error capture lib. Disable Resend alerts by clearing OPERATOR_NOTIFY_EMAIL env var.</div>
    </div>
  </body></html>`;
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AiLys System <hello@ailysagency.ca>",
        to: [env.OPERATOR_NOTIFY_EMAIL],
        subject,
        html,
        text: `${row.severity.toUpperCase()} ${row.endpoint}\n\n${row.message}\n\n${row.stack ?? ""}`,
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

/**
 * Capture a server-side error. Always logs to console (visible in
 * Cloudflare Workers logs). Best-effort persists to Supabase
 * audit_log. Best-effort sends Resend alert on ERROR/FATAL severity.
 * NEVER throws; the caller's primary error path must not depend on
 * this succeeding.
 *
 * Returns a summary of which channels succeeded for observability
 * (the caller usually ignores the return value).
 */
export async function captureServerError(
  env: ServerErrorEnv,
  payload: ServerErrorPayload,
): Promise<{ logged: boolean; persisted: boolean; alerted: boolean }> {
  const row = buildRow(payload, env);

  // Always console-log so Cloudflare Workers logs show it (last-resort
  // observability when Supabase + Resend are both down).
  // Stringify carefully to avoid nested function refs.
  try {
    console.error(
      `[server-error] ${row.severity} ${row.endpoint}: ${row.message}`,
      JSON.stringify({ requestId: row.request_id, build: row.build_commit }),
    );
  } catch {
    // ignore
  }

  const [persisted, alerted] = await Promise.all([
    persistRow(env, row),
    alertOperator(env, row),
  ]);

  return { logged: true, persisted, alerted };
}

/** Re-export for convenience: build the row without persisting/alerting.
 *  Useful for testing the row shape contract. */
export const _internalBuildRow = buildRow;
