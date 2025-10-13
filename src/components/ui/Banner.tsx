"use client"
import React, { useEffect, useState } from 'react'
import {CircleArrowLeft, CircleArrowRight} from 'lucide-react'
 

interface BannerProps {
  images: string[];
  interval?: number;

}

function Banner() {


  const [current, setCurrent] = useState<number>(0)


  const images = [
    "https://plus.unsplash.com/premium_photo-1679082307632-8906691802e0?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1749680920901-03fd16468019?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1750494733502-30427edd0efc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1667861381787-62809f85ce65?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1666277012792-08955a43e51c?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1755214614215-663f77355a70?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757898023680-df17835d6b18?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]


  useEffect(() => {
    let interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 3000);

    return () => clearInterval(interval)
  }, [current])


  const nextBanner = () => {
    setCurrent(prev => (prev + 1) % images.length)
  }

  const prevBanner = () => {
    setCurrent(prev => (prev - 1 + images.length) % images.length)
    // console.log(current)
  }

  return (
    <div>
      <div 
        className='  relative   w-full md:h-[72vh] h-[59vh]  '
      >

        {/* Banner Slider */}
        <div
          className='h-full w-full overflow-hidden '
        >
          <div
            className="flex h-full  w-full   transition-transform duration-1200 ease-out "
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {
              images.map((address, index) => (

                <img
                  key={index}
                  className=' w-full  flex-shrink-0  object-center  '
                  src={address}
                  draggable='false'
                  alt=""
                />

              ))
            }

          </div>
        </div>


        {/* Banner Navigation */}
        <div
          className='hidden md:flex absolute bottom-3 right-3 '
        >

          <CircleArrowLeft  onClick={prevBanner} className='h-10 w-10 text-white cursor-pointer   mr-3' />

          <CircleArrowRight  onClick={nextBanner} className='h-10 w-10 text-white cursor-pointer   ' />

        </div>



      </div>
    </div>
  )
}

export default Banner
