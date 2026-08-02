import { MockStudentDashboardRepository } from "@/mocks/repositories/mock-student-dashboard-repository";
import { getStudentAttendanceOverview } from "@/features/student-attendance/services/student-attendance-service";
import type {
  StudentDashboardData,
  StudentDashboardRepository,
} from "@/features/student-dashboard/types/dashboard";

const repository = new MockStudentDashboardRepository();

export async function getStudentDashboard(
  dashboardRepository: StudentDashboardRepository = repository
): Promise<StudentDashboardData> {
  const [dashboard, attendance] = await Promise.all([
    dashboardRepository.getDashboard(),
    getStudentAttendanceOverview(),
  ]);
  const latestRecord = attendance.summary.latestRecord;
  const stats = dashboard.stats.map((stat) =>
    stat.id === "attendance-rate"
      ? {
          ...stat,
          value: `${attendance.summary.attendancePercentage}%`,
          description: "من سجل الحضور التجريبي",
        }
      : stat
  );
  const quickActions = dashboard.quickActions.map((action) =>
    action.id === "student-card"
      ? {
          ...action,
          href: "/student-card",
          description: "معاينة بطاقة الطالب والكود التعريفي التجريبي.",
          disabled: false,
        }
      : action
  );

  return {
    ...dashboard,
    stats,
    attendance: {
      percentage: attendance.summary.attendancePercentage,
      presentCount:
        attendance.summary.presentCount +
        attendance.summary.lateCount +
        attendance.summary.excusedCount,
      absenceCount: attendance.summary.absentCount,
      latestRecord: latestRecord
        ? {
            dateLabel: latestRecord.sessionDate,
            course: latestRecord.subject,
            statusLabel: "آخر تسجيل متاح",
          }
        : dashboard.attendance.latestRecord,
    },
    quickActions,
  };
}
