// Monthly Visibility Report PDF orchestrator.
//
// Service-to-service entry point called by Reviuzy `monthly-visibility-export`
// edge function. Returns a pdf-lib Uint8Array of a 6-section PDF (typically
// 5-7 rendered pages depending on top-keywords + action-notes density).
//
// Sections (per CLAUDE.md hard rule #10, no proprietary AI provider/model
// names; describes user-visible behavior only):
//   1. Cover (business name, report month, brand band)
//   2. Visibility summary (current score + trend vs previous month)
//   3. Share of Model (per-engine breakdown, 6 engines)
//   4. Top keywords (Search Console connected; max 10 entries)
//   5. Sentiment (3 buckets, may be null when insufficient mentions)
//   6. Strategist action notes (max 5 entries, max 200 chars each)
//
// Reuses Builder + tokens. Optional brand override (logo URL ignored in
// MVP, brandColorHex tints the cover band when present).

import { PDFDocument } from 'pdf-lib';
import { Builder, embedStandardFonts } from './builder';
import { COLOR, FONT_SIZE, PAGE, rgbHex, SPACE } from './tokens';

export type ReportEngine = 'chatgpt' | 'perplexity' | 'claude' | 'gemini' | 'aio' | 'copilot';
export type ReportLang = 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'ru';
export type ReportBrand = 'reviuzy' | 'ailys_managed' | 'reseller';

export interface VisibilityReportPayload {
  visibility_score: { current: number; previous_month: number | null };
  share_of_model: Array<{ engine: ReportEngine; score: number; trend_pct: number }>;
  top_keywords: Array<{ keyword: string; impressions: number; avg_position: number }>;
  sentiment: { positive_pct: number; neutral_pct: number; negative_pct: number } | null;
  action_notes: string[];
}

export interface VisibilityReportRenderInput {
  businessName: string;
  reportMonth: string; // 'YYYY-MM'
  lang: ReportLang;
  brand: ReportBrand;
  brandColorHex?: string;
  payload: VisibilityReportPayload;
}

const ENGINE_LABEL: Record<ReportEngine, string> = {
  chatgpt: 'ChatGPT',
  perplexity: 'Perplexity',
  claude: 'Claude',
  gemini: 'Gemini',
  aio: 'Google AIO',
  copilot: 'Bing Copilot',
};

