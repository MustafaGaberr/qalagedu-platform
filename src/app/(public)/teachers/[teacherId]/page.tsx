import { notFound } from "next/navigation";
import { TeacherDetail } from "@/features/public-catalog/components/detail-pages";
import { getPublicCourses, getPublicTeacher, getStoreProducts } from "@/features/public-catalog/services/catalog-service";
export default async function TeacherPage({params}:{params:Promise<{teacherId:string}>}){const {teacherId}=await params;const teacher=getPublicTeacher(teacherId);if(!teacher)notFound();return <TeacherDetail teacher={teacher} courses={getPublicCourses().filter(course=>course.teacherId===teacher.id)} products={getStoreProducts().filter(product=>product.teacherId===teacher.id)}/>}
