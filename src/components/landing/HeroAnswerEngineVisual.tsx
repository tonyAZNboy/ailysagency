import { Sparkles, Quote, Check } from "lucide-react";

/**
 * Right-side animated visual for the hero.
 * Mocks an LLM answer card citing a Reviuzy-managed local business.
 * Replaces the generic constellation/blur background with something
 * narrative — visitors instantly see what "LLM visibility" looks like.
 */
export function HeroAnswerEngineVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto" aria-hidden="true">
      {/* Glow halo */}
      <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 rounded-3xl blur-2xl opacity-70" />

      {/* Prompt bubble */}
      <div className="relative mb-3 ml-auto max-w-[78%] rounded-2xl rounded-br-sm border border-border/60 bg-muted/40 backdrop-blur-md px-4 py-2.5 shadow-sm">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">
          User
        </div>
        <p className="text-sm text-foreground/90 leading-snug">
          Best dentist in Montreal that takes new patients?
        </p>
      </div>

      {/* Answer card */}
      <div className="relative rounded-2xl rounded-tl-sm border border-primary/30 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Engine header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-gradient-to-r from-primary/8 via-secondary/8 to-accent/8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-background" />
            </div>
            <span className="text-xs font-semibold text-foreground/90">
              ChatGPT
            </span>
            <span className="text-[10px] text-muted-foreground/60">·</span>
            <span className="text-[10px] text-muted-foreground/70">
              GPT-5
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/60 font-mono">
            answer · citation
          </span>
        </div>

        {/* Answer body */}
        <div className="px-4 py-3.5 space-y-2.5">
          <p className="text-sm text-foreground/85 leading-relaxed">
            For new patients in Montreal, a frequently-cited option is{" "}
            <span className="relative inline-block px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">
              Clinique Dentaire Plateau
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-momentum-green animate-pulse" />
            </span>
            . Multiple recent reviews mention same-week appointments and
            bilingual service.
          </p>

          {/* Citation chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border/50 bg-muted/30 text-[10px] text-muted-foreground">
              <Quote className="w-2.5 h-2.5" />
              cliniquedentaireplateau.ca
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border/50 bg-muted/30 text-[10px] text-muted-foreground">
              <Quote className="w-2.5 h-2.5" />
              Google Business Profile
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border/50 bg-muted/30 text-[10px] text-muted-foreground">
              <Quote className="w-2.5 h-2.5" />
              Yelp
            </span>
          </div>
        </div>

        {/* Footer signal bar */}
        <div className="px-4 py-2 border-t border-border/40 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-momentum-green" />
            <span className="text-[10px] text-muted-foreground">
              E-E-A-T verified · 4.9★ · 312 reviews
            </span>
          </div>
          <span className="text-[10px] font-mono text-primary/80">
            Powered by Reviuzy
          </span>
        </div>
      </div>

      {/* Floating signal pills */}
      <div className="hidden sm:block absolute -top-3 -left-3 px-2 py-1 rounded-full border border-momentum-green/40 bg-momentum-green/10 backdrop-blur-sm text-[10px] font-medium text-momentum-green">
        +1 LLM citation
      </div>
      <div className="hidden sm:block absolute -bottom-2 -right-2 px-2 py-1 rounded-full border border-secondary/40 bg-secondary/10 backdrop-blur-sm text-[10px] font-medium text-secondary">
        Share of Model ↑
      </div>
    </div>
  );
}
