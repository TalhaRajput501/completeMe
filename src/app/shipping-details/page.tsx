import CheckoutProgress from '@/components/ui/CheckoutProgress'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div>
      <div
        className='w-full justify-center bg-gray-900 text-white h-screen flex item-center '
      >
        {/* Products */}
        <div
          className='w-[70%]  mx-auto flex flex-col'
        >
          {/* Checkout Progress Bar*/}
          <div className='w-[90%] mx-auto mt-5'>
            <CheckoutProgress firstPage />
          </div>

          <Link className='w-fit bg-gray-300 ' href={'/checkout'}>
            <button className='w-auto bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold'>
              Continue to Payment 
            </button>
          </Link>


        </div>
      </div>

    </div>
  )
}

export default Page
