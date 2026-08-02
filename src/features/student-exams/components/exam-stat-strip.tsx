import { CalendarClockIcon, CheckCircle2Icon, PlayCircleIcon } from "lucide-react";

import type { StudentExamSummary } from "@/features/student-exams/types/exams";

type ExamStatStripProps = {
  exams: StudentExamSummary[];
};

export function ExamStatStrip({ exams }: ExamStatStripProps) {
  const stats = [
    {
      label: "متاحة",
      value: exams.filter((exam) => exam.status === "available").length,
      icon: PlayCircleIcon,
    },
    {
      label: "قادمة",
      value: exams.filter((exam) => exam.status === "upcoming").length,
      icon: CalendarClockIcon,
    },
    {
      label: "مكتملة",
      value: exams.filter((exam) => exam.status === "completed").length,
      icon: CheckCircle2Icon,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.label} className="rounded-lg border bg-card p-4 text-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon aria-hidden="true" className="size-4 text-primary" />
              {stat.label}
            </div>
            <p className="mt-2 text-2xl font-semibold leading-none text-foreground">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
