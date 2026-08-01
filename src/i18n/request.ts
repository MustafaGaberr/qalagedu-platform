import { getRequestConfig } from "next-intl/server";

import { defaultLocale } from "@/i18n/locales";

export default getRequestConfig(async () => {
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: "Africa/Cairo",
  };
});
