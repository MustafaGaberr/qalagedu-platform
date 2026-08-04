"use client";
import Link from "next/link";
import { useState, useTransition } from "react";
import { CheckCircle2Icon, KeyRoundIcon, Loader2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockActivateStudentSubscription, validateStudentActivationCode } from "../services/student-subscriptions-service";
import type { ActivationCodeResult } from "../types/subscriptions";
import { formatDate } from "./subscription-status";

export function ActivationCodeForm({ studentName }: { studentName: string }) {
 const [code,setCode]=useState(""); const [result,setResult]=useState<ActivationCodeResult | null>(null); const [confirmed,setConfirmed]=useState(false); const [pending,startTransition]=useTransition();
 const validate=()=>startTransition(async()=>{setConfirmed(false);setResult(await validateStudentActivationCode(code));});
 const activate=()=>startTransition(async()=>{setResult(await mockActivateStudentSubscription(code));setConfirmed(true);});
 return <Card className="max-w-2xl"><CardHeader><CardTitle>استخدمي كود التفعيل</CardTitle><p className="text-sm leading-6 text-muted-foreground">اكتبي الكود كما وصلك من المركز. التحقق والتأكيد هنا تجريبيان ولا يتم حفظ الكود.</p></CardHeader><CardContent className="space-y-5"><div className="space-y-2"><label htmlFor="activation-code" className="text-sm font-medium">كود التفعيل</label><Input id="activation-code" value={code} onChange={(event)=>setCode(event.target.value)} placeholder="مثال: DEMO-ARABIC-2026" autoComplete="off" /><p className="text-xs text-muted-foreground">بيانات للعرض فقط: DEMO-ARABIC-2026</p></div><Button type="button" onClick={validate} disabled={!code.trim() || pending}>{pending?<Loader2Icon className="animate-spin" data-icon="inline-start"/>:<KeyRoundIcon data-icon="inline-start"/>}تحقق من الكود</Button>{result ? <Alert variant={result.status === "valid" ? "default" : "destructive"}><AlertTitle>{result.status === "valid" ? "الكود صالح للمعاينة" : "تعذر إكمال التحقق"}</AlertTitle><AlertDescription>{result.message}</AlertDescription></Alert> : null}{result?.status === "valid" && !confirmed ? <div className="rounded-lg border bg-secondary/45 p-4"><h2 className="font-semibold">تأكيد معاينة التفعيل</h2><dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">الطالب</dt><dd>{studentName}</dd></div><div><dt className="text-muted-foreground">الكورس</dt><dd>{result.courseTitle}</dd></div><div><dt className="text-muted-foreground">المدرس والمجموعة</dt><dd>{result.teacherName} · {result.groupName}</dd></div><div><dt className="text-muted-foreground">المدة والانتهاء</dt><dd>{result.durationLabel} · {formatDate(result.expiresAt)}</dd></div></dl><Button className="mt-4" onClick={activate} disabled={pending}>{pending?<Loader2Icon className="animate-spin" data-icon="inline-start"/>:<CheckCircle2Icon data-icon="inline-start"/>}تأكيد التفعيل التجريبي</Button></div> : null}{confirmed && result?.status === "valid" ? <Alert><CheckCircle2Icon/><AlertTitle>تم تأكيد التفعيل التجريبي</AlertTitle><AlertDescription>لن يُحفظ التغيير بعد التحديث أو إعادة تشغيل الخادم. سيُربط التفعيل الدائم لاحقًا.<div className="mt-3"><Button size="sm" render={<Link href="/subscriptions"/>} nativeButton={false}>العودة للاشتراكات</Button></div></AlertDescription></Alert> : null}</CardContent></Card>;
}
