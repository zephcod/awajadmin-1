import { AddProductForm } from '@/components/forms/edit-product-form'
import { Shell } from '@/components/shells/shell'
import React from 'react'
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { solutions } from "@/db/schema"

interface SolutionProps {
  params: {
    editid: number
  }
}

export default async function EditSolution ({ params }: SolutionProps)  {
  const solId = params.editid
  const sol = await db.query.solutions.findFirst({
    where: eq(solutions.id, solId),
  })
  
  return (
    <Shell className="mt-14">
        <div><AddProductForm _id= {solId} price={sol!.price} name={sol!.name} subcategory={sol!.subcategory} inventory={sol!.inventory}/> </div>
    </Shell>
  )
}
