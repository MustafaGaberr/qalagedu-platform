"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/shared/app-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { studentNavigation } from "@/config/student-navigation";
import { cn } from "@/lib/utils";

import { studentNavigationIcons } from "./student-navigation-icons";

const primaryMobileItems = studentNavigation.filter((item) =>
  ["home", "courses", "exams", "results"].includes(item.icon)
);

export function StudentMobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="تنقل الطالب على الهاتف"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {primaryMobileItems.map((item) => {
          const Icon = studentNavigationIcons[item.icon];
          const isActive =
            item.href === pathname ||
            (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.title}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[0.72rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
              <span className="max-w-full truncate">{item.title}</span>
            </Link>
          );
        })}

        <Sheet>
          <SheetTrigger render={<Button variant="ghost" className="min-h-14 flex-col gap-1 px-1 text-[0.72rem]" />}>
            <MenuIcon aria-hidden="true" className="size-4" />
            المزيد
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl" showCloseButton>
            <SheetHeader>
              <AppLogo />
              <SheetTitle className="sr-only">المزيد من وجهات الطالب</SheetTitle>
              <SheetDescription className="text-start">
                وجهات محفوظة للمراحل القادمة دون إنشاء صفحات فارغة.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 px-4 pb-5 sm:grid-cols-2">
              {studentNavigation.map((item) => {
                const Icon = studentNavigationIcons[item.icon];

                if (item.disabled) {
                  return (
                    <div
                      key={item.title}
                      aria-disabled="true"
                      className="flex min-h-12 items-center gap-3 rounded-lg border bg-muted/40 px-3 text-sm text-muted-foreground opacity-75"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      <span>{item.title}</span>
                      <span className="ms-auto text-xs">لاحقا</span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex min-h-12 items-center gap-3 rounded-lg border bg-card px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Icon aria-hidden="true" className="size-4 text-primary" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
