// Audit report orchestrator.
//
// Top-level entry: takes the validated AuditPdfRequest and returns a
// pdf-lib Uint8Array ready to upload to R2 or stream to the client.
//
// 10 fixed pages (page count is locked, not user-controllable):
//   01 Cover
//   02 Executive summary
//   03 Citation matrix (6 engines × queries)
//   04 GBP deep dive (signals)
//   05 Competitor comparison
//   06 Action plan (priority sorted)
//   07 Schema snippets (LocalBusiness + FAQPage JSON-LD)
//   08 Glossary (AEO/GEO/E-E-A-T/share-of-model)
//   09 Next steps + tier comparison
//   10 Methodology + audit hash + disclaimer

import { PDFDocument } from 'pdf-lib';
import type { AuditPdfRequest } from '../../../src/lib/pdfRequestSchema';
import { Builder, embedStandardFonts } from './builder';
import { drawCoverPage } from './pages/01-cover';
import { drawExecutiveSummary } from './pages/02-summary';
import { drawCitationMatrixPage } from './pages/03-citation-matrix';
import { drawGbpDeepDivePage } from './pages/04-gbp-deep-dive';
import { drawCompetitorsPage } from './pages/05-competitors';
import { drawActionPlanPage } from './pages/06-action-plan';
import { drawSchemaSnippetsPage } from './pages/07-schema-snippets';
import { drawGlossaryPage } from './pages/08-glossary';
import { drawNextStepsPage } from './pages/09-next-steps';
import { drawAppendixPage } from './pages/10-appendix';

const TOTAL_PAGES = 10;

export async function renderAuditPdf(req: AuditPdfRequest): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`AI Visibility Audit, ${req.businessName}`);
  doc.setAuthor('AiLys Agency');
  doc.setSubject('AI Visibility audit report');
  doc.setKeywords(['AI Visibility', 'GBP', 'local SEO', 'AEO']);
  doc.setProducer('AiLys Agency PDF Pipeline');
  doc.setCreator('ailysagency.ca');
  doc.setCreationDate(new Date());
  doc.setModificationDate(new Date());

  const fonts = await embedStandardFonts(doc);
  const page1 = doc.addPage();
  const builder = new Builder(doc, page1, fonts);

  // Page 1: cover (no header/footer chrome)
  drawCoverPage(builder, req);

  // Pages 2-10: standard chrome + content
  drawWithChrome(builder, 2, drawExecutiveSummary, req);
  drawWithChrome(builder, 3, drawCitationMatrixPage, req);
  drawWithChrome(builder, 4, drawGbpDeepDivePage, req);
  drawWithChrome(builder, 5, drawCompetitorsPage, req);
  drawWithChrome(builder, 6, drawActionPlanPage, req);
  drawWithChrome(builder, 7, drawSchemaSnippetsPage, req);
  drawWithChrome(builder, 8, drawGlossaryPage, req);
  drawWithChrome(builder, 9, drawNextStepsPage, req);
  drawWithChrome(builder, 10, drawAppendixPage, req);

  return doc.save();
}

function drawWithChrome(
  builder: Builder,
  pageNumber: number,
  drawFn: (b: Builder, r: AuditPdfRequest) => void,
  req: AuditPdfRequest,
) {
  builder.newPage();
  const label = `Audit, page ${pageNumber} of ${TOTAL_PAGES}`;
  builder.drawHeader(label);
  drawFn(builder, req);
  builder.drawFooter(pageNumber, TOTAL_PAGES);
}
