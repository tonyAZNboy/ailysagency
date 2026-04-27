// Dump current EN+major value for each placeholder key, to drive translation.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-dump");
await mkdir(TMP, { recursive: true });

async function load(file) {
  const code = await readFile(path.join(TRANS_DIR, file), "utf8");
  const stripped = code
    .replace(/export const (\w+) =/g, "export const $1 =")
    .replace(/export type \w+\s*=[^;]+;/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/as const/g, "");
  const tmp = path.join(TMP, file.replace(".ts", ".mjs"));
  await writeFile(tmp, stripped, "utf8");
  const mod = await import(`file://${tmp.replace(/\\/g, "/")}?t=${Date.now()}`);
  const m = code.match(/export const (\w+)\s*=/);
  return mod[m[1]];
}

function getVal(obj, dotPath) {
  return dotPath.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

const en = await load("en.ts");
const report = JSON.parse(await readFile(path.resolve(__dirname, "../docs/i18n-audit-report.json"), "utf8"));

const out = {};
for (const code of ["fr", "es", "zh", "ar", "ru"]) {
  out[code] = {};
  for (const k of report.locales[code].enValueCopy) {
    out[code][k] = getVal(en, k);
  }
}
console.log(JSON.stringify(out, null, 2));
