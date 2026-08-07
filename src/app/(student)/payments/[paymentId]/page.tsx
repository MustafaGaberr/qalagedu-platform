import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentDetailsPage } from "@/features/student-access/components/access-pages";
import { PaymentTransferAction } from "@/features/student-access/components/payment-transfer-action";
import { getStudentPayment } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "تفاصيل طلب الدفع" };
export default async function Page({ params }: { params: Promise<{ paymentId: string }> }) { const { paymentId } = await params; let payment; try { payment=await getStudentPayment(paymentId); } catch { notFound(); } return <div className="space-y-5"><PaymentDetailsPage payment={payment} /><PaymentTransferAction payment={payment} /></div>; }
