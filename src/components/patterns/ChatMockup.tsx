import { Sparkles, MessageSquare } from "lucide-react";
import type { IndustryCitationSample } from "@/data/industries";
import type { Mood } from "@/design-system/moods";

// ChatMockup
// Renders a sample LLM citation as a fake chat conversation. Visually
// resembles ChatGPT / Perplexity / Gemini chat UIs so the demo feels
// concrete rather than abstract bullet-point lists. Mood gradient on
// the engine badge + AI bubble accents.
//
// Recycles existing IndustryCitationSample data shape, no new strings.

interface ChatMockupProps {
  citation: IndustryCitationSample;
  mood: Mood;
}

// Map known engine names to a short visual signature. Falls back to a
// generic AI badge for unknown engines.
function engineSignature(engine: string): { initials: string; tone: string } {
  const e = engine.toLowerCase();
  if (e.includes("chatgpt") || e.includes("openai")) return { initials: "GPT", tone: "from-emerald-400 to-teal-500" };
  if (e.includes("perplexity")) return { initials: "PPL", tone: "from-cyan-400 to-blue-500" };
  if (e.includes("claude") || e.includes("anthropic")) return { initials: "CLD", tone: "from-orange-400 to-amber-500" };
  if (e.includes("gemini") || e.includes("google aio") || e.includes("google")) return { initials: "AIO", tone: "from-blue-400 to-violet-500" };
  if (e.includes("bing") || e.includes("copilot")) return { initials: "BNG", tone: "from-sky-400 to-indigo-500" };
  return { initials: "AI", tone: "from-gray-400 to-gray-600" };
}

export function ChatMockup({ citation, mood }: ChatMockupProps) {
  const sig = engineSignature(citation.engine);

  return (
    <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md overflow-hidden flex flex-col h-full">
      {/* Engine header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-background/30">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg bg-gradient-to-br ${sig.tone} flex items-center justify-center text-[10px] font-bold text-white`}
            aria-hidden="true"
          >
            {sig.initials}
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
            {citation.engine}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${mood.accentGradient} text-background`}>
          <Sparkles className="w-2.5 h-2.5" />
          cited
        </span>
      </div>

      {/* User query bubble */}
      <div className="px-4 py-4 flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-secondary/40 backdrop-blur-sm px-4 py-2.5 text-sm text-foreground/90 italic">
          <span className="block text-[10px] font-mono not-italic uppercase tracking-wider text-muted-foreground/70 mb-1">
            <MessageSquare className="inline w-3 h-3 mr-1" />
            user
          </span>
          {citation.query}
        </div>
      </div>

      {/* AI response bubble */}
      <div className="px-4 pb-4 flex justify-start">
        <div className={`max-w-[90%] rounded-2xl rounded-bl-md bg-gradient-to-br ${mood.accentGradient} bg-clip-padding p-[1px]`}>
          <div className="rounded-[calc(1rem-1px)] bg-card/90 backdrop-blur-md px-4 py-3 text-sm text-foreground space-y-2">
            <span className={`block text-[10px] font-mono not-italic uppercase tracking-wider bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent mb-1 font-bold`}>
              {sig.initials} response
            </span>
            <p className="font-semibold leading-snug">{citation.cited}</p>
          </div>
        </div>
      </div>

      {/* Why it cited (footer) */}
      <div className="mt-auto px-4 pt-3 pb-4 border-t border-border/30 bg-background/20">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/80 mb-1.5">
          why it cited
        </div>
        <p className="text-xs text-muted-foreground/90 leading-relaxed">
          {citation.reason}
        </p>
      </div>
    </div>
  );
}
