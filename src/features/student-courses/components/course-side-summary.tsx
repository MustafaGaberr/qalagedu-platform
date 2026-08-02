import {
  CalendarClockIcon,
  GraduationCapIcon,
  PlayCircleIcon,
  UserRoundIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type { StudentCourseDetails } from "@/features/student-courses/types/courses";

type CourseSideSummaryProps = {
  course: StudentCourseDetails;
};

export function CourseSideSummary({ course }: CourseSideSummaryProps) {
  const canContinue =
    course.enrollmentStatus !== "requires-renewal" && Boolean(course.nextLesson);

  return (
    <aside className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5 lg:sticky lg:top-24">
      <div className="flex flex-col gap-4 text-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            ملخص سريع
          </p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">
            {course.subject}
          </h2>
        </div>
        <StatusBadge
          status={
            course.enrollmentStatus === "requires-renewal"
              ? "warning"
              : course.enrollmentStatus === "completed"
                ? "muted"
                : "success"
          }
        >
          {course.subscriptionStatus}
        </StatusBadge>
        <Progress value={course.progress}>
          <ProgressLabel>التقدم</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {course.progress}%
          </span>
        </Progress>
        <div className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground">
          <span className="inline-flex items-start gap-2">
            <PlayCircleIcon className="mt-1 size-4 shrink-0 text-primary" />
            الدرس التالي: {course.nextLesson ?? "لا يوجد درس تال"}
          </span>
          <span className="inline-flex items-start gap-2">
            <UserRoundIcon className="mt-1 size-4 shrink-0 text-primary" />
            {course.teacher} • {course.group}
          </span>
          <span className="inline-flex items-start gap-2">
            <CalendarClockIcon className="mt-1 size-4 shrink-0 text-primary" />
            {course.nextSession ?? "لا توجد حصة قادمة"}
          </span>
          <span className="inline-flex items-start gap-2">
            <GraduationCapIcon className="mt-1 size-4 shrink-0 text-primary" />
            {course.grade}
          </span>
        </div>
        <Button disabled={!canContinue}>
          {course.nextLesson ? course.nextLessonActionLabel : "لا يوجد درس متاح"}
        </Button>
      </div>
    </aside>
  );
}
