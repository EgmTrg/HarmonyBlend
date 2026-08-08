import {
  pgTable,
  uuid,
  text,
  boolean,
  numeric,
  timestamp,
  pgEnum,
  uniqueIndex,
  jsonb,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { USER_ROLES } from "@/lib/roles";
import { PAYMENT_METHOD_CODES } from "@/lib/payment-methods";

export const userRole = pgEnum("user_role", USER_ROLES);
export const paymentMethodCode = pgEnum("payment_method_code", PAYMENT_METHOD_CODES);

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
  taxNo: text("tax_no"),
  address: text("address"),
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
    email: text("email").notNull(),
    role: userRole("role").notNull(),
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
    unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("products_brand_sku_unique").on(table.brandId, table.sku)]
);

export const paymentMethods = pgTable(
  "payment_methods",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    code: paymentMethodCode("code").notNull(),
    label: text("label").notNull(),
    // limit, gecikme kuralı vb. parametreler
    config: jsonb("config"),
  },
  (table) => [uniqueIndex("payment_methods_company_code_unique").on(table.companyId, table.code)]
);

export const dealerPaymentMethods = pgTable(
  "dealer_payment_methods",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dealerId: uuid("dealer_id")
      .notNull()
      .references(() => dealers.id, { onDelete: "cascade" }),
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id, { onDelete: "cascade" }),
    paymentMethodId: uuid("payment_method_id")
      .notNull()
      .references(() => paymentMethods.id, { onDelete: "cascade" }),
    isEnabled: boolean("is_enabled").notNull().default(true),
  },
  (table) => [
    uniqueIndex("dealer_payment_methods_unique").on(
      table.dealerId,
      table.brandId,
      table.paymentMethodId
    ),
  ]
);
