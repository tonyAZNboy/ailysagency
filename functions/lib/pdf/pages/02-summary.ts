import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SCORE_BAND_COLOR, SPACE } from '../tokens';

const BAND_NARRATIVE: Record<AuditPdfRequest['payload']['scoreBand'], string> = {
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

export function drawExecutiveSummary(b: Builder, req: AuditPdfRequest) {
  b.cursorY = 80;
  b.drawHeading('Executive summary', 'h1');

  b.drawWrapped({
    text: BAND_NARRATIVE[req.payload.scoreBand],
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.lg);

  // Score line with bar
  b.drawHeading('Score, 0 to 100', 'h3');
  b.drawBar({
    fraction: req.payload.scoreNumeric / 100,
    fill: SCORE_BAND_COLOR[req.payload.scoreBand],
    height: 10,
  });
  b.drawLine({
    text: `${req.payload.scoreNumeric} / 100, ${req.payload.scoreBand.toUpperCase()}`,
    size: FONT_SIZE.body,
    font: b.fonts.semibold,
    color: COLOR.inkSoft,
  });
  b.advance(SPACE.lg);

  // Top 3 wins (signals scoring "pass") and top 3 gaps (scoring "fail")
  const passes = req.payload.gbpSignals.filter((s) => s.status === 'pass').slice(0, 3);
  const fails = req.payload.gbpSignals.filter((s) => s.status === 'fail').slice(0, 3);

  if (passes.length > 0) {
    b.drawHeading('Where you are winning', 'h3');
    for (const s of passes) {
      b.drawBullet(`${s.label}, ${s.observation}`, { color: COLOR.inkSoft });
    }
    b.advance(SPACE.md);
  }

  if (fails.length > 0) {
    b.drawHeading('Top gaps to close first', 'h3');
    for (const s of fails) {
      b.drawBullet(`${s.label}, ${s.observation}`, { color: COLOR.inkSoft });
    }
    b.advance(SPACE.md);
  }

  if (passes.length === 0 && fails.length === 0) {
    b.drawWrapped({
      text:
        'No signals returned a pass or fail this run. The audit may have run on incomplete inputs. Re-run with website URL and Google Business Profile URL provided for a complete read.',
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
  }
}
