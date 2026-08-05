import type { Metadata } from "next";
import { appConfig } from "@/config/app";
import { StudentCenterPage } from "@/features/student-attendance/components/student-center-page";
import { getStudentAttendanceOverview } from "@/features/student-attendance/services/student-attendance-service";

export const metadata: Metadata = { title: `السنتر | ${appConfig.name}`, description: "ملخص مجموعات السنتر وحضور الطالب ببيانات تجريبية فقط.", robots: { index: false, follow: false } };
export default async function AttendanceRoute() { return <StudentCenterPage data={await getStudentAttendanceOverview()} />; }
