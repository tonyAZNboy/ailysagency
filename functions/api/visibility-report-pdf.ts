// Cloudflare Pages Function · /api/visibility-report-pdf
//
// Phase E.1.X cross-repo: monthly visibility report PDF render endpoint.
// Called server-to-server by Reviuzy `monthly-visibility-export` edge fn
// (allowlisted caller `reviuzy-monthly-report-batch` per serviceAuth.ts).
//
// Differences from /api/audit-pdf and /api/audit-pdf-onboarding:
//   - Service-to-service HMAC auth (no end-user origin)
//   - Idempotent on `tenantId + reportMonth`: same tenant + same month
//     within 35 days returns existing PDF link
//   - Brand toggle: 'reviuzy' / 'ailys_managed' / 'reseller' adjust From
//     header + footer copy + accent color (white-label Agency tier)
//   - 6-section render via renderVisibilityReportPdf
//   - DLQ on Resend / R2 failure for cron sweep retry

import { renderVisibilityReportPdf, type VisibilityReportRenderInput } from '../lib/pdf/VisibilityReport';
import { newObjectId, signDownload } from '../lib/pdfHmac';
import { verifyServiceRequest } from '../lib/serviceAuth';
import { sha256Hex } from '../lib/crypto';

interface Env {
  AUDIT_PDFS?: R2Bucket;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  AUDIT_PDF_HMAC_SECRET?: string;
  AILYS_SERVICE_SHARED_SECRET?: string;
  RESEND_API_KEY?: string;
  VISIBILITY_REPORT_KILL_SWITCH?: string;
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
}

const DOWNLOAD_TTL_SECONDS = 24 * 60 * 60; // 24h, identical to onboarding
const IDEMPOTENCY_TTL_SECONDS = 35 * 24 * 60 * 60; // 35 days
const MAX_PAYLOAD_BYTES = 64 * 1024; // 64 KB

const ALLOWED_LANGS = new Set(['en', 'fr', 'es', 'zh', 'ar', 'ru']);
const ALLOWED_BRANDS = new Set(['reviuzy', 'ailys_managed', 'reseller']);
const ALLOWED_ENGINES = new Set(['chatgpt', 'perplexity', 'claude', 'gemini', 'aio', 'copilot']);

interface RequestBody {
  email: string;
  lang: 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'ru';
  businessName: string;
  reportMonth: string;
  brand: 'reviuzy' | 'ailys_managed' | 'reseller';
  brandLogoUrl?: string;
  brandColorHex?: string;
  honeypot?: string;
  payload: VisibilityReportRenderInput['payload'];
  tenantId: string;
}

function emit(line: Record<string, unknown>): void {
  console.log(JSON.stringify({ component: 'visibility-report-pdf', ...line }));
}

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data?: RequestBody;
}

