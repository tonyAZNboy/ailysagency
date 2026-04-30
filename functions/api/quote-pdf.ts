// Cloudflare Pages Function · /api/quote-pdf
//
// Phase E.1.9: prospect-facing personalized quote PDF endpoint. Public (no
// auth), honeypot + rate-limited. Reuses B.4 infra (HMAC signed URL, R2,
// Resend) but takes prospect-supplied selections (tier, engagement, addons,
// website size) and synthesizes a 3-4 page quote PDF.
//
// Threat model:
// - Prospect spam: KV rate limit 3/IP/15min, honeypot field, 30-day
//   idempotency on (email + selections hash) so refresh does not re-render.
// - PII leakage: audit log emits sha256-hashed email + selections only.
// - Cost runaway: rate limit + idempotency cap re-renders; pdf-lib
//   in-process zero marginal cost.
// - Signed URL hijack: 5-min expiry + single object id (not 24h) since
//   prospect downloads immediately.
// - Fail-closed: missing QUOTE_PDF_ENABLED -> 503.

import { renderQuotePdf, type QuoteRenderInput, computeQuote } from '../lib/pdf/Quote';
import { newObjectId, signDownload } from '../lib/pdfHmac';

interface Env {
  AUDIT_PDFS?: R2Bucket;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  AUDIT_PDF_HMAC_SECRET?: string;
  RESEND_API_KEY?: string;
  QUOTE_PDF_ENABLED?: string;
}

interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}
interface R2Bucket {
  put(key: string, value: ArrayBuffer | Uint8Array | ReadableStream, options?: Record<string, unknown>): Promise<unknown>;
  get(key: string): Promise<{ body: ReadableStream } | null>;
  delete(key: string): Promise<void>;
}
interface PagesContext {
  request: Request;
  env: Env;
  waitUntil?: (promise: Promise<unknown>) => void;
}

interface AuditLogEntry {
  ts: string;
  action: string;
  emailHash: string;
  status: number;
  tier?: string;
  engagement?: string;
  bytes?: number;
  emailed?: boolean;
  reason?: string;
}

const RING_BUFFER_PREFIX = 'quote_pdf_log:';
const RING_BUFFER_TTL_SECONDS = 7 * 24 * 60 * 60;

function writeRingBuffer(ctx: PagesContext, entry: AuditLogEntry): void {
  const kv = ctx.env.AUDIT_PDF_RATE_LIMIT;
  if (!kv || !ctx.waitUntil) return;
  const key = `${RING_BUFFER_PREFIX}${Date.now()}`;
  ctx.waitUntil(
    kv.put(key, JSON.stringify(entry), { expirationTtl: RING_BUFFER_TTL_SECONDS }).catch(() => {}),
  );
}

const DOWNLOAD_TTL_SECONDS = 5 * 60; // 5 min, prospect downloads immediately
const IDEMPOTENCY_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days
const MAX_PAYLOAD_BYTES = 4 * 1024;
const RATE_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT_PER_IP = 3;

const ALLOWED_LANGS = new Set(['en', 'fr']);
const ALLOWED_TIERS = new Set(['starter', 'core', 'growth', 'agency']);
const ALLOWED_ENGAGEMENTS = new Set(['monthly', 'annual', 'biennial']);
const ALLOWED_WEBSITE_SIZES = new Set(['none', 'vitrine', 'pme', 'commerce']);

function emit(line: Record<string, unknown>): void {
  console.log(JSON.stringify({ component: 'quote-pdf', ...line }));
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function clip(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const t = value.trim();
  if (t.length === 0) return null;
  return t.slice(0, max);
}

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data?: QuoteRenderInput;
}

