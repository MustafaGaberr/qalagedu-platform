import type { AccessPackageType, CatalogLesson } from "@/features/public-catalog/types/catalog";
import type { OnlineEntitlement } from "@/features/student-access/types/access";

export type LessonProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type LessonAccessState = "UNLOCKED" | "LOCKED" | "NOT_PUBLISHED" | "EXPIRED" | "NOT_INCLUDED";
export type ExamType = "ONLINE_EXAM" | "CENTER_SESSION_ASSESSMENT" | "PAPER_EXAM";
export type OnlineExamStatus = "UPCOMING" | "AVAILABLE" | "IN_PROGRESS" | "SUBMITTED" | "GRADED" | "EXPIRED";
export type ExamQuestionType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_TEXT";
export type AntiCheatEventType = "FULLSCREEN_EXIT" | "PAGE_HIDDEN" | "WINDOW_BLUR" | "COPY_ATTEMPT" | "PASTE_ATTEMPT" | "CONTEXT_MENU_ATTEMPT";

export type StudentCourseAccess = {
  courseId: string;
  entitlement: OnlineEntitlement;
  accessState: "ACTIVE" | "EXPIRED";
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextLessonId: string | undefined;
};

export type LessonProgress = {
  lessonId: string;
  status: LessonProgressStatus;
  progressPercent: number;
  lastOpenedAt?: string;
  completedAt?: string;
  lastPlaybackPositionSeconds?: number;
};

export type LessonAccessDecision = {
  courseId: string;
  lesson: LearningLesson;
  state: LessonAccessState;
  reason: string;
  action: { label: string; href: string };
  entitlement?: OnlineEntitlement;
};

/** This descriptor is intentionally available only to authenticated lesson selectors. */
export type PlaybackDescriptor = { kind: "YOUTUBE_UNLISTED"; videoId: string; title: string };

export type LearningLesson = CatalogLesson & {
  unitId: string;
  unitTitle: string;
  description: string;
  published: boolean;
  attachmentNames: string[];
  examId?: string;
};

export type LearningCourse = StudentCourseAccess & {
  title: string;
  cover: string;
  teacher: string;
  subject: string;
  grade: string;
  packageType: AccessPackageType;
  packageTitle: string;
  expiresAt?: string;
  lessons: LearningLesson[];
};

export type ExamQuestion = {
  id: string;
  type: ExamQuestionType;
  text: string;
  options?: { id: string; label: string }[];
  maxScore: number;
  correctOptionIds?: string[];
  correctBoolean?: boolean;
};

export type ExamAssignment = { id: string; studentId: string; examId: string; audience: "ALL_COURSE_STUDENTS" | "ONLINE_STUDENTS" | "CENTER_STUDENTS" | "CENTER_GROUP" | "SELECTED_STUDENTS" };
export type OnlineExam = {
  id: string;
  courseId: string;
  title: string;
  teacher: string;
  subject: string;
  status: OnlineExamStatus;
  availableFrom: string;
  availableUntil: string;
  durationMinutes: number;
  attemptsAllowed: number;
  attemptsUsed: number;
  maxScore: number;
  passingScore?: number;
  requiresFullscreen: boolean;
  maxViolations: number;
  resultVisibility: "IMMEDIATE" | "SCHEDULED" | "HIDDEN";
  questions: ExamQuestion[];
};

export type ExamAnswer = { questionId: string; selectedOptionIds?: string[]; booleanAnswer?: boolean; textAnswer?: string };
export type AntiCheatEvent = { id: string; type: AntiCheatEventType; occurredAt: string };
export type ExamAttempt = { id: string; examId: string; startedAt: string; answers: ExamAnswer[]; violations: AntiCheatEvent[]; status: "IN_PROGRESS" | "SUBMITTED"; };
export type OnlineExamResult = { id: string; type: "ONLINE_EXAM"; examId: string; courseId: string; title: string; subject: string; teacher: string; date: string; score?: number; maxScore: number; percentage?: number; status: "GRADED" | "PENDING_REVIEW" | "HIDDEN"; violations: number; pendingManualReview: boolean; };
export type CenterSessionResult = { id: string; type: "CENTER_SESSION_ASSESSMENT"; courseId: string; title: string; subject: string; teacher: string; date: string; attendance: "PRESENT" | "ABSENT"; maxScore?: number; studentScore?: number; };
export type PaperExamResult = { id: string; type: "PAPER_EXAM"; courseId: string; title: string; subject: string; teacher: string; date: string; maxScore: number; studentScore?: number; status: "GRADED" | "ABSENT" | "NOT_SUBMITTED"; note?: string; };
export type UnifiedStudentResult = OnlineExamResult | CenterSessionResult | PaperExamResult;
