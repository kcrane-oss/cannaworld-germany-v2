import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "card" | "avatar" | "chart" | "list-item" | "table-row";

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ variant = "text", className, width, height }: SkeletonProps) {
  const variantClasses: Record<SkeletonVariant, string> = {
    text: "h-4 w-full rounded",
    card: "h-32 w-full rounded-xl",
    avatar: "h-10 w-10 rounded-full",
    chart: "h-48 w-full rounded-xl",
    "list-item": "h-12 w-full rounded-lg",
    "table-row": "h-10 w-full rounded",
  };
  return (
    <div
      className={cn("skeleton-shimmer", variantClasses[variant], className)}
      style={{ width, height }}
    />
  );
}
