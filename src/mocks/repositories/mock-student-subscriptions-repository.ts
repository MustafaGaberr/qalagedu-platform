import { mockPaymentRequests, mockStudentSubscriptions, mockSubscriptionOffers } from "@/features/student-subscriptions/data/mock-subscriptions";
import type { ActivationCodeResult, CreatePaymentRequestInput, PaymentRequest, StudentSubscription, StudentSubscriptionsRepository, SubscriptionOffer } from "@/features/student-subscriptions/types/subscriptions";

const payments = [...mockPaymentRequests];
const codes: Record<string, ActivationCodeResult> = {
  "DEMO-ARABIC-2026": { status: "valid", message: "الكود صالح للمعاينة قبل التأكيد.", courseId: "arabic-3sec", courseTitle: "اللغة العربية: أدب وبلاغة ونصوص", teacherName: "أ. هالة يوسف", groupName: "مجموعة مراجعة", durationLabel: "شهر دراسي", expiresAt: "2026-09-01", activationPreview: "سيُضاف الاشتراك التجريبي إلى قائمة الاشتراكات لهذه الجلسة فقط." },
  "DEMO-EXPIRED": { status: "expired", message: "انتهت صلاحية هذا الكود التجريبي." },
  "DEMO-USED": { status: "already_used", message: "استُخدم هذا الكود التجريبي من قبل." },
  "DEMO-REVIEW": { status: "account_review_required", message: "يحتاج هذا الكود إلى مراجعة الحساب من المركز." },
};

function normalize(code: string) { return code.trim().replace(/\s+/g, "").toUpperCase(); }

export class MockStudentSubscriptionsRepository implements StudentSubscriptionsRepository {
  async getSubscriptions(): Promise<StudentSubscription[]> { return mockStudentSubscriptions; }
  async getSubscriptionOffers(): Promise<SubscriptionOffer[]> { return mockSubscriptionOffers; }
  async getSubscriptionById(id: string): Promise<StudentSubscription | null> { return mockStudentSubscriptions.find((item) => item.id === id) ?? null; }
  async validateActivationCode(code: string): Promise<ActivationCodeResult> { return codes[normalize(code)] ?? { status: "invalid", message: "تعذر التحقق من الكود. راجعي الكود المرسل من المركز." }; }
  async activateWithCode(code: string): Promise<ActivationCodeResult> { const result = await this.validateActivationCode(code); return result.status === "valid" ? { ...result, message: "تم تأكيد التفعيل التجريبي لهذه الجلسة. الربط الدائم سيتم لاحقًا." } : result; }
  async getPayments(): Promise<PaymentRequest[]> { return payments; }
  async getPaymentById(id: string): Promise<PaymentRequest | null> { return payments.find((item) => item.id === id) ?? null; }
  async createPaymentRequest(input: CreatePaymentRequestInput): Promise<PaymentRequest> { const payment = { ...input, id: `payment-runtime-${Date.now()}`, studentId: "student-1", submittedAt: new Date().toISOString(), status: "pending_review" as const }; payments.unshift(payment); return payment; }
}
