import React from 'react'
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { faqsTable} from "@/db/schema"
import {EditFaqForm} from '@/components/forms/edit-faq-form'

interface FaqProps {
    params: {
      faqid: string
    }
  }

export default async function EditFaq ({ params }: FaqProps) {
  const faqId = Number(params.faqid)
  const faq = await db.query.faqsTable.findFirst({
    where: eq(faqsTable.id, faqId),
  })
  return (
    <div>
        <EditFaqForm question= {faq!.question} answer={faq!.answer} tag={faq!.tags}/>
    </div>
  )
}
