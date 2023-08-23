import type { CartItem, CheckoutItem, StoredFile } from "@/types"
import { relations, type InferModel } from "drizzle-orm"
import { pgTable, serial, boolean, timestamp, text, integer, decimal, varchar, uniqueIndex, json, pgEnum } from 'drizzle-orm/pg-core';


export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  userid: varchar("userid", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(true),
  image: varchar("image", { length: 191 }),
  createdat: timestamp("createdat").defaultNow(),
})

export type Store = InferModel<typeof stores>

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(solutions),
}))

export const solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  // category: pgEnum("category", ["solutions","resources","company"]).notNull().default("solutions").driverparam(),
  subcategory: varchar("subcategory", { length: 191 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: integer("inventory").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  // tags: json("tags").$type<string[] | null>().default(null),
  storeid: integer("storeid").notNull(),
  createdat: timestamp("createdat").defaultNow(),
})

export type Product = InferModel<typeof solutions>

export const solutionsRelations = relations(solutions, ({ one }) => ({
  store: one(stores, { fields: [solutions.storeid], references: [stores.id] }),
}))

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  clientid: varchar("clientid", { length: 191 }),
  paymentintentid: varchar("paymentintentid", { length: 191 }),
  clientsecret: varchar("clientsecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  createdat: timestamp("createdat").defaultNow(),
})

export type Cart = InferModel<typeof carts>

export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").primaryKey(),
  clientid: varchar("clientid", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type EmailPreference = InferModel<typeof emailPreferences>


export const faqsTable = pgTable( 'faqs', {
    id: serial('id').primaryKey(),
    question: varchar('question', { length: 191 }).notNull(),
    answer: varchar('answer', { length: 191 }).notNull(),
    tags: json("tags").$type<[]>().default([]),
    createdAt: timestamp('createdat').defaultNow().notNull(),
  })

export type Faq = InferModel<typeof faqsTable>


export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userid: varchar("userid", { length: 191 }),
  storeid: integer("storeid").notNull(),
  detailssubmitted: boolean("detailssubmitted").notNull().default(false),
  createdat: timestamp("createdat").defaultNow(),
})

export type Payment = InferModel<typeof payments>

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userid: varchar("userid", { length: 191 }),
  storeid: integer("storeid").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  total: decimal("total", { precision: 10, scale: 2 }).notNull().default("0"),
  // stripePaymentIntentId: varchar("stripePaymentIntentId", {
  //   length: 191,
  // }).notNull(),
  // stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
  //   length: 191,
  // }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressid: integer("addressid"),
  createdat: timestamp("createdat").defaultNow(),
})

export type Order = InferModel<typeof orders>

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  address: varchar("address", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Address = InferModel<typeof addresses>
