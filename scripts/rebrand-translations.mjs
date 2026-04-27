// Rebrand legacy Reviuzy strings to AiLys Agency across all translation files.
// Preserves structural identifier keys (colReviuzy, r1Reviuzy..r6Reviuzy) which
// are part of the TypeScript schema and renaming would be a large refactor.
//
// Strategy: only modify text that lives between double quotes (string values).
// Inside those values:
//   "Reviuzy"           → "AiLys Agency"
//   "Reviuzy Roulette™" → "AiLys Roulette™"
//   anywhere mid-string → "AiLys Agency"
//
// Skip keys (left side of colon).

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
        .replace(/Reviuzy['']s/g, "AiLys Agency's") // possessive
        .replace(/Reviuzy/g, "AiLys Agency");
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
