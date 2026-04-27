// Add "technical SEO" to footer.description across the 15 secondary
// locales. EN was updated in en.ts directly. The user ("ou est le SEO
// classic?") wanted SEO surfaced alongside AEO/GEO/E-E-A-T so visitors
// understand AiLys does technical SEO foundations too, not just AI work.
//
// Brand names + acronyms (AiLys, ChatGPT, Perplexity, Claude, Gemini,
// Google AIO, Bing Copilot, SEO, AEO, GEO, E-E-A-T) stay Latin per
// CLAUDE.md hard rule #4. No em-dashes per hard rule #2.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-footer-seo");
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
  fr: "AiLys Agency est une agence québécoise de réputation en recherche IA. Nous faisons citer les commerces locaux par ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot grâce au travail SEO technique, AEO, GEO et E-E-A-T.",
  es: "AiLys Agency es una agencia de reputación en búsqueda IA basada en Quebec. Conseguimos que los negocios locales sean citados por ChatGPT, Perplexity, Claude, Gemini, Google AIO y Bing Copilot mediante trabajo SEO técnico, AEO, GEO y E-E-A-T.",
  zh: "AiLys Agency 是一家位于魁北克的 AI 搜索声誉机构。我们通过技术 SEO、AEO、GEO 和 E-E-A-T 工作,让本地商家被 ChatGPT、Perplexity、Claude、Gemini、Google AIO 和 Bing Copilot 引用。",
  ar: "AiLys Agency وكالة سمعة في البحث بالذكاء الاصطناعي مقرها Quebec. نحرص على أن تُذكر الأعمال المحلية في إجابات ChatGPT و Perplexity و Claude و Gemini و Google AIO و Bing Copilot عبر عمل SEO تقني و AEO و GEO و E-E-A-T.",
  ru: "AiLys Agency, агентство репутации в AI-поиске из Квебека. Мы добиваемся упоминания локальных бизнесов в ответах ChatGPT, Perplexity, Claude, Gemini, Google AIO и Bing Copilot через технический SEO, AEO, GEO и E-E-A-T.",
  de: "AiLys Agency ist eine in Quebec ansässige Agentur für Reputation in der KI-Suche. Wir sorgen dafür, dass lokale Unternehmen von ChatGPT, Perplexity, Claude, Gemini, Google AIO und Bing Copilot zitiert werden, durch technisches SEO, AEO, GEO und E-E-A-T Arbeit.",
  hi: "AiLys Agency एक Quebec-स्थित AI सर्च रेपुटेशन एजेंसी है। हम तकनीकी SEO, AEO, GEO और E-E-A-T कार्य के माध्यम से ChatGPT, Perplexity, Claude, Gemini, Google AIO और Bing Copilot द्वारा स्थानीय व्यवसायों को उद्धृत कराते हैं।",
  it: "AiLys Agency è un'agenzia di reputazione nella ricerca AI con sede in Quebec. Facciamo citare le attività locali da ChatGPT, Perplexity, Claude, Gemini, Google AIO e Bing Copilot attraverso lavoro SEO tecnico, AEO, GEO e E-E-A-T.",
  ja: "AiLys Agency は Quebec を拠点とする AI 検索レピュテーション・エージェンシーです。テクニカル SEO・AEO・GEO・E-E-A-T の取り組みを通じて、ChatGPT、Perplexity、Claude、Gemini、Google AIO、Bing Copilot にローカルビジネスを引用させます。",
  ko: "AiLys Agency는 Quebec 기반의 AI 검색 평판 에이전시입니다. 테크니컬 SEO, AEO, GEO, E-E-A-T 작업을 통해 ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot이 로컬 비즈니스를 인용하도록 만듭니다.",
  nl: "AiLys Agency is een in Quebec gevestigd reputatiebureau voor AI-zoekopdrachten. We laten lokale bedrijven citeren door ChatGPT, Perplexity, Claude, Gemini, Google AIO en Bing Copilot via technische SEO, AEO, GEO en E-E-A-T werk.",
  pl: "AiLys Agency to agencja reputacji w wyszukiwaniu AI z siedzibą w Quebec. Sprawiamy, że lokalne firmy są cytowane przez ChatGPT, Perplexity, Claude, Gemini, Google AIO i Bing Copilot dzięki pracy technicznej SEO, AEO, GEO i E-E-A-T.",
  pt: "AiLys Agency é uma agência de reputação em busca por IA sediada em Quebec. Fazemos com que negócios locais sejam citados pelo ChatGPT, Perplexity, Claude, Gemini, Google AIO e Bing Copilot através de SEO técnico, AEO, GEO e E-E-A-T.",
  tr: "AiLys Agency, Quebec merkezli bir AI arama itibarı ajansıdır. Yerel işletmelerin teknik SEO, AEO, GEO ve E-E-A-T çalışmaları yoluyla ChatGPT, Perplexity, Claude, Gemini, Google AIO ve Bing Copilot tarafından alıntılanmasını sağlıyoruz.",
  vi: "AiLys Agency là agency danh tiếng tìm kiếm AI có trụ sở tại Quebec. Chúng tôi giúp doanh nghiệp địa phương được trích dẫn bởi ChatGPT, Perplexity, Claude, Gemini, Google AIO và Bing Copilot thông qua công việc SEO kỹ thuật, AEO, GEO và E-E-A-T.",
};

let total = 0;
for (const [locale, value] of Object.entries(TRANSLATIONS)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  if (!obj.footer) obj.footer = {};
  obj.footer.description = value;
  total++;
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: footer.description updated`);
}
console.log(`\nTotal: ${total} locales updated.`);
