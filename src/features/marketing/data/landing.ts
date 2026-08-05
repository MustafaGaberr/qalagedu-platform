import {
  BookOpenCheckIcon,
  CalendarCheckIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  MessageCircleHeartIcon,
  NotebookTabsIcon,
} from "lucide-react";

import type {
  Benefit,
  CenterSchedule,
  CoursePreview,
  EducationalStage,
  FaqItem,
  HeroBanner,
  StoreProduct,
  TeacherPreview,
  Testimonial,
} from "@/features/marketing/types/marketing";

const courseImages = {
  physics: { src: "/marketing/course-physics.svg", alt: "رسم تعليمي لمادة الفيزياء" },
  math: { src: "/marketing/course-math.svg", alt: "رسم تعليمي لمادة الرياضيات" },
  arabic: { src: "/marketing/course-arabic.svg", alt: "رسم تعليمي لمادة اللغة العربية" },
} as const;

export const heroBanners = [
  {
    id: "courses",
    desktopImage: courseImages.physics.src,
    mobileImage: courseImages.physics.src,
    imageAlt: "رسم تعليمي يرمز إلى كورسات الفيزياء",
    title: "تعليم واضح يواكب طموحك في كل خطوة",
    description: "اختَر الكورس المناسب لصفك، وتابع دروسك أونلاين أو داخل السنتر في تجربة منظمة ومريحة.",
    ctaLabel: "استعرض الكورسات",
    ctaHref: "/courses",
    textPlacement: "start",
    focalPosition: "center",
    order: 1,
    active: true,
  },
  {
    id: "center",
    desktopImage: courseImages.math.src,
    mobileImage: courseImages.math.src,
    imageAlt: "رسم تعليمي يرمز إلى حصص الرياضيات داخل السنتر",
    title: "مكانك في السنتر يبدأ بخطوة بسيطة",
    description: "اطّلع على المواعيد المتاحة ثم أرسل طلب الانضمام للمجموعة المناسبة لمستواك الدراسي.",
    ctaLabel: "احجز مكانك في السنتر",
    ctaHref: "#center-schedule",
    textPlacement: "start",
    focalPosition: "center",
    order: 2,
    active: true,
  },
  {
    id: "revision",
    desktopImage: courseImages.arabic.src,
    mobileImage: courseImages.arabic.src,
    imageAlt: "رسم تعليمي يرمز إلى المراجعات النهائية",
    title: "راجع بثقة قبل الامتحان",
    description: "باقات مراجعة مركزة تساعدك على ترتيب أهم النقاط والتدريب على شكل الامتحان.",
    ctaLabel: "اكتشف المراجعات",
    ctaHref: "#revisions",
    textPlacement: "start",
    focalPosition: "center",
    order: 3,
    active: true,
  },
] satisfies HeroBanner[];

export const platformBenefits = [
  { title: "مدرسون متخصصون", description: "اختَر شرحاً يناسب المادة والصف الدراسي.", icon: GraduationCapIcon },
  { title: "متابعة الحضور والدرجات", description: "صورة أوضح لانتظام الطالب ونتائجه.", icon: CalendarCheckIcon },
  { title: "كورسات مسجلة بمرونة", description: "شاهد الدروس في الوقت الذي يناسبك.", icon: BookOpenCheckIcon },
  { title: "دعم لولي الأمر", description: "متابعة تعليمية تساعد الأسرة على الاطمئنان.", icon: MessageCircleHeartIcon },
  { title: "اشتراكات تناسب احتياجك", description: "بالحصة أو بالشهر أو بالترم.", icon: ClipboardCheckIcon },
  { title: "كتب ومراجعات منظمة", description: "كل ما تحتاجه للمذاكرة في مكان واحد.", icon: NotebookTabsIcon },
] satisfies Benefit[];

export const educationalStages = [
  { id: "secondary-1", label: "الصف الأول الثانوي", description: "ابدأ مسارك الدراسي بخطة مناسبة للمواد الأساسية.", onlineHref: "/courses?grade=secondary-1", centerHref: "/register?interest=center&grade=secondary-1" },
  { id: "secondary-2", label: "الصف الثاني الثانوي", description: "تابع دروسك وتدريباتك في مرحلة بناء التخصص.", onlineHref: "/courses?grade=secondary-2", centerHref: "/register?interest=center&grade=secondary-2" },
  { id: "secondary-3", label: "الصف الثالث الثانوي", description: "كورسات ومراجعات مكثفة لدعم الاستعداد للامتحانات.", onlineHref: "/courses?grade=secondary-3", centerHref: "/register?interest=center&grade=secondary-3" },
] satisfies EducationalStage[];

export const teacherPreviews = [
  { id: "ahmed-samir", name: "أ. أحمد سمير", subject: "فيزياء", grades: "الأول والثاني الثانوي", availability: "both", initials: "أ س", courseHref: "/courses?teacher=ahmed-samir", scheduleHref: "#center-schedule" },
  { id: "mona-adel", name: "أ. منى عادل", subject: "رياضيات", grades: "الصفوف الثانوية", availability: "online", initials: "م ع", courseHref: "/courses?teacher=mona-adel" },
  { id: "karim-hassan", name: "أ. كريم حسن", subject: "لغة عربية", grades: "الأول والثالث الثانوي", availability: "both", initials: "ك ح", courseHref: "/courses?teacher=karim-hassan", scheduleHref: "#center-schedule" },
] satisfies TeacherPreview[];

