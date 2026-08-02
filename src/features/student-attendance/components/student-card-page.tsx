import {
  BadgeCheckIcon,
  BookOpenCheckIcon,
  CalendarDaysIcon,
  IdCardIcon,
  InfoIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatArabicDate,
  maskQrToken,
  qrStatusView,
} from "@/features/student-attendance/lib/attendance-labels";
import type {
  QrIdentityStatus,
  StudentCardData,
} from "@/features/student-attendance/types/attendance";

type StudentCardPageProps = {
  card: StudentCardData | null;
};

const qrCells = [
  1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 0,
  0, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 0, 1, 0,
  0, 1, 1, 0, 1, 0, 1,
  1, 0, 0, 1, 1, 1, 1,
] as const;

const qrStatuses: QrIdentityStatus[] = [
  "active",
  "temporarily-disabled",
  "requires-renewal",
];

function QrPlaceholder({ card }: { card: StudentCardData }) {
  const status = qrStatusView[card.qrStatus];
  const Icon = status.icon;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        aria-label="نموذج QR غير قابل للمسح"
        className="grid size-40 grid-cols-7 gap-1 rounded-lg border bg-background p-3 shadow-inner"
      >
        {qrCells.map((filled, index) => (
          <span
            key={index}
            className={
              filled
                ? "rounded-[2px] bg-foreground"
                : "rounded-[2px] bg-muted"
            }
          />
        ))}
      </div>
      <StatusBadge status={status.badgeStatus} className="gap-1.5">
        <Icon aria-hidden="true" className="size-3.5" />
        {status.label}
      </StatusBadge>
      <div className="text-xs leading-5 text-muted-foreground">
        <p>نموذج بصري غير قابل للمسح</p>
        <p className="font-mono">{maskQrToken(card.qrIdentityToken)}</p>
      </div>
    </div>
  );
}

