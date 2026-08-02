import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { appConfig } from "@/config/app";
import { ResultDetailsPage } from "@/features/student-exams/components/result-details-page";
import { getStudentResultById } from "@/features/student-exams/services/student-exams-service";

type ResultPageProps = {
  params: Promise<{
    attemptId: string;
  }>;
};

export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { attemptId } = await params;
  const result = await getStudentResultById(attemptId);

  if (!result) {
    return {
      title: `النتيجة غير موجودة | ${appConfig.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${result.examTitle} | ${appConfig.name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ResultRoutePage({ params }: ResultPageProps) {
  const { attemptId } = await params;
  const result = await getStudentResultById(attemptId);

  if (!result) {
    notFound();
  }

  return <ResultDetailsPage result={result} />;
}
