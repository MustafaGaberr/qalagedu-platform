import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, LockIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { LessonNavigationItem } from "@/features/student-lessons/types/lessons";
import { cn } from "@/lib/utils";

type LessonPrevNextNavigationProps = {
  previousLesson: LessonNavigationItem | null;
  nextLesson: LessonNavigationItem | null;
};

export function LessonPrevNextNavigation({
  previousLesson,
  nextLesson,
}: LessonPrevNextNavigationProps) {
  return (
    <nav
      aria-label="التنقل بين الدروس"
      className="grid gap-3 md:grid-cols-2"
    >
      <NavigationTarget
        lesson={previousLesson}
        label="الدرس السابق"
        icon="previous"
      />
      <NavigationTarget lesson={nextLesson} label="الدرس التالي" icon="next" />
    </nav>
  );
}

function NavigationTarget({
  lesson,
  label,
  icon,
}: {
  lesson: LessonNavigationItem | null;
  label: string;
  icon: "previous" | "next";
}) {
  const Icon =
    lesson?.href ? (icon === "previous" ? ArrowRightIcon : ArrowLeftIcon) : LockIcon;
  const content = (
    <>
      <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
      <span className="min-w-0">
        <span className="block text-sm text-muted-foreground">{label}</span>
        <span className="mt-1 block font-semibold leading-6 text-foreground">
          {lesson?.title ?? "لا يوجد درس"}
        </span>
        {lesson && !lesson.href ? (
          <span className="mt-1 block text-xs text-muted-foreground">
            {lesson.statusLabel}
          </span>
        ) : null}
      </span>
    </>
  );

  const className = cn(
    "flex min-h-24 gap-3 rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 transition",
    lesson?.href ? "hover:bg-muted/60" : "opacity-70"
  );

  if (lesson?.href) {
    return (
      <Link href={lesson.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cn(buttonVariants({ variant: "ghost" }), className, "h-auto justify-start whitespace-normal")} aria-disabled="true">
      {content}
    </div>
  );
}
