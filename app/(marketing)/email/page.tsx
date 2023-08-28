import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import {EmailCard} from '@/components/email/emailcard'
import {emailtemp} from '@/components/email/email-list'



const Email = () => {
  return (
    <>
      <h2 className="text-2xl text-center font-bold">E-mail Hub</h2><br/>
        <Link
              aria-label="Add FAQ"
              href={`/email/send`}
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "h-8 rounded-md mb-8 mx-auto",
              })}
              >
              Compose New
        </Link> 
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {emailtemp.map((template) => (
            <EmailCard template={template} key={template.name}/>
          ))}
      </div>
    </>
  )
}

export default Email