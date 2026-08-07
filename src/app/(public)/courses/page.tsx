import { PublicDiscoveryFrame } from "@/features/public-catalog/components/public-discovery-frame";
import { CoursesCatalog } from "@/features/public-catalog/components/discovery-pages";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";

export default async function CoursesPage() {
  const [courses, teachers] = await Promise.all([getPublicCourses(), getPublicTeachers()]);
  return <PublicDiscoveryFrame><CoursesCatalog courses={courses} teachers={teachers} /></PublicDiscoveryFrame>;
}
