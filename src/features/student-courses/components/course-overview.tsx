import Link from "next/link";
import {
  CalendarClockIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  Layers3Icon,
  ListVideoIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StudentCourseDetails } from "@/features/student-courses/types/courses";

type CourseOverviewProps = {
  course: StudentCourseDetails;
};

export function CourseOverview({ course }: CourseOverviewProps) {
  const items = [
    {
      label: "وحدات",
      value: course.totalModules,
      icon: Layers3Icon,
    },
    {
      label: "دروس",
      value: course.totalLessons,
      icon: ListVideoIcon,
    },
    {
      label: "اختبارات وواجبات",
      value: course.assessmentsCount,
      icon: ClipboardCheckIcon,
    },
    {
      label: "ملفات مرفقة",
      value: course.resourcesCount,
      icon: FileTextIcon,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>نظرة عامة</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-sm leading-7 text-muted-foreground">
          {course.description}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="rounded-lg border bg-background p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon aria-hidden="true" className="size-4 text-primary" />
                  {item.label}
                </div>
                <p className="mt-2 text-2xl font-semibold leading-none text-foreground">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
        <div className="rounded-lg bg-secondary/65 p-3 text-sm leading-7 text-muted-foreground">
          <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
            <CalendarClockIcon aria-hidden="true" className="size-4 text-primary" />
            جدول الكورس
          </div>
          {course.schedule.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {course.schedule.map((item) => (
                <li key={item.id}>
                  {item.dayLabel} • {item.time} • {item.locationLabel}
                </li>
              ))}
            </ul>
          ) : (
            <p>لا توجد حصص قادمة لهذا الكورس حاليا.</p>
          )}
        </div>
        <Button
          render={<Link href="/exams" />}
          nativeButton={false}
          variant="outline"
          className="w-full"
        >
          عرض الاختبارات والتقييمات
        </Button>
      </CardContent>
    </Card>
  );
}
