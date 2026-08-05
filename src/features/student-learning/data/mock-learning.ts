import type { CenterSessionResult, ExamAssignment, LearningLesson, LessonProgress, OnlineExam, PaperExamResult, PlaybackDescriptor } from "../types/learning";

export const lessonDetails: LearningLesson[] = [
  { id: "math-l1", unitId: "math-u1", unitTitle: "أساسيات التفاضل", title: "مراجعة النهايات", preview: true, duration: "35 دقيقة", description: "مراجعة هادئة للقواعد التي ستحتاجينها قبل التفاضل.", published: true, attachmentNames: ["ورقة القواعد الأساسية"] },
  { id: "math-l2", unitId: "math-u1", unitTitle: "أساسيات التفاضل", title: "قواعد الاشتقاق", duration: "45 دقيقة", description: "تطبيقات مباشرة على قواعد الاشتقاق الأكثر استخدامًا.", published: true, attachmentNames: ["ملخص القواعد", "تدريبات قصيرة"] },
  { id: "math-l3", unitId: "math-u2", unitTitle: "تطبيقات التفاضل", title: "الحركة والمعدلات", duration: "42 دقيقة", description: "ربط السرعة والعجلة بالمشتقات في مسائل مرتبة.", published: true, attachmentNames: ["تدريبات الحركة"], examId: "online-math-motion" },
  { id: "math-l4", unitId: "math-u2", unitTitle: "تطبيقات التفاضل", title: "معادلة المماس", duration: "48 دقيقة", description: "مسائل على المماس والعمودي مع خطوات واضحة.", published: false, attachmentNames: [] },
  { id: "phy-l1", unitId: "phy-u1", unitTitle: "الكهرباء والموجات", title: "القوانين الأساسية", preview: true, duration: "40 دقيقة", description: "مراجعة مركزة للقوانين الأساسية قبل التدريب.", published: true, attachmentNames: ["ملخص القوانين"] },
  { id: "phy-l2", unitId: "phy-u1", unitTitle: "الكهرباء والموجات", title: "تدريب شامل", duration: "55 دقيقة", description: "تدريب شامل على أفكار المراجعة النهائية.", published: true, attachmentNames: ["بنك أسئلة المراجعة"], examId: "online-physics-review" },
];

export const lessonProgressSeed: LessonProgress[] = [
  { lessonId: "math-l1", status: "COMPLETED", progressPercent: 100, completedAt: "2026-08-02T14:00:00" },
  { lessonId: "math-l2", status: "COMPLETED", progressPercent: 100, completedAt: "2026-08-03T14:00:00" },
  { lessonId: "math-l3", status: "IN_PROGRESS", progressPercent: 68, lastOpenedAt: "2026-08-05T11:30:00", lastPlaybackPositionSeconds: 1020 },
  { lessonId: "phy-l1", status: "COMPLETED", progressPercent: 100 },
  { lessonId: "phy-l2", status: "IN_PROGRESS", progressPercent: 42, lastOpenedAt: "2026-08-04T10:00:00" },
];

const playback: Record<string, PlaybackDescriptor> = {
  "math-l1": { kind: "YOUTUBE_UNLISTED", videoId: "dQw4w9WgXcQ", title: "مراجعة النهايات" },
  "math-l2": { kind: "YOUTUBE_UNLISTED", videoId: "L_jWHffIx5E", title: "قواعد الاشتقاق" },
  "math-l3": { kind: "YOUTUBE_UNLISTED", videoId: "3JZ_D3ELwOQ", title: "الحركة والمعدلات" },
  "phy-l1": { kind: "YOUTUBE_UNLISTED", videoId: "kJQP7kiw5Fk", title: "القوانين الأساسية" },
  "phy-l2": { kind: "YOUTUBE_UNLISTED", videoId: "fJ9rUzIMcZQ", title: "تدريب شامل" },
};
export const getPlaybackFixture = (lessonId: string) => playback[lessonId] ?? null;

