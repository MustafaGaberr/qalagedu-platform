export type NavigationItem = {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
};

export type SocialLink = {
  title: string;
  href: string;
};

export const appConfig = {
  name: "Qalag EDU",
  shortName: "Qalag",
  url: "https://qalagedu.example",
  description: "منصة عربية منظمة تساعد الطالب على متابعة الدروس والاختبارات والتقدم من مكان واحد.",
  center: {
    name: "منصة السنتر التعليمية",
    logo: {
      src: "/brand/qalagedu-mark.svg",
      alt: "علامة Qalag EDU المؤقتة",
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
      title: "الرئيسية",
      href: "/",
      description: "مقدمة المنصة وتجربة الطالب.",
    },
    {
      title: "التجربة",
      href: "/#experience",
      description: "كيف يتعلم الطالب خطوة بخطوة.",
    },
    {
      title: "المميزات",
      href: "/#features",
      description: "نظرة على أدوات المتابعة والتنظيم.",
    },
    {
      title: "الدورات",
      href: "/#courses",
      description: "نماذج تسويقية لدورات قادمة.",
    },
    {
      title: "الأسئلة",
      href: "/#faq",
      description: "إجابات سريعة لأهم الأسئلة.",
    },
  ] satisfies NavigationItem[],
  authNavigation: {
    login: {
      title: "تسجيل الدخول",
      href: "/login",
    },
    register: {
      title: "إنشاء حساب",
      href: "/register",
    },
  },
  legalLinks: [
    {
      title: "الشروط والأحكام",
      href: "#",
      description: "رابط قانوني مؤقت.",
      disabled: true,
    },
    {
      title: "سياسة الخصوصية",
      href: "#",
      description: "رابط قانوني مؤقت.",
      disabled: true,
    },
  ] satisfies NavigationItem[],
  socialLinks: [
    {
      title: "فيسبوك",
      href: "#",
    },
    {
      title: "يوتيوب",
      href: "#",
    },
    {
      title: "إنستجرام",
      href: "#",
    },
  ] satisfies SocialLink[],
} as const;
