import { type SupportedLang } from "@/i18n/index";

interface AiLysBadgeProps {
  score?: number;
  businessName?: string;
  variant?: "compact" | "full";
  lang?: SupportedLang;
}

const LABELS: Record<SupportedLang, { verifiedBy: string; aiVisibility: string }> = {
  en: { verifiedBy: "Verified by", aiVisibility: "AI Visibility" },
  fr: { verifiedBy: "Vérifié par", aiVisibility: "Visibilité IA" },
  es: { verifiedBy: "Verificado por", aiVisibility: "Visibilidad IA" },
  zh: { verifiedBy: "认证机构", aiVisibility: "AI 可见性" },
  ar: { verifiedBy: "تم التحقق بواسطة", aiVisibility: "رؤية الذكاء" },
  ru: { verifiedBy: "Проверено", aiVisibility: "AI Видимость" },
  de: { verifiedBy: "Verifiziert von", aiVisibility: "KI Sichtbarkeit" },
  it: { verifiedBy: "Verificato da", aiVisibility: "Visibilità IA" },
  pt: { verifiedBy: "Verificado por", aiVisibility: "Visibilidade IA" },
  ja: { verifiedBy: "認証", aiVisibility: "AI 可視性" },
  ko: { verifiedBy: "인증", aiVisibility: "AI 가시성" },
  hi: { verifiedBy: "सत्यापित", aiVisibility: "AI दृश्यता" },
  nl: { verifiedBy: "Geverifieerd door", aiVisibility: "AI Zichtbaarheid" },
  pl: { verifiedBy: "Zweryfikowane przez", aiVisibility: "Widoczność AI" },
  tr: { verifiedBy: "Onaylayan", aiVisibility: "AI Görünürlük" },
  vi: { verifiedBy: "Xác minh bởi", aiVisibility: "Hiển thị AI" },
};

function tierColor(score: number): string {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#22d3ee";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

export function AiLysBadge({
  score = 78,
  businessName,
  variant = "compact",
  lang = "en",
}: AiLysBadgeProps) {
  const labels = LABELS[lang] ?? LABELS.en;
  const color = tierColor(score);
  const stars = Math.round((score / 100) * 5);

  if (variant === "compact") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 64"
        width="220"
        height="64"
        role="img"
        aria-label={`${labels.verifiedBy} AiLys: ${score}/100 ${labels.aiVisibility}`}
      >
        <defs>
          <linearGradient id="ailys-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="220" height="64" rx="8" fill="url(#ailys-bg)" />
        <rect width="6" height="64" fill={color} />
        <text x="18" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fill="#94a3b8" fontWeight="500">
          {labels.verifiedBy}
        </text>
        <text x="18" y="38" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fill="#ffffff" fontWeight="700">
          AiLys
        </text>
        <text x="18" y="54" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fill="#94a3b8">
          {labels.aiVisibility}
        </text>
        <text x="200" y="32" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fill={color} fontWeight="800" textAnchor="end">
          {score}
        </text>
        <text x="200" y="46" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fill="#94a3b8" textAnchor="end">
          /100
        </text>
        <g transform="translate(95, 44)">
          {Array.from({ length: 5 }).map((_, i) => (
            <text
              key={i}
              x={i * 12}
              y="0"
              fontSize="11"
              fill={i < stars ? color : "#475569"}
            >
              ★
            </text>
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 120"
      width="320"
      height="120"
      role="img"
      aria-label={`${labels.verifiedBy} AiLys: ${score}/100 ${labels.aiVisibility}`}
    >
      <defs>
        <linearGradient id="ailys-bg-full" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="320" height="120" rx="12" fill="url(#ailys-bg-full)" />
      <rect width="8" height="120" fill={color} />
      <text x="22" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#94a3b8" fontWeight="500">
        {labels.verifiedBy}
      </text>
      <text x="22" y="48" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fill="#ffffff" fontWeight="800">
        AiLys
      </text>
      {businessName ? (
        <text x="22" y="68" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#cbd5e1">
          {businessName.slice(0, 32)}
        </text>
      ) : null}
      <text x="22" y="92" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fill="#94a3b8">
        {labels.aiVisibility}
      </text>
      <text x="298" y="58" fontFamily="Inter, system-ui, sans-serif" fontSize="36" fill={color} fontWeight="800" textAnchor="end">
        {score}
      </text>
      <text x="298" y="78" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fill="#94a3b8" textAnchor="end">
        /100
      </text>
      <g transform="translate(140, 102)">
        {Array.from({ length: 5 }).map((_, i) => (
          <text
            key={i}
            x={i * 16}
            y="0"
            fontSize="14"
            fill={i < stars ? color : "#475569"}
          >
            ★
          </text>
        ))}
      </g>
    </svg>
  );
}

export function aiLysBadgeSvgString(opts: AiLysBadgeProps = {}): string {
  const score = opts.score ?? 78;
  const variant = opts.variant ?? "compact";
  const lang = opts.lang ?? "en";
  const labels = LABELS[lang] ?? LABELS.en;
  const color = tierColor(score);
  const stars = Math.round((score / 100) * 5);

  if (variant === "compact") {
    const starSvg = Array.from({ length: 5 })
      .map(
        (_, i) =>
          `<text x="${i * 12}" y="0" font-size="11" fill="${i < stars ? color : "#475569"}">★</text>`
      )
      .join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 64" width="220" height="64" role="img" aria-label="${labels.verifiedBy} AiLys: ${score}/100 ${labels.aiVisibility}"><defs><linearGradient id="ailys-bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><rect width="220" height="64" rx="8" fill="url(#ailys-bg)"/><rect width="6" height="64" fill="${color}"/><text x="18" y="22" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#94a3b8" font-weight="500">${labels.verifiedBy}</text><text x="18" y="38" font-family="Inter, system-ui, sans-serif" font-size="14" fill="#ffffff" font-weight="700">AiLys</text><text x="18" y="54" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#94a3b8">${labels.aiVisibility}</text><text x="200" y="32" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${color}" font-weight="800" text-anchor="end">${score}</text><text x="200" y="46" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="end">/100</text><g transform="translate(95, 44)">${starSvg}</g></svg>`;
  }

  const starSvg = Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<text x="${i * 16}" y="0" font-size="14" fill="${i < stars ? color : "#475569"}">★</text>`
    )
    .join("");
  const businessLine = opts.businessName
    ? `<text x="22" y="68" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#cbd5e1">${opts.businessName.slice(0, 32).replace(/[<>&"]/g, "")}</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120" role="img" aria-label="${labels.verifiedBy} AiLys: ${score}/100 ${labels.aiVisibility}"><defs><linearGradient id="ailys-bg-full" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><rect width="320" height="120" rx="12" fill="url(#ailys-bg-full)"/><rect width="8" height="120" fill="${color}"/><text x="22" y="26" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#94a3b8" font-weight="500">${labels.verifiedBy}</text><text x="22" y="48" font-family="Inter, system-ui, sans-serif" font-size="20" fill="#ffffff" font-weight="800">AiLys</text>${businessLine}<text x="22" y="92" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#94a3b8">${labels.aiVisibility}</text><text x="298" y="58" font-family="Inter, system-ui, sans-serif" font-size="36" fill="${color}" font-weight="800" text-anchor="end">${score}</text><text x="298" y="78" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#94a3b8" text-anchor="end">/100</text><g transform="translate(140, 102)">${starSvg}</g></svg>`;
}
