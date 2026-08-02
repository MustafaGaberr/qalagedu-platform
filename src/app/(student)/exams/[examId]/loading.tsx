import { Skeleton } from "@/components/ui/skeleton";

export default function ExamDetailsLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-5">
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  );
}
