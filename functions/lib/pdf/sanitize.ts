/**
 * Sanitize user-provided strings before passing them to pdf-lib StandardFont
 * (Helvetica, WinAnsi). Some characters that ARE in WinAnsi (e.g. é = 0xE9)
 * still cause the standard Helvetica encoder to throw at runtime when the
 * input came from JSON.parse rather than a TS string literal. We work around
 * this by mapping common Latin-1 supplement chars to their ASCII fold.
 *
 * Static FR translations in our page renderers continue to use full accented
 * chars; those are baked in by esbuild and pdf-lib renders them fine. This
 * function is ONLY for runtime user-provided strings (signal labels, action
 * titles, business names, etc.).
 */

const FOLDS: Record<string, string> = {
  // a
  à: 'a', â: 'a', ä: 'a', á: 'a', ã: 'a', å: 'a',
  À: 'A', Â: 'A', Ä: 'A', Á: 'A', Ã: 'A', Å: 'A',
  // e
  é: 'e', è: 'e', ê: 'e', ë: 'e',
  É: 'E', È: 'E', Ê: 'E', Ë: 'E',
  // i
  î: 'i', ï: 'i', í: 'i', ì: 'i',
  Î: 'I', Ï: 'I', Í: 'I', Ì: 'I',
  // o
  ô: 'o', ö: 'o', ó: 'o', ò: 'o', õ: 'o',
  Ô: 'O', Ö: 'O', Ó: 'O', Ò: 'O', Õ: 'O',
  // u
  ù: 'u', û: 'u', ü: 'u', ú: 'u',
  Ù: 'U', Û: 'U', Ü: 'U', Ú: 'U',
  // y
  ÿ: 'y', ý: 'y', Ÿ: 'Y', Ý: 'Y',
  // c
  ç: 'c', Ç: 'C',
  // n
  ñ: 'n', Ñ: 'N',
  // ligatures
  œ: 'oe', Œ: 'OE', æ: 'ae', Æ: 'AE',
  // punctuation / typographic
  '–': '-', // en dash
  '—': '-', // em dash
  '‘': "'", '’': "'", // curly single quotes
  '“': '"', '”': '"', // curly double quotes
  '…': '...', // ellipsis
  ' ': ' ', // non-breaking space
};

export function sanitizeForPdf(input: string | null | undefined): string {
  if (!input) return '';
  let out = '';
  for (const ch of input) {
    if (FOLDS[ch] !== undefined) {
      out += FOLDS[ch];
    } else if (ch.charCodeAt(0) <= 0x7e) {
      out += ch;
    } else {
      // Drop anything outside printable ASCII that we don't have a fold for.
      // Better than a runtime crash from pdf-lib encoder.
      out += '?';
    }
  }
  return out;
}
