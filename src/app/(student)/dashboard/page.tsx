import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { StudentDashboard } from "@/features/student-dashboard/components/student-dashboard";
import { getStudentDashboard } from "@/features/student-dashboard/services/student-dashboard-service";

export const metadata: Metadata = {
  title: `لوحة الطالب | ${appConfig.name}`,
  description:
    "لوحة طالب عربية تعرض ملخص التعلم والكورسات والحضور والنتائج باستخدام بيانات تجريبية فقط.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const dashboard = await getStudentDashboard();

  return <StudentDashboard data={dashboard} />;
}
