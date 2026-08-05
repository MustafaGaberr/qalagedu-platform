import type { StudentDashboardData } from "@/features/student-dashboard/types/dashboard";
import { mockStudentCourseSummaries } from "@/features/student-courses/data/mock-courses";

const activeCourses = mockStudentCourseSummaries.filter((course) => course.enrollmentStatus === "active").slice(0, 3).map((course) => ({
  id: course.id, subject: course.subject, teacher: course.teacher, grade: course.grade, progress: course.progress,
  completedLessons: course.completedLessons, totalLessons: course.totalLessons, nextLesson: course.nextLesson ?? "اكتملت الدروس المتاحة",
  status: "active" as const, statusLabel: "متاح", tone: course.tone,
}));

export const mockStudentDashboardData: StudentDashboardData = {
  student: { id: "student-1", firstName: "سلمى", fullName: "سلمى أحمد محمود", grade: "الصف الثالث الثانوي", group: "مجموعة الأحد والثلاثاء", avatarInitials: "س أ" },
  statusSummary: "لديك درس جاهز للمتابعة اليوم، ثم يمكنك مراجعة أقرب اختبار في وقت مناسب.",
  stats: [],
  activeCourses,
  nextLesson: { id: "math-derivatives-motion", courseId: "math-3sec", courseName: "الرياضيات التطبيقية", teacher: "أ. محمود سامي", title: "تطبيقات التفاضل على الحركة", lessonNumber: 9, progress: 68, durationMinutes: 42, isLocked: false, unlockMessage: "متاح الآن", tone: "emerald" },
  schedule: [],
  latestResult: null,
  attendance: { percentage: 92, presentCount: 23, absenceCount: 2, latestRecord: { dateLabel: "الأحد الماضي", course: "الرياضيات التطبيقية", statusLabel: "حضور مؤكد" } },
  notifications: [
    { id: "notification-1", type: "lesson", title: "درس جديد متاح", description: "تم فتح درس تطبيقات التفاضل في كورس الرياضيات.", dateLabel: "منذ 20 دقيقة", unread: true },
    { id: "notification-2", type: "result", title: "تم نشر نتيجة اختبار", description: "نتيجة اختبار الحركة الموجية أصبحت جاهزة للمراجعة.", dateLabel: "منذ ساعتين", unread: true },
  ],
  quickActions: [
    { id: "open-exams", title: "دخول الامتحانات", description: "الاختبارات المتاحة والنتائج.", href: "/exams" },
    { id: "subscriptions", title: "متابعة الاشتراكات", description: "حالة الاشتراك وطلبات الدفع.", href: "/subscriptions" },
    { id: "center", title: "بيانات السنتر", description: "المجموعة والحضور الأخير.", href: "/attendance" },
  ],
};
