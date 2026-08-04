import { NotificationCenter } from "@/features/student-account/components/notification-center";
import { getStudentNotifications } from "@/features/student-account/services/account-service";

export default async function Page() {
  const notifications = await getStudentNotifications();

  return <NotificationCenter initialNotifications={notifications} />;
}
