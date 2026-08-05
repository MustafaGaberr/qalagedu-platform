import { AlertCircleIcon, CalendarCheckIcon, Clock3Icon, UserXIcon, type LucideIcon } from "lucide-react";
import type { StatusBadgeStatus } from "@/components/shared/status-badge";
import type { AttendanceStatus } from "@/features/student-attendance/types/attendance";

type AttendanceStatusView = { label: string; message: string; badgeStatus: StatusBadgeStatus; icon: LucideIcon };
export const attendanceStatusView: Record<AttendanceStatus, AttendanceStatusView> = {
  present: { label: "حاضر", message: "تم تسجيل حضورك بنجاح.", badgeStatus: "success", icon: CalendarCheckIcon },
  absent: { label: "غائب", message: "تم تسجيل غيابك لهذه الحصة.", badgeStatus: "destructive", icon: UserXIcon },
  late: { label: "متأخر", message: "تم تسجيل حضورك مع تأخير بسيط.", badgeStatus: "warning", icon: Clock3Icon },
  excused: { label: "غياب بعذر", message: "تم اعتماد الغياب بعذر في سجل الحضور.", badgeStatus: "muted", icon: AlertCircleIcon },
};

export function formatArabicDate(date: string): string { return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`)); }
export function formatArabicDay(date: string): string { return new Intl.DateTimeFormat("ar-EG", { weekday: "long" }).format(new Date(`${date}T12:00:00`)); }
