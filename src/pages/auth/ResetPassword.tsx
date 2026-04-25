import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Supabase appends #access_token=...&type=recovery to the redirect URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setValidSession(true);
    } else {
      // Check if there's already an active session (user was auto-logged in via recovery link)
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) setValidSession(true);
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast({ title: "Password too short", description: "At least 8 characters required.", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      toast({ title: "Password updated!", description: "You can now sign in with your new password." });
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err: any) {
      toast({ title: "Failed to update password", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <>
        <Helmet><title>Password Updated | Reviuzy</title></Helmet>
        <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
          <Card className="w-full max-w-sm sm:max-w-md text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Password updated!</CardTitle>
              <CardDescription>Redirecting you to sign in…</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/auth/login"><Button className="w-full">Sign in</Button></Link>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  if (!validSession) {
    return (
      <>
        <Helmet><title>Reset Password | Reviuzy</title></Helmet>
        <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
          <Card className="w-full max-w-sm sm:max-w-md text-center">
            <CardHeader>
              <CardTitle>Invalid or expired link</CardTitle>
              <CardDescription>This password reset link is no longer valid. Please request a new one.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/auth/forgot-password"><Button className="w-full">Request new link</Button></Link>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | Reviuzy</title>
        <meta name="description" content="Set a new password for your Reviuzy account." />
      </Helmet>
      <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardHeader>
            <CardTitle>Set new password</CardTitle>
            <CardDescription>Choose a strong password for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
