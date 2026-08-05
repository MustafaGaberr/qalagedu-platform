import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";
import { onlineEntitlements, studentId } from "@/features/student-access/data/mock-access";
import { centerSessionResults, examAssignments, getPlaybackFixture, lessonDetails, lessonProgressSeed, onlineExams, paperExamResults } from "../data/mock-learning";
import type { LearningCourse, LessonAccessDecision, LessonProgress, OnlineExam, OnlineExamResult, PlaybackDescriptor, UnifiedStudentResult } from "../types/learning";

const progress = new Map(lessonProgressSeed.map((item) => [item.lessonId, item]));

export function getLearningCourses(): LearningCourse[] {
  return onlineEntitlements.reduce<LearningCourse[]>((items, entitlement) => {
    const course = getPublicCourse(entitlement.courseId);
    const teacher = course ? getPublicTeacher(course.teacherId) : null;
    if (!course || !teacher) return items;
    const lessons = lessonDetails.filter((lesson) => course.units.some((unit) => unit.id === lesson.unitId));
    const completedLessons = lessons.filter((lesson) => progress.get(lesson.id)?.status === "COMPLETED").length;
    items.push({ courseId: course.id, entitlement, accessState: entitlement.status === "ACTIVE" ? "ACTIVE" : "EXPIRED", progress: entitlement.progress ?? Math.round((completedLessons / Math.max(lessons.length, 1)) * 100), completedLessons, totalLessons: lessons.length, nextLessonId: lessons.find((lesson) => progress.get(lesson.id)?.status !== "COMPLETED")?.id, title: course.title, teacher: teacher.name, subject: course.subject, grade: course.grade, packageType: entitlement.packageType, packageTitle: entitlement.packageTitle, expiresAt: entitlement.expiresAt, lessons });
    return items;
  }, []);
}
export const getLearningCourse = (courseId: string) => getLearningCourses().find((item) => item.courseId === courseId) ?? null;
export function getLessonDecision(courseId: string, lessonId: string): LessonAccessDecision | null {
  const course = getLearningCourse(courseId); const lesson = course?.lessons.find((item) => item.id === lessonId);
  if (!course || !lesson) return null;
  if (course.accessState === "EXPIRED") return { courseId, lesson, state: "EXPIRED", reason: "انتهت صلاحية باقتك لهذا الكورس.", action: { label: "تجديد الوصول", href: `/courses/${courseId}` }, entitlement: course.entitlement };
  if (!lesson.published) return { courseId, lesson, state: "NOT_PUBLISHED", reason: "هذا الدرس لم يُنشر بعد.", action: { label: "العودة إلى الكورس", href: `/courses/${courseId}` }, entitlement: course.entitlement };
  if (course.entitlement.packageType === "SINGLE_LESSON" && !lesson.preview) return { courseId, lesson, state: "NOT_INCLUDED", reason: "هذا الدرس ليس ضمن باقة الحصة الحالية.", action: { label: "عرض الباقات", href: `/courses/${courseId}` }, entitlement: course.entitlement };
  return { courseId, lesson, state: "UNLOCKED", reason: "متاح ضمن باقتك الإلكترونية.", action: { label: "العودة إلى الكورس", href: `/courses/${courseId}` }, entitlement: course.entitlement };
}
export function getLearningLesson(courseId: string, lessonId: string) {
  const decision = getLessonDecision(courseId, lessonId); const course = getLearningCourse(courseId);
  if (!decision || !course) return null;
  const index = course.lessons.findIndex((item) => item.id === lessonId);
  const playback: PlaybackDescriptor = decision.state === "UNLOCKED" ? (getPlaybackFixture(lessonId) ?? { kind: "YOUTUBE_UNLISTED", videoId: "", title: decision.lesson.title }) : { kind: "YOUTUBE_UNLISTED", videoId: "", title: decision.lesson.title };
  return { ...decision, course, progress: progress.get(lessonId) ?? { lessonId, status: "NOT_STARTED" as const, progressPercent: 0 }, playback, previous: course.lessons[index - 1], next: course.lessons[index + 1] };
}
export const saveLessonProgress = (lessonId: string, update: Partial<LessonProgress>) => { const current = progress.get(lessonId) ?? { lessonId, status: "NOT_STARTED" as const, progressPercent: 0 }; const next = { ...current, ...update, lastOpenedAt: new Date().toISOString() }; progress.set(lessonId, next); return next; };
export const getAssignedExams = (): OnlineExam[] => onlineExams.filter((exam) => examAssignments.some((assignment) => assignment.studentId === studentId && assignment.examId === exam.id));
export const getAssignedExam = (examId: string) => getAssignedExams().find((exam) => exam.id === examId) ?? null;
export const getUnifiedResults = (): UnifiedStudentResult[] => {
  const online: OnlineExamResult[] = [
    { id: "online-result-1", type: "ONLINE_EXAM", examId: "online-physics-review", courseId: "physics-revision-3", title: "اختبار الموجات", subject: "الفيزياء", teacher: "د. ندى عادل", date: "2026-07-28", score: 16, maxScore: 20, percentage: 80, status: "GRADED", violations: 1, pendingManualReview: false },
    { id: "online-result-2", type: "ONLINE_EXAM", examId: "online-math-motion", courseId: "math-term-3", title: "إجابة تدريبية قصيرة", subject: "الرياضيات", teacher: "أ. محمود سامي", date: "2026-07-25", maxScore: 10, status: "PENDING_REVIEW", violations: 0, pendingManualReview: true },
  ];
  return [...online, ...centerSessionResults, ...paperExamResults];
};
export const getUnifiedResult = (id: string) => getUnifiedResults().find((item) => item.id === id) ?? null;
