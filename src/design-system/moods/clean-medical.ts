import type { Mood } from "./types";

// CLEAN MEDICAL
// Personality: clinical, trustworthy, precise. White + soft cyan with
// fresh green accents, generous whitespace, clean tight motion. Best
// for clinics, dentists, medical specialists, healthcare-adjacent.

export const cleanMedical: Mood = {
  id: "clean-medical",
  label: "Clean Medical",
  labelFr: "Médical Épuré",
  palette: {
    background: "210 30% 98%",         // near-white sky
    foreground: "215 35% 14%",         // deep slate
    card: "0 0% 100%",
    cardForeground: "215 35% 14%",
    primary: "188 85% 42%",            // medical cyan
    primaryForeground: "0 0% 100%",
    secondary: "210 30% 94%",          // soft cool gray
    secondaryForeground: "215 35% 14%",
    accent: "152 65% 42%",             // healthy green
    accentForeground: "0 0% 100%",
    muted: "210 25% 92%",
    mutedForeground: "215 15% 45%",
    border: "210 20% 88%",
  },
  typography: {
    fontDisplay: '"Albert Sans", system-ui, sans-serif',
    fontSans: '"Albert Sans", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.015em",
    bodyLeading: "1.6",
  },
  backgroundId: "mesh-gradient",
  motionPersonality: "clean-precise",
  accentGradient: "from-cyan-400 via-teal-400 to-emerald-400",
  bestForVerticals: ["dentists", "clinics"],
  description:
    "Clinical, trustworthy, precise. Medical cyan and healthy green on near-white. Generous whitespace, tight crisp motion. Built for healthcare verticals where calm and competence matter.",
  descriptionFr:
    "Clinique, fiable, précis. Cyan médical et vert santé sur presque blanc. Espacement généreux, mouvements nets et précis. Pour les verticales santé où calme et compétence priment.",
};
