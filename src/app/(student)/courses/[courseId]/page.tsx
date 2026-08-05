import { notFound } from "next/navigation";
import { LearningCoursePage } from "@/features/student-learning/components/learning-pages";
import { getLearningCourse } from "@/features/student-learning/services/learning-service";
export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) { const { courseId } = await params; const course = getLearningCourse(courseId); if (!course) notFound(); return <LearningCoursePage course={course} />; }
