/**
 * Role-specific onboarding configurations.
 * Each role has its own step titles, document types, ShinrAi assessment axes, etc.
 */

export type OnboardingRole =
  | "exporter"
  | "importer"
  | "farm"
  | "lab_provider"
  | "logistics"
  | "auditor"
  | "inspector"
  | "shop"
  | "pharmacy"
  | "trader";

export interface DocumentConfig {
  type: string;
  label: string; // i18n key
  required: boolean;
  step: number;
  accept?: string; // MIME types
}

export interface ShinraiAxis {
  key: string;
  label: string; // i18n key
  weight: number;
  questions: {
    key: string;
    label: string; // i18n key
    options: { value: number; label: string }[];
  }[];
}

export interface RoleConfig {
  role: OnboardingRole;
  label: string; // i18n key
  icon: string; // lucide icon name
  description: string; // i18n key
  steps: {
    num: number;
    label: string; // i18n key
    needsNDA: boolean;
  }[];
  documents: DocumentConfig[];
  shinraiAxes: ShinraiAxis[];
  /** Fields for step 1 (company/entity profile) */
  profileFields: string[];
  /** Fields for step 2 (licensing & credentials) */
  licensingFields: string[];
  /** Fields for step 3 (facility/operations) */
  facilityFields: string[];
  /** Fields for step 4 (products/services) */
  serviceFields: string[];
}

// ──────────────────────────────────────────────
// Shared ShinrAi question template
// ──────────────────────────────────────────────
const q = (key: string, label: string) => ({
  key,
  label,
  options: [
    { value: 0, label: "ob.shinrai.not_implemented" },
    { value: 1, label: "ob.shinrai.planned" },
    { value: 2, label: "ob.shinrai.partial" },
    { value: 3, label: "ob.shinrai.implemented" },
    { value: 4, label: "ob.shinrai.certified" },
  ],
});

// ──────────────────────────────────────────────
// EXPORTER
// ──────────────────────────────────────────────
const exporterConfig: RoleConfig = {
  role: "exporter",
  label: "ob.role.exporter",
  icon: "PackageCheck",
  description: "ob.role.exporter_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_licensing", needsNDA: false },
    { num: 3, label: "ob.step_facility", needsNDA: true },
    { num: 4, label: "ob.step_products", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "power_of_attorney", label: "ob.doc.poa", required: false, step: 1 },
    { type: "cannabis_license", label: "ob.doc.cannabis_license", required: true, step: 2 },
    { type: "export_permit", label: "ob.doc.export_permit", required: true, step: 2 },
    { type: "narcotics_permit", label: "ob.doc.narcotics_permit", required: false, step: 2 },
    { type: "gacp_certificate", label: "ob.doc.gacp_cert", required: false, step: 3 },
    { type: "gmp_certificate", label: "ob.doc.gmp_cert", required: false, step: 3 },
    { type: "facility_layout", label: "ob.doc.facility_layout", required: true, step: 3 },
    { type: "facility_photo", label: "ob.doc.facility_photo", required: false, step: 3 },
    { type: "sop_list", label: "ob.doc.sop_list", required: false, step: 3 },
    { type: "coa", label: "ob.doc.coa", required: true, step: 4 },
    { type: "batch_record", label: "ob.doc.batch_record", required: false, step: 4 },
    { type: "supply_chain_map", label: "ob.doc.supply_chain", required: false, step: 4 },
    { type: "quality_manual", label: "ob.doc.quality_manual", required: false, step: 4 },
    { type: "capa_process", label: "ob.doc.capa_process", required: false, step: 4 },
    { type: "stability_data", label: "ob.doc.stability_data", required: false, step: 4 },
    { type: "insurance", label: "ob.doc.insurance", required: false, step: 4 },
  ],
  shinraiAxes: [
    {
      key: "documentation",
      label: "ob.shinrai.axis.documentation",
      weight: 20,
      questions: [
        q("doc_sop", "ob.shinrai.q.sop_current"),
        q("doc_records", "ob.shinrai.q.batch_records"),
        q("doc_digital", "ob.shinrai.q.digital_system"),
        q("doc_archive", "ob.shinrai.q.archive_policy"),
        q("doc_version", "ob.shinrai.q.version_control"),
      ],
    },
    {
      key: "facility",
      label: "ob.shinrai.axis.facility",
      weight: 20,
      questions: [
        q("fac_cleanroom", "ob.shinrai.q.cleanroom"),
        q("fac_hvac", "ob.shinrai.q.hvac"),
        q("fac_pest", "ob.shinrai.q.pest_control"),
        q("fac_waste", "ob.shinrai.q.waste_management"),
        q("fac_maintenance", "ob.shinrai.q.maintenance_plan"),
      ],
    },
    {
      key: "staff",
      label: "ob.shinrai.axis.staff",
      weight: 15,
      questions: [
        q("staff_qp", "ob.shinrai.q.qualified_person"),
        q("staff_training", "ob.shinrai.q.training_plan"),
        q("staff_hygiene", "ob.shinrai.q.hygiene_program"),
        q("staff_org", "ob.shinrai.q.org_chart"),
      ],
    },
    {
      key: "supply_chain",
      label: "ob.shinrai.axis.supply_chain",
      weight: 20,
      questions: [
        q("sc_traceability", "ob.shinrai.q.traceability"),
        q("sc_cold_chain", "ob.shinrai.q.cold_chain"),
        q("sc_transport", "ob.shinrai.q.transport_validation"),
        q("sc_supplier", "ob.shinrai.q.supplier_qualification"),
        q("sc_recall", "ob.shinrai.q.recall_procedure"),
      ],
    },
    {
      key: "quality",
      label: "ob.shinrai.axis.quality",
      weight: 15,
      questions: [
        q("qa_capa", "ob.shinrai.q.capa_system"),
        q("qa_deviation", "ob.shinrai.q.deviation_handling"),
        q("qa_change", "ob.shinrai.q.change_control"),
        q("qa_audit", "ob.shinrai.q.internal_audits"),
      ],
    },
    {
      key: "marketability",
      label: "ob.shinrai.axis.marketability",
      weight: 10,
      questions: [
        q("mkt_target", "ob.shinrai.q.target_markets"),
        q("mkt_regulatory", "ob.shinrai.q.regulatory_awareness"),
        q("mkt_labeling", "ob.shinrai.q.labeling_compliance"),
      ],
    },
  ],
  profileFields: [
    "company_name",
    "legal_form",
    "tax_id",
    "country",
    "address",
    "contact_person",
    "website",
  ],
  licensingFields: [
    "license_type",
    "license_number",
    "issuing_authority",
    "license_valid_from",
    "license_valid_until",
    "licensed_activities",
  ],
  facilityFields: [
    "facility_name",
    "facility_type",
    "total_area_sqm",
    "cultivation_area_sqm",
    "employee_count",
    "cleanroom_classes",
  ],
  serviceFields: [
    "product_catalog",
    "batch_tracking_method",
    "traceability_level",
  ],
};

