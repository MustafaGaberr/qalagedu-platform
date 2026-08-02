import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { ResultsPage } from "@/features/student-exams/components/results-page";
import {
  getStudentResults,
  getStudentResultsOverview,
} from "@/features/student-exams/services/student-exams-service";

export const metadata: Metadata = {
  title: `النتائج | ${appConfig.name}`,
  description: "سجل نتائج الطالب التجريبية داخل منصة Qalag EDU.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResultsRoutePage() {
  const [results, overview] = await Promise.all([
    getStudentResults(),
    getStudentResultsOverview(),
  ]);

  return <ResultsPage results={results} overview={overview} />;
}
