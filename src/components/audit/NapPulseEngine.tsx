import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  MapPin,
  Phone,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLang } from "@/i18n/LangContext";

// NapPulseEngine
// Self-assessment NAP (Name / Address / Phone) consistency checker.
// Pattern parallels GbpPulseEngine but client-side only, no edge fn.
// 25 directories audited (Quebec-tuned), weighted score, action plan.
// Lead-magnet: results page links to AuditAIVisibility + book-call.

type Status = "consistent" | "inconsistent" | "missing" | "unsure" | null;

interface DirectoryDef {
  id: string;
  name: string;
  weight: number;
  url: string;
  region: "global" | "ca" | "qc";
}

const DIRECTORIES: DirectoryDef[] = [
  { id: "google", name: "Google Business Profile", weight: 20, url: "https://business.google.com", region: "global" },
  { id: "apple", name: "Apple Maps / Apple Business Connect", weight: 12, url: "https://businessconnect.apple.com", region: "global" },
  { id: "bing", name: "Bing Places", weight: 8, url: "https://www.bingplaces.com", region: "global" },
  { id: "facebook", name: "Facebook Page", weight: 10, url: "https://www.facebook.com/business", region: "global" },
  { id: "instagram", name: "Instagram Business", weight: 6, url: "https://business.instagram.com", region: "global" },
  { id: "yelp", name: "Yelp", weight: 8, url: "https://biz.yelp.com", region: "global" },
  { id: "tripadvisor", name: "TripAdvisor", weight: 5, url: "https://www.tripadvisor.com/Owners", region: "global" },
  { id: "bbb", name: "BBB (Better Business Bureau)", weight: 6, url: "https://www.bbb.org", region: "global" },
  { id: "yellowpages-ca", name: "PagesJaunes.ca / YellowPages.ca", weight: 8, url: "https://www.pagesjaunes.ca", region: "ca" },
  { id: "canada411", name: "Canada411", weight: 5, url: "https://www.canada411.ca", region: "ca" },
  { id: "411-ca", name: "411.ca", weight: 3, url: "https://411.ca", region: "ca" },
  { id: "yp-com", name: "YP.com (US listings if cross-border)", weight: 3, url: "https://www.yellowpages.com", region: "global" },
  { id: "foursquare", name: "Foursquare / Factual data", weight: 5, url: "https://foursquare.com/business", region: "global" },
  { id: "linkedin", name: "LinkedIn Company Page", weight: 4, url: "https://www.linkedin.com/company", region: "global" },
  { id: "waze", name: "Waze (community map)", weight: 3, url: "https://www.waze.com/business", region: "global" },
  { id: "openstreetmap", name: "OpenStreetMap", weight: 2, url: "https://www.openstreetmap.org", region: "global" },
  { id: "wikidata", name: "Wikidata Q-number", weight: 4, url: "https://www.wikidata.org", region: "global" },
  { id: "ccmm", name: "Chambre de commerce du Montréal métro", weight: 4, url: "https://www.ccmm.ca", region: "qc" },
  { id: "fcei", name: "FCEI / CFIB Canada", weight: 3, url: "https://www.cfib-fcei.ca", region: "ca" },
  { id: "cpa-quebec", name: "Tourisme Québec / sectorial registry", weight: 2, url: "https://www.bonjourquebec.com", region: "qc" },
  { id: "industry-directory", name: "Your industry directory (RAMQ, OACIQ, BSDQ, etc.)", weight: 6, url: "https://www.gouv.qc.ca", region: "qc" },
  { id: "google-search-snippet", name: "Google search snippet (knowledge panel)", weight: 5, url: "https://www.google.com", region: "global" },
  { id: "schema-localbusiness", name: "Your website's LocalBusiness schema (JSON-LD)", weight: 7, url: "https://schema.org/LocalBusiness", region: "global" },
  { id: "footer-website", name: "Your website's footer NAP block", weight: 5, url: "#", region: "global" },
  { id: "contact-page", name: "Your website's /contact page", weight: 4, url: "#", region: "global" },
];

