import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const solutionsSchema = z.object({
  id: z.number(),
  name: z.string(),
  // price: z.number(),
  // category: z.string(),

})

export type Task = z.infer<typeof solutionsSchema>