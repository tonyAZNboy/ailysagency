#!/usr/bin/env node
/**
 * One-shot script to insert the 11 missing i18n keys (audit at v0.14.4)
 * across all 14 non-FR non-EN locale files. Inserts after stable anchor
 * lines so positioning matches EN canonical order.
 *
 * Anchors (in EN canonical order):
 *   1. After `actionPlan:` line   -> insert 3 planHoldBack* keys
 *   2. After `badgeAutopilot:` line -> insert 2 statusInDev* keys
 *   3. After `tier1Feat7:` line   -> insert tier1Feat8
 *   4. After `oneTimeSuffix:` line -> insert fromPrefix, techHealthPack*, gscIndexation* (5 keys)
 *
 * After running, run `node scripts/audit-translations-deep.mjs` to confirm
 * missing=0 across all 15 non-EN locales.
 */
import { readFileSync, writeFileSync } from "node:fs";

const dir = "src/i18n/translations";

// indent inferred from existing file context: 6 spaces inside auditResults block,
// 4 spaces inside services block, 4 spaces inside pricingBuilder block.

function fmt(indent, key, val) {
  // Escape backslash + double quote in val
  const esc = val.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `${" ".repeat(indent)}${key}: "${esc}",`;
}

const T = {
  es: {
    planHoldBackTitle: "Esta es la vista previa, no el plan completo",
    planHoldBackBody: "El playbook estratégico (plantillas JSON-LD por página, scripts de outreach para directorios de citas, secuencia de despliegue semana a semana, bancos de FAQ por sector, ponderaciones de señales por motor de IA) se entrega en vivo durante la llamada de 60 minutos con el estratega. Gratis, sin tarjeta de crédito.",
    planHoldBackCta: "Reservar la llamada con el estratega",
    statusInDevelopment: "🚧 En desarrollo",
    statusInDevelopmentTitle: "Este nivel se está finalizando. Postúlate para una plaza fundador y unirte a la cohorte.",
    tier1Feat8: "Llamada estratégica cada dos semanas",
    fromPrefix: "desde",
    techHealthPackLabel: "Tech Health Pack",
    techHealthPackDesc: "Garantiza que los blogs mensuales que AiLys publica se indexen efectivamente en Google. Sin este módulo, las páginas nuevas pueden quedarse en \"Descubiertas, actualmente no indexadas\" durante semanas. Incluye monitoreo de indexación GSC, reindexación automática de páginas nuevas, barrido semanal de errores de crawl, monitoreo de enlaces rotos y alertas de Core Web Vitals. Incluido en Agency.",
    gscIndexationLabel: "Auditoría de Indexación GSC (única vez)",
    gscIndexationDesc: "Auditoría única de cobertura del sitio. Conecta GSC, identifica todas las páginas válidas aún no indexadas, las vuelve a enviar y entrega un PDF antes/después con recomendaciones canonical/redirect/noindex. Precio según tamaño del sitio: $100 (1-9 páginas) hasta $800 (100-149 páginas), 150+ con cotización personalizada. Incluido al inscribirse en Agency.",
  },
  zh: {
    planHoldBackTitle: "这是预览,不是完整方案",
    planHoldBackBody: "完整的战略方案(每页 JSON-LD 模板、引文目录外联脚本、每周部署计划、按行业定制的 FAQ 库、按 AI 引擎设定的信号权重)在 60 分钟的战略师电话中现场交付。免费,无需信用卡。",
    planHoldBackCta: "预约战略师电话",
    statusInDevelopment: "🚧 开发中",
    statusInDevelopmentTitle: "此级别正在最终确定。申请创始席位以加入首批客户。",
    tier1Feat8: "每两周一次战略电话",
    fromPrefix: "起价",
    techHealthPackLabel: "Tech Health Pack",
    techHealthPackDesc: "确保 AiLys 每月发布的博客文章实际被 Google 索引。没有此模块,新页面可能在 \"已发现,当前未编入索引\" 状态停留数周。包括 GSC 索引监控、新页面自动重新索引、每周抓取错误扫描、断链监控和 Core Web Vitals 警报。Agency 套餐中已包含。",
    gscIndexationLabel: "GSC 索引审核(一次性)",
    gscIndexationDesc: "一次性站点覆盖审核。连接 GSC,识别所有未索引的有效页面,重新提交,并提供前/后 PDF 报告及 canonical/redirect/noindex 建议。按站点规模定价:$100(1-9 页)至 $800(100-149 页),150+ 按需报价。Agency 套餐签约时包含。",
  },
  ar: {
    planHoldBackTitle: "هذه هي المعاينة، وليست الخطة الكاملة",
    planHoldBackBody: "يتم تسليم دليل الاستراتيجية الكامل (قوالب JSON-LD لكل صفحة، نصوص التواصل مع أدلة الاستشهادات، تسلسل النشر أسبوعًا بأسبوع، بنوك FAQ مخصصة حسب القطاع، أوزان الإشارات لكل محرك ذكاء اصطناعي) مباشرةً خلال مكالمة الاستراتيجي البالغة 60 دقيقة. مجانًا، بدون بطاقة ائتمان.",
    planHoldBackCta: "حجز مكالمة الاستراتيجي",
    statusInDevelopment: "🚧 قيد التطوير",
    statusInDevelopmentTitle: "يجري الانتهاء من هذا المستوى. تقدم بطلب للحصول على مقعد مؤسس للانضمام إلى المجموعة.",
    tier1Feat8: "مكالمة استراتيجية كل أسبوعين",
    fromPrefix: "ابتداءً من",
    techHealthPackLabel: "Tech Health Pack",
    techHealthPackDesc: "يضمن فهرسة المدونات الشهرية التي تنشرها AiLys فعليًا في Google. بدون هذه الحزمة، يمكن أن تبقى الصفحات الجديدة في حالة \"تم الاكتشاف، غير مفهرسة حاليًا\" لأسابيع. تتضمن مراقبة فهرسة GSC، إعادة الفهرسة التلقائية للصفحات الجديدة، فحصًا أسبوعيًا لأخطاء الزحف، مراقبة الروابط المعطلة، وتنبيهات Core Web Vitals. مضمنة في Agency.",
    gscIndexationLabel: "تدقيق فهرسة GSC (لمرة واحدة)",
    gscIndexationDesc: "تدقيق لمرة واحدة لتغطية الموقع. يربط GSC، يحدد جميع الصفحات الصالحة غير المفهرسة بعد، يعيد إرسالها، ويسلم تقرير PDF قبل/بعد مع توصيات canonical/redirect/noindex. التسعير حسب حجم الموقع: 100 دولار (1-9 صفحات) حتى 800 دولار (100-149 صفحة)، 150+ بعرض سعر مخصص. مضمن عند التسجيل في Agency.",
  },
  ru: {
    planHoldBackTitle: "Это предварительный просмотр, а не полный план",
    planHoldBackBody: "Стратегический плейбук (шаблоны JSON-LD по страницам, скрипты обращений в каталоги цитирования, понедельный план развёртывания, банки FAQ по отраслям, веса сигналов по ИИ-движкам) предоставляется в режиме реального времени во время 60-минутного звонка со стратегом. Бесплатно, без банковской карты.",
    planHoldBackCta: "Забронировать звонок со стратегом",
    statusInDevelopment: "🚧 В разработке",
    statusInDevelopmentTitle: "Этот уровень дорабатывается. Подайте заявку на место основателя, чтобы присоединиться к когорте.",
    tier1Feat8: "Стратегический созвон раз в две недели",
    fromPrefix: "от",
    techHealthPackLabel: "Tech Health Pack",
    techHealthPackDesc: "Гарантирует, что ежемесячные блог-посты, публикуемые AiLys, действительно индексируются Google. Без этого модуля новые страницы могут неделями оставаться в статусе \"Обнаружено, в настоящее время не проиндексировано\". Включает мониторинг индексации GSC, автоматическую переиндексацию новых страниц, еженедельный обход ошибок краулинга, мониторинг битых ссылок и оповещения Core Web Vitals. Включено в Agency.",
    gscIndexationLabel: "Аудит индексации GSC (одноразово)",
    gscIndexationDesc: "Одноразовый аудит покрытия сайта. Подключает GSC, выявляет все валидные непроиндексированные страницы, повторно отправляет их и предоставляет PDF до/после с рекомендациями canonical/redirect/noindex. Цена зависит от размера сайта: $100 (1-9 страниц) до $800 (100-149 страниц), 150+ по индивидуальному расчёту. Включено при подключении тарифа Agency.",
  },
};

