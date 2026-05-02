// Cloudflare Pages Function · /api/client-error
//
// Phase E.11: client-side error capture endpoint. Browser captures
// window.onerror + unhandledrejection + manual reportError() calls and
// POSTs minimal payloads here. Server normalizes + ring-buffers for the
// admin observability surface. No PII, no full stack traces (URLs only).
//
// Threat model:
// - Public endpoint (no auth): browsers can't sign HMAC requests. Defend
//   via aggressive rate limiting + payload caps + URL allowlist.
// - DOS / spam: 30 errors/IP/15min, 5000 errors/day fleet cap, fail-closed.
// - PII leakage: server NEVER persists message body in clear; sha256-hashed
//   url + message_hash + ip_hash only. Original message stays in console.error
//   line for Logpush (operator-only access).
// - Cross-origin spam: Origin header allowlist (ailysagency.ca, .pages.dev,
//   localhost in dev).
// - Loop attack: client-side capture util MUST avoid posting on its own
//   /api/client-error errors (would loop). Util implements that guard.
// - Fail-closed: missing CLIENT_ERROR_ENABLED env -> 204 (silent drop, not
//   503, to avoid surfacing endpoint health to attackers).

import { sha256Hex } from '../lib/crypto';
import { makeEmit } from '../lib/structuredLog';

interface Env {
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  CLIENT_ERROR_ENABLED?: string;
}

interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil?: (promise: Promise<unknown>) => void;
}

const MAX_PAYLOAD_BYTES = 4 * 1024;
const RATE_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT_PER_IP = 30;
const DAILY_CAP_TOTAL = 5000;
const RING_BUFFER_PREFIX = 'client_error_log:';
const RING_BUFFER_TTL_SECONDS = 7 * 24 * 60 * 60;
const ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?ailysagency\.ca$/i,
  /^https:\/\/[a-z0-9-]+\.ailysagency\.pages\.dev$/i,
  /^https:\/\/ailysagency\.pages\.dev$/i,
  /^http:\/\/localhost(:\d+)?$/i,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/i,
];

interface RequestBody {
  type: 'error' | 'unhandledrejection' | 'manual';
  message?: string; // truncated to 500 chars
  url?: string; // page URL where error happened
  source?: string; // script source file URL
  lineno?: number;
  colno?: number;
  stack?: string; // short stack hint, max 1000 chars
  userAgent?: string; // truncated
}

interface AuditLogEntry {
  ts: string;
  type: string;
  status: 'captured' | 'dropped';
  ipHash: string;
  urlHash: string;
  messageHash: string;
  hasStack: boolean;
  reason?: string;
}

const emit = makeEmit('client-error');

function clip(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  return value.slice(0, max);
}

function clampInt(n: unknown, min: number, max: number): number | null {
  if (typeof n !== 'number' || !Number.isFinite(n)) return null;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

function validateBody(input: unknown): { ok: true; data: RequestBody } | { ok: false; reason: string } {
  if (!input || typeof input !== 'object') return { ok: false, reason: 'body_not_object' };
  const body = input as Record<string, unknown>;
  const t = clip(body.type, 32);
  if (!t || !['error', 'unhandledrejection', 'manual'].includes(t)) {
    return { ok: false, reason: 'invalid_type' };
  }
  return {
    ok: true,
    data: {
      type: t as RequestBody['type'],
      message: clip(body.message, 500) ?? undefined,
      url: clip(body.url, 500) ?? undefined,
      source: clip(body.source, 500) ?? undefined,
      lineno: clampInt(body.lineno, 0, 1_000_000) ?? undefined,
      colno: clampInt(body.colno, 0, 1_000_000) ?? undefined,
      stack: clip(body.stack, 1000) ?? undefined,
      userAgent: clip(body.userAgent, 200) ?? undefined,
    },
  };
}

function originAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some((re) => re.test(origin));
}

async function isKilled(env: Env): Promise<boolean> {
  if ((env.CLIENT_ERROR_ENABLED ?? '').toLowerCase() !== 'true') return true;
  if (!env.AUDIT_PDF_RATE_LIMIT) return true;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('client_error_killed');
  return flag === 'true';
}

