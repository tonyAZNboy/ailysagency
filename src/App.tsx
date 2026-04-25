import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LangProvider } from "@/i18n/LangContext";
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
import AuditAIVisibility from "./pages/AuditAIVisibility";
import BookCall from "./pages/BookCall";
import Help from "./pages/Help";
import HelpArticle from "./pages/HelpArticle";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminChats from "./pages/admin/AdminChats";
import AdminVisitors from "./pages/admin/AdminVisitors";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
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
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/:lang/blog" element={<Blog />} />
                <Route path="/:lang/blog/:slug" element={<BlogPost />} />

                {/* Audit (lead magnet) */}
                <Route path="/audit" element={<AuditAIVisibility />} />
                <Route path="/audit/ai-visibility" element={<AuditAIVisibility />} />

                {/* Strategy call booking */}
                <Route path="/book-call" element={<BookCall />} />
                <Route path="/:lang/book-call" element={<BookCall />} />

                {/* Help center */}
                <Route path="/help" element={<Help />} />
                <Route path="/help/:slug" element={<HelpArticle />} />
                <Route path="/:lang/help" element={<Help />} />
                <Route path="/:lang/help/:slug" element={<HelpArticle />} />

                {/* Admin (gated by Supabase auth + admin_users table) */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="chats" element={<AdminChats />} />
                  <Route path="visitors" element={<AdminVisitors />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Legal */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiePolicy />} />

                {/* Auth scaffold (no public links yet, reserved for future client portal) */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LangProvider>
        </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
