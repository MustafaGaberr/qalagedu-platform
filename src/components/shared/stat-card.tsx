import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge, type StatusBadgeStatus } from "@/components/shared/status-badge";

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon?: LucideIcon;
  status?: StatusBadgeStatus;
  statusLabel?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  status,
  statusLabel,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {Icon ? (
          <CardAction>
            <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon aria-hidden="true" />
            </div>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="text-3xl font-semibold leading-none text-foreground">
          {value}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {status && statusLabel ? (
            <StatusBadge status={status}>{statusLabel}</StatusBadge>
          ) : null}
          {description ? <span>{description}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}
