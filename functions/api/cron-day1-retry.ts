// Cloudflare Pages Function · /api/cron-day1-retry
//
// Phase C.2: cron handler that replays failed Day-1 onboarding PDFs
// from the DLQ (KV `dlq:onb:*`). Designed to be invoked every 30 min
// via Cloudflare Cron Triggers OR via direct HTTP call from external
// schedulers (Reviuzy pg_cron). Either way it requires service auth.
//
// Behavior:
//   1. Service auth via HMAC (caller must be `ailys-cron-day1-retry`)
//   2. Kill switch + concurrency lock via withCronGuard
//   3. Scan DLQ for entries with attempts < 5 (max 5 retry attempts
//      per item before giving up; on attempt 5 we keep the entry but
//      bump attempts so an operator can intervene)
//   4. For each item: re-render, re-upload to R2, re-sign, re-email.
//      On success delete the DLQ entry. On failure increment attempts.
//   5. Per-run cap: max 50 items per invocation to stay under the
//      5-minute lock window.
//   6. Returns CronRunSummary via withCronGuard wrapper.
//
// Note: the actual DLQ scan iterates KV via `list()`. KV's `list()` is
// available on the binding; we filter by prefix `dlq:onb:`.

import { renderAuditPdf } from '../lib/pdf/AuditReport';
import { newObjectId, signDownload } from '../lib/pdfHmac';
import { verifyServiceRequest } from '../lib/serviceAuth';
import { withCronGuard, CronRunSummary } from '../lib/cronGuard';
import { buildOnboardingPdfRequest } from '../../src/lib/onboardingAuditPayload';
import { renderEmail, EmailLang } from '../lib/emailTemplate';

interface Env {
  AUDIT_PDFS?: R2Bucket;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace;
  AUDIT_PDF_HMAC_SECRET?: string;
  AILYS_SERVICE_SHARED_SECRET?: string;
  RESEND_API_KEY?: string;
}

interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: Array<{ name: string }> }>;
}
interface R2Bucket {
  put(key: string, value: ArrayBuffer | Uint8Array | ReadableStream, options?: Record<string, unknown>): Promise<unknown>;
}
interface PagesContext {
  request: Request;
  env: Env;
}

const MAX_ATTEMPTS = 5;
const PER_RUN_ITEM_CAP = 50;
const DOWNLOAD_TTL_SECONDS = 24 * 60 * 60;

interface DlqEntry {
  ts: string;
  stripeCustomerId: string;
  tenantId: string;
  bodyJson: string; // original onboarding request body (raw)
  reason: string;
  attempts: number;
}

