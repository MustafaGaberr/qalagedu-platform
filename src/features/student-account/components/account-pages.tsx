"use client";
import Link from "next/link";
import { useState } from "react";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { StudentAccountNotification, StudentProfile } from "../types/account";
import { mockUpdateStudentProfile } from "../services/account-service";

export function ProfilePage({ initial }: { initial: StudentProfile }) {
 const [profile,setProfile]=useState(initial);const [editing,setEditing]=useState(false);const [message,setMessage]=useState("");
 async function save(){setProfile(await mockUpdateStudentProfile({fullName:profile.fullName,phone:profile.phone,email:profile.email,schoolName:profile.schoolName,address:profile.address}));setEditing(false);setMessage("تم تحديث المعاينة لهذه الجلسة فقط؛ الحفظ الدائم لاحقًا.");}
 return <div className="space-y-5"><Card><CardContent className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-semibold">{profile.fullName}</h1><p className="text-sm text-muted-foreground">{profile.studentCode} · {profile.grade} · {profile.primaryGroup}</p></div><Button variant="outline" render={<Link href="/student-card"/>} nativeButton={false}>بطاقة الطالب</Button></CardContent></Card><Card><CardHeader><CardTitle>البيانات الشخصية</CardTitle></CardHeader><CardContent className="space-y-3"><label>الاسم<Input disabled={!editing} value={profile.fullName} onChange={event=>setProfile({...profile,fullName:event.target.value})}/></label><label>الهاتف<Input disabled={!editing} value={profile.phone} onChange={event=>setProfile({...profile,phone:event.target.value})}/></label><label>البريد<Input disabled={!editing} value={profile.email??""} onChange={event=>setProfile({...profile,email:event.target.value})}/></label><p className="rounded-lg bg-secondary/50 p-3 text-sm">الكود والصف والمركز والمجموعة تضبطها الإدارة: {profile.centerName}</p>{message?<p role="status" className="text-primary">{message}</p>:null}<Button onClick={()=>editing?save():setEditing(true)}>{editing?"حفظ المعاينة":"تعديل"}</Button></CardContent></Card><Card><CardHeader><CardTitle>ولي الأمر</CardTitle></CardHeader><CardContent><p>{profile.guardian?.fullName} · {profile.guardian?.primaryPhone}</p><p className="mt-2 text-sm text-muted-foreground">تفضيلات التواصل وطلب تعديل الهوية سيكونان متصلين بالمركز لاحقًا.</p><Button className="mt-3" variant="outline" render={<Link href="/support"/>} nativeButton={false}>طلب تعديل بيانات ولي الأمر</Button></CardContent></Card></div>;
}

export function NotificationsPage({initial}:{initial:StudentAccountNotification[]}){
 const [query,setQuery]=useState("");const visible=initial.filter(item=>`${item.title} ${item.message}`.includes(query));
 return <div className="space-y-4"><div><h1 className="text-3xl font-semibold">الإشعارات</h1><p className="text-sm text-muted-foreground">{initial.filter(item=>!item.isRead).length} غير مقروءة. حالة القراءة مؤقتة في هذه المرحلة.</p></div><Input value={query} onChange={event=>setQuery(event.target.value)} placeholder="البحث في الإشعارات"/>{visible.map(item=><Card key={item.id}><CardContent className="flex gap-3"><BellIcon className="text-primary"/><div className="min-w-0 flex-1"><strong>{item.title}</strong><p className="text-sm text-muted-foreground">{item.message}</p><span className="text-xs text-muted-foreground">{item.isRead?"مقروء":"غير مقروء"}</span></div>{item.relatedRoute?<Button size="sm" render={<Link href={item.relatedRoute}/>} nativeButton={false}>{item.actionLabel??"عرض"}</Button>:null}</CardContent></Card>)}</div>;
}
