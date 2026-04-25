import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export const useHasRole = (role: AppRole) => {
  const { user } = useAuth();
  const [hasRole, setHasRole] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHasRole(false);
      setLoading(false);
      return;
    }

    const check = async () => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: role,
      });
      setHasRole(!!data && !error);
      setLoading(false);
    };

    check();
  }, [user, role]);

  return { hasRole, loading };
};
