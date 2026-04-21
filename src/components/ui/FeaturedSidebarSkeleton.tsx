import { Skeleton } from "./Skeleton";

export default function FeaturedSidebarSkeleton() {
  // We create an array of 5 items to fill the sidebar space
  const skeletonItems = Array.from({ length: 5 });

  return (
    <div className="flex flex-col h-full max-h-212.5 xl:max-h-none">
      {/* Matching Title Skeleton */}
      <Skeleton className="h-9 xl:h-12 w-48 mb-4 xl:mb-2" />

      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar pb-4">
        {skeletonItems.map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center gap-4 py-4 xl:py-3 px-2">
              {/* Thumbnail Box Skeleton */}
              <div className="relative shrink-0">
                <Skeleton className="h-16 w-22.5 xl:h-20 xl:w-27.5 rounded-xl border border-white/5" />

                {/* The "Knockout" Circle Skeleton */}
                <div className="absolute -bottom-1.5 -left-1.5 w-8 h-8 xl:w-9 xl:h-9 bg-card rounded-full flex items-center justify-center border-4 xl:border-[5px] border-card z-20">
                  <Skeleton className="w-full h-full rounded-full" />
                </div>
              </div>

              {/* Title Text Skeleton Lines */}
              <div className="flex flex-col flex-1 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            {/* Matching Separator */}
            {index !== skeletonItems.length - 1 && (
              <div className="border-b border-white/10 w-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
