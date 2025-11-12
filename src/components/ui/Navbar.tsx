'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { User, ShoppingCart } from "lucide-react"; 

function Navbar() {

  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

 
  
  useEffect(() => { 
    const scrollPercent = (window.scrollY  / window.innerHeight) * 100
    
    const handleScroll = () => {

      if (scrollPercent > 20) {
        if (window.scrollY > lastScrollY) {
          setShow(false)
        } else {
          setShow(true)
        }
      }
      setLastScrollY(window.scrollY)
    }


    window.addEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  const dummy = () => {
    const currentScroll = window.scrollY 
    const scrollPercent = (currentScroll / window.innerHeight) * 100

    console.log(currentScroll)  // obtained marks --> how much i scrolled
    console.log(window.innerHeight) // total marks --> how much is total height of screen
    console.log(scrollPercent) // devide them and multipy by 100 
  }

  return (
    <>
      <div


      >
        <div
          className={`navigation transition-transform   duration-80 ${show ? ' sm:translate-y-0' : 'sm:-translate-y-full'} z-50  bg-[#f9fafb] shadow-sm top-0 static  border-b border-gray-200 right-0 left-0  py-2 px-3  `}
        >
          <div
            className='flex items-center justify-between '
          >

            <Link href={'/'}>
              <div>
                <img
                  className='w-12 border rounded-full '
                  src="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwa0b893d9/images/large/80e7c0c14dd05306bb26f4fe91e56934.png?sw=350&sh=350&sm=fit&sfrm=png"
                  alt=""
                />
              </div>
            </Link>


            {/* rest of the navigation will place here  */}
            <div
              className='flex '
            >
              {/* <User onClick={dummy} className="w-9 cursor-pointer  h-10 mx-3  text-red-500" /> */}

              <Link
                href={'/sign-in'}
              >

                <User className="w-9 cursor-pointer  h-10 mx-3  text-white" />
              </Link>

              <ShoppingCart className="w-9 cursor-pointer  h-10 mx-3  text-white" />

            </div>




          </div>

        </div>
      </div>

    </>
  )
}

export default Navbar
