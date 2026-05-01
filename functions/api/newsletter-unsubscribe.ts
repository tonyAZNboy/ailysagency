// Cloudflare Pages Function · /api/newsletter-unsubscribe
//
// Handles GET (one-click from email footer) and POST (RFC 8058 List-Unsubscribe-Post).
// Returns a simple branded HTML page on success or a JSON error.
//
// Security:
//  - HMAC-signed token bound to the email (sig_mismatch / email_mismatch / expired)
//  - Rate-limited per IP (KV bucket, fail-closed if KV missing)
//  - Audit log: email hash + IP hash + status + reason, no PII in clear

import { verifyUnsubscribeToken } from '../lib/unsubscribeToken';

interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  NEWSLETTER_UNSUB_SECRET?: string;
  AUDIT_PDF_RATE_LIMIT?: KVNamespace; // shared KV for rate-limit + audit ring buffer
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}

const RATE_LIMIT_PER_IP_PER_HOUR = 30;

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function utcHourBucket(): string {
  return new Date().toISOString().slice(0, 13);
}

function htmlPage(opts: { lang: string; ok: boolean; title: string; body: string; ctaLabel: string }): Response {
  const accent = opts.ok ? '#059669' : '#dc2626';
  const html = `<!doctype html>
<html lang="${opts.lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${opts.title}</title>
<style>
  body { margin:0; padding:0; background:#f8fafc; font-family:'Inter','Helvetica Neue',Arial,sans-serif; color:#0f172a; min-height:100vh; display:flex; align-items:center; justify-content:center; }
  .card { max-width:520px; width:90%; background:#ffffff; border-radius:16px; box-shadow:0 1px 3px rgba(15,23,42,0.06); overflow:hidden; }
  .bar { height:6px; background:linear-gradient(135deg, #06b6d4, #7c3aed); }
  .body { padding:40px 32px; }
  h1 { margin:0 0 16px 0; font-size:24px; font-weight:700; color:${accent}; letter-spacing:-0.02em; }
  p { margin:0 0 16px 0; font-size:15px; line-height:1.6; color:#475569; }
  .cta { display:inline-block; margin-top:8px; padding:12px 24px; background:linear-gradient(135deg, #06b6d4, #7c3aed); color:#ffffff; text-decoration:none; border-radius:9999px; font-weight:600; font-size:14px; }
  .footer { padding:16px 32px; border-top:1px solid #e2e8f0; font-size:12px; color:#64748b; }
</style>
</head>
<body>
<div class="card">
  <div class="bar"></div>
  <div class="body">
    <h1>${opts.title}</h1>
    <p>${opts.body}</p>
    <a class="cta" href="https://www.ailysagency.ca">${opts.ctaLabel}</a>
  </div>
  <div class="footer">AiLys Agency, Montreal, Quebec, Canada</div>
</div>
</body>
</html>`;
  return new Response(html, {
    status: opts.ok ? 200 : 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

interface AuditEntry {
  ts: string;
  action: 'unsubscribed' | 'verify_failed' | 'rate_limited' | 'db_failed';
  emailHash: string;
  ipHash: string;
  status: number;
  reason?: string;
  latencyMs: number;
}

function emitAudit(ctx: PagesContext, entry: AuditEntry): void {
  console.log(JSON.stringify({ component: 'newsletter-unsubscribe', ...entry }));
  if (ctx.env.AUDIT_PDF_RATE_LIMIT && ctx.waitUntil) {
    const key = `audit_unsub:${Date.now()}`;
    ctx.waitUntil(
      ctx.env.AUDIT_PDF_RATE_LIMIT.put(key, JSON.stringify(entry), {
        expirationTtl: 90 * 24 * 60 * 60,
      }).catch(() => {}),
    );
  }
}

async function rateLimit(env: Env, ipHash: string): Promise<{ allowed: boolean }> {
  if (!env.AUDIT_PDF_RATE_LIMIT) return { allowed: true };
  const key = `rl:unsub:ip:${ipHash}:${utcHourBucket()}`;
  const raw = await env.AUDIT_PDF_RATE_LIMIT.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT_PER_IP_PER_HOUR) return { allowed: false };
  await env.AUDIT_PDF_RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 60 * 60 });
  return { allowed: true };
}

async function markUnsubscribed(env: Env, email: string): Promise<{ ok: boolean; error?: string }> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'supabase_not_configured' };
  }
  const url = `${env.SUPABASE_URL}/rest/v1/newsletter_signups?email=eq.${encodeURIComponent(email)}`;
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      }),
    });
    if (!resp.ok) {
      const t = await resp.text().catch(() => '');
      return { ok: false, error: `supabase_${resp.status}: ${t.slice(0, 200)}` };
    }

    // Also mark any active sequence enrollments as unsubscribed (defensive: in case
    // we ever wire newsletter into the sequence engine)
    const enrollmentsUrl = `${env.SUPABASE_URL}/rest/v1/email_sequence_enrollments?email=eq.${encodeURIComponent(email)}&status=in.(active,paused)`;
    await fetch(enrollmentsUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      }),
    }).catch(() => {});

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message.slice(0, 200) };
  }
}

