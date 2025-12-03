import Button from '@/components/ui/Button'
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
            <Button className='w-auto  py-2 px-3 font-semibold'>
              Continue to Payment
            </Button>
          </Link>


        </div>
      </div>

    </div>
  )
}

export default Page
