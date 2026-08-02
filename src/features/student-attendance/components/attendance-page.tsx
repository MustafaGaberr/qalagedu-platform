import Link from "next/link";
import {
  ActivityIcon,
  CalendarCheckIcon,
  Clock3Icon,
  FileWarningIcon,
  TrendingUpIcon,
  UserXIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import {
  attendanceStatusView,
  formatArabicDate,
  formatArabicDay,
} from "@/features/student-attendance/lib/attendance-labels";
import type { StudentAttendanceData } from "@/features/student-attendance/types/attendance";
import { cn } from "@/lib/utils";

import { AttendanceHistory } from "./attendance-history";

type AttendancePageProps = {
  data: StudentAttendanceData;
};

function sessionsToReachTarget(totalSessions: number, creditedSessions: number) {
  const target = 0.95;
  const missing = target * totalSessions - creditedSessions;

  if (missing <= 0) {
    return 0;
  }

  return Math.ceil(missing / (1 - target));
}

export function AttendancePage({ data }: AttendancePageProps) {
  const { summary, subjectSummaries, records } = data;
  const latest = summary.latestRecord;
  const creditedSessions =
    summary.presentCount + summary.lateCount + summary.excusedCount;
  const sessionsFor95 = sessionsToReachTarget(
    summary.totalSessions,
    creditedSessions
  );
  const monthDelta =
    summary.currentMonthPercentage - summary.previousMonthPercentage;

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <section className="rounded-lg border bg-card px-4 py-4 shadow-sm shadow-foreground/5 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl text-start">
            <h1 className="text-3xl font-semibold leading-tight">الحضور</h1>
            <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
              متابعة هادئة لسجل حضورك داخل السنتر حسب المادة والحصة، باستخدام
              بيانات تجريبية فقط في هذه المرحلة.
            </p>
          </div>
          <StatusBadge status="success" className="w-fit gap-1.5">
            <ActivityIcon aria-hidden="true" className="size-3.5" />
            حالة الحضور الحالية جيدة
          </StatusBadge>
        </div>
      </section>

      <section
        aria-label="ملخص الحضور"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
      >
        <StatCard
          title="نسبة الحضور"
          value={`${summary.attendancePercentage}%`}
          description={`${summary.totalSessions} حصة مسجلة`}
          icon={TrendingUpIcon}
          status="success"
          statusLabel="محسوبة من السجل"
        />
        <StatCard
          title="مرات الحضور"
          value={String(summary.presentCount)}
          description="حضور في الموعد"
          icon={CalendarCheckIcon}
        />
        <StatCard
          title="مرات الغياب"
          value={String(summary.absentCount)}
          description="غياب غير معتمد"
          icon={UserXIcon}
          status={summary.absentCount > 0 ? "warning" : "success"}
          statusLabel={summary.absentCount > 0 ? "تحتاج متابعة" : "ممتاز"}
        />
        <StatCard
          title="مرات التأخير"
          value={String(summary.lateCount)}
          description="حضور بعد الموعد"
          icon={Clock3Icon}
        />
        {summary.excusedCount > 0 ? (
          <StatCard
            title="الغياب بعذر"
            value={String(summary.excusedCount)}
            description="معتمد في السجل"
            icon={FileWarningIcon}
            status="muted"
            statusLabel="غير محسوب كغياب"
          />
        ) : null}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.65fr)]">
        <Card>
          <CardHeader>
            <CardTitle>نظرة عامة على الالتزام</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)] md:items-center">
              <div className="mx-auto flex size-36 flex-col items-center justify-center rounded-full border-8 border-primary/20 bg-secondary/55 text-center">
                <span className="text-4xl font-semibold text-primary">
                  {summary.attendancePercentage}%
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  إجمالي الحضور
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <Progress value={summary.currentMonthPercentage}>
                  <ProgressLabel>هذا الشهر</ProgressLabel>
                  <span className="ms-auto text-sm text-muted-foreground tabular-nums">
                    {summary.currentMonthPercentage}%
                  </span>
                </Progress>
                <Progress value={summary.previousMonthPercentage}>
                  <ProgressLabel>الشهر السابق</ProgressLabel>
                  <span className="ms-auto text-sm text-muted-foreground tabular-nums">
                    {summary.previousMonthPercentage}%
                  </span>
                </Progress>
                <div className="rounded-lg bg-secondary/65 p-3 text-sm leading-6 text-muted-foreground">
                  {monthDelta >= 0
                    ? `تحسن هذا الشهر بمقدار ${monthDelta} نقطة عن الشهر السابق.`
                    : `انخفض هذا الشهر بمقدار ${Math.abs(
                        monthDelta
                      )} نقطة عن الشهر السابق.`}
                  {sessionsFor95 > 0
                    ? ` تحتاجين إلى حضور ${sessionsFor95} حصة متتالية للوصول إلى 95%.`
                    : " أنت حاليا أعلى من هدف 95%، حافظي على نفس الإيقاع."}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {latest ? (
          <Card>
            <CardHeader>
              <CardTitle>آخر تسجيل حضور</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 text-start">
                  <p className="text-sm text-muted-foreground">
                    {formatArabicDay(latest.sessionDate)}،{" "}
                    {formatArabicDate(latest.sessionDate)}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{latest.subject}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {latest.sessionTitle}
                  </p>
                </div>
                <StatusBadge
                  status={attendanceStatusView[latest.status].badgeStatus}
                  className="gap-1.5"
                >
                  {attendanceStatusView[latest.status].label}
                </StatusBadge>
              </div>
              <dl className="grid gap-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">الموعد</dt>
                  <dd>{latest.startTime}</dd>
                </div>
                {latest.checkInTime ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">وقت الدخول</dt>
                    <dd>{latest.checkInTime}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">المكان</dt>
                  <dd className="text-end">{latest.location}</dd>
                </div>
              </dl>
              <div className="rounded-lg bg-secondary/65 p-3 text-sm leading-6 text-muted-foreground">
                {attendanceStatusView[latest.status].message} سيتم ربط إشعارات
                ولي الأمر لاحقا عند تفعيل التكاملات.
              </div>
              <Link
                href="/student-card"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                عرض بطاقة الطالب
              </Link>
            </CardContent>
          </Card>
        ) : (
          <EmptyState
            title="لا يوجد آخر تسجيل"
            description="سيظهر آخر حدث حضور بعد تسجيل أول حصة."
          />
        )}
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="subject-summary">
        <div className="text-start">
          <h2 id="subject-summary" className="text-xl font-semibold">
            الحضور حسب المادة
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            ملخص سريع لكل مادة نشطة بدون تفاصيل إدارية زائدة.
          </p>
        </div>
        {subjectSummaries.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-3">
            {subjectSummaries.map((subject) => (
              <Card key={subject.courseId} size="sm">
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 text-start">
                      <h3 className="text-base font-semibold">
                        {subject.subject}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {subject.teacherName}
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {subject.groupName}
                      </p>
                    </div>
                    <span className="text-2xl font-semibold text-primary">
                      {subject.percentage}%
                    </span>
                  </div>
                  <Progress value={subject.percentage}>
                    <ProgressLabel>
                      {subject.attendedSessions} من {subject.totalSessions}
                    </ProgressLabel>
                    <span className="ms-auto text-sm text-muted-foreground">
                      حضور
                    </span>
                  </Progress>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg border bg-background p-2">
                      <span className="block text-xs text-muted-foreground">
                        الغياب
                      </span>
                      <span className="font-semibold">{subject.absenceCount}</span>
                    </div>
                    <div className="rounded-lg border bg-background p-2">
                      <span className="block text-xs text-muted-foreground">
                        التأخير
                      </span>
                      <span className="font-semibold">{subject.lateCount}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {subject.statusMessage}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="لا توجد مواد نشطة"
            description="عند تفعيل الاشتراكات ستظهر ملخصات حضور المواد هنا."
          />
        )}
      </section>

      <AttendanceHistory records={records} />
    </div>
  );
}
