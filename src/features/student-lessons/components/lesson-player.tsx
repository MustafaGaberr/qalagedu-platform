import {
  CalendarClockIcon,
  CheckCircle2Icon,
  LockIcon,
  PlayCircleIcon,
  TimerIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import type { StudentLessonDetails } from "@/features/student-lessons/types/lessons";
import { lessonStatusTone } from "@/features/student-lessons/lib/lesson-status";

import { LessonProgressActions } from "./lesson-progress-actions";

type LessonPlayerProps = {
  lesson: StudentLessonDetails;
};

const stateIcon = {
  available: PlayCircleIcon,
  completed: CheckCircle2Icon,
  locked: LockIcon,
  scheduled: CalendarClockIcon,
};

export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const StateIcon = stateIcon[lesson.status];
  const unavailableMessage =
    lesson.status === "locked"
      ? (lesson.lockedReason ?? "هذا الدرس مغلق في الخطة الحالية.")
      : lesson.status === "scheduled"
        ? (lesson.availabilityDate ?? "هذا الدرس مجدول للفتح لاحقا.")
        : null;

  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm shadow-foreground/5">
      <div className="relative aspect-video min-h-56 bg-foreground text-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.35),transparent_32%),linear-gradient(135deg,hsl(var(--foreground)),hsl(var(--foreground)/0.82))]" />
        <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={lessonStatusTone[lesson.status]}>
              <StateIcon aria-hidden="true" data-icon="inline-start" />
              {lesson.statusLabel}
            </StatusBadge>
            <span className="rounded-lg bg-background/10 px-3 py-1 text-xs font-medium text-background/85 ring-1 ring-background/15">
              {lesson.videoSourcePlaceholder}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="min-w-0 text-start">
              <p className="text-sm text-background/70">{lesson.moduleTitle}</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight text-background sm:text-3xl">
                {lesson.title}
              </h2>
              {unavailableMessage ? (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-background/75">
                  {unavailableMessage}
                </p>
              ) : null}
            </div>
            <div className="flex size-16 items-center justify-center rounded-full bg-background text-foreground shadow-lg shadow-background/10 sm:size-20">
              <PlayCircleIcon aria-hidden="true" className="size-9 sm:size-11" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="min-w-0 text-start">
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <TimerIcon aria-hidden="true" className="size-4 text-primary" />
              {lesson.durationMinutes} دقيقة
            </span>
            <span>{lesson.teacherName} - {lesson.teacherTitle}</span>
            <span>{lesson.publishedDate}</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {lesson.summary}
          </p>
        </div>
        <LessonProgressActions
          initialCompleted={lesson.isCompleted}
          status={lesson.status}
          actionLabel={lesson.actionLabel}
        />
      </div>
    </section>
  );
}
