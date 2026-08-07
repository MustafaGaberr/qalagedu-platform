export type ApiErrorPayload = {
  statusCode?: number;
  code?: string;
  message?: string | string[];
  details?: unknown;
  requestId?: string;
};

const codeMessages: Record<string, string> = {
  INVALID_CREDENTIALS: "بيانات تسجيل الدخول غير صحيحة.",
  SESSION_NOT_FOUND: "انتهت الجلسة أو تم تسجيل الدخول من جهاز آخر.",
  SESSION_EXPIRED: "انتهت صلاحية الجلسة. سجّل الدخول مرة أخرى.",
  SESSION_REVOKED: "تم إنهاء هذه الجلسة. سجّل الدخول مرة أخرى.",
  CSRF_TOKEN_INVALID: "تعذر تأكيد أمان الطلب. حدّث الصفحة وحاول مرة أخرى.",
  CSRF_ORIGIN_REJECTED: "تعذر تنفيذ الطلب من هذا العنوان.",
  COURSE_NOT_FOUND: "الكورس المطلوب غير موجود.",
  PACKAGE_NOT_FOUND: "الباقة المطلوبة غير متاحة.",
  PAYMENT_DESTINATION_NOT_FOUND: "وجهة الدفع المختارة غير متاحة.",
  PAYMENT_REQUEST_NOT_FOUND: "طلب الدفع غير موجود.",
  PAYMENT_TRANSITION_INVALID: "لا يمكن تنفيذ هذه الخطوة على طلب الدفع بحالته الحالية.",
  COUPON_NOT_FOUND: "الكوبون غير صالح.",
  COUPON_STUDENT_MISMATCH: "هذا الكوبون مخصص لحساب طالب آخر.",
  COUPON_ALREADY_REDEEMED: "تم استخدام هذا الكوبون من قبل.",
  COUPON_EXPIRED: "انتهت صلاحية هذا الكوبون.",
  ACCESS_CODE_STUDENT_MISMATCH: "هذا الكود مخصص لحساب طالب آخر.",
  ACCESS_CODE_ALREADY_REDEEMED: "تم استخدام هذا الكود من قبل.",
  ACCESS_CODE_EXPIRED: "انتهت صلاحية هذا الكود.",
  LESSON_ACCESS_DENIED: "هذا الدرس غير مشمول في وصولك الحالي.",
  LESSON_NOT_FOUND: "الدرس المطلوب غير موجود.",
  EXAM_NOT_ASSIGNED: "هذا الاختبار غير مخصص لحسابك.",
  EXAM_NOT_AVAILABLE: "الاختبار غير متاح في الوقت الحالي.",
  MAX_ATTEMPTS_REACHED: "استخدمت جميع المحاولات المتاحة.",
  ATTEMPT_NOT_EDITABLE: "تم تسليم المحاولة أو انتهى وقتها.",
  RESULT_NOT_RELEASED: "لم يتم نشر هذه النتيجة بعد.",
  QALAGEDU_API_URL_MISSING: "عنوان خادم المنصة غير مضبوط.",
};

const statusMessages: Record<number, string> = {
  400: "تحقق من البيانات المدخلة وحاول مرة أخرى.",
  401: "انتهت الجلسة. سجّل الدخول مرة أخرى.",
  403: "ليس لديك صلاحية لتنفيذ هذا الإجراء.",
  404: "المحتوى المطلوب غير موجود.",
  409: "لا يمكن تنفيذ الإجراء بالحالة الحالية.",
  422: "بعض البيانات المدخلة غير صالحة.",
  429: "تمت محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.",
  500: "حدث عطل مؤقت في الخادم. حاول لاحقًا.",
  502: "خادم المنصة غير متاح حاليًا.",
  503: "خادم المنصة غير متاح حاليًا.",
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;
  readonly requestId?: string;

  constructor(payload: ApiErrorPayload = {}, fallbackStatus = 0) {
    const status = payload.statusCode ?? fallbackStatus;
    const code = payload.code ?? (status ? `HTTP_${status}` : "NETWORK_ERROR");
    super(
      codeMessages[code] ??
        statusMessages[status] ??
        (status === 0
          ? "تعذر الاتصال بخادم المنصة. تحقق من الاتصال وحاول مرة أخرى."
          : "تعذر إكمال الطلب. حاول مرة أخرى."),
    );
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = payload.details;
    this.requestId = payload.requestId;
  }
}

export function toApiError(error: unknown) {
  if (error instanceof ApiError) return error;
  if (error instanceof Error && error.message === "QALAGEDU_API_URL_MISSING") {
    return new ApiError({ code: error.message });
  }
  return new ApiError();
}

export function isUnauthorized(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}
