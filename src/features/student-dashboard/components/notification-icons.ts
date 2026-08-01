import type { LucideIcon } from "lucide-react";
import {
  BellRingIcon,
  CalendarClockIcon,
  FileTextIcon,
  PlayCircleIcon,
} from "lucide-react";

import type { NotificationType } from "@/features/student-dashboard/types/dashboard";

export const notificationIconMap: Record<NotificationType, LucideIcon> = {
  lesson: PlayCircleIcon,
  result: BellRingIcon,
  file: FileTextIcon,
  schedule: CalendarClockIcon,
};
