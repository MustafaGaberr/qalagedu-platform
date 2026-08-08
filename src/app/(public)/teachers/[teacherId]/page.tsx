import { notFound } from "next/navigation";
import { TeacherProfilePage } from "@/features/public-catalog/components/teacher-pages";
import { getPublicCourses, getPublicTeacher, getStoreProducts } from "@/features/public-catalog/services/catalog-service";
export default async function TeacherPage({params}:{params:Promise<{teacherId:string}>}){const {teacherId}=await params;const [teacher,courses,products]=await Promise.all([getPublicTeacher(teacherId),getPublicCourses(),getStoreProducts()]);if(!teacher)notFound();return <TeacherProfilePage teacher={teacher} courses={courses.filter(course=>course.teacherId===teacher.id)} products={products.filter(product=>product.teacherId===teacher.id)}/>}
