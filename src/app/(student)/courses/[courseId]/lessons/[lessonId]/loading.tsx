import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5 lg:gap-6">
      <div className="rounded-lg border bg-card p-5">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-5 h-10 w-2/3 max-w-2xl" />
        <Skeleton className="mt-3 h-5 w-full max-w-3xl" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-5">
          <div className="rounded-lg border bg-card p-4">
            <Skeleton className="aspect-video min-h-56 w-full" />
            <Skeleton className="mt-4 h-16 w-full" />
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
