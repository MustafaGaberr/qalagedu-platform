"use server";

import { submitStudentExam } from "@/features/student-exams/services/student-exams-service";
import type {
  StudentExamSubmission,
  StudentExamSubmissionAnswer,
} from "@/features/student-exams/types/exams";

export async function submitStudentExamAction(
  examId: string,
  answers: StudentExamSubmissionAnswer[],
  durationUsed: number
) {
  const submission: StudentExamSubmission = {
    durationUsed,
    answers,
  };
  const result = await submitStudentExam(examId, submission);

  return {
    attemptId: result.id,
  };
}
