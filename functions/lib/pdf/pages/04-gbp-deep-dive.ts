import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE, STATUS_COLOR } from '../tokens';
import { sanitizeForPdf } from '../sanitize';

export function drawGbpDeepDivePage(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  b.cursorY = 80;
  b.drawHeading(isFr ? 'Signaux GBP, ventilation pondérée' : 'GBP signals, weighted breakdown', 'h1');

  if (req.payload.gbpSignals.length === 0) {
    b.drawWrapped({
      text: isFr
        ? 'Aucun signal GBP capturé. Fournis l\'URL de ton Google Business Profile au moment de l\'audit pour qu\'on puisse tirer la note, la vélocité des avis, les photos, les heures, les attributs et les Q&R.'
        : 'No GBP signals were captured. Provide your Google Business Profile URL when running the audit so we can pull rating, review velocity, photos, hours, attributes, and Q&A.',
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
    return;
  }

  b.drawWrapped({
    text: isFr
      ? 'Chaque signal est pondéré par sa corrélation prouvée avec les citations des moteurs IA pour ton secteur. Le remplissage de la barre montre le statut du signal : vert = réussite, orange = partiel, rouge = échec. Le poids indique l\'impact du signal sur le score global.'
      : 'Each signal is weighted by its proven correlation with AI engine citations for your vertical. Bar fill shows the signal status: green is pass, orange partial, red fail. Weight shows how much of the overall score this signal moves.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  const statusLabel: Record<string, string> = isFr
    ? { pass: 'réussite', partial: 'partiel', fail: 'échec' }
    : { pass: 'pass', partial: 'partial', fail: 'fail' };
  const weightWord = isFr ? 'Poids' : 'Weight';
  const statusWord = isFr ? 'statut' : 'status';

  for (const signal of req.payload.gbpSignals) {
    b.ensureSpace(70, isFr ? 'GBP, analyse' : 'GBP deep dive', 4, 10);
    b.drawLine({
      text: sanitizeForPdf(signal.label),
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
      text: `${weightWord} ${(signal.weight * 100).toFixed(0)} %, ${statusWord} ${statusLabel[signal.status] ?? signal.status}. ${sanitizeForPdf(signal.observation)}`,
      size: FONT_SIZE.caption,
      color: COLOR.inkSoft,
    });
    b.advance(SPACE.sm);
  }
}
