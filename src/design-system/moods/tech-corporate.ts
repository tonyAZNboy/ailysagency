import type { Mood } from "./types";

// TECH CORPORATE
// Personality: structured, sharp, B2B-confident. Navy + electric blue
// with lime accents, monospace details, geometric topology backgrounds.
// Best for B2B services, accountants, consultants, SaaS-adjacent.

export const techCorporate: Mood = {
  id: "tech-corporate",
  label: "Tech Corporate",
  labelFr: "Tech Corporatif",
  palette: {
    background: "222 32% 9%",          // deep navy
    foreground: "210 25% 95%",
    card: "222 30% 13%",
    cardForeground: "210 25% 95%",
    primary: "212 95% 58%",            // electric blue
    primaryForeground: "0 0% 100%",
    secondary: "222 25% 20%",
    secondaryForeground: "210 25% 95%",
    accent: "85 80% 55%",              // electric lime
    accentForeground: "222 32% 9%",
    muted: "222 25% 16%",
    mutedForeground: "210 12% 60%",
    border: "222 20% 24%",
  },
  typography: {
    fontDisplay: '"Albert Sans", system-ui, sans-serif',
    fontSans: '"Albert Sans", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
    displayTracking: "-0.02em",
    bodyLeading: "1.65",
  },
  backgroundId: "topology",
  motionPersonality: "clean-precise",
  accentGradient: "from-blue-500 via-cyan-400 to-lime-400",
  bestForVerticals: ["lawyers"],
  description:
    "Structured, sharp, B2B-confident. Electric blue and lime on deep navy, monospace details, geometric backgrounds. Built for verticals where precision signals competence.",
  descriptionFr:
    "Structuré, tranchant, B2B-affirmé. Bleu électrique et lime sur marine profond, détails en monospace, fonds géométriques. Pour les verticales où la précision signale la compétence.",
};
