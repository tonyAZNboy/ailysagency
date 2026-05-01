// Cloudflare Pages Function · /api/newsletter-subscribe
//
// Captures newsletter signups with strict input validation, rate limiting via
// Cloudflare WAF rule (recommended: 3 req/min per IP), CSRF-light origin check,
// honeypot field, and disposable-email rejection.
//
// Long-term plan:
//   - Forward to Supabase `newsletter_subscribers` table (when AiLys Supabase ships)
//   - Trigger double opt-in email via Resend / Postmark
//   - Webhook to Buttondown / ConvertKit / native broadcast tool
// For now: log to a simple D1 or Supabase REST insert via service role.

import { renderEmail } from '../lib/emailTemplate';
import { signUnsubscribeToken } from '../lib/unsubscribeToken';
import { sendAndLog } from '../lib/emailLog';

interface Env {
  NEWSLETTER_DB?: { exec: (q: string) => Promise<unknown> };
  RESEND_API_KEY?: string;
  ALLOWED_ORIGINS?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  /** 64-char hex secret for signing one-click unsubscribe tokens. */
  NEWSLETTER_UNSUB_SECRET?: string;
}

const SITE_BASE_URL = 'https://www.ailysagency.ca';

async function enrollInWelcomeSequence(env: Env, email: string): Promise<void> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    // 1. Look up the newsletter_welcome sequence id
    const seqResp = await fetch(
      `${env.SUPABASE_URL}/rest/v1/email_sequences?slug=eq.newsletter_welcome&select=id,steps&limit=1`,
      {
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      },
    );
    if (!seqResp.ok) return;
    const rows = (await seqResp.json().catch(() => [])) as Array<{ id: string; steps: Array<{ delay_days: number }> }>;
    if (rows.length === 0) return;
    const seq = rows[0];
    // current_step starts at 1 because step 0 (welcome confirm) was just sent synchronously
    const firstFollowUp = seq.steps[0];
    if (!firstFollowUp) return;
    const nextSend = new Date(Date.now() + firstFollowUp.delay_days * 24 * 60 * 60 * 1000).toISOString();

    await fetch(
      `${env.SUPABASE_URL}/rest/v1/email_sequence_enrollments?on_conflict=email,sequence_id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify({
          email,
          sequence_id: seq.id,
          current_step: 1,
          status: 'active',
          next_send_at: nextSend,
          unsubscribed_at: null,
        }),
      },
    );
  } catch {
    // Best-effort enrollment; never blocks signup
  }
}

async function upsertSubscriber(env: Env, row: {
  email: string;
  source: string;
  language: string;
}): Promise<{ ok: boolean; reactivated?: boolean; error?: string }> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'supabase_not_configured' };
  }
  const url = `${env.SUPABASE_URL}/rest/v1/newsletter_signups?on_conflict=email`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify({
        email: row.email,
        source: row.source,
        language: row.language,
        status: 'active',
        unsubscribed_at: null,
      }),
    });
    if (!resp.ok) {
      const t = await resp.text().catch(() => '');
      return { ok: false, error: `supabase_${resp.status}: ${t.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message.slice(0, 200) };
  }
}

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "10minutemail.com",
  "trashmail.com",
  "fakeinbox.com",
  "getnada.com",
]);

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) return false;
  return true;
}

