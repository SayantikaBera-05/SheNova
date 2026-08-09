import { Skeleton } from "@/components/ui/skeleton";
import { GlassCard } from "../shared/GlassCard";

export function LoadingSkeletons() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Mood Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="w-64 h-16 rounded-full bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Captions Skeleton */}
        <GlassCard className="space-y-4">
          <Skeleton className="w-32 h-8 bg-white/10" />
          <div className="space-y-2">
            <Skeleton className="w-full h-24 bg-white/10" />
            <Skeleton className="w-2/3 h-6 bg-white/10" />
          </div>
        </GlassCard>

        {/* Music Skeleton */}
        <GlassCard className="space-y-4">
          <Skeleton className="w-32 h-8 bg-white/10" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="w-16 h-16 rounded-md bg-white/10" />
              <div className="space-y-2 flex-1">
                <Skeleton className="w-3/4 h-4 bg-white/10" />
                <Skeleton className="w-1/2 h-3 bg-white/10" />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
