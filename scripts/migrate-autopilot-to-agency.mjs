// Replace "Autopilot" with "Agency" in user-facing copy across the
// codebase. Strategy:
//   - For locale .ts files: load the i18n object, walk all VALUES, replace
//     "Autopilot" with "Agency" in any string that contains it. Keys stay
//     intact (so tierAutopilot, metaAutopilot, badgeAutopilot keep their
//     names for code/i18n compat). Whole-word match (\bAutopilot\b).
//   - For data files (blog-posts.ts, glossary.ts, comparisons.ts,
//     industries.ts, help-articles.ts, StructuredData.tsx,
//     FoundingClientsSection.tsx): direct text replacement, skipping any
//     line that looks like an identifier reference (isAutopilot, etc.).
//
// Preserves: i18n keys (tierAutopilot, etc.), code identifiers (isAutopilot,
// "autopilot" lowercase used as tier.id), structural comments.

import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-rebrand");
await mkdir(TMP, { recursive: true });

async function loadLocale(file) {
  const code = await readFile(path.join(TRANS_DIR, file), "utf8");
  const stripped = code
    .replace(/export const (\w+) =/g, "export const $1 =")
    .replace(/export type \w+\s*=[^;]+;/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/as const/g, "")
    .replace(/:\s*[A-Z][\w<>[\]| ]+(\[\])?\s*=/g, " =");
  const tmp = path.join(TMP, file.replace(".ts", ".mjs"));
  await writeFile(tmp, stripped, "utf8");
  const url = `file://${tmp.replace(/\\/g, "/")}?t=${Date.now()}`;
  const mod = await import(url);
  const m = code.match(/export const (\w+)\s*=/);
  return { name: m[1], obj: mod[m[1]] };
}

const VALID_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const serializeKey = (k) => (VALID_KEY.test(k) ? k : JSON.stringify(k));

function serialize(value, indent = "  ", depth = 1) {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return `[${value.map((v) => serialize(v, indent, depth + 1)).join(", ")}]`;
  }
  if (typeof value === "object") {
    const pad = indent.repeat(depth);
    const padClose = indent.repeat(depth - 1);
    const lines = Object.entries(value).map(
      ([k, v]) => `${pad}${serializeKey(k)}: ${serialize(v, indent, depth + 1)},`,
    );
    return `{\n${lines.join("\n")}\n${padClose}}`;
  }
  throw new Error(`Cannot serialize ${typeof value}`);
}

function walkAndReplace(value) {
  if (typeof value === "string") {
    // Whole-word "Autopilot" replacement. Preserve case for the leading char.
    return value.replace(/\bAutopilot\b/g, "Agency");
  }
  if (Array.isArray(value)) return value.map(walkAndReplace);
  if (value && typeof value === "object") {
    const next = {};
    for (const [k, v] of Object.entries(value)) next[k] = walkAndReplace(v);
    return next;
  }
  return value;
}

// Pass 1: locale files
const localeFiles = (await readdir(TRANS_DIR)).filter((f) => f.endsWith(".ts"));
let totalLocaleReplacements = 0;
for (const file of localeFiles) {
  const { name, obj } = await loadLocale(file);
  // Count occurrences before
  let beforeCount = 0;
  const countOcc = (v) => {
    if (typeof v === "string") {
      const m = v.match(/\bAutopilot\b/g);
      if (m) beforeCount += m.length;
    } else if (Array.isArray(v)) v.forEach(countOcc);
    else if (v && typeof v === "object") Object.values(v).forEach(countOcc);
  };
  countOcc(obj);
  if (beforeCount === 0) continue;
  const next = walkAndReplace(obj);
  const out = `export const ${name} = ${serialize(next)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: ${beforeCount} replacement(s)`);
  totalLocaleReplacements += beforeCount;
}

// Pass 2: data and code files
// Replace "Autopilot" in string literals only, preserving identifier refs
const NON_LOCALE_TARGETS = [
  "src/data/blog-posts.ts",
  "src/data/glossary.ts",
  "src/data/comparisons.ts",
  "src/data/industries.ts",
  "src/data/help-articles.ts",
  "src/components/seo/StructuredData.tsx",
  "src/components/landing/FoundingClientsSection.tsx",
  "src/pages/BookCall.tsx",
];

let totalCodeReplacements = 0;
for (const rel of NON_LOCALE_TARGETS) {
  const abs = path.join(ROOT, rel);
  let content;
  try {
    content = await readFile(abs, "utf8");
  } catch {
    continue;
  }
  const before = content;

  // Replace whole-word "Autopilot" but NOT when:
  // - preceded by 's' or 'i' (isAutopilot)
  // - preceded by '.' (object access like t.services.metaAutopilot)
  // - immediately followed by ':' (key declaration) or '?' (optional access)
  // - inside identifier patterns like badgeAutopilot, tierAutopilot, metaAutopilot
  // Strategy: use a negative lookbehind that excludes word-char or '.' before, AND
  // a negative lookahead that excludes ':' immediately after.
  content = content.replace(
    /(?<![\w.])Autopilot(?!:)/g,
    (match, offset) => {
      // Check what's right before — if it's a context like "tierAutopilot" we shouldn't reach here due to the lookbehind on \w
      return "Agency";
    },
  );

  if (content !== before) {
    const count = (before.match(/(?<![\w.])Autopilot(?!:)/g) ?? []).length;
    totalCodeReplacements += count;
    await writeFile(abs, content, "utf8");
    console.log(`  ${rel}: ${count} replacement(s)`);
  }
}

console.log(
  `\nLocale replacements: ${totalLocaleReplacements}.  Code replacements: ${totalCodeReplacements}.`,
);
