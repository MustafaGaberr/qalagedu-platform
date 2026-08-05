import { MyCoursesPage } from "@/features/student-learning/components/learning-pages";
import { getLearningCourses } from "@/features/student-learning/services/learning-service";
export default function LibraryRoute() { return <MyCoursesPage courses={getLearningCourses()} />; }