interface OnboardingBody {
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

export const onRequest: (ctx: PagesContext) => Promise<Response> = async (ctx) => {
  // Authenticate before invoking cron guard so unauthorized calls
  // don't even acquire the lock.
  if (ctx.request.method !== 'POST') {
    return new Response('method_not_allowed', { status: 405 });
  }
  const bodyText = await ctx.request.text();
  // Cron invocations may have empty body; we still verify HMAC over it.
  const auth = await verifyServiceRequest(ctx.env.AILYS_SERVICE_SHARED_SECRET, ctx.request, bodyText);
  if (!auth.ok || auth.caller !== 'ailys-cron-day1-retry') {
    return new Response(JSON.stringify({ error: 'service_auth_failed', detail: auth.ok ? 'wrong_caller' : auth.reason }), {
      status: 401,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  return withCronGuard('day1-retry-sweep', async (innerCtx: PagesContext) => {
    const env = innerCtx.env;
    if (!env.AUDIT_PDF_RATE_LIMIT) {
      return { items_processed: 0, successes: 0, failures: 0, notes: 'no KV binding; skipped' };
    }

    const list = await env.AUDIT_PDF_RATE_LIMIT.list({ prefix: 'dlq:onb:', limit: PER_RUN_ITEM_CAP });
    let processed = 0;
    let successes = 0;
    let failures = 0;

    for (const k of list.keys) {
      processed++;
      const raw = await env.AUDIT_PDF_RATE_LIMIT.get(k.name);
      if (!raw) continue;
      let entry: DlqEntry;
      try {
        entry = JSON.parse(raw) as DlqEntry;
      } catch {
        await env.AUDIT_PDF_RATE_LIMIT.delete(k.name);
        failures++;
        continue;
      }
      if (entry.attempts >= MAX_ATTEMPTS) {
        // Give up automatically; operator must intervene
        continue;
      }

      // Try the replay
      let body: OnboardingBody;
      try {
        body = JSON.parse(entry.bodyJson) as OnboardingBody;
      } catch {
        await env.AUDIT_PDF_RATE_LIMIT.delete(k.name);
        failures++;
        continue;
      }

      const ok = await replayOne(env, entry, body);
      if (ok) {
        await env.AUDIT_PDF_RATE_LIMIT.delete(k.name);
        successes++;
      } else {
        // Increment attempts
        const next: DlqEntry = { ...entry, attempts: entry.attempts + 1 };
        await env.AUDIT_PDF_RATE_LIMIT.put(k.name, JSON.stringify(next), { expirationTtl: 14 * 24 * 60 * 60 });
        failures++;
      }
    }

    const summary: CronRunSummary = {
      items_processed: processed,
      successes,
      failures,
      notes: list.keys.length === PER_RUN_ITEM_CAP ? 'hit per-run cap; more items remain' : undefined,
    };
    return summary;
  })(ctx);
};

async function replayOne(env: Env, entry: DlqEntry, body: OnboardingBody): Promise<boolean> {
  if (!env.AUDIT_PDFS || !env.AUDIT_PDF_HMAC_SECRET) {
    // Bindings still missing; skip, not failed
    return false;
  }
  try {
    const pdfReq = buildOnboardingPdfRequest({
      email: body.email,
      lang: body.lang,
      businessName: body.businessName,
      location: body.location,
      vertical: body.vertical,
      websiteUrl: body.websiteUrl,
      gbpUrl: body.gbpUrl,
    });
    const pdfBytes = await renderAuditPdf(pdfReq);
    const objectId = newObjectId();
    const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;
    await env.AUDIT_PDFS.put(objectId, pdfBytes, {
      httpMetadata: { contentType: 'application/pdf' },
      customMetadata: {
        flow: 'onboarding-retry',
        tenant_id: body.tenantId,
        original_reason: entry.reason.slice(0, 200),
        retry_attempt: String(entry.attempts + 1),
      },
    });
    const sig = await signDownload(env.AUDIT_PDF_HMAC_SECRET, objectId, expiresAt);
    const downloadUrl = `https://ailysagency.pages.dev/api/audit-pdf-download/${objectId}?exp=${expiresAt}&sig=${sig}`;

    if (env.RESEND_API_KEY) {
      const sent = await sendRetryEmail(env, body, downloadUrl);
      return sent.ok;
    }
    // No Resend, but storage succeeded; consider this a partial replay
    // success only if the operator surfaces the URL out-of-band. For now
    // we return false so the entry stays for explicit operator action.
    return false;
  } catch {
    return false;
  }
}

interface SendResult { ok: boolean; error?: string }

async function sendRetryEmail(env: Env, body: OnboardingBody, downloadUrl: string): Promise<SendResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'no_resend_key' };
  const subject: Record<string, string> = {
    en: `AiLys: your day-one report is ready, ${body.businessName}`,
    fr: `AiLys : votre rapport de jour 1 est prêt, ${body.businessName}`,
    es: `AiLys: tu informe de día 1 está listo, ${body.businessName}`,
    zh: `AiLys: ${body.businessName}, 您的第1天报告已就绪`,
    ar: `AiLys: تقرير اليوم الأول جاهز, ${body.businessName}`,
    ru: `AiLys: ваш отчёт первого дня готов, ${body.businessName}`,
  };
  const titleByLang: Record<string, string> = {
    en: 'Your day-1 report is ready',
    fr: 'Votre rapport de jour 1 est pret',
    es: 'Tu informe de dia 1 esta listo',
    zh: '您的第1天报告已就绪',
    ar: 'تقرير اليوم الأول جاهز',
    ru: 'Ваш отчет первого дня готов',
  };
  const introByLang: Record<string, string> = {
    en: 'We had a brief delay processing your report. It is now ready.',
    fr: 'Nous avons eu un bref delai pour traiter votre rapport. Il est maintenant pret.',
    es: 'Hubo un breve retraso procesando tu informe. Ya esta listo.',
    zh: '处理您的报告时有短暂延迟,现已准备就绪。',
    ar: 'كان هناك تأخير قصير في معالجة تقريرك. أصبح جاهزًا الآن.',
    ru: 'Произошла небольшая задержка с подготовкой вашего отчета. Сейчас он готов.',
  };
  const ctaByLang: Record<string, string> = {
    en: 'Open report',
    fr: 'Ouvrir le rapport',
    es: 'Abrir informe',
    zh: '打开报告',
    ar: 'افتح التقرير',
    ru: 'Открыть отчет',
  };
  const expiryByLang: Record<string, string> = {
    en: 'The link expires in 24 hours.',
    fr: 'Le lien expire dans 24 heures.',
    es: 'El enlace caduca en 24 horas.',
    zh: '链接将在24小时后过期。',
    ar: 'الرابط ينتهي خلال 24 ساعة.',
    ru: 'Ссылка истекает через 24 часа.',
  };
  const rendered = renderEmail({
    lang: body.lang as EmailLang,
    preheader: titleByLang[body.lang] ?? titleByLang.en,
    title: titleByLang[body.lang] ?? titleByLang.en,
    body: [introByLang[body.lang] ?? introByLang.en, expiryByLang[body.lang] ?? expiryByLang.en],
    cta: { label: ctaByLang[body.lang] ?? ctaByLang.en, url: downloadUrl },
  });
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'AiLys Agency <noreply@ailysagency.ca>',
        to: body.email,
        subject: subject[body.lang] ?? subject.en,
        html: rendered.html,
        text: rendered.text,
      }),
    });
    if (!resp.ok) return { ok: false, error: `resend_${resp.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `resend_threw_${(err as Error).message.slice(0, 80)}` };
  }
}
