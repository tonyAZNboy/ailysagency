// Cloudflare Pages Function · /api/audit-pdf-onboarding
//
// Phase C.1: Day-1 onboarding PDF.
//
// Called server-to-server by Reviuzy `provision-ailys-tenant` after a
// successful Stripe-triggered tenant create. Generates a Day-1 baseline
// PDF, stores it in R2, signs a download URL, emails it to the new client.
//
// Differences from /api/audit-pdf:
//   - Service-to-service HMAC auth (no end-user origin)
//   - Idempotent on `stripeCustomerId`: same customer within 7 days
//     returns the existing PDF link, never re-generates or re-emails
//   - Dead-letter queue (KV) on any failure step so we don't lose the
//     Day-1 promise to a transient Resend / R2 hiccup
//   - Synthesizes its own Day-1 payload via buildOnboardingPdfRequest;
//     caller only provides the onboarding inputs (business name, etc.)
//
// Threat model adds:
//   - Reviuzy compromised => spam: HMAC + 5-min replay window + idempotency
//   - Day-1 PDF lost on Resend down: DLQ entry preserves payload for
//     operator manual replay; cron sweep retries after window
//   - Cross-tenant leak via cached payload: idempotency key is hashed
//     stripeCustomerId, never tenantId or email

import { renderAuditPdf } from '../lib/pdf/AuditReport';
import { newObjectId, signDownload } from '../lib/pdfHmac';
import { verifyServiceRequest } from '../lib/serviceAuth';
import { buildOnboardingPdfRequest, OnboardingInput } from '../../src/lib/onboardingAuditPayload';
import { renderEmail, EmailLang } from '../lib/emailTemplate';

interface Env {
  AUDIT_PDFS?: R2Bucket;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace; // also used for idempotency + DLQ
  AUDIT_PDF_HMAC_SECRET?: string;
  AILYS_SERVICE_SHARED_SECRET?: string;
  RESEND_API_KEY?: string;
  ONBOARDING_KILL_SWITCH?: string;
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

const DOWNLOAD_TTL_SECONDS = 24 * 60 * 60;
const IDEMPOTENCY_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
const NOTIFY_FROM = 'AiLys Agency <noreply@ailysagency.ca>';

// ── Hashing helpers ─────────────────────────────────────────────────────────

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function emit(line: Record<string, unknown>): void {
  console.log(JSON.stringify({ component: 'audit-pdf-onboarding', ...line }));
}

// ── Body validation ─────────────────────────────────────────────────────────

interface OnboardingRequestBody {
  stripeCustomerId: string;
  tenantId: string;
  email: string;
  lang: 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'ru';
  businessName: string;
  location: string | null;
  vertical: string;
  websiteUrl: string | null;
  gbpUrl: string | null;
}

const MAX_PAYLOAD_BYTES = 16 * 1024; // 16KB; onboarding payloads are tiny
const ALLOWED_LANGS = new Set(['en', 'fr', 'es', 'zh', 'ar', 'ru']);

function clip(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

interface ValidationResult {
  ok: boolean;
  errors: string[];
  data?: OnboardingRequestBody;
}

function validateBody(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== 'object') return { ok: false, errors: ['body_not_object'] };
  const body = input as Record<string, unknown>;

  const stripeCustomerId = clip(body.stripeCustomerId, 100);
  if (!stripeCustomerId) errors.push('stripeCustomerId is required');
  else if (!/^cus_[A-Za-z0-9_-]+$/.test(stripeCustomerId)) errors.push('stripeCustomerId must match cus_*');

  const tenantId = clip(body.tenantId, 100);
  if (!tenantId) errors.push('tenantId is required');

  const email = clip(body.email, 254);
  if (!email) errors.push('email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email is invalid');

  const lang = (clip(body.lang, 5) ?? 'en') as OnboardingRequestBody['lang'];
  if (!ALLOWED_LANGS.has(lang)) errors.push('lang invalid');

  const businessName = clip(body.businessName, 200);
  if (!businessName) errors.push('businessName is required');

  const location = clip(body.location, 200);
  const vertical = clip(body.vertical, 50) ?? 'other';
  const websiteUrl = clip(body.websiteUrl, 500);
  const gbpUrl = clip(body.gbpUrl, 500);
  if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) errors.push('websiteUrl must be a full URL');
  if (gbpUrl && !/^https?:\/\//i.test(gbpUrl)) errors.push('gbpUrl must be a full URL');

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: [],
    data: {
      stripeCustomerId: stripeCustomerId!,
      tenantId: tenantId!,
      email: email!,
      lang,
      businessName: businessName!,
      location,
      vertical,
      websiteUrl,
      gbpUrl,
    },
  };
}

