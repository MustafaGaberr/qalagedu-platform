import { AwardIcon, CheckCircle2Icon, ClipboardListIcon, TrendingUpIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type {
  StudentResultsOverview,
  StudentResultSummary,
} from "@/features/student-exams/types/exams";

import { ResultsFilterableList } from "./results-filterable-list";

type ResultsPageProps = {
  results: StudentResultSummary[];
  overview: StudentResultsOverview;
};

export function ResultsPage({ results, overview }: ResultsPageProps) {
  const stats = [
    {
      label: "المتوسط",
      value: `${overview.averagePercentage}%`,
      icon: TrendingUpIcon,
    },
    {
      label: "محاولات ناجحة",
      value: overview.passedCount,
      icon: CheckCircle2Icon,
    },
    {
      label: "إجمالي المحاولات",
      value: overview.totalAttempts,
      icon: ClipboardListIcon,
    },
    {
      label: "أقوى مادة",
      value: overview.strongestSubject,
      icon: AwardIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <PageHeader
        title="النتائج"
        description="سجل محاولات الاختبارات التجريبية وملخص الأداء حسب المادة."
        className="py-2"
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
      {results.length > 0 ? (
        <ResultsFilterableList results={results} />
      ) : (
        <EmptyState
          title="لا توجد نتائج بعد"
          description="ستظهر النتائج هنا بعد تسليم الاختبارات التجريبية أو نشر محاولات سابقة."
        />
      )}
    </div>
  );
}
