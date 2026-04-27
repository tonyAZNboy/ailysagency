import { useEffect, useState } from "react";
import { Loader2, AlertTriangle, Mail, Pause, Play, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Step {
  delay_days: number;
  subject: string;
  preheader: string;
  body: string;
  cta_label: string;
  cta_url: string;
}

interface Sequence {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  trigger: string;
  status: string;
  steps: Step[];
  language: string;
}

const TYPE_TONE: Record<string, string> = {
  welcome: "from-emerald-500 to-cyan-500 text-emerald-100",
  education: "from-cyan-500 to-violet-500 text-cyan-100",
  soft_pitch: "from-amber-500 to-orange-500 text-amber-100",
  hard_pitch: "from-rose-500 to-pink-500 text-rose-100",
  win_back: "from-violet-500 to-fuchsia-500 text-violet-100",
  reactivation: "from-amber-500 to-rose-500 text-amber-100",
  custom: "from-muted to-muted-foreground/30 text-muted-foreground",
};

export default function AdminLifecycle() {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error: dbError } = await supabase
          .from("email_sequences")
          .select("*")
          .order("type")
          .order("name");
        if (!mounted) return;
        if (dbError) setError(dbError.message);
        else setSequences((data ?? []) as Sequence[]);
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(String(err));
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleStatus = async (seq: Sequence) => {
    const next = seq.status === "active" ? "paused" : "active";
    const { error: dbError } = await supabase
      .from("email_sequences")
      .update({ status: next })
      .eq("id", seq.id);
    if (!dbError) {
      setSequences((prev) =>
        prev.map((s) => (s.id === seq.id ? { ...s, status: next } : s)),
      );
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Admin / lifecycle
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          Email lifecycle sequences
        </h1>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Pre-built sequences for welcome, education, soft pitch, hard pitch, win-back,
          and tier-specific client onboarding (Starter, Core, Growth, Agency). Each
          sequence has multiple steps with delay days. Activate to start auto-enrolling
          users when the trigger condition fires.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading sequences...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              email_sequences not found
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Apply migration 0002 to seed the sequences.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 break-all">{error}</p>
        </div>
      ) : sequences.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/20 p-10 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">
            No sequences seeded yet. Run migration 0002.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sequences.map((s) => {
            const isOpen = expanded === s.id;
            return (
              <div
                key={s.id}
                className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-card/40 transition-colors">
                  <button
                    onClick={() => setExpanded(isOpen ? null : s.id)}
                    className="flex-1 flex items-start gap-4 text-left"
                  >
                    <span
                      className={`flex-shrink-0 inline-block px-2.5 py-0.5 mt-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-gradient-to-r ${TYPE_TONE[s.type] ?? TYPE_TONE.custom}`}
                    >
                      {s.type.replace(/_/g, " ")}
                    </span>
                    <div className="flex-1">
                      <div className="font-display text-xl text-foreground/95 leading-tight">
                        {s.name}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {s.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
                        <span>{s.steps.length} steps</span>
                        <span>·</span>
                        <span>Trigger: {s.trigger.replace(/_/g, " ")}</span>
                        <span>·</span>
                        <span className="text-foreground/70">{s.language}</span>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] border ${
                        s.status === "active"
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
                          : s.status === "paused"
                            ? "bg-amber-500/15 text-amber-300 border-amber-400/30"
                            : "bg-muted/30 text-muted-foreground border-border/40"
                      }`}
                    >
                      {s.status}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(s)}
                      className="rounded-full text-xs h-8"
                    >
                      {s.status === "active" ? (
                        <>
                          <Pause className="w-3 h-3 mr-1.5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1.5" />
                          Activate
                        </>
                      )}
                    </Button>
                    <button
                      onClick={() => setExpanded(isOpen ? null : s.id)}
                      className="p-2 rounded-md border border-border/40 hover:border-primary/40 transition-colors"
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-border/30 p-5 bg-background/30">
                    <ol className="space-y-4">
                      {s.steps.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-lg border border-border/40 bg-card/20"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-mono text-xs text-primary tabular-nums">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-baseline gap-3 mb-2">
                              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                                Day {step.delay_days}
                              </span>
                              <span className="font-display text-lg text-foreground/95 leading-tight">
                                {step.subject}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground/80 italic mb-3">
                              {step.preheader}
                            </p>
                            <pre className="text-xs text-foreground/85 leading-relaxed whitespace-pre-wrap font-sans bg-background/40 rounded p-3 border border-border/30 max-h-48 overflow-y-auto">
                              {step.body}
                            </pre>
                            <div className="flex items-center gap-2 mt-3">
                              <Mail className="w-3 h-3 text-primary/70" />
                              <span className="text-xs text-muted-foreground">
                                CTA: <span className="text-foreground/85">{step.cta_label}</span>
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Note about wiring */}
      <div className="mt-10 rounded-2xl border border-border/40 bg-card/20 p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
          Email send wiring
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sequences are stored. The actual email-send job runs as a Supabase
          pg_cron + Resend (or similar) edge function. Deploy the cron when
          you have the AiLys Supabase project provisioned and Resend API key
          set up. Documentation lives in{" "}
          <code className="font-mono text-foreground">supabase/functions/README.md</code>.
        </p>
      </div>
    </div>
  );
}