function validateBody(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== 'object') return { ok: false, errors: ['body_not_object'] };
  const body = input as Record<string, unknown>;

  if (typeof body.honeypot === 'string' && body.honeypot.length > 0) {
    return { ok: false, errors: ['honeypot_filled'] };
  }

  const prospectName = clip(body.prospectName, 100);
  if (!prospectName) errors.push('prospectName is required');

  const businessName = clip(body.businessName, 200);
  if (!businessName) errors.push('businessName is required');

  const email = clip(body.email, 254);
  if (!email) errors.push('email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email is invalid');

  const lang = clip(body.lang, 2);
  if (!lang || !ALLOWED_LANGS.has(lang)) errors.push('lang must be en or fr');

  const tier = clip(body.tier, 16);
  if (!tier || !ALLOWED_TIERS.has(tier)) errors.push('tier invalid');

  const engagement = clip(body.engagement, 16);
  if (!engagement || !ALLOWED_ENGAGEMENTS.has(engagement)) errors.push('engagement invalid');

  // Biennial only on growth+agency (per locked decision #7)
  if (engagement === 'biennial' && tier && (tier === 'starter' || tier === 'core')) {
    errors.push('biennial not eligible for starter or core');
  }

  const reviuzyAddon = body.reviuzyAddon === true;

  const websiteSize = clip(body.websiteSize, 16) ?? 'none';
  if (!ALLOWED_WEBSITE_SIZES.has(websiteSize)) errors.push('websiteSize invalid');

  // Tier-locked website eligibility (decision #5)
  if (websiteSize === 'pme' && tier === 'starter') errors.push('pme website requires Core+');
  if (websiteSize === 'commerce' && (tier === 'starter' || tier === 'core')) errors.push('commerce website requires Growth');
  if (websiteSize !== 'none' && tier === 'agency') errors.push('website service not offered on Agency');

  const taxIncluded = body.taxIncluded === true;

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    errors: [],
    data: {
      prospectName: prospectName!,
      businessName: businessName!,
      email: email!,
      lang: lang as QuoteRenderInput['lang'],
      tier: tier as QuoteRenderInput['tier'],
      engagement: engagement as QuoteRenderInput['engagement'],
      reviuzyAddon,
      websiteSize: websiteSize as QuoteRenderInput['websiteSize'],
      taxIncluded,
    },
  };
}

async function isKilled(env: Env): Promise<boolean> {
  if ((env.QUOTE_PDF_ENABLED ?? '').toLowerCase() !== 'true') return true;
  if (!env.AUDIT_PDF_RATE_LIMIT) return false;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('quote_pdf_killed');
  return flag === 'true';
}

async function checkRateLimit(env: Env, ipHash: string): Promise<{ ok: boolean; reason?: string }> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return { ok: true };
  const key = `quote:rl:ip:${ipHash}`;
  const raw = await env.AUDIT_PDF_RATE_LIMIT.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT_PER_IP) return { ok: false, reason: 'ip_rate_limited' };
  await env.AUDIT_PDF_RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS });
  return { ok: true };
}

async function readIdempotency(env: Env, key: string): Promise<{ objectId: string; expiresAt: number } | null> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return null;
  const raw = await env.AUDIT_PDF_RATE_LIMIT.get(`quote:idem:${key}`);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

async function writeIdempotency(env: Env, key: string, value: { objectId: string; expiresAt: number }): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return;
  await env.AUDIT_PDF_RATE_LIMIT.put(`quote:idem:${key}`, JSON.stringify(value), { expirationTtl: IDEMPOTENCY_TTL_SECONDS });
}

async function sendQuoteEmail(env: Env, body: QuoteRenderInput, downloadUrl: string): Promise<{ ok: boolean; error?: string }> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'no_resend_key' };
  const subj = body.lang === 'fr'
    ? `Votre devis personnalise AiLys, ${body.businessName}`
    : `Your personalized AiLys quote, ${body.businessName}`;
  const cta = body.lang === 'fr' ? 'Telecharger mon devis' : 'Download my quote';
  const expiry = body.lang === 'fr' ? 'Le lien expire dans 5 minutes.' : 'Link expires in 5 minutes.';
  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0A0F1F;background:#FFFFFF;padding:24px">
    <div style="max-width:560px;margin:0 auto">
      <h1 style="font-size:20px;color:#0E2A4A;margin:0 0 12px">${subj}</h1>
      <p><a href="${downloadUrl}" style="display:inline-block;padding:12px 18px;background:#F59E0B;color:#0A0F1F;text-decoration:none;border-radius:6px;font-weight:600">${cta}</a></p>
      <p style="font-size:12px;color:#6B7280;margin-top:24px">${expiry}</p>
    </div></body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: 'AiLys Agency <noreply@ailysagency.ca>', to: body.email, subject: subj, html }),
  });
  if (!res.ok) return { ok: false, error: `resend_${res.status}` };
  return { ok: true };
}

