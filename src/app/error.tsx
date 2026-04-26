'use client'
import Heading from '@/components/ui/Heading'
import { CircleX } from 'lucide-react'
import Image from 'next/image' 

function error() {
  return (
    <div
      className='h-screen flex items-center justify-center flex-col gap-4  '
    >
      <CircleX className='w-16 h-16 md:w-36 md:h-36 text-red-500' />
      <Heading extraClassName='  text-gray-800'>Something went wrong!</Heading>
      <p
        className='font-semibold text-xl text-gray-700'
      >We're trying to fix it as soon as possible.</p>
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer'
        onClick={() => window.history.back()}
      >
        Go Back
        </button>
    </div>
  )
}

export default error