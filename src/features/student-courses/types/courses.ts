import type { CourseTone } from "@/features/student-dashboard/types/dashboard";

export type CourseEnrollmentStatus = "active" | "completed" | "requires-renewal";

export type LessonStatus = "available" | "completed" | "locked" | "scheduled";

export type LessonType = "video" | "revision" | "exam" | "assignment";

export type CourseScheduleEntry = {
  id: string;
  dayLabel: string;
  time: string;
  mode: "online" | "center";
  locationLabel: string;
};

export type CourseTeacherInfo = {
  name: string;
  title: string;
  bio: string;
};

export type StudentCourseSummary = {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  grade: string;
  group: string;
  description: string;
  tone: CourseTone;
  enrollmentStatus: CourseEnrollmentStatus;
  enrollmentStatusLabel: string;
  subscriptionStatus: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  assessmentsCount: number;
  resourcesCount: number;
  nextLesson: string | null;
  nextLessonId: string | null;
  nextLessonActionLabel: string;
  lastActivity: string;
  nextSession: string | null;
};

export type CourseLesson = {
  id: string;
  title: string;
  description: string;
  order: number;
  type: LessonType;
  durationMinutes: number;
  status: LessonStatus;
  statusLabel: string;
  actionLabel: string;
  availabilityDate?: string;
  lockedReason?: string;
  resourcesCount: number;
  hasExam: boolean;
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  order: number;
  progress: number;
  lessons: CourseLesson[];
};

export type StudentCourseDetails = StudentCourseSummary & {
  teacherInfo: CourseTeacherInfo;
  modules: CourseModule[];
  schedule: CourseScheduleEntry[];
  currentModule: string | null;
  nextRecommendedLesson: string | null;
};

export type CourseStatusFilter = "all" | CourseEnrollmentStatus;

export interface StudentCoursesRepository {
  getMyCourses(): Promise<StudentCourseSummary[]>;
  getCourseById(courseId: string): Promise<StudentCourseDetails | null>;
}
