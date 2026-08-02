import Link from "next/link";
import { CheckCircle2Icon, FileTextIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type { StudentResultSummary } from "@/features/student-exams/types/exams";
import { cn } from "@/lib/utils";

type ResultSummaryCardProps = {
  result: StudentResultSummary;
};

export function ResultSummaryCard({ result }: ResultSummaryCardProps) {
  return (
    <article className="grid gap-4 rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={result.passed ? "success" : "warning"}>
            <CheckCircle2Icon aria-hidden="true" data-icon="inline-start" />
            {result.statusLabel}
          </StatusBadge>
          <span className="text-sm text-muted-foreground">{result.subject}</span>
        </div>
        <h2 className="mt-2 text-lg font-semibold leading-7 text-foreground">
          {result.examTitle}
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {result.courseTitle}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>{result.submittedAt}</span>
          <span>
            {result.score}/{result.totalScore} درجة
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Progress value={result.percentage}>
          <ProgressLabel>نسبة الدرجة</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {result.percentage}%
          </span>
        </Progress>
        <Link
          href={`/results/${result.id}`}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          <FileTextIcon data-icon="inline-start" />
          عرض التفاصيل
        </Link>
      </div>
    </article>
  );
}
