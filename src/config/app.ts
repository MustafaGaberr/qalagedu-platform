export type NavigationItem = {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
};

export type SocialLink = { title: string; href: string };

export const appConfig = {
  name: "Qalag EDU",
  shortName: "Qalag",
  url: "https://qalagedu.example",
  description:
    "منصة تعليمية عربية تجمع الكورسات والمتابعة والمواد التعليمية في تجربة واضحة للطالب وولي الأمر.",
  center: {
    name: "قلاّج للتعليم",
    logo: {
      src: "/brand/qalagedu-mark.svg",
      alt: "شعار قلاّج للتعليم",
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
    { title: "الرئيسية", href: "/", description: "العودة إلى الصفحة الرئيسية." },
    { title: "الكورسات", href: "/courses", description: "استعراض تجربة الكورسات الحالية." },
    { title: "المدرسون", href: "#teachers", description: "الانتقال إلى المدرسين المميزين." },
    { title: "مواعيد السنتر", href: "#center-schedule", description: "معاينة مواعيد السنتر." },
    { title: "المتجر التعليمي", href: "#store", description: "معاينة المتجر التعليمي." },
    { title: "الأخبار", href: "#", description: "قسم الأخبار قيد الإعداد.", disabled: true },
  ] satisfies NavigationItem[],
  authNavigation: {
    login: { title: "تسجيل الدخول", href: "/login" },
    register: { title: "إنشاء حساب", href: "/register" },
  },
  footerNavigation: [
    { title: "عن المنصة", href: "#about", description: "نبذة عن المنصة." },
    { title: "الأسئلة الشائعة", href: "#faq", description: "إجابات سريعة." },
    { title: "تواصل معنا", href: "#contact", description: "بيانات التواصل." },
  ] satisfies NavigationItem[],
  legalLinks: [
    { title: "الشروط والأحكام", href: "#", description: "رابط قانوني مؤقت.", disabled: true },
    { title: "سياسة الخصوصية", href: "#", description: "رابط قانوني مؤقت.", disabled: true },
  ] satisfies NavigationItem[],
  socialLinks: [
    { title: "فيسبوك", href: "#" },
    { title: "يوتيوب", href: "#" },
    { title: "إنستجرام", href: "#" },
  ] satisfies SocialLink[],
} as const;
