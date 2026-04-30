// Rebrand Reviuzy public-facing brand mentions to AiLys Automation across all
// translation files (Phase E.1.1, option b: cacher Reviuzy backend, public surface
// presents single AiLys brand). Preserves structural TS identifier keys
// (colReviuzy, r1Reviuzy..r6Reviuzy) which are part of the schema and renaming
// would cascade to every consumer component.
//
// Strategy: only modify text inside string literal VALUES (between " or `).
// Inside those values:
//   "Reviuzy Roulette" : "AiLys Roulette"      (legacy product name preserved as AiLys-branded)
//   "Reviuzy's"        : "AiLys Automation's"  (possessive)
//   "Reviuzy"          : "AiLys Automation"    (default replacement)
//
// Skip TS keys (identifiers on left side of colon).

import { readFile, writeFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");

const files = (await readdir(TRANS_DIR)).filter((f) => f.endsWith(".ts"));

let totalReplacements = 0;

for (const file of files) {
  const fullPath = path.join(TRANS_DIR, file);
  const raw = await readFile(fullPath, "utf8");

  // Walk the file character-by-character and only replace inside string literals
  // (i.e. between unescaped " or ` quotes).
  let out = "";
  let i = 0;
  let fileReplacements = 0;
  while (i < raw.length) {
    const ch = raw[i];
    if (ch === '"' || ch === "`") {
      // Find end of string literal
      const quote = ch;
      let j = i + 1;
      while (j < raw.length) {
        if (raw[j] === "\\") { j += 2; continue; }
        if (raw[j] === quote) break;
        j++;
      }
      const literal = raw.slice(i + 1, j);
      // Replace within literal
      let replaced = literal;
      // Avoid touching the literal "Reviuzy" used as a column header value — but
      // since we want to fully rebrand, replace it too.
      const before = replaced;
      replaced = replaced
        .replace(/Reviuzy Roulette/g, "AiLys Roulette")
        .replace(/Reviuzy['']s/g, "AiLys Automation's") // possessive
        .replace(/Reviuzy/g, "AiLys Automation");
      if (replaced !== before) {
        const matches = before.match(/Reviuzy/g);
        fileReplacements += matches ? matches.length : 0;
      }
      out += quote + replaced + quote;
      i = j + 1;
    } else {
      out += ch;
      i++;
    }
  }

  if (fileReplacements > 0) {
    await writeFile(fullPath, out, "utf8");
    console.log(`${file}: ${fileReplacements} replacement(s)`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`${file}: 0 (skipped)`);
  }
}

console.log(`\nTotal: ${totalReplacements} replacements across ${files.length} files.`);
