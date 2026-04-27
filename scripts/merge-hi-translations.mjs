// Merge docs/hi-translations.json into src/i18n/translations/hi.ts.
//
// 1. Loads existing hi.ts as a JS object (via the same loader pattern as audit).
// 2. For each key in hi-translations.json, sets the value at the dot-path.
// 3. Re-serializes to TypeScript using unquoted-key-where-valid object syntax.
//
// Usage: node scripts/merge-hi-translations.mjs

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-merge");
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

function setByPath(obj, dotPath, value) {
  const parts = dotPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] == null || typeof cur[parts[i]] !== "object") {
      throw new Error(`Bad path ${dotPath} at segment ${parts[i]}`);
    }
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

const VALID_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function serializeKey(k) {
  return VALID_KEY.test(k) ? k : JSON.stringify(k);
}

function serializeString(s) {
  // JSON.stringify gives correct JS string literal for double-quoted form.
  return JSON.stringify(s);
}

function serialize(value, indent = "  ", depth = 1) {
  if (value === null) return "null";
  if (typeof value === "string") return serializeString(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    const inner = value.map((v) => serialize(v, indent, depth + 1)).join(", ");
    return `[${inner}]`;
  }
  if (typeof value === "object") {
    const pad = indent.repeat(depth);
    const padClose = indent.repeat(depth - 1);
    const entries = Object.entries(value);
    const lines = entries.map(
      ([k, v]) => `${pad}${serializeKey(k)}: ${serialize(v, indent, depth + 1)},`,
    );
    return `{\n${lines.join("\n")}\n${padClose}}`;
  }
  throw new Error(`Cannot serialize value of type ${typeof value}`);
}

const { name, obj: hi } = await load("hi.ts");
const translations = JSON.parse(
  await readFile(path.resolve(__dirname, "../docs/hi-translations.json"), "utf8"),
);

let applied = 0;
for (const [k, v] of Object.entries(translations)) {
  setByPath(hi, k, v);
  applied++;
}

const out = `export const ${name} = ${serialize(hi)};\n`;
await writeFile(path.join(TRANS_DIR, "hi.ts"), out, "utf8");
console.log(`Applied ${applied} translations to hi.ts`);
