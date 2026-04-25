import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { useToast } from "./use-toast";

interface SmsCredits {
  monthlyQuota: number;
  usedThisMonth: number;
  bonusCredits: number;
  quotaResetAt: Date;
  availableCredits: number;
}

export type EngagementFeature = 'loyalty_program' | 'appointment_reminders' | 'sms_messaging';

interface FeatureStatus {
  hasAddon: boolean;
  addonId: string | null;
  status: 'active' | 'canceled' | 'past_due' | 'none';
}

interface AddonStatuses {
  loyalty_program: FeatureStatus;
  appointment_reminders: FeatureStatus;
  sms_messaging: FeatureStatus;
}

const defaultFeatureStatus: FeatureStatus = {
  hasAddon: false,
  addonId: null,
  status: 'none',
};

export function useEngagementAddon() {
  const [addonStatuses, setAddonStatuses] = useState<AddonStatuses>({
    loyalty_program: defaultFeatureStatus,
    appointment_reminders: defaultFeatureStatus,
    sms_messaging: defaultFeatureStatus,
  });
  const [smsCredits, setSmsCredits] = useState<SmsCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeTenantId } = useTenants();
  const { toast } = useToast();

  const fetchAddonStatuses = useCallback(async () => {
    if (!activeTenantId) {
      setAddonStatuses({
        loyalty_program: defaultFeatureStatus,
        appointment_reminders: defaultFeatureStatus,
        sms_messaging: defaultFeatureStatus,
      });
      return;
    }

    try {
      // Get all engagement addon products
      const { data: addonProducts } = await supabase
        .from('addon_products')
        .select('id, feature_key')
        .in('feature_key', ['loyalty_program', 'appointment_reminders', 'sms_messaging']);

      if (!addonProducts || addonProducts.length === 0) return;

      // Check tenant addons
      const { data: tenantAddons } = await supabase
        .from('tenant_addons')
        .select('addon_id, status')
        .eq('tenant_id', activeTenantId);

      const newStatuses: AddonStatuses = {
        loyalty_program: { ...defaultFeatureStatus },
        appointment_reminders: { ...defaultFeatureStatus },
        sms_messaging: { ...defaultFeatureStatus },
      };

      for (const product of addonProducts) {
        const featureKey = product.feature_key as EngagementFeature;
        const tenantAddon = tenantAddons?.find(ta => ta.addon_id === product.id);
        
        newStatuses[featureKey] = {
          addonId: product.id,
          hasAddon: tenantAddon?.status === 'active',
          status: (tenantAddon?.status as FeatureStatus['status']) || 'none',
        };
      }

      setAddonStatuses(newStatuses);
    } catch (error) {
      console.error('Error fetching addon statuses:', error);
    }
  }, [activeTenantId]);

  const fetchSmsCredits = useCallback(async () => {
    if (!activeTenantId) {
      setSmsCredits(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('sms_credits')
        .select('*')
        .eq('tenant_id', activeTenantId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const available = Math.max(0, 
          (data.monthly_quota - data.used_this_month) + data.bonus_credits
        );
        
        setSmsCredits({
          monthlyQuota: data.monthly_quota,
          usedThisMonth: data.used_this_month,
          bonusCredits: data.bonus_credits,
          quotaResetAt: new Date(data.quota_reset_at),
          availableCredits: available,
        });
      }
    } catch (error) {
      console.error('Error fetching SMS credits:', error);
    }
  }, [activeTenantId]);

  const activateFeature = async (feature: EngagementFeature) => {
    const featureStatus = addonStatuses[feature];
    
    if (!activeTenantId || !featureStatus.addonId) {
      toast({
        title: "Error",
        description: "No active organization found",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { error } = await supabase
        .from('tenant_addons')
        .upsert({
          tenant_id: activeTenantId,
          addon_id: featureStatus.addonId,
          status: 'active',
        }, { onConflict: 'tenant_id,addon_id' });

      if (error) throw error;

      // If activating SMS, initialize credits
      if (feature === 'sms_messaging') {
        await supabase
          .from('sms_credits')
          .upsert({
            tenant_id: activeTenantId,
            monthly_quota: 100,
            used_this_month: 0,
            bonus_credits: 0,
            quota_reset_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }, { onConflict: 'tenant_id' });
        
        await fetchSmsCredits();
      }

      const featureNames: Record<EngagementFeature, string> = {
        loyalty_program: 'Loyalty Program',
        appointment_reminders: 'Appointment Reminders',
        sms_messaging: 'SMS & WhatsApp Messaging',
      };

      toast({
        title: "Success!",
        description: `${featureNames[feature]} activated`,
      });

      await fetchAddonStatuses();
      return true;
    } catch (error) {
      console.error('Error activating addon:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to activate add-on",
        variant: "destructive",
      });
      return null;
    }
  };

  const purchaseSmsCredits = async (amount: number) => {
    if (!activeTenantId) return null;

    // Price tiers: $5 for 75, $10 for 200, $20 for 500
    const priceCents = amount <= 75 ? 500 : amount <= 200 ? 1000 : 2000;

    try {
      const { error } = await supabase
        .from('sms_credit_purchases')
        .insert({
          tenant_id: activeTenantId,
          credits_amount: amount,
          price_cents: priceCents,
          status: 'completed',
        });

      if (error) throw error;

      const { error: updateError } = await supabase
        .from('sms_credits')
        .update({
          bonus_credits: (smsCredits?.bonusCredits || 0) + amount,
        })
        .eq('tenant_id', activeTenantId);

      if (updateError) throw updateError;

      toast({
        title: "Credits Added!",
        description: `${amount} SMS credits have been added to your account`,
      });

      await fetchSmsCredits();
      return true;
    } catch (error) {
      console.error('Error purchasing credits:', error);
      toast({
        title: "Error",
        description: "Failed to purchase credits",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchAddonStatuses();
      await fetchSmsCredits();
      setIsLoading(false);
    };
    
    if (activeTenantId) {
      loadData();
    }
  }, [activeTenantId, fetchAddonStatuses, fetchSmsCredits]);

  // Computed values for easy access
  const hasLoyalty = addonStatuses.loyalty_program.hasAddon;
  const hasReminders = addonStatuses.appointment_reminders.hasAddon;
  const hasSms = addonStatuses.sms_messaging.hasAddon;
  const hasAnyAddon = hasLoyalty || hasReminders || hasSms;

  return {
    // Individual feature checks
    hasLoyalty,
    hasReminders,
    hasSms,
    hasAnyAddon,
    
    // Full status objects
    addonStatuses,
    smsCredits,
    isLoading,
    
    // Actions
    activateFeature,
    purchaseSmsCredits,
    
    refetch: async () => {
      await fetchAddonStatuses();
      await fetchSmsCredits();
    },
  };
}
