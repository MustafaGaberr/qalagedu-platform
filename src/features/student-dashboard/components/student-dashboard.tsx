import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import type { StudentDashboardData } from "@/features/student-dashboard/types/dashboard";

import { AttendanceSummaryCard } from "./attendance-summary-card";
import { ContinueLessonCard } from "./continue-lesson-card";
import { DashboardStats } from "./dashboard-stats";
import { DashboardWelcomeHeader } from "./dashboard-welcome-header";
import { LatestResultCard } from "./latest-result-card";
import { NotificationsList } from "./notifications-list";
import { QuickActions } from "./quick-actions";
import { ScheduleList } from "./schedule-list";
import { StudentCoursesPreview } from "./student-courses-preview";

type StudentDashboardProps = {
  data: StudentDashboardData;
};

export function StudentDashboard({ data }: StudentDashboardProps) {
  const hasCourses = data.activeCourses.length > 0;

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <DashboardWelcomeHeader
        student={data.student}
        summary={data.statusSummary}
        nextLesson={data.nextLesson}
      />

      {!hasCourses ? (
        <EmptyState
          title="حسابك جاهز وينتظر أول كورس"
          description="بعد تفعيل الاشتراك سيظهر هنا الدرس التالي، جدول الحصص، ونسب التقدم الخاصة بك."
          action={<Button disabled>إدخال كود تفعيل لاحقا</Button>}
        />
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div className="flex min-w-0 flex-col gap-5 lg:gap-6">
          {data.nextLesson ? (
            <ContinueLessonCard lesson={data.nextLesson} />
          ) : null}
          <DashboardStats stats={data.stats} />
          <StudentCoursesPreview courses={data.activeCourses} />
        </div>

        <aside className="flex min-w-0 flex-col gap-5">
          <ScheduleList schedule={data.schedule} />
          {data.latestResult ? (
            <LatestResultCard result={data.latestResult} />
          ) : null}
          <AttendanceSummaryCard attendance={data.attendance} />
        </aside>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.7fr)]">
        <NotificationsList notifications={data.notifications} />
        <QuickActions actions={data.quickActions} />
      </div>
    </div>
  );
}
