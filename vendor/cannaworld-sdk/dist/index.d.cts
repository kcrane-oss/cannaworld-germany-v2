interface ApiResult<T> {
    data: T | null;
    error: string | null;
}
type JsonRecord = Record<string, unknown>;
declare const toErrorMessage: (error: unknown, fallback?: string) => string;
declare const getPayloadError: (payload: unknown) => string | null;
declare const readResponseError: (response: Response, fallback?: string) => Promise<string>;

interface SupabaseInvokeResult<T = unknown> {
    data: T | null;
    error: {
        message?: string;
    } | null;
}
interface SupabaseFunctionsClient {
    invoke<T = unknown>(functionName: string, options?: {
        body?: Record<string, unknown>;
    }): Promise<SupabaseInvokeResult<T>>;
}
interface SupabaseClientLike {
    functions: SupabaseFunctionsClient;
}
declare const setSupabaseClient: (client: SupabaseClientLike) => void;
declare const getSupabaseClient: () => SupabaseClientLike;

interface MarketplaceBatch {
    id: string;
    batch_number: string;
    product: string;
    strain: string;
    category: string;
    certification: string;
    thc: number;
    cbd: number;
    quantity: number;
    unit: string;
    origin: string;
    target_markets: string[];
    status: string;
    price: number;
    compliance_score: string;
    image_url: string | null;
    created_at: string;
}
interface MarketplaceStats {
    total_batches: number;
    listed_batches: number;
    total_exporters: number;
    categories: Record<string, number>;
    certifications: Record<string, number>;
}
interface MarketplaceOrder {
    id?: string;
    order_id?: string;
    status: string;
    [key: string]: unknown;
}
interface SyncEnvelope {
    success: boolean;
    ai_cert_sync?: JsonRecord;
    audit_entry?: JsonRecord;
}
/** List batches from the marketplace */
declare function listMarketplaceBatches(filters?: {
    status?: string;
    category?: string;
    certification?: string;
    market?: string;
    limit?: number;
    offset?: number;
}): Promise<ApiResult<{
    batches: MarketplaceBatch[];
    count: number;
}>>;
/** Get a single batch detail */
declare function getMarketplaceBatch(batchId: string): Promise<ApiResult<MarketplaceBatch>>;
/** Get marketplace KPIs */
declare function getMarketplaceStats(): Promise<ApiResult<MarketplaceStats>>;
/** Create an order for a batch */
declare function createMarketplaceOrder(batchId: string, quantity: number, notes?: string): Promise<ApiResult<{
    order_id: string;
    status: string;
}>>;
/** Update order status */
declare function updateMarketplaceOrder(orderId: string, status: string): Promise<ApiResult<{
    order: MarketplaceOrder;
}>>;
/** Check marketplace health */
declare function checkMarketplaceHealth(): Promise<ApiResult<{
    connected: boolean;
}>>;
/** Push audit sync event to marketplace */
declare function auditSync(params: {
    batch_id: string;
    event_type: string;
    old_status?: string;
    new_status?: string;
    details?: string;
}): Promise<ApiResult<SyncEnvelope>>;
/** Send cross-project notification */
declare function notifySync(params: {
    title: string;
    message: string;
    target_user_email?: string;
    type?: string;
    link?: string;
}): Promise<ApiResult<{
    success: boolean;
}>>;
/** Check cross-project connection status */
declare function checkConnectionStatus(): Promise<ApiResult<{
    platform: string;
    timestamp: string;
    connections: Record<string, {
        status: string;
        [key: string]: unknown;
    }>;
}>>;
/** Verify certificate via marketplace → AI Cert */
declare function verifyCertificateViaMarketplace(certificateNumber: string): Promise<ApiResult<{
    verified: boolean;
    certificate: JsonRecord;
}>>;
/** Push regulatory alert to marketplace */
declare function regulatorySync(params: {
    title: string;
    country_code: string;
    country_name?: string;
    severity?: string;
    change_type?: string;
    description?: string;
}): Promise<ApiResult<SyncEnvelope>>;
/** Push compliance score change */
declare function complianceSync(params: {
    batch_id: string;
    batch_number?: string;
    old_score?: string;
    new_score: string;
    details?: string;
}): Promise<ApiResult<SyncEnvelope>>;
/** Query audit data from AI Cert via marketplace */
declare function auditQuery(subAction: string, params?: {
    audit_id?: string;
    company_id?: string;
}): Promise<ApiResult<JsonRecord>>;

