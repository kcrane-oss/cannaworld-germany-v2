import type { Json, Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type FacilityPlanRow = Tables<"facility_plans">;
export type FacilityPlanZoneRow = Tables<"facility_plan_zones">;
export type FacilityPlanConnectionRow = Tables<"facility_plan_connections">;
export type FacilityPlanApprovalRow = Tables<"facility_plan_approvals">;
export type FacilityPlanCommentRow = Tables<"facility_plan_comments">;
export type FacilityPlanRevisionRow = Tables<"facility_plan_revisions">;

export type FacilityPlanInsert = TablesInsert<"facility_plans">;
export type FacilityPlanUpdate = TablesUpdate<"facility_plans">;
export type FacilityPlanZoneInsert = TablesInsert<"facility_plan_zones">;
export type FacilityPlanConnectionInsert = TablesInsert<"facility_plan_connections">;
export type FacilityPlanApprovalInsert = TablesInsert<"facility_plan_approvals">;

export type FacilityPlannerMode = "compliance" | "blueprint" | "hybrid";
export type BlueprintStylePreset = "gmp_dark" | "architect_dark" | "architect_light";

export interface FacilityPlannerMetadata {
  planner_mode?: FacilityPlannerMode;
  blueprint_template?: string | null;
  blueprint_style?: BlueprintStylePreset;
  blueprint_profile?: "architectural" | "operations" | "compliance" | null;
  compliance_score?: number | null;
  export_profile?: "engineering_pack" | "architect_blueprint" | "authority_submission" | null;
  current_revision_id?: string | null;
  current_revision_number?: number | null;
  last_saved_snapshot_hash?: string | null;
}

export interface FacilityPlannerCanvasData {
  background_path?: string | null;
  background_url?: string | null;
  zones?: FacilityPlanZoneRow[];
}

export interface FacilityPlanSnapshot {
  plan: Pick<FacilityPlanRow, "id" | "title" | "plan_number" | "status" | "regulatory_framework" | "version_major" | "version_minor"> & {
    metadata?: FacilityPlannerMetadata | null;
  };
  zones: FacilityPlanZoneRow[];
  connections: FacilityPlanConnectionRow[];
  captured_at: string;
}

export function asPlannerMetadata(value: Json | null | undefined): FacilityPlannerMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as unknown as FacilityPlannerMetadata;
}

export function asCanvasData(value: Json | null | undefined): FacilityPlannerCanvasData {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as unknown as FacilityPlannerCanvasData;
}

export function buildFacilityPlanSnapshot(
  plan: FacilityPlanRow,
  zones: FacilityPlanZoneRow[],
  connections: FacilityPlanConnectionRow[],
): FacilityPlanSnapshot {
  return {
    plan: {
      id: plan.id,
      title: plan.title,
      plan_number: plan.plan_number,
      status: plan.status,
      regulatory_framework: plan.regulatory_framework,
      version_major: plan.version_major,
      version_minor: plan.version_minor,
      metadata: asPlannerMetadata(plan.metadata),
    },
    zones,
    connections,
    captured_at: new Date().toISOString(),
  };
}
