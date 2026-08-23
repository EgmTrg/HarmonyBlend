import { and, desc, eq, gte, inArray, lt } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, companies, dealers, orderItems, orders, products } from "@/db/schema";
import type { PaymentMethodCode } from "@/lib/payment-methods";

export interface OrderDocumentItem {
  productName: string;
  sku: string;
  unit: string;
  quantity: number;
  categoryId: string | null;
}

export interface OrderDocumentCategory {
  id: string;
  name: string;
  parentId: string | null;
}

export interface OrderDocumentData {
  id: string;
  createdAt: Date;
  status: string;
  paymentMethod: PaymentMethodCode;
  subtotalAmount: number;
  vatAmount: number;
  totalAmount: number;
  dealerName: string;
  brandId: string;
  brandName: string;
  companyName: string;
  items: OrderDocumentItem[];
  categories: OrderDocumentCategory[];
}

// Tek sipariş dökümü ve filtreli toplu döküm aynı fonksiyonu kullanır.
// companyId'ye ait olmayan id'ler sessizce elenir (yetkisiz erişimi
// engellemek için) — orderIds sırası sonuçta korunur.
export async function getOrderDocumentData(companyId: string, orderIds: string[]): Promise<OrderDocumentData[]> {
  if (orderIds.length === 0) return [];

  const orderRows = await db
    .select({
      id: orders.id,
      createdAt: orders.createdAt,
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      subtotalAmount: orders.subtotalAmount,
      vatAmount: orders.vatAmount,
      totalAmount: orders.totalAmount,
      dealerName: dealers.name,
      brandId: brands.id,
      brandName: brands.name,
      companyName: companies.name,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .innerJoin(dealers, eq(orders.dealerId, dealers.id))
    .innerJoin(companies, eq(brands.companyId, companies.id))
    .where(and(eq(brands.companyId, companyId), inArray(orders.id, orderIds)));

  if (orderRows.length === 0) return [];

  const relevantOrderIds = orderRows.map((r) => r.id);
  const relevantBrandIds = [...new Set(orderRows.map((r) => r.brandId))];

  const [itemRows, categoryRows] = await Promise.all([
    db
      .select({
        orderId: orderItems.orderId,
        quantity: orderItems.quantity,
        productName: products.name,
        sku: products.sku,
        unit: products.unit,
        categoryId: products.categoryId,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(inArray(orderItems.orderId, relevantOrderIds)),
    db.select().from(categories).where(inArray(categories.brandId, relevantBrandIds)),
  ]);

  const itemsByOrder = new Map<string, OrderDocumentItem[]>();
  for (const row of itemRows) {
    const list = itemsByOrder.get(row.orderId) ?? [];
    list.push({
      productName: row.productName,
      sku: row.sku,
      unit: row.unit,
      quantity: Number(row.quantity),
      categoryId: row.categoryId,
    });
    itemsByOrder.set(row.orderId, list);
  }

  const categoriesByBrand = new Map<string, OrderDocumentCategory[]>();
  for (const row of categoryRows) {
    const list = categoriesByBrand.get(row.brandId) ?? [];
    list.push({ id: row.id, name: row.name, parentId: row.parentId });
    categoriesByBrand.set(row.brandId, list);
  }

  const byId = new Map(orderRows.map((row) => [row.id, row]));
  return orderIds
    .map((id) => byId.get(id))
    .filter((row): row is (typeof orderRows)[number] => row !== undefined)
    .map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      status: row.status,
      paymentMethod: row.paymentMethod,
      subtotalAmount: Number(row.subtotalAmount),
      vatAmount: Number(row.vatAmount),
      totalAmount: Number(row.totalAmount),
      dealerName: row.dealerName,
      brandId: row.brandId,
      brandName: row.brandName,
      companyName: row.companyName,
      items: itemsByOrder.get(row.id) ?? [],
      categories: categoriesByBrand.get(row.brandId) ?? [],
    }));
}

export interface OrderListFilters {
  brandId?: string;
  status?: string;
  dateRange?: { start: Date; end: Date } | null;
}

// Siparişler tablosundaki filtrelerle (marka/durum/tarih aralığı) eşleşen
// sipariş id'lerini döner — hem tablo hem toplu PDF export aynı filtre
// mantığını kullansın diye. Sıralama tablo sırasıyla aynı (en yeni önce).
export async function getFilteredOrderIds(companyId: string, filters: OrderListFilters): Promise<string[]> {
  const conditions = [eq(brands.companyId, companyId)];
  if (filters.brandId) conditions.push(eq(orders.brandId, filters.brandId));
  if (filters.status) conditions.push(eq(orders.status, filters.status));
  if (filters.dateRange) {
    conditions.push(gte(orders.createdAt, filters.dateRange.start));
    conditions.push(lt(orders.createdAt, filters.dateRange.end));
  }

  const rows = await db
    .select({ id: orders.id })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(and(...conditions))
    .orderBy(desc(orders.createdAt));

  return rows.map((row) => row.id);
}
