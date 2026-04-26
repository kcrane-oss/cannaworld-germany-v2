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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      agent_config: {
        Row: {
          business_hours: Json | null
          channel: string
          cooldown_seconds: number | null
          created_at: string | null
          enabled: boolean | null
          escalation_email: string | null
          escalation_keywords: string[] | null
          escalation_line_user_id: string | null
          followup_minutes: number | null
          id: string
          language_priority: string[] | null
          metadata: Json | null
          persona_name: string
          persona_role: string
          quick_replies: Json | null
          response_max_tokens: number | null
          system_prompt_override: string | null
          tone: string | null
          updated_at: string | null
          welcome_message: Json | null
        }
        Insert: {
          business_hours?: Json | null
          channel: string
          cooldown_seconds?: number | null
          created_at?: string | null
          enabled?: boolean | null
          escalation_email?: string | null
          escalation_keywords?: string[] | null
          escalation_line_user_id?: string | null
          followup_minutes?: number | null
          id?: string
          language_priority?: string[] | null
          metadata?: Json | null
          persona_name: string
          persona_role: string
          quick_replies?: Json | null
          response_max_tokens?: number | null
          system_prompt_override?: string | null
          tone?: string | null
          updated_at?: string | null
          welcome_message?: Json | null
        }
        Update: {
          business_hours?: Json | null
          channel?: string
          cooldown_seconds?: number | null
          created_at?: string | null
          enabled?: boolean | null
          escalation_email?: string | null
          escalation_keywords?: string[] | null
          escalation_line_user_id?: string | null
          followup_minutes?: number | null
          id?: string
          language_priority?: string[] | null
          metadata?: Json | null
          persona_name?: string
          persona_role?: string
          quick_replies?: Json | null
          response_max_tokens?: number | null
          system_prompt_override?: string | null
          tone?: string | null
          updated_at?: string | null
          welcome_message?: Json | null
        }
        Relationships: []
      }
      ai_batch_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          job_id: string
          mime_type: string | null
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          job_id: string
          mime_type?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          job_id?: string
          mime_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_batch_documents_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "ai_batch_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_batch_jobs: {
        Row: {
          admin_notes: string | null
          ai_extracted_data: Json | null
          ai_price_estimate: number | null
          anthropic_batch_id: string | null
          anthropic_completed_at: string | null
          anthropic_submitted_at: string | null
          batch_id: string | null
          created_at: string
          error_message: string | null
          id: string
          price_deviation_pct: number | null
          price_review_needed: boolean | null
          price_suggestion: number
          quantity: number
          status: string
          target_date: string | null
          target_markets: string[]
          trade_type: string
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          ai_extracted_data?: Json | null
          ai_price_estimate?: number | null
          anthropic_batch_id?: string | null
          anthropic_completed_at?: string | null
          anthropic_submitted_at?: string | null
          batch_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          price_deviation_pct?: number | null
          price_review_needed?: boolean | null
          price_suggestion: number
          quantity: number
          status?: string
          target_date?: string | null
          target_markets?: string[]
          trade_type?: string
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          ai_extracted_data?: Json | null
          ai_price_estimate?: number | null
          anthropic_batch_id?: string | null
          anthropic_completed_at?: string | null
          anthropic_submitted_at?: string | null
          batch_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          price_deviation_pct?: number | null
          price_review_needed?: boolean | null
          price_suggestion?: number
          quantity?: number
          status?: string
          target_date?: string | null
          target_markets?: string[]
          trade_type?: string
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_batch_jobs_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      annual_quotas: {
        Row: {
          country_code: string
          id: string
          last_updated: string | null
          product_type: string
          quota_kg: number | null
          source: string | null
          used_kg: number | null
          year: number
        }
        Insert: {
          country_code: string
          id?: string
          last_updated?: string | null
          product_type: string
          quota_kg?: number | null
          source?: string | null
          used_kg?: number | null
          year: number
        }
        Update: {
          country_code?: string
          id?: string
          last_updated?: string | null
          product_type?: string
          quota_kg?: number | null
          source?: string | null
          used_kg?: number | null
          year?: number
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          key_hash: string
          last_used_at: string | null
          name: string
          project_name: string
          scopes: string[]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_hash: string
          last_used_at?: string | null
          name: string
          project_name: string
          scopes?: string[]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_hash?: string
          last_used_at?: string | null
          name?: string
          project_name?: string
          scopes?: string[]
        }
        Relationships: []
      }
      app_connections: {
        Row: {
          app: string
          connection_status: string | null
          created_at: string | null
          external_email: string | null
          external_user_id: string | null
          id: string
          last_sync_at: string | null
          linked_at: string | null
          metadata: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          app: string
          connection_status?: string | null
          created_at?: string | null
          external_email?: string | null
          external_user_id?: string | null
          id?: string
          last_sync_at?: string | null
          linked_at?: string | null
          metadata?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          app?: string
          connection_status?: string | null
          created_at?: string | null
          external_email?: string | null
          external_user_id?: string | null
          id?: string
          last_sync_at?: string | null
          linked_at?: string | null
          metadata?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      apqr_reports: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          batch_success_rate: number | null
          conclusion: string | null
          created_at: string
          data_snapshot: Json | null
          facility_id: string | null
          id: string
          integrity_hash: string | null
          oos_count: number | null
          prepared_by: string
          product_name: string
          recommendations: string | null
          rejected_batches: number | null
          released_batches: number | null
          report_number: string
          reporting_year: number
          reviewed_by: string | null
          signature_url: string | null
          stability_summary: string | null
          status: Database["public"]["Enums"]["apqr_status"]
          title: string
          total_batches: number | null
          total_capas: number | null
          total_complaints: number | null
          total_deviations: number | null
          total_recalls: number | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          batch_success_rate?: number | null
          conclusion?: string | null
          created_at?: string
          data_snapshot?: Json | null
          facility_id?: string | null
          id?: string
          integrity_hash?: string | null
          oos_count?: number | null
          prepared_by: string
          product_name: string
          recommendations?: string | null
          rejected_batches?: number | null
          released_batches?: number | null
          report_number: string
          reporting_year: number
          reviewed_by?: string | null
          signature_url?: string | null
          stability_summary?: string | null
          status?: Database["public"]["Enums"]["apqr_status"]
          title: string
          total_batches?: number | null
          total_capas?: number | null
          total_complaints?: number | null
          total_deviations?: number | null
          total_recalls?: number | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          batch_success_rate?: number | null
          conclusion?: string | null
          created_at?: string
          data_snapshot?: Json | null
          facility_id?: string | null
          id?: string
          integrity_hash?: string | null
          oos_count?: number | null
          prepared_by?: string
          product_name?: string
          recommendations?: string | null
          rejected_batches?: number | null
          released_batches?: number | null
          report_number?: string
          reporting_year?: number
          reviewed_by?: string | null
          signature_url?: string | null
          stability_summary?: string | null
          status?: Database["public"]["Enums"]["apqr_status"]
          title?: string
          total_batches?: number | null
          total_capas?: number | null
          total_complaints?: number | null
          total_deviations?: number | null
          total_recalls?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "apqr_reports_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_access_requests: {
        Row: {
          created_at: string
          exporter_id: string | null
          exporter_name: string | null
          exporter_search: string
          facility_name: string | null
          id: string
          importer_id: string
          message: string | null
          requested_at: string
          responded_at: string | null
          scope: string[]
          status: string
        }
        Insert: {
          created_at?: string
          exporter_id?: string | null
          exporter_name?: string | null
          exporter_search: string
          facility_name?: string | null
          id?: string
          importer_id: string
          message?: string | null
          requested_at?: string
          responded_at?: string | null
          scope?: string[]
          status?: string
        }
        Update: {
          created_at?: string
          exporter_id?: string | null
          exporter_name?: string | null
          exporter_search?: string
          facility_name?: string | null
          id?: string
          importer_id?: string
          message?: string | null
          requested_at?: string
          responded_at?: string | null
          scope?: string[]
          status?: string
        }
        Relationships: []
      }
      audit_checklist_items: {
        Row: {
          ampel: Database["public"]["Enums"]["ampel_status"] | null
          audit_id: string
          category: string
          created_at: string
          evidence_url: string | null
          id: string
          notes: string | null
          question: string
          score: number | null
          sort_order: number
        }
        Insert: {
          ampel?: Database["public"]["Enums"]["ampel_status"] | null
          audit_id: string
          category: string
          created_at?: string
          evidence_url?: string | null
          id?: string
          notes?: string | null
          question: string
          score?: number | null
          sort_order?: number
        }
        Update: {
          ampel?: Database["public"]["Enums"]["ampel_status"] | null
          audit_id?: string
          category?: string
          created_at?: string
          evidence_url?: string | null
          id?: string
          notes?: string | null
          question?: string
          score?: number | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "audit_checklist_items_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_closing_reports: {
        Row: {
          ai_analysis: string | null
          audit_id: string
          auditor_name: string
          auditor_role: string
          checklist_snapshot: Json
          created_at: string
          created_by: string | null
          id: string
          integrity_hash: string
          remarks: string | null
          report_number: string
          score_summary: Json | null
          signature_url: string | null
        }
        Insert: {
          ai_analysis?: string | null
          audit_id: string
          auditor_name: string
          auditor_role?: string
          checklist_snapshot?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          integrity_hash: string
          remarks?: string | null
          report_number: string
          score_summary?: Json | null
          signature_url?: string | null
        }
        Update: {
          ai_analysis?: string | null
          audit_id?: string
          auditor_name?: string
          auditor_role?: string
          checklist_snapshot?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          integrity_hash?: string
          remarks?: string | null
          report_number?: string
          score_summary?: Json | null
          signature_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_closing_reports_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_evidence: {
        Row: {
          audit_id: string
          captured_at: string
          created_at: string
          description: string | null
          evidence_id: string | null
          file_name: string
          file_size_bytes: number | null
          file_type: string
          file_url: string
          id: string
          integrity_hash: string | null
          metadata: Json | null
          owner_user_id: string | null
          review_status: string
          room_id: string | null
          session_id: string | null
          source_confidence: number | null
          source_entity_id: string | null
          source_event_type: string | null
          source_model: string | null
          source_platform: string
          uploaded_by: string | null
          webhook_event_id: string | null
        }
        Insert: {
          audit_id: string
          captured_at?: string
          created_at?: string
          description?: string | null
          evidence_id?: string | null
          file_name: string
          file_size_bytes?: number | null
          file_type?: string
          file_url: string
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          owner_user_id?: string | null
          review_status?: string
          room_id?: string | null
          session_id?: string | null
          source_confidence?: number | null
          source_entity_id?: string | null
          source_event_type?: string | null
          source_model?: string | null
          source_platform?: string
          uploaded_by?: string | null
          webhook_event_id?: string | null
        }
        Update: {
          audit_id?: string
          captured_at?: string
          created_at?: string
          description?: string | null
          evidence_id?: string | null
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string
          file_url?: string
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          owner_user_id?: string | null
          review_status?: string
          room_id?: string | null
          session_id?: string | null
          source_confidence?: number | null
          source_entity_id?: string | null
          source_event_type?: string | null
          source_model?: string | null
          source_platform?: string
          uploaded_by?: string | null
          webhook_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_evidence_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_evidence_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "audit_session_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_evidence_webhook_event_id_fkey"
            columns: ["webhook_event_id"]
            isOneToOne: false
            referencedRelation: "webhook_events"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_findings: {
        Row: {
          audit_id: string
          capa_id: string | null
          checklist_item_id: string | null
          created_at: string
          created_by: string | null
          description: string
          finding_source: string
          human_decision: string | null
          id: string
          notes: string | null
          owner_user_id: string | null
          primary_evidence_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          room_id: string | null
          session_id: string | null
          severity: string
          source_confidence: number | null
          source_key: string | null
          source_model: string | null
          status: string
          title: string | null
          updated_at: string
        }
        Insert: {
          audit_id: string
          capa_id?: string | null
          checklist_item_id?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          finding_source?: string
          human_decision?: string | null
          id?: string
          notes?: string | null
          owner_user_id?: string | null
          primary_evidence_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          room_id?: string | null
          session_id?: string | null
          severity?: string
          source_confidence?: number | null
          source_key?: string | null
          source_model?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          audit_id?: string
          capa_id?: string | null
          checklist_item_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          finding_source?: string
          human_decision?: string | null
          id?: string
          notes?: string | null
          owner_user_id?: string | null
          primary_evidence_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          room_id?: string | null
          session_id?: string | null
          severity?: string
          source_confidence?: number | null
          source_key?: string | null
          source_model?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_findings_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_checklist_item_id_fkey"
            columns: ["checklist_item_id"]
            isOneToOne: false
            referencedRelation: "audit_checklist_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_primary_evidence_id_fkey"
            columns: ["primary_evidence_id"]
            isOneToOne: false
            referencedRelation: "audit_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "audit_session_results"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_grants: {
        Row: {
          certifications: string[] | null
          created_at: string
          expires_at: string | null
          exporter_country: string | null
          exporter_id: string
          exporter_name: string
          facility_name: string
          facility_type: string | null
          granted_at: string
          id: string
          importer_id: string
          last_audit_date: string | null
          request_id: string | null
          revoked_at: string | null
          scope: string[]
          shinrai_score: number | null
          status: string
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string
          expires_at?: string | null
          exporter_country?: string | null
          exporter_id: string
          exporter_name: string
          facility_name: string
          facility_type?: string | null
          granted_at?: string
          id?: string
          importer_id: string
          last_audit_date?: string | null
          request_id?: string | null
          revoked_at?: string | null
          scope?: string[]
          shinrai_score?: number | null
          status?: string
        }
        Update: {
          certifications?: string[] | null
          created_at?: string
          expires_at?: string | null
          exporter_country?: string | null
          exporter_id?: string
          exporter_name?: string
          facility_name?: string
          facility_type?: string | null
          granted_at?: string
          id?: string
          importer_id?: string
          last_audit_date?: string | null
          request_id?: string | null
          revoked_at?: string | null
          scope?: string[]
          shinrai_score?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_grants_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "audit_access_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_passport_log: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          details: Json | null
          grant_id: string | null
          id: string
          ip_address: unknown
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          details?: Json | null
          grant_id?: string | null
          id?: string
          ip_address?: unknown
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          details?: Json | null
          grant_id?: string | null
          id?: string
          ip_address?: unknown
        }
        Relationships: [
          {
            foreignKeyName: "audit_passport_log_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "audit_grants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_session_results: {
        Row: {
          ai_analysis: Json
          audit_id: string | null
          checklist: Json
          checklist_issue_count: number
          checklist_ok_count: number
          created_at: string
          duration_seconds: number
          ended_at: string
          id: string
          notes: string | null
          owner_user_id: string | null
          provider: string
          room_id: string | null
          session_status: string
          started_at: string
          transcript: Json
          user_id: string
        }
        Insert: {
          ai_analysis?: Json
          audit_id?: string | null
          checklist?: Json
          checklist_issue_count?: number
          checklist_ok_count?: number
          created_at?: string
          duration_seconds?: number
          ended_at?: string
          id?: string
          notes?: string | null
          owner_user_id?: string | null
          provider: string
          room_id?: string | null
          session_status?: string
          started_at?: string
          transcript?: Json
          user_id: string
        }
        Update: {
          ai_analysis?: Json
          audit_id?: string | null
          checklist?: Json
          checklist_issue_count?: number
          checklist_ok_count?: number
          created_at?: string
          duration_seconds?: number
          ended_at?: string
          id?: string
          notes?: string | null
          owner_user_id?: string | null
          provider?: string
          room_id?: string | null
          session_status?: string
          started_at?: string
          transcript?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_session_results_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_shared_documents: {
        Row: {
          created_at: string
          doc_name: string
          doc_type: string
          download_url: string | null
          expires_at: string | null
          grant_id: string
          hash: string | null
          id: string
          issued_at: string
          metadata: Json | null
          storage_path: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          doc_name: string
          doc_type: string
          download_url?: string | null
          expires_at?: string | null
          grant_id: string
          hash?: string | null
          id?: string
          issued_at?: string
          metadata?: Json | null
          storage_path?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          doc_name?: string
          doc_type?: string
          download_url?: string | null
          expires_at?: string | null
          grant_id?: string
          hash?: string | null
          id?: string
          issued_at?: string
          metadata?: Json | null
          storage_path?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_shared_documents_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "audit_grants"
            referencedColumns: ["id"]
          },
        ]
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
      audit_video_analyses: {
        Row: {
          audit_id: string | null
          created_at: string
          created_by: string | null
          critical_observations: Json
          duration_s: number
          frame_count: number
          frame_findings: Json
          geo_accuracy_m: number | null
          geo_address: string | null
          geo_lat: number | null
          geo_lng: number | null
          geo_plus_code: string | null
          geo_timestamp_iso: string | null
          id: string
          model_used: string | null
          overall_status: string
          positive_observations: Json
          recommendations: Json
          score: number
          standard: string
          written_report: string | null
          zone: string
        }
        Insert: {
          audit_id?: string | null
          created_at?: string
          created_by?: string | null
          critical_observations?: Json
          duration_s: number
          frame_count: number
          frame_findings?: Json
          geo_accuracy_m?: number | null
          geo_address?: string | null
          geo_lat?: number | null
          geo_lng?: number | null
          geo_plus_code?: string | null
          geo_timestamp_iso?: string | null
          id?: string
          model_used?: string | null
          overall_status: string
          positive_observations?: Json
          recommendations?: Json
          score: number
          standard?: string
          written_report?: string | null
          zone: string
        }
        Update: {
          audit_id?: string | null
          created_at?: string
          created_by?: string | null
          critical_observations?: Json
          duration_s?: number
          frame_count?: number
          frame_findings?: Json
          geo_accuracy_m?: number | null
          geo_address?: string | null
          geo_lat?: number | null
          geo_lng?: number | null
          geo_plus_code?: string | null
          geo_timestamp_iso?: string | null
          id?: string
          model_used?: string | null
          overall_status?: string
          positive_observations?: Json
          recommendations?: Json
          score?: number
          standard?: string
          written_report?: string | null
          zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_video_analyses_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          ampel: Database["public"]["Enums"]["ampel_status"] | null
          auditor_id: string | null
          company_id: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          facility: string | null
          facility_id: string | null
          id: string
          overall_score: number | null
          scheduled_at: string | null
          status: Database["public"]["Enums"]["audit_status"]
          title: string
          updated_at: string
        }
        Insert: {
          ampel?: Database["public"]["Enums"]["ampel_status"] | null
          auditor_id?: string | null
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          facility?: string | null
          facility_id?: string | null
          id?: string
          overall_score?: number | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["audit_status"]
          title: string
          updated_at?: string
        }
        Update: {
          ampel?: Database["public"]["Enums"]["ampel_status"] | null
          auditor_id?: string | null
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          facility?: string | null
          facility_id?: string | null
          id?: string
          overall_score?: number | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["audit_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audits_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_audit_log: {
        Row: {
          action: string
          batch_id: string
          created_at: string
          details: Json | null
          id: string
          integrity_hash: string | null
          new_status: Database["public"]["Enums"]["batch_status"] | null
          old_status: Database["public"]["Enums"]["batch_status"] | null
          signature_reason: string | null
          signature_verified: boolean | null
          signed_by_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          batch_id: string
          created_at?: string
          details?: Json | null
          id?: string
          integrity_hash?: string | null
          new_status?: Database["public"]["Enums"]["batch_status"] | null
          old_status?: Database["public"]["Enums"]["batch_status"] | null
          signature_reason?: string | null
          signature_verified?: boolean | null
          signed_by_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          batch_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          integrity_hash?: string | null
          new_status?: Database["public"]["Enums"]["batch_status"] | null
          old_status?: Database["public"]["Enums"]["batch_status"] | null
          signature_reason?: string | null
          signature_verified?: boolean | null
          signed_by_email?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_audit_log_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_carbon_footprint: {
        Row: {
          batch_id: string
          calculated_by: string | null
          calculation_method: string
          created_at: string
          distance_km: number | null
          id: string
          integrity_hash: string | null
          notes: string | null
          packaging_co2_kg: number
          processing_co2_kg: number
          total_co2_kg: number
          transport_co2_kg: number
          transport_mode: string | null
          updated_at: string
        }
        Insert: {
          batch_id: string
          calculated_by?: string | null
          calculation_method?: string
          created_at?: string
          distance_km?: number | null
          id?: string
          integrity_hash?: string | null
          notes?: string | null
          packaging_co2_kg?: number
          processing_co2_kg?: number
          total_co2_kg?: number
          transport_co2_kg?: number
          transport_mode?: string | null
          updated_at?: string
        }
        Update: {
          batch_id?: string
          calculated_by?: string | null
          calculation_method?: string
          created_at?: string
          distance_km?: number | null
          id?: string
          integrity_hash?: string | null
          notes?: string | null
          packaging_co2_kg?: number
          processing_co2_kg?: number
          total_co2_kg?: number
          transport_co2_kg?: number
          transport_mode?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batch_carbon_footprint_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_documents: {
        Row: {
          batch_id: string
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          id: string
          integrity_hash: string | null
          uploaded_by: string | null
        }
        Insert: {
          batch_id: string
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          id?: string
          integrity_hash?: string | null
          uploaded_by?: string | null
        }
        Update: {
          batch_id?: string
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          id?: string
          integrity_hash?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_documents_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_recalls: {
        Row: {
          affected_countries: string[] | null
          affected_markets: string[] | null
          affected_parameter: string | null
          affected_quantity: number | null
          affected_value: string | null
          batch_id: string
          completed_at: string | null
          completion_notes: string | null
          corrective_action: string | null
          created_at: string
          description: string | null
          id: string
          initiated_at: string
          initiated_by: string
          reason: string
          recall_number: string
          regulatory_limit: string | null
          root_cause: string | null
          severity: string
          source_batch_id: string | null
          status: string
          total_affected_batches: number | null
          total_affected_weight_kg: number | null
          updated_at: string
        }
        Insert: {
          affected_countries?: string[] | null
          affected_markets?: string[] | null
          affected_parameter?: string | null
          affected_quantity?: number | null
          affected_value?: string | null
          batch_id: string
          completed_at?: string | null
          completion_notes?: string | null
          corrective_action?: string | null
          created_at?: string
          description?: string | null
          id?: string
          initiated_at?: string
          initiated_by: string
          reason: string
          recall_number: string
          regulatory_limit?: string | null
          root_cause?: string | null
          severity?: string
          source_batch_id?: string | null
          status?: string
          total_affected_batches?: number | null
          total_affected_weight_kg?: number | null
          updated_at?: string
        }
        Update: {
          affected_countries?: string[] | null
          affected_markets?: string[] | null
          affected_parameter?: string | null
          affected_quantity?: number | null
          affected_value?: string | null
          batch_id?: string
          completed_at?: string | null
          completion_notes?: string | null
          corrective_action?: string | null
          created_at?: string
          description?: string | null
          id?: string
          initiated_at?: string
          initiated_by?: string
          reason?: string
          recall_number?: string
          regulatory_limit?: string | null
          root_cause?: string | null
          severity?: string
          source_batch_id?: string | null
          status?: string
          total_affected_batches?: number | null
          total_affected_weight_kg?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batch_recalls_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_recalls_source_batch_id_fkey"
            columns: ["source_batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_records: {
        Row: {
          audit_id: string | null
          batch_number: string
          cbd_content: number | null
          certificate_id: string | null
          coa_url: string | null
          created_at: string
          created_by: string | null
          expiry_date: string | null
          external_id: string | null
          facility_id: string | null
          harvest_date: string | null
          id: string
          metadata: Json | null
          processing_date: string | null
          product_name: string
          quantity_kg: number | null
          release_date: string | null
          source_platform: string | null
          stage: string
          status: string
          thc_content: number | null
          updated_at: string
        }
        Insert: {
          audit_id?: string | null
          batch_number: string
          cbd_content?: number | null
          certificate_id?: string | null
          coa_url?: string | null
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          external_id?: string | null
          facility_id?: string | null
          harvest_date?: string | null
          id?: string
          metadata?: Json | null
          processing_date?: string | null
          product_name: string
          quantity_kg?: number | null
          release_date?: string | null
          source_platform?: string | null
          stage?: string
          status?: string
          thc_content?: number | null
          updated_at?: string
        }
        Update: {
          audit_id?: string | null
          batch_number?: string
          cbd_content?: number | null
          certificate_id?: string | null
          coa_url?: string | null
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          external_id?: string | null
          facility_id?: string | null
          harvest_date?: string | null
          id?: string
          metadata?: Json | null
          processing_date?: string | null
          product_name?: string
          quantity_kg?: number | null
          release_date?: string | null
          source_platform?: string | null
          stage?: string
          status?: string
          thc_content?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batch_records_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_records_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_records_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_rejections: {
        Row: {
          affected_packaging_units: number | null
          affected_quantity_kg: number | null
          batch_id: string | null
          capa_id: string | null
          corrective_action: string | null
          created_at: string | null
          evidence_ids: string[] | null
          financial_impact: Json | null
          id: string
          importer_company: string | null
          importer_contact: string | null
          investigation_notes: string | null
          org_id: string | null
          owner_user_id: string | null
          reason: Database["public"]["Enums"]["rejection_reason"]
          reason_detail: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_number: string
          resolution_notes: string | null
          resolution_type: string | null
          resolved_at: string | null
          resolved_by: string | null
          return_carrier: string | null
          return_received_at: string | null
          return_received_by: string | null
          return_shipped_at: string | null
          return_tracking_number: string | null
          root_cause: string | null
          shipment_id: string | null
          status: Database["public"]["Enums"]["return_status"] | null
          updated_at: string | null
        }
        Insert: {
          affected_packaging_units?: number | null
          affected_quantity_kg?: number | null
          batch_id?: string | null
          capa_id?: string | null
          corrective_action?: string | null
          created_at?: string | null
          evidence_ids?: string[] | null
          financial_impact?: Json | null
          id?: string
          importer_company?: string | null
          importer_contact?: string | null
          investigation_notes?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          reason: Database["public"]["Enums"]["rejection_reason"]
          reason_detail?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_number: string
          resolution_notes?: string | null
          resolution_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          return_carrier?: string | null
          return_received_at?: string | null
          return_received_by?: string | null
          return_shipped_at?: string | null
          return_tracking_number?: string | null
          root_cause?: string | null
          shipment_id?: string | null
          status?: Database["public"]["Enums"]["return_status"] | null
          updated_at?: string | null
        }
        Update: {
          affected_packaging_units?: number | null
          affected_quantity_kg?: number | null
          batch_id?: string | null
          capa_id?: string | null
          corrective_action?: string | null
          created_at?: string | null
          evidence_ids?: string[] | null
          financial_impact?: Json | null
          id?: string
          importer_company?: string | null
          importer_contact?: string | null
          investigation_notes?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          reason?: Database["public"]["Enums"]["rejection_reason"]
          reason_detail?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_number?: string
          resolution_notes?: string | null
          resolution_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          return_carrier?: string | null
          return_received_at?: string | null
          return_received_by?: string | null
          return_shipped_at?: string | null
          return_tracking_number?: string | null
          root_cause?: string | null
          shipment_id?: string | null
          status?: Database["public"]["Enums"]["return_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_rejections_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_rejections_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_rejections_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_verification_tokens: {
        Row: {
          batch_id: string
          created_by: string | null
          expires_at: string | null
          id: string
          issued_at: string
          last_verified_at: string | null
          token: string
          verification_hash: string
          verified_count: number
        }
        Insert: {
          batch_id: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          last_verified_at?: string | null
          token: string
          verification_hash: string
          verified_count?: number
        }
        Update: {
          batch_id?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          last_verified_at?: string | null
          token?: string
          verification_hash?: string
          verified_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "batch_verification_tokens_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          admin_notes: string | null
          ai_analysis_completed_at: string | null
          ai_analysis_requested_at: string | null
          ai_analysis_result: Json | null
          ai_analysis_status: string | null
          anthropic_batch_id: string | null
          auction_closed_at: string | null
          auction_open: boolean
          auction_opened_at: string | null
          available_from: string | null
          available_until: string | null
          batch_number: string
          blockchain_anchored_at: string | null
          blockchain_block_number: number | null
          blockchain_network: string | null
          blockchain_tx_hash: string | null
          category: string | null
          cbd: number | null
          cbd_content: number | null
          certification: string | null
          chain_root_hash: string | null
          compliance_score: string | null
          created_at: string
          delivered_at: string | null
          delivery_radius_km: number | null
          document_name: string | null
          document_url: string | null
          earliest_delivery_date: string | null
          end_customer_confirmed_at: string | null
          expiry_date: string | null
          exporter_id: string | null
          facility: string | null
          gacp_certificate_number: string | null
          gs1_batch_lot: string | null
          gs1_expiry_date: string | null
          gs1_gtin: string | null
          gs1_serial_number: string | null
          gs1_sscc: string | null
          harvest_date: string | null
          harvest_weight_kg: number | null
          id: string
          image_url: string | null
          importer_id: string | null
          lab_accreditation_number: string | null
          listed_at: string | null
          manufacturing_date: string | null
          marketplace_batch_id: string | null
          marketplace_synced_at: string | null
          media_urls: string[]
          min_order_quantity: number | null
          notes: string | null
          order_id: string | null
          org_id: string | null
          origin: string | null
          origin_country: string | null
          original_batch_number: string | null
          owner_user_id: string | null
          parent_batch_id: string | null
          permit_bfarm_germany: string | null
          permit_eu_import: string | null
          permit_eu_import_expiry: string | null
          permit_gacp_certificate: string | null
          permit_gacp_expiry: string | null
          permit_gmp_certificate: string | null
          permit_gmp_expiry: string | null
          permit_thai_fda_expiry: string | null
          permit_thai_fda_export: string | null
          permit_thai_ncb: string | null
          phytosanitary_cert: string | null
          pickup_available: boolean
          post_harvest_service: boolean
          post_harvest_weight_kg: number | null
          price: number | null
          product: string | null
          product_name: string
          province: string | null
          qp_released_at: string | null
          qp_released_by: string | null
          quantity: number
          reviewed_at: string | null
          reviewed_by: string | null
          risk_score: string | null
          seller_description: string | null
          shinrai_score: number | null
          shinrai_status: string | null
          shipment_id: string | null
          split_at: string | null
          split_reason: string | null
          split_type: string | null
          split_weight_kg: number | null
          status: Database["public"]["Enums"]["batch_status"]
          strain: string | null
          supplier_id: string | null
          target_markets: string[] | null
          thc: number | null
          thc_content: number | null
          track_public_token: string | null
          trade_type: Database["public"]["Enums"]["trade_type"]
          un_narcotic_form_number: string | null
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
          auction_closed_at?: string | null
          auction_open?: boolean
          auction_opened_at?: string | null
          available_from?: string | null
          available_until?: string | null
          batch_number: string
          blockchain_anchored_at?: string | null
          blockchain_block_number?: number | null
          blockchain_network?: string | null
          blockchain_tx_hash?: string | null
          category?: string | null
          cbd?: number | null
          cbd_content?: number | null
          certification?: string | null
          chain_root_hash?: string | null
          compliance_score?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_radius_km?: number | null
          document_name?: string | null
          document_url?: string | null
          earliest_delivery_date?: string | null
          end_customer_confirmed_at?: string | null
          expiry_date?: string | null
          exporter_id?: string | null
          facility?: string | null
          gacp_certificate_number?: string | null
          gs1_batch_lot?: string | null
          gs1_expiry_date?: string | null
          gs1_gtin?: string | null
          gs1_serial_number?: string | null
          gs1_sscc?: string | null
          harvest_date?: string | null
          harvest_weight_kg?: number | null
          id?: string
          image_url?: string | null
          importer_id?: string | null
          lab_accreditation_number?: string | null
          listed_at?: string | null
          manufacturing_date?: string | null
          marketplace_batch_id?: string | null
          marketplace_synced_at?: string | null
          media_urls?: string[]
          min_order_quantity?: number | null
          notes?: string | null
          order_id?: string | null
          org_id?: string | null
          origin?: string | null
          origin_country?: string | null
          original_batch_number?: string | null
          owner_user_id?: string | null
          parent_batch_id?: string | null
          permit_bfarm_germany?: string | null
          permit_eu_import?: string | null
          permit_eu_import_expiry?: string | null
          permit_gacp_certificate?: string | null
          permit_gacp_expiry?: string | null
          permit_gmp_certificate?: string | null
          permit_gmp_expiry?: string | null
          permit_thai_fda_expiry?: string | null
          permit_thai_fda_export?: string | null
          permit_thai_ncb?: string | null
          phytosanitary_cert?: string | null
          pickup_available?: boolean
          post_harvest_service?: boolean
          post_harvest_weight_kg?: number | null
          price?: number | null
          product?: string | null
          product_name: string
          province?: string | null
          qp_released_at?: string | null
          qp_released_by?: string | null
          quantity?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: string | null
          seller_description?: string | null
          shinrai_score?: number | null
          shinrai_status?: string | null
          shipment_id?: string | null
          split_at?: string | null
          split_reason?: string | null
          split_type?: string | null
          split_weight_kg?: number | null
          status?: Database["public"]["Enums"]["batch_status"]
          strain?: string | null
          supplier_id?: string | null
          target_markets?: string[] | null
          thc?: number | null
          thc_content?: number | null
          track_public_token?: string | null
          trade_type?: Database["public"]["Enums"]["trade_type"]
          un_narcotic_form_number?: string | null
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
          auction_closed_at?: string | null
          auction_open?: boolean
          auction_opened_at?: string | null
          available_from?: string | null
          available_until?: string | null
          batch_number?: string
          blockchain_anchored_at?: string | null
          blockchain_block_number?: number | null
          blockchain_network?: string | null
          blockchain_tx_hash?: string | null
          category?: string | null
          cbd?: number | null
          cbd_content?: number | null
          certification?: string | null
          chain_root_hash?: string | null
          compliance_score?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_radius_km?: number | null
          document_name?: string | null
          document_url?: string | null
          earliest_delivery_date?: string | null
          end_customer_confirmed_at?: string | null
          expiry_date?: string | null
          exporter_id?: string | null
          facility?: string | null
          gacp_certificate_number?: string | null
          gs1_batch_lot?: string | null
          gs1_expiry_date?: string | null
          gs1_gtin?: string | null
          gs1_serial_number?: string | null
          gs1_sscc?: string | null
          harvest_date?: string | null
          harvest_weight_kg?: number | null
          id?: string
          image_url?: string | null
          importer_id?: string | null
          lab_accreditation_number?: string | null
          listed_at?: string | null
          manufacturing_date?: string | null
          marketplace_batch_id?: string | null
          marketplace_synced_at?: string | null
          media_urls?: string[]
          min_order_quantity?: number | null
          notes?: string | null
          order_id?: string | null
          org_id?: string | null
          origin?: string | null
          origin_country?: string | null
          original_batch_number?: string | null
          owner_user_id?: string | null
          parent_batch_id?: string | null
          permit_bfarm_germany?: string | null
          permit_eu_import?: string | null
          permit_eu_import_expiry?: string | null
          permit_gacp_certificate?: string | null
          permit_gacp_expiry?: string | null
          permit_gmp_certificate?: string | null
          permit_gmp_expiry?: string | null
          permit_thai_fda_expiry?: string | null
          permit_thai_fda_export?: string | null
          permit_thai_ncb?: string | null
          phytosanitary_cert?: string | null
          pickup_available?: boolean
          post_harvest_service?: boolean
          post_harvest_weight_kg?: number | null
          price?: number | null
          product?: string | null
          product_name?: string
          province?: string | null
          qp_released_at?: string | null
          qp_released_by?: string | null
          quantity?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: string | null
          seller_description?: string | null
          shinrai_score?: number | null
          shinrai_status?: string | null
          shipment_id?: string | null
          split_at?: string | null
          split_reason?: string | null
          split_type?: string | null
          split_weight_kg?: number | null
          status?: Database["public"]["Enums"]["batch_status"]
          strain?: string | null
          supplier_id?: string | null
          target_markets?: string[] | null
          thc?: number | null
          thc_content?: number | null
          track_public_token?: string | null
          trade_type?: Database["public"]["Enums"]["trade_type"]
          un_narcotic_form_number?: string | null
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "batches_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batches_parent_batch_id_fkey"
            columns: ["parent_batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batches_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batches_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      bids: {
        Row: {
          amount: number
          batch_id: string
          created_at: string
          id: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          batch_id: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          batch_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
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
      buyer_preferences: {
        Row: {
          budget_max_eur: number | null
          budget_max_thb: number | null
          budget_min_eur: number | null
          budget_min_thb: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          license_status_required: string[] | null
          max_established_years_ago: number | null
          max_monthly_expenses: number | null
          min_monthly_revenue: number | null
          min_shinrai_score: number | null
          name: string
          preferred_countries: string[] | null
          preferred_regions: string[] | null
          preferred_types: string[] | null
          require_active_license: boolean | null
          require_financials: boolean | null
          sqm_max: number | null
          sqm_min: number | null
          updated_at: string | null
          user_id: string
          weight_location: number | null
          weight_price: number | null
          weight_revenue: number | null
          weight_shinrai: number | null
          weight_size: number | null
        }
        Insert: {
          budget_max_eur?: number | null
          budget_max_thb?: number | null
          budget_min_eur?: number | null
          budget_min_thb?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          license_status_required?: string[] | null
          max_established_years_ago?: number | null
          max_monthly_expenses?: number | null
          min_monthly_revenue?: number | null
          min_shinrai_score?: number | null
          name?: string
          preferred_countries?: string[] | null
          preferred_regions?: string[] | null
          preferred_types?: string[] | null
          require_active_license?: boolean | null
          require_financials?: boolean | null
          sqm_max?: number | null
          sqm_min?: number | null
          updated_at?: string | null
          user_id: string
          weight_location?: number | null
          weight_price?: number | null
          weight_revenue?: number | null
          weight_shinrai?: number | null
          weight_size?: number | null
        }
        Update: {
          budget_max_eur?: number | null
          budget_max_thb?: number | null
          budget_min_eur?: number | null
          budget_min_thb?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          license_status_required?: string[] | null
          max_established_years_ago?: number | null
          max_monthly_expenses?: number | null
          min_monthly_revenue?: number | null
          min_shinrai_score?: number | null
          name?: string
          preferred_countries?: string[] | null
          preferred_regions?: string[] | null
          preferred_types?: string[] | null
          require_active_license?: boolean | null
          require_financials?: boolean | null
          sqm_max?: number | null
          sqm_min?: number | null
          updated_at?: string | null
          user_id?: string
          weight_location?: number | null
          weight_price?: number | null
          weight_revenue?: number | null
          weight_shinrai?: number | null
          weight_size?: number | null
        }
        Relationships: []
      }
      cache_batches: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_compliance: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_contacts: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_farms: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_lux_clients: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_market: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_properties: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      cache_strains: {
        Row: {
          data: Json | null
          id: string
          synced_at: string | null
        }
        Insert: {
          data?: Json | null
          id: string
          synced_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          synced_at?: string | null
        }
        Relationships: []
      }
      calibration_records: {
        Row: {
          calibration_date: string
          calibration_number: string
          certificate_number: string | null
          certificate_url: string | null
          created_at: string
          created_by: string | null
          deviation: number | null
          equipment_id: string
          external_lab: string | null
          id: string
          integrity_hash: string | null
          metadata: Json | null
          next_due_at: string | null
          notes: string | null
          pass: boolean | null
          performed_by: string | null
          performed_by_name: string | null
          result: string | null
          standard_used: string | null
          status: Database["public"]["Enums"]["calibration_status"]
          tolerance: number | null
          updated_at: string
        }
        Insert: {
          calibration_date?: string
          calibration_number: string
          certificate_number?: string | null
          certificate_url?: string | null
          created_at?: string
          created_by?: string | null
          deviation?: number | null
          equipment_id: string
          external_lab?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          next_due_at?: string | null
          notes?: string | null
          pass?: boolean | null
          performed_by?: string | null
          performed_by_name?: string | null
          result?: string | null
          standard_used?: string | null
          status?: Database["public"]["Enums"]["calibration_status"]
          tolerance?: number | null
          updated_at?: string
        }
        Update: {
          calibration_date?: string
          calibration_number?: string
          certificate_number?: string | null
          certificate_url?: string | null
          created_at?: string
          created_by?: string | null
          deviation?: number | null
          equipment_id?: string
          external_lab?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          next_due_at?: string | null
          notes?: string | null
          pass?: boolean | null
          performed_by?: string | null
          performed_by_name?: string | null
          result?: string | null
          standard_used?: string | null
          status?: Database["public"]["Enums"]["calibration_status"]
          tolerance?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_records_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      capa_comments: {
        Row: {
          capa_id: string
          comment: string
          comment_type: string
          created_at: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          capa_id: string
          comment: string
          comment_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          capa_id?: string
          comment?: string
          comment_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "capa_comments_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
        ]
      }
      capas: {
        Row: {
          assigned_to: string | null
          audit_id: string | null
          capa_number: string
          capa_type: Database["public"]["Enums"]["capa_type"]
          category: string
          closed_at: string | null
          corrective_action: string | null
          created_at: string
          description: string | null
          due_at: string | null
          effectiveness_check: string | null
          effectiveness_result: string | null
          effectiveness_verified_at: string | null
          id: string
          identified_at: string
          owner_id: string
          preventive_action: string | null
          priority: Database["public"]["Enums"]["capa_priority"]
          root_cause: string | null
          sop_id: string | null
          source_type: string | null
          status: Database["public"]["Enums"]["capa_status"]
          tags: string[] | null
          title: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          assigned_to?: string | null
          audit_id?: string | null
          capa_number: string
          capa_type?: Database["public"]["Enums"]["capa_type"]
          category?: string
          closed_at?: string | null
          corrective_action?: string | null
          created_at?: string
          description?: string | null
          due_at?: string | null
          effectiveness_check?: string | null
          effectiveness_result?: string | null
          effectiveness_verified_at?: string | null
          id?: string
          identified_at?: string
          owner_id: string
          preventive_action?: string | null
          priority?: Database["public"]["Enums"]["capa_priority"]
          root_cause?: string | null
          sop_id?: string | null
          source_type?: string | null
          status?: Database["public"]["Enums"]["capa_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          assigned_to?: string | null
          audit_id?: string | null
          capa_number?: string
          capa_type?: Database["public"]["Enums"]["capa_type"]
          category?: string
          closed_at?: string | null
          corrective_action?: string | null
          created_at?: string
          description?: string | null
          due_at?: string | null
          effectiveness_check?: string | null
          effectiveness_result?: string | null
          effectiveness_verified_at?: string | null
          id?: string
          identified_at?: string
          owner_id?: string
          preventive_action?: string | null
          priority?: Database["public"]["Enums"]["capa_priority"]
          root_cause?: string | null
          sop_id?: string | null
          source_type?: string | null
          status?: Database["public"]["Enums"]["capa_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "capas_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capas_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      carbon_footprint_entries: {
        Row: {
          activity: string
          batch_id: string | null
          calculated_at: string | null
          co2e_kg: number | null
          created_by: string | null
          emission_factor: number | null
          emission_factor_source: string | null
          id: string
          notes: string | null
          phase: string
          quantity: number | null
          shipment_id: string | null
          unit: string
        }
        Insert: {
          activity: string
          batch_id?: string | null
          calculated_at?: string | null
          co2e_kg?: number | null
          created_by?: string | null
          emission_factor?: number | null
          emission_factor_source?: string | null
          id?: string
          notes?: string | null
          phase: string
          quantity?: number | null
          shipment_id?: string | null
          unit: string
        }
        Update: {
          activity?: string
          batch_id?: string | null
          calculated_at?: string | null
          co2e_kg?: number | null
          created_by?: string | null
          emission_factor?: number | null
          emission_factor_source?: string | null
          id?: string
          notes?: string | null
          phase?: string
          quantity?: number | null
          shipment_id?: string | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_footprint_entries_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carbon_footprint_entries_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          created_at: string
          expires_at: string | null
          id: string
          identity_token: string | null
          integrity_hash: string | null
          issued_at: string
          participant_name: string
          session_date: string
          session_id: string
          session_title: string
          user_id: string
        }
        Insert: {
          certificate_number: string
          created_at?: string
          expires_at?: string | null
          id?: string
          identity_token?: string | null
          integrity_hash?: string | null
          issued_at?: string
          participant_name: string
          session_date: string
          session_id: string
          session_title: string
          user_id: string
        }
        Update: {
          certificate_number?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          identity_token?: string | null
          integrity_hash?: string | null
          issued_at?: string
          participant_name?: string
          session_date?: string
          session_id?: string
          session_title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "classroom_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      change_requests: {
        Row: {
          affected_processes: string[] | null
          affected_sops: string[] | null
          approved_at: string | null
          approved_by: string | null
          assigned_to: string | null
          audit_id: string | null
          capa_id: string | null
          category: Database["public"]["Enums"]["change_category"]
          change_number: string
          created_at: string
          description: string | null
          facility_id: string | null
          id: string
          impact_assessment: string | null
          implementation_plan: string | null
          implemented_at: string | null
          implemented_by: string | null
          priority: Database["public"]["Enums"]["change_priority"]
          rejection_reason: string | null
          requester_id: string
          risk_assessment: string | null
          sop_id: string | null
          status: Database["public"]["Enums"]["change_status"]
          title: string
          updated_at: string
          verification_result: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          affected_processes?: string[] | null
          affected_sops?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          audit_id?: string | null
          capa_id?: string | null
          category?: Database["public"]["Enums"]["change_category"]
          change_number: string
          created_at?: string
          description?: string | null
          facility_id?: string | null
          id?: string
          impact_assessment?: string | null
          implementation_plan?: string | null
          implemented_at?: string | null
          implemented_by?: string | null
          priority?: Database["public"]["Enums"]["change_priority"]
          rejection_reason?: string | null
          requester_id: string
          risk_assessment?: string | null
          sop_id?: string | null
          status?: Database["public"]["Enums"]["change_status"]
          title: string
          updated_at?: string
          verification_result?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          affected_processes?: string[] | null
          affected_sops?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          audit_id?: string | null
          capa_id?: string | null
          category?: Database["public"]["Enums"]["change_category"]
          change_number?: string
          created_at?: string
          description?: string | null
          facility_id?: string | null
          id?: string
          impact_assessment?: string | null
          implementation_plan?: string | null
          implemented_at?: string | null
          implemented_by?: string | null
          priority?: Database["public"]["Enums"]["change_priority"]
          rejection_reason?: string | null
          requester_id?: string
          risk_assessment?: string | null
          sop_id?: string | null
          status?: Database["public"]["Enums"]["change_status"]
          title?: string
          updated_at?: string
          verification_result?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "change_requests_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_requests_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_requests_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_requests_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_template_items: {
        Row: {
          category: string
          id: string
          question: string
          sort_order: number
          template_id: string
        }
        Insert: {
          category: string
          id?: string
          question: string
          sort_order?: number
          template_id: string
        }
        Update: {
          category?: string
          id?: string
          question?: string
          sort_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      checkpoint_evidence: {
        Row: {
          batch_id: string | null
          caption: string | null
          captured_at: string | null
          captured_by: string | null
          checkpoint_type: string | null
          created_at: string | null
          evidence_type: string
          file_name: string | null
          file_size_bytes: number | null
          file_url: string
          hash_sha256: string | null
          id: string
          location: Json | null
          metadata: Json | null
          mime_type: string | null
          org_id: string | null
          owner_user_id: string | null
          packaging_unit_id: string | null
          shipment_id: string | null
          supply_chain_event_id: string | null
          thumbnail_url: string | null
        }
        Insert: {
          batch_id?: string | null
          caption?: string | null
          captured_at?: string | null
          captured_by?: string | null
          checkpoint_type?: string | null
          created_at?: string | null
          evidence_type: string
          file_name?: string | null
          file_size_bytes?: number | null
          file_url: string
          hash_sha256?: string | null
          id?: string
          location?: Json | null
          metadata?: Json | null
          mime_type?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          packaging_unit_id?: string | null
          shipment_id?: string | null
          supply_chain_event_id?: string | null
          thumbnail_url?: string | null
        }
        Update: {
          batch_id?: string | null
          caption?: string | null
          captured_at?: string | null
          captured_by?: string | null
          checkpoint_type?: string | null
          created_at?: string | null
          evidence_type?: string
          file_name?: string | null
          file_size_bytes?: number | null
          file_url?: string
          hash_sha256?: string | null
          id?: string
          location?: Json | null
          metadata?: Json | null
          mime_type?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          packaging_unit_id?: string | null
          shipment_id?: string | null
          supply_chain_event_id?: string | null
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checkpoint_evidence_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoint_evidence_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoint_evidence_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoint_evidence_supply_chain_event_id_fkey"
            columns: ["supply_chain_event_id"]
            isOneToOne: false
            referencedRelation: "supply_chain_events"
            referencedColumns: ["id"]
          },
        ]
      }
      classroom_sessions: {
        Row: {
          ai_summary: string | null
          ai_transcript: string | null
          created_at: string
          description: string | null
          ended_at: string | null
          id: string
          instructor_id: string | null
          max_participants: number | null
          meeting_url: string | null
          recording_url: string | null
          scheduled_at: string
          status: Database["public"]["Enums"]["session_status"]
          title: string
          updated_at: string
        }
        Insert: {
          ai_summary?: string | null
          ai_transcript?: string | null
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          instructor_id?: string | null
          max_participants?: number | null
          meeting_url?: string | null
          recording_url?: string | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["session_status"]
          title: string
          updated_at?: string
        }
        Update: {
          ai_summary?: string | null
          ai_transcript?: string | null
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          instructor_id?: string | null
          max_participants?: number | null
          meeting_url?: string | null
          recording_url?: string | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["session_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cleaning_records: {
        Row: {
          cleaning_date: string
          cleaning_number: string
          created_at: string
          deviation_id: string | null
          id: string
          integrity_hash: string | null
          metadata: Json | null
          notes: string | null
          performed_by: string | null
          performed_by_name: string | null
          residue_pass: boolean | null
          residue_result: number | null
          schedule_id: string
          status: Database["public"]["Enums"]["cleaning_status"]
          swab_locations: string[] | null
          verified_at: string | null
          verified_by: string | null
          verified_by_name: string | null
        }
        Insert: {
          cleaning_date?: string
          cleaning_number: string
          created_at?: string
          deviation_id?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          notes?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          residue_pass?: boolean | null
          residue_result?: number | null
          schedule_id: string
          status?: Database["public"]["Enums"]["cleaning_status"]
          swab_locations?: string[] | null
          verified_at?: string | null
          verified_by?: string | null
          verified_by_name?: string | null
        }
        Update: {
          cleaning_date?: string
          cleaning_number?: string
          created_at?: string
          deviation_id?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          notes?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          residue_pass?: boolean | null
          residue_result?: number | null
          schedule_id?: string
          status?: Database["public"]["Enums"]["cleaning_status"]
          swab_locations?: string[] | null
          verified_at?: string | null
          verified_by?: string | null
          verified_by_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_records_deviation_id_fkey"
            columns: ["deviation_id"]
            isOneToOne: false
            referencedRelation: "deviations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_records_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "cleaning_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaning_schedules: {
        Row: {
          acceptance_criteria: string | null
          cleaning_agent: string | null
          created_at: string
          equipment_id: string | null
          facility_id: string | null
          frequency_days: number
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          next_due_at: string | null
          owner_id: string | null
          procedure_sop_id: string | null
          residue_limit: number | null
          residue_unit: string | null
          room_name: string | null
          updated_at: string
        }
        Insert: {
          acceptance_criteria?: string | null
          cleaning_agent?: string | null
          created_at?: string
          equipment_id?: string | null
          facility_id?: string | null
          frequency_days?: number
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          next_due_at?: string | null
          owner_id?: string | null
          procedure_sop_id?: string | null
          residue_limit?: number | null
          residue_unit?: string | null
          room_name?: string | null
          updated_at?: string
        }
        Update: {
          acceptance_criteria?: string | null
          cleaning_agent?: string | null
          created_at?: string
          equipment_id?: string | null
          facility_id?: string | null
          frequency_days?: number
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          next_due_at?: string | null
          owner_id?: string | null
          procedure_sop_id?: string | null
          residue_limit?: number | null
          residue_unit?: string | null
          room_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_schedules_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_schedules_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_schedules_procedure_sop_id_fkey"
            columns: ["procedure_sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_chain_loggers: {
        Row: {
          batch_id: string | null
          created_at: string | null
          device_model: string | null
          excursion_count: number | null
          id: string
          logger_type: string
          max_excursion_c: number | null
          max_excursion_duration_min: number | null
          max_temp_c: number | null
          min_temp_c: number | null
          mkt_c: number | null
          org_id: string | null
          owner_user_id: string | null
          result: string | null
          serial_number: string
          shipment_id: string | null
          started_at: string | null
          status: string | null
          stopped_at: string | null
          total_readings: number | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          device_model?: string | null
          excursion_count?: number | null
          id?: string
          logger_type: string
          max_excursion_c?: number | null
          max_excursion_duration_min?: number | null
          max_temp_c?: number | null
          min_temp_c?: number | null
          mkt_c?: number | null
          org_id?: string | null
          owner_user_id?: string | null
          result?: string | null
          serial_number: string
          shipment_id?: string | null
          started_at?: string | null
          status?: string | null
          stopped_at?: string | null
          total_readings?: number | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          device_model?: string | null
          excursion_count?: number | null
          id?: string
          logger_type?: string
          max_excursion_c?: number | null
          max_excursion_duration_min?: number | null
          max_temp_c?: number | null
          min_temp_c?: number | null
          mkt_c?: number | null
          org_id?: string | null
          owner_user_id?: string | null
          result?: string | null
          serial_number?: string
          shipment_id?: string | null
          started_at?: string | null
          status?: string | null
          stopped_at?: string | null
          total_readings?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cold_chain_loggers_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_chain_loggers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_chain_loggers_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_chain_readings: {
        Row: {
          excursion_type: string | null
          humidity_percent: number | null
          id: string
          is_excursion: boolean | null
          logger_id: string | null
          org_id: string | null
          owner_user_id: string | null
          recorded_at: string
          temperature_c: number
        }
        Insert: {
          excursion_type?: string | null
          humidity_percent?: number | null
          id?: string
          is_excursion?: boolean | null
          logger_id?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          recorded_at: string
          temperature_c: number
        }
        Update: {
          excursion_type?: string | null
          humidity_percent?: number | null
          id?: string
          is_excursion?: boolean | null
          logger_id?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          recorded_at?: string
          temperature_c?: number
        }
        Relationships: [
          {
            foreignKeyName: "cold_chain_readings_logger_id_fkey"
            columns: ["logger_id"]
            isOneToOne: false
            referencedRelation: "cold_chain_loggers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_chain_readings_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          base_price: number
          batch_id: string | null
          commission_amount: number
          commission_rate: number
          commission_type: string
          created_at: string
          currency: string
          final_price: number
          id: string
          invoice_id: string | null
          notes: string | null
          purchase_request_id: string | null
          spread_amount: number
          status: string
          updated_at: string
        }
        Insert: {
          base_price?: number
          batch_id?: string | null
          commission_amount?: number
          commission_rate?: number
          commission_type: string
          created_at?: string
          currency?: string
          final_price?: number
          id?: string
          invoice_id?: string | null
          notes?: string | null
          purchase_request_id?: string | null
          spread_amount?: number
          status?: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          batch_id?: string | null
          commission_amount?: number
          commission_rate?: number
          commission_type?: string
          created_at?: string
          currency?: string
          final_price?: number
          id?: string
          invoice_id?: string | null
          notes?: string | null
          purchase_request_id?: string | null
          spread_amount?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          acknowledged_at: string | null
          assigned_to: string | null
          batch_id: string | null
          batch_number: string | null
          capa_id: string | null
          category: string
          closed_at: string | null
          closed_by: string | null
          complaint_number: string
          created_at: string
          description: string | null
          deviation_id: string | null
          facility_id: string | null
          id: string
          investigation_summary: string | null
          metadata: Json | null
          owner_id: string
          product_name: string | null
          regulatory_authority: string | null
          regulatory_report_date: string | null
          regulatory_reportable: boolean | null
          reported_at: string
          reporter_contact: string | null
          reporter_country: string | null
          reporter_name: string | null
          resolution: string | null
          resolved_at: string | null
          root_cause: string | null
          severity: Database["public"]["Enums"]["complaint_severity"]
          source: Database["public"]["Enums"]["complaint_source"]
          status: Database["public"]["Enums"]["complaint_status"]
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          assigned_to?: string | null
          batch_id?: string | null
          batch_number?: string | null
          capa_id?: string | null
          category?: string
          closed_at?: string | null
          closed_by?: string | null
          complaint_number: string
          created_at?: string
          description?: string | null
          deviation_id?: string | null
          facility_id?: string | null
          id?: string
          investigation_summary?: string | null
          metadata?: Json | null
          owner_id: string
          product_name?: string | null
          regulatory_authority?: string | null
          regulatory_report_date?: string | null
          regulatory_reportable?: boolean | null
          reported_at?: string
          reporter_contact?: string | null
          reporter_country?: string | null
          reporter_name?: string | null
          resolution?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          severity?: Database["public"]["Enums"]["complaint_severity"]
          source?: Database["public"]["Enums"]["complaint_source"]
          status?: Database["public"]["Enums"]["complaint_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          assigned_to?: string | null
          batch_id?: string | null
          batch_number?: string | null
          capa_id?: string | null
          category?: string
          closed_at?: string | null
          closed_by?: string | null
          complaint_number?: string
          created_at?: string
          description?: string | null
          deviation_id?: string | null
          facility_id?: string | null
          id?: string
          investigation_summary?: string | null
          metadata?: Json | null
          owner_id?: string
          product_name?: string | null
          regulatory_authority?: string | null
          regulatory_report_date?: string | null
          regulatory_reportable?: boolean | null
          reported_at?: string
          reporter_contact?: string | null
          reporter_country?: string | null
          reporter_name?: string | null
          resolution?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          severity?: Database["public"]["Enums"]["complaint_severity"]
          source?: Database["public"]["Enums"]["complaint_source"]
          status?: Database["public"]["Enums"]["complaint_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_deviation_id_fkey"
            columns: ["deviation_id"]
            isOneToOne: false
            referencedRelation: "deviations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_checklist_items: {
        Row: {
          batch_id: string
          checked: boolean
          checked_at: string | null
          checked_by: string | null
          created_at: string
          id: string
          integrity_hash: string | null
          item_key: string
          item_label: string
          notes: string | null
        }
        Insert: {
          batch_id: string
          checked?: boolean
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          item_key: string
          item_label: string
          notes?: string | null
        }
        Update: {
          batch_id?: string
          checked?: boolean
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          item_key?: string
          item_label?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_checklist_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
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
      crm_contacts: {
        Row: {
          avatar_url: string | null
          certifications: string | null
          channel: string | null
          company_name: string | null
          contact_name: string | null
          contact_type: string | null
          country: string | null
          created_at: string | null
          deal_value_eur: number | null
          email: string | null
          hubspot_company_id: string | null
          hubspot_contact_id: string | null
          hubspot_deal_id: string | null
          id: string
          language: string | null
          last_activity_at: string | null
          last_interaction: string | null
          lead_score: number | null
          lead_status: string | null
          line_user_id: string | null
          name: string | null
          notes: string | null
          org_id: string | null
          owner_user_id: string | null
          phone: string | null
          pipeline_stage: string | null
          products: string | null
          role: string | null
          source: string | null
          synced_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          certifications?: string | null
          channel?: string | null
          company_name?: string | null
          contact_name?: string | null
          contact_type?: string | null
          country?: string | null
          created_at?: string | null
          deal_value_eur?: number | null
          email?: string | null
          hubspot_company_id?: string | null
          hubspot_contact_id?: string | null
          hubspot_deal_id?: string | null
          id?: string
          language?: string | null
          last_activity_at?: string | null
          last_interaction?: string | null
          lead_score?: number | null
          lead_status?: string | null
          line_user_id?: string | null
          name?: string | null
          notes?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          phone?: string | null
          pipeline_stage?: string | null
          products?: string | null
          role?: string | null
          source?: string | null
          synced_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          certifications?: string | null
          channel?: string | null
          company_name?: string | null
          contact_name?: string | null
          contact_type?: string | null
          country?: string | null
          created_at?: string | null
          deal_value_eur?: number | null
          email?: string | null
          hubspot_company_id?: string | null
          hubspot_contact_id?: string | null
          hubspot_deal_id?: string | null
          id?: string
          language?: string | null
          last_activity_at?: string | null
          last_interaction?: string | null
          lead_score?: number | null
          lead_status?: string | null
          line_user_id?: string | null
          name?: string | null
          notes?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          phone?: string | null
          pipeline_stage?: string | null
          products?: string | null
          role?: string | null
          source?: string | null
          synced_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cross_app_sync: {
        Row: {
          created_at: string | null
          direction: string | null
          entity_type: string
          error_message: string | null
          europe_id: string
          id: string
          last_synced_at: string | null
          metadata: Json | null
          payload: Json | null
          sync_status: string | null
          target_app: string
          target_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direction?: string | null
          entity_type: string
          error_message?: string | null
          europe_id: string
          id?: string
          last_synced_at?: string | null
          metadata?: Json | null
          payload?: Json | null
          sync_status?: string | null
          target_app: string
          target_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direction?: string | null
          entity_type?: string
          error_message?: string | null
          europe_id?: string
          id?: string
          last_synced_at?: string | null
          metadata?: Json | null
          payload?: Json | null
          sync_status?: string | null
          target_app?: string
          target_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customs_checkpoints: {
        Row: {
          checkpoint_type: string
          completed_at: string | null
          country: string | null
          created_at: string | null
          id: string
          location: string | null
          notes: string | null
          reference_number: string | null
          shipment_id: string | null
          status: string | null
        }
        Insert: {
          checkpoint_type: string
          completed_at?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          reference_number?: string | null
          shipment_id?: string | null
          status?: string | null
        }
        Update: {
          checkpoint_type?: string
          completed_at?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          reference_number?: string | null
          shipment_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customs_checkpoints_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_auditor_schedules: {
        Row: {
          auditor_id: string
          base_location_id: string | null
          blocked_reason: string | null
          created_at: string
          created_by: string | null
          id: string
          max_visits_per_day: number
          metadata: Json
          notes: string | null
          route_radius_km: number
          schedule_date: string
          status: string
          updated_at: string
        }
        Insert: {
          auditor_id: string
          base_location_id?: string | null
          blocked_reason?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          max_visits_per_day?: number
          metadata?: Json
          notes?: string | null
          route_radius_km?: number
          schedule_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          auditor_id?: string
          base_location_id?: string | null
          blocked_reason?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          max_visits_per_day?: number
          metadata?: Json
          notes?: string | null
          route_radius_km?: number
          schedule_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cw_auditor_schedules_base_location_id_fkey"
            columns: ["base_location_id"]
            isOneToOne: false
            referencedRelation: "geo_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_compliance_route_catalog: {
        Row: {
          allowed_product_forms: Database["public"]["Enums"]["cw_route_product_form"][]
          base_cost_eur_max: number
          base_cost_eur_min: number
          base_services: string[]
          best_for: string[]
          compliance_claim: string
          created_at: string
          description: string
          estimated_days_max: number
          estimated_days_min: number
          eu_steps_required: string[]
          is_active: boolean
          metadata: Json
          required_documents: string[]
          risk_level: Database["public"]["Enums"]["cw_route_risk_level"]
          route_key: Database["public"]["Enums"]["cw_route_key"]
          short_label: string
          thailand_steps_allowed: string[]
          title: string
          updated_at: string
        }
        Insert: {
          allowed_product_forms?: Database["public"]["Enums"]["cw_route_product_form"][]
          base_cost_eur_max?: number
          base_cost_eur_min?: number
          base_services?: string[]
          best_for?: string[]
          compliance_claim: string
          created_at?: string
          description: string
          estimated_days_max: number
          estimated_days_min: number
          eu_steps_required?: string[]
          is_active?: boolean
          metadata?: Json
          required_documents?: string[]
          risk_level?: Database["public"]["Enums"]["cw_route_risk_level"]
          route_key: Database["public"]["Enums"]["cw_route_key"]
          short_label: string
          thailand_steps_allowed?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          allowed_product_forms?: Database["public"]["Enums"]["cw_route_product_form"][]
          base_cost_eur_max?: number
          base_cost_eur_min?: number
          base_services?: string[]
          best_for?: string[]
          compliance_claim?: string
          created_at?: string
          description?: string
          estimated_days_max?: number
          estimated_days_min?: number
          eu_steps_required?: string[]
          is_active?: boolean
          metadata?: Json
          required_documents?: string[]
          risk_level?: Database["public"]["Enums"]["cw_route_risk_level"]
          route_key?: Database["public"]["Enums"]["cw_route_key"]
          short_label?: string
          thailand_steps_allowed?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cw_compliance_route_requests: {
        Row: {
          assumptions: Json
          compliance_claim: string
          created_at: string
          customer_type: string | null
          destination_country: string
          estimated_cost_eur_max: number
          estimated_cost_eur_min: number
          estimated_days_max: number
          estimated_days_min: number
          eu_steps_required: string[]
          id: string
          product_form: Database["public"]["Enums"]["cw_route_product_form"]
          quantity_kg: number | null
          required_documents: string[]
          risk_preference: Database["public"]["Enums"]["cw_route_risk_level"]
          route_key: Database["public"]["Enums"]["cw_route_key"]
          selected_services: string[]
          source_app: string
          status: Database["public"]["Enums"]["cw_route_request_status"]
          thailand_steps_allowed: string[]
          updated_at: string
          user_id: string | null
          warnings: Json
        }
        Insert: {
          assumptions?: Json
          compliance_claim: string
          created_at?: string
          customer_type?: string | null
          destination_country?: string
          estimated_cost_eur_max?: number
          estimated_cost_eur_min?: number
          estimated_days_max: number
          estimated_days_min: number
          eu_steps_required?: string[]
          id?: string
          product_form: Database["public"]["Enums"]["cw_route_product_form"]
          quantity_kg?: number | null
          required_documents?: string[]
          risk_preference?: Database["public"]["Enums"]["cw_route_risk_level"]
          route_key: Database["public"]["Enums"]["cw_route_key"]
          selected_services?: string[]
          source_app?: string
          status?: Database["public"]["Enums"]["cw_route_request_status"]
          thailand_steps_allowed?: string[]
          updated_at?: string
          user_id?: string | null
          warnings?: Json
        }
        Update: {
          assumptions?: Json
          compliance_claim?: string
          created_at?: string
          customer_type?: string | null
          destination_country?: string
          estimated_cost_eur_max?: number
          estimated_cost_eur_min?: number
          estimated_days_max?: number
          estimated_days_min?: number
          eu_steps_required?: string[]
          id?: string
          product_form?: Database["public"]["Enums"]["cw_route_product_form"]
          quantity_kg?: number | null
          required_documents?: string[]
          risk_preference?: Database["public"]["Enums"]["cw_route_risk_level"]
          route_key?: Database["public"]["Enums"]["cw_route_key"]
          selected_services?: string[]
          source_app?: string
          status?: Database["public"]["Enums"]["cw_route_request_status"]
          thailand_steps_allowed?: string[]
          updated_at?: string
          user_id?: string | null
          warnings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "cw_compliance_route_requests_route_key_fkey"
            columns: ["route_key"]
            isOneToOne: false
            referencedRelation: "cw_compliance_route_catalog"
            referencedColumns: ["route_key"]
          },
        ]
      }
      cw_ledger: {
        Row: {
          amount_cents: number | null
          balance_after: number | null
          created_at: string
          created_by: string | null
          credits: number
          currency: string | null
          direction: Database["public"]["Enums"]["cw_ledger_direction"]
          entry_type: Database["public"]["Enums"]["cw_ledger_entry_type"]
          id: string
          idempotency_key: string | null
          memo: string | null
          metadata: Json
          service_order_id: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents?: number | null
          balance_after?: number | null
          created_at?: string
          created_by?: string | null
          credits: number
          currency?: string | null
          direction: Database["public"]["Enums"]["cw_ledger_direction"]
          entry_type: Database["public"]["Enums"]["cw_ledger_entry_type"]
          id?: string
          idempotency_key?: string | null
          memo?: string | null
          metadata?: Json
          service_order_id?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number | null
          balance_after?: number | null
          created_at?: string
          created_by?: string | null
          credits?: number
          currency?: string | null
          direction?: Database["public"]["Enums"]["cw_ledger_direction"]
          entry_type?: Database["public"]["Enums"]["cw_ledger_entry_type"]
          id?: string
          idempotency_key?: string | null
          memo?: string | null
          metadata?: Json
          service_order_id?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cw_ledger_service_order_id_fkey"
            columns: ["service_order_id"]
            isOneToOne: false
            referencedRelation: "cw_service_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cw_ledger_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "cw_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_service_orders: {
        Row: {
          amount_cents: number
          cancelled_at: string | null
          created_at: string
          credits_required: number
          currency: string
          delivered_at: string | null
          id: string
          idempotency_key: string | null
          internal_notes: string | null
          order_number: string | null
          payment_provider: Database["public"]["Enums"]["payment_provider"]
          payment_status: Database["public"]["Enums"]["cw_payment_status"]
          queued_at: string | null
          requested_payload: Json
          result_reference: Json
          service_type: Database["public"]["Enums"]["cw_service_type"]
          source_feature: string
          started_at: string | null
          status: Database["public"]["Enums"]["cw_service_order_status"]
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_cents?: number
          cancelled_at?: string | null
          created_at?: string
          credits_required?: number
          currency?: string
          delivered_at?: string | null
          id?: string
          idempotency_key?: string | null
          internal_notes?: string | null
          order_number?: string | null
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          payment_status?: Database["public"]["Enums"]["cw_payment_status"]
          queued_at?: string | null
          requested_payload?: Json
          result_reference?: Json
          service_type: Database["public"]["Enums"]["cw_service_type"]
          source_feature: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["cw_service_order_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          cancelled_at?: string | null
          created_at?: string
          credits_required?: number
          currency?: string
          delivered_at?: string | null
          id?: string
          idempotency_key?: string | null
          internal_notes?: string | null
          order_number?: string | null
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          payment_status?: Database["public"]["Enums"]["cw_payment_status"]
          queued_at?: string | null
          requested_payload?: Json
          result_reference?: Json
          service_type?: Database["public"]["Enums"]["cw_service_type"]
          source_feature?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["cw_service_order_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cw_service_orders_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "cw_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          included_credits_monthly: number
          metadata: Json
          payment_provider: Database["public"]["Enums"]["payment_provider"]
          seats: number
          status: Database["public"]["Enums"]["cw_subscription_status"]
          stripe_checkout_session_id: string | null
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["cw_subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          included_credits_monthly?: number
          metadata?: Json
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          seats?: number
          status?: Database["public"]["Enums"]["cw_subscription_status"]
          stripe_checkout_session_id?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["cw_subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          included_credits_monthly?: number
          metadata?: Json
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          seats?: number
          status?: Database["public"]["Enums"]["cw_subscription_status"]
          stripe_checkout_session_id?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["cw_subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      deal_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          message_type: string
          metadata: Json | null
          purchase_request_id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          message_type?: string
          metadata?: Json | null
          purchase_request_id: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          message_type?: string
          metadata?: Json | null
          purchase_request_id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_messages_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_milestones: {
        Row: {
          completed_at: string | null
          completed_by: string | null
          created_at: string
          deal_room_id: string
          description: string | null
          due_date: string | null
          id: string
          metadata: Json | null
          milestone_type: string
          sort_order: number
          status: string
          title: string
        }
        Insert: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          deal_room_id: string
          description?: string | null
          due_date?: string | null
          id?: string
          metadata?: Json | null
          milestone_type?: string
          sort_order?: number
          status?: string
          title: string
        }
        Update: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          deal_room_id?: string
          description?: string | null
          due_date?: string | null
          id?: string
          metadata?: Json | null
          milestone_type?: string
          sort_order?: number
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_milestones_deal_room_id_fkey"
            columns: ["deal_room_id"]
            isOneToOne: false
            referencedRelation: "deal_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_room_documents: {
        Row: {
          created_at: string
          deal_room_id: string
          description: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          metadata: Json | null
          mime_type: string | null
          requires_nda: boolean | null
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          deal_room_id: string
          description?: string | null
          document_type?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          requires_nda?: boolean | null
          uploaded_by: string
        }
        Update: {
          created_at?: string
          deal_room_id?: string
          description?: string | null
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          requires_nda?: boolean | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_room_documents_deal_room_id_fkey"
            columns: ["deal_room_id"]
            isOneToOne: false
            referencedRelation: "deal_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_rooms: {
        Row: {
          created_at: string
          created_by: string
          id: string
          metadata: Json | null
          name: string
          purchase_request_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          metadata?: Json | null
          name?: string
          purchase_request_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          metadata?: Json | null
          name?: string
          purchase_request_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_rooms_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: true
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      deviations: {
        Row: {
          assigned_to: string | null
          audit_id: string | null
          batch_id: string | null
          batch_number: string | null
          capa_completed_at: string | null
          capa_completed_by: string | null
          capa_due_date: string | null
          capa_id: string | null
          category: string
          closed_at: string | null
          closed_by: string | null
          closure_notes: string | null
          corrective_actions: Json | null
          created_at: string
          description: string | null
          detected_at: string | null
          detected_by: string | null
          deviation_number: string
          effectiveness_criteria: string | null
          effectiveness_result: string | null
          effectiveness_verified: boolean | null
          effectiveness_verified_at: string | null
          effectiveness_verified_by: string | null
          facility_id: string | null
          id: string
          immediate_action: string | null
          preventive_actions: Json | null
          reported_at: string
          reported_by: string
          resolved_at: string | null
          root_cause: string | null
          root_cause_completed_at: string | null
          root_cause_completed_by: string | null
          root_cause_method: string | null
          severity: Database["public"]["Enums"]["deviation_severity"]
          status: Database["public"]["Enums"]["deviation_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          audit_id?: string | null
          batch_id?: string | null
          batch_number?: string | null
          capa_completed_at?: string | null
          capa_completed_by?: string | null
          capa_due_date?: string | null
          capa_id?: string | null
          category?: string
          closed_at?: string | null
          closed_by?: string | null
          closure_notes?: string | null
          corrective_actions?: Json | null
          created_at?: string
          description?: string | null
          detected_at?: string | null
          detected_by?: string | null
          deviation_number: string
          effectiveness_criteria?: string | null
          effectiveness_result?: string | null
          effectiveness_verified?: boolean | null
          effectiveness_verified_at?: string | null
          effectiveness_verified_by?: string | null
          facility_id?: string | null
          id?: string
          immediate_action?: string | null
          preventive_actions?: Json | null
          reported_at?: string
          reported_by: string
          resolved_at?: string | null
          root_cause?: string | null
          root_cause_completed_at?: string | null
          root_cause_completed_by?: string | null
          root_cause_method?: string | null
          severity?: Database["public"]["Enums"]["deviation_severity"]
          status?: Database["public"]["Enums"]["deviation_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          audit_id?: string | null
          batch_id?: string | null
          batch_number?: string | null
          capa_completed_at?: string | null
          capa_completed_by?: string | null
          capa_due_date?: string | null
          capa_id?: string | null
          category?: string
          closed_at?: string | null
          closed_by?: string | null
          closure_notes?: string | null
          corrective_actions?: Json | null
          created_at?: string
          description?: string | null
          detected_at?: string | null
          detected_by?: string | null
          deviation_number?: string
          effectiveness_criteria?: string | null
          effectiveness_result?: string | null
          effectiveness_verified?: boolean | null
          effectiveness_verified_at?: string | null
          effectiveness_verified_by?: string | null
          facility_id?: string | null
          id?: string
          immediate_action?: string | null
          preventive_actions?: Json | null
          reported_at?: string
          reported_by?: string
          resolved_at?: string | null
          root_cause?: string | null
          root_cause_completed_at?: string | null
          root_cause_completed_by?: string | null
          root_cause_method?: string | null
          severity?: Database["public"]["Enums"]["deviation_severity"]
          status?: Database["public"]["Enums"]["deviation_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deviations_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deviations_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deviations_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      digital_signatures: {
        Row: {
          created_at: string | null
          document_ref: string | null
          document_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          onboarding_id: string | null
          reason: string
          signature_hash: string
          signature_png: string
          signed_at: string
          signer_email: string | null
          signer_name: string
          signer_role: string
          token: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_ref?: string | null
          document_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          onboarding_id?: string | null
          reason: string
          signature_hash: string
          signature_png: string
          signed_at: string
          signer_email?: string | null
          signer_name: string
          signer_role: string
          token: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_ref?: string | null
          document_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          onboarding_id?: string | null
          reason?: string
          signature_hash?: string
          signature_png?: string
          signed_at?: string
          signer_email?: string | null
          signer_name?: string
          signer_role?: string
          token?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      document_versions: {
        Row: {
          change_summary: string | null
          changed_by: string | null
          content_snapshot: string | null
          created_at: string
          document_id: string
          file_name: string | null
          file_size_bytes: number | null
          file_url: string | null
          id: string
          integrity_hash: string | null
          previous_version_id: string | null
          version_major: number
          version_minor: number
        }
        Insert: {
          change_summary?: string | null
          changed_by?: string | null
          content_snapshot?: string | null
          created_at?: string
          document_id: string
          file_name?: string | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          integrity_hash?: string | null
          previous_version_id?: string | null
          version_major: number
          version_minor: number
        }
        Update: {
          change_summary?: string | null
          changed_by?: string | null
          content_snapshot?: string | null
          created_at?: string
          document_id?: string
          file_name?: string | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          integrity_hash?: string | null
          previous_version_id?: string | null
          version_major?: number
          version_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_versions_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "document_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          audit_id: string | null
          category: string
          created_at: string
          description: string | null
          document_number: string
          document_type: string
          effective_from: string | null
          effective_until: string | null
          facility_id: string | null
          file_name: string | null
          file_size_bytes: number | null
          file_type: string | null
          file_url: string | null
          id: string
          integrity_hash: string | null
          metadata: Json | null
          next_review_at: string | null
          owner_id: string
          review_interval_days: number | null
          sop_id: string | null
          status: Database["public"]["Enums"]["document_status"]
          tags: string[] | null
          title: string
          updated_at: string
          version_major: number
          version_minor: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          audit_id?: string | null
          category?: string
          created_at?: string
          description?: string | null
          document_number: string
          document_type?: string
          effective_from?: string | null
          effective_until?: string | null
          facility_id?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          next_review_at?: string | null
          owner_id: string
          review_interval_days?: number | null
          sop_id?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          version_major?: number
          version_minor?: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          audit_id?: string | null
          category?: string
          created_at?: string
          description?: string | null
          document_number?: string
          document_type?: string
          effective_from?: string | null
          effective_until?: string | null
          facility_id?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          next_review_at?: string | null
          owner_id?: string
          review_interval_days?: number | null
          sop_id?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          version_major?: number
          version_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "documents_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      docusign_envelopes: {
        Row: {
          batch_id: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          document_type: string
          document_url: string | null
          docusign_account_id: string | null
          envelope_id: string | null
          id: string
          signers: Json | null
          status: string | null
        }
        Insert: {
          batch_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          document_type: string
          document_url?: string | null
          docusign_account_id?: string | null
          envelope_id?: string | null
          id?: string
          signers?: Json | null
          status?: string | null
        }
        Update: {
          batch_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          document_type?: string
          document_url?: string | null
          docusign_account_id?: string | null
          envelope_id?: string | null
          id?: string
          signers?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "docusign_envelopes_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
        ]
      }
      elearning_courses: {
        Row: {
          category: string
          content_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string
          duration_minutes: number | null
          id: string
          is_published: boolean
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      elearning_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          id: string
          last_accessed_at: string
          progress_percent: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          id?: string
          last_accessed_at?: string
          progress_percent?: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          id?: string
          last_accessed_at?: string
          progress_percent?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "elearning_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "elearning_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      emission_factors: {
        Row: {
          activity: string
          factor_kg_co2e: number
          id: string
          notes: string | null
          source: string
          unit: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          activity: string
          factor_kg_co2e: number
          id?: string
          notes?: string | null
          source: string
          unit: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          activity?: string
          factor_kg_co2e?: number
          id?: string
          notes?: string | null
          source?: string
          unit?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      emvs_registrations: {
        Row: {
          batch_id: string | null
          created_at: string | null
          decommission_reason: string | null
          decommissioned_at: string | null
          expiry_date: string | null
          id: string
          lot_number: string | null
          nmvs_transaction_id: string | null
          product_code: string | null
          serial_number: string | null
          status: string | null
          uploaded_at: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          decommission_reason?: string | null
          decommissioned_at?: string | null
          expiry_date?: string | null
          id?: string
          lot_number?: string | null
          nmvs_transaction_id?: string | null
          product_code?: string | null
          serial_number?: string | null
          status?: string | null
          uploaded_at?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          decommission_reason?: string | null
          decommissioned_at?: string | null
          expiry_date?: string | null
          id?: string
          lot_number?: string | null
          nmvs_transaction_id?: string | null
          product_code?: string | null
          serial_number?: string | null
          status?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emvs_registrations_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
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
      environment_readings: {
        Row: {
          alert_triggered: boolean | null
          api_key_id: string | null
          co2_ppm: number | null
          created_at: string | null
          facility_id: string | null
          humidity_percent: number | null
          id: string
          light_ppfd: number | null
          recorded_at: string
          room_name: string | null
          source: string | null
          temperature_c: number | null
          vpd_kpa: number | null
        }
        Insert: {
          alert_triggered?: boolean | null
          api_key_id?: string | null
          co2_ppm?: number | null
          created_at?: string | null
          facility_id?: string | null
          humidity_percent?: number | null
          id?: string
          light_ppfd?: number | null
          recorded_at: string
          room_name?: string | null
          source?: string | null
          temperature_c?: number | null
          vpd_kpa?: number | null
        }
        Update: {
          alert_triggered?: boolean | null
          api_key_id?: string | null
          co2_ppm?: number | null
          created_at?: string | null
          facility_id?: string | null
          humidity_percent?: number | null
          id?: string
          light_ppfd?: number | null
          recorded_at?: string
          room_name?: string | null
          source?: string | null
          temperature_c?: number | null
          vpd_kpa?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "environment_readings_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "facility_api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "environment_readings_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          calibration_interval_days: number
          category: string
          created_at: string
          description: string | null
          equipment_number: string
          facility_id: string | null
          id: string
          is_active: boolean
          last_calibration_at: string | null
          location: string | null
          manufacturer: string | null
          metadata: Json | null
          model: string | null
          name: string
          next_calibration_at: string | null
          owner_id: string | null
          serial_number: string | null
          updated_at: string
        }
        Insert: {
          calibration_interval_days?: number
          category?: string
          created_at?: string
          description?: string | null
          equipment_number: string
          facility_id?: string | null
          id?: string
          is_active?: boolean
          last_calibration_at?: string | null
          location?: string | null
          manufacturer?: string | null
          metadata?: Json | null
          model?: string | null
          name: string
          next_calibration_at?: string | null
          owner_id?: string | null
          serial_number?: string | null
          updated_at?: string
        }
        Update: {
          calibration_interval_days?: number
          category?: string
          created_at?: string
          description?: string | null
          equipment_number?: string
          facility_id?: string | null
          id?: string
          is_active?: boolean
          last_calibration_at?: string | null
          location?: string | null
          manufacturer?: string | null
          metadata?: Json | null
          model?: string | null
          name?: string
          next_calibration_at?: string | null
          owner_id?: string | null
          serial_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_agreements: {
        Row: {
          batch_id: string
          blocked_reason: string | null
          completed_at: string | null
          created_at: string
          currency: string
          current_milestone: string
          deposit_due_at: string | null
          deposit_percent: number
          escrow_number: string
          escrow_wallet_address: string | null
          expires_at: string | null
          exporter_id: string
          final_percent: number
          id: string
          importer_id: string
          infinityou_mandated: boolean
          invoice_id: string | null
          metadata: Json
          min_shinrai_score: number
          payment_provider: string
          provider_account_id: string | null
          provider_reference: string | null
          purchase_request_id: string | null
          qa_release_percent: number
          required_final_statuses: string[]
          required_qa_statuses: string[]
          required_shinrai_status: string
          signed_at: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          batch_id: string
          blocked_reason?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          current_milestone?: string
          deposit_due_at?: string | null
          deposit_percent?: number
          escrow_number: string
          escrow_wallet_address?: string | null
          expires_at?: string | null
          exporter_id: string
          final_percent?: number
          id?: string
          importer_id: string
          infinityou_mandated?: boolean
          invoice_id?: string | null
          metadata?: Json
          min_shinrai_score?: number
          payment_provider?: string
          provider_account_id?: string | null
          provider_reference?: string | null
          purchase_request_id?: string | null
          qa_release_percent?: number
          required_final_statuses?: string[]
          required_qa_statuses?: string[]
          required_shinrai_status?: string
          signed_at?: string | null
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          batch_id?: string
          blocked_reason?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          current_milestone?: string
          deposit_due_at?: string | null
          deposit_percent?: number
          escrow_number?: string
          escrow_wallet_address?: string | null
          expires_at?: string | null
          exporter_id?: string
          final_percent?: number
          id?: string
          importer_id?: string
          infinityou_mandated?: boolean
          invoice_id?: string | null
          metadata?: Json
          min_shinrai_score?: number
          payment_provider?: string
          provider_account_id?: string | null
          provider_reference?: string | null
          purchase_request_id?: string | null
          qa_release_percent?: number
          required_final_statuses?: string[]
          required_qa_statuses?: string[]
          required_shinrai_status?: string
          signed_at?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "escrow_agreements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_agreements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_agreements_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      export_document_bundles: {
        Row: {
          batch_id: string
          country_code: string | null
          created_at: string
          documents: Json
          exporter_id: string
          id: string
          importer_id: string
          purchase_request_id: string
          status: string
          updated_at: string
        }
        Insert: {
          batch_id: string
          country_code?: string | null
          created_at?: string
          documents?: Json
          exporter_id: string
          id?: string
          importer_id: string
          purchase_request_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          batch_id?: string
          country_code?: string | null
          created_at?: string
          documents?: Json
          exporter_id?: string
          id?: string
          importer_id?: string
          purchase_request_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_document_bundles_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "export_document_bundles_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      exporter_onboarding: {
        Row: {
          address: Json | null
          ai_review_result: Json | null
          batch_tracking_method: string | null
          cleanroom_classes: string[] | null
          company_name: string | null
          completed_steps: number[]
          contact_person: Json | null
          country: string | null
          created_at: string
          cultivation_area_sqm: number | null
          current_step: number
          employee_count: number | null
          facility_name: string | null
          facility_type: string | null
          id: string
          issuing_authority: string | null
          legal_form: string | null
          license_number: string | null
          license_type: string[] | null
          license_valid_from: string | null
          license_valid_until: string | null
          licensed_activities: string[] | null
          nda_accepted_at: string | null
          product_catalog: Json | null
          reverification_reminded_30d: boolean | null
          reverification_reminded_60d: boolean | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: string
          role_data: Json | null
          shinrai_assessment: Json | null
          shinrai_rating: string | null
          shinrai_score: number | null
          status: string
          submitted_at: string | null
          tax_id: string | null
          tier: string
          total_area_sqm: number | null
          traceability_level: string | null
          updated_at: string
          user_id: string
          verification_expires_at: string | null
          website: string | null
        }
        Insert: {
          address?: Json | null
          ai_review_result?: Json | null
          batch_tracking_method?: string | null
          cleanroom_classes?: string[] | null
          company_name?: string | null
          completed_steps?: number[]
          contact_person?: Json | null
          country?: string | null
          created_at?: string
          cultivation_area_sqm?: number | null
          current_step?: number
          employee_count?: number | null
          facility_name?: string | null
          facility_type?: string | null
          id?: string
          issuing_authority?: string | null
          legal_form?: string | null
          license_number?: string | null
          license_type?: string[] | null
          license_valid_from?: string | null
          license_valid_until?: string | null
          licensed_activities?: string[] | null
          nda_accepted_at?: string | null
          product_catalog?: Json | null
          reverification_reminded_30d?: boolean | null
          reverification_reminded_60d?: boolean | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          role_data?: Json | null
          shinrai_assessment?: Json | null
          shinrai_rating?: string | null
          shinrai_score?: number | null
          status?: string
          submitted_at?: string | null
          tax_id?: string | null
          tier?: string
          total_area_sqm?: number | null
          traceability_level?: string | null
          updated_at?: string
          user_id: string
          verification_expires_at?: string | null
          website?: string | null
        }
        Update: {
          address?: Json | null
          ai_review_result?: Json | null
          batch_tracking_method?: string | null
          cleanroom_classes?: string[] | null
          company_name?: string | null
          completed_steps?: number[]
          contact_person?: Json | null
          country?: string | null
          created_at?: string
          cultivation_area_sqm?: number | null
          current_step?: number
          employee_count?: number | null
          facility_name?: string | null
          facility_type?: string | null
          id?: string
          issuing_authority?: string | null
          legal_form?: string | null
          license_number?: string | null
          license_type?: string[] | null
          license_valid_from?: string | null
          license_valid_until?: string | null
          licensed_activities?: string[] | null
          nda_accepted_at?: string | null
          product_catalog?: Json | null
          reverification_reminded_30d?: boolean | null
          reverification_reminded_60d?: boolean | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          role_data?: Json | null
          shinrai_assessment?: Json | null
          shinrai_rating?: string | null
          shinrai_score?: number | null
          status?: string
          submitted_at?: string | null
          tax_id?: string | null
          tier?: string
          total_area_sqm?: number | null
          traceability_level?: string | null
          updated_at?: string
          user_id?: string
          verification_expires_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      exporter_reviews: {
        Row: {
          batch_id: string
          comment: string | null
          communication_rating: number
          created_at: string
          delivery_rating: number
          exporter_id: string
          id: string
          overall_rating: number | null
          purchase_request_id: string | null
          quality_rating: number
          reviewer_id: string
        }
        Insert: {
          batch_id: string
          comment?: string | null
          communication_rating: number
          created_at?: string
          delivery_rating: number
          exporter_id: string
          id?: string
          overall_rating?: number | null
          purchase_request_id?: string | null
          quality_rating: number
          reviewer_id: string
        }
        Update: {
          batch_id?: string
          comment?: string | null
          communication_rating?: number
          created_at?: string
          delivery_rating?: number
          exporter_id?: string
          id?: string
          overall_rating?: number | null
          purchase_request_id?: string | null
          quality_rating?: number
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exporter_reviews_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exporter_reviews_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      external_certificates: {
        Row: {
          created_at: string
          description: string | null
          expires_at: string | null
          file_name: string
          file_size_bytes: number | null
          file_type: string | null
          file_url: string
          id: string
          issued_at: string | null
          issuer: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          expires_at?: string | null
          file_name: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          issued_at?: string | null
          issuer?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          expires_at?: string | null
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          issued_at?: string | null
          issuer?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      facilities: {
        Row: {
          address: string | null
          city: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          created_by: string | null
          facility_type: string
          gmp_status: string | null
          id: string
          is_active: boolean
          license_number: string | null
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          facility_type?: string
          gmp_status?: string | null
          id?: string
          is_active?: boolean
          license_number?: string | null
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          facility_type?: string
          gmp_status?: string | null
          id?: string
          is_active?: boolean
          license_number?: string | null
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      facility_api_keys: {
        Row: {
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          facility_id: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          scopes: string[] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          facility_id?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          scopes?: string[] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          facility_id?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          scopes?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_api_keys_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_plan_approvals: {
        Row: {
          action: Database["public"]["Enums"]["plan_approval_action"]
          comment: string | null
          created_at: string
          id: string
          integrity_hash: string | null
          performed_by: string
          performer_name: string
          performer_role: string | null
          plan_id: string
          signature_url: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["plan_approval_action"]
          comment?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          performed_by: string
          performer_name: string
          performer_role?: string | null
          plan_id: string
          signature_url?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["plan_approval_action"]
          comment?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          performed_by?: string
          performer_name?: string
          performer_role?: string | null
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
        Relationships: [
          {
            foreignKeyName: "facility_plans_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_visits: {
        Row: {
          address: string | null
          auditor_id: string
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          distance_from_previous_km: number | null
          farm_id: string | null
          farm_name: string | null
          geo_location_id: string | null
          id: string
          notes: string | null
          planned_end: string | null
          planned_start: string | null
          requested_by: string | null
          route_decision: Json
          route_sequence: number | null
          schedule_id: string | null
          status: string
          updated_at: string
          visit_date: string
          visit_type: string
        }
        Insert: {
          address?: string | null
          auditor_id: string
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          distance_from_previous_km?: number | null
          farm_id?: string | null
          farm_name?: string | null
          geo_location_id?: string | null
          id?: string
          notes?: string | null
          planned_end?: string | null
          planned_start?: string | null
          requested_by?: string | null
          route_decision?: Json
          route_sequence?: number | null
          schedule_id?: string | null
          status?: string
          updated_at?: string
          visit_date: string
          visit_type?: string
        }
        Update: {
          address?: string | null
          auditor_id?: string
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          distance_from_previous_km?: number | null
          farm_id?: string | null
          farm_name?: string | null
          geo_location_id?: string | null
          id?: string
          notes?: string | null
          planned_end?: string | null
          planned_start?: string | null
          requested_by?: string | null
          route_decision?: Json
          route_sequence?: number | null
          schedule_id?: string | null
          status?: string
          updated_at?: string
          visit_date?: string
          visit_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "farm_visits_geo_location_id_fkey"
            columns: ["geo_location_id"]
            isOneToOne: false
            referencedRelation: "geo_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_visits_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "cw_auditor_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          batch_id: string
          created_at: string
          id: string
          price_at_save: number
          user_id: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          id?: string
          price_at_save?: number
          user_id: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          id?: string
          price_at_save?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      forex_cache: {
        Row: {
          base_currency: string
          expires_at: string | null
          fetched_at: string | null
          id: string
          rates: Json
          source: string | null
        }
        Insert: {
          base_currency?: string
          expires_at?: string | null
          fetched_at?: string | null
          id?: string
          rates: Json
          source?: string | null
        }
        Update: {
          base_currency?: string
          expires_at?: string | null
          fetched_at?: string | null
          id?: string
          rates?: Json
          source?: string | null
        }
        Relationships: []
      }
      freight_forwarder_bookings: {
        Row: {
          arrival_airport: string | null
          booking_reference: string | null
          booking_status: string | null
          cargowise_consignment_id: string | null
          created_at: string | null
          departure_airport: string | null
          eta: string | null
          etd: string | null
          flight_number: string | null
          forwarder: string
          forwarder_contact_email: string | null
          forwarder_contact_name: string | null
          forwarder_webhook_url: string | null
          house_awb: string | null
          id: string
          master_awb: string | null
          our_webhook_url: string | null
          shipment_id: string | null
          special_handling: string[] | null
          temperature_requirement: string | null
        }
        Insert: {
          arrival_airport?: string | null
          booking_reference?: string | null
          booking_status?: string | null
          cargowise_consignment_id?: string | null
          created_at?: string | null
          departure_airport?: string | null
          eta?: string | null
          etd?: string | null
          flight_number?: string | null
          forwarder: string
          forwarder_contact_email?: string | null
          forwarder_contact_name?: string | null
          forwarder_webhook_url?: string | null
          house_awb?: string | null
          id?: string
          master_awb?: string | null
          our_webhook_url?: string | null
          shipment_id?: string | null
          special_handling?: string[] | null
          temperature_requirement?: string | null
        }
        Update: {
          arrival_airport?: string | null
          booking_reference?: string | null
          booking_status?: string | null
          cargowise_consignment_id?: string | null
          created_at?: string | null
          departure_airport?: string | null
          eta?: string | null
          etd?: string | null
          flight_number?: string | null
          forwarder?: string
          forwarder_contact_email?: string | null
          forwarder_contact_name?: string | null
          forwarder_webhook_url?: string | null
          house_awb?: string | null
          id?: string
          master_awb?: string | null
          our_webhook_url?: string | null
          shipment_id?: string | null
          special_handling?: string[] | null
          temperature_requirement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "freight_forwarder_bookings_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      geo_check_log: {
        Row: {
          allowed: boolean
          checked_at: string
          country_code: string
          id: string
          order_id: string | null
          product_type: string | null
          reason: string | null
          user_id: string | null
        }
        Insert: {
          allowed: boolean
          checked_at?: string
          country_code: string
          id?: string
          order_id?: string | null
          product_type?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          allowed?: boolean
          checked_at?: string
          country_code?: string
          id?: string
          order_id?: string | null
          product_type?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      geo_locations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          created_by: string | null
          entity_id: string | null
          entity_type: string
          geocoded_at: string | null
          geohash: string | null
          id: string
          label: string | null
          latitude: number | null
          longitude: number | null
          metadata: Json
          postal_code: string | null
          provider: string | null
          provider_place_id: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          entity_id?: string | null
          entity_type: string
          geocoded_at?: string | null
          geohash?: string | null
          id?: string
          label?: string | null
          latitude?: number | null
          longitude?: number | null
          metadata?: Json
          postal_code?: string | null
          provider?: string | null
          provider_place_id?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          entity_id?: string | null
          entity_type?: string
          geocoded_at?: string | null
          geohash?: string | null
          id?: string
          label?: string | null
          latitude?: number | null
          longitude?: number | null
          metadata?: Json
          postal_code?: string | null
          provider?: string | null
          provider_place_id?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      geofence_zones: {
        Row: {
          active: boolean | null
          center_lat: number | null
          center_lng: number | null
          country_code: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          name: string
          polygon: Json | null
          radius_km: number | null
          zone_type: string
        }
        Insert: {
          active?: boolean | null
          center_lat?: number | null
          center_lng?: number | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          polygon?: Json | null
          radius_km?: number | null
          zone_type: string
        }
        Update: {
          active?: boolean | null
          center_lat?: number | null
          center_lng?: number | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          polygon?: Json | null
          radius_km?: number | null
          zone_type?: string
        }
        Relationships: []
      }
      gmp_certificates: {
        Row: {
          certificate_number: string | null
          certificate_type: string
          created_at: string | null
          documents: string[] | null
          eudragmdp_url: string | null
          eudragmdp_verified: boolean | null
          eudragmdp_verified_at: string | null
          expiry_date: string | null
          facility_address: string | null
          holder_company: string
          holder_country: string
          id: string
          issued_date: string | null
          issuing_authority_id: string | null
          product_types: string[] | null
          scope: string | null
          status: string | null
        }
        Insert: {
          certificate_number?: string | null
          certificate_type: string
          created_at?: string | null
          documents?: string[] | null
          eudragmdp_url?: string | null
          eudragmdp_verified?: boolean | null
          eudragmdp_verified_at?: string | null
          expiry_date?: string | null
          facility_address?: string | null
          holder_company: string
          holder_country: string
          id?: string
          issued_date?: string | null
          issuing_authority_id?: string | null
          product_types?: string[] | null
          scope?: string | null
          status?: string | null
        }
        Update: {
          certificate_number?: string | null
          certificate_type?: string
          created_at?: string | null
          documents?: string[] | null
          eudragmdp_url?: string | null
          eudragmdp_verified?: boolean | null
          eudragmdp_verified_at?: string | null
          expiry_date?: string | null
          facility_address?: string | null
          holder_company?: string
          holder_country?: string
          id?: string
          issued_date?: string | null
          issuing_authority_id?: string | null
          product_types?: string[] | null
          scope?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gmp_certificates_issuing_authority_id_fkey"
            columns: ["issuing_authority_id"]
            isOneToOne: false
            referencedRelation: "regulatory_authorities"
            referencedColumns: ["id"]
          },
        ]
      }
      import_export_licenses: {
        Row: {
          applied_at: string | null
          conditions: string | null
          contact_person: string | null
          country_destination: string | null
          country_origin: string | null
          created_at: string
          document_url: string | null
          facility_id: string | null
          id: string
          integrity_hash: string | null
          issued_at: string | null
          issuing_authority: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"] | null
          legal_basis: string | null
          license_number: string
          license_type: Database["public"]["Enums"]["license_type"]
          max_quantity_kg: number | null
          metadata: Json | null
          notes: string | null
          owner_id: string
          product_categories: string[] | null
          status: Database["public"]["Enums"]["license_status"]
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applied_at?: string | null
          conditions?: string | null
          contact_person?: string | null
          country_destination?: string | null
          country_origin?: string | null
          created_at?: string
          document_url?: string | null
          facility_id?: string | null
          id?: string
          integrity_hash?: string | null
          issued_at?: string | null
          issuing_authority?: string
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"] | null
          legal_basis?: string | null
          license_number: string
          license_type?: Database["public"]["Enums"]["license_type"]
          max_quantity_kg?: number | null
          metadata?: Json | null
          notes?: string | null
          owner_id: string
          product_categories?: string[] | null
          status?: Database["public"]["Enums"]["license_status"]
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applied_at?: string | null
          conditions?: string | null
          contact_person?: string | null
          country_destination?: string | null
          country_origin?: string | null
          created_at?: string
          document_url?: string | null
          facility_id?: string | null
          id?: string
          integrity_hash?: string | null
          issued_at?: string | null
          issuing_authority?: string
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"] | null
          legal_basis?: string | null
          license_number?: string
          license_type?: Database["public"]["Enums"]["license_type"]
          max_quantity_kg?: number | null
          metadata?: Json | null
          notes?: string | null
          owner_id?: string
          product_categories?: string[] | null
          status?: Database["public"]["Enums"]["license_status"]
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_export_licenses_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      importer_specifications: {
        Row: {
          cbd_max: number | null
          cbd_min: number | null
          country_code: string
          created_at: string | null
          custom_parameters: Json | null
          foreign_matter_max: number | null
          hm_arsenic_max: number | null
          hm_cadmium_max: number | null
          hm_lead_max: number | null
          hm_mercury_max: number | null
          id: string
          is_active: boolean | null
          micro_ecoli_absent: boolean | null
          micro_salmonella_absent: boolean | null
          micro_tamc_max: number | null
          micro_tymc_max: number | null
          moisture_max: number | null
          myco_aflatoxin_b1_max: number | null
          myco_aflatoxin_total_max: number | null
          myco_ochratoxin_max: number | null
          name: string
          organization_id: string | null
          pesticide_custom_limits: Json | null
          pesticide_screening_required: boolean | null
          require_coa_per_batch: boolean | null
          require_eu_gmp: boolean | null
          require_gacp: boolean | null
          require_iso17025_lab: boolean | null
          require_qp_release: boolean | null
          thc_max: number | null
          thc_min: number | null
          thc_tolerance_pct: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cbd_max?: number | null
          cbd_min?: number | null
          country_code: string
          created_at?: string | null
          custom_parameters?: Json | null
          foreign_matter_max?: number | null
          hm_arsenic_max?: number | null
          hm_cadmium_max?: number | null
          hm_lead_max?: number | null
          hm_mercury_max?: number | null
          id?: string
          is_active?: boolean | null
          micro_ecoli_absent?: boolean | null
          micro_salmonella_absent?: boolean | null
          micro_tamc_max?: number | null
          micro_tymc_max?: number | null
          moisture_max?: number | null
          myco_aflatoxin_b1_max?: number | null
          myco_aflatoxin_total_max?: number | null
          myco_ochratoxin_max?: number | null
          name: string
          organization_id?: string | null
          pesticide_custom_limits?: Json | null
          pesticide_screening_required?: boolean | null
          require_coa_per_batch?: boolean | null
          require_eu_gmp?: boolean | null
          require_gacp?: boolean | null
          require_iso17025_lab?: boolean | null
          require_qp_release?: boolean | null
          thc_max?: number | null
          thc_min?: number | null
          thc_tolerance_pct?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cbd_max?: number | null
          cbd_min?: number | null
          country_code?: string
          created_at?: string | null
          custom_parameters?: Json | null
          foreign_matter_max?: number | null
          hm_arsenic_max?: number | null
          hm_cadmium_max?: number | null
          hm_lead_max?: number | null
          hm_mercury_max?: number | null
          id?: string
          is_active?: boolean | null
          micro_ecoli_absent?: boolean | null
          micro_salmonella_absent?: boolean | null
          micro_tamc_max?: number | null
          micro_tymc_max?: number | null
          moisture_max?: number | null
          myco_aflatoxin_b1_max?: number | null
          myco_aflatoxin_total_max?: number | null
          myco_ochratoxin_max?: number | null
          name?: string
          organization_id?: string | null
          pesticide_custom_limits?: Json | null
          pesticide_screening_required?: boolean | null
          require_coa_per_batch?: boolean | null
          require_eu_gmp?: boolean | null
          require_gacp?: boolean | null
          require_iso17025_lab?: boolean | null
          require_qp_release?: boolean | null
          thc_max?: number | null
          thc_min?: number | null
          thc_tolerance_pct?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      infinity_connectors: {
        Row: {
          access_token: string | null
          connected_at: string | null
          connector_id: string
          device_id: string | null
          id: string
          last_sync: string | null
          refresh_token: string | null
          scopes: string[] | null
          status: string | null
        }
        Insert: {
          access_token?: string | null
          connected_at?: string | null
          connector_id: string
          device_id?: string | null
          id?: string
          last_sync?: string | null
          refresh_token?: string | null
          scopes?: string[] | null
          status?: string | null
        }
        Update: {
          access_token?: string | null
          connected_at?: string | null
          connector_id?: string
          device_id?: string | null
          id?: string
          last_sync?: string | null
          refresh_token?: string | null
          scopes?: string[] | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "infinity_connectors_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "infinity_profiles"
            referencedColumns: ["device_id"]
          },
        ]
      }
      infinity_devices: {
        Row: {
          active: boolean | null
          created_at: string | null
          esim_iccid: string | null
          firmware_version: string | null
          id: string
          last_seen: string | null
          model: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          esim_iccid?: string | null
          firmware_version?: string | null
          id: string
          last_seen?: string | null
          model?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          esim_iccid?: string | null
          firmware_version?: string | null
          id?: string
          last_seen?: string | null
          model?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      infinity_events: {
        Row: {
          context: Json | null
          created_at: string | null
          device_id: string
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          session_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          device_id: string
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          session_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          device_id?: string
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "infinity_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "infinity_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      infinity_evolution_log: {
        Row: {
          change_type: string | null
          description: string | null
          device_id: string
          generation: number | null
          id: string
          logged_at: string | null
          new_value: Json | null
          old_value: Json | null
        }
        Insert: {
          change_type?: string | null
          description?: string | null
          device_id: string
          generation?: number | null
          id?: string
          logged_at?: string | null
          new_value?: Json | null
          old_value?: Json | null
        }
        Update: {
          change_type?: string | null
          description?: string | null
          device_id?: string
          generation?: number | null
          id?: string
          logged_at?: string | null
          new_value?: Json | null
          old_value?: Json | null
        }
        Relationships: []
      }
      infinity_face_embeddings: {
        Row: {
          created_at: string | null
          device_id: string
          embedding: string | null
          id: string
          metadata: Json | null
          person_name: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          person_name?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          person_name?: string | null
        }
        Relationships: []
      }
      infinity_features: {
        Row: {
          activated_at: string | null
          device_id: string
          features: string[] | null
          plan: string
        }
        Insert: {
          activated_at?: string | null
          device_id: string
          features?: string[] | null
          plan: string
        }
        Update: {
          activated_at?: string | null
          device_id?: string
          features?: string[] | null
          plan?: string
        }
        Relationships: [
          {
            foreignKeyName: "infinity_features_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "infinity_profiles"
            referencedColumns: ["device_id"]
          },
        ]
      }
      infinity_health_log: {
        Row: {
          context: Json | null
          device_id: string
          fatigue: number | null
          hr: number | null
          hrv: number | null
          id: string
          recorded_at: string | null
          spo2: number | null
          stress: number | null
        }
        Insert: {
          context?: Json | null
          device_id: string
          fatigue?: number | null
          hr?: number | null
          hrv?: number | null
          id?: string
          recorded_at?: string | null
          spo2?: number | null
          stress?: number | null
        }
        Update: {
          context?: Json | null
          device_id?: string
          fatigue?: number | null
          hr?: number | null
          hrv?: number | null
          id?: string
          recorded_at?: string | null
          spo2?: number | null
          stress?: number | null
        }
        Relationships: []
      }
      infinity_location_history: {
        Row: {
          arrived_at: string | null
          departed_at: string | null
          device_id: string
          duration_min: number | null
          id: string
          lat: number | null
          lng: number | null
          location_name: string | null
        }
        Insert: {
          arrived_at?: string | null
          departed_at?: string | null
          device_id: string
          duration_min?: number | null
          id?: string
          lat?: number | null
          lng?: number | null
          location_name?: string | null
        }
        Update: {
          arrived_at?: string | null
          departed_at?: string | null
          device_id?: string
          duration_min?: number | null
          id?: string
          lat?: number | null
          lng?: number | null
          location_name?: string | null
        }
        Relationships: []
      }
      infinity_memory: {
        Row: {
          device_id: string | null
          expires_at: string | null
          id: string
          key: string
          updated_at: string | null
          user_id: string | null
          value: Json
        }
        Insert: {
          device_id?: string | null
          expires_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          user_id?: string | null
          value: Json
        }
        Update: {
          device_id?: string | null
          expires_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          user_id?: string | null
          value?: Json
        }
        Relationships: []
      }
      infinity_patterns: {
        Row: {
          confidence: number | null
          created_at: string | null
          data: Json | null
          description: string | null
          device_id: string
          id: string
          last_seen: string | null
          observations: number | null
          pattern_type: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          device_id: string
          id?: string
          last_seen?: string | null
          observations?: number | null
          pattern_type: string
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          device_id?: string
          id?: string
          last_seen?: string | null
          observations?: number | null
          pattern_type?: string
        }
        Relationships: []
      }
      infinity_profiles: {
        Row: {
          created_at: string | null
          device_id: string
          email: string | null
          language: string | null
          name: string | null
          onboarded: boolean | null
          preferred_side: string | null
          stripe_customer_id: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          email?: string | null
          language?: string | null
          name?: string | null
          onboarded?: boolean | null
          preferred_side?: string | null
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          email?: string | null
          language?: string | null
          name?: string | null
          onboarded?: boolean | null
          preferred_side?: string | null
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      infinity_rag_documents: {
        Row: {
          collection: string
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source_id: string | null
          source_table: string | null
          updated_at: string | null
        }
        Insert: {
          collection: string
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source_id?: string | null
          source_table?: string | null
          updated_at?: string | null
        }
        Update: {
          collection?: string
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source_id?: string | null
          source_table?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      infinity_responses: {
        Row: {
          actions: Json
          created_at: string | null
          event_id: string | null
          id: string
          latency_ms: number | null
          model_used: string | null
          tokens_used: number | null
        }
        Insert: {
          actions: Json
          created_at?: string | null
          event_id?: string | null
          id?: string
          latency_ms?: number | null
          model_used?: string | null
          tokens_used?: number | null
        }
        Update: {
          actions?: Json
          created_at?: string | null
          event_id?: string | null
          id?: string
          latency_ms?: number | null
          model_used?: string | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "infinity_responses_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "infinity_events"
            referencedColumns: ["id"]
          },
        ]
      }
      infinity_sessions: {
        Row: {
          device_id: string
          ended_at: string | null
          id: string
          metadata: Json | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          device_id: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          device_id?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      infinity_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          device_id: string | null
          id: string
          plan: string
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          device_id?: string | null
          id?: string
          plan: string
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          device_id?: string | null
          id?: string
          plan?: string
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "infinity_subscriptions_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "infinity_profiles"
            referencedColumns: ["device_id"]
          },
        ]
      }
      infinity_voice_memory: {
        Row: {
          action: string | null
          confidence: number | null
          context: Json | null
          correction_of: string | null
          created_at: string | null
          device_id: string
          id: string
          intent: string
          language: string | null
          latency_ms: number | null
          outcome: string | null
          resolved_entities: Json | null
          session_id: string | null
          sub_intent: string | null
          transcript: string
          user_corrected: string | null
        }
        Insert: {
          action?: string | null
          confidence?: number | null
          context?: Json | null
          correction_of?: string | null
          created_at?: string | null
          device_id: string
          id?: string
          intent: string
          language?: string | null
          latency_ms?: number | null
          outcome?: string | null
          resolved_entities?: Json | null
          session_id?: string | null
          sub_intent?: string | null
          transcript: string
          user_corrected?: string | null
        }
        Update: {
          action?: string | null
          confidence?: number | null
          context?: Json | null
          correction_of?: string | null
          created_at?: string | null
          device_id?: string
          id?: string
          intent?: string
          language?: string | null
          latency_ms?: number | null
          outcome?: string | null
          resolved_entities?: Json | null
          session_id?: string | null
          sub_intent?: string | null
          transcript?: string
          user_corrected?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "infinity_voice_memory_correction_of_fkey"
            columns: ["correction_of"]
            isOneToOne: false
            referencedRelation: "infinity_voice_memory"
            referencedColumns: ["id"]
          },
        ]
      }
      inspector_access_log: {
        Row: {
          accessed_at: string
          action: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          token_id: string
          user_agent: string | null
        }
        Insert: {
          accessed_at?: string
          action?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          token_id: string
          user_agent?: string | null
        }
        Update: {
          accessed_at?: string
          action?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          token_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inspector_access_log_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "inspector_access_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      inspector_access_tokens: {
        Row: {
          access_count: number
          audit_ids: string[]
          created_at: string
          created_by: string
          expires_at: string
          facility_ids: string[]
          id: string
          inspector_name: string
          inspector_organization: string | null
          is_revoked: boolean
          label: string
          last_accessed_at: string | null
          notes: string | null
          revoked_at: string | null
          revoked_by: string | null
          scope: string[]
          token: string
        }
        Insert: {
          access_count?: number
          audit_ids?: string[]
          created_at?: string
          created_by: string
          expires_at: string
          facility_ids?: string[]
          id?: string
          inspector_name: string
          inspector_organization?: string | null
          is_revoked?: boolean
          label: string
          last_accessed_at?: string | null
          notes?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          scope?: string[]
          token: string
        }
        Update: {
          access_count?: number
          audit_ids?: string[]
          created_at?: string
          created_by?: string
          expires_at?: string
          facility_ids?: string[]
          id?: string
          inspector_name?: string
          inspector_organization?: string | null
          is_revoked?: boolean
          label?: string
          last_accessed_at?: string | null
          notes?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          scope?: string[]
          token?: string
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
      inventory_locations: {
        Row: {
          capacity_kg: number | null
          created_at: string
          current_stock_kg: number | null
          facility_id: string | null
          humidity_max: number | null
          humidity_min: number | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          owner_id: string | null
          temperature_max: number | null
          temperature_min: number | null
          updated_at: string
          zone: Database["public"]["Enums"]["inventory_zone"]
        }
        Insert: {
          capacity_kg?: number | null
          created_at?: string
          current_stock_kg?: number | null
          facility_id?: string | null
          humidity_max?: number | null
          humidity_min?: number | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          owner_id?: string | null
          temperature_max?: number | null
          temperature_min?: number | null
          updated_at?: string
          zone?: Database["public"]["Enums"]["inventory_zone"]
        }
        Update: {
          capacity_kg?: number | null
          created_at?: string
          current_stock_kg?: number | null
          facility_id?: string | null
          humidity_max?: number | null
          humidity_min?: number | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          owner_id?: string | null
          temperature_max?: number | null
          temperature_min?: number | null
          updated_at?: string
          zone?: Database["public"]["Enums"]["inventory_zone"]
        }
        Relationships: [
          {
            foreignKeyName: "inventory_locations_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          batch_id: string | null
          created_at: string
          from_location_id: string | null
          id: string
          metadata: Json | null
          movement_type: string
          performed_at: string
          performed_by: string | null
          quantity_kg: number
          reason: string | null
          to_location_id: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string
          from_location_id?: string | null
          id?: string
          metadata?: Json | null
          movement_type?: string
          performed_at?: string
          performed_by?: string | null
          quantity_kg: number
          reason?: string | null
          to_location_id?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string
          from_location_id?: string | null
          id?: string
          metadata?: Json | null
          movement_type?: string
          performed_at?: string
          performed_by?: string | null
          quantity_kg?: number
          reason?: string | null
          to_location_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_from_location_id_fkey"
            columns: ["from_location_id"]
            isOneToOne: false
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_to_location_id_fkey"
            columns: ["to_location_id"]
            isOneToOne: false
            referencedRelation: "inventory_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_receipts: {
        Row: {
          batch_id: string
          chain: string | null
          created_at: string
          currency: string
          custodian_id: string | null
          custody_location: string | null
          expires_at: string | null
          exporter_id: string
          id: string
          issued_at: string
          metadata: Json
          pledged_to_financing_id: string | null
          quantity: number
          receipt_number: string
          status: string
          token_hash: string | null
          token_id: string
          token_symbol: string
          unit: string
          updated_at: string
          valuation_per_unit: number
          valuation_total: number | null
        }
        Insert: {
          batch_id: string
          chain?: string | null
          created_at?: string
          currency?: string
          custodian_id?: string | null
          custody_location?: string | null
          expires_at?: string | null
          exporter_id: string
          id?: string
          issued_at?: string
          metadata?: Json
          pledged_to_financing_id?: string | null
          quantity: number
          receipt_number: string
          status?: string
          token_hash?: string | null
          token_id: string
          token_symbol?: string
          unit?: string
          updated_at?: string
          valuation_per_unit?: number
          valuation_total?: number | null
        }
        Update: {
          batch_id?: string
          chain?: string | null
          created_at?: string
          currency?: string
          custodian_id?: string | null
          custody_location?: string | null
          expires_at?: string | null
          exporter_id?: string
          id?: string
          issued_at?: string
          metadata?: Json
          pledged_to_financing_id?: string | null
          quantity?: number
          receipt_number?: string
          status?: string
          token_hash?: string | null
          token_id?: string
          token_symbol?: string
          unit?: string
          updated_at?: string
          valuation_per_unit?: number
          valuation_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_receipts_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_receipts_pledged_financing_fk"
            columns: ["pledged_to_financing_id"]
            isOneToOne: false
            referencedRelation: "receivables_financing"
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
          batch_id: string | null
          cbd_percent: number | null
          compliance_snapshot: Json
          created_at: string
          created_by: string
          currency: string
          description: string | null
          destination_country: string | null
          due_date: string | null
          fx_rates: Json
          id: string
          incoterms: string
          invoice_number: string
          invoice_type: Database["public"]["Enums"]["invoice_type"] | null
          issuer_id: string | null
          line_items: Json | null
          notes: string | null
          origin_country: string | null
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_proof_url: string | null
          payment_provider: Database["public"]["Enums"]["payment_provider"]
          post_harvest_order_id: string | null
          purchase_request_id: string | null
          recipient_id: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          stripe_payment_url: string | null
          subtotal: number
          tax_amount: number
          tax_breakdown: Json
          tax_rate: number
          thc_percent: number | null
          total: number
          total_thb: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          batch_id?: string | null
          cbd_percent?: number | null
          compliance_snapshot?: Json
          created_at?: string
          created_by: string
          currency?: string
          description?: string | null
          destination_country?: string | null
          due_date?: string | null
          fx_rates?: Json
          id?: string
          incoterms?: string
          invoice_number: string
          invoice_type?: Database["public"]["Enums"]["invoice_type"] | null
          issuer_id?: string | null
          line_items?: Json | null
          notes?: string | null
          origin_country?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_proof_url?: string | null
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          post_harvest_order_id?: string | null
          purchase_request_id?: string | null
          recipient_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_url?: string | null
          subtotal?: number
          tax_amount?: number
          tax_breakdown?: Json
          tax_rate?: number
          thc_percent?: number | null
          total?: number
          total_thb?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          batch_id?: string | null
          cbd_percent?: number | null
          compliance_snapshot?: Json
          created_at?: string
          created_by?: string
          currency?: string
          description?: string | null
          destination_country?: string | null
          due_date?: string | null
          fx_rates?: Json
          id?: string
          incoterms?: string
          invoice_number?: string
          invoice_type?: Database["public"]["Enums"]["invoice_type"] | null
          issuer_id?: string | null
          line_items?: Json | null
          notes?: string | null
          origin_country?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_proof_url?: string | null
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          post_harvest_order_id?: string | null
          purchase_request_id?: string | null
          recipient_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_url?: string | null
          subtotal?: number
          tax_amount?: number
          tax_breakdown?: Json
          tax_rate?: number
          thc_percent?: number | null
          total?: number
          total_thb?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      iot_alerts: {
        Row: {
          acknowledged: boolean | null
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          created_at: string | null
          device_id: string | null
          facility_id: string | null
          id: string
          parameter: string | null
          severity: string | null
          threshold: number | null
          value: number | null
        }
        Insert: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          created_at?: string | null
          device_id?: string | null
          facility_id?: string | null
          id?: string
          parameter?: string | null
          severity?: string | null
          threshold?: number | null
          value?: number | null
        }
        Update: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          created_at?: string | null
          device_id?: string | null
          facility_id?: string | null
          id?: string
          parameter?: string | null
          severity?: string | null
          threshold?: number | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "iot_alerts_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "iot_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iot_alerts_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      iot_devices: {
        Row: {
          alert_thresholds: Json | null
          api_key_id: string | null
          created_at: string | null
          device_id: string
          device_name: string | null
          device_type: string | null
          facility_id: string | null
          id: string
          is_active: boolean | null
          last_seen_at: string | null
          mqtt_topic: string | null
          room_name: string
        }
        Insert: {
          alert_thresholds?: Json | null
          api_key_id?: string | null
          created_at?: string | null
          device_id: string
          device_name?: string | null
          device_type?: string | null
          facility_id?: string | null
          id?: string
          is_active?: boolean | null
          last_seen_at?: string | null
          mqtt_topic?: string | null
          room_name: string
        }
        Update: {
          alert_thresholds?: Json | null
          api_key_id?: string | null
          created_at?: string | null
          device_id?: string
          device_name?: string | null
          device_type?: string | null
          facility_id?: string | null
          id?: string
          is_active?: boolean | null
          last_seen_at?: string | null
          mqtt_topic?: string | null
          room_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "iot_devices_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "facility_api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iot_devices_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      jarvis_audit_log: {
        Row: {
          created_at: string | null
          details: Json | null
          device_id: string | null
          event_type: string
          id: string
          ip_address: unknown
          request_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          device_id?: string | null
          event_type: string
          id?: string
          ip_address?: unknown
          request_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          device_id?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown
          request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jarvis_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "jarvis_users"
            referencedColumns: ["id"]
          },
        ]
      }
      jarvis_credentials: {
        Row: {
          created_at: string | null
          encrypted_tokens: string
          expires_at: string | null
          id: string
          provider: string
          token_metadata: Json | null
          tool: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          encrypted_tokens: string
          expires_at?: string | null
          id?: string
          provider: string
          token_metadata?: Json | null
          tool: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          encrypted_tokens?: string
          expires_at?: string | null
          id?: string
          provider?: string
          token_metadata?: Json | null
          tool?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jarvis_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "jarvis_users"
            referencedColumns: ["id"]
          },
        ]
      }
      jarvis_faces: {
        Row: {
          context: string | null
          created_at: string | null
          descriptor: string | null
          id: string
          last_seen_at: string | null
          metadata: Json | null
          name: string
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          descriptor?: string | null
          id?: string
          last_seen_at?: string | null
          metadata?: Json | null
          name: string
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string | null
          descriptor?: string | null
          id?: string
          last_seen_at?: string | null
          metadata?: Json | null
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jarvis_faces_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "jarvis_users"
            referencedColumns: ["id"]
          },
        ]
      }
      jarvis_interactions: {
        Row: {
          cost_cents: number | null
          created_at: string | null
          id: string
          intent: string | null
          latency_ms: number | null
          model_used: string | null
          request_id: string
          success: boolean | null
          tools_used: string[] | null
          transcript: string | null
          user_id: string
        }
        Insert: {
          cost_cents?: number | null
          created_at?: string | null
          id?: string
          intent?: string | null
          latency_ms?: number | null
          model_used?: string | null
          request_id: string
          success?: boolean | null
          tools_used?: string[] | null
          transcript?: string | null
          user_id: string
        }
        Update: {
          cost_cents?: number | null
          created_at?: string | null
          id?: string
          intent?: string | null
          latency_ms?: number | null
          model_used?: string | null
          request_id?: string
          success?: boolean | null
          tools_used?: string[] | null
          transcript?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jarvis_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "jarvis_users"
            referencedColumns: ["id"]
          },
        ]
      }
      jarvis_memory: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          expires_at: string | null
          fts: unknown
          id: string
          layer: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          expires_at?: string | null
          fts?: unknown
          id?: string
          layer: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          expires_at?: string | null
          fts?: unknown
          id?: string
          layer?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jarvis_memory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "jarvis_users"
            referencedColumns: ["id"]
          },
        ]
      }
      jarvis_users: {
        Row: {
          auth_uid: string | null
          created_at: string | null
          device_ids: string[] | null
          display_name: string | null
          id: string
          language: string | null
          metadata: Json | null
          model_budget_cents: number | null
          personality: Json | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          auth_uid?: string | null
          created_at?: string | null
          device_ids?: string[] | null
          display_name?: string | null
          id?: string
          language?: string | null
          metadata?: Json | null
          model_budget_cents?: number | null
          personality?: Json | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_uid?: string | null
          created_at?: string | null
          device_ids?: string[] | null
          display_name?: string | null
          id?: string
          language?: string | null
          metadata?: Json | null
          model_budget_cents?: number | null
          personality?: Json | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
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
      jurisdiction_compliance: {
        Row: {
          assessed_at: string | null
          assessed_by: string | null
          compliance_level: Database["public"]["Enums"]["compliance_level"]
          created_at: string
          evidence_notes: string | null
          facility_id: string | null
          gap_description: string | null
          id: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          metadata: Json | null
          next_review_at: string | null
          remediation_due_at: string | null
          remediation_plan: string | null
          requirement_id: string | null
          updated_at: string
        }
        Insert: {
          assessed_at?: string | null
          assessed_by?: string | null
          compliance_level?: Database["public"]["Enums"]["compliance_level"]
          created_at?: string
          evidence_notes?: string | null
          facility_id?: string | null
          gap_description?: string | null
          id?: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          metadata?: Json | null
          next_review_at?: string | null
          remediation_due_at?: string | null
          remediation_plan?: string | null
          requirement_id?: string | null
          updated_at?: string
        }
        Update: {
          assessed_at?: string | null
          assessed_by?: string | null
          compliance_level?: Database["public"]["Enums"]["compliance_level"]
          created_at?: string
          evidence_notes?: string | null
          facility_id?: string | null
          gap_description?: string | null
          id?: string
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"]
          metadata?: Json | null
          next_review_at?: string | null
          remediation_due_at?: string | null
          remediation_plan?: string | null
          requirement_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jurisdiction_compliance_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jurisdiction_compliance_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "regulatory_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_tests: {
        Row: {
          category: string
          course_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_published: boolean
          passing_score: number
          questions: Json
          time_limit_minutes: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean
          passing_score?: number
          questions?: Json
          time_limit_minutes?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean
          passing_score?: number
          questions?: Json
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_tests_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "elearning_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_documents: {
        Row: {
          checksum: string
          doc_type: string
          filename: string
          id: string
          mime_type: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: string
          status: string
          storage_path: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          checksum: string
          doc_type: string
          filename: string
          id?: string
          mime_type?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role: string
          status?: string
          storage_path: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          checksum?: string
          doc_type?: string
          filename?: string
          id?: string
          mime_type?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          status?: string
          storage_path?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lab_results: {
        Row: {
          additional_results: Json | null
          aflatoxins: Json | null
          batch_id: string | null
          cbd_content: number | null
          coa_file_url: string | null
          coa_parsed_data: Json | null
          created_at: string
          created_by: string | null
          double_entry_match: boolean | null
          double_entry_values: Json | null
          entry_method: string | null
          external_id: string | null
          facility_id: string | null
          heavy_metals: Json | null
          id: string
          integrity_hash: string | null
          lab_name: string
          lab_reference: string | null
          metadata: Json | null
          microbiology: Json | null
          moisture_content: number | null
          org_id: string | null
          overall_pass: boolean | null
          owner_user_id: string | null
          pesticides: Json | null
          qp_release_notes: string | null
          qp_release_requested: boolean | null
          qp_release_requested_at: string | null
          qp_release_requested_by: string | null
          qp_released: boolean | null
          qp_released_at: string | null
          qp_released_by: string | null
          result_date: string | null
          sample_date: string | null
          sample_id: string | null
          source_platform: string | null
          status: Database["public"]["Enums"]["lab_result_status"]
          terpenes: Json | null
          test_type: string
          thc_content: number | null
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          additional_results?: Json | null
          aflatoxins?: Json | null
          batch_id?: string | null
          cbd_content?: number | null
          coa_file_url?: string | null
          coa_parsed_data?: Json | null
          created_at?: string
          created_by?: string | null
          double_entry_match?: boolean | null
          double_entry_values?: Json | null
          entry_method?: string | null
          external_id?: string | null
          facility_id?: string | null
          heavy_metals?: Json | null
          id?: string
          integrity_hash?: string | null
          lab_name: string
          lab_reference?: string | null
          metadata?: Json | null
          microbiology?: Json | null
          moisture_content?: number | null
          org_id?: string | null
          overall_pass?: boolean | null
          owner_user_id?: string | null
          pesticides?: Json | null
          qp_release_notes?: string | null
          qp_release_requested?: boolean | null
          qp_release_requested_at?: string | null
          qp_release_requested_by?: string | null
          qp_released?: boolean | null
          qp_released_at?: string | null
          qp_released_by?: string | null
          result_date?: string | null
          sample_date?: string | null
          sample_id?: string | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["lab_result_status"]
          terpenes?: Json | null
          test_type?: string
          thc_content?: number | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          additional_results?: Json | null
          aflatoxins?: Json | null
          batch_id?: string | null
          cbd_content?: number | null
          coa_file_url?: string | null
          coa_parsed_data?: Json | null
          created_at?: string
          created_by?: string | null
          double_entry_match?: boolean | null
          double_entry_values?: Json | null
          entry_method?: string | null
          external_id?: string | null
          facility_id?: string | null
          heavy_metals?: Json | null
          id?: string
          integrity_hash?: string | null
          lab_name?: string
          lab_reference?: string | null
          metadata?: Json | null
          microbiology?: Json | null
          moisture_content?: number | null
          org_id?: string | null
          overall_pass?: boolean | null
          owner_user_id?: string | null
          pesticides?: Json | null
          qp_release_notes?: string | null
          qp_release_requested?: boolean | null
          qp_release_requested_at?: string | null
          qp_release_requested_by?: string | null
          qp_released?: boolean | null
          qp_released_at?: string | null
          qp_released_by?: string | null
          result_date?: string | null
          sample_date?: string | null
          sample_id?: string | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["lab_result_status"]
          terpenes?: Json | null
          test_type?: string
          thc_content?: number | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_samples: {
        Row: {
          analysis_started_at: string | null
          batch_id: string | null
          chain_of_custody: Json | null
          collected_at: string | null
          collected_by: string | null
          collection_method: string | null
          collection_point: string | null
          courier: string | null
          courier_tracking: string | null
          created_at: string | null
          disposed_at: string | null
          disposed_by: string | null
          id: string
          lab_received_at: string | null
          lab_received_by: string | null
          lab_result_id: string | null
          org_id: string | null
          owner_user_id: string | null
          quantity_g: number | null
          results_at: string | null
          retention_location: string | null
          retention_until: string | null
          sample_number: string
          sample_type: string
          seal_number: string | null
          sealed_at: string | null
          sealed_by: string | null
          shipped_at: string | null
          shipped_to_lab: string | null
          status: Database["public"]["Enums"]["sample_status"] | null
          storage_conditions: Json | null
          updated_at: string | null
        }
        Insert: {
          analysis_started_at?: string | null
          batch_id?: string | null
          chain_of_custody?: Json | null
          collected_at?: string | null
          collected_by?: string | null
          collection_method?: string | null
          collection_point?: string | null
          courier?: string | null
          courier_tracking?: string | null
          created_at?: string | null
          disposed_at?: string | null
          disposed_by?: string | null
          id?: string
          lab_received_at?: string | null
          lab_received_by?: string | null
          lab_result_id?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          quantity_g?: number | null
          results_at?: string | null
          retention_location?: string | null
          retention_until?: string | null
          sample_number: string
          sample_type: string
          seal_number?: string | null
          sealed_at?: string | null
          sealed_by?: string | null
          shipped_at?: string | null
          shipped_to_lab?: string | null
          status?: Database["public"]["Enums"]["sample_status"] | null
          storage_conditions?: Json | null
          updated_at?: string | null
        }
        Update: {
          analysis_started_at?: string | null
          batch_id?: string | null
          chain_of_custody?: Json | null
          collected_at?: string | null
          collected_by?: string | null
          collection_method?: string | null
          collection_point?: string | null
          courier?: string | null
          courier_tracking?: string | null
          created_at?: string | null
          disposed_at?: string | null
          disposed_by?: string | null
          id?: string
          lab_received_at?: string | null
          lab_received_by?: string | null
          lab_result_id?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          quantity_g?: number | null
          results_at?: string | null
          retention_location?: string | null
          retention_until?: string | null
          sample_number?: string
          sample_type?: string
          seal_number?: string | null
          sealed_at?: string | null
          sealed_by?: string | null
          shipped_at?: string | null
          shipped_to_lab?: string | null
          status?: Database["public"]["Enums"]["sample_status"] | null
          storage_conditions?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_samples_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_samples_lab_result_id_fkey"
            columns: ["lab_result_id"]
            isOneToOne: false
            referencedRelation: "lab_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_samples_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_signatures: {
        Row: {
          batch_id: string | null
          document_hash: string | null
          id: string
          lab_accreditation: string | null
          lab_name: string
          lab_result_id: string | null
          signatory_name: string | null
          signature: string | null
          signed_at: string | null
          verified: boolean | null
        }
        Insert: {
          batch_id?: string | null
          document_hash?: string | null
          id?: string
          lab_accreditation?: string | null
          lab_name: string
          lab_result_id?: string | null
          signatory_name?: string | null
          signature?: string | null
          signed_at?: string | null
          verified?: boolean | null
        }
        Update: {
          batch_id?: string | null
          document_hash?: string | null
          id?: string
          lab_accreditation?: string | null
          lab_name?: string
          lab_result_id?: string | null
          signatory_name?: string | null
          signature?: string | null
          signed_at?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_signatures_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_signatures_lab_result_id_fkey"
            columns: ["lab_result_id"]
            isOneToOne: false
            referencedRelation: "lab_results"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_interactions: {
        Row: {
          channel: string
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          channel: string
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          aicert_inquiry_id: string | null
          assigned_to: string | null
          company: string | null
          converted_at: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          email: string
          estimated_value: number | null
          gateway_case_id: string | null
          id: string
          last_contacted_at: string | null
          lead_type: string | null
          marketplace_contact_id: string | null
          message: string | null
          metadata: Json | null
          name: string
          next_followup_at: string | null
          notes: Json | null
          phone: string | null
          priority: string | null
          source: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          aicert_inquiry_id?: string | null
          assigned_to?: string | null
          company?: string | null
          converted_at?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          email: string
          estimated_value?: number | null
          gateway_case_id?: string | null
          id?: string
          last_contacted_at?: string | null
          lead_type?: string | null
          marketplace_contact_id?: string | null
          message?: string | null
          metadata?: Json | null
          name: string
          next_followup_at?: string | null
          notes?: Json | null
          phone?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          aicert_inquiry_id?: string | null
          assigned_to?: string | null
          company?: string | null
          converted_at?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string
          estimated_value?: number | null
          gateway_case_id?: string | null
          id?: string
          last_contacted_at?: string | null
          lead_type?: string | null
          marketplace_contact_id?: string | null
          message?: string | null
          metadata?: Json | null
          name?: string
          next_followup_at?: string | null
          notes?: Json | null
          phone?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_transactions: {
        Row: {
          account_code: string
          account_name: string
          amount: number
          amount_thb: number | null
          batch_id: string | null
          created_at: string
          currency: string
          entry_side: Database["public"]["Enums"]["ledger_entry_side"]
          fx_rate_to_thb: number | null
          id: string
          invoice_id: string | null
          memo: string | null
          metadata: Json
          party_user_id: string | null
          payment_split_id: string | null
          posted_at: string
          purchase_request_id: string | null
          reversal_of: string | null
          reversed_at: string | null
          tax_code: string | null
          tax_jurisdiction: string | null
          transaction_number: string
          transaction_type: Database["public"]["Enums"]["ledger_transaction_type"]
        }
        Insert: {
          account_code: string
          account_name: string
          amount: number
          amount_thb?: number | null
          batch_id?: string | null
          created_at?: string
          currency?: string
          entry_side: Database["public"]["Enums"]["ledger_entry_side"]
          fx_rate_to_thb?: number | null
          id?: string
          invoice_id?: string | null
          memo?: string | null
          metadata?: Json
          party_user_id?: string | null
          payment_split_id?: string | null
          posted_at?: string
          purchase_request_id?: string | null
          reversal_of?: string | null
          reversed_at?: string | null
          tax_code?: string | null
          tax_jurisdiction?: string | null
          transaction_number: string
          transaction_type: Database["public"]["Enums"]["ledger_transaction_type"]
        }
        Update: {
          account_code?: string
          account_name?: string
          amount?: number
          amount_thb?: number | null
          batch_id?: string | null
          created_at?: string
          currency?: string
          entry_side?: Database["public"]["Enums"]["ledger_entry_side"]
          fx_rate_to_thb?: number | null
          id?: string
          invoice_id?: string | null
          memo?: string | null
          metadata?: Json
          party_user_id?: string | null
          payment_split_id?: string | null
          posted_at?: string
          purchase_request_id?: string | null
          reversal_of?: string | null
          reversed_at?: string | null
          tax_code?: string | null
          tax_jurisdiction?: string | null
          transaction_number?: string
          transaction_type?: Database["public"]["Enums"]["ledger_transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "ledger_transactions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_transactions_payment_split_id_fkey"
            columns: ["payment_split_id"]
            isOneToOne: false
            referencedRelation: "payment_splits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_transactions_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_transactions_reversal_of_fkey"
            columns: ["reversal_of"]
            isOneToOne: false
            referencedRelation: "ledger_transactions"
            referencedColumns: ["id"]
          },
        ]
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
      line_conversations: {
        Row: {
          channel: string
          created_at: string | null
          detected_language: string | null
          id: number
          interaction_count: number | null
          last_intent: string | null
          last_message_at: string | null
          lead_data: Json
          lead_score: number | null
          lead_status: string
          messages: Json
          preferred_language: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          channel: string
          created_at?: string | null
          detected_language?: string | null
          id?: number
          interaction_count?: number | null
          last_intent?: string | null
          last_message_at?: string | null
          lead_data?: Json
          lead_score?: number | null
          lead_status?: string
          messages?: Json
          preferred_language?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          detected_language?: string | null
          id?: number
          interaction_count?: number | null
          last_intent?: string | null
          last_message_at?: string | null
          lead_data?: Json
          lead_score?: number | null
          lead_status?: string
          messages?: Json
          preferred_language?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      line_events: {
        Row: {
          created_at: string | null
          destination: string | null
          id: number
          payload: Json
          processed: boolean | null
        }
        Insert: {
          created_at?: string | null
          destination?: string | null
          id?: number
          payload: Json
          processed?: boolean | null
        }
        Update: {
          created_at?: string | null
          destination?: string | null
          id?: number
          payload?: Json
          processed?: boolean | null
        }
        Relationships: []
      }
      listing_waitlist: {
        Row: {
          company: string | null
          country: string | null
          created_at: string
          email: string
          id: string
          listing_id: string
          message: string | null
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string
          email: string
          id?: string
          listing_id: string
          message?: string | null
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          listing_id?: string
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_waitlist_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_activities: {
        Row: {
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          id: string
          note: string | null
          type: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          note?: string | null
          type: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          note?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lux_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_agents: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string | null
          id: string
          line_user_id: string | null
          name: string
          phone: string | null
          role: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          line_user_id?: string | null
          name: string
          phone?: string | null
          role?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          line_user_id?: string | null
          name?: string
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
      lux_bookings: {
        Row: {
          agent_id: string | null
          confirmed: boolean | null
          contact_id: string | null
          created_at: string | null
          id: string
          line_user_id: string | null
          property_name: string | null
          slot_id: string | null
        }
        Insert: {
          agent_id?: string | null
          confirmed?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          line_user_id?: string | null
          property_name?: string | null
          slot_id?: string | null
        }
        Update: {
          agent_id?: string | null
          confirmed?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          line_user_id?: string | null
          property_name?: string | null
          slot_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_bookings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "lux_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lux_bookings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lux_bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "lux_viewing_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_broadcasts: {
        Row: {
          id: string
          property_id: string
          property_name: string
          recipient_count: number | null
          recipients: Json | null
          sent_at: string | null
        }
        Insert: {
          id?: string
          property_id: string
          property_name: string
          recipient_count?: number | null
          recipients?: Json | null
          sent_at?: string | null
        }
        Update: {
          id?: string
          property_id?: string
          property_name?: string
          recipient_count?: number | null
          recipients?: Json | null
          sent_at?: string | null
        }
        Relationships: []
      }
      lux_commission_rates: {
        Row: {
          category: string
          id: string
          notes: string | null
          rate_percent: number
        }
        Insert: {
          category: string
          id?: string
          notes?: string | null
          rate_percent: number
        }
        Update: {
          category?: string
          id?: string
          notes?: string | null
          rate_percent?: number
        }
        Relationships: []
      }
      lux_contact_properties: {
        Row: {
          category: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          note: string | null
          price_eur: number | null
          property_id: string
          property_name: string | null
          region: string | null
        }
        Insert: {
          category?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          note?: string | null
          price_eur?: number | null
          property_id: string
          property_name?: string | null
          region?: string | null
        }
        Update: {
          category?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          note?: string | null
          price_eur?: number | null
          property_id?: string
          property_name?: string | null
          region?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_contact_properties_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_contacts: {
        Row: {
          avatar_url: string | null
          budget_currency: string | null
          budget_max: number | null
          budget_min: number | null
          channel: string | null
          created_at: string | null
          email: string | null
          feedback_data: Json | null
          feedback_sent_at: string | null
          followup_at: string | null
          fx_alert_sent_at: string | null
          id: string
          interest: string | null
          language: string | null
          last_contact_at: string | null
          last_interaction: string | null
          lead_data: Json | null
          lead_score: number | null
          lead_status: string | null
          lifestyle_sent_at: string | null
          line_user_id: string | null
          location_interest: string | null
          name: string | null
          nationality: string | null
          notes: string | null
          partner_id: string | null
          phone: string | null
          property_type: string | null
          ref_code: string | null
          source: string | null
          status: string | null
          transfer_requested: boolean | null
          viewing_scheduled_at: string | null
          wa_phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          channel?: string | null
          created_at?: string | null
          email?: string | null
          feedback_data?: Json | null
          feedback_sent_at?: string | null
          followup_at?: string | null
          fx_alert_sent_at?: string | null
          id?: string
          interest?: string | null
          language?: string | null
          last_contact_at?: string | null
          last_interaction?: string | null
          lead_data?: Json | null
          lead_score?: number | null
          lead_status?: string | null
          lifestyle_sent_at?: string | null
          line_user_id?: string | null
          location_interest?: string | null
          name?: string | null
          nationality?: string | null
          notes?: string | null
          partner_id?: string | null
          phone?: string | null
          property_type?: string | null
          ref_code?: string | null
          source?: string | null
          status?: string | null
          transfer_requested?: boolean | null
          viewing_scheduled_at?: string | null
          wa_phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          channel?: string | null
          created_at?: string | null
          email?: string | null
          feedback_data?: Json | null
          feedback_sent_at?: string | null
          followup_at?: string | null
          fx_alert_sent_at?: string | null
          id?: string
          interest?: string | null
          language?: string | null
          last_contact_at?: string | null
          last_interaction?: string | null
          lead_data?: Json | null
          lead_score?: number | null
          lead_status?: string | null
          lifestyle_sent_at?: string | null
          line_user_id?: string | null
          location_interest?: string | null
          name?: string | null
          nationality?: string | null
          notes?: string | null
          partner_id?: string | null
          phone?: string | null
          property_type?: string | null
          ref_code?: string | null
          source?: string | null
          status?: string | null
          transfer_requested?: boolean | null
          viewing_scheduled_at?: string | null
          wa_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_contacts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "lux_referral_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_deals: {
        Row: {
          buyer_email: string | null
          buyer_name: string | null
          buyer_nationality: string | null
          buyer_phone: string | null
          category: string | null
          closed_at: string | null
          commission_eur: number | null
          commission_rate: number | null
          commission_thb: number | null
          contact_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          partner_id: string | null
          property_id: string
          property_name: string
          region: string | null
          sale_price_eur: number | null
          sale_price_thb: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_nationality?: string | null
          buyer_phone?: string | null
          category?: string | null
          closed_at?: string | null
          commission_eur?: number | null
          commission_rate?: number | null
          commission_thb?: number | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          partner_id?: string | null
          property_id: string
          property_name: string
          region?: string | null
          sale_price_eur?: number | null
          sale_price_thb?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_nationality?: string | null
          buyer_phone?: string | null
          category?: string | null
          closed_at?: string | null
          commission_eur?: number | null
          commission_rate?: number | null
          commission_thb?: number | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          partner_id?: string | null
          property_id?: string
          property_name?: string
          region?: string | null
          sale_price_eur?: number | null
          sale_price_thb?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lux_deals_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "lux_referral_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_fx_log: {
        Row: {
          alert_sent: boolean | null
          base: string | null
          id: string
          rate: number
          recorded_at: string | null
          target: string | null
        }
        Insert: {
          alert_sent?: boolean | null
          base?: string | null
          id?: string
          rate: number
          recorded_at?: string | null
          target?: string | null
        }
        Update: {
          alert_sent?: boolean | null
          base?: string | null
          id?: string
          rate?: number
          recorded_at?: string | null
          target?: string | null
        }
        Relationships: []
      }
      lux_partner_commissions: {
        Row: {
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          deal_value_eur: number | null
          id: string
          kevin_commission_eur: number | null
          paid_at: string | null
          partner_commission_eur: number | null
          partner_id: string | null
          status: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          deal_value_eur?: number | null
          id?: string
          kevin_commission_eur?: number | null
          paid_at?: string | null
          partner_commission_eur?: number | null
          partner_id?: string | null
          status?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          deal_value_eur?: number | null
          id?: string
          kevin_commission_eur?: number | null
          paid_at?: string | null
          partner_commission_eur?: number | null
          partner_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_partner_commissions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lux_partner_commissions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "lux_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lux_partner_commissions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "lux_referral_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_partners: {
        Row: {
          active: boolean | null
          category: string
          contact_name: string | null
          created_at: string | null
          description: string | null
          email: string | null
          fee_pct: number | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          active?: boolean | null
          category: string
          contact_name?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          fee_pct?: number | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string
          contact_name?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          fee_pct?: number | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      lux_property_images: {
        Row: {
          category: string
          created_at: string | null
          id: string
          label: string | null
          property_id: string
          sort_order: number | null
          unit_type: string | null
          url: string
        }
        Insert: {
          category?: string
          created_at?: string | null
          id?: string
          label?: string | null
          property_id: string
          sort_order?: number | null
          unit_type?: string | null
          url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          label?: string | null
          property_id?: string
          sort_order?: number | null
          unit_type?: string | null
          url?: string
        }
        Relationships: []
      }
      lux_referral_partners: {
        Row: {
          active: boolean | null
          category: string | null
          code: string
          commission_pct: number | null
          contact_name: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          code: string
          commission_pct?: number | null
          contact_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          code?: string
          commission_pct?: number | null
          contact_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      lux_service_requests: {
        Row: {
          contact_id: string | null
          created_at: string | null
          id: string
          line_user_id: string | null
          notes: string | null
          service_label: string | null
          service_type: string
          status: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          line_user_id?: string | null
          notes?: string | null
          service_label?: string | null
          service_type: string
          status?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          line_user_id?: string | null
          notes?: string | null
          service_label?: string | null
          service_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_service_requests_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      lux_transfers: {
        Row: {
          channel: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          line_user_id: string | null
          notes: string | null
          pickup_location: string | null
          pickup_time: string | null
          property_name: string | null
          status: string | null
          viewing_at: string | null
          viewing_date: string | null
          wa_phone: string | null
        }
        Insert: {
          channel?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          line_user_id?: string | null
          notes?: string | null
          pickup_location?: string | null
          pickup_time?: string | null
          property_name?: string | null
          status?: string | null
          viewing_at?: string | null
          viewing_date?: string | null
          wa_phone?: string | null
        }
        Update: {
          channel?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          line_user_id?: string | null
          notes?: string | null
          pickup_location?: string | null
          pickup_time?: string | null
          property_name?: string | null
          status?: string | null
          viewing_at?: string | null
          viewing_date?: string | null
          wa_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lux_transfers_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "lux_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      lux_travel_schedule: {
        Row: {
          created_at: string | null
          date_from: string
          date_to: string
          id: string
          location: string
          location_label: string | null
          notes: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          date_from: string
          date_to: string
          id?: string
          location: string
          location_label?: string | null
          notes?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          date_from?: string
          date_to?: string
          id?: string
          location?: string
          location_label?: string | null
          notes?: string | null
          source?: string | null
        }
        Relationships: []
      }
      lux_viewing_slots: {
        Row: {
          agent_id: string | null
          agent_name: string | null
          booked_count: number | null
          created_at: string | null
          duration_min: number | null
          id: string
          location: string | null
          max_bookings: number | null
          slot_date: string
          slot_time: string
        }
        Insert: {
          agent_id?: string | null
          agent_name?: string | null
          booked_count?: number | null
          created_at?: string | null
          duration_min?: number | null
          id?: string
          location?: string | null
          max_bookings?: number | null
          slot_date: string
          slot_time: string
        }
        Update: {
          agent_id?: string | null
          agent_name?: string | null
          booked_count?: number | null
          created_at?: string | null
          duration_min?: number | null
          id?: string
          location?: string | null
          max_bookings?: number | null
          slot_date?: string
          slot_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "lux_viewing_slots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "lux_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_listings: {
        Row: {
          archive_after: string | null
          available_at: string | null
          batch_id: string | null
          batch_size_kg: number | null
          created_at: string
          destination_countries: string[] | null
          eu_lab_coa: boolean | null
          facility_country: string | null
          facility_gps_lat: number | null
          facility_gps_lng: number | null
          facility_name: string | null
          facility_plus_code: string | null
          facility_region: string | null
          featured: boolean | null
          gacp_certified: boolean | null
          gmp_certified: boolean | null
          id: string
          next_harvest_date: string | null
          next_harvest_kg: number | null
          next_harvest_waitlist: Json | null
          pre_audit_report_id: string | null
          price_eur_per_kg: number | null
          product_form: string | null
          qp_contracted: boolean | null
          removal_reason: string | null
          removed_by_seller: boolean | null
          reserved_at: string | null
          reserved_by_name: string | null
          seller_company: string | null
          seller_country: string | null
          seller_email: string | null
          seller_line_id: string | null
          seller_name: string
          seller_user_id: string | null
          shinrai_cert_id: string | null
          shinrai_score: number | null
          shinrai_status: string | null
          sold_at: string | null
          status: Database["public"]["Enums"]["listing_status"]
          strain_cbd_pct: number | null
          strain_name: string
          strain_thc_pct: number | null
          updated_at: string
          verified_badge: boolean | null
        }
        Insert: {
          archive_after?: string | null
          available_at?: string | null
          batch_id?: string | null
          batch_size_kg?: number | null
          created_at?: string
          destination_countries?: string[] | null
          eu_lab_coa?: boolean | null
          facility_country?: string | null
          facility_gps_lat?: number | null
          facility_gps_lng?: number | null
          facility_name?: string | null
          facility_plus_code?: string | null
          facility_region?: string | null
          featured?: boolean | null
          gacp_certified?: boolean | null
          gmp_certified?: boolean | null
          id?: string
          next_harvest_date?: string | null
          next_harvest_kg?: number | null
          next_harvest_waitlist?: Json | null
          pre_audit_report_id?: string | null
          price_eur_per_kg?: number | null
          product_form?: string | null
          qp_contracted?: boolean | null
          removal_reason?: string | null
          removed_by_seller?: boolean | null
          reserved_at?: string | null
          reserved_by_name?: string | null
          seller_company?: string | null
          seller_country?: string | null
          seller_email?: string | null
          seller_line_id?: string | null
          seller_name: string
          seller_user_id?: string | null
          shinrai_cert_id?: string | null
          shinrai_score?: number | null
          shinrai_status?: string | null
          sold_at?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          strain_cbd_pct?: number | null
          strain_name: string
          strain_thc_pct?: number | null
          updated_at?: string
          verified_badge?: boolean | null
        }
        Update: {
          archive_after?: string | null
          available_at?: string | null
          batch_id?: string | null
          batch_size_kg?: number | null
          created_at?: string
          destination_countries?: string[] | null
          eu_lab_coa?: boolean | null
          facility_country?: string | null
          facility_gps_lat?: number | null
          facility_gps_lng?: number | null
          facility_name?: string | null
          facility_plus_code?: string | null
          facility_region?: string | null
          featured?: boolean | null
          gacp_certified?: boolean | null
          gmp_certified?: boolean | null
          id?: string
          next_harvest_date?: string | null
          next_harvest_kg?: number | null
          next_harvest_waitlist?: Json | null
          pre_audit_report_id?: string | null
          price_eur_per_kg?: number | null
          product_form?: string | null
          qp_contracted?: boolean | null
          removal_reason?: string | null
          removed_by_seller?: boolean | null
          reserved_at?: string | null
          reserved_by_name?: string | null
          seller_company?: string | null
          seller_country?: string | null
          seller_email?: string | null
          seller_line_id?: string | null
          seller_name?: string
          seller_user_id?: string | null
          shinrai_cert_id?: string | null
          shinrai_score?: number | null
          shinrai_status?: string | null
          sold_at?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          strain_cbd_pct?: number | null
          strain_name?: string
          strain_thc_pct?: number | null
          updated_at?: string
          verified_badge?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_pre_audit_report_id_fkey"
            columns: ["pre_audit_report_id"]
            isOneToOne: false
            referencedRelation: "pre_audit_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      milestone_payments: {
        Row: {
          amount: number
          batch_id: string
          created_at: string
          currency: string
          due_at: string | null
          eligible_at: string | null
          escrow_agreement_id: string
          exporter_id: string
          failure_reason: string | null
          id: string
          importer_id: string
          metadata: Json
          milestone_type: string
          payment_provider: string
          payment_reference: string | null
          percent_of_total: number
          purchase_request_id: string | null
          release_decision: Json
          release_tx_id: string | null
          released_at: string | null
          required_batch_statuses: string[]
          required_previous_milestone: string | null
          required_shinrai_score: number
          sequence_no: number
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          batch_id: string
          created_at?: string
          currency?: string
          due_at?: string | null
          eligible_at?: string | null
          escrow_agreement_id: string
          exporter_id: string
          failure_reason?: string | null
          id?: string
          importer_id: string
          metadata?: Json
          milestone_type: string
          payment_provider?: string
          payment_reference?: string | null
          percent_of_total: number
          purchase_request_id?: string | null
          release_decision?: Json
          release_tx_id?: string | null
          released_at?: string | null
          required_batch_statuses?: string[]
          required_previous_milestone?: string | null
          required_shinrai_score?: number
          sequence_no: number
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          batch_id?: string
          created_at?: string
          currency?: string
          due_at?: string | null
          eligible_at?: string | null
          escrow_agreement_id?: string
          exporter_id?: string
          failure_reason?: string | null
          id?: string
          importer_id?: string
          metadata?: Json
          milestone_type?: string
          payment_provider?: string
          payment_reference?: string | null
          percent_of_total?: number
          purchase_request_id?: string | null
          release_decision?: Json
          release_tx_id?: string | null
          released_at?: string | null
          required_batch_statuses?: string[]
          required_previous_milestone?: string | null
          required_shinrai_score?: number
          sequence_no?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestone_payments_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_payments_escrow_agreement_id_fkey"
            columns: ["escrow_agreement_id"]
            isOneToOne: false
            referencedRelation: "escrow_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_payments_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_points: {
        Row: {
          alert_threshold_critical: number | null
          alert_threshold_warning: number | null
          created_at: string
          created_by: string | null
          facility_id: string | null
          id: string
          is_active: boolean
          location: string
          max_threshold: number | null
          measurement_interval_minutes: number | null
          metadata: Json | null
          min_threshold: number | null
          monitoring_type: string
          name: string
          unit: string
          updated_at: string
        }
        Insert: {
          alert_threshold_critical?: number | null
          alert_threshold_warning?: number | null
          created_at?: string
          created_by?: string | null
          facility_id?: string | null
          id?: string
          is_active?: boolean
          location: string
          max_threshold?: number | null
          measurement_interval_minutes?: number | null
          metadata?: Json | null
          min_threshold?: number | null
          monitoring_type?: string
          name: string
          unit?: string
          updated_at?: string
        }
        Update: {
          alert_threshold_critical?: number | null
          alert_threshold_warning?: number | null
          created_at?: string
          created_by?: string | null
          facility_id?: string | null
          id?: string
          is_active?: boolean
          location?: string
          max_threshold?: number | null
          measurement_interval_minutes?: number | null
          metadata?: Json | null
          min_threshold?: number | null
          monitoring_type?: string
          name?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_points_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_readings: {
        Row: {
          created_at: string
          id: string
          is_critical: boolean | null
          is_in_range: boolean | null
          is_warning: boolean | null
          metadata: Json | null
          notes: string | null
          point_id: string
          recorded_at: string
          recorded_by: string | null
          source: string | null
          unit: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_critical?: boolean | null
          is_in_range?: boolean | null
          is_warning?: boolean | null
          metadata?: Json | null
          notes?: string | null
          point_id: string
          recorded_at?: string
          recorded_by?: string | null
          source?: string | null
          unit: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          is_critical?: boolean | null
          is_in_range?: boolean | null
          is_warning?: boolean | null
          metadata?: Json | null
          notes?: string | null
          point_id?: string
          recorded_at?: string
          recorded_by?: string | null
          source?: string | null
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_readings_point_id_fkey"
            columns: ["point_id"]
            isOneToOne: false
            referencedRelation: "monitoring_points"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_channels: {
        Row: {
          alert_types: string[] | null
          channel_name: string | null
          channel_type: string
          created_at: string | null
          id: string
          is_active: boolean | null
          user_id: string | null
          webhook_url: string
        }
        Insert: {
          alert_types?: string[] | null
          channel_name?: string | null
          channel_type: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string | null
          webhook_url: string
        }
        Update: {
          alert_types?: string[] | null
          channel_name?: string | null
          channel_type?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string | null
          webhook_url?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          event_type: string | null
          id: string
          is_read: boolean
          link: string | null
          message: string
          read: boolean | null
          severity: string
          source_platform: string | null
          title: string
          type: string | null
          user_id: string
          webhook_event_id: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string | null
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          read?: boolean | null
          severity?: string
          source_platform?: string | null
          title: string
          type?: string | null
          user_id: string
          webhook_event_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string | null
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          read?: boolean | null
          severity?: string
          source_platform?: string | null
          title?: string
          type?: string | null
          user_id?: string
          webhook_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_webhook_event_id_fkey"
            columns: ["webhook_event_id"]
            isOneToOne: false
            referencedRelation: "webhook_events"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding: {
        Row: {
          aicert_facility_id: string | null
          annual_revenue: string | null
          business_description: string | null
          certifications: string[] | null
          company_address: Json | null
          company_name: string | null
          company_type: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contact_position: string | null
          created_at: string | null
          documents: Json | null
          employee_count: string | null
          has_gacp: boolean | null
          has_gdp: boolean | null
          has_gmp: boolean | null
          id: string
          marketplace_profile_id: string | null
          metadata: Json | null
          registered_country: string | null
          registration_number: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          status: string | null
          step: number | null
          target_markets: string[] | null
          tax_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          aicert_facility_id?: string | null
          annual_revenue?: string | null
          business_description?: string | null
          certifications?: string[] | null
          company_address?: Json | null
          company_name?: string | null
          company_type?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string | null
          documents?: Json | null
          employee_count?: string | null
          has_gacp?: boolean | null
          has_gdp?: boolean | null
          has_gmp?: boolean | null
          id?: string
          marketplace_profile_id?: string | null
          metadata?: Json | null
          registered_country?: string | null
          registration_number?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string | null
          step?: number | null
          target_markets?: string[] | null
          tax_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          aicert_facility_id?: string | null
          annual_revenue?: string | null
          business_description?: string | null
          certifications?: string[] | null
          company_address?: Json | null
          company_name?: string | null
          company_type?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string | null
          documents?: Json | null
          employee_count?: string | null
          has_gacp?: boolean | null
          has_gdp?: boolean | null
          has_gmp?: boolean | null
          id?: string
          marketplace_profile_id?: string | null
          metadata?: Json | null
          registered_country?: string | null
          registration_number?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string | null
          step?: number | null
          target_markets?: string[] | null
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_assignments: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          mentor_id: string | null
          notes: string | null
          plan_id: string
          progress_percent: number
          started_at: string | null
          status: string
          step_completions: Json
          target_completion_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          mentor_id?: string | null
          notes?: string | null
          plan_id: string
          progress_percent?: number
          started_at?: string | null
          status?: string
          step_completions?: Json
          target_completion_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          mentor_id?: string | null
          notes?: string | null
          plan_id?: string
          progress_percent?: number
          started_at?: string | null
          status?: string
          step_completions?: Json
          target_completion_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_assignments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "onboarding_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_documents: {
        Row: {
          admin_notes: string | null
          ai_validation: Json | null
          created_at: string
          document_type: string
          file_name: string | null
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          onboarding_id: string
          status: string
          step: number
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          ai_validation?: Json | null
          created_at?: string
          document_type: string
          file_name?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          onboarding_id: string
          status?: string
          step: number
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          ai_validation?: Json | null
          created_at?: string
          document_type?: string
          file_name?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          onboarding_id?: string
          status?: string
          step?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_documents_onboarding_id_fkey"
            columns: ["onboarding_id"]
            isOneToOne: false
            referencedRelation: "exporter_onboarding"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_plans: {
        Row: {
          created_at: string
          created_by: string | null
          department: string
          description: string | null
          duration_days: number
          id: string
          is_template: boolean
          role_target: string
          steps: Json
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department?: string
          description?: string | null
          duration_days?: number
          id?: string
          is_template?: boolean
          role_target?: string
          steps?: Json
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string
          description?: string | null
          duration_days?: number
          id?: string
          is_template?: boolean
          role_target?: string
          steps?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          batch_id: string
          buyer_country: string | null
          compliance_approved_at: string | null
          compliance_approved_by: string | null
          created_at: string
          geo_check_passed: boolean | null
          id: string
          invoice_id: string | null
          legal_entity: string | null
          notes: string | null
          ordered_by: string
          payment_auth_status: string | null
          payment_held_at: string | null
          payment_intent_id: string | null
          psp: string | null
          quantity: number
          source_platform: string
          status: string
          updated_at: string
        }
        Insert: {
          batch_id: string
          buyer_country?: string | null
          compliance_approved_at?: string | null
          compliance_approved_by?: string | null
          created_at?: string
          geo_check_passed?: boolean | null
          id?: string
          invoice_id?: string | null
          legal_entity?: string | null
          notes?: string | null
          ordered_by: string
          payment_auth_status?: string | null
          payment_held_at?: string | null
          payment_intent_id?: string | null
          psp?: string | null
          quantity: number
          source_platform: string
          status?: string
          updated_at?: string
        }
        Update: {
          batch_id?: string
          buyer_country?: string | null
          compliance_approved_at?: string | null
          compliance_approved_by?: string | null
          created_at?: string
          geo_check_passed?: boolean | null
          id?: string
          invoice_id?: string | null
          legal_entity?: string | null
          notes?: string | null
          ordered_by?: string
          payment_auth_status?: string | null
          payment_held_at?: string | null
          payment_intent_id?: string | null
          psp?: string | null
          quantity?: number
          source_platform?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_invitations: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          email: string
          expires_at: string | null
          id: string
          invited_by: string | null
          member_role: string
          organization_id: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          email: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          member_role?: string
          organization_id: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          email?: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          member_role?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          invited_by: string | null
          member_role: string
          organization_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_by?: string | null
          member_role?: string
          organization_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_by?: string | null
          member_role?: string
          organization_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          country_code: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          organization_type: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          organization_type?: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          country_code?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          organization_type?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      packaging_units: {
        Row: {
          batch_id: string | null
          created_at: string | null
          dimensions_cm: Json | null
          gtin: string | null
          id: string
          level: Database["public"]["Enums"]["packaging_level"]
          notes: string | null
          packaging_material: string | null
          packed_at: string | null
          packed_by: string | null
          parent_unit_id: string | null
          quantity: number | null
          seal_number: string | null
          seal_verified: boolean | null
          serial_number: string | null
          shipment_id: string | null
          sscc: string | null
          status: string | null
          temperature_range: Json | null
          weight_kg: number | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          dimensions_cm?: Json | null
          gtin?: string | null
          id?: string
          level: Database["public"]["Enums"]["packaging_level"]
          notes?: string | null
          packaging_material?: string | null
          packed_at?: string | null
          packed_by?: string | null
          parent_unit_id?: string | null
          quantity?: number | null
          seal_number?: string | null
          seal_verified?: boolean | null
          serial_number?: string | null
          shipment_id?: string | null
          sscc?: string | null
          status?: string | null
          temperature_range?: Json | null
          weight_kg?: number | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          dimensions_cm?: Json | null
          gtin?: string | null
          id?: string
          level?: Database["public"]["Enums"]["packaging_level"]
          notes?: string | null
          packaging_material?: string | null
          packed_at?: string | null
          packed_by?: string | null
          parent_unit_id?: string | null
          quantity?: number | null
          seal_number?: string | null
          seal_verified?: boolean | null
          serial_number?: string | null
          shipment_id?: string | null
          sscc?: string | null
          status?: string | null
          temperature_range?: Json | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_units_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packaging_units_parent_unit_id_fkey"
            columns: ["parent_unit_id"]
            isOneToOne: false
            referencedRelation: "packaging_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packaging_units_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_contracts: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          commission_override: number | null
          contract_type: string
          created_at: string
          duration_years: number | null
          end_date: string | null
          id: string
          monthly_volume_commitment: number | null
          notes: string | null
          start_date: string | null
          status: string
          terms: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          commission_override?: number | null
          contract_type?: string
          created_at?: string
          duration_years?: number | null
          end_date?: string | null
          id?: string
          monthly_volume_commitment?: number | null
          notes?: string | null
          start_date?: string | null
          status?: string
          terms?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          commission_override?: number | null
          contract_type?: string
          created_at?: string
          duration_years?: number | null
          end_date?: string | null
          id?: string
          monthly_volume_commitment?: number | null
          notes?: string | null
          start_date?: string | null
          status?: string
          terms?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_provider_accounts: {
        Row: {
          account_label: string
          config: Json
          country_code: string | null
          created_at: string
          currency: string | null
          id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          status: Database["public"]["Enums"]["payment_provider_status"]
          supports_bank_transfer: boolean
          supports_cards: boolean
          supports_high_risk_cannabis: boolean
          supports_high_risk_cbd: boolean
          supports_marketplace_splits: boolean
          supports_payouts: boolean
          supports_subscriptions: boolean
          supports_wallets: boolean
          underwriting_notes: string | null
          updated_at: string
        }
        Insert: {
          account_label: string
          config?: Json
          country_code?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          provider: Database["public"]["Enums"]["payment_provider"]
          status?: Database["public"]["Enums"]["payment_provider_status"]
          supports_bank_transfer?: boolean
          supports_cards?: boolean
          supports_high_risk_cannabis?: boolean
          supports_high_risk_cbd?: boolean
          supports_marketplace_splits?: boolean
          supports_payouts?: boolean
          supports_subscriptions?: boolean
          supports_wallets?: boolean
          underwriting_notes?: string | null
          updated_at?: string
        }
        Update: {
          account_label?: string
          config?: Json
          country_code?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          provider?: Database["public"]["Enums"]["payment_provider"]
          status?: Database["public"]["Enums"]["payment_provider_status"]
          supports_bank_transfer?: boolean
          supports_cards?: boolean
          supports_high_risk_cannabis?: boolean
          supports_high_risk_cbd?: boolean
          supports_marketplace_splits?: boolean
          supports_payouts?: boolean
          supports_subscriptions?: boolean
          supports_wallets?: boolean
          underwriting_notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payment_provider_transactions: {
        Row: {
          amount_cents: number
          cancel_url: string | null
          created_at: string
          currency: string
          escrow_agreement_id: string | null
          id: string
          idempotency_key: string | null
          invoice_id: string | null
          metadata: Json
          provider: Database["public"]["Enums"]["payment_provider"]
          provider_account_id: string | null
          provider_checkout_url: string | null
          provider_customer_id: string | null
          provider_payment_intent_id: string | null
          provider_session_id: string | null
          provider_subscription_id: string | null
          purchase_request_id: string | null
          raw_provider_payload: Json
          service_order_id: string | null
          status: Database["public"]["Enums"]["payment_provider_transaction_status"]
          subscription_id: string | null
          success_url: string | null
          transaction_type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_cents?: number
          cancel_url?: string | null
          created_at?: string
          currency?: string
          escrow_agreement_id?: string | null
          id?: string
          idempotency_key?: string | null
          invoice_id?: string | null
          metadata?: Json
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_account_id?: string | null
          provider_checkout_url?: string | null
          provider_customer_id?: string | null
          provider_payment_intent_id?: string | null
          provider_session_id?: string | null
          provider_subscription_id?: string | null
          purchase_request_id?: string | null
          raw_provider_payload?: Json
          service_order_id?: string | null
          status?: Database["public"]["Enums"]["payment_provider_transaction_status"]
          subscription_id?: string | null
          success_url?: string | null
          transaction_type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          cancel_url?: string | null
          created_at?: string
          currency?: string
          escrow_agreement_id?: string | null
          id?: string
          idempotency_key?: string | null
          invoice_id?: string | null
          metadata?: Json
          provider?: Database["public"]["Enums"]["payment_provider"]
          provider_account_id?: string | null
          provider_checkout_url?: string | null
          provider_customer_id?: string | null
          provider_payment_intent_id?: string | null
          provider_session_id?: string | null
          provider_subscription_id?: string | null
          purchase_request_id?: string | null
          raw_provider_payload?: Json
          service_order_id?: string | null
          status?: Database["public"]["Enums"]["payment_provider_transaction_status"]
          subscription_id?: string | null
          success_url?: string | null
          transaction_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_provider_transactions_escrow_agreement_id_fkey"
            columns: ["escrow_agreement_id"]
            isOneToOne: false
            referencedRelation: "escrow_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_provider_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_provider_transactions_provider_account_id_fkey"
            columns: ["provider_account_id"]
            isOneToOne: false
            referencedRelation: "payment_provider_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_provider_transactions_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_provider_transactions_service_order_id_fkey"
            columns: ["service_order_id"]
            isOneToOne: false
            referencedRelation: "cw_service_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_provider_transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "cw_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_splits: {
        Row: {
          amount: number
          amount_thb: number | null
          batch_id: string | null
          beneficiary_country: string | null
          beneficiary_name: string | null
          beneficiary_user_id: string | null
          created_at: string
          currency: string
          fx_rate_to_thb: number | null
          id: string
          invoice_id: string
          metadata: Json
          paid_at: string | null
          payout_method: string
          payout_reference: string | null
          percentage: number | null
          priority: number
          purchase_request_id: string | null
          released_at: string | null
          split_type: string
          status: Database["public"]["Enums"]["payment_split_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          amount_thb?: number | null
          batch_id?: string | null
          beneficiary_country?: string | null
          beneficiary_name?: string | null
          beneficiary_user_id?: string | null
          created_at?: string
          currency?: string
          fx_rate_to_thb?: number | null
          id?: string
          invoice_id: string
          metadata?: Json
          paid_at?: string | null
          payout_method?: string
          payout_reference?: string | null
          percentage?: number | null
          priority?: number
          purchase_request_id?: string | null
          released_at?: string | null
          split_type: string
          status?: Database["public"]["Enums"]["payment_split_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          amount_thb?: number | null
          batch_id?: string | null
          beneficiary_country?: string | null
          beneficiary_name?: string | null
          beneficiary_user_id?: string | null
          created_at?: string
          currency?: string
          fx_rate_to_thb?: number | null
          id?: string
          invoice_id?: string
          metadata?: Json
          paid_at?: string | null
          payout_method?: string
          payout_reference?: string | null
          percentage?: number | null
          priority?: number
          purchase_request_id?: string | null
          released_at?: string | null
          split_type?: string
          status?: Database["public"]["Enums"]["payment_split_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_splits_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_splits_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_splits_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacovigilance_reports: {
        Row: {
          assessor_id: string | null
          authority_notified: string | null
          authority_reference: string | null
          batch_id: string | null
          batch_number: string | null
          causality_assessment: string | null
          corrective_actions: string | null
          created_at: string
          description: string | null
          dosage: string | null
          escalation_level: Database["public"]["Enums"]["pv_escalation_level"]
          escalation_reason: string | null
          event_date: string | null
          expedited_report: boolean | null
          id: string
          integrity_hash: string | null
          legal_basis: string | null
          metadata: Json | null
          outcome: string | null
          patient_age: number | null
          patient_gender: string | null
          patient_initials: string | null
          product_name: string
          report_date: string
          report_number: string
          report_type: Database["public"]["Enums"]["pv_report_type"]
          reporter_id: string
          resolution_date: string | null
          severity: Database["public"]["Enums"]["pv_severity"]
          status: Database["public"]["Enums"]["pv_status"]
          submission_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assessor_id?: string | null
          authority_notified?: string | null
          authority_reference?: string | null
          batch_id?: string | null
          batch_number?: string | null
          causality_assessment?: string | null
          corrective_actions?: string | null
          created_at?: string
          description?: string | null
          dosage?: string | null
          escalation_level?: Database["public"]["Enums"]["pv_escalation_level"]
          escalation_reason?: string | null
          event_date?: string | null
          expedited_report?: boolean | null
          id?: string
          integrity_hash?: string | null
          legal_basis?: string | null
          metadata?: Json | null
          outcome?: string | null
          patient_age?: number | null
          patient_gender?: string | null
          patient_initials?: string | null
          product_name: string
          report_date?: string
          report_number: string
          report_type?: Database["public"]["Enums"]["pv_report_type"]
          reporter_id: string
          resolution_date?: string | null
          severity?: Database["public"]["Enums"]["pv_severity"]
          status?: Database["public"]["Enums"]["pv_status"]
          submission_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assessor_id?: string | null
          authority_notified?: string | null
          authority_reference?: string | null
          batch_id?: string | null
          batch_number?: string | null
          causality_assessment?: string | null
          corrective_actions?: string | null
          created_at?: string
          description?: string | null
          dosage?: string | null
          escalation_level?: Database["public"]["Enums"]["pv_escalation_level"]
          escalation_reason?: string | null
          event_date?: string | null
          expedited_report?: boolean | null
          id?: string
          integrity_hash?: string | null
          legal_basis?: string | null
          metadata?: Json | null
          outcome?: string | null
          patient_age?: number | null
          patient_gender?: string | null
          patient_initials?: string | null
          product_name?: string
          report_date?: string
          report_number?: string
          report_type?: Database["public"]["Enums"]["pv_report_type"]
          reporter_id?: string
          resolution_date?: string | null
          severity?: Database["public"]["Enums"]["pv_severity"]
          status?: Database["public"]["Enums"]["pv_status"]
          submission_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pharmacovigilance_reports_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          lead_id: string | null
          metadata: Json | null
          new_value: string | null
          old_value: string | null
          source_app: string | null
          source_ref: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
          source_app?: string | null
          source_ref?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
          source_app?: string | null
          source_ref?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_access: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          is_active: boolean
          platform: string
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          platform: string
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          platform?: string
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
      post_harvest_orders: {
        Row: {
          batch_id: string
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          processing_type: string | null
          processor_id: string | null
          requested_by: string
          service_type: Database["public"]["Enums"]["post_harvest_service"]
          specifications: Json | null
          status: Database["public"]["Enums"]["service_order_status"]
          updated_at: string
          weight_in_kg: number | null
          weight_out_kg: number | null
        }
        Insert: {
          batch_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          processing_type?: string | null
          processor_id?: string | null
          requested_by: string
          service_type: Database["public"]["Enums"]["post_harvest_service"]
          specifications?: Json | null
          status?: Database["public"]["Enums"]["service_order_status"]
          updated_at?: string
          weight_in_kg?: number | null
          weight_out_kg?: number | null
        }
        Update: {
          batch_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          processing_type?: string | null
          processor_id?: string | null
          requested_by?: string
          service_type?: Database["public"]["Enums"]["post_harvest_service"]
          specifications?: Json | null
          status?: Database["public"]["Enums"]["service_order_status"]
          updated_at?: string
          weight_in_kg?: number | null
          weight_out_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_harvest_orders_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_harvest_orders_processor_id_fkey"
            columns: ["processor_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      pre_audit_inquiries: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string | null
          destination_country: string | null
          email: string
          id: string
          message: string | null
          name: string
          notes: string | null
          source: string | null
          status: string | null
          tier: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string | null
          destination_country?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          source?: string | null
          status?: string | null
          tier?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string | null
          destination_country?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          source?: string | null
          status?: string | null
          tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      price_audit_log: {
        Row: {
          batch_id: string
          change_reason: string | null
          changed_by: string | null
          created_at: string
          id: string
          integrity_hash: string | null
          new_price: number
          old_price: number
          previous_hash: string | null
        }
        Insert: {
          batch_id: string
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          new_price: number
          old_price: number
          previous_hash?: string | null
        }
        Update: {
          batch_id?: string
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string
          id?: string
          integrity_hash?: string | null
          new_price?: number
          old_price?: number
          previous_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_audit_log_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      price_intelligence: {
        Row: {
          ai_analysis: string | null
          batch_id: string
          certification_premium: number | null
          confidence_score: number | null
          created_at: string
          dampening_factor: number
          estimated_market_price: number
          exporter_acceptance_rate: number | null
          exporter_asking_price: number
          exporter_avg_price: number | null
          exporter_price_flexibility: number | null
          exporter_visible_estimate: number | null
          id: string
          market_demand_score: number | null
          model_version: string | null
          origin_factor: number | null
          price_range_high: number
          price_range_low: number
          quality_score: number | null
          recommended_purchase_price: number
          recommended_resale_price: number
          spread_percentage: number
          spread_potential: number
          updated_at: string
        }
        Insert: {
          ai_analysis?: string | null
          batch_id: string
          certification_premium?: number | null
          confidence_score?: number | null
          created_at?: string
          dampening_factor?: number
          estimated_market_price?: number
          exporter_acceptance_rate?: number | null
          exporter_asking_price?: number
          exporter_avg_price?: number | null
          exporter_price_flexibility?: number | null
          exporter_visible_estimate?: number | null
          id?: string
          market_demand_score?: number | null
          model_version?: string | null
          origin_factor?: number | null
          price_range_high?: number
          price_range_low?: number
          quality_score?: number | null
          recommended_purchase_price?: number
          recommended_resale_price?: number
          spread_percentage?: number
          spread_potential?: number
          updated_at?: string
        }
        Update: {
          ai_analysis?: string | null
          batch_id?: string
          certification_premium?: number | null
          confidence_score?: number | null
          created_at?: string
          dampening_factor?: number
          estimated_market_price?: number
          exporter_acceptance_rate?: number | null
          exporter_asking_price?: number
          exporter_avg_price?: number | null
          exporter_price_flexibility?: number | null
          exporter_visible_estimate?: number | null
          id?: string
          market_demand_score?: number | null
          model_version?: string | null
          origin_factor?: number | null
          price_range_high?: number
          price_range_low?: number
          quality_score?: number | null
          recommended_purchase_price?: number
          recommended_resale_price?: number
          spread_percentage?: number
          spread_potential?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_intelligence_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: true
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aicert_user_id: string | null
          avatar_url: string | null
          company: string | null
          company_name: string | null
          contact_name: string | null
          country: string | null
          created_at: string
          display_name: string | null
          email: string | null
          full_name: string | null
          gateway_user_id: string | null
          gmp_certificate_expiry: string | null
          id: string
          is_online: boolean
          last_seen_at: string | null
          license_number: string | null
          marketplace_user_id: string | null
          metadata: Json | null
          onboarding_completed: boolean
          onboarding_data: Json | null
          phone: string | null
          role: string | null
          thai_fda_license: string | null
          updated_at: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          aicert_user_id?: string | null
          avatar_url?: string | null
          company?: string | null
          company_name?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          gateway_user_id?: string | null
          gmp_certificate_expiry?: string | null
          id: string
          is_online?: boolean
          last_seen_at?: string | null
          license_number?: string | null
          marketplace_user_id?: string | null
          metadata?: Json | null
          onboarding_completed?: boolean
          onboarding_data?: Json | null
          phone?: string | null
          role?: string | null
          thai_fda_license?: string | null
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          aicert_user_id?: string | null
          avatar_url?: string | null
          company?: string | null
          company_name?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          gateway_user_id?: string | null
          gmp_certificate_expiry?: string | null
          id?: string
          is_online?: boolean
          last_seen_at?: string | null
          license_number?: string | null
          marketplace_user_id?: string | null
          metadata?: Json | null
          onboarding_completed?: boolean
          onboarding_data?: Json | null
          phone?: string | null
          role?: string | null
          thai_fda_license?: string | null
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      purchase_requests: {
        Row: {
          admin_response: string | null
          batch_id: string
          created_at: string
          exporter_id: string
          exporter_response: string | null
          id: string
          importer_id: string
          invoice_id: string | null
          notes: string | null
          offered_price: number
          payment_provider: Database["public"]["Enums"]["payment_provider"]
          quantity: number
          status: Database["public"]["Enums"]["purchase_request_status"]
          stripe_checkout_session_id: string | null
          trade_type: Database["public"]["Enums"]["trade_type"]
          updated_at: string
        }
        Insert: {
          admin_response?: string | null
          batch_id: string
          created_at?: string
          exporter_id: string
          exporter_response?: string | null
          id?: string
          importer_id: string
          invoice_id?: string | null
          notes?: string | null
          offered_price: number
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          quantity: number
          status?: Database["public"]["Enums"]["purchase_request_status"]
          stripe_checkout_session_id?: string | null
          trade_type?: Database["public"]["Enums"]["trade_type"]
          updated_at?: string
        }
        Update: {
          admin_response?: string | null
          batch_id?: string
          created_at?: string
          exporter_id?: string
          exporter_response?: string | null
          id?: string
          importer_id?: string
          invoice_id?: string | null
          notes?: string | null
          offered_price?: number
          payment_provider?: Database["public"]["Enums"]["payment_provider"]
          quantity?: number
          status?: Database["public"]["Enums"]["purchase_request_status"]
          stripe_checkout_session_id?: string | null
          trade_type?: Database["public"]["Enums"]["trade_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      qp_release_decisions: {
        Row: {
          batch_id: string
          coa_verified: boolean | null
          conditions: string | null
          created_at: string
          decision: string
          decision_date: string | null
          escalated_at: string | null
          escalated_to: string | null
          escalation_level: number | null
          escalation_reason: string | null
          facility_id: string | null
          gmp_compliance_confirmed: boolean | null
          id: string
          integrity_hash: string | null
          qp_license_number: string | null
          qp_name: string
          qp_qualification: string | null
          qp_user_id: string
          rejection_reason: string | null
          remarks: string | null
          review_checklist: Json | null
          signature_url: string | null
          specification_met: boolean | null
          stability_data_reviewed: boolean | null
          updated_at: string
        }
        Insert: {
          batch_id: string
          coa_verified?: boolean | null
          conditions?: string | null
          created_at?: string
          decision: string
          decision_date?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_level?: number | null
          escalation_reason?: string | null
          facility_id?: string | null
          gmp_compliance_confirmed?: boolean | null
          id?: string
          integrity_hash?: string | null
          qp_license_number?: string | null
          qp_name: string
          qp_qualification?: string | null
          qp_user_id: string
          rejection_reason?: string | null
          remarks?: string | null
          review_checklist?: Json | null
          signature_url?: string | null
          specification_met?: boolean | null
          stability_data_reviewed?: boolean | null
          updated_at?: string
        }
        Update: {
          batch_id?: string
          coa_verified?: boolean | null
          conditions?: string | null
          created_at?: string
          decision?: string
          decision_date?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_level?: number | null
          escalation_reason?: string | null
          facility_id?: string | null
          gmp_compliance_confirmed?: boolean | null
          id?: string
          integrity_hash?: string | null
          qp_license_number?: string | null
          qp_name?: string
          qp_qualification?: string | null
          qp_user_id?: string
          rejection_reason?: string | null
          remarks?: string | null
          review_checklist?: Json | null
          signature_url?: string | null
          specification_met?: boolean | null
          stability_data_reviewed?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "qp_release_decisions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qp_release_decisions_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      qualified_signatures: {
        Row: {
          batch_id: string | null
          certificate_chain: string | null
          created_at: string | null
          document_hash: string
          document_type: string
          dtrust_transaction_id: string | null
          id: string
          legal_basis: string | null
          ocsp_response: string | null
          signature_algorithm: string | null
          signature_value: string | null
          signer_certificate_id: string | null
          signer_eu_gmp_cert: string | null
          signer_name: string
          signing_time: string | null
          status: string | null
          tsa_timestamp: string | null
        }
        Insert: {
          batch_id?: string | null
          certificate_chain?: string | null
          created_at?: string | null
          document_hash: string
          document_type: string
          dtrust_transaction_id?: string | null
          id?: string
          legal_basis?: string | null
          ocsp_response?: string | null
          signature_algorithm?: string | null
          signature_value?: string | null
          signer_certificate_id?: string | null
          signer_eu_gmp_cert?: string | null
          signer_name: string
          signing_time?: string | null
          status?: string | null
          tsa_timestamp?: string | null
        }
        Update: {
          batch_id?: string | null
          certificate_chain?: string | null
          created_at?: string | null
          document_hash?: string
          document_type?: string
          dtrust_transaction_id?: string | null
          id?: string
          legal_basis?: string | null
          ocsp_response?: string | null
          signature_algorithm?: string | null
          signature_value?: string | null
          signer_certificate_id?: string | null
          signer_eu_gmp_cert?: string | null
          signer_name?: string
          signing_time?: string | null
          status?: string | null
          tsa_timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qualified_signatures_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_predictions: {
        Row: {
          ai_analysis: string | null
          batch_id: string
          confidence_score: number | null
          created_at: string
          degradation_rate: number | null
          id: string
          model_version: string | null
          optimal_sell_by: string | null
          predicted_shelf_life_days: number | null
          storage_recommendation: string | null
          updated_at: string
        }
        Insert: {
          ai_analysis?: string | null
          batch_id: string
          confidence_score?: number | null
          created_at?: string
          degradation_rate?: number | null
          id?: string
          model_version?: string | null
          optimal_sell_by?: string | null
          predicted_shelf_life_days?: number | null
          storage_recommendation?: string | null
          updated_at?: string
        }
        Update: {
          ai_analysis?: string | null
          batch_id?: string
          confidence_score?: number | null
          created_at?: string
          degradation_rate?: number | null
          id?: string
          model_version?: string | null
          optimal_sell_by?: string | null
          predicted_shelf_life_days?: number | null
          storage_recommendation?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quality_predictions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
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
      real_estate_listings: {
        Row: {
          contact_whatsapp: string | null
          country: string
          created_at: string | null
          daily_customers: number | null
          description: string | null
          equipment_list: string[] | null
          established_year: number | null
          features: string[] | null
          highlights: string | null
          id: string
          images: string[] | null
          lease_details: string | null
          license_status: string | null
          monthly_expenses: number | null
          monthly_revenue: number | null
          price_eur: number | null
          price_thb: number | null
          rai: number | null
          region: string
          shinrai_score: number | null
          sqm: number | null
          status: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_whatsapp?: string | null
          country?: string
          created_at?: string | null
          daily_customers?: number | null
          description?: string | null
          equipment_list?: string[] | null
          established_year?: number | null
          features?: string[] | null
          highlights?: string | null
          id?: string
          images?: string[] | null
          lease_details?: string | null
          license_status?: string | null
          monthly_expenses?: number | null
          monthly_revenue?: number | null
          price_eur?: number | null
          price_thb?: number | null
          rai?: number | null
          region: string
          shinrai_score?: number | null
          sqm?: number | null
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_whatsapp?: string | null
          country?: string
          created_at?: string | null
          daily_customers?: number | null
          description?: string | null
          equipment_list?: string[] | null
          established_year?: number | null
          features?: string[] | null
          highlights?: string | null
          id?: string
          images?: string[] | null
          lease_details?: string | null
          license_status?: string | null
          monthly_expenses?: number | null
          monthly_revenue?: number | null
          price_eur?: number | null
          price_thb?: number | null
          rai?: number | null
          region?: string
          shinrai_score?: number | null
          sqm?: number | null
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recall_actions: {
        Row: {
          action_type: string
          data: Json | null
          description: string | null
          id: string
          performed_at: string | null
          performed_by: string | null
          recall_id: string | null
        }
        Insert: {
          action_type: string
          data?: Json | null
          description?: string | null
          id?: string
          performed_at?: string | null
          performed_by?: string | null
          recall_id?: string | null
        }
        Update: {
          action_type?: string
          data?: Json | null
          description?: string | null
          id?: string
          performed_at?: string | null
          performed_by?: string | null
          recall_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recall_actions_recall_id_fkey"
            columns: ["recall_id"]
            isOneToOne: false
            referencedRelation: "batch_recalls"
            referencedColumns: ["id"]
          },
        ]
      }
      recall_affected_batches: {
        Row: {
          batch_id: string | null
          batch_number: string | null
          batch_quarantined_at: string | null
          batch_returned_at: string | null
          created_at: string | null
          current_status: string | null
          discovery_method: string | null
          id: string
          importer_email: string | null
          importer_name: string | null
          importer_notified_at: string | null
          notes: string | null
          recall_id: string | null
        }
        Insert: {
          batch_id?: string | null
          batch_number?: string | null
          batch_quarantined_at?: string | null
          batch_returned_at?: string | null
          created_at?: string | null
          current_status?: string | null
          discovery_method?: string | null
          id?: string
          importer_email?: string | null
          importer_name?: string | null
          importer_notified_at?: string | null
          notes?: string | null
          recall_id?: string | null
        }
        Update: {
          batch_id?: string | null
          batch_number?: string | null
          batch_quarantined_at?: string | null
          batch_returned_at?: string | null
          created_at?: string | null
          current_status?: string | null
          discovery_method?: string | null
          id?: string
          importer_email?: string | null
          importer_name?: string | null
          importer_notified_at?: string | null
          notes?: string | null
          recall_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recall_affected_batches_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recall_affected_batches_recall_id_fkey"
            columns: ["recall_id"]
            isOneToOne: false
            referencedRelation: "batch_recalls"
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
      recall_events: {
        Row: {
          affected_countries: string[] | null
          affected_quantity_kg: number | null
          authority_name: string | null
          authority_notified_at: string | null
          authority_reference: string | null
          batch_numbers: string[] | null
          capa_id: string | null
          closed_at: string | null
          closed_by: string | null
          complaint_id: string | null
          created_at: string
          customer_notification_date: string | null
          description: string | null
          distribution_level: string | null
          effectiveness_check_date: string | null
          effectiveness_result: string | null
          facility_id: string | null
          id: string
          initiated_at: string | null
          initiated_by: string
          integrity_hash: string | null
          is_mock: boolean | null
          lessons_learned: string | null
          metadata: Json | null
          product_name: string
          public_notification: boolean | null
          public_notification_date: string | null
          reason: string
          recall_class: Database["public"]["Enums"]["recall_class"]
          recall_number: string
          retrieval_rate_percent: number | null
          root_cause: string | null
          status: Database["public"]["Enums"]["recall_status"]
          title: string
          updated_at: string
        }
        Insert: {
          affected_countries?: string[] | null
          affected_quantity_kg?: number | null
          authority_name?: string | null
          authority_notified_at?: string | null
          authority_reference?: string | null
          batch_numbers?: string[] | null
          capa_id?: string | null
          closed_at?: string | null
          closed_by?: string | null
          complaint_id?: string | null
          created_at?: string
          customer_notification_date?: string | null
          description?: string | null
          distribution_level?: string | null
          effectiveness_check_date?: string | null
          effectiveness_result?: string | null
          facility_id?: string | null
          id?: string
          initiated_at?: string | null
          initiated_by: string
          integrity_hash?: string | null
          is_mock?: boolean | null
          lessons_learned?: string | null
          metadata?: Json | null
          product_name: string
          public_notification?: boolean | null
          public_notification_date?: string | null
          reason?: string
          recall_class?: Database["public"]["Enums"]["recall_class"]
          recall_number: string
          retrieval_rate_percent?: number | null
          root_cause?: string | null
          status?: Database["public"]["Enums"]["recall_status"]
          title: string
          updated_at?: string
        }
        Update: {
          affected_countries?: string[] | null
          affected_quantity_kg?: number | null
          authority_name?: string | null
          authority_notified_at?: string | null
          authority_reference?: string | null
          batch_numbers?: string[] | null
          capa_id?: string | null
          closed_at?: string | null
          closed_by?: string | null
          complaint_id?: string | null
          created_at?: string
          customer_notification_date?: string | null
          description?: string | null
          distribution_level?: string | null
          effectiveness_check_date?: string | null
          effectiveness_result?: string | null
          facility_id?: string | null
          id?: string
          initiated_at?: string | null
          initiated_by?: string
          integrity_hash?: string | null
          is_mock?: boolean | null
          lessons_learned?: string | null
          metadata?: Json | null
          product_name?: string
          public_notification?: boolean | null
          public_notification_date?: string | null
          reason?: string
          recall_class?: Database["public"]["Enums"]["recall_class"]
          recall_number?: string
          retrieval_rate_percent?: number | null
          root_cause?: string | null
          status?: Database["public"]["Enums"]["recall_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recall_events_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recall_events_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recall_events_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      recalls: {
        Row: {
          affected_batch_ids: string[] | null
          affected_quantity_kg: number | null
          batch_id: string | null
          capa_id: string | null
          completed_at: string | null
          completed_by: string | null
          corrective_actions: string | null
          created_at: string
          description: string | null
          distribution_details: string | null
          escalated_at: string | null
          escalated_by: string | null
          escalation_level: number
          escalation_notes: string | null
          facility_id: string | null
          id: string
          initiated_by: string
          metadata: Json | null
          notification_sent_at: string | null
          reason: string
          recall_class: Database["public"]["Enums"]["recall_class"]
          recall_number: string
          regulatory_notified_at: string | null
          root_cause: string | null
          status: Database["public"]["Enums"]["recall_status"]
          title: string
          updated_at: string
        }
        Insert: {
          affected_batch_ids?: string[] | null
          affected_quantity_kg?: number | null
          batch_id?: string | null
          capa_id?: string | null
          completed_at?: string | null
          completed_by?: string | null
          corrective_actions?: string | null
          created_at?: string
          description?: string | null
          distribution_details?: string | null
          escalated_at?: string | null
          escalated_by?: string | null
          escalation_level?: number
          escalation_notes?: string | null
          facility_id?: string | null
          id?: string
          initiated_by: string
          metadata?: Json | null
          notification_sent_at?: string | null
          reason: string
          recall_class?: Database["public"]["Enums"]["recall_class"]
          recall_number: string
          regulatory_notified_at?: string | null
          root_cause?: string | null
          status?: Database["public"]["Enums"]["recall_status"]
          title: string
          updated_at?: string
        }
        Update: {
          affected_batch_ids?: string[] | null
          affected_quantity_kg?: number | null
          batch_id?: string | null
          capa_id?: string | null
          completed_at?: string | null
          completed_by?: string | null
          corrective_actions?: string | null
          created_at?: string
          description?: string | null
          distribution_details?: string | null
          escalated_at?: string | null
          escalated_by?: string | null
          escalation_level?: number
          escalation_notes?: string | null
          facility_id?: string | null
          id?: string
          initiated_by?: string
          metadata?: Json | null
          notification_sent_at?: string | null
          reason?: string
          recall_class?: Database["public"]["Enums"]["recall_class"]
          recall_number?: string
          regulatory_notified_at?: string | null
          root_cause?: string | null
          status?: Database["public"]["Enums"]["recall_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recalls_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recalls_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      receivables_financing: {
        Row: {
          advance_rate: number
          batch_id: string
          collateral_snapshot: Json
          created_at: string
          currency: string
          decision: string
          due_at: string | null
          expected_repayment_amount: number
          exporter_id: string
          finance_score: number
          financing_number: string
          funded_at: string | null
          id: string
          importer_id: string | null
          interest_rate_apr: number
          inventory_receipt_id: string | null
          invoice_id: string | null
          offer_expires_at: string
          offered_at: string
          platform_fee_amount: number
          platform_fee_rate: number
          principal_amount: number
          purchase_request_id: string | null
          receivable_value: number
          repaid_at: string | null
          risk_grade: string
          scoring_snapshot: Json
          status: string
          tenor_days: number
          terms: Json
          updated_at: string
        }
        Insert: {
          advance_rate: number
          batch_id: string
          collateral_snapshot?: Json
          created_at?: string
          currency?: string
          decision?: string
          due_at?: string | null
          expected_repayment_amount: number
          exporter_id: string
          finance_score: number
          financing_number: string
          funded_at?: string | null
          id?: string
          importer_id?: string | null
          interest_rate_apr?: number
          inventory_receipt_id?: string | null
          invoice_id?: string | null
          offer_expires_at?: string
          offered_at?: string
          platform_fee_amount?: number
          platform_fee_rate?: number
          principal_amount: number
          purchase_request_id?: string | null
          receivable_value: number
          repaid_at?: string | null
          risk_grade: string
          scoring_snapshot?: Json
          status?: string
          tenor_days?: number
          terms?: Json
          updated_at?: string
        }
        Update: {
          advance_rate?: number
          batch_id?: string
          collateral_snapshot?: Json
          created_at?: string
          currency?: string
          decision?: string
          due_at?: string | null
          expected_repayment_amount?: number
          exporter_id?: string
          finance_score?: number
          financing_number?: string
          funded_at?: string | null
          id?: string
          importer_id?: string | null
          interest_rate_apr?: number
          inventory_receipt_id?: string | null
          invoice_id?: string | null
          offer_expires_at?: string
          offered_at?: string
          platform_fee_amount?: number
          platform_fee_rate?: number
          principal_amount?: number
          purchase_request_id?: string | null
          receivable_value?: number
          repaid_at?: string | null
          risk_grade?: string
          scoring_snapshot?: Json
          status?: string
          tenor_days?: number
          terms?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "receivables_financing_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_financing_inventory_receipt_id_fkey"
            columns: ["inventory_receipt_id"]
            isOneToOne: false
            referencedRelation: "inventory_receipts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_financing_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_financing_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_acknowledgments: {
        Row: {
          acknowledged_at: string
          id: string
          update_id: string
          user_id: string
        }
        Insert: {
          acknowledged_at?: string
          id?: string
          update_id: string
          user_id: string
        }
        Update: {
          acknowledged_at?: string
          id?: string
          update_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regulatory_acknowledgments_update_id_fkey"
            columns: ["update_id"]
            isOneToOne: false
            referencedRelation: "regulatory_updates"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_authorities: {
        Row: {
          active: boolean | null
          annual_quota_system: boolean | null
          api_base_url: string | null
          api_documentation_url: string | null
          api_type: string | null
          authority_name: string
          authority_type: string
          cannabis_legal_status: string | null
          country_code: string
          country_name: string
          export_allowed: boolean | null
          id: string
          import_allowed: boolean | null
          last_updated: string | null
          max_thc_percent: number | null
          narcotics_schedule: string | null
          notes: string | null
          requires_api_key: boolean | null
          requires_certificate: boolean | null
          requires_coa_per_batch: boolean | null
          requires_export_permit: boolean | null
          requires_gacp_certificate: boolean | null
          requires_gmp_certificate: boolean | null
          requires_import_permit: boolean | null
          requires_irradiation_certificate: boolean | null
          requires_stability_data: boolean | null
          retention_years: number | null
          specific_requirements: Json | null
          website_url: string | null
        }
        Insert: {
          active?: boolean | null
          annual_quota_system?: boolean | null
          api_base_url?: string | null
          api_documentation_url?: string | null
          api_type?: string | null
          authority_name: string
          authority_type: string
          cannabis_legal_status?: string | null
          country_code: string
          country_name: string
          export_allowed?: boolean | null
          id?: string
          import_allowed?: boolean | null
          last_updated?: string | null
          max_thc_percent?: number | null
          narcotics_schedule?: string | null
          notes?: string | null
          requires_api_key?: boolean | null
          requires_certificate?: boolean | null
          requires_coa_per_batch?: boolean | null
          requires_export_permit?: boolean | null
          requires_gacp_certificate?: boolean | null
          requires_gmp_certificate?: boolean | null
          requires_import_permit?: boolean | null
          requires_irradiation_certificate?: boolean | null
          requires_stability_data?: boolean | null
          retention_years?: number | null
          specific_requirements?: Json | null
          website_url?: string | null
        }
        Update: {
          active?: boolean | null
          annual_quota_system?: boolean | null
          api_base_url?: string | null
          api_documentation_url?: string | null
          api_type?: string | null
          authority_name?: string
          authority_type?: string
          cannabis_legal_status?: string | null
          country_code?: string
          country_name?: string
          export_allowed?: boolean | null
          id?: string
          import_allowed?: boolean | null
          last_updated?: string | null
          max_thc_percent?: number | null
          narcotics_schedule?: string | null
          notes?: string | null
          requires_api_key?: boolean | null
          requires_certificate?: boolean | null
          requires_coa_per_batch?: boolean | null
          requires_export_permit?: boolean | null
          requires_gacp_certificate?: boolean | null
          requires_gmp_certificate?: boolean | null
          requires_import_permit?: boolean | null
          requires_irradiation_certificate?: boolean | null
          requires_stability_data?: boolean | null
          retention_years?: number | null
          specific_requirements?: Json | null
          website_url?: string | null
        }
        Relationships: []
      }
      regulatory_report_templates: {
        Row: {
          authority: string
          created_at: string
          description: string | null
          frequency: string | null
          id: string
          is_active: boolean
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          legal_basis: string | null
          report_type: string
          template_fields: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          authority: string
          created_at?: string
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          legal_basis?: string | null
          report_type: string
          template_fields?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          authority?: string
          created_at?: string
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"]
          legal_basis?: string | null
          report_type?: string
          template_fields?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      regulatory_requirements: {
        Row: {
          applies_to: string[] | null
          authority: string
          category: string
          created_at: string
          description: string | null
          effective_from: string | null
          id: string
          is_mandatory: boolean
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          sort_order: number
          standard_code: string | null
          standard_name: string
          updated_at: string
          url: string | null
        }
        Insert: {
          applies_to?: string[] | null
          authority: string
          category?: string
          created_at?: string
          description?: string | null
          effective_from?: string | null
          id?: string
          is_mandatory?: boolean
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          sort_order?: number
          standard_code?: string | null
          standard_name: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          applies_to?: string[] | null
          authority?: string
          category?: string
          created_at?: string
          description?: string | null
          effective_from?: string | null
          id?: string
          is_mandatory?: boolean
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"]
          sort_order?: number
          standard_code?: string | null
          standard_name?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      regulatory_submissions: {
        Row: {
          authority_id: string | null
          batch_id: string | null
          created_at: string | null
          documents: string[] | null
          expires_at: string | null
          id: string
          notes: string | null
          org_id: string | null
          owner_user_id: string | null
          payload: Json | null
          reference_number: string | null
          response_at: string | null
          response_payload: Json | null
          shipment_id: string | null
          status: string | null
          submission_type: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string | null
        }
        Insert: {
          authority_id?: string | null
          batch_id?: string | null
          created_at?: string | null
          documents?: string[] | null
          expires_at?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          payload?: Json | null
          reference_number?: string | null
          response_at?: string | null
          response_payload?: Json | null
          shipment_id?: string | null
          status?: string | null
          submission_type: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string | null
        }
        Update: {
          authority_id?: string | null
          batch_id?: string | null
          created_at?: string | null
          documents?: string[] | null
          expires_at?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          owner_user_id?: string | null
          payload?: Json | null
          reference_number?: string | null
          response_at?: string | null
          response_payload?: Json | null
          shipment_id?: string | null
          status?: string | null
          submission_type?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regulatory_submissions_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "regulatory_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regulatory_submissions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regulatory_submissions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regulatory_submissions_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_updates: {
        Row: {
          affected_areas: string[]
          affected_sop_ids: string[]
          ai_generated: boolean | null
          analyzed_at: string
          analyzed_by: string
          category: string
          change_type: string | null
          changed_by: string | null
          country_code: string | null
          country_name: string | null
          created_at: string
          created_by: string | null
          description: string | null
          dismissed_at: string | null
          dismissed_by: string | null
          effective_date: string | null
          id: string
          new_value: string | null
          old_value: string | null
          published_at: string
          recommended_actions: string | null
          regulation_reference: string | null
          relevance_score: number
          reviewer_id: string | null
          severity: string | null
          source: string
          source_url: string | null
          status: string
          summary: string
          title: string
          updated_at: string
          verified: boolean | null
          verified_by: string | null
        }
        Insert: {
          affected_areas?: string[]
          affected_sop_ids?: string[]
          ai_generated?: boolean | null
          analyzed_at?: string
          analyzed_by?: string
          category?: string
          change_type?: string | null
          changed_by?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          dismissed_at?: string | null
          dismissed_by?: string | null
          effective_date?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          published_at?: string
          recommended_actions?: string | null
          regulation_reference?: string | null
          relevance_score?: number
          reviewer_id?: string | null
          severity?: string | null
          source: string
          source_url?: string | null
          status?: string
          summary: string
          title: string
          updated_at?: string
          verified?: boolean | null
          verified_by?: string | null
        }
        Update: {
          affected_areas?: string[]
          affected_sop_ids?: string[]
          ai_generated?: boolean | null
          analyzed_at?: string
          analyzed_by?: string
          category?: string
          change_type?: string | null
          changed_by?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          dismissed_at?: string | null
          dismissed_by?: string | null
          effective_date?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          published_at?: string
          recommended_actions?: string | null
          regulation_reference?: string | null
          relevance_score?: number
          reviewer_id?: string | null
          severity?: string | null
          source?: string
          source_url?: string | null
          status?: string
          summary?: string
          title?: string
          updated_at?: string
          verified?: boolean | null
          verified_by?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          audit_id: string | null
          content: string | null
          created_at: string
          created_by: string | null
          generated_by: string | null
          id: string
          title: string
          type: Database["public"]["Enums"]["report_type"]
        }
        Insert: {
          audit_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          generated_by?: string | null
          id?: string
          title: string
          type: Database["public"]["Enums"]["report_type"]
        }
        Update: {
          audit_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          generated_by?: string | null
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["report_type"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      rfid_reads: {
        Row: {
          antenna_port: number | null
          direction: string | null
          facility_id: string | null
          id: string
          read_at: string | null
          reader_id: string
          reader_location: string | null
          rssi: number | null
          tag_epc: string
        }
        Insert: {
          antenna_port?: number | null
          direction?: string | null
          facility_id?: string | null
          id?: string
          read_at?: string | null
          reader_id: string
          reader_location?: string | null
          rssi?: number | null
          tag_epc: string
        }
        Update: {
          antenna_port?: number | null
          direction?: string | null
          facility_id?: string | null
          id?: string
          read_at?: string | null
          reader_id?: string
          reader_location?: string | null
          rssi?: number | null
          tag_epc?: string
        }
        Relationships: []
      }
      rfid_tags: {
        Row: {
          batch_id: string | null
          encoded_at: string | null
          encoded_by: string | null
          epc: string
          id: string
          last_seen_at: string | null
          last_seen_location: string | null
          last_seen_reader: string | null
          packaging_unit_id: string | null
          shipment_id: string | null
          sscc: string | null
          status: string | null
          tag_type: string | null
        }
        Insert: {
          batch_id?: string | null
          encoded_at?: string | null
          encoded_by?: string | null
          epc: string
          id?: string
          last_seen_at?: string | null
          last_seen_location?: string | null
          last_seen_reader?: string | null
          packaging_unit_id?: string | null
          shipment_id?: string | null
          sscc?: string | null
          status?: string | null
          tag_type?: string | null
        }
        Update: {
          batch_id?: string | null
          encoded_at?: string | null
          encoded_by?: string | null
          epc?: string
          id?: string
          last_seen_at?: string | null
          last_seen_location?: string | null
          last_seen_reader?: string | null
          packaging_unit_id?: string | null
          shipment_id?: string | null
          sscc?: string | null
          status?: string | null
          tag_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rfid_tags_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfid_tags_packaging_unit_id_fkey"
            columns: ["packaging_unit_id"]
            isOneToOne: false
            referencedRelation: "packaging_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfid_tags_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      sap_export_log: {
        Row: {
          batch_id: string | null
          confirmed_at: string | null
          error_message: string | null
          export_type: string
          exported_at: string | null
          exported_by: string | null
          format: string | null
          id: string
          idoc_type: string | null
          integration_mode: string | null
          odata_entity: string | null
          payload: Json
          sap_document_number: string | null
          sap_document_type: string | null
          sap_system: string | null
          shipment_id: string | null
          status: string | null
        }
        Insert: {
          batch_id?: string | null
          confirmed_at?: string | null
          error_message?: string | null
          export_type: string
          exported_at?: string | null
          exported_by?: string | null
          format?: string | null
          id?: string
          idoc_type?: string | null
          integration_mode?: string | null
          odata_entity?: string | null
          payload: Json
          sap_document_number?: string | null
          sap_document_type?: string | null
          sap_system?: string | null
          shipment_id?: string | null
          status?: string | null
        }
        Update: {
          batch_id?: string | null
          confirmed_at?: string | null
          error_message?: string | null
          export_type?: string
          exported_at?: string | null
          exported_by?: string | null
          format?: string | null
          id?: string
          idoc_type?: string | null
          integration_mode?: string | null
          odata_entity?: string | null
          payload?: Json
          sap_document_number?: string | null
          sap_document_type?: string | null
          sap_system?: string | null
          shipment_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sap_export_log_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sap_export_log_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      sap_field_mappings: {
        Row: {
          active: boolean | null
          id: string
          sap_entity: string
          sap_field: string
          sap_field_description: string | null
          sap_system: string
          source_entity: string
          source_field: string
          transformation: string | null
        }
        Insert: {
          active?: boolean | null
          id?: string
          sap_entity: string
          sap_field: string
          sap_field_description?: string | null
          sap_system?: string
          source_entity: string
          source_field: string
          transformation?: string | null
        }
        Update: {
          active?: boolean | null
          id?: string
          sap_entity?: string
          sap_field?: string
          sap_field_description?: string | null
          sap_system?: string
          source_entity?: string
          source_field?: string
          transformation?: string | null
        }
        Relationships: []
      }
      service_catalog: {
        Row: {
          active: boolean | null
          category: string
          channel: string
          code: string
          created_at: string | null
          currency: string | null
          description_en: string | null
          human_managed: boolean | null
          id: string
          name_de: string | null
          name_en: string
          name_th: string | null
          name_zh: string | null
          price_bundle: number | null
          price_standard: number | null
          price_thai_y1: number | null
          sort_order: number | null
          upgrade_from: string | null
        }
        Insert: {
          active?: boolean | null
          category: string
          channel: string
          code: string
          created_at?: string | null
          currency?: string | null
          description_en?: string | null
          human_managed?: boolean | null
          id?: string
          name_de?: string | null
          name_en: string
          name_th?: string | null
          name_zh?: string | null
          price_bundle?: number | null
          price_standard?: number | null
          price_thai_y1?: number | null
          sort_order?: number | null
          upgrade_from?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string
          channel?: string
          code?: string
          created_at?: string | null
          currency?: string | null
          description_en?: string | null
          human_managed?: boolean | null
          id?: string
          name_de?: string | null
          name_en?: string
          name_th?: string | null
          name_zh?: string | null
          price_bundle?: number | null
          price_standard?: number | null
          price_thai_y1?: number | null
          sort_order?: number | null
          upgrade_from?: string | null
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          batch_reference: string | null
          company_name: string
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string | null
          phone: string | null
          service_type: string
        }
        Insert: {
          batch_reference?: string | null
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
          service_type: string
        }
        Update: {
          batch_reference?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
          service_type?: string
        }
        Relationships: []
      }
      session_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "classroom_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          note_type: string
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          note_type?: string
          session_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          note_type?: string
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_notes_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "classroom_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          completed: boolean
          id: string
          joined_at: string
          session_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          id?: string
          joined_at?: string
          session_id: string
          user_id: string
        }
        Update: {
          completed?: boolean
          id?: string
          joined_at?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "classroom_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      shinrai_scores: {
        Row: {
          axes: Json | null
          created_at: string | null
          export_ready: boolean | null
          facility_id: string | null
          id: string
          priority_actions: string[] | null
          raw_response: Json | null
          summary: string | null
          trust_score: number
          user_id: string | null
        }
        Insert: {
          axes?: Json | null
          created_at?: string | null
          export_ready?: boolean | null
          facility_id?: string | null
          id?: string
          priority_actions?: string[] | null
          raw_response?: Json | null
          summary?: string | null
          trust_score?: number
          user_id?: string | null
        }
        Update: {
          axes?: Json | null
          created_at?: string | null
          export_ready?: boolean | null
          facility_id?: string | null
          id?: string
          priority_actions?: string[] | null
          raw_response?: Json | null
          summary?: string | null
          trust_score?: number
          user_id?: string | null
        }
        Relationships: []
      }
      shinrai_validations: {
        Row: {
          batch_id: string
          checks: Json
          created_at: string
          created_by: string | null
          destination_country: string
          export_clearance: boolean
          geo_accuracy_m: number | null
          geo_address: string | null
          geo_lat: number | null
          geo_lng: number | null
          geo_plus_code: string | null
          geo_timestamp_iso: string | null
          id: string
          missing_critical: Json
          missing_major: Json
          shinrai_certificate_id: string | null
          shinrai_score: number
          status: string
        }
        Insert: {
          batch_id: string
          checks?: Json
          created_at?: string
          created_by?: string | null
          destination_country: string
          export_clearance?: boolean
          geo_accuracy_m?: number | null
          geo_address?: string | null
          geo_lat?: number | null
          geo_lng?: number | null
          geo_plus_code?: string | null
          geo_timestamp_iso?: string | null
          id?: string
          missing_critical?: Json
          missing_major?: Json
          shinrai_certificate_id?: string | null
          shinrai_score: number
          status: string
        }
        Update: {
          batch_id?: string
          checks?: Json
          created_at?: string
          created_by?: string | null
          destination_country?: string
          export_clearance?: boolean
          geo_accuracy_m?: number | null
          geo_address?: string | null
          geo_lat?: number | null
          geo_lng?: number | null
          geo_plus_code?: string | null
          geo_timestamp_iso?: string | null
          id?: string
          missing_critical?: Json
          missing_major?: Json
          shinrai_certificate_id?: string | null
          shinrai_score?: number
          status?: string
        }
        Relationships: []
      }
      shipment_batches: {
        Row: {
          batch_id: string | null
          created_at: string | null
          id: string
          packaging_count: number | null
          packaging_unit: string | null
          position_in_shipment: number | null
          shipment_id: string | null
          sscc: string | null
          weight_kg: number | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          packaging_count?: number | null
          packaging_unit?: string | null
          position_in_shipment?: number | null
          shipment_id?: string | null
          sscc?: string | null
          weight_kg?: number | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          packaging_count?: number | null
          packaging_unit?: string | null
          position_in_shipment?: number | null
          shipment_id?: string | null
          sscc?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_batches_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_batches_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipment_positions: {
        Row: {
          accuracy_m: number | null
          altitude_m: number | null
          batch_id: string | null
          geofence_zone_id: string | null
          heading: number | null
          id: string
          is_border_crossing: boolean | null
          lat: number
          lng: number
          org_id: string | null
          owner_user_id: string | null
          recorded_at: string | null
          shipment_id: string | null
          source: string | null
          speed_kmh: number | null
        }
        Insert: {
          accuracy_m?: number | null
          altitude_m?: number | null
          batch_id?: string | null
          geofence_zone_id?: string | null
          heading?: number | null
          id?: string
          is_border_crossing?: boolean | null
          lat: number
          lng: number
          org_id?: string | null
          owner_user_id?: string | null
          recorded_at?: string | null
          shipment_id?: string | null
          source?: string | null
          speed_kmh?: number | null
        }
        Update: {
          accuracy_m?: number | null
          altitude_m?: number | null
          batch_id?: string | null
          geofence_zone_id?: string | null
          heading?: number | null
          id?: string
          is_border_crossing?: boolean | null
          lat?: number
          lng?: number
          org_id?: string | null
          owner_user_id?: string | null
          recorded_at?: string | null
          shipment_id?: string | null
          source?: string | null
          speed_kmh?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_positions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_positions_geofence_zone_id_fkey"
            columns: ["geofence_zone_id"]
            isOneToOne: false
            referencedRelation: "geofence_zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_positions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_positions_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          atlas_mrn: string | null
          atlas_status: string | null
          atlas_submitted_at: string | null
          batch_id: string | null
          carrier: string | null
          carrier_type: string | null
          created_at: string
          created_by: string
          customs_broker_email: string | null
          customs_broker_name: string | null
          customs_broker_webhook: string | null
          customs_cleared_destination_at: string | null
          customs_cleared_origin_at: string | null
          customs_declaration_number: string | null
          customs_status: string | null
          declared_value_eur: number | null
          delivered_at: string | null
          destination_address: string | null
          destination_city: string | null
          destination_country: string
          estimated_arrival: string | null
          estimated_delivery: string | null
          estimated_departure: string | null
          export_declaration_number: string | null
          exporter_id: string | null
          gdp_compliant: boolean
          gross_weight_kg: number | null
          hs_code: string | null
          ics2_entry_number: string | null
          id: string
          importer_id: string | null
          importer_notified_at: string | null
          incoterm: string | null
          integrity_hash: string | null
          net_weight_kg: number | null
          notes: string | null
          origin_address: string | null
          origin_country: string
          purchase_request_id: string | null
          shipment_number: string
          shipped_at: string | null
          status: Database["public"]["Enums"]["shipment_status"]
          temperature_log_url: string | null
          temperature_max: number | null
          temperature_min: number | null
          tracking_number: string | null
          trade_case_id: string | null
          updated_at: string
          webhook_last_event: string | null
          webhook_last_received_at: string | null
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          atlas_mrn?: string | null
          atlas_status?: string | null
          atlas_submitted_at?: string | null
          batch_id?: string | null
          carrier?: string | null
          carrier_type?: string | null
          created_at?: string
          created_by: string
          customs_broker_email?: string | null
          customs_broker_name?: string | null
          customs_broker_webhook?: string | null
          customs_cleared_destination_at?: string | null
          customs_cleared_origin_at?: string | null
          customs_declaration_number?: string | null
          customs_status?: string | null
          declared_value_eur?: number | null
          delivered_at?: string | null
          destination_address?: string | null
          destination_city?: string | null
          destination_country?: string
          estimated_arrival?: string | null
          estimated_delivery?: string | null
          estimated_departure?: string | null
          export_declaration_number?: string | null
          exporter_id?: string | null
          gdp_compliant?: boolean
          gross_weight_kg?: number | null
          hs_code?: string | null
          ics2_entry_number?: string | null
          id?: string
          importer_id?: string | null
          importer_notified_at?: string | null
          incoterm?: string | null
          integrity_hash?: string | null
          net_weight_kg?: number | null
          notes?: string | null
          origin_address?: string | null
          origin_country?: string
          purchase_request_id?: string | null
          shipment_number?: string
          shipped_at?: string | null
          status?: Database["public"]["Enums"]["shipment_status"]
          temperature_log_url?: string | null
          temperature_max?: number | null
          temperature_min?: number | null
          tracking_number?: string | null
          trade_case_id?: string | null
          updated_at?: string
          webhook_last_event?: string | null
          webhook_last_received_at?: string | null
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          atlas_mrn?: string | null
          atlas_status?: string | null
          atlas_submitted_at?: string | null
          batch_id?: string | null
          carrier?: string | null
          carrier_type?: string | null
          created_at?: string
          created_by?: string
          customs_broker_email?: string | null
          customs_broker_name?: string | null
          customs_broker_webhook?: string | null
          customs_cleared_destination_at?: string | null
          customs_cleared_origin_at?: string | null
          customs_declaration_number?: string | null
          customs_status?: string | null
          declared_value_eur?: number | null
          delivered_at?: string | null
          destination_address?: string | null
          destination_city?: string | null
          destination_country?: string
          estimated_arrival?: string | null
          estimated_delivery?: string | null
          estimated_departure?: string | null
          export_declaration_number?: string | null
          exporter_id?: string | null
          gdp_compliant?: boolean
          gross_weight_kg?: number | null
          hs_code?: string | null
          ics2_entry_number?: string | null
          id?: string
          importer_id?: string | null
          importer_notified_at?: string | null
          incoterm?: string | null
          integrity_hash?: string | null
          net_weight_kg?: number | null
          notes?: string | null
          origin_address?: string | null
          origin_country?: string
          purchase_request_id?: string | null
          shipment_number?: string
          shipped_at?: string | null
          status?: Database["public"]["Enums"]["shipment_status"]
          temperature_log_url?: string | null
          temperature_max?: number | null
          temperature_min?: number | null
          tracking_number?: string | null
          trade_case_id?: string | null
          updated_at?: string
          webhook_last_event?: string | null
          webhook_last_received_at?: string | null
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
      skill_installs: {
        Row: {
          device_id: string
          installed_at: string | null
          skill_id: string
        }
        Insert: {
          device_id: string
          installed_at?: string | null
          skill_id: string
        }
        Update: {
          device_id?: string
          installed_at?: string | null
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_installs_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "infinity_profiles"
            referencedColumns: ["device_id"]
          },
          {
            foreignKeyName: "skill_installs_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_registry: {
        Row: {
          author_email: string | null
          author_name: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          installs: number | null
          manifest: Json | null
          name: string
          permissions: string[] | null
          price_eur: number | null
          published: boolean | null
          rating: number | null
          tags: string[] | null
          version: string
        }
        Insert: {
          author_email?: string | null
          author_name?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          installs?: number | null
          manifest?: Json | null
          name: string
          permissions?: string[] | null
          price_eur?: number | null
          published?: boolean | null
          rating?: number | null
          tags?: string[] | null
          version: string
        }
        Update: {
          author_email?: string | null
          author_name?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          installs?: number | null
          manifest?: Json | null
          name?: string
          permissions?: string[] | null
          price_eur?: number | null
          published?: boolean | null
          rating?: number | null
          tags?: string[] | null
          version?: string
        }
        Relationships: []
      }
      smart_contract_matches: {
        Row: {
          batch_id: string
          compliance_snapshot: Json
          created_at: string
          exporter_id: string
          id: string
          importer_id: string
          match_score: number
          matched_criteria: Json
          status: string
          trading_rule_id: string
          updated_at: string
        }
        Insert: {
          batch_id: string
          compliance_snapshot?: Json
          created_at?: string
          exporter_id: string
          id?: string
          importer_id: string
          match_score?: number
          matched_criteria?: Json
          status?: string
          trading_rule_id: string
          updated_at?: string
        }
        Update: {
          batch_id?: string
          compliance_snapshot?: Json
          created_at?: string
          exporter_id?: string
          id?: string
          importer_id?: string
          match_score?: number
          matched_criteria?: Json
          status?: string
          trading_rule_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "smart_contract_matches_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smart_contract_matches_trading_rule_id_fkey"
            columns: ["trading_rule_id"]
            isOneToOne: false
            referencedRelation: "trading_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      sop_acknowledgements: {
        Row: {
          acknowledged_at: string | null
          id: string
          ip_address: string | null
          sop_id: string | null
          user_id: string | null
          version_acknowledged: string
        }
        Insert: {
          acknowledged_at?: string | null
          id?: string
          ip_address?: string | null
          sop_id?: string | null
          user_id?: string | null
          version_acknowledged: string
        }
        Update: {
          acknowledged_at?: string | null
          id?: string
          ip_address?: string | null
          sop_id?: string | null
          user_id?: string | null
          version_acknowledged?: string
        }
        Relationships: [
          {
            foreignKeyName: "sop_acknowledgements_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      sop_approvals: {
        Row: {
          approval_level: number
          approver_id: string
          comment: string | null
          created_at: string
          decided_at: string | null
          decision: Database["public"]["Enums"]["approval_decision"]
          id: string
          signature_hash: string | null
          version_id: string
        }
        Insert: {
          approval_level?: number
          approver_id: string
          comment?: string | null
          created_at?: string
          decided_at?: string | null
          decision?: Database["public"]["Enums"]["approval_decision"]
          id?: string
          signature_hash?: string | null
          version_id: string
        }
        Update: {
          approval_level?: number
          approver_id?: string
          comment?: string | null
          created_at?: string
          decided_at?: string | null
          decision?: Database["public"]["Enums"]["approval_decision"]
          id?: string
          signature_hash?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sop_approvals_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "sop_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      sop_review_cycles: {
        Row: {
          completed_at: string | null
          created_at: string
          due_at: string
          id: string
          notes: string | null
          outcome: string | null
          reviewer_id: string | null
          sop_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          due_at: string
          id?: string
          notes?: string | null
          outcome?: string | null
          reviewer_id?: string | null
          sop_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          due_at?: string
          id?: string
          notes?: string | null
          outcome?: string | null
          reviewer_id?: string | null
          sop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sop_review_cycles_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      sop_sections: {
        Row: {
          content: string
          created_at: string
          id: string
          section_type: string
          sort_order: number
          title: string
          updated_at: string
          version_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          section_type?: string
          sort_order?: number
          title: string
          updated_at?: string
          version_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          section_type?: string
          sort_order?: number
          title?: string
          updated_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sop_sections_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "sop_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      sop_versions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          change_reason: string | null
          change_summary: string | null
          content: string | null
          created_at: string
          created_by: string
          effective_from: string | null
          effective_until: string | null
          id: string
          integrity_hash: string | null
          sop_id: string
          status: Database["public"]["Enums"]["sop_status"]
          updated_at: string
          version_major: number
          version_minor: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          change_reason?: string | null
          change_summary?: string | null
          content?: string | null
          created_at?: string
          created_by: string
          effective_from?: string | null
          effective_until?: string | null
          id?: string
          integrity_hash?: string | null
          sop_id: string
          status?: Database["public"]["Enums"]["sop_status"]
          updated_at?: string
          version_major?: number
          version_minor?: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          change_reason?: string | null
          change_summary?: string | null
          content?: string | null
          created_at?: string
          created_by?: string
          effective_from?: string | null
          effective_until?: string | null
          id?: string
          integrity_hash?: string | null
          sop_id?: string
          status?: Database["public"]["Enums"]["sop_status"]
          updated_at?: string
          version_major?: number
          version_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "sop_versions_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      sops: {
        Row: {
          applicable_roles: string[] | null
          approved_at: string | null
          approved_by: string | null
          author_id: string | null
          category: string
          change_summary: string | null
          content: string | null
          created_at: string
          department: string | null
          effective_date: string | null
          facility_id: string | null
          file_url: string | null
          id: string
          is_archived: boolean
          next_review_at: string | null
          owner_id: string
          review_date: string | null
          review_interval_days: number
          risk_level: Database["public"]["Enums"]["sop_risk_level"]
          sop_number: string
          supersedes_id: string | null
          tags: string[] | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          applicable_roles?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          author_id?: string | null
          category?: string
          change_summary?: string | null
          content?: string | null
          created_at?: string
          department?: string | null
          effective_date?: string | null
          facility_id?: string | null
          file_url?: string | null
          id?: string
          is_archived?: boolean
          next_review_at?: string | null
          owner_id: string
          review_date?: string | null
          review_interval_days?: number
          risk_level?: Database["public"]["Enums"]["sop_risk_level"]
          sop_number: string
          supersedes_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          applicable_roles?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          author_id?: string | null
          category?: string
          change_summary?: string | null
          content?: string | null
          created_at?: string
          department?: string | null
          effective_date?: string | null
          facility_id?: string | null
          file_url?: string | null
          id?: string
          is_archived?: boolean
          next_review_at?: string | null
          owner_id?: string
          review_date?: string | null
          review_interval_days?: number
          risk_level?: Database["public"]["Enums"]["sop_risk_level"]
          sop_number?: string
          supersedes_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "sops_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sops_supersedes_id_fkey"
            columns: ["supersedes_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      stability_results: {
        Row: {
          created_at: string
          id: string
          is_within_spec: boolean | null
          metadata: Json | null
          notes: string | null
          parameter: string
          result_unit: string | null
          result_value: number | null
          specification_max: number | null
          specification_min: number | null
          status: Database["public"]["Enums"]["stability_result_status"]
          study_id: string
          test_date: string
          tested_by: string | null
          tested_by_name: string | null
          time_point_months: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_within_spec?: boolean | null
          metadata?: Json | null
          notes?: string | null
          parameter: string
          result_unit?: string | null
          result_value?: number | null
          specification_max?: number | null
          specification_min?: number | null
          status?: Database["public"]["Enums"]["stability_result_status"]
          study_id: string
          test_date?: string
          tested_by?: string | null
          tested_by_name?: string | null
          time_point_months: number
        }
        Update: {
          created_at?: string
          id?: string
          is_within_spec?: boolean | null
          metadata?: Json | null
          notes?: string | null
          parameter?: string
          result_unit?: string | null
          result_value?: number | null
          specification_max?: number | null
          specification_min?: number | null
          status?: Database["public"]["Enums"]["stability_result_status"]
          study_id?: string
          test_date?: string
          tested_by?: string | null
          tested_by_name?: string | null
          time_point_months?: number
        }
        Relationships: [
          {
            foreignKeyName: "stability_results_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "stability_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      stability_studies: {
        Row: {
          acceptance_criteria: Json | null
          batch_id: string | null
          created_at: string
          description: string | null
          end_date: string | null
          facility_id: string | null
          id: string
          metadata: Json | null
          owner_id: string
          parameters_tested: string[] | null
          product_name: string
          protocol: Database["public"]["Enums"]["stability_protocol"]
          start_date: string
          status: string
          storage_conditions: string | null
          study_number: string
          test_intervals_months: number[] | null
          title: string
          updated_at: string
        }
        Insert: {
          acceptance_criteria?: Json | null
          batch_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          facility_id?: string | null
          id?: string
          metadata?: Json | null
          owner_id: string
          parameters_tested?: string[] | null
          product_name: string
          protocol?: Database["public"]["Enums"]["stability_protocol"]
          start_date?: string
          status?: string
          storage_conditions?: string | null
          study_number: string
          test_intervals_months?: number[] | null
          title: string
          updated_at?: string
        }
        Update: {
          acceptance_criteria?: Json | null
          batch_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          facility_id?: string | null
          id?: string
          metadata?: Json | null
          owner_id?: string
          parameters_tested?: string[] | null
          product_name?: string
          protocol?: Database["public"]["Enums"]["stability_protocol"]
          start_date?: string
          status?: string
          storage_conditions?: string | null
          study_number?: string
          test_intervals_months?: number[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stability_studies_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stability_studies_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_profiles: {
        Row: {
          created_at: string | null
          department: string | null
          employee_id: string | null
          facility_id: string | null
          full_name: string
          gacp_trained: boolean | null
          gmp_trained: boolean | null
          hygiene_certified: boolean | null
          id: string
          role: string | null
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          facility_id?: string | null
          full_name: string
          gacp_trained?: boolean | null
          gmp_trained?: boolean | null
          hygiene_certified?: boolean | null
          id?: string
          role?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          facility_id?: string | null
          full_name?: string
          gacp_trained?: boolean | null
          gmp_trained?: boolean | null
          hygiene_certified?: boolean | null
          id?: string
          role?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_profiles_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
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
      subscription_usage: {
        Row: {
          batch_listings_used: number
          certified_listings_used: number
          created_at: string
          id: string
          pay_per_use_purchases: Json
          quarter_start: string
          updated_at: string
          user_id: string
        }
        Insert: {
          batch_listings_used?: number
          certified_listings_used?: number
          created_at?: string
          id?: string
          pay_per_use_purchases?: Json
          quarter_start: string
          updated_at?: string
          user_id: string
        }
        Update: {
          batch_listings_used?: number
          certified_listings_used?: number
          created_at?: string
          id?: string
          pay_per_use_purchases?: Json
          quarter_start?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      supplier_audits: {
        Row: {
          audit_date: string
          audit_type: string
          auditor_id: string | null
          certificate_url: string | null
          communication_score: number | null
          conditions: string | null
          created_at: string
          delivery_score: number | null
          documentation_score: number | null
          facility_id: string | null
          findings: string | null
          gmp_compliance_score: number | null
          id: string
          metadata: Json | null
          next_audit_due: string | null
          overall_score: number | null
          quality_score: number | null
          recommendations: string | null
          result: Database["public"]["Enums"]["supplier_audit_result"]
          supplier_id: string
          updated_at: string
        }
        Insert: {
          audit_date?: string
          audit_type?: string
          auditor_id?: string | null
          certificate_url?: string | null
          communication_score?: number | null
          conditions?: string | null
          created_at?: string
          delivery_score?: number | null
          documentation_score?: number | null
          facility_id?: string | null
          findings?: string | null
          gmp_compliance_score?: number | null
          id?: string
          metadata?: Json | null
          next_audit_due?: string | null
          overall_score?: number | null
          quality_score?: number | null
          recommendations?: string | null
          result?: Database["public"]["Enums"]["supplier_audit_result"]
          supplier_id: string
          updated_at?: string
        }
        Update: {
          audit_date?: string
          audit_type?: string
          auditor_id?: string | null
          certificate_url?: string | null
          communication_score?: number | null
          conditions?: string | null
          created_at?: string
          delivery_score?: number | null
          documentation_score?: number | null
          facility_id?: string | null
          findings?: string | null
          gmp_compliance_score?: number | null
          id?: string
          metadata?: Json | null
          next_audit_due?: string | null
          overall_score?: number | null
          quality_score?: number | null
          recommendations?: string | null
          result?: Database["public"]["Enums"]["supplier_audit_result"]
          supplier_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_audits_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          approved_at: string | null
          approved_by: string | null
          category: string
          certification: string | null
          city: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          created_by: string | null
          delivery_score: number | null
          documentation_score: number | null
          facility_id: string | null
          gmp_certificate_expiry: string | null
          gmp_certificate_url: string | null
          gmp_score: number | null
          id: string
          iso_certified: boolean | null
          last_audit_id: string | null
          license_number: string | null
          name: string
          next_review_date: string | null
          notes: string | null
          overall_score: number | null
          qualification_date: string | null
          quality_score: number | null
          rejection_reason: string | null
          review_interval_days: number
          status: string
          supplier_number: string
          supplier_type: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          certification?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          delivery_score?: number | null
          documentation_score?: number | null
          facility_id?: string | null
          gmp_certificate_expiry?: string | null
          gmp_certificate_url?: string | null
          gmp_score?: number | null
          id?: string
          iso_certified?: boolean | null
          last_audit_id?: string | null
          license_number?: string | null
          name: string
          next_review_date?: string | null
          notes?: string | null
          overall_score?: number | null
          qualification_date?: string | null
          quality_score?: number | null
          rejection_reason?: string | null
          review_interval_days?: number
          status?: string
          supplier_number: string
          supplier_type?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          certification?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          delivery_score?: number | null
          documentation_score?: number | null
          facility_id?: string | null
          gmp_certificate_expiry?: string | null
          gmp_certificate_url?: string | null
          gmp_score?: number | null
          id?: string
          iso_certified?: boolean | null
          last_audit_id?: string | null
          license_number?: string | null
          name?: string
          next_review_date?: string | null
          notes?: string | null
          overall_score?: number | null
          qualification_date?: string | null
          quality_score?: number | null
          rejection_reason?: string | null
          review_interval_days?: number
          status?: string
          supplier_number?: string
          supplier_type?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suppliers_last_audit_id_fkey"
            columns: ["last_audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      supply_chain_events: {
        Row: {
          actor_id: string | null
          actor_type: string | null
          batch_id: string | null
          blockchain_tx_hash: string | null
          chain_sequence: number | null
          created_at: string | null
          data: Json | null
          description: string | null
          epcis_event: Json | null
          event_hash: string | null
          event_type: string
          id: string
          integrity_token: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          platform: string | null
          prev_event_hash: string | null
          rfc3161_timestamp: string | null
          rfc3161_timestamp_at: string | null
          shinrai_score_at_event: number | null
          signed_by: string | null
          title: string
        }
        Insert: {
          actor_id?: string | null
          actor_type?: string | null
          batch_id?: string | null
          blockchain_tx_hash?: string | null
          chain_sequence?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          epcis_event?: Json | null
          event_hash?: string | null
          event_type: string
          id?: string
          integrity_token?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          platform?: string | null
          prev_event_hash?: string | null
          rfc3161_timestamp?: string | null
          rfc3161_timestamp_at?: string | null
          shinrai_score_at_event?: number | null
          signed_by?: string | null
          title: string
        }
        Update: {
          actor_id?: string | null
          actor_type?: string | null
          batch_id?: string | null
          blockchain_tx_hash?: string | null
          chain_sequence?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          epcis_event?: Json | null
          event_hash?: string | null
          event_type?: string
          id?: string
          integrity_token?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          platform?: string | null
          prev_event_hash?: string | null
          rfc3161_timestamp?: string | null
          rfc3161_timestamp_at?: string | null
          shinrai_score_at_event?: number | null
          signed_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_events_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      supply_chain_notifications: {
        Row: {
          batch_id: string | null
          created_at: string | null
          event_id: string | null
          id: string
          recipient_email: string
          recipient_role: string | null
          sent_at: string | null
          status: string | null
          subject: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          recipient_email: string
          recipient_role?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          recipient_email?: string
          recipient_role?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_notifications_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supply_chain_notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "supply_chain_events"
            referencedColumns: ["id"]
          },
        ]
      }
      system_audit_events: {
        Row: {
          actor_claims: Json | null
          actor_role: string | null
          actor_user_id: string | null
          application_name: string | null
          changed_fields: string[] | null
          client_addr: unknown
          created_at: string
          event_id: string
          id: string
          new_state: Json | null
          occurred_at: string
          old_state: Json | null
          operation: string
          record_id: string | null
          record_pk: Json
          relation_name: string | null
          schema_name: string
          statement_timestamp: string
          table_name: string
          transaction_id: number
        }
        Insert: {
          actor_claims?: Json | null
          actor_role?: string | null
          actor_user_id?: string | null
          application_name?: string | null
          changed_fields?: string[] | null
          client_addr?: unknown
          created_at?: string
          event_id?: string
          id?: string
          new_state?: Json | null
          occurred_at?: string
          old_state?: Json | null
          operation: string
          record_id?: string | null
          record_pk?: Json
          relation_name?: string | null
          schema_name: string
          statement_timestamp?: string
          table_name: string
          transaction_id?: number
        }
        Update: {
          actor_claims?: Json | null
          actor_role?: string | null
          actor_user_id?: string | null
          application_name?: string | null
          changed_fields?: string[] | null
          client_addr?: unknown
          created_at?: string
          event_id?: string
          id?: string
          new_state?: Json | null
          occurred_at?: string
          old_state?: Json | null
          operation?: string
          record_id?: string | null
          record_pk?: Json
          relation_name?: string | null
          schema_name?: string
          statement_timestamp?: string
          table_name?: string
          transaction_id?: number
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
      terms_acceptances: {
        Row: {
          accepted_at: string
          id: string
          ip_address: unknown
          metadata: Json | null
          signee_name: string | null
          term_type: string
          user_agent: string | null
          user_id: string
          version: string
        }
        Insert: {
          accepted_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          signee_name?: string | null
          term_type: string
          user_agent?: string | null
          user_id: string
          version?: string
        }
        Update: {
          accepted_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          signee_name?: string | null
          term_type?: string
          user_agent?: string | null
          user_id?: string
          version?: string
        }
        Relationships: []
      }
      test_attempts: {
        Row: {
          answers: Json
          id: string
          passed: boolean | null
          score: number | null
          started_at: string
          submitted_at: string | null
          test_id: string
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          answers?: Json
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          submitted_at?: string | null
          test_id: string
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          answers?: Json
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          submitted_at?: string | null
          test_id?: string
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "knowledge_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_approvals: {
        Row: {
          admin_notified: boolean
          approval_tier: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          custom_agreement_offered: boolean
          id: string
          purchase_request_id: string
          rejection_reason: string | null
          status: string
          trade_value: number
          updated_at: string
        }
        Insert: {
          admin_notified?: boolean
          approval_tier: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          custom_agreement_offered?: boolean
          id?: string
          purchase_request_id: string
          rejection_reason?: string | null
          status?: string
          trade_value?: number
          updated_at?: string
        }
        Update: {
          admin_notified?: boolean
          approval_tier?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          custom_agreement_offered?: boolean
          id?: string
          purchase_request_id?: string
          rejection_reason?: string | null
          status?: string
          trade_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trade_approvals_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: true
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_cases: {
        Row: {
          batch_id: string | null
          batch_number: string | null
          case_number: string
          compliance_route_key: Database["public"]["Enums"]["cw_route_key"] | null
          compliance_route_request_id: string | null
          completion_percentage: number
          created_at: string
          created_by: string
          customer_type: string | null
          destination_country: string
          estimated_quantity: number | null
          exporter_country: string
          exporter_name: string
          id: string
          import_type: string
          importer_country: string
          importer_id: string | null
          importer_name: string
          notes: string | null
          product: string | null
          product_type: string
          quantity: number | null
          route_snapshot: Json
          stakeholders: Json
          status: string
          strain: string | null
          unit: string
          updated_at: string
          workflow_milestones: Json
        }
        Insert: {
          batch_id?: string | null
          batch_number?: string | null
          case_number?: string
          compliance_route_key?: Database["public"]["Enums"]["cw_route_key"] | null
          compliance_route_request_id?: string | null
          completion_percentage?: number
          created_at?: string
          created_by: string
          customer_type?: string | null
          destination_country?: string
          estimated_quantity?: number | null
          exporter_country?: string
          exporter_name: string
          id?: string
          import_type?: string
          importer_country?: string
          importer_id?: string | null
          importer_name: string
          notes?: string | null
          product?: string | null
          product_type?: string
          quantity?: number | null
          route_snapshot?: Json
          stakeholders?: Json
          status?: string
          strain?: string | null
          unit?: string
          updated_at?: string
          workflow_milestones?: Json
        }
        Update: {
          batch_id?: string | null
          batch_number?: string | null
          case_number?: string
          compliance_route_key?: Database["public"]["Enums"]["cw_route_key"] | null
          compliance_route_request_id?: string | null
          completion_percentage?: number
          created_at?: string
          created_by?: string
          customer_type?: string | null
          destination_country?: string
          estimated_quantity?: number | null
          exporter_country?: string
          exporter_name?: string
          id?: string
          import_type?: string
          importer_country?: string
          importer_id?: string | null
          importer_name?: string
          notes?: string | null
          product?: string | null
          product_type?: string
          quantity?: number | null
          route_snapshot?: Json
          stakeholders?: Json
          status?: string
          strain?: string | null
          unit?: string
          updated_at?: string
          workflow_milestones?: Json
        }
        Relationships: [
          {
            foreignKeyName: "trade_cases_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trade_cases_compliance_route_key_fkey"
            columns: ["compliance_route_key"]
            isOneToOne: false
            referencedRelation: "cw_compliance_route_catalog"
            referencedColumns: ["route_key"]
          },
          {
            foreignKeyName: "trade_cases_compliance_route_request_id_fkey"
            columns: ["compliance_route_request_id"]
            isOneToOne: false
            referencedRelation: "cw_compliance_route_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_permits: {
        Row: {
          approved_quantity_kg: number | null
          conditions: string[] | null
          created_at: string | null
          destination_country: string | null
          documents: string[] | null
          holder_company: string
          holder_license_number: string | null
          id: string
          issuing_authority_id: string | null
          issuing_country: string
          linked_batch_ids: string[] | null
          org_id: string | null
          owner_user_id: string | null
          permit_number: string | null
          permit_type: string
          product_type: string | null
          remaining_quantity_kg: number | null
          status: string | null
          used_quantity_kg: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          approved_quantity_kg?: number | null
          conditions?: string[] | null
          created_at?: string | null
          destination_country?: string | null
          documents?: string[] | null
          holder_company: string
          holder_license_number?: string | null
          id?: string
          issuing_authority_id?: string | null
          issuing_country: string
          linked_batch_ids?: string[] | null
          org_id?: string | null
          owner_user_id?: string | null
          permit_number?: string | null
          permit_type: string
          product_type?: string | null
          remaining_quantity_kg?: number | null
          status?: string | null
          used_quantity_kg?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          approved_quantity_kg?: number | null
          conditions?: string[] | null
          created_at?: string | null
          destination_country?: string | null
          documents?: string[] | null
          holder_company?: string
          holder_license_number?: string | null
          id?: string
          issuing_authority_id?: string | null
          issuing_country?: string
          linked_batch_ids?: string[] | null
          org_id?: string | null
          owner_user_id?: string | null
          permit_number?: string | null
          permit_type?: string
          product_type?: string | null
          remaining_quantity_kg?: number | null
          status?: string | null
          used_quantity_kg?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trade_permits_issuing_authority_id_fkey"
            columns: ["issuing_authority_id"]
            isOneToOne: false
            referencedRelation: "regulatory_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trade_permits_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_rules: {
        Row: {
          active: boolean
          allowed_batch_statuses: Database["public"]["Enums"]["batch_status"][]
          categories: Database["public"]["Enums"]["batch_category"][] | null
          certifications:
            | Database["public"]["Enums"]["certification_type"][]
            | null
          created_at: string
          id: string
          importer_id: string
          max_price: number | null
          max_quantity: number | null
          metadata: Json
          min_quantity: number | null
          min_shinrai_score: number
          min_thc: number | null
          name: string
          origins: string[] | null
          required_shinrai_status: string
          target_markets: string[] | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          allowed_batch_statuses?: Database["public"]["Enums"]["batch_status"][]
          categories?: Database["public"]["Enums"]["batch_category"][] | null
          certifications?:
            | Database["public"]["Enums"]["certification_type"][]
            | null
          created_at?: string
          id?: string
          importer_id: string
          max_price?: number | null
          max_quantity?: number | null
          metadata?: Json
          min_quantity?: number | null
          min_shinrai_score?: number
          min_thc?: number | null
          name?: string
          origins?: string[] | null
          required_shinrai_status?: string
          target_markets?: string[] | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          allowed_batch_statuses?: Database["public"]["Enums"]["batch_status"][]
          categories?: Database["public"]["Enums"]["batch_category"][] | null
          certifications?:
            | Database["public"]["Enums"]["certification_type"][]
            | null
          created_at?: string
          id?: string
          importer_id?: string
          max_price?: number | null
          max_quantity?: number | null
          metadata?: Json
          min_quantity?: number | null
          min_shinrai_score?: number
          min_thc?: number | null
          name?: string
          origins?: string[] | null
          required_shinrai_status?: string
          target_markets?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      training_records: {
        Row: {
          assigned_at: string
          certificate_id: string | null
          certificate_url: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          evidence_url: string | null
          expires_at: string | null
          facility_id: string | null
          id: string
          notes: string | null
          passed: boolean | null
          requested_by: string | null
          requirement_id: string
          score: number | null
          sop_id: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["training_status"]
          title: string | null
          trainer: string | null
          trainer_id: string | null
          training_date: string | null
          training_title: string | null
          training_type: string | null
          updated_at: string
          user_id: string
          valid_until: string | null
        }
        Insert: {
          assigned_at?: string
          certificate_id?: string | null
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          evidence_url?: string | null
          expires_at?: string | null
          facility_id?: string | null
          id?: string
          notes?: string | null
          passed?: boolean | null
          requested_by?: string | null
          requirement_id: string
          score?: number | null
          sop_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          title?: string | null
          trainer?: string | null
          trainer_id?: string | null
          training_date?: string | null
          training_title?: string | null
          training_type?: string | null
          updated_at?: string
          user_id: string
          valid_until?: string | null
        }
        Update: {
          assigned_at?: string
          certificate_id?: string | null
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          evidence_url?: string | null
          expires_at?: string | null
          facility_id?: string | null
          id?: string
          notes?: string | null
          passed?: boolean | null
          requested_by?: string | null
          requirement_id?: string
          score?: number | null
          sop_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          title?: string | null
          trainer?: string | null
          trainer_id?: string | null
          training_date?: string | null
          training_title?: string | null
          training_type?: string | null
          updated_at?: string
          user_id?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_records_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_records_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_records_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "training_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_records_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      training_requirements: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          department: string | null
          description: string | null
          frequency_days: number
          id: string
          is_active: boolean
          is_mandatory: boolean
          sop_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          frequency_days?: number
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          sop_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          frequency_days?: number
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          sop_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_requirements_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
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
      validation_master_plans: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          description: string | null
          effective_from: string | null
          effective_until: string | null
          facility_id: string | null
          id: string
          integrity_hash: string | null
          metadata: Json | null
          next_review_at: string | null
          objectives: string | null
          responsible_id: string | null
          review_interval_days: number | null
          scope: string | null
          status: Database["public"]["Enums"]["vmp_status"]
          title: string
          updated_at: string
          version_major: number
          version_minor: number
          vmp_number: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          effective_from?: string | null
          effective_until?: string | null
          facility_id?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          next_review_at?: string | null
          objectives?: string | null
          responsible_id?: string | null
          review_interval_days?: number | null
          scope?: string | null
          status?: Database["public"]["Enums"]["vmp_status"]
          title: string
          updated_at?: string
          version_major?: number
          version_minor?: number
          vmp_number: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          effective_from?: string | null
          effective_until?: string | null
          facility_id?: string | null
          id?: string
          integrity_hash?: string | null
          metadata?: Json | null
          next_review_at?: string | null
          objectives?: string | null
          responsible_id?: string | null
          review_interval_days?: number | null
          scope?: string | null
          status?: Database["public"]["Enums"]["vmp_status"]
          title?: string
          updated_at?: string
          version_major?: number
          version_minor?: number
          vmp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "validation_master_plans_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          id: string
          reviewed_at: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vmp_items: {
        Row: {
          acceptance_criteria: string | null
          actual_end: string | null
          actual_start: string | null
          capa_id: string | null
          created_at: string
          description: string | null
          deviations: string | null
          equipment_id: string | null
          id: string
          item_number: string
          metadata: Json | null
          planned_end: string | null
          planned_start: string | null
          priority: string | null
          protocol_ref: string | null
          report_ref: string | null
          responsible_id: string | null
          result: string | null
          sop_id: string | null
          sort_order: number | null
          status: Database["public"]["Enums"]["vmp_item_status"]
          title: string
          updated_at: string
          validation_type: string
          vmp_id: string
        }
        Insert: {
          acceptance_criteria?: string | null
          actual_end?: string | null
          actual_start?: string | null
          capa_id?: string | null
          created_at?: string
          description?: string | null
          deviations?: string | null
          equipment_id?: string | null
          id?: string
          item_number: string
          metadata?: Json | null
          planned_end?: string | null
          planned_start?: string | null
          priority?: string | null
          protocol_ref?: string | null
          report_ref?: string | null
          responsible_id?: string | null
          result?: string | null
          sop_id?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["vmp_item_status"]
          title: string
          updated_at?: string
          validation_type?: string
          vmp_id: string
        }
        Update: {
          acceptance_criteria?: string | null
          actual_end?: string | null
          actual_start?: string | null
          capa_id?: string | null
          created_at?: string
          description?: string | null
          deviations?: string | null
          equipment_id?: string | null
          id?: string
          item_number?: string
          metadata?: Json | null
          planned_end?: string | null
          planned_start?: string | null
          priority?: string | null
          protocol_ref?: string | null
          report_ref?: string | null
          responsible_id?: string | null
          result?: string | null
          sop_id?: string | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["vmp_item_status"]
          title?: string
          updated_at?: string
          validation_type?: string
          vmp_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vmp_items_capa_id_fkey"
            columns: ["capa_id"]
            isOneToOne: false
            referencedRelation: "capas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vmp_items_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vmp_items_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vmp_items_vmp_id_fkey"
            columns: ["vmp_id"]
            isOneToOne: false
            referencedRelation: "validation_master_plans"
            referencedColumns: ["id"]
          },
        ]
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
      webhook_events: {
        Row: {
          api_key_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          error_message: string | null
          event_type: string
          id: string
          integrity_hash: string
          payload: Json
          processed_at: string | null
          source_platform: string
          status: string
          target_platform: string | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          error_message?: string | null
          event_type: string
          id?: string
          integrity_hash: string
          payload?: Json
          processed_at?: string | null
          source_platform: string
          status?: string
          target_platform?: string | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          error_message?: string | null
          event_type?: string
          id?: string
          integrity_hash?: string
          payload?: Json
          processed_at?: string | null
          source_platform?: string
          status?: string
          target_platform?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_events_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_conversations: {
        Row: {
          channel: string
          id: string
          last_message_at: string | null
          lead_data: Json | null
          lead_status: string | null
          messages: Json | null
          phone_number: string
        }
        Insert: {
          channel?: string
          id?: string
          last_message_at?: string | null
          lead_data?: Json | null
          lead_status?: string | null
          messages?: Json | null
          phone_number: string
        }
        Update: {
          channel?: string
          id?: string
          last_message_at?: string | null
          lead_data?: Json | null
          lead_status?: string | null
          messages?: Json | null
          phone_number?: string
        }
        Relationships: []
      }
      whatsapp_events: {
        Row: {
          created_at: string | null
          id: string
          payload: Json
          processed: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload: Json
          processed?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: Json
          processed?: boolean | null
        }
        Relationships: []
      }
      whatsapp_subscribers: {
        Row: {
          alert_types: string[] | null
          created_at: string | null
          display_name: string | null
          id: string
          is_active: boolean | null
          phone_number: string
          sms_enabled: boolean | null
          sms_only_critical: boolean | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          alert_types?: string[] | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number: string
          sms_enabled?: boolean | null
          sms_only_critical?: boolean | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          alert_types?: string[] | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string
          sms_enabled?: boolean | null
          sms_only_critical?: boolean | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      exporter_price_estimates: {
        Row: {
          batch_id: string | null
          confidence_score: number | null
          exporter_visible_estimate: number | null
        }
        Insert: {
          batch_id?: string | null
          confidence_score?: number | null
          exporter_visible_estimate?: number | null
        }
        Update: {
          batch_id?: string | null
          confidence_score?: number | null
          exporter_visible_estimate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "price_intelligence_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: true
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      infinity_voice_stats: {
        Row: {
          active_days: number | null
          avg_latency_ms: number | null
          device_id: string | null
          failures: number | null
          first_command: string | null
          last_command: string | null
          successes: number | null
          total_commands: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      archive_expired_sold_listings: { Args: never; Returns: number }
      calculate_distance_km: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      can_access_audit_evidence: {
        Args: { _audit_id: string; _user_id: string }
        Returns: boolean
      }
      check_platform_access: {
        Args: { _platform: string; _user_id: string }
        Returns: boolean
      }
      create_default_milestone_payments: {
        Args: { p_escrow_agreement_id: string }
        Returns: {
          amount: number
          batch_id: string
          created_at: string
          currency: string
          due_at: string | null
          eligible_at: string | null
          escrow_agreement_id: string
          exporter_id: string
          failure_reason: string | null
          id: string
          importer_id: string
          metadata: Json
          milestone_type: string
          payment_provider: string
          payment_reference: string | null
          percent_of_total: number
          purchase_request_id: string | null
          release_decision: Json
          release_tx_id: string | null
          released_at: string | null
          required_batch_statuses: string[]
          required_previous_milestone: string | null
          required_shinrai_score: number
          sequence_no: number
          status: string
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "milestone_payments"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      cw_can_access_any_batch: {
        Args: { _batch_ids: string[] }
        Returns: boolean
      }
      cw_can_access_batch: { Args: { _batch_id: string }; Returns: boolean }
      cw_can_access_logger: { Args: { _logger_id: string }; Returns: boolean }
      cw_can_access_shipment: {
        Args: { _shipment_id: string }
        Returns: boolean
      }
      cw_credit_balance: { Args: { _user_id: string }; Returns: number }
      cw_debit_credits_for_service: {
        Args: {
          _credits: number
          _idempotency_key?: string
          _metadata?: Json
          _service_order_id: string
          _user_id: string
        }
        Returns: {
          balance_after: number
          ledger_id: string
          message: string
          success: boolean
        }[]
      }
      cw_has_any_role: { Args: { _roles: string[] }; Returns: boolean }
      cw_is_org_member: { Args: { _org_id: string }; Returns: boolean }
      cw_is_trust_admin: { Args: never; Returns: boolean }
      cw_sensitive_row_access: {
        Args: {
          _batch_id: string
          _org_id: string
          _owner_user_id: string
          _shipment_id: string
        }
        Returns: boolean
      }
      determine_trade_approval_tier: {
        Args: { p_trade_value: number; p_user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      jarvis_cleanup_expired_memory: { Args: never; Returns: number }
      jarvis_daily_cost_stats: {
        Args: { p_since: string; p_user_id: string }
        Returns: {
          interaction_count: number
          total_cost: number
        }[]
      }
      jarvis_distillation_candidates: {
        Args: { p_older_than_hours?: number; p_user_id: string }
        Returns: {
          candidate_count: number
          oldest_episode: string
        }[]
      }
      jarvis_face_search: {
        Args: {
          p_descriptor: string
          p_limit?: number
          p_min_similarity?: number
          p_user_id: string
        }
        Returns: {
          context: string
          id: string
          name: string
          similarity: number
        }[]
      }
      jarvis_knowledge_search: {
        Args: {
          p_collection?: string
          p_embedding: string
          p_limit?: number
          p_min_similarity?: number
          p_user_id: string
        }
        Returns: {
          collection: string
          content: string
          id: string
          metadata: Json
          similarity: number
          title: string
        }[]
      }
      jarvis_memory_search: {
        Args: {
          p_embedding: string
          p_layers: string[]
          p_limit?: number
          p_min_similarity?: number
          p_user_id: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          layer: string
          metadata: Json
          similarity: number
          user_id: string
        }[]
      }
      jarvis_monthly_cost_stats: {
        Args: { p_since: string; p_user_id: string }
        Returns: {
          interaction_count: number
          total_cost: number
        }[]
      }
      search_rag: {
        Args: {
          collection_filter?: string
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          collection: string
          content: string
          id: string
          metadata: Json
          similarity: number
          source_id: string
          source_table: string
        }[]
      }
      validate_api_key: {
        Args: { _key_hash: string; _scope: string }
        Returns: boolean
      }
    }
    Enums: {
      ampel_status: "green" | "yellow" | "red"
      app_role:
        | "admin"
        | "auditor"
        | "importer"
        | "exporter"
        | "compliance"
        | "inspector"
        | "logistics"
        | "farm"
        | "shop"
        | "trader"
        | "pharmacy"
        | "lab_provider"
      approval_decision: "pending" | "approved" | "rejected" | "revise"
      apqr_status: "draft" | "in_review" | "approved" | "published"
      audit_status: "draft" | "in_progress" | "completed" | "archived"
      batch_category: "Flower" | "Extract" | "Isolate" | "Oil"
      batch_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "listed"
        | "document_review"
        | "pre_export_check"
        | "sold"
        | "in_export"
        | "suspended"
        | "delivered"
        | "quarantined"
        | "recalled"
      calibration_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "overdue"
        | "failed"
      capa_priority: "low" | "medium" | "high" | "critical"
      capa_status:
        | "open"
        | "investigation"
        | "action_planned"
        | "in_progress"
        | "verification"
        | "closed"
        | "rejected"
      capa_type: "corrective" | "preventive" | "both"
      certification_type: "GACP" | "EU-GACP" | "GMP" | "EU-GMP"
      change_category:
        | "process"
        | "equipment"
        | "material"
        | "facility"
        | "system"
        | "document"
        | "personnel"
        | "other"
      change_priority: "low" | "medium" | "high" | "critical"
      change_status:
        | "draft"
        | "submitted"
        | "impact_assessment"
        | "pending_approval"
        | "approved"
        | "rejected"
        | "implementing"
        | "implemented"
        | "verified"
        | "closed"
      cleaning_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "failed"
        | "overdue"
      complaint_severity: "critical" | "major" | "minor" | "cosmetic"
      complaint_source:
        | "customer"
        | "market"
        | "internal"
        | "regulatory"
        | "distributor"
        | "healthcare_professional"
      complaint_status:
        | "received"
        | "under_review"
        | "investigating"
        | "capa_linked"
        | "resolved"
        | "closed"
        | "rejected"
      compliance_level:
        | "compliant"
        | "partially_compliant"
        | "non_compliant"
        | "not_applicable"
        | "pending_assessment"
      compliance_score: "green" | "yellow" | "red"
      cw_ledger_direction: "credit" | "debit"
      cw_ledger_entry_type:
        | "wallet_topup"
        | "subscription_grant"
        | "service_debit"
        | "refund"
        | "manual_adjustment"
        | "expiry"
      cw_payment_status:
        | "unpaid"
        | "paid_credit"
        | "paid_stripe"
        | "refunded"
        | "failed"
      cw_route_key:
        | "thai_gacp_bulk"
        | "thai_post_harvest_eu_finalization"
        | "full_eu_processing"
        | "eu_remediation_repackaging"
        | "eu_extraction"
        | "pilot_validation"
      cw_route_product_form:
        | "flower"
        | "biomass"
        | "extract"
        | "oil"
        | "api"
        | "finished_product"
      cw_route_request_status:
        | "draft"
        | "quoted"
        | "submitted"
        | "approved"
        | "in_progress"
        | "completed"
        | "cancelled"
      cw_route_risk_level: "fastest" | "balanced" | "strict_pharma"
      cw_service_order_status:
        | "draft"
        | "awaiting_payment"
        | "queued"
        | "in_progress"
        | "delivered"
        | "cancelled"
        | "failed"
      cw_service_type:
        | "ai_dossier"
        | "gacp_gap_audit"
        | "eu_gmp_readiness_audit"
        | "dossier_generation"
        | "document_review"
        | "compliance_call"
        | "custom"
      cw_subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "paused"
        | "cancelled"
        | "expired"
      cw_subscription_tier: "spark" | "launch" | "dominion"
      deviation_severity: "critical" | "major" | "minor" | "observation"
      deviation_status:
        | "open"
        | "investigation"
        | "corrective_action"
        | "closed"
        | "rejected"
      document_status:
        | "draft"
        | "in_review"
        | "approved"
        | "archived"
        | "superseded"
      facility_plan_status:
        | "draft"
        | "in_review"
        | "qa_approval"
        | "regulatory_submitted"
        | "approved"
        | "rejected"
        | "archived"
      inventory_zone:
        | "quarantine"
        | "released"
        | "rejected"
        | "returns"
        | "cold_storage"
        | "ambient"
      invoice_status:
        | "draft"
        | "sent"
        | "paid"
        | "overdue"
        | "cancelled"
        | "refunded"
        | "pending_verification"
      invoice_type:
        | "batch_sale"
        | "post_harvest_service"
        | "commission"
        | "custom"
      jurisdiction: "EU" | "USA" | "CA" | "AU" | "UK"
      lab_result_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "failed"
        | "rejected"
      ledger_entry_side: "debit" | "credit"
      ledger_transaction_type:
        | "invoice_issued"
        | "payment_split"
        | "tax_accrual"
        | "payout"
        | "adjustment"
        | "refund"
      license_status:
        | "draft"
        | "applied"
        | "approved"
        | "active"
        | "expired"
        | "revoked"
        | "suspended"
      license_type:
        | "import"
        | "export"
        | "transit"
        | "dea_registration"
        | "fda_establishment"
        | "health_canada"
        | "tga_license"
        | "odc_permit"
        | "mhra_license"
        | "home_office"
      listing_status:
        | "in_certification"
        | "available"
        | "reserved"
        | "sold"
        | "archived"
      packaging_level: "pallet" | "case" | "unit"
      partner_status: "pending" | "approved" | "rejected"
      payment_method: "stripe" | "bank_transfer" | "manual"
      payment_provider:
        | "stripe"
        | "opn"
        | "2c2p"
        | "adyen"
        | "bank_transfer"
        | "wise"
        | "manual"
      payment_provider_status:
        | "disabled"
        | "sandbox"
        | "live"
        | "restricted"
        | "pending_underwriting"
      payment_provider_transaction_status:
        | "created"
        | "pending"
        | "requires_action"
        | "paid"
        | "failed"
        | "cancelled"
        | "refunded"
        | "disputed"
        | "partially_refunded"
      payment_split_status:
        | "pending"
        | "scheduled"
        | "released"
        | "paid"
        | "blocked"
        | "cancelled"
      plan_approval_action:
        | "submitted_for_review"
        | "review_approved"
        | "review_rejected"
        | "qa_approved"
        | "qa_rejected"
        | "regulatory_submitted"
        | "regulatory_approved"
        | "regulatory_rejected"
      post_harvest_service:
        | "drying"
        | "irradiation"
        | "repackaging"
        | "re_analysis"
        | "certification_support"
      purchase_request_status:
        | "pending"
        | "exporter_accepted"
        | "exporter_rejected"
        | "admin_approved"
        | "admin_rejected"
        | "payment_pending"
        | "paid"
        | "cancelled"
      pv_escalation_level: "none" | "qa_lead" | "management" | "authority"
      pv_report_type:
        | "adverse_reaction"
        | "side_effect"
        | "quality_defect"
        | "misuse"
        | "lack_of_efficacy"
      pv_severity: "non_serious" | "serious" | "life_threatening" | "fatal"
      pv_status:
        | "draft"
        | "submitted"
        | "under_investigation"
        | "closed"
        | "escalated"
      recall_class: "class_1" | "class_2" | "class_3" | "mock"
      recall_severity: "class_1" | "class_2" | "class_3"
      recall_status:
        | "initiated"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "draft"
        | "effectiveness_check"
        | "closed"
      rejection_reason:
        | "weight_discrepancy"
        | "coa_deviation"
        | "visual_damage"
        | "packaging_compromised"
        | "temperature_excursion"
        | "documentation_missing"
        | "customs_rejected"
        | "quality_below_spec"
        | "regulatory_non_compliance"
        | "wrong_product"
        | "contamination_suspected"
        | "other"
      report_type: "ai_assessment" | "improvement_plan" | "advisory_letter"
      return_status:
        | "rejection_filed"
        | "under_investigation"
        | "return_approved"
        | "return_shipped"
        | "return_in_transit"
        | "return_received"
        | "rework"
        | "disposed"
        | "resolved"
        | "disputed"
      sample_status:
        | "planned"
        | "collected"
        | "sealed"
        | "in_transit"
        | "received_by_lab"
        | "in_analysis"
        | "results_available"
        | "approved"
        | "rejected"
        | "retained"
        | "disposed"
      service_order_status:
        | "requested"
        | "in_progress"
        | "completed"
        | "cancelled"
      session_status: "scheduled" | "live" | "completed" | "cancelled"
      shipment_status:
        | "planned"
        | "picked_up"
        | "in_transit"
        | "customs"
        | "delivered"
        | "failed"
      sop_risk_level: "low" | "medium" | "high" | "critical"
      sop_status:
        | "draft"
        | "in_review"
        | "approved"
        | "effective"
        | "superseded"
        | "retired"
      stability_protocol:
        | "long_term"
        | "accelerated"
        | "intermediate"
        | "stress"
        | "in_use"
      stability_result_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "out_of_spec"
      stock_movement_type:
        | "inbound"
        | "outbound"
        | "adjustment"
        | "recall_return"
        | "transfer"
      supplier_audit_result:
        | "approved"
        | "conditionally_approved"
        | "not_approved"
        | "pending"
      trade_type: "export" | "regional"
      training_status:
        | "assigned"
        | "in_progress"
        | "completed"
        | "expired"
        | "overdue"
      vmp_item_status:
        | "planned"
        | "in_progress"
        | "completed"
        | "deferred"
        | "failed"
      vmp_status:
        | "draft"
        | "in_review"
        | "approved"
        | "active"
        | "completed"
        | "superseded"
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
      ampel_status: ["green", "yellow", "red"],
      app_role: [
        "admin",
        "auditor",
        "importer",
        "exporter",
        "compliance",
        "inspector",
        "logistics",
        "farm",
        "shop",
        "trader",
        "pharmacy",
        "lab_provider",
      ],
      approval_decision: ["pending", "approved", "rejected", "revise"],
      apqr_status: ["draft", "in_review", "approved", "published"],
      audit_status: ["draft", "in_progress", "completed", "archived"],
      batch_category: ["Flower", "Extract", "Isolate", "Oil"],
      batch_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "listed",
        "document_review",
        "pre_export_check",
        "sold",
        "in_export",
        "suspended",
        "delivered",
        "quarantined",
        "recalled",
      ],
      calibration_status: [
        "scheduled",
        "in_progress",
        "completed",
        "overdue",
        "failed",
      ],
      capa_priority: ["low", "medium", "high", "critical"],
      capa_status: [
        "open",
        "investigation",
        "action_planned",
        "in_progress",
        "verification",
        "closed",
        "rejected",
      ],
      capa_type: ["corrective", "preventive", "both"],
      certification_type: ["GACP", "EU-GACP", "GMP", "EU-GMP"],
      change_category: [
        "process",
        "equipment",
        "material",
        "facility",
        "system",
        "document",
        "personnel",
        "other",
      ],
      change_priority: ["low", "medium", "high", "critical"],
      change_status: [
        "draft",
        "submitted",
        "impact_assessment",
        "pending_approval",
        "approved",
        "rejected",
        "implementing",
        "implemented",
        "verified",
        "closed",
      ],
      cleaning_status: [
        "scheduled",
        "in_progress",
        "completed",
        "failed",
        "overdue",
      ],
      complaint_severity: ["critical", "major", "minor", "cosmetic"],
      complaint_source: [
        "customer",
        "market",
        "internal",
        "regulatory",
        "distributor",
        "healthcare_professional",
      ],
      complaint_status: [
        "received",
        "under_review",
        "investigating",
        "capa_linked",
        "resolved",
        "closed",
        "rejected",
      ],
      compliance_level: [
        "compliant",
        "partially_compliant",
        "non_compliant",
        "not_applicable",
        "pending_assessment",
      ],
      compliance_score: ["green", "yellow", "red"],
      cw_ledger_direction: ["credit", "debit"],
      cw_ledger_entry_type: [
        "wallet_topup",
        "subscription_grant",
        "service_debit",
        "refund",
        "manual_adjustment",
        "expiry",
      ],
      cw_payment_status: [
        "unpaid",
        "paid_credit",
        "paid_stripe",
        "refunded",
        "failed",
      ],
      cw_route_key: [
        "thai_gacp_bulk",
        "thai_post_harvest_eu_finalization",
        "full_eu_processing",
        "eu_remediation_repackaging",
        "eu_extraction",
        "pilot_validation",
      ],
      cw_route_product_form: [
        "flower",
        "biomass",
        "extract",
        "oil",
        "api",
        "finished_product",
      ],
      cw_route_request_status: [
        "draft",
        "quoted",
        "submitted",
        "approved",
        "in_progress",
        "completed",
        "cancelled",
      ],
      cw_route_risk_level: ["fastest", "balanced", "strict_pharma"],
      cw_service_order_status: [
        "draft",
        "awaiting_payment",
        "queued",
        "in_progress",
        "delivered",
        "cancelled",
        "failed",
      ],
      cw_service_type: [
        "ai_dossier",
        "gacp_gap_audit",
        "eu_gmp_readiness_audit",
        "dossier_generation",
        "document_review",
        "compliance_call",
        "custom",
      ],
      cw_subscription_status: [
        "trialing",
        "active",
        "past_due",
        "paused",
        "cancelled",
        "expired",
      ],
      cw_subscription_tier: ["spark", "launch", "dominion"],
      deviation_severity: ["critical", "major", "minor", "observation"],
      deviation_status: [
        "open",
        "investigation",
        "corrective_action",
        "closed",
        "rejected",
      ],
      document_status: [
        "draft",
        "in_review",
        "approved",
        "archived",
        "superseded",
      ],
      facility_plan_status: [
        "draft",
        "in_review",
        "qa_approval",
        "regulatory_submitted",
        "approved",
        "rejected",
        "archived",
      ],
      inventory_zone: [
        "quarantine",
        "released",
        "rejected",
        "returns",
        "cold_storage",
        "ambient",
      ],
      invoice_status: [
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled",
        "refunded",
        "pending_verification",
      ],
      invoice_type: [
        "batch_sale",
        "post_harvest_service",
        "commission",
        "custom",
      ],
      jurisdiction: ["EU", "USA", "CA", "AU", "UK"],
      lab_result_status: [
        "pending",
        "in_progress",
        "completed",
        "failed",
        "rejected",
      ],
      ledger_entry_side: ["debit", "credit"],
      ledger_transaction_type: [
        "invoice_issued",
        "payment_split",
        "tax_accrual",
        "payout",
        "adjustment",
        "refund",
      ],
      license_status: [
        "draft",
        "applied",
        "approved",
        "active",
        "expired",
        "revoked",
        "suspended",
      ],
      license_type: [
        "import",
        "export",
        "transit",
        "dea_registration",
        "fda_establishment",
        "health_canada",
        "tga_license",
        "odc_permit",
        "mhra_license",
        "home_office",
      ],
      listing_status: [
        "in_certification",
        "available",
        "reserved",
        "sold",
        "archived",
      ],
      packaging_level: ["pallet", "case", "unit"],
      partner_status: ["pending", "approved", "rejected"],
      payment_method: ["stripe", "bank_transfer", "manual"],
      payment_provider: [
        "stripe",
        "opn",
        "2c2p",
        "adyen",
        "bank_transfer",
        "wise",
        "manual",
      ],
      payment_provider_status: [
        "disabled",
        "sandbox",
        "live",
        "restricted",
        "pending_underwriting",
      ],
      payment_provider_transaction_status: [
        "created",
        "pending",
        "requires_action",
        "paid",
        "failed",
        "cancelled",
        "refunded",
        "disputed",
        "partially_refunded",
      ],
      payment_split_status: [
        "pending",
        "scheduled",
        "released",
        "paid",
        "blocked",
        "cancelled",
      ],
      plan_approval_action: [
        "submitted_for_review",
        "review_approved",
        "review_rejected",
        "qa_approved",
        "qa_rejected",
        "regulatory_submitted",
        "regulatory_approved",
        "regulatory_rejected",
      ],
      post_harvest_service: [
        "drying",
        "irradiation",
        "repackaging",
        "re_analysis",
        "certification_support",
      ],
      purchase_request_status: [
        "pending",
        "exporter_accepted",
        "exporter_rejected",
        "admin_approved",
        "admin_rejected",
        "payment_pending",
        "paid",
        "cancelled",
      ],
      pv_escalation_level: ["none", "qa_lead", "management", "authority"],
      pv_report_type: [
        "adverse_reaction",
        "side_effect",
        "quality_defect",
        "misuse",
        "lack_of_efficacy",
      ],
      pv_severity: ["non_serious", "serious", "life_threatening", "fatal"],
      pv_status: [
        "draft",
        "submitted",
        "under_investigation",
        "closed",
        "escalated",
      ],
      recall_class: ["class_1", "class_2", "class_3", "mock"],
      recall_severity: ["class_1", "class_2", "class_3"],
      recall_status: [
        "initiated",
        "in_progress",
        "completed",
        "cancelled",
        "draft",
        "effectiveness_check",
        "closed",
      ],
      rejection_reason: [
        "weight_discrepancy",
        "coa_deviation",
        "visual_damage",
        "packaging_compromised",
        "temperature_excursion",
        "documentation_missing",
        "customs_rejected",
        "quality_below_spec",
        "regulatory_non_compliance",
        "wrong_product",
        "contamination_suspected",
        "other",
      ],
      report_type: ["ai_assessment", "improvement_plan", "advisory_letter"],
      return_status: [
        "rejection_filed",
        "under_investigation",
        "return_approved",
        "return_shipped",
        "return_in_transit",
        "return_received",
        "rework",
        "disposed",
        "resolved",
        "disputed",
      ],
      sample_status: [
        "planned",
        "collected",
        "sealed",
        "in_transit",
        "received_by_lab",
        "in_analysis",
        "results_available",
        "approved",
        "rejected",
        "retained",
        "disposed",
      ],
      service_order_status: [
        "requested",
        "in_progress",
        "completed",
        "cancelled",
      ],
      session_status: ["scheduled", "live", "completed", "cancelled"],
      shipment_status: [
        "planned",
        "picked_up",
        "in_transit",
        "customs",
        "delivered",
        "failed",
      ],
      sop_risk_level: ["low", "medium", "high", "critical"],
      sop_status: [
        "draft",
        "in_review",
        "approved",
        "effective",
        "superseded",
        "retired",
      ],
      stability_protocol: [
        "long_term",
        "accelerated",
        "intermediate",
        "stress",
        "in_use",
      ],
      stability_result_status: [
        "pending",
        "in_progress",
        "completed",
        "out_of_spec",
      ],
      stock_movement_type: [
        "inbound",
        "outbound",
        "adjustment",
        "recall_return",
        "transfer",
      ],
      supplier_audit_result: [
        "approved",
        "conditionally_approved",
        "not_approved",
        "pending",
      ],
      trade_type: ["export", "regional"],
      training_status: [
        "assigned",
        "in_progress",
        "completed",
        "expired",
        "overdue",
      ],
      vmp_item_status: [
        "planned",
        "in_progress",
        "completed",
        "deferred",
        "failed",
      ],
      vmp_status: [
        "draft",
        "in_review",
        "approved",
        "active",
        "completed",
        "superseded",
      ],
      zone_classification: [
        "eu_gmp_a",
        "eu_gmp_b",
        "eu_gmp_c",
        "eu_gmp_d",
        "eu_gmp_unclassified",
        "fda_processing",
        "fda_packaging",
        "fda_storage",
        "fda_testing",
        "fda_utilities",
        "cannabis_cultivation",
        "cannabis_drying",
        "cannabis_extraction",
        "cannabis_packaging",
        "cannabis_storage",
        "cannabis_post_harvest",
        "material_airlock",
        "personnel_airlock",
        "quarantine",
        "receiving",
        "release_storage",
        "waste",
        "corridor",
        "office",
        "other",
      ],
    },
  },
} as const
