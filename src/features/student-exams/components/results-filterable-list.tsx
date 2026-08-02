"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import type { StudentResultSummary } from "@/features/student-exams/types/exams";

import { ResultSummaryCard } from "./result-summary-card";

type ResultsFilterableListProps = {
  results: StudentResultSummary[];
};

export function ResultsFilterableList({ results }: ResultsFilterableListProps) {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");
  const [status, setStatus] = useState<"all" | "passed" | "needs-review">("all");
  const subjects = useMemo(
    () => Array.from(new Set(results.map((result) => result.subject))),
    [results]
  );
  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return results.filter((result) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${result.examTitle} ${result.courseTitle} ${result.subject}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesSubject = subject === "all" || result.subject === subject;
      const matchesStatus =
        status === "all" ||
        (status === "passed" ? result.passed : !result.passed);

      return matchesQuery && matchesSubject && matchesStatus;
    });
  }, [query, results, status, subject]);

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
              placeholder="ابحث بالاختبار أو الكورس"
              className="ps-9"
            />
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
          <label className="block text-start">
            <span className="mb-2 block text-sm font-medium text-foreground">
              الحالة
            </span>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as "all" | "passed" | "needs-review")
              }
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="all">كل النتائج</option>
              <option value="passed">ناجح</option>
              <option value="needs-review">يحتاج مراجعة</option>
            </select>
          </label>
        </div>
      </div>
      {filteredResults.length > 0 ? (
        <div className="grid gap-3">
          {filteredResults.map((result) => (
            <ResultSummaryCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد نتائج مطابقة"
          description="جرّب تغيير البحث أو الفلاتر لعرض محاولات أخرى."
        />
      )}
    </section>
  );
}
