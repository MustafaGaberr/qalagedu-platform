import { TeachersListing } from "@/features/public-catalog/components/discovery-pages";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export default function TeachersPage(){return <TeachersListing teachers={getPublicTeachers()} courses={getPublicCourses()}/>}
