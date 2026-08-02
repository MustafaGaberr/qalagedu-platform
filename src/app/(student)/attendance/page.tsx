import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { AttendancePage } from "@/features/student-attendance/components/attendance-page";
import { getStudentAttendanceOverview } from "@/features/student-attendance/services/student-attendance-service";

export const metadata: Metadata = {
  title: `الحضور | ${appConfig.name}`,
  description:
    "سجل حضور الطالب وملخص الحضور حسب المادة باستخدام بيانات تجريبية فقط.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AttendanceRoute() {
  const attendance = await getStudentAttendanceOverview();

  return <AttendancePage data={attendance} />;
}
