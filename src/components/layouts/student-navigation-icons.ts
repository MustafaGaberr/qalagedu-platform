import type { LucideIcon } from "lucide-react";
import {
  BadgeCheckIcon,
  BookOpenCheckIcon,
  CalendarCheckIcon,
  CreditCardIcon,
  FileCheck2Icon,
  GraduationCapIcon,
  HomeIcon,
  UserRoundIcon,
} from "lucide-react";

import type { StudentNavigationIcon } from "@/config/student-navigation";

export const studentNavigationIcons: Record<StudentNavigationIcon, LucideIcon> = {
  home: HomeIcon,
  courses: GraduationCapIcon,
  exams: FileCheck2Icon,
  results: BookOpenCheckIcon,
  attendance: CalendarCheckIcon,
  subscriptions: CreditCardIcon,
  "student-card": BadgeCheckIcon,
  profile: UserRoundIcon,
};
