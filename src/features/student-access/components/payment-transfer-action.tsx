"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { submitPaymentTransfer } from "../services/access-client";
import { toApiError } from "@/lib/api/errors";
import type { PaymentRequest } from "../types/access";

export function PaymentTransferAction({ payment }: { payment: PaymentRequest }) {
  const router = useRouter();
  const [reference, setReference] = useState(payment.studentTransferReference ?? "");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  if (!["AWAITING_TRANSFER", "REQUIRES_INFORMATION"].includes(payment.status)) return null;

  const submit = async () => {
    setPending(true);
    setMessage("");
    try {
      await submitPaymentTransfer(payment.id, reference);
      setMessage("تم إرسال بيانات التحويل للمراجعة. لا يعني ذلك الموافقة على الدفع.");
      router.refresh();
    } catch (error) {
      setMessage(toApiError(error).message);
    } finally {
      setPending(false);
    }
  };

  return <Card className="max-w-3xl"><CardHeader><CardTitle>إرسال بيانات التحويل للمراجعة</CardTitle></CardHeader><CardContent className="space-y-3"><label className="block text-sm font-medium">رقم العملية الخارجي إن وُجد<Input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="اختياري" /></label><p className="text-sm text-muted-foreground">ترفع هذه الخطوة حالة الطلب إلى قيد المراجعة فقط؛ الموافقة تأتي من فريق الإدارة عبر الخادم.</p>{message?<p role="status" className="text-sm text-primary">{message}</p>:null}<Button disabled={pending} onClick={submit}>{pending?"جارٍ الإرسال…":"إرسال للمراجعة"}</Button></CardContent></Card>;
}