function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // server-to-server or no-cors curl is OK
  const allowed = (env.ALLOWED_ORIGINS ?? "https://www.ailysagency.ca,https://ailysagency.ca,https://ailysagency.pages.dev")
    .split(",")
    .map((s) => s.trim());
  return allowed.includes(origin) || origin.startsWith("http://localhost");
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!isAllowedOrigin(request, env)) {
    return Response.json({ error: "Origin not allowed" }, { status: 403 });
  }

  let body: { email?: string; honeypot?: string; source?: string; lang?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot field, bots fill this, humans don't
  if (body.honeypot && body.honeypot.length > 0) {
    // Pretend success so bots don't retry
    return Response.json({ success: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Please provide a valid, reachable email address." },
      { status: 400 },
    );
  }

  const source = (body.source ?? "unknown").trim().slice(0, 64);
  const lang = (body.lang ?? "en").trim().slice(0, 4);
  const subscribedAt = new Date().toISOString();

  const subscription = {
    email,
    source,
    lang,
    subscribed_at: subscribedAt,
    confirmed_at: null,
    user_agent: request.headers.get("user-agent") ?? "",
    ip_country: request.headers.get("cf-ipcountry") ?? "",
  };

  // 1. Persist (or reactivate) the subscriber in Supabase
  const upsertResult = await upsertSubscriber(env, { email, source, language: lang });
  if (!upsertResult.ok) {
    console.warn(`newsletter_upsert_failed: ${upsertResult.error}`);
    // Continue anyway - we don't want to lose the subscriber to a transient DB failure
  }

  // 1b. Enroll in newsletter_welcome sequence so the cron processor sends day-2 + day-5 follow-ups
  await enrollInWelcomeSequence(env, email);

  // 2. Sign a one-click unsubscribe token for the email footer + List-Unsubscribe header
  let unsubscribeUrl: string | undefined;
  if (env.NEWSLETTER_UNSUB_SECRET) {
    try {
      const token = await signUnsubscribeToken({ email, secret: env.NEWSLETTER_UNSUB_SECRET });
      unsubscribeUrl = `${SITE_BASE_URL}/api/newsletter-unsubscribe?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
    } catch (err) {
      console.warn(`unsub_token_failed: ${(err as Error).message}`);
    }
  }

  // 3. Send the confirmation email via Resend
  if (env.RESEND_API_KEY) {
    try {
      const isFr = lang === 'fr';
      const rendered = renderEmail({
        lang: isFr ? 'fr' : 'en',
        preheader: isFr
          ? 'Trois marques citees par ChatGPT, chaque semaine.'
          : 'Three brands cited by ChatGPT, every week.',
        title: isFr ? 'Bienvenue dans l\'infolettre AiLys' : 'Welcome to the AiLys newsletter',
        body: isFr
          ? [
              'Merci de t\'etre inscrit. Chaque semaine, on t\'envoie trois marques qui ont reussi a etre citees par ChatGPT, Perplexity ou Claude cette semaine, et la tactique exacte qui a fait la difference.',
              'Pas de bourrage de boite, pas de promo agressive. Juste des cas concrets que tu peux appliquer cette semaine.',
              'Si tu ne reconnais pas cette inscription, tu peux ignorer ce courriel sans rien faire.',
            ]
          : [
              'Thanks for signing up. Each week we send three brands that got cited by ChatGPT, Perplexity, or Claude this week, plus the exact tactic that made the difference.',
              'No inbox bloat, no aggressive sales. Just concrete cases you can apply this week.',
              'If you do not recognize this signup, you can ignore this message.',
            ],
        cta: {
          label: isFr ? 'Voir notre dernier audit AI' : 'See our latest AI audit',
          url: 'https://www.ailysagency.ca/audit',
        },
        unsubscribeUrl,
      });

      // Build List-Unsubscribe headers per RFC 8058 (Gmail / Yahoo bulk-sender requirement, 2024)
      const extraHeaders: Record<string, string> = {};
      if (unsubscribeUrl) {
        extraHeaders['List-Unsubscribe'] = `<${unsubscribeUrl}>, <mailto:hello@ailysagency.ca?subject=Unsubscribe>`;
        extraHeaders['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
      }

      const subject = isFr ? 'Bienvenue dans l\'infolettre AiLys' : 'Welcome to the AiLys newsletter';
      await sendAndLog(env, {
        from: 'AiLys Agency <hello@ailysagency.ca>',
        to: email,
        subject,
        html: rendered.html,
        text: rendered.text,
        headers: extraHeaders,
      }, {
        email,
        sequence_slug: 'newsletter_welcome',
        step: 0,
        subject,
      });
    } catch {
      // Don't fail the subscription if email delivery fails
    }
  }

  return Response.json({ success: true, ...subscription });
}

export async function onRequest(): Promise<Response> {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
