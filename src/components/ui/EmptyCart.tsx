import React from 'react'
import Image from 'next/image' 
import Link from 'next/link'

function EmptyCart() {
  return (
    <div className='mx-auto mt-4 flex w-full max-w-md flex-col items-center justify-center'>
      <div className='relative mx-auto h-44 w-44'>
        <Image draggable='false' fill src='/empty-cart.svg' className='w-full' alt='empty cart pic' />
      </div>

      <div className='flex w-full flex-col items-center'>
        <h1 className='text-center text-2xl font-bold text-slate-800'>Your cart is &#8203;
          <span className='text-blue-600'>
            Empty!
          </span>
        </h1>
        <p className='text-center font-medium text-slate-600'>
          Looks like you haven&#39;t added anything to your cart yet
        </p>
        <Link className='mx-auto' href={'/'}>
          <button className='mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700'>
            Go to Home
          </button>
        </Link>
      </div>

    </div>
  )
}

export default EmptyCart
