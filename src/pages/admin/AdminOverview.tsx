import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  CalendarCheck,
  MessageCircle,
  Globe2,
  ArrowUpRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  audits: number;
  bookings: number;
  chats: number;
  visitors: number;
  audits7d: number;
  bookings7d: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const sevenDaysAgo = new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000,
        ).toISOString();

        const [
          auditsAll,
          audits7,
          bookingsAll,
          bookings7,
          chatsAll,
          visitorsAll,
        ] = await Promise.all([
          supabase.from("audit_requests").select("id", { count: "exact", head: true }),
          supabase.from("audit_requests").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
          supabase.from("booking_requests").select("id", { count: "exact", head: true }),
          supabase.from("booking_requests").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
          supabase.from("chat_sessions").select("id", { count: "exact", head: true }),
          supabase.from("visitor_sessions").select("id", { count: "exact", head: true }),
        ]);

        if (!mounted) return;

        setStats({
          audits: auditsAll.count ?? 0,
          audits7d: audits7.count ?? 0,
          bookings: bookingsAll.count ?? 0,
          bookings7d: bookings7.count ?? 0,
          chats: chatsAll.count ?? 0,
          visitors: visitorsAll.count ?? 0,
        });
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

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Overview
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          Today at a glance
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time metrics across audits, bookings, chats, and visitors. All
          numbers reflect the current Supabase state.
        </p>
      </header>

      {error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300 mb-2">
            Tables not yet provisioned
          </div>
          <p className="text-sm text-muted-foreground">
            Apply the migration in <code className="font-mono">supabase/migrations/0001_admin_tables.sql</code> to start collecting data.
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <KpiCard
              icon={Users}
              label="Audit requests"
              value={loading ? "—" : String(stats?.audits ?? 0)}
              delta={stats ? `+${stats.audits7d} last 7 days` : "—"}
              tone="cyan"
            />
            <KpiCard
              icon={CalendarCheck}
              label="Bookings"
              value={loading ? "—" : String(stats?.bookings ?? 0)}
              delta={stats ? `+${stats.bookings7d} last 7 days` : "—"}
              tone="violet"
            />
            <KpiCard
              icon={MessageCircle}
              label="Chat sessions"
              value={loading ? "—" : String(stats?.chats ?? 0)}
              delta="all time"
              tone="amber"
            />
            <KpiCard
              icon={Globe2}
              label="Unique visitors"
              value={loading ? "—" : String(stats?.visitors ?? 0)}
              delta="all time"
              tone="emerald"
            />
          </div>

          {/* Funnel visualization */}
          <section className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6 mb-10">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em]">
                Conversion funnel
              </h2>
            </div>
            <div className="space-y-3">
              <FunnelRow
                label="Visitors"
                value={stats?.visitors ?? 0}
                pct={100}
                tone="cyan"
              />
              <FunnelRow
                label="Chat engagements"
                value={stats?.chats ?? 0}
                pct={
                  stats?.visitors
                    ? Math.min(100, (stats.chats / stats.visitors) * 100)
                    : 0
                }
                tone="amber"
              />
              <FunnelRow
                label="Audit submissions"
                value={stats?.audits ?? 0}
                pct={
                  stats?.visitors
                    ? Math.min(100, (stats.audits / stats.visitors) * 100)
                    : 0
                }
                tone="violet"
              />
              <FunnelRow
                label="Strategy call bookings"
                value={stats?.bookings ?? 0}
                pct={
                  stats?.visitors
                    ? Math.min(100, (stats.bookings / stats.visitors) * 100)
                    : 0
                }
                tone="emerald"
              />
            </div>
            <p className="mt-5 pt-4 border-t border-border/30 text-xs text-muted-foreground">
              Conversion rate from visitor to audit:{" "}
              <span className="font-mono text-foreground">
                {stats?.visitors
                  ? ((stats.audits / stats.visitors) * 100).toFixed(2) + "%"
                  : "—"}
              </span>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  delta: string;
  tone: "cyan" | "violet" | "amber" | "emerald";
}) {
  const toneMap = {
    cyan: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
    violet: "text-violet-300 bg-violet-500/10 border-violet-400/20",
    amber: "text-amber-300 bg-amber-500/10 border-amber-400/20",
    emerald: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  };
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-5">
      <div
        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border ${toneMap[tone]} mb-4`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-1">
        {label}
      </div>
      <div className="font-display text-3xl tracking-tight mb-1">{value}</div>
      <div className="text-xs text-muted-foreground/70 inline-flex items-center gap-1">
        <ArrowUpRight className="w-3 h-3" />
        {delta}
      </div>
    </div>
  );
}

function FunnelRow({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: number;
  pct: number;
  tone: "cyan" | "violet" | "amber" | "emerald";
}) {
  const toneMap = {
    cyan: "from-cyan-500 to-teal-400",
    violet: "from-violet-500 to-fuchsia-400",
    amber: "from-amber-500 to-orange-400",
    emerald: "from-emerald-500 to-cyan-400",
  };
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5 text-sm">
        <span className="text-foreground/85">{label}</span>
        <span className="font-mono tabular-nums">
          {value} <span className="text-muted-foreground/60">({pct.toFixed(1)}%)</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${toneMap[tone]} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
