import { Skeleton } from "./skeleton";

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
          <Skeleton variant="avatar" className="h-8 w-8 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton variant="text" className="h-3 w-2/3" />
            <Skeleton variant="text" className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
