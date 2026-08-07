import { cn } from "@/lib/utils";

export function CarCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="skeleton aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3.5 w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-7 w-16" />
          <div className="skeleton h-7 w-16" />
          <div className="skeleton h-7 w-16" />
        </div>
        <div className="skeleton h-11 w-full" />
      </div>
    </div>
  );
}

export default function Skeleton({ className }) {
  return <div className={cn("skeleton h-4 w-full", className)} />;
}
