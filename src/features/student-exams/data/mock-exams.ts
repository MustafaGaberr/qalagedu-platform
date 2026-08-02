import type {
  StudentExamQuestion,
  StudentExamStatus,
  StudentExamSubmission,
  StudentExamType,
} from "@/features/student-exams/types/exams";

export type MockStudentExamSeed = {
  id: string;
  courseId: string;
  lessonId?: string;
  resultAttemptId?: string;
  title: string;
  description: string;
  type: StudentExamType;
  status: StudentExamStatus;
  availabilityDate: string;
  dueDate: string;
  durationMinutes: number;
  passingScore: number;
  attemptsAllowed: number;
  attemptsUsed: number;
  instructions: string[];
  warnings: string[];
  questions: StudentExamQuestion[];
};

export type MockSeedAttempt = {
  id: string;
  examId: string;
  submittedAt: string;
  durationUsed: number;
  submission: StudentExamSubmission;
};

const defaultInstructions = [
  "أجب عن كل سؤال قبل التسليم قدر الإمكان.",
  "يبدأ العداد عند فتح محاولة الاختبار.",
  "هذه محاولة تجريبية ولا يتم حفظها بشكل دائم في هذا النموذج.",
  "بعد إنشاء النتيجة التجريبية لا يمكن تعديل الإجابات داخل نفس المحاولة.",
];

const defaultWarnings = [
  "لا تغلق الصفحة أثناء المحاولة لأن الحالة محفوظة في الذاكرة فقط.",
  "لا توجد مراقبة أو نظام منع غش في هذه المرحلة.",
];

