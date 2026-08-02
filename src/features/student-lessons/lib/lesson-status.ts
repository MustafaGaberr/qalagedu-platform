import type { LessonStatus } from "@/features/student-courses/types/courses";

export const lessonStatusTone = {
  available: "success",
  completed: "muted",
  locked: "warning",
  scheduled: "warning",
} as const satisfies Record<LessonStatus, "success" | "muted" | "warning">;

export function isOpenableLessonStatus(status: LessonStatus) {
  return status === "available" || status === "completed";
}
