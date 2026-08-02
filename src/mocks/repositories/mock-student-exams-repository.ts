import { mockStudentCourses } from "@/features/student-courses/data/mock-courses";
import {
  mockSeedAttempts,
  mockStudentExamSeeds,
  type MockSeedAttempt,
  type MockStudentExamSeed,
} from "@/features/student-exams/data/mock-exams";
import {
  canStartExam,
  examStatusLabel,
  examTypeLabel,
  getExamUnavailableReason,
} from "@/features/student-exams/lib/exam-status";
import type {
  StudentAnswer,
  StudentExamAttemptData,
  StudentExamAttemptQuestion,
  StudentExamDetails,
  StudentExamQuestion,
  StudentExamResult,
  StudentExamResultQuestionReview,
  StudentExamSubmission,
  StudentExamSubmissionAnswer,
  StudentExamSummary,
  StudentExamsRepository,
  StudentResultSummary,
  StudentResultsOverview,
} from "@/features/student-exams/types/exams";

const generatedResults = new Map<string, StudentExamResult>();
let generatedAttemptSequence = 1;

export class MockStudentExamsRepository implements StudentExamsRepository {
  async getExams(): Promise<StudentExamSummary[]> {
    return mockStudentExamSeeds
      .map(toExamSummary)
      .filter((exam): exam is StudentExamSummary => Boolean(exam));
  }

  async getExamById(examId: string): Promise<StudentExamDetails | null> {
    const seed = findExamSeed(examId);

    if (!seed) {
      return null;
    }

    return toExamDetails(seed);
  }

  async getExamForAttempt(
    examId: string
  ): Promise<StudentExamAttemptData | null> {
    const seed = findExamSeed(examId);

    if (!seed) {
      return null;
    }

    const details = toExamDetails(seed);

    if (!details?.canStart) {
      return null;
    }

    return {
      ...details,
      questions: seed.questions.map(toAttemptQuestion),
    };
  }

  async submitExam(
    examId: string,
    submission: StudentExamSubmission
  ): Promise<StudentExamResult> {
    const seed = findExamSeed(examId);

    if (!seed) {
      throw new Error("Exam not found");
    }

    const attemptId = `attempt-${examId}-mock-${generatedAttemptSequence}`;
    generatedAttemptSequence += 1;
    const result = gradeSubmission(seed, {
      id: attemptId,
      examId,
      submittedAt: "الآن",
      durationUsed: submission.durationUsed,
      submission,
    });

    generatedResults.set(result.id, result);

    return result;
  }

  async getResults(): Promise<StudentResultSummary[]> {
    const seedResults = mockSeedAttempts
      .map((attempt) => {
        const seed = findExamSeed(attempt.examId);
        return seed ? gradeSubmission(seed, attempt) : null;
      })
      .filter((result): result is StudentExamResult => Boolean(result));
    const generated = Array.from(generatedResults.values());

    return [...generated, ...seedResults].map(toResultSummary);
  }

  async getResultById(attemptId: string): Promise<StudentExamResult | null> {
    const generated = generatedResults.get(attemptId);

    if (generated) {
      return generated;
    }

    const seedAttempt = mockSeedAttempts.find((attempt) => attempt.id === attemptId);
    const examSeed = seedAttempt ? findExamSeed(seedAttempt.examId) : null;

    return seedAttempt && examSeed ? gradeSubmission(examSeed, seedAttempt) : null;
  }

  async getResultsOverview(): Promise<StudentResultsOverview> {
    const results = await this.getResults();
    const totalAttempts = results.length;
    const averagePercentage =
      totalAttempts > 0
        ? Math.round(
            results.reduce((sum, result) => sum + result.percentage, 0) /
              totalAttempts
          )
        : 0;
    const passedCount = results.filter((result) => result.passed).length;
    const subjectScores = new Map<string, { total: number; count: number }>();

    for (const result of results) {
      const current = subjectScores.get(result.subject) ?? { total: 0, count: 0 };
      subjectScores.set(result.subject, {
        total: current.total + result.percentage,
        count: current.count + 1,
      });
    }

    const strongestSubject =
      Array.from(subjectScores.entries())
        .map(([subject, value]) => ({
          subject,
          average: value.total / value.count,
        }))
        .sort((a, b) => b.average - a.average)[0]?.subject ?? "لا توجد نتائج بعد";

    return {
      averagePercentage,
      passedCount,
      totalAttempts,
      strongestSubject,
    };
  }
}

function findExamSeed(examId: string) {
  return mockStudentExamSeeds.find((exam) => exam.id === examId) ?? null;
}

function getCourse(courseId: string) {
  return mockStudentCourses.find((course) => course.id === courseId) ?? null;
}

function toExamSummary(seed: MockStudentExamSeed): StudentExamSummary | null {
  const course = getCourse(seed.courseId);

  if (!course) {
    return null;
  }

  return {
    id: seed.id,
    courseId: seed.courseId,
    lessonId: seed.lessonId,
    resultAttemptId: seed.resultAttemptId,
    title: seed.title,
    description: seed.description,
    subject: course.subject,
    teacher: course.teacher,
    grade: course.grade,
    type: seed.type,
    typeLabel: examTypeLabel[seed.type],
    status: seed.status,
    statusLabel: examStatusLabel[seed.status],
    availabilityDate: seed.availabilityDate,
    dueDate: seed.dueDate,
    durationMinutes: seed.durationMinutes,
    totalQuestions: seed.questions.length,
    totalScore: getTotalScore(seed.questions),
    passingScore: seed.passingScore,
    attemptsAllowed: seed.attemptsAllowed,
    attemptsUsed: seed.attemptsUsed,
  };
}