// ──────────────────────────────────────────────
// IMPORTER
// ──────────────────────────────────────────────
const importerConfig: RoleConfig = {
  role: "importer",
  label: "ob.role.importer",
  icon: "Import",
  description: "ob.role.importer_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_licensing", needsNDA: false },
    { num: 3, label: "ob.step_operations", needsNDA: true },
    { num: 4, label: "ob.step_compliance", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "import_license", label: "ob.doc.import_license", required: true, step: 2 },
    { type: "narcotics_permit", label: "ob.doc.narcotics_permit", required: true, step: 2 },
    { type: "gdp_certificate", label: "ob.doc.gdp_cert", required: true, step: 2 },
    { type: "wholesale_license", label: "ob.doc.wholesale_license", required: false, step: 2 },
    { type: "warehouse_layout", label: "ob.doc.warehouse_layout", required: true, step: 3 },
    { type: "cold_chain_proof", label: "ob.doc.cold_chain_proof", required: false, step: 3 },
    { type: "quality_manual", label: "ob.doc.quality_manual", required: true, step: 4 },
    { type: "capa_process", label: "ob.doc.capa_process", required: false, step: 4 },
    { type: "insurance", label: "ob.doc.insurance", required: true, step: 4 },
  ],
  shinraiAxes: [
    {
      key: "documentation", label: "ob.shinrai.axis.documentation", weight: 20,
      questions: [
        q("doc_sop", "ob.shinrai.q.sop_current"),
        q("doc_records", "ob.shinrai.q.import_records"),
        q("doc_digital", "ob.shinrai.q.digital_system"),
        q("doc_regulatory", "ob.shinrai.q.regulatory_filing"),
      ],
    },
    {
      key: "facility", label: "ob.shinrai.axis.warehouse", weight: 20,
      questions: [
        q("fac_gdp", "ob.shinrai.q.gdp_compliant"),
        q("fac_cold", "ob.shinrai.q.cold_storage"),
        q("fac_security", "ob.shinrai.q.security_system"),
        q("fac_quarantine", "ob.shinrai.q.quarantine_area"),
      ],
    },
    {
      key: "staff", label: "ob.shinrai.axis.staff", weight: 15,
      questions: [
        q("staff_rp", "ob.shinrai.q.responsible_person"),
        q("staff_training", "ob.shinrai.q.training_plan"),
        q("staff_compliance", "ob.shinrai.q.compliance_team"),
      ],
    },
    {
      key: "supply_chain", label: "ob.shinrai.axis.supply_chain", weight: 20,
      questions: [
        q("sc_vendor", "ob.shinrai.q.vendor_qualification"),
        q("sc_traceability", "ob.shinrai.q.traceability"),
        q("sc_recall", "ob.shinrai.q.recall_procedure"),
        q("sc_returns", "ob.shinrai.q.returns_handling"),
      ],
    },
    {
      key: "quality", label: "ob.shinrai.axis.quality", weight: 15,
      questions: [
        q("qa_capa", "ob.shinrai.q.capa_system"),
        q("qa_complaints", "ob.shinrai.q.complaint_handling"),
        q("qa_coa_verify", "ob.shinrai.q.coa_verification"),
      ],
    },
    {
      key: "marketability", label: "ob.shinrai.axis.marketability", weight: 10,
      questions: [
        q("mkt_distribution", "ob.shinrai.q.distribution_network"),
        q("mkt_regulatory", "ob.shinrai.q.regulatory_awareness"),
      ],
    },
  ],
  profileFields: ["company_name", "legal_form", "tax_id", "country", "address", "contact_person", "website"],
  licensingFields: ["import_license_number", "narcotics_permit_number", "issuing_authority", "license_valid_from", "license_valid_until", "target_markets"],
  facilityFields: ["warehouse_name", "warehouse_type", "total_area_sqm", "cold_storage_capacity", "employee_count", "gdp_status"],
  serviceFields: ["target_products", "annual_import_volume", "distribution_channels"],
};

