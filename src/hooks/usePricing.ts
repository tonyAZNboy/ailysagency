import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { useToast } from "./use-toast";

interface PricingConfig {
  starter_tier_price: number;
  pro_tier_price: number;
  extra_domain_price: number;
  extra_location_price: number;
  trial_days: number;
  included_domains_starter: number;
  included_domains_pro: number;
  included_locations: number;
  // Override fields
  discount_percent?: number;
  free_access?: boolean;
  free_tier?: string;
  extended_trial_days?: number;
}

interface SubscriptionStatus {
  tier: 'starter' | 'pro' | 'max' | null;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'none';
  isTrialExpired: boolean;
  trialEnd: Date | null;
  currentPeriodEnd: Date | null;
  hasFreeAccess: boolean;
}

export function usePricing() {
  const [pricing, setPricing] = useState<PricingConfig | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeTenantId } = useTenants();
  const { toast } = useToast();

  const fetchPricing = async () => {
    try {
      // Fetch base pricing config
      const { data: configData, error: configError } = await supabase
        .from('pricing_config')
        .select('key, value');

      if (configError) throw configError;

      const config: Record<string, number | boolean | string | undefined> = {};
      configData?.forEach((row: { key: string; value: string }) => {
        config[row.key] = parseInt(row.value, 10);
      });

      // Fetch tenant-specific overrides if we have an active tenant
      if (activeTenantId) {
        const { data: overrides } = await supabase
          .from('tenant_overrides')
          .select('*')
          .eq('tenant_id', activeTenantId)
          .eq('is_active', true)
          .or('expires_at.is.null,expires_at.gt.now()');

        overrides?.forEach((override: { override_type: string; value: { percent?: string; tier?: string; days?: string } | null }) => {
          if (override.override_type === 'discount_percent') {
            config.discount_percent = parseInt(override.value?.percent || '0', 10);
          } else if (override.override_type === 'free_access') {
            config.free_access = true;
            config.free_tier = override.value?.tier;
          } else if (override.override_type === 'extended_trial') {
            config.extended_trial_days = parseInt(override.value?.days || '7', 10);
          }
        });
      }

      setPricing(config as PricingConfig);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }
  };

  const fetchSubscription = async () => {
    if (!activeTenantId) {
      setSubscription(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          subscription_plans (name, price_monthly, features)
        `)
        .eq('tenant_id', activeTenantId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const planName = (data.subscription_plans as { name?: string } | null)?.name?.toLowerCase();
        const validTiers = ['starter', 'pro', 'max'];

        setSubscription({
          tier: validTiers.includes(planName ?? '') ? (planName as 'starter' | 'pro' | 'max') : null,
          status: data.status as 'active' | 'trialing' | 'past_due' | 'canceled' | 'none',
          isTrialExpired: data.is_trial_expired || false,
          trialEnd: data.trial_end ? new Date(data.trial_end) : null,
          currentPeriodEnd: data.current_period_end ? new Date(data.current_period_end) : null,
          hasFreeAccess: pricing?.free_access || false,
        });
      } else {
        setSubscription({
          tier: null,
          status: 'none',
          isTrialExpired: false,
          trialEnd: null,
          currentPeriodEnd: null,
          hasFreeAccess: false,
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({
        tier: null,
        status: 'none',
        isTrialExpired: false,
        trialEnd: null,
        currentPeriodEnd: null,
        hasFreeAccess: false,
      });
    }
  };

  const startTrial = async (tier: 'starter' | 'pro' | 'max') => {
    if (!activeTenantId) {
      toast({
        title: "Error",
        description: "No active organization found",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { tier, tenantId: activeTenantId },
      });

      if (error) throw error;

      if (data.freeAccess) {
        toast({
          title: "Success",
          description: "Your free access has been activated!",
        });
        await fetchSubscription();
        return { freeAccess: true };
      }

      return data;
    } catch (error) {
      console.error('Error starting trial:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start trial",
        variant: "destructive",
      });
      return null;
    }
  };

  const calculatePrice = (
    tier: 'starter' | 'pro' | 'max',
    extraLocations: number = 0
  ): number => {
    if (!pricing) return 0;

    const tierPrices: Record<string, number> = {
      starter: pricing.starter_tier_price || 39,
      pro: pricing.pro_tier_price || 69,
      max: 139,
    };
    const locationPrices: Record<string, number> = {
      starter: 20,
      pro: 20,
      max: 25,
    };

    let total = tierPrices[tier] || 0;
    total += extraLocations * (locationPrices[tier] || 20);

    if (pricing.discount_percent) {
      total = Math.round(total * (1 - pricing.discount_percent / 100));
    }

    return total;
  };

  const isFeatureAvailable = (feature: string): boolean => {
    if (!subscription) return false;
    if (subscription.status === 'none') return false;
    if (subscription.isTrialExpired && subscription.status !== 'active') return false;

    const starterFeatures = [
      'nfc_campaigns', 'ai_review_generation', 'ai_response_suggestions',
      'manual_winner_draw', 'basic_analytics',
    ];
    const proFeatures = [
      ...starterFeatures, 'chat_widget', 'invite_members', 'automated_winner_draw', 'winner_video',
      'google_auto_posting', 'social_calendar', 'legal_tc_generator',
      'advanced_analytics', 'unlimited_campaigns',
      'sentiment_intelligence', 'competitor_benchmarking', 'historical_trends',
      'topic_clustering', 'emotional_trend_analysis',
      'widget_reviews_tab', 'widget_3d_flip',
    ];
    const maxFeatures = [
      ...proFeatures, 'priority_ai_queue', 'agency_dashboard',
      'advanced_automation_rules', 'full_analytics_suite',
      'executive_reports', 'pdf_export', 'cross_location_intelligence',
      'predictive_trend_signals',
      'widget_3d_advanced', 'widget_ai_auto_switch', 'widget_conversion_tracking',
      'widget_holographic_mode',
    ];

    if (subscription.tier === 'max') return maxFeatures.includes(feature);
    if (subscription.tier === 'pro') return proFeatures.includes(feature);
    if (subscription.tier === 'starter') return starterFeatures.includes(feature);

    return false;
  };

  const isReadOnlyMode = (): boolean => {
    if (!subscription) return true;
    if (subscription.hasFreeAccess) return false;
    if (subscription.status === 'active') return false;
    if (subscription.status === 'trialing' && !subscription.isTrialExpired) return false;
    return true;
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchPricing();
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (activeTenantId && pricing !== null) {
      fetchSubscription();
    }
  }, [activeTenantId, pricing]);

  return {
    pricing,
    subscription,
    isLoading,
    startTrial,
    calculatePrice,
    isFeatureAvailable,
    isReadOnlyMode,
    refetch: async () => {
      await fetchPricing();
      await fetchSubscription();
    },
  };
}