function StudentIdentityCard({ card }: { card: StudentCardData }) {
  const qrStatus = qrStatusView[card.qrStatus];
  const QrStatusIcon = qrStatus.icon;

  return (
    <section
      aria-labelledby="student-card-title"
      className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5 sm:p-5"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-stretch">
        <div className="flex min-w-0 flex-col justify-between gap-8 rounded-lg border bg-secondary/45 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 text-start">
              <p className="text-sm font-medium text-primary">
                {card.centerName}
              </p>
              <h1
                id="student-card-title"
                className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl"
              >
                بطاقة الطالب
              </h1>
            </div>
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <IdCardIcon aria-hidden="true" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <Avatar className="size-20" size="lg">
              <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">
                {card.profileInitials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <p className="text-sm text-muted-foreground">اسم الطالب</p>
              <h2 className="mt-1 break-words text-2xl font-semibold leading-snug">
                {card.fullName}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge status="success" className="gap-1.5">
                  <BadgeCheckIcon aria-hidden="true" className="size-3.5" />
                  {card.accountStatusLabel}
                </StatusBadge>
                <StatusBadge status={qrStatus.badgeStatus} className="gap-1.5">
                  <QrStatusIcon aria-hidden="true" className="size-3.5" />
                  QR {qrStatus.label}
                </StatusBadge>
              </div>
            </div>
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg border bg-background/70 p-3">
              <dt className="text-muted-foreground">كود الطالب</dt>
              <dd className="mt-1 font-mono text-base font-semibold">
                {card.studentCode}
              </dd>
            </div>
            <div className="rounded-lg border bg-background/70 p-3">
              <dt className="text-muted-foreground">المرحلة</dt>
              <dd className="mt-1 font-semibold">{card.grade}</dd>
            </div>
            <div className="rounded-lg border bg-background/70 p-3">
              <dt className="text-muted-foreground">المجموعة الأساسية</dt>
              <dd className="mt-1 font-semibold">{card.primaryGroup}</dd>
            </div>
            <div className="rounded-lg border bg-background/70 p-3">
              <dt className="text-muted-foreground">المواد النشطة</dt>
              <dd className="mt-1 font-semibold">
                {card.activeSubjects.length} مواد
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-lg border bg-background p-5">
          <QrPlaceholder card={card} />
          <div className="rounded-lg bg-secondary/65 p-3 text-start text-sm leading-6 text-muted-foreground">
            هذا الكود يعرف حساب الطالب داخل السنتر. بعد مسحه يحدد نظام السنتر
            المادة والحصة المتاحة، ولا تحتاجين إلى كود منفصل لكل مادة.
          </div>
        </div>
      </div>
    </section>
  );
}

export function StudentCardPage({ card }: StudentCardPageProps) {
  if (!card) {
    return (
      <EmptyState
        title="بطاقة الطالب غير متاحة مؤقتا"
        description="تعذر تحميل بيانات البطاقة التجريبية الآن. لا توجد أي عملية تعريف أو مسح حقيقية في هذه المرحلة."
        icon={IdCardIcon}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <section className="rounded-lg border bg-card px-4 py-4 shadow-sm shadow-foreground/5 sm:px-5">
        <div className="max-w-3xl text-start">
          <h1 className="text-3xl font-semibold leading-tight">
            بطاقة الطالب
          </h1>
          <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
            هوية رقمية للعرض داخل السنتر مستقبلا. هذه نسخة واجهة أمامية ببيانات
            تجريبية ولا تنفذ مسحا أو تحققا إنتاجيا.
          </p>
        </div>
      </section>

      <StudentIdentityCard card={card} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.65fr)]">
        <Card>
          <CardHeader>
            <CardTitle>المواد النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            {card.activeSubjects.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {card.activeSubjects.map((subject) => (
                  <article
                    key={subject.courseId}
                    className="rounded-lg border bg-background p-3 text-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <BookOpenCheckIcon aria-hidden="true" className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-semibold">{subject.subject}</h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {subject.teacherName}
                        </p>
                        <p className="text-xs leading-5 text-muted-foreground">
                          {subject.groupName}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="لا توجد مواد نشطة"
                description="عند تفعيل الاشتراك ستظهر المواد المرتبطة ببطاقة الطالب هنا."
                icon={BookOpenCheckIcon}
              />
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle>حالة البطاقة</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground">
              <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-primary"
                />
                <div>
                  <p className="font-medium text-foreground">تاريخ الانضمام</p>
                  <p>{formatArabicDate(card.joinedAt)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
                <KeyRoundIcon
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-primary"
                />
                <div>
                  <p className="font-medium text-foreground">إصدار QR</p>
                  <p>{formatArabicDate(card.qrIssuedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حالات QR الممكنة</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {qrStatuses.map((statusKey) => {
                const status = qrStatusView[statusKey];
                const Icon = status.icon;

                return (
                  <div
                    key={statusKey}
                    className="flex items-start gap-3 rounded-lg border bg-background p-3 text-start"
                  >
                    <Icon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-primary"
                    />
                    <div>
                      <StatusBadge status={status.badgeStatus}>
                        {status.label}
                      </StatusBadge>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {status.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>استخدام الكود</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm leading-7 text-muted-foreground">
            <div className="flex items-start gap-3">
              <InfoIcon
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-primary"
              />
              <p>
                يوجد كود واحد ثابت لهوية الطالب في السنتر. لا يمثل الكود مادة أو
                معلما أو حصة بعينها؛ النظام المستقبلي سيختار الحصة المؤهلة بعد
                التعرف على الطالب.
              </p>
            </div>
            <p>
              لا يحتوي نموذج الواجهة على اسم الطالب أو رقم الهاتف أو بيانات ولي
              الأمر داخل الرمز، والمعرف الظاهر هنا مقنع لأنه مجرد رمز تجريبي.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إرشادات الأمان</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm leading-7 text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheckIcon
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-primary"
              />
              <p>
                عند فقدان البطاقة أو مشاركة صورة منها، يجب إبلاغ إدارة السنتر
                لإيقاف الكود مؤقتا وإصدار بديل عند تفعيل النظام الحقيقي.
              </p>
            </div>
            <p>
              التحقق الإنتاجي لاحقا سيكون من الخادم: حالة الطالب، الاشتراكات
              النشطة، الحصص المؤهلة، منع التكرار، وحالة البطاقة.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
