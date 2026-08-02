import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { appConfig } from "@/config/app";
import { ExamDetailsPage } from "@/features/student-exams/components/exam-details-page";
import { getStudentExamById } from "@/features/student-exams/services/student-exams-service";

type ExamPageProps = {
  params: Promise<{
    examId: string;
  }>;
};

export async function generateMetadata({
  params,
}: ExamPageProps): Promise<Metadata> {
  const { examId } = await params;
  const exam = await getStudentExamById(examId);

  if (!exam) {
    return {
      title: `الاختبار غير موجود | ${appConfig.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${exam.title} | ${appConfig.name}`,
    description: exam.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ExamRoutePage({ params }: ExamPageProps) {
  const { examId } = await params;
  const exam = await getStudentExamById(examId);

  if (!exam) {
    notFound();
  }

  return <ExamDetailsPage exam={exam} />;
}
