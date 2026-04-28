#!/usr/bin/env node
// Generate placeholder hero/mid/end SVGs for every post in the blog registry.
// Run: node scripts/generate-blog-placeholders.mjs
// Idempotent: skips files that already exist.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const REGISTRY_PATH = join(PROJECT_ROOT, 'src/blog/registry.ts')
const OUT_DIR = join(PROJECT_ROOT, 'public/blog-images')

const registrySrc = readFileSync(REGISTRY_PATH, 'utf-8')
const slugs = [...registrySrc.matchAll(/\.\.\.(\w+Meta),\s*\n\s*load:\s*\(\)\s*=>\s*import\('\.\/posts\/[^']+\/([^']+)'\)/g)].map(
  (m) => m[2],
)

const PALETTES = [
  ['#1e293b', '#06b6d4', '#a855f7'],
  ['#0f172a', '#3b82f6', '#22d3ee'],
  ['#111827', '#10b981', '#06b6d4'],
  ['#1e1b4b', '#a855f7', '#ec4899'],
  ['#1c1917', '#f59e0b', '#06b6d4'],
  ['#0c4a6e', '#22d3ee', '#a855f7'],
]

function svg(slug, variant, palette) {
  const [bg, c1, c2] = palette
  const label = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 60)
  const dim = variant === 'hero' ? { w: 1200, h: 630 } : variant === 'mid' ? { w: 1200, h: 480 } : { w: 1200, h: 480 }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim.w} ${dim.h}" width="${dim.w}" height="${dim.h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${c2}" stop-opacity="0.7"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${dim.w}" height="${dim.h}" fill="${bg}"/>
  <rect width="${dim.w}" height="${dim.h}" fill="url(#glow)"/>
  <g opacity="0.18">
    <circle cx="${dim.w * 0.85}" cy="${dim.h * 0.2}" r="${dim.h * 0.4}" fill="url(#g)"/>
    <circle cx="${dim.w * 0.15}" cy="${dim.h * 0.85}" r="${dim.h * 0.3}" fill="url(#g)"/>
  </g>
  <text x="60" y="${dim.h - 90}" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="${variant === 'hero' ? 56 : 44}" font-weight="800" fill="white" letter-spacing="-1">${label}</text>
  <text x="60" y="${dim.h - 40}" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="20" font-weight="500" fill="${c1}" letter-spacing="2">AILYS AGENCY • AI VISIBILITY</text>
</svg>`
}

let created = 0
let skipped = 0

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i]
  const palette = PALETTES[i % PALETTES.length]
  const dir = join(OUT_DIR, slug)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  for (const variant of ['hero', 'mid', 'end']) {
    const svgPath = join(dir, `${variant}.svg`)
    const webpPath = join(dir, `${variant}.webp`)
    if (existsSync(svgPath) || existsSync(webpPath)) {
      skipped++
      continue
    }
    writeFileSync(svgPath, svg(slug, variant, palette))
    created++
  }
}

console.log(`Placeholders generated: ${created} created, ${skipped} skipped, ${slugs.length} slugs.`)
