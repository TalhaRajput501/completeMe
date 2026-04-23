'use client'
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
  // const  products = useAppSelector(state => state.cart.products)

  return (

    // Order summary box 
    <div
      className='m-0 rounded-2xl border border-slate-200 bg-white p-6 pt-5 text-slate-800 shadow-sm'>
      <h1 className='font-bold text-2xl'>Order Summary</h1>

      <div className='flex justify-between mt-0.5'>
        <p>Products</p>
        <p className='font-semibold'>{total.toString()}</p>
      </div>

      <div className='flex justify-between mt-0.5'>
        <p>Discount</p>
        <p className='font-semibold'>0</p>
      </div>

      <hr className='border-none h-0.5 bg-slate-300 mt-3' />

      <div className='flex justify-between mt-0.5'>
        <p>Total</p>
        <p className='font-semibold'>{total.toString()}</p>
      </div>

      {buttonVisibility && (
        <div
          className='w-full mt-9'
        >

          <Link className='w-full' href={`/${buttonUrl}`}>
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-lg py-2.5 px-3 font-semibold transition-colors'>
              {buttonText}
            </button>
          </Link>
        </div>
      )}

    </div>


  )
}

export default OrderSummary
