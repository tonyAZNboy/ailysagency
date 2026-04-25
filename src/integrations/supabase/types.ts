export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      addon_products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          feature_key: string
          id: string
          name: string
          price_monthly: number
          stripe_price_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          feature_key: string
          id?: string
          name: string
          price_monthly: number
          stripe_price_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          feature_key?: string
          id?: string
          name?: string
          price_monthly?: number
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      agent_conversations: {
        Row: {
          created_at: string
          id: string
          mode: string
          settings: Json | null
          tenant_id: string
          title: string | null
          updated_at: string
          user_id: string
          visitor_session_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          mode?: string
          settings?: Json | null
          tenant_id: string
          title?: string | null
          updated_at?: string
          user_id: string
          visitor_session_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          mode?: string
          settings?: Json | null
          tenant_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
          visitor_session_id?: string | null
        }
        Relationships: []
      }
      agent_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tasks: {
        Row: {
          completed_at: string | null
          conversation_id: string
          created_at: string
          error_message: string | null
          id: string
          input_data: Json | null
          output_data: Json | null
          status: string
          task_type: string
        }
        Insert: {
          completed_at?: string | null
          conversation_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          status?: string
          task_type: string
        }
        Update: {
          completed_at?: string | null
          conversation_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          status?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_tasks_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_engine_events: {
        Row: {
          conversation_id: string | null
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          mode: string
          tenant_id: string | null
          visitor_session_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          mode?: string
          tenant_id?: string | null
          visitor_session_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          mode?: string
          tenant_id?: string | null
          visitor_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_engine_events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_engine_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_generation_schedule: {
        Row: {
          category: string
          created_at: string | null
          generated: boolean | null
          id: string
          post_id: string | null
          scheduled_for: string
          topic: string
        }
        Insert: {
          category: string
          created_at?: string | null
          generated?: boolean | null
          id?: string
          post_id?: string | null
          scheduled_for: string
          topic: string
        }
        Update: {
          category?: string
          created_at?: string | null
          generated?: boolean | null
          id?: string
          post_id?: string | null
          scheduled_for?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_generation_schedule_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_translations: {
        Row: {
          content: string
          created_at: string
          excerpt: string
          featured_image_alt: string | null
          id: string
          lang: string
          meta_description: string | null
          meta_keywords: string[] | null
          post_id: string
          schema_markup: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          excerpt: string
          featured_image_alt?: string | null
          id?: string
          lang: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          post_id: string
          schema_markup?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string
          featured_image_alt?: string | null
          id?: string
          lang?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          post_id?: string
          schema_markup?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_translations_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string
          featured_image_alt: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          published_at: string | null
          read_time_minutes: number | null
          scheduled_for: string | null
          schema_markup: Json | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          featured_image_alt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          published_at?: string | null
          read_time_minutes?: number | null
          scheduled_for?: string | null
          schema_markup?: Json | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          featured_image_alt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          published_at?: string | null
          read_time_minutes?: number | null
          scheduled_for?: string | null
          schema_markup?: Json | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      campaign_entries: {
        Row: {
          campaign_id: string
          created_at: string
          customer_email: string
          customer_name: string | null
          id: string
          ip_address: string | null
          is_valid: boolean
          source: string
          tenant_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          customer_email: string
          customer_name?: string | null
          id?: string
          ip_address?: string | null
          is_valid?: boolean
          source?: string
          tenant_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          id?: string
          ip_address?: string | null
          is_valid?: boolean
          source?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_entries_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_entries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_winners: {
        Row: {
          campaign_id: string
          claim_status: string | null
          claimed_at: string | null
          customer_email: string
          customer_name: string | null
          entry_id: string
          id: string
          position: number
          selected_at: string
          tenant_id: string
        }
        Insert: {
          campaign_id: string
          claim_status?: string | null
          claimed_at?: string | null
          customer_email: string
          customer_name?: string | null
          entry_id: string
          id?: string
          position: number
          selected_at?: string
          tenant_id: string
        }
        Update: {
          campaign_id?: string
          claim_status?: string | null
          claimed_at?: string | null
          customer_email?: string
          customer_name?: string | null
          entry_id?: string
          id?: string
          position?: number
          selected_at?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_winners_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_winners_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "campaign_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_winners_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          claim_deadline: string | null
          created_at: string
          description: string | null
          draw_datetime: string | null
          end_date: string
          excluded_persons: string | null
          id: string
          jurisdiction: string | null
          location_ids: string[] | null
          name: string
          prize_description: string | null
          prize_value: number | null
          random_seed: string | null
          require_email: boolean
          require_google_review: boolean
          skill_testing_answer: string | null
          start_date: string
          status: string
          tenant_id: string
          total_entries_snapshot: number | null
          updated_at: string
          winner_count: number
        }
        Insert: {
          claim_deadline?: string | null
          created_at?: string
          description?: string | null
          draw_datetime?: string | null
          end_date: string
          excluded_persons?: string | null
          id?: string
          jurisdiction?: string | null
          location_ids?: string[] | null
          name: string
          prize_description?: string | null
          prize_value?: number | null
          random_seed?: string | null
          require_email?: boolean
          require_google_review?: boolean
          skill_testing_answer?: string | null
          start_date: string
          status?: string
          tenant_id: string
          total_entries_snapshot?: number | null
          updated_at?: string
          winner_count?: number
        }
        Update: {
          claim_deadline?: string | null
          created_at?: string
          description?: string | null
          draw_datetime?: string | null
          end_date?: string
          excluded_persons?: string | null
          id?: string
          jurisdiction?: string | null
          location_ids?: string[] | null
          name?: string
          prize_description?: string | null
          prize_value?: number | null
          random_seed?: string | null
          require_email?: boolean
          require_google_review?: boolean
          skill_testing_answer?: string | null
          start_date?: string
          status?: string
          tenant_id?: string
          total_entries_snapshot?: number | null
          updated_at?: string
          winner_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      characteristic_translations: {
        Row: {
          characteristic_key: string
          created_at: string | null
          id: string
          is_preset: boolean | null
          language_code: string
          location_id: string | null
          tenant_id: string
          translated_value: string
          updated_at: string | null
        }
        Insert: {
          characteristic_key: string
          created_at?: string | null
          id?: string
          is_preset?: boolean | null
          language_code: string
          location_id?: string | null
          tenant_id: string
          translated_value: string
          updated_at?: string | null
        }
        Update: {
          characteristic_key?: string
          created_at?: string | null
          id?: string
          is_preset?: boolean | null
          language_code?: string
          location_id?: string | null
          tenant_id?: string
          translated_value?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "characteristic_translations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characteristic_translations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      competitor_profiles: {
        Row: {
          address: string | null
          average_rating: number | null
          city: string | null
          created_at: string
          google_place_id: string | null
          has_response_presence: boolean | null
          id: string
          industry: string | null
          is_active: boolean | null
          last_scanned_at: string | null
          name: string
          review_count: number | null
          review_velocity_30d: number | null
          sentiment_approximation: Json | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          average_rating?: number | null
          city?: string | null
          created_at?: string
          google_place_id?: string | null
          has_response_presence?: boolean | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          last_scanned_at?: string | null
          name: string
          review_count?: number | null
          review_velocity_30d?: number | null
          sentiment_approximation?: Json | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          average_rating?: number | null
          city?: string | null
          created_at?: string
          google_place_id?: string | null
          has_response_presence?: boolean | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          last_scanned_at?: string | null
          name?: string
          review_count?: number | null
          review_velocity_30d?: number | null
          sentiment_approximation?: Json | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitor_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_settings: {
        Row: {
          communication_style: string
          conversation_id: string
          created_at: string | null
          id: string
          message_length: string
          mood: string
          updated_at: string | null
        }
        Insert: {
          communication_style?: string
          conversation_id: string
          created_at?: string | null
          id?: string
          message_length?: string
          mood?: string
          updated_at?: string | null
        }
        Update: {
          communication_style?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          message_length?: string
          mood?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_settings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_checkins: {
        Row: {
          checked_in_at: string
          created_at: string
          customer_email: string
          customer_name: string | null
          id: string
          location_id: string
          notification_sent_at: string | null
          reminder_sent_at: string | null
          review_id: string | null
          review_submitted: boolean
          tenant_id: string
          token: string
        }
        Insert: {
          checked_in_at?: string
          created_at?: string
          customer_email: string
          customer_name?: string | null
          id?: string
          location_id: string
          notification_sent_at?: string | null
          reminder_sent_at?: string | null
          review_id?: string | null
          review_submitted?: boolean
          tenant_id: string
          token?: string
        }
        Update: {
          checked_in_at?: string
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          id?: string
          location_id?: string
          notification_sent_at?: string | null
          reminder_sent_at?: string | null
          review_id?: string | null
          review_submitted?: boolean
          tenant_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_checkins_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_checkins_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "customer_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_checkins_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_reviews: {
        Row: {
          ai_generated: boolean | null
          comment: string | null
          created_at: string
          customer_email: string
          customer_name: string | null
          id: string
          location_id: string
          media_urls: Json | null
          posted_to_google: boolean | null
          rating: number
          selected_characteristics: Json | null
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          comment?: string | null
          created_at?: string
          customer_email: string
          customer_name?: string | null
          id?: string
          location_id: string
          media_urls?: Json | null
          posted_to_google?: boolean | null
          rating: number
          selected_characteristics?: Json | null
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          comment?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          id?: string
          location_id?: string
          media_urls?: Json | null
          posted_to_google?: boolean | null
          rating?: number
          selected_characteristics?: Json | null
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_reviews_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_reviews_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_metrics: {
        Row: {
          ai_crawler_sources: Json | null
          ai_crawler_visits: number | null
          bandwidth_bytes: number | null
          cache_hit_rate: number | null
          created_at: string
          domain_verification_id: string
          id: string
          recorded_at: string
          requests_cached: number | null
          requests_total: number | null
          ttfb_ms: number | null
        }
        Insert: {
          ai_crawler_sources?: Json | null
          ai_crawler_visits?: number | null
          bandwidth_bytes?: number | null
          cache_hit_rate?: number | null
          created_at?: string
          domain_verification_id: string
          id?: string
          recorded_at?: string
          requests_cached?: number | null
          requests_total?: number | null
          ttfb_ms?: number | null
        }
        Update: {
          ai_crawler_sources?: Json | null
          ai_crawler_visits?: number | null
          bandwidth_bytes?: number | null
          cache_hit_rate?: number | null
          created_at?: string
          domain_verification_id?: string
          id?: string
          recorded_at?: string
          requests_cached?: number | null
          requests_total?: number | null
          ttfb_ms?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_metrics_domain_verification_id_fkey"
            columns: ["domain_verification_id"]
            isOneToOne: false
            referencedRelation: "domain_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_subscriptions: {
        Row: {
          created_at: string
          domain_id: string | null
          domain_type: string
          id: string
          is_included: boolean
          status: string
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain_id?: string | null
          domain_type: string
          id?: string
          is_included?: boolean
          status?: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain_id?: string | null
          domain_type?: string
          id?: string
          is_included?: boolean
          status?: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "domain_subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_verifications: {
        Row: {
          cache_ttl_seconds: number | null
          created_at: string
          dns_instructions: Json | null
          domain: string
          id: string
          is_primary: boolean | null
          last_checked_at: string | null
          next_check_at: string | null
          notification_sent: boolean | null
          speed_boost_enabled: boolean | null
          status: string
          tenant_id: string
          updated_at: string
          verification_attempts: number | null
          verification_method: string
          verification_token: string
          verified_at: string | null
        }
        Insert: {
          cache_ttl_seconds?: number | null
          created_at?: string
          dns_instructions?: Json | null
          domain: string
          id?: string
          is_primary?: boolean | null
          last_checked_at?: string | null
          next_check_at?: string | null
          notification_sent?: boolean | null
          speed_boost_enabled?: boolean | null
          status?: string
          tenant_id: string
          updated_at?: string
          verification_attempts?: number | null
          verification_method?: string
          verification_token?: string
          verified_at?: string | null
        }
        Update: {
          cache_ttl_seconds?: number | null
          created_at?: string
          dns_instructions?: Json | null
          domain?: string
          id?: string
          is_primary?: boolean | null
          last_checked_at?: string | null
          next_check_at?: string | null
          notification_sent?: boolean | null
          speed_boost_enabled?: boolean | null
          status?: string
          tenant_id?: string
          updated_at?: string
          verification_attempts?: number | null
          verification_method?: string
          verification_token?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_verifications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_reports: {
        Row: {
          competitor_analysis: Json | null
          created_at: string
          generated_at: string
          id: string
          pdf_url: string | null
          recommendations: Json | null
          report_month: string
          report_type: string
          sections: Json | null
          summary_html: string | null
          tenant_id: string
        }
        Insert: {
          competitor_analysis?: Json | null
          created_at?: string
          generated_at?: string
          id?: string
          pdf_url?: string | null
          recommendations?: Json | null
          report_month: string
          report_type?: string
          sections?: Json | null
          summary_html?: string | null
          tenant_id: string
        }
        Update: {
          competitor_analysis?: Json | null
          created_at?: string
          generated_at?: string
          id?: string
          pdf_url?: string | null
          recommendations?: Json | null
          report_month?: string
          report_type?: string
          sections?: Json | null
          summary_html?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "executive_reports_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      facebook_accounts: {
        Row: {
          created_at: string
          facebook_page_id: string | null
          facebook_user_id: string
          id: string
          is_primary: boolean | null
          long_lived_token: string | null
          page_access_token: string | null
          page_name: string
          tenant_id: string
          token_expires_at: string | null
          user_access_token: string
        }
        Insert: {
          created_at?: string
          facebook_page_id?: string | null
          facebook_user_id: string
          id?: string
          is_primary?: boolean | null
          long_lived_token?: string | null
          page_access_token?: string | null
          page_name?: string
          tenant_id: string
          token_expires_at?: string | null
          user_access_token: string
        }
        Update: {
          created_at?: string
          facebook_page_id?: string | null
          facebook_user_id?: string
          id?: string
          is_primary?: boolean | null
          long_lived_token?: string | null
          page_access_token?: string | null
          page_name?: string
          tenant_id?: string
          token_expires_at?: string | null
          user_access_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "facebook_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      google_accounts: {
        Row: {
          access_token: string
          created_at: string | null
          display_name: string
          google_account_id: string
          id: string
          is_primary: boolean | null
          refresh_token: string
          tenant_id: string
          token_expires_at: string | null
        }
        Insert: {
          access_token: string
          created_at?: string | null
          display_name?: string
          google_account_id: string
          id?: string
          is_primary?: boolean | null
          refresh_token: string
          tenant_id: string
          token_expires_at?: string | null
        }
        Update: {
          access_token?: string
          created_at?: string | null
          display_name?: string
          google_account_id?: string
          id?: string
          is_primary?: boolean | null
          refresh_token?: string
          tenant_id?: string
          token_expires_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_faq_templates: {
        Row: {
          answer_template: string
          created_at: string | null
          id: string
          industry: string
          placeholder_fields: Json | null
          question: string
          sort_order: number | null
        }
        Insert: {
          answer_template: string
          created_at?: string | null
          id?: string
          industry: string
          placeholder_fields?: Json | null
          question: string
          sort_order?: number | null
        }
        Update: {
          answer_template?: string
          created_at?: string | null
          id?: string
          industry?: string
          placeholder_fields?: Json | null
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      invites: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: Database["public"]["Enums"]["app_role"]
          status: string
          tenant_id: string
          token: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          tenant_id: string
          token?: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          tenant_id?: string
          token?: string
        }
        Relationships: []
      }
      landing_leads: {
        Row: {
          business_name: string | null
          chat_messages: Json | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          source: string | null
          status: string
        }
        Insert: {
          business_name?: string | null
          chat_messages?: Json | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          source?: string | null
          status?: string
        }
        Update: {
          business_name?: string | null
          chat_messages?: Json | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          source?: string | null
          status?: string
        }
        Relationships: []
      }
      location_subscriptions: {
        Row: {
          created_at: string
          id: string
          is_included: boolean
          location_id: string
          status: string
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_included?: boolean
          location_id: string
          status?: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_included?: boolean
          location_id?: string
          status?: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_subscriptions_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          business_characteristics: Json | null
          business_type: string | null
          checkin_spam_protection: boolean
          city: string | null
          created_at: string | null
          facebook_review_url: string | null
          followup_delay_hours: number
          followup_email_template: string | null
          google_account_id: string
          google_location_id: string
          id: string
          logo_url: string | null
          name: string
          negative_review_threshold: number | null
          nfc_mode: string
          redirect_negative_to_google: boolean | null
          secondary_review_platform: string | null
          send_reminder: boolean
          seo_keywords: Json | null
          synced_at: string | null
          tenant_id: string
          tripadvisor_review_url: string | null
          website_url: string | null
          whatsapp_phone: string | null
          yelp_review_url: string | null
        }
        Insert: {
          address?: string | null
          business_characteristics?: Json | null
          business_type?: string | null
          checkin_spam_protection?: boolean
          city?: string | null
          created_at?: string | null
          facebook_review_url?: string | null
          followup_delay_hours?: number
          followup_email_template?: string | null
          google_account_id: string
          google_location_id: string
          id?: string
          logo_url?: string | null
          name: string
          negative_review_threshold?: number | null
          nfc_mode?: string
          redirect_negative_to_google?: boolean | null
          secondary_review_platform?: string | null
          send_reminder?: boolean
          seo_keywords?: Json | null
          synced_at?: string | null
          tenant_id: string
          tripadvisor_review_url?: string | null
          website_url?: string | null
          whatsapp_phone?: string | null
          yelp_review_url?: string | null
        }
        Update: {
          address?: string | null
          business_characteristics?: Json | null
          business_type?: string | null
          checkin_spam_protection?: boolean
          city?: string | null
          created_at?: string | null
          facebook_review_url?: string | null
          followup_delay_hours?: number
          followup_email_template?: string | null
          google_account_id?: string
          google_location_id?: string
          id?: string
          logo_url?: string | null
          name?: string
          negative_review_threshold?: number | null
          nfc_mode?: string
          redirect_negative_to_google?: boolean | null
          secondary_review_platform?: string | null
          send_reminder?: boolean
          seo_keywords?: Json | null
          synced_at?: string | null
          tenant_id?: string
          tripadvisor_review_url?: string | null
          website_url?: string | null
          whatsapp_phone?: string | null
          yelp_review_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_google_account_id_fkey"
            columns: ["google_account_id"]
            isOneToOne: false
            referencedRelation: "google_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_google_account_id_fkey"
            columns: ["google_account_id"]
            isOneToOne: false
            referencedRelation: "google_accounts_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_cards: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          id: string
          last_visit_at: string | null
          points_balance: number
          program_id: string
          rewards_redeemed: number
          stamps_collected: number
          tenant_id: string
          tier_level: string | null
          total_spent_cents: number
          total_visits: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          last_visit_at?: string | null
          points_balance?: number
          program_id: string
          rewards_redeemed?: number
          stamps_collected?: number
          tenant_id: string
          tier_level?: string | null
          total_spent_cents?: number
          total_visits?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          last_visit_at?: string | null
          points_balance?: number
          program_id?: string
          rewards_redeemed?: number
          stamps_collected?: number
          tenant_id?: string
          tier_level?: string | null
          total_spent_cents?: number
          total_visits?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_cards_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "loyalty_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_cards_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_programs: {
        Row: {
          config: Json
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          program_type: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          program_type?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          program_type?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_programs_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_programs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_transactions: {
        Row: {
          amount: number
          card_id: string
          checkin_id: string | null
          created_at: string
          description: string | null
          id: string
          tenant_id: string
          transaction_type: string
        }
        Insert: {
          amount?: number
          card_id: string
          checkin_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          tenant_id: string
          transaction_type: string
        }
        Update: {
          amount?: number
          card_id?: string
          checkin_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          tenant_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_transactions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "loyalty_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_checkin_id_fkey"
            columns: ["checkin_id"]
            isOneToOne: false
            referencedRelation: "customer_checkins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          metadata: Json | null
          platform: string
          resource_id: string | null
          tenant_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          platform?: string
          resource_id?: string | null
          tenant_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          platform?: string
          resource_id?: string | null
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oauth_audit_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_callbacks: {
        Row: {
          code: string | null
          created_at: string
          error: string | null
          error_description: string | null
          state: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          error?: string | null
          error_description?: string | null
          state: string
        }
        Update: {
          code?: string | null
          created_at?: string
          error?: string | null
          error_description?: string | null
          state?: string
        }
        Relationships: []
      }
      oauth_states: {
        Row: {
          created_at: string
          state: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          state: string
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          state?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_progress: {
        Row: {
          completed_at: string | null
          connections_status: Json | null
          created_at: string | null
          id: string
          onboarding_completed: boolean | null
          onboarding_skipped: boolean | null
          scraped_data: Json | null
          selected_industry: string | null
          started_at: string | null
          steps_completed: Json | null
          tenant_id: string | null
          updated_at: string | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          completed_at?: string | null
          connections_status?: Json | null
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_skipped?: boolean | null
          scraped_data?: Json | null
          selected_industry?: string | null
          started_at?: string | null
          steps_completed?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          completed_at?: string | null
          connections_status?: Json | null
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_skipped?: boolean | null
          scraped_data?: Json | null
          selected_industry?: string | null
          started_at?: string | null
          steps_completed?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_progress_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          id: string
          product_name: string | null
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          product_name?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          product_name?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      platform_accounts: {
        Row: {
          access_token: string | null
          account_id: string
          account_name: string | null
          account_url: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          platform: string
          refresh_token: string | null
          tenant_id: string
          token_expires_at: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          account_id: string
          account_name?: string | null
          account_url?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: string
          refresh_token?: string | null
          tenant_id: string
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          account_id?: string
          account_name?: string | null
          account_url?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: string
          refresh_token?: string | null
          tenant_id?: string
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prelaunch_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          notified_at: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          notified_at?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          notified_at?: string | null
          source?: string | null
        }
        Relationships: []
      }
      pricing_config: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reminder_settings: {
        Row: {
          confirmation_required: boolean
          created_at: string
          custom_message: string | null
          id: string
          location_id: string | null
          no_show_tracking: boolean
          reminder_channel: string
          reminder_enabled: boolean
          reminder_hours_before: number
          tenant_id: string
          updated_at: string
        }
        Insert: {
          confirmation_required?: boolean
          created_at?: string
          custom_message?: string | null
          id?: string
          location_id?: string | null
          no_show_tracking?: boolean
          reminder_channel?: string
          reminder_enabled?: boolean
          reminder_hours_before?: number
          tenant_id: string
          updated_at?: string
        }
        Update: {
          confirmation_required?: boolean
          created_at?: string
          custom_message?: string | null
          id?: string
          location_id?: string | null
          no_show_tracking?: boolean
          reminder_channel?: string
          reminder_enabled?: boolean
          reminder_hours_before?: number
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminder_settings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminder_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      replies: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          posted_at: string | null
          reply_text: string
          reply_type: string
          review_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          posted_at?: string | null
          reply_text: string
          reply_type?: string
          review_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          posted_at?: string | null
          reply_text?: string
          reply_type?: string
          review_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replies_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reply_templates: {
        Row: {
          created_at: string | null
          id: string
          name: string
          template_text: string
          tenant_id: string
          tone: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string
          template_text: string
          tenant_id: string
          tone?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          template_text?: string
          tenant_id?: string
          tone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reply_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      reputation_snapshots: {
        Row: {
          average_rating: number | null
          created_at: string
          id: string
          keyword_frequency: Json | null
          location_id: string | null
          response_rate: number | null
          review_velocity: number | null
          sentiment_negative_pct: number | null
          sentiment_neutral_pct: number | null
          sentiment_positive_pct: number | null
          snapshot_date: string
          tenant_id: string
          top_emotions: Json | null
          top_topics: Json | null
          total_reviews: number | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string
          id?: string
          keyword_frequency?: Json | null
          location_id?: string | null
          response_rate?: number | null
          review_velocity?: number | null
          sentiment_negative_pct?: number | null
          sentiment_neutral_pct?: number | null
          sentiment_positive_pct?: number | null
          snapshot_date: string
          tenant_id: string
          top_emotions?: Json | null
          top_topics?: Json | null
          total_reviews?: number | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string
          id?: string
          keyword_frequency?: Json | null
          location_id?: string | null
          response_rate?: number | null
          review_velocity?: number | null
          sentiment_negative_pct?: number | null
          sentiment_neutral_pct?: number | null
          sentiment_positive_pct?: number | null
          snapshot_date?: string
          tenant_id?: string
          top_emotions?: Json | null
          top_topics?: Json | null
          total_reviews?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reputation_snapshots_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reputation_snapshots_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      review_links: {
        Row: {
          created_at: string | null
          id: string
          location_id: string
          tenant_id: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id: string
          tenant_id: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string
          tenant_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_links_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_links_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      review_sentiment: {
        Row: {
          analyzed_at: string
          created_at: string
          emotional_tone: string[] | null
          id: string
          keywords: string[] | null
          model_version: string | null
          overall_sentiment: string
          review_id: string
          sentiment_score: number | null
          tenant_id: string
          topic_clusters: string[] | null
          topic_scores: Json | null
        }
        Insert: {
          analyzed_at?: string
          created_at?: string
          emotional_tone?: string[] | null
          id?: string
          keywords?: string[] | null
          model_version?: string | null
          overall_sentiment?: string
          review_id: string
          sentiment_score?: number | null
          tenant_id: string
          topic_clusters?: string[] | null
          topic_scores?: Json | null
        }
        Update: {
          analyzed_at?: string
          created_at?: string
          emotional_tone?: string[] | null
          id?: string
          keywords?: string[] | null
          model_version?: string | null
          overall_sentiment?: string
          review_id?: string
          sentiment_score?: number | null
          tenant_id?: string
          topic_clusters?: string[] | null
          topic_scores?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "review_sentiment_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      review_settings: {
        Row: {
          auto_reply_delay_hours: number
          auto_reply_enabled: boolean
          created_at: string | null
          id: string
          last_processed_at: string | null
          review_check_start_date: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          auto_reply_delay_hours?: number
          auto_reply_enabled?: boolean
          created_at?: string | null
          id?: string
          last_processed_at?: string | null
          review_check_start_date?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          auto_reply_delay_hours?: number
          auto_reply_enabled?: boolean
          created_at?: string | null
          id?: string
          last_processed_at?: string | null
          review_check_start_date?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      review_suggestions: {
        Row: {
          business_field: string | null
          created_at: string | null
          id: string
          max_rating: number | null
          min_rating: number | null
          suggestion_text: string
          tenant_id: string
        }
        Insert: {
          business_field?: string | null
          created_at?: string | null
          id?: string
          max_rating?: number | null
          min_rating?: number | null
          suggestion_text: string
          tenant_id: string
        }
        Update: {
          business_field?: string | null
          created_at?: string | null
          id?: string
          max_rating?: number | null
          min_rating?: number | null
          suggestion_text?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_suggestions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_name: string | null
          created_at: string | null
          id: string
          location_id: string
          platform: string | null
          platform_review_id: string | null
          platform_url: string | null
          rating: number | null
          replied: boolean | null
          reply_id: string | null
          reply_text: string | null
          review_id: string
          review_text: string | null
          review_time: string | null
          sentiment: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          created_at?: string | null
          id?: string
          location_id: string
          platform?: string | null
          platform_review_id?: string | null
          platform_url?: string | null
          rating?: number | null
          replied?: boolean | null
          reply_id?: string | null
          reply_text?: string | null
          review_id: string
          review_text?: string | null
          review_time?: string | null
          sentiment?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          created_at?: string | null
          id?: string
          location_id?: string
          platform?: string | null
          platform_review_id?: string | null
          platform_url?: string | null
          rating?: number | null
          replied?: boolean | null
          reply_id?: string | null
          reply_text?: string | null
          review_id?: string
          review_text?: string | null
          review_time?: string | null
          sentiment?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      rules: {
        Row: {
          auto_reply_enabled: boolean | null
          created_at: string | null
          id: string
          max_rating: number | null
          min_rating: number | null
          name: string
          template_id: string | null
          tenant_id: string
        }
        Insert: {
          auto_reply_enabled?: boolean | null
          created_at?: string | null
          id?: string
          max_rating?: number | null
          min_rating?: number | null
          name: string
          template_id?: string | null
          tenant_id: string
        }
        Update: {
          auto_reply_enabled?: boolean | null
          created_at?: string | null
          id?: string
          max_rating?: number | null
          min_rating?: number | null
          name?: string
          template_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_rules_template_id"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "reply_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "reply_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          content: string
          content_type: string
          created_at: string
          hashtags: string[] | null
          id: string
          media_url: string | null
          metadata: Json | null
          platforms: string[]
          published_at: string | null
          scheduled_for: string | null
          status: string
          tenant_id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          content_type?: string
          created_at?: string
          hashtags?: string[] | null
          id?: string
          media_url?: string | null
          metadata?: Json | null
          platforms?: string[]
          published_at?: string | null
          scheduled_for?: string | null
          status?: string
          tenant_id: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          hashtags?: string[] | null
          id?: string
          media_url?: string | null
          metadata?: Json | null
          platforms?: string[]
          published_at?: string | null
          scheduled_for?: string | null
          status?: string
          tenant_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_keyword_translations: {
        Row: {
          created_at: string | null
          id: string
          language_code: string
          location_id: string | null
          original_keyword: string
          tenant_id: string
          translated_keyword: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language_code: string
          location_id?: string | null
          original_keyword: string
          tenant_id: string
          translated_keyword: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language_code?: string
          location_id?: string | null
          original_keyword?: string
          tenant_id?: string
          translated_keyword?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_keyword_translations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_keyword_translations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shield_domains: {
        Row: {
          created_at: string
          domain: string
          id: string
          is_active: boolean | null
          last_scan_at: string | null
          protection_level: string | null
          tenant_id: string
          threat_level: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          is_active?: boolean | null
          last_scan_at?: string | null
          protection_level?: string | null
          tenant_id: string
          threat_level?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          is_active?: boolean | null
          last_scan_at?: string | null
          protection_level?: string | null
          tenant_id?: string
          threat_level?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shield_domains_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shield_events: {
        Row: {
          action_taken: string | null
          created_at: string
          customer_review_id: string | null
          details: Json | null
          event_type: string
          id: string
          review_id: string | null
          severity: string | null
          shield_domain_id: string
          source_ip: string | null
          user_agent: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          customer_review_id?: string | null
          details?: Json | null
          event_type: string
          id?: string
          review_id?: string | null
          severity?: string | null
          shield_domain_id: string
          source_ip?: string | null
          user_agent?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          customer_review_id?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          review_id?: string | null
          severity?: string | null
          shield_domain_id?: string
          source_ip?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shield_events_customer_review_id_fkey"
            columns: ["customer_review_id"]
            isOneToOne: false
            referencedRelation: "customer_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shield_events_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shield_events_shield_domain_id_fkey"
            columns: ["shield_domain_id"]
            isOneToOne: false
            referencedRelation: "shield_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      shield_metrics: {
        Row: {
          bots_blocked: number | null
          bots_detected: number | null
          challenges_issued: number | null
          clone_scans_run: number | null
          clones_found: number | null
          created_at: string
          date: string
          fake_reviews_google: number | null
          fake_reviews_incoming: number | null
          id: string
          protection_score: number | null
          shield_domain_id: string
          total_requests: number | null
        }
        Insert: {
          bots_blocked?: number | null
          bots_detected?: number | null
          challenges_issued?: number | null
          clone_scans_run?: number | null
          clones_found?: number | null
          created_at?: string
          date: string
          fake_reviews_google?: number | null
          fake_reviews_incoming?: number | null
          id?: string
          protection_score?: number | null
          shield_domain_id: string
          total_requests?: number | null
        }
        Update: {
          bots_blocked?: number | null
          bots_detected?: number | null
          challenges_issued?: number | null
          clone_scans_run?: number | null
          clones_found?: number | null
          created_at?: string
          date?: string
          fake_reviews_google?: number | null
          fake_reviews_incoming?: number | null
          id?: string
          protection_score?: number | null
          shield_domain_id?: string
          total_requests?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shield_metrics_shield_domain_id_fkey"
            columns: ["shield_domain_id"]
            isOneToOne: false
            referencedRelation: "shield_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_credit_purchases: {
        Row: {
          created_at: string
          credits_amount: number
          id: string
          price_cents: number
          status: string
          stripe_payment_id: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          credits_amount: number
          id?: string
          price_cents: number
          status?: string
          stripe_payment_id?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          credits_amount?: number
          id?: string
          price_cents?: number
          status?: string
          stripe_payment_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_credit_purchases_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_credits: {
        Row: {
          bonus_credits: number
          created_at: string
          id: string
          monthly_quota: number
          quota_reset_at: string
          tenant_id: string
          updated_at: string
          used_this_month: number
        }
        Insert: {
          bonus_credits?: number
          created_at?: string
          id?: string
          monthly_quota?: number
          quota_reset_at?: string
          tenant_id: string
          updated_at?: string
          used_this_month?: number
        }
        Update: {
          bonus_credits?: number
          created_at?: string
          id?: string
          monthly_quota?: number
          quota_reset_at?: string
          tenant_id?: string
          updated_at?: string
          used_this_month?: number
        }
        Relationships: [
          {
            foreignKeyName: "sms_credits_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          channel: string
          created_at: string
          credits_used: number
          delivered_at: string | null
          error_message: string | null
          external_id: string | null
          id: string
          location_id: string | null
          message_content: string
          message_type: string
          recipient_name: string | null
          recipient_phone: string
          sent_at: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          channel?: string
          created_at?: string
          credits_used?: number
          delivered_at?: string | null
          error_message?: string | null
          external_id?: string | null
          id?: string
          location_id?: string | null
          message_content: string
          message_type: string
          recipient_name?: string | null
          recipient_phone: string
          sent_at?: string | null
          status?: string
          tenant_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          credits_used?: number
          delivered_at?: string | null
          error_message?: string | null
          external_id?: string | null
          id?: string
          location_id?: string | null
          message_content?: string
          message_type?: string
          recipient_name?: string | null
          recipient_phone?: string
          sent_at?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_messages_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          ai_posts_per_day: number | null
          ai_suggestions_per_review: number
          created_at: string
          features: Json
          id: string
          max_locations: number | null
          max_reviews: number | null
          name: string
          price_monthly: number
          stripe_price_id: string | null
          updated_at: string
        }
        Insert: {
          ai_posts_per_day?: number | null
          ai_suggestions_per_review?: number
          created_at?: string
          features?: Json
          id?: string
          max_locations?: number | null
          max_reviews?: number | null
          name: string
          price_monthly: number
          stripe_price_id?: string | null
          updated_at?: string
        }
        Update: {
          ai_posts_per_day?: number | null
          ai_suggestions_per_review?: number
          created_at?: string
          features?: Json
          id?: string
          max_locations?: number | null
          max_reviews?: number | null
          name?: string
          price_monthly?: number
          stripe_price_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          is_trial_expired: boolean | null
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tenant_id: string
          trial_end: string | null
          trial_ended_at: string | null
          trial_started_at: string | null
          trial_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_trial_expired?: boolean | null
          plan_id: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id: string
          trial_end?: string | null
          trial_ended_at?: string | null
          trial_started_at?: string | null
          trial_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_trial_expired?: boolean | null
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string
          trial_end?: string | null
          trial_ended_at?: string | null
          trial_started_at?: string | null
          trial_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      super_admins: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      tenant_addons: {
        Row: {
          addon_id: string
          created_at: string
          id: string
          status: string
          stripe_subscription_id: string | null
          tenant_id: string
        }
        Insert: {
          addon_id: string
          created_at?: string
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          tenant_id: string
        }
        Update: {
          addon_id?: string
          created_at?: string
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_addons_addon_id_fkey"
            columns: ["addon_id"]
            isOneToOne: false
            referencedRelation: "addon_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_addons_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_campaign_usage: {
        Row: {
          billing_cycle_end: string
          billing_cycle_start: string
          created_at: string
          entries_included: number
          entries_used: number
          id: string
          overage_amount: number
          overage_blocks: number
          tenant_id: string
          updated_at: string
        }
        Insert: {
          billing_cycle_end: string
          billing_cycle_start: string
          created_at?: string
          entries_included?: number
          entries_used?: number
          id?: string
          overage_amount?: number
          overage_blocks?: number
          tenant_id: string
          updated_at?: string
        }
        Update: {
          billing_cycle_end?: string
          billing_cycle_start?: string
          created_at?: string
          entries_included?: number
          entries_used?: number
          id?: string
          overage_amount?: number
          overage_blocks?: number
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_campaign_usage_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_overrides: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          override_type: string
          reason: string | null
          starts_at: string
          tenant_id: string
          value: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          override_type: string
          reason?: string | null
          starts_at?: string
          tenant_id: string
          value: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          override_type?: string
          reason?: string | null
          starts_at?: string
          tenant_id?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "tenant_overrides_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_seo_profiles: {
        Row: {
          ai_visibility_score: number | null
          awards: Json | null
          brand_tone_keywords: Json | null
          brand_voice: string | null
          business_description: string | null
          business_name: string
          certifications: Json | null
          communication_style: string | null
          competitors: Json | null
          content_themes: Json | null
          created_at: string
          founding_year: number | null
          id: string
          industry: string | null
          last_score_calculated_at: string | null
          service_areas: Json | null
          social_profiles: Json | null
          target_audience: string | null
          target_keywords: Json | null
          team_size: string | null
          tenant_id: string
          unique_selling_points: Json | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          ai_visibility_score?: number | null
          awards?: Json | null
          brand_tone_keywords?: Json | null
          brand_voice?: string | null
          business_description?: string | null
          business_name: string
          certifications?: Json | null
          communication_style?: string | null
          competitors?: Json | null
          content_themes?: Json | null
          created_at?: string
          founding_year?: number | null
          id?: string
          industry?: string | null
          last_score_calculated_at?: string | null
          service_areas?: Json | null
          social_profiles?: Json | null
          target_audience?: string | null
          target_keywords?: Json | null
          team_size?: string | null
          tenant_id: string
          unique_selling_points?: Json | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          ai_visibility_score?: number | null
          awards?: Json | null
          brand_tone_keywords?: Json | null
          brand_voice?: string | null
          business_description?: string | null
          business_name?: string
          certifications?: Json | null
          communication_style?: string | null
          competitors?: Json | null
          content_themes?: Json | null
          created_at?: string
          founding_year?: number | null
          id?: string
          industry?: string | null
          last_score_calculated_at?: string | null
          service_areas?: Json | null
          social_profiles?: Json | null
          target_audience?: string | null
          target_keywords?: Json | null
          team_size?: string | null
          tenant_id?: string
          unique_selling_points?: Json | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_seo_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_upgrade_scores: {
        Row: {
          factors: Json | null
          id: string
          score: number
          tenant_id: string
          tier: string
          updated_at: string
        }
        Insert: {
          factors?: Json | null
          id?: string
          score?: number
          tenant_id: string
          tier?: string
          updated_at?: string
        }
        Update: {
          factors?: Json | null
          id?: string
          score?: number
          tenant_id?: string
          tier?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_upgrade_scores_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          default_language: string | null
          id: string
          industry: string | null
          menu_url: string | null
          name: string
          services_catalog: Json | null
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          created_at?: string | null
          default_language?: string | null
          id?: string
          industry?: string | null
          menu_url?: string | null
          name: string
          services_catalog?: Json | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          created_at?: string | null
          default_language?: string | null
          id?: string
          industry?: string | null
          menu_url?: string | null
          name?: string
          services_catalog?: Json | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Relationships: []
      }
      threads_accounts: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean | null
          long_lived_token: string | null
          tenant_id: string
          threads_user_id: string
          token_expires_at: string | null
          user_access_token: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          long_lived_token?: string | null
          tenant_id: string
          threads_user_id: string
          token_expires_at?: string | null
          user_access_token: string
          username?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          long_lived_token?: string | null
          tenant_id?: string
          threads_user_id?: string
          token_expires_at?: string | null
          user_access_token?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "threads_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_memberships: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string | null
          role: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash?: string | null
          role?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string | null
          role?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_chat_messages: {
        Row: {
          chat_session_id: string
          content: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          chat_session_id: string
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          chat_session_id?: string
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "widget_chat_messages_chat_session_id_fkey"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "widget_chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_chat_sessions: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          public_session_id: string
          tenant_id: string
          updated_at: string
          visitor_email: string | null
          visitor_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          public_session_id: string
          tenant_id: string
          updated_at?: string
          visitor_email?: string | null
          visitor_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          public_session_id?: string
          tenant_id?: string
          updated_at?: string
          visitor_email?: string | null
          visitor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "widget_chat_sessions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_configs: {
        Row: {
          created_at: string
          id: string
          is_enabled: boolean
          position: string
          primary_color: string
          show_review_previews: boolean | null
          tenant_id: string
          updated_at: string
          welcome_message: string | null
          widget_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          position?: string
          primary_color?: string
          show_review_previews?: boolean | null
          tenant_id: string
          updated_at?: string
          welcome_message?: string | null
          widget_type?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          position?: string
          primary_color?: string
          show_review_previews?: boolean | null
          tenant_id?: string
          updated_at?: string
          welcome_message?: string | null
          widget_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "widget_configs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          question: string
          sort_order: number | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          question: string
          sort_order?: number | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          question?: string
          sort_order?: number | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "widget_faqs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_knowledge_docs: {
        Row: {
          content: string
          created_at: string | null
          doc_type: string
          file_name: string | null
          file_path: string | null
          id: string
          is_active: boolean | null
          last_synced_at: string | null
          metadata: Json | null
          source_url: string | null
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          doc_type?: string
          file_name?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          metadata?: Json | null
          source_url?: string | null
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          doc_type?: string
          file_name?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          metadata?: Json | null
          source_url?: string | null
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "widget_knowledge_docs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_leads: {
        Row: {
          chat_session_id: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          notes: string | null
          phone: string | null
          source: string | null
          tenant_id: string
        }
        Insert: {
          chat_session_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          tenant_id: string
        }
        Update: {
          chat_session_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "widget_leads_chat_session_id_fkey"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "widget_chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "widget_leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      google_accounts_safe: {
        Row: {
          access_token: string | null
          created_at: string | null
          google_account_id: string | null
          id: string | null
          refresh_token: string | null
          tenant_id: string | null
          token_expires_at: string | null
        }
        Insert: {
          access_token?: never
          created_at?: string | null
          google_account_id?: string | null
          id?: string | null
          refresh_token?: never
          tenant_id?: string | null
          token_expires_at?: string | null
        }
        Update: {
          access_token?: never
          created_at?: string | null
          google_account_id?: string | null
          id?: string | null
          refresh_token?: never
          tenant_id?: string | null
          token_expires_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_invite: { Args: { p_token: string }; Returns: boolean }
      get_tenant_pricing: { Args: { _tenant_id: string }; Returns: Json }
      get_tenant_subscription: { Args: { _tenant_id: string }; Returns: Json }
      has_tenant_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _tenant_id: string
          _user_id: string
        }
        Returns: boolean
      }
      is_super_admin: { Args: { _email: string }; Returns: boolean }
      is_tenant_member: {
        Args: { _tenant_id: string; _user_id: string }
        Returns: boolean
      }
      share_tenant: { Args: { u1: string; u2: string }; Returns: boolean }
    }
    Enums: {
      app_role: "owner" | "admin" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "admin", "member"],
    },
  },
} as const