export const mockStudentExamSeeds: MockStudentExamSeed[] = [
  {
    id: "math-basic-derivatives-quiz",
    courseId: "math-3sec",
    lessonId: "math-basic-derivatives",
    resultAttemptId: "attempt-math-basic-derivatives-1",
    title: "اختبار سريع على قواعد الاشتقاق",
    description: "تثبيت القواعد الأساسية قبل تطبيقات المماس والحركة.",
    type: "lesson-quiz",
    status: "completed",
    availabilityDate: "متاح للمراجعة",
    dueDate: "تم التسليم منذ 3 أيام",
    durationMinutes: 12,
    passingScore: 6,
    attemptsAllowed: 1,
    attemptsUsed: 1,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "math-basic-q1",
        order: 1,
        type: "multiple-choice",
        text: "إذا كانت د(س) = س^3، فما قيمة د'(س)؟",
        options: [
          { id: "a", text: "3س^2" },
          { id: "b", text: "س^2" },
          { id: "c", text: "3س" },
          { id: "d", text: "س^4" },
        ],
        correctAnswer: { type: "option", optionId: "a" },
        score: 2,
        explanation: "قاعدة القوة: مشتقة س^ن تساوي ن س^(ن-1).",
      },
      {
        id: "math-basic-q2",
        order: 2,
        type: "true-false",
        text: "مشتقة الثابت تساوي صفرا.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 2,
        explanation: "الثابت لا يتغير مع س، لذلك معدل تغيره يساوي صفرا.",
      },
      {
        id: "math-basic-q3",
        order: 3,
        type: "multiple-choice",
        text: "مشتقة 5س هي:",
        options: [
          { id: "a", text: "5س" },
          { id: "b", text: "5" },
          { id: "c", text: "س" },
          { id: "d", text: "0" },
        ],
        correctAnswer: { type: "option", optionId: "b" },
        score: 2,
      },
      {
        id: "math-basic-q4",
        order: 4,
        type: "true-false",
        text: "يمكن جمع مشتقات الحدود منفصلة ثم جمع النتائج.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 2,
      },
    ],
  },
  {
    id: "math-tangent-assignment",
    courseId: "math-3sec",
    lessonId: "math-tangent-problems",
    title: "تقييم قصير على المماس والعمودي",
    description: "أسئلة مباشرة على الميل ومعادلة المماس والعمودي.",
    type: "homework-assessment",
    status: "available",
    availabilityDate: "متاح الآن",
    dueDate: "ينتهي الخميس 10:00 م",
    durationMinutes: 18,
    passingScore: 6,
    attemptsAllowed: 2,
    attemptsUsed: 0,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "math-tangent-q1",
        order: 1,
        type: "multiple-choice",
        text: "ميل المماس لمنحنى ص = س^2 عند س = 3 يساوي:",
        options: [
          { id: "a", text: "3" },
          { id: "b", text: "6" },
          { id: "c", text: "9" },
          { id: "d", text: "12" },
        ],
        correctAnswer: { type: "option", optionId: "b" },
        score: 2,
        explanation: "المشتقة 2س، وعند س = 3 يكون الميل 6.",
      },
      {
        id: "math-tangent-q2",
        order: 2,
        type: "true-false",
        text: "ميل العمودي يساوي مقلوب ميل المماس بنفس الإشارة.",
        options: [],
        correctAnswer: { type: "boolean", value: false },
        score: 2,
        explanation: "ميل العمودي هو السالب المقلوب لميل المماس.",
      },
      {
        id: "math-tangent-q3",
        order: 3,
        type: "multiple-choice",
        text: "إذا كان ميل المماس 4، فإن ميل العمودي هو:",
        options: [
          { id: "a", text: "4" },
          { id: "b", text: "-4" },
          { id: "c", text: "-1/4" },
          { id: "d", text: "1/4" },
        ],
        correctAnswer: { type: "option", optionId: "c" },
        score: 2,
      },
      {
        id: "math-tangent-q4",
        order: 4,
        type: "multiple-choice",
        text: "الصيغة ص - ص1 = م(س - س1) تستخدم لكتابة:",
        options: [
          { id: "a", text: "معادلة خط مستقيم" },
          { id: "b", text: "مساحة مثلث" },
          { id: "c", text: "نهاية دالة" },
          { id: "d", text: "تكامل دالة" },
        ],
        correctAnswer: { type: "option", optionId: "a" },
        score: 2,
      },
    ],
  },
  {
    id: "physics-wave-quiz",
    courseId: "physics-3sec",
    lessonId: "physics-wave-quiz",
    resultAttemptId: "attempt-physics-wave-quiz-1",
    title: "اختبار قصير: الحركة الموجية",
    description: "مراجعة أساسية على الطول الموجي والتردد والسرعة.",
    type: "lesson-quiz",
    status: "completed",
    availabilityDate: "متاح للمراجعة",
    dueDate: "تم التسليم منذ ساعتين",
    durationMinutes: 15,
    passingScore: 24,
    attemptsAllowed: 1,
    attemptsUsed: 1,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "physics-wave-q1",
        order: 1,
        type: "multiple-choice",
        text: "العلاقة الصحيحة بين سرعة الموجة والتردد والطول الموجي هي:",
        options: [
          { id: "a", text: "ع = ت / ل" },
          { id: "b", text: "ع = ت × ل" },
          { id: "c", text: "ع = ل / ت" },
          { id: "d", text: "ع = ت + ل" },
        ],
        correctAnswer: { type: "option", optionId: "b" },
        score: 10,
        explanation: "سرعة الموجة تساوي التردد مضروبا في الطول الموجي.",
      },
      {
        id: "physics-wave-q2",
        order: 2,
        type: "true-false",
        text: "زيادة التردد مع ثبات السرعة تقلل الطول الموجي.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 10,
      },
      {
        id: "physics-wave-q3",
        order: 3,
        type: "multiple-choice",
        text: "وحدة قياس التردد هي:",
        options: [
          { id: "a", text: "نيوتن" },
          { id: "b", text: "هرتز" },
          { id: "c", text: "جول" },
          { id: "d", text: "متر" },
        ],
        correctAnswer: { type: "option", optionId: "b" },
        score: 10,
      },
      {
        id: "physics-wave-q4",
        order: 4,
        type: "true-false",
        text: "الطول الموجي هو المسافة بين قمتين متتاليتين.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 10,
      },
    ],
  },
  {
    id: "physics-ac-circuits-exam",
    courseId: "physics-3sec",
    lessonId: "physics-ac-circuits",
    title: "اختبار دوائر التيار المتردد",
    description: "قياس فهم الرسم والعلاقات الأساسية في دوائر التيار المتردد.",
    type: "module-exam",
    status: "available",
    availabilityDate: "متاح الآن",
    dueDate: "ينتهي غدا 11:00 م",
    durationMinutes: 20,
    passingScore: 12,
    attemptsAllowed: 2,
    attemptsUsed: 0,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "physics-ac-q1",
        order: 1,
        type: "true-false",
        text: "التيار المتردد يغير اتجاهه دوريا.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 4,
      },
      {
        id: "physics-ac-q2",
        order: 2,
        type: "multiple-choice",
        text: "العنصر الذي يعارض تغير التيار في الدائرة هو:",
        options: [
          { id: "a", text: "الملف" },
          { id: "b", text: "المفتاح" },
          { id: "c", text: "الأميتر" },
          { id: "d", text: "السلك المثالي" },
        ],
        correctAnswer: { type: "option", optionId: "a" },
        score: 4,
      },
      {
        id: "physics-ac-q3",
        order: 3,
        type: "multiple-choice",
        text: "عند زيادة التردد في دائرة حثية نقية فإن الممانعة الحثية:",
        options: [
          { id: "a", text: "تقل" },
          { id: "b", text: "تزيد" },
          { id: "c", text: "تنعدم" },
          { id: "d", text: "لا تتغير" },
        ],
        correctAnswer: { type: "option", optionId: "b" },
        score: 4,
      },
      {
        id: "physics-ac-q4",
        order: 4,
        type: "true-false",
        text: "قراءة الرسم البياني تساعد على تحديد فرق الطور.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 4,
      },
    ],
  },
  {
    id: "arabic-revival-quiz",
    courseId: "arabic-3sec",
    lessonId: "arabic-revival-school",
    title: "اختبار مدرسة الإحياء والبعث",
    description: "اختبار مقرر بعد نشر الدرس الحالي في الأدب الحديث.",
    type: "lesson-quiz",
    status: "upcoming",
    availabilityDate: "يفتح الخميس 05:00 م",
    dueDate: "ينتهي الجمعة 10:00 م",
    durationMinutes: 15,
    passingScore: 6,
    attemptsAllowed: 1,
    attemptsUsed: 0,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "arabic-revival-q1",
        order: 1,
        type: "multiple-choice",
        text: "من رواد مدرسة الإحياء والبعث:",
        options: [
          { id: "a", text: "البارودي" },
          { id: "b", text: "السياب" },
          { id: "c", text: "نازك الملائكة" },
          { id: "d", text: "أمل دنقل" },
        ],
        correctAnswer: { type: "option", optionId: "a" },
        score: 2,
      },
      {
        id: "arabic-revival-q2",
        order: 2,
        type: "true-false",
        text: "اعتمد شعراء الإحياء على العودة إلى قوة الشعر العربي القديم.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 2,
      },
    ],
  },
  {
    id: "biology-endocrine-check",
    courseId: "biology-renewal",
    lessonId: "biology-endocrine",
    title: "تقييم الغدد الصماء",
    description: "يفتح بعد تجديد الاشتراك وفتح درس الغدد الصماء.",
    type: "lesson-quiz",
    status: "locked",
    availabilityDate: "مغلق حاليا",
    dueDate: "غير محدد",
    durationMinutes: 15,
    passingScore: 6,
    attemptsAllowed: 1,
    attemptsUsed: 0,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "biology-endocrine-q1",
        order: 1,
        type: "true-false",
        text: "الغدد الصماء تفرز هرموناتها مباشرة في الدم.",
        options: [],
        correctAnswer: { type: "boolean", value: true },
        score: 2,
      },
    ],
  },
  {
    id: "math-final-revision",
    courseId: "math-3sec",
    title: "اختبار مراجعة نهائية في التفاضل",
    description: "اختبار نهائي تجريبي انتهى موعده في خطة الشهر.",
    type: "final-exam",
    status: "expired",
    availabilityDate: "كان متاحا الأسبوع الماضي",
    dueDate: "انتهى منذ يومين",
    durationMinutes: 45,
    passingScore: 30,
    attemptsAllowed: 1,
    attemptsUsed: 0,
    instructions: defaultInstructions,
    warnings: defaultWarnings,
    questions: [
      {
        id: "math-final-q1",
        order: 1,
        type: "multiple-choice",
        text: "أي مما يلي يمثل تطبيقا مباشرا للمشتقة؟",
        options: [
          { id: "a", text: "حساب الميل اللحظي" },
          { id: "b", text: "جمع الأعداد فقط" },
          { id: "c", text: "ترتيب الحروف" },
          { id: "d", text: "حساب المتوسط الحسابي فقط" },
        ],
        correctAnswer: { type: "option", optionId: "a" },
        score: 10,
      },
    ],
  },
];

export const mockSeedAttempts: MockSeedAttempt[] = [
  {
    id: "attempt-math-basic-derivatives-1",
    examId: "math-basic-derivatives-quiz",
    submittedAt: "الأربعاء 07:45 م",
    durationUsed: 9,
    submission: {
      durationUsed: 9,
      answers: [
        { questionId: "math-basic-q1", selectedOptionId: "a" },
        { questionId: "math-basic-q2", booleanAnswer: true },
        { questionId: "math-basic-q3", selectedOptionId: "b" },
        { questionId: "math-basic-q4", booleanAnswer: false },
      ],
    },
  },
  {
    id: "attempt-physics-wave-quiz-1",
    examId: "physics-wave-quiz",
    submittedAt: "اليوم 04:20 م",
    durationUsed: 12,
    submission: {
      durationUsed: 12,
      answers: [
        { questionId: "physics-wave-q1", selectedOptionId: "b" },
        { questionId: "physics-wave-q2", booleanAnswer: true },
        { questionId: "physics-wave-q3", selectedOptionId: "b" },
        { questionId: "physics-wave-q4", booleanAnswer: false },
      ],
    },
  },
];
