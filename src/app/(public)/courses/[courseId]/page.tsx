import { notFound } from "next/navigation";
import { CourseDetail } from "@/features/public-catalog/components/detail-pages";
import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";

export default async function PublicCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getPublicCourse(courseId);
  if (!course) notFound();
  const teacher = await getPublicTeacher(course.teacherId);
  if (!teacher) notFound();
  return <CourseDetail course={course} teacher={teacher} />;
}
