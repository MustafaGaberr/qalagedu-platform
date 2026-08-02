import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { appConfig } from "@/config/app";
import { LessonPage } from "@/features/student-lessons/components/lesson-page";
import { getStudentLessonById } from "@/features/student-lessons/services/student-lessons-service";

type StudentLessonPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
};

export async function generateMetadata({
  params,
}: StudentLessonPageProps): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const lesson = await getStudentLessonById(courseId, lessonId);

  if (!lesson) {
    return {
      title: `الدرس غير موجود | ${appConfig.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${lesson.title} | ${appConfig.name}`,
    description: lesson.summary,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function StudentLessonPage({
  params,
}: StudentLessonPageProps) {
  const { courseId, lessonId } = await params;
  const lesson = await getStudentLessonById(courseId, lessonId);

  if (!lesson) {
    notFound();
  }

  return <LessonPage lesson={lesson} />;
}
