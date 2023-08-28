import React from 'react'
import { db }from '@/db';
import { solutions } from '@/db/schema';
import { columns } from "@/components/solutions/columns"
import { DataTable } from "@/components/solutions/data-table"
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';


async function Subscribers() {
  const users = await db.select({id:solutions.id, name:solutions.name}).from(solutions)
   return (
   <div className="h-full flex-1 flex-col space-y-8 p-6 md:flex overflow-hidden">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl mb-4 font-bold tracking-tight">Awaj Solutions Hub</h2>
          <Link
                aria-label="Add FAQ"
                href={`/solutions/add`}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "h-8 rounded-md mb-8 mx-auto",
                })}
                >
                Create New Solution
          </Link> 
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </div>
   )
}

export default Subscribers