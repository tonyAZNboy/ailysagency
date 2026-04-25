import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Set up auth state listener FIRST
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, !!session);
      if (!isMounted) return;
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' || !session) {
        // Clear any corrupted session data
        setSession(session);
        setUser(session?.user ?? null);
      } else if (session) {
        setSession(session);
        setUser(session.user);
      }
      setLoading(false);
    });

    // THEN check for existing session
    const init = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error);
          // Clear corrupted session
          await supabase.auth.signOut();
          return;
        }
        
        if (!isMounted) return;
        setSession(session);
        setUser(session?.user ?? null);
      } catch (e) {
        console.error("Supabase getSession failed:", e);
        // Clear potentially corrupted session
        await supabase.auth.signOut();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    // Always clear local state first, regardless of API call result
    setUser(null);
    setSession(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      // Ignore "Auth session missing" errors - user is already logged out
      if (error && error.name !== 'AuthSessionMissingError') {
        console.error("Supabase signOut error:", error);
      }
    } catch (e) {
      // Silently handle any errors - local state is already cleared
      console.error("Unexpected signOut error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
