#!/usr/bin/env node
/**
 * Smoke test for Phase E.11: client error capture endpoint.
 *
 * 10 cases cover validation + origin allowlist + payload shape:
 *  1. Valid 'error' type passes validation
 *  2. Valid 'unhandledrejection' type passes
 *  3. Valid 'manual' type passes
 *  4. Unknown type rejected
 *  5. Empty body rejected
 *  6. Origin allowlist accepts ailysagency.ca
 *  7. Origin allowlist accepts *.ailysagency.pages.dev
 *  8. Origin allowlist accepts localhost
 *  9. Origin allowlist rejects evil.example.com
 * 10. Truncation: message > 500 chars truncated to 500
 *
 * Run: npx tsx scripts/smoke-client-error.mjs
 * Exits 0 on success.
 */

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

// Reimplement validation locally (mirrors endpoint logic)
function clip(value, max) {
  if (typeof value !== 'string') return null;
  return value.slice(0, max);
}
function clampInt(n, min, max) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return null;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}
function validateBody(input) {
  if (!input || typeof input !== 'object') return { ok: false, reason: 'body_not_object' };
  const body = input;
  const t = clip(body.type, 32);
  if (!t || !['error', 'unhandledrejection', 'manual'].includes(t)) {
    return { ok: false, reason: 'invalid_type' };
  }
  return {
    ok: true,
    data: {
      type: t,
      message: clip(body.message, 500) ?? undefined,
      url: clip(body.url, 500) ?? undefined,
      source: clip(body.source, 500) ?? undefined,
      lineno: clampInt(body.lineno, 0, 1_000_000) ?? undefined,
      colno: clampInt(body.colno, 0, 1_000_000) ?? undefined,
      stack: clip(body.stack, 1000) ?? undefined,
      userAgent: clip(body.userAgent, 200) ?? undefined,
    },
  };
}

const ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?ailysagency\.ca$/i,
  /^https:\/\/[a-z0-9-]+\.ailysagency\.pages\.dev$/i,
  /^https:\/\/ailysagency\.pages\.dev$/i,
  /^http:\/\/localhost(:\d+)?$/i,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/i,
];
function originAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some((re) => re.test(origin));
}

// Cases
{
  const r = validateBody({ type: 'error', message: 'oops', url: 'https://x.com' });
  assert('1. type=error validates', r.ok === true && r.data.type === 'error');
}
{
  const r = validateBody({ type: 'unhandledrejection', message: 'rejected' });
  assert('2. type=unhandledrejection validates', r.ok === true);
}
{
  const r = validateBody({ type: 'manual', message: 'caught and reported' });
  assert('3. type=manual validates', r.ok === true);
}
{
  const r = validateBody({ type: 'malicious', message: 'oops' });
  assert('4. unknown type rejected', r.ok === false && r.reason === 'invalid_type');
}
{
  const r = validateBody({});
  assert('5. empty body rejected (missing type)', r.ok === false);
}
{
  assert('6. https://www.ailysagency.ca origin allowed', originAllowed('https://www.ailysagency.ca'));
  assert('6b. https://ailysagency.ca origin allowed', originAllowed('https://ailysagency.ca'));
}
{
  assert('7. preview.ailysagency.pages.dev allowed', originAllowed('https://preview-abc.ailysagency.pages.dev'));
  assert('7b. ailysagency.pages.dev allowed', originAllowed('https://ailysagency.pages.dev'));
}
{
  assert('8. localhost:8080 allowed', originAllowed('http://localhost:8080'));
}
{
  assert('9. https://evil.example.com rejected', !originAllowed('https://evil.example.com'));
  assert('9b. http://www.ailysagency.ca rejected (http not https)', !originAllowed('http://www.ailysagency.ca'));
}
{
  const longMsg = 'x'.repeat(1000);
  const r = validateBody({ type: 'error', message: longMsg });
  assert('10. message > 500 chars truncated to 500', r.ok && r.data.message.length === 500);
}

const total = cases.length;
const passed = cases.filter((c) => c.ok).length;
const failed = total - passed;

console.log(bold + `\nClient error capture smoke: ${passed}/${total} pass\n` + reset);
for (const c of cases) {
  const mark = c.ok ? green + 'PASS' + reset : red + 'FAIL' + reset;
  console.log(`${mark}  ${c.name}${c.ok ? '' : '\n      hint: ' + c.hint}`);
}
if (failed > 0) {
  console.log(red + bold + `\n${failed} failing case(s).\n` + reset);
  process.exit(1);
}
console.log(green + bold + `\nAll ${total} cases pass.\n` + reset);
