import type { MouseEvent } from "react";
import { Building2, Globe, Shield, ShoppingBag, Network } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const apps = [
  { key: "gateway", label: "Gateway", icon: Globe, url: "https://cannaworld-thailand.com", color: "text-emerald-400" },
  { key: "europe", label: "Europe", icon: Network, url: "https://cannaworld-europe.com", color: "text-emerald-400" },
  { key: "germany", label: "Germany", icon: Building2, url: "https://cannaworld-germany.de", color: "text-cyan-400" },
  { key: "marketplace", label: "Marketplace", icon: ShoppingBag, url: "https://cannaworld-marketplace.com", color: "text-blue-400" },
  { key: "aicert", label: "AICert", icon: Shield, url: "https://gmp-aicert.com", color: "text-purple-400" },
] as const;

type AppKey = (typeof apps)[number]["key"];

// Apps that participate in the shared cross-login Edge Function. Europe is excluded
// because its session is portal-scoped and doesn't accept Gateway-issued tokens.
const crossLoginTargets = new Set<AppKey>(["gateway", "marketplace", "aicert"]);

interface UniverseBarProps {
  current: AppKey;
}

const UniverseBar = ({ current }: UniverseBarProps) => {
  const openApp = async (event: MouseEvent<HTMLAnchorElement>, app: (typeof apps)[number]) => {
    if (app.key === current) return;
    if (!crossLoginTargets.has(app.key)) return;
    event.preventDefault();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        // Not logged in → just open the target app's landing page
        window.open(app.url, "_blank", "noopener,noreferrer");
        return;
      }

      const { data, error } = await supabase.functions.invoke("cross-login", {
        body: { target: app.key },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const loginUrl = (data as { login_url?: string } | null)?.login_url;
      if (error || !loginUrl) throw error ?? new Error("No cross-login URL returned");
      window.open(loginUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("[UniverseBar] Cross-login failed; opening app directly", err);
      window.open(app.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-white/5 z-[60]">
      <div className="container flex items-center justify-between h-8 px-4">
        <div className="flex items-center gap-1.5">
          <Network className="h-3 w-3 text-cyan-300" />
          <span className="text-[10px] font-semibold tracking-wider text-white/60 uppercase">CannaWorld Universe</span>
        </div>
        <div className="flex items-center gap-1">
          {apps.map((app) => {
            const isCurrent = app.key === current;
            return (
              <a
                key={app.key}
                href={isCurrent ? "/" : app.url}
                target={isCurrent ? "_self" : "_blank"}
                rel={isCurrent ? undefined : "noopener noreferrer"}
                onClick={(event) => openApp(event, app)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  isCurrent ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <app.icon className={`h-3 w-3 ${isCurrent ? app.color : ""}`} />
                <span className="hidden sm:inline">{app.label}</span>
              </a>
            );
          })}
        </div>
        <a
          href="https://cannaworld-thailand.com/import"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-cyan-300/80 hover:text-cyan-200 font-medium transition-colors hidden sm:block"
        >
          EU Import →
        </a>
      </div>
    </div>
  );
};

export default UniverseBar;
