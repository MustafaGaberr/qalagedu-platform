import { catalogCourses, catalogProducts, catalogTeachers } from "@/features/public-catalog/data/catalog";
export const getPublicCourses = () => catalogCourses;
export const getPublicCourse = (id: string) => catalogCourses.find((course) => course.id === id) ?? null;
export const getPublicTeachers = () => catalogTeachers;
export const getPublicTeacher = (id: string) => catalogTeachers.find((teacher) => teacher.id === id) ?? null;
export const getStoreProducts = () => catalogProducts;
export const getStoreProduct = (id: string) => catalogProducts.find((product) => product.id === id) ?? null;
