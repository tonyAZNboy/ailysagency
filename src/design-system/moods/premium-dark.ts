import type { Mood } from "./types";

// PREMIUM DARK
// Personality: serious, authoritative, expensive. Black + gold accents,
// generous tracking, slow elegant motion. Best for legal, luxury real
// estate, dental specialists, executive coaching.

export const premiumDark: Mood = {
  id: "premium-dark",
  label: "Premium Dark",
  labelFr: "Sombre Premium",
  palette: {
    background: "0 0% 4%",            // near-black
    foreground: "30 15% 92%",          // warm ivory
    card: "0 0% 8%",
    cardForeground: "30 15% 92%",
    primary: "42 65% 56%",             // brushed gold
    primaryForeground: "0 0% 4%",
    secondary: "0 0% 18%",             // graphite
    secondaryForeground: "30 15% 92%",
    accent: "42 65% 56%",              // gold reinforced
    accentForeground: "0 0% 4%",
    muted: "0 0% 12%",
    mutedForeground: "30 5% 60%",
    border: "0 0% 18%",
  },
  typography: {
    fontDisplay: '"Instrument Serif", Georgia, serif',
    fontSans: '"Albert Sans", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.025em",
    bodyLeading: "1.75",
  },
  backgroundId: "network",
  motionPersonality: "elegant-slow",
  accentGradient: "from-amber-300 via-amber-400 to-yellow-600",
  bestForVerticals: ["lawyers", "real-estate", "dentists"],
  description:
    "Serious, authoritative, expensive. Brushed-gold accents on near-black, generous tracking, slow elegant motion. Built for verticals where trust is everything.",
  descriptionFr:
    "Sérieux, autoritaire, haut de gamme. Accents or brossé sur noir presque pur, espacement généreux, mouvements élégants et lents. Pour les verticales où la confiance prime.",
};
