import { MockStudentCoursesRepository } from "@/mocks/repositories/mock-student-courses-repository";
import type {
  StudentCourseDetails,
  StudentCourseSummary,
  StudentCoursesRepository,
} from "@/features/student-courses/types/courses";

const repository = new MockStudentCoursesRepository();

export async function getMyCourses(
  coursesRepository: StudentCoursesRepository = repository
): Promise<StudentCourseSummary[]> {
  return coursesRepository.getMyCourses();
}

export async function getStudentCourseById(
  courseId: string,
  coursesRepository: StudentCoursesRepository = repository
): Promise<StudentCourseDetails | null> {
  return coursesRepository.getCourseById(courseId);
}
