import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpLeftIcon,
  BookOpenCheckIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  Clock3Icon,
  FileCheck2Icon,
  Layers3Icon,
  MapPinIcon,
  MonitorPlayIcon,
  PackageCheckIcon,
  PlayCircleIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StoreIcon,
  UsersIcon,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import type { WebsiteSection } from "@/features/public-catalog/services/catalog-service";
import type { AccessPackage, CatalogCourse, CatalogTeacher, CenterGroup, StoreProduct } from "@/features/public-catalog/types/catalog";
import { cn } from "@/lib/utils";
import { GradePathsSection } from "./grade-paths-section";
import { HeroCarousel, type HeroSlide } from "./hero-carousel";

type Props = { sections: WebsiteSection[]; teachers: CatalogTeacher[]; courses: CatalogCourse[]; products: StoreProduct[] };
type Revision = AccessPackage & { course: CatalogCourse };

const benefitItems = [
  { title: "شرح منظم", description: "محتوى مرتب داخل وحدات ودروس واضحة.", icon: BookOpenCheckIcon },
  { title: "تعلّم آمن", description: "مشاهدة الدروس من داخل حسابك على المنصة.", icon: ShieldCheckIcon },
  { title: "اختيارات مرنة", description: "أونلاين أو سنتر وفق المتاح لكل كورس.", icon: MonitorPlayIcon },
  { title: "مراجعة مستمرة", description: "باقات واختبارات وملفات مرتبطة بدراستك.", icon: FileCheck2Icon },
] as const;

const gradeLabels = ["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"];

export function MobileLandingPage({ sections, teachers, courses, products }: Props) {
  const orderedSections = [...sections].sort((a, b) => a.position - b.position);
  const heroes = orderedSections.filter((section) => section.type === "HERO_BANNER");
  const teacherSection = firstSection(orderedSections, "FEATURED_TEACHERS");
  const courseSection = firstSection(orderedSections, "FEATURED_COURSES");
  const revisionSection = firstSection(orderedSections, "FINAL_REVISIONS");
  const storeSection = firstSection(orderedSections, "STORE_HIGHLIGHTS");
  const testimonials = orderedSections.filter((section) => section.type === "TESTIMONIALS");
  const faqs = orderedSections.filter((section) => section.type === "NEWS");
  const finalCta = firstSection(orderedSections, "CTA");
  const revisions: Revision[] = courses.flatMap((course) => course.packages.filter((item) => item.type === "FINAL_REVISION").map((item) => ({ ...item, course })));
  const featuredCourses = selectFeaturedCourses(courses, orderedSections.filter((section) => section.type === "FEATURED_COURSES"));
  const groups = courses.flatMap((course) => course.groups.map((group) => ({ group, course })));

  return (
    <main>
      <HeroCarousel slides={toHeroSlides(heroes, teachers)} />
      <BenefitsSection />
      <HomeSection eyebrow="اختر مرحلتك" title="طريقك الدراسي يبدأ من صفك" description="اختر صفك أولًا، ثم حدّد الدراسة أونلاين أو الحضور في السنتر حسب المتاح.">
        <GradePathsSection grades={gradeLabels.map((label) => {
          const matchingCourses = courses.filter((course) => course.grade === label);
          return { id: matchingCourses[0]?.gradeId ?? label, label, courseCount: matchingCourses.length };
        })} />
      </HomeSection>

      <HomeSection
        id="teachers"
        eyebrow={teacherSection?.subtitle ?? "تعلّم مع مدرسك"}
        title={teacherSection?.title ?? "مدرسونا"}
        description={teacherSection?.body ?? "اختر مدرسك وابدأ من الكورسات والباقات المنشورة له على المنصة."}
        action="كل المدرسين"
        href="/teachers"
      >
        {teachers.length ? <div className="grid gap-3 md:grid-cols-2">{teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}</div> : <EmptyState icon={UsersIcon} title="سيظهر المدرسون هنا بعد اختيارهم من محتوى الموقع" />}
      </HomeSection>

      <HomeSection
        id="courses"
        muted
        eyebrow={courseSection?.subtitle ?? "ابدأ من المحتوى المناسب"}
        title={courseSection?.title ?? "الكورسات والباقات"}
        description={courseSection?.body ?? "تفاصيل واضحة عن المدرس والصف وطريقة الدراسة قبل فتح صفحة الكورس."}
        action="كل الكورسات"
        href="/courses"
      >
        {featuredCourses.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featuredCourses.map((course) => <CourseCard key={course.id} course={course} />)}</div> : <EmptyState icon={Layers3Icon} title="لا توجد كورسات منشورة للمدرسين المختارين حاليًا" />}
      </HomeSection>

      <HowItWorksSection />

      <HomeSection
        id="revisions"
        eyebrow={revisionSection?.subtitle ?? "استعداد مركز قبل الامتحان"}
        title={revisionSection?.title ?? "المراجعات النهائية"}
        description={revisionSection?.body ?? "باقات مراجعة مرتبطة بالكورس وتُفتح من صفحته الداخلية."}
      >
        {revisions.length ? <div className="grid gap-3 sm:grid-cols-2">{revisions.slice(0, 4).map((revision) => <RevisionCard key={revision.id} revision={revision} />)}</div> : <EmptyState icon={PackageCheckIcon} title="ستظهر المراجعات النهائية المنشورة هنا" />}
      </HomeSection>

      <HomeSection
        id="store"
        muted
        eyebrow={storeSection?.subtitle ?? "أدوات تساعدك في المذاكرة"}
        title={storeSection?.title ?? "المتجر التعليمي"}
        description={storeSection?.body ?? "كتب وملخصات وموارد تعليمية بصورها وبياناتها المعتمدة."}
        action="فتح المتجر"
        href="/store"
      >
        {products.length ? <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState icon={StoreIcon} title="لا توجد منتجات منشورة في المتجر حاليًا" />}
      </HomeSection>

      <CenterScheduleSection groups={groups} hasCenterCourses={courses.some((course) => course.mode !== "ONLINE")} />
      <TestimonialsSection items={testimonials} />
      <FaqSection items={faqs} />
      <FinalCta section={finalCta} />
    </main>
  );
}

