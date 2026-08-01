import * as React from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-3xl text-start">
        <h2 className="text-2xl font-semibold leading-9 text-foreground sm:text-3xl sm:leading-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </div>
  );
}
