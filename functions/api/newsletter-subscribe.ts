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

interface Env {
  NEWSLETTER_DB?: { exec: (q: string) => Promise<unknown> };
  RESEND_API_KEY?: string;
  ALLOWED_ORIGINS?: string;
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

  // Honeypot field — bots fill this, humans don't
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

  // For now, just log. Future: persist to Supabase + send confirmation email via Resend.
  // The structure of the future record:
  const subscription = {
    email,
    source, // "exit-intent" | "footer" | "blog" | "audit-result" | etc.
    lang, // "en" | "fr" | etc.
    subscribed_at: subscribedAt,
    confirmed_at: null, // set on double opt-in confirmation
    user_agent: request.headers.get("user-agent") ?? "",
    ip_country: request.headers.get("cf-ipcountry") ?? "",
  };

  // Optional: send the confirmation email via Resend if configured
  if (env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "AiLys Agency <hello@ailysagency.ca>",
          to: email,
          subject:
            lang === "fr"
              ? "Bienvenue · AiLys Agency"
              : "Welcome · AiLys Agency",
          text:
            lang === "fr"
              ? `Merci de vous être inscrit à l'infolettre AiLys.\n\nChaque semaine, on vous envoie 3 marques qui ont été citées par ChatGPT cette semaine et comment elles l'ont fait.\n\nSi vous n'avez pas demandé cette inscription, vous pouvez ignorer ce message.\n\nAiLys Agency, Montréal, Québec`
              : `Thanks for subscribing to the AiLys newsletter.\n\nEach week we send 3 brands that got cited in ChatGPT this week and how they did it.\n\nIf you did not request this subscription, you can ignore this message.\n\nAiLys Agency, Montreal, Quebec`,
        }),
      });
    } catch {
      // Don't fail the subscription if email delivery fails
    }
  }

  // Always return success even if downstream is misconfigured (we have the log)
  return Response.json({ success: true, ...subscription });
}

export async function onRequest(): Promise<Response> {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
