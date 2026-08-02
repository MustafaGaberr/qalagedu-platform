import { LoadingCard } from "@/components/shared/loading-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentCardLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5 lg:gap-6">
      <div className="rounded-lg border bg-card p-5">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-lg border bg-card p-5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-8 h-20 w-20 rounded-full" />
          <Skeleton className="mt-5 h-8 w-2/3" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <Skeleton className="mx-auto h-40 w-40" />
          <Skeleton className="mx-auto mt-4 h-5 w-28" />
          <Skeleton className="mt-5 h-20 w-full" />
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.65fr)]">
        <LoadingCard lines={5} />
        <LoadingCard lines={4} />
      </div>
    </div>
  );
}
