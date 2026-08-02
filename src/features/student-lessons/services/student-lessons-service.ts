import { MockStudentLessonsRepository } from "@/mocks/repositories/mock-student-lessons-repository";
import type {
  StudentLessonDetails,
  StudentLessonsRepository,
} from "@/features/student-lessons/types/lessons";

const repository = new MockStudentLessonsRepository();

export async function getStudentLessonById(
  courseId: string,
  lessonId: string,
  lessonsRepository: StudentLessonsRepository = repository
): Promise<StudentLessonDetails | null> {
  return lessonsRepository.getLessonById(courseId, lessonId);
}
