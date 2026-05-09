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

export { type AggregatedRegulatory, type ApiResult, type JsonRecord, type MarketAnalysisResult, type MarketplaceBatch, type MarketplaceOrder, type MarketplaceStats, type RegulatoryUpdate, type SupabaseClientLike, type SupabaseFunctionsClient, type SupabaseInvokeResult, type SyncEnvelope, aggregateRegulatoryUpdates, analyzeTargetMarkets, auditQuery, auditSync, checkConnectionStatus, checkMarketplaceHealth, complianceSync, createMarketplaceOrder, getMarketplaceBatch, getMarketplaceStats, getPayloadError, getRegulations, getRegulatoryUpdates as getSourceRegulatoryUpdates, getSupabaseClient, getRegulatoryUpdates$1 as getTargetMarketRegulatoryUpdates, listMarketplaceBatches, notifySync, readResponseError, regulatorySync, runRegulatoryAiScan, setSupabaseClient, syncRegulatoryAlert, toErrorMessage, triggerAiCertScan, triggerMarketplaceScan, updateMarketplaceOrder, verifyCertificateViaMarketplace };
