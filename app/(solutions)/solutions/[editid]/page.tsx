import { AddProductForm } from '@/components/forms/add-product-form'
import { Shell } from '@/components/shells/shell'
import React from 'react'

const EditSolution = () => {
  return (
    <Shell className="mt-14">
        <div><AddProductForm storeid={1}/> </div>
    </Shell>
  )
}

export default EditSolution