interface Basics {
  businessName: string;
  street: string;
  city: string;
  postal: string;
  phone: string;
}

const initialAnswers = (): Record<string, Status> =>
  Object.fromEntries(DIRECTORIES.map((d) => [d.id, null])) as Record<string, Status>;

export function NapPulseEngine() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const [step, setStep] = useState<"basics" | "questions" | "loading" | "result">("basics");
  const [basics, setBasics] = useState<Basics>({
    businessName: "",
    street: "",
    city: "",
    postal: "",
    phone: "",
  });
  const [answers, setAnswers] = useState<Record<string, Status>>(initialAnswers());
  const [loadProgress, setLoadProgress] = useState(0);

  // Persist results to localStorage so users can revisit
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("nap-pulse-state") : null;
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed?.basics && parsed?.answers && parsed?.step === "result") {
        setBasics(parsed.basics);
        setAnswers(parsed.answers);
        setStep("result");
      }
    } catch {
      // Ignore corrupt storage
    }
  }, []);

  // Animated loading state for the "analysis"
  useEffect(() => {
    if (step !== "loading") return;
    setLoadProgress(0);
    const interval = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("result");
          // Save state
          try {
            window.localStorage.setItem(
              "nap-pulse-state",
              JSON.stringify({ basics, answers, step: "result" }),
            );
          } catch {
            // ignore
          }
          return 100;
        }
        return p + 4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [step, basics, answers]);

  // ─── Score logic ──────────────────────────────────────────────────────
  // consistent = 1.0 of weight
  // inconsistent = 0.0 (worst, actively hurts)
  // missing = 0.4 (no listing = neutral-bad, can be created)
  // unsure = 0.5 (treat as half-credit, prompt to verify)

  const score = useMemo(() => {
    let earned = 0;
    let totalWeight = 0;
    let inconsistentCount = 0;
    let missingCount = 0;
    for (const dir of DIRECTORIES) {
      const status = answers[dir.id];
      if (status === null) continue;
      totalWeight += dir.weight;
      if (status === "consistent") earned += dir.weight;
      else if (status === "missing") {
        earned += dir.weight * 0.4;
        missingCount++;
      } else if (status === "unsure") earned += dir.weight * 0.5;
      else if (status === "inconsistent") inconsistentCount++;
    }
    const pct = totalWeight === 0 ? 0 : Math.round((earned / totalWeight) * 100);
    return { pct, inconsistentCount, missingCount, totalWeight };
  }, [answers]);

  const tier = score.pct >= 85 ? "strong" : score.pct >= 65 ? "solid" : score.pct >= 40 ? "gaps" : "critical";

  const tierColor = {
    strong: "from-emerald-500 to-teal-400",
    solid: "from-cyan-400 to-blue-500",
    gaps: "from-amber-400 to-orange-500",
    critical: "from-rose-500 to-red-600",
  }[tier];

  const tierHeadline = {
    strong: T("Your NAP is rock solid. Trust signals firing on all engines.", "Votre NAP est solide comme du roc. Tous les signaux de confiance sont actifs."),
    solid: T("Strong foundation with a few gaps. Three fixes will lock it down.", "Base solide avec quelques lacunes. Trois corrections le verrouilleront."),
    gaps: T("Real inconsistencies. Each one quietly bleeds local-pack rank.", "Vraies incohérences. Chacune coûte silencieusement du classement local."),
    critical: T("Your NAP is fragmented. Google, Apple, and the AI engines see different businesses.", "Votre NAP est fragmenté. Google, Apple et les moteurs IA voient des entreprises différentes."),
  }[tier];

  const allAnswered = useMemo(() => DIRECTORIES.every((d) => answers[d.id] !== null), [answers]);
  const basicsValid = basics.businessName.trim().length >= 2 && basics.city.trim().length >= 2;

  const reset = () => {
    setBasics({ businessName: "", street: "", city: "", postal: "", phone: "" });
    setAnswers(initialAnswers());
    setStep("basics");
    try {
      window.localStorage.removeItem("nap-pulse-state");
    } catch {
      // ignore
    }
  };

  // Group directories by region for nicer UX
  const grouped = useMemo(() => {
    return {
      global: DIRECTORIES.filter((d) => d.region === "global"),
      ca: DIRECTORIES.filter((d) => d.region === "ca"),
      qc: DIRECTORIES.filter((d) => d.region === "qc"),
    };
  }, []);

  // ─── Step: Basics ─────────────────────────────────────────────────────
  if (step === "basics") {
    return (
      <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-4">
          {T("Step 1 of 3 · 2 minutes total", "Étape 1 de 3 · 2 minutes au total")}
        </div>
        <h2 className="font-display text-2xl sm:text-3xl mb-2">
          {T("Your business basics.", "Les informations de base.")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {T(
            "We use these to show your NAP block alongside the score. Nothing leaves your browser.",
            "Nous les utilisons pour afficher votre bloc NAP à côté du score. Rien ne quitte votre navigateur.",
          )}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              <Building2 className="inline w-3.5 h-3.5 mr-1.5" />
              {T("Business name", "Nom d'entreprise")}
            </label>
            <Input
              value={basics.businessName}
              onChange={(e) => setBasics({ ...basics, businessName: e.target.value })}
              placeholder={T("e.g. Clinique Dentaire Lavoie", "ex. Clinique Dentaire Lavoie")}
              autoComplete="organization"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              <MapPin className="inline w-3.5 h-3.5 mr-1.5" />
              {T("Street address", "Adresse civique")}
            </label>
            <Input
              value={basics.street}
              onChange={(e) => setBasics({ ...basics, street: e.target.value })}
              placeholder={T("123 Sherbrooke St W", "123, rue Sherbrooke O")}
              autoComplete="street-address"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {T("City", "Ville")}
            </label>
            <Input
              value={basics.city}
              onChange={(e) => setBasics({ ...basics, city: e.target.value })}
              placeholder={T("Montreal", "Montréal")}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {T("Postal code", "Code postal")}
            </label>
            <Input
              value={basics.postal}
              onChange={(e) => setBasics({ ...basics, postal: e.target.value.toUpperCase() })}
              placeholder="H3A 1B2"
              autoComplete="postal-code"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              <Phone className="inline w-3.5 h-3.5 mr-1.5" />
              {T("Phone number", "Numéro de téléphone")}
            </label>
            <Input
              value={basics.phone}
              onChange={(e) => setBasics({ ...basics, phone: e.target.value })}
              placeholder="(514) 555-0123"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
        </div>

        <Button
          onClick={() => setStep("questions")}
          disabled={!basicsValid}
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
        >
          {T("Start NAP audit", "Démarrer l'audit NAP")}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        {!basicsValid && (
          <p className="text-xs text-muted-foreground mt-3">
            {T("Business name and city are required.", "Le nom et la ville sont obligatoires.")}
          </p>
        )}
      </div>
    );
  }

  // ─── Step: Questions ──────────────────────────────────────────────────
  if (step === "questions") {
    const sectionLabel = (region: "global" | "ca" | "qc") =>
      ({
        global: T("Global directories", "Répertoires mondiaux"),
        ca: T("Canada-specific directories", "Répertoires spécifiques au Canada"),
        qc: T("Quebec-specific directories", "Répertoires spécifiques au Québec"),
      })[region];

    const optLabel = (s: Exclude<Status, null>) =>
      ({
        consistent: T("Consistent", "Cohérent"),
        inconsistent: T("Inconsistent", "Incohérent"),
        missing: T("Not listed", "Absent"),
        unsure: T("Unsure", "Pas sûr"),
      })[s];

    const optColor = (s: Exclude<Status, null>) =>
      ({
        consistent: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
        inconsistent: "border-rose-500/40 bg-rose-500/15 text-rose-200",
        missing: "border-amber-500/40 bg-amber-500/15 text-amber-200",
        unsure: "border-zinc-500/40 bg-zinc-500/15 text-zinc-200",
      })[s];

    return (
      <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-4">
          {T("Step 2 of 3 · 25 directories", "Étape 2 de 3 · 25 répertoires")}
        </div>
        <h2 className="font-display text-2xl sm:text-3xl mb-2">
          {T("For each, mark its current state.", "Pour chacun, indiquez son état actuel.")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {T(
            "If unsure, pick \"Unsure\" and we'll list it in the action plan to verify later. \"Inconsistent\" means the NAP doesn't exactly match (apartment number, suite vs ste, abbreviated street type, etc.).",
            "Si vous n'êtes pas sûr, choisissez « Pas sûr » et nous l'inclurons dans le plan d'action pour vérification. « Incohérent » signifie que le NAP ne correspond pas exactement (numéro d'app., suite vs bureau, type de rue abrégé, etc.).",
          )}
        </p>

        <div className="space-y-8">
          {(["global", "ca", "qc"] as const).map((region) => (
            <div key={region}>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-3">
                {sectionLabel(region)}
              </div>
              <div className="space-y-2">
                {grouped[region].map((dir) => (
                  <div
                    key={dir.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/40"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{dir.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {T("Weight", "Poids")}: {dir.weight}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(["consistent", "inconsistent", "missing", "unsure"] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [dir.id]: opt })}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            answers[dir.id] === opt
                              ? optColor(opt)
                              : "border-border/40 bg-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {optLabel(opt)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setStep("basics")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {T("Back", "Retour")}
          </Button>
          <Button
            onClick={() => setStep("loading")}
            disabled={!allAnswered}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 gap-2"
          >
            {T("Calculate NAP score", "Calculer le score NAP")}
            <ArrowRight className="w-4 h-4" />
          </Button>
          {!allAnswered && (
            <p className="w-full text-xs text-muted-foreground">
              {T("Answer all 25 to unlock your score.", "Répondez aux 25 pour débloquer votre score.")}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ─── Step: Loading ────────────────────────────────────────────────────
  if (step === "loading") {
    return (
      <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-10 text-center">
        <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin text-primary" />
        <h2 className="font-display text-2xl mb-2">
          {T("Cross-checking 25 directories...", "Vérification croisée de 25 répertoires...")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {T(
            "Weighting each by its impact on AI engine citations and Google local pack ranking.",
            "Pondération de chacun selon son impact sur les citations des moteurs IA et le classement Google local.",
          )}
        </p>
        <div className="w-full max-w-md mx-auto h-2 bg-background/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      </div>
    );
  }

  // ─── Step: Result ─────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-4">
          {T("NAP Pulse score", "Score NAP Pulse")} · {basics.businessName}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-6">
          <div>
            <div
              className={`text-7xl sm:text-8xl font-display font-bold bg-gradient-to-br ${tierColor} bg-clip-text text-transparent leading-none`}
            >
              {score.pct}
              <span className="text-3xl sm:text-4xl text-muted-foreground/60">/100</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl sm:text-2xl leading-tight mb-3">
              {tierHeadline}
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-rose-500/40 bg-rose-500/10 text-rose-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                {score.inconsistentCount} {T("inconsistent", "incohérent(s)")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-amber-500/40 bg-amber-500/10 text-amber-200">
                {score.missingCount} {T("not listed", "absent(s)")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {DIRECTORIES.length - score.inconsistentCount - score.missingCount}{" "}
                {T("consistent or unsure", "cohérent(s) ou pas sûr(s)")}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-background/40 border border-border/30 p-4 sm:p-5 text-sm text-muted-foreground space-y-1 font-mono">
          <div className="text-xs uppercase tracking-wider text-primary mb-2">
            {T("Your NAP block (use this verbatim)", "Votre bloc NAP (à utiliser tel quel)")}
          </div>
          <div className="text-foreground font-semibold">{basics.businessName}</div>
          {basics.street && <div>{basics.street}</div>}
          <div>
            {[basics.city, basics.postal].filter(Boolean).join(", ")}
          </div>
          {basics.phone && <div>{basics.phone}</div>}
        </div>
      </div>

      {/* Top 5 priorities */}
      <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
        <h3 className="font-display text-xl sm:text-2xl mb-4">
          {T("Top 5 priorities to fix this week", "Top 5 priorités à régler cette semaine")}
        </h3>
        <ol className="space-y-3">
          {DIRECTORIES.filter((d) => answers[d.id] === "inconsistent" || answers[d.id] === "missing")
            .sort((a, b) => {
              const sa = answers[a.id] === "inconsistent" ? 1 : 0;
              const sb = answers[b.id] === "inconsistent" ? 1 : 0;
              if (sa !== sb) return sb - sa;
              return b.weight - a.weight;
            })
            .slice(0, 5)
            .map((dir, i) => (
              <li key={dir.id} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{dir.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {answers[dir.id] === "inconsistent"
                      ? T(
                          "Update the listing so name/address/phone exactly matches the NAP block above.",
                          "Mettez à jour la fiche pour que nom/adresse/téléphone correspondent exactement au bloc NAP ci-dessus.",
                        )
                      : T(
                          "Create the listing using the NAP block above. Free in most cases.",
                          "Créez la fiche en utilisant le bloc NAP ci-dessus. Gratuit dans la plupart des cas.",
                        )}
                  </div>
                  <a
                    href={dir.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    {T("Open directory", "Ouvrir le répertoire")} ↗
                  </a>
                </div>
              </li>
            ))}
          {score.inconsistentCount === 0 && score.missingCount === 0 && (
            <li className="text-sm text-muted-foreground">
              <CheckCircle2 className="inline w-4 h-4 mr-2 text-emerald-400" />
              {T(
                "Nothing critical. Maintain monthly checks and you stay strong.",
                "Rien de critique. Maintenez des vérifications mensuelles pour rester solide.",
              )}
            </li>
          )}
        </ol>
      </div>

      {/* Cross-sell + Reset */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-10">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-3">
          {T("Want us to fix all of these for you?", "Vous voulez qu'on règle tout ça pour vous?")}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl mb-3">
          {T(
            "AiLys handles NAP consistency monthly across 25+ directories.",
            "AiLys assure la cohérence NAP mensuellement sur 25+ répertoires.",
          )}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          {T(
            "Included in every plan from Starter ($300/mo) and up. Audit, fix, and re-verify quarterly so AI engines and Google never see conflicting data.",
            "Inclus dans tous les forfaits dès Starter (300 $/mois). Audit, correction et re-vérification trimestrielle pour que les moteurs IA et Google ne voient jamais de données contradictoires.",
          )}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 gap-2"
          >
            <Link to={isFr ? "/fr/book-call" : "/book-call"}>
              <Sparkles className="w-4 h-4" />
              {T("Book a free strategy call", "Réserver un appel stratégique")}
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to={isFr ? "/fr/audit/gbp" : "/audit/gbp"}>
              <Check className="w-4 h-4" />
              {T("Also run GBP Pulse", "Faire aussi le GBP Pulse")}
            </Link>
          </Button>
          <Button onClick={reset} variant="ghost" className="gap-2">
            {T("Run again", "Recommencer")}
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {T(
          "Your answers are saved locally so you can revisit. We do not store NAP data on our servers.",
          "Vos réponses sont sauvegardées localement pour pouvoir y revenir. Nous ne stockons pas vos données NAP sur nos serveurs.",
        )}
      </p>
    </div>
  );
}
