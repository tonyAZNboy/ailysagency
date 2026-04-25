import { useEffect, useState } from "react";
import { Loader2, AlertTriangle, ArrowUpRight, Mail, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Client {
  id: string;
  email: string;
  business_name: string;
  contact_name: string | null;
  city: string | null;
  industry: string | null;
  tier: string;
  monthly_cad: number;
  language: string;
  status: string;
  onboarded_at: string;
  notes: string | null;
}

const TIER_TONE: Record<string, string> = {
  starter: "from-cyan-500 to-teal-500 text-cyan-100",
  core: "from-violet-500 to-fuchsia-500 text-violet-100",
  growth: "from-amber-500 to-rose-500 text-amber-100",
  autopilot: "from-emerald-500 to-cyan-500 text-emerald-100",
};

const STATUS_TONE: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  paused: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  cancelled: "bg-rose-500/15 text-rose-300 border-rose-400/30",
  churned: "bg-rose-500/20 text-rose-200 border-rose-400/40",
};

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error: dbError } = await supabase
          .from("clients")
          .select("*")
          .order("onboarded_at", { ascending: false })
          .limit(200);
        if (!mounted) return;
        if (dbError) setError(dbError.message);
        else setClients((data ?? []) as Client[]);
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

  const totalMRR = clients
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + Number(c.monthly_cad), 0);

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
            Admin / clients
          </div>
          <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
            Paying clients
          </h1>
          <p className="text-sm text-muted-foreground">
            Roster of paid AiLys clients across the four tiers. Each onboarding
            triggers the tier-specific email sequence.
          </p>
        </div>
        <Button
          onClick={() =>
            alert(
              "Mark-as-client flow: from /admin/users, hit + Client on a row to convert. Bulk import coming next.",
            )
          }
          className="rounded-full font-semibold"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New client
        </Button>
      </header>

      {/* MRR strip */}
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        <KpiTile label="Active clients" value={String(clients.filter((c) => c.status === "active").length)} />
        <KpiTile label="Monthly MRR" value={`$${totalMRR.toLocaleString()}`} accent />
        <KpiTile label="Paused" value={String(clients.filter((c) => c.status === "paused").length)} />
        <KpiTile label="Churned" value={String(clients.filter((c) => c.status === "churned").length)} tone="rose" />
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading clients...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              clients table not found
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Apply migration 0002 in supabase/migrations/0002_email_lifecycle.sql.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 break-all">{error}</p>
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md p-10 text-center">
          <p className="font-display text-2xl italic text-muted-foreground mb-2">
            No clients yet.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
            Go to <code className="font-mono">/admin/users</code> and click <strong>+ Client</strong> on any row to convert a lead into a paid client.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-card/40">
                <Th>Business</Th>
                <Th>Tier</Th>
                <Th align="right">MRR</Th>
                <Th>Status</Th>
                <Th>Onboarded</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-t border-border/30 hover:bg-card/30 transition-colors">
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-foreground/95">{c.business_name}</div>
                    <div className="text-xs text-muted-foreground/80">{c.email}</div>
                    <div className="text-[10px] font-mono text-muted-foreground/60">
                      {[c.city, c.industry].filter(Boolean).join(" · ")}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-gradient-to-r ${TIER_TONE[c.tier] ?? TIER_TONE.starter}`}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-right font-mono tabular-nums">
                    ${Number(c.monthly_cad).toLocaleString()}/mo
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] border ${STATUS_TONE[c.status] ?? STATUS_TONE.active}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {new Date(c.onboarded_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-1.5">
                      <button
                        className="p-1.5 rounded-md border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        onClick={() => (window.location.href = `mailto:${c.email}`)}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="p-1.5 rounded-md border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        title="Open client"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

function KpiTile({
  label,
  value,
  accent,
  tone,
}: {
  label: string;
  value: string;
  accent?: boolean;
  tone?: "rose";
}) {
  const valueClass = accent
    ? "bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
    : tone === "rose"
      ? "text-rose-300"
      : "text-foreground";
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-1">
        {label}
      </div>
      <div className={`font-display text-3xl tracking-tight tabular-nums ${valueClass}`}>
        {value}
      </div>
    </div>
  );
}
