#!/usr/bin/env node
/**
 * Regression guard: no inline duplicates of shared lib helpers.
 *
 * After 10 sub-phases of mechanical extraction (PRs #139-#144) we
 * now have 9 shared libs in functions/lib/ that consolidate what
 * used to be byte-equivalent inline copies across the surface. This
 * smoke prevents any future session from re-introducing an inline
 * copy under a different name or in a new file.
 *
 * Each entry below maps a function name to the canonical lib file
 * that owns it. The script greps every functions/**\/*.ts file (except
 * the canonical owner) for `function <name>` declarations. Any match
 * fails the gate.
 *
 * To add a new entry: ship the extraction PR first, then add the
 * (pattern, canonical) tuple here in the same commit.
 *
 * Run: node scripts/smoke-no-inline-duplicates.mjs
 * Exits 0 if no duplicates found, 1 otherwise.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const bold = "\x1b[1m";

// (functionName, canonicalFile, libImport) tuples. Order doesn't matter.
const FORBIDDEN = [
  { name: "escapeHtml", canonical: "functions/lib/htmlEscape.ts", lib: "../lib/htmlEscape" },
  { name: "clip", canonical: "functions/lib/stringClip.ts", lib: "../lib/stringClip" },
  { name: "clipUntrimmed", canonical: "functions/lib/stringClip.ts", lib: "../lib/stringClip" },
  { name: "isValidEmail", canonical: "functions/lib/email.ts", lib: "../lib/email" },
  { name: "isDisposableEmail", canonical: "functions/lib/email.ts", lib: "../lib/email" },
  { name: "isAllowedOrigin", canonical: "functions/lib/origin.ts", lib: "../lib/origin" },
  { name: "sha256Hex", canonical: "functions/lib/crypto.ts", lib: "../lib/crypto" },
  { name: "bytesToHex", canonical: "functions/lib/crypto.ts", lib: "../lib/crypto" },
  { name: "hexToBytes", canonical: "functions/lib/hmac.ts", lib: "../lib/hmac" },
  { name: "importHmacKey", canonical: "functions/lib/hmac.ts", lib: "../lib/hmac" },
  { name: "constantTimeEqualBytes", canonical: "functions/lib/hmac.ts", lib: "../lib/hmac" },
  { name: "jsonResponse", canonical: "functions/lib/jsonResponse.ts", lib: "../lib/jsonResponse" },
  { name: "makeEmit", canonical: "functions/lib/structuredLog.ts", lib: "../lib/structuredLog" },
  { name: "insertSupabaseRow", canonical: "functions/lib/supabaseInsert.ts", lib: "../lib/supabaseInsert" },
  // emit is a per-endpoint binding (const emit = makeEmit('foo')), so a
  // function declaration of `emit` is suspicious. But scripts/admin tests
  // also use emit names; we only check the functions/ tree.
  {
    name: "emit",
    canonical: "functions/lib/structuredLog.ts",
    lib: "../lib/structuredLog",
    note: "Use `const emit = makeEmit('component')` instead of declaring an inline emit function.",
  },
];

const repoRoot = fileURLToPath(new URL("..", import.meta.url)).replace(/[\\/]$/, "");
const functionsDir = join(repoRoot, "functions");

function listTsFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...listTsFiles(full));
    } else if (entry.endsWith(".ts")) {
      out.push(full);
    }
  }
  return out;
}

const tsFiles = listTsFiles(functionsDir);

let violations = 0;
const grouped = new Map();
for (const file of tsFiles) {
  const rel = file.slice(repoRoot.length + 1).replaceAll(sep, "/");
  const content = readFileSync(file, "utf8");
  for (const entry of FORBIDDEN) {
    if (rel === entry.canonical || rel.endsWith("/" + entry.canonical)) continue; // canonical owner is allowed
    // Match `function name` or `async function name` at line start
    // (top-level decls). Don't match imports, calls, or property names.
    const re = new RegExp(`^(?:export\\s+)?(?:async\\s+)?function\\s+${entry.name}\\b`, "m");
    if (re.test(content)) {
      violations++;
      const list = grouped.get(rel) ?? [];
      list.push(entry);
      grouped.set(rel, list);
    }
  }
}

if (violations === 0) {
  console.log(`${green}PASS${reset}  no inline duplicates of ${FORBIDDEN.length} shared lib helpers across ${tsFiles.length} files`);
  console.log(`\n${bold}1/1 cases pass${reset}`);
  process.exit(0);
}

console.error(`${red}${bold}${violations} inline duplicate(s) detected${reset}\n`);
for (const [file, entries] of grouped) {
  console.error(`${red}${file}${reset}`);
  for (const e of entries) {
    console.error(
      `  - declares inline ${bold}${e.name}${reset}; use ${green}import { ${e.name} } from "${e.lib}"${reset}`,
    );
    if (e.note) console.error(`    ${e.note}`);
  }
}
console.error(
  `\nIf the duplicate is intentional (e.g., the inline version has different semantics), either:`,
);
console.error(`  1. Add a new variant to the canonical lib and import it (clip vs clipUntrimmed pattern), or`);
console.error(`  2. Remove this entry from FORBIDDEN in scripts/smoke-no-inline-duplicates.mjs with rationale.`);
process.exit(1);
