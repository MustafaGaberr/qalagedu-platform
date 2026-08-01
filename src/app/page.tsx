import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { AppLogo, Container } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="flex min-h-screen items-center">
      <Container size="narrow" className="py-16">
        <div className="flex flex-col items-start gap-8 text-start">
          <AppLogo />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <Link href="/dev/ui" className={buttonVariants({ size: "lg" })}>
            {t("devUiLink")}
          </Link>
        </div>
      </Container>
    </main>
  );
}
