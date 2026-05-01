#!/usr/bin/env node
/**
 * Smoke test for newsletter unsubscribe HMAC token sign/verify.
 *
 * Run: `npx tsx scripts/smoke-newsletter-unsubscribe.mjs`
 * Exits 0 if all assertions pass.
 */
import { signUnsubscribeToken, verifyUnsubscribeToken } from '../functions/lib/unsubscribeToken.ts';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

const SECRET = 'a'.repeat(64); // 32 bytes hex
const SECRET_OTHER = 'b'.repeat(64);
const EMAIL = 'subscriber@example.ca';
const NOW = Math.floor(Date.now() / 1000);

// 1. Round-trip valid signature
{
  const token = await signUnsubscribeToken({ email: EMAIL, secret: SECRET });
  assert('token has 3 dot-separated parts', token.split('.').length === 3, `got "${token}"`);
  const r = await verifyUnsubscribeToken(token, EMAIL, SECRET, NOW);
  assert('valid token verifies ok', r.ok === true, JSON.stringify(r));
}

// 2. Token bound to email : different email rejected
{
  const token = await signUnsubscribeToken({ email: EMAIL, secret: SECRET });
  const r = await verifyUnsubscribeToken(token, 'other@example.ca', SECRET, NOW);
  assert('different email rejected with email_mismatch', r.ok === false && r.reason === 'email_mismatch', JSON.stringify(r));
}

// 3. Wrong secret rejected
{
  const token = await signUnsubscribeToken({ email: EMAIL, secret: SECRET });
  const r = await verifyUnsubscribeToken(token, EMAIL, SECRET_OTHER, NOW);
  // emailHashLow uses the secret too, so this fails as email_mismatch first
  assert('wrong secret rejected', r.ok === false && (r.reason === 'sig_mismatch' || r.reason === 'email_mismatch'), JSON.stringify(r));
}

// 4. Expired token rejected
{
  const token = await signUnsubscribeToken({
    email: EMAIL,
    secret: SECRET,
    expUnixSeconds: NOW - 60,
  });
  const r = await verifyUnsubscribeToken(token, EMAIL, SECRET, NOW);
  assert('expired token rejected', r.ok === false && r.reason === 'expired', JSON.stringify(r));
}

// 5. Tampered signature rejected
{
  const token = await signUnsubscribeToken({ email: EMAIL, secret: SECRET });
  const tampered = token.slice(0, -2) + (token.slice(-2) === '00' ? 'ff' : '00');
  const r = await verifyUnsubscribeToken(tampered, EMAIL, SECRET, NOW);
  assert('tampered token rejected', r.ok === false && r.reason === 'sig_mismatch', JSON.stringify(r));
}

// 6. Tampered exp rejected (signature no longer matches)
{
  const token = await signUnsubscribeToken({ email: EMAIL, secret: SECRET });
  const parts = token.split('.');
  parts[1] = String(parseInt(parts[1], 10) + 1);
  const tampered = parts.join('.');
  const r = await verifyUnsubscribeToken(tampered, EMAIL, SECRET, NOW);
  assert('tampered exp rejected', r.ok === false && r.reason === 'sig_mismatch', JSON.stringify(r));
}

// 7. Malformed token rejected
{
  const r1 = await verifyUnsubscribeToken('not-a-token', EMAIL, SECRET, NOW);
  assert('plain string rejected as malformed', r1.ok === false && r1.reason === 'malformed');
  const r2 = await verifyUnsubscribeToken('a.b', EMAIL, SECRET, NOW);
  assert('two-part token rejected as malformed', r2.ok === false && r2.reason === 'malformed');
  const r3 = await verifyUnsubscribeToken('xyz.abc.def', EMAIL, SECRET, NOW);
  assert('non-hex parts rejected as malformed', r3.ok === false && r3.reason === 'malformed');
}

// 8. Empty inputs rejected
{
  const r1 = await verifyUnsubscribeToken('', EMAIL, SECRET, NOW);
  assert('empty token rejected', r1.ok === false && r1.reason === 'malformed');
  const r2 = await verifyUnsubscribeToken('a.b.c', '', SECRET, NOW);
  assert('empty email rejected', r2.ok === false && r2.reason === 'malformed');
  const r3 = await verifyUnsubscribeToken('a.b.c', EMAIL, '', NOW);
  assert('empty secret rejected', r3.ok === false && r3.reason === 'malformed');
}

// 9. Default expiry is ~1 year out
{
  const token = await signUnsubscribeToken({ email: EMAIL, secret: SECRET });
  const exp = parseInt(token.split('.')[1], 10);
  const yearOut = NOW + 365 * 24 * 60 * 60;
  assert(
    'default expiry within 1 year +/- 60s',
    Math.abs(exp - yearOut) < 60,
    `exp=${exp}, expected~=${yearOut}`,
  );
}

// 10. Token at exact boundary still passes
{
  const token = await signUnsubscribeToken({
    email: EMAIL,
    secret: SECRET,
    expUnixSeconds: NOW,
  });
  const r = await verifyUnsubscribeToken(token, EMAIL, SECRET, NOW);
  assert('token at exact expiry boundary still valid', r.ok === true, JSON.stringify(r));
}

// 11. Email is case-sensitive (token bound to lowercased email upstream : caller responsibility)
{
  const tokenLower = await signUnsubscribeToken({ email: 'lower@example.ca', secret: SECRET });
  const r = await verifyUnsubscribeToken(tokenLower, 'LOWER@example.ca', SECRET, NOW);
  assert(
    'uppercased email rejected (caller must lowercase before sign+verify)',
    r.ok === false && r.reason === 'email_mismatch',
  );
}

// 12. Two different emails get different tokens
{
  const t1 = await signUnsubscribeToken({ email: 'a@example.ca', secret: SECRET, expUnixSeconds: NOW + 100 });
  const t2 = await signUnsubscribeToken({ email: 'b@example.ca', secret: SECRET, expUnixSeconds: NOW + 100 });
  assert('different emails produce different tokens', t1 !== t2);
}

// Report
console.log(`${bold}smoke-newsletter-unsubscribe${reset}`);
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
