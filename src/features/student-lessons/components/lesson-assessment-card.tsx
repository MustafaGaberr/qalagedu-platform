import { ClipboardListIcon, LockIcon } from "lucide-react";

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
      <Button className="mt-4 w-full" disabled variant={canOpen ? "outline" : "secondary"}>
        {canOpen ? (
          <ClipboardListIcon data-icon="inline-start" />
        ) : (
          <LockIcon data-icon="inline-start" />
        )}
        {assessment.actionLabel}
      </Button>
    </section>
  );
}
