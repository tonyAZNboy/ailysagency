import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { useEngagementAddon } from "./useEngagementAddon";

interface DomainAddonStatus {
  hasSpeedBoost: boolean;
  hasShield: boolean;
  speedBoostDomains: number;
  shieldDomains: number;
}

interface DashboardAddons {
  // Engagement suite
  hasLoyalty: boolean;
  hasReminders: boolean;
  hasSms: boolean;
  hasEngagementSuite: boolean;
  // Domain add-ons
  hasSpeedBoost: boolean;
  hasShield: boolean;
  speedBoostDomains: number;
  shieldDomains: number;
  // Aggregate
  hasAnyAddon: boolean;
  isLoading: boolean;
}

export function useDashboardAddons(): DashboardAddons {
  const { activeTenantId } = useTenants();
  const { hasLoyalty, hasReminders, hasSms, hasAnyAddon: hasAnyEngagement, isLoading: engagementLoading } = useEngagementAddon();
  const [domainAddons, setDomainAddons] = useState<DomainAddonStatus>({
    hasSpeedBoost: false,
    hasShield: false,
    speedBoostDomains: 0,
    shieldDomains: 0,
  });
  const [domainLoading, setDomainLoading] = useState(true);

  const fetchDomainAddons = useCallback(async () => {
    if (!activeTenantId) {
      setDomainAddons({ hasSpeedBoost: false, hasShield: false, speedBoostDomains: 0, shieldDomains: 0 });
      setDomainLoading(false);
      return;
    }

    try {
      // Check domain verifications for speed boost
      const { data: verifications } = await supabase
        .from('domain_verifications')
        .select('id, status')
        .eq('tenant_id', activeTenantId)
        .eq('status', 'active');

      // Check domain shield entries
      const { data: shields } = await supabase
        .from('domain_shield_domains')
        .select('id, is_active')
        .eq('tenant_id', activeTenantId)
        .eq('is_active', true);

      const speedBoostCount = verifications?.length || 0;
      const shieldCount = shields?.length || 0;

      setDomainAddons({
        hasSpeedBoost: speedBoostCount > 0,
        hasShield: shieldCount > 0,
        speedBoostDomains: speedBoostCount,
        shieldDomains: shieldCount,
      });
    } catch (error) {
      console.error('Error fetching domain addon statuses:', error);
    } finally {
      setDomainLoading(false);
    }
  }, [activeTenantId]);

  useEffect(() => {
    fetchDomainAddons();
  }, [fetchDomainAddons]);

  const hasEngagementSuite = hasLoyalty || hasReminders || hasSms;
  const hasAnyAddon = hasAnyEngagement || domainAddons.hasSpeedBoost || domainAddons.hasShield;

  return {
    hasLoyalty,
    hasReminders,
    hasSms,
    hasEngagementSuite,
    hasSpeedBoost: domainAddons.hasSpeedBoost,
    hasShield: domainAddons.hasShield,
    speedBoostDomains: domainAddons.speedBoostDomains,
    shieldDomains: domainAddons.shieldDomains,
    hasAnyAddon,
    isLoading: engagementLoading || domainLoading,
  };
}
