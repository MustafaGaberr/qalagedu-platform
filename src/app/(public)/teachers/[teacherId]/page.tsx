import { notFound } from "next/navigation";
import { TeacherDetail } from "@/features/public-catalog/components/detail-pages";
import { getPublicCourses, getPublicTeacher, getStoreProducts } from "@/features/public-catalog/services/catalog-service";
export default async function TeacherPage({params}:{params:Promise<{teacherId:string}>}){const {teacherId}=await params;const [teacher,courses,products]=await Promise.all([getPublicTeacher(teacherId),getPublicCourses(),getStoreProducts()]);if(!teacher)notFound();return <TeacherDetail teacher={teacher} courses={courses.filter(course=>course.teacherId===teacher.id)} products={products.filter(product=>product.teacherId===teacher.id)}/>}
