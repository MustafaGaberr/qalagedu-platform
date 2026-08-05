import { Building2Icon, InfoIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { attendanceStatusView, formatArabicDate } from "@/features/student-attendance/lib/attendance-labels";
import type { StudentAttendanceData } from "@/features/student-attendance/types/attendance";

type StudentCenterPageProps = { data: StudentAttendanceData };

export function StudentCenterPage({ data }: StudentCenterPageProps) {
  const latest = data.summary.latestRecord;
  return <div className="flex flex-col gap-5 lg:gap-6">
    <section className="rounded-lg border bg-card p-5 shadow-sm shadow-foreground/5"><div className="flex items-start gap-3 text-start"><span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><Building2Icon aria-hidden="true" className="size-5" /></span><div><h1 className="text-2xl font-semibold">السنتر</h1><p className="mt-1 max-w-2xl text-sm leading-7 text-muted-foreground">ملخص مجموعاتك في السنتر وحضورك الأخير. تراجع إدارة السنتر طلب الانضمام ثم تعيّن المجموعة النهائية.</p></div></div></section>
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="flex flex-col gap-3" aria-labelledby="center-enrollments"><div className="text-start"><h2 id="center-enrollments" className="text-xl font-semibold">مجموعات السنتر</h2><p className="mt-1 text-sm text-muted-foreground">التوقيت والمجموعة المعروضان للمتابعة، وليسا تأكيدًا تلقائيًا للانضمام.</p></div><div className="grid gap-3 sm:grid-cols-2">{data.subjectSummaries.map((subject) => <Card key={subject.courseId}><CardContent className="space-y-4 text-start"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="font-semibold">{subject.subject}</h3><p className="mt-1 text-sm text-muted-foreground">{subject.teacherName}</p></div><StatusBadge status="success">تم تعيين المجموعة</StatusBadge></div><dl className="grid gap-2 text-sm"><div className="flex justify-between gap-3"><dt className="text-muted-foreground">المجموعة</dt><dd>{subject.groupName}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">الحضور</dt><dd>{subject.attendedSessions} من {subject.totalSessions}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">آخر حالة</dt><dd>{subject.percentage}%</dd></div></dl></CardContent></Card>)}</div></section>
      <aside className="flex flex-col gap-5"><Card><CardHeader><CardTitle>آخر حضور</CardTitle></CardHeader><CardContent>{latest ? <div className="space-y-3 text-sm"><div className="flex items-center justify-between gap-3"><span className="font-semibold">{latest.subject}</span><StatusBadge status={attendanceStatusView[latest.status].badgeStatus}>{attendanceStatusView[latest.status].label}</StatusBadge></div><p className="text-muted-foreground">{latest.sessionTitle}</p><p>{formatArabicDate(latest.sessionDate)} · {latest.startTime}</p><p className="text-muted-foreground">{latest.location}</p></div> : <p className="text-sm text-muted-foreground">لا يوجد حضور مسجل بعد.</p>}</CardContent></Card><Card><CardHeader><CardTitle>ملاحظة مهمة</CardTitle></CardHeader><CardContent className="flex gap-3 text-sm leading-6 text-muted-foreground"><InfoIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" /><p>الانضمام إلى السنتر لا يفتح فيديوهات الكورسات تلقائيًا. تعتمد إدارة السنتر المجموعة النهائية بشكل منفصل.</p></CardContent></Card></aside>
    </div>
  </div>;
}
