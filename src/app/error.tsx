'use client'
import Heading from '@/components/ui/Heading'
import Image from 'next/image'
import React from 'react'

function error() {
  return (
    <div
      className='h-screen flex items-center justify-center flex-col gap-4 bg-gray-900'
    >
      <Image 
       src="/error.png"
       alt="Error"
       width={300}
       height={300}

 />
      <Heading extraClassName='  text-gray-500'>Something went wrong!</Heading>
      <p 
        className='font-semibold text-xl text-gray-500'
      >We're trying to fix it as soon as possible.</p>
    </div>
  )
}

export default error