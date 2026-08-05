import type { Metadata } from "next";
import { ActivationPage } from "@/features/student-access/components/access-pages";
export const metadata: Metadata = { title: "تفعيل كود وصول" };
export default function Page() { return <ActivationPage />; }
