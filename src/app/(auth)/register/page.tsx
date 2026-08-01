import type { Metadata } from "next";

import { AuthShell } from "@/components/layouts/auth-shell";
import { appConfig } from "@/config/app";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: `إنشاء حساب | ${appConfig.name}`,
  description:
    "واجهة إنشاء حساب طالب باللغة العربية مع تحقق محلي ومحاكاة إرسال دون أي ربط خلفي.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `إنشاء حساب | ${appConfig.name}`,
    description: "ابدأ حساب الطالب التجريبي في Qalag EDU.",
    locale: "ar_EG",
    images: [
      {
        url: appConfig.center.logo.src,
        width: 80,
        height: 80,
        alt: appConfig.center.logo.alt,
      },
    ],
  },
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="إنشاء حساب طالب"
      description="املأ البيانات الأساسية لمعاينة تجربة التسجيل. لن يتم إرسال أي بيانات إلى خادم."
      size="wide"
    >
      <RegisterForm />
    </AuthShell>
  );
}
