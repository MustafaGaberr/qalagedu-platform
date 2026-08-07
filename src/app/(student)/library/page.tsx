import { MyCoursesPage } from "@/features/student-learning/components/learning-pages";
import { getLearningCourses } from "@/features/student-learning/services/learning-service";
export default async function LibraryRoute() { return <MyCoursesPage courses={await getLearningCourses()} />; }
