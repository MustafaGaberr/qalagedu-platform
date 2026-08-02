import { mockStudentCourses } from "@/features/student-courses/data/mock-courses";
import type { LessonType } from "@/features/student-courses/types/courses";
import { getLessonExtra } from "@/features/student-lessons/data/mock-lesson-extras";
import { isOpenableLessonStatus } from "@/features/student-lessons/lib/lesson-status";
import type {
  CourseLessonWithContext,
  LessonNavigationItem,
  StudentLessonDetails,
  StudentLessonsRepository,
} from "@/features/student-lessons/types/lessons";

const lessonTypeLabel: Record<LessonType, string> = {
  video: "فيديو",
  revision: "مراجعة",
  exam: "اختبار",
  assignment: "واجب",
};

export class MockStudentLessonsRepository implements StudentLessonsRepository {
  async getLessonById(
    courseId: string,
    lessonId: string
  ): Promise<StudentLessonDetails | null> {
    const course = mockStudentCourses.find((item) => item.id === courseId);

    if (!course) {
      return null;
    }

    const flattened = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        course,
        module,
        lesson,
      }))
    );
    const indexed = flattened.map((item, index) => ({
      ...item,
      lessonNumber: index + 1,
    }));
    const current = indexed.find((item) => item.lesson.id === lessonId);

    if (!current) {
      return null;
    }

    const previous = indexed[current.lessonNumber - 2] ?? null;
    const next = indexed[current.lessonNumber] ?? null;
    const extra = getLessonExtra(lessonId);

    return {
      id: current.lesson.id,
      courseId: course.id,
      moduleId: current.module.id,
      courseTitle: course.title,
      courseSubject: course.subject,
      courseProgress: course.progress,
      moduleTitle: current.module.title,
      teacherName: course.teacherInfo.name,
      teacherTitle: course.teacherInfo.title,
      title: current.lesson.title,
      summary: extra.summary,
      description: extra.description,
      lessonNumber: current.lessonNumber,
      type: current.lesson.type,
      typeLabel: lessonTypeLabel[current.lesson.type],
      durationMinutes: current.lesson.durationMinutes,
      status: current.lesson.status,
      statusLabel: current.lesson.statusLabel,
      actionLabel: current.lesson.actionLabel,
      isCompleted: current.lesson.status === "completed",
      videoSourcePlaceholder: extra.videoSourcePlaceholder,
      availabilityDate: current.lesson.availabilityDate,
      publishedDate: extra.publishedDate,
      lockedReason: current.lesson.lockedReason,
      resources: extra.resources,
      assessment: extra.assessment,
      previousLesson: previous ? toNavigationItem(course.id, previous) : null,
      nextLesson: next ? toNavigationItem(course.id, next) : null,
      curriculum: course.modules.map((module) => ({
        id: module.id,
        title: module.title,
        order: module.order,
        progress: module.progress,
        lessons: module.lessons.map((lesson) => {
          const found = indexed.find((item) => item.lesson.id === lesson.id);
          return toNavigationItem(course.id, {
            course,
            module,
            lesson,
            lessonNumber: found?.lessonNumber ?? lesson.order,
          });
        }),
      })),
      learningGoals: extra.learningGoals,
      prerequisites: extra.prerequisites,
      studentNotesPlaceholder: extra.studentNotesPlaceholder,
    };
  }
}

function toNavigationItem(
  courseId: string,
  item: CourseLessonWithContext
): LessonNavigationItem {
  return {
    id: item.lesson.id,
    title: item.lesson.title,
    lessonNumber: item.lessonNumber,
    status: item.lesson.status,
    statusLabel: item.lesson.statusLabel,
    href: isOpenableLessonStatus(item.lesson.status)
      ? `/courses/${courseId}/lessons/${item.lesson.id}`
      : null,
  };
}
