import Link from "next/link";
import { FileQuestionIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function ExamNotFound() {
  return (
    <EmptyState
      icon={FileQuestionIcon}
      title="الاختبار غير موجود"
      description="ربما تغير رابط الاختبار أو أنه غير منشور ضمن بيانات الطالب التجريبية."
      action={
        <Button render={<Link href="/exams" />} nativeButton={false}>
          العودة إلى الاختبارات
        </Button>
      }
    />
  );
}
