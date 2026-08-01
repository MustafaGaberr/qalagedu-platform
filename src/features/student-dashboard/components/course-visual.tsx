import type { CourseTone } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type CourseVisualProps = {
  tone: CourseTone;
  label: string;
  className?: string;
};

const toneClasses: Record<CourseTone, string> = {
  emerald:
    "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_22%,white),color-mix(in_oklch,var(--primary)_6%,white))] text-primary",
  amber:
    "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--accent)_70%,white),color-mix(in_oklch,var(--accent)_25%,white))] text-accent-foreground",
  sky: "bg-[linear-gradient(135deg,oklch(0.9_0.05_220),oklch(0.98_0.01_215))] text-foreground",
  rose: "bg-[linear-gradient(135deg,oklch(0.92_0.05_20),oklch(0.99_0.01_20))] text-foreground",
};

export function CourseVisual({ tone, label, className }: CourseVisualProps) {
  return (
    <div
      className={cn(
        "relative isolate flex aspect-[4/3] min-h-24 overflow-hidden rounded-lg border p-3 shadow-inner shadow-white/50",
        toneClasses[tone],
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute -start-8 -top-8 size-24 rounded-full border border-current/10" />
      <div className="absolute -bottom-7 end-4 size-24 rounded-full border border-current/15" />
      <div className="absolute bottom-4 start-4 h-1.5 w-20 rounded-full bg-current/15" />
      <div className="absolute bottom-8 start-4 h-1.5 w-14 rounded-full bg-current/20" />
      <div className="mt-auto text-start">
        <div className="text-xl font-semibold leading-7">{label}</div>
        <div className="mt-1 h-1 w-10 rounded-full bg-current/40" />
      </div>
    </div>
  );
}
