import {
  BellIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  FileTextIcon,
  GraduationCapIcon,
} from "lucide-react";

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { qrCardDetails } from "@/features/marketing/data/landing";

export function HeroProductPreview() {
  const QrIcon = qrCardDetails.icon;

  return (
    <div
      className="relative mx-auto w-full max-w-xl"
      aria-label="معاينة تسويقية لتجربة الطالب داخل المنصة"
    >
      <div className="absolute inset-8 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="relative rounded-[2rem] border bg-card p-3 shadow-2xl shadow-foreground/10">
        <div className="rounded-[1.5rem] border bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCapIcon aria-hidden="true" />
              </div>
              <div className="text-start">
                <p className="text-sm font-semibold text-foreground">
                  لوحة الطالب
                </p>
                <p className="text-xs text-muted-foreground">
                  معاينة غير متصلة ببيانات حقيقية
                </p>
              </div>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
              <BellIcon aria-hidden="true" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "الدروس", value: "١٢", icon: BookOpenIcon },
              { label: "الحضور", value: "٩٢٪", icon: CalendarDaysIcon },
              { label: "اختبار", value: "جيد", icon: FileTextIcon },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="rounded-2xl border bg-card p-3">
                  <Icon aria-hidden="true" className="mb-3 text-primary" />
                  <p className="text-2xl font-semibold leading-none">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl border bg-card p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">متابعة درس الفيزياء</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    الوحدة الثانية: الحركة
                  </p>
                </div>
                <CheckCircle2Icon aria-hidden="true" className="text-primary" />
              </div>
              <Progress value={72}>
                <ProgressLabel>نسبة الإنجاز</ProgressLabel>
                <ProgressValue />
              </Progress>
            </div>

            <div className="rounded-2xl border bg-secondary p-4">
              <QrIcon aria-hidden="true" className="text-primary" />
              <p className="mt-4 text-sm font-semibold">{qrCardDetails.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {qrCardDetails.label} · {qrCardDetails.code}
              </p>
              <div className="mt-3 grid size-16 grid-cols-3 gap-1 rounded-lg bg-background p-2">
                {Array.from({ length: 9 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index % 2 === 0
                        ? "rounded-sm bg-primary"
                        : "rounded-sm bg-muted"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
