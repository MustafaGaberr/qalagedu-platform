import type { Metadata } from "next";
import { StudentCenterPage } from "@/features/student-access/components/access-pages";
import { getStudentAccessData } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "السنتر" };
export default function Page() { const { centerEnrollments, centerRequests } = getStudentAccessData(); return <StudentCenterPage enrollments={centerEnrollments} requests={centerRequests} />; }
