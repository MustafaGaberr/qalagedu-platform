import Link from "next/link";
import {
  ArrowUpLeftIcon,
  CalendarClockIcon,
  Clock3Icon,
  Layers3Icon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { CourseVisual } from "@/features/student-dashboard/components/course-visual";
import type {
  CourseEnrollmentStatus,
  StudentCourseSummary,
} from "@/features/student-courses/types/courses";

type MyCourseCardProps = {
  course: StudentCourseSummary;
};

const statusTone: Record<
  CourseEnrollmentStatus,
  "success" | "warning" | "muted"
> = {
  active: "success",
  completed: "muted",
  "requires-renewal": "warning",
};

export function MyCourseCard({ course }: MyCourseCardProps) {
  const hasCourseAccess = course.enrollmentStatus !== "requires-renewal";

  return (
    <Card className="h-full bg-card/95">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-start">
            <p className="text-sm font-medium text-primary">{course.subject}</p>
            <CardTitle className="mt-1 text-xl font-semibold leading-7">
              {course.title}
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {course.teacher} • {course.grade}
            </p>
          </div>
          <StatusBadge status={statusTone[course.enrollmentStatus]}>
            {course.enrollmentStatusLabel}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <CourseVisual tone={course.tone} label={course.subject} />
        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <span className="inline-flex items-center gap-1.5">
            <Layers3Icon aria-hidden="true" className="size-4 text-primary" />
            {course.completedLessons} من {course.totalLessons} دروس
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarClockIcon
              aria-hidden="true"
              className="size-4 text-primary"
            />
            {course.nextSession ?? "لا توجد حصة قادمة"}
          </span>
        </div>
        <Progress value={course.progress}>
          <ProgressLabel>تقدم الكورس</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {course.progress}%
          </span>
        </Progress>
        <div className="rounded-lg bg-secondary/60 p-3 text-start">
          <p className="text-xs text-muted-foreground">الدرس التالي</p>
          <p className="mt-1 text-sm font-medium leading-6 text-foreground">
            {course.nextLesson ?? "اكتملت كل الدروس المتاحة"}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs leading-5 text-muted-foreground">
            <Clock3Icon aria-hidden="true" className="size-4 text-primary" />
            <span>{course.lastActivity}</span>
            <span>•</span>
            <span>{course.subscriptionStatus}</span>
          </div>
          {hasCourseAccess ? (
            <Button
              render={<Link href={`/courses/${course.id}`} />}
              nativeButton={false}
            >
              {course.enrollmentStatus === "completed"
                ? "عرض التفاصيل"
                : "متابعة الكورس"}
              <ArrowUpLeftIcon data-icon="inline-end" />
            </Button>
          ) : (
            <Button
              render={<Link href="/subscriptions" />}
              nativeButton={false}
              variant="outline"
            >
              عرض التفاصيل
              <ArrowUpLeftIcon data-icon="inline-end" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
