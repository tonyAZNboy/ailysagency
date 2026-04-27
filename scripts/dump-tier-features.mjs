// Dump current EN tier feature keys to JSON for batched translation.
// These are the 21 keys that were CHANGED or NEW in the Phase 1 tier rebuild.
//
// Usage: node scripts/dump-tier-features.mjs > docs/tier-features-en.json

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-tier-dump");
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

const en = await load("en.ts");

const CHANGED_OR_NEW_KEYS = [
  "tier0Feat2",
  "tier0Feat4",
  "tier1Feat2",
  "tier1Feat3",
  "tier1Feat4",
  "tier1Feat6",
  "tier1Feat7",
  "tier2Feat2",
  "tier2Feat3",
  "tier2Feat4",
  "tier2Feat5",
  "tier2Feat6",
  "tier2Feat7",
  "tier2Feat8",
  "tier3Feat2",
  "tier3Feat3",
  "tier3Feat4",
  "tier3Feat5",
  "tier3Feat6",
  "tier3Feat8",
  "tier3Feat9",
];

const out = {};
for (const k of CHANGED_OR_NEW_KEYS) {
  out[k] = en.services[k];
}
console.log(JSON.stringify(out, null, 2));
