import { apiRequest } from "@/lib/api/client";

export const createPaymentRequest = (packageId: string, destinationId: string) =>
  apiRequest<{ id: string; reference: string; preparedWhatsApp?: { number: string; reference: string; text: string } }>("student/payments", {
    method: "POST",
    body: { packageId, destinationId },
  });

export const submitPaymentTransfer = (paymentId: string, transferReference?: string) =>
  apiRequest(`student/payments/${encodeURIComponent(paymentId)}/submit-transfer`, {
    method: "POST",
    body: { transferReference: transferReference || undefined },
  });

export const previewFreeAccessCode = (code: string) =>
  apiRequest<{ status: string; course: { id: string; title: string }; package?: { id: string; title: string; type: string } | null; intendedForCurrentStudent?: boolean }>("student/access-codes/preview", { method: "POST", body: { code } });

export const redeemFreeAccessCode = (code: string) =>
  apiRequest("student/access-codes/redeem", { method: "POST", body: { code } });

export const redeemPaidCoupon = (code: string) =>
  apiRequest("student/coupons/redeem", { method: "POST", body: { code } });
export const createCenterRequest = (courseId: string, preferredGroupId?: string) => apiRequest("student/center/requests", { method: "POST", body: { courseId, ...(preferredGroupId ? { preferredGroupId } : {}) } });
