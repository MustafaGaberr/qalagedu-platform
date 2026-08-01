import Link from "next/link";
import {
  BadgeCheckIcon,
  DownloadIcon,
  KeyRoundIcon,
  ListChecksIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { QuickAction } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type QuickActionsProps = {
  actions: QuickAction[];
};

const actionIcons = {
  "student-card": BadgeCheckIcon,
  "activation-code": KeyRoundIcon,
  "review-results": ListChecksIcon,
  "download-summary": DownloadIcon,
} as const;

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5">
      <div className="text-start">
        <h2 className="text-base font-semibold text-foreground">
          إجراءات سريعة
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          اختصارات مفيدة دون تفعيل عمليات حقيقية الآن.
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon =
            actionIcons[action.id as keyof typeof actionIcons] ?? ListChecksIcon;

          if (action.disabled) {
            return (
              <button
                key={action.id}
                type="button"
                disabled
                className="flex min-h-16 items-center gap-3 rounded-lg border bg-muted/45 px-3 text-start opacity-70"
              >
                <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {action.title}
                  </span>
                  <span className="block text-xs leading-5 text-muted-foreground">
                    {action.description}
                  </span>
                </span>
              </button>
            );
          }

          return (
            <Link
              key={action.id}
              href="#latest-result"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-auto min-h-16 justify-start gap-3 px-3 text-start"
              )}
            >
              <Icon aria-hidden="true" data-icon="inline-start" />
              <span>
                <span className="block text-sm font-medium">{action.title}</span>
                <span className="block text-xs leading-5 text-muted-foreground">
                  {action.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
