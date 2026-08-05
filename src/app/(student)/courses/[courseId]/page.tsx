import { notFound } from "next/navigation";
import { CourseDetail } from "@/features/public-catalog/components/detail-pages";
import { PublicDiscoveryFrame } from "@/features/public-catalog/components/public-discovery-frame";
import { getPublicCourse, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export default async function PublicCoursePage({ params }: { params: Promise<{ courseId: string }> }) { const { courseId } = await params; const course = getPublicCourse(courseId); if (!course) notFound(); const teacher=getPublicTeachers().find(item=>item.id===course.teacherId); if(!teacher)notFound(); return <PublicDiscoveryFrame><CourseDetail course={course} teacher={teacher}/></PublicDiscoveryFrame>; }
