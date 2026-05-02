import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ShieldCheck,
  Scale,
  FileCheck2,
  Languages,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { MoodBackground } from "@/components/backgrounds/MoodBackground";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { getMood } from "@/design-system/moods";

/**
 * /conformite-quebec
 *
 * Loi 25 + Loi 96 + Charte de la langue francaise positioning page.
 *
 * Why: AiLys is a Quebec-based agency serving Quebec PMEs. Compliance
 * with provincial law is a moat: US competitors (Wix, BrightLocal,
 * Yext) do NOT optimize for Loi 25 (privacy) or Loi 96 (French-first).
 * This page is both a positioning statement and an SEO target for
 * "agence marketing conforme Loi 25", "agence GBP francais Quebec",
 * "Loi 96 site web", and similar high-intent compliance queries.
 *
 * Pattern: lead magnet style. Positioning + plain-language explanation
 * of how AiLys delivers each requirement, with cross-link to /audit.
 *
 * Bilingual EN canonical + FR-CA full via inline T() helper. Per user
 * constraint, no other locales this week (translation quota).
 *
 * Mood: tech-corporate (structured + B2B-confident, suitable for
 * legal/compliance positioning).
 */

export default function ConformiteQuebec() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);
  const mood = getMood("tech-corporate");

  return (
    <>
      <Helmet>
        <title>
          {T(
            "Quebec compliance: Loi 25, Loi 96, French-first | AiLys Agency",
            "Conformite Quebec: Loi 25, Loi 96, francais d'abord | AiLys Agency",
          )}
        </title>
        <meta
          name="description"
          content={T(
            "How AiLys Agency delivers Quebec-compliant marketing for local PMEs. Loi 25 (privacy), Loi 96 (French-first), Charte de la langue francaise. Plain-language explanation, free audit.",
            "Comment AiLys Agency livre du marketing conforme Quebec pour les PME locales. Loi 25 (vie privee), Loi 96 (francais d'abord), Charte de la langue francaise. Explication en clair, audit gratuit.",
          )}
        />
        <link rel="canonical" href="https://www.ailysagency.ca/conformite-quebec" />
      </Helmet>

      <MoodBackground mood={mood} />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <Link
              to={isFr ? "/fr" : "/"}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {T("Home", "Accueil")}
            </Link>

            <header className="mb-16">
              <div className="ailys-section-no mb-6">
                <span>{T("Quebec compliance", "Conformite Quebec")}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
                {T("Built for Quebec law,", "Concu pour la loi quebecoise,")}
                <br />
                <span className={`italic bg-gradient-to-r ${mood.accentGradient} bg-clip-text text-transparent`}>
                  {T("not retrofit from California.", "pas adapte de la Californie.")}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {T(
                  "Most marketing platforms (Wix, Squarespace, Yext, BrightLocal) ship a generic global product. They check basic GDPR boxes and call it done. Quebec PMEs deserve more. AiLys is built in Quebec, by a Quebec operator, for Quebec realities: Loi 25, Loi 96, the Charte de la langue francaise, and the daily reality of a bilingual market where French and English co-exist on every street, every menu, every conversation.",
                  "La plupart des plateformes marketing (Wix, Squarespace, Yext, BrightLocal) livrent un produit generique mondial. Elles cochent les cases de base du RGPD et passent a autre chose. Les PME quebecoises meritent mieux. AiLys est concu au Quebec, par un operateur quebecois, pour les realites quebecoises: Loi 25, Loi 96, Charte de la langue francaise, et la realite quotidienne d'un marche bilingue ou francais et anglais cohabitent sur chaque rue, chaque menu, chaque conversation.",
                )}
              </p>
            </header>

            {/* Loi 25 */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <ShieldCheck className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-1">
                      {T("Pillar 1", "Pilier 1")}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl">
                      {T("Loi 25 (Privacy & data protection)", "Loi 25 (Vie privee et protection des donnees)")}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {T(
                    "In effect since September 2023. Quebec's strictest privacy regime, layered on top of federal PIPEDA. Applies to every business that holds personal data on Quebec residents, regardless of where the business is incorporated. Penalties up to $25M or 4% of global revenue.",
                    "En vigueur depuis septembre 2023. Le regime de vie privee le plus strict du Quebec, par-dessus la LPRPDE federale. S'applique a toute entreprise qui detient des donnees personnelles sur des residents quebecois, peu importe ou l'entreprise est incorporee. Penalites jusqu'a 25 M$ ou 4 % du chiffre d'affaires mondial.",
                  )}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { en: "Explicit, granular consent for each use of personal data.", fr: "Consentement explicite et granulaire pour chaque utilisation des donnees personnelles." },
                    { en: "Mandatory privacy officer + breach notification within 7 days.", fr: "Responsable de la protection des renseignements personnels obligatoire + notification de breche dans les 7 jours." },
                    { en: "Right to data portability + right to be forgotten.", fr: "Droit a la portabilite des donnees + droit a l'oubli." },
                    { en: "Data residency disclosure + cross-border transfer impact assessment.", fr: "Divulgation de la residence des donnees + evaluation d'impact pour les transferts transfrontaliers." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 leading-snug">{T(item.en, item.fr)}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-background/30 border border-border/30 p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                    {T("How AiLys delivers", "Comment AiLys livre")}
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    <li>{T("Loi 25-grade consent banner with granular toggles (analytics, marketing, advertising) deployed on every client site by default.", "Banniere de consentement de niveau Loi 25 avec interrupteurs granulaires (analytique, marketing, publicite) deployee sur chaque site client par defaut.")}</li>
                    <li>{T("Audit log of every consent change with tenant_id + actor + timestamp + payload hash (no PII in clear).", "Journal d'audit de chaque changement de consentement avec tenant_id + acteur + horodatage + hachage de la charge (pas de RPP en clair).")}</li>
                    <li>{T("Data residency: client data stored in Canadian Supabase regions. Cross-border AI calls (when used) disclosed in Privacy Policy template.", "Residence des donnees: donnees clients stockees dans les regions Supabase canadiennes. Appels IA transfrontaliers (lorsqu'utilises) divulgues dans le modele de Politique de confidentialite.")}</li>
                    <li>{T("Privacy policy template auto-generated per client with breach notification flow + responsible-officer placeholder for client to fill.", "Modele de politique de confidentialite auto-genere par client avec flux de notification de breche + champ responsable a remplir par le client.")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Loi 96 */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <Languages className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-1">
                      {T("Pillar 2", "Pilier 2")}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl">
                      {T("Loi 96 (French-first across business)", "Loi 96 (Francais d'abord en affaires)")}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {T(
                    "In effect since June 2022, with phased provisions through 2025. Strengthens the Charte de la langue francaise. Requires French to be markedly predominant in commercial signage, marketing, contracts, and customer communications. Applies to every business operating in Quebec, regardless of size or sector.",
                    "En vigueur depuis juin 2022, avec dispositions echelonnees jusqu'en 2025. Renforce la Charte de la langue francaise. Exige que le francais soit nettement predominant dans l'affichage commercial, le marketing, les contrats et les communications clients. S'applique a toute entreprise operant au Quebec, peu importe la taille ou le secteur.",
                  )}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { en: "Marketing collateral predominantly in French (>2x larger or more prominent).", fr: "Materiel marketing majoritairement en francais (>2x plus grand ou plus visible)." },
                    { en: "Customer service offered in French by default.", fr: "Service a la clientele offert en francais par defaut." },
                    { en: "Trademarks in non-French require accompanying French descriptor.", fr: "Marques de commerce non francaises exigent un descripteur francais accompagnateur." },
                    { en: "Online business communications (email, chat, forms) French-available.", fr: "Communications d'affaires en ligne (courriel, clavardage, formulaires) disponibles en francais." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 leading-snug">{T(item.en, item.fr)}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-background/30 border border-border/30 p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                    {T("How AiLys delivers", "Comment AiLys livre")}
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    <li>{T("Bilingual content (FR-CA primary, EN secondary) on every client site by default. FR-CA gets the canonical URL, EN gets /en prefix.", "Contenu bilingue (FR-CA principal, EN secondaire) sur chaque site client par defaut. FR-CA obtient l'URL canonique, EN obtient le prefixe /en.")}</li>
                    <li>{T("Google Business Profile name, description, attributes, posts, and Q&A maintained in French first. English GBP secondary listing where the business has a clear English audience.", "Nom, description, attributs, publications et Q&R Google Business Profile maintenus en francais d'abord. Fiche GBP anglaise secondaire ou l'entreprise a un public anglophone clair.")}</li>
                    <li>{T("Reviews collected and replied in the language each customer wrote in. AI-generated replies preserve the original review's language (per CLAUDE.md hard rule on language-match).", "Avis collectes et reponses dans la langue ecrite par chaque client. Reponses generees par IA preservent la langue d'origine de l'avis (selon la regle stricte CLAUDE.md sur la correspondance linguistique).")}</li>
                    <li>{T("Schema.org markup includes inLanguage tags for both FR-CA and EN versions. AI engines correctly identify the French content as primary.", "Marquage Schema.org inclut les balises inLanguage pour les versions FR-CA et EN. Les moteurs IA identifient correctement le contenu francais comme principal.")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Charte */}
            <section className="mb-16">
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <FileCheck2 className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-1">
                      {T("Pillar 3", "Pilier 3")}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl">
                      {T("Charte de la langue francaise (operating context)", "Charte de la langue francaise (contexte d'operation)")}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {T(
                    "The Charte (originally 1977, repeatedly modernized) is the foundational French-language statute of Quebec. The Office quebecois de la langue francaise (OQLF) enforces it. AiLys is OQLF-aware in three ways: business names registered with REQ, OQLF inspector toolkit references in our documentation, and explicit handling of trademark + descriptor combinations.",
                    "La Charte (originale de 1977, modernisee a plusieurs reprises) est la loi linguistique francaise fondamentale du Quebec. L'Office quebecois de la langue francaise (OQLF) l'applique. AiLys est conscient de l'OQLF de trois facons: noms d'entreprise enregistres aupres du REQ, references a l'outillage des inspecteurs OQLF dans notre documentation, et traitement explicite des combinaisons marque + descripteur.",
                  )}
                </p>

                <div className="rounded-2xl bg-background/30 border border-border/30 p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                    {T("How AiLys delivers", "Comment AiLys livre")}
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    <li>{T("Onboarding checklist verifies business name registration with the REQ (Registre des entreprises du Quebec) and ensures the GBP name matches.", "Liste d'onboarding verifie l'enregistrement du nom d'entreprise au REQ (Registre des entreprises du Quebec) et s'assure que le nom GBP correspond.")}</li>
                    <li>{T("Trademark + descriptor combinations: when a client uses a non-French trademark (e.g. \"Sushi Express\"), AiLys auto-generates a compliant French descriptor (\"Comptoir de sushis Sushi Express\") for marketing materials.", "Combinaisons marque + descripteur: quand un client utilise une marque non francaise (p. ex. \"Sushi Express\"), AiLys auto-genere un descripteur francais conforme (\"Comptoir de sushis Sushi Express\") pour les materiels marketing.")}</li>
                    <li>{T("Help-center articles available bilingually for client team training. OQLF terminology preferred over anglicisms in internal documentation.", "Articles du centre d'aide disponibles bilingues pour la formation des equipes clients. Terminologie OQLF preferee aux anglicismes dans la documentation interne.")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Why this matters */}
            <section className="mb-16">
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-md p-6 sm:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mood.accentGradient} flex items-center justify-center shadow-lg`}>
                    <Scale className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-1">
                      {T("Why this matters", "Pourquoi c'est important")}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl">
                      {T("US tools cost less. They also cost more.", "Les outils US coutent moins cher. Et plus cher.")}
                    </h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {T(
                    "A Wix subscription is $20/month. A BrightLocal license is $39/month. Cheap, clearly. But they ship US-default settings: English-first content, US privacy norms, no Loi 25 consent flows, no OQLF business-name verification, no FR-CA review-language matching. The first time a Loi 25 inspector calls or an OQLF complaint reaches your inbox, the savings disappear in a single legal-review meeting.",
                    "Un abonnement Wix coute 20 $/mois. Une licence BrightLocal coute 39 $/mois. Pas cher, clairement. Mais ils livrent des reglages US par defaut: contenu anglais d'abord, normes de vie privee US, pas de flux de consentement Loi 25, pas de verification du nom REQ par l'OQLF, pas de correspondance linguistique FR-CA pour les avis. La premiere fois qu'un inspecteur Loi 25 appelle ou qu'une plainte OQLF arrive dans votre boite courriel, les economies disparaissent en une seule reunion de revision juridique.",
                  )}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {T(
                    "AiLys costs more upfront. AiLys also stays out of the OQLF complaint queue and the CAI (Commission d'acces a l'information) inbox. That's not a feature. That's the actual product.",
                    "AiLys coute plus cher au depart. AiLys evite aussi la file de plaintes OQLF et la boite de la CAI (Commission d'acces a l'information). Ce n'est pas une fonctionnalite. C'est le vrai produit.",
                  )}
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-10 text-center">
              <Building2 className={`w-12 h-12 mx-auto mb-4 text-primary`} />
              <h2 className="font-display text-2xl sm:text-3xl mb-3">
                {T(
                  "Ready to be Quebec-compliant by default?",
                  "Pret a etre conforme Quebec par defaut?",
                )}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                {T(
                  "Free GBP audit + Loi 25 readiness review. No commitment. We tell you what's compliant today, what isn't, and what we'd fix in the first 30 days. 30 minutes.",
                  "Audit GBP gratuit + revue de preparation Loi 25. Aucun engagement. Nous vous disons ce qui est conforme aujourd'hui, ce qui ne l'est pas, et ce que nous corrigerions dans les 30 premiers jours. 30 minutes.",
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className={`bg-gradient-to-r ${mood.accentGradient} text-background hover:opacity-90`}
                >
                  <Link to={isFr ? "/fr/book-call" : "/book-call"}>
                    {T("Book a strategy call", "Reserver un appel strategique")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={isFr ? "/fr/audit" : "/audit"}>
                    {T("Run free GBP audit", "Faire l'audit GBP gratuit")}
                  </Link>
                </Button>
              </div>
            </section>

            <p className="text-xs text-muted-foreground/70 text-center mt-8 max-w-3xl mx-auto">
              {T(
                "This page is informational and does not constitute legal advice. AiLys Agency is not a law firm. For legal opinions on Loi 25, Loi 96, or the Charte de la langue francaise, consult a Quebec-licensed lawyer.",
                "Cette page est informationnelle et ne constitue pas un avis juridique. AiLys Agency n'est pas un cabinet d'avocats. Pour des avis juridiques sur la Loi 25, la Loi 96 ou la Charte de la langue francaise, consultez un avocat membre du Barreau du Quebec.",
              )}
            </p>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
