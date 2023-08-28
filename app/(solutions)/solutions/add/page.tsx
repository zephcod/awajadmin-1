import { AddProductForm } from '@/components/forms/edit-product-form'
import { Shell } from '@/components/shells/shell'
import React from 'react'



export default async function EditSolution ()  {
  
  return (
    <Shell className="mt-14">
        <div><AddProductForm _id= {0} price={''} name={''} subcategory={''} inventory={0}/> </div>
    </Shell>
  )
}
