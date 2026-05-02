import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LangProvider } from "@/i18n/LangContext";
import { LangRouteSync } from "@/i18n/LangRouteSync";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { RouteChunkErrorBoundary } from "@/components/RouteChunkErrorBoundary";
import { setupAnalyticsLoader } from "@/lib/analytics";

// Phase E.5: hot-path pages (high traffic, low latency budget) stay eager.
// Conversion funnels + landing must render in first paint without
// JS chunk fetch latency.
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuditAIVisibility from "./pages/AuditAIVisibility";
import AuditGbpPulse from "./pages/AuditGbpPulse";
import AuditNapPulse from "./pages/AuditNapPulse";
import BookCall from "./pages/BookCall";
import PricingDetails from "./pages/PricingDetails";
import AiVisibilityScoreTool from "./pages/AiVisibilityScoreTool";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";

// Phase E.5: cold-path pages (low traffic, OK to fetch chunk on-demand).
// Reduces initial JS bundle. Each page chunk loads in parallel with the
// route resolution.
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy"));
const Cofounders = lazy(() => import("./pages/Cofounders"));
const FoundingClients = lazy(() => import("./pages/FoundingClients"));
const Help = lazy(() => import("./pages/Help"));
const HelpArticle = lazy(() => import("./pages/HelpArticle"));
const Industries = lazy(() => import("./pages/Industries"));
const Industry = lazy(() => import("./pages/Industry"));
const Comparison = lazy(() => import("./pages/Comparison"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
const BadgeEmbed = lazy(() => import("./pages/BadgeEmbed"));
const PublicVerify = lazy(() => import("./pages/PublicVerify"));
const IndustryReports = lazy(() => import("./pages/IndustryReports"));
const IndustryReportDetail = lazy(() => import("./pages/IndustryReportDetail"));
const ConciergeDemo = lazy(() => import("./pages/ConciergeDemo"));
const PartnerProgram = lazy(() => import("./pages/PartnerProgram"));
const ConformiteQuebec = lazy(() => import("./pages/ConformiteQuebec"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminChats = lazy(() => import("./pages/admin/AdminChats"));
const AdminVisitors = lazy(() => import("./pages/admin/AdminVisitors"));
const AdminPosts = lazy(() => import("./pages/admin/AdminPosts"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminClients = lazy(() => import("./pages/admin/AdminClients"));
const AdminPartnerApplications = lazy(() => import("./pages/admin/AdminPartnerApplications"));
const AdminLifecycle = lazy(() => import("./pages/admin/AdminLifecycle"));
const AdminChurn = lazy(() => import("./pages/admin/AdminChurn"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Suspense fallback for lazy chunks. Minimal to avoid cumulative layout
// shift; matches dark theme.
const RouteFallback = () => (
  <div
    aria-busy="true"
    aria-live="polite"
    className="min-h-screen bg-background flex items-center justify-center"
  >
    <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  // Lazy-load analytics scripts based on consent. Re-runs on consent changes.
  useEffect(() => {
    const cleanup = setupAnalyticsLoader();
    return cleanup;
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <HelmetProvider>
          <LangProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <LangRouteSync />
              <ScrollToTop />
              <RouteChunkErrorBoundary>
              <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/:lang" element={<Index />} />

                {/* Blog */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/category/:category" element={<BlogCategory />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/:lang/blog" element={<Blog />} />
                <Route path="/:lang/blog/category/:category" element={<BlogCategory />} />
                <Route path="/:lang/blog/:slug" element={<BlogPost />} />

                {/* Audit (lead magnet) */}
                <Route path="/audit" element={<AuditAIVisibility />} />
                <Route path="/audit/ai-visibility" element={<AuditAIVisibility />} />
                <Route path="/audit/gbp" element={<AuditGbpPulse />} />
                <Route path="/audit/gbp-pulse" element={<AuditGbpPulse />} />
                <Route path="/audit/nap" element={<AuditNapPulse />} />
                <Route path="/audit/nap-pulse" element={<AuditNapPulse />} />
                <Route path="/:lang/audit" element={<AuditAIVisibility />} />
                <Route path="/:lang/audit/ai-visibility" element={<AuditAIVisibility />} />
                <Route path="/:lang/audit/gbp" element={<AuditGbpPulse />} />
                <Route path="/:lang/audit/gbp-pulse" element={<AuditGbpPulse />} />
                <Route path="/:lang/audit/nap" element={<AuditNapPulse />} />
                <Route path="/:lang/audit/nap-pulse" element={<AuditNapPulse />} />

                {/* Strategy call booking */}
                <Route path="/book-call" element={<BookCall />} />
                <Route path="/:lang/book-call" element={<BookCall />} />

                {/* Detailed pricing comparison page (Phase E.1.4-E.1.7) */}
                <Route path="/pricing-details" element={<PricingDetails />} />
                <Route path="/:lang/pricing-details" element={<PricingDetails />} />
                <Route path="/forfaits-complets" element={<PricingDetails />} />
                <Route path="/:lang/forfaits-complets" element={<PricingDetails />} />

                {/* Cofounder and partner application */}
                <Route path="/cofounders" element={<Cofounders />} />
                <Route path="/:lang/cofounders" element={<Cofounders />} />
                <Route path="/cofondateurs" element={<Cofounders />} />
                <Route path="/:lang/cofondateurs" element={<Cofounders />} />

                {/* Founding Clients Program (10 spots, 50% off lifetime, EN/FR/VI) */}
                <Route path="/contact" element={<FoundingClients />} />
                <Route path="/:lang/contact" element={<FoundingClients />} />
                <Route path="/contacte" element={<FoundingClients />} />
                <Route path="/:lang/contacte" element={<FoundingClients />} />
                <Route path="/lien-he" element={<FoundingClients />} />
                <Route path="/:lang/lien-he" element={<FoundingClients />} />

                {/* Help center */}
                <Route path="/help" element={<Help />} />
                <Route path="/help/:slug" element={<HelpArticle />} />
                <Route path="/:lang/help" element={<Help />} />
                <Route path="/:lang/help/:slug" element={<HelpArticle />} />

                {/* Industries — vertical-specific landing pages */}
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:slug" element={<Industry />} />
                <Route path="/:lang/industries" element={<Industries />} />
                <Route path="/:lang/industries/:slug" element={<Industry />} />

                {/* Comparison pages — bottom-funnel competitor traffic */}
                <Route path="/vs/:slug" element={<Comparison />} />
                <Route path="/:lang/vs/:slug" element={<Comparison />} />

                {/* Glossary — semantic SEO + internal-link authority */}
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/glossary/:slug" element={<GlossaryTerm />} />
                <Route path="/:lang/glossary" element={<Glossary />} />
                <Route path="/:lang/glossary/:slug" element={<GlossaryTerm />} />

                {/* Free tools — AI Visibility Score (lead magnet + backlink magnet) */}
                <Route path="/tools/ai-visibility-score" element={<AiVisibilityScoreTool />} />
                <Route path="/:lang/tools/ai-visibility-score" element={<AiVisibilityScoreTool />} />

                {/* Bonus A: AiLys Verified badge embed + public verification */}
                <Route path="/badge" element={<BadgeEmbed />} />
                <Route path="/:lang/badge" element={<BadgeEmbed />} />
                <Route path="/verify/:slug" element={<PublicVerify />} />
                <Route path="/:lang/verify/:slug" element={<PublicVerify />} />

                {/* Bonus B: Quarterly Industry Reports lead magnets */}
                <Route path="/industry-reports" element={<IndustryReports />} />
                <Route path="/:lang/industry-reports" element={<IndustryReports />} />
                <Route path="/industry-reports/:slug" element={<IndustryReportDetail />} />
                <Route path="/:lang/industry-reports/:slug" element={<IndustryReportDetail />} />

                {/* Feature 5: AI Concierge demo (UI shell, real backend in next sessions) */}
                <Route path="/concierge-demo" element={<ConciergeDemo />} />
                <Route path="/:lang/concierge-demo" element={<ConciergeDemo />} />

                {/* F3.0: Partner Program waitlist (demand-validation MVP) */}
                <Route path="/agencies/partner-program" element={<PartnerProgram />} />
                <Route path="/:lang/agencies/partner-program" element={<PartnerProgram />} />

                {/* Quebec compliance positioning (Loi 25 + Loi 96 + Charte) */}
                <Route path="/conformite-quebec" element={<ConformiteQuebec />} />
                <Route path="/:lang/conformite-quebec" element={<ConformiteQuebec />} />
                <Route path="/quebec-compliance" element={<ConformiteQuebec />} />
                <Route path="/:lang/quebec-compliance" element={<ConformiteQuebec />} />

                {/* Admin (gated by Supabase auth + admin_users table) */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="partner-applications" element={<AdminPartnerApplications />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="lifecycle" element={<AdminLifecycle />} />
                  <Route path="churn" element={<AdminChurn />} />
                  <Route path="chats" element={<AdminChats />} />
                  <Route path="visitors" element={<AdminVisitors />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Legal — bilingual EN/FR-CA via useLang switch inside the
                    component. Locale-prefixed paths route to the same
                    components; the component detects lang from context (not
                    URL) but the prefixed routes exist for direct linking + SEO
                    so /fr/terms, /es/privacy etc. all work. */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/:lang/privacy" element={<PrivacyPolicy />} />
                <Route path="/:lang/terms" element={<TermsOfService />} />
                <Route path="/:lang/cookies" element={<CookiePolicy />} />

                {/* Auth scaffold (no public links yet, reserved for future client portal) */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
              </RouteChunkErrorBoundary>
              <CookieConsentBanner />
            </BrowserRouter>
          </LangProvider>
        </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
