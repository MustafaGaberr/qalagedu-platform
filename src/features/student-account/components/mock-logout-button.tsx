"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { InlineSpinner } from "@/components/shared/inline-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
type MockLogoutButtonProps = { className?: string };
type MockLogoutConfirmationProps = { open: boolean; onOpenChange: (open: boolean) => void };
export function MockLogoutConfirmation({ open, onOpenChange }: MockLogoutConfirmationProps) { const router = useRouter(); const [pending, setPending] = useState(false); if (!open) return null; const logout = () => { setPending(true); router.push("/login"); }; return createPortal(<div role="dialog" aria-modal="true" aria-labelledby="mock-logout-title" className="fixed inset-0 z-[100] grid place-items-center bg-foreground/30 p-4"><Card className="w-full max-w-md"><CardHeader><CardTitle id="mock-logout-title">تأكيد تسجيل الخروج</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm leading-6 text-muted-foreground">هذه جلسة تجريبية؛ لن يتم إبطال أي جلسة حقيقية أو حذف بيانات محفوظة.</p><div className="flex flex-wrap gap-2"><Button disabled={pending} onClick={logout}>{pending ? <><InlineSpinner />جارٍ تسجيل الخروج...</> : <><LogOutIcon data-icon="inline-start" />الخروج إلى تسجيل الدخول</>}</Button><Button variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>إلغاء</Button></div></CardContent></Card></div>, document.body); }
export function MockLogoutButton({ className }: MockLogoutButtonProps) { const [open, setOpen] = useState(false); return <><Button type="button" variant="outline" className={cn(className)} onClick={() => setOpen(true)}><LogOutIcon data-icon="inline-start" />تسجيل الخروج</Button><MockLogoutConfirmation open={open} onOpenChange={setOpen} /></>; }