interface MarketAnalysisResult {
    results?: Array<{
        country_code: string;
        country_name: string;
        exportable: boolean;
        status: "green" | "yellow" | "red";
        reasons: string[];
        notes: string;
        region: string;
    }>;
}
interface RegulatoryUpdate {
    id?: string;
    title: string;
    country_code?: string;
    country_name?: string;
    severity?: string;
    change_type?: string;
    description?: string;
    source?: string;
    category?: string;
    created_at?: string;
    source_platform?: string;
}
declare const analyzeTargetMarkets: (batch: {
    thc: number;
    cbd: number;
    certification: string;
    category: string;
    strain?: string;
    product?: string;
    origin?: string;
}) => Promise<ApiResult<MarketAnalysisResult>>;
declare const getRegulations: () => Promise<ApiResult<{
    regulations: Record<string, JsonRecord>;
}>>;
declare const runRegulatoryAiScan: () => Promise<ApiResult<{
    alerts: RegulatoryUpdate[];
}>>;
declare const getRegulatoryUpdates$1: () => Promise<ApiResult<{
    updates: RegulatoryUpdate[];
}>>;

interface AggregatedRegulatory {
    ai_cert: JsonRecord;
    marketplace: JsonRecord;
    combined: RegulatoryUpdate[];
}
declare const aggregateRegulatoryUpdates: () => Promise<ApiResult<AggregatedRegulatory>>;
declare const syncRegulatoryAlert: (alert: {
    title: string;
    country_code: string;
    country_name?: string;
    severity?: string;
    change_type?: string;
    description?: string;
}) => Promise<ApiResult<{
    success: boolean;
}>>;
/** Get regulatory updates from a specific source */
declare const getRegulatoryUpdates: (source: "ai-cert" | "marketplace") => Promise<ApiResult<{
    updates: RegulatoryUpdate[];
}>>;
/** Trigger AI scan via AI Cert */
declare const triggerAiCertScan: () => Promise<ApiResult<{
    updates: RegulatoryUpdate[];
    stored: boolean;
}>>;
/** Trigger AI scan via Marketplace */
declare const triggerMarketplaceScan: () => Promise<ApiResult<{
    alerts: RegulatoryUpdate[];
    stored: number;
}>>;

