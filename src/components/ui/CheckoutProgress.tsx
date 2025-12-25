'use client'
import { Circle, CircleCheck } from 'lucide-react'

import React from 'react'
interface PointBarProps {
  // for previous step to replace simple circle to check mark 
  firstDone?: boolean;
  secondDone?: boolean;
  thirdDone?: boolean;
  // for current step to fill the color of circle 
  firstPage?: boolean;
  secondPage?: boolean;
  thirdPage?: boolean;
}

export default function CheckoutProgress({ firstDone = false, secondDone = false, thirdDone = false, firstPage, secondPage, thirdPage }: PointBarProps) {
  // const firstDone = true
  return (
    <div className='flex flex-col mx-auto mt-3' >
      <div
        className='flex items-center    '
      >
        {
          firstDone ? (
            <CircleCheck className='ml-9' fill='#3dbdf1' />
          ) : (
            <Circle className='text-[#0ba0db] ml-9' fill={`${firstPage ? '#3dbdf1' : 'none'} `} />
          )
        }
        {/* Line */}
        <hr className='mx-2 text-[#3dbdf1] w-1/2   ' />
        {
          secondDone ? (

            <CircleCheck fill='#3dbdf1' />
          ) : (
            <Circle className='text-[#0ba0db]' fill={`${secondPage ? '#3dbdf1' : 'none'} `} />
          )
        }
        {/* Line */}
        <hr className='text-white w-1/2   mx-2' />
        {
          thirdDone ? (

            <CircleCheck className='mr-10' fill='#3dbdf1' />
          ) : (
            <Circle className=' text-[#0ba0db] mr-10' fill={`${thirdPage ? '#3dbdf1' : 'none'} `} />
          )
        }
      </div>

      <div
        className='uppercase    text-[#3dbdf1] font-semibold flex  items-center justify-between'
      >
        <p className='ml-6'>Cart</p>
        <p className='ml-12'>Checkout</p>
        <p>Confirmation</p>
      </div>
    </div>
  )
}
 
