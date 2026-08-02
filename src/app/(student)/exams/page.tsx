import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { ExamsPage } from "@/features/student-exams/components/exams-page";
import { getStudentExams } from "@/features/student-exams/services/student-exams-service";

export const metadata: Metadata = {
  title: `الاختبارات | ${appConfig.name}`,
  description: "اختبارات الطالب التجريبية داخل منصة Qalag EDU.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ExamsRoutePage() {
  const exams = await getStudentExams();

  return <ExamsPage exams={exams} />;
}
