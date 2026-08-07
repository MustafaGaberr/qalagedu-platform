import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { StudentDashboard } from "@/features/student-dashboard/components/student-dashboard";
import { getStudentDashboard } from "@/features/student-dashboard/services/student-dashboard-service";

export const metadata: Metadata = {
  title: `لوحة الطالب | ${appConfig.name}`,
  description:
    "لوحة الطالب لعرض الوصول الإلكتروني والدروس والاختبارات.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const dashboard = await getStudentDashboard();

  return <StudentDashboard data={dashboard} />;
}
