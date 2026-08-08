export type CourseTone = "emerald" | "amber" | "sky" | "rose";

export type Student = {
  id: string;
  firstName: string;
  fullName: string;
  grade: string;
  group: string;
  avatarInitials: string;
};

export type StudentCourseStatus = "active" | "locked" | "review";

export type StudentCourse = {
  id: string;
  cover: string;
  subject: string;
  teacher: string;
  grade: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextLesson: string;
  status: StudentCourseStatus;
  statusLabel: string;
  tone: CourseTone;
};

export type NextLesson = {
  id: string;
  courseId: string;
  courseName: string;
  teacher: string;
  title: string;
  lessonNumber: number;
  progress: number;
  durationMinutes: number;
  isLocked: boolean;
  unlockMessage: string;
  tone: CourseTone;
  thumbnailUrl?: string;
};

export type ScheduleItem = {
  id: string;
  dateLabel: string;
  time: string;
  course: string;
  teacher: string;
  group: string;
  mode: "online" | "center";
  locationLabel: string;
};

export type LatestExamResult = {
  id: string;
  examName: string;
  course: string;
  score: number;
  totalScore: number;
  percentage: number;
  status: "passed" | "needs-review";
  statusLabel: string;
  message: string;
};

export type AttendanceSummary = {
  percentage: number;
  presentCount: number;
  absenceCount: number;
  latestRecord: {
    dateLabel: string;
    course: string;
    statusLabel: string;
  };
};

export type NotificationType = "lesson" | "result" | "file" | "schedule";

export type StudentNotification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  dateLabel: string;
  unread: boolean;
};

export type DashboardStat = {
  id: string;
  title: string;
  value: string;
  description: string;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  href?: string;
  disabled?: boolean;
};

export type StudentDashboardData = {
  student: Student;
  statusSummary: string;
  stats: DashboardStat[];
  activeCourses: StudentCourse[];
  nextLesson: NextLesson | null;
  schedule: ScheduleItem[];
  latestResult: LatestExamResult | null;
  attendance: AttendanceSummary;
  notifications: StudentNotification[];
  quickActions: QuickAction[];
};

export interface StudentDashboardRepository {
  getDashboard(): Promise<StudentDashboardData>;
}
