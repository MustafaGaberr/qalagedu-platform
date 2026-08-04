export type StudentNavigationIcon =
  | "home"
  | "courses"
  | "exams"
  | "results"
  | "attendance"
  | "subscriptions"
  | "student-card"
  | "profile";

export type StudentNavigationItem = {
  title: string;
  href: string;
  description: string;
  icon: StudentNavigationIcon;
  disabled?: boolean;
};

export const studentNavigation: StudentNavigationItem[] = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    description: "ملخص التعلم الحالي والأنشطة المهمة.",
    icon: "home",
  },
  {
    title: "كورساتي",
    href: "/courses",
    description: "كل الكورسات المسجلة وتفاصيل المنهج والدروس.",
    icon: "courses",
  },
  {
    title: "الاختبارات",
    href: "/exams",
    description: "الاختبارات والتقييمات المتاحة والقادمة.",
    icon: "exams",
  },
  {
    title: "النتائج",
    href: "/results",
    description: "سجل نتائج الاختبارات ومحاولات الطالب.",
    icon: "results",
  },
  {
    title: "الحضور",
    href: "/attendance",
    description: "ملخص الحضور وسجل الحصص حسب المادة.",
    icon: "attendance",
  },
  {
    title: "الاشتراكات",
    href: "/subscriptions",
    description: "سيتم تفعيلها مع مرحلة المدفوعات.",
    icon: "subscriptions",
  },
  {
    title: "بطاقة الطالب",
    href: "/student-card",
    description: "بطاقة هوية الطالب والكود التعريفي التجريبي.",
    icon: "student-card",
  },
  {
    title: "الملف الشخصي",
    href: "/profile",
    description: "تعديل البيانات الشخصية سيضاف لاحقا.",
    icon: "profile",
  },
];
