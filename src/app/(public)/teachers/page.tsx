import { TeachersListing } from "@/features/public-catalog/components/discovery-pages";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export default async function TeachersPage(){const [teachers,courses]=await Promise.all([getPublicTeachers(),getPublicCourses()]);return <TeachersListing teachers={teachers} courses={courses}/>}
