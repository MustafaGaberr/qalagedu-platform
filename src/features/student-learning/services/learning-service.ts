import "server-only";

import { appConfig } from "@/config/app";
import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";
import { getStudentEntitlements } from "@/features/student-access/services/access-service";
import { serverApiRequest } from "@/lib/api/server";
import { ApiError } from "@/lib/api/errors";
import type { LearningCourse, LearningLesson, LessonAccessDecision, LessonProgress, OnlineExam, OnlineExamResult, PaperExamResult, PlaybackDescriptor, UnifiedStudentResult } from "../types/learning";

type RawPlayback = { lessonId: string; provider: string | null; providerVideoId: string | null; durationSeconds: number | null };
type RawAssignedExam = {
  id: string; title: string; durationMinutes: number; maxAttempts: number;
  availableFrom: string | null; availableUntil: string | null;
  course: { id: string; title: string; teacher: { id: string; name: string } };
  latestAttempt: { id: string; status: string; attemptNumber: number; startedAt: string; submittedAt: string | null; violationCount: number } | null;
};
type RawInstructions = { id: string; title: string; instructions: string | null; durationMinutes: number; maxAttempts: number; maxScore: number | string; passingScore: number | string | null; availableFrom: string | null; availableUntil: string | null; violationThreshold: number | null; questionCount: number };
type RawPaperResult = { id: string; status: "GRADED" | "ABSENT" | "NOT_SUBMITTED"; score: number | string | null; notes: string | null; updatedAt: string; paperExam: { id: string; title: string; examDate: string | null; maxScore: number | string; course: { id: string; title: string } } };
type RawProgress = { lessonId: string; status: LessonProgress["status"]; progressPercent: number | string; playbackPositionSeconds: number | null; lastOpenedAt: string | null; completedAt: string | null; lesson: { course: { id: string } } };
type RawOnlineResult = { attemptId: string; exam: { id: string; title: string; maxScore: number | string }; course: { id: string; title: string; teacher: { name: string } }; score: number | string; submittedAt: string | null; releasedAt: string | null; violationCount: number };
type RawCenterResult = { session: { id: string }; date: string; course: { id: string; title: string | null }; teacher: { name: string }; attendanceState: "PRESENT" | "ABSENT" | null; maxScore: number | string | null; studentScore: number | string | null };

export async function getLessonProgress() { const rows = await serverApiRequest<RawProgress[]>("student/lesson-progress"); return new Map(rows.map((item) => [item.lessonId, { lessonId: item.lessonId, status: item.status, progressPercent: Number(item.progressPercent), lastPlaybackPositionSeconds: item.playbackPositionSeconds ?? undefined, lastOpenedAt: item.lastOpenedAt ?? undefined, completedAt: item.completedAt ?? undefined } satisfies LessonProgress])); }

async function courseFromEntitlement(courseId: string): Promise<LearningCourse | null> {
  const [entitlements, catalog, progressByLesson] = await Promise.all([getStudentEntitlements(), getPublicCourse(courseId), getLessonProgress()]);
  const entitlement = entitlements.find((item) => item.courseId === courseId);
  if (!entitlement || !catalog) return null;
  const teacher = await getPublicTeacher(catalog.teacherId);
  const lessons: LearningLesson[] = catalog.units.flatMap((unit) => unit.lessons.map((lesson) => ({
    ...lesson,
    unitId: unit.id,
    unitTitle: unit.title,
    description: "",
    published: true,
    attachmentNames: [],
  })));
  return {
    courseId,
    entitlement,
    accessState: entitlement.status === "ACTIVE" ? "ACTIVE" : "EXPIRED",
    progress: lessons.length ? Math.round(lessons.reduce((total, lesson) => total + (progressByLesson.get(lesson.id)?.progressPercent ?? 0), 0) / lessons.length) : 0,
    completedLessons: lessons.filter((lesson) => progressByLesson.get(lesson.id)?.status === "COMPLETED").length,
    totalLessons: lessons.length,
    nextLessonId: lessons.find((lesson) => progressByLesson.get(lesson.id)?.status !== "COMPLETED")?.id,
    title: catalog.title,
    teacher: teacher?.name ?? appConfig.name,
    subject: catalog.subject,
    grade: catalog.grade,
    packageType: entitlement.packageType,
    packageTitle: entitlement.packageTitle,
    expiresAt: entitlement.expiresAt,
    lessons,
  };
}

export async function getLearningCourses() {
  const entitlements = await getStudentEntitlements();
  return (await Promise.all(entitlements.map((item) => courseFromEntitlement(item.courseId))))
    .filter((item): item is LearningCourse => Boolean(item));
}

export const getLearningCourse = (courseId: string) => courseFromEntitlement(courseId);

