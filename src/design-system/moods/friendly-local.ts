import type { Mood } from "./types";

// FRIENDLY LOCAL
// Personality: warm, playful, neighborly. Pastel sky + coral with
// sunny yellow accents, rounded sans-serif, bouncy motion, liquid
// blob background. Best for nail salons, sushi counters, indie cafés,
// neighborhood beauty bars, food trucks.

export const friendlyLocal: Mood = {
  id: "friendly-local",
  label: "Friendly Local",
  labelFr: "Sympa de Quartier",
  palette: {
    background: "200 60% 97%",         // pastel sky
    foreground: "215 35% 18%",
    card: "0 0% 100%",
    cardForeground: "215 35% 18%",
    primary: "12 85% 62%",             // coral
    primaryForeground: "0 0% 100%",
    secondary: "200 50% 90%",          // soft sky
    secondaryForeground: "215 35% 18%",
    accent: "48 95% 60%",              // sunny yellow
    accentForeground: "215 35% 18%",
    muted: "200 35% 92%",
    mutedForeground: "215 15% 40%",
    border: "200 30% 86%",
  },
  typography: {
    fontDisplay: '"Albert Sans", system-ui, sans-serif',
    fontSans: '"Albert Sans", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.01em",
    bodyLeading: "1.7",
  },
  backgroundId: "liquid-blob",
  motionPersonality: "playful-bouncy",
  accentGradient: "from-pink-400 via-rose-400 to-yellow-400",
  bestForVerticals: ["nail-salons", "sushi-counters"],
  description:
    "Warm, playful, neighborly. Coral and sunny yellow on pastel sky, rounded sans-serif, bouncy organic motion. Built for verticals that thrive on personality and walk-in charm.",
  descriptionFr:
    "Chaleureux, joueur, voisin. Corail et jaune soleil sur ciel pastel, sans-serif arrondi, mouvements organiques rebondissants. Pour les verticales qui vivent de personnalité et de charme local.",
};
