import type { Student, StudentNotification } from "@/features/student-dashboard/types/dashboard";

import { StudentMobileNavigation } from "./student-mobile-navigation";
import { StudentSidebar } from "./student-sidebar";
import { StudentTopbar } from "./student-topbar";

type StudentAppShellProps = {
  children: React.ReactNode;
  student: Student;
  notifications: StudentNotification[];
};

export function StudentAppShell({
  children,
  student,
  notifications,
}: StudentAppShellProps) {
  return (
    <div className="min-h-screen bg-secondary/35 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
      <StudentSidebar student={student} />
      <div className="flex min-w-0 flex-col">
        <StudentTopbar
          title="الرئيسية"
          student={student}
          notifications={notifications}
        />
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <div className="mx-auto w-full max-w-[92rem] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
        <StudentMobileNavigation />
      </div>
    </div>
  );
}
