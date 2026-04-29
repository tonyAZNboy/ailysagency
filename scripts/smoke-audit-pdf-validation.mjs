#!/usr/bin/env node
/**
 * Smoke test for the audit-pdf request validator.
 *
 * Verifies the surface area of B.4.1 by exercising
 * `validateAuditPdfRequest()` directly. Doesn't spin up wrangler or hit
 * the network, just unit-tests the pure function.
 *
 * Run: `node scripts/smoke-audit-pdf-validation.mjs`
 * Exits 0 if all assertions pass.
 */
import { validateAuditPdfRequest } from '../src/lib/pdfRequestSchema.ts'

const cases = []

function assert(name, cond, hint = '') {
  cases.push({ name, ok: cond, hint })
}

function validPayload() {
  return {
    email: 'owner@example.com',
    lang: 'en',
    businessName: 'Acme Dental',
    location: 'Montreal QC',
    vertical: 'dentist',
    websiteUrl: 'https://acme-dental.example.com',
    gbpUrl: null,
    payload: {
      scoreBand: 'developing',
      scoreNumeric: 62,
      citationMatrix: [
        { engine: 'chatgpt', query: 'best dentist near me', cited: true, rank: 3 },
        { engine: 'perplexity', query: 'best dentist near me', cited: false, rank: null },
      ],
      gbpSignals: [
        { key: 'reviews_recency', label: 'Recent reviews', weight: 0.18, status: 'partial', observation: '4 reviews last 30d' },
      ],
      competitors: [
        { name: 'Quebec Bright Smiles', rating: 4.6, reviewCount: 120, primaryCategory: 'Dentist', distanceMeters: 800 },
      ],
      actionItems: [
        { priority: 1, title: 'Add 4 photos this week', effort: 'low', impact: 'high', signal: 'photos_recency' },
      ],
    },
  }
}

// Case: valid input passes
{
  const result = validateAuditPdfRequest(validPayload())
  assert('valid input passes', result.ok && result.data?.email === 'owner@example.com', JSON.stringify(result.errors))
}

// Case: missing email rejects
{
  const body = validPayload()
  delete body.email
  const result = validateAuditPdfRequest(body)
  assert('missing email rejects', !result.ok && result.errors.includes('email is required'))
}

// Case: invalid email rejects
{
  const body = validPayload()
  body.email = 'not-an-email'
  const result = validateAuditPdfRequest(body)
  assert('invalid email rejects', !result.ok && result.errors.includes('email is invalid'))
}

// Case: disposable email rejects
{
  const body = validPayload()
  body.email = 'spammer@mailinator.com'
  const result = validateAuditPdfRequest(body)
  assert('disposable email rejects', !result.ok && result.errors.includes('email is invalid'))
}

// Case: honeypot triggers immediate reject
{
  const body = validPayload()
  body.honeypot = 'bot was here'
  const result = validateAuditPdfRequest(body)
  assert('honeypot rejects fast', !result.ok && result.errors.includes('spam_check_failed'))
}

// Case: invalid lang rejects
{
  const body = validPayload()
  body.lang = 'xx'
  const result = validateAuditPdfRequest(body)
  assert('invalid lang rejects', !result.ok && result.errors.some((e) => e.includes('lang')))
}

// Case: bad URL rejects
{
  const body = validPayload()
  body.websiteUrl = 'just-a-string'
  const result = validateAuditPdfRequest(body)
  assert('non-http URL rejects', !result.ok && result.errors.some((e) => e.includes('websiteUrl')))
}

// Case: scoreBand invalid rejects
{
  const body = validPayload()
  body.payload.scoreBand = 'godlike'
  const result = validateAuditPdfRequest(body)
  assert('bad scoreBand rejects', !result.ok && result.errors.some((e) => e.includes('scoreBand')))
}

// Case: scoreNumeric out of range rejects
{
  const body = validPayload()
  body.payload.scoreNumeric = 250
  const result = validateAuditPdfRequest(body)
  // clampNumber clamps to [0,100], so 250 clamps to 100, should accept
  assert('scoreNumeric clamps to 100', result.ok && result.data?.payload.scoreNumeric === 100)
}

// Case: scoreNumeric NaN rejects
{
  const body = validPayload()
  body.payload.scoreNumeric = 'foo'
  const result = validateAuditPdfRequest(body)
  assert('non-number scoreNumeric rejects', !result.ok && result.errors.some((e) => e.includes('scoreNumeric')))
}

// Case: too many citationMatrix cells gets rejected
{
  const body = validPayload()
  body.payload.citationMatrix = Array.from({ length: 50 }, (_, i) => ({
    engine: 'chatgpt',
    query: `q${i}`,
    cited: true,
    rank: 1,
  }))
  const result = validateAuditPdfRequest(body)
  assert('citation matrix overflow rejects', !result.ok && result.errors.some((e) => e.includes('citationMatrix')))
}

// Case: invalid engine in matrix is filtered, not rejected
{
  const body = validPayload()
  body.payload.citationMatrix = [
    { engine: 'chatgpt', query: 'foo', cited: true, rank: 1 },
    { engine: 'bogus', query: 'foo', cited: true, rank: 1 }, // dropped silently
  ]
  const result = validateAuditPdfRequest(body)
  assert(
    'invalid engine drops silently',
    result.ok && result.data?.payload.citationMatrix.length === 1,
    JSON.stringify(result),
  )
}

// Case: XSS-style script in business name is preserved as literal text
//       (pdf-lib drawText escapes glyphs, not strings; we want literal preservation)
{
  const body = validPayload()
  body.businessName = '<script>alert(1)</script>'
  const result = validateAuditPdfRequest(body)
  assert(
    'XSS preserved as literal text',
    result.ok && result.data?.businessName === '<script>alert(1)</script>',
    JSON.stringify(result),
  )
}

// Case: oversized businessName clipped
{
  const body = validPayload()
  body.businessName = 'A'.repeat(500)
  const result = validateAuditPdfRequest(body)
  assert(
    'businessName clipped to 200',
    result.ok && (result.data?.businessName?.length ?? 0) === 200,
    JSON.stringify(result),
  )
}

// Case: non-object body rejects
{
  const result = validateAuditPdfRequest('hello')
  assert('non-object body rejects', !result.ok)
}

// Case: empty competitors array allowed (no minimum)
{
  const body = validPayload()
  body.payload.competitors = []
  const result = validateAuditPdfRequest(body)
  assert('empty competitors allowed', result.ok && result.data?.payload.competitors.length === 0)
}

// Print results
const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m'
console.log(`${bold}audit-pdf validation smoke test${reset}`)
let failures = 0
for (const c of cases) {
  if (c.ok) {
    console.log(`  ${green}✓${reset} ${c.name}`)
  } else {
    failures++
    console.log(`  ${red}✗${reset} ${c.name}${c.hint ? `\n      hint: ${c.hint}` : ''}`)
  }
}
console.log('')
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`)
  process.exit(0)
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`)
  process.exit(1)
}
