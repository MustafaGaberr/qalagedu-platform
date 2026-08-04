import { Skeleton } from "@/components/ui/skeleton";
export default function Loading(){return <div className="space-y-5"><Skeleton className="h-28 w-full"/><div className="grid gap-3 sm:grid-cols-4">{Array.from({length:4},(_,i)=><Skeleton key={i} className="h-20"/>)}</div>{Array.from({length:3},(_,i)=><Skeleton key={i} className="h-24"/>)}</div>}
