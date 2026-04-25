import { Settings as SettingsIcon, ExternalLink } from "lucide-react";

export default function AdminSettings() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || "Not set";
  const hasKey = !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <header className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Admin / settings
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          Settings & integrations
        </h1>
        <p className="text-sm text-muted-foreground">
          Backend connections, deployment status, and operator config.
        </p>
      </header>

      <div className="space-y-5">
        <section className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="w-4 h-4 text-primary" />
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em]">Supabase backend</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <Row label="Project URL" value={envUrl} />
            <Row
              label="Anon key"
              value={hasKey ? "Configured" : "Not set"}
              ok={hasKey}
            />
            <Row label="Migrations applied" value="Manual via supabase CLI" hint />
          </dl>
          <p className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground leading-relaxed">
            To swap or update Supabase credentials, change{" "}
            <code className="font-mono text-foreground">VITE_SUPABASE_URL</code> and{" "}
            <code className="font-mono text-foreground">VITE_SUPABASE_PUBLISHABLE_KEY</code> in
            Cloudflare Pages env vars and redeploy.
          </p>
        </section>

        <section className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4">Integrations</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between p-3 rounded-lg bg-background/40">
              <span>Cal.com / Calendly</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                Pending setup
              </span>
            </li>
            <li className="flex items-center justify-between p-3 rounded-lg bg-background/40">
              <span>n8n workflow (audit pipeline)</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                Pending setup
              </span>
            </li>
            <li className="flex items-center justify-between p-3 rounded-lg bg-background/40">
              <span>AiLys chat backend (Anthropic + Supabase edge functions)</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                Pending deploy
              </span>
            </li>
            <li className="flex items-center justify-between p-3 rounded-lg bg-background/40">
              <span>Cloudflare Pages</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                Live
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4">Quick links</h2>
          <ul className="space-y-2 text-sm">
            <QuickLink label="Cloudflare Pages dashboard" href="https://dash.cloudflare.com/?to=/:account/workers-and-pages" />
            <QuickLink label="GitHub repo" href="https://github.com/tonyAZNboy/ailysagency" />
            <QuickLink label="Live site" href="https://ailysagency.pages.dev" />
            <QuickLink label="Supabase dashboard" href="https://supabase.com/dashboard" />
          </ul>
        </section>
      </div>
    </div>
  );
}

function Row({ label, value, ok, hint }: { label: string; value: string; ok?: boolean; hint?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-border/30 last:border-b-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={`font-mono text-xs break-all ${
          ok === true ? "text-emerald-300" : ok === false ? "text-rose-300" : hint ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function QuickLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3 rounded-lg bg-background/40 hover:bg-background/60 transition-colors group"
      >
        <span>{label}</span>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      </a>
    </li>
  );
}
