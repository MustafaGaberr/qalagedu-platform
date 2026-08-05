import type { Metadata } from "next";
import { StudentSubscriptionsPage } from "@/features/student-access/components/access-pages";
import { getStudentAccessData } from "@/features/student-access/services/access-service";

export const metadata: Metadata = { title: "اشتراكاتي" };
export default function Page() { const { onlineEntitlements, paymentRequests } = getStudentAccessData(); return <StudentSubscriptionsPage entitlements={onlineEntitlements} payments={paymentRequests} />; }
