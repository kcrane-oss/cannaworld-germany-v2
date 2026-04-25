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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_session_results: {
        Row: {
          ai_analysis: Json
          checklist: Json
          checklist_issue_count: number
          checklist_ok_count: number
          created_at: string
          duration_seconds: number
          ended_at: string
          id: string
          notes: string | null
          provider: string
          started_at: string
          transcript: Json
          user_id: string
        }
        Insert: {
          ai_analysis?: Json
          checklist?: Json
          checklist_issue_count?: number
          checklist_ok_count?: number
          created_at?: string
          duration_seconds?: number
          ended_at?: string
          id?: string
          notes?: string | null
          provider: string
          started_at?: string
          transcript?: Json
          user_id: string
        }
        Update: {
          ai_analysis?: Json
          checklist?: Json
          checklist_issue_count?: number
          checklist_ok_count?: number
          created_at?: string
          duration_seconds?: number
          ended_at?: string
          id?: string
          notes?: string | null
          provider?: string
          started_at?: string
          transcript?: Json
          user_id?: string
        }
        Relationships: []
      }
      audit_trail: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string
        }
        Relationships: []
      }
      batches: {
        Row: {
          admin_notes: string | null
          ai_analysis_completed_at: string | null
          ai_analysis_requested_at: string | null
          ai_analysis_result: Json | null
          ai_analysis_status: string | null
          anthropic_batch_id: string | null
          available_from: string | null
          available_until: string | null
          batch_number: string
          category: string | null
          cbd_content: number | null
          compliance_score: string | null
          created_at: string
          document_name: string | null
          document_url: string | null
          earliest_delivery_date: string | null
          facility: string | null
          id: string
          marketplace_batch_id: string | null
          marketplace_synced_at: string | null
          notes: string | null
          origin_country: string | null
          post_harvest_service: boolean
          product_name: string
          quantity: number
          reviewed_at: string | null
          reviewed_by: string | null
          risk_score: string | null
          status: Database["public"]["Enums"]["batch_status"]
          strain: string | null
          target_markets: string[] | null
          thc_content: number | null
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          ai_analysis_completed_at?: string | null
          ai_analysis_requested_at?: string | null
          ai_analysis_result?: Json | null
          ai_analysis_status?: string | null
          anthropic_batch_id?: string | null
          available_from?: string | null
          available_until?: string | null
          batch_number: string
          category?: string | null
          cbd_content?: number | null
          compliance_score?: string | null
          created_at?: string
          document_name?: string | null
          document_url?: string | null
          earliest_delivery_date?: string | null
          facility?: string | null
          id?: string
          marketplace_batch_id?: string | null
          marketplace_synced_at?: string | null
          notes?: string | null
          origin_country?: string | null
          post_harvest_service?: boolean
          product_name: string
          quantity?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: string | null
          status?: Database["public"]["Enums"]["batch_status"]
          strain?: string | null
          target_markets?: string[] | null
          thc_content?: number | null
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          ai_analysis_completed_at?: string | null
          ai_analysis_requested_at?: string | null
          ai_analysis_result?: Json | null
          ai_analysis_status?: string | null
          anthropic_batch_id?: string | null
          available_from?: string | null
          available_until?: string | null
          batch_number?: string
          category?: string | null
          cbd_content?: number | null
          compliance_score?: string | null
          created_at?: string
          document_name?: string | null
          document_url?: string | null
          earliest_delivery_date?: string | null
          facility?: string | null
          id?: string
          marketplace_batch_id?: string | null
          marketplace_synced_at?: string | null
          notes?: string | null
          origin_country?: string | null
          post_harvest_service?: boolean
          product_name?: string
          quantity?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: string | null
          status?: Database["public"]["Enums"]["batch_status"]
          strain?: string | null
          target_markets?: string[] | null
          thc_content?: number | null
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      business_partners: {
        Row: {
          admin_notes: string | null
          company_name: string
          country: string | null
          created_at: string
          id: string
          license_number: string | null
          onboarding_data: Json | null
          qualified_person: string | null
          registration_number: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: string
          status: Database["public"]["Enums"]["partner_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          company_name: string
          country?: string | null
          created_at?: string
          id?: string
          license_number?: string | null
          onboarding_data?: Json | null
          qualified_person?: string | null
          registration_number?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role: string
          status?: Database["public"]["Enums"]["partner_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          company_name?: string
          country?: string | null
          created_at?: string
          id?: string
          license_number?: string | null
          onboarding_data?: Json | null
          qualified_person?: string | null
          registration_number?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          status?: Database["public"]["Enums"]["partner_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          admin_notes: string | null
          company: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          license_number: string | null
          role: string | null
          status: string
          updated_at: string
          use_case: string | null
        }
        Insert: {
          admin_notes?: string | null
          company: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          license_number?: string | null
          role?: string | null
          status?: string
          updated_at?: string
          use_case?: string | null
        }
        Update: {
          admin_notes?: string | null
          company?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          license_number?: string | null
          role?: string | null
          status?: string
          updated_at?: string
          use_case?: string | null
        }
        Relationships: []
      }
      facility_plan_approvals: {
        Row: {
          action: Database["public"]["Enums"]["plan_approval_action"]
          comment: string | null
          created_at: string
          id: string
          integrity_hash: string | null
          performer_name: string
          performer_role: string | null
          performed_by: string
          plan_id: string
          signature_url: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["plan_approval_action"]
          comment?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          performer_name: string
          performer_role?: string | null
          performed_by: string
          plan_id: string
          signature_url?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["plan_approval_action"]
          comment?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          performer_name?: string
          performer_role?: string | null
          performed_by?: string
          plan_id?: string
          signature_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_plan_approvals_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "facility_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_plan_comments: {
        Row: {
          author_id: string
          author_name: string
          comment: string
          created_at: string
          id: string
          plan_id: string
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          updated_at: string
          zone_id: string
        }
        Insert: {
          author_id: string
          author_name: string
          comment: string
          created_at?: string
          id?: string
          plan_id: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string
          zone_id: string
        }
        Update: {
          author_id?: string
          author_name?: string
          comment?: string
          created_at?: string
          id?: string
          plan_id?: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_plan_comments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "facility_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_plan_comments_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "facility_plan_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_plan_connections: {
        Row: {
          color: string | null
          connection_type: string
          created_at: string
          from_zone_id: string
          id: string
          label: string | null
          plan_id: string
          sort_order: number
          to_zone_id: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          connection_type?: string
          created_at?: string
          from_zone_id: string
          id?: string
          label?: string | null
          plan_id: string
          sort_order?: number
          to_zone_id: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          connection_type?: string
          created_at?: string
          from_zone_id?: string
          id?: string
          label?: string | null
          plan_id?: string
          sort_order?: number
          to_zone_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_plan_connections_from_zone_id_fkey"
            columns: ["from_zone_id"]
            isOneToOne: false
            referencedRelation: "facility_plan_zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_plan_connections_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "facility_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_plan_connections_to_zone_id_fkey"
            columns: ["to_zone_id"]
            isOneToOne: false
            referencedRelation: "facility_plan_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_plan_revisions: {
        Row: {
          change_summary: string | null
          created_at: string
          created_by: string
          id: string
          plan_id: string
          revision_hash: string | null
          revision_number: number
          snapshot: Json
          source_action: string
        }
        Insert: {
          change_summary?: string | null
          created_at?: string
          created_by: string
          id?: string
          plan_id: string
          revision_hash?: string | null
          revision_number?: number
          snapshot: Json
          source_action?: string
        }
        Update: {
          change_summary?: string | null
          created_at?: string
          created_by?: string
          id?: string
          plan_id?: string
          revision_hash?: string | null
          revision_number?: number
          snapshot?: Json
          source_action?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_plan_revisions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "facility_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_plan_zones: {
        Row: {
          air_changes_per_hour: number | null
          area_sqm: number | null
          classification: Database["public"]["Enums"]["zone_classification"]
          color: string | null
          created_at: string
          height: number
          humidity_range: string | null
          id: string
          metadata: Json | null
          name: string
          notes: string | null
          plan_id: string
          pressure_differential: string | null
          rotation: number
          sort_order: number
          temperature_range: string | null
          updated_at: string
          width: number
          x: number
          y: number
        }
        Insert: {
          air_changes_per_hour?: number | null
          area_sqm?: number | null
          classification?: Database["public"]["Enums"]["zone_classification"]
          color?: string | null
          created_at?: string
          height?: number
          humidity_range?: string | null
          id?: string
          metadata?: Json | null
          name: string
          notes?: string | null
          plan_id: string
          pressure_differential?: string | null
          rotation?: number
          sort_order?: number
          temperature_range?: string | null
          updated_at?: string
          width?: number
          x?: number
          y?: number
        }
        Update: {
          air_changes_per_hour?: number | null
          area_sqm?: number | null
          classification?: Database["public"]["Enums"]["zone_classification"]
          color?: string | null
          created_at?: string
          height?: number
          humidity_range?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          notes?: string | null
          plan_id?: string
          pressure_differential?: string | null
          rotation?: number
          sort_order?: number
          temperature_range?: string | null
          updated_at?: string
          width?: number
          x?: number
          y?: number
        }
        Relationships: [
          {
            foreignKeyName: "facility_plan_zones_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "facility_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_plans: {
        Row: {
          approved_at: string | null
          canvas_data: Json | null
          created_at: string
          created_by: string
          description: string | null
          facility_id: string | null
          id: string
          metadata: Json | null
          plan_number: string
          regulatory_framework: string
          status: Database["public"]["Enums"]["facility_plan_status"]
          submitted_at: string | null
          thumbnail_url: string | null
          title: string
          total_area_sqm: number | null
          updated_at: string
          updated_by: string | null
          version_major: number
          version_minor: number
        }
        Insert: {
          approved_at?: string | null
          canvas_data?: Json | null
          created_at?: string
          created_by: string
          description?: string | null
          facility_id?: string | null
          id?: string
          metadata?: Json | null
          plan_number: string
          regulatory_framework?: string
          status?: Database["public"]["Enums"]["facility_plan_status"]
          submitted_at?: string | null
          thumbnail_url?: string | null
          title: string
          total_area_sqm?: number | null
          updated_at?: string
          updated_by?: string | null
          version_major?: number
          version_minor?: number
        }
        Update: {
          approved_at?: string | null
          canvas_data?: Json | null
          created_at?: string
          created_by?: string
          description?: string | null
          facility_id?: string | null
          id?: string
          metadata?: Json | null
          plan_number?: string
          regulatory_framework?: string
          status?: Database["public"]["Enums"]["facility_plan_status"]
          submitted_at?: string | null
          thumbnail_url?: string | null
          title?: string
          total_area_sqm?: number | null
          updated_at?: string
          updated_by?: string | null
          version_major?: number
          version_minor?: number
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string
          cover_image_url: string | null
          created_at: string
          created_by: string
          description: string
          difficulty: string
          duration_minutes: number
          id: string
          is_mandatory: boolean
          is_published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          description?: string
          difficulty?: string
          duration_minutes?: number
          id?: string
          is_mandatory?: boolean
          is_published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          description?: string
          difficulty?: string
          duration_minutes?: number
          id?: string
          is_mandatory?: boolean
          is_published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          certificate_url: string | null
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          progress_percent: number
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          progress_percent?: number
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          progress_percent?: number
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      health_check_logs: {
        Row: {
          checks: Json
          created_at: string
          duration_ms: number
          id: string
          overall_status: string
          problems_count: number
        }
        Insert: {
          checks?: Json
          created_at?: string
          duration_ms?: number
          id?: string
          overall_status?: string
          problems_count?: number
        }
        Update: {
          checks?: Json
          created_at?: string
          duration_ms?: number
          id?: string
          overall_status?: string
          problems_count?: number
        }
        Relationships: []
      }
      integration_audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json | null
          id: string
          integration_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          integration_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          integration_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_audit_log_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "platform_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          batch_id: string | null
          created_at: string
          id: string
          location: string
          minimum_stock: number
          notes: string | null
          product_name: string
          quantity_available: number | null
          quantity_on_hand: number
          quantity_reserved: number
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string
          id?: string
          location?: string
          minimum_stock?: number
          notes?: string | null
          product_name: string
          quantity_available?: number | null
          quantity_on_hand?: number
          quantity_reserved?: number
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string
          id?: string
          location?: string
          minimum_stock?: number
          notes?: string | null
          product_name?: string
          quantity_available?: number | null
          quantity_on_hand?: number
          quantity_reserved?: number
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          stripe_price_id: string | null
          total: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          stripe_price_id?: string | null
          total?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          stripe_price_id?: string | null
          total?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          created_by: string
          currency: string
          description: string | null
          due_date: string | null
          id: string
          invoice_number: string
          notes: string | null
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          status: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          stripe_payment_url: string | null
          subtotal: number
          tax_amount: number
          tax_rate: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          currency?: string
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_url?: string | null
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          currency?: string
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_url?: string | null
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          cover_letter: string | null
          created_at: string
          id: string
          job_posting_id: string
          notes: string | null
          phone: string | null
          resume_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_posting_id: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_posting_id?: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          created_at: string
          created_by: string
          department: string
          description: string
          employment_type: string
          id: string
          location: string
          requirements: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          department?: string
          description?: string
          employment_type?: string
          id?: string
          location?: string
          requirements?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          department?: string
          description?: string
          employment_type?: string
          id?: string
          location?: string
          requirements?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          quiz_score: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          quiz_score?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string
          course_id: string
          created_at: string
          duration_minutes: number
          id: string
          sort_order: number
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string
          course_id: string
          created_at?: string
          duration_minutes?: number
          id?: string
          sort_order?: number
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string
          course_id?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean
          source_platform: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean
          source_platform?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean
          source_platform?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_integrations: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          key_hint: string | null
          key_label: string
          last_checked_at: string | null
          last_error: string | null
          platform_name: string
          platform_url: string | null
          scope: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          key_hint?: string | null
          key_label: string
          last_checked_at?: string | null
          last_error?: string | null
          platform_name: string
          platform_url?: string | null
          scope?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          key_hint?: string | null
          key_label?: string
          last_checked_at?: string | null
          last_error?: string | null
          platform_name?: string
          platform_url?: string | null
          scope?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          display_name: string | null
          id: string
          onboarding_completed: boolean
          onboarding_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          onboarding_completed?: boolean
          onboarding_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          onboarding_completed?: boolean
          onboarding_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          explanation: string | null
          id: string
          lesson_id: string
          options: Json
          question: string
          sort_order: number
        }
        Insert: {
          correct_answer?: number
          created_at?: string
          explanation?: string | null
          id?: string
          lesson_id: string
          options?: Json
          question: string
          sort_order?: number
        }
        Update: {
          correct_answer?: number
          created_at?: string
          explanation?: string | null
          id?: string
          lesson_id?: string
          options?: Json
          question?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      recall_batches: {
        Row: {
          batch_id: string
          created_at: string
          id: string
          notes: string | null
          quantity_affected: number | null
          recall_id: string
          status: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          id?: string
          notes?: string | null
          quantity_affected?: number | null
          recall_id: string
          status?: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          quantity_affected?: number | null
          recall_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recall_batches_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recall_batches_recall_id_fkey"
            columns: ["recall_id"]
            isOneToOne: false
            referencedRelation: "recalls"
            referencedColumns: ["id"]
          },
        ]
      }
      recalls: {
        Row: {
          affected_markets: string[] | null
          assigned_to: string | null
          corrective_actions: string | null
          created_at: string
          customer_notification_sent: boolean
          description: string | null
          id: string
          initiated_by: string
          reason: string
          recall_number: string
          regulatory_notifications: string | null
          resolved_at: string | null
          root_cause: string | null
          severity: Database["public"]["Enums"]["recall_severity"]
          status: Database["public"]["Enums"]["recall_status"]
          title: string
          updated_at: string
        }
        Insert: {
          affected_markets?: string[] | null
          assigned_to?: string | null
          corrective_actions?: string | null
          created_at?: string
          customer_notification_sent?: boolean
          description?: string | null
          id?: string
          initiated_by: string
          reason: string
          recall_number?: string
          regulatory_notifications?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          severity?: Database["public"]["Enums"]["recall_severity"]
          status?: Database["public"]["Enums"]["recall_status"]
          title: string
          updated_at?: string
        }
        Update: {
          affected_markets?: string[] | null
          assigned_to?: string | null
          corrective_actions?: string | null
          created_at?: string
          customer_notification_sent?: boolean
          description?: string | null
          id?: string
          initiated_by?: string
          reason?: string
          recall_number?: string
          regulatory_notifications?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          severity?: Database["public"]["Enums"]["recall_severity"]
          status?: Database["public"]["Enums"]["recall_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      session_participants: {
        Row: {
          attendance_status: string
          created_at: string
          id: string
          joined_at: string | null
          left_at: string | null
          role: string
          session_id: string
          user_id: string
        }
        Insert: {
          attendance_status?: string
          created_at?: string
          id?: string
          joined_at?: string | null
          left_at?: string | null
          role?: string
          session_id: string
          user_id: string
        }
        Update: {
          attendance_status?: string
          created_at?: string
          id?: string
          joined_at?: string | null
          left_at?: string | null
          role?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          batch_id: string | null
          carrier: string | null
          created_at: string
          created_by: string
          customs_declaration_number: string | null
          customs_status: string | null
          destination_address: string | null
          destination_country: string
          estimated_arrival: string | null
          estimated_departure: string | null
          gdp_compliant: boolean
          id: string
          notes: string | null
          origin_address: string | null
          origin_country: string
          shipment_number: string
          status: Database["public"]["Enums"]["shipment_status"]
          temperature_log_url: string | null
          temperature_max: number | null
          temperature_min: number | null
          tracking_number: string | null
          trade_case_id: string | null
          updated_at: string
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          batch_id?: string | null
          carrier?: string | null
          created_at?: string
          created_by: string
          customs_declaration_number?: string | null
          customs_status?: string | null
          destination_address?: string | null
          destination_country?: string
          estimated_arrival?: string | null
          estimated_departure?: string | null
          gdp_compliant?: boolean
          id?: string
          notes?: string | null
          origin_address?: string | null
          origin_country?: string
          shipment_number?: string
          status?: Database["public"]["Enums"]["shipment_status"]
          temperature_log_url?: string | null
          temperature_max?: number | null
          temperature_min?: number | null
          tracking_number?: string | null
          trade_case_id?: string | null
          updated_at?: string
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          batch_id?: string | null
          carrier?: string | null
          created_at?: string
          created_by?: string
          customs_declaration_number?: string | null
          customs_status?: string | null
          destination_address?: string | null
          destination_country?: string
          estimated_arrival?: string | null
          estimated_departure?: string | null
          gdp_compliant?: boolean
          id?: string
          notes?: string | null
          origin_address?: string | null
          origin_country?: string
          shipment_number?: string
          status?: Database["public"]["Enums"]["shipment_status"]
          temperature_log_url?: string | null
          temperature_max?: number | null
          temperature_min?: number | null
          tracking_number?: string | null
          trade_case_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_trade_case_id_fkey"
            columns: ["trade_case_id"]
            isOneToOne: false
            referencedRelation: "trade_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_movements: {
        Row: {
          created_at: string
          id: string
          inventory_item_id: string
          movement_type: Database["public"]["Enums"]["stock_movement_type"]
          performed_by: string
          quantity: number
          reason: string | null
          reference_id: string | null
          reference_type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          inventory_item_id: string
          movement_type: Database["public"]["Enums"]["stock_movement_type"]
          performed_by: string
          quantity: number
          reason?: string | null
          reference_id?: string | null
          reference_type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          inventory_item_id?: string
          movement_type?: Database["public"]["Enums"]["stock_movement_type"]
          performed_by?: string
          quantity?: number
          reason?: string | null
          reference_id?: string | null
          reference_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_invitations: {
        Row: {
          accepted_at: string | null
          company_name: string | null
          created_at: string
          email: string
          id: string
          invited_by: string
          role: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by: string
          role?: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string
          role?: string
          status?: string
        }
        Relationships: []
      }
      trade_cases: {
        Row: {
          case_number: string
          completion_percentage: number
          created_at: string
          created_by: string
          estimated_quantity: number | null
          exporter_country: string
          exporter_name: string
          id: string
          importer_country: string
          importer_name: string
          notes: string | null
          product_type: string
          status: string
          unit: string
          updated_at: string
        }
        Insert: {
          case_number?: string
          completion_percentage?: number
          created_at?: string
          created_by: string
          estimated_quantity?: number | null
          exporter_country?: string
          exporter_name: string
          id?: string
          importer_country?: string
          importer_name: string
          notes?: string | null
          product_type?: string
          status?: string
          unit?: string
          updated_at?: string
        }
        Update: {
          case_number?: string
          completion_percentage?: number
          created_at?: string
          created_by?: string
          estimated_quantity?: number | null
          exporter_country?: string
          exporter_name?: string
          id?: string
          importer_country?: string
          importer_name?: string
          notes?: string | null
          product_type?: string
          status?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          ended_at: string | null
          id: string
          instructor_id: string
          max_participants: number
          meeting_url: string | null
          scheduled_at: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          instructor_id: string
          max_participants?: number
          meeting_url?: string | null
          scheduled_at: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          instructor_id?: string
          max_participants?: number
          meeting_url?: string | null
          scheduled_at?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webhook_event_configs: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          event_type: string
          id: string
          label: string
          target_platforms: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          event_type: string
          id?: string
          label: string
          target_platforms?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          event_type?: string
          id?: string
          label?: string
          target_platforms?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      commit_facility_plan_revision: {
        Args: {
          p_action?: string
          p_change_summary?: string
          p_expected_version_major?: number
          p_expected_version_minor?: number
          p_plan_id: string
          p_snapshot: Json
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      save_facility_plan_graph: {
        Args: {
          p_action?: string
          p_canvas_data: Json
          p_change_summary?: string
          p_connections: Json
          p_expected_version_major: number
          p_expected_version_minor: number
          p_plan_id: string
          p_zones: Json
        }
        Returns: Json
      }
      transition_facility_plan: {
        Args: {
          p_action: Database["public"]["Enums"]["plan_approval_action"]
          p_comment?: string
          p_plan_id: string
          p_signature_url?: string
        }
        Returns: Json
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "exporter"
        | "importer"
        | "auditor"
        | "lab_provider"
        | "logistics"
        | "farm"
        | "shop"
        | "trader"
        | "inspector"
        | "pharmacy"
      facility_plan_status:
        | "draft"
        | "in_review"
        | "qa_approval"
        | "regulatory_submitted"
        | "approved"
        | "rejected"
        | "archived"
      batch_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "listed"
      invoice_status:
        | "draft"
        | "sent"
        | "paid"
        | "overdue"
        | "cancelled"
        | "refunded"
      partner_status: "pending" | "approved" | "rejected"
      payment_method: "stripe" | "bank_transfer" | "manual"
      plan_approval_action:
        | "submitted_for_review"
        | "returned_to_draft"
        | "review_approved"
        | "review_rejected"
        | "qa_approved"
        | "qa_rejected"
        | "regulatory_approved"
        | "regulatory_rejected"
      recall_severity: "class_1" | "class_2" | "class_3"
      recall_status:
        | "initiated"
        | "investigating"
        | "confirmed"
        | "executing"
        | "completed"
        | "closed"
      shipment_status:
        | "planned"
        | "picked_up"
        | "in_transit"
        | "customs"
        | "delivered"
        | "failed"
      stock_movement_type:
        | "inbound"
        | "outbound"
        | "adjustment"
        | "recall_return"
        | "transfer"
      zone_classification:
        | "eu_gmp_a"
        | "eu_gmp_b"
        | "eu_gmp_c"
        | "eu_gmp_d"
        | "eu_gmp_unclassified"
        | "fda_processing"
        | "fda_packaging"
        | "fda_storage"
        | "fda_testing"
        | "fda_utilities"
        | "cannabis_cultivation"
        | "cannabis_drying"
        | "cannabis_extraction"
        | "cannabis_packaging"
        | "cannabis_storage"
        | "cannabis_post_harvest"
        | "material_airlock"
        | "personnel_airlock"
        | "quarantine"
        | "receiving"
        | "release_storage"
        | "waste"
        | "corridor"
        | "office"
        | "other"
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
      app_role: [
        "admin",
        "exporter",
        "importer",
        "auditor",
        "lab_provider",
        "logistics",
        "farm",
        "shop",
        "trader",
        "inspector",
        "pharmacy",
      ],
      batch_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "listed",
      ],
      invoice_status: [
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled",
        "refunded",
      ],
      partner_status: ["pending", "approved", "rejected"],
      payment_method: ["stripe", "bank_transfer", "manual"],
      recall_severity: ["class_1", "class_2", "class_3"],
      recall_status: [
        "initiated",
        "investigating",
        "confirmed",
        "executing",
        "completed",
        "closed",
      ],
      shipment_status: [
        "planned",
        "picked_up",
        "in_transit",
        "customs",
        "delivered",
        "failed",
      ],
      stock_movement_type: [
        "inbound",
        "outbound",
        "adjustment",
        "recall_return",
        "transfer",
      ],
    },
  },
} as const
