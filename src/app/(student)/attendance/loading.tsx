import { LoadingCard } from "@/components/shared/loading-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5 lg:gap-6">
      <div className="rounded-lg border bg-card p-5">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingCard key={index} lines={2} />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.65fr)]">
        <LoadingCard lines={4} />
        <LoadingCard lines={4} />
      </div>
      <LoadingCard lines={6} />
    </div>
  );
}
