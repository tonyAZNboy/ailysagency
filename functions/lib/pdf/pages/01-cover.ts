import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { BRAND, COLOR, FONT_SIZE, PAGE, SCORE_BAND_COLOR, SPACE } from '../tokens';
import { sanitizeForPdf } from '../sanitize';

const BAND_LABEL_EN: Record<AuditPdfRequest['payload']['scoreBand'], string> = {
  critical: 'CRITICAL',
  weak: 'WEAK',
  developing: 'DEVELOPING',
  strong: 'STRONG',
  leader: 'LEADER',
};
const BAND_LABEL_FR: Record<AuditPdfRequest['payload']['scoreBand'], string> = {
  critical: 'CRITIQUE',
  weak: 'FAIBLE',
  developing: 'EN DÉVELOPPEMENT',
  strong: 'SOLIDE',
  leader: 'LEADER',
};

export function drawCoverPage(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  const BAND_LABEL = isFr ? BAND_LABEL_FR : BAND_LABEL_EN;
  const reportTitleI18n = isFr ? 'Rapport audit visibilité IA' : BRAND.reportTitle;
  const scoreLabel = isFr ? 'Score visibilité IA (0 à 100)' : 'AI Visibility Score (0 to 100)';
  const issuedLabel = isFr ? 'Émis' : 'Issued';
  // Top brand band
  b.page.drawRectangle({
    x: 0,
    y: PAGE.height - 6,
    width: PAGE.width,
    height: 6,
    color: COLOR.accent,
  });

  b.cursorY = 130;
  b.drawLine({
    text: BRAND.name,
    size: FONT_SIZE.h2,
    font: b.fonts.semibold,
    color: COLOR.brand,
    align: 'center',
    advanceBy: FONT_SIZE.h2,
  });
  b.advance(SPACE.xs);
  b.drawLine({
    text: reportTitleI18n.toUpperCase(),
    size: FONT_SIZE.caption,
    font: b.fonts.regular,
    color: COLOR.inkMuted,
    align: 'center',
    advanceBy: FONT_SIZE.caption,
  });

  b.advance(SPACE.xxl);
  b.drawLine({
    text: sanitizeForPdf(req.businessName),
    size: FONT_SIZE.display,
    font: b.fonts.bold,
    color: COLOR.ink,
    align: 'center',
    advanceBy: FONT_SIZE.display,
  });

  if (req.location) {
    b.advance(SPACE.sm);
    b.drawLine({
      text: sanitizeForPdf(req.location),
      size: FONT_SIZE.h3,
      font: b.fonts.regular,
      color: COLOR.inkSoft,
      align: 'center',
      advanceBy: FONT_SIZE.h3,
    });
  }

  b.advance(SPACE.xxl);
  b.drawScoreBadge(req.payload.scoreNumeric, SCORE_BAND_COLOR[req.payload.scoreBand]);
  b.drawLine({
    text: BAND_LABEL[req.payload.scoreBand],
    size: FONT_SIZE.h3,
    font: b.fonts.bold,
    color: SCORE_BAND_COLOR[req.payload.scoreBand],
    align: 'center',
    advanceBy: FONT_SIZE.h3,
  });
  b.advance(SPACE.xs);
  b.drawLine({
    text: scoreLabel,
    size: FONT_SIZE.caption,
    font: b.fonts.regular,
    color: COLOR.inkMuted,
    align: 'center',
    advanceBy: FONT_SIZE.caption,
  });

  // Footer band: date + URL
  const dateStr = new Date().toISOString().slice(0, 10);
  const footerY = PAGE.height - 80;
  b.page.drawText(`${issuedLabel} ${dateStr}`, {
    x: PAGE.marginLeft,
    y: PAGE.height - footerY,
    size: FONT_SIZE.footer,
    font: b.fonts.regular,
    color: COLOR.inkMuted,
  });
  const urlW = b.fonts.regular.widthOfTextAtSize(BRAND.url, FONT_SIZE.footer);
  b.page.drawText(BRAND.url, {
    x: PAGE.width - PAGE.marginRight - urlW,
    y: PAGE.height - footerY,
    size: FONT_SIZE.footer,
    font: b.fonts.regular,
    color: COLOR.inkMuted,
  });
}
