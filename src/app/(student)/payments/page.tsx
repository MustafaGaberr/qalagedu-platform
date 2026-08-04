import type { Metadata } from "next";
import { PaymentsPage } from "@/features/student-subscriptions/components/payments-page";
import { getStudentPayments } from "@/features/student-subscriptions/services/student-subscriptions-service";
export const metadata: Metadata = { title: "المدفوعات" };
export default async function Page() { return <PaymentsPage payments={await getStudentPayments()}/>; }
