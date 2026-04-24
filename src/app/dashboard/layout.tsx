'use client'
import React, { useState } from 'react'
import ProtectedRoute from '@/components/ui/ProtectedRoute'
import CleanUrlWrapper from '@/components/ui/CleanUrlWrapper'
import Link from 'next/link';
import { Home, Settings, Store, LogOut, Menu, X, ChartNoAxesCombined, ClipboardList, } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {

  const [showSideBar, setShowSideBar] = useState(false)
  const [showMobileBar, setShowMobileBar] = useState(false)
  const router =  useRouter()

  const handleLogout = () => {  
    localStorage.removeItem('token')
    
    router.push(process.env.NEXT_PUBLIC_URL || '/sign-in')
  }

  return (
    <CleanUrlWrapper>
      <ProtectedRoute allowed={['admin']}>

        <div
          className='w-full flex'
        >

          {/* Mobile Hamburger Icon */}
          <Menu
            onClick={() => setShowMobileBar(prev => !prev)}
            className={`fixed top-18 block md:hidden sm:w-9 sm:h-9 w-8 h-8 left-2 bg-blue-600 rounded text-white`}
            size={'24'}
          />

          {/* This is the side bar */}
          <div 
            className={`   h-[calc(100vh-4rem)] select-none ${showSideBar ? 'md:w-2/12 ' : 'md:w-[72px]  '} border-slate-200 border-r transition-all duration-400 bg-white   ease-out fixed md:static md:translate-x-0 ${showMobileBar ? 'translate-x-0 w-[70%]' : '-translate-x-full'}`}
          >
            <div className="flex flex-col justify-center items-center">

              {/* This is upper part */}
              <div
                className={`pt-4 w-[90%] px-2 `}
              >
                {/* This hamburger icon is for desktop */}
                <div
                  className={`  ${showSideBar ? 'mx-0' : 'mx-auto'} hidden md:block w-fit p-2 hover:bg-slate-100 rounded-lg cursor-pointer  `}
                  onClick={() => setShowSideBar(prev => !prev)}
                >
                  {
                    showSideBar ? (
                      <X
                        className={`mx- w-6 md:w-8 text-slate-700 `}
                      />

                    ) : (
                      <Menu
                        className={`mx- relative  w-6 md:w-8 text-slate-700 `}
                      />
                    )
                  }
                </div>

                {/* This hamburger icon is for mobile */}
                <div
                  className={`block md:hidden  w-fit p-2 hover:bg-slate-100 rounded-lg cursor-pointer  `}
                  onClick={() => setShowMobileBar(prev => !prev)}
                >
                  <X
                    className={` w-6   text-slate-700  `}
                  />
                </div>

                {/* give its properties to all elements */}
                <Link href={'/dashboard/home'}>
                  <abbr title="Home" className='no-underline'>
                    <div
                      className=' w-full hover:bg-blue-50 flex py-3 rounded-lg cursor-pointer  '
                    >
                      <Home className={` w-6   md:w-8 text-slate-700 mx-2 ${showSideBar ? 'md:mx-1' : 'md:mx-auto'}`} />
                      <p className={`text-slate-700 no-underline font-semibold justify-center items-center  
                        ${showSideBar ? 'md:mx-1 md:block' : 'md:hidden'}  mx-1 
                        `}
                      >
                        Home
                      </p>
                    </div>
                  </abbr>
                </Link>

                <Link href={'/dashboard/products'}>
                  <abbr title="Products" className='no-underline'>
                    <div
                      className=' w-full hover:bg-blue-50 flex py-3 rounded-lg cursor-pointer  '
                    >
                      <Store className={` w-6   md:w-8 text-slate-700 mx-2 ${showSideBar ? 'md:mx-1' : 'md:mx-auto'}`} />
                      <p className={`text-slate-700 no-underline font-semibold justify-center items-center  
                        ${showSideBar ? 'md:mx-1 md:block' : 'md:hidden'}  mx-1 
                        `}
                      >
                        Products
                      </p>
                    </div>
                  </abbr>
                </Link>

                <Link href={'/dashboard/orders'}>
                  <abbr title="My Orders" className='no-underline'>
                    <div
                      className=' w-full hover:bg-blue-50 flex py-3 rounded-lg cursor-pointer  '
                    >
                      <ClipboardList className={` w-6   md:w-8 text-slate-700 mx-2 ${showSideBar ? 'md:mx-1' : 'md:mx-auto'}`} />
                      <p className={`text-slate-700 no-underline font-semibold justify-center items-center  
                        ${showSideBar ? 'md:mx-1 md:block' : 'md:hidden'}  mx-1 
                        `}
                      >
                        Orders
                      </p>
                    </div>
                  </abbr>
                </Link>

                <Link href={'/dashboard/settings'}>
                  <abbr title="Settings" className='no-underline'>
                    <div
                      className=' w-full hover:bg-blue-50 flex py-3 rounded-lg cursor-pointer  '
                    >
                      <Settings className={` w-6   md:w-8 text-slate-700 mx-2 ${showSideBar ? 'md:mx-1' : 'md:mx-auto'}`} />
                      <p className={`text-slate-700 no-underline font-semibold justify-center items-center  
                        ${showSideBar ? 'md:mx-1 md:block' : 'md:hidden'}  mx-1 
                        `}
                      >
                        Settings
                      </p>
                    </div>
                  </abbr>
                </Link>

                <Link href={'/dashboard/analytics'}>
                  <abbr title="Analytics" className='no-underline'>
                    <div
                      className=' w-full hover:bg-blue-50 flex py-3 rounded-lg cursor-pointer  '
                    >
                      <ChartNoAxesCombined className={` w-6   md:w-8 text-slate-700 mx-2 ${showSideBar ? 'md:mx-1' : 'md:mx-auto'}`} />
                      <p className={`text-slate-700 no-underline font-semibold justify-center items-center  
                        ${showSideBar ? 'md:mx-1 md:block' : 'md:hidden'}  mx-1 
                        `}
                      >
                        Store Health
                      </p>
                    </div>
                  </abbr>
                </Link>

              </div>

              {/* This is logout button */}
              <div
                className='hover:bg-red-50 border border-red-200 hover:border-red-300 bottom-1 md:px-2 px-1 py-2 cursor-pointer absolute flex rounded-lg transition-colors  '
              >
                <LogOut onClick={handleLogout} className={` md:w-8 w-7 justify-center items-center text-red-600 ${showSideBar ? 'mx-1' : 'mx-auto'}`} />
                <p className={`text-red-600 no-underline font-semibold justify-center items-center  
                  ${showSideBar ? 'md:mx-1 md:block' : 'md:hidden'}  mx-1 
                 `}
                >
                  Logout
                </p>

              </div>

            </div>
          </div>


          {/* This is the actual content */}
          <div
            // todo i have to make it unscrollable when mobile's navbar is visible 
            className={` flex-1  h-[calc(100vh-4rem)] overflow-y-auto    `}
            onClick={() => setShowMobileBar(false)}
          >
            {children}
          </div>
        </div>

      </ProtectedRoute >
    </CleanUrlWrapper >
  )
}
