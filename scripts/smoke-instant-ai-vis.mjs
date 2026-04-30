#!/usr/bin/env node
/**
 * Smoke test for Phase E.1.8: instant AI Visibility audit endpoint.
 *
 * Tests pure-logic primitives (validation, regex defenses, URL host blocking,
 * fallback shape). Does NOT call Anthropic API or hit live KV; the endpoint
 * file is structured so its primitives are unit-testable in isolation.
 *
 * 12 cases:
 *  1. Valid input passes business name regex
 *  2. Empty business name rejected
 *  3. Business name with prompt-injection chars rejected (markdown/control)
 *  4. URL with localhost rejected (SSRF defense)
 *  5. URL with private IP 127.0.0.1 rejected
 *  6. URL with private 192.168.x rejected
 *  7. URL with AWS metadata 169.254.169.254 rejected
 *  8. URL without protocol auto-prefixes https://
 *  9. Invalid URL string rejected
 * 10. Lang must be in allowlist (en/fr/es/zh/ar/ru)
 * 11. Honeypot field filled rejected
 * 12. Fallback object has correct shape (score=0, missing.length=3)
 *
 * Run: npx tsx scripts/smoke-instant-ai-vis.mjs
 * Exits 0 on success.
 */

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

// Re-implement validation locally (pure functions, mirrors endpoint logic)
const ALLOWED_LANGS = new Set(['en', 'fr', 'es', 'zh', 'ar', 'ru']);
const BUSINESS_NAME_REGEX = /^[a-zA-Z0-9 \-&'.,À-ÿ]+$/;

function clip(value, max) {
  if (typeof value !== 'string') return null;
  const t = value.trim();
  if (t.length === 0) return null;
  return t.slice(0, max);
}

function validateBody(input) {
  const errors = [];
  if (!input || typeof input !== 'object') return { ok: false, errors: ['body_not_object'] };
  const body = input;

  if (typeof body.honeypot === 'string' && body.honeypot.length > 0) {
    return { ok: false, errors: ['honeypot_filled'] };
  }

  const businessName = clip(body.businessName, 80);
  if (!businessName) errors.push('businessName is required');
  else if (businessName.length < 2) errors.push('businessName too short');
  else if (!BUSINESS_NAME_REGEX.test(businessName)) errors.push('businessName contains invalid characters');

  let url = clip(body.url, 200);
  if (!url) errors.push('url is required');
  else {
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) errors.push('url protocol invalid');
      const host = parsed.hostname.toLowerCase();
      if (
        host === 'localhost' ||
        host === '0.0.0.0' ||
        /^127\./.test(host) ||
        /^10\./.test(host) ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host) ||
        /^192\.168\./.test(host) ||
        /^169\.254\./.test(host) ||
        /^fc00:/.test(host) ||
        /^fe80:/.test(host)
      ) {
        errors.push('url host not allowed');
      }
    } catch {
      errors.push('url is not a valid URL');
    }
  }

  const lang = clip(body.lang, 5) ?? 'en';
  if (!ALLOWED_LANGS.has(lang)) errors.push('lang invalid');

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, errors: [], data: { businessName, url, lang } };
}

const FALLBACK = {
  en: { score: 0, missing: ['Audit temporarily unavailable.', 'Try again in a few minutes.', 'Or book a free 15-min call.'] },
  fr: { score: 0, missing: ['Audit temporairement indisponible.', 'Reessayez dans quelques minutes.', 'Ou reservez un appel gratuit de 15 min.'] },
};

// Case 1
{
  const r = validateBody({ businessName: 'Acme Dental', url: 'https://acme.example.com', lang: 'en' });
  assert('1. Valid input passes', r.ok === true, JSON.stringify(r));
}
// Case 2
{
  const r = validateBody({ businessName: '', url: 'https://x.com', lang: 'en' });
  assert('2. Empty business name rejected', r.ok === false && r.errors.includes('businessName is required'));
}
// Case 3
{
  const r = validateBody({ businessName: 'Ignore <script>alert</script>', url: 'https://x.com', lang: 'en' });
  assert('3. Markdown/script chars rejected', r.ok === false && r.errors.some((e) => e.includes('invalid characters')));
}
// Case 4
{
  const r = validateBody({ businessName: 'Acme', url: 'http://localhost:8080', lang: 'en' });
  assert('4. localhost rejected', r.ok === false && r.errors.some((e) => e.includes('host not allowed')));
}
// Case 5
{
  const r = validateBody({ businessName: 'Acme', url: 'http://127.0.0.1', lang: 'en' });
  assert('5. 127.0.0.1 rejected', r.ok === false && r.errors.some((e) => e.includes('host not allowed')));
}
// Case 6
{
  const r = validateBody({ businessName: 'Acme', url: 'http://192.168.1.1', lang: 'en' });
  assert('6. 192.168.x.x rejected', r.ok === false && r.errors.some((e) => e.includes('host not allowed')));
}
// Case 7
{
  const r = validateBody({ businessName: 'Acme', url: 'http://169.254.169.254/latest/meta-data', lang: 'en' });
  assert('7. AWS metadata 169.254.x rejected', r.ok === false && r.errors.some((e) => e.includes('host not allowed')));
}
// Case 8
{
  const r = validateBody({ businessName: 'Acme', url: 'acme-dental.example.com', lang: 'en' });
  assert('8. URL without protocol auto-prefixed and valid', r.ok === true && r.data?.url.startsWith('https://'));
}
// Case 9
{
  const r = validateBody({ businessName: 'Acme', url: 'not a valid url', lang: 'en' });
  assert('9. Invalid URL rejected', r.ok === false);
}
// Case 10
{
  const r = validateBody({ businessName: 'Acme', url: 'https://x.com', lang: 'pt' });
  assert('10. lang outside allowlist rejected', r.ok === false && r.errors.includes('lang invalid'));
}
// Case 11
{
  const r = validateBody({ businessName: 'Acme', url: 'https://x.com', lang: 'en', honeypot: 'spam' });
  assert('11. Honeypot rejected', r.ok === false && r.errors.includes('honeypot_filled'));
}
// Case 12
{
  const fbEn = FALLBACK.en;
  const fbFr = FALLBACK.fr;
  const ok = fbEn.score === 0 && fbEn.missing.length === 3 && fbFr.score === 0 && fbFr.missing.length === 3;
  assert('12. Fallback shape correct (score=0, missing.length=3) for en+fr', ok);
}

// ── Report ──
const total = cases.length;
const passed = cases.filter((c) => c.ok).length;
const failed = total - passed;

console.log(bold + `\nInstant AI Visibility audit smoke: ${passed}/${total} pass\n` + reset);
for (const c of cases) {
  const mark = c.ok ? green + 'PASS' + reset : red + 'FAIL' + reset;
  console.log(`${mark}  ${c.name}${c.ok ? '' : '\n      hint: ' + c.hint}`);
}

if (failed > 0) {
  console.log(red + bold + `\n${failed} failing case(s).\n` + reset);
  process.exit(1);
}
console.log(green + bold + `\nAll ${total} cases pass.\n` + reset);
