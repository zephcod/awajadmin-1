
import * as z from "zod"

export const faqSchema = z.object({
    question: z.string().min(1, { message: "Must be at least 1 character",}),
    answer: z.string().min(1, { message: "Must be at least 1 character",}),
    tag: z.array(z.string()).nullable().default([]),
  })
  