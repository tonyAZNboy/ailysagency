import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Megaphone, Lock, Calendar } from "lucide-react";
import { ScrollReveal, MagneticWrapper } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";

/**
 * Founding Clients Program
 *
 * Ethical alternative to fabricated case studies. Transparent offer to first 10
 * clients: 50% off forever + opt-in published case study with attribution.
 *
 * Builds:
 *  - Real social proof over time (each signed founding client becomes a case study)
 *  - Trust signal of transparency (we tell prospects we're new, here's the deal)
 *  - Scarcity hook (10 spots, counter ticks down as they fill)
 *  - Marketing flywheel (case studies feed industry pages, comparison pages, blog)
 *
 * SLOTS_TAKEN reads from a hardcoded const for now. Long-term plan:
 *  - Migrate to Supabase `founding_clients` table with public_count view
 *  - Manual increment by admin when a founding client signs the contract
 *  - Auto-display "PROGRAM CLOSED" when slots_taken >= TOTAL_SLOTS
 *
 * Hardcoded values are clearly named so the future migration is mechanical.
 */

const TOTAL_SLOTS = 10;
const SLOTS_TAKEN = 0; // Update this when a founding client signs
const SLOTS_REMAINING = TOTAL_SLOTS - SLOTS_TAKEN;

export function FoundingClientsSection() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const isFr = lang === "fr";

  // Inline copy. Externalize to t.foundingClients.* in a future i18n pass.
  const T = (en: string, fr: string) => (isFr ? fr : en);

  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: T("50% off your plan forever", "50 % de rabais à vie sur votre forfait"),
      description: T(
        "Lock in half-price on whichever tier you choose, for as long as you stay subscribed. Renewal price never increases.",
        "Verrouillez la moitié du prix sur le forfait choisi, aussi longtemps que vous restez abonné. Le prix de renouvellement n'augmente jamais.",
      ),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: T("Direct strategist access", "Accès direct au stratège"),
      description: T(
        "Same strategist throughout your engagement. Slack channel for fast questions. Monthly 60-minute strategy review built into the plan.",
        "Même stratège tout au long de votre engagement. Canal Slack pour les questions rapides. Revue stratégique mensuelle de 60 minutes incluse.",
      ),
    },
    {
      icon: <Megaphone className="w-5 h-5" />,
      title: T("Published case study (opt-in)", "Étude de cas publiée (optionnel)"),
      description: T(
        "If your AI citations lift, we publish your story with attribution. You approve every word and every metric. You can opt out at any point and keep the discount.",
        "Si vos citations IA augmentent, on publie votre histoire avec attribution. Vous approuvez chaque mot et chaque chiffre. Vous pouvez vous retirer en tout temps et garder le rabais.",
      ),
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: T("Priority shipping queue", "File de livraison prioritaire"),
      description: T(
        "Audit delivered in 12 hours instead of 24. Schema deployment in week one instead of week two. Citation building starts day one.",
        "Audit livré en 12 heures au lieu de 24. Déploiement schema dès la semaine 1 au lieu de la semaine 2. Construction de citations dès le jour 1.",
      ),
    },
  ];

  return (
    <section
      id="founding-clients"
      className="relative py-24 sm:py-32 px-4"
      aria-labelledby="founding-clients-heading"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow + scarcity counter */}
        <ScrollReveal variant="fade-up" delay={50} duration={600}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="ailys-section-no">
              <span>{T("Founding clients", "Clients fondateurs")}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              {SLOTS_REMAINING} / {TOTAL_SLOTS} {T("spots left", "places restantes")}
            </span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal variant="fade-up" delay={150} duration={700}>
          <h2
            id="founding-clients-heading"
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6"
          >
            {T("We're new.", "On est nouveaux.")}
            <br />
            <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
              {T("That's the offer.", "C'est l'offre.")}
            </span>
          </h2>
        </ScrollReveal>

        {/* Honest pitch */}
        <ScrollReveal variant="fade-up" delay={300} duration={700}>
          <div className="max-w-3xl mb-12">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
              {T(
                "AiLys Agency was founded in 2026. We are bilingual EN and FR-CA, built on classical SEO discipline applied to the AI search era. We have run the methodology on our own site and on a small private cohort, but we have not yet earned the case study volume to compete with $5,000+/mo agencies on social proof alone.",
                "AiLys Agency a été fondée en 2026. On est bilingue EN et FR-CA, bâti sur la discipline du SEO classique appliquée à l'ère de la recherche IA. On a exécuté la méthodologie sur notre propre site et sur une petite cohorte privée, mais on n'a pas encore le volume d'études de cas pour compétitionner avec les agences à 5 000 $+/mois sur la preuve sociale seule.",
              )}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {T(
                "So we are doing the honest thing. The first 10 clients who sign get 50% off their plan forever, priority shipping, direct strategist access, and a published case study (opt-in) when results land. Real numbers, real attribution, real trust earned over 90 days.",
                "Alors on fait la chose honnête. Les 10 premiers clients qui signent obtiennent 50 % de rabais à vie, livraison prioritaire, accès direct au stratège, et une étude de cas publiée (optionnelle) quand les résultats arrivent. Des vrais chiffres, vraie attribution, vraie confiance bâtie en 90 jours.",
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits grid */}
        <ScrollReveal variant="fade-up" delay={400} duration={700}>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-secondary/[0.03] to-transparent backdrop-blur-md p-6 hover:border-primary/40 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 text-primary mb-4">
                  {b.icon}
                </div>
                <h3 className="font-display text-xl sm:text-2xl mb-2 leading-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Transparent terms */}
        <ScrollReveal variant="fade-up" delay={500} duration={700}>
          <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6 sm:p-8 mb-10">
            <div className="flex items-start gap-4">
              <Lock className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-display text-xl sm:text-2xl mb-3 leading-tight">
                  {T("The fine print, in plain language", "Les petits caractères, en langage clair")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li>
                    <strong className="text-foreground">{T("50% discount", "Rabais 50 %")}:</strong>{" "}
                    {T(
                      "applies to your plan tier (Starter, Core, Growth, or Agency) for the lifetime of your subscription. Locked in.",
                      "s'applique à votre forfait (Starter, Core, Growth ou Agency) pour la durée de votre abonnement. Verrouillé.",
                    )}
                  </li>
                  <li>
                    <strong className="text-foreground">{T("Case study", "Étude de cas")}:</strong>{" "}
                    {T(
                      "100% opt-in. We will only publish with your written consent and your right of approval over every metric, name, and quote. You can opt out at any time and keep the discount.",
                      "100 % optionnel. On publie seulement avec votre consentement écrit et votre droit d'approbation sur chaque chiffre, nom et citation. Vous pouvez vous retirer en tout temps et garder le rabais.",
                    )}
                  </li>
                  <li>
                    <strong className="text-foreground">{T("If results don't land", "Si les résultats n'arrivent pas")}:</strong>{" "}
                    {T(
                      "30-day satisfaction guarantee applies. Full refund if you decide AiLys isn't working for you. Honest is the only marketing we have.",
                      "La garantie satisfaction 30 jours s'applique. Remboursement complet si vous décidez qu'AiLys ne fonctionne pas pour vous. L'honnêteté est le seul marketing qu'on a.",
                    )}
                  </li>
                  <li>
                    <strong className="text-foreground">{T("Why 10 spots", "Pourquoi 10 places")}:</strong>{" "}
                    {T(
                      "We have one strategist (Anthony) running founding accounts directly. 10 is the maximum he can carry without service quality dropping. We will hire and reopen the program when ready.",
                      "On a un stratège (Anthony) qui gère les comptes fondateurs directement. 10 est le maximum qu'il peut porter sans que la qualité baisse. On va embaucher et rouvrir le programme quand prêt.",
                    )}
                  </li>
                  <li>
                    <strong className="text-foreground">{T("When the program closes", "Quand le programme ferme")}:</strong>{" "}
                    {T(
                      "Standard pricing applies to all new clients after the 10th founding client signs. Your founding-client discount stays locked.",
                      "Le tarif standard s'applique aux nouveaux clients après la signature du 10e client fondateur. Votre rabais de fondateur reste verrouillé.",
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal variant="fade-up" delay={600} duration={700}>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <MagneticWrapper strength={0.12}>
              <Button
                size="lg"
                onClick={() => {
                  const path =
                    lang === "fr" ? "/contacte" : lang === "vi" ? "/lien-he" : "/contact";
                  navigate(path);
                }}
                className="rounded-full font-semibold text-base px-7 py-6 group relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 32px hsl(var(--primary) / 0.45), 0 0 64px hsl(var(--secondary) / 0.25)",
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)) 50%, hsl(var(--accent)))",
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {T("Apply for founding spot", "Postuler pour une place fondateur")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticWrapper>
            <button
              type="button"
              onClick={() => navigate("/book-call")}
              className="px-5 py-3 rounded-full border border-border/50 hover:border-primary/50 text-sm font-medium transition-colors text-foreground/85 hover:text-primary"
            >
              {T("Book a 60-min strategy call →", "Réserver un appel stratégique de 60 min →")}
            </button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground/70 max-w-xl">
            {T(
              "Apply by running a free AI Visibility Audit. We review applicants weekly and respond within 48 hours. No credit card to apply.",
              "Postulez en lançant un audit gratuit de visibilité IA. On révise les candidats hebdomadairement et répond en 48 heures. Aucune carte de crédit pour postuler.",
            )}
          </p>
        </ScrollReveal>

        {/* sr-only SEO summary */}
        <div className="sr-only" aria-hidden="false">
          {T(
            `AiLys Agency Founding Clients Program: the first 10 clients who sign get 50 percent off their plan forever, priority shipping (audit in 12 hours, schema in week one), direct strategist access, and an opt-in published case study with right of approval over every metric, name, and quote. The discount is locked for the lifetime of the subscription. The 30-day satisfaction guarantee applies. Currently ${SLOTS_REMAINING} of ${TOTAL_SLOTS} spots remaining. Apply by running a free AI Visibility Audit. We respond to founding-client applications within 48 hours. No credit card to apply. Available for plans Starter ($300/mo), Core ($600/mo), Growth ($1,200/mo), and Agency ($2,500/mo).`,
            `Programme clients fondateurs AiLys Agency : les 10 premiers clients qui signent obtiennent 50 % de rabais à vie sur leur forfait, livraison prioritaire (audit en 12 heures, schema en semaine 1), accès direct au stratège, et une étude de cas publiée optionnelle avec droit d'approbation sur chaque chiffre, nom et citation. Le rabais est verrouillé pour la durée de l'abonnement. La garantie satisfaction 30 jours s'applique. Actuellement ${SLOTS_REMAINING} places sur ${TOTAL_SLOTS} restantes. Postulez en lançant un audit gratuit de visibilité IA. On répond aux candidatures fondateurs en 48 heures. Aucune carte de crédit pour postuler. Disponible pour les forfaits Starter (300 $/mois), Core (600 $/mois), Growth (1 200 $/mois) et Agency (1 299 $/mois).`,
          )}
        </div>
      </div>
    </section>
  );
}