type BatchStatus = "draft" | "document_review" | "pre_export_check" | "approved" | "listed" | "sold" | "in_export" | "completed" | "ai_dossier_in_progress" | "dossier_blocked" | "ready_for_thai_rp_release" | "thai_rp_released" | "ready_for_thai_export_permit" | "thai_export_permit_issued" | "ready_for_customs_out" | "customs_out_cleared" | "in_transit_air" | "transit_anomaly" | "arrived_destination_airport" | "ready_for_eu_intake" | "eu_intake_received" | "intake_rejected" | "ready_for_eu_post_harvest" | "eu_post_harvest_in_progress" | "eu_post_harvest_completed" | "ready_for_eu_qp_release" | "eu_qp_released" | "eu_qp_rejected" | "ready_for_gdp_dispatch" | "in_transit_to_wholesale_hub" | "arrived_at_wholesale_hub" | "stored_at_wholesale_hub" | "ready_for_pharmacy_dispatch" | "in_transit_to_pharmacy" | "received_at_pharmacy" | "ready_for_patient_dispense" | "dispensed" | "quarantined" | "rejected" | "recall_initiated" | "recall_in_progress" | "recall_completed";
declare const QP_INBOX_THAI: BatchStatus[];
declare const QP_INBOX_EU: BatchStatus[];
declare const EU_INTAKE_INBOX: BatchStatus[];
declare const POST_HARVEST_INBOX: BatchStatus[];
declare const WHOLESALE_HUB_INBOX: BatchStatus[];
declare const PHARMACY_RECEIVE_INBOX: BatchStatus[];
declare const PHARMACY_DISPENSE_INBOX: BatchStatus[];
declare const RECALL_ACTIVE: BatchStatus[];
declare const MARKETPLACE_LISTABLE: BatchStatus[];
type GxpActorRole = "system" | "cultivator" | "thai_rp" | "thai_fda" | "customs_broker_thai" | "carrier_qa" | "customs_broker_eu" | "eu_wholesaler_rp" | "eu_gmp_manufacturer_qa" | "eu_qp_annex16" | "pharmacist" | "admin";
interface BatchStatusHistoryRow {
    id: string;
    batch_id: string;
    from_status: BatchStatus | null;
    to_status: BatchStatus;
    transition_mode: "auto" | "human";
    actor_user_id: string | null;
    actor_role: GxpActorRole | null;
    actor_credential_ref: string | null;
    trigger_source: string;
    evidence_refs: Array<{
        kind: string;
        id?: string;
        [k: string]: unknown;
    }>;
    gxp_signature_id: string | null;
    chain_event_id: string | null;
    decision_rationale: string | null;
    transitioned_at: string;
    prev_history_id: string | null;
    row_hash: string;
}
interface GxpSignatureRow {
    id: string;
    signer_user_id: string;
    signer_role: GxpActorRole;
    signer_credential_ref: string;
    signature_kind: string;
    signature_payload_hash: string;
    sca_method: "totp" | "webauthn" | "smart_card";
    sca_proof_verified_at: string | null;
    signed_text: string;
    signed_ip: string | null;
    signed_user_agent: string | null;
    status: "pending" | "completed" | "failed" | "voided";
    expires_at: string | null;
    created_at: string;
}
interface GxpCredentialRow {
    id: string;
    user_id: string;
    role: GxpActorRole;
    full_name: string;
    credential_ref: string;
    credential_issuer: string;
    credential_valid_from: string;
    credential_valid_until: string | null;
    evidence_document_id: string | null;
    status: "active" | "suspended" | "revoked" | "expired";
    scope: Record<string, unknown>;
    registered_by: string | null;
    registered_at: string;
    revoked_at: string | null;
    revocation_reason: string | null;
}
interface QpReleaseRow {
    id: string;
    batch_id: string;
    role: "thai_rp" | "eu_qp_annex16" | "eu_gmp_manufacturer_qa";
    qp_user_id: string;
    qp_full_name: string;
    qp_credential_ref: string;
    qp_credential_issuer: string;
    qp_credential_valid_until: string | null;
    decision: "release" | "reject" | "quarantine";
    decision_rationale: string | null;
    annex16_certificate_no: string | null;
    annex16_dossier_refs: Array<{
        kind: string;
        id: string;
    }>;
    annex16_third_country_assessment: string | null;
    annex16_specifications_met: boolean | null;
    annex16_handover_statement: string | null;
    gxp_signature_id: string;
    signed_at: string;
    signed_ip: string | null;
    signed_user_agent: string | null;
    release_hash: string;
    supply_chain_event_id: string | null;
    created_at: string;
}
interface EuIntakeReceiptRow {
    id: string;
    batch_id: string;
    transport_leg_id: string | null;
    receiving_facility_id: string | null;
    receiving_facility_gln: string | null;
    receiving_facility_bfarm_no: string;
    receiver_user_id: string;
    receiver_role: "eu_wholesaler_rp" | "eu_gmp_manufacturer_qa" | "admin";
    receiver_credential_ref: string;
    received_at: string;
    identity_check_pass: boolean;
    quantity_check_pass: boolean;
    packaging_integrity_pass: boolean;
    seal_integrity_pass: boolean;
    temperature_log_pass: boolean;
    documentation_complete: boolean;
    decision: "accept" | "reject" | "conditional" | "quarantine";
    decision_rationale: string | null;
    post_harvest_required: boolean;
    post_harvest_facility_id: string | null;
    post_harvest_eu_gmp_license_no: string | null;
    gxp_signature_id: string;
    signed_ip: string | null;
    created_at: string;
}
interface PharmacyReceiptRow {
    id: string;
    batch_id: string;
    transport_leg_id: string | null;
    pharmacy_id: string | null;
    pharmacy_license_no: string;
    pharmacy_dms_id: string | null;
    pharmacist_user_id: string;
    pharmacist_chamber_id: string;
    securpharm_verification_id: string | null;
    securpharm_decommission_status: "verified_active" | "verified_inactive" | "alert" | "unknown" | "skipped_btm" | null;
    securpharm_alert_no: string | null;
    identity_check_pass: boolean;
    quantity_check_pass: boolean;
    packaging_integrity_pass: boolean;
    temperature_log_pass: boolean;
    decision: "accept" | "reject" | "partial";
    rejection_reason: string | null;
    received_units: number | null;
    accepted_units: number | null;
    rejected_units: number | null;
    gxp_signature_id: string;
    received_at: string;
    created_at: string;
}
interface PharmacyDispenseRow {
    id: string;
    batch_id: string;
    pharmacy_receipt_id: string | null;
    pharmacist_user_id: string;
    pharmacist_chamber_id: string;
    dispensed_at: string;
    btm_prescription_no_hash: string;
    prescribing_doctor_id_hash: string | null;
    patient_pseudonym: string | null;
    dispensed_quantity_units: number;
    dispensed_quantity_g: number | null;
    securpharm_decommission_id: string | null;
    contraindication_check_performed: boolean;
    patient_counseling_documented: boolean;
    gxp_signature_id: string;
    created_at: string;
}
interface SampleRetentionRow {
    id: string;
    batch_id: string;
    deposited_by_user_id: string;
    deposited_by_role: GxpActorRole;
    deposited_by_credential_ref: string;
    sample_type: "reference" | "retention" | "reserve";
    quantity_g: number;
    containers_count: number;
    storage_facility_id: string | null;
    storage_facility_gln: string | null;
    storage_zone: string;
    storage_temperature_c: number | null;
    storage_humidity_pct: number | null;
    storage_location_code: string | null;
    retention_until: string;
    earliest_disposal_at: string | null;
    expiry_basis: string | null;
    status: "stored" | "in_use" | "consumed" | "disposed" | "lost" | "destroyed";
    gxp_signature_id: string;
    deposited_at: string;
    consumed_for: string | null;
    disposal_record_id: string | null;
    disposed_at: string | null;
    notes: string | null;
    created_at: string;
}
interface BatchReturnRow {
    id: string;
    batch_id: string;
    return_kind: "pharmacy_to_wholesale" | "wholesale_to_wholesale" | "wholesale_to_manufacturer" | "patient_to_pharmacy";
    return_reason: string;
    return_reason_detail: string | null;
    returning_party_id: string | null;
    returning_party_kind: "pharmacy" | "wholesaler" | "patient" | "manufacturer" | null;
    returning_party_license: string | null;
    receiving_party_id: string | null;
    receiving_party_kind: "pharmacy" | "wholesaler" | "manufacturer" | null;
    receiving_party_license: string | null;
    returned_quantity_units: number | null;
    returned_quantity_g: number | null;
    temperature_log_pass: boolean | null;
    packaging_intact: boolean | null;
    seal_intact: boolean | null;
    risk_assessment_text: string | null;
    risk_assessment_outcome: "restock" | "quarantine" | "destruction" | "investigation_needed" | null;
    rp_decision_by_user_id: string | null;
    rp_decision_at: string | null;
    rp_signature_id: string | null;
    status: "initiated" | "in_transit" | "received" | "assessed" | "closed" | "rejected";
    initiated_at: string;
    received_at: string | null;
    closed_at: string | null;
    destruction_record_id: string | null;
    recall_event_id: string | null;
}
interface DestructionRecordRow {
    id: string;
    batch_id: string;
    destruction_kind: "btm_destruction" | "gmp_reject_destruction" | "expired_disposal" | "recall_destruction" | "sample_disposal";
    destruction_reason: string;
    quantity_units: number | null;
    quantity_g: number | null;
    quantity_uom: string;
    destruction_method: string;
    facility_id: string | null;
    facility_license_no: string | null;
    witness_a_user_id: string;
    witness_a_role: GxpActorRole;
    witness_a_credential_ref: string;
    witness_a_signature_id: string;
    witness_b_user_id: string;
    witness_b_role: GxpActorRole;
    witness_b_credential_ref: string;
    witness_b_signature_id: string;
    bfarm_notification_no: string | null;
    bfarm_notification_at: string | null;
    destroyed_at: string;
    notes: string | null;
    created_at: string;
}
interface OosInvestigationRow {
    id: string;
    batch_id: string;
    test_kind: string;
    observed_value: string;
    specification_limit: string;
    out_of_spec: boolean;
    phase: "phase_1a" | "phase_1b" | "phase_2" | "closed";
    hypothesis_text: string | null;
    root_cause_text: string | null;
    capa_id: string | null;
    decision: "lab_error_invalidated" | "release_with_deviation" | "reject" | "reprocess" | "further_test_needed" | null;
    decision_by_user_id: string | null;
    decision_by_role: GxpActorRole | null;
    decision_signature_id: string | null;
    decision_at: string | null;
    opened_by_user_id: string;
    opened_at: string;
    closed_at: string | null;
}
interface AdverseEventReportRow {
    id: string;
    batch_id: string;
    pharmacy_dispense_id: string | null;
    patient_pseudonym: string | null;
    patient_age_band: string | null;
    patient_sex: "m" | "f" | "d" | null;
    event_meddra_pt: string | null;
    event_description: string;
    severity: "mild" | "moderate" | "severe" | "life_threatening" | "fatal";
    causality_assessment: "definite" | "probable" | "possible" | "unlikely" | "unrelated" | "unassessable" | null;
    reported_by_user_id: string;
    reported_by_role: GxpActorRole;
    reported_at: string;
    reported_by_signature_id: string | null;
    bfarm_uaw_report_id: string | null;
    bfarm_uaw_reported_at: string | null;
    eudra_vigilance_report_id: string | null;
    triggers_investigation: boolean;
    investigation_id: string | null;
    status: "open" | "investigating" | "reported_to_authority" | "closed";
}
interface BatchLineageLinkRow {
    id: string;
    parent_batch_id: string;
    child_batch_id: string;
    link_kind: "split" | "reprocess" | "rework" | "combine" | "sampling";
    ratio_pct: number | null;
    quantity_g: number | null;
    reason_text: string | null;
    authorized_by_user_id: string | null;
    authorized_by_role: GxpActorRole | null;
    authorized_by_signature_id: string | null;
    authorized_at: string | null;
    requires_new_qp_release: boolean;
    created_at: string;
}
interface FmdAlertRow {
    id: string;
    batch_id: string;
    pharmacy_receipt_id: string | null;
    securpharm_alert_no: string;
    alert_kind: "decommission_already_done" | "unknown_pack" | "recalled_pack" | "expired_pack" | "wrong_market" | "tampered_seal" | "other";
    alert_detail: string | null;
    raised_at: string;
    raised_by_user_id: string | null;
    investigation_text: string | null;
    investigation_by_user_id: string | null;
    investigation_by_signature_id: string | null;
    investigation_closed_at: string | null;
    outcome: "false_alarm" | "genuine_data_error" | "genuine_recall_match" | "falsified_confirmed" | "unresolved" | null;
    bfarm_notified_at: string | null;
    ema_notified_at: string | null;
}
interface ColdChainExcursionRow {
    id: string;
    batch_id: string;
    transport_leg_id: string | null;
    excursion_kind: "above_max_temp" | "below_min_temp" | "above_max_humidity" | "below_min_humidity" | "shock" | "tilt" | "door_open_during_transport";
    sensor_device_id: string | null;
    sensor_kind: string | null;
    measured_value: number | null;
    measured_unit: string | null;
    measured_at: string;
    duration_minutes: number | null;
    spec_min: number | null;
    spec_max: number | null;
    severity: "warning" | "critical" | "catastrophic";
    auto_status_change: boolean;
    status_changed_to: BatchStatus | null;
    assessment_text: string | null;
    assessment_by_user_id: string | null;
    assessment_by_signature_id: string | null;
    assessment_outcome: "continue" | "quarantine" | "reject" | "investigate" | null;
    assessment_at: string | null;
    event_hash: string;
    prev_event_hash: string | null;
    reported_at: string;
}
interface PharmacyOrderRow {
    id: string;
    batch_id: string;
    hub_facility_id: string | null;
    hub_bfarm_wholesale_license_no: string | null;
    pharmacy_id: string | null;
    pharmacy_license_no: string;
    ordered_by_user_id: string;
    ordered_by_chamber_id: string | null;
    ordered_quantity_units: number;
    ordered_quantity_g: number | null;
    ordered_at: string;
    requested_delivery_date: string | null;
    dispatched_at: string | null;
    dispatched_movement_id: string | null;
    status: "placed" | "acknowledged" | "partially_fulfilled" | "fulfilled" | "cancelled" | "rejected";
    rejection_reason: string | null;
    ordered_signature_id: string | null;
    fulfilled_signature_id: string | null;
}
interface ScaSignaturePayload {
    signed_text: string;
    sca_method: "totp" | "webauthn" | "smart_card";
    sca_proof: string;
}
interface QpReleaseThaiRequest {
    batch_id: string;
    decision: "release" | "reject" | "quarantine";
    decision_rationale?: string;
    dossier_refs: Array<{
        kind: string;
        id: string;
    }>;
    handover_statement?: string;
    signature_payload: ScaSignaturePayload;
}
interface QpReleaseEuRequest {
    batch_id: string;
    decision: "release" | "reject" | "quarantine";
    decision_rationale?: string;
    annex16_certificate_no: string;
    annex16_third_country_assessment: string;
    annex16_specifications_met: boolean;
    annex16_handover_statement: string;
    dossier_refs: Array<{
        kind: string;
        id: string;
    }>;
    signature_payload: ScaSignaturePayload;
}
interface EuIntakeReceiveRequest {
    batch_id: string;
    transport_leg_id?: string;
    receiving_facility_id?: string;
    receiving_facility_gln?: string;
    receiving_facility_bfarm_no: string;
    identity_check_pass: boolean;
    quantity_check_pass: boolean;
    packaging_integrity_pass: boolean;
    seal_integrity_pass: boolean;
    temperature_log_pass: boolean;
    documentation_complete: boolean;
    decision: "accept" | "reject" | "conditional" | "quarantine";
    decision_rationale?: string;
    post_harvest_required?: boolean;
    post_harvest_facility_id?: string;
    post_harvest_eu_gmp_license_no?: string;
    signature_payload: ScaSignaturePayload;
}
interface PharmacyReceiveRequest {
    batch_id: string;
    pharmacy_license_no: string;
    pharmacist_chamber_id: string;
    securpharm_verification_id?: string;
    securpharm_decommission_status: "verified_active" | "verified_inactive" | "alert" | "unknown" | "skipped_btm";
    securpharm_alert_no?: string;
    identity_check_pass: boolean;
    quantity_check_pass: boolean;
    packaging_integrity_pass: boolean;
    temperature_log_pass: boolean;
    received_units?: number;
    accepted_units?: number;
    rejected_units?: number;
    decision: "accept" | "reject" | "partial";
    rejection_reason?: string;
    signature_payload: ScaSignaturePayload;
}
interface PharmacyDispenseRequest {
    batch_id: string;
    pharmacy_receipt_id?: string;
    pharmacy_license_no: string;
    pharmacist_chamber_id: string;
    btm_prescription_no_hash: string;
    prescribing_doctor_id_hash?: string;
    patient_pseudonym?: string;
    dispensed_quantity_units: number;
    dispensed_quantity_g?: number;
    securpharm_decommission_id?: string;
    contraindication_check_performed: boolean;
    patient_counseling_documented: boolean;
    signature_payload: ScaSignaturePayload;
}
interface RecallInitiateRequest {
    batch_id: string;
    trigger_kind: "qp_decision" | "rp_decision" | "regulator_order" | "adverse_event" | "temperature_excursion" | "contamination" | "identity_mismatch";
    scope: "full_lot" | "partial" | "downstream_only";
    affected_units?: number;
    recall_plan_doc_ref?: string;
    notes?: string;
    signature_payload: ScaSignaturePayload;
}
interface GenericEdgeFnResponse<T = Record<string, unknown>> {
    ok?: boolean;
    error?: string;
    [k: string]: unknown;
}
/**
 * Erstelle SHA-256(prescription_no + ":" + salt) für BtM-Rezepte.
 * Salt muss aus der App-Config kommen (NIE im Repo gespeichert).
 * Niemals Klartext-BtM-Nr an pharmacy-dispense senden.
 */
