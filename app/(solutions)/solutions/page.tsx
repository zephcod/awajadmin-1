import { db }from '@/db';
import {  solutions } from '@/db/schema';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { buttonVariants } from '@/components/ui/button';

import React from 'react'
import Link from 'next/link';

async function EditProd () {
const solution = await db.select().from(solutions)
//  const res = JSON.stringify(users);
  return (
<div className='pt-14 items-center text-center'>
    <Table>
        <TableCaption>A list of solutions.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            {solution.map(sol=>(
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">{sol.id}</TableCell>
                <TableCell>{sol.name}</TableCell>
                <TableCell className="text-right">{sol.price}</TableCell>
                <TableCell className="text-right"><Link href={`/admin/edit/${sol.id}`}>
                <div
                  className={buttonVariants({
                    variant:'outline',
                    size: "default",
                  })}
                >
                  Edit
                  <span className="sr-only">Edit</span>
                </div>
              </Link></TableCell>
                </TableRow>
            </TableBody>))}
    </Table>
</div>

  )
}

export default EditProd