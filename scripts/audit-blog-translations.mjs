#!/usr/bin/env node
/**
 * Audit EN canonical vs FR-CA sibling parity for every blog post.
 *
 * Checks per pair:
 *   1. FR sibling exists and exports `metaFr` + `ContentFr`
 *   2. Heading parity (count of <h2>/<h3> roughly matches)
 *   3. Component parity (CalloutBox, InlineCTA, StatHighlight, KeyTakeaway,
 *      QuickQuiz, InternalLink, SectionDivider, FAQ count)
 *   4. FAQ count parity (faqItems array length)
 *   5. No em-dashes (—) in FR sibling
 *   6. No AI fingerprints in FR sibling (leverage, robust, delve, "It's not just",
 *      "Whether you're", "Whether vous")
 *   7. Brand names preserved in Latin script in FR sibling
 *   8. Word count ratio (FR should be 1.0x to 1.4x EN, French is naturally longer)
 *   9. Slug match between EN meta + FR metaFr
 *  10. JSON-LD related metadata (publishedDate, author) present in FR
 *
 * Exit code 0 only if every post passes every gate.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const POSTS_DIR = join(ROOT, 'src', 'blog', 'posts')

const BRAND_NAMES = [
  'AiLys', 'ChatGPT', 'Perplexity', 'Claude', 'Gemini',
  'Google AIO', 'Bing Copilot', 'Yelp', 'BBB', 'Wikidata',
  'Wikipedia', 'Schema.org', 'Reviuzy', 'GBP', 'AEO', 'GEO',
  'E-E-A-T', 'NAP', 'SEO', 'FAQ', 'NFC',
]

const AI_FINGERPRINTS = [
  /\bleverage\b/gi,
  /\brobust\b/gi,
  /\bdelve\b/gi,
  /it's not just .+, it's/gi,
  /ce n'est pas (juste|seulement) .+, c'est/gi,
  /whether you're /gi,
  /que vous soyez .+ ou /gi,
]

const COMPONENT_PATTERNS = {
  StatHighlight: /<StatHighlight\b/g,
  CalloutBox: /<CalloutBox\b/g,
  InlineCTA: /<InlineCTA\b/g,
  QuickQuiz: /<QuickQuiz\b/g,
  KeyTakeaway: /<KeyTakeaway\b/g,
  InternalLink: /<InternalLink\b/g,
  SectionDivider: /<SectionDivider\b/g,
  H2: /<h2\b/g,
  H3: /<h3\b/g,
}

const PROPRIETARY_LEAKS = [
  /\bAnthropic\b/g,
  /\bOpenAI\b/g,
  /(?<![\w/-])Claude(?![\w-])/g,        // raw Claude alone (without Search) is OK as topic mention; we'll flag and let human review
  /(?<![\w/-])Gemini(?![\w-])/g,
  /\bGoogle\b\s+(?=AI Overviews)/g,     // OK in topic context, not flagged
]

function listPostFiles() {
  const out = []
  for (const cat of readdirSync(POSTS_DIR)) {
    const catPath = join(POSTS_DIR, cat)
    if (!statSync(catPath).isDirectory()) continue
    for (const file of readdirSync(catPath)) {
      if (!file.endsWith('.tsx')) continue
      out.push(join(catPath, file))
    }
  }
  return out
}

function isFrSibling(p) { return p.endsWith('.fr.tsx') }
function enFromFr(p)    { return p.replace(/\.fr\.tsx$/, '.tsx') }

function countAll(re, s) { return (s.match(re) || []).length }

function wordCount(src) {
  // Extract <p>, list items, headings text — skip JSX attributes.
  const stripped = src
    .replace(/<[^>]+>/g, ' ')
    .replace(/[{}]/g, ' ')
    .replace(/\s+/g, ' ')
  return stripped.trim().split(/\s+/).length
}

function extractSlug(src) {
  const m = src.match(/slug:\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

function extractFaqCount(src) {
  // Count faqItems entries by counting `question:` keys inside the meta block.
  const metaBlock = src.match(/(meta|metaFr):\s*BlogPostMeta\s*=\s*\{[\s\S]*?^\}/m)
  if (!metaBlock) return 0
  return (metaBlock[0].match(/question:\s*['"`]/g) || []).length
}

function audit() {
  const issues = []
  const stats = { posts: 0, ok: 0, withIssues: 0 }
  const files = listPostFiles()
  const enFiles = files.filter(p => !isFrSibling(p))
  const frFiles = files.filter(isFrSibling)
  const frSet = new Set(frFiles)

  for (const enPath of enFiles) {
    stats.posts++
    const expectedFr = enPath.replace(/\.tsx$/, '.fr.tsx')
    const rel = relative(ROOT, enPath).replace(/\\/g, '/')
    const postIssues = []

    if (!frSet.has(expectedFr)) {
      postIssues.push('MISSING FR sibling')
      issues.push({ post: rel, issues: postIssues })
      stats.withIssues++
      continue
    }

    const en = readFileSync(enPath, 'utf8')
    const fr = readFileSync(expectedFr, 'utf8')

    // 1. exports
    if (!/export\s+const\s+meta\b/.test(en)) postIssues.push('EN missing `export const meta`')
    if (!/export\s+function\s+Content\b/.test(en)) postIssues.push('EN missing `export function Content`')
    if (!/export\s+const\s+metaFr\b/.test(fr)) postIssues.push('FR missing `export const metaFr`')
    if (!/export\s+function\s+ContentFr\b/.test(fr)) postIssues.push('FR missing `export function ContentFr`')

    // 2. slug match
    const enSlug = extractSlug(en)
    const frSlugMatch = fr.match(/(slug):\s*['"]([^'"]+)['"]/)
    const frSlug = frSlugMatch ? frSlugMatch[2] : null
    if (enSlug && frSlug && enSlug !== frSlug) postIssues.push(`slug mismatch (en=${enSlug} fr=${frSlug})`)

    // 3. component parity
    for (const [name, re] of Object.entries(COMPONENT_PATTERNS)) {
      const reEn = new RegExp(re.source, 'g')
      const reFr = new RegExp(re.source, 'g')
      const ec = countAll(reEn, en)
      const fc = countAll(reFr, fr)
      if (ec !== fc) postIssues.push(`${name} count mismatch en=${ec} fr=${fc}`)
    }

    // 4. FAQ count parity
    const enFaq = extractFaqCount(en)
    const frFaq = extractFaqCount(fr)
    if (enFaq !== frFaq) postIssues.push(`faqItems count mismatch en=${enFaq} fr=${frFaq}`)
    if (enFaq < 4) postIssues.push(`EN faqItems too few (${enFaq}, expect >= 4)`)

    // 5. em-dashes in FR
    const emCount = (fr.match(/—/g) || []).length
    if (emCount > 0) postIssues.push(`FR has ${emCount} em-dash(es) — forbidden`)
    const emEn = (en.match(/—/g) || []).length
    if (emEn > 0) postIssues.push(`EN has ${emEn} em-dash(es) — forbidden`)

    // 6. AI fingerprints in FR
    for (const re of AI_FINGERPRINTS) {
      const m = fr.match(re)
      if (m && m.length) postIssues.push(`FR AI-fingerprint match: "${m[0]}"`)
    }

    // 7. Brand names preserved (FR must contain them in Latin script if EN does).
    //    Schema-type composites (e.g. FAQPage, BreadcrumbList) count as
    //    satisfying their root brand (FAQ, Breadcrumb), so we drop the right
    //    word boundary for known schema brands.
    const SCHEMA_BRANDS = new Set(['FAQ'])
    for (const brand of BRAND_NAMES) {
      const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const rightBoundary = SCHEMA_BRANDS.has(brand) ? '' : '\\b'
      const reEn = new RegExp(`\\b${escaped}${rightBoundary}`)
      const reFr = new RegExp(`\\b${escaped}${rightBoundary}`)
      if (reEn.test(en) && !reFr.test(fr)) postIssues.push(`brand "${brand}" present in EN, missing/translated in FR`)
    }

    // 8. proprietary AI provider disclosure (we tolerate Claude/Gemini as topic mentions
    //    but flag suspicious phrases like "powered by Claude" or "AiLys uses Claude")
    const propLeak = [
      /(?:powered|backed|built)\s+(?:by|on|with)\s+(?:Anthropic|OpenAI|Google's? Gemini|Claude\b)/i,
      /AiLys\s+(?:uses|runs|relies on|leverages)\s+(?:Claude|Gemini|GPT|OpenAI|Anthropic)/i,
      /(?:notre|on)\s+(?:utilise|s'appuie sur|repose sur)\s+(?:Claude|Anthropic|OpenAI|Gemini)/i,
    ]
    for (const re of propLeak) {
      if (re.test(en)) postIssues.push(`EN proprietary AI disclosure: ${re.source}`)
      if (re.test(fr)) postIssues.push(`FR proprietary AI disclosure: ${re.source}`)
    }

    // 9. word count ratio
    const ew = wordCount(en)
    const fw = wordCount(fr)
    const ratio = fw / ew
    if (ratio < 0.85) postIssues.push(`FR too short vs EN (ratio=${ratio.toFixed(2)}, fr=${fw}w en=${ew}w)`)
    if (ratio > 1.6)  postIssues.push(`FR suspiciously long vs EN (ratio=${ratio.toFixed(2)}, fr=${fw}w en=${ew}w)`)

    // 10. metaFr inherits or sets publishedDate + author. The architectural
    //     pattern is `metaFr = { ...meta, <FR overrides> }`, which inherits
    //     publishedDate + author from the EN canonical. Only flag if neither
    //     the spread nor an explicit value is present.
    const inheritsFromEn = /metaFr[^=]*=\s*\{\s*\.\.\.\s*meta\b/.test(fr)
    if (!inheritsFromEn) {
      if (!/publishedDate:\s*['"][\d-]+['"]/.test(fr)) postIssues.push('FR missing publishedDate in metaFr (no `...meta` spread either)')
      if (!/author:\s*AUTHORS\.\w+/.test(fr)) postIssues.push('FR missing author in metaFr (no `...meta` spread either)')
    }

    if (postIssues.length === 0) {
      stats.ok++
    } else {
      stats.withIssues++
      issues.push({ post: rel, issues: postIssues })
    }
  }

  // orphan FR files (no EN canonical)
  for (const frPath of frFiles) {
    const en = enFromFr(frPath)
    try { statSync(en) } catch {
      issues.push({ post: relative(ROOT, frPath).replace(/\\/g, '/'), issues: ['ORPHAN FR sibling — no EN canonical'] })
    }
  }

  // print report
  const reset = '\x1b[0m', red = '\x1b[31m', green = '\x1b[32m', yellow = '\x1b[33m', bold = '\x1b[1m'
  console.log(`${bold}AiLys blog translation audit${reset}`)
  console.log(`Posts: ${stats.posts}`)
  console.log(`${green}Pass: ${stats.ok}${reset}`)
  console.log(`${red}Fail: ${stats.withIssues}${reset}`)
  console.log('')

  if (issues.length === 0) {
    console.log(`${green}${bold}All posts pass every gate.${reset}`)
    process.exit(0)
  }

  for (const { post, issues: postIssues } of issues) {
    console.log(`${yellow}${post}${reset}`)
    for (const i of postIssues) console.log(`  ${red}•${reset} ${i}`)
  }
  process.exit(1)
}

audit()
