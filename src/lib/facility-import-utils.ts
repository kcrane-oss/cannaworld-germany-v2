import type { FacilityInsert } from "@/hooks/use-facilities";
import { FACILITY_TYPES, GMP_STATUSES } from "@/hooks/use-facilities";
import type { Facility } from "@/hooks/use-facilities";

export interface ImportRow {
  rowIndex: number;
  raw: Record<string, string>;
  parsed: FacilityInsert | null;
  errors: string[];
  warnings: string[];
  isDuplicate: boolean;
  duplicateOf?: string;
}

export interface ImportResult {
  rows: ImportRow[];
  totalRows: number;
  validRows: number;
  errorRows: number;
  duplicateRows: number;
}

const COLUMN_MAP: Record<string, keyof FacilityInsert> = {
  name: "name",
  bezeichnung: "name",
  "facility name": "name",
  typ: "facility_type",
  type: "facility_type",
  "facility type": "facility_type",
  adresse: "address",
  address: "address",
  straße: "address",
  stadt: "city",
  city: "city",
  ort: "city",
  land: "country",
  country: "country",
  "kontakt name": "contact_name",
  "contact name": "contact_name",
  ansprechpartner: "contact_name",
  "kontakt e-mail": "contact_email",
  "contact email": "contact_email",
  email: "contact_email",
  "e-mail": "contact_email",
  telefon: "contact_phone",
  phone: "contact_phone",
  "contact phone": "contact_phone",
  lizenznummer: "license_number",
  "license number": "license_number",
  lizenz: "license_number",
  "gmp-status": "gmp_status",
  "gmp status": "gmp_status",
  gmp: "gmp_status",
  notizen: "notes",
  notes: "notes",
  bemerkungen: "notes",
  aktiv: "is_active",
  active: "is_active",
  status: "is_active",
};

const VALID_TYPES: string[] = FACILITY_TYPES.map((t) => t.value);
const VALID_GMP: string[] = GMP_STATUSES.map((g) => g.value);

function normalizeType(val: string): string | null {
  const lower = val.toLowerCase().trim();
  if (VALID_TYPES.includes(lower)) return lower;
  const match = FACILITY_TYPES.find(
    (t) => t.label.toLowerCase() === lower || t.value === lower
  );
  return match?.value ?? null;
}

function normalizeGmp(val: string): string | null {
  const lower = val.toLowerCase().trim();
  if (VALID_GMP.includes(lower)) return lower;
  const match = GMP_STATUSES.find(
    (g) => g.label.toLowerCase() === lower || g.value === lower
  );
  return match?.value ?? null;
}

function normalizeActive(val: string): boolean {
  const lower = val.toLowerCase().trim();
  return ["ja", "yes", "true", "1", "aktiv", "active"].includes(lower);
}

