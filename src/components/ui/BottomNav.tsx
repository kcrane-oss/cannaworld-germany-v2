import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PenTool, Package, GraduationCap, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  exact?: boolean;
}

const items: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", exact: true },
  { label: "Planner", icon: PenTool, href: "/dashboard/facility-planner" },
  { label: "Chargen", icon: Package, href: "/dashboard/batches" },
  { label: "Classroom", icon: GraduationCap, href: "/dashboard/education/classroom" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/50 bg-background/90 backdrop-blur-xl safe-area-bottom">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? location.pathname === item.href
            : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 min-h-[48px] min-w-[48px] h-full px-1 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6 transition-transform", active && "scale-110")} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
