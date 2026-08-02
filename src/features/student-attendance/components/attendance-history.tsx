"use client";

import { useMemo, useState } from "react";
import {
  CalendarDaysIcon,
  Clock3Icon,
  MapPinIcon,
  SearchIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  attendanceStatusView,
  formatArabicDate,
  formatArabicDay,
} from "@/features/student-attendance/lib/attendance-labels";
import type {
  AttendanceRecord,
  AttendanceStatus,
} from "@/features/student-attendance/types/attendance";

type AttendanceHistoryProps = {
  records: AttendanceRecord[];
};

type DatePeriodFilter = "all" | "current-month" | "previous-month" | "last-90";

const statusOptions: Array<{ value: AttendanceStatus | "all"; label: string }> = [
  { value: "all", label: "الكل" },
  { value: "present", label: "حاضر" },
  { value: "absent", label: "غائب" },
  { value: "late", label: "متأخر" },
  { value: "excused", label: "غياب بعذر" },
];

const periodOptions: Array<{ value: DatePeriodFilter; label: string }> = [
  { value: "all", label: "الكل" },
  { value: "current-month", label: "هذا الشهر" },
  { value: "previous-month", label: "الشهر السابق" },
  { value: "last-90", label: "آخر 90 يوما" },
];

const referenceDate = new Date("2026-08-02T12:00:00");

function isWithinPeriod(date: string, period: DatePeriodFilter): boolean {
  if (period === "all") {
    return true;
  }

  const recordDate = new Date(`${date}T12:00:00`);

  if (period === "last-90") {
    const diffDays =
      (referenceDate.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays <= 90;
  }

  const recordMonth = `${recordDate.getFullYear()}-${String(
    recordDate.getMonth() + 1
  ).padStart(2, "0")}`;

  return period === "current-month"
    ? recordMonth === "2026-08"
    : recordMonth === "2026-07";
}

function AttendanceStatusBadge({ status }: { status: AttendanceStatus }) {
  const view = attendanceStatusView[status];
  const Icon = view.icon;

  return (
    <StatusBadge status={view.badgeStatus} className="gap-1.5">
      <Icon aria-hidden="true" className="size-3.5" />
      {view.label}
    </StatusBadge>
  );
}

export function AttendanceHistory({ records }: AttendanceHistoryProps) {
  const [query, setQuery] = useState("");
  const [courseId, setCourseId] = useState("all");
  const [status, setStatus] = useState<AttendanceStatus | "all">("all");
  const [period, setPeriod] = useState<DatePeriodFilter>("all");

  const courses = useMemo(
    () =>
      Array.from(
        new Map(
          records.map((record) => [
            record.courseId,
            { id: record.courseId, label: record.subject },
          ])
        ).values()
      ),
    [records]
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return records.filter((record) => {
      const searchable =
        `${record.courseTitle} ${record.subject} ${record.teacherName} ${record.groupName} ${record.sessionTitle}`.toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      const matchesCourse = courseId === "all" || record.courseId === courseId;
      const matchesStatus = status === "all" || record.status === status;
      const matchesPeriod = isWithinPeriod(record.sessionDate, period);

      return matchesQuery && matchesCourse && matchesStatus && matchesPeriod;
    });
  }, [courseId, period, query, records, status]);

  if (records.length === 0) {
    return (
      <EmptyState
        title="لا توجد سجلات حضور بعد"
        description="عند تسجيل أول حصة داخل السنتر سيظهر السجل هنا ضمن بيانات تجريبية في هذه المرحلة."
        icon={CalendarDaysIcon}
      />
    );
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="attendance-history">
      <div className="text-start">
        <h2 id="attendance-history" className="text-xl font-semibold">
          سجل الحضور
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          ابحثي في الحصص السابقة أو صفي السجل حسب المادة والحالة والفترة.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem_12rem_12rem]">
          <label className="relative block text-start">
            <span className="mb-2 block text-sm font-medium">بحث</span>
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3.5 start-3 size-4 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحثي بالمادة أو المعلم أو المجموعة أو الحصة"
              className="ps-9"
            />
          </label>

          <label className="block text-start">
            <span className="mb-2 block text-sm font-medium">المادة</span>
            <select
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="all">كل المواد</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-start">
            <span className="mb-2 block text-sm font-medium">الحالة</span>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as AttendanceStatus | "all")
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
            <span className="mb-2 block text-sm font-medium">الفترة</span>
            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as DatePeriodFilter)
              }
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <>
          <div className="hidden overflow-hidden rounded-lg border bg-card shadow-sm shadow-foreground/5 md:block">
            <table className="w-full table-fixed text-start text-sm">
              <thead className="bg-secondary/65 text-muted-foreground">
                <tr>
                  <th className="w-[8.5rem] px-4 py-3 font-medium">التاريخ</th>
                  <th className="px-4 py-3 font-medium">الحصة</th>
                  <th className="w-[13rem] px-4 py-3 font-medium">المعلم والمجموعة</th>
                  <th className="w-[8rem] px-4 py-3 font-medium">الوقت</th>
                  <th className="w-[9rem] px-4 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="align-top">
                    <td className="px-4 py-4">
                      <span className="block font-medium">
                        {formatArabicDate(record.sessionDate)}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {formatArabicDay(record.sessionDate)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="block font-medium">{record.subject}</span>
                      <span className="mt-1 block leading-6 text-muted-foreground">
                        {record.sessionTitle}
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPinIcon aria-hidden="true" className="size-3.5" />
                        {record.location}
                      </span>
                      {record.note ? (
                        <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                          {record.note}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4">
                      <span className="block">{record.teacherName}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {record.groupName}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5">
                        <Clock3Icon aria-hidden="true" className="size-3.5" />
                        {record.startTime}
                      </span>
                      {record.checkInTime ? (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          دخول: {record.checkInTime}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4">
                      <AttendanceStatusBadge status={record.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {filteredRecords.map((record) => (
              <article
                key={record.id}
                className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 text-start">
                    <h3 className="text-base font-semibold">{record.subject}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {record.sessionTitle}
                    </p>
                  </div>
                  <AttendanceStatusBadge status={record.status} />
                </div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">التاريخ</dt>
                    <dd className="text-end">
                      {formatArabicDay(record.sessionDate)}،{" "}
                      {formatArabicDate(record.sessionDate)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">المعلم</dt>
                    <dd className="text-end">{record.teacherName}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">المجموعة</dt>
                    <dd className="text-end">{record.groupName}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">الوقت</dt>
                    <dd className="text-end">
                      {record.startTime}
                      {record.checkInTime ? ` - دخول ${record.checkInTime}` : ""}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">المكان</dt>
                    <dd className="text-end">{record.location}</dd>
                  </div>
                </dl>
                {record.note ? (
                  <p className="mt-3 rounded-lg bg-secondary/60 px-3 py-2 text-sm leading-6 text-muted-foreground">
                    {record.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="لا توجد سجلات مطابقة"
          description="جربي تغيير كلمات البحث أو اختيار مادة أو فترة مختلفة."
          action={
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuery("");
                setCourseId("all");
                setStatus("all");
                setPeriod("all");
              }}
            >
              مسح التصفية
            </Button>
          }
        />
      )}
    </section>
  );
}
