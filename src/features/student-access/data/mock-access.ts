import type { AccessCode, CenterEnrollmentRequest, CenterEnrollmentSummary, OnlineEntitlement, PaymentDestination, PaymentRequest, StudentLibraryItem } from "../types/access";

export const studentId = "student-1";
export const paymentDestinations: PaymentDestination[] = [
  { id: "vodafone-cash", method: "MOBILE_WALLET", label: "Vodafone Cash", provider: "Vodafone Cash", accountHolder: "إدارة QalagEdu", value: "0100 123 4567" },
  { id: "orange-cash", method: "MOBILE_WALLET", label: "Orange Cash", provider: "Orange Cash", accountHolder: "إدارة QalagEdu", value: "0122 987 6543" },
  { id: "instapay", method: "INSTAPAY", label: "InstaPay", accountHolder: "QalagEdu Center", value: "qalagedu@instapay" },
];

export const onlineEntitlements: OnlineEntitlement[] = [
  { id: "ent-math", courseId: "math-term-3", packageId: "math-term", courseTitle: "الرياضيات التطبيقية — الترم الأول", teacher: "أ. محمود سامي", packageTitle: "باقة ترم", packageType: "TERM", scope: "كل وحدات الترم والدروس التي تُنشر لاحقًا", startedAt: "2026-08-01", expiresAt: "2027-01-31", source: "ONLINE_PAYMENT", progress: 68, status: "ACTIVE" },
  { id: "ent-physics", courseId: "physics-revision-3", packageId: "phy-final", courseTitle: "مراجعة الفيزياء النهائية", teacher: "د. ندى عادل", packageTitle: "مراجعة نهائية", packageType: "FINAL_REVISION", scope: "كل حصص المراجعة والاختبارات", startedAt: "2026-07-01", expiresAt: "2026-08-25", source: "PAID_COUPON", progress: 42, status: "ACTIVE" },
  { id: "ent-arabic", courseId: "arabic-term-3", packageId: "ara-month", courseTitle: "اللغة العربية — أدب وبلاغة", teacher: "أ. هالة يوسف", packageTitle: "باقة شهر", packageType: "MONTHLY", scope: "دروس شهر أغسطس", startedAt: "2026-06-01", expiresAt: "2026-07-01", source: "FREE_ACCESS_CODE", status: "EXPIRED" },
];

export const paymentRequests: PaymentRequest[] = [
  { id: "pay-121", reference: "PAY-2026-000121", courseId: "arabic-term-3", packageId: "ara-term", courseTitle: "اللغة العربية — أدب وبلاغة", packageTitle: "باقة ترم", teacher: "أ. هالة يوسف", amount: 720, method: "INSTAPAY", destinationId: "instapay", createdAt: "2026-08-04T13:30:00", status: "PENDING_REVIEW" },
  { id: "pay-120", reference: "PAY-2026-000120", courseId: "physics-revision-3", packageId: "phy-final", courseTitle: "مراجعة الفيزياء النهائية", packageTitle: "مراجعة نهائية", teacher: "د. ندى عادل", amount: 260, method: "MOBILE_WALLET", destinationId: "vodafone-cash", createdAt: "2026-07-01T10:00:00", status: "APPROVED", note: "تمت مراجعة التحويل في لوحة الموظفين التجريبية." },
  { id: "pay-119", reference: "PAY-2026-000119", courseId: "math-term-3", packageId: "math-month", courseTitle: "الرياضيات التطبيقية — الترم الأول", packageTitle: "باقة شهر", teacher: "أ. محمود سامي", amount: 320, method: "MOBILE_WALLET", destinationId: "orange-cash", createdAt: "2026-07-28T09:15:00", status: "REQUIRES_INFORMATION", note: "يرجى إرسال رقم الطلب الداخلي وصورة التحويل عبر واتساب السنتر." },
];

export const centerEnrollments: CenterEnrollmentSummary[] = [
  { id: "center-math", courseId: "math-term-3", subject: "الرياضيات", teacher: "أ. محمود سامي", term: "الترم الأول", assignedGroup: "مجموعة الأحد والثلاثاء", schedule: "الأحد والثلاثاء · 06:30 م · قاعة 1", status: "ASSIGNED", attendedSessions: 8, totalSessions: 10, latestAttendance: "حاضر", latestScore: "8/10 في آخر تدريب" },
];
export const centerRequests: CenterEnrollmentRequest[] = [
  { id: "center-request-1", courseId: "physics-revision-3", teacherId: "nada-adel", subject: "الفيزياء", grade: "الصف الثالث الثانوي", preferredGroupId: "phy-mon", preferredSchedule: "الاثنين · 06:30 م · معمل الفيزياء", submittedAt: "2026-08-03", status: "PENDING_REVIEW", nextStep: "سيتواصل فريق السنتر لتأكيد المجموعة أو اقتراح موعد مناسب." },
];
export const accessCodes: AccessCode[] = [
  { code: "CENTER-MATH-2026", kind: "PAID_COUPON", courseId: "math-term-3", packageId: "math-month", expiresAt: "2026-12-31", reason: "دفعة تم تحصيلها في السنتر" },
  { code: "FREE-PHY-2026", kind: "FREE_ACCESS_CODE", courseId: "physics-revision-3", packageId: "phy-final", permanent: true, reason: "إتاحة مراجعة مجانية" },
  { code: "EXPIRED-2026", kind: "TEMPORARY_ACCESS_CODE", courseId: "arabic-term-3", packageId: "ara-month", expiresAt: "2026-07-01", reason: "إتاحة مؤقتة" },
  { code: "USED-2026", kind: "PAID_COUPON", courseId: "math-term-3", packageId: "math-term", redeemed: true, reason: "كوبون مستخدم" },
  { code: "PRIVATE-2026", kind: "FREE_ACCESS_CODE", courseId: "math-term-3", packageId: "math-term", intendedStudentId: "student-2", reason: "كود مخصص لطالب آخر" },
];
export const libraryItems: StudentLibraryItem[] = [
  { id: "lib-math", category: "COURSE", title: "الرياضيات التطبيقية — الترم الأول", byline: "أ. محمود سامي", actionHref: "/courses/math-term-3", actionLabel: "فتح الكورس", expiresAt: "2027-01-31", progress: 68, status: "ACTIVE" },
  { id: "lib-phy", category: "REVISION", title: "مراجعة الفيزياء النهائية", byline: "د. ندى عادل", actionHref: "/courses/physics-revision-3", actionLabel: "فتح المراجعة", expiresAt: "2026-08-25", progress: 42, status: "ACTIVE" },
  { id: "lib-product", category: "RESOURCE", title: "نماذج امتحانات اللغة العربية", byline: "أ. هالة يوسف", actionHref: "/store/arabic-models", actionLabel: "عرض المورد", status: "PERMANENT" },
];
