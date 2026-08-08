import { PublicFooter } from "@/components/layouts/public-footer";
import { PublicHeader } from "@/components/layouts/public-header";
import { getPublicBrand } from "@/features/public-catalog/services/catalog-service";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brand = await getPublicBrand();
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader brand={brand} />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