export async function getLearningLesson(courseId: string, lessonId: string) {
  const [course, progressByLesson] = await Promise.all([getLearningCourse(courseId), getLessonProgress()]);
  const lesson = course?.lessons.find((item) => item.id === lessonId);
  if (!course || !lesson) return null;
  const index = course.lessons.findIndex((item) => item.id === lessonId);
  let state: LessonAccessDecision["state"] = course.accessState === "EXPIRED" ? "EXPIRED" : "UNLOCKED";
  let reason = state === "EXPIRED" ? "انتهت صلاحية وصولك لهذا الكورس." : "متاح ضمن وصولك الإلكتروني.";
  let playback: PlaybackDescriptor = { kind: "YOUTUBE_UNLISTED", videoId: "", title: lesson.title };
  if (state === "UNLOCKED") {
    try {
      const descriptor = await serverApiRequest<RawPlayback>(`lessons/${encodeURIComponent(lessonId)}/playback`);
      if (descriptor.providerVideoId) playback = { kind: "YOUTUBE_UNLISTED", videoId: descriptor.providerVideoId, title: lesson.title };
      else {
        state = "NOT_PUBLISHED";
        reason = "لا يوجد مصدر تشغيل منشور لهذا الدرس حاليًا.";
      }
    } catch (error) {
      if (error instanceof ApiError && [403, 404].includes(error.status)) {
        state = error.status === 404 ? "NOT_PUBLISHED" : "NOT_INCLUDED";
        reason = error.message;
      } else throw error;
    }
  }
  const progress = progressByLesson.get(lessonId) ?? { lessonId, status: "NOT_STARTED", progressPercent: 0 };
  return {
    courseId,
    course,
    lesson,
    state,
    reason,
    action: { label: state === "EXPIRED" ? "تجديد الوصول" : "العودة إلى الكورس", href: state === "EXPIRED" ? `/payments/new?course=${courseId}` : `/learn/${courseId}` },
    entitlement: course.entitlement,
    progress,
    playback,
    previous: course.lessons[index - 1],
    next: course.lessons[index + 1],
  };
}

function examStatus(item: RawAssignedExam): OnlineExam["status"] {
  if (item.latestAttempt?.status === "IN_PROGRESS") return "IN_PROGRESS";
  if (item.latestAttempt?.status === "GRADED") return "GRADED";
  if (item.latestAttempt) return "SUBMITTED";
  const now = Date.now();
  if (item.availableFrom && new Date(item.availableFrom).getTime() > now) return "UPCOMING";
  if (item.availableUntil && new Date(item.availableUntil).getTime() <= now) return "EXPIRED";
  return "AVAILABLE";
}

export async function getAssignedExams(): Promise<OnlineExam[]> {
  const items = await serverApiRequest<RawAssignedExam[]>("student/exams");
  return Promise.all(items.map(async (item) => {
    const instructions = await serverApiRequest<RawInstructions>(`student/exams/${encodeURIComponent(item.id)}/instructions`);
    const catalog = await getPublicCourse(item.course.id);
    return {
      id: item.id,
      courseId: item.course.id,
      title: item.title,
      teacher: item.course.teacher.name,
      subject: catalog?.subject ?? item.course.title,
      status: examStatus(item),
      availableFrom: item.availableFrom ?? new Date(0).toISOString(),
      availableUntil: item.availableUntil ?? new Date(8640000000000000).toISOString(),
      durationMinutes: item.durationMinutes,
      attemptsAllowed: item.maxAttempts,
      attemptsUsed: item.latestAttempt?.attemptNumber ?? 0,
      maxScore: Number(instructions.maxScore),
      passingScore: instructions.passingScore === null ? undefined : Number(instructions.passingScore),
      requiresFullscreen: Boolean(instructions.violationThreshold),
      maxViolations: instructions.violationThreshold ?? 0,
      resultVisibility: "IMMEDIATE",
      questions: Array.from({ length: instructions.questionCount }, (_, index) => ({ id: `count-${index}`, type: "SHORT_TEXT", text: "", maxScore: 0 })),
    };
  }));
}

export async function getAssignedExam(examId: string) {
  return (await getAssignedExams()).find((exam) => exam.id === examId) ?? null;
}

export async function getUnifiedResults(): Promise<UnifiedStudentResult[]> {
  const [onlineResults, papers, centerResults] = await Promise.all([
    serverApiRequest<RawOnlineResult[]>("student/exams/online/results"),
    serverApiRequest<RawPaperResult[]>("student/exams/paper/results"),
    serverApiRequest<RawCenterResult[]>("student/center/results"),
  ]);
  const online: OnlineExamResult[] = onlineResults.map((result) => {
      const score = Number(result.score);
      const maxScore = Number(result.exam.maxScore);
      return {
        id: result.attemptId,
        type: "ONLINE_EXAM",
        examId: result.exam.id,
        courseId: result.course.id,
        title: result.exam.title,
        subject: result.course.title,
        teacher: result.course.teacher.name,
        date: result.releasedAt ?? result.submittedAt ?? new Date(0).toISOString(),
        score,
        maxScore,
        percentage: score === undefined || maxScore === 0 ? undefined : Math.round((score / maxScore) * 100),
        status: "GRADED",
        violations: result.violationCount,
        pendingManualReview: false,
      } satisfies OnlineExamResult;
  });
  const paperResults: PaperExamResult[] = papers.map((item) => ({
    id: item.id,
    type: "PAPER_EXAM",
    courseId: item.paperExam.course.id,
    title: item.paperExam.title,
    subject: item.paperExam.course.title,
    teacher: appConfig.name,
    date: item.paperExam.examDate ?? item.updatedAt,
    maxScore: Number(item.paperExam.maxScore),
    studentScore: item.score === null ? undefined : Number(item.score),
    status: item.status,
    note: item.notes ?? undefined,
  }));
  const center = centerResults.map((item) => ({ id: item.session.id, type: "CENTER_SESSION_ASSESSMENT" as const, courseId: item.course.id, title: "تقييم حصة السنتر", subject: item.course.title ?? "السنتر", teacher: item.teacher.name, date: item.date, attendance: item.attendanceState === "ABSENT" ? "ABSENT" as const : "PRESENT" as const, maxScore: item.maxScore === null ? undefined : Number(item.maxScore), studentScore: item.studentScore === null ? undefined : Number(item.studentScore) }));
  return [...online, ...paperResults, ...center];
}

export async function getUnifiedResult(id: string) {
  return (await getUnifiedResults()).find((item) => item.id === id) ?? null;
}
