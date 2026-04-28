/**
 * Strip the leading <img src={meta.images.hero} .../> block from every blog post Content() body.
 *
 * Why: BlogPostPage.tsx already renders the hero image at the page-header level
 * (with proper aspect ratio + fetchPriority="high"). Posts that also render
 * <img src={meta.images.hero}> inside Content() show the same hero twice in a row.
 *
 * Targets: src/blog/posts/<category>/<slug>.tsx and <slug>.fr.tsx
 *
 * Safety:
 * - Only removes blocks that match `meta.images.hero` (or `metaFr.images.hero`)
 * - Preserves <img src={meta.images.mid}> and <img src={meta.images.end}> blocks
 *   that appear inside the body (those are intentional mid-article and closing visuals)
 * - Removes any blank lines left by the strip so the file stays clean
 *
 * Idempotent: running again is a no-op (no matches).
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const POSTS_ROOT = join(PROJECT_ROOT, 'src/blog/posts')

const files = execSync(`powershell -NoProfile -Command "Get-ChildItem -Path '${POSTS_ROOT.replace(/\\/g, '/')}' -Recurse -Filter *.tsx | ForEach-Object { $_.FullName }"`, {
  encoding: 'utf-8',
}).split(/\r?\n/).filter(Boolean)

// Match a JSX <img ...> block whose `src` is `{meta.images.hero}` OR `{metaFr.images.hero}`.
// The block is multi-line, ends at the closing `/>`.
const heroImgRegex = /\s*<img\s+src=\{(?:meta|metaFr)\.images\.hero\}[\s\S]*?\/>\s*\n/g

let totalEdits = 0
let totalFiles = 0

for (const file of files) {
  const src = readFileSync(file, 'utf-8')
  const matches = [...src.matchAll(heroImgRegex)]
  if (matches.length === 0) continue

  // Keep only the FIRST hero img (the bug). Posts only have one hero img typically,
  // but if multiple exist we strip them all (they're all duplicates of the page-level hero).
  const out = src.replace(heroImgRegex, '\n')
  writeFileSync(file, out)

  totalEdits += matches.length
  totalFiles += 1
  console.log(`  ${file.replace(PROJECT_ROOT + '\\', '').replace(PROJECT_ROOT + '/', '')}: stripped ${matches.length} hero <img>`)
}

console.log(`\nDone. ${totalEdits} hero <img> blocks stripped across ${totalFiles} files.`)
