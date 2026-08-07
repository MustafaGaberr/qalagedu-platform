import { notFound } from "next/navigation";
import { LearningLessonPage } from "@/features/student-learning/components/learning-pages";
import { getLearningLesson } from "@/features/student-learning/services/learning-service";
export default async function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) { const { courseId, lessonId } = await params; const data = await getLearningLesson(courseId, lessonId); if (!data) notFound(); return <LearningLessonPage data={data} />; }
