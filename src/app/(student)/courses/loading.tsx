import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5 lg:gap-6">
      <div className="rounded-lg border bg-card p-5">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-card p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-8 w-12" />
            <Skeleton className="mt-3 h-4 w-28" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card p-3">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-card p-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-4 h-32 w-full" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-4 h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
