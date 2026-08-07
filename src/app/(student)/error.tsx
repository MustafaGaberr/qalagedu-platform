"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl p-5">
      <Card>
        <CardHeader><CardTitle>تعذر تحميل بيانات حسابك</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">خادم المنصة غير متاح حاليًا أو تعذر إكمال الطلب. لم يتم عرض أي تفاصيل تقنية.</p>
          <Button onClick={reset}>إعادة المحاولة</Button>
        </CardContent>
      </Card>
    </div>
  );
}
