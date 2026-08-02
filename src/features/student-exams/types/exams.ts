export type StudentExamStatus =
  | "available"
  | "upcoming"
  | "completed"
  | "expired"
  | "locked";

export type StudentExamType =
  | "lesson-quiz"
  | "module-exam"
  | "final-exam"
  | "homework-assessment";

export type StudentExamQuestionType = "multiple-choice" | "true-false";

export type StudentExamOption = {
  id: string;
  text: string;
};

export type StudentExamQuestion = {
  id: string;
  order: number;
  type: StudentExamQuestionType;
  text: string;
  description?: string;
  options: StudentExamOption[];
  correctAnswer:
    | {
        type: "option";
        optionId: string;
      }
    | {
        type: "boolean";
        value: boolean;
      };
  score: number;
  explanation?: string;
};

export type StudentExamAttemptQuestion = Omit<
  StudentExamQuestion,
  "correctAnswer" | "explanation"
>;

export type StudentExamSummary = {
  id: string;
  courseId: string;
  lessonId?: string;
  resultAttemptId?: string;
  title: string;
  description: string;
  subject: string;
  teacher: string;
  grade: string;
  type: StudentExamType;
  typeLabel: string;
  status: StudentExamStatus;
  statusLabel: string;
  availabilityDate: string;
  dueDate: string;
  durationMinutes: number;
  totalQuestions: number;
  totalScore: number;
  passingScore: number;
  attemptsAllowed: number;
  attemptsUsed: number;
};

export type StudentExamDetails = StudentExamSummary & {
  instructions: string[];
  warnings: string[];
  canStart: boolean;
  unavailableReason?: string;
};

export type StudentExamAttemptData = StudentExamDetails & {
  questions: StudentExamAttemptQuestion[];
};

export type StudentExamSubmissionAnswer = {
  questionId: string;
  selectedOptionId?: string;
  booleanAnswer?: boolean;
};

export type StudentExamSubmission = {
  durationUsed: number;
  answers: StudentExamSubmissionAnswer[];
};

export type StudentAnswer = {
  questionId: string;
  selectedOptionId?: string;
  booleanAnswer?: boolean;
  isCorrect: boolean;
  awardedScore: number;
};

export type StudentExamResultQuestionReview = {
  questionId: string;
  order: number;
  type: StudentExamQuestionType;
  text: string;
  options: StudentExamOption[];
  studentAnswerLabel: string;
  correctAnswerLabel: string;
  isCorrect: boolean;
  awardedScore: number;
  score: number;
  explanation?: string;
};

export type StudentExamResult = {
  id: string;
  examId: string;
  courseId: string;
  lessonId?: string;
  examTitle: string;
  courseTitle: string;
  subject: string;
  teacher: string;
  submittedAt: string;
  durationUsed: number;
  score: number;
  totalScore: number;
  percentage: number;
  passed: boolean;
  statusLabel: string;
  answers: StudentAnswer[];
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  review: StudentExamResultQuestionReview[];
};

export type StudentResultSummary = Pick<
  StudentExamResult,
  | "id"
  | "examId"
  | "courseId"
  | "examTitle"
  | "courseTitle"
  | "subject"
  | "submittedAt"
  | "score"
  | "totalScore"
  | "percentage"
  | "passed"
  | "statusLabel"
>;

export type StudentResultsOverview = {
  averagePercentage: number;
  passedCount: number;
  totalAttempts: number;
  strongestSubject: string;
};

export interface StudentExamsRepository {
  getExams(): Promise<StudentExamSummary[]>;
  getExamById(examId: string): Promise<StudentExamDetails | null>;
  getExamForAttempt(examId: string): Promise<StudentExamAttemptData | null>;
  submitExam(
    examId: string,
    answers: StudentExamSubmission
  ): Promise<StudentExamResult>;
  getResults(): Promise<StudentResultSummary[]>;
  getResultById(attemptId: string): Promise<StudentExamResult | null>;
  getResultsOverview(): Promise<StudentResultsOverview>;
}
