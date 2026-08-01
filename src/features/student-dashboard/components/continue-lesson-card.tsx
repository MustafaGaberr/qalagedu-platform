import { ClockIcon, LockIcon, PlayCircleIcon, UnlockIcon } from "lucide-react";

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
import type { NextLesson } from "@/features/student-dashboard/types/dashboard";

import { CourseVisual } from "./course-visual";

type ContinueLessonCardProps = {
  lesson: NextLesson;
};

export function ContinueLessonCard({ lesson }: ContinueLessonCardProps) {
  return (
    <Card
      id="continue-learning"
      className="border-primary/20 bg-card shadow-lg shadow-primary/10"
    >
      <CardHeader className="gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
        <div className="text-start">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={lesson.isLocked ? "warning" : "success"}>
              {lesson.isLocked ? "مغلق" : lesson.unlockMessage}
            </StatusBadge>
            <span className="text-sm text-muted-foreground">
              الدرس {lesson.lessonNumber}
            </span>
          </div>
          <CardTitle className="mt-3 text-2xl font-semibold leading-9">
            {lesson.title}
          </CardTitle>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {lesson.courseName} مع {lesson.teacher}
          </p>
        </div>
        <CourseVisual
          tone={lesson.tone}
          label={lesson.courseName}
          className="hidden sm:flex"
        />
      </CardHeader>
      <CardContent className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex flex-col gap-4">
          <Progress value={lesson.progress}>
            <ProgressLabel>تقدم الكورس</ProgressLabel>
            <span className="ms-auto text-sm text-muted-foreground tabular-nums">
              {lesson.progress}%
            </span>
          </Progress>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon aria-hidden="true" className="size-4 text-primary" />
              {lesson.durationMinutes} دقيقة تقريبا
            </span>
            <span className="inline-flex items-center gap-1.5">
              {lesson.isLocked ? (
                <LockIcon aria-hidden="true" className="size-4 text-primary" />
              ) : (
                <UnlockIcon aria-hidden="true" className="size-4 text-primary" />
              )}
              {lesson.isLocked ? "يحتاج فتح من المعلم" : "جاهز للمشاهدة"}
            </span>
          </div>
        </div>
        <Button size="lg" disabled={lesson.isLocked} className="w-full lg:w-auto">
          <PlayCircleIcon data-icon="inline-start" />
          متابعة الدرس
        </Button>
      </CardContent>
    </Card>
  );
}
