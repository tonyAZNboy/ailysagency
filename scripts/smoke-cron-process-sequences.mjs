#!/usr/bin/env node
/**
 * Smoke test for /api/cron-process-sequences against staging.
 * This hits the live deployed endpoint with a DRY_RUN payload via service auth,
 * to validate the full request path (HMAC sign + verify, Supabase fetch,
 * response shape).
 *
 * Run: AILYS_SERVICE_SHARED_SECRET=hex64 npx tsx scripts/smoke-cron-process-sequences.mjs
 */

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

const SECRET = process.env.AILYS_SERVICE_SHARED_SECRET;
const ENDPOINT = process.env.CRON_ENDPOINT ?? 'https://www.ailysagency.ca/api/cron-process-sequences';

if (!SECRET) {
  console.log(`${red}AILYS_SERVICE_SHARED_SECRET env var not set; running token format checks only.${reset}`);
}

// Build a valid HMAC-signed POST request body
async function sha256Hex(input) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function importHmacKey(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return crypto.subtle.importKey('raw', bytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
}

async function signServiceRequest(secret, body, ts) {
  const bodyHash = await sha256Hex(body);
  const message = `${ts}|${bodyHash}`;
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function callCron({ body, secret, caller = 'ailys-cron-process-sequences' }) {
  const ts = Math.floor(Date.now() / 1000);
  const sig = secret ? await signServiceRequest(secret, body, ts) : 'invalid';
  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AiLys-Service-Token': sig,
      'X-AiLys-Service-Timestamp': String(ts),
      'X-AiLys-Service-Caller': caller,
    },
    body,
  });
  return { status: resp.status, json: await resp.json().catch(() => ({})) };
}

// 1. Without secret: 401
{
  const { status } = await callCron({ body: '{}', secret: null });
  assert('no signature -> 401', status === 401, `got ${status}`);
}

// 2. Wrong caller: 401
if (SECRET) {
  const { status, json } = await callCron({ body: '{}', secret: SECRET, caller: 'unknown-caller' });
  assert('wrong caller -> 401', status === 401, `got ${status}, body=${JSON.stringify(json)}`);
}

// 3. Wrong method (GET): 405
{
  const resp = await fetch(ENDPOINT, { method: 'GET' });
  assert('GET method -> 405', resp.status === 405, `got ${resp.status}`);
}

// 4. Valid signed dry_run: 200
if (SECRET) {
  const { status, json } = await callCron({ body: JSON.stringify({ dry_run: true }), secret: SECRET });
  assert('dry_run signed -> 200', status === 200, `got ${status}, body=${JSON.stringify(json)}`);
  assert('dry_run flag in response', json.dry_run === true, JSON.stringify(json));
  assert('processed field present', typeof json.processed === 'number', JSON.stringify(json));
}

// Report
console.log(`${bold}smoke-cron-process-sequences${reset}`);
let failures = 0;
for (const c of cases) {
  if (c.ok) console.log(`  ${green}OK${reset} ${c.name}`);
  else { failures++; console.log(`  ${red}FAIL${reset} ${c.name} ${c.hint ? '. ' + c.hint : ''}`); }
}
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`);
  process.exit(0);
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`);
  process.exit(1);
}
