// Sync ALL tier feature copy that changed today + svc10Desc, across the
// 15 secondary locales. Two changes:
//
//  1. Photo cadence updated to 1/2/4/8 per month (was 0/2/4/4-6).
//     Touches tier0Feat2, tier1Feat2, tier2Feat2, tier3Feat2.
//
//  2. Contests are client-managed, not agency-delivered. The previous
//     "Autopilot" copy that promised "monthly contest managed by us"
//     was the wrong scope. Reviuzy SaaS provides the contest engine,
//     the client runs the contest, and we deliver setup help, legal
//     templates, and help center docs. Touches tier3Feat3..9 (full
//     re-sync to the new Agency tier copy) + svc10Desc.
//
// 14 keys × 15 locales = 210 strings.
//
// Brand names (AiLys, Reviuzy, GBP, NFC, AEO, GEO, E-E-A-T, HubSpot,
// Salesforce, PMS, API, Slack) stay Latin per CLAUDE.md hard rule #4.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const TMP = path.resolve(__dirname, "../node_modules/.cache/i18n-tier-sync");
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
    tier0Feat2: "Gestion Google Business Profile + 1 publication GBP + 1 photo par mois",
    tier1Feat2: "Publications GBP : 4 par mois (cadence hebdomadaire) + 2 photos par mois",
    tier2Feat2: "Publications GBP : 8 par mois (2 par semaine) + 4 photos par mois",
    tier3Feat1: "Tout ce qui est dans Growth, plus le système Reviuzy inclus",
    tier3Feat2: "Publications GBP : 12 par mois (3 par semaine), 8 photos par mois, sondes AI Visibility quotidiennes",
    tier3Feat3: "Tableau de bord multi-emplacements, un seul admin pour gérer chaque succursale",
    tier3Feat4: "Rapports PDF en marque blanche avec votre logo, envoyés chaque mois à votre équipe",
    tier3Feat5: "SLA Slack sous 4 heures en heures ouvrables, stratège senior dédié",
    tier3Feat6: "Accès API : Share of Model, AI Traffic, scores de visibilité directement dans votre stack",
    tier3Feat7: "Intégrations sur mesure : HubSpot, Salesforce, PMS hôtelier, votre CRM",
    tier3Feat8: "Présentation exécutive trimestrielle livrée en personne à votre direction",
    tier3Feat9: "Domain Speed Boost, Domain Shield, moteur de concours NFC, tout inclus",
    svc10Desc: "Outil de concours Reviuzy SaaS. Le client opère le concours, nous fournissons l'aide à la mise en place, les modèles légaux et la documentation du centre d'aide.",
  },
  es: {
    tier0Feat2: "Gestión Google Business Profile + 1 publicación GBP + 1 foto por mes",
    tier1Feat2: "Publicaciones GBP: 4 por mes (cadencia semanal) + 2 fotos por mes",
    tier2Feat2: "Publicaciones GBP: 8 por mes (2 por semana) + 4 fotos por mes",
    tier3Feat1: "Todo lo de Growth, más el sistema Reviuzy incluido",
    tier3Feat2: "Publicaciones GBP: 12 por mes (3 por semana), 8 fotos por mes, sondeos AI Visibility diarios",
    tier3Feat3: "Panel multiubicación, un solo admin gestiona todas las sucursales",
    tier3Feat4: "Reportes PDF en marca blanca con tu logo, enviados cada mes a tu equipo",
    tier3Feat5: "SLA Slack bajo 4 horas en horario laboral, estratega senior dedicado",
    tier3Feat6: "Acceso API: Share of Model, AI Traffic, puntajes de visibilidad en tu stack",
    tier3Feat7: "Integraciones a medida: HubSpot, Salesforce, PMS hotelero, tu CRM",
    tier3Feat8: "Presentación ejecutiva trimestral entregada en persona a tu liderazgo",
    tier3Feat9: "Domain Speed Boost, Domain Shield, motor de concursos NFC, todo incluido",
    svc10Desc: "Herramienta de concursos Reviuzy SaaS. El cliente opera el concurso, nosotros proporcionamos ayuda de configuración, plantillas legales y documentación del centro de ayuda.",
  },
  zh: {
    tier0Feat2: "Google Business Profile 管理 + 每月 1 篇 GBP 帖子 + 1 张照片",
    tier1Feat2: "GBP 帖子：每月 4 篇（每周节奏）+ 每月 2 张照片",
    tier2Feat2: "GBP 帖子：每月 8 篇（每周 2 篇）+ 每月 4 张照片",
    tier3Feat1: "包含 Growth 的全部,加上内置 Reviuzy 系统",
    tier3Feat2: "GBP 帖子：每月 12 篇（每周 3 篇）、每月 8 张照片、每日 AI Visibility 探测",
    tier3Feat3: "多门店管理面板,单一管理员管理所有门店",
    tier3Feat4: "白标 PDF 报告,带你的 Logo,每月发送给你的团队",
    tier3Feat5: "工作时间内 Slack SLA 4 小时以内,专属高级策略师",
    tier3Feat6: "API 访问：Share of Model、AI Traffic、可见性评分直接接入你的系统",
    tier3Feat7: "定制集成：HubSpot、Salesforce、酒店 PMS、你的 CRM",
    tier3Feat8: "每季度高管演示,亲自向你的领导团队汇报",
    tier3Feat9: "Domain Speed Boost、Domain Shield、NFC 抽奖引擎,全部内置",
    svc10Desc: "Reviuzy SaaS 抽奖活动工具。客户自行运营抽奖活动,我们提供设置协助、法律模板和帮助中心文档。",
  },
  ar: {
    tier0Feat2: "إدارة Google Business Profile + منشور GBP واحد + صورة واحدة شهريًا",
    tier1Feat2: "منشورات GBP: 4 شهريًا (إيقاع أسبوعي) + صورتان شهريًا",
    tier2Feat2: "منشورات GBP: 8 شهريًا (2 أسبوعيًا) + 4 صور شهريًا",
    tier3Feat1: "كل ما في Growth، إضافة إلى نظام Reviuzy المضمَّن",
    tier3Feat2: "منشورات GBP: 12 شهريًا (3 أسبوعيًا)، 8 صور شهريًا، فحوص AI Visibility يومية",
    tier3Feat3: "لوحة تحكم متعددة المواقع، مسؤول واحد يدير كل فرع",
    tier3Feat4: "تقارير PDF بعلامتك التجارية مع شعارك، تُرسَل شهريًا إلى فريقك",
    tier3Feat5: "SLA على Slack أقل من 4 ساعات في أوقات العمل، استراتيجي أول مخصص",
    tier3Feat6: "وصول API: Share of Model و AI Traffic ودرجات الظهور داخل نظامك",
    tier3Feat7: "تكاملات مخصصة: HubSpot و Salesforce و PMS الفنادق و CRM الخاص بك",
    tier3Feat8: "عرض تقديمي تنفيذي ربع سنوي يُلقى شخصيًا أمام قيادتك",
    tier3Feat9: "Domain Speed Boost و Domain Shield ومحرك مسابقات NFC، الكل مضمَّن",
    svc10Desc: "أداة مسابقات Reviuzy SaaS. العميل يدير المسابقة، ونحن نوفر مساعدة الإعداد، القوالب القانونية، ووثائق مركز المساعدة.",
  },
  ru: {
    tier0Feat2: "Управление Google Business Profile + 1 GBP-публикация + 1 фото в месяц",
    tier1Feat2: "Публикации GBP: 4 в месяц (еженедельная частота) + 2 фото в месяц",
    tier2Feat2: "Публикации GBP: 8 в месяц (2 в неделю) + 4 фото в месяц",
    tier3Feat1: "Всё из Growth, плюс встроенная система Reviuzy",
    tier3Feat2: "Публикации GBP: 12 в месяц (3 в неделю), 8 фото в месяц, ежедневные проверки AI Visibility",
    tier3Feat3: "Панель для нескольких локаций, один админ управляет всеми точками",
    tier3Feat4: "PDF-отчёты в white-label с вашим логотипом, ежемесячно вашей команде",
    tier3Feat5: "SLA в Slack менее 4 часов в рабочее время, выделенный senior-стратег",
    tier3Feat6: "Доступ к API: Share of Model, AI Traffic, метрики видимости в ваш стек",
    tier3Feat7: "Кастомные интеграции: HubSpot, Salesforce, гостиничный PMS, ваш CRM",
    tier3Feat8: "Ежеквартальная презентация для топ-менеджмента, лично",
    tier3Feat9: "Domain Speed Boost, Domain Shield, движок NFC-конкурсов, всё включено",
    svc10Desc: "Инструмент конкурсов Reviuzy SaaS. Клиент проводит конкурс, мы предоставляем помощь с настройкой, юридические шаблоны и документацию центра помощи.",
  },
  de: {
    tier0Feat2: "Google Business Profile Management + 1 GBP-Post + 1 Foto pro Monat",
    tier1Feat2: "GBP-Posts: 4 pro Monat (wöchentlicher Rhythmus) + 2 Fotos pro Monat",
    tier2Feat2: "GBP-Posts: 8 pro Monat (2 pro Woche) + 4 Fotos pro Monat",
    tier3Feat1: "Alles aus Growth, plus das Reviuzy-System inklusive",
    tier3Feat2: "GBP-Posts: 12 pro Monat (3 pro Woche), 8 Fotos pro Monat, tägliche AI-Visibility-Sonden",
    tier3Feat3: "Multi-Standort-Dashboard, ein Admin verwaltet jeden Standort",
    tier3Feat4: "White-Label-PDF-Berichte mit Ihrem Logo, monatlich an Ihr Team gesendet",
    tier3Feat5: "Slack-SLA unter 4 Stunden Geschäftszeit, dedizierter Senior-Stratege",
    tier3Feat6: "API-Zugriff: Share of Model, AI Traffic, Visibility-Scores in Ihren Stack",
    tier3Feat7: "Custom-Integrationen: HubSpot, Salesforce, Hotel-PMS, Ihr CRM",
    tier3Feat8: "Vierteljährliche Executive-Präsentation persönlich vor Ihrer Führung",
    tier3Feat9: "Domain Speed Boost, Domain Shield, NFC-Contest-Engine, alles enthalten",
    svc10Desc: "Reviuzy-SaaS-Contest-Tool. Der Kunde führt den Contest durch, wir liefern Setup-Hilfe, rechtliche Vorlagen und Help-Center-Dokumentation.",
  },
  hi: {
    tier0Feat2: "Google Business Profile प्रबंधन + प्रति माह 1 GBP पोस्ट + 1 फ़ोटो",
    tier1Feat2: "GBP पोस्ट: प्रति माह 4 (साप्ताहिक) + प्रति माह 2 फ़ोटो",
    tier2Feat2: "GBP पोस्ट: प्रति माह 8 (प्रति सप्ताह 2) + प्रति माह 4 फ़ोटो",
    tier3Feat1: "Growth का सब कुछ, साथ में Reviuzy सिस्टम शामिल",
    tier3Feat2: "GBP पोस्ट: प्रति माह 12 (प्रति सप्ताह 3), प्रति माह 8 फ़ोटो, दैनिक AI Visibility जाँच",
    tier3Feat3: "मल्टी-लोकेशन डैशबोर्ड, एक एडमिन हर स्थान को संभालता है",
    tier3Feat4: "व्हाइट-लेबल PDF रिपोर्ट, आपका लोगो, हर महीने आपकी टीम को भेजी जाती है",
    tier3Feat5: "कार्यालय समय में 4 घंटे से कम का Slack SLA, समर्पित सीनियर रणनीतिकार",
    tier3Feat6: "API एक्सेस: Share of Model, AI Traffic, विज़िबिलिटी स्कोर सीधे आपके स्टैक में",
    tier3Feat7: "कस्टम इंटीग्रेशन: HubSpot, Salesforce, हॉस्पिटैलिटी PMS, आपका CRM",
    tier3Feat8: "तिमाही एग्जीक्यूटिव डेक, आपके नेतृत्व के सामने व्यक्तिगत रूप से प्रस्तुत",
    tier3Feat9: "Domain Speed Boost, Domain Shield, NFC कॉन्टेस्ट इंजन, सब शामिल",
    svc10Desc: "Reviuzy SaaS कॉन्टेस्ट टूल। क्लाइंट कॉन्टेस्ट चलाता है, हम सेटअप सहायता, कानूनी टेम्पलेट और हेल्प सेंटर दस्तावेज़ प्रदान करते हैं।",
  },
  it: {
    tier0Feat2: "Gestione Google Business Profile + 1 post GBP + 1 foto al mese",
    tier1Feat2: "Post GBP: 4 al mese (cadenza settimanale) + 2 foto al mese",
    tier2Feat2: "Post GBP: 8 al mese (2 a settimana) + 4 foto al mese",
    tier3Feat1: "Tutto di Growth, più il sistema Reviuzy incluso",
    tier3Feat2: "Post GBP: 12 al mese (3 a settimana), 8 foto al mese, sonde AI Visibility quotidiane",
    tier3Feat3: "Dashboard multi-sede, un singolo admin gestisce tutte le sedi",
    tier3Feat4: "Report PDF white-label con il tuo logo, inviati mensilmente al tuo team",
    tier3Feat5: "SLA Slack sotto 4 ore in orario lavorativo, stratega senior dedicato",
    tier3Feat6: "Accesso API: Share of Model, AI Traffic, punteggi di visibilità nel tuo stack",
    tier3Feat7: "Integrazioni personalizzate: HubSpot, Salesforce, PMS alberghiero, il tuo CRM",
    tier3Feat8: "Presentazione executive trimestrale, dal vivo davanti alla tua leadership",
    tier3Feat9: "Domain Speed Boost, Domain Shield, motore concorsi NFC, tutto incluso",
    svc10Desc: "Strumento concorsi Reviuzy SaaS. Il cliente gestisce il concorso, noi forniamo aiuto al setup, modelli legali e documentazione del centro assistenza.",
  },
  ja: {
    tier0Feat2: "Google Business Profile 管理 + 月 1 件の GBP 投稿 + 1 枚の写真",
    tier1Feat2: "GBP 投稿：月 4 件（週次ペース）+ 月 2 枚の写真",
    tier2Feat2: "GBP 投稿：月 8 件（週 2 件）+ 月 4 枚の写真",
    tier3Feat1: "Growth のすべて、加えて Reviuzy システム同梱",
    tier3Feat2: "GBP 投稿：月 12 件（週 3 件）、月 8 枚の写真、毎日の AI Visibility プローブ",
    tier3Feat3: "マルチロケーション・ダッシュボード、単一管理者で全店舗管理",
    tier3Feat4: "ホワイトラベル PDF レポート、貴社ロゴ入り、毎月チームへ送付",
    tier3Feat5: "営業時間内 Slack SLA 4 時間以内、専任シニア・ストラテジスト",
    tier3Feat6: "API アクセス：Share of Model、AI Traffic、可視性スコアを貴社スタックへ",
    tier3Feat7: "カスタム統合：HubSpot、Salesforce、ホスピタリティ PMS、貴社の CRM",
    tier3Feat8: "四半期エグゼクティブ・デッキ、貴社経営層へ対面プレゼン",
    tier3Feat9: "Domain Speed Boost、Domain Shield、NFC コンテスト・エンジン、すべて同梱",
    svc10Desc: "Reviuzy SaaS コンテスト・ツール。コンテストの運営はクライアントが行い、当社はセットアップ支援、法務テンプレート、ヘルプセンター・ドキュメントを提供します。",
  },
  ko: {
    tier0Feat2: "Google Business Profile 관리 + 매월 1개의 GBP 게시물 + 1장의 사진",
    tier1Feat2: "GBP 게시물: 매월 4개(주간 페이스) + 매월 2장의 사진",
    tier2Feat2: "GBP 게시물: 매월 8개(주 2개) + 매월 4장의 사진",
    tier3Feat1: "Growth의 모든 것, 그리고 Reviuzy 시스템 포함",
    tier3Feat2: "GBP 게시물: 매월 12개(주 3개), 매월 8장의 사진, 매일 AI Visibility 프로브",
    tier3Feat3: "멀티 로케이션 대시보드, 단일 관리자가 모든 지점 관리",
    tier3Feat4: "화이트 레이블 PDF 보고서, 귀사 로고 포함, 매월 팀에 발송",
    tier3Feat5: "근무 시간 Slack SLA 4시간 이내, 전담 시니어 전략가",
    tier3Feat6: "API 액세스: Share of Model, AI Traffic, 가시성 점수를 귀사 스택에 연동",
    tier3Feat7: "맞춤 통합: HubSpot, Salesforce, 호텔 PMS, 귀사 CRM",
    tier3Feat8: "분기별 임원 데크, 귀사 리더십에게 직접 발표",
    tier3Feat9: "Domain Speed Boost, Domain Shield, NFC 콘테스트 엔진, 모두 포함",
    svc10Desc: "Reviuzy SaaS 콘테스트 도구. 클라이언트가 콘테스트를 운영하며, 당사는 설정 지원, 법적 템플릿, 도움말 센터 문서를 제공합니다.",
  },
  nl: {
    tier0Feat2: "Google Business Profile beheer + 1 GBP-post + 1 foto per maand",
    tier1Feat2: "GBP-posts: 4 per maand (wekelijks) + 2 foto's per maand",
    tier2Feat2: "GBP-posts: 8 per maand (2 per week) + 4 foto's per maand",
    tier3Feat1: "Alles uit Growth, plus het Reviuzy-systeem inbegrepen",
    tier3Feat2: "GBP-posts: 12 per maand (3 per week), 8 foto's per maand, dagelijkse AI Visibility-probes",
    tier3Feat3: "Multi-locatie dashboard, één admin beheert elke locatie",
    tier3Feat4: "White-label PDF-rapporten met jouw logo, maandelijks verstuurd naar je team",
    tier3Feat5: "Slack-SLA binnen 4 kantooruren, toegewijde senior strateeg",
    tier3Feat6: "API-toegang: Share of Model, AI Traffic, visibility-scores in jouw stack",
    tier3Feat7: "Custom integraties: HubSpot, Salesforce, hospitality PMS, jouw CRM",
    tier3Feat8: "Kwartaal executive deck, persoonlijk gepresenteerd aan jouw leiderschap",
    tier3Feat9: "Domain Speed Boost, Domain Shield, NFC-contestengine, alles inbegrepen",
    svc10Desc: "Reviuzy SaaS contest-tool. De klant runt de contest, wij leveren setup-hulp, juridische templates en help center-documentatie.",
  },
  pl: {
    tier0Feat2: "Zarządzanie Google Business Profile + 1 post GBP + 1 zdjęcie miesięcznie",
    tier1Feat2: "Posty GBP: 4 miesięcznie (rytm tygodniowy) + 2 zdjęcia miesięcznie",
    tier2Feat2: "Posty GBP: 8 miesięcznie (2 tygodniowo) + 4 zdjęcia miesięcznie",
    tier3Feat1: "Wszystko z Growth, plus wbudowany system Reviuzy",
    tier3Feat2: "Posty GBP: 12 miesięcznie (3 tygodniowo), 8 zdjęć miesięcznie, codzienne sondy AI Visibility",
    tier3Feat3: "Panel wielolokalizacyjny, jeden admin zarządza każdą lokalizacją",
    tier3Feat4: "Raporty PDF white-label z Twoim logo, wysyłane miesięcznie do Twojego zespołu",
    tier3Feat5: "SLA Slack poniżej 4 godzin w godzinach pracy, dedykowany starszy strateg",
    tier3Feat6: "Dostęp API: Share of Model, AI Traffic, oceny widoczności w Twoim stacku",
    tier3Feat7: "Integracje na zamówienie: HubSpot, Salesforce, PMS hotelowy, Twój CRM",
    tier3Feat8: "Kwartalny executive deck, prezentowany osobiście Twoim liderom",
    tier3Feat9: "Domain Speed Boost, Domain Shield, silnik konkursów NFC, wszystko w zestawie",
    svc10Desc: "Narzędzie konkursowe Reviuzy SaaS. Klient prowadzi konkurs, my dostarczamy pomoc w konfiguracji, szablony prawne i dokumentację centrum pomocy.",
  },
  pt: {
    tier0Feat2: "Gestão Google Business Profile + 1 post GBP + 1 foto por mês",
    tier1Feat2: "Posts GBP: 4 por mês (cadência semanal) + 2 fotos por mês",
    tier2Feat2: "Posts GBP: 8 por mês (2 por semana) + 4 fotos por mês",
    tier3Feat1: "Tudo do Growth, mais o sistema Reviuzy incluído",
    tier3Feat2: "Posts GBP: 12 por mês (3 por semana), 8 fotos por mês, sondagens AI Visibility diárias",
    tier3Feat3: "Painel multi-localização, um único admin gerencia todas as filiais",
    tier3Feat4: "Relatórios PDF white-label com sua logo, enviados mensalmente à sua equipe",
    tier3Feat5: "SLA Slack abaixo de 4 horas em horário comercial, estrategista sênior dedicado",
    tier3Feat6: "Acesso API: Share of Model, AI Traffic, pontuações de visibilidade na sua stack",
    tier3Feat7: "Integrações sob medida: HubSpot, Salesforce, PMS hoteleiro, seu CRM",
    tier3Feat8: "Apresentação executiva trimestral, entregue pessoalmente à sua liderança",
    tier3Feat9: "Domain Speed Boost, Domain Shield, motor de concursos NFC, tudo incluído",
    svc10Desc: "Ferramenta de concursos Reviuzy SaaS. O cliente conduz o concurso, fornecemos ajuda de configuração, templates legais e documentação da central de ajuda.",
  },
  tr: {
    tier0Feat2: "Google Business Profile yönetimi + ayda 1 GBP gönderisi + 1 fotoğraf",
    tier1Feat2: "GBP gönderileri: ayda 4 (haftalık ritim) + ayda 2 fotoğraf",
    tier2Feat2: "GBP gönderileri: ayda 8 (haftada 2) + ayda 4 fotoğraf",
    tier3Feat1: "Growth'taki her şey, artı dahili Reviuzy sistemi",
    tier3Feat2: "GBP gönderileri: ayda 12 (haftada 3), ayda 8 fotoğraf, günlük AI Visibility ölçümleri",
    tier3Feat3: "Çoklu lokasyon paneli, tek admin tüm lokasyonları yönetir",
    tier3Feat4: "Sizin logonuzla white-label PDF raporlar, ekibinize aylık gönderilir",
    tier3Feat5: "Mesai saati içinde 4 saat altı Slack SLA, özel kıdemli stratejist",
    tier3Feat6: "API erişimi: Share of Model, AI Traffic, görünürlük puanları stack'inize entegre",
    tier3Feat7: "Özel entegrasyonlar: HubSpot, Salesforce, otel PMS, sizin CRM'iniz",
    tier3Feat8: "Üç aylık yönetici sunumu, liderliğinize bizzat sunulur",
    tier3Feat9: "Domain Speed Boost, Domain Shield, NFC yarışma motoru, hepsi dahil",
    svc10Desc: "Reviuzy SaaS yarışma aracı. Yarışmayı müşteri yürütür, biz kurulum yardımı, yasal şablonlar ve yardım merkezi belgeleri sağlarız.",
  },
  vi: {
    tier0Feat2: "Quản lý Google Business Profile + 1 bài đăng GBP + 1 ảnh mỗi tháng",
    tier1Feat2: "Bài đăng GBP: 4 mỗi tháng (nhịp hàng tuần) + 2 ảnh mỗi tháng",
    tier2Feat2: "Bài đăng GBP: 8 mỗi tháng (2 mỗi tuần) + 4 ảnh mỗi tháng",
    tier3Feat1: "Tất cả trong Growth, cộng với hệ thống Reviuzy đi kèm",
    tier3Feat2: "Bài đăng GBP: 12 mỗi tháng (3 mỗi tuần), 8 ảnh mỗi tháng, đo AI Visibility hàng ngày",
    tier3Feat3: "Bảng điều khiển đa địa điểm, một admin duy nhất quản lý mọi chi nhánh",
    tier3Feat4: "Báo cáo PDF nhãn trắng với logo của bạn, gửi hàng tháng cho đội ngũ",
    tier3Feat5: "SLA Slack dưới 4 giờ trong giờ làm việc, chiến lược gia cấp cao chuyên trách",
    tier3Feat6: "Truy cập API: Share of Model, AI Traffic, điểm hiển thị tích hợp vào stack của bạn",
    tier3Feat7: "Tích hợp tùy chỉnh: HubSpot, Salesforce, PMS khách sạn, CRM của bạn",
    tier3Feat8: "Bản trình bày điều hành hàng quý, trực tiếp trước ban lãnh đạo của bạn",
    tier3Feat9: "Domain Speed Boost, Domain Shield, công cụ thi đua NFC, tất cả bao gồm",
    svc10Desc: "Công cụ cuộc thi Reviuzy SaaS. Khách hàng vận hành cuộc thi, chúng tôi cung cấp hỗ trợ thiết lập, mẫu pháp lý và tài liệu trung tâm trợ giúp.",
  },
};

let total = 0;
for (const [locale, entries] of Object.entries(TRANSLATIONS)) {
  const file = `${locale}.ts`;
  const { name, obj } = await load(file);
  if (!obj.services) obj.services = {};
  if (!obj.pricingBuilder) obj.pricingBuilder = {};
  for (const [key, value] of Object.entries(entries)) {
    if (key === "svc10Desc") {
      obj.pricingBuilder[key] = value;
    } else {
      obj.services[key] = value;
    }
    total++;
  }
  const out = `export const ${name} = ${serialize(obj)};\n`;
  await writeFile(path.join(TRANS_DIR, file), out, "utf8");
  console.log(`  ${file}: ${Object.keys(entries).length} keys`);
}
console.log(`\nTotal: ${total} strings updated.`);
