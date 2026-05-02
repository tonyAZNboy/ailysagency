import type { Mood } from "./types";

// CHALEUREUX ARTISAN
// Personality: warm, hand-crafted, approachable. Cream + terracotta
// with warm wood undertones, organic motion, serif headlines that
// feel hand-set. Best for restaurants, contractors, hospitality,
// food artisans, indie cafés.

export const chaleureuxArtisan: Mood = {
  id: "chaleureux-artisan",
  label: "Warm Artisan",
  labelFr: "Artisan Chaleureux",
  palette: {
    background: "30 25% 96%",          // cream
    foreground: "20 30% 18%",          // walnut
    card: "30 35% 98%",
    cardForeground: "20 30% 18%",
    primary: "14 75% 52%",             // terracotta
    primaryForeground: "30 35% 98%",
    secondary: "30 20% 88%",           // sand
    secondaryForeground: "20 30% 18%",
    accent: "35 80% 55%",              // amber
    accentForeground: "20 30% 18%",
    muted: "30 15% 90%",
    mutedForeground: "20 15% 40%",
    border: "30 15% 80%",
  },
  typography: {
    fontDisplay: '"Instrument Serif", Georgia, serif',
    fontSans: '"Albert Sans", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.01em",
    bodyLeading: "1.7",
  },
  backgroundId: "grain-texture",
  motionPersonality: "warm-organic",
  accentGradient: "from-orange-400 via-amber-500 to-rose-500",
  bestForVerticals: ["restaurants", "contractors"],
  description:
    "Warm, hand-crafted, approachable. Cream and terracotta with walnut undertones, organic motion, hand-set serif headlines. Built for verticals where craft and care define the brand.",
  descriptionFr:
    "Chaleureux, artisanal, accueillant. Crème et terracotta sur tons noyer, mouvements organiques, titres serif comme composés à la main. Pour les verticales où l'artisanat et le soin définissent la marque.",
};
