import React from 'react'
import {EditFaqForm} from '@/components/forms/edit-faq-form'
import { getFaqSuggestion } from '@/app/_actions/faqs'



export default async function AddFaq () {
  
  const suggestion = await getFaqSuggestion()
    
  return (
    <div>
        <EditFaqForm _id={0} question= '' answer='' tags={[{ value: "", label: "" }]} suggest={suggestion}/>
    </div>
  )
}
