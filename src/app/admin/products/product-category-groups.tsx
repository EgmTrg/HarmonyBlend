import { buildCategoryTree, categoryHasItems, type CategoryLike, type CategoryNode } from "@/lib/category-tree";
import { ProductTable } from "./product-table";
import type { EditableProduct } from "./edit-product-modal";

interface CategoryOption {
  id: string;
  name: string;
}

function CategoryGroup({
  node,
  depth,
  brandId,
  productsByCategory,
  categories,
}: {
  node: CategoryNode;
  depth: number;
  brandId: string;
  productsByCategory: Map<string, EditableProduct[]>;
  categories: CategoryOption[];
}) {
  if (!categoryHasItems(node, productsByCategory)) return null;

  const ownProducts = productsByCategory.get(node.id) ?? [];

  return (
    <div className={depth > 0 ? "flex flex-col gap-3 border-l-2 border-border pl-4" : "flex flex-col gap-3"}>
      <h3 className={depth === 0 ? "text-base font-semibold text-ink-900" : "text-sm font-medium text-ink-600"}>
        {node.name}
      </h3>
      {ownProducts.length > 0 && (
        <ProductTable brandId={brandId} products={ownProducts} categories={categories} />
      )}
      {node.children.map((child) => (
        <CategoryGroup
          key={child.id}
          node={child}
          depth={depth + 1}
          brandId={brandId}
          productsByCategory={productsByCategory}
          categories={categories}
        />
      ))}
    </div>
  );
}

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

  const productsByCategory = new Map<string, EditableProduct[]>();
  const uncategorized: EditableProduct[] = [];
  for (const product of products) {
    if (product.categoryId) {
      const list = productsByCategory.get(product.categoryId) ?? [];
      list.push(product);
      productsByCategory.set(product.categoryId, list);
    } else {
      uncategorized.push(product);
    }
  }

  const tree = buildCategoryTree(categories);
  const categoryOptions: CategoryOption[] = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <div className="flex flex-col gap-6">
      {tree.map((node) => (
        <CategoryGroup
          key={node.id}
          node={node}
          depth={0}
          brandId={brandId}
          productsByCategory={productsByCategory}
          categories={categoryOptions}
        />
      ))}
      {uncategorized.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-ink-900">Diğer</h3>
          <ProductTable brandId={brandId} products={uncategorized} categories={categoryOptions} />
        </div>
      )}
    </div>
  );
}
