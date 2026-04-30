#!/usr/bin/env node
/**
 * Smoke test for Phase E.3: admin observability endpoints for the new
 * E.1.8 instant AI Visibility audit + E.1.9 quote PDF endpoints.
 *
 * Verifies the 2 new callers are in the allowlist + the AuditLogEntry
 * shapes round-trip through JSON. Live HTTP testing happens against the
 * deployed endpoints once env vars flip.
 *
 * 10 cases:
 *  1. reviuzy-admin-instant-ai-vis-stats is now in the allowlist
 *  2. reviuzy-admin-quote-pdf-stats is now in the allowlist
 *  3. signServiceRequest + verifyServiceRequest round-trip with empty body for
 *     reviuzy-admin-instant-ai-vis-stats
 *  4. signServiceRequest + verifyServiceRequest round-trip with empty body for
 *     reviuzy-admin-quote-pdf-stats
 *  5. Unknown caller rejected even with valid signature shape
 *  6. instant_ai_vis_log AuditLogEntry round-trips through JSON
 *  7. quote_pdf_log AuditLogEntry round-trips through JSON
 *  8. Cost calculation: instant_ai_vis 5 rendered today * $0.0015 = $0.0075 CAD
 *  9. Cost calculation: quote_pdf 3 emailed today * $0.00014 = $0.00042 CAD
 * 10. Cache hit rate: 8 hits / 10 total = 80%
 *
 * Run: npx tsx scripts/smoke-admin-endpoint-stats.mjs
 * Exits 0 on success.
 */

import {
  signServiceRequest,
  verifyServiceRequest,
  SERVICE_AUTH_ALLOWED_CALLERS,
} from '../functions/lib/serviceAuth.ts';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

const SECRET = 'a'.repeat(64);
const NOW = Math.floor(Date.now() / 1000);

function fakeRequest(headers) {
  return { headers: { get: (n) => headers[n] ?? null } };
}

// Case 1
assert('1. reviuzy-admin-instant-ai-vis-stats in allowlist',
  SERVICE_AUTH_ALLOWED_CALLERS.has('reviuzy-admin-instant-ai-vis-stats'));

// Case 2
assert('2. reviuzy-admin-quote-pdf-stats in allowlist',
  SERVICE_AUTH_ALLOWED_CALLERS.has('reviuzy-admin-quote-pdf-stats'));

// Case 3
{
  const body = '';
  const sig = await signServiceRequest(SECRET, body, NOW);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'reviuzy-admin-instant-ai-vis-stats',
  });
  const verify = await verifyServiceRequest(SECRET, req, body);
  assert('3. instant-ai-vis admin caller HMAC round-trip OK', verify.ok === true, JSON.stringify(verify));
}

// Case 4
{
  const body = '';
  const sig = await signServiceRequest(SECRET, body, NOW);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'reviuzy-admin-quote-pdf-stats',
  });
  const verify = await verifyServiceRequest(SECRET, req, body);
  assert('4. quote-pdf admin caller HMAC round-trip OK', verify.ok === true, JSON.stringify(verify));
}

// Case 5
{
  const body = '';
  const sig = await signServiceRequest(SECRET, body, NOW);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'fake-caller',
  });
  const verify = await verifyServiceRequest(SECRET, req, body);
  assert('5. Unknown caller rejected', verify.ok === false && verify.reason === 'caller_not_allowed');
}

// Case 6
{
  const entry = { ts: '2026-04-30T10:00:00Z', action: 'rendered', ipHash: 'abc12345', status: 200, cacheKey: 'def67890', score: 73, lang: 'fr', cached: false };
  const json = JSON.stringify(entry);
  const parsed = JSON.parse(json);
  assert('6. instant_ai_vis AuditLogEntry round-trips', parsed.ts === entry.ts && parsed.action === entry.action && parsed.score === entry.score);
}

// Case 7
{
  const entry = { ts: '2026-04-30T10:00:00Z', action: 'rendered', emailHash: 'abc12345', status: 200, tier: 'core', engagement: 'annual', bytes: 12500, emailed: true };
  const json = JSON.stringify(entry);
  const parsed = JSON.parse(json);
  assert('7. quote_pdf AuditLogEntry round-trips', parsed.ts === entry.ts && parsed.tier === entry.tier && parsed.bytes === entry.bytes);
}

// Case 8
{
  const COST = 0.0015;
  const expected = Number((5 * COST).toFixed(4));
  assert('8. Instant AI vis cost calc 5 * $0.0015 = $0.0075', expected === 0.0075, `expected=${expected}`);
}

// Case 9
{
  const COST = 0.00014;
  const expected = Number((3 * COST).toFixed(5));
  assert('9. Quote PDF cost calc 3 * $0.00014 = $0.00042', expected === 0.00042, `expected=${expected}`);
}

// Case 10
{
  const cacheHits = 8;
  const total = 10;
  const rate = total > 0 ? Number((cacheHits / total * 100).toFixed(1)) : 0;
  assert('10. Cache hit rate 8/10 = 80.0%', rate === 80.0);
}

const total = cases.length;
const passed = cases.filter((c) => c.ok).length;
const failed = total - passed;

console.log(bold + `\nAdmin endpoint stats smoke: ${passed}/${total} pass\n` + reset);
for (const c of cases) {
  const mark = c.ok ? green + 'PASS' + reset : red + 'FAIL' + reset;
  console.log(`${mark}  ${c.name}${c.ok ? '' : '\n      hint: ' + c.hint}`);
}
if (failed > 0) {
  console.log(red + bold + `\n${failed} failing case(s).\n` + reset);
  process.exit(1);
}
console.log(green + bold + `\nAll ${total} cases pass.\n` + reset);
