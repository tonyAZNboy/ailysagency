// Mood themes for the AiLys Design System.
//
// A mood is a coherent visual personality applied to a vertical. It
// combines: HSL palette overrides, typography stack choice, background
// component, and motion personality.
//
// Per CLAUDE.md hard rule #11, every mood is configurable per-tenant
// in the admin (deferred until ailys-client-sites repo exists).

import type { IndustrySlug } from "@/data/industries";

export type MoodId =
  | "premium-dark"
  | "clean-medical"
  | "chaleureux-artisan"
  | "tech-corporate"
  | "luxe-editorial"
  | "friendly-local";

export interface MoodPalette {
  // HSL strings without hsl() wrapper, e.g. "217 91% 60%"
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
}

export interface MoodTypography {
  fontDisplay: string; // CSS font-family
  fontSans: string;
  fontMono: string;
  // Display headings letter-spacing, e.g. "-0.02em"
  displayTracking: string;
  // Body line-height, e.g. "1.65"
  bodyLeading: string;
}

export type MoodBackgroundId =
  | "network"
  | "mesh-gradient"
  | "aurora"
  | "grain-texture"
  | "topology"
  | "liquid-blob";

export type MoodMotionPersonality =
  | "elegant-slow"      // premium-dark, luxe-editorial
  | "clean-precise"     // clean-medical, tech-corporate
  | "warm-organic"      // chaleureux-artisan
  | "playful-bouncy";   // friendly-local

export interface Mood {
  id: MoodId;
  label: string; // human-readable, EN
  labelFr: string; // human-readable, FR
  palette: MoodPalette;
  typography: MoodTypography;
  backgroundId: MoodBackgroundId;
  motionPersonality: MoodMotionPersonality;
  // Optional accent gradient (Tailwind class names)
  accentGradient: string;
  // Bestmatched verticals for this mood (used for /realisations filter)
  bestForVerticals: IndustrySlug[];
  // Short marketing description (EN canonical, FR mirrored)
  description: string;
  descriptionFr: string;
}

// Re-export the IndustrySlug union for downstream consumers
export type { IndustrySlug };
