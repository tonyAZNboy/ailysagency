// Cloudflare Pages Function · /api/og.svg
//
// Branded 1200x630 SVG Open Graph images for marketing surfaces. Generated
// at request time so we never have to manually create OG PNG assets per
// page. Twitter/X, LinkedIn, Facebook, Slack, Discord, and iMessage all
// render SVG OG images correctly as of late 2025.
//
// Query params:
//   - kind: "report" | "badge" | "concierge" | "default"
//   - title (optional): main headline, max 80 chars
//   - subtitle (optional): supporting line, max 120 chars
//   - score (optional): integer 0-100, only used by kind=report
//   - lang: "en" | "fr" (defaults en)
//
// Examples:
//   /api/og.svg?kind=report&title=State%20of%20AI%20Visibility&score=42
//   /api/og.svg?kind=badge
//   /api/og.svg?kind=concierge&lang=fr
//
// Cache: public 1h on known kinds; 5min on fallback to avoid amplifying
// crawler-driven cache pollution if a malformed param sneaks in.

const CACHE_OK = "public, max-age=3600";
const CACHE_FALLBACK = "public, max-age=300";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function clamp(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

// Word-wrap a string into max N lines of approx maxChars each.
// Renders multiple <text> tspans for SVG. Returns an array of lines.
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? `${cur} ${w}` : w;
    if (candidate.length > maxChars) {
      if (lines.length + 1 >= maxLines) {
        lines.push(clamp(`${cur} ${w}`.trim(), maxChars));
        return lines;
      }
      lines.push(cur);
      cur = w;
    } else {
      cur = candidate;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, maxLines);
}

function tierColor(score: number): string {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#22d3ee";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function renderReport(title: string, score: number, subtitle: string): string {
  const color = tierColor(score);
  const titleLines = wrap(title, 38, 3);
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${260 + i * 64}" font-family="Inter, system-ui, sans-serif" font-size="56" fill="#ffffff" font-weight="800">${escapeXml(line)}</text>`
    )
    .join("\n");
  const subtitleSvg = subtitle
    ? `<text x="80" y="${260 + titleLines.length * 64 + 50}" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#94a3b8">${escapeXml(clamp(subtitle, 90))}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(title)}">
<defs>
<linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stop-color="#050505"/>
<stop offset="100%" stop-color="#0f172a"/>
</linearGradient>
<linearGradient id="accent" x1="0" x2="1" y1="0" y2="0">
<stop offset="0%" stop-color="#22d3ee"/>
<stop offset="100%" stop-color="#a78bfa"/>
</linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="12" height="630" fill="${color}"/>
<text x="80" y="120" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#22d3ee" font-weight="600" letter-spacing="2">AILYS INDUSTRY REPORT</text>
<text x="80" y="160" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#94a3b8">ailysagency.ca</text>
${titleSvg}
${subtitleSvg}
<g transform="translate(960, 200)">
<circle cx="120" cy="120" r="120" fill="${color}" opacity="0.15"/>
<circle cx="120" cy="120" r="100" fill="${color}" opacity="0.25"/>
<text x="120" y="135" font-family="Inter, system-ui, sans-serif" font-size="92" fill="${color}" font-weight="800" text-anchor="middle">${score}</text>
<text x="120" y="180" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">/100 median</text>
</g>
<text x="80" y="580" font-family="Inter, system-ui, sans-serif" font-size="16" fill="#475569">Anonymized aggregate across 6 AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)</text>
</svg>`;
}

