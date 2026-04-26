import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plane, Truck, Anchor, Thermometer, MapPin, Clock, CheckCircle2, Package, Loader2, Network } from "lucide-react";

export default function Logistics() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: cases, isLoading } = useQuery({
    queryKey: ["logistics-trade-cases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trade_cases")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      // Filter for cases that have a GDP Logistics milestone or are in logistics-relevant status
      return (data || []).filter(tc => {
        const milestones = tc.workflow_milestones as any[];
        if (!Array.isArray(milestones)) return false;
        return milestones.some(m => m.key === "gdp_logistics");
      });
    },
    enabled: !!user,
  });

  const getLogisticsStatus = (tc: any) => {
    // For MVP, we map Trade Case status directly to logistics visual stages
    const s = tc.status;
    if (s === "delivered" || s === "completed") return { status: "delivered", progress: 100 };
    if (s === "customs" || s === "clearance") return { status: "customs", progress: 85 };
    if (s === "shipping" || s === "in_transit") return { status: "transit", progress: 50 };
    if (s === "production" || s === "processing") return { status: "pickup", progress: 20 };
    return { status: "pending", progress: 10 };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pickup': return <Package className="h-4 w-4" />;
      case 'transit': return <Plane className="h-4 w-4" />;
      case 'customs': return <Anchor className="h-4 w-4" />;
      case 'delivered': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const activeShipments = cases?.filter(c => {
    const s = getLogisticsStatus(c);
    return s.progress > 0 && s.progress < 100;
  }) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("logistics.title")}</h1>
        <p className="text-muted-foreground">Heavyweight GDP Logistics Hub: Integrated Trade Case Tracking</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("logistics.activeShipments", "Active Shipments")}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <div className="text-2xl font-bold">{activeShipments.length}</div>}
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("logistics.tracking", "Network Overview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex flex-col items-center">
                <MapPin className="h-4 w-4 mb-1 text-primary" />
                <span>Thailand Hubs</span>
              </div>
              <div className="h-px flex-1 bg-border mx-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                  <Plane className="h-3 w-3 rotate-90 text-muted-foreground" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-4 w-4 mb-1 text-primary" />
                <span>EU Distribution</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></CardContent>
          </Card>
        ) : !cases || cases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Truck className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">{t("common.noResults", "No active shipments tracking for your Trade Cases")}</p>
            </CardContent>
          </Card>
        ) : (
          cases.map((tc) => {
            const ls = getLogisticsStatus(tc);
            const isDelivered = ls.status === "delivered";
            return (
              <Card key={tc.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{tc.case_number || tc.id.slice(0,8)}</span>
                      <Badge variant="outline" className="capitalize">
                        {getStatusIcon(ls.status)}
                        <span className="ml-1.5">{ls.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="secondary" className="text-[10px]">
                        <Network className="mr-1 h-3 w-3" />
                        {tc.import_type?.replace(/_/g, " ")}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={isDelivered ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-amber-500 border-amber-500/20 bg-amber-500/5"}
                      >
                        <Thermometer className="mr-1 h-3.5 w-3.5" />
                        GDP Lane Active
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("logistics.origin", "Origin")}</p>
                          <p className="font-medium">{tc.exporter_name || "Thailand"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t("logistics.destination", "Destination")}</p>
                          <p className="font-medium">{tc.destination_country || tc.importer_country || "EU"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span>{t("logistics.status", "Transit Progress")}</span>
                          <span>{ls.progress}%</span>
                        </div>
                        <Progress value={ls.progress} className="h-2" />
                        <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                          <span className={ls.progress >= 20 ? "text-primary" : ""}>{t("tradeCases.stages.production", "Pickup")}</span>
                          <span className={ls.progress >= 50 ? "text-primary" : ""}>{t("tradeCases.stages.shipping", "In Transit")}</span>
                          <span className={ls.progress >= 85 ? "text-primary" : ""}>{t("tradeCases.stages.customsClearance", "Customs")}</span>
                          <span className={ls.progress === 100 ? "text-primary" : ""}>{t("tradeCases.stages.delivered", "Delivered")}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-background flex items-center justify-center border">
                            <Truck className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground leading-none">{t("logistics.carrier", "Carrier")}</p>
                            <p className="text-sm font-medium">Verified GDP Transport</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-primary hover:bg-primary/5 cursor-pointer">
                          {t("logistics.tracking", "View Live Tracking")} →
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
