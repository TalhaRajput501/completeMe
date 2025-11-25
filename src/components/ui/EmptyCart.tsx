import React from 'react'
import Image from 'next/image' 
import Link from 'next/link'

function EmptyCart() {
  return (
    <div className='  mx-auto mt-4 w-[70%] flex flex-col justify-center items-center'>
      <div className='relative w-44 h-44 mx-auto' >
        <Image draggable='false' fill src='/empty-cart.svg'className='w-full' alt='empty cart pic' />
      </div>

      <div className='w-full   flex flex-col items-center'>
        <h1 className='text-[#11283d] text-center font-bold text-2xl'>Your cart is &#8203;
          <span className='text-[#3dbdf1]'>
            Empty!
          </span>
        </h1>
        <p className='text-[#11283d] font-semibold'>Looks like you haven&#39;t added anything to your cart yet</p>
        <Link className=' mx-auto  ' href={'/'}>
          <button className=' mt-4  bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold'>
            Go to Home
          </button>
        </Link>
      </div>

    </div>
  )
}

export default EmptyCart
