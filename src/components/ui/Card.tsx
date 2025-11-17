'use client'
import React, { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import StockStatusPill from './StockStatusPill';

interface CardProps {
  images: string[];
  name: string;
  description: string;
  price: number;
  stockStatus: boolean;

}


function Card() {

  const [heartFill, setHeartFill] = useState<boolean>(false)

  const truncate = (text: string) => {
    const truncatedText = text.trim().substring(0, 87).concat('.....')

    return truncatedText
  }

  return (
    <div
      className='hover:border  border hover:border-black border-white   bg-[#edece8]  sm:w-[45%]  md:w-[30%] lg:w-[24%] w-full mt-3  p-4  group  h-106 '
    >


      {/* Images */}
      <div
        className='relative w-full h-54 '
      >
        <Image
          className='w-full h-full'
          fill
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="talha" />

      </div>

      {/* Information */}
      <div
        className='flex flex-col item-center jusitfy-cneter '
      >

        {/* Name and Description */}
        <div>
          {/* Name*/}
          <div>
            <h1
              className='font-bold text-xl hover:underline hover:cursor-pointer  '
            >Product Name </h1>
          </div>
          {/* Description*/}
          <div>
            <p>
              {truncate('Lor pa vero eum magni ab tempora eaque facilis adipisci o s quo quisquam esse nostrum consequuntur amet p  umenda quam. Suscipit possimus iure maxime pariatur sapiente assumenda culpa quasi et nobis quae.')}
            </p>
          </div>
        </div>

        {/* Price and Stock Status */}
        <div
          className='flex justify-between mt-2'
        >
          {/* Price */}
          <div>
            <p
              className='text-xl '
            >
              Rs: &#8203;
              <span className='font-semibold'>
                5555
              </span>
            </p>

          </div>
          {/* Status */}
          <div>
            <StockStatusPill className='text-xs' totalStock={1} />
          </div>
        </div>

        {/* CTA and Like Button */}
        <div
          className=' flex  justify-center     mt-1   '
        >

          <button
            className='flex border cursor-pointer items-center justify-center bg-[#27acdf] hover:bg-[#0d91c5] rounded w-[93%]  '
          >

            <div
              className=' font-semibold text-white '
            >
              Add to Cart
            </div>
            <ShoppingBag className=" p-0.5  text-white ml-1" />

          </button>

          <button>
            <Heart onClick={() => setHeartFill(prev => !prev)} fill={`${heartFill ? 'red' : 'white'}`} className="w-8 h-8 transition-all duration-300 cursor-pointer text-[#3dbdf1]  ml-4" />
          </button>

        </div>

      </div>



    </div>
  )
}

export default Card
