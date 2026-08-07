import { notFound } from "next/navigation";
import {
  AlertCircleIcon,
  BellIcon,
  BookOpenIcon,
  ChevronDownIcon,
  CircleCheckIcon,
  GraduationCapIcon,
  LoaderIcon,
  PaletteIcon,
  PanelRightOpenIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react";

import {
  AppLogo,
  Container,
  EmptyState,
  ErrorState,
  LoadingCard,
  PageHeader,
  SectionHeader,
  StatCard,
  StatusBadge,
} from "@/components/shared";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tokenSamples = [
  { name: "background", className: "bg-background text-foreground" },
  { name: "card", className: "bg-card text-card-foreground" },
  { name: "primary", className: "bg-primary text-primary-foreground" },
  { name: "secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "muted", className: "bg-muted text-muted-foreground" },
  { name: "accent", className: "bg-accent text-accent-foreground" },
  {
    name: "destructive",
    className: "bg-destructive text-destructive-foreground",
  },
];

export default function DevUiPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="min-h-screen bg-background">
      <Container size="wide" className="py-8 sm:py-10">
        <PageHeader
          title="معاينة واجهة التطوير"
          description="صفحة مؤقتة لعرض أساس نظام التصميم، الخط العربي، الألوان، المكونات، واتجاه RTL."
          actions={
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                <SettingsIcon aria-hidden="true" />
                <span className="sr-only">إعدادات المعاينة</span>
              </TooltipTrigger>
              <TooltipContent>زر تجريبي للمعاينة فقط</TooltipContent>
            </Tooltip>
          }
        />

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-5">
            <SectionHeader
              title="الهوية والكتابة"
              description="الخط المستخدم هو Cairo من next/font مع اتجاه عربي كامل."
            />
            <Card>
              <CardHeader>
                <CardTitle>تدرج العناوين والنصوص</CardTitle>
                <CardDescription>
                  قياسات مقصودة للقراءة العربية داخل واجهات تعليمية.
                </CardDescription>
                <CardAction>
                  <AppLogo />
                </CardAction>
              </CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="flex flex-col gap-4 text-start">
                  <h2 className="text-3xl font-semibold leading-tight">
                    عنوان رئيسي واضح للصفحات الداخلية
                  </h2>
                  <h3 className="text-2xl font-semibold leading-9">
                    عنوان قسم قابل للفحص السريع
                  </h3>
                  <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                    هذا النص يختبر إيقاع القراءة، المسافات، واتجاه الكتابة من
                    اليمين إلى اليسار دون افتراضات يسار أو يمين داخل المكونات.
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="text-sm leading-7 text-muted-foreground">
                    ترتيب RTL: العناوين، الأزرار، الأيقونات، الحقول، والفواصل
                    تستخدم خصائص منطقية مثل البداية والنهاية.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-5">
            <SectionHeader
              title="الألوان والرموز الدلالية"
              description="كل عينة تعتمد على متغيرات CSS دلالية قابلة للتغيير لاحقا."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tokenSamples.map((token) => (
                <div
                  key={token.name}
                  className={`${token.className} min-h-24 rounded-lg border p-4`}
                >
                  <span className="text-sm font-medium">{token.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>الأزرار والشارات</CardTitle>
                <CardDescription>
                  حالات أساسية كافية للمرحلة الأولى دون بناء تدفقات فعلية.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Button>
                    <SparklesIcon data-icon="inline-start" />
                    أساسي
                  </Button>
                  <Button variant="secondary">ثانوي</Button>
                  <Button variant="outline">حدود</Button>
                  <Button variant="ghost">هادئ</Button>
                  <Button variant="destructive">تحذيري</Button>
                  <Button variant="link">رابط</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>افتراضي</Badge>
                  <Badge variant="secondary">ثانوي</Badge>
                  <Badge variant="outline">حدود</Badge>
                  <StatusBadge status="success">جاهز</StatusBadge>
                  <StatusBadge status="warning">قيد المراجعة</StatusBadge>
                  <StatusBadge status="destructive">خطأ</StatusBadge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الحقول والتفاعل</CardTitle>
                <CardDescription>
                  معاينة لحقل بحث وقائمة وأدوات تلميح واتجاه الأيقونات.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="dev-search">بحث تجريبي</Label>
                  <div className="relative">
                    <SearchIcon
                      aria-hidden="true"
                      className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="dev-search"
                      placeholder="ابحث في عناصر المعاينة"
                      className="pe-9"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" />}>
                      قائمة تجريبية
                      <ChevronDownIcon data-icon="inline-end" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <BookOpenIcon aria-hidden="true" />
                          عنصر أول
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BellIcon aria-hidden="true" />
                          عنصر ثان
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <AlertCircleIcon aria-hidden="true" />
                        إجراء حساس
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Sheet>
                    <SheetTrigger render={<Button variant="secondary" />}>
                      <PanelRightOpenIcon data-icon="inline-start" />
                      لوحة مؤقتة
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>لوحة معاينة</SheetTitle>
                        <SheetDescription>
                          هذه اللوحة موجودة فقط لاختبار مكون Sheet واتجاه RTL.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-5">
            <SectionHeader
              title="البطاقات والحالات"
              description="مكونات مشتركة قابلة لإعادة الاستخدام في المراحل التالية."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="دروس جاهزة"
                value="12"
                description="بيان ثابت للمعاينة"
                status="success"
                statusLabel="مستقر"
                icon={GraduationCapIcon}
              />
              <StatCard
                title="مهام معلقة"
                value="4"
                description="حالة تجريبية فقط"
                status="warning"
                statusLabel="تنبيه"
                icon={BookOpenIcon}
              />
              <LoadingCard />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <EmptyState
                title="لا توجد عناصر بعد"
                description="هذه حالة فارغة عامة يمكن استخدامها عندما لا تتوفر بيانات."
              />
              <ErrorState
                title="تعذر تحميل المحتوى"
                description="رسالة خطأ عامة بدون ربط بأي API في هذه المرحلة."
              />
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <Card>
              <CardHeader>
                <CardTitle>التنبيهات والتحميل</CardTitle>
                <CardDescription>
                  ملاحظات دلالية ومؤشرات هيكلية للحالات المؤقتة.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Alert>
                  <CircleCheckIcon aria-hidden="true" />
                  <AlertTitle>تم تجهيز الأساس</AlertTitle>
                  <AlertDescription>
                    يمكن استخدام هذه الأنماط لبناء صفحات حقيقية في المرحلة
                    التالية.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircleIcon aria-hidden="true" />
                  <AlertTitle>تنبيه دلالي</AlertTitle>
                  <AlertDescription>
                    هذه عينة شكلية لا تمثل خطأ في التطبيق.
                  </AlertDescription>
                </Alert>
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>السلوك المتجاوب</CardTitle>
                <CardDescription>
                  الحاويات والبطاقات تتحول من عمود واحد إلى شبكات أوسع حسب
                  المساحة.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-secondary p-4 text-sm">
                    بداية المحتوى
                  </div>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    منتصف المحتوى
                  </div>
                  <div className="rounded-lg bg-accent p-4 text-sm text-accent-foreground">
                    نهاية المحتوى
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <AvatarGroup>
                    <Avatar>
                      <AvatarFallback>ط</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>ع</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
                  <Button variant="outline" disabled>
                    <LoaderIcon data-icon="inline-start" />
                    زر معطل
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  نهاية البطاقة تبدأ بصريا من الجهة الصحيحة في RTL.
                </span>
                <PaletteIcon aria-hidden="true" />
              </CardFooter>
            </Card>
          </section>
        </div>
      </Container>
    </main>
  );
}
