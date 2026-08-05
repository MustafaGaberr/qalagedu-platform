import type { Metadata } from "next";
import { AuthShell } from "@/components/layouts/auth-shell";
import { appConfig } from "@/config/app";
import { RegisterForm } from "@/features/auth/components/register-form";
import { CenterPreferenceSummary } from "@/features/public-catalog/components/center-preference-summary";
export const metadata: Metadata = { title: `إنشاء حساب | ${appConfig.name}` };
export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ interest?: string; grade?: string; teacher?: string; course?: string; group?: string }> }) { const params=await searchParams; return <AuthShell title="إنشاء حساب طالب" description="املأ البيانات الأساسية لمعاينة تجربة التسجيل. لن يتم إرسال أي بيانات إلى خادم." size="wide"><CenterPreferenceSummary preference={params.interest==="center"?params:{}}/><RegisterForm /></AuthShell>; }
