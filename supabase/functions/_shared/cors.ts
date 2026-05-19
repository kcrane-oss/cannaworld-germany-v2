/**
 * Shared CORS helper for the germany-* edge functions.
 * Allowlists the five CannaWorld production origins + Capacitor/Ionic shells
 * + localhost dev. Defense-in-depth on top of the Supabase platform's own
 * verify_jwt check.
 */
const ALLOWED_ORIGINS = new Set([
  "https://cannaworld-germany.de",
  "https://www.cannaworld-germany.de",
  "https://cannaworld-thailand.com",
  "https://www.cannaworld-thailand.com",
  "https://gmp-aicert.com",
  "https://www.gmp-aicert.com",
  "https://cannaworld-marketplace.com",
  "https://www.cannaworld-marketplace.com",
  "https://cannaworld-europe.com",
  "https://www.cannaworld-europe.com",
  "capacitor://localhost",
  "ionic://localhost",
]);

export function corsHeaders(req?: Request) {
  const origin = req?.headers.get("origin") || "";
  const allowed = ALLOWED_ORIGINS.has(origin) || origin.startsWith("http://localhost:");
  return {
    "Access-Control-Allow-Origin": allowed ? origin : origin ? "null" : "https://cannaworld-germany.de",
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

export function json(req: Request, data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json" },
  });
}

/**
 * Verifies the caller's JWT and returns the user record + service-role client.
 * Returns null on any auth failure (caller should respond with 401).
 */
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export async function authenticate(req: Request): Promise<{ userId: string; userEmail: string | null; admin: SupabaseClient } | null> {
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) return null;

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SB_SECRET_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return { userId: data.user.id, userEmail: data.user.email ?? null, admin };
}

/**
 * Simple DB-backed rate limit. Inserts a row into `germany_function_rate_limits`
 * (table created by 20260519080000 migration) and counts hits in the window.
 * Returns true if the caller is over the limit and should be rejected.
 */
export async function isRateLimited(
  admin: SupabaseClient,
  fnName: string,
  callerId: string,
  windowSeconds = 60,
  maxHits = 30,
): Promise<boolean> {
  const since = new Date(Date.now() - windowSeconds * 1000).toISOString();
  const { count } = await admin
    .from("germany_function_rate_limits" as never)
    .select("id", { count: "exact", head: true })
    .eq("function_name", fnName)
    .eq("caller_id", callerId)
    .gte("created_at", since);
  if ((count ?? 0) >= maxHits) return true;
  await admin
    .from("germany_function_rate_limits" as never)
    .insert({ function_name: fnName, caller_id: callerId });
  return false;
}