// ──────────────────────────────────────────────
// FARM — Thai GACP → EU-GACP Certification Readiness
// Based on: EU-GACP Guidelines, Thai FDA DTAM, Thai Cannabis Regulation 2025/2026
// Gap Analysis: Thai-GAP vs EU-GACP (compliance-ai/regulatory-docs/gacp-guidelines.md)
// ──────────────────────────────────────────────
const farmConfig: RoleConfig = {
  role: "farm",
  label: "ob.role.farm",
  icon: "Sprout",
  description: "ob.role.farm_desc",
  // ═══ STREAMLINED 3-STEP ONBOARDING (4-7 min, Apple-smooth) ═══
  // Detail-Erfassung (Personal, Facility, SOPs) → Dashboard nach Onboarding
  steps: [
    { num: 1, label: "ob.step_who_are_you", needsNDA: false },
    { num: 2, label: "ob.step_upload_docs", needsNDA: false },
    { num: 3, label: "ob.step_quick_check", needsNDA: false },
  ],
  documents: [
    // ── Step 2: Upload what you have, AI does the rest ──
    // GACP holders MUST upload certificate → escalation to Kevin if missing
    { type: "company_registration", label: "ob.doc.company_reg", required: false, step: 2 },
    { type: "cultivation_license", label: "ob.doc.cultivation_license", required: false, step: 2 },
    { type: "cannabis_license", label: "ob.doc.distribution_license", required: false, step: 2 },
    { type: "export_permit", label: "ob.doc.export_license", required: false, step: 2 },
    { type: "gacp_certificate", label: "ob.doc.gacp_cert", required: false, step: 2 },
    { type: "coa", label: "ob.doc.certificate_of_analysis", required: false, step: 2 },
    { type: "facility_photo", label: "ob.doc.facility_photos", required: false, step: 2 },
  ],
  shinraiAxes: [
    // ═══ QUICK-CHECK: 6 core questions instead of 30 ═══
    {
      key: "cultivation", label: "ob.shinrai.axis.cultivation_excellence", weight: 25,
      questions: [
        q("fac_gacp", "ob.shinrai.q.gacp_compliance"),
      ],
    },
    {
      key: "post_harvest", label: "ob.shinrai.axis.post_harvest_integrity", weight: 25,
      questions: [
        q("ph_drying", "ob.shinrai.q.validated_drying_18_22c_45_55rh"),
        q("ph_storage", "ob.shinrai.q.gdp_storage_15_25c_60rh"),
      ],
    },
    {
      key: "documentation", label: "ob.shinrai.axis.alcoa_documentation", weight: 25,
      questions: [
        q("doc_batch_records", "ob.shinrai.q.complete_batch_records"),
      ],
    },
    {
      key: "quality_testing", label: "ob.shinrai.axis.quality_testing", weight: 15,
      questions: [
        q("qa_lab_accredited", "ob.shinrai.q.iso17025_accredited_lab"),
      ],
    },
    {
      key: "personnel", label: "ob.shinrai.axis.personnel_training", weight: 10,
      questions: [
        q("staff_trained", "ob.shinrai.q.gacp_gmp_basics_trained"),
      ],
    },
  ],
  profileFields: [
    "company_name", "legal_form", "tax_id", "country", "address", "contact_person",
    "website",
  ],
  licensingFields: [],
  facilityFields: [],
  serviceFields: [],
};

