import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  Clock3Icon,
  PlayCircleIcon,
  UsersRoundIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { CourseVisual } from "@/features/student-dashboard/components/course-visual";
import type {
  CourseEnrollmentStatus,
  StudentCourseDetails,
} from "@/features/student-courses/types/courses";
import { isOpenableLessonStatus } from "@/features/student-lessons/lib/lesson-status";

type CourseDetailHeaderProps = {
  course: StudentCourseDetails;
};

const statusTone: Record<
  CourseEnrollmentStatus,
  "success" | "warning" | "muted"
> = {
  active: "success",
  completed: "muted",
  "requires-renewal": "warning",
};

export function CourseDetailHeader({ course }: CourseDetailHeaderProps) {
  const nextLesson = course.nextLessonId
    ? course.modules
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.id === course.nextLessonId)
    : null;
  const continueHref =
    course.enrollmentStatus !== "requires-renewal" &&
    nextLesson &&
    isOpenableLessonStatus(nextLesson.status)
      ? `/courses/${course.id}/lessons/${nextLesson.id}`
      : null;

  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5 sm:p-5">
      <div className="mb-4">
        <Button
          render={<Link href="/courses" />}
          nativeButton={false}
          variant="ghost"
          size="sm"
        >
          <ArrowRightIcon data-icon="inline-start" />
          العودة إلى كورساتي
        </Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-stretch">
        <div className="flex min-w-0 flex-col gap-4 text-start">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={statusTone[course.enrollmentStatus]}>
              {course.enrollmentStatusLabel}
            </StatusBadge>
            <span className="text-sm text-muted-foreground">
              {course.subject}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {course.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <BookOpenCheckIcon
                aria-hidden="true"
                className="size-4 text-primary"
              />
              {course.teacherInfo.name} - {course.teacherInfo.title}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UsersRoundIcon aria-hidden="true" className="size-4 text-primary" />
              {course.grade} - {course.group}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3Icon aria-hidden="true" className="size-4 text-primary" />
              {course.lastActivity}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <Progress value={course.progress}>
              <ProgressLabel>إجمالي التقدم</ProgressLabel>
              <span className="ms-auto text-sm text-muted-foreground tabular-nums">
                {course.progress}%
              </span>
            </Progress>
            {continueHref ? (
              <Button
                render={<Link href={continueHref} />}
                nativeButton={false}
                size="lg"
                className="w-full lg:w-auto"
              >
                <PlayCircleIcon data-icon="inline-start" />
                {course.nextLessonActionLabel}
              </Button>
            ) : (
              <Button size="lg" disabled className="w-full lg:w-auto">
                <PlayCircleIcon data-icon="inline-start" />
                {course.nextLesson ? course.nextLessonActionLabel : "لا يوجد درس تال"}
              </Button>
            )}
          </div>
        </div>
        <CourseVisual
          tone={course.tone}
          label={course.subject}
          className="min-h-48 w-full max-w-64 justify-self-start"
        />
      </div>
    </section>
  );
}
