import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, PAGE, SPACE } from '../tokens';
import { sanitizeForPdf } from '../sanitize';

export function drawCompetitorsPage(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  b.cursorY = 80;
  b.drawHeading(isFr ? 'Comparaison des concurrents' : 'Competitor comparison', 'h1');

  if (req.payload.competitors.length === 0) {
    b.drawWrapped({
      text: isFr
        ? 'Aucune donnée concurrent capturée. Fournis l\'URL de ton Google Business Profile au moment de l\'audit et on tirera les trois commerces les plus proches dans la même catégorie, à moins de 5 km.'
        : 'No competitor data was captured. Provide your Google Business Profile URL when running the audit and we will pull the top three same-category businesses within 5km.',
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
    return;
  }

  b.drawWrapped({
    text: isFr
      ? 'Les trois commerces les plus proches dans la même catégorie, à moins de 5 km, classés par note multipliée par nombre d\'avis. Sers-toi de ça pour fixer des cibles réalistes pour ta propre vélocité d\'avis et ta note.'
      : 'The closest three same-category businesses within 5km, ranked by rating times review count. Use this to set realistic targets for your own review velocity and rating goals.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  // Column layout
  const nameW = 240;
  const ratingW = 80;
  const reviewW = 90;
  const distanceW = 80;
  const rowH = 32;

  const headerLabels = isFr
    ? ['Commerce', 'Note', 'Avis', 'Distance']
    : ['Business', 'Rating', 'Reviews', 'Distance'];
  const headerXs = [
    PAGE.marginLeft,
    PAGE.marginLeft + nameW,
    PAGE.marginLeft + nameW + ratingW,
    PAGE.marginLeft + nameW + ratingW + reviewW,
  ];
  // Header row
  for (let i = 0; i < headerLabels.length; i++) {
    const yPdf = PAGE.height - (b.cursorY + FONT_SIZE.caption);
    b.page.drawText(headerLabels[i], {
      x: headerXs[i] + 4,
      y: yPdf,
      size: FONT_SIZE.caption,
      font: b.fonts.semibold,
      color: COLOR.brand,
    });
  }
  b.advance(FONT_SIZE.caption + SPACE.xs);
  b.drawDivider();

  for (const co of req.payload.competitors) {
    const cardYTop = b.cursorY;
    const cardH = rowH;
    b.drawCard({
      x: PAGE.marginLeft,
      width: PAGE.contentWidth,
      height: cardH,
      color: COLOR.surface,
    });

    drawCellAt(b, headerXs[0] + 4, cardYTop + 9, sanitizeForPdf(truncate(co.name, 38)), b.fonts.semibold, COLOR.ink);
    drawCellAt(
      b,
      headerXs[1] + 4,
      cardYTop + 9,
      co.rating !== null ? co.rating.toFixed(1) : '-',
      b.fonts.regular,
      COLOR.inkSoft,
    );
    drawCellAt(
      b,
      headerXs[2] + 4,
      cardYTop + 9,
      co.reviewCount !== null ? co.reviewCount.toLocaleString('en-US') : '-',
      b.fonts.regular,
      COLOR.inkSoft,
    );
    drawCellAt(
      b,
      headerXs[3] + 4,
      cardYTop + 9,
      co.distanceMeters !== null ? `${(co.distanceMeters / 1000).toFixed(1)} km` : '-',
      b.fonts.regular,
      COLOR.inkSoft,
    );

    b.advance(cardH + SPACE.xs);
  }

  b.advance(SPACE.md);
  b.drawHeading(isFr ? 'Comment lire ça' : 'How to read this', 'h3');
  b.drawWrapped({
    text: isFr
      ? 'Si ta note est sous celle de ton concurrent le plus proche par 0,3 ou plus, les moteurs IA vont favoriser le concurrent dans les réponses vocales et chat. Si ton nombre d\'avis est inférieur de 30 % ou plus, le signal de confiance se compose contre toi. Les deux se réparent par la vélocité des avis, pas par des campagnes ponctuelles.'
      : 'If your rating is below your nearest competitor by 0.3 or more, AI engines will favor the competitor in voice and chat answers. If your review count is below by 30% or more, the trust signal compounds against you. Both are repaired by review velocity, not by single-event campaigns.',
    size: FONT_SIZE.body,
    color: COLOR.inkSoft,
  });
}

function drawCellAt(b: Builder, x: number, yTop: number, text: string, font: typeof b.fonts.regular, color: typeof COLOR.ink) {
  const yPdf = PAGE.height - (yTop + FONT_SIZE.caption);
  b.page.drawText(text, { x, y: yPdf, size: FONT_SIZE.caption, font, color });
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}