async function checkRateLimit(env: Env, ipHash: string): Promise<{ ok: boolean; reason?: string }> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return { ok: false, reason: 'no_kv' };
  const ipKey = `cerr:rl:ip:${ipHash}`;
  const ipRaw = await env.AUDIT_PDF_RATE_LIMIT.get(ipKey);
  const ipCount = ipRaw ? parseInt(ipRaw, 10) : 0;
  if (ipCount >= RATE_LIMIT_PER_IP) return { ok: false, reason: 'ip_rate_limited' };
  const today = new Date().toISOString().slice(0, 10);
  const dayKey = `cerr:rl:day:${today}`;
  const dayRaw = await env.AUDIT_PDF_RATE_LIMIT.get(dayKey);
  const dayCount = dayRaw ? parseInt(dayRaw, 10) : 0;
  if (dayCount >= DAILY_CAP_TOTAL) return { ok: false, reason: 'daily_cap_reached' };
  await env.AUDIT_PDF_RATE_LIMIT.put(ipKey, String(ipCount + 1), { expirationTtl: RATE_WINDOW_SECONDS });
  await env.AUDIT_PDF_RATE_LIMIT.put(dayKey, String(dayCount + 1), { expirationTtl: 86400 });
  return { ok: true };
}

function writeRingBuffer(ctx: PagesContext, entry: AuditLogEntry): void {
  const kv = ctx.env.AUDIT_PDF_RATE_LIMIT;
  if (!kv || !ctx.waitUntil) return;
  const key = `${RING_BUFFER_PREFIX}${Date.now()}`;
  ctx.waitUntil(
    kv.put(key, JSON.stringify(entry), { expirationTtl: RING_BUFFER_TTL_SECONDS }).catch(() => {}),
  );
}

// Always-204 response (no body). Avoids surfacing endpoint health to attackers
// and avoids breaking the client capture util's own error path.
function silentOk(): Response {
  return new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
}

export const onRequestPost = async (ctx: PagesContext): Promise<Response> => {
  const ts = new Date().toISOString();

  // Origin allowlist (defense in depth; CORS preflight too)
  const origin = ctx.request.headers.get('origin');
  if (!originAllowed(origin)) {
    emit({ ts, action: 'origin_blocked', origin });
    return silentOk();
  }

  if (await isKilled(ctx.env)) {
    return silentOk();
  }

  const rawBody = await ctx.request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return silentOk();
  }

  let parsed: unknown;
  try { parsed = JSON.parse(rawBody); }
  catch { return silentOk(); }

  const validation = validateBody(parsed);
  if (!validation.ok) {
    emit({ ts, action: 'validation_fail', reason: validation.reason });
    return silentOk();
  }
  const body = validation.data;

  const ip = ctx.request.headers.get('cf-connecting-ip') ?? ctx.request.headers.get('x-forwarded-for') ?? 'unknown';
  const ipHash = await sha256Hex(ip);
  const rl = await checkRateLimit(ctx.env, ipHash);
  if (!rl.ok) {
    emit({ ts, action: 'rate_limited', reason: rl.reason, ipHash: ipHash.slice(0, 8) });
    return silentOk();
  }

  const urlHash = body.url ? (await sha256Hex(body.url)).slice(0, 16) : '';
  const messageHash = body.message ? (await sha256Hex(body.message)).slice(0, 16) : '';

  // Source-of-truth log line for Logpush includes the full message + stack.
  // Operator-only access via Cloudflare dashboard. Not exposed via /api/admin.
  emit({
    ts,
    action: 'captured',
    type: body.type,
    message: body.message,
    url: body.url,
    source: body.source,
    lineno: body.lineno,
    colno: body.colno,
    stack: body.stack,
    userAgent: body.userAgent,
    ipHash: ipHash.slice(0, 8),
  });

  // Ring buffer entry (admin observability) carries hashes only.
  writeRingBuffer(ctx, {
    ts,
    type: body.type,
    status: 'captured',
    ipHash: ipHash.slice(0, 8),
    urlHash,
    messageHash,
    hasStack: !!body.stack,
  });

  return silentOk();
};

// CORS preflight
export const onRequestOptions = async (ctx: PagesContext): Promise<Response> => {
  const origin = ctx.request.headers.get('origin');
  if (!originAllowed(origin)) {
    return new Response(null, { status: 204 });
  }
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': origin ?? 'https://www.ailysagency.ca',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400',
    },
  });
};

export const onRequest = async (ctx: PagesContext): Promise<Response> => {
  if (ctx.request.method === 'OPTIONS') return onRequestOptions(ctx);
  if (ctx.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'content-type': 'application/json', allow: 'POST, OPTIONS' } });
  }
  return onRequestPost(ctx);
};
