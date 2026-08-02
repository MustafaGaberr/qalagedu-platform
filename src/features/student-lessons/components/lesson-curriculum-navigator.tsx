"use client";

import Link from "next/link";
import {
  CalendarClockIcon,
  CheckCircle2Icon,
  ListTreeIcon,
  LockIcon,
  PlayCircleIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type {
  LessonCurriculumModule,
  LessonNavigationItem,
} from "@/features/student-lessons/types/lessons";
import { lessonStatusTone } from "@/features/student-lessons/lib/lesson-status";
import { cn } from "@/lib/utils";

type LessonCurriculumNavigatorProps = {
  modules: LessonCurriculumModule[];
  currentLessonId: string;
};

const statusIcon = {
  available: PlayCircleIcon,
  completed: CheckCircle2Icon,
  locked: LockIcon,
  scheduled: CalendarClockIcon,
};

export function LessonCurriculumNavigator({
  modules,
  currentLessonId,
}: LessonCurriculumNavigatorProps) {
  const content = (
    <CurriculumList modules={modules} currentLessonId={currentLessonId} />
  );

  return (
    <>
      <section className="hidden rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 xl:block">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">منهج الكورس</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            تنقل بين الدروس المتاحة والمكتملة.
          </p>
        </div>
        {content}
      </section>
      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-center"
                )}
              />
            }
          >
            <ListTreeIcon data-icon="inline-start" />
            عرض منهج الكورس
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto">
            <SheetHeader className="text-start">
              <SheetTitle>منهج الكورس</SheetTitle>
              <SheetDescription>
                الدروس المتاحة والمكتملة تفتح صفحة الدرس مباشرة.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4">{content}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function CurriculumList({
  modules,
  currentLessonId,
}: LessonCurriculumNavigatorProps) {
  return (
    <div className="flex flex-col gap-4">
      {modules.map((module) => (
        <div key={module.id} className="rounded-lg border bg-background p-3">
          <div className="mb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                الوحدة {module.order}: {module.title}
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">
                {module.progress}%
              </span>
            </div>
            <Progress value={module.progress} className="mt-2">
              <ProgressLabel className="sr-only">تقدم الوحدة</ProgressLabel>
            </Progress>
          </div>
          <div className="flex flex-col gap-2">
            {module.lessons.map((lesson) => (
              <CurriculumLesson
                key={lesson.id}
                lesson={lesson}
                isCurrent={lesson.id === currentLessonId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CurriculumLesson({
  lesson,
  isCurrent,
}: {
  lesson: LessonNavigationItem;
  isCurrent: boolean;
}) {
  const Icon = statusIcon[lesson.status];
  const className = cn(
    "flex min-h-12 items-center gap-2 rounded-lg border px-3 py-2 text-start text-sm transition",
    isCurrent
      ? "border-primary/30 bg-primary/10 text-primary"
      : "border-border bg-card text-foreground hover:bg-muted",
    !lesson.href && "cursor-not-allowed opacity-70 hover:bg-card"
  );
  const content = (
    <>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-primary">
        {lesson.lessonNumber}
      </span>
      <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
      <StatusBadge status={lessonStatusTone[lesson.status]} className="shrink-0">
        <Icon aria-hidden="true" className="size-3.5" />
        <span className="sr-only">{lesson.statusLabel}</span>
      </StatusBadge>
    </>
  );

  if (!lesson.href) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link href={lesson.href} className={className} aria-current={isCurrent ? "page" : undefined}>
      {content}
    </Link>
  );
}
