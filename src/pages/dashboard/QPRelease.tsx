import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Json } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardCheck, CheckCircle2, XCircle, Clock, Loader2, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type WorkflowMilestone = { key?: string; status?: string; [key: string]: Json | undefined };
type QpStatus = "pending" | "released" | "rejected";

const getMilestones = (value: Json): WorkflowMilestone[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((milestone): milestone is WorkflowMilestone =>
    typeof milestone === "object" && milestone !== null && !Array.isArray(milestone)
  );
};

export default function QPRelease() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: cases, isLoading, refetch } = useQuery({
    queryKey: ["qp-trade-cases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trade_cases")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      // Filter for cases that have a QP milestone
      return (data || []).filter((tradeCase) =>
        getMilestones(tradeCase.workflow_milestones).some((milestone) => milestone.key === "qp_release")
      );
    },
    enabled: !!user,
  });

  const getQpStatus = (milestones: WorkflowMilestone[]): QpStatus => {
    if (!Array.isArray(milestones)) return "pending";
    const m = milestones.find(m => m.key === "qp_release");
    if (!m) return "pending";
    if (m.status === "done" || m.status === "completed") return "released";
    if (m.status === "rejected") return "rejected";
    return "pending";
  };

  const getStatusBadge = (status: QpStatus) => {
    switch (status) {
      case 'released':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">{t("common.approved", "Released")}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t("common.rejected", "Rejected")}</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">{t("common.pending", "Pending")}</Badge>;
      default:
        return null;
    }
  };

  const markAsReleased = async (id: string, currentMilestones: WorkflowMilestone[]) => {
    try {
      const updated = currentMilestones.map(m => m.key === "qp_release" ? { ...m, status: "done" } : m);
      const { error } = await supabase.from("trade_cases").update({ workflow_milestones: updated }).eq("id", id);
      if (error) throw error;
      toast.success("Batch released by QP");
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to release batch");
    }
  };

  const stats = {
    pending: cases?.filter((tradeCase) => getQpStatus(getMilestones(tradeCase.workflow_milestones)) === 'pending').length || 0,
    released: cases?.filter((tradeCase) => getQpStatus(getMilestones(tradeCase.workflow_milestones)) === 'released').length || 0,
    rejected: cases?.filter((tradeCase) => getQpStatus(getMilestones(tradeCase.workflow_milestones)) === 'rejected').length || 0
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("qpRelease.title")}</h1>
          <p className="text-muted-foreground">Heavyweight QP Release Hub: Release readiness based on actual Trade Cases.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("qpRelease.pendingRelease", "Pending Release")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <div className="text-2xl font-bold">{stats.pending}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("qpRelease.released", "Released")}</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <div className="text-2xl font-bold">{stats.released}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("qpRelease.rejected", "Rejected")}</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <div className="text-2xl font-bold">{stats.rejected}</div>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("qpRelease.batchInfo", "Batch Releases")}</CardTitle>
          <CardDescription>
            Live Trade Case milestone tracking for Qualified Persons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : !cases || cases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardCheck className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">{t("common.noResults", "No pending QP releases found in active Trade Cases")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("batches.batchNumber", "Batch / Case")}</TableHead>
                  <TableHead>{t("marketplace.flower", "Product")}</TableHead>
                  <TableHead>Import Route</TableHead>
                  <TableHead>{t("common.status", "QP Status")}</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((tc) => {
                  const milestones = getMilestones(tc.workflow_milestones);
                  const qpStatus = getQpStatus(milestones);
                  return (
                    <TableRow key={tc.id}>
                      <TableCell className="font-medium">
                        <div className="text-sm">{tc.batch_number || "—"}</div>
                        <div className="text-xs text-muted-foreground">{tc.case_number || tc.id.slice(0,8)}</div>
                      </TableCell>
                      <TableCell>{tc.product || tc.product_type || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Network className="h-3 w-3 text-primary" />
                          <span className="capitalize">{tc.import_type?.replace(/_/g, " ")}</span>
                        </div>
                        {tc.compliance_route_key && <div className="text-[10px] text-muted-foreground mt-0.5">{tc.compliance_route_key}</div>}
                      </TableCell>
                      <TableCell>{getStatusBadge(qpStatus)}</TableCell>
                      <TableCell className="text-right">
                        {qpStatus === "pending" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs border-green-500/30 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10" onClick={() => markAsReleased(tc.id, milestones)}>
                            Mark Released
                          </Button>
                        )}
                        {qpStatus === "released" && (
                          <span className="text-xs text-muted-foreground">Completed</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
