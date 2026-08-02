import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  ClipboardListIcon,
  LockIcon,
  PlayCircleIcon,
  TimerIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { examStatusTone } from "@/features/student-exams/lib/exam-status";
import type { StudentExamDetails } from "@/features/student-exams/types/exams";

type ExamDetailsPageProps = {
  exam: StudentExamDetails;
};

export function ExamDetailsPage({ exam }: ExamDetailsPageProps) {
  const attemptsRemaining = exam.attemptsAllowed - exam.attemptsUsed;

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
        <Button
          render={<Link href="/exams" />}
          nativeButton={false}
          variant="ghost"
          size="sm"
        >
          <ArrowRightIcon data-icon="inline-start" />
          العودة إلى الاختبارات
        </Button>
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={examStatusTone[exam.status]}>
              {exam.statusLabel}
            </StatusBadge>
            <StatusBadge status="muted">{exam.typeLabel}</StatusBadge>
            <span className="text-sm text-muted-foreground">{exam.subject}</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {exam.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {exam.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <ExamInfo icon={TimerIcon} label="المدة" value={`${exam.durationMinutes} دقيقة`} />
            <ExamInfo icon={ClipboardListIcon} label="الأسئلة" value={`${exam.totalQuestions} أسئلة`} />
            <ExamInfo icon={CalendarClockIcon} label="الموعد" value={exam.dueDate} />
            <ExamInfo
              icon={PlayCircleIcon}
              label="المحاولات المتبقية"
              value={`${Math.max(attemptsRemaining, 0)} من ${exam.attemptsAllowed}`}
            />
          </div>
          {exam.canStart ? (
            <Button
              render={<Link href={`/exams/${exam.id}/take`} />}
              nativeButton={false}
              size="lg"
              className="w-full sm:w-fit"
            >
              <PlayCircleIcon data-icon="inline-start" />
              ابدأ الاختبار
            </Button>
          ) : (
            <div className="flex items-start gap-3 rounded-lg border bg-muted/45 p-4 text-sm leading-6 text-muted-foreground">
              <LockIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
              <p>{exam.unavailableReason ?? "هذا الاختبار غير متاح للبدء حاليا."}</p>
            </div>
          )}
        </div>
      </section>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
          <h2 className="text-xl font-semibold text-foreground">تعليمات الاختبار</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-7 text-muted-foreground">
            {exam.instructions.map((instruction) => (
              <li key={instruction} className="flex gap-2">
                <ClipboardListIcon
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-primary"
                />
                <span>{instruction}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
          <h2 className="text-xl font-semibold text-foreground">تنبيهات مهمة</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-7 text-muted-foreground">
            {exam.warnings.map((warning) => (
              <li key={warning} className="flex gap-2">
                <LockIcon
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-primary"
                />
                <span>{warning}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-lg bg-secondary/65 p-3 text-sm leading-7 text-muted-foreground">
            درجة النجاح: {exam.passingScore} من {exam.totalScore}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExamInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TimerIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon aria-hidden="true" className="size-4 text-primary" />
        {label}
      </div>
      <p className="mt-2 text-base font-semibold leading-6 text-foreground">
        {value}
      </p>
    </div>
  );
}