declare function hashBtmPrescription(prescriptionNo: string, salt: string): Promise<string>;

interface StatusDescriptor {
    label_de: string;
    label_en: string;
    tone: "neutral" | "info" | "warning" | "critical" | "success" | "pending";
    is_human_gate: boolean;
    is_terminal: boolean;
}
declare const STATUS_DESCRIPTORS: Record<BatchStatus, StatusDescriptor>;
declare function describeStatus(status: BatchStatus | string | null | undefined): StatusDescriptor;
declare function statusToneClass(tone: StatusDescriptor["tone"]): string;
declare function buildSignedText(opts: {
    action: string;
    batch_id: string;
    decision?: string;
    details?: Record<string, string>;
    signed_at_iso: string;
}): string;
declare function validateScaPayload(p: Partial<ScaSignaturePayload>): {
    ok: true;
} | {
    ok: false;
    error: string;
};
declare function invokeGxpEdgeFn<TReq = unknown, TRes = {
    ok: boolean;
    [k: string]: unknown;
}>(client: SupabaseClientLike, name: string, body: TReq): Promise<TRes>;

export { type AdverseEventReportRow, type AggregatedRegulatory, type ApiResult, type BatchLineageLinkRow, type BatchReturnRow, type BatchStatus, type BatchStatusHistoryRow, type ColdChainExcursionRow, type DestructionRecordRow, EU_INTAKE_INBOX, type EuIntakeReceiptRow, type EuIntakeReceiveRequest, type FmdAlertRow, type GenericEdgeFnResponse, type GxpActorRole, type GxpCredentialRow, type GxpSignatureRow, type JsonRecord, MARKETPLACE_LISTABLE, type MarketAnalysisResult, type MarketplaceBatch, type MarketplaceOrder, type MarketplaceStats, type OosInvestigationRow, PHARMACY_DISPENSE_INBOX, PHARMACY_RECEIVE_INBOX, POST_HARVEST_INBOX, type PharmacyDispenseRequest, type PharmacyDispenseRow, type PharmacyOrderRow, type PharmacyReceiptRow, type PharmacyReceiveRequest, QP_INBOX_EU, QP_INBOX_THAI, type QpReleaseEuRequest, type QpReleaseRow, type QpReleaseThaiRequest, RECALL_ACTIVE, type RecallInitiateRequest, type RegulatoryUpdate, STATUS_DESCRIPTORS, type SampleRetentionRow, type ScaSignaturePayload, type StatusDescriptor, type SupabaseClientLike, type SupabaseFunctionsClient, type SupabaseInvokeResult, type SyncEnvelope, WHOLESALE_HUB_INBOX, aggregateRegulatoryUpdates, analyzeTargetMarkets, auditQuery, auditSync, buildSignedText, checkConnectionStatus, checkMarketplaceHealth, complianceSync, createMarketplaceOrder, describeStatus, getMarketplaceBatch, getMarketplaceStats, getPayloadError, getRegulations, getRegulatoryUpdates as getSourceRegulatoryUpdates, getSupabaseClient, getRegulatoryUpdates$1 as getTargetMarketRegulatoryUpdates, hashBtmPrescription, invokeGxpEdgeFn, listMarketplaceBatches, notifySync, readResponseError, regulatorySync, runRegulatoryAiScan, setSupabaseClient, statusToneClass, syncRegulatoryAlert, toErrorMessage, triggerAiCertScan, triggerMarketplaceScan, updateMarketplaceOrder, validateScaPayload, verifyCertificateViaMarketplace };
