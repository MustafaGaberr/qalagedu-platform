import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicCourse, getPublicTeacher } from "@/features/public-catalog/services/catalog-service";

export async function CenterPreferenceSummary({ preference }: { preference: { grade?: string; teacher?: string; course?: string; group?: string } }) {
  if (!preference.course && !preference.teacher) return null;
  const course = preference.course ? await getPublicCourse(preference.course) : undefined;
  const teacher = preference.teacher ? await getPublicTeacher(preference.teacher) : undefined;
  const group = course?.groups.find((item) => item.id === preference.group);
  return <Card className="mb-6 border-primary/25"><CardHeader><CardTitle>أفضلية الانضمام للسنتر</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>{course?.grade ?? "سيُختار الصف أثناء التسجيل"}</p><p>{teacher?.name ?? "سيُراجع المدرس مع الإدارة"}{course ? ` · ${course.subject}` : ""}</p>{group ? <p>{group.days} · {group.startTime} · {group.room}</p> : null}<p className="mt-3 flex gap-2 rounded-lg bg-secondary/55 p-3 leading-6 text-muted-foreground"><InfoIcon className="mt-1 size-4 shrink-0 text-primary" />هذه أفضلية فقط. بعد تسجيل الدخول يمكنك إرسال طلب السنتر ومتابعة حالته، والانضمام للسنتر لا يفتح فيديوهات الأونلاين.</p></CardContent></Card>;
}
