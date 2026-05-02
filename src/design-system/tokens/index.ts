// Design token re-exports.
//
// Phase A: tokens still live in src/index.css (CSS variables) and
// tailwind.config.ts. This file provides a typed JS surface so that
// component code can reference tokens by name instead of raw values.
//
// Phase B will extract these into typed JSON sources and generate
// both the CSS variables and the Tailwind config from a single
// source of truth.

export const colorTokens = {
  // Semantic (light theme defaults from src/index.css)
  background: "210 20% 98%",
  foreground: "217 45% 12%",
  card: "0 0% 100%",
  cardForeground: "217 45% 12%",
  primary: "217 91% 60%",
  primaryForeground: "0 0% 100%",
  secondary: "259 88% 66%",
  secondaryForeground: "0 0% 100%",
  muted: "220 13% 91%",
  mutedForeground: "220 9% 46%",
  accent: "142 69% 46%",
  accentForeground: "0 0% 100%",
  destructive: "0 84% 60%",
  destructiveForeground: "0 0% 100%",
  border: "220 13% 91%",
  input: "220 13% 91%",
  ring: "217 91% 60%",

  // SovranOS Liquid Glass accents (vertical-friendly)
  authorityBlue: "var(--authority-blue)",
  momentumGreen: "var(--momentum-green)",
  riskRed: "var(--risk-red)",
  opportunityGold: "var(--opportunity-gold)",
} as const;

export const typographyTokens = {
  fontSans: '"Albert Sans", system-ui, -apple-system, sans-serif',
  fontSerif: '"Instrument Serif", Georgia, serif',
  fontDisplay: '"Instrument Serif", Georgia, serif',
  fontMono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
} as const;

export const radiusTokens = {
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  liquidGlass: "var(--lg-radius)",
  liquidGlassPill: "var(--lg-radius-pill)",
} as const;

export const liquidGlassTokens = {
  bg: "var(--lg-bg-color)",
  bgDark: "var(--lg-bg-dark)",
  highlight: "var(--lg-highlight)",
  hoverGlow: "var(--lg-hover-glow)",
  blur: "var(--lg-blur)",
  shadow: "var(--lg-shadow)",
  specular: "var(--lg-specular)",
} as const;

// Motion presets (CSS easing + duration tokens). Adopt Framer Motion in Phase B.
export const motionTokens = {
  duration: {
    instant: "100ms",
    fast: "180ms",
    base: "240ms",
    slow: "360ms",
    elegant: "560ms",
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    elegant: "cubic-bezier(0.16, 1, 0.3, 1)",
    bouncy: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  },
} as const;
