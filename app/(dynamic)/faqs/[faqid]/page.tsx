import React from 'react'
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { faqsTable} from "@/db/schema"
import {EditFaqForm} from '@/components/forms/edit-faq-form'
import { getFaqSuggestion } from '@/app/_actions/faqs'

interface FaqProps {
    params: {
      faqid: string
    }
  }

export default async function EditFaq ({ params }: FaqProps) {
  const faqId = Number(params.faqid)
  const suggestion = await getFaqSuggestion()
  const faq = await db.query.faqsTable.findFirst({
    where: eq(faqsTable.id, faqId),
  })
  return (
    <div>
        <EditFaqForm _id= {faqId} question= {faq!.question} answer={faq!.answer} tags ={faq!.tags} suggest={suggestion}/>
    </div>
  )
}
