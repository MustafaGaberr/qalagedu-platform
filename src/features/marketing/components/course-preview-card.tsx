import Image from "next/image";
import { BookOpenIcon, UserRoundIcon } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CoursePreview } from "@/features/marketing/types/marketing";

type CoursePreviewCardProps = {
  course: CoursePreview;
};

export function CoursePreviewCard({ course }: CoursePreviewCardProps) {
  return (
    <Card className="h-full transition-colors hover:ring-primary/25 motion-reduce:transition-none">
      <Image
        src={course.image.src}
        alt={course.image.alt}
        width={640}
        height={360}
        priority
        className="aspect-[16/9] w-full bg-secondary object-cover"
      />
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={course.status === "available" ? "success" : "muted"}>
            {course.status === "available" ? "متاح قريبا للتسجيل" : "قريبا"}
          </StatusBadge>
          <span className="text-sm font-medium text-primary">
            {course.subject}
          </span>
        </div>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <UserRoundIcon aria-hidden="true" />
          <span>{course.teacher}</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpenIcon aria-hidden="true" />
          <span>
            {course.grade} · {course.lessons} درس
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm leading-6 text-muted-foreground">
          بطاقة تسويقية للمعاينة فقط، وليست صفحة دورة فعلية.
        </p>
      </CardFooter>
    </Card>
  );
}
