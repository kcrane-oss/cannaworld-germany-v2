import { supabase } from "@/integrations/supabase/client";

// app_role enum values (mirror of the DB enum). Used by the admin team UI.
export const APP_ROLES = [
  "admin",
  "compliance",
  "auditor",
  "importer",
  "exporter",
  "inspector",
  "logistics",
  "farm",
  "shop",
  "trader",
  "pharmacy",
  "lab_provider",
] as const;
export type AppRole = (typeof APP_ROLES)[number];

// Grant/revoke a role for a user. Server-side: admin-only, rate-limited.
export async function setStaffRole(
  userId: string,
  role: AppRole,
  grant: boolean
): Promise<{ user_id: string; role: string; granted: boolean }> {
  const { data, error } = await supabase.functions.invoke("germany-staff-role", {
    body: { user_id: userId, role, grant },
  });
  if (error) throw error;
  return data as { user_id: string; role: string; granted: boolean };
}
