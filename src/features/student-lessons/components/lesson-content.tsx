import { CheckIcon, ListChecksIcon, SparklesIcon } from "lucide-react";

import type { StudentLessonDetails } from "@/features/student-lessons/types/lessons";

type LessonContentProps = {
  lesson: StudentLessonDetails;
};

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">تفاصيل الدرس</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {lesson.description}
        </p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-background p-4">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <ListChecksIcon aria-hidden="true" className="size-4 text-primary" />
            بعد الدرس ستكون قادرا على
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
            {lesson.learningGoals.map((goal) => (
              <li key={goal} className="flex gap-2">
                <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <SparklesIcon aria-hidden="true" className="size-4 text-primary" />
            قبل المشاهدة
          </h3>
          {lesson.prerequisites.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
              {lesson.prerequisites.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              لا توجد متطلبات خاصة لهذا الدرس التجريبي.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
