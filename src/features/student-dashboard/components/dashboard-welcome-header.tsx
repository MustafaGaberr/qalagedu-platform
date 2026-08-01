import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type {
  NextLesson,
  Student,
} from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type DashboardWelcomeHeaderProps = {
  student: Student;
  summary: string;
  nextLesson: NextLesson | null;
};

export function DashboardWelcomeHeader({
  student,
  summary,
  nextLesson,
}: DashboardWelcomeHeaderProps) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border bg-card px-4 py-4 shadow-sm shadow-foreground/5 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-3xl text-start">
        <p className="text-sm font-medium text-primary">
          صباح الخير يا {student.firstName}
        </p>
        <h2 className="mt-1 text-2xl font-semibold leading-9 text-foreground sm:text-3xl">
          جاهزة تكملي خطة {student.grade}؟
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
          {summary}
        </p>
      </div>
      {nextLesson ? (
        <Link
          href="#continue-learning"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full shadow-lg shadow-primary/15 sm:w-auto"
          )}
        >
          متابعة آخر درس
          <ArrowUpLeftIcon data-icon="inline-end" />
        </Link>
      ) : null}
    </section>
  );
}
