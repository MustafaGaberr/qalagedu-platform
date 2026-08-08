"use client";

import Link from "next/link";
import { BookOpenIcon, GraduationCapIcon, LoaderCircleIcon, PackageIcon, SearchIcon, StoreIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { apiRequest } from "@/lib/api/client";
import type { SearchResult } from "@/features/public-catalog/types/catalog";

const icons = { TEACHER: GraduationCapIcon, COURSE: BookOpenIcon, LESSON: PackageIcon, STORE_PRODUCT: StoreIcon };
const labels = { TEACHER: "مدرس", COURSE: "كورس", LESSON: "درس", STORE_PRODUCT: "متجر" };

export function PublicSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = query.trim();
    if (value.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void apiRequest<{ query: string; results: SearchResult[] }>(`catalog/search?q=${encodeURIComponent(value)}`, { signal: controller.signal })
        .then((data) => setResults(data.results))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 220);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  const changeQuery = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
  };

  return <Sheet open={open} onOpenChange={setOpen}><SheetTrigger render={<Button variant="ghost" size="icon" aria-label="البحث في المنصة" className="active:scale-95 md:h-10 md:w-56 md:justify-start md:border md:bg-background md:px-3" />}><SearchIcon /><span className="hidden text-muted-foreground md:inline">ابحث في المنصة</span></SheetTrigger><SheetContent side="top" className="max-h-[88svh] overflow-y-auto rounded-b-2xl"><SheetHeader className="mx-auto w-full max-w-2xl px-4 pt-5"><SheetTitle>ابحث في قلاّج</SheetTitle><SheetDescription>مدرسون وكورسات ودروس ومنتجات المتجر في مكان واحد.</SheetDescription></SheetHeader><div className="mx-auto w-full max-w-2xl px-4 pb-6"><div className="relative"><SearchIcon className="absolute start-3 top-3 size-4 text-muted-foreground" /><Input autoFocus value={query} onChange={(event) => changeQuery(event.target.value)} className="h-11 ps-10" placeholder="اكتب كلمتين على الأقل…" />{loading ? <LoaderCircleIcon className="absolute end-3 top-3 size-4 animate-spin text-primary" /> : null}</div><div className="mt-3 space-y-1">{results.map((result) => { const Icon = icons[result.kind]; return <Link key={`${result.kind}-${result.id}`} href={result.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[.99]"><span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block truncate font-medium">{result.title}</span><span className="block truncate text-xs text-muted-foreground">{labels[result.kind]} · {result.subtitle}</span></span></Link>; })}{query.trim().length >= 2 && !loading && !results.length ? <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">لا توجد نتائج مطابقة.</p> : null}</div></div></SheetContent></Sheet>;
}
