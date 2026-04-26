import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";
import { FileText, Plus, ArrowRight, Clock, Loader2, Network, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TradeCase = Database["public"]["Tables"]["trade_cases"]["Row"];

const stageColors: Record<string, string> = {
  inquiry: "bg-slate-500/10 text-slate-500 border-slate-500/30",
  negotiation: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  sample_requested: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  sample_approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  contract_signed: "bg-primary/10 text-primary border-primary/30",
  production: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
  quality_check: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  shipping: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
  customs_clearance: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  qp_release: "bg-pink-500/10 text-pink-500 border-pink-500/30",
  delivered: "bg-green-500/10 text-green-500 border-green-500/30",
  completed: "bg-emerald-600/10 text-emerald-600 border-emerald-600/30",
};

const importTypeLabels: Record<string, string> = {
  managed: "Managed Import",
  direct: "Direct Import",
  provider_assisted: "GMP Provider Assisted",
};

const importTypeColors: Record<string, string> = {
  managed: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  direct: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  provider_assisted: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const getMilestoneStats = (milestones: unknown) => {
  if (!Array.isArray(milestones)) return { ready: 0, total: 0 };
  const total = milestones.length;
  const ready = milestones.filter((item) => {
    if (!item || typeof item !== "object") return false;
    const status = String((item as { status?: unknown }).status || "");
    return ["ready", "done", "completed"].includes(status);
  }).length;
  return { ready, total };
};

export default function TradeCases() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: cases, isLoading } = useQuery({
    queryKey: ["trade-cases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trade_cases")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("tradeCases.title")}</h1>
          <p className="text-sm text-muted-foreground">Europe operating cockpit for wholesalers, GMP providers and QP-ready import flows.</p>
        </div>
        <Button className="gap-2" onClick={() => { window.location.href = "/dashboard/compliance-routes"; }}>
          <Plus className="h-4 w-4" /> Build route
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-4">
            <Network className="h-5 w-5 text-primary" />
            <div><p className="text-sm font-semibold">Route-linked Cases</p><p className="text-xs text-muted-foreground">Managed / Direct / Provider Assisted</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-blue-500" />
            <div><p className="text-sm font-semibold">Stakeholder Matrix</p><p className="text-xs text-muted-foreground">Importer · QA · QP · Supplier</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <div><p className="text-sm font-semibold">Evidence Milestones</p><p className="text-xs text-muted-foreground">Docs · QP Release · GDP Lane</p></div>
          </CardContent>
        </Card>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && (!cases || cases.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-sm font-medium">{t("tradeCases.empty")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("tradeCases.emptyDesc")}</p>
            <Button variant="outline" className="mt-4 gap-2">
              <a href="/dashboard/marketplace">Browse Marketplace <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </CardContent>
        </Card>
      )}

      {cases && cases.length > 0 && (
        <div className="space-y-3">
          {cases.map((tc: TradeCase) => {
            const statusKey = tc.status?.replace(/_/g, "") || "inquiry";
            const quantityLabel = [tc.quantity ?? tc.estimated_quantity, tc.unit].filter(Boolean).join(" ");
            const milestoneStats = getMilestoneStats(tc.workflow_milestones);
            return (
              <Card key={tc.id} className="hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold truncate">{tc.case_number || tc.id?.slice(0, 8)}</h3>
                      <Badge variant="outline" className={`text-[10px] ${stageColors[tc.status] || ""}`}>
                        {String(t(`tradeCases.stages.${statusKey}`, tc.status))}
                      </Badge>
                      <Badge variant="secondary" className={`text-[10px] ${importTypeColors[tc.import_type] || ""}`}>
                        {importTypeLabels[tc.import_type] || tc.import_type || "Managed Import"}
                      </Badge>
                      {tc.compliance_route_key && <Badge variant="outline" className="text-[10px]">{tc.compliance_route_key}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {tc.exporter_name || "—"} · {tc.product || tc.product_type || "—"} · {quantityLabel || "—"}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {tc.destination_country || tc.importer_country || "EU"} · {tc.customer_type === "wholesale_importer" ? "Wholesaler" : tc.customer_type === "pharmacy" ? "Pharmacy" : "Importer"}
                      {milestoneStats.total > 0 && ` · Milestones ${milestoneStats.ready}/${milestoneStats.total}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(tc.created_at).toLocaleDateString()}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
