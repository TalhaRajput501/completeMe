import CartItem from '@/components/ui/CartItem'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import QuantityCounter from '@/components/ui/QuantityCounter'
import React from 'react'

function page() {
  return (
    <div
      className='bg-gray-900 text-white '
    >
      <h1 className='text-2xl' >Here will be all the product like this will show you your cart</h1>
      {/* Cart Product and Side Bar */}
      <div
        className='w-full justify-center  h-screen flex item-center '
      >
        {/* Products */}
        <div
          className='w-[70%] border border-amber-300  mx-auto flex flex-col'
        >
          {/* Checkout Progress Bar*/}
          <div className='w-[90%] mx-auto'>

          <CheckoutProgress firstPage />
          </div>

          {/* Cart Items */}
          <h1 className='text-3xl mt-4 mx-9 mb-0.5'>Cart Items</h1>
          <div className='flex flex-wrap w-full'>
          <CartItem />
          <CartItem />
          </div>

        </div>
        {/* Side Bar */}
        <div
          className='w-[30%] border border-amber-300'
        >
          <div></div>
        </div>
      </div>

    </div>
  )
}

export default page
