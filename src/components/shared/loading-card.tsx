import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type LoadingCardProps = {
  lines?: number;
};

export function LoadingCard({ lines = 3 }: LoadingCardProps) {
  return (
    <Card aria-busy="true" aria-label="جار تحميل المحتوى">
      <CardHeader>
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            className={index === lines - 1 ? "h-4 w-1/2" : "h-4 w-full"}
          />
        ))}
      </CardContent>
    </Card>
  );
}