// ── Idempotency + DLQ ───────────────────────────────────────────────────────

interface IdempotencyRecord {
  objectId: string;
  expiresAt: number;
  emailedAt: number;
  status: 'emailed' | 'stored_no_email' | 'failed_dlq';
}

async function readIdempotency(env: Env, stripeCustomerId: string): Promise<IdempotencyRecord | null> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return null;
  const key = `onb:cust:${await sha256Hex(stripeCustomerId)}`;
  const raw = await env.AUDIT_PDF_RATE_LIMIT.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as IdempotencyRecord;
  } catch {
    return null;
  }
}

async function writeIdempotency(env: Env, stripeCustomerId: string, record: IdempotencyRecord): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return;
  const key = `onb:cust:${await sha256Hex(stripeCustomerId)}`;
  await env.AUDIT_PDF_RATE_LIMIT.put(key, JSON.stringify(record), {
    expirationTtl: IDEMPOTENCY_TTL_SECONDS,
  });
}

interface DlqEntry {
  ts: string;
  stripeCustomerId: string;
  tenantId: string;
  bodyJson: string;
  reason: string;
  attempts: number;
}

async function pushDlq(env: Env, entry: Omit<DlqEntry, 'attempts'>, prevAttempts = 0): Promise<void> {
  if (!env.AUDIT_PDF_RATE_LIMIT) {
    emit({ ts: entry.ts, action: 'dlq_skipped_no_kv', stripeCustomerIdHash: await sha256Hex(entry.stripeCustomerId) });
    return;
  }
  const key = `dlq:onb:${await sha256Hex(entry.stripeCustomerId)}`;
  const value: DlqEntry = { ...entry, attempts: prevAttempts + 1 };
  // 14-day retention so the cron sweep has plenty of time to retry
  await env.AUDIT_PDF_RATE_LIMIT.put(key, JSON.stringify(value), { expirationTtl: 14 * 24 * 60 * 60 });
}

// ── Kill switch ─────────────────────────────────────────────────────────────

async function isKilled(env: Env): Promise<boolean> {
  if ((env.ONBOARDING_KILL_SWITCH ?? '').toLowerCase() === 'true') return true;
  if (!env.AUDIT_PDF_RATE_LIMIT) return false;
  const flag = await env.AUDIT_PDF_RATE_LIMIT.get('onboarding_enabled');
  return flag === 'false';
}

// ── Email ───────────────────────────────────────────────────────────────────

