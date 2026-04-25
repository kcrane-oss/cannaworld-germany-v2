import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { Enums, Json, Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import {
  asCanvasData,
  asPlannerMetadata,
  buildFacilityPlanSnapshot,
  type FacilityPlanApprovalInsert,
  type FacilityPlanApprovalRow,
  type FacilityPlanConnectionInsert,
  type FacilityPlanConnectionRow,
  type FacilityPlanInsert,
  type FacilityPlanRow,
  type FacilityPlanSnapshot,
  type FacilityPlanUpdate,
  type FacilityPlanZoneInsert,
  type FacilityPlanZoneRow,
} from "@/lib/facility-planner-models";

export type FacilityPlan = FacilityPlanRow;
export type FacilityPlanZone = FacilityPlanZoneRow;
export type FacilityPlanApproval = FacilityPlanApprovalRow;
export type FacilityPlanConnection = FacilityPlanConnectionRow;
export type FacilityPlanStatus = Enums<"facility_plan_status">;
export type ZoneClassification = Enums<"zone_classification">;
export type PlanApprovalAction = Enums<"plan_approval_action">;

// Zone classifications
const ZONE_CLASSIFICATIONS = [
  { group: "EU-GMP", items: [
    { value: "eu_gmp_a", label: "Grade A – Aseptisch", color: "#ef4444" },
    { value: "eu_gmp_b", label: "Grade B – Umgebung Grade A", color: "#f97316" },
    { value: "eu_gmp_c", label: "Grade C – Kontrolliert", color: "#eab308" },
    { value: "eu_gmp_d", label: "Grade D – Allgemein", color: "#22c55e" },
    { value: "eu_gmp_unclassified", label: "Nicht klassifiziert", color: "#94a3b8" },
  ]},
  { group: "FDA 21 CFR 211", items: [
    { value: "fda_processing", label: "Processing Area", color: "#3b82f6" },
    { value: "fda_packaging", label: "Packaging Area", color: "#6366f1" },
    { value: "fda_storage", label: "Storage Area", color: "#8b5cf6" },
    { value: "fda_testing", label: "Testing/QC Lab", color: "#a855f7" },
    { value: "fda_utilities", label: "Utilities", color: "#64748b" },
  ]},
  { group: "Cannabis (GACP/GMP)", items: [
    { value: "cannabis_cultivation", label: "Anbau / Cultivation", color: "#16a34a" },
    { value: "cannabis_drying", label: "Trocknung / Drying", color: "#ca8a04" },
    { value: "cannabis_extraction", label: "Extraktion", color: "#dc2626" },
    { value: "cannabis_packaging", label: "Verpackung", color: "#7c3aed" },
    { value: "cannabis_storage", label: "Lager / Storage", color: "#0891b2" },
    { value: "cannabis_post_harvest", label: "Post-Harvest Processing", color: "#059669" },
  ]},
  { group: "Materialfluss", items: [
    { value: "material_airlock", label: "Materialschleuse", color: "#0ea5e9" },
    { value: "personnel_airlock", label: "Personalschleuse", color: "#06b6d4" },
    { value: "quarantine", label: "Quarantäne", color: "#f43f5e" },
    { value: "receiving", label: "Warenannahme", color: "#14b8a6" },
    { value: "release_storage", label: "Freigabelager", color: "#10b981" },
    { value: "waste", label: "Abfall / Waste", color: "#78716c" },
  ]},
  { group: "Allgemein", items: [
    { value: "corridor", label: "Korridor / Flur", color: "#d4d4d8" },
    { value: "office", label: "Büro", color: "#a1a1aa" },
    { value: "other", label: "Sonstiges", color: "#71717a" },
  ]},
] as const;

const PLAN_STATUSES = [
  { value: "draft", label: "Entwurf", color: "bg-slate-500" },
  { value: "in_review", label: "In Prüfung", color: "bg-blue-500" },
  { value: "qa_approval", label: "QA-Genehmigung", color: "bg-amber-500" },
  { value: "regulatory_submitted", label: "Regulatory eingereicht", color: "bg-purple-500" },
  { value: "approved", label: "Genehmigt", color: "bg-emerald-500" },
  { value: "rejected", label: "Abgelehnt", color: "bg-red-500" },
  { value: "archived", label: "Archiviert", color: "bg-gray-500" },
] as const;

const REGULATORY_FRAMEWORKS = [
  { value: "eu_gmp", label: "EU-GMP" },
  { value: "fda", label: "FDA 21 CFR" },
  { value: "gacp_gmp", label: "GACP/GMP Cannabis" },
  { value: "mixed", label: "Kombiniert" },
] as const;

export { ZONE_CLASSIFICATIONS, PLAN_STATUSES, REGULATORY_FRAMEWORKS };

export function getZoneColor(classification: string): string {
  for (const group of ZONE_CLASSIFICATIONS) {
    const item = group.items.find(i => i.value === classification);
    if (item) return item.color;
  }
  return "#71717a";
}

export function getZoneLabel(classification: string): string {
  for (const group of ZONE_CLASSIFICATIONS) {
    const item = group.items.find(i => i.value === classification);
    if (item) return item.label;
  }
  return classification;
}

export const CONNECTION_TYPES = [
  { value: "material_flow", label: "Materialfluss", color: "#3b82f6" },
  { value: "personnel_flow", label: "Personalfluss", color: "#22c55e" },
  { value: "airlock", label: "Schleuse", color: "#f59e0b" },
  { value: "door", label: "Tür", color: "#6b7280" },
  { value: "waste", label: "Abfallweg", color: "#ef4444" },
  { value: "hvac_duct", label: "HVAC-Kanal", color: "#06b6d4" },
  { value: "pass_through", label: "Durchreiche", color: "#a855f7" },
] as const;

export function getConnectionColor(type: string): string {
  return CONNECTION_TYPES.find(c => c.value === type)?.color ?? "#6b7280";
}

// ── Queries ──

export function useFacilityPlans() {
  return useQuery<FacilityPlan[]>({
    queryKey: ["facility-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facility_plans")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return ((data as any) || []).map((plan: any) => ({
        ...plan,
        metadata: asPlannerMetadata(plan.metadata),
        canvas_data: asCanvasData(plan.canvas_data),
      }));
    },
  });
}

