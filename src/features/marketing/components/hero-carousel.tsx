"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpLeftIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  id: string;
  badge?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  imageAlt: string;
  teacherName?: string;
  teacherSubject?: string;
  teacherInitials?: string;
  teacherPhotoUrl?: string;
};

const rotationMs = 6500;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const active = slides.length ? activeIndex % slides.length : 0;

  const goTo = useCallback((index: number) => {
    if (!slides.length) return;
    setActiveIndex((index + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    if (slides.length < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(next, rotationMs);
    return () => window.clearInterval(timer);
  }, [next, paused, slides.length]);

  if (!slides.length) return <HeroEmptyState />;

  const selectSlide = (index: number) => {
    setPaused(true);
    goTo(index);
  };

  return (
    <section
      aria-roledescription="عرض شرائح"
      aria-label="أهم محتوى المنصة"
      className="relative isolate min-h-[calc(100dvh-3.5rem)] overflow-hidden bg-primary text-primary-foreground sm:min-h-[calc(100dvh-4rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          selectSlide(active + 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          selectSlide(active - 1);
        }
      }}
      onPointerDown={(event) => { pointerStart.current = event.clientX; }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(distance) > 48) selectSlide(active + (distance > 0 ? 1 : -1));
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
            index === active ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {slide.imageUrl || slide.teacherPhotoUrl ? (
            <picture className="absolute inset-0 block">
              {slide.mobileImageUrl ? <source media="(max-width: 767px)" srcSet={slide.mobileImageUrl} /> : null}
              <Image
                src={slide.imageUrl ?? slide.teacherPhotoUrl!}
                alt={index === active ? slide.imageAlt : ""}
                fill
                priority={index === 0}
                loading="eager"
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="100vw"
                className="object-cover object-center"
                unoptimized
              />
            </picture>
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,.22),transparent_34%),linear-gradient(145deg,var(--primary),color-mix(in_oklch,var(--primary)_72%,black))]">
              <div className="flex size-44 items-center justify-center rounded-full border border-white/20 bg-white/10 text-5xl font-black shadow-2xl backdrop-blur-sm sm:size-56">
                {slide.teacherInitials ?? <BookOpenIcon className="size-20" />}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,28,22,.9),rgba(4,28,22,.68)_48%,rgba(4,28,22,.18))] max-md:bg-[linear-gradient(0deg,rgba(4,28,22,.94),rgba(4,28,22,.52)_58%,rgba(4,28,22,.12))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(10,126,90,.3),transparent_38%)]" />

      <Container size="wide" className="relative flex min-h-[calc(100dvh-3.5rem)] items-end pb-24 pt-28 sm:min-h-[calc(100dvh-4rem)] sm:items-center sm:pb-28 sm:pt-24">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="شريحة"
            aria-label={`${index + 1} من ${slides.length}`}
            aria-hidden={index !== active}
            className={cn(
              "w-full max-w-3xl transition duration-500 motion-reduce:transition-none",
              index === active ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-4 opacity-0",
            )}
          >
            {slide.badge ? <p className="text-sm font-bold text-primary-foreground/78 sm:text-base">{slide.badge}</p> : null}
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-black leading-[1.18] tracking-tight sm:text-5xl lg:text-7xl">{slide.title}</h1>
            {slide.description ? <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-primary-foreground/82 sm:text-lg lg:text-xl">{slide.description}</p> : null}
            {slide.teacherName ? <p className="mt-4 text-sm font-bold text-primary-foreground/75">{slide.teacherName}{slide.teacherSubject ? ` · ${slide.teacherSubject}` : ""}</p> : null}
            {slide.ctaLabel && slide.ctaUrl ? (
              <Link href={slide.ctaUrl} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-7 min-h-12 px-6 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 focus-visible:ring-white/70 active:translate-y-0 active:scale-[.98] motion-reduce:transform-none")}>
                {slide.ctaLabel}<ArrowUpLeftIcon data-icon="inline-end" />
              </Link>
            ) : null}
          </div>
        ))}
      </Container>

      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-5 z-20 sm:bottom-7">
          <Container size="wide" className="flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="اختيار الشريحة">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`عرض الشريحة ${index + 1}: ${slide.title}`}
                  onClick={() => selectSlide(index)}
                  className={cn("h-2.5 rounded-full bg-white/50 transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/70 active:scale-90 motion-reduce:transition-none", index === active ? "w-9 bg-white" : "w-2.5")}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => selectSlide(active - 1)} aria-label="الشريحة السابقة" className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/25 transition hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/70 active:scale-95 motion-reduce:transition-none"><ChevronRightIcon className="size-5" /></button>
              <button type="button" onClick={() => selectSlide(active + 1)} aria-label="الشريحة التالية" className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/25 transition hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/70 active:scale-95 motion-reduce:transition-none"><ChevronLeftIcon className="size-5" /></button>
            </div>
          </Container>
        </div>
      ) : null}
    </section>
  );
}

function HeroEmptyState() {
  return (
    <section className="relative isolate min-h-[calc(100dvh-3.5rem)] overflow-hidden bg-primary text-primary-foreground sm:min-h-[calc(100dvh-4rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,.16),transparent_32%),linear-gradient(145deg,var(--primary),color-mix(in_oklch,var(--primary)_68%,black))]" />
      <Container size="wide" className="relative flex min-h-[calc(100dvh-3.5rem)] items-center py-16 sm:min-h-[calc(100dvh-4rem)]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-primary-foreground/70">منصة قلاّج التعليمية</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.2] sm:text-6xl">مسارك الدراسي في مكان واحد</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-primary-foreground/80 sm:text-lg">استعرض المدرسين والكورسات والمراجعات المتاحة، واختر طريقة التعلّم المناسبة لك.</p>
          <Link href="/courses" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-7 min-h-12")}>استعرض الكورسات<ArrowUpLeftIcon /></Link>
        </div>
      </Container>
    </section>
  );
}
