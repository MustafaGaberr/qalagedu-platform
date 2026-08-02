import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { StudentCardPage } from "@/features/student-attendance/components/student-card-page";
import { getStudentCardData } from "@/features/student-attendance/services/student-attendance-service";

export const metadata: Metadata = {
  title: `بطاقة الطالب | ${appConfig.name}`,
  description:
    "بطاقة هوية طالب رقمية مع نموذج QR تجريبي لا يحتوي على بيانات شخصية.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudentCardRoute() {
  const card = await getStudentCardData();

  return <StudentCardPage card={card} />;
}
