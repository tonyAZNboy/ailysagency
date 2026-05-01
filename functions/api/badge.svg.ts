import type { PagesFunction } from "@cloudflare/workers-types";

const TIER_COLORS: Record<string, string> = {
  excellent: "#10b981",
  good: "#22d3ee",
  fair: "#f59e0b",
  poor: "#ef4444",
};

const LABELS = {
  en: { verifiedBy: "Verified by", aiVisibility: "AI Visibility" },
  fr: { verifiedBy: "Verifie par", aiVisibility: "Visibilite IA" },
} as const;

type Lang = keyof typeof LABELS;

function tierColor(score: number): string {
  if (score >= 80) return TIER_COLORS.excellent;
  if (score >= 60) return TIER_COLORS.good;
  if (score >= 40) return TIER_COLORS.fair;
  return TIER_COLORS.poor;
}

function escape(s: string): string {
  return s.replace(/[<>&"']/g, "");
}

function renderCompactSvg(score: number, lang: Lang): string {
  const labels = LABELS[lang];
  const color = tierColor(score);
  const stars = Math.round((score / 100) * 5);
  const starSvg = Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<text x="${i * 12}" y="0" font-size="11" fill="${i < stars ? color : "#475569"}">★</text>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 64" width="220" height="64" role="img" aria-label="${labels.verifiedBy} AiLys: ${score}/100 ${labels.aiVisibility}">
<defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
<rect width="220" height="64" rx="8" fill="url(#bg)"/>
<rect width="6" height="64" fill="${color}"/>
<text x="18" y="22" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#94a3b8" font-weight="500">${labels.verifiedBy}</text>
<text x="18" y="38" font-family="Inter, system-ui, sans-serif" font-size="14" fill="#ffffff" font-weight="700">AiLys</text>
<text x="18" y="54" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#94a3b8">${labels.aiVisibility}</text>
<text x="200" y="32" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${color}" font-weight="800" text-anchor="end">${score}</text>
<text x="200" y="46" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="end">/100</text>
<g transform="translate(95, 44)">${starSvg}</g>
</svg>`;
}

function renderFullSvg(score: number, businessName: string, lang: Lang): string {
  const labels = LABELS[lang];
  const color = tierColor(score);
  const stars = Math.round((score / 100) * 5);
  const starSvg = Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<text x="${i * 16}" y="0" font-size="14" fill="${i < stars ? color : "#475569"}">★</text>`
    )
    .join("");
  const safeName = escape(businessName).slice(0, 32);
  const nameLine = safeName
    ? `<text x="22" y="68" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#cbd5e1">${safeName}</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120" role="img" aria-label="${labels.verifiedBy} AiLys: ${score}/100 ${labels.aiVisibility}">
<defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
<rect width="320" height="120" rx="12" fill="url(#bg)"/>
<rect width="8" height="120" fill="${color}"/>
<text x="22" y="26" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#94a3b8" font-weight="500">${labels.verifiedBy}</text>
<text x="22" y="48" font-family="Inter, system-ui, sans-serif" font-size="20" fill="#ffffff" font-weight="800">AiLys</text>${nameLine}
<text x="22" y="92" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#94a3b8">${labels.aiVisibility}</text>
<text x="298" y="58" font-family="Inter, system-ui, sans-serif" font-size="36" fill="${color}" font-weight="800" text-anchor="end">${score}</text>
<text x="298" y="78" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#94a3b8" text-anchor="end">/100</text>
<g transform="translate(140, 102)">${starSvg}</g>
</svg>`;
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const slug = (url.searchParams.get("slug") || "demo").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 64);
  const variant = url.searchParams.get("variant") === "full" ? "full" : "compact";
  const lang: Lang = url.searchParams.get("lang") === "fr" ? "fr" : "en";

  // MVP: stub demo data. Real per-tenant lookup ships when Reviuzy
  // public-tenant-badge fn lands (cross-repo proxy via AILYS_SERVICE_SHARED_SECRET).
  const stub: Record<string, { score: number; name: string }> = {
    demo: { score: 78, name: "Acme Pizza Montreal" },
    sample: { score: 92, name: "Sample Co" },
  };
  const data = stub[slug];
  if (!data) {
    // Unknown slug returns a generic badge with no name and a placeholder score.
    // Keeps the embed surface stable while the Reviuzy backend is being wired.
    const svg = variant === "full" ? renderFullSvg(0, "", lang) : renderCompactSvg(0, lang);
    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  const svg = variant === "full" ? renderFullSvg(data.score, data.name, lang) : renderCompactSvg(data.score, lang);
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
