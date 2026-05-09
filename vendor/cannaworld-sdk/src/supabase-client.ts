export interface SupabaseInvokeResult<T = unknown> {
  data: T | null;
  error: { message?: string } | null;
}

export interface SupabaseFunctionsClient {
  invoke<T = unknown>(
    functionName: string,
    options?: { body?: Record<string, unknown> }
  ): Promise<SupabaseInvokeResult<T>>;
}

export interface SupabaseClientLike {
  functions: SupabaseFunctionsClient;
}

let supabaseClient: SupabaseClientLike | null = null;

export const setSupabaseClient = (client: SupabaseClientLike): void => {
  supabaseClient = client;
};

export const getSupabaseClient = (): SupabaseClientLike => {
  if (!supabaseClient) {
    throw new Error("CannaWorld SDK supabase client not configured. Call setSupabaseClient(client) before using API helpers.");
  }
  return supabaseClient;
};
