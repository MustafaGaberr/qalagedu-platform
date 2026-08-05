import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo";
import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { appConfig } from "@/config/app";

export function PublicFooter() {
  return (
    <footer id="contact" className="border-t bg-card">
      <Container size="wide" className="py-10 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.95fr_0.75fr] lg:gap-12">
          <div id="about" className="flex flex-col items-start gap-4"><AppLogo size="lg" /><p className="max-w-md text-base leading-8 text-muted-foreground">{appConfig.description}</p></div>
          <FooterGroup title="روابط المنصة">
            {appConfig.primaryNavigation.filter((item) => !item.disabled).map((item) => <Link key={item.href} href={item.href}>{item.title}</Link>)}
          </FooterGroup>
          <FooterGroup title="تواصل معنا">
            <span className="inline-flex items-center gap-2"><PhoneIcon aria-hidden="true" />{appConfig.center.contact.phone}</span>
            <span className="inline-flex items-center gap-2"><MailIcon aria-hidden="true" />{appConfig.center.contact.email}</span>
            <span className="inline-flex items-center gap-2"><MapPinIcon aria-hidden="true" />{appConfig.center.contact.address}</span>
          </FooterGroup>
          <FooterGroup title="معلومات مهمة">
            {appConfig.footerNavigation.map((item) => <Link key={item.href} href={item.href}>{item.title}</Link>)}
            {appConfig.legalLinks.map((item) => <span key={item.title} aria-disabled="true" className="cursor-not-allowed text-muted-foreground/70">{item.title}</span>)}
          </FooterGroup>
        </div>
        <Separator className="my-7 sm:my-8" />
        <div className="flex flex-col gap-2 text-sm leading-6 text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {appConfig.name}. كل الحقوق محفوظة.</p><p>{appConfig.center.name}</p></div>
      </Container>
    </footer>
  );
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="flex flex-col items-start gap-3 text-[0.95rem] leading-6 text-muted-foreground [&_a]:rounded-md [&_a]:transition-colors [&_a]:hover:text-foreground [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-3 [&_a]:focus-visible:ring-ring/50 [&_a]:motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0"><h2 className="text-base font-semibold text-foreground">{title}</h2>{children}</div>;
}
