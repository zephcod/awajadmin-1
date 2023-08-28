"use server"

import { db }from '@/db';
import {  faqsTable } from '@/db/schema';
import { revalidatePath } from "next/cache"
import { faqIdSchema, faqSchema, faqTagSchema } from '@/lib/validations/faq';
import { type z } from "zod"
import { eq } from 'drizzle-orm';

export async function getFaqs(){
    const faqs = await db.select().from(faqsTable)
    return faqs;
}

export async function getFaqSuggestion(){
    const faqs = await db.select({suggest:faqsTable.tags}).from(faqsTable)
    const sug = faqs[0].suggest
    console.log(sug)
    return sug
}

export async function addFaqAction(input: z.infer<typeof faqSchema & typeof faqTagSchema>){
    console.log(input)
    await db.insert(faqsTable).values({
        ...input, tags:input.tags
      })
    
      revalidatePath('/')
}

export async function updateFaqAction(input: z.infer<typeof faqSchema & typeof faqTagSchema>, ids: z.infer<typeof faqIdSchema>){
    await db.update(faqsTable).set({
        ...input,
      }).where(eq(faqsTable.id,ids._id))
    
      revalidatePath('/')
}

export async function deleteFaqAction(deleteid: number){
    await db.delete(faqsTable).where(eq(faqsTable.id, deleteid)).returning();
    
      revalidatePath('/')
}