import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { useTenants } from '@/hooks/useTenants';
import { getIndustryById, IndustryConfig } from '@/config/industries';

export interface SmartOnboardingStep {
  key: string;
  label: string;
  route: string | null;
  completed: boolean;
  skipped: boolean;
  required: boolean;
}

export interface GbpLocation {
  name: string;
  address: string | null;
  city: string | null;
  googleLocationId: string;
  googleAccountId: string;
  placeId: string | null;
  mapsUri: string | null;
}

export interface SmartOnboardingState {
  // Industry selection
  selectedIndustry: string | null;
  industryConfig: IndustryConfig | null;

  // Platform connections
  googleConnected: boolean;
  // Locations from GBP
  selectedLocations: GbpLocation[];
  provisionedLocationCount: number;

  // Website
  websiteUrl: string;
  websiteScraped: boolean;
  scrapedData: Record<string, unknown>;

  // Documents
  documentsUploaded: Array<{ name: string; url: string; type: string }>;

  // Profile
  profileData: {
    businessName: string;
    description: string;
    industry: string;
    tagline?: string;
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
    services?: string[];
    keywords?: string[];
    serviceAreas?: string[];
    uniqueSellingPoints?: string[];
    socialMedia?: {
      facebook?: string | null;
      instagram?: string | null;
      tiktok?: string | null;
      yelp?: string | null;
      youtube?: string | null;
    };
    bookingUrl?: string;
    priceRange?: string;
    paymentMethods?: string[];
    languages?: string[];
    certifications?: string[];
    yearEstablished?: string;
    teamSize?: string;
    // Business DNA fields
    targetAudience?: string;
    brandToneKeywords?: string[];
    contentThemes?: string[];
    competitorSuggestions?: Array<{ name: string; website?: string }>;
    faqSuggestions?: Array<{ question: string; answer: string }>;
  };
  
  // Progress
  currentStep: number;
  isComplete: boolean;
  knowledgeScore: number;
}

const INITIAL_STATE: SmartOnboardingState = {
  selectedIndustry: null,
  industryConfig: null,
  googleConnected: false,
  selectedLocations: [],
  provisionedLocationCount: 0,
  websiteUrl: '',
  websiteScraped: false,
  scrapedData: {},
  documentsUploaded: [],
  profileData: {
    businessName: '',
    description: '',
    industry: '',
  },
  currentStep: 0,
  isComplete: false,
  knowledgeScore: 0,
};

