import type { ReactNode } from "react";
import { buildCategoryTree, categoryHasItems, type CategoryLike, type CategoryNode } from "@/lib/category-tree";

interface HasCategoryId {
  categoryId: string | null;
}

const HEADING_CLASSES = {
  default: { top: "text-[19px] font-semibold text-ink-900", nested: "text-[17px] font-medium text-ink-600" },
  compact: { top: "text-base font-semibold text-ink-900", nested: "text-sm font-medium text-ink-600" },
} as const;

// Ürün listesi olan her ekranda (bayi kataloğu, admin ürünler, sepet
// çekmecesi, checkout özeti, sipariş detayları) aynı üst/alt kategori
// gruplama görselini üretmek için paylaşılan bileşen — satır/tablo
// render'ı çağıran tarafa bırakılır (renderItems), sadece ağaç kurma ve
// boş kategori dallarını atlama mantığı burada tekrarlanmıyor.
export function CategoryGroupList<T extends HasCategoryId>({
  items,
  categories,
  renderItems,
  uncategorizedLabel = "Diğer",
  headingSize = "default",
}: {
  items: T[];
  categories: CategoryLike[];
  renderItems: (items: T[]) => ReactNode;
  uncategorizedLabel?: string;
  headingSize?: keyof typeof HEADING_CLASSES;
}) {
  const itemsByCategory = new Map<string, T[]>();
  const uncategorized: T[] = [];
  for (const item of items) {
    if (item.categoryId) {
      const list = itemsByCategory.get(item.categoryId) ?? [];
      list.push(item);
      itemsByCategory.set(item.categoryId, list);
    } else {
      uncategorized.push(item);
    }
  }

  const tree = buildCategoryTree(categories);
  const headingClasses = HEADING_CLASSES[headingSize];

  return (
    <div className="flex flex-col gap-6">
      {tree.map((node) => (
        <CategoryNodeSection
          key={node.id}
          node={node}
          depth={0}
          itemsByCategory={itemsByCategory}
          renderItems={renderItems}
          headingClasses={headingClasses}
        />
      ))}
      {uncategorized.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className={headingClasses.top}>{uncategorizedLabel}</h3>
          {renderItems(uncategorized)}
        </div>
      )}
    </div>
  );
}

function CategoryNodeSection<T>({
  node,
  depth,
  itemsByCategory,
  renderItems,
  headingClasses,
}: {
  node: CategoryNode;
  depth: number;
  itemsByCategory: Map<string, T[]>;
  renderItems: (items: T[]) => ReactNode;
  headingClasses: { top: string; nested: string };
}) {
  if (!categoryHasItems(node, itemsByCategory)) return null;

  const ownItems = itemsByCategory.get(node.id) ?? [];

  return (
    <div className={depth > 0 ? "flex flex-col gap-3 border-l-2 border-border pl-4" : "flex flex-col gap-3"}>
      <h3 className={depth === 0 ? headingClasses.top : headingClasses.nested}>{node.name}</h3>
      {ownItems.length > 0 && renderItems(ownItems)}
      {node.children.map((child) => (
        <CategoryNodeSection
          key={child.id}
          node={child}
          depth={depth + 1}
          itemsByCategory={itemsByCategory}
          renderItems={renderItems}
          headingClasses={headingClasses}
        />
      ))}
    </div>
  );
}
