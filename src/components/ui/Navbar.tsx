'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, User, ShoppingCart, Package } from "lucide-react";

function Navbar() {
  const pathname = usePathname()

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

  const iconOnlyClass = (href: string) =>
    `mx-1 rounded-full p-2 transition-colors ${pathname === href
      ? 'bg-blue-100 text-blue-600'
      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
    }`

  const iconWithTextClass = (href: string) =>
    `mx-1 inline-flex items-center gap-2 rounded-full px-2.5 py-2 transition-colors ${pathname === href
      ? 'bg-blue-100 text-blue-600'
      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
    }`

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
              <Link
                href={'/sign-in'}
                className={iconOnlyClass('/sign-in')}
                aria-label="Admin Sign In"
                title="Admin Sign In"
              >
                <User className="h-6 w-6" />
              </Link>

              <Link
                href={'/wish-list'}
                className={iconWithTextClass('/wish-list')}
                aria-label="Wishlist"
              >
                <Heart className="h-6 w-6" />
                <span className='hidden sm:inline text-sm font-medium'>Wishlist</span>
              </Link>

              <Link
                href={'/cart'}
                className={iconWithTextClass('/cart')}
                aria-label="Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className='hidden sm:inline text-sm font-medium'>Cart</span>
              </Link>

              <Link
                href={'/order-tracking'}
                className={iconWithTextClass('/order-tracking')}
                aria-label="Track Order"
              >
                <Package className="h-6 w-6" />
                <span className='hidden sm:inline text-sm font-medium'>Track</span>
              </Link>

            </div>




          </div>

        </div>
      </div>

    </>
  )
}

export default Navbar
