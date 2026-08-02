import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  CircleXIcon,
  Clock3Icon,
  FileTextIcon,
  RotateCcwIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import type { StudentExamResult } from "@/features/student-exams/types/exams";
import { cn } from "@/lib/utils";

type ResultDetailsPageProps = {
  result: StudentExamResult;
};

export function ResultDetailsPage({ result }: ResultDetailsPageProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
        <Button
          render={<Link href="/results" />}
          nativeButton={false}
          variant="ghost"
          size="sm"
        >
          <ArrowRightIcon data-icon="inline-start" />
          العودة إلى النتائج
        </Button>
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={result.passed ? "success" : "warning"}>
                {result.statusLabel}
              </StatusBadge>
              <span className="text-sm text-muted-foreground">
                {result.subject}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {result.examTitle}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {result.courseTitle} - {result.teacher} - {result.submittedAt}
            </p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <div className="flex items-end justify-between gap-3">
              <p className="text-4xl font-semibold leading-none text-foreground">
                {result.score}
                <span className="text-base text-muted-foreground">
                  /{result.totalScore}
                </span>
              </p>
              <p className="text-3xl font-semibold leading-none text-primary">
                {result.percentage}%
              </p>
            </div>
            <Progress value={result.percentage} className="mt-4">
              <ProgressLabel>نسبة الدرجة</ProgressLabel>
            </Progress>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ResultMetric icon={CheckCircle2Icon} label="إجابات صحيحة" value={result.correctCount} />
        <ResultMetric icon={CircleXIcon} label="إجابات خاطئة" value={result.incorrectCount} />
        <ResultMetric icon={RotateCcwIcon} label="غير مجاب" value={result.unansweredCount} />
        <ResultMetric icon={Clock3Icon} label="الوقت المستخدم" value={`${result.durationUsed} دقيقة`} />
      </section>

      <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              مراجعة الأسئلة
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              تظهر الإجابة المختارة والصحيحة مع شرح مختصر عند توفره.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              render={<Link href="/exams" />}
              nativeButton={false}
              variant="outline"
            >
              <FileTextIcon data-icon="inline-start" />
              العودة للاختبارات
            </Button>
            <Button
              render={<Link href={`/courses/${result.courseId}`} />}
              nativeButton={false}
              variant="outline"
            >
              <BookOpenIcon data-icon="inline-start" />
              الكورس
            </Button>
            {result.lessonId ? (
              <Button
                render={
                  <Link href={`/courses/${result.courseId}/lessons/${result.lessonId}`} />
                }
                nativeButton={false}
              >
                مراجعة الدرس
              </Button>
            ) : null}
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {result.review.map((question) => (
            <article
              key={question.questionId}
              className={cn(
                "rounded-lg border bg-background p-4",
                question.isCorrect
                  ? "border-primary/25"
                  : "border-accent-foreground/15"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-7 text-foreground">
                  {question.order}. {question.text}
                </h3>
                <StatusBadge status={question.isCorrect ? "success" : "warning"}>
                  {question.isCorrect ? (
                    <CheckCircle2Icon aria-hidden="true" data-icon="inline-start" />
                  ) : (
                    <CircleXIcon aria-hidden="true" data-icon="inline-start" />
                  )}
                  {question.isCorrect ? "صحيح" : "غير صحيح"}
                </StatusBadge>
              </div>
              <div className="mt-3 grid gap-3 text-sm leading-6 md:grid-cols-2">
                <div className="rounded-lg bg-muted/45 p-3">
                  <p className="font-medium text-foreground">إجابتك</p>
                  <p className="mt-1 text-muted-foreground">
                    {question.studentAnswerLabel}
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/65 p-3">
                  <p className="font-medium text-foreground">الإجابة الصحيحة</p>
                  <p className="mt-1 text-muted-foreground">
                    {question.correctAnswerLabel}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                الدرجة: {question.awardedScore}/{question.score}
              </p>
              {question.explanation ? (
                <p className="mt-3 rounded-lg border bg-card p-3 text-sm leading-6 text-muted-foreground">
                  {question.explanation}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResultMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CheckCircle2Icon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-start">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon aria-hidden="true" className="size-4 text-primary" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold leading-none text-foreground">
        {value}
      </p>
    </div>
  );
}
