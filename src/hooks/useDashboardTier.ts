import { useState } from "react";
import { usePricing } from "./usePricing";
import { useSuperAdmin } from "./useSuperAdmin";

export type DashboardTier = 'starter' | 'pro' | 'max';

export function useDashboardTier() {
  const { subscription } = usePricing();
  const { isSuperAdmin } = useSuperAdmin();
  const [tierOverride, setTierOverride] = useState<DashboardTier | null>(null);

  const actualTier: DashboardTier = subscription?.tier || 'starter';
  const effectiveTier: DashboardTier = (isSuperAdmin && tierOverride) ? tierOverride : actualTier;
  const isPreviewMode = isSuperAdmin && tierOverride !== null && tierOverride !== actualTier;

  return {
    actualTier,
    effectiveTier,
    isPreviewMode,
    isSuperAdmin,
    tierOverride,
    setTierOverride,
  };
}
