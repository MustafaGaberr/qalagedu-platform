import {
  mockStudentCourseSummaries,
  mockStudentCourses,
} from "@/features/student-courses/data/mock-courses";
import type {
  StudentCourseDetails,
  StudentCourseSummary,
  StudentCoursesRepository,
} from "@/features/student-courses/types/courses";

export class MockStudentCoursesRepository implements StudentCoursesRepository {
  async getMyCourses(): Promise<StudentCourseSummary[]> {
    return mockStudentCourseSummaries;
  }

  async getCourseById(
    courseId: string
  ): Promise<StudentCourseDetails | null> {
    return mockStudentCourses.find((course) => course.id === courseId) ?? null;
  }
}
