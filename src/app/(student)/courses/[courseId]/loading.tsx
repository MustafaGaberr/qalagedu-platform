import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailsLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5 lg:gap-6">
      <div className="rounded-lg border bg-card p-5">
        <Skeleton className="h-8 w-2/3 max-w-xl" />
        <Skeleton className="mt-3 h-5 w-full max-w-3xl" />
        <Skeleton className="mt-5 h-44 w-full" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-4 h-24 w-full" />
                <Skeleton className="mt-4 h-4 w-3/4" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-4">
            <Skeleton className="h-6 w-36" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="mt-4 h-24 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-4 h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
