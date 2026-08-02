import type {
  CourseLesson,
  CourseModule,
  LessonStatus,
  LessonType,
  StudentCourseDetails,
} from "@/features/student-courses/types/courses";

export type LessonResourceType = "pdf" | "worksheet" | "summary" | "homework";

export type LessonResource = {
  id: string;
  title: string;
  type: LessonResourceType;
  typeLabel: string;
  fileSize: string;
  description: string;
  available: boolean;
  unavailableReason?: string;
  mockUrl: string;
};

export type LessonAssessmentPlaceholder = {
  id: string;
  title: string;
  type: "exam" | "assignment";
  typeLabel: string;
  availability: string;
  estimatedWork: string;
  status: LessonStatus;
  statusLabel: string;
  actionLabel: string;
};

export type LessonNavigationItem = {
  id: string;
  title: string;
  lessonNumber: number;
  status: LessonStatus;
  statusLabel: string;
  href: string | null;
};

export type LessonCurriculumModule = Pick<
  CourseModule,
  "id" | "title" | "order" | "progress"
> & {
  lessons: LessonNavigationItem[];
};

export type StudentLessonDetails = {
  id: string;
  courseId: string;
  moduleId: string;
  courseTitle: string;
  courseSubject: string;
  courseProgress: number;
  moduleTitle: string;
  teacherName: string;
  teacherTitle: string;
  title: string;
  summary: string;
  description: string;
  lessonNumber: number;
  type: LessonType;
  typeLabel: string;
  durationMinutes: number;
  status: LessonStatus;
  statusLabel: string;
  actionLabel: string;
  isCompleted: boolean;
  videoSourcePlaceholder: string;
  availabilityDate?: string;
  publishedDate: string;
  lockedReason?: string;
  resources: LessonResource[];
  assessment: LessonAssessmentPlaceholder | null;
  previousLesson: LessonNavigationItem | null;
  nextLesson: LessonNavigationItem | null;
  curriculum: LessonCurriculumModule[];
  learningGoals: string[];
  prerequisites: string[];
  studentNotesPlaceholder: string;
};

export interface StudentLessonsRepository {
  getLessonById(
    courseId: string,
    lessonId: string
  ): Promise<StudentLessonDetails | null>;
}

export type CourseLessonWithContext = {
  course: StudentCourseDetails;
  module: CourseModule;
  lesson: CourseLesson;
  lessonNumber: number;
};
