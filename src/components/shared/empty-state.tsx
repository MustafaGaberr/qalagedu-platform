import type { LucideIcon } from "lucide-react";
import { InboxIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = InboxIcon,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon aria-hidden="true" />
        </div>
        <div className="max-w-md">
          <h3 className="text-base font-semibold leading-7 text-foreground">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="flex items-center gap-2">{action}</div> : null}
      </CardContent>
    </Card>
  );
}
