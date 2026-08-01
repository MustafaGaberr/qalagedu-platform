import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo";
import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { appConfig } from "@/config/app";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <Container size="wide" className="py-10 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.95fr_0.75fr] lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <AppLogo size="lg" />
            <p className="max-w-md text-base leading-8 text-muted-foreground">
              {appConfig.description}
            </p>
          </div>

          <FooterGroup title="روابط المنصة">
            {appConfig.primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            ))}
          </FooterGroup>

          <FooterGroup title="تواصل معنا">
            <span className="inline-flex items-center gap-2">
              <PhoneIcon aria-hidden="true" />
              {appConfig.center.contact.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <MailIcon aria-hidden="true" />
              {appConfig.center.contact.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPinIcon aria-hidden="true" />
              {appConfig.center.contact.address}
            </span>
          </FooterGroup>

          <FooterGroup title="روابط مؤقتة">
            {appConfig.legalLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                aria-disabled={item.disabled}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {appConfig.socialLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-full border bg-background px-3 py-1"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </FooterGroup>
        </div>

        <Separator className="my-7 sm:my-8" />

        <div className="flex flex-col gap-2 text-sm leading-6 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {appConfig.name}. كل الحقوق محفوظة.
          </p>
          <p>{appConfig.center.name}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 text-[0.95rem] leading-6 text-muted-foreground [&_a]:rounded-md [&_a]:transition-colors [&_a]:hover:text-foreground [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-3 [&_a]:focus-visible:ring-ring/50 [&_a]:motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}
