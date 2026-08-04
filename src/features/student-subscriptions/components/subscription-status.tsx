import { AlertCircleIcon, CheckCircle2Icon, Clock3Icon, LockKeyholeIcon } from "lucide-react";
import { StatusBadge, type StatusBadgeStatus } from "@/components/shared/status-badge";
import type { AccessStatus, PaymentRequestStatus, SubscriptionStatus } from "../types/subscriptions";

const subscriptionMeta: Record<SubscriptionStatus, { label: string; tone: StatusBadgeStatus; icon: typeof CheckCircle2Icon }> = {
  active: { label: "نشط", tone: "success", icon: CheckCircle2Icon }, expiring_soon: { label: "يحتاج تجديد", tone: "warning", icon: Clock3Icon }, expired: { label: "منتهي", tone: "destructive", icon: LockKeyholeIcon }, pending_activation: { label: "بانتظار التفعيل", tone: "warning", icon: Clock3Icon }, pending_payment_review: { label: "قيد المراجعة", tone: "warning", icon: Clock3Icon }, suspended: { label: "موقوف", tone: "destructive", icon: LockKeyholeIcon }, completed: { label: "مكتمل", tone: "muted", icon: CheckCircle2Icon },
};
const paymentMeta: Record<PaymentRequestStatus, { label: string; tone: StatusBadgeStatus }> = { draft: { label: "مسودة", tone: "muted" }, pending_review: { label: "قيد المراجعة", tone: "warning" }, approved: { label: "مقبول تجريبيًا", tone: "success" }, rejected: { label: "مرفوض", tone: "destructive" }, requires_information: { label: "يحتاج معلومات", tone: "warning" }, cancelled: { label: "ملغي", tone: "muted" } };
const accessMeta: Record<AccessStatus, { label: string; tone: StatusBadgeStatus }> = { full_access: { label: "وصول كامل", tone: "success" }, limited_access: { label: "وصول محدود", tone: "warning" }, no_access: { label: "لا يوجد وصول", tone: "destructive" } };
export const SubscriptionStatusBadge = ({ status }: { status: SubscriptionStatus }) => { const meta = subscriptionMeta[status]; const Icon = meta.icon; return <StatusBadge status={meta.tone}><Icon aria-hidden="true" className="size-3" />{meta.label}</StatusBadge>; };
export const PaymentStatusBadge = ({ status }: { status: PaymentRequestStatus }) => { const meta = paymentMeta[status]; return <StatusBadge status={meta.tone}><AlertCircleIcon aria-hidden="true" className="size-3" />{meta.label}</StatusBadge>; };
export const AccessStatusBadge = ({ status }: { status: AccessStatus }) => { const meta = accessMeta[status]; return <StatusBadge status={meta.tone}>{meta.label}</StatusBadge>; };
export const formatDate = (value?: string) => value ? new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(new Date(value)) : "—";
export const maskValue = (value?: string) => !value ? "—" : value.length <= 4 ? "••••" : `${value.slice(0, 3)}••••${value.slice(-2)}`;
