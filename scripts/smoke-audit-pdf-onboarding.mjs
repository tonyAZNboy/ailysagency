#!/usr/bin/env node
/**
 * Smoke test for Phase C.1: Day-1 onboarding PDF endpoint.
 *
 * Exercises:
 *   1. signServiceRequest + verifyServiceRequest round-trip
 *   2. verifyServiceRequest rejects missing headers
 *   3. verifyServiceRequest rejects unknown caller
 *   4. verifyServiceRequest rejects skewed timestamp
 *   5. verifyServiceRequest rejects tampered token
 *   6. verifyServiceRequest rejects when secret is missing
 *   7. verifyServiceRequest rejects when body is mutated after signing
 *   8. buildOnboardingPdfRequest produces a valid AuditPdfRequest
 *      (validateAuditPdfRequest returns ok)
 *   9. buildOnboardingPdfRequest renders to a real 10-page PDF
 *  10. Day-1 payload contains 'first scan pending' marker for the user
 *  11. Action items use vertical-tuned templates per vertical
 *  12. Action items fall back to the default template for unknown verticals
 *  13. CitationMatrix has 6 engines x N queries
 *  14. CitationMatrix is fully populated with cited=false (Day-1 baseline)
 *
 * Run: `npx tsx scripts/smoke-audit-pdf-onboarding.mjs`
 * Exits 0 on success.
 */

import {
  signServiceRequest,
  verifyServiceRequest,
  SERVICE_AUTH_REPLAY_WINDOW_SECONDS,
} from '../functions/lib/serviceAuth.ts';
import { buildOnboardingPdfRequest } from '../src/lib/onboardingAuditPayload.ts';
import { validateAuditPdfRequest } from '../src/lib/pdfRequestSchema.ts';
import { renderAuditPdf } from '../functions/lib/pdf/AuditReport.ts';
import { PDFDocument } from 'pdf-lib';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

const SECRET = 'a'.repeat(64); // 32-byte hex secret
const NOW = Math.floor(Date.now() / 1000);

const sampleBody = JSON.stringify({
  stripeCustomerId: 'cus_TEST123',
  tenantId: 'tnt_abc',
  email: 'owner@example.com',
  lang: 'en',
  businessName: 'Acme Dental',
  location: 'Montreal, QC',
  vertical: 'dentist',
  websiteUrl: 'https://acme-dental.example.com',
  gbpUrl: 'https://maps.google.com/?cid=12345',
});

function fakeRequest(headers) {
  return {
    headers: { get: (name) => headers[name] ?? null },
  };
}

// 1. Sign + verify round-trip
{
  const sig = await signServiceRequest(SECRET, sampleBody, NOW);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'reviuzy-provision-tenant',
  });
  const result = await verifyServiceRequest(SECRET, req, sampleBody, NOW);
  assert('valid sig + headers verify ok', result.ok === true && result.caller === 'reviuzy-provision-tenant');
}

// 2. Missing headers
{
  const result = await verifyServiceRequest(SECRET, fakeRequest({}), sampleBody, NOW);
  assert('missing headers reject', result.ok === false && result.reason === 'missing_headers');
}

// 3. Unknown caller
{
  const sig = await signServiceRequest(SECRET, sampleBody, NOW);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'attacker-service',
  });
  const result = await verifyServiceRequest(SECRET, req, sampleBody, NOW);
  assert('unknown caller reject', result.ok === false && result.reason === 'caller_not_allowed');
}

// 4. Skewed timestamp (>5 min old)
{
  const oldTs = NOW - SERVICE_AUTH_REPLAY_WINDOW_SECONDS - 60;
  const sig = await signServiceRequest(SECRET, sampleBody, oldTs);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(oldTs),
    'X-AiLys-Service-Caller': 'reviuzy-provision-tenant',
  });
  const result = await verifyServiceRequest(SECRET, req, sampleBody, NOW);
  assert('stale timestamp reject', result.ok === false && result.reason === 'timestamp_skewed');
}

// 5. Tampered token (flip last byte)
{
  const sig = await signServiceRequest(SECRET, sampleBody, NOW);
  const tampered = sig.slice(0, -2) + (sig.slice(-2) === '00' ? 'ff' : '00');
  const req = fakeRequest({
    'X-AiLys-Service-Token': tampered,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'reviuzy-provision-tenant',
  });
  const result = await verifyServiceRequest(SECRET, req, sampleBody, NOW);
  assert('tampered token reject', result.ok === false && result.reason === 'sig_mismatch');
}

