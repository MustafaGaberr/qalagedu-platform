import type { Metadata } from "next";
import { PaymentEntryPage } from "@/features/student-access/components/access-pages";
import { getPaymentDestinations, getPurchaseSummary } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "طلب دفع جديد" };
export default async function Page({ searchParams }: { searchParams: Promise<{ course?: string; package?: string; offer?: string }> }) { const params = await searchParams; const packageId=params.package ?? params.offer; const purchase = await getPurchaseSummary(params.course, packageId); const destinations=packageId?await getPaymentDestinations(packageId):[]; return <PaymentEntryPage purchase={purchase} destinations={destinations} />; }
