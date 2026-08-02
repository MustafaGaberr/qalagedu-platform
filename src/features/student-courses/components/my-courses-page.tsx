import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import type { StudentCourseSummary } from "@/features/student-courses/types/courses";

import { CourseStatusSummary } from "./course-status-summary";
import { MyCoursesFilter } from "./my-courses-filter";

type MyCoursesPageProps = {
  courses: StudentCourseSummary[];
};

export function MyCoursesPage({ courses }: MyCoursesPageProps) {
  const activeCount = courses.filter(
    (course) => course.enrollmentStatus === "active"
  ).length;

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <section className="rounded-lg border bg-card px-4 py-4 shadow-sm shadow-foreground/5 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl text-start">
            <h1 className="text-3xl font-semibold leading-tight text-foreground">
              كورساتي
            </h1>
            <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
              تابع الكورسات المسجلة، اعرف الدرس التالي، وادخل لتفاصيل المنهج من
              مكان واحد.
            </p>
          </div>
          <div className="rounded-lg bg-secondary/70 px-4 py-3 text-start">
            <p className="text-xs text-muted-foreground">الكورسات النشطة</p>
            <p className="mt-1 text-2xl font-semibold leading-none text-primary">
              {activeCount}
            </p>
          </div>
        </div>
      </section>

      {courses.length > 0 ? (
        <>
          <CourseStatusSummary courses={courses} />
          <MyCoursesFilter courses={courses} />
        </>
      ) : (
        <EmptyState
          title="لا توجد كورسات مسجلة بعد"
          description="عند تفعيل أول كورس سيظهر هنا التقدم، الدروس، حالة الاشتراك، وجدول الحصص."
          action={
            <Button render={<Link href="/#courses" />} nativeButton={false}>
              استعراض الكورسات العامة
              <ArrowUpLeftIcon data-icon="inline-end" />
            </Button>
          }
        />
      )}
    </div>
  );
}
