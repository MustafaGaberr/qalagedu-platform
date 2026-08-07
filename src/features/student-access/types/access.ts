import type { AccessPackageType } from "@/features/public-catalog/types/catalog";

export type CenterRequestStatus = "PENDING_REVIEW" | "CONTACTED" | "WAITLISTED" | "APPROVED" | "ASSIGNED" | "REJECTED" | "CANCELLED";
export type OnlineAccessSource = "ONLINE_PAYMENT" | "PAID_COUPON" | "FREE_ACCESS_CODE" | "TEACHER_MANUAL_GRANT" | "ASSISTANT_MANUAL_GRANT" | "ADMIN_GRANT";
export type PaymentMethod = "MOBILE_WALLET" | "INSTAPAY" | "COUPON";
export type PaymentRequestStatus = "AWAITING_TRANSFER" | "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "REQUIRES_INFORMATION" | "CANCELLED";
export type AccessCodeKind = "PAID_COUPON" | "FREE_ACCESS_CODE" | "TEMPORARY_ACCESS_CODE";

export type CenterEnrollmentRequest = { id: string; courseId: string; teacherId: string; subject: string; grade: string; preferredGroupId: string; preferredSchedule: string; submittedAt: string; status: CenterRequestStatus; nextStep: string; };
export type CenterEnrollmentSummary = { id: string; courseId: string; subject: string; teacher: string; term: string; assignedGroup: string; schedule: string; status: Extract<CenterRequestStatus, "APPROVED" | "ASSIGNED">; attendedSessions: number; totalSessions: number; latestAttendance: string; latestScore?: string; };
export type StudentCenterGroup = { id: string; courseId: string; courseTitle: string; teacherId: string; teacher: string; grade: string; term: string; name: string; schedule: string; location?: string; availablePlaces: number; isFull: boolean; };
export type CenterAttendanceSummary = { enrollmentId: string; courseTitle: string; teacher: string; group: string; totalSessions: number; presentCount: number; lateCount: number; absentCount: number; excusedCount: number; latestSessionDate?: string; };
export type OnlineEntitlement = { id: string; courseId: string; packageId: string; courseTitle: string; teacher: string; packageTitle: string; packageType: AccessPackageType; scope: string; startedAt: string; expiresAt?: string; source: OnlineAccessSource; progress?: number; status: "ACTIVE" | "PENDING" | "EXPIRED"; };
export type PaymentDestination = { id: string; method: Exclude<PaymentMethod, "COUPON">; label: string; provider?: string; accountHolder: string; value: string; };
export type PaymentRequest = { id: string; reference: string; courseId: string; packageId: string; courseTitle: string; packageTitle: string; teacher: string; amount: number; method: Exclude<PaymentMethod, "COUPON">; destinationId: string; createdAt: string; status: PaymentRequestStatus; note?: string; studentTransferReference?: string; preparedWhatsApp?: { number: string; reference: string; text: string }; };
export type AccessCode = { code: string; kind: AccessCodeKind; courseId: string; packageId: string; intendedStudentId?: string; expiresAt?: string; permanent?: boolean; redeemed?: boolean; reason: string; };
export type CodePreview = { valid: boolean; message: string; code?: AccessCode; entitlement?: Pick<OnlineEntitlement, "courseId" | "packageId" | "courseTitle" | "teacher" | "packageTitle" | "packageType" | "scope" | "expiresAt">; };
export type StudentLibraryItem = { id: string; category: "COURSE" | "REVISION" | "RESOURCE"; title: string; byline: string; actionHref: string; actionLabel: string; expiresAt?: string; progress?: number; status: "ACTIVE" | "PERMANENT" | "EXPIRED"; };
export type PurchaseSummary = { courseId: string; packageId: string; courseTitle: string; teacher: string; packageTitle: string; packageType: AccessPackageType; price: number; duration: string; scope: string; };
