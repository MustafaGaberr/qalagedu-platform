"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { Container } from "@/components/shared/container";
import { Button, buttonVariants } from "@/components/ui/button";
import type { HeroBanner } from "@/features/marketing/types/marketing";
import { cn } from "@/lib/utils";

const rotationMs = 6500;

export function HeroSlider({ banners }: { banners: HeroBanner[] }) {
  const activeBanners = React.useMemo(() => banners.filter((banner) => banner.active).sort((a, b) => a.order - b.order), [banners]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const goTo = React.useCallback((index: number) => setActiveIndex((index + activeBanners.length) % activeBanners.length), [activeBanners.length]);
  const next = React.useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = React.useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  React.useEffect(() => {
    if (paused || activeBanners.length < 2) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;
    const timer = window.setInterval(next, rotationMs);
    return () => window.clearInterval(timer);
  }, [activeBanners.length, next, paused]);

  if (!activeBanners.length) return null;
  const activeBanner = activeBanners[activeIndex] ?? activeBanners[0];

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b bg-primary sm:min-h-[calc(100svh-4.5rem)]" aria-roledescription="carousel" aria-label="عروض قلاّج التعليمية" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; setPaused(true); }} onTouchEnd={(event) => { const start = touchStartX.current; const end = event.changedTouches[0]?.clientX; if (start !== null && end !== undefined && Math.abs(start - end) > 40) goTo(start > end ? activeIndex + 1 : activeIndex - 1); touchStartX.current = null; }}>
      {activeBanners.map((banner, index) => (
        <picture key={banner.id} className={cn("absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none", index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0")}>
          <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
          <Image src={banner.desktopImage} alt={index === activeIndex ? banner.imageAlt : ""} fill priority={index === 0} sizes="100vw" className="object-cover" style={{ objectPosition: banner.focalPosition }} />
        </picture>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--foreground)_82%,transparent),color-mix(in_oklch,var(--foreground)_48%,transparent)_50%,color-mix(in_oklch,var(--foreground)_24%,transparent))]" />
      <Container size="wide" className="relative flex min-h-[calc(100svh-4rem)] items-end py-10 sm:min-h-[calc(100svh-4.5rem)] sm:items-center sm:py-16">
        <div className={cn("max-w-2xl text-primary-foreground", activeBanner.textPlacement === "center" && "mx-auto text-center")}>
          <p className="text-sm font-semibold tracking-wide text-primary-foreground/80">قلاّج للتعليم</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.2] sm:text-5xl lg:text-6xl">{activeBanner.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/85 sm:text-xl">{activeBanner.description}</p>
          <Link href={activeBanner.ctaHref} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-7 shadow-lg shadow-foreground/20")}>
            {activeBanner.ctaLabel}<ArrowUpLeftIcon data-icon="inline-end" />
          </Link>
        </div>
      </Container>
      {activeBanners.length > 1 ? <div className="absolute inset-x-0 bottom-5 z-10"><Container size="wide" className="flex items-center justify-between gap-4"><div className="flex gap-2" role="tablist" aria-label="اختيار العرض">{activeBanners.map((banner, index) => <button key={banner.id} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`عرض ${index + 1}: ${banner.title}`} onClick={() => { goTo(index); setPaused(true); }} className={cn("h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-foreground/60 motion-reduce:transition-none", index === activeIndex ? "w-8 bg-primary-foreground" : "w-2.5 bg-primary-foreground/55 hover:bg-primary-foreground/80")} />)}</div><div className="flex gap-2"><Button type="button" variant="secondary" size="icon-sm" aria-label="العرض السابق" onClick={() => { previous(); setPaused(true); }}><ChevronRightIcon aria-hidden="true" /></Button><Button type="button" variant="secondary" size="icon-sm" aria-label="العرض التالي" onClick={() => { next(); setPaused(true); }}><ChevronLeftIcon aria-hidden="true" /></Button></div></Container></div> : null}
    </section>
  );
}
