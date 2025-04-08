
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSubmissionForm = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header skeleton with better animation */}
      <div className="flex flex-col justify-between mb-8">
        <Skeleton className="h-9 w-64 mb-4 rounded-lg skeleton-pulse" />
        <Skeleton className="h-5 w-80 mb-6 rounded-md skeleton-pulse" />
        <div className="space-y-3 mt-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-32 rounded-md skeleton-wave" />
            <Skeleton className="h-4 w-24 rounded-md skeleton-wave" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full skeleton-pulse" />
          <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
            <div className="skeleton-progress h-full w-2/3 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Enhanced Card skeleton with better visual hierarchy and animations */}
      <div className="rounded-xl border bg-card shadow-md overflow-hidden transition-all hover:shadow-lg hover-lift">
        {/* Card header */}
        <div className="p-6 bg-muted/30">
          <Skeleton className="h-7 w-56 mb-3 rounded-lg skeleton-wave" />
          <Skeleton className="h-5 w-72 rounded-md skeleton-pulse" />
        </div>
        
        {/* Card content with improved grid layout and animations */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="transition-all hover:scale-[1.02] staggered-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <Skeleton className="h-32 w-full rounded-xl skeleton-wave" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Card footer */}
        <div className="p-6 border-t flex justify-end">
          <Skeleton className="h-11 w-36 rounded-pill skeleton-pulse" />
        </div>
      </div>
    </div>
  );
};
