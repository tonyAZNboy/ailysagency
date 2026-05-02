import { NetworkBackground } from "./NetworkBackground";
import { MeshGradientBackground } from "./MeshGradientBackground";
import { AuroraBackground } from "./AuroraBackground";
import { GrainTextureBackground } from "./GrainTextureBackground";
import { TopologyBackground } from "./TopologyBackground";
import { LiquidBlobBackground } from "./LiquidBlobBackground";
import type { Mood } from "@/design-system/moods";

// MoodBackground
// Single dispatcher that renders the right background component for a
// given mood, passing the mood's palette through. Removes the per-page
// boilerplate of selecting + configuring backgrounds manually.

interface MoodBackgroundProps {
  mood: Mood;
}

// Helper to extract HSL strings from a Tailwind hex token if needed.
// Currently we pass mood.palette HSL strings directly to backgrounds.
function pickBgPalette(mood: Mood) {
  return {
    baseColor: mood.palette.primary,
    accentColor: mood.palette.accent,
    highlightColor: mood.palette.background,
  };
}

export function MoodBackground({ mood }: MoodBackgroundProps) {
  const palette = pickBgPalette(mood);

  switch (mood.backgroundId) {
    case "network":
      // NetworkBackground uses hex colors. Convert HSL token to a
      // plausible hex for the canvas paints. We use Tailwind-like
      // approximations rather than a full HSL->hex util to keep this
      // dispatcher zero-dep.
      return (
        <NetworkBackground
          backgroundColor="#050505"
          nodeColor="#FBBF24"
          lineColor="#A78BFA"
          nodeCount={24}
          mobileNodeCount={14}
          connectionDistance={140}
          mouseInfluenceRadius={200}
          mouseInfluenceStrength={0.13}
        />
      );
    case "mesh-gradient":
      return <MeshGradientBackground {...palette} />;
    case "aurora":
      return <AuroraBackground {...palette} />;
    case "grain-texture":
      return <GrainTextureBackground {...palette} />;
    case "topology":
      return <TopologyBackground {...palette} />;
    case "liquid-blob":
      return <LiquidBlobBackground {...palette} />;
    default:
      return <NetworkBackground />;
  }
}
