// Typography grid helper for the audit PDF.
//
// Wraps pdf-lib's primitive `drawText` / `drawRectangle` / `drawLine` calls
// with a content-flow API. Every page draw fn should consume `Builder`
// rather than calling pdf-lib primitives directly. This keeps spacing,
// font selection, and color tokens centralized.
//
// Coordinate system note: pdf-lib's origin is bottom-left of the page.
// Builder hides this by tracking a top-down `y` cursor measured from the
// page top, with `paint()` translating at draw time.

import {
  PDFDocument,
  PDFPage,
  PDFFont,
  rgb,
  RGB,
  StandardFonts,
} from 'pdf-lib';
import { COLOR, FONT_SIZE, PAGE, SPACE } from './tokens';

export interface BuilderFonts {
  regular: PDFFont;
  bold: PDFFont;
  semibold: PDFFont;
}

export class Builder {
  doc: PDFDocument;
  page: PDFPage;
  fonts: BuilderFonts;
  /** Top-down y cursor in points from page top edge. */
  cursorY: number;

  constructor(doc: PDFDocument, page: PDFPage, fonts: BuilderFonts) {
    this.doc = doc;
    this.page = page;
    this.fonts = fonts;
    this.cursorY = PAGE.marginTop;
  }

  /** Convert top-down y to pdf-lib's bottom-up coordinate. */
  private yPdf(yTop: number): number {
    return PAGE.height - yTop;
  }

  /** Move the cursor down by `dy` points. */
  advance(dy: number) {
    this.cursorY += dy;
  }

  /** Reset cursor to top margin (use after `addPage`). */
  resetCursor() {
    this.cursorY = PAGE.marginTop;
  }

  /** Add a new page and reset the cursor. Returns the new page. */
  newPage(): PDFPage {
    this.page = this.doc.addPage([PAGE.width, PAGE.height]);
    this.resetCursor();
    return this.page;
  }

  // ── Text primitives ───────────────────────────────────────────────────

  /**
   * Draw a single line of text at the current cursor, then advance.
   * Returns the actual y position drawn at (in pdf-lib coords) so callers
   * can compose adjacent shapes if needed.
   */
  drawLine(opts: {
    text: string;
    size?: number;
    font?: PDFFont;
    color?: RGB;
    x?: number;
    advanceBy?: number;
    align?: 'left' | 'center' | 'right';
  }): number {
    const size = opts.size ?? FONT_SIZE.body;
    const font = opts.font ?? this.fonts.regular;
    const color = opts.color ?? COLOR.ink;
    let x = opts.x ?? PAGE.marginLeft;

    if (opts.align === 'center' || opts.align === 'right') {
      const w = font.widthOfTextAtSize(opts.text, size);
      if (opts.align === 'center') x = (PAGE.width - w) / 2;
      else x = PAGE.width - PAGE.marginRight - w;
    }

    const yPdf = this.yPdf(this.cursorY + size);
    this.page.drawText(opts.text, { x, y: yPdf, size, font, color });
    this.advance((opts.advanceBy ?? size) + 2);
    return yPdf;
  }

  /**
   * Draw text wrapped to the content column. Uses simple greedy word-break.
   */
  drawWrapped(opts: {
    text: string;
    size?: number;
    font?: PDFFont;
    color?: RGB;
    x?: number;
    width?: number;
    lineHeight?: number;
  }) {
    const size = opts.size ?? FONT_SIZE.body;
    const font = opts.font ?? this.fonts.regular;
    const color = opts.color ?? COLOR.ink;
    const x = opts.x ?? PAGE.marginLeft;
    const width = opts.width ?? PAGE.contentWidth;
    const lineHeight = opts.lineHeight ?? size * 1.45;

    const words = opts.text.split(/\s+/);
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      const w = font.widthOfTextAtSize(candidate, size);
      if (w > width && line) {
        const yPdf = this.yPdf(this.cursorY + size);
        this.page.drawText(line, { x, y: yPdf, size, font, color });
        this.advance(lineHeight);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) {
      const yPdf = this.yPdf(this.cursorY + size);
      this.page.drawText(line, { x, y: yPdf, size, font, color });
      this.advance(lineHeight);
    }
  }

  /** Section heading: bold, larger size, accent rule below. */
  drawHeading(text: string, level: 'h1' | 'h2' | 'h3' = 'h1') {
    const size = level === 'h1' ? FONT_SIZE.h1 : level === 'h2' ? FONT_SIZE.h2 : FONT_SIZE.h3;
    const font = this.fonts.bold;
    this.drawLine({ text, size, font, color: COLOR.brand });
    if (level === 'h1') {
      const yPdf = this.yPdf(this.cursorY);
      this.page.drawLine({
        start: { x: PAGE.marginLeft, y: yPdf },
        end: { x: PAGE.marginLeft + 60, y: yPdf },
        thickness: 2,
        color: COLOR.accent,
      });
      this.advance(SPACE.md);
    } else {
      this.advance(SPACE.sm);
    }
  }

  /** Horizontal divider rule across the content column. */
  drawDivider(color: RGB = COLOR.border, thickness = 0.6) {
    const yPdf = this.yPdf(this.cursorY);
    this.page.drawLine({
      start: { x: PAGE.marginLeft, y: yPdf },
      end: { x: PAGE.marginLeft + PAGE.contentWidth, y: yPdf },
      thickness,
      color,
    });
    this.advance(SPACE.sm);
  }