export function useSmartOnboarding() {
  const { user } = useAuth();
  const { activeTenantId } = useTenants();
  const [state, setState] = useState<SmartOnboardingState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load saved progress
  const loadProgress = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('onboarding_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const industry = data.selected_industry ? getIndustryById(data.selected_industry) : null;
        const connectionsStatus = (data.connections_status as Record<string, unknown>) || {};
        const scrapedData = (data.scraped_data as Record<string, unknown>) || {};
        const stepsCompleted = (data.steps_completed as Record<string, boolean>) || {};

        setState(prev => ({
          ...prev,
          selectedIndustry: data.selected_industry || null,
          industryConfig: industry || null,
          websiteUrl: data.website_url || '',
          websiteScraped: !!scrapedData.website,
          scrapedData: scrapedData,
          googleConnected: connectionsStatus.google === 'connected',
          profileData: {
            businessName: scrapedData.businessName || scrapedData.website?.businessName || '',
            description: scrapedData.description || scrapedData.website?.description || '',
            industry: data.selected_industry || '',
            tagline: scrapedData.tagline || scrapedData.website?.tagline,
            address: scrapedData.address || scrapedData.website?.address,
            phone: scrapedData.phone || scrapedData.website?.phone,
            email: scrapedData.email || scrapedData.website?.email,
            hours: scrapedData.hours || scrapedData.website?.hours,
            services: scrapedData.services || scrapedData.website?.services,
            keywords: industry?.seoKeywords || scrapedData.keywords || scrapedData.website?.keywords,
            serviceAreas: scrapedData.serviceAreas || scrapedData.website?.serviceAreas,
            uniqueSellingPoints: scrapedData.uniqueSellingPoints || scrapedData.website?.uniqueSellingPoints,
            socialMedia: scrapedData.socialMedia || scrapedData.website?.socialMedia,
            bookingUrl: scrapedData.bookingUrl || scrapedData.website?.bookingUrl,
            priceRange: scrapedData.priceRange || scrapedData.website?.priceRange,
            paymentMethods: scrapedData.paymentMethods || scrapedData.website?.paymentMethods,
            languages: scrapedData.languages || scrapedData.website?.languages,
            certifications: scrapedData.certifications || scrapedData.website?.certifications,
            yearEstablished: scrapedData.yearEstablished || scrapedData.website?.yearEstablished,
            teamSize: scrapedData.teamSize || scrapedData.website?.teamSize,
            // Business DNA fields
            targetAudience: scrapedData.targetAudience || scrapedData.website?.targetAudience,
            brandToneKeywords: scrapedData.brandToneKeywords || scrapedData.website?.brandToneKeywords,
            contentThemes: scrapedData.contentThemes || scrapedData.website?.contentThemes,
            competitorSuggestions: scrapedData.competitorSuggestions || scrapedData.website?.competitorSuggestions,
            faqSuggestions: scrapedData.faqSuggestions || scrapedData.website?.faqSuggestions,
          },
          isComplete: data.onboarding_completed || false,
          knowledgeScore: calculateKnowledgeScore(scrapedData, connectionsStatus, data.selected_industry),
        }));
      }
    } catch (err) {
      console.error('Error loading onboarding progress:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Auto-detect Google connection
  useEffect(() => {
    const checkGoogleConnection = async () => {
      if (!activeTenantId) return;

      const { count } = await supabase
        .from('google_accounts')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', activeTenantId);

      if (count && count > 0) {
        setState(prev => ({ ...prev, googleConnected: true }));
        await saveConnectionStatus('google', 'connected');
      }
    };

    checkGoogleConnection();
  }, [activeTenantId]);

  // Save industry selection — MERGE steps_completed instead of overwriting
  const selectIndustry = async (industry: IndustryConfig) => {
    if (!user) return;

    setState(prev => ({
      ...prev,
      selectedIndustry: industry.id,
      industryConfig: industry,
      profileData: {
        ...prev.profileData,
        industry: industry.id,
        keywords: industry.seoKeywords,
      },
    }));

    try {
      // Fetch current steps_completed first to merge
      const { data: current } = await supabase
        .from('onboarding_progress')
        .select('steps_completed')
        .eq('user_id', user.id)
        .single();

      const existingSteps = (current?.steps_completed as Record<string, boolean>) || {};

      await supabase
        .from('onboarding_progress')
        .update({
          selected_industry: industry.id,
          steps_completed: { ...existingSteps, welcome_seen: true, industry_selected: true },
        })
        .eq('user_id', user.id);
    } catch (err) {
      console.error('Error saving industry:', err);
    }
  };

  // Save connection status
  const saveConnectionStatus = async (platform: string, status: string) => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('onboarding_progress')
        .select('connections_status')
        .eq('user_id', user.id)
        .single();

      const currentStatus = (data?.connections_status as Record<string, unknown>) || {};
      
      await supabase
        .from('onboarding_progress')
        .update({
          connections_status: { ...currentStatus, [platform]: status },
        })
        .eq('user_id', user.id);
    } catch (err) {
      console.error('Error saving connection status:', err);
    }
  };

  // Save scraped data
  const saveScrapedData = async (data: Record<string, unknown>) => {
    if (!user) return;

    const newScrapedData = { ...state.scrapedData, website: data };
    
    setState(prev => ({
      ...prev,
      websiteScraped: true,
      scrapedData: newScrapedData,
      profileData: {
        ...prev.profileData,
        businessName: data.businessName || prev.profileData.businessName,
        description: data.description || prev.profileData.description,
        tagline: data.tagline || prev.profileData.tagline,
        address: data.address || prev.profileData.address,
        phone: data.phone || prev.profileData.phone,
        email: data.email || prev.profileData.email,
        hours: data.hours || prev.profileData.hours,
        services: data.services || prev.profileData.services,
        keywords: data.keywords || prev.profileData.keywords,
        serviceAreas: data.serviceAreas || prev.profileData.serviceAreas,
        uniqueSellingPoints: data.uniqueSellingPoints || prev.profileData.uniqueSellingPoints,
        socialMedia: data.socialMedia || prev.profileData.socialMedia,
        bookingUrl: data.bookingUrl || prev.profileData.bookingUrl,
        priceRange: data.priceRange || prev.profileData.priceRange,
        paymentMethods: data.paymentMethods || prev.profileData.paymentMethods,
        languages: data.languages || prev.profileData.languages,
        certifications: data.certifications || prev.profileData.certifications,
        yearEstablished: data.yearEstablished || prev.profileData.yearEstablished,
        teamSize: data.teamSize || prev.profileData.teamSize,
        // Business DNA fields
        targetAudience: data.targetAudience || prev.profileData.targetAudience,
        brandToneKeywords: data.brandToneKeywords || prev.profileData.brandToneKeywords,
        contentThemes: data.contentThemes || prev.profileData.contentThemes,
        competitorSuggestions: data.competitorSuggestions || prev.profileData.competitorSuggestions,
        faqSuggestions: data.faqSuggestions || prev.profileData.faqSuggestions,
      },
      knowledgeScore: calculateKnowledgeScore(newScrapedData, {
        google: state.googleConnected ? 'connected' : undefined,
      }, state.selectedIndustry),
    }));

    try {
      await supabase
        .from('onboarding_progress')
        .update({
          scraped_data: newScrapedData,
          website_url: state.websiteUrl,
        })
        .eq('user_id', user.id);
    } catch (err) {
      console.error('Error saving scraped data:', err);
    }
  };

  // Update profile data
  const updateProfileData = (data: Partial<SmartOnboardingState['profileData']>) => {
    setState(prev => ({
      ...prev,
      profileData: { ...prev.profileData, ...data },
    }));
  };

  // Add uploaded document
  const addDocument = (doc: { name: string; url: string; type: string }) => {
    setState(prev => ({
      ...prev,
      documentsUploaded: [...prev.documentsUploaded, doc],
    }));
  };

  // Set selected locations from GBP
  const setSelectedLocations = (locations: GbpLocation[]) => {
    setState(prev => ({ ...prev, selectedLocations: locations }));
  };

  // Set website URL
  const setWebsiteUrl = (url: string) => {
    setState(prev => ({ ...prev, websiteUrl: url }));
  };

  // Go to next step
  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  // Go to previous step
  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  };

  // Skip current step
  const skipStep = async (stepKey: string) => {
    await saveConnectionStatus(stepKey, 'skipped');
    nextStep();
  };

  // Complete onboarding — parallel saves + tenant_seo_profiles upsert
  const completeOnboarding = async () => {
    if (!user || !activeTenantId) return;

    setSaving(true);
    try {
      // Fetch current steps to merge (needed before parallel writes)
      const { data: current } = await supabase
        .from('onboarding_progress')
        .select('steps_completed')
        .eq('user_id', user.id)
        .single();

      const existingSteps = (current?.steps_completed as Record<string, boolean>) || {};

      const syncedSteps = {
        ...existingSteps,
        welcome_seen: true,
        industry_selected: true,
        google_connected: state.googleConnected || existingSteps.google_connected || false,
        location_added: existingSteps.location_added || false,
        first_content_created: existingSteps.first_content_created || false,
        calendar_viewed: existingSteps.calendar_viewed || false,
      };

      // Build social_profiles for SEO profile table
      const sm = state.profileData.socialMedia || {};
      const socialProfiles: Record<string, string> = {};
      if (sm.facebook) socialProfiles.facebook = sm.facebook;
      if (sm.instagram) socialProfiles.instagram = sm.instagram;
      if (sm.youtube) socialProfiles.youtube = sm.youtube;

      // Run ALL saves in parallel (3 independent operations)
      await Promise.all([
        // 1. Save industry to tenant
        supabase
          .from('tenants')
          .update({ industry: state.selectedIndustry })
          .eq('id', activeTenantId),

        // 2. Mark onboarding as complete
        supabase
          .from('onboarding_progress')
          .update({
            onboarding_completed: true,
            completed_at: new Date().toISOString(),
            steps_completed: syncedSteps,
            scraped_data: {
              ...state.scrapedData,
              profile: state.profileData,
            },
          })
          .eq('user_id', user.id),

        // 3. Upsert tenant_seo_profiles — flows ALL onboarding data into SEO profile
        supabase
          .from('tenant_seo_profiles')
          .upsert({
            tenant_id: activeTenantId,
            business_name: state.profileData.businessName || '',
            business_description: state.profileData.description || null,
            website_url: state.websiteUrl || null,
            industry: state.selectedIndustry || null,
            target_keywords: state.profileData.keywords || [],
            unique_selling_points: state.profileData.uniqueSellingPoints || [],
            service_areas: state.profileData.serviceAreas || [],
            certifications: state.profileData.certifications || [],
            social_profiles: socialProfiles,
            // Business DNA fields
            target_audience: state.profileData.targetAudience || null,
            brand_tone_keywords: state.profileData.brandToneKeywords || [],
            content_themes: state.profileData.contentThemes || [],
            competitors: state.profileData.competitorSuggestions || [],
          } as never, { onConflict: 'tenant_id' }),
      ]);

      // --- AUTOPILOT: Provision selected GBP locations ---
      let provisionedCount = 0;
      if (state.selectedLocations.length > 0 && activeTenantId) {
        try {
          // Get the industry characteristics from config
          const industryConfig = state.selectedIndustry ? getIndustryById(state.selectedIndustry) : null;
          const characteristics = state.profileData.uniqueSellingPoints?.length
            ? state.profileData.uniqueSellingPoints
            : industryConfig?.characteristics || [];

          for (const loc of state.selectedLocations) {
            // Insert location
            const { data: insertedLoc, error: locErr } = await supabase
              .from('locations')
              .insert({
                tenant_id: activeTenantId,
                google_account_id: loc.googleAccountId,
                google_location_id: loc.googleLocationId,
                name: loc.name,
                address: loc.address,
                city: loc.city,
                business_type: state.selectedIndustry || 'general',
                seo_keywords: state.profileData.keywords || [],
                business_characteristics: characteristics,
                nfc_mode: 'instant_review',
              })
              .select('id')
              .single();

            if (locErr) {
              console.error('Error inserting location:', locErr);
              continue;
            }

            // Auto-create review link from placeId
            if (insertedLoc && loc.placeId) {
              const reviewUrl = `https://search.google.com/local/writereview?placeid=${loc.placeId}`;
              await supabase.from('review_links').insert({
                location_id: insertedLoc.id,
                tenant_id: activeTenantId,
                url: reviewUrl,
              });
            }

            provisionedCount++;
          }
        } catch (err) {
          console.error('Error provisioning locations:', err);
        }
      }

      setState(prev => ({ ...prev, isComplete: true, provisionedLocationCount: provisionedCount }));
    } catch (err) {
      console.error('Error completing onboarding:', err);
    } finally {
      setSaving(false);
    }
  };

  // Skip onboarding entirely — marks as skipped so wizard won't show again
  const skipOnboarding = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await supabase
        .from('onboarding_progress')
        .update({
          onboarding_completed: true,
          onboarding_skipped: true,
          completed_at: new Date().toISOString(),
          steps_completed: { welcome_seen: true },
        })
        .eq('user_id', user.id);

      setState(prev => ({ ...prev, isComplete: true }));
    } catch (err) {
      console.error('Error skipping onboarding:', err);
    } finally {
      setSaving(false);
    }
  };

  // Get list of steps for header
  const getSteps = (): SmartOnboardingStep[] => {
    return [
      {
        key: 'industry',
        label: 'Select Industry',
        route: null,
        completed: !!state.selectedIndustry,
        skipped: false,
        required: true,
      },
      {
        key: 'google',
        label: 'Connect Google Business',
        route: '/locations',
        completed: state.googleConnected,
        skipped: false,
        required: false,
      },
      {
        key: 'locations',
        label: 'Select Locations',
        route: null,
        completed: state.selectedLocations.length > 0,
        skipped: false,
        required: false,
      },
      {
        key: 'website',
        label: 'Add Website',
        route: '/settings/business-profile',
        completed: state.websiteScraped,
        skipped: false,
        required: false,
      },
      {
        key: 'documents',
        label: 'Upload Documents',
        route: '/settings/business-profile',
        completed: state.documentsUploaded.length > 0,
        skipped: false,
        required: false,
      },
    ];
  };

  // Get skipped steps for display (removed Facebook/Instagram — not yet available)
  const getSkippedSteps = (): string[] => {
    const skipped: string[] = [];
    if (!state.googleConnected) skipped.push('Connect Google Business for review management');
    if (!state.websiteScraped) skipped.push('Add website for AI knowledge');
    if (state.documentsUploaded.length === 0 && state.industryConfig?.needsMenu) {
      skipped.push('Upload menu/services for customer questions');
    }
    return skipped;
  };

  return {
    state,
    loading,
    saving,
    steps: getSteps(),
    skippedSteps: getSkippedSteps(),
    selectIndustry,
    setSelectedLocations,
    setWebsiteUrl,
    saveScrapedData,
    updateProfileData,
    addDocument,
    nextStep,
    prevStep,
    skipStep,
    completeOnboarding,
    skipOnboarding,
    saveConnectionStatus,
    refetch: loadProgress,
  };
}

