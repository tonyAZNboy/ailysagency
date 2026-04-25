import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTenants } from './useTenants';
import { toast } from 'sonner';

export interface Competitor {
  name: string;
  website?: string;
  notes?: string;
}

export interface SeoProfile {
  id: string;
  tenant_id: string;
  business_name: string;
  business_description: string | null;
  website_url: string | null;
  industry: string | null;
  target_keywords: string[];
  social_profiles: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  unique_selling_points: string[];
  service_areas: string[];
  founding_year: number | null;
  team_size: string | null;
  certifications: string[];
  awards: string[];
  ai_visibility_score: number;
  last_score_calculated_at: string | null;
  // New fields
  competitors: Competitor[];
  brand_voice: string | null;
  brand_tone_keywords: string[];
  content_themes: string[];
  target_audience: string | null;
  communication_style: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeoProfileInput {
  business_name: string;
  business_description?: string;
  website_url?: string;
  industry?: string;
  target_keywords?: string[];
  social_profiles?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  unique_selling_points?: string[];
  service_areas?: string[];
  founding_year?: number | null;
  team_size?: string;
  certifications?: string[];
  awards?: string[];
  // New fields
  competitors?: Competitor[];
  brand_voice?: string;
  brand_tone_keywords?: string[];
  content_themes?: string[];
  target_audience?: string;
  communication_style?: string;
}

export const useSeoProfile = () => {
  const { activeTenantId } = useTenants();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['seo-profile', activeTenantId],
    queryFn: async () => {
      if (!activeTenantId) return null;

      const { data, error } = await supabase
        .from('tenant_seo_profiles')
        .select('*')
        .eq('tenant_id', activeTenantId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        return {
          ...data,
          target_keywords: data.target_keywords as string[] || [],
          social_profiles: data.social_profiles as SeoProfile['social_profiles'] || {},
          unique_selling_points: data.unique_selling_points as string[] || [],
          service_areas: data.service_areas as string[] || [],
          certifications: data.certifications as string[] || [],
          awards: data.awards as string[] || [],
          competitors: (data.competitors as unknown as Competitor[]) || [],
          brand_tone_keywords: data.brand_tone_keywords as string[] || [],
          content_themes: data.content_themes as string[] || [],
        } as SeoProfile;
      }
      
      return null;
    },
    enabled: !!activeTenantId,
  });

  const upsertMutation = useMutation({
    mutationFn: async (input: SeoProfileInput) => {
      if (!activeTenantId) throw new Error('No active tenant');

      const payload = {
        tenant_id: activeTenantId,
        business_name: input.business_name,
        business_description: input.business_description || null,
        website_url: input.website_url || null,
        industry: input.industry || null,
        target_keywords: input.target_keywords || [],
        social_profiles: input.social_profiles || {},
        unique_selling_points: input.unique_selling_points || [],
        service_areas: input.service_areas || [],
        founding_year: input.founding_year || null,
        team_size: input.team_size || null,
        certifications: input.certifications || [],
        awards: input.awards || [],
        competitors: input.competitors || [],
        brand_voice: input.brand_voice || 'professional',
        brand_tone_keywords: input.brand_tone_keywords || [],
        content_themes: input.content_themes || [],
        target_audience: input.target_audience || null,
        communication_style: input.communication_style || 'balanced',
      };

      const { data, error } = await supabase
        .from('tenant_seo_profiles')
        .upsert(payload as any, { onConflict: 'tenant_id' })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo-profile', activeTenantId] });
      toast.success('Business SEO profile saved successfully');
    },
    onError: (error) => {
      console.error('Failed to save SEO profile:', error);
      toast.error('Failed to save SEO profile');
    },
  });

  return {
    profile,
    isLoading,
    error,
    saveProfile: upsertMutation.mutate,
    isSaving: upsertMutation.isPending,
    hasProfile: !!profile,
  };
};
