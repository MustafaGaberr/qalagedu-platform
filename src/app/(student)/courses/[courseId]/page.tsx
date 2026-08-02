import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { appConfig } from "@/config/app";
import { CourseDetailsPage } from "@/features/student-courses/components/course-details-page";
import {
  getMyCourses,
  getStudentCourseById,
} from "@/features/student-courses/services/student-courses-service";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = await getStudentCourseById(courseId);

  if (!course) {
    return {
      title: `الكورس غير موجود | ${appConfig.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${course.subject} | ${appConfig.name}`,
    description: course.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export async function generateStaticParams() {
  const courses = await getMyCourses();

  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getStudentCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetailsPage course={course} />;
}