// ──────────────────────────────────────────────
// LAB PROVIDER
// ──────────────────────────────────────────────
const labConfig: RoleConfig = {
  role: "lab_provider",
  label: "ob.role.lab",
  icon: "FlaskConical",
  description: "ob.role.lab_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_accreditation", needsNDA: false },
    { num: 3, label: "ob.step_lab_capabilities", needsNDA: true },
    { num: 4, label: "ob.step_methods", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "iso17025_certificate", label: "ob.doc.iso17025", required: true, step: 2 },
    { type: "accreditation_scope", label: "ob.doc.accreditation_scope", required: true, step: 2 },
    { type: "lab_layout", label: "ob.doc.lab_layout", required: true, step: 3 },
    { type: "equipment_list", label: "ob.doc.equipment_list", required: true, step: 3 },
    { type: "method_validation", label: "ob.doc.method_validation", required: false, step: 4 },
    { type: "proficiency_test", label: "ob.doc.proficiency_test", required: false, step: 4 },
    { type: "sample_coa", label: "ob.doc.sample_coa", required: true, step: 4 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.documentation", weight: 20, questions: [q("doc_sop", "ob.shinrai.q.sop_current"), q("doc_records", "ob.shinrai.q.test_records"), q("doc_lims", "ob.shinrai.q.lims_system")] },
    { key: "facility", label: "ob.shinrai.axis.lab_facility", weight: 25, questions: [q("fac_iso", "ob.shinrai.q.iso17025_status"), q("fac_calibration", "ob.shinrai.q.calibration_program"), q("fac_environment", "ob.shinrai.q.lab_env_control"), q("fac_sample", "ob.shinrai.q.sample_handling")] },
    { key: "staff", label: "ob.shinrai.axis.staff", weight: 15, questions: [q("staff_qualification", "ob.shinrai.q.analyst_qualification"), q("staff_training", "ob.shinrai.q.training_plan")] },
    { key: "supply_chain", label: "ob.shinrai.axis.testing", weight: 20, questions: [q("test_cannabinoids", "ob.shinrai.q.cannabinoid_testing"), q("test_contaminants", "ob.shinrai.q.contaminant_testing"), q("test_micro", "ob.shinrai.q.micro_testing"), q("test_heavy_metals", "ob.shinrai.q.heavy_metal_testing")] },
    { key: "quality", label: "ob.shinrai.axis.quality", weight: 15, questions: [q("qa_uncertainty", "ob.shinrai.q.measurement_uncertainty"), q("qa_proficiency", "ob.shinrai.q.proficiency_testing")] },
    { key: "marketability", label: "ob.shinrai.axis.marketability", weight: 5, questions: [q("mkt_turnaround", "ob.shinrai.q.turnaround_time"), q("mkt_coverage", "ob.shinrai.q.geographic_coverage")] },
  ],
  profileFields: ["company_name", "legal_form", "tax_id", "country", "address", "contact_person", "website"],
  licensingFields: ["iso17025_number", "accreditation_body", "accreditation_valid_until", "accredited_methods"],
  facilityFields: ["lab_name", "lab_type", "total_area_sqm", "num_instruments", "employee_count"],
  serviceFields: ["test_catalog", "turnaround_days", "sample_types_accepted"],
};

