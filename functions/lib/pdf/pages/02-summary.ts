import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SCORE_BAND_COLOR, SPACE } from '../tokens';
import { sanitizeForPdf } from '../sanitize';

const BAND_NARRATIVE_EN: Record<AuditPdfRequest['payload']['scoreBand'], string> = {
  critical:
    'Your AI visibility is in the bottom band. Generative engines are largely silent on your business, and competitors are taking the placements you should hold. The action plan inside is sequenced to recover ground in 30 to 60 days.',
  weak:
    'Your AI visibility is below the local median. Some engines surface your name, most do not. The fixes inside compound quickly because the gaps are foundational, not strategic.',
  developing:
    'Your AI visibility is roughly average for your vertical. You are surfacing in some engines but missing structural wins that would push you into the leader band.',
  strong:
    'Your AI visibility is above the local median. The action plan focuses on closing the last gaps and defending position against competitors who are catching up.',
  leader:
    'Your AI visibility leads the local market. The action plan focuses on widening the moat through fresher citations, schema density, and authority signals.',
};

const BAND_NARRATIVE_FR: Record<AuditPdfRequest['payload']['scoreBand'], string> = {
  critical:
    'Ta visibilité IA est dans le quartile inférieur. Les moteurs génératifs sont largement silencieux sur ton commerce, et les concurrents prennent les placements que tu devrais détenir. Le plan d\'action est séquencé pour reprendre du terrain en 30 à 60 jours.',
  weak:
    'Ta visibilité IA est sous la médiane locale. Certains moteurs nomment ton commerce, la plupart non. Les correctifs internes composent rapidement parce que les écarts sont fondamentaux, pas stratégiques.',
  developing:
    'Ta visibilité IA est dans la moyenne pour ton secteur. Tu apparais dans certains moteurs mais tu manques les gains structurels qui te pousseraient dans la zone leader.',
  strong:
    'Ta visibilité IA est au-dessus de la médiane locale. Le plan d\'action vise à fermer les derniers écarts et à défendre ta position face aux concurrents qui se rapprochent.',
  leader:
    'Ta visibilité IA mène le marché local. Le plan d\'action vise à élargir l\'écart par des citations fraîches, une densité de schéma plus élevée et des signaux d\'autorité plus forts.',
};

interface I18N {
  heading: string;
  scoreLabel: string;
  passes: string;
  fails: string;
  emptyNote: string;
}

const I18N_EN: I18N = {
  heading: 'Executive summary',
  scoreLabel: 'Score, 0 to 100',
  passes: 'Where you are winning',
  fails: 'Top gaps to close first',
  emptyNote:
    'No signals returned a pass or fail this run. The audit may have run on incomplete inputs. Re-run with website URL and Google Business Profile URL provided for a complete read.',
};

const I18N_FR: I18N = {
  heading: 'Résumé exécutif',
  scoreLabel: 'Score, 0 à 100',
  passes: 'Où tu performes',
  fails: 'Principaux écarts à fermer en premier',
  emptyNote:
    'Aucun signal n\'a renvoyé de réussite ou d\'échec cette fois-ci. L\'audit a probablement roulé sur des données incomplètes. Refais l\'audit avec l\'URL de ton site et l\'URL de ton Google Business Profile pour une lecture complète.',
};

const BAND_LABEL_FR: Record<AuditPdfRequest['payload']['scoreBand'], string> = {
  critical: 'CRITIQUE',
  weak: 'FAIBLE',
  developing: 'EN DÉVELOPPEMENT',
  strong: 'SOLIDE',
  leader: 'LEADER',
};

export function drawExecutiveSummary(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  const i18n = isFr ? I18N_FR : I18N_EN;
  const narrative = isFr ? BAND_NARRATIVE_FR : BAND_NARRATIVE_EN;
  const bandLabel = isFr ? BAND_LABEL_FR[req.payload.scoreBand] : req.payload.scoreBand.toUpperCase();

  b.cursorY = 80;
  b.drawHeading(i18n.heading, 'h1');

  b.drawWrapped({
    text: narrative[req.payload.scoreBand],
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.lg);

  // Score line with bar
  b.drawHeading(i18n.scoreLabel, 'h3');
  b.drawBar({
    fraction: req.payload.scoreNumeric / 100,
    fill: SCORE_BAND_COLOR[req.payload.scoreBand],
    height: 10,
  });
  b.drawLine({
    text: `${req.payload.scoreNumeric} / 100, ${bandLabel}`,
    size: FONT_SIZE.body,
    font: b.fonts.semibold,
    color: COLOR.inkSoft,
  });
  b.advance(SPACE.lg);

  // Top 3 wins (signals scoring "pass") and top 3 gaps (scoring "fail")
  const passes = req.payload.gbpSignals.filter((s) => s.status === 'pass').slice(0, 3);
  const fails = req.payload.gbpSignals.filter((s) => s.status === 'fail').slice(0, 3);

  if (passes.length > 0) {
    b.drawHeading(i18n.passes, 'h3');
    for (const s of passes) {
      b.drawBullet(`${sanitizeForPdf(s.label)}, ${sanitizeForPdf(s.observation)}`, { color: COLOR.inkSoft });
    }
    b.advance(SPACE.md);
  }

  if (fails.length > 0) {
    b.drawHeading(i18n.fails, 'h3');
    for (const s of fails) {
      b.drawBullet(`${sanitizeForPdf(s.label)}, ${sanitizeForPdf(s.observation)}`, { color: COLOR.inkSoft });
    }
    b.advance(SPACE.md);
  }

  if (passes.length === 0 && fails.length === 0) {
    b.drawWrapped({
      text: i18n.emptyNote,
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
  }
}
