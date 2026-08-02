import Link from "next/link";
import { FileQuestionIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function ResultNotFound() {
  return (
    <EmptyState
      icon={FileQuestionIcon}
      title="النتيجة غير موجودة"
      description="ربما تم تحديث رابط المحاولة أو أن النتيجة التجريبية المؤقتة لم تعد موجودة."
      action={
        <Button render={<Link href="/results" />} nativeButton={false}>
          العودة إلى النتائج
        </Button>
      }
    />
  );
}
