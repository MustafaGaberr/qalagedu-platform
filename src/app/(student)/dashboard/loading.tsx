import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5 lg:gap-6">
      <div className="rounded-lg border bg-card p-5 shadow-sm shadow-foreground/5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-8 w-2/3 max-w-xl" />
        <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div className="flex flex-col gap-5">
          <div className="rounded-lg border bg-card p-5">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-4 h-32 w-full" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-4 h-10 w-36" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-4 h-8 w-16" />
                <Skeleton className="mt-3 h-4 w-28" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-4 h-28 w-full" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-4 h-9 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-lg border bg-card p-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-4 h-20 w-full" />
              <Skeleton className="mt-3 h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
