import type { Mood } from "./types";

// LUXE EDITORIAL
// Personality: magazine-grade, editorial, indulgent. Ivory + burgundy
// with gold-leaf accents, large display serif, generous columns,
// aurora background. Best for boutique hotels, spas, luxury real
// estate, high-end hospitality.

export const luxeEditorial: Mood = {
  id: "luxe-editorial",
  label: "Luxe Editorial",
  labelFr: "Luxe Éditorial",
  palette: {
    background: "35 35% 96%",          // ivory
    foreground: "350 35% 18%",         // deep burgundy
    card: "35 40% 98%",
    cardForeground: "350 35% 18%",
    primary: "350 65% 35%",            // burgundy
    primaryForeground: "35 40% 98%",
    secondary: "35 25% 88%",           // bone
    secondaryForeground: "350 35% 18%",
    accent: "42 70% 52%",              // gold leaf
    accentForeground: "350 35% 18%",
    muted: "35 20% 92%",
    mutedForeground: "350 15% 35%",
    border: "35 18% 82%",
  },
  typography: {
    fontDisplay: '"Instrument Serif", Georgia, serif',
    fontSans: '"Albert Sans", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.03em",
    bodyLeading: "1.8",
  },
  backgroundId: "aurora",
  motionPersonality: "elegant-slow",
  accentGradient: "from-rose-700 via-amber-600 to-yellow-500",
  bestForVerticals: ["hotels"],
  description:
    "Magazine-grade, editorial, indulgent. Burgundy and gold-leaf on ivory, large display serif, generous columns. Built for verticals where atmosphere is the product.",
  descriptionFr:
    "Qualité magazine, éditorial, raffiné. Bordeaux et feuille d'or sur ivoire, grand serif d'affichage, colonnes généreuses. Pour les verticales où l'atmosphère est le produit.",
};
