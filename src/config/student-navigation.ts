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

export const studentNavigation = [
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
    href: "#",
    description: "سيتم تفعيلها في مرحلة لاحقة.",
    icon: "exams",
    disabled: true,
  },
  {
    title: "النتائج",
    href: "/dashboard#latest-result",
    description: "آخر نتيجة منشورة للطالب.",
    icon: "results",
  },
  {
    title: "الحضور",
    href: "/dashboard#attendance",
    description: "ملخص حضور الطالب الحالي.",
    icon: "attendance",
  },
  {
    title: "الاشتراكات",
    href: "#",
    description: "سيتم تفعيلها مع مرحلة المدفوعات.",
    icon: "subscriptions",
    disabled: true,
  },
  {
    title: "بطاقة الطالب",
    href: "#",
    description: "عرض البطاقة سيتم لاحقا دون QR في هذه المرحلة.",
    icon: "student-card",
    disabled: true,
  },
  {
    title: "الملف الشخصي",
    href: "#",
    description: "تعديل البيانات الشخصية سيضاف لاحقا.",
    icon: "profile",
    disabled: true,
  },
] satisfies StudentNavigationItem[];
