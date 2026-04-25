import { Skeleton } from "./skeleton";

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="avatar" className="h-10 w-10" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton variant="text" className="h-3 w-3/4" />
          <Skeleton variant="text" className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton variant="text" className="h-8 w-1/3" />
    </div>
  );
}
