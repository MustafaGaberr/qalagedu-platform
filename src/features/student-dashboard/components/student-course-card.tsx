import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeftIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress,
  ProgressLabel,
} from "@/components/ui/progress";
import type { StudentCourse } from "@/features/student-dashboard/types/dashboard";


type StudentCourseCardProps = {
  course: StudentCourse;
};

const statusMap = {
  active: "success",
  locked: "warning",
  review: "muted",
} as const;

export function StudentCourseCard({ course }: StudentCourseCardProps) {
  return (
    <Card className="bg-card/95">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-start">
            <CardTitle className="truncate text-lg font-semibold">
              {course.subject}
            </CardTitle>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {course.teacher}
            </p>
          </div>
          <StatusBadge status={statusMap[course.status]}>
            {course.statusLabel}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary"><Image src={course.cover} alt={`غلاف ${course.subject}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized /></div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>{course.grade}</span>
          <span>
            {course.completedLessons} من {course.totalLessons} دروس
          </span>
        </div>
        <Progress value={course.progress}>
          <ProgressLabel>التقدم</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {course.progress}%
          </span>
        </Progress>
        <div className="rounded-lg bg-secondary/60 p-3 text-start">
          <p className="text-xs text-muted-foreground">الدرس التالي</p>
          <p className="mt-1 text-sm font-medium leading-6 text-foreground">
            {course.nextLesson}
          </p>
        </div>
        {course.status === "locked" ? (
          <Button variant="outline" disabled>
            عرض الكورس
            <ArrowUpLeftIcon data-icon="inline-end" />
          </Button>
        ) : (
          <Button
            render={<Link href={`/courses/${course.id}`} />}
            nativeButton={false}
            variant="outline"
          >
            عرض الكورس
            <ArrowUpLeftIcon data-icon="inline-end" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
