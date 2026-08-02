import { Skeleton } from "@/components/ui/skeleton";

export default function ResultDetailsLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5">
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  );
}
