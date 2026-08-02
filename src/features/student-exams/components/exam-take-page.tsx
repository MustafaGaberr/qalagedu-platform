import Link from "next/link";
import { ArrowRightIcon, LockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { StudentExamAttemptData } from "@/features/student-exams/types/exams";

import { ExamTakeExperience } from "./exam-take-experience";

type ExamTakePageProps = {
  exam: StudentExamAttemptData | null;
  examId: string;
};

export function ExamTakePage({ exam, examId }: ExamTakePageProps) {
  if (!exam) {
    return (
      <section className="rounded-lg border bg-card p-5 text-start shadow-sm shadow-foreground/5">
        <Button
          render={<Link href={`/exams/${examId}`} />}
          nativeButton={false}
          variant="ghost"
          size="sm"
        >
          <ArrowRightIcon data-icon="inline-start" />
          العودة إلى التعليمات
        </Button>
        <div className="mt-6 flex items-start gap-3 rounded-lg border bg-muted/45 p-4">
          <LockIcon aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              لا يمكن بدء هذا الاختبار
            </h1>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              الاختبار غير متاح لمحاولة جديدة حاليا. راجع صفحة التعليمات لمعرفة الحالة والسبب.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <ExamTakeExperience exam={exam} />;
}
