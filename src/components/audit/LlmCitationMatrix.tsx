// LLM citation matrix UI.
// Calls /api/llm-citation-matrix and renders the 6-engine × N-query result.
// Used inside AutoAuditEngine after the main audit returns.
//
// Long-term path:
//   - Stream results query-by-query via SSE (Phase B item 6)
//   - Add per-engine drill-down with full simulated answer text
//   - Add "re-run" button locked to 7-day cooldown for free users
//   - Persist last result for returning visitors

import { useState, useEffect } from "react";
import {
  Loader2,
  Bot,
  Check,
  X,
  Minus,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";

export interface MatrixEngineResult {
  engine: string;
  status: "cited" | "mentioned" | "absent";
  rank?: number;
  excerpt: string;
}

export interface MatrixQueryResult {
  query: string;
  engines: MatrixEngineResult[];
}

export interface MatrixData {
  businessName: string;
  city: string;
  url?: string;
  vertical: string;
  queries: MatrixQueryResult[];
  totalScore: number;
  summary: string;
  isLive: boolean;
  generatedAt: string;
}

interface Props {
  businessName: string;
  city: string;
  url?: string;
  vertical: string;
  /** Visible after first audit-complete; trigger via parent */
  autoFetch?: boolean;
}

const ENGINES = [
  { name: "ChatGPT", color: "from-emerald-400 to-teal-400" },
  { name: "Perplexity", color: "from-cyan-400 to-sky-400" },
  { name: "Claude", color: "from-orange-400 to-amber-400" },
  { name: "Gemini", color: "from-blue-400 to-indigo-400" },
  { name: "Google AIO", color: "from-rose-400 to-pink-400" },
  { name: "Bing Copilot", color: "from-violet-400 to-fuchsia-400" },
];

export function LlmCitationMatrix({
  businessName,
  city,
  url,
  vertical,
  autoFetch = true,
}: Props) {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MatrixData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);

  const fetchMatrix = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/llm-citation-matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, city, url, vertical }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? "Matrix request failed");
      }
      const result = (await res.json()) as MatrixData;
      setData(result);
    } catch (err) {
      // In dev, the Cloudflare Pages Function isn't running. Fall back to a
      // sample so visitors always see a result.
      setData(buildSample(businessName, city, vertical, url));
      setError(
        err instanceof Error
          ? `${t.audit.matrix.cantReach}: ${err.message}. ${t.audit.matrix.showingSample}`
          : t.audit.matrix.showingSample,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && businessName && city) fetchMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-8 sm:p-10 text-center">
        <Loader2 className="w-10 h-10 mx-auto mb-4 text-primary animate-spin" />
        <h3 className="font-display text-2xl mb-2">{t.audit.matrix.queryingHeadline}</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {t.audit.matrix.queryingDesc}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-8">
        <Button
          onClick={fetchMatrix}
          className="rounded-full font-semibold"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
          }}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {t.audit.matrix.runMatrix}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.05] via-secondary/[0.03] to-accent/[0.05] backdrop-blur-md p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-2 inline-flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" />
            {t.audit.matrix.eyebrow}
            {!data.isLive && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {t.audit.matrix.sample}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-2">
            {t.audit.matrix.headlinePrefix} {data.businessName}
          </h3>
          <p className="text-sm text-muted-foreground max-w-prose">
            {t.audit.matrix.intro} {data.city} {t.audit.matrix.introTail}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
            {t.audit.matrix.aggregateScore}
          </div>
          <div
            className="font-display tabular-nums leading-none bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}
          >
            {data.totalScore}
            <span className="text-base text-muted-foreground/60"> / 100</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/[0.04] text-xs text-amber-300/90">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="mb-6 p-4 rounded-xl border border-border/40 bg-background/30">
        <p className="text-sm text-foreground/85 leading-relaxed">{data.summary}</p>
      </div>

      {/* The matrix grid */}
      <div className="space-y-5">
        {data.queries.map((q, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/30 bg-card/40 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border/30 bg-background/30">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-1">
                {t.audit.matrix.queryLabel} {i + 1}
              </div>
              <p className="text-sm font-medium italic text-foreground/90">
                "{q.query}"
              </p>
            </div>
            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {q.engines.map((e) => (
                <EngineCell
                  key={e.engine}
                  engine={e}
                  expanded={expandedEngine === `${i}-${e.engine}`}
                  onToggle={() =>
                    setExpandedEngine(
                      expandedEngine === `${i}-${e.engine}`
                        ? null
                        : `${i}-${e.engine}`,
                    )
                  }
                  labels={{
                    cited: t.audit.matrix.statusCited,
                    mentioned: t.audit.matrix.statusMentioned,
                    absent: t.audit.matrix.statusAbsent,
                  }}
                />
              ))}
            </div>
            {expandedEngine?.startsWith(`${i}-`) && (
              <div className="px-4 py-3 border-t border-border/30 bg-background/20">
                <p className="text-xs text-muted-foreground/85 leading-relaxed">
                  {
                    q.engines.find(
                      (e) => `${i}-${e.engine}` === expandedEngine,
                    )?.excerpt
                  }
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <Legend status="cited" label={t.audit.matrix.legendCited} />
          <Legend status="mentioned" label={t.audit.matrix.legendMentioned} />
          <Legend status="absent" label={t.audit.matrix.legendAbsent} />
        </div>
        <button
          type="button"
          onClick={fetchMatrix}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          {t.audit.matrix.rerun}
        </button>
      </div>

      {/* Engine column index for reference */}
      <div className="mt-5 pt-4 border-t border-border/30">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
          {t.audit.matrix.enginesTracked}
        </div>
        <div className="flex flex-wrap gap-2">
          {ENGINES.map((eng) => (
            <span
              key={eng.name}
              className="text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-background/40 border border-border/30 text-muted-foreground"
            >
              {eng.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EngineCell({
  engine,
  expanded,
  onToggle,
  labels,
}: {
  engine: MatrixEngineResult;
  expanded: boolean;
  onToggle: () => void;
  labels: { cited: string; mentioned: string; absent: string };
}) {
  const styleByStatus = {
    cited: {
      bg: "bg-emerald-500/15 hover:bg-emerald-500/25",
      border: "border-emerald-500/40",
      text: "text-emerald-300",
      icon: <Check className="w-3 h-3" />,
    },
    mentioned: {
      bg: "bg-amber-500/15 hover:bg-amber-500/25",
      border: "border-amber-500/40",
      text: "text-amber-300",
      icon: <Minus className="w-3 h-3" />,
    },
    absent: {
      bg: "bg-rose-500/10 hover:bg-rose-500/20",
      border: "border-rose-500/30",
      text: "text-rose-300/90",
      icon: <X className="w-3 h-3" />,
    },
  }[engine.status];

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className={`group rounded-lg border ${styleByStatus.border} ${styleByStatus.bg} p-2.5 text-left transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/85 truncate">
          {engine.engine}
        </span>
        <span
          className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${styleByStatus.text} bg-background/40 flex-shrink-0`}
        >
          {styleByStatus.icon}
        </span>
      </div>
      <div className={`text-[10px] font-mono ${styleByStatus.text}`}>
        {engine.status === "cited" && engine.rank
          ? `${labels.cited} · #${engine.rank}`
          : engine.status === "cited"
            ? labels.cited
            : engine.status === "mentioned"
              ? labels.mentioned
              : labels.absent}
      </div>
    </button>
  );
}

function Legend({
  status,
  label,
}: {
  status: "cited" | "mentioned" | "absent";
  label: string;
}) {
  const color = {
    cited: "bg-emerald-500/40",
    mentioned: "bg-amber-500/40",
    absent: "bg-rose-500/30",
  }[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function buildSample(
  businessName: string,
  city: string,
  vertical: string,
  url?: string,
): MatrixData {
  // Realistic sample so the UI demonstrates value even without live API.
  // Patterns that AI engines actually exhibit:
  //   - Bigger / more-cited brands appear in ChatGPT, Perplexity, Google AIO
  //   - Newer / smaller brands often appear in Gemini (GBP-heavy) but not ChatGPT
  //   - Most local SMBs show as 'absent' across the board, which is the actual gap
  const queries = [
    `best ${vertical} near me ${city}`,
    `top-rated ${vertical} ${city} reviews`,
    `${vertical} ${city} accepting new clients`,
  ];
  const engines = ENGINES.map((e) => e.name);
  return {
    businessName,
    city,
    url,
    vertical,
    queries: queries.map((q) => ({
      query: q,
      engines: engines.map((eng) => ({
        engine: eng,
        status: "absent" as const,
        excerpt: `Sample mode: in production with ANTHROPIC_API_KEY set, ${eng} would predict whether your business appears in its top-5 answer for "${q}". The live version uses Claude to simulate each engine's actual retrieval and citation behavior.`,
      })),
    })),
    totalScore: 0,
    summary: `Sample matrix for ${businessName} in ${city}. The deployed version queries Claude with engine-specific prompts that mirror how ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot retrieve and cite local businesses. Set ANTHROPIC_API_KEY in Cloudflare Pages env to activate live mode.`,
    isLive: false,
    generatedAt: new Date().toISOString(),
  };
}
