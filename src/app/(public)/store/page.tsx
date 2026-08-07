import { StoreListing } from "@/features/public-catalog/components/discovery-pages";
import { getStoreProducts } from "@/features/public-catalog/services/catalog-service";
export default async function StorePage(){return <StoreListing products={await getStoreProducts()}/>}
