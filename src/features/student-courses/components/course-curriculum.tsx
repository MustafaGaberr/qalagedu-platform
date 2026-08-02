"use client";

import {
  CalendarClockIcon,
  CheckCircle2Icon,
  ClipboardListIcon,
  FileTextIcon,
  LockIcon,
  PlayCircleIcon,
  TimerIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type {
  CourseLesson,
  CourseModule,
  LessonStatus,
  LessonType,
} from "@/features/student-courses/types/courses";

type CourseCurriculumProps = {
  modules: CourseModule[];
};

const lessonStatusIcon = {
  available: PlayCircleIcon,
  completed: CheckCircle2Icon,
  locked: LockIcon,
  scheduled: CalendarClockIcon,
} satisfies Record<LessonStatus, typeof PlayCircleIcon>;

const lessonStatusTone = {
  available: "success",
  completed: "muted",
  locked: "warning",
  scheduled: "warning",
} as const satisfies Record<LessonStatus, "success" | "muted" | "warning">;

const lessonTypeLabel = {
  video: "فيديو",
  revision: "مراجعة",
  exam: "اختبار",
  assignment: "واجب",
} satisfies Record<LessonType, string>;

export function CourseCurriculum({ modules }: CourseCurriculumProps) {
  if (modules.length === 0) {
    return (
      <section className="rounded-lg border bg-card p-5 text-start">
        <h2 className="text-xl font-semibold">منهج الكورس</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          لم يتم نشر وحدات لهذا الكورس بعد.
        </p>
      </section>
    );
  }

  return (
    <section className="min-w-0 rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5 sm:p-5">
      <div className="mb-4 text-start">
        <h2 className="text-xl font-semibold text-foreground">منهج الكورس</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          الوحدات والدروس مرتبة حسب خطة المعلم، مع توضيح حالة كل درس.
        </p>
      </div>
      <Accordion defaultValue={modules[0] ? [modules[0].id] : []} className="gap-3">
        {modules.map((module) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="rounded-lg border bg-background px-3 not-last:border-b"
          >
            <AccordionTrigger className="py-4 no-underline hover:no-underline">
              <div className="min-w-0 flex-1 overflow-hidden text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    الوحدة {module.order}
                  </span>
                  <StatusBadge status="muted">
                    {module.lessons.length} دروس
                  </StatusBadge>
                </div>
                <h3 className="mt-2 text-base font-semibold leading-6 text-foreground">
                  {module.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {module.description}
                </p>
                <div className="mt-3 max-w-md">
                  <Progress value={module.progress}>
                    <ProgressLabel>تقدم الوحدة</ProgressLabel>
                    <span className="ms-auto text-sm text-muted-foreground tabular-nums">
                      {module.progress}%
                    </span>
                  </Progress>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-col gap-2">
                {module.lessons.map((lesson) => (
                  <LessonRow key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function LessonRow({ lesson }: { lesson: CourseLesson }) {
  const StatusIcon = lessonStatusIcon[lesson.status];
  const actionDisabled =
    lesson.status === "locked" || lesson.status === "scheduled";

  return (
    <article className="grid gap-3 rounded-lg border bg-card p-3 text-start lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-primary">
            {lesson.order}
          </span>
          <StatusBadge status={lessonStatusTone[lesson.status]}>
            <StatusIcon aria-hidden="true" data-icon="inline-start" />
            {lesson.statusLabel}
          </StatusBadge>
          <StatusBadge status="muted">
            {lessonTypeLabel[lesson.type]}
          </StatusBadge>
        </div>
        <h4 className="mt-2 text-base font-semibold leading-6 text-foreground">
          {lesson.title}
        </h4>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {lesson.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs leading-5 text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <TimerIcon aria-hidden="true" className="size-3.5 text-primary" />
            {lesson.durationMinutes} دقيقة
          </span>
          {lesson.resourcesCount > 0 ? (
            <span className="inline-flex items-center gap-1">
              <FileTextIcon aria-hidden="true" className="size-3.5 text-primary" />
              {lesson.resourcesCount} ملفات
            </span>
          ) : null}
          {lesson.hasExam ? (
            <span className="inline-flex items-center gap-1">
              <ClipboardListIcon
                aria-hidden="true"
                className="size-3.5 text-primary"
              />
              يوجد اختبار مرتبط
            </span>
          ) : null}
          {lesson.availabilityDate ? <span>{lesson.availabilityDate}</span> : null}
          {lesson.lockedReason ? <span>{lesson.lockedReason}</span> : null}
        </div>
      </div>
      <Button disabled={actionDisabled} variant={actionDisabled ? "secondary" : "outline"}>
        {lesson.actionLabel}
      </Button>
    </article>
  );
}
