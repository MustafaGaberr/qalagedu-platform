"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  CourseStatusFilter,
  StudentCourseSummary,
} from "@/features/student-courses/types/courses";
import { cn } from "@/lib/utils";

import { MyCourseCard } from "./my-course-card";

type MyCoursesFilterProps = {
  courses: StudentCourseSummary[];
};

const filters: { value: CourseStatusFilter; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "active", label: "نشط" },
  { value: "completed", label: "مكتمل" },
  { value: "requires-renewal", label: "يحتاج تجديد" },
];

export function MyCoursesFilter({ courses }: MyCoursesFilterProps) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<CourseStatusFilter>("all");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => {
    const matchesStatus =
      status === "all" || course.enrollmentStatus === status;
    const searchable = `${course.title} ${course.subject} ${course.teacher} ${course.group}`.toLowerCase();
    return matchesStatus && searchable.includes(normalizedQuery);
  });

  return (
    <section className="flex flex-col gap-4" aria-label="تصفية كورساتي">
      <div className="grid gap-3 rounded-lg border bg-card p-3 shadow-sm shadow-foreground/5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="relative">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث باسم الكورس أو المعلم"
            aria-label="بحث في كورساتي"
            className="pe-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              type="button"
              variant={status === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatus(filter.value)}
              className={cn("min-w-fit", status === filter.value && "shadow-sm")}
              aria-pressed={status === filter.value}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <MyCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد كورسات بهذه التصفية"
          description="جرّب مسح البحث أو اختيار حالة مختلفة لعرض كورساتك المسجلة."
          action={
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuery("");
                setStatus("all");
              }}
            >
              مسح التصفية
            </Button>
          }
        />
      )}
    </section>
  );
}
