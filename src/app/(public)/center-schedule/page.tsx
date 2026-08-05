import { CenterSchedule } from "@/features/public-catalog/components/discovery-pages";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export default function CenterSchedulePage(){return <CenterSchedule courses={getPublicCourses()} teachers={getPublicTeachers()}/>}
