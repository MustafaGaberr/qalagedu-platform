import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { ExamTakePage } from "@/features/student-exams/components/exam-take-page";
import { getStudentExamForAttempt } from "@/features/student-exams/services/student-exams-service";

type ExamTakeRoutePageProps = {
  params: Promise<{
    examId: string;
  }>;
};

export const metadata: Metadata = {
  title: `محاولة اختبار | ${appConfig.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ExamTakeRoutePage({
  params,
}: ExamTakeRoutePageProps) {
  const { examId } = await params;
  const exam = await getStudentExamForAttempt(examId);

  return <ExamTakePage exam={exam} examId={examId} />;
}