function toExamDetails(seed: MockStudentExamSeed): StudentExamDetails | null {
  const summary = toExamSummary(seed);

  if (!summary) {
    return null;
  }

  const attemptsRemaining = summary.attemptsAllowed - summary.attemptsUsed;

  return {
    ...summary,
    instructions: seed.instructions,
    warnings: seed.warnings,
    canStart: canStartExam(summary.status, attemptsRemaining),
    unavailableReason: getExamUnavailableReason(summary.status, attemptsRemaining),
  };
}

function getTotalScore(questions: StudentExamQuestion[]) {
  return questions.reduce((total, question) => total + question.score, 0);
}

function toAttemptQuestion(
  question: StudentExamQuestion
): StudentExamAttemptQuestion {
  return {
    id: question.id,
    order: question.order,
    type: question.type,
    text: question.text,
    description: question.description,
    options: question.options,
    score: question.score,
  };
}

function gradeSubmission(
  seed: MockStudentExamSeed,
  attempt: MockSeedAttempt
): StudentExamResult {
  const course = getCourse(seed.courseId);

  if (!course) {
    throw new Error("Course not found for exam");
  }

  const answers = seed.questions.map((question) =>
    gradeQuestion(question, findSubmissionAnswer(attempt.submission.answers, question.id))
  );
  const review = seed.questions.map((question) =>
    toQuestionReview(
      question,
      findSubmissionAnswer(attempt.submission.answers, question.id),
      answers.find((answer) => answer.questionId === question.id)
    )
  );
  const score = answers.reduce((total, answer) => total + answer.awardedScore, 0);
  const totalScore = getTotalScore(seed.questions);
  const percentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const unansweredCount = answers.filter(
    (answer) =>
      typeof answer.selectedOptionId === "undefined" &&
      typeof answer.booleanAnswer === "undefined"
  ).length;
  const incorrectCount = answers.length - correctCount - unansweredCount;
  const passed = score >= seed.passingScore;

  return {
    id: attempt.id,
    examId: seed.id,
    courseId: seed.courseId,
    lessonId: seed.lessonId,
    examTitle: seed.title,
    courseTitle: course.title,
    subject: course.subject,
    teacher: course.teacher,
    submittedAt: attempt.submittedAt,
    durationUsed: attempt.durationUsed,
    score,
    totalScore,
    percentage,
    passed,
    statusLabel: passed ? "ناجح" : "يحتاج مراجعة",
    answers,
    correctCount,
    incorrectCount,
    unansweredCount,
    review,
  };
}

function findSubmissionAnswer(
  answers: StudentExamSubmissionAnswer[],
  questionId: string
) {
  return answers.find((answer) => answer.questionId === questionId);
}

function gradeQuestion(
  question: StudentExamQuestion,
  answer: StudentExamSubmissionAnswer | undefined
): StudentAnswer {
  const selectedOptionId = answer?.selectedOptionId;
  const booleanAnswer = answer?.booleanAnswer;
  const isAnswered =
    typeof selectedOptionId !== "undefined" ||
    typeof booleanAnswer !== "undefined";
  const isCorrect =
    isAnswered &&
    (question.correctAnswer.type === "option"
      ? selectedOptionId === question.correctAnswer.optionId
      : booleanAnswer === question.correctAnswer.value);

  return {
    questionId: question.id,
    selectedOptionId,
    booleanAnswer,
    isCorrect,
    awardedScore: isCorrect ? question.score : 0,
  };
}

function toQuestionReview(
  question: StudentExamQuestion,
  submissionAnswer: StudentExamSubmissionAnswer | undefined,
  gradedAnswer: StudentAnswer | undefined
): StudentExamResultQuestionReview {
  return {
    questionId: question.id,
    order: question.order,
    type: question.type,
    text: question.text,
    options: question.options,
    studentAnswerLabel: getStudentAnswerLabel(question, submissionAnswer),
    correctAnswerLabel: getCorrectAnswerLabel(question),
    isCorrect: Boolean(gradedAnswer?.isCorrect),
    awardedScore: gradedAnswer?.awardedScore ?? 0,
    score: question.score,
    explanation: question.explanation,
  };
}

function getStudentAnswerLabel(
  question: StudentExamQuestion,
  answer: StudentExamSubmissionAnswer | undefined
) {
  if (!answer) {
    return "لم تتم الإجابة";
  }

  if (question.type === "true-false") {
    if (typeof answer.booleanAnswer === "undefined") {
      return "لم تتم الإجابة";
    }

    return answer.booleanAnswer ? "صح" : "خطأ";
  }

  if (!answer.selectedOptionId) {
    return "لم تتم الإجابة";
  }

  return (
    question.options.find((option) => option.id === answer.selectedOptionId)?.text ??
    "إجابة غير معروفة"
  );
}

function getCorrectAnswerLabel(question: StudentExamQuestion) {
  const correctAnswer = question.correctAnswer;

  if (correctAnswer.type === "boolean") {
    return correctAnswer.value ? "صح" : "خطأ";
  }

  return (
    question.options.find((option) => option.id === correctAnswer.optionId)?.text ??
    "إجابة غير معروفة"
  );
}

function toResultSummary(result: StudentExamResult): StudentResultSummary {
  return {
    id: result.id,
    examId: result.examId,
    courseId: result.courseId,
    examTitle: result.examTitle,
    courseTitle: result.courseTitle,
    subject: result.subject,
    submittedAt: result.submittedAt,
    score: result.score,
    totalScore: result.totalScore,
    percentage: result.percentage,
    passed: result.passed,
    statusLabel: result.statusLabel,
  };
}