const COPY: Record<ReportLang, {
  reportTitle: string;
  monthLabel: string;
  visibilitySection: string;
  visibilityCurrent: string;
  visibilityTrend: (delta: number) => string;
  visibilityFirstMonth: string;
  shareOfModelSection: string;
  shareOfModelCol: string;
  shareOfModelTrendCol: string;
  topKeywordsSection: string;
  topKeywordsEmpty: string;
  topKeywordsCols: { kw: string; imp: string; pos: string };
  sentimentSection: string;
  sentimentNull: string;
  sentimentLabels: { pos: string; neu: string; neg: string };
  actionNotesSection: string;
  actionNotesEmpty: string;
  pageLabel: (n: number, total: number) => string;
  footerCopy: string;
}> = {
  en: {
    reportTitle: 'Monthly Visibility Report',
    monthLabel: 'Reporting period',
    visibilitySection: '1. Visibility summary',
    visibilityCurrent: 'Current AI Visibility score',
    visibilityTrend: (d) => `Change vs previous month: ${d >= 0 ? '+' : ''}${d.toFixed(1)} pts`,
    visibilityFirstMonth: 'First month tracked. Trend will appear next cycle.',
    shareOfModelSection: '2. Share of Model by engine',
    shareOfModelCol: 'Engine',
    shareOfModelTrendCol: 'Trend',
    topKeywordsSection: '3. Top keywords',
    topKeywordsEmpty: 'No Search Console data this period.',
    topKeywordsCols: { kw: 'Keyword', imp: 'Impressions', pos: 'Avg position' },
    sentimentSection: '4. Sentiment mix',
    sentimentNull: 'Not enough mentions this period to compute sentiment.',
    sentimentLabels: { pos: 'Positive', neu: 'Neutral', neg: 'Negative' },
    actionNotesSection: '5. Strategist notes',
    actionNotesEmpty: 'No strategist notes this cycle.',
    pageLabel: (n, total) => `Visibility report, page ${n} of ${total}`,
    footerCopy: 'AiLys Agency. ailysagency.ca. Confidential, prepared for the named recipient.',
  },
  fr: {
    reportTitle: 'Rapport mensuel de visibilité',
    monthLabel: 'Période couverte',
    visibilitySection: '1. Sommaire de visibilité',
    visibilityCurrent: 'Score AI Visibility actuel',
    visibilityTrend: (d) => `Variation vs mois précédent : ${d >= 0 ? '+' : ''}${d.toFixed(1)} pts`,
    visibilityFirstMonth: 'Premier mois suivi. La tendance apparaîtra au prochain cycle.',
    shareOfModelSection: '2. Part de modèle par moteur',
    shareOfModelCol: 'Moteur',
    shareOfModelTrendCol: 'Tendance',
    topKeywordsSection: '3. Mots-clés principaux',
    topKeywordsEmpty: 'Aucune donnée Search Console pour cette période.',
    topKeywordsCols: { kw: 'Mot-clé', imp: 'Impressions', pos: 'Position moy.' },
    sentimentSection: '4. Répartition du sentiment',
    sentimentNull: 'Trop peu de mentions cette période pour calculer le sentiment.',
    sentimentLabels: { pos: 'Positif', neu: 'Neutre', neg: 'Négatif' },
    actionNotesSection: '5. Notes du stratège',
    actionNotesEmpty: 'Aucune note du stratège ce cycle.',
    pageLabel: (n, total) => `Rapport de visibilité, page ${n} de ${total}`,
    footerCopy: 'AiLys Agency. ailysagency.ca. Confidentiel, préparé pour le destinataire nommé.',
  },
  es: {
    reportTitle: 'Informe mensual de visibilidad',
    monthLabel: 'Período del informe',
    visibilitySection: '1. Resumen de visibilidad',
    visibilityCurrent: 'Puntuación AI Visibility actual',
    visibilityTrend: (d) => `Cambio vs mes anterior: ${d >= 0 ? '+' : ''}${d.toFixed(1)} pts`,
    visibilityFirstMonth: 'Primer mes monitoreado. La tendencia aparecerá en el próximo ciclo.',
    shareOfModelSection: '2. Cuota de modelo por motor',
    shareOfModelCol: 'Motor',
    shareOfModelTrendCol: 'Tendencia',
    topKeywordsSection: '3. Palabras clave principales',
    topKeywordsEmpty: 'Sin datos de Search Console este período.',
    topKeywordsCols: { kw: 'Palabra clave', imp: 'Impresiones', pos: 'Pos. media' },
    sentimentSection: '4. Distribución de sentimiento',
    sentimentNull: 'Menciones insuficientes este período para calcular el sentimiento.',
    sentimentLabels: { pos: 'Positivo', neu: 'Neutral', neg: 'Negativo' },
    actionNotesSection: '5. Notas del estratega',
    actionNotesEmpty: 'Sin notas del estratega este ciclo.',
    pageLabel: (n, total) => `Informe de visibilidad, página ${n} de ${total}`,
    footerCopy: 'AiLys Agency. ailysagency.ca. Confidencial, preparado para el destinatario nombrado.',
  },
  zh: {
    reportTitle: '每月可见性报告',
    monthLabel: '报告期间',
    visibilitySection: '1. 可见性摘要',
    visibilityCurrent: '当前 AI Visibility 分数',
    visibilityTrend: (d) => `较上月变化: ${d >= 0 ? '+' : ''}${d.toFixed(1)} 分`,
    visibilityFirstMonth: '首月跟踪。趋势将在下一周期显示。',
    shareOfModelSection: '2. 各引擎模型份额',
    shareOfModelCol: '引擎',
    shareOfModelTrendCol: '趋势',
    topKeywordsSection: '3. 主要关键词',
    topKeywordsEmpty: '本期无 Search Console 数据。',
    topKeywordsCols: { kw: '关键词', imp: '展示量', pos: '平均位置' },
    sentimentSection: '4. 情感分布',
    sentimentNull: '本期提及量不足以计算情感。',
    sentimentLabels: { pos: '积极', neu: '中立', neg: '消极' },
    actionNotesSection: '5. 策略师备注',
    actionNotesEmpty: '本周期无策略师备注。',
    pageLabel: (n, total) => `可见性报告, 第 ${n} 页, 共 ${total} 页`,
    footerCopy: 'AiLys Agency. ailysagency.ca. 机密, 仅供指定收件人。',
  },
  ar: {
    reportTitle: 'تقرير الظهور الشهري',
    monthLabel: 'فترة التقرير',
    visibilitySection: '1. ملخص الظهور',
    visibilityCurrent: 'درجة AI Visibility الحالية',
    visibilityTrend: (d) => `التغير مقابل الشهر السابق: ${d >= 0 ? '+' : ''}${d.toFixed(1)} نقطة`,
    visibilityFirstMonth: 'الشهر الأول من التتبع. الاتجاه سيظهر في الدورة القادمة.',
    shareOfModelSection: '2. حصة النموذج حسب المحرك',
    shareOfModelCol: 'المحرك',
    shareOfModelTrendCol: 'الاتجاه',
    topKeywordsSection: '3. الكلمات الرئيسية الأولى',
    topKeywordsEmpty: 'لا توجد بيانات Search Console لهذه الفترة.',
    topKeywordsCols: { kw: 'الكلمة', imp: 'الانطباعات', pos: 'المتوسط' },
    sentimentSection: '4. توزيع المشاعر',
    sentimentNull: 'إشارات غير كافية لحساب المشاعر هذه الفترة.',
    sentimentLabels: { pos: 'إيجابي', neu: 'محايد', neg: 'سلبي' },
    actionNotesSection: '5. ملاحظات الاستراتيجي',
    actionNotesEmpty: 'لا ملاحظات هذه الدورة.',
    pageLabel: (n, total) => `تقرير الظهور, الصفحة ${n} من ${total}`,
    footerCopy: 'AiLys Agency. ailysagency.ca. سري, معد للمستلم المحدد.',
  },
  ru: {
    reportTitle: 'Ежемесячный отчёт о видимости',
    monthLabel: 'Отчётный период',
    visibilitySection: '1. Сводка видимости',
    visibilityCurrent: 'Текущий счёт AI Visibility',
    visibilityTrend: (d) => `Изменение к прошлому месяцу: ${d >= 0 ? '+' : ''}${d.toFixed(1)} п.`,
    visibilityFirstMonth: 'Первый месяц отслеживания. Тенденция появится в следующем цикле.',
    shareOfModelSection: '2. Доля модели по движкам',
    shareOfModelCol: 'Движок',
    shareOfModelTrendCol: 'Тренд',
    topKeywordsSection: '3. Главные ключевые слова',
    topKeywordsEmpty: 'Нет данных Search Console за этот период.',
    topKeywordsCols: { kw: 'Запрос', imp: 'Показы', pos: 'Сред. позиция' },
    sentimentSection: '4. Распределение тональности',
    sentimentNull: 'Недостаточно упоминаний за период для расчёта тональности.',
    sentimentLabels: { pos: 'Положительная', neu: 'Нейтральная', neg: 'Отрицательная' },
    actionNotesSection: '5. Заметки стратега',
    actionNotesEmpty: 'Нет заметок стратега в этом цикле.',
    pageLabel: (n, total) => `Отчёт о видимости, страница ${n} из ${total}`,
    footerCopy: 'AiLys Agency. ailysagency.ca. Конфиденциально, для указанного получателя.',
  },
};

