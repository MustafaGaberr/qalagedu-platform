export type NavigationItem = {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
};

export const appConfig = {
  name: "منصة قلعة التعليمية",
  shortName: "قلعة",
  description: "منصة تعليمية عربية موجهة لتجربة تعلم الطلاب.",
  center: {
    name: "مركز قلعة التعليمي",
    logo: {
      src: "/brand/qalagedu-mark.svg",
      alt: "شعار مركز قلعة التعليمي",
      width: 40,
      height: 40,
    },
    contact: {
      phone: "+20 000 000 0000",
      email: "hello@qalagedu.example",
      address: "القاهرة، مصر",
    },
  },
  primaryNavigation: [
    {
      title: "نظرة عامة",
      href: "#",
      description: "مساحة مستقبلية لملخص رحلة الطالب.",
      disabled: true,
    },
    {
      title: "الدورات",
      href: "#",
      description: "مساحة مستقبلية لقائمة الدورات التعليمية.",
      disabled: true,
    },
    {
      title: "الاختبارات",
      href: "#",
      description: "مساحة مستقبلية للاختبارات والتقييمات.",
      disabled: true,
    },
    {
      title: "التقدم",
      href: "#",
      description: "مساحة مستقبلية لمتابعة تقدم الطالب.",
      disabled: true,
    },
  ] satisfies NavigationItem[],
} as const;
