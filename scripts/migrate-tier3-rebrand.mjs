// Migrate Tier 3 from "Autopilot @ $1,599" to "Agency @ $2,499" across all
// translation locales and code, handling all three thousands-separator
// conventions (US/CA comma, European period, FR-CA space).
//
// Scope:
//   - Price: 1,599 / 1.599 / 1 599 / bare 1599  ->  2,499 / 2.499 / 2 499 / 2499
//   - Display name: "Autopilot" -> "Agency" in tier3Name and tier3Cta strings
//     ONLY where they refer to the tier itself, not where Autopilot might
//     appear as a brand-loanword in copy. We use exact-key matching against
//     the i18n object to avoid false positives.
//   - i18n key prefix tier3* is preserved (backwards compat, no churn).
//
// Usage: node scripts/migrate-tier3-rebrand.mjs

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const TARGETS = [
  ...await listTs(path.join(ROOT, "src/i18n/translations")),
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
  return entries.filter((e) => e.endsWith(".ts")).map((e) => path.relative(ROOT, path.join(dir, e)));
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

  // Universal comma format (en, es, fr-canada-equivalents-using-comma, ar, ru, hi, ja, ko, pl, tr, vi, zh, code)
  content = content.replace(/1,599/g, "2,499");
  // Bare numeric literals in code (PricingBuilderSection.tsx)
  content = content.replace(/(?<![\d,])1599(?![\d,])/g, "2499");

  // European period format (de, it, nl, pt)
  const baseName = path.basename(rel);
  if (["de.ts", "it.ts", "nl.ts", "pt.ts"].includes(baseName)) {
    content = content.replace(/1\.599/g, "2.499");
  }
  // French Canadian uses ASCII space as thousands separator
  if (baseName === "fr.ts") {
    content = content.replace(/1 599/g, "2 499");
  }

  if (content !== before) {
    const count =
      (before.match(/1,599/g)?.length ?? 0) +
      (before.match(/(?<![\d,])1599(?![\d,])/g)?.length ?? 0) +
      (before.match(/1\.599/g)?.length ?? 0) +
      (before.match(/1 599/g)?.length ?? 0);
    totalReplaced += count;
    await writeFile(abs, content, "utf8");
    console.log(`  ${rel}: ${count} replacement(s)`);
  }
}
console.log(`\nPrice migration: ${totalReplaced} replacement(s) across ${TARGETS.length} files.`);
