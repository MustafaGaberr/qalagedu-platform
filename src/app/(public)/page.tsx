import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { LandingPage } from "@/features/marketing/components/landing-page";

export const metadata: Metadata = {
  title: `${appConfig.name} | منصة تعليم عربية للطلاب`,
  description:
    "اكتشف تجربة Qalag EDU العامة: تنظيم الدروس، متابعة التقدم، الاختبارات، والحضور داخل واجهة عربية مميزة.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${appConfig.name} | تعلم بثقة`,
    description: appConfig.description,
    type: "website",
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

export default function HomePage() {
  return <LandingPage />;
}
