import "server-only";

import { getStudentProfile } from "@/features/student-account/services/account-service";
import { getStudentCenterAttendance, getStudentCenterEnrollments } from "@/features/student-access/services/access-service";
import { getLearningCourses } from "@/features/student-learning/services/learning-service";
import type { CourseTone, StudentDashboardData } from "../types/dashboard";

const tones: CourseTone[] = ["emerald", "sky", "amber", "rose"];

export async function getStudentDashboard(): Promise<StudentDashboardData> {
  const [profile, learningCourses, centerEnrollments, centerAttendance] = await Promise.all([
    getStudentProfile(),
    getLearningCourses(),
    getStudentCenterEnrollments(),
    getStudentCenterAttendance(),
  ]);
  const activeCourses = learningCourses.filter((course) => course.accessState === "ACTIVE").map((course, index) => {
    const next = course.lessons.find((lesson) => lesson.id === course.nextLessonId);
    return {
      id: course.courseId,
      cover: course.cover,
      subject: course.subject,
      teacher: course.teacher,
      grade: course.grade,
      progress: course.progress,
      completedLessons: course.completedLessons,
      totalLessons: course.totalLessons,
      nextLesson: next?.title ?? "اكتملت الدروس المتاحة",
      status: "active" as const,
      statusLabel: "متاح",
      tone: tones[index % tones.length],
    };
  });
  const firstCourse = learningCourses.find((course) => course.accessState === "ACTIVE" && course.nextLessonId);
  const nextLesson = firstCourse?.lessons.find((lesson) => lesson.id === firstCourse.nextLessonId);
  return {
    student: {
      id: profile.id,
      firstName: profile.firstName,
      fullName: profile.fullName,
      grade: profile.grade,
      group: centerEnrollments[0]?.assignedGroup ?? "لا توجد مجموعة سنتر معتمدة",
      avatarInitials: profile.profileInitials,
    },
    statusSummary: activeCourses.length ? `لديك ${activeCourses.length} كورسات متاحة الآن.` : "لا يوجد وصول إلكتروني نشط حاليًا.",
    stats: [],
    activeCourses,
    nextLesson: firstCourse && nextLesson ? {
      id: nextLesson.id,
      courseId: firstCourse.courseId,
      courseName: firstCourse.title,
      teacher: firstCourse.teacher,
      title: nextLesson.title,
      lessonNumber: Math.max(1, firstCourse.lessons.findIndex((lesson) => lesson.id === nextLesson.id) + 1),
      progress: 0,
      durationMinutes: 0,
      isLocked: false,
      unlockMessage: "متاح الآن",
      tone: activeCourses.find((course) => course.id === firstCourse.courseId)?.tone ?? "emerald",
      thumbnailUrl: nextLesson.thumbnailUrl,
    } : null,
    schedule: [],
    latestResult: null,
    attendance: (() => { const item = centerAttendance[0]; const total = item?.totalSessions ?? 0; return { percentage: total ? Math.round(((item.presentCount + item.lateCount) / total) * 100) : 0, presentCount: item?.presentCount ?? 0, absenceCount: item?.absentCount ?? 0, latestRecord: { dateLabel: item?.latestSessionDate ?? "لا توجد جلسات", course: item?.courseTitle ?? "السنتر", statusLabel: item ? `حاضر ${item.presentCount} · غياب ${item.absentCount}` : "لا توجد سجلات حضور" } }; })(),
    notifications: [],
    quickActions: [
      { id: "open-exams", title: "الامتحانات والنتائج", description: "الاختبارات المخصصة ونتائجك.", href: "/exams" },
      { id: "subscriptions", title: "اشتراكاتي", description: "الوصول وطلبات الدفع.", href: "/subscriptions" },
      { id: "center", title: "بيانات السنتر", description: "دعم بيانات السنتر الحالية.", href: "/attendance" },
    ],
  };
}
