/**
 * Branded email template helper for AiLys Agency.
 *
 * Single source of truth for every customer-facing email sent via Resend.
 * Inline CSS only (max compatibility: Gmail, Apple Mail, Outlook 365, corporate Outlook).
 * Table-based layout for the outer wrapper. 600px max-width, centered.
 * Returns both `html` and `text` parts so Resend can deliver multipart-alternative
 * (preferred by ESPs and avoids spam folders).
 *
 * Branding: AiLys gradient (secondary cyan -> primary purple), Inter typography,
 * Quebec footer per CASL conformity.
 */

export type EmailLang = 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'ru';

export interface EmailRenderOptions {
  lang: EmailLang;
  /** Inbox preview line. Stays hidden in body but is read by clients for the snippet. */
  preheader: string;
  /** H1 heading inside the email body. */
  title: string;
  /** Paragraphs (plain strings, will be HTML-escaped). One paragraph per array entry. */
  body: string[];
  /** Optional primary CTA button. */
  cta?: {
    label: string;
    url: string;
  };
  /** Optional signature line above the footer. Defaults to "L'equipe AiLys" / "The AiLys team". */
  signature?: string;
  /** Optional unsubscribe URL. Adds an unsubscribe row in the footer (CASL requirement). */
  unsubscribeUrl?: string;
}

export interface RenderedEmail {
  html: string;
  text: string;
}

const BRAND = {
  primary: '#7c3aed', // purple
  secondary: '#06b6d4', // cyan
  text: '#0f172a',
  textMuted: '#475569',
  border: '#e2e8f0',
  bg: '#f8fafc',
  bodyBg: '#ffffff',
};

const DOMAIN = 'www.ailysagency.ca';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SIGNATURES: Record<EmailLang, string> = {
  en: 'The AiLys team',
  fr: "L'equipe AiLys",
  es: 'El equipo AiLys',
  zh: 'AiLys 团队',
  ar: 'فريق AiLys',
  ru: 'Команда AiLys',
};

interface FooterLabels {
  address: string;
  unsub: string;
  contact: string;
  website: string;
  tagline: string;
}

const FOOTER: Record<EmailLang, FooterLabels> = {
  en: {
    address: 'AiLys Agency, Montreal, Quebec, Canada',
    unsub: 'Unsubscribe',
    contact: 'Contact us',
    website: 'Website',
    tagline: 'AI search optimization. Made in Quebec.',
  },
  fr: {
    address: 'AiLys Agence, Montreal, Quebec, Canada',
    unsub: 'Se desabonner',
    contact: 'Nous ecrire',
    website: 'Site web',
    tagline: 'Optimisation pour la recherche IA. Fait au Quebec.',
  },
  es: {
    address: 'AiLys Agency, Montreal, Quebec, Canada',
    unsub: 'Cancelar suscripcion',
    contact: 'Escribenos',
    website: 'Sitio web',
    tagline: 'Optimizacion para busqueda con IA. Hecho en Quebec.',
  },
  zh: {
    address: 'AiLys Agency, Montreal, Quebec, Canada',
    unsub: '取消订阅',
    contact: '联系我们',
    website: '官网',
    tagline: 'AI 搜索优化。魁北克制造。',
  },
  ar: {
    address: 'AiLys Agency, Montreal, Quebec, Canada',
    unsub: 'الغاء الاشتراك',
    contact: 'تواصل معنا',
    website: 'الموقع',
    tagline: 'تحسين البحث بالذكاء الاصطناعي. صنع في كيبيك.',
  },
  ru: {
    address: 'AiLys Agency, Montreal, Quebec, Canada',
    unsub: 'Отписаться',
    contact: 'Написать нам',
    website: 'Сайт',
    tagline: 'Оптимизация под AI-поиск. Сделано в Квебеке.',
  },
};

function defaultSignature(lang: EmailLang): string {
  return SIGNATURES[lang] ?? SIGNATURES.en;
}

function footerLabels(lang: EmailLang): FooterLabels {
  return FOOTER[lang] ?? FOOTER.en;
}

