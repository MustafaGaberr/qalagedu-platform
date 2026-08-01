import Link from "next/link";
import { CheckCircle2Icon, ShieldCheckIcon } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo";
import { Container } from "@/components/shared/container";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  size?: "default" | "wide";
};

export function AuthShell({
  title,
  description,
  children,
  size = "default",
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_80%_10%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_36%),linear-gradient(180deg,var(--background),var(--secondary))]">
      <Container
        size="wide"
        className="grid min-h-screen gap-6 py-5 sm:gap-8 sm:py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-10"
      >
        <section className="hidden min-h-[40rem] flex-col justify-between rounded-3xl border bg-card p-8 shadow-2xl shadow-foreground/5 lg:flex">
          <Link
            href="/"
            className="w-fit rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <AppLogo size="lg" />
          </Link>
          <div className="flex flex-col gap-6">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheckIcon aria-hidden="true" />
            </div>
            <div className="max-w-md text-start">
              <p className="text-sm font-medium text-primary">
                تجربة آمنة وواضحة
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground">
                حساب واحد ينظم رحلة الطالب مع السنتر.
              </h1>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                واجهة تسجيل هادئة ومباشرة، جاهزة لاحقا للربط بنظام المصادقة
                الحقيقي دون تخزين بيانات محليا.
              </p>
            </div>
          </div>
          <div className="grid gap-3 text-base text-muted-foreground">
            {[
              "رسائل تحقق عربية واضحة",
              "حقول مهيأة للموبايل",
              "لا يوجد إرسال فعلي للبيانات الآن",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2Icon aria-hidden="true" className="text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className={cn(
            "mx-auto flex w-full flex-col gap-5 sm:gap-6",
            size === "wide" ? "max-w-xl" : "max-w-lg"
          )}
        >
          <Link
            href="/"
            className="w-fit rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
          >
            <AppLogo />
          </Link>
          <div className="rounded-3xl border bg-card p-5 shadow-xl shadow-foreground/5 sm:p-7 lg:p-8">
            <div className="mb-6 text-start sm:mb-7">
              <p className="text-base font-medium text-primary">
                {appConfig.center.name}
              </p>
              <h1 className="mt-2 text-3xl font-semibold leading-10 text-foreground">
                {title}
              </h1>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                {description}
              </p>
            </div>
            {children}
          </div>
        </section>
      </Container>
    </main>
  );
}
