import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

interface Tenant {
  id: string;
  name: string;
  created_at: string;
  subscriptions: {
    id: string;
    status: string;
    trial_tier: string | null;
    trial_end: string | null;
    is_trial_expired: boolean;
    subscription_plans: {
      name: string;
      price_monthly: number;
    } | null;
  }[];
  tenant_overrides: {
    id: string;
    override_type: string;
    value: Record<string, unknown> | string | number | boolean | null;
    reason: string | null;
    expires_at: string | null;
    is_active: boolean;
  }[];
}

interface PricingConfigItem {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

export function useSuperAdmin() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pricing, setPricing] = useState<PricingConfigItem[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if current user is super admin
  useEffect(() => {
    const checkSuperAdmin = async () => {
      if (!user?.email) {
        setIsSuperAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('super_admins')
          .select('id')
          .eq('email', user.email)
          .single();

        setIsSuperAdmin(!!data && !error);
      } catch {
        setIsSuperAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSuperAdmin();
  }, [user?.email]);

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-pricing', {
        body: { action: 'get_pricing' },
      });

      if (error) throw error;
      setPricing(data.pricing || []);
    } catch (error) {
      console.error('Error fetching pricing:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pricing configuration",
        variant: "destructive",
      });
    }
  };

  const updatePricing = async (key: string, value: number) => {
    try {
      const { error } = await supabase.functions.invoke('admin-pricing', {
        body: { action: 'update_pricing', key, value },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pricing updated successfully",
      });

      await fetchPricing();
    } catch (error) {
      console.error('Error updating pricing:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update pricing",
        variant: "destructive",
      });
    }
  };

  const fetchTenants = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-pricing', {
        body: { action: 'get_tenants' },
      });

      if (error) throw error;
      setTenants(data.tenants || []);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tenants",
        variant: "destructive",
      });
    }
  };

  const addOverride = async (
    tenantId: string,
    overrideType: 'discount_percent' | 'free_access' | 'custom_price' | 'extended_trial',
    value: Record<string, unknown> | string | number | boolean | null,
    reason?: string,
    expiresAt?: string
  ) => {
    try {
      const { error } = await supabase.functions.invoke('admin-pricing', {
        body: { 
          action: 'add_override', 
          tenantId, 
          overrideType, 
          value, 
          reason, 
          expiresAt 
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Override added successfully",
      });

      await fetchTenants();
    } catch (error) {
      console.error('Error adding override:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add override",
        variant: "destructive",
      });
    }
  };

  const removeOverride = async (overrideId: string) => {
    try {
      const { error } = await supabase.functions.invoke('admin-pricing', {
        body: { action: 'remove_override', overrideId },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Override removed successfully",
      });

      await fetchTenants();
    } catch (error) {
      console.error('Error removing override:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove override",
        variant: "destructive",
      });
    }
  };

  const grantFreeAccess = async (tenantId: string, tier: 'starter' | 'pro', reason?: string) => {
    try {
      const { error } = await supabase.functions.invoke('admin-pricing', {
        body: { action: 'grant_free_access', tenantId, tier, reason },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Free ${tier} access granted successfully`,
      });

      await fetchTenants();
    } catch (error) {
      console.error('Error granting free access:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to grant free access",
        variant: "destructive",
      });
    }
  };

  return {
    isSuperAdmin,
    isLoading,
    pricing,
    tenants,
    fetchPricing,
    updatePricing,
    fetchTenants,
    addOverride,
    removeOverride,
    grantFreeAccess,
  };
}
