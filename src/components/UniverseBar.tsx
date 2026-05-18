import { Building2, Globe, Shield, ShoppingBag, Network } from "lucide-react";

const apps = [
  { key: "gateway", label: "Gateway", icon: Globe, url: "https://cannaworld-thailand.com", color: "text-emerald-400" },
  { key: "europe", label: "Europe", icon: Network, url: "https://cannaworld-europe.com", color: "text-emerald-400" },
  { key: "germany", label: "Germany", icon: Building2, url: "https://cannaworld-germany.de", color: "text-cyan-400" },
  { key: "marketplace", label: "Marketplace", icon: ShoppingBag, url: "https://cannaworld-marketplace.com", color: "text-blue-400" },
  { key: "aicert", label: "AICert", icon: Shield, url: "https://gmp-aicert.com", color: "text-purple-400" },
] as const;

type AppKey = (typeof apps)[number]["key"];

interface UniverseBarProps {
  current: AppKey;
}

const UniverseBar = ({ current }: UniverseBarProps) => {
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