// ──────────────────────────────────────────────
// LOGISTICS
// ──────────────────────────────────────────────
const logisticsConfig: RoleConfig = {
  role: "logistics",
  label: "ob.role.logistics",
  icon: "Truck",
  description: "ob.role.logistics_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_licensing", needsNDA: false },
    { num: 3, label: "ob.step_fleet", needsNDA: true },
    { num: 4, label: "ob.step_compliance", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "gdp_certificate", label: "ob.doc.gdp_cert", required: true, step: 2 },
    { type: "carrier_license", label: "ob.doc.carrier_license", required: true, step: 2 },
    { type: "narcotics_transport", label: "ob.doc.narcotics_transport", required: true, step: 2 },
    { type: "fleet_list", label: "ob.doc.fleet_list", required: true, step: 3 },
    { type: "temperature_log", label: "ob.doc.temperature_log", required: false, step: 3 },
    { type: "route_map", label: "ob.doc.route_map", required: false, step: 3 },
    { type: "insurance", label: "ob.doc.cargo_insurance", required: true, step: 4 },
    { type: "quality_manual", label: "ob.doc.quality_manual", required: false, step: 4 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.documentation", weight: 15, questions: [q("doc_sop", "ob.shinrai.q.sop_current"), q("doc_records", "ob.shinrai.q.shipment_records")] },
    { key: "facility", label: "ob.shinrai.axis.fleet", weight: 25, questions: [q("fac_gdp", "ob.shinrai.q.gdp_vehicles"), q("fac_cold", "ob.shinrai.q.cold_chain"), q("fac_tracking", "ob.shinrai.q.gps_tracking"), q("fac_security", "ob.shinrai.q.cargo_security")] },
    { key: "staff", label: "ob.shinrai.axis.staff", weight: 15, questions: [q("staff_training", "ob.shinrai.q.driver_training"), q("staff_background", "ob.shinrai.q.background_checks")] },
    { key: "supply_chain", label: "ob.shinrai.axis.operations", weight: 25, questions: [q("sc_routing", "ob.shinrai.q.route_validation"), q("sc_handoff", "ob.shinrai.q.chain_of_custody"), q("sc_temperature", "ob.shinrai.q.temp_monitoring"), q("sc_customs", "ob.shinrai.q.customs_handling")] },
    { key: "quality", label: "ob.shinrai.axis.quality", weight: 15, questions: [q("qa_deviation", "ob.shinrai.q.deviation_handling"), q("qa_incident", "ob.shinrai.q.incident_response")] },
    { key: "marketability", label: "ob.shinrai.axis.marketability", weight: 5, questions: [q("mkt_coverage", "ob.shinrai.q.geographic_coverage"), q("mkt_capacity", "ob.shinrai.q.volume_capacity")] },
  ],
  profileFields: ["company_name", "legal_form", "tax_id", "country", "address", "contact_person", "website"],
  licensingFields: ["carrier_license_number", "gdp_cert_number", "issuing_authority", "license_valid_until", "routes_covered"],
  facilityFields: ["warehouse_name", "fleet_size", "cold_chain_vehicles", "total_capacity_cbm"],
  serviceFields: ["service_types", "coverage_countries", "avg_transit_days"],
};

