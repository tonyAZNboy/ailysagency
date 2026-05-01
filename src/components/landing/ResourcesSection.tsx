import { Link } from "react-router-dom";
import { ArrowRight, FileText, Sparkles, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { ScrollReveal } from "@/components/animation";

export function ResourcesSection() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);
  const langPrefix = lang === "en" ? "" : `/${lang}`;

  const resources = [
    {
      icon: FileText,
      iconColor: "text-violet-300",
      iconBg: "bg-violet-500/10",
      iconBorder: "border-violet-500/30",
      label: T("Quarterly reports", "Rapports trimestriels"),
      title: T("Industry Reports", "Rapports d'industrie"),
      description: T(
        "Free anonymized aggregate data on AI Visibility across Quebec verticals (dentists, restaurants, lawyers, contractors, clinics). New report every quarter.",
        "Donnees agregees anonymisees gratuites sur la visibilite IA des verticales quebecoises (dentistes, restaurants, avocats, entrepreneurs, cliniques). Nouveau rapport chaque trimestre.",
      ),
      cta: T("See all reports", "Voir tous les rapports"),
      href: `${langPrefix}/industry-reports`,
    },
    {
      icon: ShieldCheck,
      iconColor: "text-emerald-300",
      iconBg: "bg-emerald-500/10",
      iconBorder: "border-emerald-500/30",
      label: T("For active clients", "Pour clients actifs"),
      title: T("AiLys Verified Badge", "Insigne AiLys Verifie"),
      description: T(
        "Display your AI Visibility score on your website footer. Auto-updates weekly. Links to your public report. Builds trust + earns backlinks.",
        "Affichez votre score de visibilite IA dans le pied de page de votre site. Mise a jour auto hebdomadaire. Lien vers votre rapport public. Renforce la confiance et genere des liens retour.",
      ),
      cta: T("Get the embed code", "Obtenir le code d'integration"),
      href: `${langPrefix}/badge`,
    },
    {
      icon: Sparkles,
      iconColor: "text-fuchsia-300",
      iconBg: "bg-fuchsia-500/10",
      iconBorder: "border-fuchsia-500/30",
      label: T("Included Growth+", "Inclus Growth+"),
      title: T("AiLys Concierge", "Concierge AiLys"),
      description: T(
        "Conversational AI assistant for your AiLys data. Ask anything about your visibility, draft GBP posts, compare competitors. Try the public demo.",
        "Assistant IA conversationnel pour vos donnees AiLys. Posez n'importe quelle question sur votre visibilite, redigez des publications GBP, comparez vos concurrents. Essayez la demo publique.",
      ),
      cta: T("Try the demo", "Essayer la demo"),
      href: `${langPrefix}/concierge-demo`,
    },
  ];

  return (
    <section
      id="resources"
      className="relative py-20 sm:py-28 px-4"
      aria-labelledby="resources-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <header className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 tracking-wider uppercase">
              {T("Free resources", "Ressources gratuites")}
            </div>
            <h2
              id="resources-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight tracking-tight"
            >
              {T(
                "Three new ways to use AiLys without signing up",
                "Trois nouvelles facons d'utiliser AiLys sans vous inscrire",
              )}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {T(
                "Real data, real tools, free to use. Open access for prospects, embeddable for clients.",
                "Vraies donnees, vrais outils, gratuits. Acces ouvert pour les prospects, integrables pour les clients.",
              )}
            </p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r, idx) => {
            const Icon = r.icon;
            return (
              <ScrollReveal key={r.title} delay={idx * 100}>
                <Link
                  to={r.href}
                  className="group relative flex flex-col h-full p-6 sm:p-7 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm hover:border-primary/40 hover:bg-card/60 transition-all"
                >
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${r.iconBg} border ${r.iconBorder} mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${r.iconColor}`} />
                  </div>
                  <p className={`text-xs font-medium uppercase tracking-wider ${r.iconColor} mb-2`}>
                    {r.label}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3 leading-tight">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {r.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    {r.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
