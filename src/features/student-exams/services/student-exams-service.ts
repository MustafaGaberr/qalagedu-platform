import { MockStudentExamsRepository } from "@/mocks/repositories/mock-student-exams-repository";
import type {
  StudentExamAttemptData,
  StudentExamDetails,
  StudentExamResult,
  StudentExamSubmission,
  StudentExamSummary,
  StudentExamsRepository,
  StudentResultSummary,
  StudentResultsOverview,
} from "@/features/student-exams/types/exams";

const repository = new MockStudentExamsRepository();

export async function getStudentExams(
  examsRepository: StudentExamsRepository = repository
): Promise<StudentExamSummary[]> {
  return examsRepository.getExams();
}

export async function getStudentExamById(
  examId: string,
  examsRepository: StudentExamsRepository = repository
): Promise<StudentExamDetails | null> {
  return examsRepository.getExamById(examId);
}

export async function getStudentExamForAttempt(
  examId: string,
  examsRepository: StudentExamsRepository = repository
): Promise<StudentExamAttemptData | null> {
  return examsRepository.getExamForAttempt(examId);
}

export async function submitStudentExam(
  examId: string,
  submission: StudentExamSubmission,
  examsRepository: StudentExamsRepository = repository
): Promise<StudentExamResult> {
  return examsRepository.submitExam(examId, submission);
}

export async function getStudentResults(
  examsRepository: StudentExamsRepository = repository
): Promise<StudentResultSummary[]> {
  return examsRepository.getResults();
}

export async function getStudentResultById(
  attemptId: string,
  examsRepository: StudentExamsRepository = repository
): Promise<StudentExamResult | null> {
  return examsRepository.getResultById(attemptId);
}

export async function getStudentResultsOverview(
  examsRepository: StudentExamsRepository = repository
): Promise<StudentResultsOverview> {
  return examsRepository.getResultsOverview();
}