const TOTAL_PAGES_HINT = 6; // page label denominator; actual page count varies

export async function renderVisibilityReportPdf(input: VisibilityReportRenderInput): Promise<Uint8Array> {
  const copy = COPY[input.lang] ?? COPY.en;
  const accent = input.brandColorHex ? rgbHex(input.brandColorHex) : COLOR.accent;

  const doc = await PDFDocument.create();
  doc.setTitle(`${copy.reportTitle}, ${input.businessName}, ${input.reportMonth}`);
  doc.setAuthor('AiLys Agency');
  doc.setSubject('Monthly AI Visibility report');
  doc.setKeywords(['AI Visibility', 'Share of Model', 'monthly report']);
  doc.setProducer('AiLys Agency PDF Pipeline');
  doc.setCreator('ailysagency.ca');
  doc.setCreationDate(new Date());
  doc.setModificationDate(new Date());

  const fonts = await embedStandardFonts(doc);
  const page1 = doc.addPage();
  const builder = new Builder(doc, page1, fonts);

  // ── Page 1: Cover ─────────────────────────────────────────────────────
  builder.page.drawRectangle({
    x: 0,
    y: PAGE.height - 8,
    width: PAGE.width,
    height: 8,
    color: accent,
  });

  builder.cursorY = 140;
  builder.drawLine({
    text: 'AiLys Agency',
    size: FONT_SIZE.h2,
    font: fonts.semibold,
    color: COLOR.brand,
    align: 'center',
    advanceBy: FONT_SIZE.h2,
  });
  builder.advance(SPACE.xs);
  builder.drawLine({
    text: copy.reportTitle.toUpperCase(),
    size: FONT_SIZE.caption,
    font: fonts.regular,
    color: COLOR.inkMuted,
    align: 'center',
    advanceBy: FONT_SIZE.caption,
  });
  builder.advance(SPACE.xl);

  builder.drawLine({
    text: input.businessName,
    size: FONT_SIZE.h1,
    font: fonts.bold,
    color: COLOR.ink,
    align: 'center',
    advanceBy: FONT_SIZE.h1,
  });
  builder.advance(SPACE.md);
  builder.drawLine({
    text: `${copy.monthLabel}: ${input.reportMonth}`,
    size: FONT_SIZE.body,
    font: fonts.regular,
    color: COLOR.inkSoft,
    align: 'center',
    advanceBy: FONT_SIZE.body,
  });

  // ── Page 2: Visibility summary ───────────────────────────────────────
  builder.newPage();
  builder.drawHeader(copy.pageLabel(2, TOTAL_PAGES_HINT));
  builder.drawHeading(copy.visibilitySection, 'h1');
  builder.drawLine({
    text: `${copy.visibilityCurrent}: ${input.payload.visibility_score.current.toFixed(1)} / 100`,
    size: FONT_SIZE.h2,
    font: fonts.semibold,
    color: COLOR.brand,
    advanceBy: FONT_SIZE.h2,
  });
  builder.advance(SPACE.sm);
  if (input.payload.visibility_score.previous_month != null) {
    const delta = input.payload.visibility_score.current - input.payload.visibility_score.previous_month;
    builder.drawLine({
      text: copy.visibilityTrend(delta),
      size: FONT_SIZE.body,
      color: COLOR.inkSoft,
      advanceBy: FONT_SIZE.body,
    });
  } else {
    builder.drawLine({
      text: copy.visibilityFirstMonth,
      size: FONT_SIZE.body,
      color: COLOR.inkSoft,
      advanceBy: FONT_SIZE.body,
    });
  }
  builder.drawFooter(2, TOTAL_PAGES_HINT);

  // ── Page 3: Share of Model ───────────────────────────────────────────
  builder.newPage();
  builder.drawHeader(copy.pageLabel(3, TOTAL_PAGES_HINT));
  builder.drawHeading(copy.shareOfModelSection, 'h1');
  for (const row of input.payload.share_of_model) {
    const label = ENGINE_LABEL[row.engine];
    const trend = row.trend_pct >= 0 ? `+${row.trend_pct.toFixed(1)}%` : `${row.trend_pct.toFixed(1)}%`;
    builder.drawLine({
      text: `${label}  -  ${row.score.toFixed(1)} / 100  -  ${copy.shareOfModelTrendCol}: ${trend}`,
      size: FONT_SIZE.body,
      color: COLOR.ink,
      advanceBy: FONT_SIZE.body + 4,
    });
  }
  builder.drawFooter(3, TOTAL_PAGES_HINT);

  // ── Page 4: Top keywords ─────────────────────────────────────────────
  builder.newPage();
  builder.drawHeader(copy.pageLabel(4, TOTAL_PAGES_HINT));
  builder.drawHeading(copy.topKeywordsSection, 'h1');
  if (input.payload.top_keywords.length === 0) {
    builder.drawLine({ text: copy.topKeywordsEmpty, size: FONT_SIZE.body, color: COLOR.inkMuted, advanceBy: FONT_SIZE.body });
  } else {
    for (const kw of input.payload.top_keywords.slice(0, 10)) {
      const safeKw = kw.keyword.length > 70 ? kw.keyword.slice(0, 67) + '...' : kw.keyword;
      builder.drawLine({
        text: `${safeKw}  -  ${kw.impressions} ${copy.topKeywordsCols.imp.toLowerCase()}  -  ${copy.topKeywordsCols.pos}: ${kw.avg_position.toFixed(1)}`,
        size: FONT_SIZE.body,
        color: COLOR.ink,
        advanceBy: FONT_SIZE.body + 4,
      });
    }
  }
  builder.drawFooter(4, TOTAL_PAGES_HINT);

  // ── Page 5: Sentiment ────────────────────────────────────────────────
  builder.newPage();
  builder.drawHeader(copy.pageLabel(5, TOTAL_PAGES_HINT));
  builder.drawHeading(copy.sentimentSection, 'h1');
  if (input.payload.sentiment == null) {
    builder.drawLine({ text: copy.sentimentNull, size: FONT_SIZE.body, color: COLOR.inkMuted, advanceBy: FONT_SIZE.body });
  } else {
    const s = input.payload.sentiment;
    builder.drawLine({ text: `${copy.sentimentLabels.pos}: ${s.positive_pct.toFixed(1)}%`, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
    builder.drawLine({ text: `${copy.sentimentLabels.neu}: ${s.neutral_pct.toFixed(1)}%`, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
    builder.drawLine({ text: `${copy.sentimentLabels.neg}: ${s.negative_pct.toFixed(1)}%`, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
  }
  builder.drawFooter(5, TOTAL_PAGES_HINT);

  // ── Page 6: Strategist action notes ──────────────────────────────────
  builder.newPage();
  builder.drawHeader(copy.pageLabel(6, TOTAL_PAGES_HINT));
  builder.drawHeading(copy.actionNotesSection, 'h1');
  if (input.payload.action_notes.length === 0) {
    builder.drawLine({ text: copy.actionNotesEmpty, size: FONT_SIZE.body, color: COLOR.inkMuted, advanceBy: FONT_SIZE.body });
  } else {
    for (const note of input.payload.action_notes.slice(0, 5)) {
      const safe = note.length > 200 ? note.slice(0, 197) + '...' : note;
      builder.drawWrapped({ text: `- ${safe}`, size: FONT_SIZE.body, color: COLOR.ink });
      builder.advance(SPACE.xs);
    }
  }
  builder.advance(SPACE.lg);
  builder.drawLine({ text: copy.footerCopy, size: FONT_SIZE.caption, color: COLOR.inkMuted, advanceBy: FONT_SIZE.caption });
  builder.drawFooter(6, TOTAL_PAGES_HINT);

  return doc.save();
}