function calculateKnowledgeScore(
  scrapedData: Record<string, unknown>,
  connections: Record<string, unknown>,
  selectedIndustry?: string | null
): number {
  let score = 0;

  // Platform connections (20 points max)
  if (connections.google === 'connected') score += 20;

  // Industry selection (10 points)
  if (selectedIndustry || scrapedData.industry) score += 10;

  // Website data — core fields (35 points max)
  const website = scrapedData.website || scrapedData;
  if (website.businessName) score += 8;
  if (website.description) score += 8;
  if (website.services?.length > 0) score += 7;
  if (website.phone) score += 3;
  if (website.email) score += 3;
  if (website.address) score += 3;
  if (website.hours) score += 3;

  // Website data — extended fields (20 points max)
  if (website.keywords?.length > 0) score += 3;
  if (website.serviceAreas?.length > 0) score += 3;
  if (website.uniqueSellingPoints?.length > 0) score += 2;
  if (website.socialMedia && Object.values(website.socialMedia).some((v: unknown) => v)) score += 3;
  if (website.bookingUrl) score += 2;
  if (website.priceRange) score += 2;
  if (website.certifications?.length > 0) score += 2;
  if (website.tagline) score += 1;
  if (website.paymentMethods?.length > 0) score += 1;
  if (website.languages?.length > 0) score += 1;

  // Documents (15 points)
  if (scrapedData.documents?.length > 0) score += 15;

  return Math.min(100, score);
}