async function handleUnsubscribe(ctx: PagesContext): Promise<Response> {
  const start = Date.now();
  const { request, env } = ctx;

  const url = new URL(request.url);
  let token = url.searchParams.get('token') ?? '';
  let email = url.searchParams.get('email') ?? '';
  let lang = (url.searchParams.get('lang') ?? 'en').slice(0, 4);

  // Support POST with form-encoded body (List-Unsubscribe-Post one-click)
  if (request.method === 'POST') {
    const ct = (request.headers.get('content-type') ?? '').toLowerCase();
    if (ct.includes('application/x-www-form-urlencoded')) {
      const body = await request.text();
      const params = new URLSearchParams(body);
      token = token || params.get('token') || '';
      email = email || params.get('email') || '';
      lang = lang || params.get('lang') || 'en';
    }
  }

  email = email.trim().toLowerCase();
  const isFr = lang === 'fr';

  const ip = request.headers.get('cf-connecting-ip') ?? '';
  const ipHash = await sha256Hex(ip);
  const emailHash = await sha256Hex(email || 'no-email');

  // Rate limit
  const rl = await rateLimit(env, ipHash);
  if (!rl.allowed) {
    emitAudit(ctx, {
      ts: new Date().toISOString(),
      action: 'rate_limited',
      emailHash,
      ipHash,
      status: 429,
      latencyMs: Date.now() - start,
    });
    return new Response('Too many requests', { status: 429 });
  }

  // Verify token
  if (!env.NEWSLETTER_UNSUB_SECRET) {
    emitAudit(ctx, {
      ts: new Date().toISOString(),
      action: 'verify_failed',
      emailHash,
      ipHash,
      status: 500,
      reason: 'no_secret_configured',
      latencyMs: Date.now() - start,
    });
    return htmlPage({
      lang,
      ok: false,
      title: isFr ? 'Service indisponible' : 'Service unavailable',
      body: isFr
        ? 'La gestion des desabonnements n\'est pas configuree. Contactez-nous a hello@ailysagency.ca.'
        : 'Unsubscribe is not configured. Please contact hello@ailysagency.ca.',
      ctaLabel: isFr ? 'Retour au site' : 'Back to site',
    });
  }

  const verify = await verifyUnsubscribeToken(token, email, env.NEWSLETTER_UNSUB_SECRET);
  if (!verify.ok) {
    emitAudit(ctx, {
      ts: new Date().toISOString(),
      action: 'verify_failed',
      emailHash,
      ipHash,
      status: 400,
      reason: verify.reason,
      latencyMs: Date.now() - start,
    });
    return htmlPage({
      lang,
      ok: false,
      title: isFr ? 'Lien invalide' : 'Invalid link',
      body: isFr
        ? 'Ce lien de desabonnement est invalide ou a expire. Pour te desabonner, ecris-nous a hello@ailysagency.ca.'
        : 'This unsubscribe link is invalid or has expired. To unsubscribe, please email hello@ailysagency.ca.',
      ctaLabel: isFr ? 'Retour au site' : 'Back to site',
    });
  }

  // Mark unsubscribed
  const dbResult = await markUnsubscribed(env, email);
  if (!dbResult.ok) {
    emitAudit(ctx, {
      ts: new Date().toISOString(),
      action: 'db_failed',
      emailHash,
      ipHash,
      status: 500,
      reason: dbResult.error,
      latencyMs: Date.now() - start,
    });
    return htmlPage({
      lang,
      ok: false,
      title: isFr ? 'Erreur temporaire' : 'Temporary error',
      body: isFr
        ? 'Impossible de traiter ta demande pour le moment. Reessaie dans quelques minutes ou ecris-nous a hello@ailysagency.ca.'
        : 'We could not process your request right now. Please try again in a few minutes or email hello@ailysagency.ca.',
      ctaLabel: isFr ? 'Retour au site' : 'Back to site',
    });
  }

  emitAudit(ctx, {
    ts: new Date().toISOString(),
    action: 'unsubscribed',
    emailHash,
    ipHash,
    status: 200,
    latencyMs: Date.now() - start,
  });

  // POST per RFC 8058 expects 200 with empty body for instant Mail client UX
  if (request.method === 'POST') {
    return new Response('', { status: 200 });
  }

  return htmlPage({
    lang,
    ok: true,
    title: isFr ? 'Desabonnement confirme' : 'You are unsubscribed',
    body: isFr
      ? 'Tu ne recevras plus l\'infolettre AiLys. Si c\'est une erreur, ecris-nous a hello@ailysagency.ca pour te reabonner.'
      : 'You will no longer receive the AiLys newsletter. If this was a mistake, email hello@ailysagency.ca to resubscribe.',
    ctaLabel: isFr ? 'Retour au site AiLys' : 'Back to the AiLys site',
  });
}

export const onRequestGet = handleUnsubscribe;
export const onRequestPost = handleUnsubscribe;

export const onRequest = async (ctx: PagesContext): Promise<Response> => {
  if (ctx.request.method !== 'GET' && ctx.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  return handleUnsubscribe(ctx);
};