// 6. Missing secret
{
  const sig = await signServiceRequest(SECRET, sampleBody, NOW);
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'reviuzy-provision-tenant',
  });
  const result = await verifyServiceRequest(undefined, req, sampleBody, NOW);
  assert('missing secret reject', result.ok === false && result.reason === 'no_secret');
}

// 7. Body mutated after signing
{
  const sig = await signServiceRequest(SECRET, sampleBody, NOW);
  const mutated = sampleBody.replace('Acme Dental', 'Evil Corp');
  const req = fakeRequest({
    'X-AiLys-Service-Token': sig,
    'X-AiLys-Service-Timestamp': String(NOW),
    'X-AiLys-Service-Caller': 'reviuzy-provision-tenant',
  });
  const result = await verifyServiceRequest(SECRET, req, mutated, NOW);
  assert('mutated body reject', result.ok === false && result.reason === 'sig_mismatch');
}

// 8. buildOnboardingPdfRequest produces valid AuditPdfRequest
const onbReq = buildOnboardingPdfRequest({
  email: 'owner@acme.example.com',
  lang: 'en',
  businessName: 'Acme Dental',
  location: 'Montreal, QC',
  vertical: 'dentist',
  websiteUrl: 'https://acme.example.com',
  gbpUrl: null,
});

{
  const v = validateAuditPdfRequest(onbReq);
  assert('onboarding payload validates clean', v.ok === true, JSON.stringify(v.errors));
}

// 9. Renders to a real PDF
let bytes;
try {
  bytes = await renderAuditPdf(onbReq);
} catch (err) {
  console.log(`${red}render threw: ${err?.message || err}${reset}`);
  process.exit(1);
}
assert('renders to PDF bytes', bytes instanceof Uint8Array && bytes.byteLength > 5000);

const loaded = await PDFDocument.load(bytes);
assert(`page count = 10 (got ${loaded.getPageCount()})`, loaded.getPageCount() === 10);

// 10. Day-1 payload contains 'first scan pending' marker
{
  const obs = onbReq.payload.gbpSignals.map((s) => s.observation).join(' | ');
  assert('signals carry first-scan-pending marker', obs.toLowerCase().includes('first scan pending'));
}

// 11. Action items use vertical template (dentist gets Apple Maps Connect)
{
  const titles = onbReq.payload.actionItems.map((a) => a.title).join(' | ');
  assert('dentist actions include Apple Maps Connect', titles.includes('Apple Maps Connect'));
}

// 12. Unknown vertical falls back to default template
{
  const fallbackReq = buildOnboardingPdfRequest({
    email: 'owner@example.com',
    lang: 'en',
    businessName: 'Generic Co',
    location: null,
    vertical: 'pet_groomer', // not in template list
    websiteUrl: null,
    gbpUrl: null,
  });
  const titles = fallbackReq.payload.actionItems.map((a) => a.title).join(' | ');
  assert('unknown vertical falls back to default actions', titles.includes('NAP consistency') && titles.includes('LocalBusiness schema'));
}

// 13. Citation matrix shape: 6 engines x N queries
{
  const matrix = onbReq.payload.citationMatrix;
  const uniqueEngines = new Set(matrix.map((c) => c.engine));
  const uniqueQueries = new Set(matrix.map((c) => c.query));
  assert('6 engines covered', uniqueEngines.size === 6);
  assert('3 queries covered (dentist template)', uniqueQueries.size === 3);
  assert('matrix has 6x3=18 cells', matrix.length === 18);
}

// 14. All cells start uncited (Day-1 baseline)
{
  const allUncited = onbReq.payload.citationMatrix.every((c) => c.cited === false && c.rank === null);
  assert('all cells uncited on Day-1', allUncited);
}

// Print results
console.log(`${bold}audit-pdf-onboarding smoke test${reset}`);
let failures = 0;
for (const c of cases) {
  if (c.ok) console.log(`  ${green}✓${reset} ${c.name}`);
  else { failures++; console.log(`  ${red}✗${reset} ${c.name}${c.hint ? `\n      hint: ${c.hint}` : ''}`); }
}
console.log('');
console.log(`pdf size: ${(bytes.byteLength / 1024).toFixed(1)}KB`);
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`);
  process.exit(0);
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`);
  process.exit(1);
}
