// Merge docs/tier-features-translated.json into the 15 non-EN locale .ts files.
// Each entry under services.tier{N}Feat{X} is updated (or added).
//
// Usage: node scripts/merge-tier-translations.mjs

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-merge-tier");
await mkdir(TMP, { recursive: true });

async function load(file) {
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
const serializeString = (s) => JSON.stringify(s);

function serialize(value, indent = "  ", depth = 1) {
  if (value === null) return "null";
  if (typeof value === "string") return serializeString(value);
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

const translations = JSON.parse(
  await readFile(path.resolve(__dirname, "../docs/tier-features-translated.json"), "utf8"),
);

let totalApplied = 0;
for (const [locale, entries] of Object.entries(translations)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  if (!obj.services) {
    console.error(`[${locale}] no services key, skipping`);
    continue;
  }
  for (const [k, v] of Object.entries(entries)) {
    obj.services[k] = v;
  }
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  totalApplied += Object.keys(entries).length;
  console.log(`  ${file}: ${Object.keys(entries).length} keys applied`);
}
console.log(`\nTotal: ${totalApplied} translations across 15 locales.`);
