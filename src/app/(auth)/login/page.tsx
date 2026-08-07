import type { Metadata } from "next";

import { AuthShell } from "@/components/layouts/auth-shell";
import { appConfig } from "@/config/app";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: `تسجيل الدخول | ${appConfig.name}`,
  description:
    "تسجيل دخول الطلاب بأمان إلى منصة Qalag EDU.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `تسجيل الدخول | ${appConfig.name}`,
    description: "سجل دخولك إلى تجربة الطالب في Qalag EDU.",
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

export default function LoginPage() {
  return (
    <AuthShell
      title="تسجيل الدخول"
      description="ادخل بيانات حسابك للوصول إلى دروسك واشتراكاتك."
    >
      <LoginForm />
    </AuthShell>
  );
}
