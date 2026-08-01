import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import type { StudentCourse } from "@/features/student-dashboard/types/dashboard";

import { StudentCourseCard } from "./student-course-card";

type StudentCoursesPreviewProps = {
  courses: StudentCourse[];
};

export function StudentCoursesPreview({ courses }: StudentCoursesPreviewProps) {
  const previewCourses = courses.slice(0, 3);

  return (
    <section id="courses" className="flex flex-col gap-4">
      <SectionHeader
        title="كورساتي النشطة"
        description="أقرب الكورسات التي تحتاج متابعة خلال الأسبوع الحالي."
      />
      {previewCourses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {previewCourses.map((course) => (
            <StudentCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد كورسات نشطة حاليا"
          description="عند تفعيل أول كورس سيظهر هنا التقدم والدرس التالي والحصص القادمة."
          action={<Button disabled>استعراض الكورسات المتاحة</Button>}
        />
      )}
    </section>
  );
}
