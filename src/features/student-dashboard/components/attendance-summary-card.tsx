import Link from "next/link";
import { CalendarCheckIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress,
  ProgressLabel,
} from "@/components/ui/progress";
import type { AttendanceSummary } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type AttendanceSummaryCardProps = {
  attendance: AttendanceSummary;
};

export function AttendanceSummaryCard({
  attendance,
}: AttendanceSummaryCardProps) {
  return (
    <Card id="attendance">
      <CardHeader>
        <CardTitle>ملخص الحضور</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-start">
            <p className="text-sm text-muted-foreground">نسبة الالتزام</p>
            <p className="mt-1 text-3xl font-semibold leading-none text-foreground">
              {attendance.percentage}%
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
            <CalendarCheckIcon aria-hidden="true" />
          </div>
        </div>
        <Progress value={attendance.percentage}>
          <ProgressLabel>الحضور</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground tabular-nums">
            {attendance.percentage}%
          </span>
        </Progress>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border bg-background p-3 text-start">
            <p className="text-xs text-muted-foreground">حضور</p>
            <p className="mt-1 text-xl font-semibold">
              {attendance.presentCount}
            </p>
          </div>
          <div className="rounded-lg border bg-background p-3 text-start">
            <p className="text-xs text-muted-foreground">غياب</p>
            <p className="mt-1 text-xl font-semibold">
              {attendance.absenceCount}
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-secondary/65 p-3 text-sm leading-6 text-muted-foreground">
          آخر تسجيل: {attendance.latestRecord.statusLabel} في{" "}
          {attendance.latestRecord.course} - {attendance.latestRecord.dateLabel}
        </div>
        <Link
          href="#attendance"
          aria-disabled="true"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "pointer-events-none opacity-60"
          )}
        >
          سجل الحضور الكامل لاحقا
        </Link>
      </CardContent>
    </Card>
  );
}
