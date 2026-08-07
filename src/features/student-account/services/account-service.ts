import "server-only";

import { getCurrentSession } from "@/features/auth/services/auth-server";
import type { NotificationPreferences, StudentProfile } from "../types/account";

const localNotificationPreferences: NotificationPreferences = {
  lessonUpdates: true,
  examReminders: true,
  resultUpdates: true,
  attendanceUpdates: true,
  subscriptionUpdates: true,
  paymentUpdates: true,
  announcements: true,
  guardianAttendanceMessages: false,
  guardianResultMessages: false,
  guardianPaymentMessages: false,
};

export async function getStudentProfile(): Promise<StudentProfile> {
  const { user } = await getCurrentSession();
  const studentProfile = user.studentProfile;
  const names = user.name.trim().split(/\s+/);
  const initials = names.slice(0, 2).map((name) => name[0]).join(" ");
  return {
    id: user.id,
    fullName: user.name,
    firstName: names[0] ?? user.name,
    lastName: names.at(-1) ?? user.name,
    phone: user.phone ?? user.loginIdentifier,
    email: user.loginIdentifier.includes("@") ? user.loginIdentifier : undefined,
    grade: studentProfile?.educationalGrade ?? "غير محدد",
    centerName: "غير مرتبط ببيانات المنصة",
    primaryGroup: "لا توجد مجموعة متاحة عبر API الطالب",
    profileInitials: initials,
    accountStatus: "active",
    joinedAt: "",
    activeSubjectsCount: 0,
    guardian: studentProfile?.guardianName || studentProfile?.guardianPhone
      ? {
          id: `${user.id}-guardian`,
          fullName: studentProfile.guardianName ?? "ولي الأمر",
          relation: "ولي الأمر",
          primaryPhone: studentProfile.guardianPhone ?? "غير مسجل",
          preferredContactMethod: "phone",
          receivesAttendanceNotifications: false,
          receivesResultNotifications: false,
          receivesPaymentNotifications: false,
        }
      : undefined,
    editableFields: ["phone", "guardianName", "guardianPhone"],
    readonlyFields: ["fullName", "email", "grade", "schoolName", "address"],
  };
}


// The backend currently has no student notifications or preferences endpoints.
export const getStudentNotifications = async () => [];
export const getStudentNotificationPreferences = async () => ({
  ...localNotificationPreferences,
});
