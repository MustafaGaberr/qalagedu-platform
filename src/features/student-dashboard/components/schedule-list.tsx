import { MapPinIcon, MonitorPlayIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ScheduleItem } from "@/features/student-dashboard/types/dashboard";

type ScheduleListProps = {
  schedule: ScheduleItem[];
};

export function ScheduleList({ schedule }: ScheduleListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الجدول القادم</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col divide-y">
          {schedule.map((item) => {
            const Icon = item.mode === "online" ? MonitorPlayIcon : MapPinIcon;

            return (
              <li key={item.id} className="grid gap-3 py-3 first:pt-0 last:pb-0 sm:grid-cols-[5rem_1fr]">
                <div className="text-start">
                  <p className="text-sm font-semibold text-foreground">
                    {item.dateLabel}
                  </p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {item.time}
                  </p>
                </div>
                <div className="min-w-0 text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium leading-6 text-foreground">
                      {item.course}
                    </p>
                    <StatusBadge status={item.mode === "online" ? "success" : "muted"}>
                      <Icon aria-hidden="true" data-icon="inline-start" />
                      {item.locationLabel}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.teacher} • {item.group}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
