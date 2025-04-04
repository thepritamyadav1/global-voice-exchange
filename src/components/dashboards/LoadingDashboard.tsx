
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-5 w-60" />
          <Skeleton className="h-4 w-32 mt-1" />
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      
      {/* Tabs skeleton */}
      <Skeleton className="h-10 w-72 mb-4" />
      
      {/* Content skeleton - Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      
      {/* Analytics preview skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
      
      {/* Recent activity skeleton */}
      <div>
        <Skeleton className="h-6 w-40 mb-2" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
};