export function useFacilityPlan(id: string | undefined) {
  return useQuery<FacilityPlan | null>({
    queryKey: ["facility-plans", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facility_plans")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      const plan = data as any;
      return {
        ...plan,
        metadata: asPlannerMetadata(plan.metadata),
        canvas_data: asCanvasData(plan.canvas_data),
      };
    },
  });
}

export function usePlanZones(planId: string | undefined) {
  return useQuery<FacilityPlanZone[]>({
    queryKey: ["facility-plan-zones", planId],
    enabled: !!planId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facility_plan_zones")
        .select("*")
        .eq("plan_id", planId!)
        .order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });
}

export function usePlanApprovals(planId: string | undefined) {
  return useQuery<FacilityPlanApproval[]>({
    queryKey: ["facility-plan-approvals", planId],
    enabled: !!planId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facility_plan_approvals")
        .select("*")
        .eq("plan_id", planId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

export function usePlanConnections(planId: string | undefined) {
  return useQuery<FacilityPlanConnection[]>({
    queryKey: ["facility-plan-connections", planId],
    enabled: !!planId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facility_plan_connections")
        .select("*")
        .eq("plan_id", planId!)
        .order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });
}

export function useCommitFacilityPlanRevision() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      plan,
      zones,
      connections,
      action = "save",
      changeSummary,
    }: {
      plan: FacilityPlan;
      zones: FacilityPlanZone[];
      connections: FacilityPlanConnection[];
      action?: string;
      changeSummary?: string;
    }) => {
      const snapshot: FacilityPlanSnapshot = buildFacilityPlanSnapshot(plan, zones, connections);
      const { data, error } = await supabase.rpc("commit_facility_plan_revision", {
        p_plan_id: plan.id,
        p_expected_version_major: plan.version_major,
        p_expected_version_minor: plan.version_minor,
        p_snapshot: snapshot as unknown as Tables<"facility_plan_revisions">["snapshot"],
        p_action: action,
        p_change_summary: changeSummary ?? undefined,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      qc.invalidateQueries({ queryKey: ["facility-plans", vars.plan.id] });
      qc.invalidateQueries({ queryKey: ["facility-plan-zones", vars.plan.id] });
      qc.invalidateQueries({ queryKey: ["facility-plan-connections", vars.plan.id] });
      toast({ title: "Revision gesichert" });
    },
    onError: (e: Error) => toast({ title: "Revision fehlgeschlagen", description: e.message, variant: "destructive" }),
  });
}

export function useSaveFacilityPlanGraph() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      plan,
      zones,
      connections,
      canvasData,
      action = "save_graph",
      changeSummary,
    }: {
      plan: FacilityPlan;
      zones: FacilityPlanZone[];
      connections: FacilityPlanConnection[];
      canvasData: any;
      action?: string;
      changeSummary?: string;
    }) => {
      const { data, error } = await supabase.rpc("save_facility_plan_graph", {
        p_plan_id: plan.id,
        p_expected_version_major: plan.version_major,
        p_expected_version_minor: plan.version_minor,
        p_zones: zones as unknown as Json,
        p_connections: connections as unknown as Json,
        p_canvas_data: canvasData as unknown as Json,
        p_action: action,
        p_change_summary: changeSummary ?? undefined,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      qc.invalidateQueries({ queryKey: ["facility-plans", vars.plan.id] });
      qc.invalidateQueries({ queryKey: ["facility-plan-zones", vars.plan.id] });
      qc.invalidateQueries({ queryKey: ["facility-plan-connections", vars.plan.id] });
      toast({ title: "Plan atomar gespeichert" });
    },
    onError: (e: Error) => toast({ title: "Speichern fehlgeschlagen", description: e.message, variant: "destructive" }),
  });
}

