import Link from "next/link";
import {
  CalendarClockIcon,
  ClipboardListIcon,
  FileCheck2Icon,
  LockIcon,
  TimerIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { examStatusTone } from "@/features/student-exams/lib/exam-status";
import type { StudentExamSummary } from "@/features/student-exams/types/exams";
import { cn } from "@/lib/utils";

type ExamCardProps = {
  exam: StudentExamSummary;
};

export function ExamCard({ exam }: ExamCardProps) {
  const attemptsRemaining = exam.attemptsAllowed - exam.attemptsUsed;
  const canStart = exam.status === "available" && attemptsRemaining > 0;
  const resultHref =
    exam.status === "completed" && exam.resultAttemptId
      ? `/results/${exam.resultAttemptId}`
      : null;

  return (
    <article className="grid gap-4 rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={examStatusTone[exam.status]}>
            {exam.statusLabel}
          </StatusBadge>
          <StatusBadge status="muted">{exam.typeLabel}</StatusBadge>
          <span className="text-sm text-muted-foreground">{exam.subject}</span>
        </div>
        <h2 className="mt-2 text-lg font-semibold leading-7 text-foreground">
          {exam.title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {exam.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs leading-5 text-muted-foreground">
          <span>{exam.teacher}</span>
          <span className="inline-flex items-center gap-1">
            <ClipboardListIcon aria-hidden="true" className="size-3.5 text-primary" />
            {exam.totalQuestions} أسئلة - {exam.totalScore} درجة
          </span>
          <span className="inline-flex items-center gap-1">
            <TimerIcon aria-hidden="true" className="size-3.5 text-primary" />
            {exam.durationMinutes} دقيقة
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarClockIcon aria-hidden="true" className="size-3.5 text-primary" />
            {exam.dueDate}
          </span>
          <span>
            المحاولات {exam.attemptsUsed}/{exam.attemptsAllowed}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:w-48 lg:flex-col">
        <Link
          href={`/exams/${exam.id}`}
          className={cn(buttonVariants({ variant: "outline" }), "flex-1 lg:w-full")}
        >
          <ClipboardListIcon data-icon="inline-start" />
          عرض التعليمات
        </Link>
        {canStart ? (
          <Link
            href={`/exams/${exam.id}/take`}
            className={cn(buttonVariants(), "flex-1 lg:w-full")}
          >
            ابدأ الاختبار
          </Link>
        ) : resultHref ? (
          <Link
            href={resultHref}
            className={cn(buttonVariants({ variant: "secondary" }), "flex-1 lg:w-full")}
          >
            <FileCheck2Icon data-icon="inline-start" />
            عرض النتيجة
          </Link>
        ) : (
          <Button disabled variant="secondary" className="flex-1 lg:w-full">
            <LockIcon data-icon="inline-start" />
            غير متاح بعد
          </Button>
        )}
      </div>
    </article>
  );
}
