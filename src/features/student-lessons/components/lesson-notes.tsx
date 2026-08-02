"use client";

import { useMemo, useState } from "react";
import { NotebookPenIcon } from "lucide-react";

type LessonNotesProps = {
  placeholder: string;
};

export function LessonNotes({ placeholder }: LessonNotesProps) {
  const [notes, setNotes] = useState("");
  const characterCount = useMemo(() => notes.trim().length, [notes]);

  return (
    <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <NotebookPenIcon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">ملاحظاتي</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            ملاحظات مؤقتة داخل الصفحة فقط، بدون حفظ دائم في هذه المرحلة.
          </p>
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder={placeholder}
        className="mt-4 min-h-36 w-full resize-y rounded-lg border bg-background px-3 py-3 text-sm leading-7 text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>سيتم ربط الحفظ الحقيقي لاحقا.</span>
        <span className="tabular-nums">{characterCount} حرف</span>
      </div>
    </section>
  );
}
