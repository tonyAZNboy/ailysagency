import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      toast({
        title: "Failed to send reset email",
        description: (err instanceof Error ? err.message : null) || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <Helmet>
          <title>Check Your Email | Reviuzy</title>
        </Helmet>
        <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
          <Card className="w-full max-w-sm sm:max-w-md text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Email sent!</CardTitle>
              <CardDescription className="text-base mt-2">
                If <strong>{email}</strong> has an account, you'll receive a password reset link shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/auth/login">
                <Button variant="outline" className="w-full">Back to Sign in</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password | Reviuzy</title>
        <meta name="description" content="Reset your Reviuzy password." />
      </Helmet>
      <main className="min-h-screen grid place-items-center bg-background text-foreground p-4">
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardHeader>
            <Button variant="ghost" size="sm" className="w-fit -ml-2 mb-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <CardTitle>Forgot password?</CardTitle>
            <CardDescription>Enter your email and we'll send you a reset link.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Remembered it?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
