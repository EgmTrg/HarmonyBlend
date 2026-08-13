import { CategoryGroupList } from "@/components/category-group-list";
import type { CategoryLike } from "@/lib/category-tree";
import { ProductTable } from "./product-table";
import type { EditableProduct } from "./edit-product-modal";

export function ProductCategoryGroups({
  brandId,
  products,
  categories,
}: {
  brandId: string;
  products: EditableProduct[];
  categories: CategoryLike[];
}) {
  if (products.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-400">Bu markada henüz ürün yok.</p>;
  }

  const categoryOptions = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <CategoryGroupList
      items={products}
      categories={categories}
      headingSize="compact"
      renderItems={(items) => <ProductTable brandId={brandId} products={items} categories={categoryOptions} />}
    />
  );
}
