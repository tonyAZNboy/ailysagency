// Update Tier 3 (Autopilot) price from $1,299 to $1,599 across the codebase.
// Safe substitution: matches are all price references (verified manually).
//
// Usage: node scripts/migrate-tier3-price.mjs

import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const TARGETS = [
  // i18n locales (string copy)
  ...await listTs(path.join(ROOT, "src/i18n/translations")),
  // Components and data files
  "src/components/landing/FoundingClientsSection.tsx",
  "src/components/landing/ServicesSection.tsx",
  "src/components/landing/PricingBuilderSection.tsx",
  "src/data/comparisons.ts",
  "src/data/glossary.ts",
  "src/data/help-articles.ts",
  "src/data/industries.ts",
  "src/pages/Industry.tsx",
];

async function listTs(dir) {
  const entries = await readdir(dir);
  const out = [];
  for (const e of entries) {
    if (e.endsWith(".ts")) out.push(path.relative(ROOT, path.join(dir, e)));
  }
  return out;
}

let totalReplaced = 0;
for (const rel of TARGETS) {
  const abs = path.join(ROOT, rel);
  let content;
  try {
    content = await readFile(abs, "utf8");
  } catch {
    continue;
  }
  const before = content;
  // "1,299" → "1,599" (covers all price-with-comma instances across copy and code)
  content = content.replace(/1,299/g, "1,599");
  // Bare 1299 (code numeric literal in PricingBuilderSection)
  content = content.replace(/(?<![\d,])1299(?![\d,])/g, "1599");
  // European period format (de, it, nl, pt)
  const baseName = path.basename(rel);
  if (["de.ts", "it.ts", "nl.ts", "pt.ts"].includes(baseName)) {
    content = content.replace(/1\.299/g, "1.599");
  }
  // French uses ASCII space as thousands separator: "1 299"
  if (baseName === "fr.ts") {
    content = content.replace(/1 299/g, "1 599");
  }
  if (content !== before) {
    const count =
      (before.match(/1,299/g)?.length ?? 0) +
      (before.match(/(?<![\d,])1299(?![\d,])/g)?.length ?? 0) +
      (before.match(/1\.299/g)?.length ?? 0) +
      (before.match(/1 299/g)?.length ?? 0);
    totalReplaced += count;
    await writeFile(abs, content, "utf8");
    console.log(`  ${rel}: ${count} replacement(s)`);
  }
}
console.log(`\nTotal: ${totalReplaced} replacement(s) across ${TARGETS.length} files.`);
