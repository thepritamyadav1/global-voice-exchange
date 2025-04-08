
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSubmissionForm = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col justify-between mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
      
      {/* Card skeleton */}
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="p-6 bg-muted/30">
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        
        {/* Card content */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        </div>
        
        {/* Card footer */}
        <div className="p-6 border-t flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};
