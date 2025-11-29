import CheckoutProgress from '@/components/ui/CheckoutProgress'
import { Check, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div
      className=' flex flex-col  items-center justify-center h-[calc(100vh-4rem)]'
    >
      {/* Progress bar */}
      <div className='w-[70%] mt-4 '>
        <div className='w-[90%] mx-auto'>
          <CheckoutProgress firstDone secondDone thirdDone />
        </div>
      </div>

      {/* Page content */}
      <div className='  flex items-center justify-center w-full flex-col h-full'>
        {/* success box */}
        <div className=' border-[#11283d]  w-1/3 rounded mb-4 h-1/2'>
          {/* tick mark and message */}
          <div className='w-1/2  mx-auto h-full flex flex-col justify-evenly    '>
            {/* tick mark */}
            <div className='border-[#11283d] flex flex-col items-center  rounded-full p-6 px-9 mx-auto '>
              <Check className='w-23 h-23 text-green-700' />
              <p className=' text-md text-green-700'>Success</p>
            </div>

            {/* meassage */}
            <p className='text-center font-bold text-xl text-green-600'>Your order is placed successfully</p>
          </div>

        </div>

        {/* track button */}
        <div
          className='mb-2'

        >
          <Link
            href={'/tracking'}
          >

            <button
              className=' bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold '
            >
              Track Order
            </button>
          </Link>
        </div>
        {/* home button */}
        <div>
          <Link href={'/'}>
            <button
              className=' bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold '
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
