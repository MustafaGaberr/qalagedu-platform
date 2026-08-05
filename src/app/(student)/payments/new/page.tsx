import type { Metadata } from "next";
import { PaymentEntryPage } from "@/features/student-access/components/access-pages";
import { getPurchaseSummary, getStudentAccessData } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "طلب دفع جديد" };
export default async function Page({ searchParams }: { searchParams: Promise<{ course?: string; package?: string; offer?: string }> }) { const params = await searchParams; const purchase = getPurchaseSummary(params.course, params.package ?? params.offer); return <PaymentEntryPage purchase={purchase} destinations={getStudentAccessData().paymentDestinations} />; }