function clip(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

function clampNum(n: unknown, min: number, max: number): number | null {
  if (typeof n !== 'number' || !Number.isFinite(n)) return null;
  return Math.max(min, Math.min(max, n));
}

function validateBody(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== 'object') return { ok: false, errors: ['body_not_object'] };
  const body = input as Record<string, unknown>;

  if (typeof body.honeypot === 'string' && body.honeypot.length > 0) {
    return { ok: false, errors: ['honeypot_filled'] };
  }

  const email = clip(body.email, 254);
  if (!email) errors.push('email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email is invalid');

  const lang = (clip(body.lang, 5) ?? 'en') as RequestBody['lang'];
  if (!ALLOWED_LANGS.has(lang)) errors.push('lang invalid');

  const businessName = clip(body.businessName, 200);
  if (!businessName) errors.push('businessName is required');

  const reportMonth = clip(body.reportMonth, 7);
  if (!reportMonth) errors.push('reportMonth is required');
  else if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(reportMonth)) errors.push('reportMonth must be YYYY-MM');

  const brand = (clip(body.brand, 32) ?? '') as RequestBody['brand'];
  if (!ALLOWED_BRANDS.has(brand)) errors.push('brand invalid');

  const brandLogoUrl = clip(body.brandLogoUrl, 500);
  if (brandLogoUrl && !/^https:\/\//i.test(brandLogoUrl)) errors.push('brandLogoUrl must be https');

  const brandColorHex = clip(body.brandColorHex, 7);
  if (brandColorHex && !/^#[0-9A-Fa-f]{6}$/.test(brandColorHex)) errors.push('brandColorHex must be #RRGGBB');

  const tenantId = clip(body.tenantId, 100);
  if (!tenantId) errors.push('tenantId is required');

  // Payload validation
  const payloadIn = body.payload as Record<string, unknown> | undefined;
  if (!payloadIn || typeof payloadIn !== 'object') {
    errors.push('payload is required');
  }

  if (errors.length > 0) return { ok: false, errors };

  const p = payloadIn as Record<string, unknown>;
  const vs = (p.visibility_score ?? {}) as Record<string, unknown>;
  const current = clampNum(vs.current, 0, 100);
  if (current == null) errors.push('payload.visibility_score.current invalid');
  const previous_month = vs.previous_month == null ? null : clampNum(vs.previous_month, 0, 100);

  const somIn = Array.isArray(p.share_of_model) ? p.share_of_model : [];
  const share_of_model: Array<{ engine: string; score: number; trend_pct: number }> = [];
  for (const row of somIn.slice(0, 6)) {
    const r = row as Record<string, unknown>;
    const engine = clip(r.engine, 16);
    if (!engine || !ALLOWED_ENGINES.has(engine)) continue;
    const score = clampNum(r.score, 0, 100);
    const trend_pct = clampNum(r.trend_pct, -100, 100);
    if (score == null || trend_pct == null) continue;
    share_of_model.push({ engine, score, trend_pct });
  }

  const kwIn = Array.isArray(p.top_keywords) ? p.top_keywords : [];
  const top_keywords: Array<{ keyword: string; impressions: number; avg_position: number }> = [];
  for (const row of kwIn.slice(0, 10)) {
    const r = row as Record<string, unknown>;
    const keyword = clip(r.keyword, 200);
    const impressions = clampNum(r.impressions, 0, 10_000_000);
    const avg_position = clampNum(r.avg_position, 0, 200);
    if (!keyword || impressions == null || avg_position == null) continue;
    top_keywords.push({ keyword, impressions, avg_position });
  }

  let sentiment: { positive_pct: number; neutral_pct: number; negative_pct: number } | null = null;
  if (p.sentiment !== null && p.sentiment !== undefined) {
    const s = p.sentiment as Record<string, unknown>;
    const pos = clampNum(s.positive_pct, 0, 100);
    const neu = clampNum(s.neutral_pct, 0, 100);
    const neg = clampNum(s.negative_pct, 0, 100);
    if (pos != null && neu != null && neg != null) {
      sentiment = { positive_pct: pos, neutral_pct: neu, negative_pct: neg };
    }
  }

  const notesIn = Array.isArray(p.action_notes) ? p.action_notes : [];
  const action_notes: string[] = [];
  for (const note of notesIn.slice(0, 5)) {
    const n = clip(note, 200);
    if (n) action_notes.push(n);
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: [],
    data: {
      email: email!,
      lang,
      businessName: businessName!,
      reportMonth: reportMonth!,
      brand,
      brandLogoUrl: brandLogoUrl ?? undefined,
      brandColorHex: brandColorHex ?? undefined,
      payload: {
        visibility_score: { current: current!, previous_month },
        share_of_model: share_of_model as VisibilityReportRenderInput['payload']['share_of_model'],
        top_keywords,
        sentiment,
        action_notes,
      },
      tenantId: tenantId!,
    },
  };
}

interface IdempotencyRecord {
  objectId: string;
  expiresAt: number;
  emailedAt: number;
  status: 'emailed' | 'stored_no_email' | 'failed_dlq';
}

async function readIdempotency(env: Env, tenantId: string, reportMonth: string): Promise<IdempotencyRecord | null> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return null;
  const key = `vis:${await sha256Hex(`${tenantId}|${reportMonth}`)}`;
  const raw = await env.AUDIT_PDF_RATE_LIMIT.get(key);
  if (!raw) return null;
  try { return JSON.parse(raw) as IdempotencyRecord; } catch { return null; }
}

