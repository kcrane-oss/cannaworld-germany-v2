/**
 * GMP Facility Compliance Rule Engine
 * Client-side validation of zone layouts and connections against GMP rules.
 */

export type ComplianceSeverity = "error" | "warning" | "info";

export interface ComplianceFinding {
  id: string;
  severity: ComplianceSeverity;
  rule: string;
  message: string;
  zoneIds: string[];
  connectionId?: string;
}

interface ZoneInput {
  id: string;
  name: string;
  classification: string;
  pressure_differential: string | null;
  air_changes_per_hour: number | null;
}

interface ConnectionInput {
  id: string;
  from_zone_id: string;
  to_zone_id: string;
  connection_type: string;
}

// Classification grade mapping (higher = cleaner)
const GRADE_ORDER: Record<string, number> = {
  eu_gmp_a: 4,
  eu_gmp_b: 3,
  eu_gmp_c: 2,
  eu_gmp_d: 1,
  eu_gmp_unclassified: 0,
  fda_processing: 2,
  fda_packaging: 1,
  fda_storage: 0,
  fda_testing: 2,
  fda_utilities: 0,
  cannabis_cultivation: 1,
  cannabis_drying: 1,
  cannabis_extraction: 2,
  cannabis_packaging: 1,
  cannabis_post_harvest: 1,
  cannabis_storage: 0,
  material_airlock: -1,
  personnel_airlock: -1,
  quarantine: 0,
  receiving: 0,
  release_storage: 0,
  waste: -2,
  corridor: 0,
  office: 0,
  other: 0,
};

const MIN_AIR_CHANGES: Record<string, number> = {
  eu_gmp_a: 600,
  eu_gmp_b: 20,
  eu_gmp_c: 20,
  eu_gmp_d: 6,
};

function isHighGrade(classification: string): boolean {
  return (GRADE_ORDER[classification] ?? 0) >= 2;
}

function isAirlock(classification: string): boolean {
  return classification === "material_airlock" || classification === "personnel_airlock";
}

function isAirlockConnection(type: string): boolean {
  return type === "airlock";
}

