import { CenterSchedule } from "@/features/public-catalog/components/discovery-pages";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export default async function CenterSchedulePage(){const [courses,teachers]=await Promise.all([getPublicCourses(),getPublicTeachers()]);return <CenterSchedule courses={courses} teachers={teachers}/>}
