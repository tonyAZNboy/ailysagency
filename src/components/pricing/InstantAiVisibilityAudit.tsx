// Phase E.2.1: instant AI Visibility audit form (UI surface for E.1.8 endpoint).
//
// Public, no-auth, pre-sales conversion tool. Calls POST /api/audit-ai-visibility-instant
// with business name + URL + locale. Renders score (0-100) + 3 missing-points
// bullets. Includes honeypot, fallback handling, mobile-first layout.

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LangContext";

type AuditState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; score: number; missing: string[]; cached: boolean }
  | { kind: "error"; message: string };

const COPY = {
  en: {
    eyebrow: "FREE INSTANT AUDIT",
    headline: "Get your AI Visibility score in 12 seconds",
    description: "Type your business name and URL. Our engine returns a Share-of-Model score (0-100) plus the 3 things most likely missing. No email required.",
    businessLabel: "Business name",
    businessPlaceholder: "Cafe Olimpico",
    urlLabel: "Website URL",
    urlPlaceholder: "https://cafeolimpico.com",
    submit: "Run instant audit",
    submitting: "Auditing...",
    cached: "(cached result, last 24h)",
    yourScore: "Your AI Visibility score",
    missingTitle: "Top 3 things likely missing",
    bookFollowup: "Book a free 15-min call to fix it",
    invalidEmail: "Please use a valid URL",
    errorGeneric: "Audit unavailable, try again in a moment.",
    rateLimited: "Too many audits from your IP. Try in 15 minutes.",
  },
  fr: {
    eyebrow: "AUDIT INSTANTANE GRATUIT",
    headline: "Obtenez votre score AI Visibility en 12 secondes",
    description: "Inscrivez le nom de votre entreprise et votre URL. Notre moteur retourne un score Share of Model (0-100) plus les 3 elements qui manquent probablement le plus. Aucun courriel requis.",
    businessLabel: "Nom d'entreprise",
    businessPlaceholder: "Cafe Olimpico",
    urlLabel: "URL du site web",
    urlPlaceholder: "https://cafeolimpico.com",
    submit: "Lancer l'audit instantane",
    submitting: "Audit en cours...",
    cached: "(resultat en cache, 24h)",
    yourScore: "Votre score AI Visibility",
    missingTitle: "Top 3 elements manquants probables",
    bookFollowup: "Reservez un appel gratuit de 15 min pour corriger",
    invalidEmail: "URL invalide",
    errorGeneric: "Audit indisponible, reessayez dans un moment.",
    rateLimited: "Trop d'audits depuis votre IP. Reessayez dans 15 minutes.",
  },
};

function scoreBand(score: number): { label: string; tone: string } {
  if (score >= 70) return { label: "Strong", tone: "text-emerald-300" };
  if (score >= 50) return { label: "Developing", tone: "text-amber-300" };
  if (score >= 30) return { label: "Weak", tone: "text-orange-300" };
  return { label: "Critical", tone: "text-rose-300" };
}

// E.6: persistence so prospects who type business name + URL but bounce
// before submit can return to their input.
const STORAGE_KEY = "ailys_instant_audit_v1";
function loadPersisted(): { businessName?: string; url?: string } {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch { return {}; }
}
function savePersisted(state: { businessName: string; url: string }) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export function InstantAiVisibilityAudit() {
  const { lang: ctxLang } = useLang();
  const lang: "en" | "fr" = ctxLang === "fr" ? "fr" : "en";
  const copy = COPY[lang];

  const persisted = useMemo(() => loadPersisted(), []);
  const [businessName, setBusinessName] = useState(persisted.businessName ?? "");
  const [url, setUrl] = useState(persisted.url ?? "");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<AuditState>({ kind: "idle" });

  useEffect(() => {
    savePersisted({ businessName, url });
  }, [businessName, url]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !url.trim()) return;
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/audit-ai-visibility-instant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ businessName, url, lang, honeypot }),
      });
      if (res.status === 429) {
        setState({ kind: "error", message: copy.rateLimited });
        return;
      }
      if (!res.ok) {
        setState({ kind: "error", message: copy.errorGeneric });
        return;
      }
      const data = (await res.json()) as { score: number; missing: string[]; cached: boolean };
      setState({ kind: "success", score: data.score, missing: data.missing, cached: data.cached });
    } catch {
      setState({ kind: "error", message: copy.errorGeneric });
    }
  };

  const langPrefix = ctxLang === "en" ? "" : `/${ctxLang}`;

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.04] via-violet-500/[0.02] to-transparent p-5 sm:p-7 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-300" aria-hidden />
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300">{copy.eyebrow}</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2">{copy.headline}</h2>
      <p className="text-sm text-zinc-400 mb-5 max-w-xl">{copy.description}</p>

      {state.kind !== "success" && (
        <form
          onSubmit={submit}
          className="flex flex-col sm:flex-row gap-3 sm:items-end"
          aria-busy={state.kind === "loading"}
          aria-describedby="instant-audit-status"
        >
          <div className="flex-1">
            <label htmlFor="instant-audit-business" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.businessLabel}</label>
            <input
              id="instant-audit-business"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={copy.businessPlaceholder}
              required
              minLength={2}
              maxLength={80}
              disabled={state.kind === "loading"}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="instant-audit-url" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.urlLabel}</label>
            <input
              id="instant-audit-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={copy.urlPlaceholder}
              required
              maxLength={200}
              disabled={state.kind === "loading"}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 text-sm"
            />
          </div>
          {/* Honeypot, hidden from users, bots fill it */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
          />
          <button
            type="submit"
            disabled={state.kind === "loading" || !businessName.trim() || !url.trim()}
            className="px-5 py-2.5 rounded-lg bg-cyan-400 text-zinc-900 font-semibold text-sm hover:bg-cyan-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
          >
            {state.kind === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                {copy.submitting}
              </>
            ) : (
              copy.submit
            )}
          </button>
        </form>
      )}

      <div id="instant-audit-status" aria-live="polite" className="sr-only">
        {state.kind === "loading" ? copy.submitting : state.kind === "success" ? copy.yourScore : ""}
      </div>

      {state.kind === "error" && (
        <div role="alert" aria-live="assertive" className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-sm text-rose-200">
          {state.message}
        </div>
      )}

      {state.kind === "success" && (
        <div className="mt-4 grid sm:grid-cols-3 gap-4 sm:gap-6 items-start">
          <div className="rounded-xl border border-cyan-400/30 bg-white/[0.02] p-4 sm:col-span-1">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-2">{copy.yourScore}</div>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl sm:text-5xl font-bold ${scoreBand(state.score).tone}`}>{state.score}</span>
              <span className="text-sm text-zinc-500">/ 100</span>
            </div>
            <div className={`mt-1 text-xs font-mono uppercase tracking-wider ${scoreBand(state.score).tone}`}>
              {scoreBand(state.score).label}
            </div>
            {state.cached && <div className="mt-2 text-[10px] text-zinc-500 italic">{copy.cached}</div>}
          </div>
          <div className="sm:col-span-2">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-2">{copy.missingTitle}</div>
            <ul className="space-y-2 text-sm text-zinc-200">
              {state.missing.filter(Boolean).map((m, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-cyan-400 flex-shrink-0">{i + 1}.</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
            <Link
              to={`${langPrefix}/book-call`}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-zinc-900 font-semibold text-sm hover:bg-amber-300 transition"
            >
              {copy.bookFollowup} <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
