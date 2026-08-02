import type {
  LessonAssessmentPlaceholder,
  LessonResource,
} from "@/features/student-lessons/types/lessons";

type LessonExtra = {
  summary: string;
  description: string;
  publishedDate: string;
  videoSourcePlaceholder: string;
  learningGoals: string[];
  prerequisites: string[];
  resources: LessonResource[];
  assessment: LessonAssessmentPlaceholder | null;
  studentNotesPlaceholder: string;
};

const defaultGoals = [
  "فهم فكرة الدرس وربطها بما سبق.",
  "تطبيق القاعدة على مثالين تدريجيين.",
  "تحديد الأسئلة التي تحتاج مراجعة قبل الحصة القادمة.",
];

export const mockLessonExtras: Record<string, LessonExtra> = {
  "math-limits-refresh": {
    summary: "مراجعة مركزة للنهايات والقواعد التي يحتاجها التفاضل.",
    description:
      "يرتب هذا الدرس الأساسيات التي تظهر كثيرا داخل مسائل التفاضل، مع أمثلة قصيرة تساعدك على تذكر القاعدة قبل استخدامها في تطبيقات الحركة.",
    publishedDate: "نشر منذ 12 يوم",
    videoSourcePlaceholder: "mock://lessons/math-limits-refresh",
    learningGoals: defaultGoals,
    prerequisites: ["حل أمثلة النهايات الأساسية", "مراجعة الرموز المستخدمة في الاشتقاق"],
    resources: [
      {
        id: "math-limits-summary",
        title: "ملخص قوانين النهايات",
        type: "summary",
        typeLabel: "ملخص",
        fileSize: "1.2 MB",
        description: "ورقة مختصرة بالقواعد الأساسية.",
        available: true,
        mockUrl: "#mock-resource",
      },
      {
        id: "math-limits-worksheet",
        title: "تدريب قصير",
        type: "worksheet",
        typeLabel: "ورقة تدريب",
        fileSize: "740 KB",
        description: "أسئلة سريعة قبل الانتقال للدرس التالي.",
        available: true,
        mockUrl: "#mock-resource",
      },
    ],
    assessment: null,
    studentNotesPlaceholder: "اكتب ملاحظتك عن أكثر قاعدة تحتاج مراجعة...",
  },
  "math-basic-derivatives": {
    summary: "شرح قواعد الاشتقاق الأساسية في ورقة واحدة.",
    description:
      "يركز الدرس على القواعد الأكثر استخداما داخل امتحانات التفاضل، مع أمثلة مباشرة على كل قاعدة وتحذيرات من الأخطاء المتكررة.",
    publishedDate: "نشر منذ 10 أيام",
    videoSourcePlaceholder: "mock://lessons/math-basic-derivatives",
    learningGoals: [
      "تمييز قاعدة الاشتقاق المناسبة لكل صيغة.",
      "حل أمثلة مباشرة دون خلط بين القواعد.",
      "تجهيز ورقة مراجعة شخصية للقوانين.",
    ],
    prerequisites: ["إكمال مراجعة النهايات", "معرفة الرموز الأساسية للدوال"],
    resources: [
      {
        id: "math-derivatives-pdf",
        title: "قواعد الاشتقاق PDF",
        type: "pdf",
        typeLabel: "PDF",
        fileSize: "1.8 MB",
        description: "ملف مرتب للقواعد مع أمثلة محلولة.",
        available: true,
        mockUrl: "#mock-resource",
      },
    ],
    assessment: {
      id: "math-basic-derivatives-quiz",
      examId: "math-basic-derivatives-quiz",
      resultAttemptId: "attempt-math-basic-derivatives-1",
      title: "اختبار سريع على قواعد الاشتقاق",
      type: "exam",
      typeLabel: "اختبار",
      availability: "متاح للمراجعة",
      estimatedWork: "10 أسئلة",
      status: "completed",
      statusLabel: "مكتمل",
      actionLabel: "ابدأ الاختبار",
    },
    studentNotesPlaceholder: "سجل القاعدة التي تحتاج تكرارها...",
  },
  "math-tangent-problems": {
    summary: "تطبيقات امتحانية على المماس والعمودي.",
    description:
      "يشرح الدرس طريقة استخراج الميل وكتابة معادلة المماس والعمودي من المعطيات المختلفة، مع تدريب على صياغة الإجابة النهائية.",
    publishedDate: "نشر منذ 7 أيام",
    videoSourcePlaceholder: "mock://lessons/math-tangent-problems",
    learningGoals: [
      "استخراج الميل من المشتقة عند نقطة محددة.",
      "كتابة معادلة المماس والعمودي بصورة صحيحة.",
      "تحليل السؤال قبل اختيار القانون.",
    ],
    prerequisites: ["قواعد الاشتقاق الأساسية"],
    resources: [
      {
        id: "math-tangent-homework",
        title: "واجب المماس والعمودي",
        type: "homework",
        typeLabel: "واجب",
        fileSize: "960 KB",
        description: "تدريب منزلي على أفكار الدرس.",
        available: true,
        mockUrl: "#mock-resource",
      },
      {
        id: "math-tangent-solutions",
        title: "نماذج إجابة مختصرة",
        type: "pdf",
        typeLabel: "PDF",
        fileSize: "1.1 MB",
        description: "نماذج حل للمراجعة بعد المحاولة.",
        available: true,
        mockUrl: "#mock-resource",
      },
    ],
    assessment: {
      id: "math-tangent-assignment",
      examId: "math-tangent-assignment",
      title: "تكليف قصير على المماس",
      type: "assignment",
      typeLabel: "تكليف",
      availability: "متاح الآن",
      estimatedWork: "20 دقيقة",
      status: "available",
      statusLabel: "متاح",
      actionLabel: "عرض التكليف",
    },
    studentNotesPlaceholder: "اكتب مثال المماس الذي تريد مراجعته...",
  },
  "math-derivatives-motion": {
    summary: "السرعة والعجلة وربطهما بالمشتقات داخل مسائل الحركة.",
    description:
      "هذا هو الدرس الحالي في خطة التفاضل. ستتعلم كيف تنتقل من دالة الموضع إلى السرعة والعجلة، وكيف تقرأ السؤال لتحدد المطلوب بدقة.",
    publishedDate: "نشر منذ 20 دقيقة",
    videoSourcePlaceholder: "mock://lessons/math-derivatives-motion",
    learningGoals: [
      "تحويل دالة الموضع إلى سرعة وعجلة.",
      "تحديد الوحدات والمعطيات المهمة داخل السؤال.",
      "حل مسألة حركة كاملة بخطوات منظمة.",
    ],
    prerequisites: ["قواعد الاشتقاق", "معادلة المماس والعمودي"],
    resources: [
      {
        id: "math-motion-summary",
        title: "ملخص تطبيقات الحركة",
        type: "summary",
        typeLabel: "ملخص",
        fileSize: "1.5 MB",
        description: "أهم العلاقات والقوانين في صفحة واحدة.",
        available: true,
        mockUrl: "#mock-resource",
      },
      {
        id: "math-motion-worksheet",
        title: "ورقة تدريب الحركة",
        type: "worksheet",
        typeLabel: "ورقة تدريب",
        fileSize: "880 KB",
        description: "أسئلة متدرجة بعد مشاهدة الدرس.",
        available: true,
        mockUrl: "#mock-resource",
      },
    ],
    assessment: null,
    studentNotesPlaceholder: "اكتب السؤال أو القانون الذي تريد الرجوع إليه...",
  },
  "math-rates-assignment": {
    summary: "واجب تدريبي على المعدلات المرتبطة.",
    description:
      "هذا التكليف يفتح بعد إكمال درس الحركة حتى تكون جاهزا لحل مسائل المعدلات دون قفز على الأساسيات.",
    publishedDate: "مجدول",
    videoSourcePlaceholder: "mock://lessons/math-rates-assignment",
    learningGoals: defaultGoals,
    prerequisites: ["إكمال درس تطبيقات الحركة"],
    resources: [],
    assessment: {
      id: "math-rates-task",
      title: "واجب المعدلات المرتبطة",
      type: "assignment",
      typeLabel: "واجب",
      availability: "يفتح بعد إكمال الدرس السابق",
      estimatedWork: "25 دقيقة",
      status: "locked",
      statusLabel: "مغلق",
      actionLabel: "غير متاح بعد",
    },
    studentNotesPlaceholder: "يمكنك تجهيز أسئلة عن الواجب هنا...",
  },
  "math-integration-rules": {
    summary: "مدخل مجدول لقواعد التكامل الأساسية.",
    description:
      "سيصبح هذا الدرس متاحا في موعده داخل خطة الكورس. تظهر التفاصيل الآن للمساعدة في معرفة ما سيأتي لاحقا.",
    publishedDate: "مجدول",
    videoSourcePlaceholder: "mock://lessons/math-integration-rules",
    learningGoals: defaultGoals,
    prerequisites: ["إكمال تطبيقات التفاضل"],
    resources: [
      {
        id: "math-integration-preview",
        title: "ورقة تمهيد التكامل",
        type: "pdf",
        typeLabel: "PDF",
        fileSize: "1 MB",
        description: "ملف تمهيدي يفتح مع الدرس.",
        available: false,
        unavailableReason: "يفتح مع موعد الدرس.",
        mockUrl: "#mock-resource",
      },
    ],
    assessment: null,
    studentNotesPlaceholder: "اكتب ما تريد سؤاله عند فتح الدرس...",
  },
};

export function getLessonExtra(lessonId: string): LessonExtra {
  return (
    mockLessonExtras[lessonId] ?? {
      summary: "ملخص تجريبي لهذا الدرس.",
      description:
        "تفاصيل هذا الدرس جاهزة كبيانات تجريبية قابلة للاستبدال عند ربط المحتوى الحقيقي.",
      publishedDate: "نشر مؤخرا",
      videoSourcePlaceholder: `mock://lessons/${lessonId}`,
      learningGoals: defaultGoals,
      prerequisites: [],
      resources: [],
      assessment: null,
      studentNotesPlaceholder: "اكتب ملاحظاتك على هذا الدرس...",
    }
  );
}
