// Hand-curated translations for the AuditAIVisibility page header.
// 5 new keys × 15 locales = 75 strings.
// Brand names (ChatGPT, Perplexity, Google AIO, AEO, GEO, E-E-A-T, GBP, AI)
// stay Latin per CLAUDE.md hard rule #4.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-aivispage");
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

// 15 secondary locales (en is canonical, already updated in en.ts).
// title2 keeps "ChatGPT, Perplexity & Google AIO?" in Latin (rule #4).
// title1 + subtitle + switchToGbp + eyebrow get hand-translated.
const TRANSLATIONS = {
  fr: {
    eyebrow: "Audit de visibilité IA · Données en direct",
    title1: "Êtes-vous cité par",
    title2: "ChatGPT, Perplexity et Google AIO?",
    subtitle: "Audit en données réelles. Nous balayons votre commerce sur 6 moteurs IA, mesurons les signaux AEO, GEO et E-E-A-T, et projetons votre position face à vos concurrents. Gratuit, 30 secondes.",
    switchToGbp: "Passer au GBP Pulse",
  },
  es: {
    eyebrow: "Auditoría de visibilidad IA · Datos en vivo",
    title1: "¿Te citan",
    title2: "ChatGPT, Perplexity y Google AIO?",
    subtitle: "Auditoría con datos reales. Escaneamos tu negocio en 6 motores de búsqueda IA, puntuamos las señales AEO, GEO y E-E-A-T, y proyectamos tu posición frente a tus competidores. Gratis, 30 segundos.",
    switchToGbp: "Cambiar a GBP Pulse",
  },
  zh: {
    eyebrow: "AI 可见性审计 · 实时数据",
    title1: "你的业务是否被",
    title2: "ChatGPT、Perplexity 和 Google AIO 引用?",
    subtitle: "实时数据审计。我们在 6 个 AI 搜索引擎中扫描您的业务,评估 AEO、GEO 和 E-E-A-T 信号,并预测您与竞争对手的相对位置。免费,30 秒。",
    switchToGbp: "切换到 GBP Pulse",
  },
  ar: {
    eyebrow: "تدقيق الظهور في الذكاء الاصطناعي · بيانات حية",
    title1: "هل يتم الاستشهاد بك في",
    title2: "ChatGPT و Perplexity و Google AIO؟",
    subtitle: "تدقيق ببيانات حية. نمسح نشاطك التجاري عبر 6 محركات بحث ذكاء اصطناعي، نقيّم إشارات AEO و GEO و E-E-A-T، ونتوقع موقعك مقارنة بمنافسيك. مجاني، 30 ثانية.",
    switchToGbp: "التبديل إلى GBP Pulse",
  },
  ru: {
    eyebrow: "Аудит видимости в AI · Данные в реальном времени",
    title1: "Цитируют ли вас",
    title2: "ChatGPT, Perplexity и Google AIO?",
    subtitle: "Аудит на живых данных. Мы сканируем ваш бизнес в 6 AI-поисковиках, оцениваем сигналы AEO, GEO и E-E-A-T, и прогнозируем вашу позицию относительно конкурентов. Бесплатно, 30 секунд.",
    switchToGbp: "Перейти к GBP Pulse",
  },
  de: {
    eyebrow: "KI-Sichtbarkeits-Audit · Live-Daten",
    title1: "Werden Sie zitiert von",
    title2: "ChatGPT, Perplexity und Google AIO?",
    subtitle: "Audit mit Live-Daten. Wir scannen Ihr Unternehmen über 6 KI-Suchmaschinen, bewerten AEO-, GEO- und E-E-A-T-Signale und prognostizieren Ihre Position gegenüber Wettbewerbern. Kostenlos, 30 Sekunden.",
    switchToGbp: "Zum GBP Pulse wechseln",
  },
  hi: {
    eyebrow: "AI विज़िबिलिटी ऑडिट · लाइव डेटा",
    title1: "क्या आपको उद्धृत करते हैं",
    title2: "ChatGPT, Perplexity और Google AIO?",
    subtitle: "लाइव डेटा ऑडिट। हम आपके व्यवसाय को 6 AI सर्च इंजनों में स्कैन करते हैं, AEO, GEO और E-E-A-T संकेतों का स्कोर देते हैं, और प्रतिस्पर्धियों की तुलना में आपकी स्थिति का प्रोजेक्शन करते हैं। मुफ्त, 30 सेकंड।",
    switchToGbp: "GBP Pulse पर स्विच करें",
  },
  it: {
    eyebrow: "Audit di visibilità IA · Dati in tempo reale",
    title1: "Sei citato da",
    title2: "ChatGPT, Perplexity e Google AIO?",
    subtitle: "Audit su dati reali. Scansioniamo la tua attività su 6 motori di ricerca IA, valutiamo i segnali AEO, GEO e E-E-A-T, e proiettiamo la tua posizione rispetto ai concorrenti. Gratuito, 30 secondi.",
    switchToGbp: "Passa a GBP Pulse",
  },
  ja: {
    eyebrow: "AI 可視性監査 · ライブデータ",
    title1: "あなたのビジネスは",
    title2: "ChatGPT、Perplexity、Google AIO に引用されていますか?",
    subtitle: "ライブデータ監査。6 つの AI 検索エンジンでビジネスをスキャンし、AEO、GEO、E-E-A-T シグナルをスコアリングして、競合他社に対するあなたの位置を予測します。無料、30 秒。",
    switchToGbp: "GBP Pulse に切り替え",
  },
  ko: {
    eyebrow: "AI 가시성 감사 · 실시간 데이터",
    title1: "당신은 인용되고 있나요",
    title2: "ChatGPT, Perplexity 및 Google AIO에?",
    subtitle: "실시간 데이터 감사. 6개 AI 검색 엔진에서 귀하의 비즈니스를 스캔하고, AEO, GEO, E-E-A-T 신호를 점수화하며, 경쟁사 대비 위치를 예측합니다. 무료, 30초.",
    switchToGbp: "GBP Pulse로 전환",
  },
  nl: {
    eyebrow: "AI-zichtbaarheidsaudit · Live data",
    title1: "Word je geciteerd door",
    title2: "ChatGPT, Perplexity en Google AIO?",
    subtitle: "Audit op live data. We scannen je bedrijf via 6 AI-zoekmachines, scoren AEO-, GEO- en E-E-A-T-signalen, en voorspellen je positie ten opzichte van concurrenten. Gratis, 30 seconden.",
    switchToGbp: "Wisselen naar GBP Pulse",
  },
  pl: {
    eyebrow: "Audyt widoczności AI · Dane na żywo",
    title1: "Czy jesteś cytowany przez",
    title2: "ChatGPT, Perplexity i Google AIO?",
    subtitle: "Audyt na danych na żywo. Skanujemy Twoją firmę w 6 wyszukiwarkach AI, oceniamy sygnały AEO, GEO i E-E-A-T oraz prognozujemy Twoją pozycję na tle konkurencji. Bezpłatnie, 30 sekund.",
    switchToGbp: "Przełącz na GBP Pulse",
  },
  pt: {
    eyebrow: "Auditoria de visibilidade IA · Dados ao vivo",
    title1: "Você é citado por",
    title2: "ChatGPT, Perplexity e Google AIO?",
    subtitle: "Auditoria com dados reais. Verificamos seu negócio em 6 motores de busca IA, pontuamos os sinais AEO, GEO e E-E-A-T, e projetamos sua posição em relação aos concorrentes. Grátis, 30 segundos.",
    switchToGbp: "Mudar para GBP Pulse",
  },
  tr: {
    eyebrow: "AI görünürlük denetimi · Canlı veri",
    title1: "Sizden alıntı yapıyor mu",
    title2: "ChatGPT, Perplexity ve Google AIO?",
    subtitle: "Canlı veri denetimi. İşletmenizi 6 AI arama motorunda tarıyor, AEO, GEO ve E-E-A-T sinyallerini puanlıyor ve rakiplerinize göre konumunuzu öngörüyoruz. Ücretsiz, 30 saniye.",
    switchToGbp: "GBP Pulse'a geç",
  },
  vi: {
    eyebrow: "Kiểm tra hiển thị AI · Dữ liệu trực tiếp",
    title1: "Bạn có được trích dẫn bởi",
    title2: "ChatGPT, Perplexity và Google AIO không?",
    subtitle: "Kiểm tra trên dữ liệu trực tiếp. Chúng tôi quét doanh nghiệp của bạn trên 6 công cụ tìm kiếm AI, đánh giá tín hiệu AEO, GEO và E-E-A-T, và dự đoán vị trí của bạn so với đối thủ. Miễn phí, 30 giây.",
    switchToGbp: "Chuyển sang GBP Pulse",
  },
};

let total = 0;
for (const [locale, entries] of Object.entries(TRANSLATIONS)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  if (!obj.audit) obj.audit = {};
  obj.audit.aiVisPage = {
    eyebrow: entries.eyebrow,
    title1: entries.title1,
    title2: entries.title2,
    subtitle: entries.subtitle,
    switchToGbp: entries.switchToGbp,
  };
  total += 5;
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: 5 keys`);
}
console.log(`\nTotal: ${total} strings updated.`);
