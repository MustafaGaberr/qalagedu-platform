import {
  BadgeCheckIcon,
  BookOpenCheckIcon,
  CalendarCheckIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  GraduationCapIcon,
  IdCardIcon,
  Layers3Icon,
  LineChartIcon,
  MedalIcon,
  MessageCircleHeartIcon,
  NotebookTabsIcon,
  ScanLineIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UsersRoundIcon,
} from "lucide-react";

import type {
  CoursePreview,
  FaqItem,
  FeatureHighlight,
  JourneyStep,
  TeacherPreview,
  ValueItem,
} from "@/features/marketing/types/marketing";

export const valueItems = [
  {
    title: "دروس منظمة",
    description: "كل محتوى الطالب مرتب حسب المادة والمرحلة.",
    icon: BookOpenCheckIcon,
  },
  {
    title: "اختبارات ودرجات",
    description: "معاينة واضحة لنتائج الاختبارات داخل التجربة.",
    icon: ClipboardCheckIcon,
  },
  {
    title: "متابعة الحضور",
    description: "تجربة تسويقية لعرض انتظام الطالب وغيابه.",
    icon: CalendarCheckIcon,
  },
  {
    title: "حساب واحد",
    description: "دخول واحد لكل مواد الطالب ودوراته.",
    icon: ShieldCheckIcon,
  },
] satisfies ValueItem[];

export const journeySteps = [
  {
    title: "انضم للدورة المناسبة",
    description: "يختار الطالب الدورة المرتبطة بمرحلته ومعلمه.",
  },
  {
    title: "تابع الدروس والملفات",
    description: "كل درس يظهر معه مواده وملاحظاته في ترتيب واضح.",
  },
  {
    title: "حل الاختبارات",
    description: "اختبارات تسويقية توضح شكل التقييم دون منطق امتحانات فعلي.",
  },
  {
    title: "راجع النتائج والحضور",
    description: "ملخص يساعد الطالب وولي الأمر على فهم مستوى المتابعة.",
  },
] satisfies JourneyStep[];

export const featureHighlights = [
  {
    title: "تنظيم الدورات",
    description: "تقسيم واضح حسب المادة، المرحلة، وخطة المعلم.",
    icon: Layers3Icon,
    previewLabel: "مسار المادة",
  },
  {
    title: "تقدم الدروس",
    description: "عرض بصري لما تم إنجازه وما ينتظر الطالب.",
    icon: LineChartIcon,
    previewLabel: "نسبة الإنجاز",
  },
  {
    title: "نتائج الاختبارات",
    description: "تجربة تعرض الدرجة الأخيرة واتجاه التحسن.",
    icon: MedalIcon,
    previewLabel: "آخر تقييم",
  },
  {
    title: "الحضور",
    description: "مؤشرات مختصرة تساعد على متابعة الالتزام.",
    icon: CalendarCheckIcon,
    previewLabel: "انتظام الطالب",
  },
  {
    title: "متابعة ولي الأمر",
    description: "رسائل وإشعارات مستقبلية بشكل واضح ومطمئن.",
    icon: MessageCircleHeartIcon,
    previewLabel: "متابعة الأسرة",
  },
  {
    title: "بطاقة QR للطالب",
    description: "تمثيل تسويقي لبطاقة تعريف الطالب داخل السنتر.",
    icon: ScanLineIcon,
    previewLabel: "بطاقة الطالب",
  },
] satisfies FeatureHighlight[];

export const coursePreviews = [
  {
    id: "physics-foundations",
    title: "أساسيات الفيزياء للثانوية",
    subject: "فيزياء",
    teacher: "أ. أحمد سمير",
    grade: "الصف الأول الثانوي",
    lessons: 18,
    status: "available",
    image: {
      src: "/marketing/course-physics.svg",
      alt: "رسم مبسط لدورة فيزياء",
    },
  },
  {
    id: "math-practice",
    title: "تدريبات الرياضيات المكثفة",
    subject: "رياضيات",
    teacher: "أ. منى عادل",
    grade: "الصف الثالث الإعدادي",
    lessons: 22,
    status: "available",
    image: {
      src: "/marketing/course-math.svg",
      alt: "رسم مبسط لدورة رياضيات",
    },
  },
  {
    id: "arabic-skills",
    title: "مهارات اللغة العربية",
    subject: "لغة عربية",
    teacher: "أ. كريم حسن",
    grade: "الصف الثاني الثانوي",
    lessons: 14,
    status: "soon",
    image: {
      src: "/marketing/course-arabic.svg",
      alt: "رسم مبسط لدورة لغة عربية",
    },
  },
] satisfies CoursePreview[];