async function writeIdempotency(env: Env, tenantId: string, reportMonth: string, record: IdempotencyRecord): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return;
  const key = `vis:${await sha256Hex(`${tenantId}|${reportMonth}`)}`;
  await env.AUDIT_PDF_RATE_LIMIT.put(key, JSON.stringify(record), { expirationTtl: IDEMPOTENCY_TTL_SECONDS });
}

async function pushDlq(env: Env, tenantId: string, reportMonth: string, bodyJson: string, reason: string): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return;
  const key = `dlq:vis:${await sha256Hex(`${tenantId}|${reportMonth}`)}`;
  const value = { ts: new Date().toISOString(), tenantId, reportMonth, bodyJson, reason };
  await env.AUDIT_PDF_RATE_LIMIT.put(key, JSON.stringify(value), { expirationTtl: 14 * 24 * 60 * 60 });
}

async function isKilled(env: Env): Promise<boolean> {
  if ((env.VISIBILITY_REPORT_KILL_SWITCH ?? '').toLowerCase() === 'true') return true;
  if (!env.AUDIT_PDF_RATE_LIMIT) return false;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('visibility_report_enabled');
  return flag === 'false';
}

const FROM_BY_BRAND: Record<RequestBody['brand'], string> = {
  reviuzy: 'AiLys Automation <noreply@ailysagency.ca>',
  ailys_managed: 'AiLys Agency <noreply@ailysagency.ca>',
  reseller: 'AiLys Agency <noreply@ailysagency.ca>',
};

async function sendReportEmail(env: Env, body: RequestBody, downloadUrl: string): Promise<{ ok: boolean; error?: string }> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'no_resend_key' };

  const subj: Record<RequestBody['lang'], string> = {
    en: `Your ${body.reportMonth} AI Visibility report, ${body.businessName}`,
    fr: `Votre rapport AI Visibility de ${body.reportMonth}, ${body.businessName}`,
    es: `Tu informe AI Visibility de ${body.reportMonth}, ${body.businessName}`,
    zh: `您 ${body.reportMonth} 的 AI Visibility 报告, ${body.businessName}`,
    ar: `تقرير AI Visibility الخاص بك لشهر ${body.reportMonth}، ${body.businessName}`,
    ru: `Ваш отчёт AI Visibility за ${body.reportMonth}, ${body.businessName}`,
  };
  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0A0F1F;background:#FFFFFF;padding:24px">
    <div style="max-width:560px;margin:0 auto">
      <h1 style="font-size:20px;color:#0E2A4A;margin:0 0 12px">${subj[body.lang]}</h1>
      <p style="font-size:15px;line-height:1.55">${body.businessName} - ${body.reportMonth}</p>
      <p><a href="${downloadUrl}" style="display:inline-block;padding:12px 18px;background:#F59E0B;color:#0A0F1F;text-decoration:none;border-radius:6px;font-weight:600">Open report</a></p>
      <p style="font-size:12px;color:#6B7280;margin-top:24px">Link expires in 24 hours.</p>
    </div></body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: FROM_BY_BRAND[body.brand], to: body.email, subject: subj[body.lang], html }),
  });
  if (!res.ok) return { ok: false, error: `resend_${res.status}` };
  return { ok: true };
}

