import "server-only";

import { appConfig } from "@/config/app";
import { serverApiRequest } from "@/lib/api/server";
import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";
import type { AccessPackageType } from "@/features/public-catalog/types/catalog";
import type { CenterAttendanceSummary, CenterEnrollmentRequest, CenterEnrollmentSummary, OnlineEntitlement, PaymentDestination, PaymentRequest, PurchaseSummary, StudentCenterGroup, StudentLibraryItem } from "../types/access";

type RawDestination = { id: string; provider: string; value: string; accountHolderLabel: string };
type RawPayment = {
  id: string; reference: string; courseId: string; packageId: string;
  amount: number | string; paymentMethod: string; destinationId: string;
  createdAt: string; status: PaymentRequest["status"];
  decisionReason?: string | null; informationRequest?: string | null;
  studentTransferReference?: string | null;
  course: { id: string; title: string };
  package: { id: string; title: string; type: AccessPackageType };
  destination: RawDestination;
  preparedWhatsApp?: { number: string; reference: string; text: string };
};
type RawEntitlement = {
  id: string; courseId: string; packageId: string | null; scopeType: string;
  sourceType: OnlineEntitlement["source"]; startsAt: string; expiresAt: string | null;
  accessStatus: "ACTIVE" | "SCHEDULED" | "EXPIRED" | "REVOKED";
  course: { id: string; title: string; slug: string };
  package: { id: string; title: string; type: AccessPackageType } | null;
};

const method = (provider: string): PaymentDestination["method"] =>
  provider === "INSTAPAY" ? "INSTAPAY" : "MOBILE_WALLET";

const mapDestination = (item: RawDestination): PaymentDestination => ({
  id: item.id,
  method: method(item.provider),
  label: item.provider.replaceAll("_", " "),
  provider: item.provider.replaceAll("_", " "),
  accountHolder: item.accountHolderLabel,
  value: item.value,
});

const mapPayment = (item: RawPayment): PaymentRequest => ({
  id: item.id,
  reference: item.reference,
  courseId: item.courseId,
  packageId: item.packageId,
  courseTitle: item.course.title,
  packageTitle: item.package.title,
  teacher: appConfig.name,
  amount: Number(item.amount),
  method: method(item.paymentMethod),
  destinationId: item.destinationId,
  createdAt: item.createdAt,
  status: item.status,
  note: item.informationRequest ?? item.decisionReason ?? undefined,
  studentTransferReference: item.studentTransferReference ?? undefined,
  preparedWhatsApp: item.preparedWhatsApp,
});

export async function getPaymentDestinations(packageId: string) {
  const response = await serverApiRequest<{ destinations: RawDestination[] }>(`student/payments/destinations?packageId=${encodeURIComponent(packageId)}`);
  return response.destinations.map(mapDestination);
}

export async function getStudentPayments() {
  return (await serverApiRequest<RawPayment[]>("student/payments")).map(mapPayment);
}

export async function getStudentPayment(paymentId: string) {
  return mapPayment(await serverApiRequest<RawPayment>(`student/payments/${encodeURIComponent(paymentId)}`));
}

export async function getStudentEntitlements(): Promise<OnlineEntitlement[]> {
  const items = await serverApiRequest<RawEntitlement[]>("student/entitlements");
  return Promise.all(items.map(async (item) => {
    const course = await getPublicCourse(item.courseId);
    const teacher = course ? await getPublicTeacher(course.teacherId) : null;
    return {
      id: item.id,
      courseId: item.courseId,
      packageId: item.packageId ?? item.id,
      courseTitle: item.course.title,
      teacher: teacher?.name ?? appConfig.name,
      packageTitle: item.package?.title ?? "وصول مخصص",
      packageType: item.package?.type ?? "CUSTOM",
      scope: item.scopeType,
      startedAt: item.startsAt,
      expiresAt: item.expiresAt ?? undefined,
      source: item.sourceType,
      status: item.accessStatus === "ACTIVE" ? "ACTIVE" : item.accessStatus === "SCHEDULED" ? "PENDING" : "EXPIRED",
    } satisfies OnlineEntitlement;
  }));
}

export async function getStudentLibrary(): Promise<StudentLibraryItem[]> {
  return (await getStudentEntitlements()).map((item) => ({
    id: item.id,
    category: item.packageType === "FINAL_REVISION" ? "REVISION" : "COURSE",
    title: item.courseTitle,
    byline: item.teacher,
    actionHref: `/learn/${item.courseId}`,
    actionLabel: item.status === "ACTIVE" ? "فتح الكورس" : "عرض خيارات التجديد",
    expiresAt: item.expiresAt,
    progress: item.progress,
    status: item.status === "ACTIVE" ? (item.expiresAt ? "ACTIVE" : "PERMANENT") : "EXPIRED",
  }));
}

export async function getPurchaseSummary(courseId?: string, packageId?: string): Promise<PurchaseSummary | null> {
  if (!courseId || !packageId) return null;
  const course = await getPublicCourse(courseId);
  const packageItem = course?.packages.find((item) => item.id === packageId);
  const teacher = course ? await getPublicTeacher(course.teacherId) : null;
  if (!course || !packageItem) return null;
  return {
    courseId,
    packageId,
    courseTitle: course.title,
    teacher: teacher?.name ?? appConfig.name,
    packageTitle: packageItem.title,
    packageType: packageItem.type,
    price: packageItem.price,
    duration: packageItem.duration,
    scope: packageItem.scope,
  };
}

