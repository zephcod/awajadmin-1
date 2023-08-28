import React from 'react'
import { db }from '@/db';
import { emailPreferences } from '@/db/schema';
import { columns } from "@/components/subscribers/columns"
import { DataTable } from "@/components/subscribers/data-table"


async function Subscribers() {
  const users = await db.select({id:emailPreferences.id, email:emailPreferences.email, _id:emailPreferences.clientid}).from(emailPreferences)
   return (
   <div className="h-full flex-1 flex-col space-y-8 p-6 md:flex overflow-hidden">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">List of subscribers</h2>
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </div>
   )
}

export default Subscribers