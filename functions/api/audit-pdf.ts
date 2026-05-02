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
import { newObjectId, signDownload } from '../lib/pdfHmac';
import { renderEmail, EmailLang } from '../lib/emailTemplate';
import { captureServerError } from '../lib/serverError';
import { sendAndLog } from '../lib/emailLog';

interface Env {
  ALLOWED_ORIGINS?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace; // bound in Pages Settings → Functions → KV bindings
  AUDIT_PDFS?: R2Bucket; // bound in Pages Settings → Functions → R2 bindings
  AUDIT_PDF_HMAC_SECRET?: string; // env var, 64-byte random
  RESEND_API_KEY?: string;
  PDF_EXPORT_KILL_SWITCH?: string; // optional override, "false" disables endpoint
  /** Operator notification for serverError ERROR/FATAL alerts. */
  OPERATOR_NOTIFY_EMAIL?: string;
  /** Supabase persistence target for serverError audit_log rows. */
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  /** Build commit (Cloudflare Pages auto-set). Included in alert emails. */
  CF_PAGES_COMMIT_SHA?: string;
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

const DOWNLOAD_TTL_SECONDS = 24 * 60 * 60; // 24h
const NOTIFY_FROM = 'AiLys Agency <noreply@ailysagency.ca>';

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

function emitAuditLog(ctx: PagesContext, entry: AuditLogEntry): void {
  // Cloudflare Logpush picks up structured console.log JSON.
  // Per CLAUDE.md hard rule #9, no PII in clear; only SHA-256 hashes.
  console.log(JSON.stringify({ component: 'audit-pdf', ...entry }));

  // B.4.4: ring-buffer write to KV for the admin observability endpoint.
  // Non-blocking via waitUntil so it never adds latency to the user path.
  // 7-day TTL auto-evicts; aggregate of last 50 used by /api/admin/audit-pdf-stats.
  // No PII: entry already contains only SHA-256 hashes per AuditLogEntry contract.
  const kv = ctx.env.AUDIT_PDF_RATE_LIMIT;
  if (kv) {
    const key = `audit_pdf_log:${Date.now()}`;
    ctx.waitUntil(
      kv.put(key, JSON.stringify(entry), { expirationTtl: 7 * 24 * 60 * 60 }).catch(() => {
        // Swallow KV failures: audit log to KV is observability, not durability.
        // Logpush still has the source-of-truth log line.
      }),
    );
  }
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
    emitAuditLog(ctx, {
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
      emitAuditLog(ctx, {
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
    emitAuditLog(ctx, {
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
    emitAuditLog(ctx, {
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
    emitAuditLog(ctx, {
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
    emitAuditLog(ctx, {
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

  // 6. Render the PDF.
  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await renderAuditPdf(data);
  } catch (err) {
    emitAuditLog(ctx, {
      ts: new Date().toISOString(),
      action: 'render_failed',
      actorHash,
      ipHash,
      status: 500,
      payloadHash,
      reason: err instanceof Error ? err.message.slice(0, 200) : 'unknown',
      latencyMs: Date.now() - start,
    });
    // PDF render failure is a real ops incident (renderer changes, malformed
    // input that bypassed validation, etc.). Page operator immediately.
    await captureServerError(ctx.env, {
      endpoint: 'audit-pdf',
      severity: 'error',
      err,
      requestId: payloadHash.slice(0, 12),
      userIpHash: ipHash,
      payloadHash,
      context: {
        stage: 'render',
        latency_ms: Date.now() - start,
        vertical: data.vertical ?? null,
      },
    });
    return jsonResponse({ error: 'render_failed' }, 500);
  }

  // 7. Decide the delivery mode.
  //    - Production (R2 + HMAC + Resend bound): store in R2, sign URL, email
  //      the link, return { status: 'emailed' } with no PDF body.
  //    - Fallback (any binding missing): stream PDF directly to the caller.
  //      This keeps the endpoint testable from local dev and handles the
  //      pre-binding-setup deploy gracefully.
  const canQueue = !!(env.AUDIT_PDFS && env.AUDIT_PDF_HMAC_SECRET);
  if (canQueue) {
    const objectId = newObjectId();
    const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;
    try {
      await env.AUDIT_PDFS!.put(objectId, pdfBytes, {
        httpMetadata: { contentType: 'application/pdf' },
        customMetadata: {
          actor_hash: actorHash,
          payload_hash: payloadHash,
          generated_at: new Date().toISOString(),
        },
      });
    } catch (err) {
      emitAuditLog(ctx, {
        ts: new Date().toISOString(),
        action: 'r2_put_failed',
        actorHash,
        ipHash,
        status: 500,
        payloadHash,
        reason: err instanceof Error ? err.message.slice(0, 200) : 'unknown',
        latencyMs: Date.now() - start,
      });
      // R2 storage failure is critical: the PDF was rendered but cannot
      // be persisted, so the user gets nothing. Page operator.
      await captureServerError(ctx.env, {
        endpoint: 'audit-pdf',
        severity: 'error',
        err,
        requestId: payloadHash.slice(0, 12),
        userIpHash: ipHash,
        payloadHash,
        context: {
          stage: 'r2_put',
          object_id: objectId,
          pdf_bytes: pdfBytes.byteLength,
          latency_ms: Date.now() - start,
        },
      });
      return jsonResponse({ error: 'storage_failed' }, 500);
    }

    const sig = await signDownload(env.AUDIT_PDF_HMAC_SECRET!, objectId, expiresAt);
    const origin = new URL(request.url).origin;
    const downloadUrl = `${origin}/api/audit-pdf-download/${objectId}?exp=${expiresAt}&sig=${sig}`;

    if (env.RESEND_API_KEY) {
      const emailSent = await sendDownloadEmail(env, data, downloadUrl);
      emitAuditLog(ctx, {
        ts: new Date().toISOString(),
        action: emailSent.ok ? 'email_sent' : 'email_failed',
        actorHash,
        ipHash,
        status: emailSent.ok ? 200 : 500,
        payloadHash,
        reason: emailSent.error,
        latencyMs: Date.now() - start,
      });
      if (!emailSent.ok) {
        return jsonResponse({ error: 'email_failed', detail: emailSent.error }, 500);
      }
    } else {
      emitAuditLog(ctx, {
        ts: new Date().toISOString(),
        action: 'email_skipped_no_key',
        actorHash,
        ipHash,
        status: 200,
        payloadHash,
        latencyMs: Date.now() - start,
      });
    }

    emitAuditLog(ctx, {
      ts: new Date().toISOString(),
      action: 'pdf_queued',
      actorHash,
      ipHash,
      status: 202,
      payloadHash,
      reason: `bytes=${pdfBytes.byteLength}`,
      latencyMs: Date.now() - start,
    });
    return jsonResponse(
      {
        status: env.RESEND_API_KEY ? 'emailed' : 'stored_no_email',
        message: env.RESEND_API_KEY
          ? 'Your audit PDF is on its way. Check your inbox.'
          : 'Your audit PDF is ready. The download link was logged but email is not configured.',
        // Echo the link only when Resend is missing, so the operator
        // can deliver it manually during initial setup.
        ...(env.RESEND_API_KEY ? {} : { downloadUrl }),
        expiresAt,
      },
      202,
    );
  }

  // Fallback path: R2 + HMAC not configured. Instead of streaming the PDF
  // back to the client (and not emailing), we attach the PDF to a Resend
  // email so the user still receives it. Resend supports up to 40MB
  // attachments. Our PDFs are ~13KB, well within limits.
  if (env.RESEND_API_KEY) {
    const attachResult = await sendPdfAttachmentEmail(env, data, pdfBytes);
    emitAuditLog(ctx, {
      ts: new Date().toISOString(),
      action: attachResult.ok ? 'pdf_attached_email_sent' : 'pdf_attached_email_failed',
      actorHash,
      ipHash,
      status: attachResult.ok ? 200 : 500,
      payloadHash,
      reason: attachResult.error,
      latencyMs: Date.now() - start,
    });
    if (!attachResult.ok) {
      return jsonResponse({ error: 'email_failed', detail: attachResult.error }, 500);
    }
    return jsonResponse(
      {
        status: 'emailed_attachment',
        message: 'Your audit PDF is on its way as an attachment. Check your inbox.',
      },
      202,
    );
  }

  // Final fallback: stream directly when even Resend is missing.
  emitAuditLog(ctx, {
    ts: new Date().toISOString(),
    action: 'pdf_streamed',
    actorHash,
    ipHash,
    status: 200,
    payloadHash,
    reason: `bytes=${pdfBytes.byteLength},mode=fallback_no_r2_or_hmac_or_resend`,
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

async function sendPdfAttachmentEmail(
  env: Env,
  data: AuditPdfRequest,
  pdfBytes: Uint8Array,
): Promise<SendResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'no_resend_key' };
  const lang = data.lang;

  const subject = pickLocale(lang, {
    en: `Your AiLys audit report is ready, ${data.businessName}`,
    fr: `Votre rapport AiLys est pret, ${data.businessName}`,
    es: `Tu informe AiLys esta listo, ${data.businessName}`,
    zh: `${data.businessName}, 您的AiLys审计报告已就绪`,
    ar: `تقرير AiLys الخاص بك جاهز, ${data.businessName}`,
    ru: `Ваш отчет AiLys готов, ${data.businessName}`,
  });
  const greeting = pickLocale(lang, {
    en: 'Your AI Visibility audit is ready.',
    fr: 'Votre audit AI Visibility est pret.',
    es: 'Tu auditoria de AI Visibility esta lista.',
    zh: '您的AI可见性审计已就绪。',
    ar: 'تدقيق AI Visibility الخاص بك جاهز.',
    ru: 'Ваш аудит AI Visibility готов.',
  });
  const intro = pickLocale(lang, {
    en: `We have prepared the branded audit report for ${data.businessName}. The PDF is attached to this email.`,
    fr: `Nous avons prepare le rapport personnalise pour ${data.businessName}. Le PDF est joint a ce courriel.`,
    es: `Hemos preparado el informe personalizado para ${data.businessName}. El PDF esta adjunto a este correo.`,
    zh: `我们已为${data.businessName}准备好专属审计报告。PDF已附加到此邮件。`,
    ar: `لقد أعددنا تقرير التدقيق المخصص لـ ${data.businessName}. مرفق PDF بهذا البريد.`,
    ru: `Мы подготовили персональный отчет для ${data.businessName}. PDF прикреплен к письму.`,
  });

  const holdBack = pickLocale(lang, {
    en: 'Inside the PDF you will find the score, the citation matrix on 6 AI engines, the GBP pulse, the top 3 prioritized actions, and a one-page schema preview. The next 5 actions of the 90-day plan, the JSON-LD templates per page, the citation directory outreach scripts, and the week-by-week deployment sequence are reserved for the strategist call.',
    fr: 'Dans le PDF vous trouverez le score, la matrice de citations sur 6 moteurs IA, le pouls GBP, les 3 actions prioritaires et un apercu schema d\'une page. Les 5 actions suivantes du plan 90 jours, les gabarits JSON-LD par page, les scripts d\'outreach pour les annuaires de citations et la sequence de deploiement semaine par semaine sont reserves a l\'appel strategiste.',
    es: 'En el PDF encontraras la puntuacion, la matriz de citas en 6 motores IA, el pulso de GBP, las 3 acciones prioritarias y una vista previa del schema. Las 5 acciones siguientes del plan de 90 dias, las plantillas JSON-LD por pagina y los scripts de divulgacion de citas se reservan para la llamada con el estratega.',
    zh: 'PDF包含分数、6个AI引擎的引用矩阵、GBP脉冲、前3个优先行动和一页schema预览。90天计划的接下来5个行动、每页的JSON-LD模板、引用目录外联脚本和按周部署顺序保留给策略师电话会议。',
    ar: 'يحتوي PDF على النتيجة ومصفوفة الاستشهادات على 6 محركات ذكاء اصطناعي ونبض GBP وأعلى 3 إجراءات وأول صفحة من schema. الإجراءات الخمسة التالية من خطة 90 يومًا وقوالب JSON-LD لكل صفحة وسكربتات الاستشهاد محفوظة لمكالمة الاستراتيجي.',
    ru: 'В PDF вы найдете оценку, матрицу цитирований по 6 ИИ-движкам, пульс GBP, топ-3 приоритетных действия и предварительный просмотр схемы. Следующие 5 действий 90-дневного плана, шаблоны JSON-LD по страницам и скрипты для каталогов цитирований зарезервированы для звонка со стратегом.',
  });

  const callCta = pickLocale(lang, {
    en: 'Reply to this email with a 60-minute window that works, or book directly at https://www.ailysagency.ca/audit. The first call is free, no credit card required.',
    fr: 'Repondez a ce courriel avec une plage de 60 minutes qui vous convient, ou reservez directement a https://www.ailysagency.ca/fr/audit. Le premier appel est gratuit, sans carte de credit.',
    es: 'Responde a este correo con una ventana de 60 minutos que te funcione, o reserva en https://www.ailysagency.ca/audit. La primera llamada es gratis.',
    zh: '回复此邮件并提供合适的60分钟时段，或直接在 https://www.ailysagency.ca/audit 预约。首次通话免费。',
    ar: 'رد على هذا البريد بنافذة 60 دقيقة تناسبك، أو احجز مباشرة على https://www.ailysagency.ca/audit. المكالمة الأولى مجانية.',
    ru: 'Ответьте на это письмо с подходящим окном на 60 минут, или забронируйте на https://www.ailysagency.ca/audit. Первый звонок бесплатный.',
  });

  const rendered = renderEmail({
    lang: lang as EmailLang,
    preheader: greeting,
    title: greeting,
    body: [intro, holdBack, callCta],
  });

  // Convert pdfBytes -> base64 for Resend attachment
  const b64 = btoa(String.fromCharCode(...pdfBytes));
  const filename = `audit-${data.businessName.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)}.pdf`;

  const result = await sendAndLog(env, {
    from: NOTIFY_FROM,
    to: data.email,
    subject,
    html: rendered.html,
    text: rendered.text,
    attachments: [{ filename, content: b64 }],
  }, {
    email: data.email,
    sequence_slug: 'audit_pdf',
    step: 0,
    subject,
  });
  if (result.error) return { ok: false, error: result.error };
  return { ok: true };
}

interface SendResult { ok: boolean; error?: string }

async function sendDownloadEmail(env: Env, data: AuditPdfRequest, downloadUrl: string): Promise<SendResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'no_resend_key' };

  // Localized subject + body. Keep brand names in English per project rule.
  const lang = data.lang;
  const subject = pickLocale(lang, {
    en: `Your AiLys audit report is ready, ${data.businessName}`,
    fr: `Votre rapport AiLys est prêt, ${data.businessName}`,
    es: `Tu informe AiLys está listo, ${data.businessName}`,
    zh: `${data.businessName}, 您的AiLys审计报告已就绪`,
    ar: `تقرير AiLys الخاص بك جاهز, ${data.businessName}`,
    ru: `Ваш отчёт AiLys готов, ${data.businessName}`,
  });

  const greeting = pickLocale(lang, {
    en: 'Your AI Visibility audit is ready.',
    fr: 'Votre audit AI Visibility est prêt.',
    es: 'Tu auditoría de AI Visibility está lista.',
    zh: '您的AI可见性审计已就绪。',
    ar: 'تدقيق AI Visibility الخاص بك جاهز.',
    ru: 'Ваш аудит AI Visibility готов.',
  });

  const cta = pickLocale(lang, {
    en: 'Open the report',
    fr: 'Ouvrir le rapport',
    es: 'Abrir el informe',
    zh: '打开报告',
    ar: 'افتح التقرير',
    ru: 'Открыть отчёт',
  });

  const expiryLine = pickLocale(lang, {
    en: 'The link expires in 24 hours.',
    fr: 'Le lien expire dans 24 heures.',
    es: 'El enlace caduca en 24 horas.',
    zh: '链接将在24小时后过期。',
    ar: 'الرابط ينتهي خلال 24 ساعة.',
    ru: 'Ссылка истекает через 24 часа.',
  });

  const intro = pickLocale(lang, {
    en: `We have prepared the branded audit report for ${data.businessName}. Click the button below to download the PDF.`,
    fr: `Nous avons prepare le rapport personnalise pour ${data.businessName}. Cliquez sur le bouton ci-dessous pour telecharger le PDF.`,
    es: `Hemos preparado el informe personalizado para ${data.businessName}. Haz clic en el boton para descargar el PDF.`,
    zh: `我们已为${data.businessName}准备好专属审计报告。点击下方按钮下载PDF。`,
    ar: `لقد أعددنا تقرير التدقيق المخصص لـ ${data.businessName}. انقر على الزر أدناه لتنزيل PDF.`,
    ru: `Мы подготовили персональный отчет для ${data.businessName}. Нажмите кнопку ниже, чтобы скачать PDF.`,
  });

  const holdBack = pickLocale(lang, {
    en: 'Inside the PDF you will find the score, the citation matrix on 6 AI engines, the GBP pulse, the top 3 prioritized actions, and a one-page schema preview. The next 5 actions of the 90-day plan, the JSON-LD templates per page, the citation directory outreach scripts, and the week-by-week deployment sequence are reserved for the strategist call.',
    fr: 'Dans le PDF vous trouverez le score, la matrice de citations sur 6 moteurs IA, le pouls GBP, les 3 actions prioritaires et un apercu schema d\'une page. Les 5 actions suivantes du plan 90 jours, les gabarits JSON-LD par page, les scripts d\'outreach pour les annuaires de citations et la sequence de deploiement semaine par semaine sont reserves a l\'appel strategiste.',
    es: 'En el PDF encontraras la puntuacion, la matriz de citas en 6 motores IA, el pulso de GBP, las 3 acciones prioritarias y una vista previa del schema. Las 5 acciones siguientes del plan de 90 dias, las plantillas JSON-LD por pagina y los scripts de divulgacion de citas se reservan para la llamada con el estratega.',
    zh: 'PDF包含分数、6个AI引擎的引用矩阵、GBP脉冲、前3个优先行动和一页schema预览。90天计划的接下来5个行动、每页的JSON-LD模板、引用目录外联脚本和按周部署顺序保留给策略师电话会议。',
    ar: 'يحتوي PDF على النتيجة ومصفوفة الاستشهادات على 6 محركات ذكاء اصطناعي ونبض GBP وأعلى 3 إجراءات وأول صفحة من schema. الإجراءات الخمسة التالية من خطة 90 يومًا وقوالب JSON-LD لكل صفحة وسكربتات الاستشهاد محفوظة لمكالمة الاستراتيجي.',
    ru: 'В PDF вы найдете оценку, матрицу цитирований по 6 ИИ-движкам, пульс GBP, топ-3 приоритетных действия и предварительный просмотр схемы. Следующие 5 действий 90-дневного плана, шаблоны JSON-LD по страницам и скрипты для каталогов цитирований зарезервированы для звонка со стратегом.',
  });

  const callCta = pickLocale(lang, {
    en: 'Reply to this email with a 60-minute window that works, or book directly at https://www.ailysagency.ca/audit. The first call is free, no credit card required.',
    fr: 'Repondez a ce courriel avec une plage de 60 minutes qui vous convient, ou reservez directement a https://www.ailysagency.ca/fr/audit. Le premier appel est gratuit, sans carte de credit.',
    es: 'Responde a este correo con una ventana de 60 minutos que te funcione, o reserva en https://www.ailysagency.ca/audit. La primera llamada es gratis.',
    zh: '回复此邮件并提供合适的60分钟时段，或直接在 https://www.ailysagency.ca/audit 预约。首次通话免费。',
    ar: 'رد على هذا البريد بنافذة 60 دقيقة تناسبك، أو احجز مباشرة على https://www.ailysagency.ca/audit. المكالمة الأولى مجانية.',
    ru: 'Ответьте на это письмо с подходящим окном на 60 минут, или забронируйте на https://www.ailysagency.ca/audit. Первый звонок бесплатный.',
  });

  const rendered = renderEmail({
    lang: lang as EmailLang,
    preheader: greeting,
    title: greeting,
    body: [intro, expiryLine, holdBack, callCta],
    cta: { label: cta, url: downloadUrl },
  });

  const result = await sendAndLog(env, {
    from: NOTIFY_FROM,
    to: data.email,
    subject,
    html: rendered.html,
    text: rendered.text,
  }, {
    email: data.email,
    sequence_slug: 'audit_pdf',
    step: 0,
    subject,
  });
  if (result.error) return { ok: false, error: result.error };
  return { ok: true };
}

function pickLocale(lang: string, map: Record<string, string>): string {
  return map[lang] ?? map.en;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
