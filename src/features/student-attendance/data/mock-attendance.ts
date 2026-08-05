import type { AttendanceRecord, StudentAttendanceData, SubjectAttendanceSummary } from "@/features/student-attendance/types/attendance";
import { mockStudentCourseSummaries } from "@/features/student-courses/data/mock-courses";

const records: AttendanceRecord[] = [
  { id: "att-1", studentId: "student-1", courseId: "math-3sec", subject: "الرياضيات التطبيقية", courseTitle: "الرياضيات التطبيقية", teacherName: "أ. محمود سامي", groupName: "مجموعة الأحد والثلاثاء", sessionTitle: "تطبيقات التفاضل على الحركة", sessionDate: "2026-08-02", startTime: "06:30 م", checkInTime: "06:22 م", location: "السنتر الرئيسي - قاعة 1", status: "present" },
  { id: "att-2", studentId: "student-1", courseId: "physics-3sec", subject: "الفيزياء", courseTitle: "الفيزياء", teacherName: "د. ندى عادل", groupName: "مجموعة أ", sessionTitle: "دوائر التيار المتردد", sessionDate: "2026-07-28", startTime: "06:30 م", checkInTime: "06:44 م", location: "السنتر الرئيسي - معمل الفيزياء", status: "late" },
  { id: "att-3", studentId: "student-1", courseId: "arabic-3sec", subject: "اللغة العربية", courseTitle: "اللغة العربية", teacherName: "أ. هالة يوسف", groupName: "مجموعة مراجعة", sessionTitle: "مدرسة الإحياء والبعث", sessionDate: "2026-07-30", startTime: "05:00 م", location: "السنتر الرئيسي - قاعة 2", status: "excused" },
  { id: "att-4", studentId: "student-1", courseId: "math-3sec", subject: "الرياضيات التطبيقية", courseTitle: "الرياضيات التطبيقية", teacherName: "أ. محمود سامي", groupName: "مجموعة الأحد والثلاثاء", sessionTitle: "معادلة المماس والعمودي", sessionDate: "2026-07-26", startTime: "06:30 م", checkInTime: "06:18 م", location: "السنتر الرئيسي - قاعة 1", status: "present" },
];

const attendanceByCourse: Record<string, { attended: number; total: number; absence: number; late: number }> = {
  "math-3sec": { attended: 10, total: 11, absence: 1, late: 0 },
  "physics-3sec": { attended: 7, total: 8, absence: 0, late: 1 },
  "arabic-3sec": { attended: 6, total: 7, absence: 0, late: 0 },
};

function subjectSummaries(): SubjectAttendanceSummary[] {
  return mockStudentCourseSummaries.filter((course) => course.enrollmentStatus === "active").map((course) => {
    const item = attendanceByCourse[course.id] ?? { attended: 0, total: 0, absence: 0, late: 0 };
    return { courseId: course.id, subject: course.subject, teacherName: course.teacher, groupName: course.group, attendedSessions: item.attended, totalSessions: item.total, percentage: item.total ? Math.round((item.attended / item.total) * 100) : 0, absenceCount: item.absence, lateCount: item.late, statusMessage: "هذه بيانات تجريبية للعرض فقط." };
  });
}

export function buildMockAttendanceData(): StudentAttendanceData {
  const sorted = [...records].sort((a, b) => b.sessionDate.localeCompare(a.sessionDate));
  return { summary: { totalSessions: 25, presentCount: 21, absentCount: 1, lateCount: 2, excusedCount: 1, attendancePercentage: 92, currentMonthPercentage: 100, previousMonthPercentage: 90, latestRecord: sorted[0] ?? null }, subjectSummaries: subjectSummaries(), records: sorted };
}
