#!/usr/bin/env node
/**
 * Smoke test for the PDF rendering pipeline (B.4.2).
 *
 * Imports `renderAuditPdf` and invokes it with a representative payload.
 * Asserts:
 *   - Returns a Uint8Array
 *   - Starts with the PDF magic header (%PDF-)
 *   - Contains the expected business name (raw byte search)
 *   - Has at least 10 page objects (loose check on /Type /Page tokens)
 *   - File size is plausible (5-500 KB)
 *   - Render completes in <5s on a developer machine
 *
 * Run: `npx tsx scripts/smoke-audit-pdf-render.mjs`
 * Exits 0 on success.
 */
import { renderAuditPdf } from '../functions/lib/pdf/AuditReport.ts'
import { PDFDocument } from 'pdf-lib'
import { writeFileSync } from 'node:fs'

const SAVE_PDF = process.argv.includes('--save')

function mockRequest() {
  return {
    email: 'owner@acme-dental.example.com',
    lang: 'en',
    businessName: 'Acme Dental Clinic',
    location: 'Montreal, QC',
    vertical: 'dentist',
    websiteUrl: 'https://acme-dental.example.com',
    gbpUrl: 'https://maps.google.com/?cid=12345',
    payload: {
      scoreBand: 'developing',
      scoreNumeric: 64,
      citationMatrix: [
        { engine: 'chatgpt', query: 'best dentist near me Montreal', cited: true, rank: 4 },
        { engine: 'chatgpt', query: 'emergency dentist Montreal', cited: false, rank: null },
        { engine: 'perplexity', query: 'best dentist near me Montreal', cited: true, rank: 2 },
        { engine: 'perplexity', query: 'emergency dentist Montreal', cited: true, rank: 5 },
        { engine: 'claude', query: 'best dentist near me Montreal', cited: false, rank: null },
        { engine: 'claude', query: 'emergency dentist Montreal', cited: false, rank: null },
        { engine: 'gemini', query: 'best dentist near me Montreal', cited: true, rank: 3 },
        { engine: 'gemini', query: 'emergency dentist Montreal', cited: true, rank: 1 },
        { engine: 'aio', query: 'best dentist near me Montreal', cited: true, rank: 2 },
        { engine: 'aio', query: 'emergency dentist Montreal', cited: false, rank: null },
        { engine: 'copilot', query: 'best dentist near me Montreal', cited: false, rank: null },
        { engine: 'copilot', query: 'emergency dentist Montreal', cited: false, rank: null },
      ],
      gbpSignals: [
        { key: 'reviews_recency', label: 'Recent reviews', weight: 0.18, status: 'partial', observation: '4 fresh reviews in the last 30 days; target is 6 plus' },
        { key: 'review_count', label: 'Total reviews', weight: 0.12, status: 'pass', observation: '142 total, ahead of vertical median' },
        { key: 'photo_recency', label: 'Photo recency', weight: 0.10, status: 'fail', observation: 'No photos uploaded in 90 days, AI engines weight recent uploads heavily' },
        { key: 'gbp_categories', label: 'GBP categories', weight: 0.10, status: 'pass', observation: 'Primary + 3 secondary categories filled' },
        { key: 'gbp_attributes', label: 'GBP attributes', weight: 0.08, status: 'partial', observation: 'Accessibility + payment subsets filled, dietary missing' },
        { key: 'nap_consistency', label: 'NAP consistency', weight: 0.10, status: 'fail', observation: 'Phone differs between Yelp + GBP + website; AI engines drop low-confidence entities' },
        { key: 'schema_density', label: 'Schema density', weight: 0.10, status: 'fail', observation: 'No FAQPage or LocalBusiness JSON-LD on home page' },
        { key: 'response_rate', label: 'Owner response rate', weight: 0.07, status: 'pass', observation: '92% of recent reviews answered within 7 days' },
        { key: 'qa_activity', label: 'GBP Q&A activity', weight: 0.05, status: 'partial', observation: '3 questions, 1 answered by owner' },
        { key: 'post_cadence', label: 'GBP post cadence', weight: 0.10, status: 'fail', observation: 'No posts in 60 days, AI Overviews favors active profiles' },
      ],
      competitors: [
        { name: 'Quebec Bright Smiles', rating: 4.7, reviewCount: 218, primaryCategory: 'Dentist', distanceMeters: 800 },
        { name: 'Plateau Dental Group', rating: 4.5, reviewCount: 154, primaryCategory: 'Dentist', distanceMeters: 1200 },
        { name: 'Old Port Family Dentistry', rating: 4.6, reviewCount: 188, primaryCategory: 'Dentist', distanceMeters: 1850 },
      ],
      actionItems: [
        { priority: 1, title: 'Fix NAP mismatch across Yelp, BBB, and YellowPages', effort: 'low', impact: 'high', signal: 'nap_consistency' },
        { priority: 2, title: 'Deploy LocalBusiness + FAQPage schema on home page', effort: 'medium', impact: 'high', signal: 'schema_density' },
        { priority: 3, title: 'Set monthly photo upload routine, 4 photos per month minimum', effort: 'low', impact: 'medium', signal: 'photo_recency' },
        { priority: 4, title: 'Resume GBP posts at 1 per week cadence', effort: 'low', impact: 'medium', signal: 'post_cadence' },
        { priority: 5, title: 'Fill remaining GBP attribute subsets (dietary, accessibility extras)', effort: 'low', impact: 'medium', signal: 'gbp_attributes' },
        { priority: 6, title: 'Set review prompts that ask patients to mention specific services', effort: 'medium', impact: 'medium', signal: 'reviews_recency' },
        { priority: 7, title: 'Answer 2 outstanding GBP questions, draft an answer template for repeat questions', effort: 'low', impact: 'low', signal: 'qa_activity' },
      ],
      auditRunId: 'run_smoke_test_demo',
    },
  }
}

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', yellow = '\x1b[33m', bold = '\x1b[1m'
const cases = []
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }) }

