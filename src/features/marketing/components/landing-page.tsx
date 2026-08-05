import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeftIcon, CalendarDaysIcon, CheckIcon, Clock3Icon, MapPinIcon, MonitorPlayIcon, StoreIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CoursePreviewCard } from "@/features/marketing/components/course-preview-card";
import { FAQSection } from "@/features/marketing/components/faq-section";
import { HeroSlider } from "@/features/marketing/components/hero-slider";
import { TeacherPreviewCard } from "@/features/marketing/components/teacher-preview-card";
import { centerSchedulePreviews, educationalStages, featuredCourses, heroBanners, platformBenefits, revisionPackages, storeProducts, teacherPreviews, testimonials } from "@/features/marketing/data/landing";
import { cn } from "@/lib/utils";

export function LandingPage() {
  return <main>
    <HeroSlider banners={heroBanners} />

    <MarketingSection id="why-qalag" muted>
      <SectionHeader title="لماذا يختار الطلاب والأهل قلاّج؟" description="تجربة تعليمية عملية تجمع المتابعة المرنة والموارد التي يحتاجها الطالب طوال العام." />
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {platformBenefits.map((benefit) => { const Icon = benefit.icon; return <div key={benefit.title} className="flex items-start gap-4"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon aria-hidden="true" /></div><div><h3 className="font-semibold text-foreground">{benefit.title}</h3><p className="mt-1 text-sm leading-7 text-muted-foreground">{benefit.description}</p></div></div>; })}
      </div>
    </MarketingSection>

    <MarketingSection id="stages">
      <SectionHeader title="اختر صفك الدراسي" description="حدّد المرحلة ثم اختر الدراسة أونلاين أو أرسل طلبك للانضمام إلى مجموعة في السنتر." />
      <div className="grid gap-5 lg:grid-cols-3">
        {educationalStages.map((stage) => <Card key={stage.id} className="border border-border/70 bg-card"><CardContent className="flex h-full flex-col items-start py-1"><h3 className="text-lg font-semibold text-foreground">{stage.label}</h3><p className="mt-2 min-h-14 text-sm leading-7 text-muted-foreground">{stage.description}</p><div className="mt-5 flex w-full flex-col gap-2 sm:flex-row"><Link href={stage.onlineHref} className={cn(buttonVariants(), "flex-1")}><MonitorPlayIcon data-icon="inline-start" />دراسة أونلاين</Link><Link href={stage.centerHref} className={cn(buttonVariants({ variant: "outline" }), "flex-1")}>الحضور في السنتر</Link></div><p className="mt-3 text-xs leading-5 text-muted-foreground">طلب السنتر لا يعني تأكيد الحجز أو المجموعة فوراً.</p></CardContent></Card>)}
      </div>
    </MarketingSection>

    <MarketingSection id="teachers" muted>
      <SectionHeader title="مدرسون مختارون لرحلتك التعليمية" description="اطّلع على المواد والصفوف التي يدعمها كل مدرس، ثم انتقل إلى الكورسات المناسبة." />
      <div className="grid gap-5 md:grid-cols-3">{teacherPreviews.map((teacher) => <TeacherPreviewCard key={teacher.id} teacher={teacher} />)}</div>
    </MarketingSection>

    <MarketingSection id="courses">
      <SectionHeader title="كورسات وباقات تناسب طريقة مذاكرتك" description="اختر بين الكورس الكامل أو الباقات الشهرية وباقات الترم، مع توضيح طريقة الدراسة قبل التسجيل." action={<Link href="/courses" className={buttonVariants({ variant: "outline" })}>كل الكورسات<ArrowUpLeftIcon data-icon="inline-end" /></Link>} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featuredCourses.map((course) => <CoursePreviewCard key={course.id} course={course} />)}</div>
    </MarketingSection>

    {revisionPackages.length ? <MarketingSection id="revisions" muted>
      <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div className="text-start"><p className="font-medium text-primary">استعداد الامتحانات</p><h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground">مراجعات نهائية مركزة</h2><p className="mt-3 leading-8 text-muted-foreground">باقات مخصصة للتدريب على أهم الأفكار وترتيب المراجعة قبل الامتحانات.</p></div><div className="grid gap-5 sm:grid-cols-2">{revisionPackages.map((course) => <CoursePreviewCard key={course.id} course={course} />)}</div></div>
    </MarketingSection> : null}

    <MarketingSection id="store">
      <SectionHeader title="المتجر التعليمي" description="معاينة لمواد مساعدة ستتوفر في المتجر: كتب PDF وملخصات ومراجعات ونماذج امتحانات." action={<span aria-disabled="true" className={cn(buttonVariants({ variant: "outline" }), "cursor-not-allowed opacity-60")}>المتجر قريباً</span>} />
      <div className="grid gap-5 md:grid-cols-3">{storeProducts.map((product) => <Card key={product.id} className="h-full"><Image src={product.image.src} alt={product.image.alt} width={640} height={360} className="aspect-[16/9] w-full bg-secondary object-cover" /><CardContent className="flex h-full flex-col py-1"><div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"><StoreIcon aria-hidden="true" className="size-4" />{product.type}</span>{product.price ? <span className="font-semibold text-foreground">{product.price}</span> : <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">مجاني</span>}</div><h3 className="mt-3 font-semibold text-foreground">{product.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.publisher} · {product.subject} · {product.grade}</p></CardContent></Card>)}</div>
    </MarketingSection>

    <MarketingSection id="center-schedule" muted>
      <SectionHeader title="مواعيد السنتر" description="نماذج مختصرة للمجموعات المتاحة. أرسل طلب انضمام ليتم التواصل معك وتأكيد المجموعة المناسبة." action={<Link href="/register?interest=center" className={buttonVariants({ variant: "outline" })}>طلب الانضمام<ArrowUpLeftIcon data-icon="inline-end" /></Link>} />
      <div className="grid gap-4 md:grid-cols-3">{centerSchedulePreviews.map((schedule) => <Card key={schedule.id}><CardContent className="py-1"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-foreground">{schedule.subject}</h3><p className="mt-1 text-sm text-primary">{schedule.teacher}</p></div><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{schedule.grade}</span></div><dl className="mt-5 grid gap-3 text-sm text-muted-foreground"><div className="flex items-center gap-2"><CalendarDaysIcon aria-hidden="true" className="size-4 text-primary" /><dt className="sr-only">اليوم</dt><dd>{schedule.day}</dd></div><div className="flex items-center gap-2"><Clock3Icon aria-hidden="true" className="size-4 text-primary" /><dt className="sr-only">الوقت</dt><dd>{schedule.startTime} · {schedule.duration}</dd></div><div className="flex items-center gap-2"><MapPinIcon aria-hidden="true" className="size-4 text-primary" /><dt className="sr-only">المكان</dt><dd>{schedule.location}</dd></div></dl></CardContent></Card>)}</div>
    </MarketingSection>

    {testimonials.length ? <MarketingSection id="testimonials">
      <SectionHeader title="آراء من مجتمع قلاّج" description="آراء مختصرة من طلاب وأولياء أمور، منفصلة تماماً عن باقات المراجعة والكورسات." />
      <div className="grid gap-5 md:grid-cols-2">{testimonials.map((testimonial) => <Card key={testimonial.author} className="bg-card"><CardContent className="py-1"><p className="text-lg leading-8 text-foreground">«{testimonial.quote}»</p><div className="mt-5 flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary"><CheckIcon aria-hidden="true" className="size-4" /></span><div><p className="font-medium text-foreground">{testimonial.author}</p><p className="text-sm text-muted-foreground">{testimonial.relation}</p></div></div></CardContent></Card>)}</div>
    </MarketingSection> : null}

    <MarketingSection id="faq" muted>
      <SectionHeader title="الأسئلة الشائعة" description="إجابات سريعة تساعدك على اختيار طريقة الدراسة والمواد المناسبة." />
      <FAQSection />
    </MarketingSection>

    <section className="bg-primary text-primary-foreground"><Container size="wide" className="flex flex-col items-start justify-between gap-6 py-11 sm:py-14 lg:flex-row lg:items-center"><div className="max-w-2xl"><h2 className="text-3xl font-semibold leading-tight sm:text-4xl">ابدأ رحلتك التعليمية الآن</h2><p className="mt-3 leading-8 text-primary-foreground/80">سجّل حسابك واستكشف المدرسين والكورسات، واختر بين الدراسة أونلاين أو الحضور في السنتر.</p></div><Link href="/register" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "shadow-lg shadow-foreground/10")}>سجّل الآن<ArrowUpLeftIcon data-icon="inline-end" /></Link></Container></section>
  </main>;
}

function MarketingSection({ id, muted, children }: { id?: string; muted?: boolean; children: React.ReactNode }) {
  return <section id={id} className={muted ? "bg-secondary/45" : "bg-background"}><Container size="wide" className="flex flex-col gap-7 py-12 sm:gap-8 sm:py-16 lg:py-20">{children}</Container></section>;
}
