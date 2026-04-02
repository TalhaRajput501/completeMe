'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { User, ShoppingCart } from "lucide-react";

function Navbar() {

  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)



  useEffect(() => {
    const scrollPercent = (window.scrollY / window.innerHeight) * 100

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
      <div>
        <div
          className={`navigation transition-transform duration-80 ${show ? ' sm:translate-y-0' : 'sm:-translate-y-full'} z-50 bg-white border-b border-slate-200 shadow-sm top-0 static right-0 left-0 py-2 px-3`}
        >
          <div
            className='flex items-center justify-between '
          >

            <Link href={'/'}>
              <div>
                <img
                  className='w-12 h-12 object-cover rounded-full'
                  src="/ecom.webp"
                  alt="Ecommerce Logo"
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
                <User className="w-9 cursor-pointer h-10 mx-3 text-slate-700 hover:text-blue-600 transition-colors" />
              </Link>

              <Link
                href={'/cart'}
              >
                <ShoppingCart className="w-9 cursor-pointer h-10 mx-3 text-slate-700 hover:text-blue-600 transition-colors" />
              </Link>

            </div>




          </div>

        </div>
      </div>

    </>
  )
}

export default Navbar
