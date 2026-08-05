"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/shared/app-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { studentNavigation } from "@/config/student-navigation";
import type { Student } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

import { studentNavigationIcons } from "./student-navigation-icons";

type StudentSidebarProps = { student: Student };

export function StudentSidebar({ student }: StudentSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen border-e bg-card/95 shadow-sm shadow-foreground/5 lg:sticky lg:top-0 lg:flex lg:flex-col">
      <div className="border-b px-5 py-5"><AppLogo size="md" /></div>
      <nav aria-label="تنقل الطالب" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {studentNavigation.map((item) => {
          const Icon = studentNavigationIcons[item.icon];
          const isActive = item.href === pathname || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
          return (
            <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} title={item.description}
              className={cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50", isActive ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
              <Icon aria-hidden="true" className="size-4" /><span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4"><div className="rounded-lg bg-secondary/70 p-3"><div className="flex items-center gap-3"><Avatar size="lg"><AvatarFallback className="bg-primary/10 font-semibold text-primary">{student.avatarInitials}</AvatarFallback></Avatar><div className="min-w-0 text-start"><p className="truncate text-sm font-semibold text-foreground">{student.fullName}</p><p className="truncate text-xs leading-5 text-muted-foreground">{student.grade}</p></div></div><p className="mt-2 truncate text-xs leading-5 text-muted-foreground">{student.group}</p></div></div>
    </aside>
  );
}
