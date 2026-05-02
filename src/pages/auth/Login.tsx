import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back", description: "Signed in successfully" });
    navigate(from, { replace: true });
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      console.error("Google sign-in error", err);
      setLoading(false);
      toast({
        title: "Google sign-in failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Reviuzy</title>
        <meta name="description" content="Login to access your Reviuzy dashboard" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
      </Helmet>
      <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardHeader>
            <Button variant="ghost" size="sm" className="w-fit -ml-2 mb-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Access your Reviuzy dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/auth/forgot-password" className="text-xs text-muted-foreground underline underline-offset-4">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              </div>
              <Button type="submit" disabled={loading} className="w-full">{loading ? "Signing in..." : "Sign in"}</Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="secondary" onClick={handleGoogle} disabled={loading} className="w-full">Continue with Google</Button>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="underline underline-offset-4">Create one</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
