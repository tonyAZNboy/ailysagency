import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';
import { sanitizeForPdf } from '../sanitize';

interface I18N {
  heading: string;
  scoreHeading: string;
  scoreBody: string;
  testHeading: string;
  testBody: string;
  metaHeading: string;
  metaBusiness: string;
  metaLocation: string;
  metaVertical: string;
  metaIssued: string;
  metaRunId: string;
  metaScore: string;
  disclaimerHeading: string;
  disclaimerBody: string;
  contactBody: string;
}

const I18N_EN: I18N = {
  heading: 'Methodology and disclaimers',
  scoreHeading: 'How the score is computed',
  scoreBody:
    'The AI Visibility Score is a weighted aggregate of 10 to 12 signals across three categories: foundations (NAP, schema, GBP completeness), demand (review velocity and freshness, photo cadence), and reach (citation matrix coverage across six engines). Weights are tuned per vertical because what moves the needle for a dentist differs from what moves it for a contractor. We use the same proprietary score formula across every audit so the ranking stays comparable across runs.',
  testHeading: 'What we test',
  testBody:
    'We probe six AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Bing Copilot) with three to four buyer-intent queries scoped to your vertical and city. Citations are recorded along with rank position. The matrix shows where you appear and where competitors take placements you should hold.',
  metaHeading: 'Audit metadata',
  metaBusiness: 'Business',
  metaLocation: 'Location',
  metaVertical: 'Vertical',
  metaIssued: 'Issued',
  metaRunId: 'Audit run id',
  metaScore: 'Score',
  disclaimerHeading: 'Disclaimer',
  disclaimerBody:
    'This audit is informational. AI engines and search engines change ranking signals frequently and without notice; results may shift between runs. This document is not legal, financial, or medical advice. AiLys Agency is a Quebec-incorporated marketing service; all figures are CAD unless noted. Trademarks belong to their respective owners.',
  contactBody:
    'Questions about this report or the methodology? hello@ailysagency.ca. Most replies inside 24 hours during business days.',
};

const I18N_FR: I18N = {
  heading: 'Méthodologie et avis',
  scoreHeading: 'Comment le score est calculé',
  scoreBody:
    'Le score visibilité IA est un agrégat pondéré de 10 à 12 signaux dans trois catégories : fondations (NAP, schéma, complétude GBP), demande (vélocité et fraîcheur des avis, cadence photos), et portée (couverture de la matrice de citations sur six moteurs). Les poids sont ajustés par secteur parce que ce qui bouge l\'aiguille pour un dentiste diffère de ce qui la bouge pour un entrepreneur. On utilise la même formule de score propriétaire sur chaque audit pour que le classement reste comparable d\'une exécution à l\'autre.',
  testHeading: 'Ce qu\'on teste',
  testBody:
    'On sonde six moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Bing Copilot) avec trois à quatre requêtes à intention d\'achat ciblées sur ton secteur et ta ville. Les citations sont enregistrées avec leur position dans le rang. La matrice montre où tu apparais et où les concurrents prennent des placements que tu devrais détenir.',
  metaHeading: 'Métadonnées de l\'audit',
  metaBusiness: 'Commerce',
  metaLocation: 'Emplacement',
  metaVertical: 'Secteur',
  metaIssued: 'Émis',
  metaRunId: 'ID exécution',
  metaScore: 'Score',
  disclaimerHeading: 'Avis',
  disclaimerBody:
    'Cet audit est à titre informatif. Les moteurs IA et les moteurs de recherche changent leurs signaux de classement fréquemment et sans préavis; les résultats peuvent varier entre les exécutions. Ce document n\'est pas un conseil juridique, financier ou médical. AiLys Agency est un service marketing constitué au Québec; tous les montants sont en CAD sauf indication contraire. Les marques de commerce appartiennent à leurs propriétaires respectifs.',
  contactBody:
    'Des questions sur ce rapport ou la méthodologie ? hello@ailysagency.ca. La plupart des réponses arrivent en moins de 24 heures durant les jours ouvrables.',
};

export function drawAppendixPage(b: Builder, req: AuditPdfRequest) {
  const i18n = req.lang === 'fr' ? I18N_FR : I18N_EN;
  b.cursorY = 80;
  b.drawHeading(i18n.heading, 'h1');

  b.drawHeading(i18n.scoreHeading, 'h2');
  b.drawWrapped({ text: i18n.scoreBody, size: FONT_SIZE.body, color: COLOR.inkSoft });
  b.advance(SPACE.md);

  b.drawHeading(i18n.testHeading, 'h2');
  b.drawWrapped({ text: i18n.testBody, size: FONT_SIZE.body, color: COLOR.inkSoft });
  b.advance(SPACE.md);

  b.drawHeading(i18n.metaHeading, 'h2');
  b.drawKeyValue(i18n.metaBusiness, sanitizeForPdf(req.businessName));
  if (req.location) b.drawKeyValue(i18n.metaLocation, sanitizeForPdf(req.location));
  b.drawKeyValue(i18n.metaVertical, sanitizeForPdf(req.vertical));
  b.drawKeyValue(i18n.metaIssued, new Date().toISOString().slice(0, 10));
  if (req.payload.auditRunId) b.drawKeyValue(i18n.metaRunId, req.payload.auditRunId);
  b.drawKeyValue(i18n.metaScore, `${req.payload.scoreNumeric} / 100, ${req.payload.scoreBand}`);
  b.advance(SPACE.md);

  b.drawHeading(i18n.disclaimerHeading, 'h2');
  b.drawWrapped({ text: i18n.disclaimerBody, size: FONT_SIZE.caption, color: COLOR.inkMuted });
  b.advance(SPACE.md);

  b.drawWrapped({ text: i18n.contactBody, size: FONT_SIZE.caption, color: COLOR.inkMuted });
}
