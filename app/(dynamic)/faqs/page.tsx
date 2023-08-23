import React from 'react'
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {getFaqs} from '@/app/_actions/faqs'
import { Button, buttonVariants } from '@/components/ui/button';
import { FaqButton } from '@/components/faq/button'

interface FaqCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

async function faqCard ({variant="default", isAddedToCart = false, onSwitch}:FaqCardProps)  {
  const faq = await getFaqs()
  return (
    faq.slice(0,3).map((item) =>(
      <div key={item.id} className='flex flex-row items-baseline justify-start gap-2'>
        <div className='flex flex-row items-baseline justify-start gap-1'>
        <FaqButton/>
        <Link
              aria-label="Edit FAQ"
              href={`/faqs/${item.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-md",
              })}
              >
              Edit
        </Link>  
        </div>
        <Accordion key={item.id} type="single" collapsible className="w-full ">
            <AccordionItem value='Question 1'>
                <AccordionTrigger className="text-sm capitalize">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-2">
                    {item.answer}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
  )))
}


async function Faqs  ({variant="default", isAddedToCart = false, onSwitch}:FaqCardProps) {
 const cardsFaq = await faqCard({variant:"default", isAddedToCart: false, onSwitch})
  return (
    <>
      <h2 className="text-2xl text-center font-bold">Frequently asked questions</h2><br/>
        <Link
              aria-label="Add FAQ"
              href={`/faqs/add`}
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "h-8 rounded-md mb-8 mx-auto",
              })}
              >
              Add New
        </Link> 
      <div>
          {cardsFaq}
      </div>
    </>
  )
}

export default Faqs