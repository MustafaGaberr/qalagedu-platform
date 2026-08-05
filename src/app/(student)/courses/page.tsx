import type { Metadata } from "next";
import { CoursesCatalog } from "@/features/public-catalog/components/discovery-pages";
import { PublicDiscoveryFrame } from "@/features/public-catalog/components/public-discovery-frame";
import { getPublicCourses, getPublicTeachers } from "@/features/public-catalog/services/catalog-service";
export const metadata: Metadata = { title: "الكورسات | Qalag EDU" };
export default function CoursesPage() { return <PublicDiscoveryFrame><CoursesCatalog courses={getPublicCourses()} teachers={getPublicTeachers()} /></PublicDiscoveryFrame>; }
