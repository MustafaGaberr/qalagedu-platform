import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";
import { accessCodes, centerEnrollments, centerRequests, libraryItems, onlineEntitlements, paymentDestinations, paymentRequests, studentId } from "../data/mock-access";
import type { CodePreview, PurchaseSummary } from "../types/access";

const courseNames: Record<string, string> = { "math-term-3": "الرياضيات التطبيقية — الترم الأول", "physics-revision-3": "مراجعة الفيزياء النهائية", "arabic-term-3": "اللغة العربية — أدب وبلاغة" };
const teacherNames: Record<string, string> = { "mahmoud-samy": "أ. محمود سامي", "nada-adel": "د. ندى عادل", "hala-youssef": "أ. هالة يوسف" };
const packageNames: Record<string, string> = { "math-month": "باقة شهر", "math-term": "باقة ترم", "phy-single": "باقة حصة", "phy-final": "مراجعة نهائية", "ara-month": "باقة شهر", "ara-term": "باقة ترم" };

export function getPurchaseSummary(courseId?: string, packageId?: string): PurchaseSummary | null {
  if (!courseId || !packageId) return null;
  const course = getPublicCourse(courseId);
  const packageItem = course?.packages.find((item) => item.id === packageId);
  const teacher = course ? getPublicTeacher(course.teacherId) : null;
  if (!course || !packageItem || !teacher) return null;
  return { courseId, packageId, courseTitle: courseNames[course.id] ?? course.title, teacher: teacherNames[teacher.id] ?? teacher.name, packageTitle: packageNames[packageItem.id] ?? packageItem.title, packageType: packageItem.type, price: packageItem.price, duration: packageItem.duration, scope: packageItem.scope };
}

export function previewAccessCode(rawCode: string): CodePreview {
  const code = rawCode.replace(/\s+/g, "").toUpperCase();
  const accessCode = accessCodes.find((item) => item.code === code);
  if (!accessCode) return { valid: false, message: "الكود غير صالح. راجعي الأحرف ثم حاولي مرة أخرى." };
  if (accessCode.redeemed) return { valid: false, message: "تم استخدام هذا الكود بالفعل ولا يمكن تفعيله مرة أخرى." };
  if (accessCode.intendedStudentId && accessCode.intendedStudentId !== studentId) return { valid: false, message: "هذا الكود مخصص لحساب آخر ولا يمكن استخدامه هنا." };
  if (accessCode.expiresAt && new Date(accessCode.expiresAt) < new Date("2026-08-05")) return { valid: false, message: "انتهت صلاحية هذا الكود ولا يمكن تفعيله." };
  const entitlement = getPurchaseSummary(accessCode.courseId, accessCode.packageId);
  return entitlement ? { valid: true, message: "الكود صالح. راجعي المحتوى قبل التأكيد.", code: accessCode, entitlement } : { valid: false, message: "تعذر مطابقة الكود مع محتوى متاح." };
}

export const getStudentAccessData = () => ({ onlineEntitlements, paymentRequests, paymentDestinations, centerEnrollments, centerRequests, libraryItems });
export const getStudentPayment = (paymentId: string) => paymentRequests.find((item) => item.id === paymentId) ?? null;
