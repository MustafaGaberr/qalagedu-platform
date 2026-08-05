import Image from "next/image";
import Link from "next/link";
import { BookOpenIcon, MapPinIcon, MonitorPlayIcon, UserRoundIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CoursePreview, PackageType } from "@/features/marketing/types/marketing";
import { cn } from "@/lib/utils";

const packageLabels: Record<PackageType, string> = { course: "كورس", lesson: "باقة حصة", monthly: "باقة شهرية", term: "باقة ترم", revision: "مراجعة نهائية" };

export function CoursePreviewCard({ course }: { course: CoursePreview }) {
  const deliveryLabel = course.delivery === "both" ? "أونلاين + سنتر" : course.delivery === "online" ? "أونلاين" : "في السنتر";
  const DeliveryIcon = course.delivery === "center" ? MapPinIcon : MonitorPlayIcon;
  return <Card className="h-full transition-colors hover:ring-primary/25 motion-reduce:transition-none"><Image src={course.image.src} alt={course.image.alt} width={640} height={360} className="aspect-[16/9] w-full bg-secondary object-cover" /><CardHeader><div className="flex items-center justify-between gap-3 text-sm"><span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">{packageLabels[course.packageType]}</span><span className="text-primary">{course.subject}</span></div><CardTitle className="mt-2 text-lg">{course.title}</CardTitle></CardHeader><CardContent className="flex flex-col gap-2.5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><UserRoundIcon aria-hidden="true" />{course.teacher}</span><span className="flex items-center gap-2"><BookOpenIcon aria-hidden="true" />{course.grade}{course.lessonCount ? ` · ${course.lessonCount} درس` : ""}</span><span className="flex items-center gap-2"><DeliveryIcon aria-hidden="true" />{deliveryLabel}</span></CardContent><CardFooter className="mt-auto justify-between gap-3"><div><strong className="text-base text-foreground">{course.price}</strong>{course.previousPrice ? <span className="me-2 text-xs text-muted-foreground line-through">{course.previousPrice}</span> : null}</div><Link href={course.href} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}>التفاصيل</Link></CardFooter></Card>;
}
