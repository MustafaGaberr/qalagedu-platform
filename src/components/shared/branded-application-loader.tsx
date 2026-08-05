"use client";

import { useEffect, useState } from "react";
import { AppLogo } from "@/components/shared/app-logo";
import { InlineSpinner } from "@/components/shared/inline-spinner";

/** Shown once per full application visit; route changes use compact feedback instead. */
export function BrandedApplicationLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 800); return () => window.clearTimeout(timer); }, []);
  if (!visible) return null;
  return <div className="fixed inset-0 z-[200] grid place-items-center bg-background" role="status" aria-live="polite" aria-label="جارٍ تحميل المنصة"><div className="flex flex-col items-center gap-4"><AppLogo size="lg" /><div className="flex items-center gap-2 text-sm text-muted-foreground"><InlineSpinner /><span>جارٍ تحميل المنصة</span></div></div></div>;
}
