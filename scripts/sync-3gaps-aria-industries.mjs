// Close the 3 gaps from the Explore agent sweep.
// 2 keys × 15 locales = 30 strings:
//   - heroAuditCard.ariaEmail (was hardcoded "Email" in HeroAuditCard.tsx)
//   - footer.industries (was hardcoded "Industries" in Footer.tsx services array)
//
// (3rd gap — HeroAnswerEngineVisual hardcoded strings — handled by deleting
//  the dead component, no i18n needed.)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-3gaps");
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
function serialize(value, indent = "  ", depth = 1) {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return `[${value.map((v) => serialize(v, indent, depth + 1)).join(", ")}]`;
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

const TRANSLATIONS = {
  fr: { ariaEmail: "Courriel", industries: "Industries" },
  es: { ariaEmail: "Correo electrónico", industries: "Industrias" },
  zh: { ariaEmail: "邮箱", industries: "行业" },
  ar: { ariaEmail: "البريد الإلكتروني", industries: "الصناعات" },
  ru: { ariaEmail: "Электронная почта", industries: "Отрасли" },
  de: { ariaEmail: "E-Mail", industries: "Branchen" },
  hi: { ariaEmail: "ईमेल", industries: "उद्योग" },
  it: { ariaEmail: "Email", industries: "Settori" },
  ja: { ariaEmail: "メール", industries: "業種" },
  ko: { ariaEmail: "이메일", industries: "업종" },
  nl: { ariaEmail: "E-mail", industries: "Sectoren" },
  pl: { ariaEmail: "E-mail", industries: "Branże" },
  pt: { ariaEmail: "E-mail", industries: "Setores" },
  tr: { ariaEmail: "E-posta", industries: "Sektörler" },
  vi: { ariaEmail: "Email", industries: "Ngành" },
};

let total = 0;
for (const [locale, entries] of Object.entries(TRANSLATIONS)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  if (!obj.heroAuditCard) obj.heroAuditCard = {};
  if (!obj.footer) obj.footer = {};
  obj.heroAuditCard.ariaEmail = entries.ariaEmail;
  obj.footer.industries = entries.industries;
  total += 2;
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: ariaEmail + footer.industries`);
}
console.log(`\nTotal: ${total} strings updated.`);
