import Link from "next/link";
import { BellIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import type { StudentDashboardData } from "@/features/student-dashboard/types/dashboard";

import { ContinueLessonCard } from "./continue-lesson-card";
import { DashboardWelcomeHeader } from "./dashboard-welcome-header";
import { QuickActions } from "./quick-actions";
import { StudentCoursesPreview } from "./student-courses-preview";

type StudentDashboardProps = { data: StudentDashboardData };

export function StudentDashboard({ data }: StudentDashboardProps) {
  const importantUpdate = data.notifications[0];
  return <div className="flex flex-col gap-6 lg:gap-7">
    <DashboardWelcomeHeader student={data.student} summary={data.statusSummary} nextLesson={data.nextLesson} />
    {data.nextLesson ? <ContinueLessonCard lesson={data.nextLesson} /> : <EmptyState title="لا توجد مهمة حالية" description="عند توفر درس أو اختبار جديد ستظهر أقرب خطوة لك هنا." />}
    <StudentCoursesPreview courses={data.activeCourses} />
    {importantUpdate ? <section className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5" aria-labelledby="important-update-title"><div className="flex items-start gap-3 text-start"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><BellIcon aria-hidden="true" className="size-4" /></span><div className="min-w-0"><p className="text-xs font-medium text-primary">تحديث مهم</p><h2 id="important-update-title" className="mt-1 text-base font-semibold">{importantUpdate.title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{importantUpdate.description}</p><Link href="/notifications" className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">عرض الإشعارات</Link></div></div></section> : null}
    <section className="flex flex-col gap-4"><SectionHeader title="وصول سريع" description="اختصارات قليلة للأمور التي قد تحتاجينها الآن." /><QuickActions actions={data.quickActions.slice(0, 3)} /></section>
  </div>;
}
