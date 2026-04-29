// Brand tokens for the audit PDF.
//
// pdf-lib uses normalized RGB tuples in [0,1]. We define the brand palette
// as 0-255 hex tuples for readability, then convert at the call site via
// `rgb255()`. Spacing scale matches the web brand (rem/4 per step).
//
// Inspired by AiLys agency primary palette: deep navy + amber accent +
// neutral grays. Shipping a single tokens file keeps the pages consistent;
// every page MUST import from here, never inline raw colors.

import { rgb } from 'pdf-lib';

/**
 * Convert 0-255 RGB to pdf-lib's normalized 0-1 tuple.
 */
export function rgb255(r: number, g: number, b: number) {
  return rgb(r / 255, g / 255, b / 255);
}

/**
 * Hex color string (with or without '#') to pdf-lib RGB.
 */
export function rgbHex(hex: string) {
  const h = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return rgb255(r, g, b);
}

// Brand palette
export const COLOR = {
  bg: rgbHex('#FFFFFF'), // page background
  ink: rgbHex('#0A0F1F'), // primary text
  inkSoft: rgbHex('#3F4761'), // secondary text
  inkMuted: rgbHex('#6B7280'), // tertiary text + dividers
  border: rgbHex('#E5E7EB'), // hairline borders
  brand: rgbHex('#0E2A4A'), // deep navy primary
  brandSoft: rgbHex('#1B3F6E'), // lighter navy
  accent: rgbHex('#F59E0B'), // amber accent for emphasis
  accentSoft: rgbHex('#FCD34D'),
  success: rgbHex('#16A34A'), // pass / strong
  warn: rgbHex('#F97316'), // partial / developing
  fail: rgbHex('#DC2626'), // fail / weak
  surface: rgbHex('#F9FAFB'), // card background
  surfaceAlt: rgbHex('#F3F4F6'), // alt row
} as const;

// Score band → color mapping (used by exec summary + cover)
export const SCORE_BAND_COLOR = {
  critical: COLOR.fail,
  weak: COLOR.fail,
  developing: COLOR.warn,
  strong: COLOR.success,
  leader: COLOR.success,
} as const;

// Status → color mapping (signals + matrix cells)
export const STATUS_COLOR = {
  pass: COLOR.success,
  partial: COLOR.warn,
  fail: COLOR.fail,
} as const;

// Typography scale (points; 1 pt = 1/72 in)
// Letter page is 612 × 792 pt. We use a 56pt left/right margin for a
// 500pt content column, comfortable for body text at 11pt.
export const FONT_SIZE = {
  display: 32, // cover hero
  h1: 22, // page heading
  h2: 16, // section heading
  h3: 13, // sub-section
  body: 11,
  caption: 9,
  footer: 8,
} as const;

// Spacing (points)
export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 28,
  xxl: 44,
} as const;

// Page geometry (US Letter, the default in pdf-lib)
export const PAGE = {
  width: 612,
  height: 792,
  marginTop: 56,
  marginBottom: 56,
  marginLeft: 56,
  marginRight: 56,
  contentWidth: 612 - 56 - 56,
  contentHeight: 792 - 56 - 56,
} as const;

// Brand strings (used in headers + footers; not user-translatable per the
// project policy that brand names stay in English).
export const BRAND = {
  name: 'AiLys Agency',
  url: 'ailysagency.ca',
  tagline: 'Local AI visibility, made in Quebec',
  reportTitle: 'AI Visibility Audit',
} as const;
