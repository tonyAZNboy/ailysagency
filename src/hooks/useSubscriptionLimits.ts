import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";

interface SubscriptionLimits {
  plan: {
    name: string;
    max_locations: number | null;
    max_reviews: number | null;
    ai_suggestions_per_review: number;
    ai_posts_per_day: number | null;
  } | null;
  usage: {
    locations_count: number;
    reviews_count: number;
  };
  canAddLocation: boolean;
  canAddReview: boolean;
  isLoading: boolean;
}

export function useSubscriptionLimits() {
  const { activeTenantId } = useTenants();
  const [limits, setLimits] = useState<SubscriptionLimits>({
    plan: null,
    usage: {
      locations_count: 0,
      reviews_count: 0,
    },
    canAddLocation: true,
    canAddReview: true,
    isLoading: true,
  });

  useEffect(() => {
    if (activeTenantId) {
      fetchLimits();
    }
  }, [activeTenantId]);

  const fetchLimits = async () => {
    if (!activeTenantId) return;

    try {
      // Get subscription and plan details
      const { data: subData } = await supabase.rpc('get_tenant_subscription', {
        _tenant_id: activeTenantId
      });

      const parsedData = subData as any;
      const subscription = parsedData?.subscription;
      const plan = parsedData?.plan;

      // Get current usage
      const { data: locations } = await supabase
        .from('locations')
        .select('id', { count: 'exact', head: true })
        .eq('tenant_id', activeTenantId);

      const { data: reviews } = await supabase
        .from('reviews')
        .select('id', { count: 'exact', head: true })
        .eq('tenant_id', activeTenantId);

      const locationsCount = locations?.length || 0;
      const reviewsCount = reviews?.length || 0;

      // If no plan exists, allow unlimited (no subscription = free tier with no limits for now)
      const canAddLocation = !plan || plan.max_locations === null || locationsCount < plan.max_locations;
      const canAddReview = !plan || plan.max_reviews === null || reviewsCount < plan.max_reviews;

      setLimits({
        plan,
        usage: {
          locations_count: locationsCount,
          reviews_count: reviewsCount,
        },
        canAddLocation,
        canAddReview,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching subscription limits:', error);
      setLimits(prev => ({ ...prev, isLoading: false }));
    }
  };

  return limits;
}
