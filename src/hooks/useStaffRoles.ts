import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Reads everyone holding an app_role, grouped per user, for the admin team view.
// user_roles + profiles exist in the generated types (typed client, no cast).
// RLS restricts visibility to admins.

export interface StaffMember {
  user_id: string;
  display_name: string | null;
  roles: string[];
}

export function useStaffRoles() {
  return useQuery({
    queryKey: ["germany-staff-roles"],
    queryFn: async (): Promise<StaffMember[]> => {
      const { data: roleRows, error } = await supabase
        .from("user_roles")
        .select("user_id, role");
      if (error) throw error;

      const rows = (roleRows ?? []) as { user_id: string; role: string }[];
      const userIds = [...new Set(rows.map((r) => r.user_id))];

      const nameMap = new Map<string, string | null>();
      if (userIds.length) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, display_name")
          .in("user_id", userIds);
        for (const p of (profiles ?? []) as { user_id: string; display_name: string | null }[]) {
          nameMap.set(p.user_id, p.display_name);
        }
      }

      const byUser = new Map<string, StaffMember>();
      for (const r of rows) {
        const entry = byUser.get(r.user_id) ?? { user_id: r.user_id, display_name: nameMap.get(r.user_id) ?? null, roles: [] };
        entry.roles.push(r.role);
        byUser.set(r.user_id, entry);
      }
      return [...byUser.values()].sort((a, b) => (a.display_name ?? a.user_id).localeCompare(b.display_name ?? b.user_id));
    },
  });
}
