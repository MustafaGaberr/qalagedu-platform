import type { Metadata } from "next";
import { CenterApplyPage } from "@/features/student-access/components/access-pages";
export const metadata: Metadata = { title: "طلب انضمام للسنتر" };
export default function Page() { return <CenterApplyPage />; }
