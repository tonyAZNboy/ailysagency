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

// Pages 4 (GBP), 5 (Competitors), 6 (Action plan) are SKIPPED when their
// underlying data array is empty (avoids 4 blank pages of "no data captured"
// in transactional PDFs sent from /api/audit-pdf where the Reviuzy edge fn
// did not surface those sections). Cover, Summary, Citation Matrix, Schema
// teaser, Glossary, Next steps, Appendix always render.

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

  // Build the active page list dynamically. Skip data-driven pages when
  // their underlying arrays are empty so we never ship a paper-wasting
  // "No data captured" placeholder.
  const pages: Array<(b: Builder, r: AuditPdfRequest) => void> = [];
  pages.push(drawExecutiveSummary);
  if (req.payload.citationMatrix.length > 0) pages.push(drawCitationMatrixPage);
  if (req.payload.gbpSignals.length > 0) pages.push(drawGbpDeepDivePage);
  if (req.payload.competitors.length > 0) pages.push(drawCompetitorsPage);
  if (req.payload.actionItems.length > 0) pages.push(drawActionPlanPage);
  pages.push(drawSchemaSnippetsPage);
  pages.push(drawGlossaryPage);
  pages.push(drawNextStepsPage);
  pages.push(drawAppendixPage);

  const totalPages = pages.length + 1; // +1 for cover

  // Page 1: cover (no header/footer chrome)
  drawCoverPage(builder, req);

  // Remaining pages with standard chrome
  const isFr = req.lang === 'fr';
  const pageLabel = isFr ? 'Audit, page' : 'Audit, page';
  const ofWord = isFr ? 'sur' : 'of';

  pages.forEach((drawFn, i) => {
    const pageNumber = i + 2;
    builder.newPage();
    builder.drawHeader(`${pageLabel} ${pageNumber} ${ofWord} ${totalPages}`);
    drawFn(builder, req);
    builder.drawFooter(pageNumber, totalPages);
  });

  return doc.save();
}
