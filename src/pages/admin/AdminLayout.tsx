import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  MessageCircle,
  FileText,
  Globe2,
  LogOut,
  Settings,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AiLysLogo } from "@/components/brand/AiLysLogo";

interface AdminProfile {
  user_id: string;
  full_name: string | null;
  role: string;
  active: boolean;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setAuthError("not_authenticated");
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("admin_users")
          .select("user_id, full_name, role, active")
          .eq("user_id", user.id)
          .single();

        if (!mounted) return;

        if (error || !data || !data.active) {
          setAuthError("not_admin");
          setLoading(false);
          return;
        }
        setProfile(data as AdminProfile);
        setLoading(false);
      } catch {
        if (!mounted) return;
        setAuthError("supabase_unavailable");
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Loading admin...
        </p>
      </div>
    );
  }

  if (authError === "supabase_unavailable") {
    return <AdminUnavailableScreen />;
  }

  if (authError === "not_authenticated") {
    navigate("/auth/login?next=/admin");
    return null;
  }

  if (authError === "not_admin") {
    return <AdminAccessDeniedScreen />;
  }

  const navLinks = [
    { to: "/admin", icon: LayoutDashboard, label: "Overview", end: true },
    { to: "/admin/leads", icon: Users, label: "Leads" },
    { to: "/admin/bookings", icon: CalendarCheck, label: "Bookings" },
    { to: "/admin/chats", icon: MessageCircle, label: "Chats" },
    { to: "/admin/posts", icon: FileText, label: "Posts" },
    { to: "/admin/visitors", icon: Globe2, label: "Visitors" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      <Helmet>
        <title>Admin · AiLys Agency</title>
      </Helmet>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 border-r border-border/40 bg-card/30 backdrop-blur-md flex flex-col">
          <div className="p-5 border-b border-border/40">
            <AiLysLogo variant="full" size="sm" />
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              Admin / monitoring
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-3 border-t border-border/40">
            <div className="mb-3 px-3">
              <div className="text-sm text-foreground/90 truncate">
                {profile?.full_name ?? "AiLys Admin"}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                {profile?.role}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

function AdminUnavailableScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-8 backdrop-blur-md">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300 mb-3">
          Supabase not configured
        </div>
        <h1 className="font-display text-3xl mb-3">Admin needs a backend.</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          The admin dashboard reads from the AiLys Supabase project. Provision
          the project and set <code className="font-mono text-foreground">VITE_SUPABASE_URL</code> +{" "}
          <code className="font-mono text-foreground">VITE_SUPABASE_PUBLISHABLE_KEY</code> in
          Cloudflare Pages env vars.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Setup guide:{" "}
          <code className="font-mono text-foreground">
            supabase/migrations/0001_admin_tables.sql
          </code>{" "}
          + the README in <code className="font-mono text-foreground">supabase/functions/</code>.
        </p>
      </div>
    </div>
  );
}

function AdminAccessDeniedScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl mb-3">Access denied</h1>
        <p className="text-sm text-muted-foreground mb-5">
          Your account is not in the admin_users table or is inactive. Contact
          the AiLys owner to grant access.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-full border border-border/50 text-sm hover:border-primary/50 transition-colors"
        >
          Back to site
        </button>
      </div>
    </div>
  );
}
