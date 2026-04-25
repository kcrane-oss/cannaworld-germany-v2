import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: "quarter" | "half" | "three-quarters" | "full";
  className?: string;
}

const heightMap = {
  quarter: "25vh",
  half: "50vh",
  "three-quarters": "75vh",
  full: "100vh",
};

export function BottomSheet({
  open,
  onClose,
  children,
  height = "half",
  className,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    currentY.current = e.touches[0].clientY - startY.current;
    if (sheetRef.current && currentY.current > 0) {
      sheetRef.current.style.transform = `translateY(${currentY.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    if (currentY.current > 80) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    currentY.current = 0;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-card border-t border-border/50 shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
          className
        )}
        style={{ maxHeight: heightMap[height], overflowY: "auto" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div
          className="overflow-y-auto"
          style={{
            maxHeight: `calc(${heightMap[height]} - 2rem)`,
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {children as any}
        </div>
      </div>
    </>
  );
}
