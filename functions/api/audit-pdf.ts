// Cloudflare Pages Function · /api/audit-pdf
//
// Phase B.4.1 scaffold (from docs/phase-b4-pdf-export-plan.md):
//   - Validates the audit PDF request server-side per CLAUDE.md hard rule #9.
//   - Rate-limits via KV token bucket (5/IP/hour, 50/email-hash/day).
//   - Audit-logs every invocation with no PII in clear (SHA-256 of email + IP).
//   - Returns 503 on the actual PDF generation step until B.4.2 lands.
//
// Phase B.4.3 will replace the 503 with: render PDF via pdf-lib → upload to
// R2 → generate signed download URL (HMAC-SHA256, 24h TTL) → email via Resend.
//
// Phase B.4.4 adds tier gating + an admin-toggleable kill switch (KV key
// `pdf_export_enabled`).

import { validateAuditPdfRequest, AuditPdfRequest } from '../../src/lib/pdfRequestSchema';
import { PDF_REQUEST_MAX_PAYLOAD_BYTES } from '../../src/lib/pdfRequestSchema';
import { renderAuditPdf } from '../lib/pdf/AuditReport';

interface Env {
  ALLOWED_ORIGINS?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace; // bound in Pages Settings → Functions → KV bindings
  AUDIT_PDFS?: R2Bucket; // bound in Pages Settings → Functions → R2 bindings
  AUDIT_PDF_HMAC_SECRET?: string; // env var, 64-byte random
  RESEND_API_KEY?: string;
  PDF_EXPORT_KILL_SWITCH?: string; // optional override, "false" disables endpoint
}

interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}
interface R2Bucket {
  put(key: string, value: ArrayBuffer | ReadableStream, options?: Record<string, unknown>): Promise<unknown>;
  get(key: string): Promise<{ body: ReadableStream } | null>;
  delete(key: string): Promise<void>;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}

// ── Rate-limit helpers ──────────────────────────────────────────────────────
//
// Two-key token bucket:
//   `rl:ip:<sha256-ip>:<hour>` capped at 5 hits per UTC hour
//   `rl:email:<sha256-email>:<day>` capped at 50 hits per UTC day
// The KV `expirationTtl` auto-evicts entries so we don't pay storage forever.

const IP_RATE_PER_HOUR = 5;
const EMAIL_RATE_PER_DAY = 50;

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function utcHourBucket(now: number = Date.now()): string {
  return new Date(now).toISOString().slice(0, 13); // "2026-04-28T03"
}
function utcDayBucket(now: number = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10); // "2026-04-28"
}

interface RateLimitDecision {
  allowed: boolean;
  reason?: 'ip_per_hour' | 'email_per_day' | 'kv_unavailable_open';
  ipKey: string;
  emailKey: string;
  ipCount: number;
  emailCount: number;
}

async function rateLimitCheckAndIncrement(
  env: Env,
  ipHash: string,
  emailHash: string,
): Promise<RateLimitDecision> {
  const ipKey = `rl:ip:${ipHash}:${utcHourBucket()}`;
  const emailKey = `rl:email:${emailHash}:${utcDayBucket()}`;

  if (!env.AUDIT_PDF_RATE_LIMIT) {
    // Fail-open if KV is not bound. Worst case: rate-limit doesn't apply in
    // local dev. Production binding is enforced by user-action checklist.
    return { allowed: true, reason: 'kv_unavailable_open', ipKey, emailKey, ipCount: 0, emailCount: 0 };
  }

  const ipRaw = await env.AUDIT_PDF_RATE_LIMIT.get(ipKey);
  const ipCount = ipRaw ? parseInt(ipRaw, 10) : 0;
  if (Number.isFinite(ipCount) && ipCount >= IP_RATE_PER_HOUR) {
    return { allowed: false, reason: 'ip_per_hour', ipKey, emailKey, ipCount, emailCount: 0 };
  }

  const emailRaw = await env.AUDIT_PDF_RATE_LIMIT.get(emailKey);
  const emailCount = emailRaw ? parseInt(emailRaw, 10) : 0;
  if (Number.isFinite(emailCount) && emailCount >= EMAIL_RATE_PER_DAY) {
    return { allowed: false, reason: 'email_per_day', ipKey, emailKey, ipCount, emailCount };
  }

  // Increment both. TTL covers the next bucket window so KV evicts cleanly.
  await Promise.all([
    env.AUDIT_PDF_RATE_LIMIT.put(ipKey, String(ipCount + 1), { expirationTtl: 60 * 60 }),
    env.AUDIT_PDF_RATE_LIMIT.put(emailKey, String(emailCount + 1), { expirationTtl: 60 * 60 * 25 }),
  ]);
  return { allowed: true, ipKey, emailKey, ipCount: ipCount + 1, emailCount: emailCount + 1 };
}

// ── Kill switch ─────────────────────────────────────────────────────────────

async function isKillSwitchActive(env: Env): Promise<boolean> {
  // Env var override wins (used to disable from a hot deploy)
  if ((env.PDF_EXPORT_KILL_SWITCH ?? '').toLowerCase() === 'true') return true;
  if (!env.AUDIT_PDF_RATE_LIMIT) return false;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('pdf_export_enabled');
  // If the key is explicitly set to "false", kill is active.
  return flag === 'false';
}

