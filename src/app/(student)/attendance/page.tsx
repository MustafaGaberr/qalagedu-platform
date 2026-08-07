import type { Metadata } from "next";
import { StudentCenterPage } from "@/features/student-access/components/access-pages";
import { getStudentAccessData } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "السنتر" };
export default async function Page() { const { centerEnrollments, centerRequests, centerAttendance } = await getStudentAccessData(); return <StudentCenterPage enrollments={centerEnrollments} requests={centerRequests} attendance={centerAttendance} />; }
