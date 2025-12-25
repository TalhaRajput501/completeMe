import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '@/lib/store/reduxHooks';
import { selectCartTotal } from '@/lib/features/cartSlice';


interface OrderSummaryProps {
  buttonText?: string;
  buttonUrl?: string;
  buttonVisibility?: boolean;
}

function OrderSummary({ buttonText, buttonUrl, buttonVisibility = false }: OrderSummaryProps) {

  const total: number = useAppSelector(selectCartTotal)

  return (

    // Order summary box 
    <div
      className='m-6 p-6 pt-4 sticky inset-0 top-11 bg-[#c0e8fb] text-[#11283d] rounded'>
      <h1 className='font-bold text-2xl'>Order Summary</h1>

      <div className='flex justify-between mt-0.5'>
        <p>Products</p>
        <p className='font-semibold'>{total.toString()}</p>
      </div>

      <div className='flex justify-between mt-0.5'>
        <p>Discount</p>
        <p className='font-semibold'>0</p>
      </div>

      <hr className="border-none h-0.5 bg-gray-900 mt-2" />

      <div className='flex justify-between mt-0.5'>
        <p>Total</p>
        <p className='font-semibold'>{total.toString()}</p>
      </div>

      {buttonVisibility && (
        <div
          className=' w-full border flex items-center mt-9 justify-center   '
        >

          <Link className='w-full' href={`/${buttonUrl}`}>
            <button className='w-full bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold'>
              {buttonText}
            </button>
          </Link>
          {/* <button
          onClick={() => console.log(total)}
          className='w-full bg-[#3dbdf1] hover:bg-[#02aaf5]  cursor-pointer rounded py-2 px-3 font-semibold'>
          show me the redux cart
          </button> */}
        </div>
      )}

    </div>


  )
}

export default OrderSummary