export const onlineExams: OnlineExam[] = [
  { id: "online-math-motion", courseId: "math-term-3", title: "تدريب الحركة والمعدلات", teacher: "أ. محمود سامي", subject: "الرياضيات", status: "AVAILABLE", availableFrom: "2026-08-04T08:00:00", availableUntil: "2026-08-15T22:00:00", durationMinutes: 20, attemptsAllowed: 2, attemptsUsed: 0, maxScore: 10, passingScore: 5, requiresFullscreen: true, maxViolations: 3, resultVisibility: "IMMEDIATE", questions: [
    { id: "q1", type: "SINGLE_CHOICE", text: "إذا كانت السرعة تتغير بمعدل ثابت، فما الأداة المناسبة لدراسة التغير؟", options: [{ id: "a", label: "الاشتقاق" }, { id: "b", label: "التجميع فقط" }], correctOptionIds: ["a"], maxScore: 2 },
    { id: "q2", type: "MULTIPLE_CHOICE", text: "اختاري ما يرتبط بمسائل الحركة.", options: [{ id: "a", label: "السرعة" }, { id: "b", label: "العجلة" }, { id: "c", label: "القافية" }], correctOptionIds: ["a", "b"], maxScore: 3 },
    { id: "q3", type: "TRUE_FALSE", text: "العجلة هي معدل تغير السرعة.", correctBoolean: true, maxScore: 2 },
    { id: "q4", type: "SHORT_TEXT", text: "اكتبي خطوة واحدة تبدأين بها حل مسألة حركة.", maxScore: 3 },
  ] },
  { id: "online-physics-review", courseId: "physics-revision-3", title: "اختبار مراجعة الفيزياء", teacher: "د. ندى عادل", subject: "الفيزياء", status: "UPCOMING", availableFrom: "2026-08-12T09:00:00", availableUntil: "2026-08-13T22:00:00", durationMinutes: 30, attemptsAllowed: 1, attemptsUsed: 0, maxScore: 20, requiresFullscreen: false, maxViolations: 0, resultVisibility: "SCHEDULED", questions: [] },
  { id: "online-closed", courseId: "arabic-term-3", title: "اختبار البلاغة الشهري", teacher: "أ. هالة يوسف", subject: "اللغة العربية", status: "EXPIRED", availableFrom: "2026-07-01T09:00:00", availableUntil: "2026-07-02T22:00:00", durationMinutes: 25, attemptsAllowed: 1, attemptsUsed: 1, maxScore: 15, requiresFullscreen: false, maxViolations: 0, resultVisibility: "HIDDEN", questions: [] },
];
export const examAssignments: ExamAssignment[] = [
  { id: "assignment-1", studentId: "student-1", examId: "online-math-motion", audience: "ONLINE_STUDENTS" },
  { id: "assignment-2", studentId: "student-1", examId: "online-physics-review", audience: "ALL_COURSE_STUDENTS" },
  { id: "assignment-3", studentId: "student-1", examId: "online-closed", audience: "SELECTED_STUDENTS" },
];

export const centerSessionResults: CenterSessionResult[] = [
  { id: "center-score-1", type: "CENTER_SESSION_ASSESSMENT", courseId: "math-term-3", title: "تقييم الحصة الثامنة", subject: "الرياضيات", teacher: "أ. محمود سامي", date: "2026-08-03", attendance: "PRESENT", maxScore: 10, studentScore: 8.5 },
  { id: "center-score-2", type: "CENTER_SESSION_ASSESSMENT", courseId: "math-term-3", title: "الحصة السابعة", subject: "الرياضيات", teacher: "أ. محمود سامي", date: "2026-07-30", attendance: "PRESENT" },
  { id: "center-score-3", type: "CENTER_SESSION_ASSESSMENT", courseId: "math-term-3", title: "الحصة السادسة", subject: "الرياضيات", teacher: "أ. محمود سامي", date: "2026-07-27", attendance: "ABSENT", maxScore: 10 },
];
export const paperExamResults: PaperExamResult[] = [
  { id: "paper-1", type: "PAPER_EXAM", courseId: "math-term-3", title: "امتحان رياضيات ورقي", subject: "الرياضيات", teacher: "أ. محمود سامي", date: "2026-07-20", maxScore: 30, studentScore: 24, status: "GRADED", note: "راجعي أسئلة المعدلات." },
  { id: "paper-2", type: "PAPER_EXAM", courseId: "physics-revision-3", title: "امتحان فيزياء تجريبي", subject: "الفيزياء", teacher: "د. ندى عادل", date: "2026-07-22", maxScore: 25, status: "ABSENT" },
];