function renderBadge(lang: "en" | "fr"): string {
  const headline =
    lang === "fr"
      ? "Insigne AiLys Verifie"
      : "AiLys Verified Badge";
  const subtitle =
    lang === "fr"
      ? "Affichez votre score de visibilite IA sur votre site, avec lien vers votre rapport public"
      : "Display your AI Visibility score on your site, linked to your public report";
  const subLines = wrap(subtitle, 50, 2);
  const subSvg = subLines
    .map(
      (line, i) =>
        `<text x="80" y="${360 + i * 38}" font-family="Inter, system-ui, sans-serif" font-size="28" fill="#94a3b8">${escapeXml(line)}</text>`
    )
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(headline)}">
<defs>
<linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stop-color="#050505"/>
<stop offset="100%" stop-color="#0f172a"/>
</linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="12" height="630" fill="#10b981"/>
<text x="80" y="120" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#10b981" font-weight="600" letter-spacing="2">AILYS VERIFIED</text>
<text x="80" y="160" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#94a3b8">ailysagency.ca/badge</text>
<text x="80" y="290" font-family="Inter, system-ui, sans-serif" font-size="68" fill="#ffffff" font-weight="800">${escapeXml(headline)}</text>
${subSvg}
<g transform="translate(840, 380)">
<rect x="0" y="0" width="280" height="80" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
<rect x="0" y="0" width="8" height="80" fill="#10b981"/>
<text x="22" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" fill="#94a3b8" font-weight="500">${lang === "fr" ? "Verifie par" : "Verified by"}</text>
<text x="22" y="48" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#ffffff" font-weight="700">AiLys</text>
<text x="22" y="66" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#94a3b8">${lang === "fr" ? "Visibilite IA" : "AI Visibility"}</text>
<text x="258" y="42" font-family="Inter, system-ui, sans-serif" font-size="28" fill="#10b981" font-weight="800" text-anchor="end">78</text>
<text x="258" y="60" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="end">/100</text>
</g>
<text x="80" y="580" font-family="Inter, system-ui, sans-serif" font-size="16" fill="#475569">${lang === "fr" ? "Code d'integration HTML + Markdown, mise a jour automatique" : "HTML + Markdown embed code, auto-updating score"}</text>
</svg>`;
}

function renderConcierge(lang: "en" | "fr"): string {
  const headline = lang === "fr" ? "AiLys Concierge" : "AiLys Concierge";
  const subtitle =
    lang === "fr"
      ? "Assistant IA conversationnel pour vos donnees de visibilite IA, avis, GBP, concurrents"
      : "Conversational AI assistant for your AI Visibility data, reviews, GBP, competitors";
  const subLines = wrap(subtitle, 48, 2);
  const subSvg = subLines
    .map(
      (line, i) =>
        `<text x="80" y="${360 + i * 38}" font-family="Inter, system-ui, sans-serif" font-size="28" fill="#94a3b8">${escapeXml(line)}</text>`
    )
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(headline)}">
<defs>
<linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stop-color="#050505"/>
<stop offset="100%" stop-color="#0f172a"/>
</linearGradient>
<linearGradient id="sparkle" x1="0" x2="1" y1="0" y2="0">
<stop offset="0%" stop-color="#22d3ee"/>
<stop offset="100%" stop-color="#a78bfa"/>
</linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="12" height="630" fill="url(#sparkle)"/>
<text x="80" y="120" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#a78bfa" font-weight="600" letter-spacing="2">AILYS CONCIERGE</text>
<text x="80" y="160" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#94a3b8">ailysagency.ca/concierge-demo</text>
<text x="80" y="290" font-family="Inter, system-ui, sans-serif" font-size="84" fill="#ffffff" font-weight="800">${escapeXml(headline)}</text>
${subSvg}
<g transform="translate(80, 480)">
<rect x="0" y="0" width="640" height="60" rx="10" fill="#1e293b"/>
<text x="20" y="38" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#cbd5e1" font-style="italic">${escapeXml(lang === "fr" ? "Pourquoi mon score a-t-il bouge cette semaine ?" : "Why did my score move this week?")}</text>
</g>
<text x="80" y="580" font-family="Inter, system-ui, sans-serif" font-size="16" fill="#475569">${lang === "fr" ? "Inclus dans les forfaits AiLys Growth et Agency" : "Included in AiLys Growth and Agency plans"}</text>
</svg>`;
}

function renderDefault(title: string, subtitle: string): string {
  const titleLines = wrap(title, 32, 3);
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${280 + i * 76}" font-family="Inter, system-ui, sans-serif" font-size="68" fill="#ffffff" font-weight="800">${escapeXml(line)}</text>`
    )
    .join("\n");
  const subSvg = subtitle
    ? `<text x="80" y="${280 + titleLines.length * 76 + 40}" font-family="Inter, system-ui, sans-serif" font-size="24" fill="#94a3b8">${escapeXml(clamp(subtitle, 80))}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(title)}">
<defs>
<linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stop-color="#050505"/>
<stop offset="100%" stop-color="#0f172a"/>
</linearGradient>
<linearGradient id="accent" x1="0" x2="1" y1="0" y2="0">
<stop offset="0%" stop-color="#22d3ee"/>
<stop offset="100%" stop-color="#a78bfa"/>
</linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="12" height="630" fill="url(#accent)"/>
<text x="80" y="120" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#22d3ee" font-weight="600" letter-spacing="2">AILYS AGENCY</text>
<text x="80" y="160" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#94a3b8">ailysagency.ca</text>
${titleSvg}
${subSvg}
<text x="80" y="580" font-family="Inter, system-ui, sans-serif" font-size="16" fill="#475569">Marketing Agency SEO &amp; AI for local businesses. Bilingual EN and FR-CA. Made in Quebec.</text>
</svg>`;
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const kind = (url.searchParams.get("kind") || "default").toLowerCase();
  const title = url.searchParams.get("title") || "";
  const subtitle = url.searchParams.get("subtitle") || "";
  const lang = url.searchParams.get("lang") === "fr" ? "fr" : "en";
  const scoreRaw = url.searchParams.get("score");
  const score = scoreRaw && /^\d+$/.test(scoreRaw) ? Math.min(100, parseInt(scoreRaw, 10)) : 0;

  let svg: string;
  let cache = CACHE_OK;
  switch (kind) {
    case "report":
      svg = renderReport(title || "AiLys Industry Report", score, subtitle || "AI Visibility benchmarks");
      break;
    case "badge":
      svg = renderBadge(lang);
      break;
    case "concierge":
      svg = renderConcierge(lang);
      break;
    case "default":
      svg = renderDefault(title || "AiLys Agency", subtitle || "Marketing Agency SEO & AI");
      break;
    default:
      svg = renderDefault("AiLys Agency", "Marketing Agency SEO & AI");
      cache = CACHE_FALLBACK;
  }

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": cache,
      "X-Robots-Tag": "noindex",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
