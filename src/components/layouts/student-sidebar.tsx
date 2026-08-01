"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/shared/app-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { studentNavigation } from "@/config/student-navigation";
import type { Student } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

import { studentNavigationIcons } from "./student-navigation-icons";

type StudentSidebarProps = {
  student: Student;
};

export function StudentSidebar({ student }: StudentSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen border-e bg-card/95 shadow-sm shadow-foreground/5 lg:sticky lg:top-0 lg:flex lg:flex-col">
      <div className="border-b px-5 py-5">
        <AppLogo size="md" />
      </div>

      <nav
        aria-label="تنقل الطالب"
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
      >
        {studentNavigation.map((item) => {
          const Icon = studentNavigationIcons[item.icon];
          const isActive = item.href === pathname;
          const classes = cn(
            "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            isActive
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            item.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent"
          );

          if (item.disabled) {
            return (
              <div
                key={item.title}
                className={classes}
                aria-disabled="true"
                title={item.description}
              >
                <Icon aria-hidden="true" className="size-4" />
                <span>{item.title}</span>
                <Badge variant="secondary" className="ms-auto text-[0.68rem]">
                  لاحقا
                </Badge>
              </div>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className={classes}
              aria-current={isActive ? "page" : undefined}
              title={item.description}
            >
              <Icon aria-hidden="true" className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-lg bg-secondary/70 p-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                {student.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <p className="truncate text-sm font-semibold text-foreground">
                {student.fullName}
              </p>
              <p className="truncate text-xs leading-5 text-muted-foreground">
                {student.grade}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{student.group}</span>
            <span className="font-mono">{student.studentCode}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
