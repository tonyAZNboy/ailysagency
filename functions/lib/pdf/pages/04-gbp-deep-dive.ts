import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE, STATUS_COLOR } from '../tokens';

export function drawGbpDeepDivePage(b: Builder, req: AuditPdfRequest) {
  b.cursorY = 80;
  b.drawHeading('GBP signals, weighted breakdown', 'h1');

  if (req.payload.gbpSignals.length === 0) {
    b.drawWrapped({
      text:
        'No GBP signals were captured. Provide your Google Business Profile URL when running the audit so we can pull rating, review velocity, photos, hours, attributes, and Q&A.',
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
    return;
  }

  b.drawWrapped({
    text:
      'Each signal is weighted by its proven correlation with AI engine citations for your vertical. Bar fill shows the signal status: green is pass, orange partial, red fail. Weight shows how much of the overall score this signal moves.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  for (const signal of req.payload.gbpSignals) {
    b.ensureSpace(70, 'GBP deep dive', 4, 10);
    b.drawLine({
      text: signal.label,
      size: FONT_SIZE.h3,
      font: b.fonts.semibold,
      color: COLOR.ink,
    });
    b.drawBar({
      fraction: signal.weight,
      fill: STATUS_COLOR[signal.status],
      height: 6,
    });
    b.drawWrapped({
      text: `Weight ${(signal.weight * 100).toFixed(0)}%, status ${signal.status}. ${signal.observation}`,
      size: FONT_SIZE.caption,
      color: COLOR.inkSoft,
    });
    b.advance(SPACE.sm);
  }
}
