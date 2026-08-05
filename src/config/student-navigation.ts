export type StudentNavigationIcon = "home" | "courses" | "exams" | "subscriptions" | "center";
export type StudentNavigationItem = { title: string; href: "/dashboard" | "/library" | "/exams" | "/subscriptions" | "/attendance"; description: string; icon: StudentNavigationIcon; mobilePriority: boolean; };

/** The single source of truth for authenticated student navigation. */
export const studentNavigation = [
  { title: "الرئيسية", href: "/dashboard", description: "ملخص تعلمك وأقرب خطوة مفيدة لك.", icon: "home", mobilePriority: true },
  { title: "مكتبتي", href: "/library", description: "الكورسات والملفات المتاحة لحسابك.", icon: "courses", mobilePriority: true },
  { title: "الامتحانات والنتائج", href: "/exams", description: "الامتحانات المتاحة ونتائجك الأخيرة.", icon: "exams", mobilePriority: true },
  { title: "اشتراكاتي", href: "/subscriptions", description: "الوصول للمنصة وطلبات الدفع.", icon: "subscriptions", mobilePriority: false },
  { title: "السنتر", href: "/attendance", description: "مجموعات السنتر وملخص الحضور.", icon: "center", mobilePriority: true },
] as const satisfies readonly StudentNavigationItem[];
