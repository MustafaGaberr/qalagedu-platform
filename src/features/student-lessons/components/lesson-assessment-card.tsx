import Link from "next/link";
import { ClipboardListIcon, FileCheck2Icon, LockIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import type { LessonAssessmentPlaceholder } from "@/features/student-lessons/types/lessons";
import {
  isOpenableLessonStatus,
  lessonStatusTone,
} from "@/features/student-lessons/lib/lesson-status";

type LessonAssessmentCardProps = {
  assessment: LessonAssessmentPlaceholder | null;
};

export function LessonAssessmentCard({ assessment }: LessonAssessmentCardProps) {
  if (!assessment) {
    return (
      <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
        <h2 className="text-xl font-semibold text-foreground">اختبار أو واجب</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          لا يوجد اختبار أو واجب مرتبط بهذا الدرس حاليا.
        </p>
      </section>
    );
  }

  const canOpen = isOpenableLessonStatus(assessment.status);
  const href =
    assessment.status === "completed" && assessment.resultAttemptId
      ? `/results/${assessment.resultAttemptId}`
      : canOpen && assessment.examId
        ? `/exams/${assessment.examId}`
        : null;

  return (
    <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <ClipboardListIcon aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              {assessment.title}
            </h2>
            <StatusBadge status={lessonStatusTone[assessment.status]}>
              {assessment.statusLabel}
            </StatusBadge>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {assessment.typeLabel} - {assessment.availability} -{" "}
            {assessment.estimatedWork}
          </p>
        </div>
      </div>
      {href ? (
        <Button
          render={<Link href={href} />}
          nativeButton={false}
          className="mt-4 w-full"
          variant={assessment.status === "completed" ? "secondary" : "outline"}
        >
          {assessment.status === "completed" ? (
            <FileCheck2Icon data-icon="inline-start" />
          ) : (
            <ClipboardListIcon data-icon="inline-start" />
          )}
          {assessment.status === "completed" ? "عرض النتيجة" : assessment.actionLabel}
        </Button>
      ) : (
        <Button className="mt-4 w-full" disabled variant="secondary">
          <LockIcon data-icon="inline-start" />
          {assessment.actionLabel}
        </Button>
      )}
    </section>
  );
}
