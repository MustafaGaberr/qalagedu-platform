import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PaymentRequestForm } from "@/features/student-subscriptions/components/payment-request-form";
import { getAvailableSubscriptionOffers } from "@/features/student-subscriptions/services/student-subscriptions-service";
export const metadata: Metadata = { title: "طلب دفع جديد" };
export default async function Page({ searchParams }: { searchParams: Promise<{ offer?: string }> }) { const [offers, params]=await Promise.all([getAvailableSubscriptionOffers(),searchParams]); return <div className="flex flex-col gap-2"><PageHeader title="طلب مراجعة دفع" description="اختاري العرض ثم أضيفي بيانات التحويل الخارجي وإثباته لمعاينة الطلب."/><PaymentRequestForm offers={offers} defaultOfferId={params.offer}/></div>; }
