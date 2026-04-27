// Deep translation parity audit.
//
// Loads each locale via dynamic import (real eval, not regex), flattens the
// object into dot-paths, diffs against EN, prints per-locale missing-key
// summaries.
//
// Usage:
//   node scripts/audit-translations-deep.mjs
//
// Exit code: 0 if all locales 100% parity, 1 otherwise.

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP_DIR = path.resolve(__dirname, "../node_modules/.cache/i18n-audit");

await import("node:fs/promises").then((m) => m.mkdir(TMP_DIR, { recursive: true }));

const files = (await readdir(TRANS_DIR)).filter((f) => f.endsWith(".ts"));

// Convert each .ts file into a tiny .mjs that we can `import()` to get the
// real object. This is safer than regex-parsing and handles all the JS
// expression edge cases.
async function loadLocale(file) {
  const code = await readFile(path.join(TRANS_DIR, file), "utf8");
  // Strip TypeScript types and `as const`/type annotations
  const stripped = code
    .replace(/export const (\w+) =/g, "export const $1 =")
    .replace(/export type \w+\s*=[^;]+;/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/as const/g, "")
    .replace(/:\s*[A-Z][\w<>[\]| ]+(\[\])?\s*=/g, " =");

  const tmpPath = path.join(TMP_DIR, file.replace(".ts", ".mjs"));
  await writeFile(tmpPath, stripped, "utf8");
  // Add cache-buster to bypass module cache between runs
  const url = `file://${tmpPath.replace(/\\/g, "/")}?t=${Date.now()}`;
  const mod = await import(url);
  // Find the named export
  const code2 = (await readFile(path.join(TRANS_DIR, file), "utf8")).match(
    /export const (\w+)\s*=/,
  );
  const name = code2?.[1];
  return mod[name];
}

function flatten(obj, prefix = "") {
  const out = new Map();
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const [k2, v2] of flatten(v, key)) {
        out.set(k2, v2);
      }
    } else if (Array.isArray(v)) {
      // Treat arrays as leaves keyed by index
      v.forEach((item, i) => {
        const akey = `${key}[${i}]`;
        if (item && typeof item === "object") {
          for (const [k3, v3] of flatten(item, akey)) {
            out.set(k3, v3);
          }
        } else {
          out.set(akey, item);
        }
      });
    } else {
      out.set(key, v);
    }
  }
  return out;
}

const locales = {};
for (const file of files) {
  const code = file.replace(".ts", "");
  try {
    const obj = await loadLocale(file);
    locales[code] = flatten(obj);
  } catch (err) {
    console.error(`FAILED to load ${file}:`, err.message);
    locales[code] = null;
  }
}

const en = locales["en"];
if (!en) {
  console.error("Could not load en.ts. Aborting.");
  process.exit(1);
}

console.log(`\n=== EN canonical: ${en.size} total keys ===\n`);

const MAJORS = ["fr", "es", "zh", "ar", "ru"];
const SECONDARIES = ["de", "hi", "it", "ja", "ko", "nl", "pl", "pt", "tr", "vi"];

let totalMissing = 0;
const report = {};

for (const code of [...MAJORS, ...SECONDARIES]) {
  const loc = locales[code];
  if (!loc) {
    console.log(`${code}: FAILED TO LOAD`);
    continue;
  }
  const missing = [];
  const enValueCopy = []; // keys present but holding the literal EN string (placeholder)
  for (const [key, enVal] of en) {
    if (!loc.has(key)) {
      missing.push(key);
    } else if (
      typeof enVal === "string" &&
      typeof loc.get(key) === "string" &&
      loc.get(key) === enVal &&
      enVal.length > 8 // skip short shared strings like brand acronyms
    ) {
      enValueCopy.push(key);
    }
  }
  const tier = MAJORS.includes(code) ? "MAJOR" : "secondary";
  const pct = ((1 - missing.length / en.size) * 100).toFixed(1);
  console.log(
    `${code.padEnd(4)} ${tier.padEnd(10)} ${pct}%   missing=${missing.length}   placeholder=${enValueCopy.length}`,
  );
  report[code] = { missing, enValueCopy, totalKeys: loc.size, pct };
  totalMissing += missing.length;
}

console.log(`\n=== Summary ===`);
console.log(`Total missing keys across 15 non-EN locales: ${totalMissing}`);

// Print first 10 missing keys for FR (highest priority)
if (report.fr?.missing?.length) {
  console.log(`\n=== First 20 missing FR keys ===`);
  report.fr.missing.slice(0, 20).forEach((k) => console.log(`  ${k}`));
}

// Print which are still EN-placeholder for FR
if (report.fr?.enValueCopy?.length) {
  console.log(
    `\n=== First 20 FR keys still holding EN placeholder values ===`,
  );
  report.fr.enValueCopy.slice(0, 20).forEach((k) => console.log(`  ${k}`));
}

// Write detailed report
const detailedReport = {
  enKeyCount: en.size,
  locales: report,
  generatedAt: new Date().toISOString(),
};
await writeFile(
  path.join(__dirname, "..", "docs", "i18n-audit-report.json"),
  JSON.stringify(detailedReport, null, 2),
  "utf8",
);
console.log(`\nFull report written to docs/i18n-audit-report.json`);

process.exit(totalMissing === 0 ? 0 : 1);
