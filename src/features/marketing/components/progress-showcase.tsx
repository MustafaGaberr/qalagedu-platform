import { CalendarDaysIcon, ClockIcon } from "lucide-react";

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { previewMetrics } from "@/features/marketing/data/landing";

export function ProgressShowcase() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="text-start">
        <p className="text-base font-medium text-primary">قيمة واضحة للطالب</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          يرى الطالب ما أنجزه، وما ينتظره، بدون تشتيت.
        </h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          هذا العرض التسويقي يوضح نوع المعلومات التي يمكن أن تظهر لاحقا داخل
          الحساب، دون تنفيذ لوحة طالب فعلية في هذه المرحلة.
        </p>
      </div>

      <div className="rounded-[2rem] border bg-card p-4 shadow-2xl shadow-foreground/8">
        <div className="rounded-[1.5rem] bg-background p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">ملخص الأسبوع</h3>
              <p className="text-sm text-muted-foreground">
                بيانات عرض ثابتة للواجهة العامة
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <CalendarDaysIcon aria-hidden="true" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {previewMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div key={metric.label} className="rounded-2xl border bg-card p-4">
                  <Icon aria-hidden="true" className="text-primary" />
                  <p className="mt-4 text-2xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-base text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-3 rounded-2xl border bg-secondary/70 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <ClockIcon aria-hidden="true" className="text-primary" />
              <span>الحصة القادمة: مراجعة على الحركة</span>
            </div>
            <Progress value={74}>
              <ProgressLabel>جاهزية الطالب</ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
        </div>
      </div>
    </div>
  );
}
