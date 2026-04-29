import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

export function drawAppendixPage(b: Builder, req: AuditPdfRequest) {
  b.cursorY = 80;
  b.drawHeading('Methodology and disclaimers', 'h1');

  b.drawHeading('How the score is computed', 'h2');
  b.drawWrapped({
    text:
      'The AI Visibility Score is a weighted aggregate of 10 to 12 signals across three categories: foundations (NAP, schema, GBP completeness), demand (review velocity and freshness, photo cadence), and reach (citation matrix coverage across six engines). Weights are tuned per vertical because what moves the needle for a dentist differs from what moves it for a contractor. We use the same proprietary score formula across every audit so the ranking stays comparable across runs.',
    size: FONT_SIZE.body,
    color: COLOR.inkSoft,
  });
  b.advance(SPACE.md);

  b.drawHeading('What we test', 'h2');
  b.drawWrapped({
    text:
      'We probe six AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Bing Copilot) with three to four buyer-intent queries scoped to your vertical and city. Citations are recorded along with rank position. The matrix shows where you appear and where competitors take placements you should hold.',
    size: FONT_SIZE.body,
    color: COLOR.inkSoft,
  });
  b.advance(SPACE.md);

  b.drawHeading('Audit metadata', 'h2');
  b.drawKeyValue('Business', req.businessName);
  if (req.location) b.drawKeyValue('Location', req.location);
  b.drawKeyValue('Vertical', req.vertical);
  b.drawKeyValue('Issued', new Date().toISOString().slice(0, 10));
  if (req.payload.auditRunId) b.drawKeyValue('Audit run id', req.payload.auditRunId);
  b.drawKeyValue('Score', `${req.payload.scoreNumeric} / 100, ${req.payload.scoreBand}`);
  b.advance(SPACE.md);

  b.drawHeading('Disclaimer', 'h2');
  b.drawWrapped({
    text:
      'This audit is informational. AI engines and search engines change ranking signals frequently and without notice; results may shift between runs. This document is not legal, financial, or medical advice. AiLys Agency is a Quebec-incorporated marketing service; all figures are CAD unless noted. Trademarks belong to their respective owners.',
    size: FONT_SIZE.caption,
    color: COLOR.inkMuted,
  });
  b.advance(SPACE.md);

  b.drawWrapped({
    text:
      'Questions about this report or the methodology? hello@ailysagency.ca. Most replies inside 24 hours during business days.',
    size: FONT_SIZE.caption,
    color: COLOR.inkMuted,
  });
}
