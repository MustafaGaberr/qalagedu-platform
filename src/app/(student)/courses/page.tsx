import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { MyCoursesPage } from "@/features/student-courses/components/my-courses-page";
import { getMyCourses } from "@/features/student-courses/services/student-courses-service";

export const metadata: Metadata = {
  title: `كورساتي | ${appConfig.name}`,
  description:
    "صفحة كورسات الطالب المسجلة مع البحث والتصفية وحالة الاشتراك باستخدام بيانات تجريبية.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CoursesPage() {
  const courses = await getMyCourses();

  return <MyCoursesPage courses={courses} />;
}
