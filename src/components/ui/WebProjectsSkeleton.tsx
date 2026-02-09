import { Skeleton } from "./Skeleton";

export default function WebProjectsSkeleton() {
  // Create an array of 6 items to fill the grid (standard for a 3-column layout)
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-8 md:gap-y-12 xl:gap-y-16 pb-20">
      {skeletonCards.map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          {/* Card Image Area */}
          <Skeleton className="w-full min-h-[300px] rounded-2xl border-2 border-zinc-800" />

          {/* Title Area - matching your font-lekton size */}
          <Skeleton className="h-8 w-3/4 rounded-md" />
        </div>
      ))}
    </div>
  );
}
