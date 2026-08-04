import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentDetails } from "@/features/student-subscriptions/components/payment-details";
import { getStudentPaymentById } from "@/features/student-subscriptions/services/student-subscriptions-service";
export const metadata: Metadata = { title: "تفاصيل طلب الدفع" };
export default async function Page({ params }: { params: Promise<{ paymentId: string }> }) { const {paymentId}=await params;const payment=await getStudentPaymentById(paymentId);if(!payment)notFound();return <PaymentDetails payment={payment}/>; }
