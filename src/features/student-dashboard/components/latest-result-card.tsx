import { TrendingUpIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress,
  ProgressLabel,
} from "@/components/ui/progress";
import type { LatestExamResult } from "@/features/student-dashboard/types/dashboard";

type LatestResultCardProps = {
  result: LatestExamResult;
};

export function LatestResultCard({ result }: LatestResultCardProps) {
  return (
    <Card id="latest-result">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="text-start">
            <CardTitle>آخر نتيجة اختبار</CardTitle>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {result.course}
            </p>
          </div>
          <StatusBadge
            status={result.status === "passed" ? "success" : "warning"}
          >
            {result.statusLabel}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div className="text-start">
            <p className="text-sm text-muted-foreground">{result.examName}</p>
            <p className="mt-2 text-3xl font-semibold leading-none text-foreground">
              {result.score}
              <span className="text-base font-medium text-muted-foreground">
                /{result.totalScore}
              </span>
            </p>
          </div>
          <div className="text-3xl font-semibold leading-none text-primary">
            {result.percentage}%
          </div>
        </div>
        <Progress value={result.percentage}>
          <ProgressLabel>نسبة الدرجة</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {result.percentage}%
          </span>
        </Progress>
        <div className="flex items-start gap-2 rounded-lg bg-secondary/70 p-3 text-sm leading-6 text-muted-foreground">
          <TrendingUpIcon
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-primary"
          />
          <p>{result.message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