export async function getStudentAccessData() {
  const [onlineEntitlements, rawPayments, groups, requests, enrollments, attendance] = await Promise.all([
    getStudentEntitlements(),
    serverApiRequest<RawPayment[]>("student/payments"),
    getStudentCenterGroups(),
    getStudentCenterRequests(),
    getStudentCenterEnrollments(),
    getStudentCenterAttendance(),
  ]);
  const paymentRequests = rawPayments.map(mapPayment);
  const paymentDestinations = [...new Map(rawPayments.map((payment) => [payment.destination.id, payment.destination])).values()].map(mapDestination);
  return { onlineEntitlements, paymentRequests, paymentDestinations, centerGroups: groups, centerEnrollments: enrollments, centerRequests: requests, centerAttendance: attendance, libraryItems: await getStudentLibrary() };
}

const schedule = (value: unknown) => typeof value === "string" ? value : value && typeof value === "object" ? Object.values(value as Record<string, unknown>).filter((part): part is string | number => typeof part === "string" || typeof part === "number").join(" · ") : "يُحدد لاحقًا";
type RawGroup = { id: string; courseId: string; academicTerm: string; gradeId: string; name: string; schedule: unknown; location: string | null; availablePlaces: number; isFull: boolean; teacher: { id: string; name: string }; canonicalCourse: { id: string; title: string } | null; academicGrade: { name: string } | null };
type RawRequest = { id: string; courseId: string; academicTerm: string; status: CenterEnrollmentRequest["status"]; createdAt: string; teacher: { id: string; name: string }; canonicalCourse: { title: string } | null; preferredGroup: { id: string; name: string; schedule: unknown } | null; decisionReason: string | null };
type RawEnrollment = { id: string; courseId: string; academicTerm: string; status: "ACTIVE" | "SUSPENDED" | "CANCELLED"; teacher: { name: string }; canonicalCourse: { title: string } | null; group: { name: string; schedule: unknown } | null };
type RawAttendance = { id: string; courseId: string; teacher: { name: string }; canonicalCourse: { title: string } | null; group: { name: string } | null; totalSessions: number; attendance: { PRESENT: number; LATE: number; ABSENT: number; EXCUSED: number; pending: number }; latestSessionDate: string | null };

export async function getStudentCenterGroups(): Promise<StudentCenterGroup[]> { return (await serverApiRequest<RawGroup[]>("student/center/groups")).map((item) => ({ id: item.id, courseId: item.canonicalCourse?.id ?? item.courseId, courseTitle: item.canonicalCourse?.title ?? item.courseId, teacherId: item.teacher.id, teacher: item.teacher.name, grade: item.academicGrade?.name ?? item.gradeId, term: item.academicTerm, name: item.name, schedule: schedule(item.schedule), location: item.location ?? undefined, availablePlaces: item.availablePlaces, isFull: item.isFull })); }
export async function getStudentCenterRequests(): Promise<CenterEnrollmentRequest[]> { return (await serverApiRequest<RawRequest[]>("student/center/requests")).map((item) => ({ id: item.id, courseId: item.canonicalCourse?.title ? item.courseId : item.courseId, teacherId: item.teacher.id, subject: item.canonicalCourse?.title ?? item.courseId, grade: "", preferredGroupId: item.preferredGroup?.id ?? "", preferredSchedule: item.preferredGroup ? `${item.preferredGroup.name} · ${schedule(item.preferredGroup.schedule)}` : "دون تفضيل مجموعة", submittedAt: item.createdAt, status: item.status, nextStep: item.decisionReason ?? "سيتم التواصل معك بعد مراجعة الطلب." })); }
export async function getStudentCenterEnrollments(): Promise<CenterEnrollmentSummary[]> { return (await serverApiRequest<RawEnrollment[]>("student/center/enrollments")).filter((item) => item.status === "ACTIVE").map((item) => ({ id: item.id, courseId: item.courseId, subject: item.canonicalCourse?.title ?? item.courseId, teacher: item.teacher.name, term: item.academicTerm, assignedGroup: item.group?.name ?? "لم تُعيّن مجموعة بعد", schedule: schedule(item.group?.schedule), status: "ASSIGNED", attendedSessions: 0, totalSessions: 0, latestAttendance: "لا يوجد تسجيل حضور بعد" })); }
export async function getStudentCenterAttendance(): Promise<CenterAttendanceSummary[]> { return (await serverApiRequest<RawAttendance[]>("student/center/attendance")).map((item) => ({ enrollmentId: item.id, courseTitle: item.canonicalCourse?.title ?? item.courseId, teacher: item.teacher.name, group: item.group?.name ?? "—", totalSessions: item.totalSessions, presentCount: item.attendance.PRESENT, lateCount: item.attendance.LATE, absentCount: item.attendance.ABSENT, excusedCount: item.attendance.EXCUSED, latestSessionDate: item.latestSessionDate ?? undefined })); }
