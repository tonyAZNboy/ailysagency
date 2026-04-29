import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

interface TierLine {
  name: string;
  price: string;
  bullet: string;
}

const TIERS: TierLine[] = [
  {
    name: 'Starter',
    price: '$300 CAD per month',
    bullet:
      'GBP foundations, 5 citations per month, 1 GBP post per month, monthly AI Visibility report. For solo operators ready to defend their local map placement.',
  },
  {
    name: 'Core',
    price: '$600 CAD per month',
    bullet:
      'Everything in Starter, plus 10 citations per month, 4 GBP posts per month, weekly AI Visibility probes, NAP audit and remediation, schema deployment.',
  },
  {
    name: 'Growth',
    price: '$1,200 CAD per month',
    bullet:
      'Everything in Core, plus 15 citations per month, 8 GBP posts per month, Wikidata entity work, daily AI Visibility probes, executive monthly briefing.',
  },
  {
    name: 'Agency',
    price: '$2,500 CAD per month',
    bullet:
      'Everything in Growth, plus multi-location dashboard, white-label PDF reports, 12 GBP posts per month, Slack SLA, dedicated senior strategist, quarterly in-person review.',
  },
];

export function drawNextStepsPage(b: Builder, req: AuditPdfRequest) {
  void req;
  b.cursorY = 80;
  b.drawHeading('Next steps', 'h1');

  b.drawWrapped({
    text:
      'Your audit is the first 30 minutes of the first month. The next 60 minutes is a strategy call to map the action plan to your team capacity. Bring this PDF; we will work through it page by page and decide what you ship in week one.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  // Strong CTA card
  b.drawCard({
    x: 56,
    width: 500,
    height: 70,
    color: COLOR.brand,
  });
  b.drawLine({
    text: 'Book the 60-minute strategy call',
    size: FONT_SIZE.h2,
    font: b.fonts.bold,
    color: COLOR.bg,
    x: 76,
    advanceBy: FONT_SIZE.h2,
  });
  b.advance(SPACE.xs);
  b.drawLine({
    text: 'ailysagency.ca/contact, no pitch, you keep the strategy doc.',
    size: FONT_SIZE.body,
    font: b.fonts.regular,
    color: COLOR.bg,
    x: 76,
    advanceBy: FONT_SIZE.body,
  });
  b.advance(SPACE.lg + 20);

  // Tier ladder
  b.drawHeading('If you decide to move', 'h2');
  for (const tier of TIERS) {
    b.ensureSpace(60, 'Next steps', 9, 10);
    b.drawLine({
      text: `${tier.name}, ${tier.price}`,
      size: FONT_SIZE.h3,
      font: b.fonts.bold,
      color: COLOR.brand,
    });
    b.drawWrapped({
      text: tier.bullet,
      size: FONT_SIZE.body,
      color: COLOR.inkSoft,
    });
    b.advance(SPACE.sm);
  }

  b.advance(SPACE.md);
  b.drawWrapped({
    text:
      'Every tier is month to month with a 30-day satisfaction guarantee. Cancel anytime. Founding-client pricing is locked for the duration of the contract.',
    size: FONT_SIZE.caption,
    color: COLOR.inkMuted,
  });
}