export function renderEmail(opts: EmailRenderOptions): RenderedEmail {
  const { lang, preheader, title, body, cta, signature, unsubscribeUrl } = opts;
  const sig = signature ?? defaultSignature(lang);
  const labels = footerLabels(lang);

  // ── HTML version ──────────────────────────────────────────────────────────
  const bodyParagraphsHtml = body
    .map(
      (p) =>
        `<p style="margin:0 0 16px 0; font-size:16px; line-height:1.6; color:${BRAND.text};">${escapeHtml(p)}</p>`,
    )
    .join('\n');

  const ctaHtml = cta
    ? `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
          <tr>
            <td align="left" bgcolor="${BRAND.primary}" style="border-radius:9999px; background:linear-gradient(135deg, ${BRAND.secondary}, ${BRAND.primary});">
              <a href="${escapeHtml(cta.url)}" target="_blank" style="display:inline-block; padding:14px 28px; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:9999px;">${escapeHtml(cta.label)}</a>
            </td>
          </tr>
        </table>`
    : '';

  const unsubHtml = unsubscribeUrl
    ? ` &middot; <a href="${escapeHtml(unsubscribeUrl)}" style="color:${BRAND.textMuted}; text-decoration:underline;">${labels.unsub}</a>`
    : '';

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const html = `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:'Inter','Helvetica Neue',Arial,sans-serif; color:${BRAND.text};">
<div style="display:none; visibility:hidden; opacity:0; max-height:0; overflow:hidden; mso-hide:all;">${escapeHtml(preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.bg};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; width:100%; background-color:${BRAND.bodyBg}; border-radius:16px; box-shadow:0 1px 3px rgba(15,23,42,0.06); overflow:hidden;">
        <tr>
          <td style="height:6px; background:linear-gradient(135deg, ${BRAND.secondary}, ${BRAND.primary});">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:32px 40px 8px 40px;">
            <a href="https://${DOMAIN}" target="_blank" style="text-decoration:none; color:${BRAND.text};">
              <span style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:22px; font-weight:700; letter-spacing:-0.02em;">Ai<span style="color:${BRAND.secondary};">L</span><span style="color:${BRAND.primary};">y</span>s</span>
              <span style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px; font-weight:500; color:${BRAND.textMuted}; letter-spacing:0.18em; text-transform:uppercase; margin-left:8px;">${lang === 'fr' ? 'Agence' : 'Agency'}</span>
              ${lang === 'ar' ? '' : ''}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px 8px 40px;">
            <h1 style="margin:0 0 24px 0; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:26px; line-height:1.25; font-weight:700; color:${BRAND.text}; letter-spacing:-0.02em;">${escapeHtml(title)}</h1>
            ${bodyParagraphsHtml}
            ${ctaHtml}
            <p style="margin:24px 0 0 0; font-size:15px; line-height:1.6; color:${BRAND.text};">${escapeHtml(sig)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px 8px 40px;">
            <hr style="border:none; border-top:1px solid ${BRAND.border}; margin:0;" />
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px 32px 40px;">
            <p style="margin:0 0 8px 0; font-size:12px; line-height:1.5; color:${BRAND.textMuted};">${escapeHtml(labels.tagline)}</p>
            <p style="margin:0 0 8px 0; font-size:12px; line-height:1.5; color:${BRAND.textMuted};">${escapeHtml(labels.address)}</p>
            <p style="margin:0; font-size:12px; line-height:1.5; color:${BRAND.textMuted};">
              <a href="https://${DOMAIN}" style="color:${BRAND.textMuted}; text-decoration:underline;">${labels.website}</a>
              &middot;
              <a href="mailto:hello@ailysagency.ca" style="color:${BRAND.textMuted}; text-decoration:underline;">${labels.contact}</a>${unsubHtml}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  // ── Plain text version ────────────────────────────────────────────────────
  const textLines: string[] = [];
  textLines.push(title);
  textLines.push('');
  for (const p of body) textLines.push(p);
  if (cta) {
    textLines.push('');
    textLines.push(`${cta.label}: ${cta.url}`);
  }
  textLines.push('');
  textLines.push(sig);
  textLines.push('');
  textLines.push('---');
  textLines.push(labels.tagline);
  textLines.push(labels.address);
  textLines.push(`https://${DOMAIN}  |  hello@ailysagency.ca`);
  if (unsubscribeUrl) textLines.push(`${labels.unsub}: ${unsubscribeUrl}`);
  const text = textLines.join('\n');

  return { html, text };
}
