export const locales = ["ar"] as const;

export type AppLocale = (typeof locales)[number];
export type TextDirection = "ltr" | "rtl";

export const defaultLocale: AppLocale = "ar";

export const localeConfig: Record<
  AppLocale,
  {
    label: string;
    direction: TextDirection;
  }
> = {
  ar: {
    label: "العربية",
    direction: "rtl",
  },
};

export function getTextDirection(locale: AppLocale): TextDirection {
  return localeConfig[locale].direction;
}
