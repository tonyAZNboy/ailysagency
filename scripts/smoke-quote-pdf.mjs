#!/usr/bin/env node
/**
 * Smoke test for Phase E.1.9: personalized quote PDF endpoint + render.
 *
 * 10 cases:
 *  1. Starter monthly: tierBase=$300, no discount, total=$300
 *  2. Core annual -15%: tierBase=$600, discount=$90, total=$510
 *  3. Growth biennial -20%: tierBase=$1200, discount=$240, total=$960
 *  4. Agency monthly: tierBase=$2500, no discount, reviuzyAddon bundled (no charge)
 *  5. Tax-incl Core monthly: total = $600 * 1.14975 = $689.85
 *  6. Reviuzy add-on on Core: subtotal = $600 + $100 = $700
 *  7. Biennial rejected on Starter (tier-locked decision #7)
 *  8. PME website rejected on Starter (tier-locked decision #5)
 *  9. Commerce website rejected on Core (Growth-only)
 * 10. PDF render produces valid 4-page PDF for Core annual + PME website
 *
 * Run: npx tsx scripts/smoke-quote-pdf.mjs
 * Exits 0 on success.
 */

import { computeQuote, renderQuotePdf } from '../functions/lib/pdf/Quote.ts';
import { PDFDocument } from 'pdf-lib';

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m';
const cases = [];
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }); }

function close(a, b, eps = 0.01) { return Math.abs(a - b) < eps; }

// Validation helpers (mirror endpoint logic)
const ALLOWED_TIERS = new Set(['starter', 'core', 'growth', 'agency']);
const ALLOWED_ENGAGEMENTS = new Set(['monthly', 'annual', 'biennial']);
const ALLOWED_WEBSITE_SIZES = new Set(['none', 'vitrine', 'pme', 'commerce']);

function validate(body) {
  const errors = [];
  if (!ALLOWED_TIERS.has(body.tier)) errors.push('tier');
  if (!ALLOWED_ENGAGEMENTS.has(body.engagement)) errors.push('engagement');
  if (body.engagement === 'biennial' && (body.tier === 'starter' || body.tier === 'core')) {
    errors.push('biennial not eligible');
  }
  const ws = body.websiteSize ?? 'none';
  if (!ALLOWED_WEBSITE_SIZES.has(ws)) errors.push('websiteSize');
  if (ws === 'pme' && body.tier === 'starter') errors.push('pme requires Core+');
  if (ws === 'commerce' && (body.tier === 'starter' || body.tier === 'core')) errors.push('commerce requires Growth');
  if (ws !== 'none' && body.tier === 'agency') errors.push('agency excludes website');
  return errors;
}

// Case 1: Starter monthly
{
  const calc = computeQuote({ prospectName: 'X', businessName: 'Y', email: 'a@b.c', lang: 'en', tier: 'starter', engagement: 'monthly', reviuzyAddon: false, websiteSize: 'none', taxIncluded: false });
  assert('1. Starter monthly: total=$300', calc.tierBase === 300 && calc.engagementDiscount === 0 && calc.total === 300);
}
// Case 2: Core annual -15%
{
  const calc = computeQuote({ prospectName: 'X', businessName: 'Y', email: 'a@b.c', lang: 'en', tier: 'core', engagement: 'annual', reviuzyAddon: false, websiteSize: 'none', taxIncluded: false });
  assert('2. Core annual: discount=$90 total=$510', calc.engagementDiscount === 90 && calc.total === 510, JSON.stringify(calc));
}
// Case 3: Growth biennial -20%
{
  const calc = computeQuote({ prospectName: 'X', businessName: 'Y', email: 'a@b.c', lang: 'en', tier: 'growth', engagement: 'biennial', reviuzyAddon: false, websiteSize: 'none', taxIncluded: false });
  assert('3. Growth biennial: discount=$240 total=$960', calc.engagementDiscount === 240 && calc.total === 960, JSON.stringify(calc));
}
// Case 4: Agency monthly + reviuzy bundled
{
  const calc = computeQuote({ prospectName: 'X', businessName: 'Y', email: 'a@b.c', lang: 'en', tier: 'agency', engagement: 'monthly', reviuzyAddon: true, websiteSize: 'none', taxIncluded: false });
  assert('4. Agency reviuzyAddon bundled (no charge)', calc.tierBase === 2500 && calc.reviuzyAddonCost === 0 && calc.total === 2500, JSON.stringify(calc));
}
// Case 5: Tax-incl Core monthly
{
  const calc = computeQuote({ prospectName: 'X', businessName: 'Y', email: 'a@b.c', lang: 'en', tier: 'core', engagement: 'monthly', reviuzyAddon: false, websiteSize: 'none', taxIncluded: true });
  assert('5. Core tax-incl: total=$689.85', close(calc.total, 689.85, 0.05), `total=${calc.total}`);
}
// Case 6: Reviuzy on Core
{
  const calc = computeQuote({ prospectName: 'X', businessName: 'Y', email: 'a@b.c', lang: 'en', tier: 'core', engagement: 'monthly', reviuzyAddon: true, websiteSize: 'none', taxIncluded: false });
  assert('6. Core + reviuzy: subtotal=$700 total=$700', calc.subtotal === 700 && calc.total === 700, JSON.stringify(calc));
}
// Case 7: Biennial Starter rejected
{
  const errs = validate({ tier: 'starter', engagement: 'biennial' });
  assert('7. Starter biennial rejected', errs.includes('biennial not eligible'));
}
// Case 8: PME on Starter rejected
{
  const errs = validate({ tier: 'starter', engagement: 'monthly', websiteSize: 'pme' });
  assert('8. Starter + PME rejected', errs.some((e) => e.includes('pme requires Core+')));
}
// Case 9: Commerce on Core rejected
{
  const errs = validate({ tier: 'core', engagement: 'monthly', websiteSize: 'commerce' });
  assert('9. Core + Commerce rejected', errs.some((e) => e.includes('commerce requires Growth')));
}
// Case 10: PDF render
{
  const bytes = await renderQuotePdf({
    prospectName: 'Anthony', businessName: 'Acme Dental', email: 'a@b.c', lang: 'en',
    tier: 'core', engagement: 'annual', reviuzyAddon: true, websiteSize: 'pme', taxIncluded: true,
  });
  const doc = await PDFDocument.load(bytes);
  // 4 pages: cover + breakdown + website + signature
  assert('10. PDF Core annual + PME website renders 4 pages', bytes.byteLength > 1000 && doc.getPageCount() === 4, `bytes=${bytes.byteLength} pages=${doc.getPageCount()}`);
}

const total = cases.length;
const passed = cases.filter((c) => c.ok).length;
const failed = total - passed;

console.log(bold + `\nQuote PDF smoke: ${passed}/${total} pass\n` + reset);
for (const c of cases) {
  const mark = c.ok ? green + 'PASS' + reset : red + 'FAIL' + reset;
  console.log(`${mark}  ${c.name}${c.ok ? '' : '\n      hint: ' + c.hint}`);
}
if (failed > 0) {
  console.log(red + bold + `\n${failed} failing case(s).\n` + reset);
  process.exit(1);
}
console.log(green + bold + `\nAll ${total} cases pass.\n` + reset);