export function useSaveFacilityPlanPresentation() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      plan,
      metadata,
      canvasData,
      action = "update_presentation",
      changeSummary,
    }: {
      plan: FacilityPlan;
      metadata: FacilityPlan["metadata"];
      canvasData: FacilityPlan["canvas_data"];
      action?: string;
      changeSummary?: string;
    }) => {
      const { data, error } = await (supabase as any).rpc("update_facility_plan_presentation", {
        p_plan_id: plan.id,
        p_expected_version_major: plan.version_major,
        p_expected_version_minor: plan.version_minor,
        p_metadata: metadata,
        p_canvas_data: canvasData,
        p_action: action,
        p_change_summary: changeSummary ?? undefined,
      });
      if (error) throw error;
      return data as { revision_id: string; revision_number: number; revision_hash: string; version_minor: number };
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      qc.invalidateQueries({ queryKey: ["facility-plans", vars.plan.id] });
      toast({ title: "Planansicht gespeichert" });
    },
    onError: (e: Error) => toast({ title: "Planansicht fehlgeschlagen", description: e.message, variant: "destructive" }),
  });
}

export function useTransitionFacilityPlan() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      planId,
      action,
      comment,
      signatureUrl,
    }: {
      planId: string;
      action: PlanApprovalAction;
      comment?: string;
      signatureUrl?: string;
    }) => {
      const { data, error } = await supabase.rpc("transition_facility_plan", {
        p_plan_id: planId,
        p_action: action,
        p_comment: comment ?? undefined,
        p_signature_url: signatureUrl ?? undefined,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      qc.invalidateQueries({ queryKey: ["facility-plans", vars.planId] });
      qc.invalidateQueries({ queryKey: ["facility-plan-approvals", vars.planId] });
      toast({ title: "Workflow aktualisiert" });
    },
    onError: (e: Error) => toast({ title: "Workflow fehlgeschlagen", description: e.message, variant: "destructive" }),
  });
}

// ── Mutations ──

export function useCreatePlan() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (plan: Partial<FacilityPlan>) => {
      const { data, error } = await supabase
        .from("facility_plans")
        .insert(plan as FacilityPlanInsert)
        .select()
        .single();
      if (error) throw error;
      return {
        ...(data as any),
        metadata: asPlannerMetadata((data as any).metadata),
        canvas_data: asCanvasData((data as any).canvas_data),
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      toast({ title: "Facility-Plan erstellt" });
    },
    onError: (e: Error) => toast({ title: "Fehler", description: e.message, variant: "destructive" }),
  });
}

export function useUpdatePlan() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<FacilityPlan> & { id: string }) => {
      const { data, error } = await supabase
        .from("facility_plans")
        .update(updates as FacilityPlanUpdate)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return {
        ...(data as any),
        metadata: asPlannerMetadata((data as any).metadata),
        canvas_data: asCanvasData((data as any).canvas_data),
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      toast({ title: "Plan aktualisiert" });
    },
    onError: (e: Error) => toast({ title: "Fehler", description: e.message, variant: "destructive" }),
  });
}

export function useDeletePlan() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("facility_plans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      toast({ title: "Plan gelöscht" });
    },
    onError: (e: Error) => toast({ title: "Fehler", description: e.message, variant: "destructive" }),
  });
}

export function useUpsertZone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (zone: Partial<FacilityPlanZone> & { plan_id: string }) => {
      const { data, error } = await supabase
        .from("facility_plan_zones")
        .upsert(zone as FacilityPlanZoneInsert)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plan-zones", vars.plan_id] });
    },
  });
}

export function useDeleteZone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, planId }: { id: string; planId: string }) => {
      const { error } = await supabase.from("facility_plan_zones").delete().eq("id", id);
      if (error) throw error;
      return planId;
    },
    onSuccess: (planId) => {
      qc.invalidateQueries({ queryKey: ["facility-plan-zones", planId] });
    },
  });
}

export function useUpsertConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (conn: Partial<FacilityPlanConnection> & { plan_id: string }) => {
      const { data, error } = await supabase
        .from("facility_plan_connections")
        .upsert(conn as FacilityPlanConnectionInsert)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plan-connections", vars.plan_id] });
    },
  });
}

export function useDeleteConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, planId }: { id: string; planId: string }) => {
      const { error } = await supabase.from("facility_plan_connections").delete().eq("id", id);
      if (error) throw error;
      return planId;
    },
    onSuccess: (planId) => {
      qc.invalidateQueries({ queryKey: ["facility-plan-connections", planId] });
    },
  });
}

export function useCreateApproval() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (approval: Partial<FacilityPlanApproval> & { plan_id: string }) => {
      const { data, error } = await supabase
        .from("facility_plan_approvals")
        .insert(approval as FacilityPlanApprovalInsert)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["facility-plan-approvals", vars.plan_id] });
      qc.invalidateQueries({ queryKey: ["facility-plans"] });
      toast({ title: "Approval-Aktion erfasst" });
    },
    onError: (e: Error) => toast({ title: "Fehler", description: e.message, variant: "destructive" }),
  });
}
