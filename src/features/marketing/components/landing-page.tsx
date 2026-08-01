import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { CoursePreviewCard } from "@/features/marketing/components/course-preview-card";
import { FAQSection } from "@/features/marketing/components/faq-section";
import { FeatureHighlight } from "@/features/marketing/components/feature-highlight";
import { HeroProductPreview } from "@/features/marketing/components/hero-product-preview";
import { ProgressShowcase } from "@/features/marketing/components/progress-showcase";
import { StudentJourney } from "@/features/marketing/components/student-journey";
import { TeacherPreviewCard } from "@/features/marketing/components/teacher-preview-card";
import {
  coursePreviews,
  featureHighlights,
  heroHighlights,
  teacherPreviews,
  testimonialMessages,
  valueItems,
} from "@/features/marketing/data/landing";

export function LandingPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b bg-[radial-gradient(circle_at_72%_18%,color-mix(in_oklch,var(--primary)_13%,transparent),transparent_32%),linear-gradient(180deg,var(--background),color-mix(in_oklch,var(--secondary)_42%,var(--background)))]">
        <Container
          size="wide"
          className="grid gap-9 py-10 sm:gap-12 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24"
        >
          <div className="max-w-2xl text-start">
            <h1 className="text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              تعلم بثقة، وتابع تقدمك في كل خطوة.
            </h1>
            <p className="mt-5 text-lg leading-9 text-muted-foreground sm:mt-6">
              {appConfig.name} تساعد الطالب على رؤية دروسه، اختباراته، حضوره،
              ونتائجه داخل تجربة عربية منظمة ومريحة.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href={appConfig.authNavigation.register.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "shadow-xl shadow-primary/20"
                )}
              >
                ابدأ حسابك الآن
                <ArrowUpLeftIcon data-icon="inline-end" />
              </Link>
              <Link
                href="#experience"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-transparent bg-card/80 shadow-sm shadow-foreground/5"
                )}
              >
                استكشف التجربة
              </Link>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2 text-sm text-muted-foreground sm:mt-8">
              {heroHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border bg-card px-3 py-1.5 shadow-sm shadow-foreground/5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <HeroProductPreview />
        </Container>
      </section>

      <section className="border-b bg-card">
        <Container
          size="wide"
          className="grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {valueItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-start gap-3 p-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon aria-hidden="true" />
                </div>
                <div className="text-start">
                  <h2 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <MarketingSection id="experience">
        <SectionHeader
          title="رحلة طالب واضحة من أول درس لآخر نتيجة"
          description="التجربة مصممة لتقليل التشتت: دورة واضحة، درس واضح، متابعة واضحة."
        />
        <StudentJourney />
      </MarketingSection>

      <MarketingSection id="features" muted>
        <SectionHeader
          title="مميزات تظهر قيمة المنصة قبل بناء التطبيق الداخلي"
          description="كل العناصر هنا معاينات تسويقية فقط، لكنها تعكس اتجاه المنتج في المراحل القادمة."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featureHighlights.map((feature, index) => (
            <FeatureHighlight key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </MarketingSection>

      <MarketingSection id="courses">
        <SectionHeader
          title="نماذج دورات بتقديم أنيق"
          description="بيانات مركزية قابلة للاستبدال لاحقا عند توفر محتوى حقيقي."
        />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {coursePreviews.map((course) => (
            <CoursePreviewCard key={course.id} course={course} />
          ))}
        </div>
      </MarketingSection>

      <MarketingSection muted>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <SectionHeader
            title="معلمون مختارون للعرض التسويقي"
            description="بطاقات هادئة لا تعتمد على صور عشوائية، وتترك مساحة لإضافة صور حقيقية لاحقا."
          />
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {teacherPreviews.map((teacher) => (
              <TeacherPreviewCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection>
        <ProgressShowcase />
      </MarketingSection>

      <MarketingSection muted>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex h-full flex-col justify-between gap-8 py-3 sm:py-4">
              <div className="text-start">
                <p className="text-sm font-medium text-primary-foreground/75">
                  عرض ثقة مؤقت
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-9 sm:text-3xl sm:leading-tight">
                  رسائل ثقة بدون ادعاءات غير موثقة
                </h2>
                <p className="mt-3 text-base leading-8 text-primary-foreground/80">
                  هذه نصوص مؤقتة موسومة بوضوح، ولا تعرض أرقاما أو شهادات حقيقية.
                </p>
              </div>
              <div className="rounded-2xl bg-primary-foreground/10 p-4 text-sm leading-7 text-primary-foreground/80">
                المحتوى هنا يحافظ على حدود المرحلة الحالية: تسويق واضح، بدون
                شهادات مزيفة أو أرقام غير قابلة للتحقق.
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {testimonialMessages.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="bg-card/85">
                  <CardContent className="flex flex-col gap-4 py-2 sm:flex-row sm:items-start">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon aria-hidden="true" />
                    </div>
                    <div className="text-start">
                      <h3 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-7 text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection id="faq">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHeader
            title="أسئلة شائعة"
            description="إجابات مختصرة تشرح حدود هذه المرحلة وما سيأتي لاحقا."
          />
          <FAQSection />
        </div>
      </MarketingSection>

      <section className="bg-primary text-primary-foreground">
        <Container size="wide" className="py-10 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl text-start">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                جاهز لتجربة حساب الطالب؟
              </h2>
              <p className="mt-3 text-base leading-8 text-primary-foreground/80">
                أنشئ حسابا تجريبيا الآن وشاهد واجهة التسجيل فقط، بدون أي إرسال
                فعلي للبيانات.
              </p>
            </div>
            <Link
              href={appConfig.authNavigation.register.href}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "shadow-lg shadow-foreground/10"
              )}
            >
              إنشاء حساب طالب
              <ArrowUpLeftIcon data-icon="inline-end" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

function MarketingSection({
  id,
  muted,
  children,
}: {
  id?: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={muted ? "bg-secondary/50" : "bg-background"}>
      <Container size="wide" className="flex flex-col gap-7 py-12 sm:gap-8 sm:py-16 lg:py-20">
        {children}
      </Container>
    </section>
  );
}