function parsePressure(val: string | null): number | null {
  if (!val) return null;
  const match = val.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

export function runComplianceCheck(
  zones: ZoneInput[],
  connections: ConnectionInput[]
): ComplianceFinding[] {
  const findings: ComplianceFinding[] = [];
  const zoneMap = new Map(zones.map(z => [z.id, z]));
  let idx = 0;

  // Rule 1: Pressure cascade – connected zones with higher grade should have higher pressure
  for (const conn of connections) {
    const from = zoneMap.get(conn.from_zone_id);
    const to = zoneMap.get(conn.to_zone_id);
    if (!from || !to) continue;

    const fromGrade = GRADE_ORDER[from.classification] ?? 0;
    const toGrade = GRADE_ORDER[to.classification] ?? 0;
    if (fromGrade < 0 || toGrade < 0) continue; // skip airlocks/waste

    const fromP = parsePressure(from.pressure_differential);
    const toP = parsePressure(to.pressure_differential);

    if (fromP !== null && toP !== null) {
      // Higher grade should have higher pressure
      if (fromGrade > toGrade && fromP <= toP) {
        findings.push({
          id: `pressure-${idx++}`,
          severity: "error",
          rule: "Druckkaskade",
          message: `${from.name} (${fromP} Pa) muss höheren Druck haben als ${to.name} (${toP} Pa) – Druckkaskade verletzt.`,
          zoneIds: [from.id, to.id],
          connectionId: conn.id,
        });
      } else if (toGrade > fromGrade && toP <= fromP) {
        findings.push({
          id: `pressure-${idx++}`,
          severity: "error",
          rule: "Druckkaskade",
          message: `${to.name} (${toP} Pa) muss höheren Druck haben als ${from.name} (${fromP} Pa) – Druckkaskade verletzt.`,
          zoneIds: [from.id, to.id],
          connectionId: conn.id,
        });
      }
    }
  }

  // Rule 2: Airlock requirement – transition from uncontrolled to Grade C+ needs airlock
  for (const conn of connections) {
    const from = zoneMap.get(conn.from_zone_id);
    const to = zoneMap.get(conn.to_zone_id);
    if (!from || !to) continue;

    const fromGrade = GRADE_ORDER[from.classification] ?? 0;
    const toGrade = GRADE_ORDER[to.classification] ?? 0;

    const needsAirlock =
      (fromGrade <= 0 && toGrade >= 2) || (toGrade <= 0 && fromGrade >= 2);

    if (needsAirlock && !isAirlockConnection(conn.connection_type) && !isAirlock(from.classification) && !isAirlock(to.classification)) {
      findings.push({
        id: `airlock-${idx++}`,
        severity: "error",
        rule: "Schleusen-Pflicht",
        message: `Übergang ${from.name} ↔ ${to.name} erfordert eine Schleuse (Grade ≥C zu unkontrolliert).`,
        zoneIds: [from.id, to.id],
        connectionId: conn.id,
      });
    }
  }

  // Rule 3: Minimum air changes
  for (const zone of zones) {
    const minAC = MIN_AIR_CHANGES[zone.classification];
    if (minAC === undefined) continue;

    if (zone.air_changes_per_hour === null || zone.air_changes_per_hour === undefined) {
      findings.push({
        id: `airchanges-missing-${idx++}`,
        severity: "warning",
        rule: "Luftwechsel",
        message: `${zone.name}: Kein Luftwechselwert angegeben (Mindestanforderung: ${minAC}/h).`,
        zoneIds: [zone.id],
      });
    } else if (zone.air_changes_per_hour < minAC) {
      findings.push({
        id: `airchanges-low-${idx++}`,
        severity: "error",
        rule: "Luftwechsel",
        message: `${zone.name}: Luftwechsel ${zone.air_changes_per_hour}/h liegt unter dem Minimum von ${minAC}/h.`,
        zoneIds: [zone.id],
      });
    }
  }

  // Rule 4: Waste isolation – waste zones must not connect directly to Grade A/B
  for (const conn of connections) {
    const from = zoneMap.get(conn.from_zone_id);
    const to = zoneMap.get(conn.to_zone_id);
    if (!from || !to) continue;

    const wasteZone = from.classification === "waste" ? from : to.classification === "waste" ? to : null;
    const otherZone = wasteZone === from ? to : from;
    if (!wasteZone) continue;

    if ((GRADE_ORDER[otherZone.classification] ?? 0) >= 3) {
      findings.push({
        id: `waste-isolation-${idx++}`,
        severity: "error",
        rule: "Abfall-Isolation",
        message: `${wasteZone.name} darf nicht direkt mit ${otherZone.name} (Grade A/B) verbunden sein.`,
        zoneIds: [wasteZone.id, otherZone.id],
        connectionId: conn.id,
      });
    }
  }

  // Rule 5: Cannabis-specific – cultivation must not connect directly to packaging without post-harvest
  for (const conn of connections) {
    const from = zoneMap.get(conn.from_zone_id);
    const to = zoneMap.get(conn.to_zone_id);
    if (!from || !to) continue;

    const isCultToPackaging =
      (from.classification === "cannabis_cultivation" && to.classification === "cannabis_packaging") ||
      (to.classification === "cannabis_cultivation" && from.classification === "cannabis_packaging");

    if (isCultToPackaging) {
      findings.push({
        id: `cannabis-flow-${idx++}`,
        severity: "warning",
        rule: "Cannabis-Fluss",
        message: `${from.name} → ${to.name}: Anbau darf nicht direkt an Verpackung grenzen – Post-Harvest-Schritt erforderlich.`,
        zoneIds: [from.id, to.id],
        connectionId: conn.id,
      });
    }
  }

  return findings;
}
