import { Skeleton } from "@/components/ui/skeleton";

export default function ExamTakeLoading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-4">
      <Skeleton className="h-36 w-full rounded-lg" />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-72 w-full rounded-lg" />
      </div>
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}
