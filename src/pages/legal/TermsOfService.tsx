import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/seo";
import { APP_CONFIG } from "@/config/app";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLang } from "@/i18n/LangContext";
import { TermsContentFr } from "./content/TermsContentFr";

/**
 * Terms of Service for AiLys Agency.
 *
 * AiLys Agency is a consulting agency, not a SaaS platform. The terms
 * cover: a consulting engagement (the agency does work on the client's
 * behalf), the optional AiLys Automation reputation add-on, and the
 * public website itself. Legal entity is Reviuzy Inc operating as
 * AiLys Agency.
 *
 * Jurisdiction: Quebec, Canada. Loi 25 + PIPEDA + (where applicable)
 * GDPR + CCPA. Disputes settled by Quebec courts.
 */

export default function TermsOfService() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      const stored = localStorage.getItem("theme");
      if (stored === "light") {
        document.documentElement.classList.remove("dark");
      } else if (stored === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead
        title={isFr ? "Conditions de service" : "Terms of Service"}
        description={
          isFr
            ? "Conditions générales du service de consultation et du site web d'AiLys Agency."
            : "Terms and conditions for the AiLys Agency consulting service and website."
        }
        canonicalUrl={`${APP_CONFIG.url}/terms`}
        noindex={false}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 pt-28">
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFr ? "Retour à l'accueil" : "Back to Home"}
            </Link>
            <h1 className="text-4xl font-bold mb-4">
              {isFr ? "Conditions de service" : "Terms of Service"}
            </h1>
            <p className="text-muted-foreground">
              {isFr ? "Dernière mise à jour : 27 avril 2026" : "Last updated: April 27, 2026"}
            </p>
          </div>

          {isFr ? (
            <TermsContentFr currentYear={currentYear} />
          ) : (
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of the AiLys Agency website at <strong>ailysagency.ca</strong> and any consulting engagement you enter into with AiLys Agency ("AiLys", "we", "us", "our"). By accessing the site or signing a consulting agreement, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. About AiLys Agency (legal entity)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>AiLys Agency</strong> is the trade name under which <strong>Reviuzy Inc</strong>, a Quebec corporation, operates. References in these Terms to "AiLys", "we", "us", or "our" refer to Reviuzy Inc operating as AiLys Agency. Any contract, invoice, or legal correspondence is binding on Reviuzy Inc as the contracting party. The brand "AiLys Automation" refers to our internal automation platform powering service delivery.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Reviuzy Inc operates as a Quebec-based AI search reputation agency under the AiLys Agency name. We provide consulting services that help local businesses and brands get cited inside answers from ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot. Our work covers:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Technical SEO and on-page work</li>
                <li>Google Business Profile management, citation building, and NAP consistency</li>
                <li>AEO (Answer Engine Optimization) schema deployment</li>
                <li>GEO (Generative Engine Optimization) entity authority work on Wikipedia, Wikidata, and digital PR</li>
                <li>E-E-A-T (Experience, Expertise, Authoritativeness, Trust) content production</li>
                <li>AI Visibility and AI Traffic measurement and reporting</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Optional add-ons include the AiLys Automation reputation module (NFC review collection, AI replies, contest engine), Domain Shield, Domain Speed Boost, and a dedicated strategist. All add-ons are operated by the same legal entity (Reviuzy Inc) under these Terms plus any specific add-on terms communicated at signup.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Plans, Pricing, and Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We offer four monthly plans: Starter ($300 CAD), Core ($600 CAD), Growth ($1,200 CAD), and Agency ($2,500 CAD). Plans run month-to-month. You may cancel by giving two weeks written notice (email is sufficient) before the next billing cycle. We do not require long-term contracts and there is no clawback on the schema, citations, or content we delivered before cancellation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                A 30-day satisfaction guarantee applies to every plan. If, in the first 30 days, we have not delivered a measurable schema, citation, or content output you agreed to in your kickoff document, we refund the first month in full. The guarantee covers the base plan; add-ons are refunded pro-rata.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Pricing is in Canadian dollars. Taxes (GST/QST or applicable VAT) are added at invoice. We do not pro-rate mid-cycle additions or removals of add-ons; changes take effect at the next billing date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. The Founding Clients Program</h2>
              <p className="text-muted-foreground leading-relaxed">
                The first ten clients who sign a consulting agreement receive a 50% discount on their plan tier (Starter, Core, Growth, or Agency) for the lifetime of the subscription, locked in at signup. Founding Clients also receive priority delivery (audit in 12 hours, schema in week one), direct strategist access, and an opt-in published case study with right of approval over every metric, name, and quote. The 30-day satisfaction guarantee applies. To apply, run a free AI Visibility Audit at <Link to="/audit" className="text-primary underline">/audit</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Client Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                For us to deliver the agreed work, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Provide accurate business information (name, address, phone, hours, category) and keep us updated when it changes</li>
                <li>Grant the access required to do the work (Google Business Profile owner access, website CMS or hosting access, social account access where relevant)</li>
                <li>Approve schema, content drafts, and citation submissions in a reasonable timeframe (we ask for response within 5 business days; longer delays may slow delivery)</li>
                <li>Not engage another agency to do the same work in parallel without telling us; conflicting work can void the satisfaction guarantee</li>
                <li>Pay invoices within 14 days of receipt</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. AI-Assisted Work</h2>
              <p className="text-muted-foreground leading-relaxed">
                Parts of our delivery are accelerated by our internal AI engine (we refer to it generically as "the AiLys engine" in client-facing materials). AI-assisted outputs include schema drafts, content briefs, review reply drafts, and AI Visibility scoring. Every AI-assisted output is reviewed by a human strategist before it is shipped or published. You retain final approval rights on anything that goes live under your name. We are not liable for any consequences arising from publishing AI-assisted content that you approved without review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The AiLys Agency name, logo, methodology documents, and the proprietary terms (Share of Model, AiLys engine, AiLys score) are our intellectual property. Schema, content, citations, and reports we produce for you become your property at the moment of delivery; you may keep using them after the agreement ends. We retain the right to use your engagement (anonymized, unless you opt into a published case study) in our internal benchmarks and aggregated marketing materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed">
                Both parties keep confidential information confidential. We will not share your business performance data, traffic, customer lists, or internal documents with third parties without your written consent. We may share aggregated, anonymized benchmark data (e.g., median citation rate across Core-tier dental practices) where no individual client can be identified.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not guarantee specific search rankings, AI engine citations, traffic counts, or conversions. AI search engines are third-party systems with their own algorithms; outcomes depend on factors outside our control. Our total liability for any claim arising from these Terms or our services is limited to the fees you paid us in the three months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our handling of personal data is governed by our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>. We comply with Loi 25 (Quebec), PIPEDA (Canada federal), and where applicable GDPR (EU/UK) and CCPA (California). Cookie usage on the website is governed by our <Link to="/cookies" className="text-primary underline">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law and Disputes</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of the Province of Quebec and the federal laws of Canada applicable therein. Any dispute arising from these Terms or the services will be brought before the courts of the judicial district of Montreal, Quebec, unless mandatory consumer protection laws of your home jurisdiction require otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Changes to These Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms when our service or the law changes. Material changes are communicated by email at least 30 days before they take effect. Continued use of the website or the service after the effective date constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, the service, or to give the cancellation notice in section 3:
              </p>
              <div className="mt-3 p-4 rounded-lg border border-border/40 bg-card/30">
                <p className="text-foreground font-medium">AiLys Agency</p>
                <p className="text-muted-foreground text-sm">Montreal, Quebec, Canada</p>
                <p className="text-muted-foreground text-sm">
                  Email: <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a>
                </p>
              </div>
            </section>

            <p className="text-xs text-muted-foreground/60 pt-8 border-t border-border/30">
              © {currentYear} AiLys Agency. All rights reserved.
            </p>
          </div>
          )}
        </div>
        <Footer />
      </div>
      <LandingChatWidget />
    </>
  );
}
