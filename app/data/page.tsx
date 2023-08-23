import getFaqs from '@/app/_actions/faqs'
import React from 'react'


async function Influencers () {
 const faq = await getFaqs()
  return (
    faq.map((item) =>(
      <div key={item.id}>
        {item.question}
      </div>
    )))
}

export default Influencers