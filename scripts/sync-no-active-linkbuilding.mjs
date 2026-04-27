// Pull "active link-building" promises out of the offer across 15
// secondary locales. The user clarified that AiLys does not (yet) have
// the expertise or staff to deliver active backlinks, Wikipedia editing,
// Reddit participation, or journalist outreach. Wikidata structured-data
// work IS kept (semi-automatable via MediaWiki API).
//
// This batch updates the visible-on-home tier features:
//   tier1Feat4 (Core $600)
//   tier2Feat3, tier2Feat4 (Growth $1,200)
//
// 3 keys × 15 locales = 45 strings.
//
// Brand names (AiLys, GBP, NFC, AEO, GEO, E-E-A-T, NAP, AI, Wikidata)
// stay Latin per CLAUDE.md hard rule #4.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-no-link");
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
  fr: {
    tier1Feat4: "Citations 5 par mois avec sweep de cohérence NAP",
    tier2Feat3: "Autorité d'entité GEO via Wikidata structuré + liaison d'IDs externes",
    tier2Feat4: "Sondes AI Visibility hebdomadaires + attribution UTM AI Traffic",
  },
  es: {
    tier1Feat4: "Construcción de citaciones 5 por mes con barrido de consistencia NAP",
    tier2Feat3: "Autoridad de entidad GEO vía Wikidata estructurado + enlace de IDs externos",
    tier2Feat4: "Sondeos AI Visibility semanales + atribución UTM AI Traffic",
  },
  zh: {
    tier1Feat4: "每月 5 条引用 + NAP 一致性扫描",
    tier2Feat3: "通过 Wikidata 结构化数据 + 外部 ID 链接的 GEO 实体权威",
    tier2Feat4: "每周 AI Visibility 探测 + AI Traffic UTM 归因",
  },
  ar: {
    tier1Feat4: "بناء 5 اقتباسات شهريًا مع فحص اتساق NAP",
    tier2Feat3: "سلطة كيان GEO عبر بيانات Wikidata المنظَّمة + ربط المعرفات الخارجية",
    tier2Feat4: "فحوص AI Visibility أسبوعية + إسناد UTM لـ AI Traffic",
  },
  ru: {
    tier1Feat4: "5 цитирований в месяц с проверкой согласованности NAP",
    tier2Feat3: "GEO-авторитет сущности через структурированные данные Wikidata + связывание внешних ID",
    tier2Feat4: "Еженедельные проверки AI Visibility + UTM-атрибуция AI Traffic",
  },
  de: {
    tier1Feat4: "Citation Building 5 pro Monat mit NAP-Konsistenz-Sweep",
    tier2Feat3: "GEO-Entitätsautorität über Wikidata-Strukturdaten + externe ID-Verknüpfung",
    tier2Feat4: "Wöchentliche AI-Visibility-Sonden + AI-Traffic UTM-Attribution",
  },
  hi: {
    tier1Feat4: "प्रति माह 5 साइटेशन + NAP स्थिरता स्वीप",
    tier2Feat3: "Wikidata संरचित डेटा + बाहरी ID लिंकिंग के माध्यम से GEO एंटिटी अथॉरिटी",
    tier2Feat4: "साप्ताहिक AI Visibility जाँच + AI Traffic UTM एट्रिब्यूशन",
  },
  it: {
    tier1Feat4: "Citation building 5 al mese con sweep di coerenza NAP",
    tier2Feat3: "Autorità di entità GEO tramite Wikidata strutturato + collegamento di ID esterni",
    tier2Feat4: "Sonde AI Visibility settimanali + attribuzione UTM AI Traffic",
  },
  ja: {
    tier1Feat4: "月 5 件のシテーション構築 + NAP 一貫性スイープ",
    tier2Feat3: "Wikidata 構造化データ + 外部 ID リンクによる GEO エンティティ権威",
    tier2Feat4: "週次 AI Visibility プローブ + AI Traffic UTM アトリビューション",
  },
  ko: {
    tier1Feat4: "월 5건의 인용 구축 + NAP 일관성 스윕",
    tier2Feat3: "Wikidata 구조화 데이터 + 외부 ID 연결을 통한 GEO 엔티티 권위",
    tier2Feat4: "주간 AI Visibility 프로브 + AI Traffic UTM 어트리뷰션",
  },
  nl: {
    tier1Feat4: "Citation building 5 per maand met NAP-consistentie sweep",
    tier2Feat3: "GEO-entiteitsautoriteit via Wikidata gestructureerde data + externe ID-koppeling",
    tier2Feat4: "Wekelijkse AI Visibility-probes + AI Traffic UTM-attributie",
  },
  pl: {
    tier1Feat4: "Budowanie cytowań 5 miesięcznie z przeglądem spójności NAP",
    tier2Feat3: "Autorytet encji GEO przez ustrukturyzowane Wikidata + linkowanie zewnętrznych ID",
    tier2Feat4: "Cotygodniowe sondy AI Visibility + atrybucja UTM AI Traffic",
  },
  pt: {
    tier1Feat4: "Construção de citações 5 por mês com varredura de consistência NAP",
    tier2Feat3: "Autoridade de entidade GEO via Wikidata estruturado + ligação de IDs externos",
    tier2Feat4: "Sondagens AI Visibility semanais + atribuição UTM AI Traffic",
  },
  tr: {
    tier1Feat4: "Aylık 5 atıf oluşturma + NAP tutarlılık taraması",
    tier2Feat3: "Wikidata yapılandırılmış veri + harici kimlik bağlama yoluyla GEO varlık otoritesi",
    tier2Feat4: "Haftalık AI Visibility ölçümleri + AI Traffic UTM atfı",
  },
  vi: {
    tier1Feat4: "Xây dựng 5 trích dẫn mỗi tháng với quét nhất quán NAP",
    tier2Feat3: "Quyền lực thực thể GEO qua Wikidata có cấu trúc + liên kết ID bên ngoài",
    tier2Feat4: "Đo AI Visibility hàng tuần + ghi nhận UTM cho AI Traffic",
  },
};

let total = 0;
for (const [locale, entries] of Object.entries(TRANSLATIONS)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  if (!obj.services) obj.services = {};
  for (const [key, value] of Object.entries(entries)) {
    obj.services[key] = value;
    total++;
  }
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: ${Object.keys(entries).length} keys`);
}
console.log(`\nTotal: ${total} strings updated.`);
