import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

const EFFORT_LABEL: Record<AuditPdfRequest['payload']['actionItems'][number]['effort'], string> = {
  low: 'Low effort',
  medium: 'Medium effort',
  high: 'High effort',
};

const IMPACT_LABEL: Record<AuditPdfRequest['payload']['actionItems'][number]['impact'], string> = {
  low: 'Low impact',
  medium: 'Medium impact',
  high: 'High impact',
};

const IMPACT_COLOR: Record<AuditPdfRequest['payload']['actionItems'][number]['impact'], typeof COLOR.ink> = {
  low: COLOR.inkMuted,
  medium: COLOR.warn,
  high: COLOR.success,
};

export function drawActionPlanPage(b: Builder, req: AuditPdfRequest) {
  b.cursorY = 80;
  b.drawHeading('Action plan, sequenced by impact', 'h1');

  if (req.payload.actionItems.length === 0) {
    b.drawWrapped({
      text:
        'No prioritized actions were generated for this audit. The pulse engine produces actions only when at least one signal returns a fail or partial. Re-run with the website + GBP URLs filled in for a full plan.',
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
    return;
  }

  b.drawWrapped({
    text:
      'Top eight actions, ordered by priority. The order is built so each action compounds the next; do not skip ahead. Effort estimates assume your team handles the work; AiLys delivery cuts effort by roughly half on most items.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  const sorted = [...req.payload.actionItems].sort((a, c) => a.priority - c.priority);
  for (const item of sorted) {
    b.ensureSpace(58, 'Action plan', 6, 10);

    // Priority badge
    b.drawLine({
      text: `${item.priority}.`,
      size: FONT_SIZE.h2,
      font: b.fonts.bold,
      color: COLOR.accent,
      advanceBy: 0,
    });
    const startY = b.cursorY;
    b.cursorY = startY - FONT_SIZE.h2 - 2;

    // Title
    b.drawWrapped({
      text: item.title,
      size: FONT_SIZE.h3,
      font: b.fonts.semibold,
      color: COLOR.ink,
      x: 90,
      width: 460,
    });
    // Meta line
    b.drawLine({
      text: `${EFFORT_LABEL[item.effort]} | ${IMPACT_LABEL[item.impact]} | Maps to: ${item.signal}`,
      size: FONT_SIZE.caption,
      font: b.fonts.regular,
      color: IMPACT_COLOR[item.impact],
      x: 90,
    });
    b.advance(SPACE.sm);
    b.drawDivider();
  }
}
