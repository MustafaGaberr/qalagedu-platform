import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ActivationCodeForm } from "@/features/student-subscriptions/components/activation-code-form";
import { getStudentDashboard } from "@/features/student-dashboard/services/student-dashboard-service";
export const metadata: Metadata = { title: "إدخال كود تفعيل" };
export default async function Page() { const dashboard=await getStudentDashboard(); return <div className="flex flex-col gap-2"><PageHeader title="إدخال كود تفعيل" description="فعّلي عرضًا أو اشتراكًا باستخدام الكود الذي وصلك من المركز."/><ActivationCodeForm studentName={dashboard.student.fullName}/></div>; }
