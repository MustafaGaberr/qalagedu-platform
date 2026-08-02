import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  CalendarDaysIcon,
  GraduationCapIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import type { StudentLessonDetails } from "@/features/student-lessons/types/lessons";
import { lessonStatusTone } from "@/features/student-lessons/lib/lesson-status";

type LessonHeaderProps = {
  lesson: StudentLessonDetails;
};

export function LessonHeader({ lesson }: LessonHeaderProps) {
  return (
    <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
      <Button
        render={<Link href={`/courses/${lesson.courseId}`} />}
        nativeButton={false}
        variant="ghost"
        size="sm"
      >
        <ArrowRightIcon data-icon="inline-start" />
        العودة إلى الكورس
      </Button>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={lessonStatusTone[lesson.status]}>
            {lesson.statusLabel}
          </StatusBadge>
          <StatusBadge status="muted">{lesson.typeLabel}</StatusBadge>
          <span className="text-sm text-muted-foreground">
            الدرس {lesson.lessonNumber}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-primary">{lesson.courseSubject}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {lesson.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpenCheckIcon aria-hidden="true" className="size-4 text-primary" />
            {lesson.courseTitle}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCapIcon aria-hidden="true" className="size-4 text-primary" />
            {lesson.moduleTitle}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDaysIcon aria-hidden="true" className="size-4 text-primary" />
            {lesson.publishedDate}
          </span>
        </div>
      </div>
    </section>
  );
}
