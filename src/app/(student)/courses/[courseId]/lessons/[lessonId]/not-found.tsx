import Link from "next/link";
import { FileQuestionIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function LessonNotFound() {
  return (
    <EmptyState
      icon={FileQuestionIcon}
      title="الدرس غير موجود"
      description="ربما تم تغيير رابط الدرس أو أن الدرس لا ينتمي إلى هذا الكورس في البيانات التجريبية."
      action={
        <Button render={<Link href="/courses" />} nativeButton={false}>
          العودة إلى كورساتي
        </Button>
      }
    />
  );
}
