import type { FacilityPlanConnection, FacilityPlanZone } from "@/hooks/use-facility-plans";

export type FacilityPlannerMode = "compliance" | "blueprint";
export type BlueprintTemplateId = "blank" | "cannabis_grow" | "cannabis_extraction" | "pharma_lab";
export type BlueprintStylePreset = "gmp_dark" | "architect_dark" | "architect_light";

export interface BlueprintTemplateDefinition {
  id: BlueprintTemplateId;
  label: string;
  description: string;
  mode: FacilityPlannerMode;
}

export const BLUEPRINT_TEMPLATES: BlueprintTemplateDefinition[] = [
  { id: "blank", label: "Leer starten", description: "Freies Canvas ohne Startlayout", mode: "compliance" },
  { id: "cannabis_grow", label: "Cannabis Grow / GACP", description: "Standard-Layout für Anbau, Trocknung und Lagerung", mode: "compliance" },
  { id: "cannabis_extraction", label: "Extraction / Manufacturing", description: "Layout-Vorlage für Extraktions- und Verpackungsbereiche", mode: "compliance" },
  { id: "pharma_lab", label: "Pharma Lab / QC", description: "Reinraum-Zonen für pharmazeutische Labore und Qualitätskontrolle", mode: "compliance" },
];

export function getBlueprintStyleLabel(style: BlueprintStylePreset): string {
  switch (style) {
    case "architect_dark": return "Architect Dark";
    case "architect_light": return "Architect Light";
    default: return "GMP Dark";
  }
}

function zone(id: string, name: string, classification: any, x: number, y: number, width: number, height: number, color?: string): FacilityPlanZone {
  const now = new Date().toISOString();
  return {
    id,
    plan_id: "",
    name,
    classification,
    x,
    y,
    width,
    height,
    rotation: 0,
    area_sqm: null,
    pressure_differential: null,
    temperature_range: null,
    humidity_range: null,
    air_changes_per_hour: null,
    notes: null,
    color: color ?? null,
    sort_order: 0,
    metadata: null,
    created_at: now,
    updated_at: now,
  };
}

function conn(id: string, from: string, to: string, type: string, label?: string): FacilityPlanConnection {
  const now = new Date().toISOString();
  return {
    id,
    plan_id: "",
    from_zone_id: from,
    to_zone_id: to,
    connection_type: type,
    label: label ?? null,
    color: null,
    sort_order: 0,
    created_at: now,
    updated_at: now,
  };
}

export function buildTemplate(templateId: BlueprintTemplateId): { zones: FacilityPlanZone[]; connections: FacilityPlanConnection[] } {
  switch (templateId) {
    case "cannabis_grow": {
      const zones = [
        zone("cultivation", "Cultivation Area", "cannabis_cultivation", 120, 160, 400, 300, "#16a34a"),
        zone("drying", "Drying Room", "cannabis_drying", 550, 160, 200, 140, "#ca8a04"),
        zone("storage", "Storage", "cannabis_storage", 550, 320, 200, 140, "#0891b2"),
        zone("airlock", "Personnel Airlock", "personnel_airlock", 120, 480, 150, 100, "#06b6d4"),
        zone("corridor", "Corridor", "corridor", 290, 480, 460, 100, "#d4d4d8"),
      ];
      const connections = [
        conn("c1", "airlock", "corridor", "door"),
        conn("c2", "corridor", "cultivation", "door"),
        conn("c3", "cultivation", "drying", "material_flow"),
        conn("c4", "drying", "storage", "material_flow"),
      ];
      return finalizeTemplate(zones, connections);
    }
    case "cannabis_extraction": {
      const zones = [
        zone("receiving", "Receiving", "receiving", 120, 170, 180, 120, "#14b8a6"),
        zone("extraction", "Extraction Area", "cannabis_extraction", 340, 120, 300, 200, "#dc2626"),
        zone("packaging", "Packaging", "cannabis_packaging", 680, 120, 200, 200, "#7c3aed"),
        zone("quarantine", "Quarantine", "quarantine", 340, 350, 200, 150, "#f43f5e"),
      ];
      const connections = [
        conn("e1", "receiving", "extraction", "material_flow"),
        conn("e2", "extraction", "packaging", "material_flow"),
        conn("e3", "packaging", "quarantine", "material_flow"),
      ];
      return finalizeTemplate(zones, connections);
    }
    case "pharma_lab": {
      const zones = [
        zone("grade_c", "Testing Lab (Grade C)", "eu_gmp_c", 270, 160, 360, 260, "#eab308"),
        zone("airlock", "Airlock", "material_airlock", 120, 240, 120, 120, "#0ea5e9"),
        zone("corridor", "Corridor", "corridor", 120, 400, 510, 80, "#d4d4d8"),
      ];
      const connections = [
        conn("l1", "corridor", "airlock", "door"),
        conn("l2", "airlock", "grade_c", "airlock"),
      ];
      return finalizeTemplate(zones, connections);
    }
    default:
      return { zones: [], connections: [] };
  }
}

function finalizeTemplate(zones: FacilityPlanZone[], connections: FacilityPlanConnection[]) {
  return {
    zones: zones.map((z, i) => ({ ...z, sort_order: i })),
    connections: connections.map((c, i) => ({ ...c, sort_order: i })),
  };
}
