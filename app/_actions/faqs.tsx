"use server"

import { db }from '@/db';
import { createClient } from '@vercel/postgres';
import {  faqsTable } from '@/db/schema';
import { revalidatePath } from "next/cache"
import type { Faqs } from "@/types"
import { faqSchema } from '@/lib/validations/faq';
import { type z } from "zod"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "@/db/schema"

export async function getFaqs():Promise<Faqs[]> {
    const users = await db.select().from(faqsTable)
    return users;
}

export async function addFaqAction(input: z.infer<typeof faqSchema>){
    const client = createClient();
    await client.connect();
    
    await drizzle(client, {schema: schema}).insert(faqsTable).values({
        ...input,
      })
    
      revalidatePath('/')
}