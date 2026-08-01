import {
  BarChart3Icon,
  CalendarCheckIcon,
  CircleCheckBigIcon,
  GraduationCapIcon,
} from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import type { DashboardStat } from "@/features/student-dashboard/types/dashboard";

const statIcons = [
  GraduationCapIcon,
  CircleCheckBigIcon,
  CalendarCheckIcon,
  BarChart3Icon,
] as const;

type DashboardStatsProps = {
  stats: DashboardStat[];
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section
      aria-label="ملخص أرقام الطالب"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={statIcons[index] ?? GraduationCapIcon}
        />
      ))}
    </section>
  );
}
