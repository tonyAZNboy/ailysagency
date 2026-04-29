import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, PAGE, SPACE } from '../tokens';

export function drawSchemaSnippetsPage(b: Builder, req: AuditPdfRequest) {
  b.cursorY = 80;
  b.drawHeading('Schema snippets, copy-paste ready', 'h1');

  b.drawWrapped({
    text:
      'Add these JSON-LD blocks to your home page, contact page, and any FAQ page. Schema density correlates with citation rate on Perplexity and Google AI Overviews. Validate the result at search.google.com/test/rich-results.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  // LocalBusiness snippet
  b.drawHeading('LocalBusiness', 'h3');
  drawCodeBlock(b, localBusinessJson(req));
  b.advance(SPACE.md);

  // FAQPage stub
  b.drawHeading('FAQPage (replace items)', 'h3');
  drawCodeBlock(b, faqPageJson());
}

function localBusinessJson(req: AuditPdfRequest): string {
  // Generate a minimal LocalBusiness shape from the audit data.
  // Keep field names exact (Schema.org canonical casing).
  const business = {
    '@context': 'https://schema.org',
    '@type': mapVerticalToSchemaType(req.vertical),
    name: req.businessName,
    address: req.location ? { '@type': 'PostalAddress', addressLocality: req.location } : undefined,
    url: req.websiteUrl ?? undefined,
    sameAs: req.gbpUrl ? [req.gbpUrl] : undefined,
  };
  return JSON.stringify(business, null, 2);
}

function faqPageJson(): string {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Sample question goes here',
        acceptedAnswer: { '@type': 'Answer', text: 'Sample answer text for this question.' },
      },
    ],
  };
  return JSON.stringify(obj, null, 2);
}

function mapVerticalToSchemaType(vertical: string): string {
  switch (vertical) {
    case 'dentist':
      return 'Dentist';
    case 'lawyer':
      return 'LegalService';
    case 'restaurant':
      return 'Restaurant';
    case 'contractor':
      return 'GeneralContractor';
    case 'clinic':
      return 'MedicalClinic';
    case 'real_estate':
      return 'RealEstateAgent';
    case 'hotel':
      return 'Hotel';
    default:
      return 'LocalBusiness';
  }
}

function drawCodeBlock(b: Builder, code: string) {
  // pdf-lib's standard Helvetica is not monospace, but we can approximate
  // a code block by using a smaller size + surface card background. Bundle
  // size matters more than aesthetics here.
  const lines = code.split('\n');
  const lineHeight = FONT_SIZE.caption * 1.4;
  const padding = 10;
  const cardH = lines.length * lineHeight + padding * 2;
  b.drawCard({
    x: PAGE.marginLeft,
    width: PAGE.contentWidth,
    height: cardH,
    color: COLOR.surface,
    border: COLOR.border,
    borderThickness: 0.5,
  });
  let y = b.cursorY + padding;
  for (const line of lines) {
    const yPdf = PAGE.height - (y + FONT_SIZE.caption);
    b.page.drawText(line, {
      x: PAGE.marginLeft + padding,
      y: yPdf,
      size: FONT_SIZE.caption,
      font: b.fonts.regular,
      color: COLOR.ink,
    });
    y += lineHeight;
  }
  b.advance(cardH + SPACE.sm);
}
