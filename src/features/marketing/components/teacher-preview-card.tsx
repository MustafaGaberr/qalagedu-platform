import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { TeacherPreview } from "@/features/marketing/types/marketing";

type TeacherPreviewCardProps = {
  teacher: TeacherPreview;
};

export function TeacherPreviewCard({ teacher }: TeacherPreviewCardProps) {
  return (
    <Card size="sm" className="transition-colors hover:ring-primary/20 motion-reduce:transition-none">
      <CardContent className="flex items-start gap-4 py-2">
        <Avatar size="lg">
          <AvatarFallback>{teacher.initials}</AvatarFallback>
        </Avatar>
        <div className="text-start">
          <h3 className="text-base font-semibold text-foreground">{teacher.name}</h3>
          <p className="mt-1 text-sm text-primary">{teacher.subject}</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">
            {teacher.bio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
