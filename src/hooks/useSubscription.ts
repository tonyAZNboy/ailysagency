import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const checkSubscription = async () => {
    if (!user) {
      setSubscription(null);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');

      if (error) {
        throw new Error(error.message);
      }

      setSubscription(data);
    } catch (error) {
      console.error('Subscription check error:', error);
      toast({
        title: "Subscription Check Failed",
        description: error instanceof Error ? error.message : "Failed to check subscription status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-check subscription on auth state change
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscription(null);
    }
  }, [user]);

  return {
    subscription,
    isLoading,
    checkSubscription,
    isSubscribed: subscription?.subscribed || false,
    subscriptionTier: subscription?.subscription_tier,
    subscriptionEnd: subscription?.subscription_end,
  };
}