// EN values used as placeholders for secondary locales
const EN_PLACEHOLDER = {
  planHoldBackTitle: "This is the preview, not the full plan",
  planHoldBackBody: "The strategic playbook (JSON-LD templates per page, citation directory outreach scripts, week-by-week deployment sequence, vertical-specific FAQ banks, signal weights per AI engine) is delivered live during the 60-minute strategist call. Free, no credit card.",
  planHoldBackCta: "Book the strategist call",
  statusInDevelopment: "🚧 In development",
  statusInDevelopmentTitle: "This tier is being finalized. Apply for a founding spot to join the cohort.",
  tier1Feat8: "Bi-weekly strategy call",
  fromPrefix: "from",
  techHealthPackLabel: "Tech Health Pack",
  techHealthPackDesc: "Ensures the monthly blog posts AiLys publishes actually get indexed by Google. Without this, new pages can sit in \"Discovered, currently not indexed\" for weeks. Includes GSC indexation monitoring, auto-reindex of new pages, weekly crawl errors sweep, broken links monitoring, and Core Web Vitals alerts. Bundled in Agency.",
  gscIndexationLabel: "GSC Indexation Audit (one-time)",
  gscIndexationDesc: "One-time site coverage audit. Connects GSC, identifies all valid pages not yet indexed, re-submits them, and delivers a before/after PDF with canonical/redirect/noindex recommendations. Priced by site size: $100 (1-9 pages) up to $800 (100-149 pages), 150+ on custom quote. Bundled at signup in Agency.",
};

