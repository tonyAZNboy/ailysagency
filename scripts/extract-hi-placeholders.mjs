// Extract HI placeholders (keys where HI value === EN value) with their EN source values.
// Output: { "key.path": "English source string", ... }
//
// Usage: node scripts/extract-hi-placeholders.mjs > /tmp/hi-placeholders.json

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-extract");
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
  return mod[m[1]];
}

function flatten(obj, prefix = "") {
  const out = new Map();
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const [k2, v2] of flatten(v, key)) out.set(k2, v2);
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        const akey = `${key}[${i}]`;
        if (item && typeof item === "object") {
          for (const [k3, v3] of flatten(item, akey)) out.set(k3, v3);
        } else out.set(akey, item);
      });
    } else out.set(key, v);
  }
  return out;
}

const en = flatten(await load("en.ts"));
const hi = flatten(await load("hi.ts"));

const placeholders = {};
for (const [k, enVal] of en) {
  if (typeof enVal === "string" && hi.get(k) === enVal && enVal.length > 8) {
    placeholders[k] = enVal;
  }
}
console.log(JSON.stringify(placeholders, null, 2));
