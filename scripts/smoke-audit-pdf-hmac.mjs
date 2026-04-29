#!/usr/bin/env node
/**
 * Smoke test for the HMAC signer/verifier (B.4.3).
 *
 * Run: `npx tsx scripts/smoke-audit-pdf-hmac.mjs`
 * Exits 0 if all assertions pass.
 */
import { signDownload, verifyDownload, newObjectId } from '../functions/lib/pdfHmac.ts'

const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', bold = '\x1b[1m'
const cases = []
function assert(name, cond, hint = '') { cases.push({ name, ok: cond, hint }) }

const SECRET = 'a'.repeat(64) // 32 bytes hex
const objectId = newObjectId()
const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60

// Generated objectId is URL-safe
assert('objectId is url-safe + 24 chars', /^[A-Za-z0-9_-]{24}$/.test(objectId), `got "${objectId}"`)

// Round-trip sign + verify works
const sig = await signDownload(SECRET, objectId, exp)
assert('sig is 64 hex chars (SHA-256)', /^[a-f0-9]{64}$/.test(sig), `got ${sig.length} chars`)

const ok = await verifyDownload(SECRET, objectId, exp, sig)
assert('valid sig verifies ok', ok.ok === true)

// Tampered sig fails
const tampered = sig.slice(0, -2) + (sig.slice(-2) === '00' ? 'ff' : '00')
const tamperedRes = await verifyDownload(SECRET, objectId, exp, tampered)
assert('tampered sig fails', tamperedRes.ok === false && tamperedRes.reason === 'sig_mismatch')

// Wrong objectId fails
const wrongIdRes = await verifyDownload(SECRET, newObjectId(), exp, sig)
assert('wrong objectId fails', wrongIdRes.ok === false && wrongIdRes.reason === 'sig_mismatch')

// Wrong exp fails
const wrongExpRes = await verifyDownload(SECRET, objectId, exp + 1, sig)
assert('wrong exp fails', wrongExpRes.ok === false && wrongExpRes.reason === 'sig_mismatch')

// Wrong secret fails
const wrongSecretRes = await verifyDownload('b'.repeat(64), objectId, exp, sig)
assert('wrong secret fails', wrongSecretRes.ok === false && wrongSecretRes.reason === 'sig_mismatch')

// Expired exp fails
const past = Math.floor(Date.now() / 1000) - 60
const sigPast = await signDownload(SECRET, objectId, past)
const pastRes = await verifyDownload(SECRET, objectId, past, sigPast)
assert('past exp fails as expired', pastRes.ok === false && pastRes.reason === 'expired')

// Malformed hex fails as malformed
const malformed = await verifyDownload(SECRET, objectId, exp, 'not-hex')
assert('non-hex sig fails malformed', malformed.ok === false && malformed.reason === 'malformed')

// Two different objectIds produce different sigs
const idA = newObjectId()
const idB = newObjectId()
assert('objectIds are unique', idA !== idB)
const sigA = await signDownload(SECRET, idA, exp)
const sigB = await signDownload(SECRET, idB, exp)
assert('different objectIds produce different sigs', sigA !== sigB)

console.log(`${bold}audit-pdf hmac smoke test${reset}`)
let failures = 0
for (const c of cases) {
  if (c.ok) console.log(`  ${green}✓${reset} ${c.name}`)
  else { failures++; console.log(`  ${red}✗${reset} ${c.name}${c.hint ? `\n      hint: ${c.hint}` : ''}`) }
}
console.log('')
if (failures === 0) {
  console.log(`${green}${bold}${cases.length}/${cases.length} pass${reset}`)
  process.exit(0)
} else {
  console.log(`${red}${bold}${failures}/${cases.length} fail${reset}`)
  process.exit(1)
}
