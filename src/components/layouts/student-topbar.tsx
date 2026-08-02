"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  Student,
  StudentNotification,
} from "@/features/student-dashboard/types/dashboard";

import { notificationIconMap } from "@/features/student-dashboard/components/notification-icons";

type StudentTopbarProps = {
  title: string;
  student: Student;
  notifications: StudentNotification[];
};

export function StudentTopbar({
  title,
  student,
  notifications,
}: StudentTopbarProps) {
  const pathname = usePathname();
  const unreadCount = notifications.filter((item) => item.unread).length;
  const resolvedTitle = pathname.includes("/lessons/")
    ? "تفاصيل الدرس"
    : pathname.includes("/take")
      ? "محاولة اختبار"
      : pathname.startsWith("/exams/")
        ? "تفاصيل الاختبار"
        : pathname === "/exams"
          ? "الاختبارات"
          : pathname.startsWith("/results/")
            ? "تفاصيل النتيجة"
            : pathname === "/results"
              ? "النتائج"
              : pathname.startsWith("/courses/")
                ? "تفاصيل الكورس"
                : pathname === "/courses"
                  ? "كورساتي"
                  : title;

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <AppLogo showText={false} className="lg:hidden" />
          <div className="min-w-0 text-start">
            <p className="text-xs leading-5 text-muted-foreground">
              لوحة الطالب
            </p>
            <h1 className="truncate text-lg font-semibold leading-6 text-foreground">
              {resolvedTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon" className="relative" />}
              aria-label="فتح التنبيهات"
            >
              <BellIcon aria-hidden="true" />
              <span className="sr-only">فتح التنبيهات</span>
              {unreadCount > 0 ? (
                <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[0.68rem] font-semibold text-primary-foreground">
                  {unreadCount}
                </span>
              ) : null}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2">
              <DropdownMenuGroup className="flex flex-col gap-1">
                <DropdownMenuLabel className="px-2 py-2 text-start">
                  التنبيهات الأخيرة
                </DropdownMenuLabel>
                {notifications.slice(0, 4).map((item) => {
                  const Icon = notificationIconMap[item.type];

                  return (
                    <DropdownMenuItem
                      key={item.id}
                      className="items-start gap-3 p-2 text-start"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          {item.unread ? (
                            <span className="size-2 rounded-full bg-primary" />
                          ) : null}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </span>
                        <span className="mt-1 block text-[0.72rem] text-muted-foreground">
                          {item.dateLabel}
                        </span>
                      </span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-10 gap-2 px-2"
                  aria-label="فتح قائمة الملف الشخصي"
                />
              }
            >
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {student.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
                {student.firstName}
              </span>
              <ChevronDownIcon aria-hidden="true" className="hidden sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-start">
                  {student.fullName}
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <UserRoundIcon aria-hidden="true" />
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <SettingsIcon aria-hidden="true" />
                إعدادات الحساب
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/login" />}>
                <LogOutIcon aria-hidden="true" />
                خروج من التجربة
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
