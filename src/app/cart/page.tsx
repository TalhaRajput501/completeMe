'use client'
import CartItem, { cartProduct } from '@/components/ui/CartItem'
import CheckoutProgress from '@/components/ui/CheckoutProgress'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { eachCartProduct } from '../product/[category]/[id]/[name]/page'
import { getProductsWithIds } from '@/lib/actions/products.actions'
import { ProductType } from '@/schemas/product.schema'
import EmptyCart from '@/components/ui/EmptyCart' 
import { useAppSelector } from '@/lib/store/reduxHooks'
import { addCartItems } from '@/lib/features/cartSlice'
import OrderSummary from '@/components/ui/OrderSummary'


export default function Page() {
 

  const reduxCart = useAppSelector(state => state.cart.products) 

 

  return (
    <div
      className='    '
    >
      { /* Cart Product and Side Bar */}
      <div
        className='w-full justify-center   flex item-center '
      >
        {/* Products */}
        <div
          className='w-[70%] mx-auto flex flex-col'
        >
          {/* Checkout Progress Bar*/}
          <div className='w-[90%] mx-auto mt-5'>
            <CheckoutProgress firstPage />
          </div>

          {/* Cart Items */}

          <div className='flex flex-col mt-7  flex-wrap w-full'>
            <h1 className='text-3xl text-[#11283d] font-bold w-[80%] mx-auto  mb-0.5 '>Cart Items</h1>

            <div className=''>
              {
                reduxCart.length !== 0 ? (
                  reduxCart.map(eachProduct => (
                    <CartItem key={eachProduct.name}  product={eachProduct} />
                  ))
                ) : (
                  <EmptyCart />
                )
              } 
            </div>

          </div>

        </div>

        {/*  The vertical line */}
        <div className=" bg-gray-800 h-[calc(100vh-4rem)]"></div>

        {/* Side Bar */}
        <div
          className='w-[30%] '
        >
          <OrderSummary buttonVisibility buttonText='Continue to Checkout' buttonUrl='checkout' />
        </div>
      </div>

    </div>
  )
}