  /** Bullet item with optional indent. */
  drawBullet(text: string, opts: { indent?: number; size?: number; color?: RGB } = {}) {
    const size = opts.size ?? FONT_SIZE.body;
    const indent = opts.indent ?? 0;
    const x = PAGE.marginLeft + indent;
    const bulletYPdf = this.yPdf(this.cursorY + size * 0.8);
    this.page.drawCircle({
      x: x + 3,
      y: bulletYPdf,
      size: 1.5,
      color: COLOR.accent,
    });
    this.drawWrapped({
      text,
      size,
      x: x + 12,
      width: PAGE.contentWidth - indent - 12,
      color: opts.color,
    });
  }

  /** Filled rectangle (for cards / score badges). */
  drawCard(opts: {
    x: number;
    width: number;
    height: number;
    color?: RGB;
    border?: RGB;
    borderThickness?: number;
  }) {
    const yPdf = this.yPdf(this.cursorY + opts.height);
    this.page.drawRectangle({
      x: opts.x,
      y: yPdf,
      width: opts.width,
      height: opts.height,
      color: opts.color ?? COLOR.surface,
      borderColor: opts.border,
      borderWidth: opts.borderThickness ?? 0,
    });
  }

  /** Score badge: square with a number + label. */
  drawScoreBadge(score: number, color: RGB) {
    const size = 90;
    const x = (PAGE.width - size) / 2;
    this.drawCard({ x, width: size, height: size, color });
    const text = String(Math.round(score));
    const w = this.fonts.bold.widthOfTextAtSize(text, FONT_SIZE.display);
    const yPdf = this.yPdf(this.cursorY + size / 2 + FONT_SIZE.display / 2);
    this.page.drawText(text, {
      x: x + (size - w) / 2,
      y: yPdf,
      size: FONT_SIZE.display,
      font: this.fonts.bold,
      color: rgb(1, 1, 1),
    });
    this.advance(size + SPACE.sm);
  }

  /** Horizontal bar at current cursor (for signals or score progress). */
  drawBar(opts: {
    fraction: number; // 0-1
    width?: number;
    height?: number;
    fill?: RGB;
    bg?: RGB;
    x?: number;
  }) {
    const width = opts.width ?? PAGE.contentWidth;
    const height = opts.height ?? 6;
    const x = opts.x ?? PAGE.marginLeft;
    const yPdf = this.yPdf(this.cursorY + height);
    this.page.drawRectangle({
      x,
      y: yPdf,
      width,
      height,
      color: opts.bg ?? COLOR.surfaceAlt,
    });
    this.page.drawRectangle({
      x,
      y: yPdf,
      width: Math.max(0, Math.min(1, opts.fraction)) * width,
      height,
      color: opts.fill ?? COLOR.brand,
    });
    this.advance(height + SPACE.xs);
  }

  /** Two-column key/value row. */
  drawKeyValue(label: string, value: string, opts: { labelWidth?: number; size?: number } = {}) {
    const size = opts.size ?? FONT_SIZE.body;
    const labelWidth = opts.labelWidth ?? 160;
    const startY = this.cursorY;
    this.drawLine({
      text: label,
      size,
      font: this.fonts.semibold,
      color: COLOR.inkSoft,
      x: PAGE.marginLeft,
      advanceBy: 0,
    });
    this.cursorY = startY;
    this.drawWrapped({
      text: value,
      size,
      x: PAGE.marginLeft + labelWidth,
      width: PAGE.contentWidth - labelWidth,
      color: COLOR.ink,
    });
  }

  // ── Page chrome ────────────────────────────────────────────────────────

  /** Header band: brand name top-left, page label top-right. */
  drawHeader(pageLabel: string) {
    const y = this.yPdf(28);
    this.page.drawText('AiLys Agency', {
      x: PAGE.marginLeft,
      y,
      size: FONT_SIZE.caption,
      font: this.fonts.semibold,
      color: COLOR.brand,
    });
    const w = this.fonts.regular.widthOfTextAtSize(pageLabel, FONT_SIZE.caption);
    this.page.drawText(pageLabel, {
      x: PAGE.width - PAGE.marginRight - w,
      y,
      size: FONT_SIZE.caption,
      font: this.fonts.regular,
      color: COLOR.inkMuted,
    });
  }

  /** Footer band: brand URL + page number. */
  drawFooter(pageNumber: number, totalPages: number) {
    const y = this.yPdf(PAGE.height - 28);
    this.page.drawText('ailysagency.ca', {
      x: PAGE.marginLeft,
      y,
      size: FONT_SIZE.footer,
      font: this.fonts.regular,
      color: COLOR.inkMuted,
    });
    const pageText = `${pageNumber} / ${totalPages}`;
    const w = this.fonts.regular.widthOfTextAtSize(pageText, FONT_SIZE.footer);
    this.page.drawText(pageText, {
      x: PAGE.width - PAGE.marginRight - w,
      y,
      size: FONT_SIZE.footer,
      font: this.fonts.regular,
      color: COLOR.inkMuted,
    });
  }

  /** Convenience: ensure remaining vertical space fits `dy` else add page. */
  ensureSpace(dy: number, pageLabel: string, pageNumber: number, totalPages: number) {
    if (this.cursorY + dy > PAGE.height - PAGE.marginBottom) {
      this.drawFooter(pageNumber, totalPages);
      this.newPage();
      this.drawHeader(pageLabel);
    }
  }
}

/**
 * Convenience to embed standard Helvetica when custom fonts can't load.
 * Pages calling this get a usable font stack with no external assets.
 */
export async function embedStandardFonts(doc: PDFDocument): Promise<BuilderFonts> {
  const [regular, bold, semibold] = await Promise.all([
    doc.embedFont(StandardFonts.Helvetica),
    doc.embedFont(StandardFonts.HelveticaBold),
    doc.embedFont(StandardFonts.HelveticaBold), // standard fonts have no semibold; reuse bold
  ]);
  return { regular, bold, semibold };
}