function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-title" className="border-b bg-background">
      <Container size="wide" className="py-7 sm:py-9">
        <h2 id="benefits-title" className="sr-only">مميزات المنصة</h2>
        <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefitItems.map(({ title, description, icon: Icon }) => <div key={title} className="flex items-start gap-3 border-s-2 border-primary/20 ps-3"><Icon className="mt-0.5 size-6 shrink-0 text-primary" /><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div></div>)}
        </div>
      </Container>
    </section>
  );
}

function TeacherCard({ teacher }: { teacher: CatalogTeacher }) {
  return (
    <Link href={`/teachers/${teacher.id}`} className="group grid grid-cols-[7rem_1fr] overflow-hidden rounded-2xl border bg-card shadow-xs transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 active:scale-[.99] motion-reduce:transform-none sm:grid-cols-[9rem_1fr]">
      <div className="relative min-h-36 bg-primary/10">
        {teacher.photoUrl ? <Image src={teacher.photoUrl} alt={teacher.name} fill sizes="(max-width: 640px) 112px, 144px" className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none" unoptimized /> : <span className="flex h-full items-center justify-center text-2xl font-black text-primary">{teacher.initials}</span>}
      </div>
      <div className="flex min-w-0 flex-col justify-center p-4 sm:p-5">
        <p className="text-xs font-bold text-primary">{teacher.subject}</p>
        <h3 className="mt-1 text-lg font-black sm:text-xl">{teacher.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{teacher.intro}</p>
        {teacher.grades.length ? <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{teacher.grades.join(" · ")}</p> : null}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">عرض الكورسات<ArrowUpLeftIcon className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none" /></span>
      </div>
    </Link>
  );
}

function CourseCard({ course }: { course: CatalogCourse }) {
  const lessonCount = course.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const lowestPrice = course.packages.length ? Math.min(...course.packages.map((item) => item.price)) : undefined;
  return (
    <Link href={`/courses/${course.id}`} className="group grid grid-cols-[7.5rem_1fr] overflow-hidden rounded-2xl border bg-card shadow-xs transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 active:scale-[.99] motion-reduce:transform-none sm:block">
      <MediaVisual src={course.hasCustomCover ? course.cover : undefined} alt={course.coverAlt} icon={BookOpenIcon} className="min-h-40 sm:aspect-[16/10] sm:min-h-0" sizes="(max-width: 639px) 120px, (max-width: 1023px) 50vw, 33vw" />
      <div className="min-w-0 p-3.5 sm:p-4">
        <p className="text-xs font-bold text-primary">{course.subject} · {course.grade}</p>
        <h3 className="mt-1 line-clamp-2 font-bold leading-6 sm:text-lg">{course.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{course.teacherName}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><BookOpenIcon className="size-3.5" />{lessonCount} درس</span><span>{modeLabel(course.mode)}</span></div>
        {lowestPrice !== undefined ? <p className="mt-3 text-sm font-black">يبدأ من {formatPrice(lowestPrice)}</p> : <p className="mt-3 text-sm font-semibold text-muted-foreground">التفاصيل داخل الكورس</p>}
      </div>
    </Link>
  );
}

function HowItWorksSection() {
  const steps = [
    { title: "اختر مدرسك أو الكورس", text: "ابحث بالاسم أو المادة أو الصف الدراسي.", icon: SearchIcon },
    { title: "اشترك أو اطلب الانضمام", text: "اختر الباقة أو مجموعة السنتر المناسبة.", icon: CheckCircle2Icon },
    { title: "تابع الدروس والامتحانات", text: "افتح المحتوى المسموح به من حسابك.", icon: PlayCircleIcon },
    { title: "تابع السنتر والحضور", text: "راجع مواعيدك وحضورك عند الحاجة.", icon: UsersIcon },
  ];
  return <HomeSection muted eyebrow="خطوات بسيطة" title="كيف تبدأ؟"><ol className="grid grid-cols-2 gap-3 lg:grid-cols-4">{steps.map(({ title, text, icon: Icon }, index) => <li key={title} className="relative rounded-2xl border bg-card p-4 sm:p-5"><span className="absolute end-4 top-4 text-3xl font-black text-primary/10">{index + 1}</span><Icon className="size-7 text-primary" /><h3 className="mt-4 text-sm font-bold sm:text-base">{title}</h3><p className="mt-1 text-xs leading-6 text-muted-foreground sm:text-sm">{text}</p></li>)}</ol></HomeSection>;
}

function RevisionCard({ revision }: { revision: Revision }) {
  return <Link href={`/courses/${revision.course.id}`} className="group grid grid-cols-[7rem_1fr] overflow-hidden rounded-2xl border bg-card transition hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[.99]"><MediaVisual src={revision.thumbnailUrl ?? (revision.course.hasCustomCover ? revision.course.cover : undefined)} alt={revision.title} icon={PackageCheckIcon} className="min-h-32" sizes="112px" /><div className="flex min-w-0 flex-col justify-center p-3.5"><p className="text-xs font-bold text-primary">{revision.course.subject} · {revision.course.grade}</p><h3 className="mt-1 line-clamp-2 font-bold">{revision.title}</h3><p className="mt-1 text-xs text-muted-foreground">{revision.course.teacherName}</p><p className="mt-2 text-sm font-black">{formatPrice(revision.price)}</p></div></Link>;
}

function ProductCard({ product }: { product: StoreProduct }) {
  return <Link href={`/store/${product.id}`} className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 active:scale-[.99] motion-reduce:transform-none"><MediaVisual src={product.hasCustomCover ? product.cover : undefined} alt={product.coverAlt} icon={StoreIcon} className="aspect-[4/3]" sizes="(max-width: 1023px) 50vw, 25vw" /><div className="p-3 sm:p-4"><p className="flex items-center gap-1 text-[.7rem] font-bold text-primary sm:text-xs"><StoreIcon className="size-3.5" />{productTypeLabel(product.type)}</p><h3 className="mt-1 line-clamp-2 text-sm font-bold leading-6 sm:text-base">{product.title}</h3><p className="mt-2 text-sm font-black">{product.price ? formatPrice(product.price) : "مجاني"}</p></div></Link>;
}

function CenterScheduleSection({ groups, hasCenterCourses }: { groups: Array<{ group: CenterGroup; course: CatalogCourse }>; hasCenterCourses: boolean }) {
  return <HomeSection id="center" eyebrow="الدراسة في السنتر" title="المواعيد والمجموعات" description="استعرض المواعيد المتاحة ثم أكمل طلب الانضمام من صفحة السنتر." action="كل مواعيد السنتر" href="/center-schedule">{groups.length ? <div className="grid gap-3 md:grid-cols-2">{groups.slice(0, 4).map(({ group, course }) => <article key={group.id} className="rounded-2xl border bg-card p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-primary">{course.subject} · {course.grade}</p><h3 className="mt-1 font-bold">{course.title}</h3><p className="mt-1 text-xs text-muted-foreground">{course.teacherName}</p></div><span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", group.status === "available" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground")}>{group.status === "available" ? "متاح" : "مكتمل"}</span></div><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground"><span className="inline-flex items-center gap-2"><CalendarDaysIcon className="size-4 text-primary" />{group.days}</span><span className="inline-flex items-center gap-2"><Clock3Icon className="size-4 text-primary" />{group.startTime}</span><span className="inline-flex items-center gap-2"><MapPinIcon className="size-4 text-primary" />{group.room}</span><strong className="text-foreground">{formatPrice(group.price)}</strong></div><Link href="/center-schedule" className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[.99]">طلب الانضمام</Link></article>)}</div> : <EmptyState icon={CalendarDaysIcon} title={hasCenterCourses ? "ستظهر مواعيد المجموعات هنا فور نشرها" : "لا توجد مجموعات سنتر منشورة حاليًا"} action="استعرض صفحة السنتر" href="/center-schedule" />}</HomeSection>;
}

function TestimonialsSection({ items }: { items: WebsiteSection[] }) {
  return <HomeSection muted eyebrow="تجارب الطلاب" title="آراء من المنصة">{items.length ? <div className="grid gap-3 md:grid-cols-3">{items.slice(0, 6).map((item) => <figure key={item.id} className="rounded-2xl border bg-card p-5"><div className="flex items-center gap-3">{item.imageUrl ? <div className="relative size-11 overflow-hidden rounded-full"><Image src={item.imageUrl} alt={typeof item.metadata?.imageAlt === "string" ? item.metadata.imageAlt : item.title ?? "طالب"} fill sizes="44px" className="object-cover" unoptimized /></div> : <SparklesIcon className="size-6 text-primary" />}<figcaption><strong className="text-sm">{item.title}</strong>{item.subtitle && item.body ? <p className="text-xs text-muted-foreground">{item.subtitle}</p> : null}</figcaption></div><blockquote className="mt-4 text-sm leading-7">{item.body ?? item.subtitle ?? ""}</blockquote></figure>)}</div> : <EmptyState icon={SparklesIcon} title="ستظهر آراء الطلاب المعتمدة هنا" />}</HomeSection>;
}

function FaqSection({ items }: { items: WebsiteSection[] }) {
  return <HomeSection id="faq" eyebrow="إجابات سريعة" title="الأسئلة الشائعة"><div className="mx-auto max-w-3xl space-y-2">{items.length ? items.slice(0, 8).map((item) => <details key={item.id} className="group rounded-xl border bg-card open:border-primary/30 open:shadow-sm"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-bold outline-none transition hover:text-primary focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">{item.title}<ChevronDownIcon className="size-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><p className="border-t px-4 py-4 text-sm leading-7 text-muted-foreground">{item.body ?? item.subtitle ?? "سيتم إضافة الإجابة من لوحة التحكم."}</p></details>) : <EmptyState icon={BookOpenCheckIcon} title="ستظهر الأسئلة الشائعة بعد إضافتها من محتوى الموقع" />}</div></HomeSection>;
}

function FinalCta({ section }: { section?: WebsiteSection }) {
  const href = section?.ctaUrl ?? "/register";
  return <section className="bg-primary text-primary-foreground"><Container size="wide" className="flex flex-col items-start gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10"><div><p className="text-xs font-bold text-primary-foreground/70">ابدأ خطوتك التالية</p><h2 className="mt-1 text-2xl font-black sm:text-3xl">{section?.title ?? "جاهز تبدأ؟"}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-primary-foreground/75">{section?.body ?? section?.subtitle ?? "أنشئ حسابك واختر المدرس والكورس المناسب لك."}</p></div><Link href={href} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "min-h-12 w-full shrink-0 px-6 shadow-lg transition hover:-translate-y-0.5 focus-visible:ring-white/70 active:translate-y-0 active:scale-[.98] sm:w-auto motion-reduce:transform-none")}>{section?.ctaLabel ?? "سجّل الآن"}<ArrowUpLeftIcon /></Link></Container></section>;
}

function HomeSection({ id, eyebrow, title, description, action, href, muted, children }: { id?: string; eyebrow: string; title: string; description?: string; action?: string; href?: string; muted?: boolean; children: React.ReactNode }) {
  return <section id={id} className={muted ? "border-y bg-secondary/35" : "bg-background"}><Container size="wide" className="py-8 sm:py-11 lg:py-14"><div className="mb-5 flex items-end justify-between gap-3 sm:mb-7"><div><p className="text-xs font-bold text-primary sm:text-sm">{eyebrow}</p><h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>{description ? <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p> : null}</div>{action && href ? <Link href={href} className="hidden min-h-10 shrink-0 items-center rounded-lg px-3 text-sm font-bold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 sm:inline-flex">{action}<ArrowUpLeftIcon className="ms-1 size-4" /></Link> : null}</div>{children}{action && href ? <Link href={href} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-primary/20 bg-card px-4 text-sm font-bold text-primary transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[.99] sm:hidden">{action}<ArrowUpLeftIcon className="ms-1 size-4" /></Link> : null}</Container></section>;
}

function MediaVisual({ src, alt, icon: Icon, className, sizes }: { src?: string; alt: string; icon: typeof BookOpenIcon; className?: string; sizes: string }) {
  return <div className={cn("relative overflow-hidden bg-[linear-gradient(135deg,var(--secondary),color-mix(in_oklch,var(--primary)_13%,var(--background)))]", className)}>{src ? <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" unoptimized /> : <div className="flex h-full min-h-28 items-center justify-center"><Icon className="size-10 text-primary/55" /><span className="sr-only">{alt}</span></div>}</div>;
}

function EmptyState({ icon: Icon, title, action, href }: { icon: typeof BookOpenIcon; title: string; action?: string; href?: string }) {
  return <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/60 p-5 text-center"><Icon className="size-8 text-primary/60" /><p className="mt-3 text-sm font-bold text-muted-foreground">{title}</p>{action && href ? <Link href={href} className="mt-3 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">{action}</Link> : null}</div>;
}

function toHeroSlides(sections: WebsiteSection[], teachers: CatalogTeacher[]): HeroSlide[] {
  return sections.map((section) => {
    const metadata = section.metadata ?? {};
    const teacherId = typeof metadata.teacherId === "string" ? metadata.teacherId : undefined;
    const teacher = teachers.find((item) => item.id === teacherId);
    return {
      id: section.id,
      badge: typeof metadata.badge === "string" ? metadata.badge : section.subtitle ?? undefined,
      title: section.title ?? "مسارك الدراسي في مكان واحد",
      description: section.body ?? undefined,
      ctaLabel: section.ctaLabel ?? undefined,
      ctaUrl: section.ctaUrl ?? undefined,
      imageUrl: section.imageUrl ?? undefined,
      mobileImageUrl: typeof metadata.mobileImageUrl === "string" ? metadata.mobileImageUrl : undefined,
      imageAlt: typeof metadata.imageAlt === "string" ? metadata.imageAlt : section.title ?? "محتوى منصة قلاّج",
      teacherName: teacher?.name,
      teacherSubject: teacher?.subject,
      teacherInitials: teacher?.initials,
      teacherPhotoUrl: teacher?.photoUrl,
    };
  });
}

function selectFeaturedCourses(courses: CatalogCourse[], sections: WebsiteSection[]) {
  const ids = sections.flatMap((section) => typeof section.metadata?.courseId === "string" ? [section.metadata.courseId] : []);
  if (!ids.length) return courses.slice(0, 6);
  const byId = new Map(courses.map((course) => [course.id, course]));
  return ids.flatMap((id) => byId.get(id) ?? []).slice(0, 6);
}

function firstSection(sections: WebsiteSection[], type: WebsiteSection["type"]) {
  return sections.find((section) => section.type === type);
}

function modeLabel(mode: CatalogCourse["mode"]) {
  return mode === "BOTH" ? "أونلاين وسنتر" : mode === "CENTER" ? "سنتر" : "أونلاين";
}

function productTypeLabel(type: StoreProduct["type"]) {
  const labels: Record<StoreProduct["type"], string> = { BOOK: "كتاب", NOTES: "مذكرة", SUMMARY: "ملخص", REVISION_FILE: "ملف مراجعة", EXAM_MODEL: "نموذج امتحان", QUESTION_BANK: "بنك أسئلة", FREE_RESOURCE: "مورد مجاني" };
  return labels[type];
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("ar-EG").format(value)} ج.م`;
}
