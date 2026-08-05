import { notFound } from "next/navigation";
import { ProductDetail } from "@/features/public-catalog/components/detail-pages";
import { getPublicCourse, getStoreProduct } from "@/features/public-catalog/services/catalog-service";
export default async function ProductPage({params}:{params:Promise<{productId:string}>}){const {productId}=await params;const product=getStoreProduct(productId);if(!product)notFound();return <ProductDetail product={product} course={product.courseId?getPublicCourse(product.courseId)??undefined:undefined}/>}
