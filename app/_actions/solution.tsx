"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { solutions, type Product } from "@/db/schema"
import type { StoredFile } from "@/types"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm"
import { type z } from "zod"

import type {
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"

export async function filterProductsAction(query: string) {
  if (query.length === 0) return null

  const filteredProducts = await db
    .select({
      id: solutions.id,
      name: solutions.name,
      category: solutions.subcategory,
    })
    .from(solutions)
    .where(like(solutions.name, `%${query}%`))
    .orderBy(desc(solutions.createdat))
    .limit(10)

  const productsByCategory = Object.values(solutions.subcategory.enumValues).map(
    (category) => ({
      category,
      products: filteredProducts.filter(
        (product) => product.category === category
      ),
    })
  )

  return productsByCategory
}

export async function getProductsAction(
  input: z.infer<typeof getProductsSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const categories =
    (input.categories?.split(".") as Product["subcategory"][]) ?? []
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(solutions)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          // categories.length
          //   ? inArray(solutions.category, categories)
          //   : undefined,
          subcategories.length
            ? inArray(solutions.subcategory, subcategories)
            : undefined,
          minPrice ? gte(solutions.price, minPrice) : undefined,
          maxPrice ? lte(solutions.price, maxPrice) : undefined,
          storeIds.length ? inArray(solutions.storeid, storeIds) : undefined
        )
      )
      .orderBy(
        column && column in solutions
          ? order === "asc"
            ? asc(solutions[column])
            : desc(solutions[column])
          : desc(solutions.createdat)
      )

    const total = await tx
      .select({
        count: sql<number>`count(${solutions.id})`,
      })
      .from(solutions)
      .where(
        and(
          // categories.length
          //   ? inArray(solutions.category, categories)
          //   : undefined,
          subcategories.length
            ? inArray(solutions.subcategory, subcategories)
            : undefined,
          minPrice ? gte(solutions.price, minPrice) : undefined,
          maxPrice ? lte(solutions.price, maxPrice) : undefined,
          storeIds.length ? inArray(solutions.storeid, storeIds) : undefined
        )
      )

    return {
      items,
      total: Number(total[0]?.count) ?? 0,
    }
  })

  return {
    items,
    total,
  }
}

export async function checkProductAction(input: { name: string; id?: number }) {
  const productWithSameName = await db.query.solutions.findFirst({
    where: input.id
      ? and(not(eq(solutions.id, input.id)), eq(solutions.name, input.name))
      : eq(solutions.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }
}

export async function addProductAction(
  input: z.infer<typeof productSchema> & {
    images: StoredFile[] | null
  }
) {
  const productWithSameName = await db.query.solutions.findFirst({
    where: eq(solutions.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }

  await db.insert(solutions).values({
    ...input,
    images: input.images,
    storeid: 1
  })

  revalidatePath(`/solutions/[editid]`)
}

export async function updateProductAction(
  input: z.infer<typeof productSchema> & {
    id: number
    images: StoredFile[] | null
  }
) {
  const product = await db.query.solutions.findFirst({
    where: eq(solutions.id, input.id)
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  await db.update(solutions).set(input).where(eq(solutions.id, input.id))

  revalidatePath(`/solutions/[editid]`)
}

export async function deleteProductAction( deleteid:number) {
  
  await db.delete(solutions).where(eq(solutions.id, deleteid)).returning();

  revalidatePath(`/solutions/${deleteid}`)
}

export async function getNextProductIdAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.solutions.findFirst({
    where: and(eq(solutions.storeid, input.storeid), gt(solutions.id, input.id)),
    orderBy: asc(solutions.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}

export async function getPreviousProductIdAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.solutions.findFirst({
    where: and(eq(solutions.storeid, input.storeid), lt(solutions.id, input.id)),
    orderBy: desc(solutions.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}