const SECONDARY = ["de", "hi", "it", "ja", "ko", "nl", "pl", "pt", "tr", "vi"];

function applyToFile(loc, vals) {
  const path = `${dir}/${loc}.ts`;
  let src = readFileSync(path, "utf8");
  const lines = src.split("\n");

  // Find anchors. We splice from BACK to FRONT so line numbers don't shift.
  const insertions = []; // { afterLineIndex, lines: [...] }

  function findAnchor(prefix) {
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(new RegExp(`^(\\s*)${prefix}\\s*:`));
      if (m) return { idx: i, indent: m[1].length };
    }
    return null;
  }

  // 1. After actionPlan: -> 3 planHoldBack
  const a1 = findAnchor("actionPlan");
  if (a1 && !lines.slice(a1.idx + 1, a1.idx + 5).some((l) => /planHoldBackTitle\s*:/.test(l))) {
    insertions.push({
      afterLineIndex: a1.idx,
      lines: [
        fmt(a1.indent, "planHoldBackTitle", vals.planHoldBackTitle),
        fmt(a1.indent, "planHoldBackBody", vals.planHoldBackBody),
        fmt(a1.indent, "planHoldBackCta", vals.planHoldBackCta),
      ],
    });
  }

  // 2. After badgeAutopilot: -> 2 statusInDev
  const a2 = findAnchor("badgeAutopilot");
  if (a2 && !lines.slice(a2.idx + 1, a2.idx + 4).some((l) => /statusInDevelopment\s*:/.test(l))) {
    insertions.push({
      afterLineIndex: a2.idx,
      lines: [
        fmt(a2.indent, "statusInDevelopment", vals.statusInDevelopment),
        fmt(a2.indent, "statusInDevelopmentTitle", vals.statusInDevelopmentTitle),
      ],
    });
  }

  // 3. After tier1Feat7: -> tier1Feat8
  const a3 = findAnchor("tier1Feat7");
  if (a3 && !lines.slice(a3.idx + 1, a3.idx + 3).some((l) => /tier1Feat8\s*:/.test(l))) {
    insertions.push({
      afterLineIndex: a3.idx,
      lines: [fmt(a3.indent, "tier1Feat8", vals.tier1Feat8)],
    });
  }

  // 4. After oneTimeSuffix: -> 5 keys
  const a4 = findAnchor("oneTimeSuffix");
  if (a4 && !lines.slice(a4.idx + 1, a4.idx + 8).some((l) => /fromPrefix\s*:/.test(l))) {
    insertions.push({
      afterLineIndex: a4.idx,
      lines: [
        fmt(a4.indent, "fromPrefix", vals.fromPrefix),
        fmt(a4.indent, "techHealthPackLabel", vals.techHealthPackLabel),
        fmt(a4.indent, "techHealthPackDesc", vals.techHealthPackDesc),
        fmt(a4.indent, "gscIndexationLabel", vals.gscIndexationLabel),
        fmt(a4.indent, "gscIndexationDesc", vals.gscIndexationDesc),
      ],
    });
  }

  // Apply back-to-front
  insertions.sort((a, b) => b.afterLineIndex - a.afterLineIndex);
  for (const ins of insertions) {
    lines.splice(ins.afterLineIndex + 1, 0, ...ins.lines);
  }

  writeFileSync(path, lines.join("\n"), "utf8");
  console.log(`${loc}: ${insertions.length} blocks inserted (${insertions.reduce((s, i) => s + i.lines.length, 0)} keys)`);
}

for (const loc of Object.keys(T)) applyToFile(loc, T[loc]);
for (const loc of SECONDARY) applyToFile(loc, EN_PLACEHOLDER);
