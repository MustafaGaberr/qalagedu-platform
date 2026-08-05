import Link from "next/link";
import { Building2Icon, ClipboardListIcon, CreditCardIcon, ListChecksIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { QuickAction } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type QuickActionsProps = { actions: QuickAction[] };

const actionIcons = { center: Building2Icon, subscriptions: CreditCardIcon, "review-results": ListChecksIcon, "open-exams": ClipboardListIcon } as const;

export function QuickActions({ actions }: QuickActionsProps) {
  return <div className="grid gap-2 sm:grid-cols-3">{actions.map((action) => {
    const Icon = actionIcons[action.id as keyof typeof actionIcons] ?? ClipboardListIcon;
    return <Link key={action.id} href={action.href ?? "/dashboard"} className={cn(buttonVariants({ variant: "outline" }), "h-auto min-h-16 min-w-0 justify-start gap-3 whitespace-normal px-3 text-start")}><Icon aria-hidden="true" data-icon="inline-start" /><span className="min-w-0"><span className="block text-sm font-medium">{action.title}</span><span className="block text-xs leading-5 text-muted-foreground">{action.description}</span></span></Link>;
  })}</div>;
}
