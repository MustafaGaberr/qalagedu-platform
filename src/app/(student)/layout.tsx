import { StudentAppShell } from "@/components/layouts/student-app-shell";
import { getStudentDashboard } from "@/features/student-dashboard/services/student-dashboard-service";
import { getStudentNotifications } from "@/features/student-account/services/account-service";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboard, notifications] = await Promise.all([
    getStudentDashboard(),
    getStudentNotifications(),
  ]);

  return (
    <StudentAppShell
      student={dashboard.student}
      notifications={notifications}
    >
      {children}
    </StudentAppShell>
  );
}
