import CheckoutProgress from '@/components/ui/CheckoutProgress'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div
      className=' h-[clac(100vh-4rem)]'
    >

      <div className='flex w-full'>

        {/* Payment Form and Progress Bar */}
        <div
          className='w-[70%]   mx-auto flex flex-col'
        >
          {/* Checkout Progress Bar*/}
          <div className='w-[90%] mx-auto mt-5'>
            <CheckoutProgress secondPage firstDone />
          </div>

          {/* Payment Form */}
          <div className='w-[90%] mx-auto   mt-9  '>
            
            <div className='w-[97.5%]   mx-auto'>
              <h1 className='text-[#11283d] font-bold text-3xl'>Payment Information</h1>
            </div>

              <div className='w-full flex'>
                <div className='w-1/2 my-1.5 rounded flex justify-center  not-last:'>
                  <input className='text-[#11283d]  outline-none border-[#02aaf5] border rounded text-xl px-2 py-1 w-[95%] ' />
                </div>

                <div className='w-1/2 my-1.5 rounded flex justify-center  '>
                  <input className=' text-[#11283d] outline-none border-[#02aaf5] border rounded text-xl px-2 py-1 w-[95%] ' />
                </div>
              </div>

              <div className='w-[97.5%]  my-2 1.5 rounded mx-auto' >
                <input className='text-[#11283d] w-full  outline-none border-[#02aaf5] border rounded  text-xl px-2 py-1  ' />
              </div>

              <div className='w-full   flex'>
                <div className='w-1/2 my-1.5 rounded flex justify-center  '>
                  <input className=' text-[#11283d] outline-none border-[#02aaf5] border rounded text-xl px-2 py-1 w-[95%] ' />
                </div>

                <div className='w-1/2 my-1.5 rounded flex justify-center  '>
                  <input className=' text-[#11283d] outline-none  border-[#02aaf5] border rounded text-xl px-2 py-1 w-[95%] ' />
                </div>
              </div>

              {/* Process Button */}
              <div className='flex w-[95%] mt-3  mx-auto   '>
                <Link
                  className=' mx-auto  '
                  href={'/order-success'}
                >
                  <button className=' bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold '>
                    Save & Continue to Payment
                  </button>
                </Link>
              </div> 

          </div>
        </div>


        {/* Order Summary */}
        <div className=' border w-[30%]'>

        </div>
      </div>
    </div>
  )
}

export default page
