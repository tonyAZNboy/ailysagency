import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LangProvider } from "@/i18n/LangContext";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { setupAnalyticsLoader } from "@/lib/analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import AuditAIVisibility from "./pages/AuditAIVisibility";
import AuditGbpPulse from "./pages/AuditGbpPulse";
import BookCall from "./pages/BookCall";
import Cofounders from "./pages/Cofounders";
import Help from "./pages/Help";
import HelpArticle from "./pages/HelpArticle";
import Industries from "./pages/Industries";
import Industry from "./pages/Industry";
import Comparison from "./pages/Comparison";
import Glossary from "./pages/Glossary";
import GlossaryTerm from "./pages/GlossaryTerm";
import AiVisibilityScoreTool from "./pages/AiVisibilityScoreTool";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminChats from "./pages/admin/AdminChats";
import AdminVisitors from "./pages/admin/AdminVisitors";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminClients from "./pages/admin/AdminClients";
import AdminLifecycle from "./pages/admin/AdminLifecycle";
import AdminChurn from "./pages/admin/AdminChurn";
import AdminSettings from "./pages/admin/AdminSettings";

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
              <ScrollToTop />
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
                <Route path="/:lang/audit" element={<AuditAIVisibility />} />
                <Route path="/:lang/audit/ai-visibility" element={<AuditAIVisibility />} />
                <Route path="/:lang/audit/gbp" element={<AuditGbpPulse />} />
                <Route path="/:lang/audit/gbp-pulse" element={<AuditGbpPulse />} />

                {/* Strategy call booking */}
                <Route path="/book-call" element={<BookCall />} />
                <Route path="/:lang/book-call" element={<BookCall />} />

                {/* Cofounder and partner application */}
                <Route path="/cofounders" element={<Cofounders />} />
                <Route path="/:lang/cofounders" element={<Cofounders />} />
                <Route path="/cofondateurs" element={<Cofounders />} />
                <Route path="/:lang/cofondateurs" element={<Cofounders />} />

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

                {/* Admin (gated by Supabase auth + admin_users table) */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="leads" element={<AdminLeads />} />
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
