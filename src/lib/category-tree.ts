export interface CategoryLike {
  id: string;
  name: string;
  parentId: string | null;
}

export interface CategoryNode extends CategoryLike {
  children: CategoryNode[];
}

// Kategoriler kendine referans veren parentId ile keyfi derinlikte
// dallanabilir (bkz. src/db/schema.ts categories.parentId) — bu yüzden ağaç
// kurulumu ve render tarafındaki gruplama (bkz. product-catalog.tsx)
// derinliği 2 seviyeyle sınırlamadan, genel/rekürsif çalışacak şekilde yazıldı.
export function buildCategoryTree(categories: CategoryLike[]): CategoryNode[] {
  const nodeById = new Map<string, CategoryNode>();
  for (const category of categories) {
    nodeById.set(category.id, { ...category, children: [] });
  }

  const roots: CategoryNode[] = [];
  for (const category of categories) {
    const node = nodeById.get(category.id)!;
    const parent = category.parentId ? nodeById.get(category.parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
