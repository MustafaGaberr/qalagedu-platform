import { notFound } from "next/navigation";
import { ProtectedCourseDetail } from "@/features/public-catalog/components/protected-course-detail";
import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";

export default async function PublicCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getPublicCourse(courseId);
  if (!course) notFound();
  const teacher = await getPublicTeacher(course.teacherId);
  if (!teacher) notFound();
  return <ProtectedCourseDetail course={course} teacher={teacher} />;
}
