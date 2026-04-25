import { useRef, useState, useCallback } from "react";
import { useHaptics } from "./useHaptics";

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
}

export function usePullToRefresh({ onRefresh, threshold = 80 }: UsePullToRefreshOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { mediumImpact } = useHaptics();

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const el = containerRef.current;
    if (!el || el.scrollTop > 0) return;
    startYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const el = containerRef.current;
    if (!el || el.scrollTop > 0) return;
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0) {
      e.preventDefault();
      setPullDistance(Math.min(delta, threshold * 1.5));
    }
  }, [threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(0);
      await mediumImpact();
      try { await onRefresh(); } finally { setIsRefreshing(false); }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, threshold, isRefreshing, onRefresh, mediumImpact]);

  const setRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchmove", handleTouchMove, { passive: false });
      el.addEventListener("touchend", handleTouchEnd);
    }
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { containerRef: setRef, pullDistance, isRefreshing };
}
