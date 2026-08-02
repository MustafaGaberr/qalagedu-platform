import type {
  StudentExamStatus,
  StudentExamType,
} from "@/features/student-exams/types/exams";

export const examStatusTone = {
  available: "success",
  upcoming: "warning",
  completed: "muted",
  expired: "destructive",
  locked: "warning",
} as const satisfies Record<
  StudentExamStatus,
  "success" | "warning" | "muted" | "destructive"
>;

export const examStatusLabel = {
  available: "متاح",
  upcoming: "قادم",
  completed: "مكتمل",
  expired: "منتهي",
  locked: "مغلق",
} satisfies Record<StudentExamStatus, string>;

export const examTypeLabel = {
  "lesson-quiz": "اختبار درس",
  "module-exam": "اختبار وحدة",
  "final-exam": "اختبار نهائي",
  "homework-assessment": "تقييم واجب",
} satisfies Record<StudentExamType, string>;

export function canStartExam(status: StudentExamStatus, attemptsRemaining: number) {
  return status === "available" && attemptsRemaining > 0;
}

export function getExamUnavailableReason(
  status: StudentExamStatus,
  attemptsRemaining: number
) {
  if (attemptsRemaining <= 0) {
    return "تم استهلاك كل المحاولات المتاحة لهذا الاختبار.";
  }

  if (status === "upcoming") {
    return "الاختبار مجدول ولم يبدأ موعده بعد.";
  }

  if (status === "expired") {
    return "انتهى موعد هذا الاختبار ولا يمكن بدء محاولة جديدة.";
  }

  if (status === "locked") {
    return "هذا الاختبار مغلق حاليا حسب خطة الكورس.";
  }

  if (status === "completed") {
    return "تم تسجيل نتيجة لهذا الاختبار بالفعل.";
  }

  return undefined;
}
