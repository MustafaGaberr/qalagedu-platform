import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { MobileNavigation } from "@/components/layouts/mobile-navigation";
import { AppLogo } from "@/components/shared/app-logo";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { PublicSearch } from "@/features/public-catalog/components/public-search";
import type { PublicBrand } from "@/features/public-catalog/services/catalog-service";

export function PublicHeader({ brand }: { brand?: PublicBrand | null }) {
  return (
    <header className="sticky top-0 z-40 isolate border-b border-border/80 bg-background/94 backdrop-blur-md">
      <Container size="wide" className="grid min-h-14 grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 sm:min-h-16 md:flex md:justify-between md:gap-4">
        <div className="xl:hidden"><MobileNavigation /></div>
        <Link href="/" aria-label="العودة إلى الصفحة الرئيسية" className="rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <AppLogo size="sm" className="justify-center" logoSrc={brand?.logoSrc} brandName={brand?.brandName} centerName={brand?.centerName} />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="التنقل العام">
          {appConfig.primaryNavigation.map((item) =>
            item.disabled ? (
              <span key={item.title} aria-disabled="true" title={item.description} className="cursor-not-allowed rounded-lg px-3 py-2 text-[0.92rem] font-medium text-muted-foreground/60">
                {item.title}
              </span>
            ) : (
              <Link key={item.href} href={item.href} aria-current={item.href === "/" ? "page" : undefined} className="rounded-lg px-3 py-2 text-[0.92rem] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none aria-[current=page]:bg-secondary aria-[current=page]:text-foreground">
                {item.title}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <PublicSearch />
          <Link href={appConfig.authNavigation.login.href} className={buttonVariants({ variant: "ghost" })}>
            {appConfig.authNavigation.login.title}
          </Link>
          <Link href={appConfig.authNavigation.register.href} className={cn(buttonVariants(), "shadow-md shadow-primary/15")}>
            {appConfig.authNavigation.register.title}
            <ArrowUpLeftIcon data-icon="inline-end" />
          </Link>
        </div>

        <div className="md:hidden"><PublicSearch /></div>
      </Container>
    </header>
  );
}
