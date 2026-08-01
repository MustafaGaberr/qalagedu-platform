import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { MobileNavigation } from "@/components/layouts/mobile-navigation";
import { AppLogo } from "@/components/shared/app-logo";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 isolate border-b bg-background/94 backdrop-blur-md">
      <Container
        size="wide"
        className="flex min-h-16 items-center justify-between gap-4 sm:min-h-18"
      >
        <Link
          href="/"
          aria-label="العودة إلى الصفحة الرئيسية"
          className="rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <AppLogo size="sm" />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="التنقل العام"
        >
          {appConfig.primaryNavigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={index === 0 ? "page" : undefined}
              className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none aria-[current=page]:bg-secondary aria-[current=page]:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={appConfig.authNavigation.login.href}
            className={buttonVariants({ variant: "ghost" })}
          >
            {appConfig.authNavigation.login.title}
          </Link>
          <Link
            href={appConfig.authNavigation.register.href}
            className={cn(buttonVariants(), "shadow-md shadow-primary/15")}
          >
            {appConfig.authNavigation.register.title}
            <ArrowUpLeftIcon data-icon="inline-end" />
          </Link>
        </div>

        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
