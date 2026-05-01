import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, PAGE, SPACE, STATUS_COLOR } from '../tokens';
import { sanitizeForPdf } from '../sanitize';

const ENGINES: AuditPdfRequest['payload']['citationMatrix'][number]['engine'][] = [
  'chatgpt',
  'perplexity',
  'claude',
  'gemini',
  'aio',
  'copilot',
];

const ENGINE_LABEL: Record<typeof ENGINES[number], string> = {
  chatgpt: 'ChatGPT',
  perplexity: 'Perplexity',
  claude: 'Claude',
  gemini: 'Gemini',
  aio: 'Google AIO',
  copilot: 'Bing Copilot',
};

export function drawCitationMatrixPage(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  b.cursorY = 80;
  b.drawHeading(isFr ? 'Matrice de citations, qui te nomme' : 'Citation matrix, who is naming you', 'h1');

  b.drawWrapped({
    text: isFr
      ? 'Chaque ligne est un des six moteurs qu\'on teste. Chaque colonne est une requête à intention d\'achat. Vert = cité; rouge = non cité; orange = cité mais en bas du classement (4 ou pire). Améliorer les citations sur les cellules rouges et oranges est le chemin le plus rapide vers une hausse du score.'
      : 'Each row is one of the six engines we test. Each column is a buyer-intent query. Green means cited; red means not cited; orange means cited but ranked low (4 or worse). Improving citations on red and orange cells is the fastest path to score gains.',
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  // Build the unique queries seen
  const queries = Array.from(new Set(req.payload.citationMatrix.map((c) => c.query))).slice(0, 4);
  if (queries.length === 0) {
    b.drawWrapped({
      text: isFr
        ? 'Aucune requête disponible pour cette exécution. Refais l\'audit pour remplir la matrice.'
        : 'No queries available for this run. Re-run the audit to populate the matrix.',
      size: FONT_SIZE.body,
      color: COLOR.inkMuted,
    });
    return;
  }

  // Layout: engine column = 110pt, then equal-width query columns
  const engineColW = 110;
  const queryColW = (PAGE.contentWidth - engineColW) / queries.length;
  const rowH = 28;

  // Header row
  drawCellText(b, PAGE.marginLeft, engineColW, rowH, isFr ? 'Moteur' : 'Engine', b.fonts.semibold, COLOR.brand);
  for (let i = 0; i < queries.length; i++) {
    const x = PAGE.marginLeft + engineColW + i * queryColW;
    drawCellText(b, x, queryColW, rowH, sanitizeForPdf(truncate(queries[i], 28)), b.fonts.semibold, COLOR.brand, 'center');
  }
  b.advance(rowH);
  b.drawDivider();

  // Engine rows
  for (const eng of ENGINES) {
    drawCellText(b, PAGE.marginLeft, engineColW, rowH, ENGINE_LABEL[eng], b.fonts.regular, COLOR.ink);
    for (let i = 0; i < queries.length; i++) {
      const cell = req.payload.citationMatrix.find((c) => c.engine === eng && c.query === queries[i]);
      const x = PAGE.marginLeft + engineColW + i * queryColW;
      const status = cellStatus(cell);
      const fill = STATUS_COLOR[status];
      const yPdf = PAGE.height - (b.cursorY + rowH);
      // Mini-bar inside the cell
      b.page.drawRectangle({
        x: x + 8,
        y: yPdf + 6,
        width: queryColW - 16,
        height: 6,
        color: fill,
      });
      const label = cell
        ? (cell.cited ? (isFr ? `Rang ${cell.rank ?? '-'}` : `Rank ${cell.rank ?? '-'}`) : (isFr ? 'Non cité' : 'Not cited'))
        : (isFr ? 'Aucune donnée' : 'No data');
      drawCellText(b, x, queryColW, rowH, label, b.fonts.regular, COLOR.inkSoft, 'center', 14);
    }
    b.advance(rowH);
  }

  b.advance(SPACE.md);
  b.drawHeading(isFr ? 'Ce que ça veut dire' : 'What this means', 'h3');
  const cited = req.payload.citationMatrix.filter((c) => c.cited).length;
  const total = req.payload.citationMatrix.length;
  const pct = total === 0 ? 0 : Math.round((cited / total) * 100);
  b.drawWrapped({
    text: isFr
      ? `Tu es cité dans ${cited} des ${total} cellules (${pct} %). Le plan d\'action ordonne les correctifs selon les moteurs les plus susceptibles de basculer du rouge au vert pour ton secteur.`
      : `You are cited in ${cited} of ${total} cells (${pct}%). The action plan ranks fixes by which engines are most likely to flip from red to green for your vertical.`,
    size: FONT_SIZE.body,
    color: COLOR.inkSoft,
  });
}

function cellStatus(cell?: AuditPdfRequest['payload']['citationMatrix'][number]): 'pass' | 'partial' | 'fail' {
  if (!cell) return 'fail';
  if (!cell.cited) return 'fail';
  if (cell.rank !== null && cell.rank > 3) return 'partial';
  return 'pass';
}

function drawCellText(
  b: Builder,
  x: number,
  width: number,
  height: number,
  text: string,
  font = b.fonts.regular,
  color = COLOR.ink,
  align: 'left' | 'center' = 'left',
  topPadding = 8,
) {
  const size = FONT_SIZE.caption;
  const textW = font.widthOfTextAtSize(text, size);
  const drawX = align === 'center' ? x + (width - textW) / 2 : x + 4;
  const yPdf = PAGE.height - (b.cursorY + topPadding + size);
  b.page.drawText(text, { x: drawX, y: yPdf, size, font, color });
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}
