import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <Skeleton className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl" />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function GridSkeleton({ cols = 3 }: { cols?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
      {[...Array(cols * 2)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-12 pt-20">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      <HeroSkeleton />
      <GridSkeleton cols={3} />
    </div>
  );
}