// ──────────────────────────────────────────────
// AUDITOR
// ──────────────────────────────────────────────
const auditorConfig: RoleConfig = {
  role: "auditor",
  label: "ob.role.auditor",
  icon: "ClipboardCheck",
  description: "ob.role.auditor_desc",
  steps: [
    { num: 1, label: "ob.step_profile", needsNDA: false },
    { num: 2, label: "ob.step_qualifications", needsNDA: false },
    { num: 3, label: "ob.step_experience", needsNDA: true },
    { num: 4, label: "ob.step_specialization", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "cv_resume", label: "ob.doc.cv", required: true, step: 1 },
    { type: "auditor_certification", label: "ob.doc.auditor_cert", required: true, step: 2 },
    { type: "gmp_auditor_cert", label: "ob.doc.gmp_auditor", required: false, step: 2 },
    { type: "gacp_auditor_cert", label: "ob.doc.gacp_auditor", required: false, step: 2 },
    { type: "iso_lead_auditor", label: "ob.doc.iso_lead_auditor", required: false, step: 2 },
    { type: "audit_report_sample", label: "ob.doc.sample_report", required: true, step: 3 },
    { type: "reference_letter", label: "ob.doc.reference_letter", required: false, step: 3 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.methodology", weight: 20, questions: [q("doc_methodology", "ob.shinrai.q.audit_methodology"), q("doc_reporting", "ob.shinrai.q.report_quality")] },
    { key: "facility", label: "ob.shinrai.axis.expertise", weight: 25, questions: [q("exp_gmp", "ob.shinrai.q.gmp_expertise"), q("exp_gacp", "ob.shinrai.q.gacp_expertise"), q("exp_cannabis", "ob.shinrai.q.cannabis_specific")] },
    { key: "staff", label: "ob.shinrai.axis.credentials", weight: 25, questions: [q("cred_formal", "ob.shinrai.q.formal_qualification"), q("cred_cpd", "ob.shinrai.q.cpd_hours"), q("cred_language", "ob.shinrai.q.language_skills")] },
    { key: "supply_chain", label: "ob.shinrai.axis.experience", weight: 15, questions: [q("exp_audits_yr", "ob.shinrai.q.audits_per_year"), q("exp_international", "ob.shinrai.q.international_exp")] },
    { key: "quality", label: "ob.shinrai.axis.integrity", weight: 10, questions: [q("qa_independence", "ob.shinrai.q.independence"), q("qa_conflict", "ob.shinrai.q.conflict_policy")] },
    { key: "marketability", label: "ob.shinrai.axis.availability", weight: 5, questions: [q("mkt_availability", "ob.shinrai.q.availability"), q("mkt_travel", "ob.shinrai.q.travel_readiness")] },
  ],
  profileFields: ["full_name", "nationality", "country", "address", "contact_email", "contact_phone", "website"],
  licensingFields: ["auditor_cert_number", "certifying_body", "cert_valid_until", "audit_standards"],
  facilityFields: ["years_experience", "total_audits_conducted", "specialization_areas", "languages"],
  serviceFields: ["audit_types_offered", "availability_days_per_month", "day_rate_range"],
};

// ──────────────────────────────────────────────
// INSPECTOR
// ──────────────────────────────────────────────
const inspectorConfig: RoleConfig = {
  role: "inspector",
  label: "ob.role.inspector",
  icon: "BadgeCheck",
  description: "ob.role.inspector_desc",
  steps: [
    { num: 1, label: "ob.step_profile", needsNDA: false },
    { num: 2, label: "ob.step_authority", needsNDA: false },
    { num: 3, label: "ob.step_jurisdiction", needsNDA: true },
    { num: 4, label: "ob.step_capabilities", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "government_id", label: "ob.doc.gov_id", required: true, step: 1 },
    { type: "authority_badge", label: "ob.doc.authority_badge", required: true, step: 2 },
    { type: "appointment_letter", label: "ob.doc.appointment_letter", required: true, step: 2 },
    { type: "jurisdiction_proof", label: "ob.doc.jurisdiction_proof", required: true, step: 3 },
    { type: "inspection_manual", label: "ob.doc.inspection_manual", required: false, step: 4 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.methodology", weight: 20, questions: [q("doc_checklist", "ob.shinrai.q.inspection_checklist"), q("doc_reporting", "ob.shinrai.q.report_quality")] },
    { key: "facility", label: "ob.shinrai.axis.authority", weight: 30, questions: [q("auth_mandate", "ob.shinrai.q.legal_mandate"), q("auth_scope", "ob.shinrai.q.inspection_scope"), q("auth_enforcement", "ob.shinrai.q.enforcement_power")] },
    { key: "staff", label: "ob.shinrai.axis.credentials", weight: 20, questions: [q("cred_training", "ob.shinrai.q.inspector_training"), q("cred_specialization", "ob.shinrai.q.cannabis_specialization")] },
    { key: "supply_chain", label: "ob.shinrai.axis.process", weight: 15, questions: [q("proc_frequency", "ob.shinrai.q.inspection_frequency"), q("proc_follow_up", "ob.shinrai.q.follow_up_process")] },
    { key: "quality", label: "ob.shinrai.axis.integrity", weight: 10, questions: [q("qa_impartiality", "ob.shinrai.q.impartiality"), q("qa_confidentiality", "ob.shinrai.q.confidentiality")] },
    { key: "marketability", label: "ob.shinrai.axis.coverage", weight: 5, questions: [q("mkt_jurisdictions", "ob.shinrai.q.jurisdictions_covered")] },
  ],
  profileFields: ["full_name", "nationality", "country", "authority_name", "contact_email", "contact_phone"],
  licensingFields: ["badge_number", "appointing_authority", "appointment_date", "jurisdiction_type"],
  facilityFields: ["jurisdiction_region", "inspection_types", "facility_types_covered"],
  serviceFields: ["inspection_frequency", "languages", "digital_tools_used"],
};

// ──────────────────────────────────────────────
// SHOP (Dispensary)
// ──────────────────────────────────────────────
const shopConfig: RoleConfig = {
  role: "shop",
  label: "ob.role.shop",
  icon: "Store",
  description: "ob.role.shop_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_licensing", needsNDA: false },
    { num: 3, label: "ob.step_store", needsNDA: true },
    { num: 4, label: "ob.step_compliance", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "retail_license", label: "ob.doc.retail_license", required: true, step: 2 },
    { type: "dispensary_permit", label: "ob.doc.dispensary_permit", required: true, step: 2 },
    { type: "store_layout", label: "ob.doc.store_layout", required: true, step: 3 },
    { type: "store_photo", label: "ob.doc.store_photo", required: false, step: 3 },
    { type: "pos_system_proof", label: "ob.doc.pos_system", required: false, step: 3 },
    { type: "staff_training_records", label: "ob.doc.staff_training", required: false, step: 4 },
    { type: "insurance", label: "ob.doc.insurance", required: true, step: 4 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.documentation", weight: 15, questions: [q("doc_inventory", "ob.shinrai.q.inventory_system"), q("doc_records", "ob.shinrai.q.sales_records")] },
    { key: "facility", label: "ob.shinrai.axis.store", weight: 25, questions: [q("fac_layout", "ob.shinrai.q.store_layout"), q("fac_storage", "ob.shinrai.q.storage_conditions"), q("fac_security", "ob.shinrai.q.security_system"), q("fac_access", "ob.shinrai.q.access_control")] },
    { key: "staff", label: "ob.shinrai.axis.staff", weight: 20, questions: [q("staff_pharmacist", "ob.shinrai.q.pharmacist_present"), q("staff_training", "ob.shinrai.q.staff_trained"), q("staff_age_verify", "ob.shinrai.q.age_verification")] },
    { key: "supply_chain", label: "ob.shinrai.axis.sourcing", weight: 15, questions: [q("sc_verified", "ob.shinrai.q.verified_suppliers"), q("sc_traceability", "ob.shinrai.q.product_traceability")] },
    { key: "quality", label: "ob.shinrai.axis.quality", weight: 15, questions: [q("qa_recalls", "ob.shinrai.q.recall_procedure"), q("qa_complaints", "ob.shinrai.q.complaint_handling")] },
    { key: "marketability", label: "ob.shinrai.axis.marketability", weight: 10, questions: [q("mkt_locations", "ob.shinrai.q.num_locations"), q("mkt_online", "ob.shinrai.q.online_presence")] },
  ],
  profileFields: ["company_name", "legal_form", "tax_id", "country", "address", "contact_person", "website"],
  licensingFields: ["retail_license_number", "dispensary_permit_number", "issuing_authority", "license_valid_until"],
  facilityFields: ["store_name", "store_type", "total_area_sqm", "num_locations", "opening_hours"],
  serviceFields: ["product_categories", "monthly_customers", "delivery_available"],
};

// ──────────────────────────────────────────────
// PHARMACY
// ──────────────────────────────────────────────
const pharmacyConfig: RoleConfig = {
  role: "pharmacy",
  label: "ob.role.pharmacy",
  icon: "Pill",
  description: "ob.role.pharmacy_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_licensing", needsNDA: false },
    { num: 3, label: "ob.step_pharmacy_ops", needsNDA: true },
    { num: 4, label: "ob.step_compliance", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "pharmacy_license", label: "ob.doc.pharmacy_license", required: true, step: 2 },
    { type: "narcotics_handling", label: "ob.doc.narcotics_handling", required: true, step: 2 },
    { type: "pharmacist_cert", label: "ob.doc.pharmacist_cert", required: true, step: 2 },
    { type: "pharmacy_layout", label: "ob.doc.pharmacy_layout", required: true, step: 3 },
    { type: "safe_storage_proof", label: "ob.doc.safe_storage", required: true, step: 3 },
    { type: "prescription_system", label: "ob.doc.prescription_system", required: false, step: 3 },
    { type: "quality_manual", label: "ob.doc.quality_manual", required: false, step: 4 },
    { type: "insurance", label: "ob.doc.insurance", required: true, step: 4 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.documentation", weight: 20, questions: [q("doc_prescription", "ob.shinrai.q.prescription_records"), q("doc_narcotics", "ob.shinrai.q.narcotics_ledger"), q("doc_sop", "ob.shinrai.q.sop_current")] },
    { key: "facility", label: "ob.shinrai.axis.pharmacy", weight: 25, questions: [q("fac_safe", "ob.shinrai.q.narcotics_safe"), q("fac_storage", "ob.shinrai.q.storage_conditions"), q("fac_dispensing", "ob.shinrai.q.dispensing_area")] },
    { key: "staff", label: "ob.shinrai.axis.staff", weight: 20, questions: [q("staff_pharmacist", "ob.shinrai.q.licensed_pharmacist"), q("staff_training", "ob.shinrai.q.cannabis_training"), q("staff_consultation", "ob.shinrai.q.patient_consultation")] },
    { key: "supply_chain", label: "ob.shinrai.axis.supply_chain", weight: 15, questions: [q("sc_verified", "ob.shinrai.q.verified_suppliers"), q("sc_cold_chain", "ob.shinrai.q.cold_chain"), q("sc_returns", "ob.shinrai.q.returns_handling")] },
    { key: "quality", label: "ob.shinrai.axis.quality", weight: 15, questions: [q("qa_adverse", "ob.shinrai.q.adverse_event_reporting"), q("qa_recalls", "ob.shinrai.q.recall_procedure")] },
    { key: "marketability", label: "ob.shinrai.axis.marketability", weight: 5, questions: [q("mkt_patients", "ob.shinrai.q.patient_volume"), q("mkt_prescribers", "ob.shinrai.q.prescriber_network")] },
  ],
  profileFields: ["company_name", "legal_form", "tax_id", "country", "address", "contact_person", "website"],
  licensingFields: ["pharmacy_license_number", "narcotics_permit_number", "lead_pharmacist_name", "pharmacist_registration", "license_valid_until"],
  facilityFields: ["pharmacy_name", "pharmacy_type", "total_area_sqm", "num_branches", "opening_hours"],
  serviceFields: ["cannabis_products_offered", "monthly_prescriptions", "compounding_available"],
};

