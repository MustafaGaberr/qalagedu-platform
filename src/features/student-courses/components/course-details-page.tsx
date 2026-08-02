import type { StudentCourseDetails } from "@/features/student-courses/types/courses";

import { CourseCurriculum } from "./course-curriculum";
import { CourseDetailHeader } from "./course-detail-header";
import { CourseOverview } from "./course-overview";
import { CourseProgressCard } from "./course-progress-card";
import { CourseSideSummary } from "./course-side-summary";

type CourseDetailsPageProps = {
  course: StudentCourseDetails;
};

export function CourseDetailsPage({ course }: CourseDetailsPageProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <CourseDetailHeader course={course} />
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div className="flex min-w-0 flex-col gap-5 overflow-hidden">
          <div className="grid gap-5 lg:grid-cols-2">
            <CourseOverview course={course} />
            <CourseProgressCard course={course} />
          </div>
          <CourseCurriculum modules={course.modules} />
        </div>
        <CourseSideSummary course={course} />
      </div>
    </div>
  );
}
