"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { InlineSpinner } from "@/components/shared/inline-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "@/features/auth/services/auth-service";
import { toApiError } from "@/lib/api/errors";
import { cn } from "@/lib/utils";

type LogoutButtonProps = { className?: string };
type LogoutConfirmationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LogoutConfirmation({ open, onOpenChange }: LogoutConfirmationProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  if (!open) return null;

  const submit = async () => {
    setPending(true);
    setError("");
    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch (reason) {
      const apiError = toApiError(reason);
      if (apiError.status === 401) {
        router.replace("/login?reason=session");
        router.refresh();
        return;
      }
      setError(apiError.message);
      setPending(false);
    }
  };

  return createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="logout-title" className="fixed inset-0 z-[100] grid place-items-center bg-foreground/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle id="logout-title">تأكيد تسجيل الخروج</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">سيتم إنهاء الجلسة الحالية على الخادم.</p>
          {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button disabled={pending} onClick={submit}>{pending ? <><InlineSpinner />جارٍ تسجيل الخروج...</> : <><LogOutIcon data-icon="inline-start" />تسجيل الخروج</>}</Button>
            <Button variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>إلغاء</Button>
          </div>
        </CardContent>
      </Card>
    </div>,
    document.body,
  );
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const [open, setOpen] = useState(false);
  return <><Button type="button" variant="outline" className={cn(className)} onClick={() => setOpen(true)}><LogOutIcon data-icon="inline-start" />تسجيل الخروج</Button><LogoutConfirmation open={open} onOpenChange={setOpen} /></>;
}
