import type { Metadata } from "next";
import { CenterApplyPage } from "@/features/student-access/components/access-pages";
import { getStudentCenterGroups } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "طلب انضمام للسنتر" };
export default async function Page() { return <CenterApplyPage groups={await getStudentCenterGroups()} />; }
