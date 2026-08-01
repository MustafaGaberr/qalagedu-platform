import type messages from "@/i18n/messages/ar.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: "ar";
    Messages: typeof messages;
  }
}