// ──────────────────────────────────────────────
// TRADER
// ──────────────────────────────────────────────
const traderConfig: RoleConfig = {
  role: "trader",
  label: "ob.role.trader",
  icon: "ArrowRightLeft",
  description: "ob.role.trader_desc",
  steps: [
    { num: 1, label: "ob.step_company", needsNDA: false },
    { num: 2, label: "ob.step_licensing", needsNDA: false },
    { num: 3, label: "ob.step_trade_ops", needsNDA: true },
    { num: 4, label: "ob.step_compliance", needsNDA: true },
    { num: 5, label: "ob.step_shinrai", needsNDA: true },
  ],
  documents: [
    { type: "company_registration", label: "ob.doc.company_reg", required: true, step: 1 },
    { type: "trade_license", label: "ob.doc.trade_license", required: true, step: 2 },
    { type: "narcotics_permit", label: "ob.doc.narcotics_permit", required: false, step: 2 },
    { type: "bank_reference", label: "ob.doc.bank_reference", required: true, step: 2 },
    { type: "trade_references", label: "ob.doc.trade_references", required: false, step: 3 },
    { type: "aml_policy", label: "ob.doc.aml_policy", required: true, step: 4 },
    { type: "insurance", label: "ob.doc.insurance", required: true, step: 4 },
  ],
  shinraiAxes: [
    { key: "documentation", label: "ob.shinrai.axis.documentation", weight: 20, questions: [q("doc_contracts", "ob.shinrai.q.contract_management"), q("doc_records", "ob.shinrai.q.trade_records"), q("doc_compliance", "ob.shinrai.q.compliance_docs")] },
    { key: "facility", label: "ob.shinrai.axis.infrastructure", weight: 15, questions: [q("fac_office", "ob.shinrai.q.office_setup"), q("fac_systems", "ob.shinrai.q.trade_systems")] },
    { key: "staff", label: "ob.shinrai.axis.staff", weight: 15, questions: [q("staff_compliance", "ob.shinrai.q.compliance_officer"), q("staff_experience", "ob.shinrai.q.trade_experience")] },
    { key: "supply_chain", label: "ob.shinrai.axis.trade_ops", weight: 25, questions: [q("sc_sourcing", "ob.shinrai.q.sourcing_process"), q("sc_due_diligence", "ob.shinrai.q.due_diligence"), q("sc_payment", "ob.shinrai.q.payment_security"), q("sc_logistics", "ob.shinrai.q.logistics_management")] },
    { key: "quality", label: "ob.shinrai.axis.quality", weight: 15, questions: [q("qa_product_verify", "ob.shinrai.q.product_verification"), q("qa_disputes", "ob.shinrai.q.dispute_resolution")] },
    { key: "marketability", label: "ob.shinrai.axis.marketability", weight: 10, questions: [q("mkt_volume", "ob.shinrai.q.trade_volume"), q("mkt_markets", "ob.shinrai.q.markets_served"), q("mkt_reputation", "ob.shinrai.q.market_reputation")] },
  ],
  profileFields: ["company_name", "legal_form", "tax_id", "country", "address", "contact_person", "website"],
  licensingFields: ["trade_license_number", "issuing_authority", "license_valid_until", "permitted_substances"],
  facilityFields: ["office_location", "num_employees", "annual_trade_volume_kg", "markets_active"],
  serviceFields: ["product_focus", "trade_routes", "payment_terms_offered"],
};

// ──────────────────────────────────────────────
// EXPORT MAP
// ──────────────────────────────────────────────
export const ROLE_CONFIGS: Record<OnboardingRole, RoleConfig> = {
  exporter: exporterConfig,
  importer: importerConfig,
  farm: farmConfig,
  lab_provider: labConfig,
  logistics: logisticsConfig,
  auditor: auditorConfig,
  inspector: inspectorConfig,
  shop: shopConfig,
  pharmacy: pharmacyConfig,
  trader: traderConfig,
};

export const ALL_ONBOARDING_ROLES: OnboardingRole[] = Object.keys(ROLE_CONFIGS) as OnboardingRole[];

/** Get role config, throws if not found */
export function getRoleConfig(role: OnboardingRole): RoleConfig {
  const cfg = ROLE_CONFIGS[role];
  if (!cfg) throw new Error(`Unknown onboarding role: ${role}`);
  return cfg;
}