export const teacherPreviews = [
  {
    id: "ahmed-samir",
    name: "أ. أحمد سمير",
    subject: "فيزياء",
    bio: "يركز على تبسيط المفاهيم وربطها بتدريبات قصيرة قابلة للمتابعة.",
    initials: "أ س",
  },
  {
    id: "mona-adel",
    name: "أ. منى عادل",
    subject: "رياضيات",
    bio: "تقدم خطط تدريب منظمة تساعد الطالب على حل المسائل بثقة.",
    initials: "م ع",
  },
  {
    id: "karim-hassan",
    name: "أ. كريم حسن",
    subject: "لغة عربية",
    bio: "يهتم ببناء مهارات القراءة والتعبير من خلال خطوات واضحة.",
    initials: "ك ح",
  },
] satisfies TeacherPreview[];

export const testimonialMessages = [
  {
    title: "رسالة ثقة مؤقتة",
    body: "هذه مساحة مخصصة لاحقا لرسائل حقيقية بعد جمع موافقات واضحة من الطلاب أو أولياء الأمور.",
    icon: UsersRoundIcon,
  },
  {
    title: "وضوح قبل الأرقام",
    body: "لا نعرض أرقاما أو تقييمات غير موثقة في هذه المرحلة، ونركز على شرح قيمة التجربة بوضوح.",
    icon: BadgeCheckIcon,
  },
  {
    title: "تجربة مناسبة للموبايل",
    body: "التصميم مجهز ليكون مقروءا وسهل الاستخدام على شاشة الطالب اليومية.",
    icon: SmartphoneIcon,
  },
];

export const faqItems = [
  {
    question: "كيف ينضم الطالب إلى دورة؟",
    answer:
      "في النسخة النهائية سيختار الطالب الدورة المناسبة من حسابه أو من خلال السنتر. هذه المرحلة تعرض الواجهة فقط بدون ربط فعلي.",
  },
  {
    question: "هل يمكن استخدام المنصة من الموبايل؟",
    answer:
      "نعم، تم بناء الواجهة لتكون متجاوبة ومناسبة للشاشات الصغيرة مع دعم كامل لاتجاه اللغة العربية.",
  },
  {
    question: "كيف يصل الطالب إلى الدروس والاختبارات؟",
    answer:
      "سيتم تنظيم الدروس والاختبارات داخل حساب الطالب في مراحل لاحقة. لا توجد صفحات دروس أو امتحانات فعلية في هذه المرحلة.",
  },
  {
    question: "كيف يتابع ولي الأمر الحضور؟",
    answer:
      "تعرض الصفحة فكرة المتابعة فقط. أي إشعارات أو تقارير فعلية ستحتاج ربطا بالbackend في مراحل لاحقة.",
  },
  {
    question: "ماذا يحدث إذا انتهى الاشتراك؟",
    answer:
      "سيتم تحديد قواعد الاشتراك والصلاحيات لاحقا. الواجهة الحالية تترك مكانا واضحا لهذه الحالة دون تنفيذ مدفوعات أو صلاحيات.",
  },
] satisfies FaqItem[];

export const previewMetrics = [
  {
    label: "تقدم الدروس",
    value: "74%",
    icon: NotebookTabsIcon,
  },
  {
    label: "معدل الحضور",
    value: "92%",
    icon: CalendarCheckIcon,
  },
  {
    label: "آخر اختبار",
    value: "جيد جدا",
    icon: FileTextIcon,
  },
  {
    label: "الحصة القادمة",
    value: "الأحد ٧ مساء",
    icon: GraduationCapIcon,
  },
];

export const heroHighlights = [
  "تجربة عربية بالكامل",
  "متابعة منظمة للدروس",
  "واجهة مناسبة للطالب وولي الأمر",
];

export const qrCardDetails = {
  title: "بطاقة الطالب",
  code: "QG-2048",
  label: "QR تجريبي",
  icon: IdCardIcon,
};
