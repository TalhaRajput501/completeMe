'use client'
import Heading from '@/components/ui/Heading'
import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div
      className='min-h-screen flex items-center justify-center flex-col gap-2  '
    >
      <Image
        src="/not-found.png"
        alt="Error"
        width={500}
        height={500}

      />
      <Heading extraClassName='  text-gray-800'>Not Found</Heading>
      <p
        className='font-semibold text-xl text-gray-700'
      >The page you are looking for does not exist.</p>
      button
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer mb-4'
        onClick={() => window.location.href = '/'}
      >
        Go to Home
      </button>
    </div>
  )
}

