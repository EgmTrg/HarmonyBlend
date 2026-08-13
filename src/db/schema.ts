import {
  pgTable,
  uuid,
  text,
  boolean,
  numeric,
  timestamp,
  pgEnum,
  uniqueIndex,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { USER_ROLES } from "@/lib/roles";
import { PAYMENT_METHOD_CODES } from "@/lib/payment-methods";

export const userRole = pgEnum("user_role", USER_ROLES);
export const paymentMethodCode = pgEnum("payment_method_code", PAYMENT_METHOD_CODES);
export const paymentType = pgEnum("payment_type", ["order_payment", "standalone_collection"]);
export const paymentProvider = pgEnum("payment_provider", ["mock", "iyzico", "paytr"]);
export const paymentStatus = pgEnum("payment_status", ["pending", "success", "failed", "refunded"]);

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("brands_slug_unique").on(table.slug)]
);

export const dealers = pgTable("dealers", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  taxNo: text("tax_no"), // VKN
  // Serbest metin — il/ilçe listesi sabitlenmedi, filtreleme amaçlı.
  il: text("il"),
  bolge: text("bolge"),
  // NULL = limitsiz. Cari akışında currentBalance + yeni sipariş tutarı bunu
  // aşarsa cari ödeme seçeneği reddedilir (bkz. src/app/dealer/actions.ts).
  maxBalanceLimit: numeric("max_balance_limit", { precision: 14, scale: 2 }),
  // Denormalized cache — source of truth is ledger_entries (added in a later phase).
  currentBalance: numeric("current_balance", { precision: 14, scale: 2 })
    .notNull()
    .default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const dealerBrands = pgTable(
  "dealer_brands",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dealerId: uuid("dealer_id")
      .notNull()
      .references(() => dealers.id, { onDelete: "cascade" }),
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id, { onDelete: "cascade" }),
    isActive: boolean("is_active").notNull().default(true),
  },
  (table) => [uniqueIndex("dealer_brands_dealer_brand_unique").on(table.dealerId, table.brandId)]
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    // NULL means a head-office employee rather than a dealer user.
    dealerId: uuid("dealer_id").references(() => dealers.id, { onDelete: "cascade" }),
    // Nullable at the DB level only because pre-existing rows predate this
    // column; the create-user form requires it.
    name: text("name"),
    email: text("email").notNull(),
    role: userRole("role").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)]
);

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brands.id, { onDelete: "cascade" }),
  // NULL means a top-level category; self-reference for subcategories.
  parentId: uuid("parent_id").references((): AnyPgColumn => categories.id, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    sku: text("sku").notNull(),
    name: text("name").notNull(),
    unit: text("unit").notNull(), // koli / kg / adet
    unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(), // KDV hariç (net)
    vatRate: numeric("vat_rate", { precision: 5, scale: 2 }).notNull().default("20"), // yüzde, örn. 20.00 = %20
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("products_brand_sku_unique").on(table.brandId, table.sku)]
);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  dealerId: uuid("dealer_id")
    .notNull()
    .references(() => dealers.id, { onDelete: "cascade" }),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brands.id, { onDelete: "cascade" }),
  // Sabit üç tip (bkz. src/lib/payment-methods.ts) — bayi/marka bazlı manuel
  // aktivasyon kaldırıldı; cari, currentBalance + maxBalanceLimit ile otomatik
  // sınırlanıyor (bkz. src/app/dealer/actions.ts).
  paymentMethod: paymentMethodCode("payment_method").notNull(),
  // Free text, not a DB enum — the valid values and transitions differ per
  // payment method flow (see src/lib/order-status.ts), which would make a
  // single shared Postgres enum either too broad or need frequent ALTER TYPE.
  status: text("status").notNull().default("submitted"),
  // KDV hariç ara toplam / toplam KDV — subtotalAmount + vatAmount = totalAmount.
  subtotalAmount: numeric("subtotal_amount", { precision: 14, scale: 2 }).notNull(),
  vatAmount: numeric("vat_amount", { precision: 14, scale: 2 }).notNull(),
  // Brüt (KDV dahil) genel toplam — dealer'ın ödemesi/borçlanması gereken gerçek tutar.
  totalAmount: numeric("total_amount", { precision: 14, scale: 2 }).notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(), // KDV hariç (net)
  lineTotal: numeric("line_total", { precision: 14, scale: 2 }).notNull(), // KDV hariç
  // Ürünün sipariş anındaki KDV oranının snapshot'ı — ürünün oranı daha
  // sonra değişse bile geçmiş siparişler etkilenmesin diye kopyalanıyor.
  vatRate: numeric("vat_rate", { precision: 5, scale: 2 }).notNull(),
  vatAmount: numeric("vat_amount", { precision: 14, scale: 2 }).notNull(),
});

export const orderStatusHistory = pgTable("order_status_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  fromStatus: text("from_status"),
  toStatus: text("to_status").notNull(),
  // NULL if system-triggered (e.g. mock payment result) rather than a user action.
  changedBy: uuid("changed_by").references(() => users.id, { onDelete: "set null" }),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  dealerId: uuid("dealer_id")
    .notNull()
    .references(() => dealers.id, { onDelete: "cascade" }),
  // NULL means a standalone collection not tied to an order (Phase 4).
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }),
  type: paymentType("type").notNull(),
  provider: paymentProvider("provider").notNull(),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  status: paymentStatus("status").notNull().default("pending"),
  providerRef: text("provider_ref"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
