"use client";

import { useMemo, useState } from "react";
import { CheckCircle2Icon, PlayCircleIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type { LessonStatus } from "@/features/student-courses/types/courses";
import { isOpenableLessonStatus } from "@/features/student-lessons/lib/lesson-status";

type LessonProgressActionsProps = {
  initialCompleted: boolean;
  status: LessonStatus;
  actionLabel: string;
};

export function LessonProgressActions({
  initialCompleted,
  status,
  actionLabel,
}: LessonProgressActionsProps) {
  const [started, setStarted] = useState(initialCompleted);
  const [completed, setCompleted] = useState(initialCompleted);

  const progressValue = useMemo(() => {
    if (completed) {
      return 100;
    }

    return started ? 46 : 0;
  }, [completed, started]);

  const canInteract = isOpenableLessonStatus(status);

  if (!canInteract) {
    return (
      <div className="rounded-lg border bg-muted/40 p-3 text-sm leading-6 text-muted-foreground">
        هذا الدرس يظهر ضمن الخطة فقط الآن، وستعمل أزرار المشاهدة عند فتحه.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-background p-3">
      <Progress value={progressValue}>
        <ProgressLabel>تقدم المشاهدة التجريبي</ProgressLabel>
        <span className="ms-auto text-sm text-muted-foreground tabular-nums">
          {progressValue}%
        </span>
      </Progress>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => {
            setStarted(true);
            setCompleted(false);
          }}
          variant={completed ? "outline" : "default"}
        >
          <PlayCircleIcon data-icon="inline-start" />
          {started ? "أكمل المشاهدة" : actionLabel}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setStarted(true);
            setCompleted(true);
          }}
          variant={completed ? "secondary" : "outline"}
        >
          <CheckCircle2Icon data-icon="inline-start" />
          {completed ? "علّمت الدرس كمكتمل" : "علّم كمكتمل"}
        </Button>
        {started ? (
          <Button
            type="button"
            onClick={() => {
              setStarted(false);
              setCompleted(initialCompleted);
            }}
            variant="ghost"
          >
            <RotateCcwIcon data-icon="inline-start" />
            إعادة الحالة
          </Button>
        ) : null}
      </div>
    </div>
  );
}
