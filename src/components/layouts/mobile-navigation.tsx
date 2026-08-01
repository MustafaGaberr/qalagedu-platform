"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import * as React from "react";

import { AppLogo } from "@/components/shared/app-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="icon" />}>
        <MenuIcon aria-hidden="true" />
        <span className="sr-only">فتح القائمة</span>
      </SheetTrigger>
      <SheetContent className="w-[min(24rem,calc(100vw-2rem))]">
        <SheetHeader>
          <AppLogo />
          <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
          <SheetDescription className="sr-only">
            روابط الصفحات العامة وتسجيل الدخول.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4" aria-label="القائمة الرئيسية">
          {appConfig.primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-4">
          <Link
            href={appConfig.authNavigation.register.href}
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            {appConfig.authNavigation.register.title}
          </Link>
          <Link
            href={appConfig.authNavigation.login.href}
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full"
            )}
          >
            {appConfig.authNavigation.login.title}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
