export type NavigationItem = {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
};

export type SocialLink = { title: string; href: string };

function requiredPublicValue(name: string, value: string | undefined): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${name} is required`);
  return normalized;
}

function requiredPublicOrigin(name: string, value: string | undefined): string {
  const configuredValue = requiredPublicValue(name, value);
  const url = new URL(configuredValue);
  if (url.origin !== configuredValue) {
    throw new Error(`${name} must be an origin without a path or trailing slash`);
  }
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error(`${name} must use HTTPS in production`);
  }
  return url.origin;
}

const primaryNavigation: NavigationItem[] = [
  { title: "الرئيسية", href: "/", description: "العودة إلى الصفحة الرئيسية." },
  { title: "الكورسات", href: "/courses", description: "استعرض كل الكورسات." },
  { title: "المدرسون", href: "/teachers", description: "تعرّف إلى المدرسين." },
  {
    title: "مواعيد السنتر",
    href: "/center-schedule",
    description: "استعرض مواعيد السنتر.",
  },
  {
    title: "المتجر التعليمي",
    href: "/store",
    description: "استعرض المتجر التعليمي.",
  },
];

const footerNavigation: NavigationItem[] = [
  { title: "عن المنصة", href: "/#about", description: "نبذة عن المنصة." },
  {
    title: "الأسئلة الشائعة",
    href: "/#faq",
    description: "إجابات سريعة.",
  },
  { title: "تواصل معنا", href: "/#contact", description: "بيانات التواصل." },
];

export const appConfig = {
  name: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_NAME",
    process.env.NEXT_PUBLIC_BRAND_NAME,
  ),
  shortName: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_SHORT_NAME",
    process.env.NEXT_PUBLIC_BRAND_SHORT_NAME,
  ),
  url: requiredPublicOrigin(
    "NEXT_PUBLIC_APP_URL",
    process.env.NEXT_PUBLIC_APP_URL,
  ),
  description: requiredPublicValue(
    "NEXT_PUBLIC_BRAND_DESCRIPTION",
    process.env.NEXT_PUBLIC_BRAND_DESCRIPTION,
  ),
  center: {
    name: requiredPublicValue(
      "NEXT_PUBLIC_CENTER_NAME",
      process.env.NEXT_PUBLIC_CENTER_NAME,
    ),
    logo: {
      src: requiredPublicValue(
        "NEXT_PUBLIC_BRAND_LOGO_SRC",
        process.env.NEXT_PUBLIC_BRAND_LOGO_SRC,
      ),
      alt: requiredPublicValue(
        "NEXT_PUBLIC_BRAND_LOGO_ALT",
        process.env.NEXT_PUBLIC_BRAND_LOGO_ALT,
      ),
      width: 40,
      height: 40,
    },
    contact: {
      phone: requiredPublicValue(
        "NEXT_PUBLIC_SUPPORT_PHONE",
        process.env.NEXT_PUBLIC_SUPPORT_PHONE,
      ),
      email: requiredPublicValue(
        "NEXT_PUBLIC_SUPPORT_EMAIL",
        process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
      ),
      address: requiredPublicValue(
        "NEXT_PUBLIC_SUPPORT_ADDRESS",
        process.env.NEXT_PUBLIC_SUPPORT_ADDRESS,
      ),
    },
  },
  primaryNavigation,
  authNavigation: {
    login: { title: "تسجيل الدخول", href: "/login" },
    register: { title: "إنشاء حساب", href: "/register" },
  },
  footerNavigation,
  legalLinks: [] as NavigationItem[],
  socialLinks: [
    { title: "فيسبوك", href: "#" },
    { title: "يوتيوب", href: "#" },
    { title: "إنستجرام", href: "#" },
  ] as SocialLink[],
} as const;