export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const sep = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(sep).map((h) => h.trim().replace(/^["']|["']$/g, ""));

  return lines.slice(1).map((line) => {
    const values = line.split(sep).map((v) => v.trim().replace(/^["']|["']$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row;
  });
}

export function mapColumns(headers: string[]): Record<string, keyof FacilityInsert | null> {
  const mapping: Record<string, keyof FacilityInsert | null> = {};
  headers.forEach((h) => {
    const key = h.toLowerCase().trim();
    mapping[h] = COLUMN_MAP[key] ?? null;
  });
  return mapping;
}

export function validateAndParse(
  rawRows: Record<string, string>[],
  existingFacilities: Facility[],
  userId: string | null
): ImportResult {
  const colMapping = rawRows.length > 0 ? mapColumns(Object.keys(rawRows[0])) : {};
  const rows: ImportRow[] = [];

  rawRows.forEach((raw, i) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const partial: Partial<FacilityInsert> = {
      facility_type: "production",
      gmp_status: "pending",
      is_active: true,
      country: "DE",
      created_by: userId,
    };

    // Map columns
    Object.entries(raw).forEach(([header, value]) => {
      const field = colMapping[header];
      if (!field || !value) return;

      switch (field) {
        case "name":
          partial.name = value.trim();
          break;
        case "facility_type": {
          const ft = normalizeType(value);
          if (ft) partial.facility_type = ft;
          else warnings.push(`Unbekannter Typ "${value}" → Standard "Produktion"`);
          break;
        }
        case "gmp_status": {
          const gs = normalizeGmp(value);
          if (gs) partial.gmp_status = gs;
          else warnings.push(`Unbekannter GMP-Status "${value}" → "Ausstehend"`);
          break;
        }
        case "is_active":
          partial.is_active = normalizeActive(value);
          break;
        case "address":
          partial.address = value || null;
          break;
        case "city":
          partial.city = value || null;
          break;
        case "country":
          partial.country = value || null;
          break;
        case "contact_name":
          partial.contact_name = value || null;
          break;
        case "contact_email":
          if (value && !value.includes("@")) {
            warnings.push(`E-Mail "${value}" scheint ungültig`);
          }
          partial.contact_email = value || null;
          break;
        case "contact_phone":
          partial.contact_phone = value || null;
          break;
        case "license_number":
          partial.license_number = value || null;
          break;
        case "notes":
          partial.notes = value || null;
          break;
      }
    });

    // Validate required
    if (!partial.name?.trim()) {
      errors.push("Name ist erforderlich");
    }

    // Duplicate check
    let isDuplicate = false;
    let duplicateOf: string | undefined;
    if (partial.name) {
      const existing = existingFacilities.find(
        (f) =>
          f.name.toLowerCase() === partial.name!.toLowerCase() ||
          (partial.license_number &&
            f.license_number?.toLowerCase() === partial.license_number.toLowerCase())
      );
      if (existing) {
        isDuplicate = true;
        duplicateOf = existing.name;
        warnings.push(`Mögliches Duplikat von "${existing.name}"`);
      }

      // Check within import batch
      const prevDup = rows.find(
        (r) =>
          r.parsed?.name.toLowerCase() === partial.name!.toLowerCase()
      );
      if (prevDup) {
        isDuplicate = true;
        duplicateOf = prevDup.parsed?.name;
        warnings.push(`Duplikat innerhalb des Imports (Zeile ${prevDup.rowIndex + 1})`);
      }
    }

    const parsed =
      errors.length === 0
        ? ({
            name: partial.name!,
            facility_type: partial.facility_type!,
            address: partial.address ?? null,
            city: partial.city ?? null,
            country: partial.country ?? null,
            contact_name: partial.contact_name ?? null,
            contact_email: partial.contact_email ?? null,
            contact_phone: partial.contact_phone ?? null,
            license_number: partial.license_number ?? null,
            gmp_status: partial.gmp_status!,
            notes: partial.notes ?? null,
            is_active: partial.is_active!,
            created_by: partial.created_by ?? null,
          } as FacilityInsert)
        : null;

    rows.push({
      rowIndex: i,
      raw,
      parsed,
      errors,
      warnings,
      isDuplicate,
      duplicateOf,
    });
  });

  return {
    rows,
    totalRows: rows.length,
    validRows: rows.filter((r) => r.parsed && r.errors.length === 0).length,
    errorRows: rows.filter((r) => r.errors.length > 0).length,
    duplicateRows: rows.filter((r) => r.isDuplicate).length,
  };
}

export function generateCSVTemplate(): string {
  const headers = [
    "Name",
    "Typ",
    "Adresse",
    "Stadt",
    "Land",
    "Kontakt Name",
    "Kontakt E-Mail",
    "Telefon",
    "Lizenznummer",
    "GMP-Status",
    "Notizen",
    "Aktiv",
  ];
  const exampleRow = [
    "GMP Facility Berlin",
    "production",
    "Industriestr. 10",
    "Berlin",
    "DE",
    "Max Mustermann",
    "max@example.com",
    "+49 30 1234567",
    "DE-GMP-2024-001",
    "compliant",
    "EU-GMP zertifiziert seit 2023",
    "Ja",
  ];
  return [headers.join(";"), exampleRow.join(";")].join("\n");
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
