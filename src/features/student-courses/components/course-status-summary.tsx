import {
  AlertCircleIcon,
  CheckCircle2Icon,
  GraduationCapIcon,
} from "lucide-react";

import type {
  CourseEnrollmentStatus,
  StudentCourseSummary,
} from "@/features/student-courses/types/courses";

type CourseStatusSummaryProps = {
  courses: StudentCourseSummary[];
};

const summaryItems: {
  status: CourseEnrollmentStatus;
  title: string;
  description: string;
  icon: typeof GraduationCapIcon;
}[] = [
  {
    status: "active",
    title: "كورسات نشطة",
    description: "جاهزة للمتابعة",
    icon: GraduationCapIcon,
  },
  {
    status: "completed",
    title: "كورسات مكتملة",
    description: "متاحة للمراجعة",
    icon: CheckCircle2Icon,
  },
  {
    status: "requires-renewal",
    title: "تحتاج انتباه",
    description: "تجديد أو متابعة",
    icon: AlertCircleIcon,
  },
];

export function CourseStatusSummary({ courses }: CourseStatusSummaryProps) {
  return (
    <section
      aria-label="ملخص حالات الكورسات"
      className="grid gap-3 sm:grid-cols-3"
    >
      {summaryItems.map((item) => {
        const Icon = item.icon;
        const count = courses.filter(
          (course) => course.enrollmentStatus === item.status
        ).length;

        return (
          <article
            key={item.status}
            className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon aria-hidden="true" className="size-5" />
            </div>
            <div className="min-w-0 text-start">
              <p className="text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
              <p className="mt-1 text-2xl font-semibold leading-none text-foreground">
                {count}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