async function sendOnboardingEmail(env: Env, body: OnboardingRequestBody, downloadUrl: string): Promise<{ ok: boolean; error?: string }> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'no_resend_key' };

  const subj: Record<string, string> = {
    en: `Welcome to AiLys, ${body.businessName}, your day-one baseline is ready`,
    fr: `Bienvenue chez AiLys, ${body.businessName}, votre rapport de jour 1 est prêt`,
    es: `Bienvenido a AiLys, ${body.businessName}, tu informe de día 1 está listo`,
    zh: `欢迎加入AiLys, ${body.businessName}, 您的第1天基线报告已就绪`,
    ar: `مرحبًا بك في AiLys، ${body.businessName}، تقرير اليوم الأول جاهز`,
    ru: `Добро пожаловать в AiLys, ${body.businessName}, ваш базовый отчёт первого дня готов`,
  };
  const greet: Record<string, string> = {
    en: 'Welcome to AiLys.',
    fr: 'Bienvenue chez AiLys.',
    es: 'Bienvenido a AiLys.',
    zh: '欢迎加入AiLys。',
    ar: 'مرحبًا بك في AiLys.',
    ru: 'Добро пожаловать в AiLys.',
  };
  const intro: Record<string, string> = {
    en: `Your day-one baseline AI Visibility report for ${body.businessName} is attached. The first scheduled probe completes within 24 to 72 hours and replaces the placeholder citation matrix with real data.`,
    fr: `Votre rapport AI Visibility de référence du jour 1 pour ${body.businessName} est joint. La première sonde planifiée se termine dans 24 à 72 heures et remplace la matrice de citations provisoire par des données réelles.`,
    es: `Tu informe AI Visibility de día 1 para ${body.businessName} está adjunto. La primera sonda programada se completa en 24 a 72 horas y reemplaza la matriz de citas provisional con datos reales.`,
    zh: `${body.businessName}的第1天AI可见性基线报告已附加。第一次计划探测在24至72小时内完成,并将占位符引用矩阵替换为真实数据。`,
    ar: `تقرير AI Visibility الأساسي لليوم الأول لـ ${body.businessName} مرفق. تكتمل أول عملية فحص مجدولة خلال 24 إلى 72 ساعة وتستبدل مصفوفة الاستشهادات المؤقتة ببيانات حقيقية.`,
    ru: `Ваш базовый отчёт AI Visibility первого дня для ${body.businessName} прикреплён. Первое запланированное сканирование завершается в течение 24-72 часов и заменяет временную матрицу цитирований реальными данными.`,
  };
  const cta: Record<string, string> = {
    en: 'Open your day-1 report',
    fr: 'Ouvrir le rapport de jour 1',
    es: 'Abrir el informe de día 1',
    zh: '打开第1天报告',
    ar: 'افتح تقرير اليوم الأول',
    ru: 'Открыть отчёт первого дня',
  };
  const expiry: Record<string, string> = {
    en: 'The download link expires in 24 hours. Reply to this email if you need it re-issued.',
    fr: 'Le lien de téléchargement expire dans 24 heures. Répondez à ce courriel si vous avez besoin qu\'il soit régénéré.',
    es: 'El enlace de descarga caduca en 24 horas. Responde a este correo si necesitas regenerarlo.',
    zh: '下载链接将在24小时后过期。如需重新生成请回复此邮件。',
    ar: 'ينتهي رابط التنزيل خلال 24 ساعة. ردّ على هذا البريد إذا احتجت إعادة إصداره.',
    ru: 'Ссылка для загрузки истекает через 24 часа. Ответьте на это письмо, если потребуется её перевыпустить.',
  };

  const rendered = renderEmail({
    lang: body.lang as EmailLang,
    preheader: greet[body.lang] ?? greet.en,
    title: greet[body.lang] ?? greet.en,
    body: [intro[body.lang] ?? intro.en, expiry[body.lang] ?? expiry.en],
    cta: { label: cta[body.lang] ?? cta.en, url: downloadUrl },
  });

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: body.email,
        subject: subj[body.lang] ?? subj.en,
        html: rendered.html,
        text: rendered.text,
      }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      return { ok: false, error: `resend_${resp.status}_${text.slice(0, 120)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `resend_threw_${(err as Error).message.slice(0, 120)}` };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Handler ─────────────────────────────────────────────────────────────────

export const onRequest: (ctx: PagesContext) => Promise<Response> = async (ctx) => {
  const start = Date.now();
  const { request, env } = ctx;

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  // 1. Read body once (we need raw text for HMAC verification)
  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }
  if (bodyText.length > MAX_PAYLOAD_BYTES) {
    return jsonResponse({ error: 'payload_too_large' }, 413);
  }

  // 2. Service-to-service auth (HMAC over body + timestamp)
  const auth = await verifyServiceRequest(env.AILYS_SERVICE_SHARED_SECRET, request, bodyText);
  if (!auth.ok) {
    emit({ ts: new Date().toISOString(), action: 'reject_service_auth', status: 401, reason: auth.reason, latencyMs: Date.now() - start });
    return jsonResponse({ error: 'service_auth_failed', detail: auth.reason }, 401);
  }

  // 3. Parse JSON
  let bodyJson: unknown;
  try {
    bodyJson = JSON.parse(bodyText);
  } catch {
    emit({ ts: new Date().toISOString(), action: 'reject_invalid_json', status: 400, latencyMs: Date.now() - start, caller: auth.caller });
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  // 4. Validate shape
  const validation = validateBody(bodyJson);
  if (!validation.ok || !validation.data) {
    emit({ ts: new Date().toISOString(), action: 'reject_validation', status: 400, reason: validation.errors.join(','), latencyMs: Date.now() - start, caller: auth.caller });
    return jsonResponse({ error: 'validation_failed', detail: validation.errors }, 400);
  }
  const body = validation.data;
  const customerHash = await sha256Hex(body.stripeCustomerId);

  // 5. Kill switch
  if (await isKilled(env)) {
    emit({ ts: new Date().toISOString(), action: 'reject_kill_switch', status: 503, latencyMs: Date.now() - start, caller: auth.caller, customerHash });
    return jsonResponse({ error: 'service_temporarily_disabled' }, 503);
  }

  // 6. Idempotency: same customer within 7 days returns the existing record
  const existing = await readIdempotency(env, body.stripeCustomerId);
  if (existing) {
    emit({ ts: new Date().toISOString(), action: 'idempotent_replay', status: 202, latencyMs: Date.now() - start, caller: auth.caller, customerHash });
    return jsonResponse({
      status: 'idempotent_replay',
      message: 'Day-1 PDF already generated for this customer within the last 7 days.',
      generatedAt: existing.emailedAt,
      previousStatus: existing.status,
    }, 202);
  }

  // 7. Synthesize Day-1 payload
  const onbInput: OnboardingInput = {
    email: body.email,
    lang: body.lang,
    businessName: body.businessName,
    location: body.location,
    vertical: body.vertical,
    websiteUrl: body.websiteUrl,
    gbpUrl: body.gbpUrl,
  };
  const pdfRequest = buildOnboardingPdfRequest(onbInput);

  // 8. Render PDF
  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await renderAuditPdf(pdfRequest);
  } catch (err) {
    const reason = err instanceof Error ? err.message.slice(0, 200) : 'unknown';
    await pushDlq(env, { ts: new Date().toISOString(), stripeCustomerId: body.stripeCustomerId, tenantId: body.tenantId, bodyJson: bodyText, reason: `render_failed:${reason}` });
    emit({ ts: new Date().toISOString(), action: 'render_failed', status: 500, reason, latencyMs: Date.now() - start, caller: auth.caller, customerHash });
    return jsonResponse({ error: 'render_failed' }, 500);
  }

  // 9. Need R2 + HMAC for the email-link path. Without bindings, store the
  //    DLQ entry so the cron sweep can retry once they're configured.
  if (!env.AUDIT_PDFS || !env.AUDIT_PDF_HMAC_SECRET) {
    await pushDlq(env, { ts: new Date().toISOString(), stripeCustomerId: body.stripeCustomerId, tenantId: body.tenantId, bodyJson: bodyText, reason: 'bindings_missing' });
    emit({ ts: new Date().toISOString(), action: 'dlq_bindings_missing', status: 503, latencyMs: Date.now() - start, caller: auth.caller, customerHash });
    return jsonResponse({
      status: 'queued_dlq',
      message: 'PDF rendered but storage/secret bindings missing. Operator will replay once configured.',
    }, 503);
  }

  // 10. Upload to R2
  const objectId = newObjectId();
  const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;
  try {
    await env.AUDIT_PDFS.put(objectId, pdfBytes, {
      httpMetadata: { contentType: 'application/pdf' },
      customMetadata: {
        flow: 'onboarding',
        tenant_id: body.tenantId,
        customer_hash: customerHash,
        generated_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    const reason = err instanceof Error ? err.message.slice(0, 200) : 'unknown';
    await pushDlq(env, { ts: new Date().toISOString(), stripeCustomerId: body.stripeCustomerId, tenantId: body.tenantId, bodyJson: bodyText, reason: `r2_put_failed:${reason}` });
    emit({ ts: new Date().toISOString(), action: 'r2_put_failed', status: 500, reason, latencyMs: Date.now() - start, caller: auth.caller, customerHash });
    return jsonResponse({ error: 'storage_failed' }, 500);
  }

  // 11. Sign + email
  const sig = await signDownload(env.AUDIT_PDF_HMAC_SECRET, objectId, expiresAt);
  const origin = new URL(request.url).origin;
  const downloadUrl = `${origin}/api/audit-pdf-download/${objectId}?exp=${expiresAt}&sig=${sig}`;

  let status: IdempotencyRecord['status'] = 'stored_no_email';
  if (env.RESEND_API_KEY) {
    const send = await sendOnboardingEmail(env, body, downloadUrl);
    if (send.ok) {
      status = 'emailed';
    } else {
      await pushDlq(env, { ts: new Date().toISOString(), stripeCustomerId: body.stripeCustomerId, tenantId: body.tenantId, bodyJson: bodyText, reason: `resend_failed:${send.error}` });
      emit({ ts: new Date().toISOString(), action: 'email_failed_dlq', status: 500, reason: send.error, latencyMs: Date.now() - start, caller: auth.caller, customerHash });
      // Still write idempotency so we don't double-charge; operator replays via DLQ
      await writeIdempotency(env, body.stripeCustomerId, { objectId, expiresAt, emailedAt: Date.now(), status: 'failed_dlq' });
      return jsonResponse({ error: 'email_failed_queued_dlq', detail: send.error }, 500);
    }
  }

  // 12. Idempotency record so a duplicate Stripe webhook within 7 days no-ops
  await writeIdempotency(env, body.stripeCustomerId, {
    objectId,
    expiresAt,
    emailedAt: Date.now(),
    status,
  });

  emit({
    ts: new Date().toISOString(),
    action: 'onboarding_pdf_delivered',
    status: 202,
    latencyMs: Date.now() - start,
    caller: auth.caller,
    customerHash,
    reason: `delivery=${status},bytes=${pdfBytes.byteLength}`,
  });

  return jsonResponse({
    status,
    message:
      status === 'emailed'
        ? 'Day-1 PDF rendered, stored, and emailed.'
        : 'Day-1 PDF rendered + stored. Email skipped (no Resend key).',
    ...(status === 'stored_no_email' ? { downloadUrl } : {}),
    expiresAt,
  }, 202);
};

function jsonResponse(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    },
  });
}
