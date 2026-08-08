"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpenCheckIcon, Building2Icon, MonitorPlayIcon, PlayCircleIcon, RadioTowerIcon, UsersIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type GradePath = {
  id: string;
  label: string;
  courseCount: number;
};

export function GradePathsSection({ grades }: { grades: GradePath[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {grades.map((grade, index) => {
        const isExpanded = expanded === grade.id;
        return (
          <article
            key={grade.id}
            data-expanded={isExpanded}
            className={cn(
              "group relative min-h-44 overflow-hidden rounded-[1.75rem] border bg-card shadow-sm transition-[min-height,border-color,box-shadow,transform] duration-500 focus-within:border-primary/45 focus-within:shadow-xl md:min-h-80 md:hover:-translate-y-1 md:hover:border-primary/45 md:hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none",
              isExpanded && "min-h-[23rem] border-primary/45 shadow-xl",
            )}
          >
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={`grade-options-${grade.id}`}
              onClick={() => setExpanded((value) => value === grade.id ? null : grade.id)}
              className={cn(
                "absolute inset-0 z-10 flex w-full flex-col items-center justify-center p-6 text-center outline-none transition duration-500 md:group-hover:pointer-events-none md:group-hover:-translate-y-5 md:group-hover:opacity-0 md:group-focus-within:pointer-events-none md:group-focus-within:-translate-y-5 md:group-focus-within:opacity-0 motion-reduce:transform-none motion-reduce:transition-none",
                isExpanded && "pointer-events-none -translate-y-5 opacity-0",
              )}
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary shadow-inner">{index + 1}</span>
              <h3 className="mt-5 text-xl font-black leading-8 sm:text-2xl">{grade.label}</h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{grade.courseCount ? `${grade.courseCount} كورسات متاحة` : "استكشف طرق الدراسة"}</p>
              <span className="mt-5 text-xs font-bold text-primary md:hidden">اضغط لاختيار طريقة الدراسة</span>
              <span className="mt-5 hidden text-xs font-bold text-primary md:block">مرّر أو استخدم لوحة المفاتيح للاختيار</span>
            </button>

            <div
              id={`grade-options-${grade.id}`}
              className={cn(
                "absolute inset-0 z-20 flex translate-y-full flex-col bg-[linear-gradient(145deg,color-mix(in_oklch,var(--primary)_10%,var(--background)),var(--card))] p-4 opacity-0 transition duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 motion-reduce:transform-none motion-reduce:transition-none sm:p-5",
                isExpanded && "translate-y-0 opacity-100",
              )}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-primary">اختر طريقة الدراسة</p>
                  <h3 className="mt-1 font-black">{grade.label}</h3>
                </div>
                <button type="button" onClick={() => setExpanded(null)} className="flex min-h-10 items-center rounded-xl px-3 text-xs font-bold text-muted-foreground transition hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden">إغلاق</button>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-3">
                <ModeOption
                  href={`/courses?grade=${encodeURIComponent(grade.id)}&mode=ONLINE`}
                  label="أونلاين"
                  description="فيديوهات وباقات"
                  icon={MonitorPlayIcon}
                  accentIcon={RadioTowerIcon}
                />
                <ModeOption
                  href={`/center-schedule?grade=${encodeURIComponent(grade.id)}`}
                  label="أوفلاين"
                  description="مجموعات السنتر"
                  icon={Building2Icon}
                  accentIcon={UsersIcon}
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ModeOption({ href, label, description, icon: Icon, accentIcon: AccentIcon }: { href: string; label: string; description: string; icon: typeof MonitorPlayIcon; accentIcon: typeof RadioTowerIcon }) {
  return (
    <Link
      href={href}
      className="group/option relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-2xl border border-primary/15 bg-background p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 active:scale-[.98] md:min-h-44 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="relative flex size-20 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary transition duration-300 group-hover/option:scale-110 group-hover/option:bg-white/15 group-hover/option:text-white group-focus-visible/option:scale-110 group-focus-visible/option:bg-white/15 group-focus-visible/option:text-white motion-reduce:transform-none">
        <Icon className="size-9 transition duration-300 group-hover/option:-translate-y-1 group-hover/option:scale-110 group-focus-visible/option:-translate-y-1 group-focus-visible/option:scale-110 motion-reduce:transform-none" />
        <AccentIcon className="absolute -end-2 -top-2 size-7 rounded-full bg-card p-1.5 text-primary opacity-0 shadow-md transition duration-300 group-hover/option:translate-x-0.5 group-hover/option:opacity-100 group-focus-visible/option:translate-x-0.5 group-focus-visible/option:opacity-100 motion-reduce:transform-none" />
        <PlayCircleIcon className="absolute -bottom-2 -start-2 size-7 rounded-full bg-card p-1.5 text-primary opacity-0 shadow-md transition duration-300 group-hover/option:-translate-x-0.5 group-hover/option:opacity-100 group-focus-visible/option:-translate-x-0.5 group-focus-visible/option:opacity-100 motion-reduce:transform-none" />
      </div>
      <strong className="mt-5 text-lg font-black">{label}</strong>
      <span className="mt-1 text-xs font-semibold text-muted-foreground transition group-hover/option:text-primary-foreground/75 group-focus-visible/option:text-primary-foreground/75">{description}</span>
      <BookOpenCheckIcon className="absolute bottom-3 end-3 size-5 text-primary/15 transition group-hover/option:text-white/25 group-focus-visible/option:text-white/25" />
    </Link>
  );
}
