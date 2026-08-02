"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock3Icon,
  Loader2Icon,
  SendIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { submitStudentExamAction } from "@/features/student-exams/actions/student-exam-actions";
import type {
  StudentExamAttemptData,
  StudentExamAttemptQuestion,
} from "@/features/student-exams/types/exams";
import { cn } from "@/lib/utils";

type ExamTakeExperienceProps = {
  exam: StudentExamAttemptData;
};

type AnswerState = Record<
  string,
  {
    selectedOptionId?: string;
    booleanAnswer?: boolean;
  }
>;

export function ExamTakeExperience({ exam }: ExamTakeExperienceProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [remainingSeconds, setRemainingSeconds] = useState(
    exam.durationMinutes * 60
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [isPending, startTransition] = useTransition();
  const currentQuestion = exam.questions[currentIndex];
  const answeredCount = exam.questions.filter((question) =>
    isQuestionAnswered(answers[question.id])
  ).length;
  const unansweredCount = exam.questions.length - answeredCount;
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingRemainder = remainingSeconds % 60;
  const littleTimeRemaining = remainingSeconds <= 60;
  const progress = Math.round((answeredCount / exam.questions.length) * 100);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const id = window.setTimeout(() => {
      const nextValue = Math.max(remainingSeconds - 1, 0);
      setRemainingSeconds(nextValue);

      if (nextValue === 0) {
        setTimeExpired(true);
        setConfirmOpen(true);
      }
    }, 1000);

    return () => window.clearTimeout(id);
  }, [remainingSeconds]);

  const submissionAnswers = useMemo(
    () =>
      Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        selectedOptionId: value.selectedOptionId,
        booleanAnswer: value.booleanAnswer,
      })),
    [answers]
  );

  function selectOption(questionId: string, optionId: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: {
        selectedOptionId: optionId,
      },
    }));
  }

  function selectBoolean(questionId: string, value: boolean) {
    setAnswers((current) => ({
      ...current,
      [questionId]: {
        booleanAnswer: value,
      },
    }));
  }

  function submitAttempt() {
    const durationUsed = Math.max(
      1,
      Math.ceil((exam.durationMinutes * 60 - remainingSeconds) / 60)
    );

    startTransition(async () => {
      const result = await submitStudentExamAction(
        exam.id,
        submissionAnswers,
        timeExpired ? exam.durationMinutes : durationUsed
      );
      router.push(`/results/${result.attemptId}`);
    });
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{exam.subject}</p>
            <h1 className="mt-1 text-2xl font-semibold leading-8 text-foreground sm:text-3xl">
              {exam.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {exam.totalQuestions} أسئلة - {exam.totalScore} درجة - {exam.teacher}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold tabular-nums",
                littleTimeRemaining
                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                  : "bg-background text-foreground"
              )}
              aria-live="polite"
            >
              <Clock3Icon aria-hidden="true" className="size-4" />
              {String(remainingMinutes).padStart(2, "0")}:
              {String(remainingRemainder).padStart(2, "0")}
            </div>
            <Button onClick={() => setConfirmOpen(true)}>
              <SendIcon data-icon="inline-start" />
              تسليم الاختبار
            </Button>
          </div>
        </div>
        <Progress value={progress} className="mt-4">
          <ProgressLabel>الإجابات المكتملة</ProgressLabel>
          <span className="ms-auto text-sm text-muted-foreground">
            {answeredCount}/{exam.totalQuestions}
          </span>
        </Progress>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
        <QuestionPanel
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          questionCount={exam.questions.length}
          onSelectOption={selectOption}
          onSelectBoolean={selectBoolean}
        />
        <QuestionNavigator
          questions={exam.questions}
          answers={answers}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
        >
          <ChevronRightIcon data-icon="inline-start" />
          السابق
        </Button>
        <Button
          variant="outline"
          disabled={currentIndex === exam.questions.length - 1}
          onClick={() =>
            setCurrentIndex((index) =>
              Math.min(index + 1, exam.questions.length - 1)
            )
          }
        >
          التالي
          <ChevronLeftIcon data-icon="inline-end" />
        </Button>
      </div>

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="submit-exam-title"
            aria-describedby="submit-exam-description"
            className="w-full max-w-md rounded-lg border bg-popover p-5 text-start text-popover-foreground shadow-lg"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <AlertTriangleIcon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 id="submit-exam-title" className="text-lg font-semibold">
                  تأكيد تسليم الاختبار
                </h2>
                <p
                  id="submit-exam-description"
                  className="mt-2 text-sm leading-6 text-muted-foreground"
                >
                  {timeExpired
                    ? "انتهى الوقت. يمكنك تأكيد التسليم لإنشاء النتيجة التجريبية."
                    : "سيتم حساب النتيجة التجريبية فور التأكيد، ولن يتم حفظ هذه المحاولة بشكل دائم."}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 rounded-lg bg-secondary/65 p-3 text-sm text-muted-foreground sm:grid-cols-2">
              <span>تمت الإجابة: {answeredCount}</span>
              <span>غير مجاب: {unansweredCount}</span>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                disabled={isPending || timeExpired}
                onClick={() => setConfirmOpen(false)}
              >
                العودة للاختبار
              </Button>
              <Button disabled={isPending} onClick={submitAttempt}>
                {isPending ? (
                  <Loader2Icon data-icon="inline-start" className="animate-spin" />
                ) : (
                  <CheckCircle2Icon data-icon="inline-start" />
                )}
                تأكيد التسليم
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function QuestionPanel({
  question,
  answer,
  questionCount,
  onSelectOption,
  onSelectBoolean,
}: {
  question: StudentExamAttemptQuestion;
  answer: AnswerState[string] | undefined;
  questionCount: number;
  onSelectOption: (questionId: string, optionId: string) => void;
  onSelectBoolean: (questionId: string, value: boolean) => void;
}) {
  return (
    <section
      aria-live="polite"
      className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          السؤال {question.order} من {questionCount}
        </span>
        <span className="text-sm text-muted-foreground">{question.score} درجة</span>
      </div>
      <h2 className="mt-5 text-xl font-semibold leading-8 text-foreground">
        {question.text}
      </h2>
      {question.description ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {question.description}
        </p>
      ) : null}
      <div className="mt-5 grid gap-3">
        {question.type === "true-false" ? (
          <>
            <AnswerButton
              selected={answer?.booleanAnswer === true}
              onClick={() => onSelectBoolean(question.id, true)}
            >
              صح
            </AnswerButton>
            <AnswerButton
              selected={answer?.booleanAnswer === false}
              onClick={() => onSelectBoolean(question.id, false)}
            >
              خطأ
            </AnswerButton>
          </>
        ) : (
          question.options.map((option) => (
            <AnswerButton
              key={option.id}
              selected={answer?.selectedOptionId === option.id}
              onClick={() => onSelectOption(question.id, option.id)}
            >
              {option.text}
            </AnswerButton>
          ))
        )}
      </div>
      {!isQuestionAnswered(answer) ? (
        <p className="mt-4 text-sm text-muted-foreground">
          لم يتم اختيار إجابة لهذا السؤال بعد.
        </p>
      ) : null}
    </section>
  );
}

function AnswerButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-14 w-full items-center gap-3 rounded-lg border bg-background px-4 py-3 text-start text-sm leading-6 text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        selected && "border-primary/40 bg-primary/10 text-primary"
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-primary bg-primary text-primary-foreground" : "bg-card"
        )}
      >
        {selected ? <CheckCircle2Icon aria-hidden="true" className="size-3.5" /> : null}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
      {selected ? <span className="text-xs font-medium">مختار</span> : null}
    </button>
  );
}

function QuestionNavigator({
  questions,
  answers,
  currentIndex,
  setCurrentIndex,
}: {
  questions: StudentExamAttemptQuestion[];
  answers: AnswerState;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  return (
    <aside className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 xl:sticky xl:top-24">
      <h2 className="text-base font-semibold text-foreground">خريطة الأسئلة</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        انتقل لأي سؤال وتابع حالة الإجابة.
      </p>
      <div className="mt-4 grid grid-cols-5 gap-2 xl:grid-cols-4">
        {questions.map((question, index) => {
          const answered = isQuestionAnswered(answers[question.id]);
          const current = index === currentIndex;

          return (
            <button
              key={question.id}
              type="button"
              aria-current={current ? "step" : undefined}
              aria-label={`السؤال ${question.order} ${answered ? "تمت الإجابة" : "غير مجاب"}`}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "flex aspect-square min-h-11 items-center justify-center rounded-lg border text-sm font-semibold outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                current
                  ? "border-primary bg-primary text-primary-foreground"
                  : answered
                    ? "border-primary/25 bg-primary/10 text-primary"
                    : "bg-background text-muted-foreground"
              )}
            >
              {question.order}
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-primary" />
          السؤال الحالي
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-primary/20 ring-1 ring-primary/25" />
          تمت الإجابة
        </span>
      </div>
    </aside>
  );
}

function isQuestionAnswered(answer: AnswerState[string] | undefined) {
  return (
    typeof answer?.selectedOptionId !== "undefined" ||
    typeof answer?.booleanAnswer !== "undefined"
  );
}
