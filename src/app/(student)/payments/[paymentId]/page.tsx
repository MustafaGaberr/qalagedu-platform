import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentDetailsPage } from "@/features/student-access/components/access-pages";
import { getStudentAccessData, getStudentPayment } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "تفاصيل طلب الدفع" };
export default async function Page({ params }: { params: Promise<{ paymentId: string }> }) { const { paymentId } = await params; const payment = getStudentPayment(paymentId); if (!payment) notFound(); return <PaymentDetailsPage payment={payment} destination={getStudentAccessData().paymentDestinations.find((item) => item.id === payment.destinationId)} />; }
