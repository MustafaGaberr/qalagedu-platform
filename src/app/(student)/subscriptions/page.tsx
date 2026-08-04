import type { Metadata } from "next";
import { SubscriptionsPage } from "@/features/student-subscriptions/components/subscriptions-page";
import { getAvailableSubscriptionOffers, getStudentSubscriptions } from "@/features/student-subscriptions/services/student-subscriptions-service";
export const metadata: Metadata = { title: "الاشتراكات" };
export default async function Page() { const [subscriptions, offers] = await Promise.all([getStudentSubscriptions(),getAvailableSubscriptionOffers()]); return <SubscriptionsPage subscriptions={subscriptions} offers={offers}/>; }
