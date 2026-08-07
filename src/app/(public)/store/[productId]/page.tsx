import { notFound } from "next/navigation";
import { ProductDetail } from "@/features/public-catalog/components/detail-pages";
import { getPublicCourse, getStoreProduct } from "@/features/public-catalog/services/catalog-service";
export default async function ProductPage({params}:{params:Promise<{productId:string}>}){const {productId}=await params;const product=await getStoreProduct(productId);if(!product)notFound();const course=product.courseId?await getPublicCourse(product.courseId):null;return <ProductDetail product={product} course={course??undefined}/>}
