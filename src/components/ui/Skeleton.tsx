// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-white/5 rounded-md ${className} 
      after:absolute after:inset-0 
      after:animate-shimmer 
      after:bg-linear-to-r 
      after:from-transparent after:via-white/10 after:to-transparent`}
    />
  );
}