export const featuredCourses = [
  { id: "physics-foundations", title: "أساسيات الفيزياء", teacher: "أ. أحمد سمير", grade: "الأول الثانوي", subject: "فيزياء", packageType: "course", delivery: "both", lessonCount: 18, price: "٤٥٠ ج.م", previousPrice: "٥٢٠ ج.م", image: courseImages.physics, href: "/courses?course=physics-foundations" },
  { id: "math-monthly", title: "تدريبات الرياضيات الشهرية", teacher: "أ. منى عادل", grade: "الثاني الثانوي", subject: "رياضيات", packageType: "monthly", delivery: "online", lessonCount: 8, price: "٣٢٠ ج.م", image: courseImages.math, href: "/courses?course=math-monthly" },
  { id: "arabic-term", title: "إتقان اللغة العربية", teacher: "أ. كريم حسن", grade: "الثالث الثانوي", subject: "لغة عربية", packageType: "term", delivery: "both", lessonCount: 16, price: "٧٥٠ ج.م", image: courseImages.arabic, href: "/courses?course=arabic-term" },
] satisfies CoursePreview[];

export const revisionPackages = [
  { id: "physics-final", title: "مراجعة الفيزياء النهائية", teacher: "أ. أحمد سمير", grade: "الثالث الثانوي", subject: "فيزياء", packageType: "revision", delivery: "online", lessonCount: 6, price: "٢٦٠ ج.م", image: courseImages.physics, href: "/courses?course=physics-final" },
  { id: "arabic-final", title: "المراجعة النهائية في اللغة العربية", teacher: "أ. كريم حسن", grade: "الثالث الثانوي", subject: "لغة عربية", packageType: "revision", delivery: "both", lessonCount: 5, price: "٢٤٠ ج.م", image: courseImages.arabic, href: "/courses?course=arabic-final" },
] satisfies CoursePreview[];

export const storeProducts = [
  { id: "physics-notes", title: "ملزمة قوانين الفيزياء", publisher: "أ. أحمد سمير", grade: "الثالث الثانوي", subject: "فيزياء", type: "ملزمة", price: "٦٥ ج.م", image: courseImages.physics },
  { id: "arabic-exams", title: "نماذج امتحانات اللغة العربية", publisher: "فريق قلاّج", grade: "الثالث الثانوي", subject: "لغة عربية", type: "ملف مجاني", image: courseImages.arabic },
  { id: "math-summary", title: "ملخص الجبر والتفاضل", publisher: "أ. منى عادل", grade: "الثاني الثانوي", subject: "رياضيات", type: "كتاب PDF", price: "٤٥ ج.م", image: courseImages.math },
] satisfies StoreProduct[];

export const centerSchedulePreviews = [
  { id: "physics-sun", teacher: "أ. أحمد سمير", subject: "فيزياء", grade: "الثالث الثانوي", day: "الأحد", startTime: "٤:٠٠ مساءً", duration: "ساعتان", location: "قاعة ٢" },
  { id: "math-mon", teacher: "أ. منى عادل", subject: "رياضيات", grade: "الثاني الثانوي", day: "الاثنين", startTime: "٦:٠٠ مساءً", duration: "ساعتان", location: "قاعة ١" },
  { id: "arabic-wed", teacher: "أ. كريم حسن", subject: "لغة عربية", grade: "الأول الثانوي", day: "الأربعاء", startTime: "٥:٠٠ مساءً", duration: "ساعة ونصف", location: "قاعة ٣" },
] satisfies CenterSchedule[];

export const testimonials = [
  { quote: "تنظيم الدروس ساعدني أعرف المطلوب مني كل أسبوع بدون تشتت.", author: "طالبة بالصف الثاني الثانوي", relation: "رأي طالبة" },
  { quote: "وضوح مواعيد الحصص وطريقة المتابعة جعلت التواصل أسهل بالنسبة لنا.", author: "ولي أمر", relation: "رأي ولي أمر" },
] satisfies Testimonial[];

export const faqItems = [
  { question: "كيف أختار بين الدراسة أونلاين والحضور في السنتر؟", answer: "اختر المسار الأنسب لوقتك. الحضور في السنتر يبدأ بإرسال طلب انضمام، ولا يعني تأكيد الحجز فوراً." },
  { question: "هل يمكن مشاهدة الدروس في وقت آخر؟", answer: "تتوفر الكورسات المسجلة لمشاهدتها في الوقت المناسب بحسب باقة الكورس." },
  { question: "هل توجد مواد تعليمية بجانب الكورسات؟", answer: "نعم، يعرض المتجر التعليمي كتب PDF وملخصات ومراجعات وملفات مجانية أو مدفوعة." },
] satisfies FaqItem[];
