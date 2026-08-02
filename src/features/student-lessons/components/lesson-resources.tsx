"use client";

import { useState } from "react";
import {
  DownloadIcon,
  EyeIcon,
  FileTextIcon,
  LockIcon,
  NotebookTextIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { LessonResource } from "@/features/student-lessons/types/lessons";

type LessonResourcesProps = {
  resources: LessonResource[];
};

const resourceIcon = {
  pdf: FileTextIcon,
  worksheet: NotebookTextIcon,
  summary: FileTextIcon,
  homework: NotebookTextIcon,
};

export function LessonResources({ resources }: LessonResourcesProps) {
  const [selectedResource, setSelectedResource] = useState<LessonResource | null>(
    null
  );

  return (
    <section className="rounded-lg border bg-card p-4 text-start shadow-sm shadow-foreground/5 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">ملفات الدرس</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            معاينة تجريبية للملفات بدون تحميل فعلي في هذه المرحلة.
          </p>
        </div>
        <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          {resources.length} ملفات
        </span>
      </div>
      {resources.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {resources.map((resource) => {
            const Icon = resourceIcon[resource.type];

            return (
              <article
                key={resource.id}
                className="grid gap-3 rounded-lg border bg-background p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <div className="flex min-w-0 gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold leading-6 text-foreground">
                        {resource.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {resource.typeLabel} - {resource.fileSize}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {resource.available
                        ? resource.description
                        : resource.unavailableReason}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!resource.available}
                    onClick={() => setSelectedResource(resource)}
                  >
                    {resource.available ? (
                      <EyeIcon data-icon="inline-start" />
                    ) : (
                      <LockIcon data-icon="inline-start" />
                    )}
                    معاينة
                  </Button>
                  <Button type="button" variant="secondary" disabled>
                    <DownloadIcon data-icon="inline-start" />
                    تحميل لاحقا
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 rounded-lg border bg-background p-4 text-sm leading-6 text-muted-foreground">
          لا توجد ملفات منشورة لهذا الدرس حاليا.
        </p>
      )}
      <Sheet
        open={Boolean(selectedResource)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedResource(null);
          }
        }}
      >
        <SheetContent side="left" className="overflow-y-auto sm:max-w-md">
          <SheetHeader className="text-start">
            <SheetTitle>{selectedResource?.title}</SheetTitle>
            <SheetDescription>
              معاينة PDF تجريبية فقط، والملف الحقيقي سيتم ربطه في مرحلة لاحقة.
            </SheetDescription>
          </SheetHeader>
          {selectedResource ? (
            <div className="mx-4 mb-4 rounded-lg border bg-background p-4 text-start">
              <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed bg-muted/40 p-5 text-center">
                <div>
                  <FileTextIcon
                    aria-hidden="true"
                    className="mx-auto size-10 text-primary"
                  />
                  <p className="mt-3 font-semibold text-foreground">
                    {selectedResource.typeLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {selectedResource.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {selectedResource.mockUrl}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </section>
  );
}
