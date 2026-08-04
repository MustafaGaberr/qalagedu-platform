export type SubscriptionStatus =
  | "active"
  | "expiring_soon"
  | "expired"
  | "pending_activation"
  | "pending_payment_review"
  | "suspended"
  | "completed";

export type AccessStatus = "full_access" | "limited_access" | "no_access";
export type BillingType = "monthly" | "term" | "course" | "custom";
export type ActivationCodeStatus =
  | "valid"
  | "invalid"
  | "expired"
  | "already_used"
  | "course_mismatch"
  | "account_review_required";
export type PaymentRequestStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "rejected"
  | "requires_information"
  | "cancelled";

export type StudentSubscription = {
  id: string;
  studentId: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  teacherName: string;
  grade: string;
  groupName: string;
  status: SubscriptionStatus;
  billingType: BillingType;
  startedAt?: string;
  expiresAt?: string;
  daysRemaining?: number;
  price: number;
  currency: string;
  progress: number;
  accessStatus: AccessStatus;
  latestPaymentId?: string;
  renewalAvailable: boolean;
  renewalMessage: string;
  includedFeatures: string[];
};

export type SubscriptionOffer = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  durationLabel: string;
  price: number;
  currency: string;
  originalPrice?: number;
  features: string[];
  recommended: boolean;
  available: boolean;
  groupName: string;
  teacherName: string;
};

export type ActivationCodeResult = {
  status: ActivationCodeStatus;
  message: string;
  courseId?: string;
  courseTitle?: string;
  teacherName?: string;
  groupName?: string;
  durationLabel?: string;
  expiresAt?: string;
  activationPreview?: string;
};

export type PaymentRequest = {
  id: string;
  studentId: string;
  subscriptionId?: string;
  offerId?: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  paymentMethod: "vodafone_cash";
  senderPhone: string;
  transactionReference?: string;
  proofFileName?: string;
  proofFileSize?: number;
  submittedAt: string;
  reviewedAt?: string;
  status: PaymentRequestStatus;
  reviewNote?: string;
  note?: string;
};

export type CreatePaymentRequestInput = Omit<
  PaymentRequest,
  "id" | "studentId" | "submittedAt" | "status"
>;

export interface StudentSubscriptionsRepository {
  getSubscriptions(): Promise<StudentSubscription[]>;
  getSubscriptionOffers(): Promise<SubscriptionOffer[]>;
  getSubscriptionById(subscriptionId: string): Promise<StudentSubscription | null>;
  validateActivationCode(code: string): Promise<ActivationCodeResult>;
  activateWithCode(code: string): Promise<ActivationCodeResult>;
  getPayments(): Promise<PaymentRequest[]>;
  getPaymentById(paymentId: string): Promise<PaymentRequest | null>;
  createPaymentRequest(input: CreatePaymentRequestInput): Promise<PaymentRequest>;
}
