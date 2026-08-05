import Link from "next/link";
import { CalendarDaysIcon, MonitorPlayIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TeacherPreview } from "@/features/marketing/types/marketing";
import { cn } from "@/lib/utils";

export function TeacherPreviewCard({ teacher }: { teacher: TeacherPreview }) {
  const availability = teacher.availability === "both" ? "أونلاين وفي السنتر" : teacher.availability === "online" ? "أونلاين" : "في السنتر";
  return <Card className="h-full"><CardContent className="flex h-full flex-col items-start gap-4 py-1"><div className="flex w-full items-center gap-3"><Avatar size="lg"><AvatarFallback>{teacher.initials}</AvatarFallback></Avatar><div><h3 className="font-semibold text-foreground">{teacher.name}</h3><p className="text-sm text-primary">{teacher.subject}</p></div></div><p className="text-sm leading-6 text-muted-foreground">{teacher.grades}</p><p className="inline-flex items-center gap-2 text-sm text-muted-foreground"><MonitorPlayIcon aria-hidden="true" />{availability}</p><div className="mt-auto flex w-full flex-wrap gap-2"><Link href={teacher.courseHref} className={cn(buttonVariants({ size: "sm" }), "flex-1")}>كورسات المدرس</Link>{teacher.scheduleHref ? <Link href={teacher.scheduleHref} className={buttonVariants({ variant: "outline", size: "sm" })}><CalendarDaysIcon aria-hidden="true" /><span className="sr-only">مواعيد السنتر</span></Link> : null}</div></CardContent></Card>;
}
