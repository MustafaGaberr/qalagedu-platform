import {Skeleton} from "@/components/ui/skeleton";export default function Loading(){return <div className="space-y-3">{Array.from({length:5},(_,i)=><Skeleton key={i} className="h-24"/>)}</div>}