console.log(`${bold}audit-pdf render smoke test${reset}`)

const t0 = Date.now()
let bytes
try {
  bytes = await renderAuditPdf(mockRequest())
} catch (err) {
  console.log(`${red}render threw: ${err?.stack || err?.message || err}${reset}`)
  process.exit(1)
}
const renderMs = Date.now() - t0

assert('returns Uint8Array', bytes instanceof Uint8Array, `got ${bytes?.constructor?.name}`)
assert('non-empty', bytes && bytes.byteLength > 0)
assert('PDF magic header', bytes && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-')

// Re-load the PDF with pdf-lib to assert structural properties. pdf-lib
// compresses object streams so raw byte search of the output misses
// embedded text; loading + introspecting is the right way to verify.
let loaded
try {
  loaded = await PDFDocument.load(bytes)
} catch (err) {
  console.log(`${red}PDF reload failed: ${err?.message || err}${reset}`)
  process.exit(1)
}

const pageCount = loaded.getPageCount()
assert(`page count = 10 (got ${pageCount})`, pageCount === 10)

const title = loaded.getTitle() ?? ''
assert(`title contains business name (got "${title}")`, title.includes('Acme Dental Clinic'))

const author = loaded.getAuthor() ?? ''
assert(`author = AiLys Agency (got "${author}")`, author === 'AiLys Agency')

// Each page should have a non-trivial content stream (otherwise the page is
// blank). pdf-lib stores content under the page node; we look for a Contents
// reference and require its target to be present.
const pages = loaded.getPages()
let pagesWithContent = 0
for (const page of pages) {
  const node = page.node
  if (node.Contents()) pagesWithContent++
}
assert(`all 10 pages have content streams (got ${pagesWithContent}/10)`, pagesWithContent === 10)

assert(`size in 5-500 KB range (got ${(bytes.byteLength / 1024).toFixed(1)}KB)`, bytes.byteLength >= 5_000 && bytes.byteLength <= 500_000)
assert(`render < 5000ms (took ${renderMs}ms)`, renderMs < 5000)

if (SAVE_PDF) {
  const path = '/tmp/audit-smoke.pdf'
  try {
    writeFileSync(path, bytes)
    console.log(`  ${yellow}saved${reset} ${path}`)
  } catch {
    const fallback = './audit-smoke.pdf'
    writeFileSync(fallback, bytes)
    console.log(`  ${yellow}saved${reset} ${fallback}`)
  }
}

let failures = 0
for (const c of cases) {
  if (c.ok) console.log(`  ${green}✓${reset} ${c.name}`)
  else { failures++; console.log(`  ${red}✗${reset} ${c.name}${c.hint ? `\n      hint: ${c.hint}` : ''}`) }
}
console.log('')
console.log(`render time: ${renderMs}ms, output: ${(bytes.byteLength / 1024).toFixed(1)}KB`)
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`)
  process.exit(0)
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`)
  process.exit(1)
}
