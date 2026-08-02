import {
  AlertCircleIcon,
  CalendarCheckIcon,
  Clock3Icon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  ShieldQuestionIcon,
  UserXIcon,
  type LucideIcon,
} from "lucide-react";

import type {
  AttendanceStatus,
  QrIdentityStatus,
} from "@/features/student-attendance/types/attendance";
import type { StatusBadgeStatus } from "@/components/shared/status-badge";

type AttendanceStatusView = {
  label: string;
  message: string;
  badgeStatus: StatusBadgeStatus;
  icon: LucideIcon;
};

export const attendanceStatusView: Record<
  AttendanceStatus,
  AttendanceStatusView
> = {
  present: {
    label: "حاضر",
    message: "تم تسجيل حضورك بنجاح.",
    badgeStatus: "success",
    icon: CalendarCheckIcon,
  },
  absent: {
    label: "غائب",
    message: "تم تسجيل غيابك لهذه الحصة.",
    badgeStatus: "destructive",
    icon: UserXIcon,
  },
  late: {
    label: "متأخر",
    message: "تم تسجيل حضورك مع تأخير بسيط.",
    badgeStatus: "warning",
    icon: Clock3Icon,
  },
  excused: {
    label: "غياب بعذر",
    message: "تم اعتماد الغياب بعذر في سجل الحضور.",
    badgeStatus: "muted",
    icon: AlertCircleIcon,
  },
};

export const qrStatusView: Record<
  QrIdentityStatus,
  {
    label: string;
    message: string;
    badgeStatus: StatusBadgeStatus;
    icon: LucideIcon;
  }
> = {
  active: {
    label: "نشط",
    message: "بطاقة الطالب جاهزة للعرض داخل السنتر عند تفعيل نظام المسح لاحقا.",
    badgeStatus: "success",
    icon: ShieldCheckIcon,
  },
  "temporarily-disabled": {
    label: "متوقف مؤقتا",
    message: "تم إيقاف الكود مؤقتا. راجع إدارة السنتر قبل استخدام البطاقة.",
    badgeStatus: "warning",
    icon: ShieldAlertIcon,
  },
  "requires-renewal": {
    label: "يتطلب مراجعة الاشتراك",
    message: "يحتاج الحساب أو الاشتراك إلى مراجعة قبل اعتماد الكود.",
    badgeStatus: "destructive",
    icon: ShieldQuestionIcon,
  },
};

export function maskQrToken(token: string): string {
  const [prefix = token] = token.split("_mock_");
  const suffix = token.slice(-4);

  return `${prefix}_mock_••••${suffix}`;
}

export function formatArabicDate(date: string): string {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function formatArabicDay(date: string): string {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
  }).format(new Date(`${date}T12:00:00`));
}
