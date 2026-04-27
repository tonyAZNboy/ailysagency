// Update GBP photo cadence per user 2026-04-27 directive: "4/8/12/(jusqua 12 par nom domain)"
// New cadence:
//   Starter: 4 photos/mo (was 1)
//   Core: 8 photos/mo (was 2)
//   Growth: 12 photos/mo (was 4)
//   Agency: up to 12 per domain (was 8 fixed) — multi-location dashboard scales the quota
//
// 4 keys × 15 locales = 60 strings.
//
// Brand names + acronyms (AiLys, Reviuzy, GBP, AEO, GEO, AI, NAP) stay Latin per CLAUDE.md hard rule #4.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-photos-v2");
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
    tier0Feat2: "Gestion Google Business Profile + 1 publication GBP + 4 photos par mois",
    tier1Feat2: "Publications GBP : 4 par mois (cadence hebdomadaire) + 8 photos par mois",
    tier2Feat2: "Publications GBP : 8 par mois (2 par semaine) + 12 photos par mois",
    tier3Feat2: "Publications GBP : 12 par mois (3 par semaine), jusqu'à 12 photos par mois par domaine, sondes AI Visibility quotidiennes",
  },
  es: {
    tier0Feat2: "Gestión Google Business Profile + 1 publicación GBP + 4 fotos por mes",
    tier1Feat2: "Publicaciones GBP: 4 por mes (cadencia semanal) + 8 fotos por mes",
    tier2Feat2: "Publicaciones GBP: 8 por mes (2 por semana) + 12 fotos por mes",
    tier3Feat2: "Publicaciones GBP: 12 por mes (3 por semana), hasta 12 fotos por mes por dominio, sondeos AI Visibility diarios",
  },
  zh: {
    tier0Feat2: "Google Business Profile 管理 + 每月 1 篇 GBP 帖子 + 4 张照片",
    tier1Feat2: "GBP 帖子：每月 4 篇（每周节奏）+ 每月 8 张照片",
    tier2Feat2: "GBP 帖子：每月 8 篇（每周 2 篇）+ 每月 12 张照片",
    tier3Feat2: "GBP 帖子：每月 12 篇（每周 3 篇）、每个域名最多每月 12 张照片、每日 AI Visibility 探测",
  },
  ar: {
    tier0Feat2: "إدارة Google Business Profile + منشور GBP واحد + 4 صور شهريًا",
    tier1Feat2: "منشورات GBP: 4 شهريًا (إيقاع أسبوعي) + 8 صور شهريًا",
    tier2Feat2: "منشورات GBP: 8 شهريًا (2 أسبوعيًا) + 12 صورة شهريًا",
    tier3Feat2: "منشورات GBP: 12 شهريًا (3 أسبوعيًا)، حتى 12 صورة شهريًا لكل نطاق، فحوص AI Visibility يومية",
  },
  ru: {
    tier0Feat2: "Управление Google Business Profile + 1 GBP-публикация + 4 фото в месяц",
    tier1Feat2: "Публикации GBP: 4 в месяц (еженедельная частота) + 8 фото в месяц",
    tier2Feat2: "Публикации GBP: 8 в месяц (2 в неделю) + 12 фото в месяц",
    tier3Feat2: "Публикации GBP: 12 в месяц (3 в неделю), до 12 фото в месяц на домен, ежедневные проверки AI Visibility",
  },
  de: {
    tier0Feat2: "Google Business Profile Management + 1 GBP-Post + 4 Fotos pro Monat",
    tier1Feat2: "GBP-Posts: 4 pro Monat (wöchentlicher Rhythmus) + 8 Fotos pro Monat",
    tier2Feat2: "GBP-Posts: 8 pro Monat (2 pro Woche) + 12 Fotos pro Monat",
    tier3Feat2: "GBP-Posts: 12 pro Monat (3 pro Woche), bis zu 12 Fotos pro Monat pro Domain, tägliche AI-Visibility-Sonden",
  },
  hi: {
    tier0Feat2: "Google Business Profile प्रबंधन + प्रति माह 1 GBP पोस्ट + 4 फ़ोटो",
    tier1Feat2: "GBP पोस्ट: प्रति माह 4 (साप्ताहिक) + प्रति माह 8 फ़ोटो",
    tier2Feat2: "GBP पोस्ट: प्रति माह 8 (प्रति सप्ताह 2) + प्रति माह 12 फ़ोटो",
    tier3Feat2: "GBP पोस्ट: प्रति माह 12 (प्रति सप्ताह 3), प्रति डोमेन प्रति माह 12 फ़ोटो तक, दैनिक AI Visibility जाँच",
  },
  it: {
    tier0Feat2: "Gestione Google Business Profile + 1 post GBP + 4 foto al mese",
    tier1Feat2: "Post GBP: 4 al mese (cadenza settimanale) + 8 foto al mese",
    tier2Feat2: "Post GBP: 8 al mese (2 a settimana) + 12 foto al mese",
    tier3Feat2: "Post GBP: 12 al mese (3 a settimana), fino a 12 foto al mese per dominio, sonde AI Visibility quotidiane",
  },
  ja: {
    tier0Feat2: "Google Business Profile 管理 + 月 1 件の GBP 投稿 + 4 枚の写真",
    tier1Feat2: "GBP 投稿：月 4 件（週次ペース）+ 月 8 枚の写真",
    tier2Feat2: "GBP 投稿：月 8 件（週 2 件）+ 月 12 枚の写真",
    tier3Feat2: "GBP 投稿：月 12 件（週 3 件）、ドメインごとに月 12 枚までの写真、毎日の AI Visibility プローブ",
  },
  ko: {
    tier0Feat2: "Google Business Profile 관리 + 매월 1개의 GBP 게시물 + 4장의 사진",
    tier1Feat2: "GBP 게시물: 매월 4개(주간 페이스) + 매월 8장의 사진",
    tier2Feat2: "GBP 게시물: 매월 8개(주 2개) + 매월 12장의 사진",
    tier3Feat2: "GBP 게시물: 매월 12개(주 3개), 도메인당 매월 최대 12장의 사진, 매일 AI Visibility 프로브",
  },
  nl: {
    tier0Feat2: "Google Business Profile beheer + 1 GBP-post + 4 foto's per maand",
    tier1Feat2: "GBP-posts: 4 per maand (wekelijks) + 8 foto's per maand",
    tier2Feat2: "GBP-posts: 8 per maand (2 per week) + 12 foto's per maand",
    tier3Feat2: "GBP-posts: 12 per maand (3 per week), tot 12 foto's per maand per domein, dagelijkse AI Visibility-probes",
  },
  pl: {
    tier0Feat2: "Zarządzanie Google Business Profile + 1 post GBP + 4 zdjęcia miesięcznie",
    tier1Feat2: "Posty GBP: 4 miesięcznie (rytm tygodniowy) + 8 zdjęć miesięcznie",
    tier2Feat2: "Posty GBP: 8 miesięcznie (2 tygodniowo) + 12 zdjęć miesięcznie",
    tier3Feat2: "Posty GBP: 12 miesięcznie (3 tygodniowo), do 12 zdjęć miesięcznie na domenę, codzienne sondy AI Visibility",
  },
  pt: {
    tier0Feat2: "Gestão Google Business Profile + 1 post GBP + 4 fotos por mês",
    tier1Feat2: "Posts GBP: 4 por mês (cadência semanal) + 8 fotos por mês",
    tier2Feat2: "Posts GBP: 8 por mês (2 por semana) + 12 fotos por mês",
    tier3Feat2: "Posts GBP: 12 por mês (3 por semana), até 12 fotos por mês por domínio, sondagens AI Visibility diárias",
  },
  tr: {
    tier0Feat2: "Google Business Profile yönetimi + ayda 1 GBP gönderisi + 4 fotoğraf",
    tier1Feat2: "GBP gönderileri: ayda 4 (haftalık ritim) + ayda 8 fotoğraf",
    tier2Feat2: "GBP gönderileri: ayda 8 (haftada 2) + ayda 12 fotoğraf",
    tier3Feat2: "GBP gönderileri: ayda 12 (haftada 3), alan adı başına ayda en fazla 12 fotoğraf, günlük AI Visibility ölçümleri",
  },
  vi: {
    tier0Feat2: "Quản lý Google Business Profile + 1 bài đăng GBP + 4 ảnh mỗi tháng",
    tier1Feat2: "Bài đăng GBP: 4 mỗi tháng (nhịp hàng tuần) + 8 ảnh mỗi tháng",
    tier2Feat2: "Bài đăng GBP: 8 mỗi tháng (2 mỗi tuần) + 12 ảnh mỗi tháng",
    tier3Feat2: "Bài đăng GBP: 12 mỗi tháng (3 mỗi tuần), tối đa 12 ảnh mỗi tháng cho mỗi tên miền, đo AI Visibility hàng ngày",
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
