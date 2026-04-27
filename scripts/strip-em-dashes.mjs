// Strip em-dashes from all translation files (banned by user).
// Replacement strategy:
//   "——" (Chinese double) → "，" (Chinese comma) or "。" mid-sentence
//   " — " (latin with spaces) → ", " (comma + space)
//   "— " (em-dash + space, sentence start) → ""
//   " —" (space + em-dash) → ","
//   "—" (no surrounding spaces) → "," (rare)
// Only modifies values inside string literals; key names stay untouched.

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");

const files = (await readdir(TRANS_DIR)).filter((f) => f.endsWith(".ts"));

let totalReplacements = 0;

for (const file of files) {
  const fullPath = path.join(TRANS_DIR, file);
  const raw = await readFile(fullPath, "utf8");

  // Walk the file char-by-char and only modify content inside string literals.
  let out = "";
  let i = 0;
  let fileReplacements = 0;

  while (i < raw.length) {
    const ch = raw[i];
    if (ch === '"' || ch === "`" || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < raw.length) {
        if (raw[j] === "\\") { j += 2; continue; }
        if (raw[j] === quote) break;
        j++;
      }
      const literal = raw.slice(i + 1, j);
      let replaced = literal;
      // Order matters: do double-em-dash first
      replaced = replaced
        .replace(/——/g, "，")          // Chinese double em-dash → Chinese comma
        .replace(/ — /g, ", ")         // Latin em-dash with surrounding spaces → comma + space
        .replace(/— /g, "")            // Em-dash leading clause → drop
        .replace(/ —/g, ",")           // Trailing em-dash → comma
        .replace(/—/g, ",");           // Stray em-dash → comma

      const matches = literal.match(/—/g);
      fileReplacements += matches ? matches.length : 0;
      out += quote + replaced + quote;
      i = j + 1;
    } else {
      out += ch;
      i++;
    }
  }

  if (fileReplacements > 0) {
    await writeFile(fullPath, out, "utf8");
    console.log(`${file}: ${fileReplacements} em-dash(es) replaced`);
    totalReplacements += fileReplacements;
  }
}

console.log(`\nTotal: ${totalReplacements} em-dashes replaced across ${files.length} files.`);
