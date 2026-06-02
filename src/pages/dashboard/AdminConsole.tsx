import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ShieldCheck, Loader2, Users, Inbox, Clock, Mail, X, Plus } from "lucide-react";
import { useStaffRoles, type StaffMember } from "@/hooks/useStaffRoles";
import { useSupportConversations } from "@/hooks/useSupportConversations";
import { useSampleRequests } from "@/hooks/useSampleRequests";
import { isActionable } from "@/lib/support-workflow";
import { evaluateEscalation } from "@/lib/escalation";
import { APP_ROLES, setStaffRole, type AppRole } from "@/lib/staff-api";
import { Button } from "@/components/ui/button";

const SELECT_CLASS = "h-8 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring";

function StatCard({ icon: Icon, label, value }: { icon: typeof Inbox; label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-center gap-2 text-xs text-white/55"><Icon className="h-4 w-4 text-cyan-300" /> {label}</div>
      <div className="mt-1 text-2xl font-black text-white">{value}</div>
    </div>
  );
}

export default function AdminConsole() {
  const { t } = useTranslation();
  const staff = useStaffRoles();
  const conversations = useSupportConversations();
  const sampleRequests = useSampleRequests();
  const [busyUser, setBusyUser] = useState<string | null>(null);
  const [addRole, setAddRole] = useState<Record<string, AppRole>>({});

  const stats = useMemo(() => {
    const convs = conversations.data ?? [];
    const openConvs = convs.filter((c) => isActionable(c.status ?? "")).length;
    const overdue = convs.filter((c) => evaluateEscalation({ status: c.status, tier: c.tier, priority: c.priority, updatedAt: c.updated_at }).overdue).length;
    const openSamples = (sampleRequests.data ?? []).filter((s) => s.status === "received" || s.status === "in_review").length;
    return { openConvs, overdue, openSamples, team: (staff.data ?? []).length };
  }, [conversations.data, sampleRequests.data, staff.data]);

  async function toggleRole(userId: string, role: AppRole, grant: boolean) {
    setBusyUser(userId);
    try {
      await setStaffRole(userId, role, grant);
      toast.success(t("admin.roleUpdated", "Rolle aktualisiert"));
      await staff.refetch();
    } catch (err) {
      toast.error(t("admin.roleError", "Rollenänderung fehlgeschlagen") + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setBusyUser(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-cyan-300" />
        <h1 className="text-2xl font-black tracking-tight">{t("admin.title", "Admin-Console")}</h1>
      </div>

      {/* Ops overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label={t("admin.openConvs", "Offene Konversationen")} value={stats.openConvs} />
        <StatCard icon={Clock} label={t("admin.overdue", "Überfällig")} value={stats.overdue} />
        <StatCard icon={Mail} label={t("admin.openSamples", "Offene Sample-Requests")} value={stats.openSamples} />
        <StatCard icon={Users} label={t("admin.team", "Team")} value={stats.team} />
      </div>

      {/* Team & roles */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-cyan-300" />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">{t("admin.teamRoles", "Team & Rollen")}</h2>
        </div>

        {staff.isLoading && <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />}
        {staff.isError && <div className="text-sm text-red-200">{t("admin.loadError", "Team konnte nicht geladen werden")}</div>}
        {!staff.isLoading && !staff.isError && (staff.data ?? []).length === 0 && (
          <div className="text-sm text-white/55">{t("admin.empty", "Keine Team-Mitglieder")}</div>
        )}

        <div className="space-y-3">
          {(staff.data ?? []).map((m: StaffMember) => {
            const available = APP_ROLES.filter((r) => !m.roles.includes(r));
            return (
              <div key={m.user_id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-sm font-bold text-white">{m.display_name ?? m.user_id}</div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {m.roles.map((role) => (
                    <span key={role} className="inline-flex items-center gap-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-200">
                      {role}
                      <button
                        aria-label={t("admin.removeRole", "Rolle entfernen") + " " + role}
                        disabled={busyUser === m.user_id}
                        onClick={() => toggleRole(m.user_id, role as AppRole, false)}
                        className="text-cyan-200/70 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {available.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <select
                        className={SELECT_CLASS}
                        aria-label={t("admin.addRoleLabel", "Rolle hinzufügen")}
                        value={addRole[m.user_id] ?? available[0]}
                        onChange={(e) => setAddRole((s) => ({ ...s, [m.user_id]: e.target.value as AppRole }))}
                      >
                        {available.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busyUser === m.user_id}
                        onClick={() => toggleRole(m.user_id, addRole[m.user_id] ?? available[0], true)}
                      >
                        <Plus className="h-3 w-3" /> {t("admin.add", "Hinzufügen")}
                      </Button>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
