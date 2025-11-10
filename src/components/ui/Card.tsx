import React from 'react'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'


function Card() {
  return (
    <div
      className='hover:border  border hover:border-black border-white   bg-[#edece8]  sm:w-[45%]  md:w-[30%] lg:w-[24%] w-full mt-3  p-4  group  h-88 '
    >



      <div
        className='relative'
      >
        <Image
          className='w-full'
          fill
          src="https://images.unsplash.com/photo-1757898023680-df17835d6b18?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

      </div>


      <div
        className='flex flex-col item-center jusitfy-cneter '
      >

        <div
          className='flex justify-between'
        >
          <h1>A watch is a timepiece carried or worn by a person. It is designed to maintain a consistent movement despite the motions caused by the persons activities.</h1>

          <p
            className='text-xl font-bold '
          >PKR 5555</p>
        </div>

        <div
          className='group-hover:flex group-hover:justify-center  hidden gorup-hover:block   '
        >
          <button
            className='flex border cursor-pointer items-center justify-center bg-black w-[93%]  '
          >

            <div
              className=' py-2 text-white '
            >
              Add to Bag
            </div>
            <ShoppingBag className="w-8 h-8 text-white ml-4" />

          </button>


        </div>
      </div>



    </div>
  )
}

export default Card
