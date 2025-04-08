
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced header skeleton with staggered animation */}
      <div className="flex flex-col md:flex-row justify-between mb-8 fade-in-delay-1">
        <div>
          <Skeleton className="h-8 w-40 mb-2 skeleton-wave" />
          <Skeleton className="h-5 w-60 skeleton-pulse" />
          <Skeleton className="h-4 w-32 mt-1 skeleton-wave" />
        </div>
        <div className="flex gap-3 mt-4 md:mt-0 fade-in-delay-2">
          <Skeleton className="h-10 w-40 skeleton-pulse" />
          <Skeleton className="h-10 w-32 skeleton-wave" />
        </div>
      </div>
      
      {/* Tabs skeleton with better animation */}
      <Skeleton className="h-10 w-72 mb-4 skeleton-pulse fade-in-delay-2" />
      
      {/* Content skeleton - Stats with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-delay-3">
        <Skeleton className="h-24 w-full skeleton-wave hover-lift" />
        <Skeleton className="h-24 w-full skeleton-pulse hover-lift" style={{ animationDelay: "100ms" }} />
        <Skeleton className="h-24 w-full skeleton-wave hover-lift" style={{ animationDelay: "200ms" }} />
      </div>
      
      {/* Analytics preview skeleton with improved visual feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 fade-in-delay-3">
        <div className="hover-lift transition-all">
          <Skeleton className="h-6 w-32 mb-2 skeleton-wave" />
          <Skeleton className="h-64 w-full skeleton-pulse" />
        </div>
        <div className="hover-lift transition-all" style={{ animationDelay: "150ms" }}>
          <Skeleton className="h-6 w-40 mb-2 skeleton-wave" />
          <Skeleton className="h-64 w-full skeleton-pulse" />
        </div>
      </div>
      
      {/* Recent activity skeleton with staggered loading */}
      <div className="fade-in-delay-4">
        <Skeleton className="h-6 w-40 mb-2 skeleton-wave" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton 
              key={i} 
              className="h-16 w-full skeleton-pulse hover-lift transition-all" 
              style={{ animationDelay: `${i * 100}ms` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