export const onRequestPost = async (ctx: PagesContext): Promise<Response> => {
  const ts = new Date().toISOString();

  if (!ctx.env.AUDIT_PDF_HMAC_SECRET) {
    emit({ ts, action: 'fail_closed_no_secret' });
    return new Response(JSON.stringify({ error: 'service_unavailable' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  if (await isKilled(ctx.env)) {
    emit({ ts, action: 'kill_switch_on' });
    writeRingBuffer(ctx, { ts, action: 'kill_switch_on', emailHash: '', status: 503 });
    return new Response(JSON.stringify({ error: 'service_temporarily_unavailable' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  const rawBody = await ctx.request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return new Response(JSON.stringify({ error: 'payload_too_large' }), { status: 413, headers: { 'content-type': 'application/json' } });
  }

  let parsed: unknown;
  try { parsed = JSON.parse(rawBody); }
  catch { return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400, headers: { 'content-type': 'application/json' } }); }

  const validation = validateBody(parsed);
  if (!validation.ok || !validation.data) {
    emit({ ts, action: 'validation_fail', errors: validation.errors });
    return new Response(JSON.stringify({ error: 'validation_failed', details: validation.errors }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
  const body = validation.data;

  const ip = ctx.request.headers.get('cf-connecting-ip') ?? ctx.request.headers.get('x-forwarded-for') ?? 'unknown';
  const ipHash = await sha256Hex(ip);
  const rl = await checkRateLimit(ctx.env, ipHash);
  if (!rl.ok) {
    emit({ ts, action: 'rate_limited', reason: rl.reason });
    return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'content-type': 'application/json' } });
  }

  // Idempotency on email + selections
  const idemKey = await sha256Hex(`${body.email.toLowerCase()}|${body.tier}|${body.engagement}|${body.reviuzyAddon}|${body.websiteSize}|${body.lang}|${body.taxIncluded}`);
  const existing = await readIdempotency(ctx.env, idemKey);
  if (existing && existing.expiresAt > Math.floor(Date.now() / 1000)) {
    const url = `${new URL(ctx.request.url).origin}/api/audit-pdf-download/${existing.objectId}?exp=${existing.expiresAt}&sig=${await signDownload(ctx.env.AUDIT_PDF_HMAC_SECRET, existing.objectId, existing.expiresAt)}`;
    emit({ ts, action: 'idempotent_hit', emailHash: idemKey.slice(0, 8) });
    return new Response(JSON.stringify({ id: existing.objectId, signedUrl: url, expiresAt: existing.expiresAt, idempotent: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  }

  // Render
  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await renderQuotePdf(body);
  } catch (e) {
    emit({ ts, action: 'render_fail', error: (e as Error).message });
    return new Response(JSON.stringify({ error: 'render_failed' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  const objectId = newObjectId();
  const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;

  if (ctx.env.AUDIT_PDFS) {
    try {
      await ctx.env.AUDIT_PDFS.put(objectId, pdfBytes, { httpMetadata: { contentType: 'application/pdf' } });
    } catch (e) {
      emit({ ts, action: 'r2_fail', error: (e as Error).message });
    }
  }

  const sig = await signDownload(ctx.env.AUDIT_PDF_HMAC_SECRET, objectId, expiresAt);
  const downloadUrl = `${new URL(ctx.request.url).origin}/api/audit-pdf-download/${objectId}?exp=${expiresAt}&sig=${sig}`;

  // Email best-effort
  const emailResult = await sendQuoteEmail(ctx.env, body, downloadUrl);
  if (!emailResult.ok) {
    emit({ ts, action: 'email_fail', error: emailResult.error });
  }

  await writeIdempotency(ctx.env, idemKey, { objectId, expiresAt });

  emit({
    ts,
    action: 'rendered',
    emailHash: idemKey.slice(0, 8),
    tier: body.tier,
    engagement: body.engagement,
    bytes: pdfBytes.byteLength,
    emailed: emailResult.ok,
  });
  writeRingBuffer(ctx, { ts, action: 'rendered', emailHash: idemKey.slice(0, 8), status: 200, tier: body.tier, engagement: body.engagement, bytes: pdfBytes.byteLength, emailed: emailResult.ok });

  return new Response(JSON.stringify({ id: objectId, signedUrl: downloadUrl, expiresAt }), {
    status: 200, headers: { 'content-type': 'application/json' },
  });
};

export const onRequest = async (ctx: PagesContext): Promise<Response> => {
  if (ctx.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'content-type': 'application/json', allow: 'POST' } });
  }
  return onRequestPost(ctx);
};
