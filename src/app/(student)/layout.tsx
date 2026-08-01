import { StudentAppShell } from "@/components/layouts/student-app-shell";
import { getStudentDashboard } from "@/features/student-dashboard/services/student-dashboard-service";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboard = await getStudentDashboard();

  return (
    <StudentAppShell
      student={dashboard.student}
      notifications={dashboard.notifications}
    >
      {children}
    </StudentAppShell>
  );
}
