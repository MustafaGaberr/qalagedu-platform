import { apiRequest } from "@/lib/api/client";
import type { AntiCheatEventType, ExamAnswer, LessonProgress } from "../types/learning";

export const saveLessonProgress = (lessonId: string, progressPercent: number, playbackPositionSeconds?: number) =>
  apiRequest<LessonProgress>(`lessons/${encodeURIComponent(lessonId)}/progress`, {
    method: "PATCH",
    body: { progressPercent, playbackPositionSeconds },
  });

export const startExamAttempt = (examId: string) =>
  apiRequest<{ attempt: { id: string; expiresAt: string; answers: Array<{ questionId: string; answer: unknown }> }; questions: Array<{ id: string; type: string; prompt: string; options: unknown; points: number | string; position: number }> }>(`student/exams/${encodeURIComponent(examId)}/attempts`, { method: "POST" });

export const saveExamAnswer = (attemptId: string, answer: ExamAnswer) =>
  apiRequest(`student/exams/attempts/${encodeURIComponent(attemptId)}/answers`, { method: "PATCH", body: { questionId: answer.questionId, answer: answer.selectedOptionIds ?? answer.booleanAnswer ?? answer.textAnswer ?? null } });

export const submitExamAttempt = (attemptId: string) =>
  apiRequest<{ attemptId: string; status: string; objectiveScore: number | string }>(`student/exams/attempts/${encodeURIComponent(attemptId)}/submit`, { method: "POST" });

export const recordAntiCheatEvent = (attemptId: string, eventType: AntiCheatEventType) =>
  apiRequest(`student/exams/attempts/${encodeURIComponent(attemptId)}/events`, { method: "POST", body: { eventType, metadata: { source: "student-web" } } });
