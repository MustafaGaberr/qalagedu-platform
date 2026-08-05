import type { StudentDashboardData } from "@/features/student-dashboard/types/dashboard";
import { getLearningCourses } from "@/features/student-learning/services/learning-service";

const learningCourses = getLearningCourses();
const activeCourses = learningCourses.filter((course) => course.accessState === "ACTIVE").slice(0, 3).map((course, index) => ({ id: course.courseId, subject: course.subject, teacher: course.teacher, grade: course.grade, progress: course.progress, completedLessons: course.completedLessons, totalLessons: course.totalLessons, nextLesson: course.nextLessonId ?? "اكتملت الدروس المتاحة", status: "active" as const, statusLabel: "متاح", tone: index === 0 ? "emerald" as const : "sky" as const }));
const nextCourse = activeCourses[0];

export const mockStudentDashboardData: StudentDashboardData = {
  student: { id: "student-1", firstName: "سلمى", fullName: "سلمى أحمد محمود", grade: "الصف الثالث الثانوي", group: "مجموعة الأحد والثلاثاء", avatarInitials: "س أ" },
  statusSummary: "لديك خطوة تعليمية واحدة مناسبة الآن، ثم يمكنك مراجعة أقرب اختبار في الوقت المناسب.",
  stats: [], activeCourses,
  nextLesson: nextCourse ? { id: nextCourse.nextLesson, courseId: nextCourse.id, courseName: nextCourse.subject, teacher: nextCourse.teacher, title: nextCourse.nextLesson, lessonNumber: nextCourse.completedLessons + 1, progress: nextCourse.progress, durationMinutes: 42, isLocked: false, unlockMessage: "متاح الآن", tone: nextCourse.tone } : null,
  schedule: [], latestResult: null,
  attendance: { percentage: 92, presentCount: 23, absenceCount: 2, latestRecord: { dateLabel: "الأحد الماضي", course: "الرياضيات", statusLabel: "حضور مؤكد" } },
  notifications: [{ id: "notification-1", type: "lesson", title: "درس جاهز للمتابعة", description: "يمكنك إكمال الدرس التالي في كورسك الإلكتروني.", dateLabel: "منذ 20 دقيقة", unread: true }, { id: "notification-2", type: "result", title: "نتيجة متاحة للمراجعة", description: "يمكنك مراجعة أحدث نتيجة من صفحة الامتحانات والنتائج.", dateLabel: "منذ ساعتين", unread: true }],
  quickActions: [{ id: "open-exams", title: "الامتحانات والنتائج", description: "الاختبارات المتاحة ونتائجك الأخيرة.", href: "/exams" }, { id: "subscriptions", title: "اشتراكاتي", description: "حالة الوصول وطلبات الدفع.", href: "/subscriptions" }, { id: "center", title: "بيانات السنتر", description: "المجموعة والحضور الأخير.", href: "/attendance" }],
};
