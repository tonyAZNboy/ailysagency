// AiLys Partner Program landing page (F3.0 MVP).
//
// Demand-validation surface for the white-label partner channel.
// Captures intent via /api/partner-application; once 3+ qualified
// applications arrive, F3.1+ kicks in to build the actual white-label
// portal per .planning/feature-3-white-label-portal/.
//
// Routes: /agencies/partner-program + /:lang/agencies/partner-program
// Hard rules respected: #4 brand names in Latin script, #8 16-locale
// fallback (EN canonical when locale not yet hand-translated), #10
// help articles before public surface, #11 admin panel surface,
// #13 mobile-first 375x812 baseline.

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLang } from "@/i18n/LangContext";
import {
  CheckCircle2,
  Send,
  Loader2,
  Sparkles,
  Building2,
  Users,
  Briefcase,
  AlertCircle,
} from "lucide-react";

interface FormState {
  agencyName: string;
  contactName: string;
  contactEmail: string;
  city: string;
  currentClientCount: string;
  expectedReferralsPerYear: string;
  pitch: string;
  websiteUrlAlt: string; // honeypot
}

const INITIAL_FORM: FormState = {
  agencyName: "",
  contactName: "",
  contactEmail: "",
  city: "",
  currentClientCount: "",
  expectedReferralsPerYear: "",
  pitch: "",
  websiteUrlAlt: "",
};

export default function PartnerProgram() {
  const { t, lang } = useLang();
  const tp = t.partnerProgram;
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.agencyName.trim() || !form.contactName.trim() || !form.contactEmail.trim()) {
      setError(tp.formErrorValidation);
      return;
    }
    setSubmitting(true);
    try {
      const resp = await fetch("/api/partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          language: lang === "fr" ? "fr" : "en",
          source: "partner-program",
        }),
      });
      if (resp.status === 503) {
        setError(tp.formErrorDisabled);
        return;
      }
      if (resp.status === 429) {
        setError(tp.formErrorRateLimit);
        return;
      }
      if (!resp.ok) {
        setError(tp.formErrorGeneric);
        return;
      }
      const json = await resp.json();
      if (json.ok) {
        setSuccess(json.tracking_id ?? "submitted");
        setForm(INITIAL_FORM);
      } else {
        setError(tp.formErrorGeneric);
      }
    } catch {
      setError(tp.formErrorNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  const canonicalPath = lang === "en" ? "/agencies/partner-program" : `/${lang}/agencies/partner-program`;
  const canonical = `https://www.ailysagency.ca${canonicalPath}`;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{tp.metaTitle}</title>
        <meta name="description" content={tp.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={tp.metaTitle} />
        <meta property="og:description" content={tp.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <NetworkBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border border-violet-400/30 bg-violet-500/10 text-violet-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {tp.eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4 max-w-3xl mx-auto">
            {tp.headline}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {tp.subheadline}
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-400 hover:to-fuchsia-400 transition-all min-h-[44px]"
          >
            {tp.applyCta}
          </a>
        </section>

        {/* Who it is for */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            {tp.whoTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[tp.who1, tp.who2, tp.who3].map((line, i) => (
              <Card key={i} className="bg-card/50 border-border/50">
                <CardContent className="p-5">
                  <div className="text-cyan-400 mb-2">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm leading-relaxed">{line}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What partners receive */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            {tp.whatTitle}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[tp.what1, tp.what2, tp.what3, tp.what4, tp.what5].map((line, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-md bg-card/40 border border-border/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Application form */}
        <section id="apply" className="mb-12 sm:mb-16 scroll-mt-24">
          <Card className="bg-card/70 border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">{tp.formTitle}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{tp.formIntro}</p>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert className="bg-emerald-500/10 border-emerald-400/30 text-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-1">{tp.formSuccessTitle}</div>
                    <div className="text-sm">{tp.formSuccessBody}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Ref: {success.slice(0, 12)}
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* Honeypot (hidden from real users) */}
                  <div className="absolute left-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
                    <label htmlFor="websiteUrlAlt">Do not fill this field</label>
                    <input
                      id="websiteUrlAlt"
                      name="websiteUrlAlt"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.websiteUrlAlt}
                      onChange={(e) => update("websiteUrlAlt", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="agencyName">{tp.formAgencyName} *</Label>
                      <Input
                        id="agencyName"
                        type="text"
                        required
                        maxLength={200}
                        placeholder={tp.formAgencyNamePh}
                        value={form.agencyName}
                        onChange={(e) => update("agencyName", e.target.value)}
                        disabled={submitting}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">{tp.formContactName} *</Label>
                      <Input
                        id="contactName"
                        type="text"
                        required
                        maxLength={100}
                        placeholder={tp.formContactNamePh}
                        value={form.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                        disabled={submitting}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="contactEmail">{tp.formContactEmail} *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        required
                        maxLength={254}
                        placeholder={tp.formContactEmailPh}
                        value={form.contactEmail}
                        onChange={(e) => update("contactEmail", e.target.value)}
                        disabled={submitting}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">{tp.formCity}</Label>
                      <Input
                        id="city"
                        type="text"
                        maxLength={100}
                        placeholder={tp.formCityPh}
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        disabled={submitting}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="currentClientCount">{tp.formCurrentClients}</Label>
                      <Input
                        id="currentClientCount"
                        type="number"
                        min={0}
                        max={10000}
                        placeholder={tp.formCurrentClientsPh}
                        value={form.currentClientCount}
                        onChange={(e) => update("currentClientCount", e.target.value)}
                        disabled={submitting}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedReferralsPerYear">{tp.formExpectedReferrals}</Label>
                      <Input
                        id="expectedReferralsPerYear"
                        type="number"
                        min={0}
                        max={1000}
                        placeholder={tp.formExpectedReferralsPh}
                        value={form.expectedReferralsPerYear}
                        onChange={(e) => update("expectedReferralsPerYear", e.target.value)}
                        disabled={submitting}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pitch">{tp.formPitch}</Label>
                    <Textarea
                      id="pitch"
                      rows={4}
                      maxLength={2000}
                      placeholder={tp.formPitchPh}
                      value={form.pitch}
                      onChange={(e) => update("pitch", e.target.value)}
                      disabled={submitting}
                      className="mt-1.5"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <p className="text-xs text-muted-foreground">{tp.legalNote}</p>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto min-h-[44px] gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {tp.formSubmitting}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {tp.formSubmit}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">{tp.faqTitle}</h2>
          <div className="space-y-4">
            {[
              [tp.faq1q, tp.faq1a],
              [tp.faq2q, tp.faq2a],
              [tp.faq3q, tp.faq3a],
              [tp.faq4q, tp.faq4a],
              [tp.faq5q, tp.faq5a],
            ].map(([q, a], i) => (
              <Card key={i} className="bg-card/40 border-border/40">
                <CardContent className="p-5">
                  <div className="font-semibold text-base mb-2">{q}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
