import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export const useUserRoles = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      setRoles(data?.map((r) => r.role) ?? []);
      setLoading(false);
    };

    fetch();
  }, [user]);

  const effectiveRoles = user ? roles : [];
  const effectiveLoading = user ? loading : false;

  return { roles: effectiveRoles, loading: effectiveLoading, hasRole: (r: AppRole) => effectiveRoles.includes(r) };
};
