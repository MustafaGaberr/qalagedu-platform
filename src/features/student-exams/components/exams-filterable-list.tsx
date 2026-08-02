"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import type {
  StudentExamStatus,
  StudentExamSummary,
} from "@/features/student-exams/types/exams";

import { ExamCard } from "./exam-card";

type ExamsFilterableListProps = {
  exams: StudentExamSummary[];
};

const statusOptions: Array<{ value: StudentExamStatus | "all"; label: string }> = [
  { value: "all", label: "كل الحالات" },
  { value: "available", label: "متاحة" },
  { value: "upcoming", label: "قادمة" },
  { value: "completed", label: "مكتملة" },
];

export function ExamsFilterableList({ exams }: ExamsFilterableListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StudentExamStatus | "all">("all");
  const [subject, setSubject] = useState("all");
  const subjects = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.subject))),
    [exams]
  );
  const filteredExams = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return exams.filter((exam) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${exam.title} ${exam.subject} ${exam.teacher}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus = status === "all" || exam.status === status;
      const matchesSubject = subject === "all" || exam.subject === subject;

      return matchesQuery && matchesStatus && matchesSubject;
    });
  }, [exams, query, status, subject]);

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem_12rem]">
          <label className="relative block text-start">
            <span className="mb-2 block text-sm font-medium text-foreground">
              بحث
            </span>
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3.5 start-3 size-4 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث بالاختبار أو الكورس أو المعلم"
              className="ps-9"
            />
          </label>
          <label className="block text-start">
            <span className="mb-2 block text-sm font-medium text-foreground">
              الحالة
            </span>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as StudentExamStatus | "all")
              }
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-start">
            <span className="mb-2 block text-sm font-medium text-foreground">
              المادة
            </span>
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="all">كل المواد</option>
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      {filteredExams.length > 0 ? (
        <div className="grid gap-3">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد اختبارات مطابقة"
          description="غيّر كلمات البحث أو الفلاتر لعرض اختبارات أخرى."
        />
      )}
    </section>
  );
}
