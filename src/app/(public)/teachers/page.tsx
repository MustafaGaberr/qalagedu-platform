import { TeachersGallery } from "@/features/public-catalog/components/teacher-pages";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export default async function TeachersPage(){const [teachers,courses]=await Promise.all([getPublicTeachers(),getPublicCourses()]);return <TeachersGallery teachers={teachers} courses={courses}/>}
