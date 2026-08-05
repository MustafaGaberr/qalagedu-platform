"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function isInternalNavigation(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return false;
  const target = new URL(anchor.href, window.location.href);
  return target.origin === window.location.origin && target.pathname + target.search !== window.location.pathname + window.location.search;
}

function RouteNavigationFeedback() {
  const [pending, setPending] = useState(false);
  useEffect(() => {
    let clearTimer: number | undefined;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || !isInternalNavigation(anchor, event)) return;
      if (pending) { event.preventDefault(); return; }
      setPending(true);
      clearTimer = window.setTimeout(() => setPending(false), 10000);
    };
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("click", onClick, true); if (clearTimer) window.clearTimeout(clearTimer); };
  }, [pending]);
  return <div aria-hidden="true" className={pending ? "pointer-events-none fixed inset-x-0 top-0 z-[150] h-1 overflow-hidden bg-primary/15" : "hidden"}><span className="block h-full w-2/5 animate-[navigation-progress_1.2s_ease-in-out_infinite] bg-primary motion-reduce:animate-none" /></div>;
}

export function NavigationFeedback() { const pathname = usePathname(); return <RouteNavigationFeedback key={pathname} />; }
