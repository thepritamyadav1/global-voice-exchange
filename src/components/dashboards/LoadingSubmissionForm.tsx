
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSubmissionForm = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header skeleton */}
      <div className="flex flex-col justify-between mb-8">
        <Skeleton className="h-9 w-64 mb-4 rounded-lg" />
        <Skeleton className="h-5 w-80 mb-6 rounded-md" />
        <div className="space-y-3 mt-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
          <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
            <div className="skeleton h-full w-2/3 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Enhanced Card skeleton with better visual hierarchy */}
      <div className="rounded-xl border bg-card shadow-md overflow-hidden transition-all hover:shadow-lg">
        {/* Card header */}
        <div className="p-6 bg-muted/30">
          <Skeleton className="h-7 w-56 mb-3 rounded-lg" />
          <Skeleton className="h-5 w-72 rounded-md" />
        </div>
        
        {/* Card content with improved grid layout */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="transition-all hover:scale-[1.02]">
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Card footer */}
        <div className="p-6 border-t flex justify-end">
          <Skeleton className="h-11 w-36 rounded-pill" />
        </div>
      </div>
    </div>
  );
};
