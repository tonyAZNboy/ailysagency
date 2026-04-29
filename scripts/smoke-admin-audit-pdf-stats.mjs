#!/usr/bin/env node
/**
 * Smoke test for Phase B.4.4: admin audit-pdf observability stats endpoint.
 *
 * Exercises (12 cases):
 *   1. signServiceRequest + verifyServiceRequest round-trip with empty body
 *   2. verifyServiceRequest rejects missing headers
 *   3. verifyServiceRequest rejects unknown caller
 *   4. verifyServiceRequest rejects skewed timestamp (past)
 *   5. verifyServiceRequest rejects skewed timestamp (future)
 *   6. verifyServiceRequest rejects tampered token
 *   7. verifyServiceRequest rejects when secret is missing
 *   8. verifyServiceRequest rejects empty caller header
 *   9. verifyServiceRequest rejects non-numeric timestamp
 *  10. verifyServiceRequest rejects sig mismatch when caller signs different body
 *  11. reviuzy-admin-audit-pdf-stats is now in the allowlist
 *  12. AuditLogEntry round-trips through JSON.stringify+parse cleanly
 *      (the shape that audit-pdf writes to KV is what stats reads back)
 *
 * Run: `npx tsx scripts/smoke-admin-audit-pdf-stats.mjs`
 * Exits 0 on success, 1 on any case failure.
 */

import {
  signServiceRequest,
  verifyServiceRequest,
  SERVICE_AUTH_REPLAY_WINDOW_SECONDS,
  SERVICE_AUTH_ALLOWED_CALLERS,
} from '../functions/lib/serviceAuth.ts';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

const SECRET = 'a'.repeat(64);
const CALLER = 'reviuzy-admin-audit-pdf-stats';
const NOW = Math.floor(Date.now() / 1000);
const EMPTY_BODY = '';

function makeRequest(headers) {
  return new Request('https://www.ailysagency.ca/api/admin/audit-pdf-stats', {
    method: 'GET',
    headers,
  });
}

// 1. Happy path: round-trip
{
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, NOW);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('1. valid HMAC + empty body round-trips', res.ok === true && res.caller === CALLER, JSON.stringify(res));
}

// 2. Missing headers
{
  const req = makeRequest({});
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('2. missing headers rejected', res.ok === false && res.reason === 'missing_headers', JSON.stringify(res));
}

// 3. Unknown caller
{
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, NOW);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'unknown-rogue-caller',
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('3. unknown caller rejected', res.ok === false && res.reason === 'caller_not_allowed', JSON.stringify(res));
}

// 4. Skewed timestamp (past)
{
  const past = NOW - SERVICE_AUTH_REPLAY_WINDOW_SECONDS - 60;
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, past);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(past),
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('4. skewed timestamp (past) rejected', res.ok === false && res.reason === 'timestamp_skewed', JSON.stringify(res));
}

// 5. Skewed timestamp (future)
{
  const future = NOW + SERVICE_AUTH_REPLAY_WINDOW_SECONDS + 60;
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, future);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(future),
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('5. skewed timestamp (future) rejected', res.ok === false && res.reason === 'timestamp_skewed', JSON.stringify(res));
}

// 6. Tampered token
{
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, NOW);
  const tampered = sig.slice(0, -2) + (sig.endsWith('00') ? 'ff' : '00');
  const req = makeRequest({
    'X-AiLys-Service-Token': tampered,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('6. tampered token rejected', res.ok === false && res.reason === 'sig_mismatch', JSON.stringify(res));
}

// 7. Missing secret
{
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, NOW);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(undefined, req, EMPTY_BODY, NOW);
  assert('7. missing secret rejected', res.ok === false && res.reason === 'no_secret', JSON.stringify(res));
}

// 8. Empty caller header
{
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, NOW);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': '',
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('8. empty caller header rejected', res.ok === false && res.reason === 'missing_headers', JSON.stringify(res));
}

// 9. Non-numeric timestamp
{
  const sig = await signServiceRequest(SECRET, EMPTY_BODY, NOW);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': 'not-a-number',
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('9. non-numeric timestamp rejected', res.ok === false && res.reason === 'timestamp_invalid', JSON.stringify(res));
}

// 10. Body mismatch (caller signed different body than what we verify against)
{
  const sig = await signServiceRequest(SECRET, 'some-other-body', NOW);
  const req = makeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': CALLER,
  });
  const res = await verifyServiceRequest(SECRET, req, EMPTY_BODY, NOW);
  assert('10. body-tamper sig mismatch rejected', res.ok === false && res.reason === 'sig_mismatch', JSON.stringify(res));
}

// 11. Caller is on the allowlist
{
  assert('11. reviuzy-admin-audit-pdf-stats in ALLOWED_CALLERS', SERVICE_AUTH_ALLOWED_CALLERS.has(CALLER), `set: ${[...SERVICE_AUTH_ALLOWED_CALLERS].join(',')}`);
}

// 12. AuditLogEntry round-trips through KV's JSON.stringify+parse
{
  const entry = {
    ts: '2026-04-29T12:00:00.000Z',
    action: 'success',
    actorHash: 'a'.repeat(64),
    ipHash: 'b'.repeat(64),
    status: 200,
    payloadHash: 'c'.repeat(64),
    latencyMs: 287,
  };
  const serialized = JSON.stringify(entry);
  const parsed = JSON.parse(serialized);
  const ok = parsed.ts === entry.ts
    && parsed.action === entry.action
    && parsed.actorHash === entry.actorHash
    && parsed.ipHash === entry.ipHash
    && parsed.status === entry.status
    && parsed.payloadHash === entry.payloadHash
    && parsed.latencyMs === entry.latencyMs
    && typeof parsed.actorHash === 'string'
    && parsed.actorHash.length === 64; // SHA-256 hex
  assert('12. AuditLogEntry round-trips with hashes intact', ok, `got: ${JSON.stringify(parsed)}`);
}

let pass = 0, fail = 0;
for (const c of cases) {
  if (c.ok) {
    pass++;
    console.log(`  ${green}✓${reset} ${c.name}`);
  } else {
    fail++;
    console.log(`  ${red}✗${reset} ${c.name}${c.hint ? ` ${red}(${c.hint})${reset}` : ''}`);
  }
}
console.log('');
if (fail > 0) {
  console.log(`${bold}${red}${fail} fail${reset}, ${pass} pass`);
  process.exit(1);
}
console.log(`${bold}${green}${pass}/${pass} pass${reset}`);
