import { useEffect, useState } from "react";
import { Loader2, AlertTriangle, Mail, Send, TrendingDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ChurnRow {
  email: string;
  first_seen_at: string;
  last_seen_at: string;
  days_since_last_seen: number;
  lifecycle_stage: string;
  engagement_score: number;
  churn_risk_score: number;
  audit_count: number;
  booking_count: number;
  chat_count: number;
  risk_band: string;
}

const RISK_TONE: Record<string, string> = {
  high_value_at_risk: "bg-rose-500/20 text-rose-200 border-rose-400/40",
  at_risk: "bg-rose-500/15 text-rose-300 border-rose-400/30",
  cooling: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  healthy: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
};

export default function AdminChurn() {
  const [rows, setRows] = useState<ChurnRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "high_value_at_risk" | "at_risk" | "cooling">(
    "high_value_at_risk",
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error: dbError } = await supabase
          .from("churn_signals")
          .select("*")
          .limit(500);
        if (!mounted) return;
        if (dbError) setError(dbError.message);
        else setRows((data ?? []) as ChurnRow[]);
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

  const filtered = rows.filter((r) => {
    if (filter === "all") return true;
    return r.risk_band === filter;
  });

  const counts = {
    high_value_at_risk: rows.filter((r) => r.risk_band === "high_value_at_risk").length,
    at_risk: rows.filter((r) => r.risk_band === "at_risk").length,
    cooling: rows.filter((r) => r.risk_band === "cooling").length,
    healthy: rows.filter((r) => r.risk_band === "healthy").length,
  };

  const enrollWinBack = async (email: string) => {
    const { data: seq, error: seqErr } = await supabase
      .from("email_sequences")
      .select("id")
      .eq("slug", "win_back")
      .single();
    if (seqErr || !seq) {
      alert("win_back sequence not found. Apply migration 0002 first.");
      return;
    }
    const { error: enrollErr } = await supabase
      .from("email_sequence_enrollments")
      .insert({
        email,
        sequence_id: seq.id,
        status: "active",
        next_send_at: new Date().toISOString(),
      });
    if (enrollErr) {
      alert(`Failed to enroll: ${enrollErr.message}`);
    } else {
      alert(`${email} enrolled in win-back sequence. First email queued.`);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Admin / churn
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          Churn risk monitor
        </h1>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Users sorted by churn risk score. High-value-at-risk = had real
          engagement but went quiet. Trigger win-back sequence in one click.
        </p>
      </header>

      {/* Risk band tiles */}
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        <RiskTile
          label="High-value at risk"
          value={counts.high_value_at_risk}
          tone="rose"
          active={filter === "high_value_at_risk"}
          onClick={() => setFilter("high_value_at_risk")}
        />
        <RiskTile
          label="At risk"
          value={counts.at_risk}
          tone="rose-light"
          active={filter === "at_risk"}
          onClick={() => setFilter("at_risk")}
        />
        <RiskTile
          label="Cooling"
          value={counts.cooling}
          tone="amber"
          active={filter === "cooling"}
          onClick={() => setFilter("cooling")}
        />
        <RiskTile
          label="Healthy"
          value={counts.healthy}
          tone="emerald"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading churn signals...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              churn_signals view not found
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Apply migration 0002 in supabase/migrations/0002_email_lifecycle.sql.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 break-all">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/20 p-10 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">
            No users in this risk band.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-card/40">
                <Th>Email</Th>
                <Th>Risk band</Th>
                <Th align="right">Churn score</Th>
                <Th align="right">Engagement</Th>
                <Th>Last seen</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.email}
                  className="border-t border-border/30 hover:bg-card/30 transition-colors"
                >
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-foreground/95">{r.email}</div>
                    <div className="text-[10px] font-mono text-muted-foreground/60">
                      {r.audit_count > 0 && `${r.audit_count}a`}
                      {r.booking_count > 0 && ` ${r.booking_count}b`}
                      {r.chat_count > 0 && ` ${r.chat_count}c`}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] border ${RISK_TONE[r.risk_band] ?? RISK_TONE.healthy}`}
                    >
                      {r.risk_band.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-right font-mono tabular-nums text-rose-300">
                    {r.churn_risk_score}
                  </td>
                  <td className="px-4 py-3 align-top text-right font-mono tabular-nums text-foreground/80">
                    {r.engagement_score}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {r.days_since_last_seen}d ago
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full text-[10px] h-7 px-3 border-rose-400/40 text-rose-300 hover:bg-rose-500/10"
                        onClick={() => enrollWinBack(r.email)}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Win-back
                      </Button>
                      <button
                        className="p-1.5 rounded-md border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        onClick={() => (window.location.href = `mailto:${r.email}`)}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-border/30 text-xs text-muted-foreground/60 font-mono">
            {filtered.length} {filtered.length === 1 ? "user" : "users"}
          </div>
        </div>
      )}
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function RiskTile({
  label,
  value,
  tone,
  active,
  onClick,
}: {
  label: string;
  value: number;
  tone: "rose" | "rose-light" | "amber" | "emerald";
  active: boolean;
  onClick: () => void;
}) {
  const toneMap = {
    rose: "border-rose-400/40 bg-rose-500/[0.08]",
    "rose-light": "border-rose-400/25 bg-rose-500/[0.04]",
    amber: "border-amber-400/40 bg-amber-500/[0.06]",
    emerald: "border-emerald-400/40 bg-emerald-500/[0.06]",
  };
  const valueTone = {
    rose: "text-rose-300",
    "rose-light": "text-rose-300/80",
    amber: "text-amber-300",
    emerald: "text-emerald-300",
  };
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition-all ${toneMap[tone]} ${active ? "ring-2 ring-primary/40" : "hover:scale-[1.01]"}`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <TrendingDown className={`w-3.5 h-3.5 ${valueTone[tone]}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          {label}
        </span>
      </div>
      <div className={`font-display text-3xl tabular-nums ${valueTone[tone]}`}>
        {value}
      </div>
    </button>
  );
}
