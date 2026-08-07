import { StudentAppShell } from "@/components/layouts/student-app-shell";
import { getCurrentSession } from "@/features/auth/services/auth-server";
import { isUnauthorized } from "@/lib/api/errors";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  try {
    session = await getCurrentSession();
  } catch (error) {
    if (isUnauthorized(error)) redirect("/login?reason=session");
    throw error;
  }
  if (session.role !== "STUDENT") redirect("/login?reason=role");
  const names = session.user.name.trim().split(/\s+/);
  const student = {
    id: session.user.id,
    firstName: names[0] ?? session.user.name,
    fullName: session.user.name,
    grade: session.user.studentProfile?.educationalGrade ?? "غير محدد",
    group: "لا توجد مجموعة سنتر معتمدة",
    avatarInitials: names.slice(0, 2).map((name) => name[0]).join(" "),
  };

  return (
    <StudentAppShell
      student={student}
      notifications={[]}
    >
      {children}
    </StudentAppShell>
  );
}
