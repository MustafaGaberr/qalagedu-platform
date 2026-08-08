import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { MobileLandingPage } from "@/features/marketing/components/mobile-landing-page";
import { getPublicCourses, getPublicTeachers, getStoreProducts, getWebsiteSections } from "@/features/public-catalog/services/catalog-service";

export const metadata: Metadata = {
  title: `${appConfig.name} | منصة تعليمية عربية للطلاب`,
  description: "استكشف كورسات ومدرسين وباقات مراجعة ومواد تعليمية في تجربة عربية منظمة للطلاب وأولياء الأمور.",
  robots: { index: true, follow: true },
  openGraph: { title: `${appConfig.name} | تعلّم بثقة`, description: appConfig.description, type: "website", locale: "ar_EG", images: [{ url: appConfig.center.logo.src, width: 80, height: 80, alt: appConfig.center.logo.alt }] },
};

export default async function HomePage() {
  const [sections, teachers, courses, products] = await Promise.all([getWebsiteSections(), getPublicTeachers(), getPublicCourses(), getStoreProducts()]);
  return <MobileLandingPage sections={sections} teachers={teachers} courses={courses} products={products} />;
}
