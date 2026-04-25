import { ReactNode } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  className?: string;
}

export function PullToRefresh({ children, onRefresh, className }: PullToRefreshProps) {
  const { containerRef, pullDistance, isRefreshing } = usePullToRefresh({ onRefresh });
  const progress = Math.min(pullDistance / 80, 1);
  const showIndicator = pullDistance > 10 || isRefreshing;

  return (
    <div ref={containerRef} className={`relative overflow-y-auto ${className ?? ""}`}>
      {/* Pull indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none z-10"
        style={{ height: isRefreshing ? 56 : pullDistance > 0 ? pullDistance * 0.6 : 0, transition: isRefreshing ? "height 0.2s" : undefined }}
      >
        {showIndicator && (
          <motion.div
            className="flex items-center justify-center text-primary"
            animate={isRefreshing ? { rotate: 360 } : { rotate: progress * 180 }}
            transition={isRefreshing ? { repeat: Infinity, duration: 0.8, ease: "linear" } : { duration: 0 }}
          >
            <RefreshCw size={24} />
          </motion.div>
        )}
      </div>
      <div style={{ transform: isRefreshing ? "translateY(56px)" : pullDistance > 0 ? `translateY(${pullDistance * 0.5}px)` : undefined, transition: isRefreshing ? "transform 0.2s" : undefined }}>
        {children as any}
      </div>
    </div>
  );
}
