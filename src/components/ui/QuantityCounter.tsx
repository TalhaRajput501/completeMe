'use client'
import React from 'react'
import { Minus, Plus, Trash } from 'lucide-react'

interface CounterProps {
  deleteIcon?: boolean;
  className?: string;
  value: number;
  setQty: React.Dispatch<React.SetStateAction<number>>
}

function QuantityCounter({ deleteIcon, className, value, setQty}: CounterProps) {


  return (
    <div
      className='flex justify-center border-[#3dbdf1] border rounded-full items-cetner  '
    >
      {/* Decrement Button */}

      <button className={` w-full text-center rounded-l-full cursor-pointer border-r-[#3dbdf1]  font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300  ${className ?? 'px-2 p-1'} `} >
        {
          deleteIcon && value === 1 ? (
            <Trash onClick={() => setQty(prev => Math.max(1, prev - 1))} className='p-0.5' />
          ) : (
            <Minus onClick={() => setQty(prev => Math.max(1, prev - 1))} className='p-0.5' />
          )
        }
      </button>

      {/* Cart Value */}
      <p className={` w-full text-center text-[#3dbdf1]   font-bold text-xl  bg-gray-200 ${className ?? 'px-2 p-1'}`}>{value}</p>

      {/* Increment Button */}
      <button className={`w-full text-center rounded-r-full cursor-pointer border-l-[#3dbdf1] font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300   ${className ?? 'px-2 p-1'} `}>
        <Plus onClick={() => setQty(prev => prev >= 5 ? prev :  prev + 1)} className='p-0.5' />
      </button>
    </div>
  )
}

export default QuantityCounter