export const onRequestPost = async (ctx: PagesContext): Promise<Response> => {
  const ts = new Date().toISOString();

  if (!ctx.env.AILYS_SERVICE_SHARED_SECRET || !ctx.env.AUDIT_PDF_HMAC_SECRET) {
    emit({ ts, action: 'fail_closed_no_secret' });
    return new Response(JSON.stringify({ error: 'service_unavailable' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  if (await isKilled(ctx.env)) {
    emit({ ts, action: 'kill_switch_on' });
    return new Response(JSON.stringify({ error: 'service_temporarily_unavailable' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  const rawBody = await ctx.request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return new Response(JSON.stringify({ error: 'payload_too_large' }), { status: 413, headers: { 'content-type': 'application/json' } });
  }

  // HMAC service auth (positional API: secret, request, bodyText, [now])
  const verify = await verifyServiceRequest(
    ctx.env.AILYS_SERVICE_SHARED_SECRET,
    ctx.request,
    rawBody,
  );
  if (!verify.ok) {
    emit({ ts, action: 'auth_fail', reason: verify.reason });
    return new Response(JSON.stringify({ error: 'unauthorized', reason: verify.reason }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  let parsed: unknown;
  try { parsed = JSON.parse(rawBody); }
  catch { return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400, headers: { 'content-type': 'application/json' } }); }

  const validation = validateBody(parsed);
  if (!validation.ok || !validation.data) {
    return new Response(JSON.stringify({ error: 'validation_failed', details: validation.errors }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
  const body = validation.data;

  // Idempotency check
  const existing = await readIdempotency(ctx.env, body.tenantId, body.reportMonth);
  if (existing && existing.expiresAt > Math.floor(Date.now() / 1000)) {
    const url = `${new URL(ctx.request.url).origin}/api/audit-pdf-download/${existing.objectId}?exp=${existing.expiresAt}&sig=${await signDownload(ctx.env.AUDIT_PDF_HMAC_SECRET, existing.objectId, existing.expiresAt)}`;
    emit({ ts, action: 'idempotent_hit', tenantIdHash: await sha256Hex(body.tenantId), reportMonth: body.reportMonth });
    return new Response(JSON.stringify({ id: existing.objectId, signedUrl: url, expiresAt: existing.expiresAt, idempotent: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  }

  // Render
  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await renderVisibilityReportPdf({
      businessName: body.businessName,
      reportMonth: body.reportMonth,
      lang: body.lang,
      brand: body.brand,
      brandColorHex: body.brandColorHex,
      payload: body.payload,
    });
  } catch (e) {
    await pushDlq(ctx.env, body.tenantId, body.reportMonth, rawBody, `render_fail:${(e as Error).message}`);
    emit({ ts, action: 'render_fail', error: (e as Error).message });
    return new Response(JSON.stringify({ error: 'render_failed' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  const objectId = newObjectId();
  const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;

  // Store in R2 (fail-soft: log but still return signed URL with direct stream fallback handled by audit-pdf-download)
  if (ctx.env.AUDIT_PDFS) {
    try {
      await ctx.env.AUDIT_PDFS.put(objectId, pdfBytes, {
        httpMetadata: { contentType: 'application/pdf' },
      });
    } catch (e) {
      await pushDlq(ctx.env, body.tenantId, body.reportMonth, rawBody, `r2_fail:${(e as Error).message}`);
      emit({ ts, action: 'r2_fail', error: (e as Error).message });
    }
  }

  const sig = await signDownload(ctx.env.AUDIT_PDF_HMAC_SECRET, objectId, expiresAt);
  const downloadUrl = `${new URL(ctx.request.url).origin}/api/audit-pdf-download/${objectId}?exp=${expiresAt}&sig=${sig}`;

  // Email (best-effort)
  const emailResult = await sendReportEmail(ctx.env, body, downloadUrl);
  let status: IdempotencyRecord['status'] = emailResult.ok ? 'emailed' : 'stored_no_email';
  if (!emailResult.ok) {
    await pushDlq(ctx.env, body.tenantId, body.reportMonth, rawBody, `email_fail:${emailResult.error}`);
    status = 'failed_dlq';
  }

  await writeIdempotency(ctx.env, body.tenantId, body.reportMonth, {
    objectId,
    expiresAt,
    emailedAt: Math.floor(Date.now() / 1000),
    status,
  });

  emit({
    ts,
    action: 'rendered',
    tenantIdHash: await sha256Hex(body.tenantId),
    reportMonth: body.reportMonth,
    brand: body.brand,
    bytes: pdfBytes.byteLength,
    status,
  });

  return new Response(JSON.stringify({ id: objectId, signedUrl: downloadUrl, expiresAt }), { status: 200, headers: { 'content-type': 'application/json' } });
};

export const onRequest = async (ctx: PagesContext): Promise<Response> => {
  if (ctx.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'content-type': 'application/json', allow: 'POST' } });
  }
  return onRequestPost(ctx);
};
