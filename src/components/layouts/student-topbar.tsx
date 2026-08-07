"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  ChevronDownIcon,
  HelpCircleIcon,
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
} from "@/features/student-dashboard/types/dashboard";
import type { StudentAccountNotification } from "@/features/student-account/types/account";
import { studentProfileMenu } from "@/config/student-profile-menu";
import { LogoutConfirmation } from "@/features/student-account/components/logout-button";


type StudentTopbarProps = {
  title: string;
  student: Student;
  notifications: StudentAccountNotification[];
};

export function StudentTopbar({
  title,
  student,
  notifications,
}: StudentTopbarProps) {
  const pathname = usePathname();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const unreadCount = notifications.filter((item) => !item.isRead).length;
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
              : pathname === "/student-card" || pathname === "/attendance"
                ? "السنتر"
                  : pathname.startsWith("/courses/") || pathname.startsWith("/learn/")
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
            <DropdownMenuContent
              align="end"
              className="w-80 max-w-[calc(100vw-2rem)] p-2"
            >
              <DropdownMenuGroup className="flex flex-col gap-1">
                <DropdownMenuLabel className="px-2 py-2 text-start">
                  التنبيهات الأخيرة
                </DropdownMenuLabel>
                {notifications.slice(0, 4).map((item) => {
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      render={
                        item.relatedRoute ? (
                          <Link href={item.relatedRoute} />
                        ) : undefined
                      }
                      className="items-start gap-3 p-2 text-start"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <BellIcon aria-hidden="true" className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          {!item.isRead ? (
                            <span className="inline-flex items-center gap-1 text-[0.68rem] text-primary">
                              <span className="size-2 rounded-full bg-primary" />
                              غير مقروء
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                          {item.message}
                        </span>
                        <span className="mt-1 block text-[0.72rem] text-muted-foreground">
                          {new Intl.DateTimeFormat("ar-EG", { dateStyle: "short" }).format(new Date(item.createdAt))}
                        </span>
                      </span>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem render={<Link href="/notifications" />}>
                  عرض كل الإشعارات
                </DropdownMenuItem>
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
              {studentProfileMenu.map((item) => {
                const Icon =
                  item.icon === "profile"
                    ? UserRoundIcon
                    : item.icon === "settings"
                      ? SettingsIcon
                      : HelpCircleIcon;

                return (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href} />}
                  >
                    <Icon aria-hidden="true" />
                    {item.title}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
                <LogOutIcon aria-hidden="true" />
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LogoutConfirmation
            open={logoutOpen}
            onOpenChange={setLogoutOpen}
          />
        </div>
      </div>
    </header>
  );
}
