import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type { StudentExamSummary } from "@/features/student-exams/types/exams";

import { ExamsFilterableList } from "./exams-filterable-list";
import { ExamStatStrip } from "./exam-stat-strip";

type ExamsPageProps = {
  exams: StudentExamSummary[];
};

export function ExamsPage({ exams }: ExamsPageProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <PageHeader
        title="الاختبارات"
        description="كل الاختبارات والتقييمات المرتبطة بالكورسات والدروس في مكان واحد."
        className="py-2"
      />
      <ExamStatStrip exams={exams} />
      {exams.length > 0 ? (
        <ExamsFilterableList exams={exams} />
      ) : (
        <EmptyState
          title="لا توجد اختبارات منشورة"
          description="ستظهر هنا الاختبارات عند نشرها من المعلمين في البيانات التجريبية."
        />
      )}
    </div>
  );
}