// ── Audit log ───────────────────────────────────────────────────────────────

interface AuditLogEntry {
  ts: string;
  action: string;
  actorHash: string;
  ipHash: string;
  status: number;
  payloadHash?: string;
  reason?: string;
  latencyMs: number;
}

function emitAuditLog(entry: AuditLogEntry): void {
  // Cloudflare Logpush picks up structured console.log JSON.
  // Per CLAUDE.md hard rule #9, no PII in clear; only SHA-256 hashes.
  console.log(JSON.stringify({ component: 'audit-pdf', ...entry }));
}

// ── Origin allowlist ────────────────────────────────────────────────────────

function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const allowed = (env.ALLOWED_ORIGINS ??
    'https://www.ailysagency.ca,https://ailysagency.ca,https://ailysagency.pages.dev')
    .split(',')
    .map((s) => s.trim());
  return allowed.includes(origin) || origin.startsWith('http://localhost');
}

// ── Handler ─────────────────────────────────────────────────────────────────

export const onRequest: (ctx: PagesContext) => Promise<Response> = async (ctx) => {
  const start = Date.now();
  const { request, env } = ctx;

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }
  if (!isAllowedOrigin(request, env)) {
    return jsonResponse({ error: 'origin_not_allowed' }, 403);
  }

  const ip = (request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? '').split(',')[0]!.trim();
  const ipHash = await sha256Hex(ip || 'unknown');

  // 1. Payload size cap
  const lenHeader = request.headers.get('content-length');
  if (lenHeader && Number.parseInt(lenHeader, 10) > PDF_REQUEST_MAX_PAYLOAD_BYTES) {
    emitAuditLog({
      ts: new Date().toISOString(),
      action: 'reject_payload_too_large',
      actorHash: '',
      ipHash,
      status: 413,
      reason: `content-length ${lenHeader} > ${PDF_REQUEST_MAX_PAYLOAD_BYTES}`,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'payload_too_large' }, 413);
  }

  // 2. Parse JSON
  let bodyJson: unknown;
  try {
    const raw = await request.text();
    if (raw.length > PDF_REQUEST_MAX_PAYLOAD_BYTES) {
      emitAuditLog({
        ts: new Date().toISOString(),
        action: 'reject_payload_too_large',
        actorHash: '',
        ipHash,
        status: 413,
        reason: `body bytes ${raw.length} > ${PDF_REQUEST_MAX_PAYLOAD_BYTES}`,
        latencyMs: Date.now() - start,
      });
      return jsonResponse({ error: 'payload_too_large' }, 413);
    }
    bodyJson = JSON.parse(raw);
  } catch {
    emitAuditLog({
      ts: new Date().toISOString(),
      action: 'reject_invalid_json',
      actorHash: '',
      ipHash,
      status: 400,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  // 3. Validate
  const validation = validateAuditPdfRequest(bodyJson);
  if (!validation.ok || !validation.data) {
    emitAuditLog({
      ts: new Date().toISOString(),
      action: 'reject_validation',
      actorHash: '',
      ipHash,
      status: 400,
      reason: validation.errors.join(','),
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'validation_failed', detail: validation.errors }, 400);
  }
  const data: AuditPdfRequest = validation.data;
  const actorHash = await sha256Hex(data.email);
  const payloadHash = await sha256Hex(JSON.stringify(data.payload));

  // 4. Kill switch
  if (await isKillSwitchActive(env)) {
    emitAuditLog({
      ts: new Date().toISOString(),
      action: 'reject_kill_switch',
      actorHash,
      ipHash,
      status: 503,
      payloadHash,
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'service_temporarily_disabled' }, 503);
  }

  // 5. Rate limit
  const rl = await rateLimitCheckAndIncrement(env, ipHash, actorHash);
  if (!rl.allowed) {
    emitAuditLog({
      ts: new Date().toISOString(),
      action: 'reject_rate_limit',
      actorHash,
      ipHash,
      status: 429,
      payloadHash,
      reason: rl.reason,
      latencyMs: Date.now() - start,
    });
    return jsonResponse(
      { error: 'rate_limited', detail: rl.reason },
      429,
      { 'Retry-After': '3600' },
    );
  }

  // 6. Render PDF (B.4.2). Email gate + R2 upload + signed download link
  //    land in B.4.3; for now we stream the PDF directly back so the
  //    pipeline is testable end-to-end.
  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await renderAuditPdf(data);
  } catch (err) {
    emitAuditLog({
      ts: new Date().toISOString(),
      action: 'render_failed',
      actorHash,
      ipHash,
      status: 500,
      payloadHash,
      reason: err instanceof Error ? err.message.slice(0, 200) : 'unknown',
      latencyMs: Date.now() - start,
    });
    return jsonResponse({ error: 'render_failed' }, 500);
  }

  emitAuditLog({
    ts: new Date().toISOString(),
    action: 'pdf_rendered',
    actorHash,
    ipHash,
    status: 200,
    payloadHash,
    reason: `bytes=${pdfBytes.byteLength}`,
    latencyMs: Date.now() - start,
  });

  return new Response(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="audit-${data.businessName.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)}.pdf"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    },
  });
};

function jsonResponse(payload: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}
