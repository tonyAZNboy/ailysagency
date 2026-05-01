#!/usr/bin/env node
/**
 * Smoke test for the Resend webhook Svix HMAC verifier.
 *
 * Run: `npx tsx scripts/smoke-resend-webhook.mjs`
 * Exits 0 if all assertions pass.
 */
import { verifySvixSignature } from '../functions/lib/svixHmac.ts';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

// Build a real signed payload to round-trip
const SECRET_RAW_BYTES = new Uint8Array(32);
for (let i = 0; i < 32; i++) SECRET_RAW_BYTES[i] = i;
const SECRET_B64 = btoa(String.fromCharCode(...SECRET_RAW_BYTES));
const SECRET = `whsec_${SECRET_B64}`;

const NOW = Math.floor(Date.now() / 1000);
const SVIX_ID = 'msg_2abcdef0123456789';
const BODY = JSON.stringify({ type: 'email.delivered', data: { email_id: 'e_xyz' } });

async function sign(svixId, ts, body) {
  const key = await crypto.subtle.importKey(
    'raw',
    SECRET_RAW_BYTES,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const msg = new TextEncoder().encode(`${svixId}.${ts}.${body}`);
  const sigBytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, msg));
  let s = '';
  for (let i = 0; i < sigBytes.length; i++) s += String.fromCharCode(sigBytes[i]);
  return `v1,${btoa(s)}`;
}

// 1. Valid signature passes
{
  const sig = await sign(SVIX_ID, NOW, BODY);
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(NOW), sig, BODY, NOW);
  assert('valid svix signature passes', r.ok === true, JSON.stringify(r));
}

// 2. Missing headers fail
{
  const r1 = await verifySvixSignature(SECRET, null, String(NOW), 'v1,xxx', BODY, NOW);
  assert('missing svix-id rejected', r1.ok === false && r1.reason === 'missing_headers');
  const r2 = await verifySvixSignature(SECRET, SVIX_ID, null, 'v1,xxx', BODY, NOW);
  assert('missing svix-timestamp rejected', r2.ok === false && r2.reason === 'missing_headers');
  const r3 = await verifySvixSignature(SECRET, SVIX_ID, String(NOW), null, BODY, NOW);
  assert('missing svix-signature rejected', r3.ok === false && r3.reason === 'missing_headers');
  const r4 = await verifySvixSignature(undefined, SVIX_ID, String(NOW), 'v1,xxx', BODY, NOW);
  assert('missing secret rejected', r4.ok === false && r4.reason === 'missing_headers');
}

// 3. Malformed secret fails
{
  const sig = await sign(SVIX_ID, NOW, BODY);
  const r = await verifySvixSignature('not_whsec_prefix', SVIX_ID, String(NOW), sig, BODY, NOW);
  assert('secret without whsec_ prefix rejected', r.ok === false && r.reason === 'malformed_secret');
}

// 4. Tampered body fails
{
  const sig = await sign(SVIX_ID, NOW, BODY);
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(NOW), sig, BODY + 'x', NOW);
  assert('tampered body fails', r.ok === false && r.reason === 'sig_mismatch');
}

// 5. Wrong svix-id fails
{
  const sig = await sign(SVIX_ID, NOW, BODY);
  const r = await verifySvixSignature(SECRET, 'msg_other', String(NOW), sig, BODY, NOW);
  assert('wrong svix-id fails', r.ok === false && r.reason === 'sig_mismatch');
}

// 6. Old timestamp (>5min) rejected
{
  const oldTs = NOW - 6 * 60;
  const sig = await sign(SVIX_ID, oldTs, BODY);
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(oldTs), sig, BODY, NOW);
  assert('timestamp older than 5min rejected', r.ok === false && r.reason === 'timestamp_outside_tolerance');
}

// 7. Future timestamp (>5min) rejected
{
  const futureTs = NOW + 6 * 60;
  const sig = await sign(SVIX_ID, futureTs, BODY);
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(futureTs), sig, BODY, NOW);
  assert('timestamp >5min in future rejected', r.ok === false && r.reason === 'timestamp_outside_tolerance');
}

// 8. Non-numeric timestamp fails
{
  const sig = await sign(SVIX_ID, NOW, BODY);
  const r = await verifySvixSignature(SECRET, SVIX_ID, 'not-a-number', sig, BODY, NOW);
  assert('non-numeric timestamp rejected', r.ok === false && r.reason === 'timestamp_outside_tolerance');
}

// 9. Multiple signatures in header (rotation) : second one valid
{
  const validSig = await sign(SVIX_ID, NOW, BODY);
  const composite = `v1,fakesigfakesigfakesig== ${validSig}`;
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(NOW), composite, BODY, NOW);
  assert('one valid sig among rotated set passes', r.ok === true);
}

// 10. Header with no v1 entries fails
{
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(NOW), 'v2,abc v3,def', BODY, NOW);
  assert('header with no v1 entries rejected', r.ok === false && r.reason === 'malformed_signature');
}

// 11. Wrong secret fails sig comparison
{
  const sig = await sign(SVIX_ID, NOW, BODY);
  const otherSecretBytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) otherSecretBytes[i] = i + 1;
  const otherSecret = `whsec_${btoa(String.fromCharCode(...otherSecretBytes))}`;
  const r = await verifySvixSignature(otherSecret, SVIX_ID, String(NOW), sig, BODY, NOW);
  assert('wrong secret fails', r.ok === false && r.reason === 'sig_mismatch');
}

// 12. Edge: timestamp exactly at +/- 5min boundary passes
{
  const edgeTs = NOW - 5 * 60;
  const sig = await sign(SVIX_ID, edgeTs, BODY);
  const r = await verifySvixSignature(SECRET, SVIX_ID, String(edgeTs), sig, BODY, NOW);
  assert('timestamp exactly at -5min boundary passes', r.ok === true, JSON.stringify(r));
}

// Report
console.log(`${bold}smoke-resend-webhook${reset}`);
let failures = 0;
for (const c of cases) {
  if (c.ok) console.log(`  ${green}✓${reset} ${c.name}`);
  else { failures++; console.log(`  ${red}✗${reset} ${c.name} ${c.hint ? '- ' + c.hint : ''}`); }
}
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`);
  process.exit(0);
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`);
  process.exit(1);
}
