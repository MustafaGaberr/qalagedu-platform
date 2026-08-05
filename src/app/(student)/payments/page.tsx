import type { Metadata } from "next";
import { PaymentsPage } from "@/features/student-access/components/access-pages";
import { getStudentAccessData } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "طلبات الدفع" };
export default function Page() { const { paymentRequests, paymentDestinations } = getStudentAccessData(); return <PaymentsPage payments={paymentRequests} destinations={paymentDestinations} />; }
