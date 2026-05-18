import { Navigate, useLocation } from "react-router-dom";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useHasRole } from "@/hooks/useHasRole";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface RoleGuardProps {
  /** Allowed roles — user must have at least one. `admin` always passes. */
  allowedRoles: AppRole[];
  /**
   * When true, no-permission renders a redirect to /dashboard instead of an
   * inline "access denied" panel. Useful for routes that should be hidden
   * entirely from non-privileged users.
   */
  redirectOnDeny?: boolean;
  children: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, redirectOnDeny = false, children }: RoleGuardProps) => {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { roles, loading: rolesLoading } = useUserRoles();
  const { hasRole: isAdmin, loading: adminLoading } = useHasRole("admin");

  if (authLoading || rolesLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Admin always passes
  if (isAdmin) return <>{children}</>;

  const hasAccess = allowedRoles.some((r) => roles.includes(r));

  if (!hasAccess) {
    if (redirectOnDeny) {
      return <Navigate to="/dashboard" replace />;
    }
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-red-300/20 bg-red-400/5 py-16 text-center">
        <div className="rounded-full bg-red-400/10 p-3 ring-1 ring-red-300/30">
          <svg className="h-8 w-8 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-base font-semibold text-white">Zugriff verweigert</p>
        <p className="max-w-md text-sm leading-6 text-white/55">
          Diese Sektion erfordert eine spezifische CannaWorld-Rolle ({allowedRoles.join(", ")}). Bei Bedarf bitte
          freischalten lassen unter <a className="text-cyan-300 hover:text-cyan-200" href="mailto:info@cannaworld-germany.de">info@cannaworld-germany.de</a>.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
