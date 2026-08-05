import type { LucideIcon } from "lucide-react";
import { Building2Icon, CreditCardIcon, FileCheck2Icon, GraduationCapIcon, HomeIcon } from "lucide-react";

import type { StudentNavigationIcon } from "@/config/student-navigation";

export const studentNavigationIcons: Record<StudentNavigationIcon, LucideIcon> = {
  home: HomeIcon,
  courses: GraduationCapIcon,
  exams: FileCheck2Icon,
  subscriptions: CreditCardIcon,
  center: Building2Icon,
};
