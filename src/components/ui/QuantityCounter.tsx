import React from 'react'
import { Minus, Plus, Trash } from 'lucide-react'

interface CounterProps {
  deleteIcon?: boolean;
  className?: string;
}

function QuantityCounter({ deleteIcon, className = '' }: CounterProps) {
  return (
    <div
      className='flex justify-center border-[#3dbdf1] border rounded-full items-cetner  '
    >
      {/* Decrement Button */}

      <button className={` w-full text-center rounded-l-full px-2 cursor-pointer border-r-[#3dbdf1]  p-1 font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300  ${className} `} >
        {
          deleteIcon ? (
            <Trash className='p-0.5' />
          ) : (
            <Minus className='p-0.5' />
          )
        }
      </button>

      {/* Cart Value */}
      <p className={` w-full text-center text-[#3dbdf1] px-2 p-1 font-bold text-xl  bg-gray-200 ${className}`}>2</p>

      {/* Increment Button */}
      <button className={`w-full text-center rounded-r-full px-2 cursor-pointer border-l-[#3dbdf1]  p-1 font-bold text-xl border  bg-gray-200 hover:bg-gray-300 text-[#3dbdf1] transition-colors duration-300   ${className} `}>
        <Plus className='p-0.5' />
      </button>
    </div>
  )
}

export default QuantityCounter
