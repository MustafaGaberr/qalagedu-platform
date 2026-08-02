import Link from "next/link";
import { BookXIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function CourseNotFound() {
  return (
    <EmptyState
      icon={BookXIcon}
      title="الكورس غير موجود"
      description="ربما تم تغيير رابط الكورس أو أنه غير مسجل ضمن كورسات هذا الطالب التجريبية."
      action={
        <Button render={<Link href="/courses" />} nativeButton={false}>
          العودة إلى كورساتي
        </Button>
      }
    />
  );
}
