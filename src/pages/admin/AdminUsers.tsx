import { useEffect, useState, useMemo } from "react";
import { Loader2, AlertTriangle, Search, Mail, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UnifiedUser {
  email: string;
  first_seen_at: string;
  last_seen_at: string;
  audit_count: number;
  booking_count: number;
  chat_count: number;
  newsletter_count: number;
  touch_count: number;
  lifecycle_stage: string;
  engagement_score: number;
  churn_risk_score: number;
  days_since_last_seen: number;
}

const STAGE_TONE: Record<string, string> = {
  new: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  engaged: "bg-violet-500/15 text-violet-300 border-violet-400/30",
  nurturing: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  qualified: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  cold: "bg-muted/30 text-muted-foreground border-border/40",
  dormant: "bg-rose-500/10 text-rose-300/80 border-rose-400/20",
  churning: "bg-rose-500/20 text-rose-300 border-rose-400/40",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UnifiedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error: dbError } = await supabase
          .from("users_unified")
          .select("*")
          .order("last_seen_at", { ascending: false })
          .limit(500);
        if (!mounted) return;
        if (dbError) setError(dbError.message);
        else setUsers((data ?? []) as UnifiedUser[]);
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

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (stageFilter !== "all" && u.lifecycle_stage !== stageFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!u.email.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [users, search, stageFilter]);

  const stages = ["all", "new", "engaged", "nurturing", "qualified", "cold", "dormant", "churning"];

  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: users.length };
    for (const u of users) {
      counts[u.lifecycle_stage] = (counts[u.lifecycle_stage] ?? 0) + 1;
    }
    return counts;
  }, [users]);

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Admin / users
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          Unified user view
        </h1>
        <p className="text-sm text-muted-foreground">
          One row per email. Joins audit submissions, booking requests, chat captures,
          and newsletter signups. Lifecycle stage is computed from activity.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className="pl-11 h-11 bg-card/40 border-border/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] border transition-all ${
                stageFilter === s
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card/30 border-border/50 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s} <span className="opacity-60 ml-1">({stageCounts[s] ?? 0})</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading users...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              users_unified view not found
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Apply migration 0002 in supabase/migrations/0002_email_lifecycle.sql.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 break-all">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md p-10 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">
            No users match.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/40">
                  <Th>Email</Th>
                  <Th>Stage</Th>
                  <Th align="right">Engagement</Th>
                  <Th align="right">Churn risk</Th>
                  <Th align="right">Touches</Th>
                  <Th>Last seen</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u.email}
                    className="border-t border-border/30 hover:bg-card/30 transition-colors"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium text-foreground/95">{u.email}</div>
                      <div className="text-[10px] font-mono text-muted-foreground/60">
                        {u.audit_count > 0 && `${u.audit_count} audit`}
                        {u.audit_count > 0 && u.booking_count > 0 && " · "}
                        {u.booking_count > 0 && `${u.booking_count} booking`}
                        {(u.audit_count > 0 || u.booking_count > 0) && u.chat_count > 0 && " · "}
                        {u.chat_count > 0 && `${u.chat_count} chat`}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] border ${STAGE_TONE[u.lifecycle_stage] ?? STAGE_TONE.cold}`}
                      >
                        {u.lifecycle_stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <ScoreBar value={u.engagement_score} tone="primary" />
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <ScoreBar
                        value={u.churn_risk_score}
                        tone={
                          u.churn_risk_score >= 60
                            ? "rose"
                            : u.churn_risk_score >= 25
                              ? "amber"
                              : "emerald"
                        }
                      />
                    </td>
                    <td className="px-4 py-3 align-top text-right font-mono tabular-nums text-foreground/85">
                      {u.touch_count}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                      {u.days_since_last_seen}d ago
                      <div className="text-[10px] font-mono text-muted-foreground/60">
                        {new Date(u.last_seen_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-1.5">
                        <button
                          className="p-1.5 rounded-md border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                          title="Email user"
                          onClick={() => (window.location.href = `mailto:${u.email}`)}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-[10px] h-7 px-3 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10"
                          onClick={() => alert("Mark as client flow lands when migration 0002 is applied. Stub for now.")}
                        >
                          + Client
                          <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border/30 text-xs text-muted-foreground/60 font-mono">
            {filtered.length} {filtered.length === 1 ? "user" : "users"} · most recent 500
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

function ScoreBar({
  value,
  tone,
}: {
  value: number;
  tone: "primary" | "rose" | "amber" | "emerald";
}) {
  const toneMap = {
    primary: "from-cyan-400 to-violet-400",
    rose: "from-rose-500 to-pink-500",
    amber: "from-amber-400 to-orange-400",
    emerald: "from-emerald-400 to-cyan-400",
  };
  return (
    <div className="inline-flex items-center gap-2 min-w-[90px] justify-end">
      <span className="font-mono text-xs tabular-nums text-foreground/85 w-7">
        {value}
      </span>
      <div className="w-12 h-1.5 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${toneMap[tone]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
