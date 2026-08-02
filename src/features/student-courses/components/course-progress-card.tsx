import { CircleCheckBigIcon, NavigationIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type { StudentCourseDetails } from "@/features/student-courses/types/courses";

type CourseProgressCardProps = {
  course: StudentCourseDetails;
};

export function CourseProgressCard({ course }: CourseProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تقدمك في الكورس</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={course.progress}>
          <ProgressLabel>نسبة الإكمال</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {course.progress}%
          </span>
        </Progress>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-background p-3 text-start">
            <p className="text-xs text-muted-foreground">وحدات مكتملة</p>
            <p className="mt-1 text-xl font-semibold">
              {course.completedModules} من {course.totalModules}
            </p>
          </div>
          <div className="rounded-lg border bg-background p-3 text-start">
            <p className="text-xs text-muted-foreground">دروس مكتملة</p>
            <p className="mt-1 text-xl font-semibold">
              {course.completedLessons} من {course.totalLessons}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-secondary/65 p-3 text-sm leading-7 text-muted-foreground">
          <CircleCheckBigIcon
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-primary"
          />
          <p>
            الوحدة الحالية: {course.currentModule ?? "تم إكمال الكورس"}.
          </p>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-secondary/65 p-3 text-sm leading-7 text-muted-foreground">
          <NavigationIcon
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-primary"
          />
          <p>
            الدرس المقترح التالي:{" "}
            {course.nextRecommendedLesson ?? "يمكنك مراجعة الدروس المكتملة"}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
